
"use strict";
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.126.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'dengyongchao@126.com', // generated ethereal user
        pass: 'waitME08.' // generated ethereal password
    }
});

let info = transporter.sendMail({
    from: '"Fred Foo 👻" <dengyongchao@126.com>', // sender address
    to: "dengyongchao@zdns.cn", // list of receivers
    subject: "2020", // Subject line
    text: "欢迎你的到来?", // plain text body
    html: "<b>Hello world?</b>" // html body
}, (err, data) => {
    console.log(err, data);
});
