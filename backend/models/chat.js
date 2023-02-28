const mongoose = require('mongoose')

const ChatSchema = mongoose.Schema({
    chatRoomId : [String],
    conversation : [{
        name : {type: String},
        message: {type: String},
    }]
},       
 {timestamps: true}
);

const ChatModel = mongoose.model('chatRoom', ChatSchema);
module.exports = ChatModel;