const Mongoose = require('mongoose');

const productsCollection = "products";

const productsSchema = new Mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail:[{url: String}],
    code: {
        type: String,
        unique: true
    },
    stock: Number
});

const productsModel = Mongoose.model(productsCollection, productsSchema);

module.exports = productsModel;