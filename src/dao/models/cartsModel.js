const Mongoose = require('mongoose');

const cartsCollection = "carts";

const cartsSchema = new Mongoose.Schema({
    products: []
});

const cartsModel = Mongoose.model(cartsCollection, cartsSchema);

module.exports = cartsModel;