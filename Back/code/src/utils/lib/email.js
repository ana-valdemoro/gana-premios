const nodemailer = require('nodemailer');
const jwt = require('../middleware/jwt');

module.exports = async function sendEmail(email) {
  const url = "http://localhost:9000/api/v1/";
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '3f03301b811fff',
      pass: 'fa6d7fe5be6fad',
    },
  });

  const token = jwt.generateJWT({
    email,
  });

  const mailOptions = {
    from: 'ana.valdemoro@agiliacenter.com', // sender address
    to: 'ana.valdemoro@agiliacenter.com', // list of receivers
    subject: 'Desbloquear cuenta', // Subject line
    html: `<p>Pulsa en este link para desbloquear tu cuenta</p>
    <a href="${process.env.FRONT_BASE_URL}/account/${token}/activate">Desbloquea tu cuenta</a>`, // plain html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log('entroo en sendMail');
    if (error) {
      throw new Error(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    return true;
  });
};

/* module.exports = {
  sendEmail,
};
  */
