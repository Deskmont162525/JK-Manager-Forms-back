"use strict";
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

async function sendConfirmationEmail(user) {
  const templatePath = path.join(__dirname, "../templates/confirmacionFOET.html");
  const template = fs.readFileSync(templatePath, "utf-8");
  const confirmationLink = `${process.env.URL_APLICATIVO_DEV}/${user?._id}`;
  const html = template.replace("{{confirmationLink}}", confirmationLink);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SEND_EMAIL,
      pass: process.env.PASS_SEND_EMAIL,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.SEND_EMAIL,
    to: user?.correo,
    subject: "Foet ✔",
    html: html,
    attachments: [{
      filename: "bg-plantilla-email-user.jpg",
      path: path.join(__dirname, "../templates/assets/images/bg-plantilla-email-user.jpg"),
      cid: "image1@foet.com",
      contentDisposition: "inline",
      contentType: "image/jpg"
    }],
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

async function sendConfirmationEmailAdmin(user) {
  const templatePath = path.join(__dirname, "../templates/confirmacionADMIN.html");
  const template = fs.readFileSync(templatePath, "utf-8");
  const confirmationLink = `${process.env.URL_APLICATIVO_LOGIN}`;
  const html = template.replace("{{confirmationLink}}", confirmationLink).replace("{{userName}}", user.username);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SEND_EMAIL,
      pass: process.env.PASS_SEND_EMAIL,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.SEND_EMAIL,
    to: process.env.EMAIL_COMPANY,
    cc: process.env.EMAIL_COMPANY_CC,
    subject: "JK-Manager-Forms ✔",
    html: html,
    attachments: [{
      filename: "bg-correo-admin.png",
      path: path.join(__dirname, "../templates/assets/images/bg-correo-admin.png"),
      cid: "image1@admin.com",
      contentDisposition: "inline",
      contentType: "image/png"
    }],
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}




module.exports = { sendConfirmationEmail, sendConfirmationEmailAdmin };


