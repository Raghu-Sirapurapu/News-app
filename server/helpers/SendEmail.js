const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const msg = {
      to,
      from: process.env.EMAIL_USER,
      subject,
      html,
    };
    await sgMail.send(msg);
  } catch (error) {
    console.error('SendGrid Error:', error.response ? error.response.body : error.message);
    throw error;
  }
}

module.exports = sendEmail;