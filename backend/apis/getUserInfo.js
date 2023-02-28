const UserModel = require('../models/user');

exports.getUserInfo = async (req,res) => {
   await UserModel.findOne({username:req.body.username},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: 'User does not exists!!',
                success: false,
                err: err
            });
        }
        else
        {
            return res.status(200).json({
                msg: "User Details Fetched",
                success: true,
                user: user
            });
        }
    });
}

exports.getAllUsersInfo = async (req,res) => {
    await UserModel.find().then(function(data){
        res.json({
            msg: "Successfully fetched all users details",
            success: true,
            detail: data
        })
    },function(err){
        res.json(
            {
                msg: "Failed to fetch users details",
                success: false,
            }
        )
    }
    );
}