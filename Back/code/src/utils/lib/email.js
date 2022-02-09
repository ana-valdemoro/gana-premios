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
      user: '1d050c4c6a225e',
      pass: '63704b510f7d4f',
    },
  });
  return transporter.sendMail(mailOptions);
};

// Mail para activar cuenta

const sendActiveAccountEmail = async (email, token) => {
  const emailTemplateSource = fs.readFileSync(path.join(__dirname, '/active.hbs'), 'utf8');
  const template = Handlebars.compile(emailTemplateSource);
  const htmlToSend = template({ url: `${process.env.FRONT_BASE_URL}/account/${token}/activate` });

  const activeAccountMailOptions = {
    from: 'angela.chicano@agiliacenter.com', // sender address
    to: 'angela.chicano@agiliacenter.com', // list of receivers
    subject: 'Activar cuenta', // Subject line
    html: htmlToSend, // plain html body
  };

  return sendEmail(activeAccountMailOptions);
};

// Mail para desbloquear cuenta

const sendBlockedAccountEmail = async (email, token) => {
  const emailTemplateSource = fs.readFileSync(path.join(__dirname, '/blocked.hbs'), 'utf8');
  const template = Handlebars.compile(emailTemplateSource);
  const htmlToSend = template({ url: `${process.env.FRONT_BASE_URL}/active-account/${token}` });

  const blockedMailOptions = {
    from: 'angela.chicano@agiliacenter.com', // sender address
    to: email, // list of receivers
    subject: 'Desbloquear cuenta', // Subject line
    html: htmlToSend, // plain html body
  };

  return sendEmail(blockedMailOptions);
};

module.exports = {
  sendActiveAccountEmail,
  sendBlockedAccountEmail,
};
