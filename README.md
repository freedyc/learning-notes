# Learning
## 错误处理
- 同步使用 try catch
- 异步在回调函数中处理

## 内置URl
- 统一资源定位符

## 发送邮件插件
nodemailer

## 爬虫案例
1. 获取目标网站 // http.get模块
2. 分析网站内容  // cheerio 可以使用jquery选择器
3. 获取有效信息 下载或者其他操作

### 什么是API
- http.get('https://www.baidu.com/search?q=abc', () => {})
    - https://www.baidu.com/search?q=abc API接口
- ajax 
- 前后端分离 API请求数据
- 前端： 1. 写界面 2. 请求数据 3. 数据处理
- 后端： 1. 写API接口
### 登录接口分析逻辑
1. 接受用户传输数据
2. 处理数据
3. 返回数据

## Express框架 基本使用
1. 安装
```
npm install express --save

```
- 模块引用 从当前模块依次向上查询

### 服务器相关
- 服务器 1. 服务器就是一台电脑 2. 服务器软件 （appach tom cat iis nginx node); 3.服务IP和端口号 (默认 http: 80 https: 443)
- ip确定服务器主机位置 / 端口号确定服务器程序位置

- 局域网 服务器通过网线（无线）连接 每一个电脑都有一个IP / 外网

### api接口书写
- 接受数据
    - get req.query
    - post req.body 使用插件body-parser 和 multer
     + 注意数据格式 form-data / application/json / x-www-form-urlencoded 


### 中间件 middlewear
- 内容之中间件
- 第三方中间件
- 自定义中间件 (body-parser)拦截器
    - 中间件 一定要有next();

### 静态资源目录
- 指定一个目录 目录可以访问 apache (www)

## 非关系数据库 mongodb
- 安装 Mac os
    - https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x-tarball/#begin-using-mongodb

### 命令
    mongodb 数据库名
    mongod 命令行启动
    mongo  命令行操作数据库指令
    mongoose node操作mongodb插件

### nodemon 修改自动重启服务


