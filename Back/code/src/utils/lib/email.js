/* eslint-disable max-len */
const nodemailer = require('nodemailer');

const jwt = require('../middleware/jwt');

module.exports = async function sendEmail(email) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '1d050c4c6a225e',
      pass: '63704b510f7d4f',
    },
  });

  const token = jwt.generateJWT({
    email,
  });

  const mailOptions = {
    from: 'angela.chicano@agiliacenter.com', // sender address
    to: 'angela.chicano@agiliacenter.com', // list of receivers
    subject: 'Desbloquear cuenta', // Subject line
    /* html: `<p>Pulsa en este link para desbloquear tu cuenta</p>
    // eslint-disable-next-line max-len
    <a href="${process.env.FRONT_BASE_URL}/account/${token}/activate">Desbloquea tu cuenta</a>`, */ // plain html body
    html: `<h1>Desbloqueo de tu cuenta</h1>
    <p>Hola, tu cuenta ha sido bloqueda por haber superado el máximo de intentos en ingresar tu
      contraseña. Pulse en el siguiente enlace para desbloquearla.
    </p>
    <button style="color: #e84393"><a href="${process.env.FRONT_BASE_URL}/account/${token}/activate">Desbloquea tu cuenta</a></button>`, // plain html body
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
