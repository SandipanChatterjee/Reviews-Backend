const nodemailer = require("nodemailer");
const ErrorHandler = require("./middleware/errorhandler");

const nodeMailerHandler = async (user) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.GMAIL_EMAIL}`,
      pass: `${process.env.GMAIL_PASSWORD}`,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log("Error #", error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Reviews 👻" ${process.env.GMAIL_EMAIL}`, // sender address
    to: user.email, // list of receivers
    subject: user.subject, // Subject line
    text: user.message, // plain text body
  });
  return info;
};

module.exports = nodeMailerHandler;
