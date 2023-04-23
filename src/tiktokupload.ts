import fsExtra from 'fs-extra';
import puppeteerCore, { ElementHandle }  from 'puppeteer-core';
import axios from 'axios';
import findChrome from 'carlo/lib/find_chrome';

const baseUrl = 'https://www.tiktok.com/upload?lang=en'
const mockUrl = "https://www.baidu.com"
const metaDataList = [
    {
        title: "i am title",
        filePath: ""
    }
]

const unSignInUploadBtn = "#app > div.tiktok-xk7ai4-DivHeaderContainer.e10win0d0 > div > div.tiktok-ba55d9-DivHeaderRightContainer.e13wiwn60 > div > a > div > span";
const uploadBtn = "#app > div.tiktok-xk7ai4-DivHeaderContainer.e10win0d0 > div > div.tiktok-ba55d9-DivHeaderRightContainer.e13wiwn60 > div.tiktok-gcx66p-DivUploadContainer.e18d3d940 > a > div > span";
const selectFileBtn = "#root > div > div > div > div > div > div > input";

const titleInput = "#root > div > div > div > div.jsx-2907531398.container-v2 > div.jsx-2907531398.contents-v2 > div.jsx-3073379498.form-v2 > div.jsx-3073379498.caption-wrap-v2 > div > div:nth-child(1) > div.jsx-2598445697.margin-t-4 > div > div.jsx-3128502462.jsx-3892942083.jsx-3734900869.jsx-126755782.editor > div > div > div";

const getCoverItemSelector = (n) => `#root > div > div > div > div.jsx-2907531398.container-v2 > div.jsx-2907531398.contents-v2 > div.jsx-3073379498.form-v2 > div.jsx-3073379498.margin-t-24.margin-b-4 > div > div.jsx-1194568070.jsx-1469740349.bg-container-v2 > img:nth-child(${n})`;
const checkCopyBtn = "#root > div > div > div > div.jsx-2907531398.container-v2 > div.jsx-2907531398.contents-v2 > div.jsx-3073379498.form-v2 > div.jsx-1872259270.switch-wrap > div.tiktok-switch > div";
const postUploadBtn = "#root > div > div > div > div.jsx-2907531398.container-v2 > div.jsx-2907531398.contents-v2 > div.jsx-3073379498.form-v2 > div.jsx-3073379498.button-row > div.jsx-3073379498.btn-post > button";
const postUploadConfirm = "#root > div > div > div > div.jsx-2907531398.container-v2 > div.jsx-2907531398.contents-v2 > div.jsx-3073379498.form-v2 > div.tiktok-modal__modal-mask > div > div.tiktok-modal__modal-footer.is-horizontal > div.tiktok-modal__modal-button.is-line.is-highlight";

async function uploadSingle(metaDataJson, browser) {
    const page = await browser.newPage()
    await page.goto(baseUrl, {
    });
    const frame1 = await page.frames()[1]
    const inputFile: any = await frame1.waitForSelector(selectFileBtn)
    await inputFile.uploadFile("C:/Users/Bin.Liu20/Downloads/out.mp4")
    const tilteIn: any = await frame1.waitForSelector(titleInput)
    tilteIn.type(metaDataJson.title)
    const converIns: any = await frame1.waitForSelector(getCoverItemSelector(1))
    await converIns.click()
    // 
    const copyRightIns: any = await frame1.waitForSelector(checkCopyBtn)
    await copyRightIns.click()
   // post 点击
   const postBtn: any = await frame1.waitForSelector(postUploadBtn)
   await postBtn.click()
   const postConfirmIns: any = await frame1.waitForSelector(postUploadConfirm)
   await postConfirmIns.click()
}

async function main(){
    // 确保google浏览器已经启动，和tiktok已经登录
    const wsKey = await axios.get('http://localhost:9222/json/version');
    const browser=await puppeteerCore.connect({
        browserWSEndpoint: wsKey.data.webSocketDebuggerUrl,
        defaultViewport:null
    });
    for (let i = 0; i < metaDataList.length; i++) {
        await uploadSingle(metaDataList[i], browser)
    }
}

main()
