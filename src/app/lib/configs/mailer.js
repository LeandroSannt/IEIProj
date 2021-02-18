const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({

  service:'Hotmail',
  auth: {
    user: 'recsenha0000@hotmail.com',
    pass: 'Cearamor1@'
  },
  });
