

const http = require('http');
const fs = require('fs');
const cheerio = require('cheerio');

let url = 'http://www.baidu.com';
 
http.get(url, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];
    let err = null;
    if (statusCode !== 200) {
        err = new Error('请求状态错误');
    } else if (!/^text\/html/.test(contentType)){
        err = new Error('请求类型错误');
    }
    if (err) {
        console.log(err);
        res.resume(); // 重置缓存
        return false;
    }
    let rawData = '';
    res.on('data', (chunk) => {
        rawData = rawData + chunk.toString('utf8');
    })
    res.on('end', () => {
        // fs.writeFileSync('./index.html', rawData);  //保存到html
        const $ = cheerio.load(rawData);
        const srcs = [];
        $('img').map((i, el) => {
            // console.log($(el).attr('src'));
            // srcs.push($(el).attr('src'));
            let url = $(el).attr('src');
            if (/^(\/\/)/.test(url)) {
                url = `http:${url}`;
            }
            const imageName = url.split('/').reverse()[0];
            console.log(`PrintImage url ${url}`);
            console.log(`PrintImage name ${imageName}`);
            if (!fs.existsSync('downloadImage')) {
                console.log('mkdir File downloadImage');
                fs.mkdirSync('./downloadImage');
            }
            http.get(url, (req) => {
                let imageData = '';
                req.setEncoding('binary');
                req.on('data', (chunk) => {
                    imageData+=chunk;
                });
                req.on('end', () => {
                    fs.writeFile(`downloadImage/${imageName}`, imageData, 'binary', (err) => {
                        if(!err) { console.log('保存成功呀')}
                    })
                });
            });
        });
        

    })
}).on('error', (e) => {
    console.log(`数据传输错误${e.message}`);
})