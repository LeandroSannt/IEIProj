const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "aaecb0067c9d1b",
      pass: "10e63e3c7531e0"
    }
  });
