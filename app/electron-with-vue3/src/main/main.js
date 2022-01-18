const { app, BrowserWindow } = require('electron');

const win = null;

const createWindow = () => {
    win = new BrowserWindow({
        width: 1100,
        height: 700,
    });
    
    win.loadURL('http://localhost:3000');
}


app.on('ready', createWindow);