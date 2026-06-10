// send_notification.js
// Run with: node send_notification.js
// Requires: npm install nodemailer (already done)
// Set env vars: export EMAIL_USER=your@gmail.com && export EMAIL_PASS=your-app-password

const nodemailer = require('nodemailer');

const repoUrl = 'https://github.com/2KTay/dsa-adventure';

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.log('\n========================================');
  console.log('📦 DSA Adventure App is ready!');
  console.log('========================================');
  console.log('Repo URL:', repoUrl);
  console.log('\nTo run locally:');
  console.log('  git clone', repoUrl);
  console.log('  cd dsa-adventure');
  console.log('  npm install');
  console.log('  npx expo start');
  console.log('\nTo send the email automatically:');
  console.log('  export EMAIL_USER=your@gmail.com');
  console.log('  export EMAIL_PASS=your-gmail-app-password');
  console.log('  node send_notification.js');
  console.log('\nGmail App Password: myaccount.google.com → Security → 2FA → App Passwords');
  console.log('========================================\n');
  process.exit(0);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'taemoorhasan@gmail.com',
  subject: 'DSA Adventure App is Ready!',
  html: `
    <h2>Your DSA Adventure app is live on GitHub!</h2>
    <p><strong>Repo:</strong> <a href="${repoUrl}">${repoUrl}</a></p>
    <h3>To run it locally:</h3>
    <pre>
git clone ${repoUrl}
cd dsa-adventure
npm install
npx expo start
    </pre>
    <h3>To build the mobile app:</h3>
    <pre>
# Android APK
npx eas build --platform android

# iOS
npx eas build --platform ios

# Or scan the QR code from expo start with the Expo Go app
    </pre>
    <p>All 17 DSA topics, visualizations, and LeetCode questions are included.</p>
    <hr>
    <p style="color:#666; font-size:12px;">Sent automatically after GitHub push.</p>
  `,
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error('Email failed:', err.message);
    console.log('\nRepo is still live at:', repoUrl);
  } else {
    console.log('Email sent to taemoorhasan@gmail.com');
    console.log('Message ID:', info.messageId);
    console.log('Repo:', repoUrl);
  }
});
