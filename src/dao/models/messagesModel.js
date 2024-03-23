const Mongoose = require('mongoose');

const messagesCollection = "messages";

const messagesSchema = new Mongoose.Schema({
    user:String,
    message:String
});

const messagesModel = Mongoose.model(messagesCollection, messagesSchema);

module.exports = messagesModel;