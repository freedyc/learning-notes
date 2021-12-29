const { app, BrowserWindow } = require('electron');
const path = require('path');
const process = require('process');
const createWindow = () => {
    // 创建一个窗口
    const win = new BrowserWindow({
        width: 800, // 窗口宽度
        height: 600,// 窗口高度
        webPreferences: { // 将 preload 脚本附加到渲染进程， 把脚本加载webPreFerences.preload 上面
            preload: path.join(__dirname, 'preload.js'),
        }
    })
    // 渲染 index.html
    // 渲染url  例如： win.loadURL('http://localhost:3000')

    win.loadFile('index.html')
    // 打开开发者工具
    win.webContents.openDevTools()
}

// 在 app ready 事件中创建窗口
app.whenReady().then(() =>{
    createWindow()
})


const printAppInfo = () => {
    // 调用 nodejs api
    console.log('pid', process.pid)
    console.log('ppid', process.ppid)
    console.log('平台', process.platform)
}


printAppInfo();


app.on('window-all-closed', () => {
    // window关闭所有窗口时退出应用
    if(process.platform !== 'darwin'){
        app.quit()
    }
    //activate 当没有窗口可用的情况激活回打 开新的窗口, 在 MAC os 中可以使用
    app.on('activate', () => {
        // 获取活跃窗口，如果没有则新建一个窗口
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})


console.log('......main.js');
