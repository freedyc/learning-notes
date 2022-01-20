const { app, BrowserWindow } = require('electron');

let win = null;

const createWindow = () => {
    win = new BrowserWindow({
        width: 1100,
        height: 700,
    });
    
    win.loadURL('http://localhost:8080/');
}


app.whenReady().then(() => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
