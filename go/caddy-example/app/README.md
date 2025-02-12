# 静态资源嵌入到caddy中

编译静态资源到caddy中
注意：当前采用2.8.4版本编译后无法访问
 
```bash
xcaddy build  v2.7.6  --embed build:build
```

启动服务

```bash
./caddy run -c CaddyFile


# CaddyFile 文件内容

:80 {
	root * /build
	file_server {
		fs embedded
	}
}

```
