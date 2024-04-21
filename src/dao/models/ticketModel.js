const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },  // Código único de ticket
  purchase_datetime: { type: Date, default: Date.now },  // Fecha y hora de la compra
  amount: { type: Number, required: true },  // Monto total de la compra
  purchaser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }  // Referencia al usuario que realizó la compra
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;