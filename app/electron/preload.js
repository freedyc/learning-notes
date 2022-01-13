// 因为无法在主进程中编辑DOM,所有痛殴预加载脚本 有权防伪两个渲染全局， （window, document, 和Nodejs环
const fs = require('fs');
const { contextBridge, ipcRenderer, clipboard} = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    console.log('.dom content loaded')
    const replaceText = (selector, text) => {
        const element = document.querySelector(selector)
        if (element) element.innerText = text
    }
    const pckText = fs.readFileSync('./package.json').toString('utf-8')
    replaceText('#plaform',  process.platform)
    replaceText('.package-json', pckText);
    replaceText('h1.info', '你好, 让我们开始吧');

    // 设置默认主题
    replaceText('#theme-source', 'system');
})


contextBridge.exposeInMainWorld('darkMode', {
    toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
    system: () => ipcRenderer.invoke('dark-mode:system')
})

contextBridge.exposeInMainWorld('operation', {
    newWindow: () => ipcRenderer.invoke('open-new-window'),
    progress: () => ipcRenderer.invoke('progress')
})

contextBridge.exposeInMainWorld('clipboard', {
    copy: (text) => clipboard.writeText(text),
    paste: () => clipboard.readText()
});