const { app, BrowserWindow,BrowserView, ipcMain, nativeTheme, Menu, MenuItem } = require('electron');
const fs = require('fs');
const path = require('path');
const process = require('process');
// menu
const menu = new Menu();
menu.append(new MenuItem({
    label: 'Electron',
    submenu: [
        {
            role: 'help',
            accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
            click: () => { console.log('Electron help') }
        },
        {
            label: 'Open Recent',
            role: 'recentdocuments',
            submenu: [
                {
                    label: 'Clear Recent',
                    role: 'clearrecentdocuments',
                }
            ]
        }
    ]
}))


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
    // win.webContents.openDevTools()
    menu.append(new MenuItem({
        label: 'View',
        submenu: [
            {
                role: 'Debug',
                label: 'Debug',
                accelerator: process.platform === 'darwin' ? 'Shift+Cmd+I' : 'Ctrl+Shift+I',
                click: () => { win.webContents.openDevTools() }
            }
        ]
    }))


    // 设置主题
    // console.log(nativeTheme, ipcMain)

    ipcMain.handle('dark-mode:toggle', () => {
        console.log('nativeTheme.shouldUseDarkColors', nativeTheme.shouldUseDarkColors)
        console.log('nativeTheme.themeSource', nativeTheme.themeSource)
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = 'light'
        } else {
            nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors

    })
    ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system'
    })

    // 多窗口打开
    ipcMain.handle('open-new-window', () => {
        console.log('open-new-window');
        const nwin = new BrowserWindow({
            width: 500,
            height: 500,
            // frame: false,  // 去掉边框
            // titleBarStyle: 'hidden',
            // trafficLightPosition: { x: 20, y: 100},
            // transparent: true,
        })
        // 点击穿透， 设置后对话框不介绍鼠标事件
        // nwin.setIgnoreMouseEvents(true)
        nwin.loadFile('src/static/index2.html')
    })

    // 进度展示
    let progressInterval
    ipcMain.handle('progress', (event, arg) => {
        // 进度条

        const INCREMENT = 0.03;
        const INTERVAL_DELAY = 200;

        let c = 0;
        if (progressInterval) { return };
        progressInterval = setInterval(() => {
            // console.log('progressInterval', c);
            win.setProgressBar(c);
            if (c < 2) {
                c += INCREMENT;
            } else {
                c = -1;
                win.setProgressBar(c);
                clearInterval(progressInterval);
                progressInterval = null;
            }
        }, INTERVAL_DELAY);

        app.on('before-quit', () => {
            // 在退出之前执行
            clearInterval(progressInterval);
            win.setProgressBar(-1);
            progressInterval = null;
        })
    })

    // Browser View
    // const view = new BrowserView();
    // win.setBrowserView(view);
    // view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
    // view.webContents.loadURL('https://electronjs.org')
    const log = console.log;
    log('获取当前应用程序所在目录', app.getAppPath());
    log('获取Home目录', app.getPath('home'));
    log('获取应用程序数据目录', app.getPath('appData'));
    log('获取应用程序用户数据目录', app.getPath('userData'));
    log('获取临时文件目录', app.getPath('temp'));
    log('获取当前可执行文件', app.getPath('exe'));
    log('获取module目录', app.getPath('module'));
    log('当前桌面文件夹', app.getPath('desktop'));
    log('用户文档目录', app.getPath('documents'));
    log('用户下载目录', app.getPath('downloads'));
    log('用户音乐目录', app.getPath('music'));
    log('用户视频目录', app.getPath('videos'));
    log('用户图片目录', app.getPath('pictures'));
    // log('用户最新访问文件目录', app.getPath('recent')); // 仅window支持
    log('用户日志目录', app.getPath('logs'));
    log('奔溃转存目录', app.getPath('crashDumps'));

    log('获取当前app版本号', app.getVersion());

}

const fileName = 'recently-used.md'
fs.writeFile(fileName, 'HHHHHHHHH', () => {
  app.addRecentDocument(path.join(__dirname, fileName))
})

// 在 app ready 事件中创建窗口
app.whenReady().then(() =>{
    createWindow();
    Menu.setApplicationMenu(menu);
})


const printAppInfo = () => {
    // 调用 nodejs api
    console.log('pid', process.pid)
    console.log('ppid', process.ppid)
    console.log('平台', process.platform)
}


printAppInfo();


app.on('window-all-closed', () => {
    // 清空最近文档
    app.clearRecentDocuments();
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
