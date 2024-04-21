const Cart = require('../dao/models/cartsModel');

exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) {
      return res.status(404).send({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.createCart = async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    await newCart.save();
    res.status(201).send(newCart);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.addProductToCart = async (req, res) => {
  // Implementation for adding product to cart
};

exports.removeProductFromCart = async (req, res) => {
  // Implementation for removing product from cart
};
