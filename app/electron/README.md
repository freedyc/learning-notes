
# 入门哇

1. 使用 Javascript, HTML, CSS 构建桌面级应用框架，嵌入 Chromium和Node.js 到二进制Electron 允许保持一个Javascript 代码库并创建跨平台应用

2. [Electron Fiddle](https://www.electronjs.org/fiddle) 学习 electron 工具可以直接查看 electron 文档中的应用


## 小技巧

### 拥有 nodejs 和 window,document 访问权限的脚本

```js
new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    preload: path.join(__dirname, 'preload.js')
  }
})
```

### 打开开发这工具

```js
win.webCotnents.openDevTools()
```

## 打包使用 @electron-forge/cli

## 进阶

### 主题切换

```js
// 在主进程定义调用
ipcMain.handle
// nativeTheme.themeSource 设置主题 dark, light
// nativeTheme.shouldUseDarkColors 设置主题是否使用暗色

// 在中间层定义dom 调用事件
// ontextBridge.exposeInMainWorld  // 在主进程中暴露出来到 window,可以调用
ipcRenderer.invoke('toggle-theme:dark')  // 调用主进程方法切换主题
```
