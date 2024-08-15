const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: false },  // Null for private messages
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }//Null for room messages,

})
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;