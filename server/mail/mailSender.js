//const config = require('config');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

module.exports = async function(miner) {
  const filePath = path.join(__dirname, './mailTemplate.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const htmlToSend = template(miner);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
      // ENV CONFIG
      user: process.env.email,
      pass: process.env.pw
    }
  });

  let sendMailTo = ['max.helmersson@gmail.com'];

  const mailOptions = {
    from: '"MineTrace" mine.trace256@gmail.com',
    to: sendMailTo,
    subject: `New Helium Reward!`,
    html: htmlToSend
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", "https://mailtrap.io/inboxes/test/messages/");
}