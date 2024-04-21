const express = require('express');
const productController = require('../controllers/productControllers');
const router = express.Router();

// Obtener todos los productos
router.get('/', productController.getAllProducts);

// Obtener un producto específico por ID
router.get('/:productId', productController.getProductById);

// Crear un nuevo producto
router.post('/', productController.createProduct);

// Actualizar un producto existente
router.put('/:productId', productController.updateProduct);

// Eliminar un producto
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
