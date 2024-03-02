// userRoutes.js
const express = require('express');
const router = express.Router();
const userService = require('../../services/users/userService');
const User= require('../../models/users/userModel')
const { registerValidation, loginValidation } = require('../../utils/validation');
const verifyToken = require('../../middleware/verifyToken')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const otpGenerator = require('otp-generator');
const accountSid = 'AC234b868549dfc69c929cf5f6468c3b25';
const authToken = '345e28ecdaadb2ba3f84b2e2ea7ba18e';
const client = new twilio(accountSid, authToken);
const config = require('../../config/config')
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  console.log(userService)
  const userData = req.body;
  const { phone_number } = req.body;
  const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false }); 
  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: '+14247813410',
      to: phone_number
  });
    const user = await userService.registerUser(userData, otp);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { error } = loginValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
 
  try {
    const { phone_number, Password } = req.body;
 
    const result = await userService.loginUser(phone_number, Password);
    console.log(result)
    res.status(200).json({ message: 'Verify your phone number to proceed further'});
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get('/allUsers',  async (req, res) => {
  try {
    const allUsers = await User.getAllUsers(); 
    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});



// Initialize Twilio client




// Generate and send OTP
router.post('/send-otp', async (req, res) => {
    const { phone_number } = req.body;
    const OTP = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
    try {
        await client.messages.create({
            body: `Your OTP is ${OTP}`,
            from: '+14247813410',
            to: phone_number
        });
        res.status(200).json({  message: 'OTP Generated successful'});
        await userService.updateOtp(phone_number, OTP)
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error sending OTP' });
    }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
    const { phone_number, enteredOtp } = req.body;
      try {
        const result = await userService.loginUserWithOtp(phone_number, enteredOtp);
        console.log(result)
        res.status(200).json({ message: 'Login successful', token: result.token, user: result.user });
      } catch (error) {
        res.status(401).json({ error: error.message });
      }
    
});



router.post('/forgot-password', async (req, res) => {
    try {
        const { phone_number } = req.body;
        const user = await User.getUserByPhoneNumber(phone_number);

        if (!user) {
            return res.status(404).json({ error: 'Phone number not found' });
        }

        // Generate reset token
        const resetToken = jwt.sign({ phone_number }, config.jwt_secret_key, { expiresIn: '1h' });

        // Send SMS with reset link
        // const smsMessage = `Reset your password: http://localhost:3000/reset-password/${phone_number}/${resetToken}`;
        // await client.messages.create({
        //     body: smsMessage,
        //     from: '+14247813410',
        //     to: phone_number
        // });

        res.status(200).json({ message: 'Reset token generated successfully', resetToken });
    } catch (error) {
        console.error('Error during forgot password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Reset Password: Validate reset token and update password
router.post('/reset-password', async (req, res) => {
    try {
        const { phone_number, resetToken, Password } = req.body;
        const user = await User.getUserByPhoneNumber(phone_number);

        if (!user) {
            return res.status(404).json({ error: 'Phone number not found' });
        }
        // Verify reset token
        jwt.verify(resetToken, config.jwt_secret_key, async (err, decoded) => {
          console.log(decoded)
            if (err) {
                return res.status(401).json({ error: 'Invalid or expired reset token' });
            }

            // Update user's password
            const hashedPassword = await bcrypt.hash(Password, 10);
            await User.updatePassword(phone_number, hashedPassword);

            res.status(200).json({ message: 'Password reset successful' });
        });
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// // Forgot Password: Generate and send reset token
// router.post('/forgot-password', async (req, res) => {
//   // const { error } = forgotPasswordValidation.validate(req.body);
//   // if (error) {
//   //   return res.status(400).json({ error: error.details[0].message });
//   // }

//   try {
//     const { phone_number } = req.body;
//     const user = await userService.getUserByPhoneNumber(phone_number);

//     if (!user) {
//       return res.status(404).json({ error: 'Phone number not found' });
//     }

//     // Generate reset token
//     const resetToken = jwt.sign({ phone_number }, config.jwt_secret_key, { expiresIn: '1h' });
//     res.status(200).json({ message: 'Reset token generated and sent successfully', resetToken });
//     var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'pythonopq77@gmail.com',
//         pass: 'yourpassword'
//       }
//     });
    
//     var mailOptions = {
//       from: 'pythonopq77@gmail.com',
//       to: 'bharathkumarreddy142@gmail.com',
//       subject: 'Reset your password',
//       text: `http://localhost:8000/reset-password/${user.phone_number}/${resetToken}`
//     };
    
//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         return res.send({Status: "Success"})
//       }
//     });
    
//   } catch (error) {
//     console.error('Error during forgot password:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Reset Password: Validate reset token and update password
// router.post('/reset-password', async (req, res) => {
//   // const { error } = resetPasswordValidation.validate(req.body);
//   if (error) {
//     return res.status(400).json({ error: error.details[0].message });
//   }

//   try {
//     const { phone_number, resetToken, newPassword } = req.body;

//     // Verify reset token
//     jwt.verify(resetToken, config.jwt_secret_key, async (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ error: 'Invalid or expired reset token' });
//       }

//       // Update user's password
//       const hashedPassword = await bcrypt.hash(newPassword, 10);
//       await User.updatePassword(phone_number, hashedPassword);

//       res.status(200).json({ message: 'Password reset successful' });
//     });
//   } catch (error) {
//     console.error('Error during password reset:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


module.exports = router;
