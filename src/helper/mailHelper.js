const nodemailer = require("nodemailer");
const mailHelper = new Object();

mailHelper.revoraMail = async (email,cc, subject,payload) => {
  let config = {
    service: "gmail",
    auth: {
      user: process?.env?.SENDER_EMAIL ? process.env.SENDER_EMAIL : 'legioninfoproject@gmail.com',
      pass: process?.env?.SENDER_EMAIL_PASSWORD ? process.env.SENDER_EMAIL_PASSWORD : 'wync hrtn ehpb ffnw',
    }
  }
 let transporter = nodemailer.createTransport(config);

  let html = `
    <h2>Revora Digital Form</h2>

    ${Object.entries(payload)
      .map(([key, value]) => `<p><b>${key}</b>: ${value}</p>`)
      .join("")}
  `;

  let message = {
    from: process.env.SENDER_EMAIL || "legioninfoproject@gmail.com",
    to: email,
    cc: cc || "",
    subject: subject,
    html: html,
  };
  try {
    let info = await transporter.sendMail(message);
    console.log("Success", info);
    return { success: true, info };
  } catch (err) {
    console.log("Failed", err);
    return { success: false, error: err };
  }
}

module.exports = mailHelper