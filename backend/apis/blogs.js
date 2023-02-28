const BlogModel = require('../models/blog');
const UserModel = require('../models/user');
const { ObjectID } = require('bson');

exports.addBlog = async function (req, res) {
    const blogData = new BlogModel({
        title: req.body.title,
        description: req.body.description,
        img: req.body.img
    });

    await blogData.save().then(function (details) {
        res.json({
            msg: 'blog has been added', success: true, info: details
        });

        UserModel.findOne({ username: req.body.username }).then(
            function (data) {
                if (data) {
                    UserModel.collection.updateOne({ username: req.body.username },
                        {
                            $addToSet: {
                                blogsIds: details._id
                            }
                        }
                    )
                }
                else {
                    res.json({
                        msg: 'Blog not add', success: false
                    })
                }
            }
        )

    }, function (err) {
        res.json({
            msg: 'failed to add blog', success: false, error: err
        });
    }
    );
}

exports.deleteBlog = async function (req, res) {
    await UserModel.updateOne({ username: req.params.username }, {
        $pull: {
            blogsIds: ObjectID(req.params.blogId)
        }
    }).then(function (datas) {
        res.json({ msg: 'removed from user db', success: true, info: datas });
        BlogModel.deleteOne({ _id: req.params.blogId }).then(
            function (data) {
                res.json({
                    msg: 'blog deleted', success: true, info: data
                });
            },
            function (err) {
                res.json({
                    msg: 'failed to delete the blog', success: false, err: err
                });
            }
        )
    })
}

exports.editBlog = async function (req, res) {
    await BlogModel.updateOne({ _id: req.params.blogId },
        {
            $set: {
                title: req.body.title,
                description: req.body.description,
                img: req.body.img
            }
        }).then(function (data) {
            res.json({
                msg: 'edit done', success: true
            });
        }, function (err) {
            res.json({
                msg: 'failed to edit', success: false
            });
        }
        );
}

exports.getBlog = async function (req, res) {
    await BlogModel.findOne({ _id: req.params.blogId }).then(
        function (data) {
            res.json({
                msg: 'Fetch done !!', success: true, blog: data
            });
        }, function (error) {
            res.json({
                msg: 'Failed to Fetch!!', success: false, err: error
            });
        });
}    