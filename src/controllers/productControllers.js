const productsModel = require('../dao/models/productsModel');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productsModel.find();
        res.json({ products });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching products' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productsModel.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.json({ product });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching product' });
    }
};