/**
 * read README.md for more information
 * we are using @sparticuz/chromium to get the latest version of chromium
 * and we are using puppeteer-core to use the chromium version
 *
 * this function will take a screenshot of the twitter profile of @ahmedrowaihi
 * and return it as a base64 encoded image
 *
 * start the function with:
 * netlify dev
 *
 * and then open the browser and go to:
 * http://localhost:8888/.netlify/functions/hello_sudo
 *
 */
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
exports.handler = async (event, context) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath:
      process.env.CHROME_EXECUTABLE_PATH || chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.goto("https://twitter.com/ahmedrowaihi");

  // take screenshot
  const buffer = await page.screenshot({ type: "png" });

  await browser.close();
  // return buffer image
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "image/png",
    },
    body: buffer.toString("base64"),
    isBase64Encoded: true,
  };
};
