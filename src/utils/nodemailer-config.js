const nodemailer = require("nodemailer");
   
   let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "cfarriolhpecds@gmail.com", // generated ethereal user
          pass: process.env.NODEMAILER_PASS, // generated ethereal password
        },
      });

module.exports = {
    transporter
}