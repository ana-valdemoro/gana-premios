// const m = require('sendinblue');

const nodemailer = require('nodemailer');
const jwt = require('../middleware/jwt');

module.exports =  async function sendEmail (email) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'angela.chicano@agiliacenter.com', // generated gmail user
      pass: 'tfmruqvjmxvrlggo', // generated gmail password
    },
  });
  
     const token = jwt.generateJWT({
      email
     });
   
    
  const mailOptions = {
    from: 'angela.chicano@agiliacenter.com', // sender address
    to: "chicano.cano@gmail", // list of receivers
    subject: 'Desbloquear cuenta', // Subject line
    html: `<p>Pulsa en este link para desbloquear tu cuenta</p>
    <a href="http://localhost:9000/api/v1/unlock-account/${token}">Desbloquea tu cuenta</a>`, // plain html body
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    console.log('entroo en sendMail');
    if (error) {
       throw new Error (error)
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    return true
  });
};


/* module.exports = {
  sendEmail,
}; 
  */