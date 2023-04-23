"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const axios_1 = __importDefault(require("axios"));
const mockData = {
    title: "i am title",
    filePath: ""
};
const unSignInUploadBtn = "#app > div.tiktok-xk7ai4-DivHeaderContainer.e10win0d0 > div > div.tiktok-ba55d9-DivHeaderRightContainer.e13wiwn60 > div > a > div > span";
const uploadBtn = "#app > div.tiktok-xk7ai4-DivHeaderContainer.e10win0d0 > div > div.tiktok-ba55d9-DivHeaderRightContainer.e13wiwn60 > div.tiktok-gcx66p-DivUploadContainer.e18d3d940 > a > div > span";
const selectFileBtn = "#root > div > div > div > div > div > div > div > div.jsx-1410612692.file-select-button.wide-file-select-button";
const titleInput = "#root > div > div > div > div.jsx-2907531398.container-v2 > div.jsx-2907531398.contents-v2 > div.jsx-3073379498.form-v2 > div.jsx-3073379498.caption-wrap-v2 > div > div:nth-child(1) > div.jsx-2598445697.margin-t-4 > div > div.jsx-3128502462.jsx-3892942083.jsx-3734900869.jsx-126755782.editor > div > div > div";
const getCoverItemSelector = (n) => `#root > div > div > div > div.jsx-2907531398.container-v2 > div.jsx-2907531398.contents-v2 > div.jsx-3073379498.form-v2 > div.jsx-3073379498.margin-t-24.margin-b-4 > div > div.jsx-1194568070.jsx-1469740349.bg-container-v2 > img:nth-child(${n})`;
const checkCopyBtn = "#root > div > div > div > div.jsx-2907531398.container-v2 > div.jsx-2907531398.contents-v2 > div.jsx-3073379498.form-v2 > div.jsx-1872259270.switch-wrap > div.tiktok-switch > div";
const postUploadBtn = "#root > div > div > div > div.jsx-2907531398.container-v2 > div.jsx-2907531398.contents-v2 > div.jsx-3073379498.form-v2 > div.jsx-3073379498.button-row > div.jsx-3073379498.btn-post > button";
(() => __awaiter(void 0, void 0, void 0, function* () {
    const wsKey = yield axios_1.default.get('http://localhost:9222/json/version');
    const browser = yield puppeteer_core_1.default.connect({
        browserWSEndpoint: wsKey.data.webSocketDebuggerUrl,
        defaultViewport: null
    });
    const page = yield browser.newPage();
    yield page.goto('https://www.tiktok.com/upload?lang=en', {
        "waitUntil": "domcontentloaded"
        // "waitUntil": "networkidle0",
        // "timeout": 3000 * 1000000000
    });
    // const startUploadBtn =  await page.waitForSelector(uploadBtn)
    // await startUploadBtn?.click()
    const inputFile = yield page.waitForSelector(selectFileBtn);
    yield inputFile.uploadFile("C:/Users/Bin.Liu20/Downloads/out.mp4");
}))();
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
