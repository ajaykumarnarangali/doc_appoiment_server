function otpTemplate(otp) {
    return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>🔐 Email Verification</h2>
      <p>Thank you for signing up! Please use the OTP below to verify your email address:</p>
      
      <div style="font-size: 24px; font-weight: bold; margin: 20px 0; padding: 10px; background: #f3f3f3; width: fit-content;">
        ${otp}
      </div>
      
      <p>This OTP is valid for <strong>5 minutes</strong>. If you did not request this, please ignore this email.</p>
      
      <p style="margin-top: 30px;">Best regards,<br/>Your App Team</p>
    </div>
  `;
}

module.exports = otpTemplate;
