// viewsRoutes.js
const express = require('express');
const router = express.Router();

// Página principal
router.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

// Página de productos
router.get('/products', (req, res) => {
    res.render('products', { title: 'Products Page' });
});

// Página de contacto
router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

module.exports = router;
