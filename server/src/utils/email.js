import nodemailer from 'nodemailer';

/**
 * Create email transporter
 * Uses Gmail SMTP by default, but can be configured for other services
 */
function createTransporter() {
  // For Gmail, you need to use an App Password, not your regular password
  // Get it from: Google Account → Security → 2-Step Verification → App passwords
  const emailConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || process.env.EMAIL_FROM,
      pass: process.env.SMTP_PASS || process.env.EMAIL_PASSWORD
    }
  };

  // If no email credentials, return null (email sending will be skipped)
  if (!emailConfig.auth.user || !emailConfig.auth.pass) {
    console.warn('⚠️  Email credentials not configured. Email sending will be disabled.');
    return null;
  }

  return nodemailer.createTransport(emailConfig);
}

/**
 * Send download links email to customer
 */
export async function sendDownloadEmail(email, orderDetails) {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.log('📧 Email sending skipped (not configured)');
      return { success: false, reason: 'Email not configured' };
    }

    const fromEmail = process.env.EMAIL_FROM || process.env.SMTP_USER;
    if (!fromEmail) {
      console.warn('⚠️  EMAIL_FROM not set');
      return { success: false, reason: 'EMAIL_FROM not configured' };
    }

    const downloadLinks = orderDetails.downloads.map((d, idx) => 
      `${idx + 1}. ${d.title}\n   Download: ${d.url}\n`
    ).join('\n');

    const expiresAt = orderDetails.expiresAt 
      ? new Date(orderDetails.expiresAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      : '15 minutes from now';

    const mailOptions = {
      from: `"stackflow.dev" <${fromEmail}>`,
      to: email,
      subject: `Your Download Links - Order Confirmation`,
      text: `Thank you for your purchase!

Your order has been confirmed. Here are your download links:

${downloadLinks}

⚠️  Important: These links expire at ${expiresAt}. Please download your files before then.

If you have any questions, please contact us at stackflowdotdev@gmail.com

Best regards,
stackflow.dev Team`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #22d3ee 0%, #10b981 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .download-item { background: white; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #22d3ee; }
            .download-link { display: inline-block; background: #22d3ee; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin-top: 10px; }
            .warning { background: #fef3c7; border: 1px solid #fbbf24; padding: 15px; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Order Confirmed! 🎉</h1>
            </div>
            <div class="content">
              <p>Thank you for your purchase!</p>
              <p>Your order has been confirmed. Here are your download links:</p>
              
              ${orderDetails.downloads.map((d, idx) => `
                <div class="download-item">
                  <strong>${idx + 1}. ${d.title}</strong><br>
                  <a href="${d.url}" class="download-link">Download PDF</a>
                </div>
              `).join('')}
              
              <div class="warning">
                <strong>⚠️ Important:</strong> These links expire at <strong>${expiresAt}</strong>. Please download your files before then.
              </div>
              
              <p>If you have any questions, please contact us at <a href="mailto:stackflowdotdev@gmail.com">stackflowdotdev@gmail.com</a></p>
            </div>
            <div class="footer">
              <p>Best regards,<br>stackflow.dev Team</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error: error.message };
  }
}


