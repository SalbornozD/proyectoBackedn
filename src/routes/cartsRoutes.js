const express = require('express');
const cartsController = require('../controllers/cartsControllers');
const router = express.Router();

// Obtener todos los carritos
router.get('/', cartsController.getAllCarts);

// Obtener un carrito específico por ID
router.get('/:cartId', cartsController.getCartById);

// Crear un nuevo carrito
router.post('/', cartsController.createCart);

// Añadir un producto al carrito
router.post('/:cartId/products', cartsController.addProductToCart);

// Eliminar un producto del carrito
router.delete('/:cartId/products/:productId', cartsController.removeProductFromCart);

module.exports = router;
