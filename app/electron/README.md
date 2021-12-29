
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

```bash
#将脚本替换成 Electron Forge
npx electron-forge import

# package.json 中会增加
{
  "name": "electron-dyck",
  "version": "1.0.0",
  "description": "learning",
  "main": "main.js",
  "scripts": {
    "start": "electron-forge start",
    "package": "electron-forge package",
    "make": "electron-forge make"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@electron-forge/cli": "^6.0.0-beta.61",
    "@electron-forge/maker-deb": "^6.0.0-beta.61",
    "@electron-forge/maker-rpm": "^6.0.0-beta.61",
    "@electron-forge/maker-squirrel": "^6.0.0-beta.61",
    "@electron-forge/maker-zip": "^6.0.0-beta.61",
    "electron": "^16.0.5"
  },
  "dependencies": {
    "electron-squirrel-startup": "^1.0.0"
  },
  "config": {
    "forge": {
      "packagerConfig": {},
      "makers": [
        {
          "name": "@electron-forge/maker-squirrel",
          "config": {
            "name": "electron_dyck"
          }
        },
        {
          "name": "@electron-forge/maker-zip",
          "platforms": [
            "darwin"
          ]
        },
        {
          "name": "@electron-forge/maker-deb",
          "config": {}
        },
        {
          "name": "@electron-forge/maker-rpm",
          "config": {}
        }
      ]
    }
  }
}

# 使用 make 命令 创建程序
yarn make


```

### 执行过程

```bash
➜ npx electron-forge import    
✔ Checking your system
✔ Initializing Git Repository
✔ Writing modified package.json file
✔ Installing dependencies
✔ Writing modified package.json file
✔ Fixing .gitignore
➜ yarn make

yarn run v1.22.10
$ electron-forge make
✔ Checking your system
✔ Resolving Forge Config
We need to package your application before we can make it
✔ Preparing to Package Application for arch: x64
✔ Preparing native dependencies
✔ Packaging Application
Making for the following targets: zip
✔ Making for target: zip - On platform: darwin - For arch: x64
✨  Done in 37.77s.

 tree -L 2 out/
out/
├── electron-dyck-darwin-x64
│   ├── LICENSE
│   ├── LICENSES.chromium.html
│   ├── electron-dyck.app
│   └── version
└── make
    └── zip

```
