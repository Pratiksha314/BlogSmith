const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: {type: String},
    description: {type: String},
    img: {type: String}
});

const BlogModel = mongoose.model('Blog', BlogSchema);
module.exports = BlogModel;