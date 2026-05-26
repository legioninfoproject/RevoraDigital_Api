// // // const nodemailer = require("nodemailer");
// const mailHelper = new Object();


// // mailHelper.revoraMail = async (email,cc, subject,payload) => {
// //   let config = {
// //     service: "gmail",
// //     auth: {
// //       user: process?.env?.SENDER_EMAIL ? process.env.SENDER_EMAIL : 'legioninfoproject@gmail.com',
// //       pass: process?.env?.SENDER_EMAIL_PASSWORD ? process.env.SENDER_EMAIL_PASSWORD : 'wync hrtn ehpb ffnw',
// //     }
// //   }
// //  let transporter = nodemailer.createTransport(config);

// //   let html = `
// //     <h2>Revora Digital Form</h2>

// //     ${Object.entries(payload)
// //       .map(([key, value]) => `<p><b>${key}</b>: ${value}</p>`)
// //       .join("")}
// //   `;

// //   let message = {
// //     from: process.env.SENDER_EMAIL || "legioninfoproject@gmail.com",
// //     to: email,
// //     cc: cc || "",
// //     subject: subject,
// //     html: html,
// //   };
// //   try {
// //     let info = await transporter.sendMail(message);
// //     console.log("Success", info);
// //     return { success: true, info };
// //   } catch (err) {
// //     console.log("Failed", err);
// //     return { success: false, error: err };
// //   }
// // }


const https = require('https');
const mailHelper = new Object();

mailHelper.revoraMail = async (email, cc, subject, payload) => {
    try {
        let html = `
            <h2>Revora Digital Form</h2>
            ${Object.entries(payload)
                .map(([key, value]) => `<p><b>${key}</b>: ${value}</p>`)
                .join("")}
        `;

        const body = JSON.stringify({
            sender: { name: 'Revora Digital', email: 'legioninfoproject@gmail.com' },
            to: [{ email: email }],
            subject: subject,
            htmlContent: html
        });

        const result = await new Promise((resolve, reject) => {
            const options = {
                hostname: 'api.brevo.com',
                path: '/v3/smtp/email',
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'api-key': "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"
                }
            };

            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve({ 
                    statusCode: res.statusCode, 
                    body: JSON.parse(data) 
                }));
            });

            req.on('error', reject);
            req.write(body);
            req.end();
        });

        if (result.statusCode === 201) {
            console.log("Mail sent:", result.body);
            return { success: true, info: result.body };
        } else {
            console.log("Mail failed:", result.body);
            return { success: false, error: result.body };
        }

    } catch (err) {
        console.log("Mail error:", err);
        return { success: false, error: err };
    }
}

module.exports = mailHelper;