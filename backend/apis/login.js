const passport = require('passport');
const UserModel = require('../models/user');

exports.login = async function (req, res) {
    await UserModel.findOne({ username: req.body.username }).then(function (data) {
        if (data) {
            const userDetails = UserModel({
                username: req.body.username,
                password: req.body.password,
            });
            req.login(userDetails, function (err) {
                if (err) return res.json({
                    error: err,
                    success:false,
                    msg: ' Failed to Login'
                });
                else {
                    passport.authenticate("local")(req, res, function (){
                        return res.json({
                            msg: "Login Successfully!!",
                            success: true,
                        });
                    });
                }
            });
        }
        else res.json({msg: 'unable to login', success:false})
    },function(err){
        res.json(err);
    }
    );
}