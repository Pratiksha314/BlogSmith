const { ObjectID } = require('bson');
const ComplaintModel = require('../models/complaint');


exports.setComplaint = async function(req, res) {
    const complaintData = ComplaintModel({
        username: req.body.username,
        message: {
            complaintId: ObjectID(),
            content: req.body.content
        }
    })
    await ComplaintModel.findOne({username:req.body.username}).then(function(data){
        if(data){
            ComplaintModel.collection.updateOne({username:req.body.username},
                {$addToSet: {message: {
                    complaintId: ObjectID(),
                    content: req.body.content
                }}}
                ).then(function(data){
                    res.json({
                        msg: 'complaint added', success: true, detail: data
                    });
                },function(err){
                    res.json({
                        msg: 'failed to add', success: false, error: err
                    });
                })
        }
        else {
            complaintData.save().then(function(data){
                res.json({
                    msg: 'Complaint added to database', success:true, detail: data
                });
            },
            function(err){
                res.json({
                    msg: 'Failed to add the complaint', success: false, err: err
                })
            }
            )
        }
    })
}

// to get all complaints made by user
exports.getAllComplaintsByUser = async function(req, res){
    ComplaintModel.findOne({username: req.body.username}, (err, data)=>{
        if(err || !data){
            return res.status(400).json({
                error: 'User does not exists!!',
                success: false,
                err: err
            });
        }
        else
        {
            return res.status(200).json({
                msg: "Complaints Fetched",
                success: true,
                user: data
            });
        }    })
}

exports.getAllComplaints = async (req,res) => {
    await ComplaintModel.find().then(function(data){
        res.json({
            msg: 'Successfully got complaints' , success: true, info: data
        });
    },function(err){
        res.json({
            msg: 'failed to get complaints', success: false, info: err
        });
    });
}