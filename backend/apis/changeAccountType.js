const UserModel =  require('../models/user');

exports.changeAccountType = async function(req, res) {
    await UserModel.findOne({_id: req.params.userId}).then(
        function(data){
            if(data.accountType === 'private'){
                UserModel.updateOne({_id: req.params.userId},
                    {
                        $set:{
                            accountType : 'public'
                        }
                    }).then(
                        function(info){
                            res.json({
                                msg: 'account updated to public', success: true, info: info
                            })
                        }, function(err){
                            res.json({
                                msg: 'failed to updated to public', success: true, info: err
                            })
                        }
                    )
            }
            else {
                UserModel.updateOne({_id: req.params.userId},
                    {
                        $set:{
                            accountType : 'private'
                        }
                    }).then(
                        function(info){
                            res.json({
                                msg: 'account updated to private', success: true, info : info
                            })
                        },function(err){
                            res.json({
                                msg: 'failed to updated to private', success: true, info: err
                            })}
                    )            
                }
        }
    )
}