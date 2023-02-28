const mongoose = require('mongoose');
const  ObjectID = require('mongodb').ObjectId;

const ComplaintSchema = mongoose.Schema({
    username: {type: String, required: true},
    message: [{
        complaintId: {type:ObjectID},
        content: {type: String}
    }]
});

const ComplaintModel = mongoose.model('complaint', ComplaintSchema);

module.exports = ComplaintModel;