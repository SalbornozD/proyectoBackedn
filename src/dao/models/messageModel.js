const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: { type: String, required: true },  // Referencia al nombre de usuario
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }  // Fecha y hora del mensaje
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
