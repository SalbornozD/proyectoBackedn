const { Router } = require("express");
const productsModel = require('../dao/models/productsModel');

const router = Router();

// PAGINA PRINCIPAL
router.get('/', async (req, res) => {
    try {
        const products = await productsModel.find().lean();
        let data = {
            products: products,
            style: "style.css"
        };
        res.render('home', data);
    } catch (error) {
        console.log("Error - ", error);
        res.status(500).send("Error interno del servidor");
    }
});

// Vista para productos en tiempo real
router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productsModel.find().lean();
        let data = {
            products: products,
            style: "style.css"
        };

        res.render('realTimeProducts', data)
    } catch (error) {

        console.log("Error - ", error);
        res.status(500).send("Error interno del servidor");
    }
});

router.get('/chat', async(req, res) => {
    try {
        res.render('chat', {})
    } catch (error) {
        console.log(error);       
    }
})

module.exports = router;