// Render dashain-post.html to PNG (1080x1080 and 2160x2160).
// Usage: NODE_PATH=<dir with playwright-core installed> node marketing/dashain-2083/render.cjs
// Set CHROMIUM to a Chromium binary if it is not at the default path below.
const path = require("path");
const { chromium } = require("playwright-core");

const dir = __dirname;
const executablePath = process.env.CHROMIUM || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

(async () => {
  const browser = await chromium.launch({ executablePath, args: ["--allow-file-access-from-files"] });
  for (const scale of [1, 2]) {
    const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: scale });
    await page.goto("file://" + path.join(dir, "dashain-post.html"));
    await page.waitForSelector("body[data-ready='1']");
    await page.waitForTimeout(300);
    const out = path.join(dir, scale === 1 ? "csn-dashain-2083.png" : "csn-dashain-2083@2x.png");
    await page.locator("#post").screenshot({ path: out });
    console.log("wrote", out);
    await page.close();
  }
  await browser.close();
})();
