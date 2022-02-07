/* eslint-disable max-len */
const nodemailer = require('nodemailer');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const sendEmail = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '3f03301b811fff',
      pass: 'fa6d7fe5be6fad',
    },
  });
  return transporter.sendMail(mailOptions);
};

const sendBlockedAccountEmail = async (email, token) => {
  const emailTemplateSource = fs.readFileSync(path.join(__dirname, '/blocked.hbs'), 'utf8');
  const template = Handlebars.compile(emailTemplateSource);
  const htmlToSend = template({ url: `${process.env.FRONT_BASE_URL}/account/${token}/activate` });

  const mailOptions = {
    from: 'angela.chicano@agiliacenter.com', // sender address
    to: email, // list of receivers
    subject: 'Desbloquear cuenta', // Subject line
    html: htmlToSend, // plain html body
  };

  return sendEmail(mailOptions);
};

module.exports = {
  sendBlockedAccountEmail,
};
