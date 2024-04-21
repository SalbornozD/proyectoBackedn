const UserModel = require('./models/userModel');
const ProductModel = require('./models/productModel');
const MessageModel = require('./models/messageModel');
const CartModel = require('./models/cartsModel');
const TicketModel = require('./models/ticketModel');

class DAOFactory {
  static getModel(modelName) {
    switch (modelName) {
      case 'User':
        return UserModel;
      case 'Product':
        return ProductModel;
      case 'Message':
        return MessageModel;
      case 'Cart':
        return CartModel;
      case 'Ticket':
        return TicketModel;
      default:
        throw new Error(`No model found for model name: ${modelName}`);
    }
  }
}

module.exports = DAOFactory;