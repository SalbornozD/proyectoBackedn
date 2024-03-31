const cartsModel = require('../dao/models/cartsModel');
const productsModel = require('../dao/models/productsModel');

exports.createCart = async (req, res) => {
    try {
        const newCart = await cartsModel.create({ products: [] });
        res.status(201).send(newCart);
    } catch (error) {
        res.status(500).send({ message: 'Error creating cart' });
    }
};

exports.getCartById = async (req, res) => {
    try {
        const cart = await cartsModel.findById(req.params.cid).populate('products.product');
        if (!cart) {
            return res.status(404).send({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching cart' });
    }
};
