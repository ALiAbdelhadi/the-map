import { chromium } from "playwright";
const out = process.argv[2];
const b = await chromium.launch();
const errors = [];
const p = await b.newPage({ viewport: { width: 1440, height: 1024 } });
p.on("pageerror", (e) => errors.push(e.message));
p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await p.goto("http://127.0.0.1:3150/en", { waitUntil: "networkidle" });
await p.screenshot({ path: `${out}/hero-default.png` });
const btn = p.getByRole("button", { name: "Service", exact: true });
await btn.click();
await p.waitForTimeout(350);
await p.screenshot({ path: `${out}/hero-mid.png` });
await p.waitForTimeout(1100);
await p.screenshot({ path: `${out}/hero-service.png` });
const state = await p.evaluate(() => ({
  title: document.querySelector("#about h1").textContent,
  pressed: [...document.querySelectorAll("#about [aria-pressed=true]")].map((e) =>
    e.getAttribute("aria-label"),
  ),
  wheel: getComputedStyle(document.querySelector("#about [data-slot]").parentElement).transform,
}));
// keyboard: tab to the Food button and press Enter
await p.getByRole("button", { name: "Food", exact: true }).focus();
await p.keyboard.press("Enter");
await p.waitForTimeout(1400);
const food = await p.evaluate(() => document.querySelector("#about h1").textContent);
await p.getByRole("button", { name: "Back to The Map" }).click();
await p.waitForTimeout(1400);
const home = await p.evaluate(() => document.querySelector("#about h1").textContent);
// arabic
await p.goto("http://127.0.0.1:3150/ar", { waitUntil: "networkidle" });
await p.getByRole("button", { name: "Medical", exact: true }).click();
await p.waitForTimeout(1400);
await p.screenshot({ path: `${out}/hero-ar-medical.png` });
const ar = await p.evaluate(() => document.querySelector("#about p").textContent.slice(0, 40));
// reduced motion: switching is instant
const r = await b.newPage({ viewport: { width: 1440, height: 1024 }, reducedMotion: "reduce" });
await r.goto("http://127.0.0.1:3150/en", { waitUntil: "networkidle" });
await r.getByRole("button", { name: "Emergency", exact: true }).click();
await r.waitForTimeout(60);
const rm = await r.evaluate(
  () => getComputedStyle(document.querySelector("[data-scene='5']")).opacity,
);
console.log(
  JSON.stringify(
    { ...state, food, home, ar, reducedMotionSceneOpacityAt60ms: rm, errors },
    null,
    1,
  ),
);
await b.close();
