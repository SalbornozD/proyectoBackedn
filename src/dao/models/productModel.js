const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Nombre o titulo del producto.
  description: { type: String, required: true }, //Descripcion del producto
  price: { type: Number, required: true }, // Precio del producto
  thumbnail: { type: String, required: true },  // URL de la imagen del producto
  code: { type: String, required: true, unique: true },  // Código único del producto
  stock: { type: Number, required: true }  // Cantidad en inventario
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
