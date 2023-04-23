import fsExtra from 'fs-extra';
import puppeteerCore, { ElementHandle }  from 'puppeteer-core';
import axios from 'axios';
import findChrome from 'carlo/lib/find_chrome';

const mockData = {
    title: "i am title",
    filePath: ""
}

const unSignInUploadBtn = "#app > div.tiktok-xk7ai4-DivHeaderContainer.e10win0d0 > div > div.tiktok-ba55d9-DivHeaderRightContainer.e13wiwn60 > div > a > div > span";
const uploadBtn = "#app > div.tiktok-xk7ai4-DivHeaderContainer.e10win0d0 > div > div.tiktok-ba55d9-DivHeaderRightContainer.e13wiwn60 > div.tiktok-gcx66p-DivUploadContainer.e18d3d940 > a > div > span";
const selectFileBtn = "#root > div > div > div > div > div > div > div > div.jsx-1410612692.file-select-button.wide-file-select-button";
const titleInput = "#root > div > div > div > div.jsx-2907531398.container-v2 > div.jsx-2907531398.contents-v2 > div.jsx-3073379498.form-v2 > div.jsx-3073379498.caption-wrap-v2 > div > div:nth-child(1) > div.jsx-2598445697.margin-t-4 > div > div.jsx-3128502462.jsx-3892942083.jsx-3734900869.jsx-126755782.editor > div > div > div";

const getCoverItemSelector = (n) => `#root > div > div > div > div.jsx-2907531398.container-v2 > div.jsx-2907531398.contents-v2 > div.jsx-3073379498.form-v2 > div.jsx-3073379498.margin-t-24.margin-b-4 > div > div.jsx-1194568070.jsx-1469740349.bg-container-v2 > img:nth-child(${n})`;
const checkCopyBtn = "#root > div > div > div > div.jsx-2907531398.container-v2 > div.jsx-2907531398.contents-v2 > div.jsx-3073379498.form-v2 > div.jsx-1872259270.switch-wrap > div.tiktok-switch > div";
const postUploadBtn = "#root > div > div > div > div.jsx-2907531398.container-v2 > div.jsx-2907531398.contents-v2 > div.jsx-3073379498.form-v2 > div.jsx-3073379498.button-row > div.jsx-3073379498.btn-post > button";
(async()=>{
    const wsKey = await axios.get('http://localhost:9222/json/version');
    const browser=await puppeteerCore.connect({
        browserWSEndpoint: wsKey.data.webSocketDebuggerUrl,
        defaultViewport:null
    });
    const page = await browser.newPage()
    await page.goto('https://www.tiktok.com/upload?lang=en', {
        "waitUntil": "domcontentloaded"
        // "waitUntil": "networkidle0",
        // "timeout": 3000 * 1000000000
    });
    // const startUploadBtn =  await page.waitForSelector(uploadBtn)
    // await startUploadBtn?.click()
    const inputFile: any = await page.waitForSelector(selectFileBtn)
    await inputFile.uploadFile("C:/Users/Bin.Liu20/Downloads/out.mp4")
})()

// async function main() {
//     const findChromePath = await findChrome({});
//     console.log(findChromePath.executablePath, 'findChromePath-->')
//     const brower = await puppeteerCore.launch({
//         executablePath: findChromePath.executablePath,
//         headless: false,
//         defaultViewport: {
//             width: 1280,
//             height: 1200
//         }
//     })
//     const page = await brower.newPage()
//     try {
//         await page.goto("https://www.baidu.com")  
//     } catch (error) {
//         console.log(error, 'page-->')
//     }

// }


// main()