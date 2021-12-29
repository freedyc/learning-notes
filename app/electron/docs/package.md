# 使用 Electron Forge 发包

```bash
# 安装
yarn add @electron-forge/cli --dev

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
