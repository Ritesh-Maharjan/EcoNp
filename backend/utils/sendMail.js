const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: process.env.SMPT_SERVICE, // true for 465, false for other ports
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  // send mail with defined transport object
  const mailOptions = {
    from: process.env.SMPT_MAIL, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail