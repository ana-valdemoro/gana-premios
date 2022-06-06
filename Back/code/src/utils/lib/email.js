/* eslint-disable max-len */
const nodemailer = require('nodemailer');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const { getTranslation } = require('../getTranslation');
const { emailsFolder } = require('../../config/index');

const sendEmail = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: "b40fb0e055936b",
      pass: "f7c0ad3b2d9283"
    },
  });
  return transporter.sendMail(mailOptions);
};

// Mail para activar cuenta

const sendActiveAccountEmail = async (email, token, language) => {
  const route = path.join(emailsFolder, '/active.hbs');
  const emailTemplateSource = fs.readFileSync(route, 'utf8');
  const template = Handlebars.compile(emailTemplateSource);
  const title = getTranslation('activeMailTitle', language);
  const message = getTranslation('activeMailMessage', language);
  const buttonText = getTranslation('activeButtonText', language);
  const htmlToSend = template({
    url: `${process.env.FRONT_BASE_URL}/activate-account/${token}`,
    title,
    message,
    buttonText,
  });

  const activeAccountMailOptions = {
    from: 'angela.chicano@agiliacenter.com', // sender address
    to: email, // list of receivers
    subject: getTranslation('activeSubject', language), // Subject line
    html: htmlToSend, // plain html body
  };

  return sendEmail(activeAccountMailOptions);
};

// Mail para desbloquear cuenta

const sendBlockedAccountEmail = async (email, token, language) => {
  const route = path.join(emailsFolder, '/blocked.hbs');
  const emailTemplateSource = fs.readFileSync(route, 'utf8');
  const template = Handlebars.compile(emailTemplateSource);
  const title = getTranslation('unlockMailTitle', language);
  const message = getTranslation('unlockMailMessage', language);
  const buttonText = getTranslation('unlockButtonText', language);

  const htmlToSend = template({
    url: `${process.env.FRONT_BASE_URL}/unblock-account/${token}`,
    title,
    message,
    buttonText,
  });

  const blockedMailOptions = {
    from: 'angela.chicano@agiliacenter.com', // sender address
    to: email, // list of receivers
    subject: getTranslation('unlockSubject', language), // Subject line
    html: htmlToSend, // plain html body
  };

  return sendEmail(blockedMailOptions);
};

// Mail para recuperar tu contraseña

const sendRecoveryPasswordEmail = async (email, token, language) => {
  const route = path.join(emailsFolder, '/recoverPassword.hbs');
  const emailTemplateSource = fs.readFileSync(route, 'utf8');
  const template = Handlebars.compile(emailTemplateSource);
  const title = getTranslation('recoverMailTitle', language);
  const message = getTranslation('recoverMailMessage', language);
  const buttonText = getTranslation('recoverButtonText', language);
  const htmlToSend = template({
    url: `${process.env.FRONT_BASE_URL}/recover-password/${token}`,
    title,
    message,
    buttonText,
  });

  const recoveryPasswordMailOptions = {
    from: 'angela.chicano@agiliacenter.com', // sender address
    to: email, // list of receivers
    subject: getTranslation('recoverSubject', language), // Subject line
    html: htmlToSend, // plain html body
  };

  return sendEmail(recoveryPasswordMailOptions);
};

module.exports = {
  sendActiveAccountEmail,
  sendBlockedAccountEmail,
  sendRecoveryPasswordEmail,
};
