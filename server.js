const express = require('express');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();
const app = express();
const port = 3001;

app.use(express.json());

app.post('/email',(req, res)=>{
    let config = {
        service: 'gmail', // your email domain
        auth: {
            user: "ashrafpeng@gmail.com",   // your email address
            pass: "xnbi rpsg mqam hcgm" // your password
        }
    }
    let transporter = nodemailer.createTransport(config);

    let messagetoUser = {
        from: 'ashrafpeng@gmail.com', // sender address
        to: [req.body.email,'ashrafpeng@gmail.com'], // list of receivers
        subject: 'Thank u for connecting !!', // Subject line
        html: `<b>Hello ${req.body.name}</b> <br/> <span>We will reach you soon !!</span> </br> <p> Thanks </p>`, // html body
    };
    let messagetoMyself = {
        from: 'ashrafpeng@gmail.com', // sender address
        to: ['ashrafpeng@gmail.com'], // list of receivers
        subject: 'New client connection', // Subject line
        html: `<b>Name: ${req.body.name}</b> <br/><b>Email: ${req.body.email}</b> <br/> <b>Contact: ${req.body.contact}</b> <br/><b>Message: ${req.body.message}</b> <br/>` , // html body
    };


    transporter.sendMail(messagetoUser).then((info) => {
        return res.status(201).json(
            {
                msg: "Email sent",
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            }
        )
    }).catch((err) => {
        return res.status(500).json({ msg: err });
    }
    );
    transporter.sendMail(messagetoMyself).then((info) => {
        return res.status(201).json(
            {
                msg: "Email sented myself",
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            }
        )
    }).catch((err) => {
        return res.status(500).json({ msg: err });
    }
    );
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    }
);