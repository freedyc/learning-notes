const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

console.log('preload.js.....');
document.addEventListener("DOMContentLoaded", () => {
    ipc.send('load', 'DOMContentLoaded send');
    ipc.on('reslut', (event, arg) => {
        console.log('reslut', arg);
    });
})