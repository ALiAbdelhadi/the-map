/**
 * Screenshots the site at the three widths the Figma file designs, so the build
 * can be compared against the Figma renders.
 *
 * Usage: node scripts/shoot.mjs <baseUrl> <outDir> [path...]
 */
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const [baseUrl = "http://127.0.0.1:3000", outDir = "screenshots", ...paths] = process.argv.slice(2);
const routes = paths.length > 0 ? paths : ["/"];

const WIDTHS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1024 },
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const errors = [];

for (const route of routes) {
  for (const size of WIDTHS) {
    const page = await browser.newPage({ viewport: { width: size.width, height: size.height } });
    page.on("pageerror", (error) => errors.push(`${route} ${size.name}: ${error.message}`));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(`${route} ${size.name}: ${message.text()}`);
    });

    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });

    // Lazy-loaded images never fetch for an off-screen full-page screenshot, so
    // walk the page to the bottom first and wait for everything to decode.
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 120));
      }
      window.scrollTo(0, 0);
      await Promise.all(
        Array.from(document.images)
          .filter((image) => !image.complete)
          .map(
            (image) =>
              new Promise((resolve) => {
                const done = () => resolve();
                image.addEventListener("load", done, { once: true });
                image.addEventListener("error", done, { once: true });
                setTimeout(done, 5000);
              }),
          ),
      );
    });
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    const slug = route === "/" ? "home" : route.replace(/\//g, "-").replace(/^-/, "");
    const file = `${outDir}/${slug}-${size.name}.png`;
    await page.screenshot({ path: file, fullPage: true });

    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    console.log(
      `${file}  status=${response?.status()}  page=${size.width}x${height}  horizontalOverflow=${overflow}`,
    );

    await page.close();
  }
}

await browser.close();
if (errors.length > 0) {
  console.log("\nBrowser errors:");
  for (const error of errors) console.log("  " + error);
  process.exitCode = 1;
}
