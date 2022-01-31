// const m = require('sendinblue');

const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
  console.log('entroooooo');
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'angela.chicano@agiliacenter.com', // generated gmail user
      pass: 'tfmruqvjmxvrlggo', // generated gmail password
    },
  });
  const mailOptions = {
    from: 'angela.chicano@agiliacenter.com', // sender address
    to: req.body.to, // list of receivers
    subject: 'Desbloquear cuenta', // Subject line
    text: 'Pulsa en este link para desbloquear tu cuenta', // plain text body
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    console.log('entroo yaaaa');
    if (error) {
      res.sendStatus(500);
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.sendStatus(200);
  });
};
/* transporter.verify().then(() => {
    console.log('Ready for send emails');
  }); */

/* const sendEmail = async (data) => {
  console.log(data);
};

const sendForgotPassword = async (user, token) => {
  const url = `${process.env.FRONT_BASE_URL}/account/${token}`;

  const data = {
    params: {
      BOILERPLATE_USERNAME: user.name,
      BOILERPLATE_URL: url,
    },
    subject: 'Petición de restablecimiento de la contraseña',
    to: [
      {
        email: user.email,
        name: user.name,
      },
    ],
    templateId: 12,
  };

  return sendEmail(data);
}; */

module.exports = {
  sendEmail,
  //  sendForgotPassword,
};
