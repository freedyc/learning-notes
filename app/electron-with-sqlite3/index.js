const { app, BrowserWindow, ipcMain } = require('electron');
const sqlite3 = require('sqlite3');
const path = require('path');
const dbName = path.join(__dirname, './data.db');

// 打开数据库，如果不存在则创建一个， 并返回db对象
const db = new sqlite3.Database(dbName, (error) => {
    if (error != null) {
        console.log(error);
    }
});

// 关闭数据库调用close方法
// db.close(err => {
//     if (err) console.log(err);
// });

const sql = `CREATE TABLE info (id INTEGER PRIMARY KEY,name VARCHAR (30) NOT NULL, val TINYINT (3) NOT NULL DEFAULT 0)`

db.run(sql, (error) => {
    if (error) console.log(error);
    console.log('创建info表成功')
});

db.run('INSERT INTO info (name, val) VALUES (?, ?)', ['a', 123], function(err) {
    if (err) console.log(err);
    console.log(this.changes);
    console.log(this.lastID)
});



app.whenReady().then(() => {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    win.webContents.openDevTools();
    const knex = require('knex')({
        client: 'sqlite3',
        connection: { filename: dbName },
    });

    win.loadFile(path.join(__dirname,'./index.html'));

    ipcMain.on('load', (event,args) => {
        const result = knex('info').select('*');
        result.then(function(rows) {
            console.log('rows', rows, args);
            event.reply('result', 'pong');
        })
    })
})

app.on("window-all-closed", () => {
    db.close(() => {});
    app.quit();
});