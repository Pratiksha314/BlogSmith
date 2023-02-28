const nodemailer = require('nodemailer');
const UserModel = require('../models/user');

exports.sendOtp = async function (req, res) {

    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465 only
        auth: {
            user: process.env.USEREMAIL,
            pass: process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: '"Pratiksha"',
        to: req.body.username,
        subject: 'Verfication Mail from Outdoor Blogsmith!!',
        html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>"
    };

    UserModel.findOne({ username: req.body.username }).then(function (data) {
        if (data) {
            return res.status(400).json({
                msg: "User Already Registered!!",
                user: data,
                success: false,
            });
        }
        else {
            transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    res.json(err);
                } else {
                    res.json({ msg: "otp has been sent", otpSend: otp, success: true });
                }
            });
        }
    });
}