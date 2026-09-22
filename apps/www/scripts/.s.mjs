import { chromium } from "playwright";
const [out, loc = "en"] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 768, height: 1024 }, reducedMotion: "reduce" });
await p.goto(`http://127.0.0.1:3151/${loc}`, { waitUntil: "networkidle" });
await p.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 700) {
    scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  scrollTo(0, 0);
});
await p.waitForTimeout(800);
await p.screenshot({ path: `${out}/build/${loc}-tablet.png`, fullPage: true });
console.log(
  JSON.stringify(
    await p.evaluate(() =>
      [...document.querySelectorAll("body section, body footer")].map(
        (e) =>
          `${e.id || e.tagName} y=${Math.round(e.getBoundingClientRect().top + scrollY)} h=${Math.round(e.offsetHeight)}`,
      ),
    ),
  ),
);
await b.close();
