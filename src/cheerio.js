const cheerio = require('cheerio');

let $ = cheerio.load('<div><h1>Hello cheerio</h1><h1>Hello kkkk</h1></div>');


$('h1').each((i, el) => {
    console.log($(el).html());
});
