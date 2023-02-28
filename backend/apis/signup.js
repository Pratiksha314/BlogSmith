const UserModel = require('../models/user');
const nodemailer = require('nodemailer');

exports.signup = async function(req, res){
    await UserModel.findOne({$or: [{username : req.body.username}, {profileName: req.body.profileName}]})
    .then(function(data){
        if(data){
                res.status(400).json({
                    msg: 'User is already registered.',
                    success: false,
                    user: data
                });
        }
        else {
            UserModel.register({profileName: req.body.profileName, username: req.body.username}, req.body.password, function(err,user){
                if(err){
                    res.status(400).json({
                        success: false,
                        msg: 'Your account could not be registerd.',
                        err,
                    });
                }
                else 
                { 
                     res.status(200).json({
                        msg: 'User Registered!!', success: true,
                        user,
                    });
                }            
            });
        }
    });
}

exports.thankMail = async function (req,res) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.USEREMAIL,
            pass: process.env.PASSWORD
        }
    });
    // console.log(user);
    let mailOptions = {
        from: '"Bangtan Blog"', // sender address
        to: req.body.username, // list of receivers
        subject: "Account Registration", // Subject line
        html: `<h1>Hi ${req.body.profileName}</h1><br>
        <h2>Thank you for registering in Outdoor Blogsmith website !!</h2><br>`
    };

    // send mail with defined transport object

    UserModel.findOne({username:req.body.username}).then(function(data){
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                res.json({msg: "mail failed to send"});
            } else {
                res.json({ msg: "mail sent",  });
            }
        });
    },function(err) {
        res.json({
            msg: "mail failed to send", success: false
        });
    }
    );
}