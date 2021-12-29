// 因为无法在主进程中编辑DOM,所有痛殴预加载脚本 有权防伪两个渲染全局， （window, document, 和Nodejs环
const fs = require('fs');
window.addEventListener('DOMContentLoaded', () => {
    console.log('.dom content loaded')
    const replaceText = (selector, text) => {
        const element = document.querySelector(selector)
        if (element) element.innerText = text
    }
    let txt = '';
    txt += "Hello,"
    txt += `你现在平台信息为 ${process.platform}`
    txt +=fs.readFileSync('./package.json').toString('utf-8')
    replaceText('h1.info', txt)
})