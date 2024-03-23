const { Router } = require("express");
const cartsModel = require("../dao/models/cartsModel");
const productsModel = require('../dao/models/productsModel');

const router = Router();

// POST api/carts/
router.post('/', async (req, res) => {
    try {
        let result = await cartsModel.create({products: []});
        res.send({status: "success", payload: result});
    } catch (error) {
        console.log("Error en la creacion del carrito ", error)
    }
});

// GET api/carts/:cid
router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartsModel.findById(req.params.cid);
        const result = cart.products.map(async (item) => {
            let product = await productsModel.findById(item._id);
            return product;
        })

        const products = await Promise.all(result);

        res.json({ok: true, message: "Carrito encontrado", productos: products});
    } catch (error) {
        console.log("Error al obtener el carrito ")
    }
})

// POST api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cart = await cartsModel.findById(req.params.cid);
        let product = cart.products.find((product) => product._id == req.params.pid)
        if(!product){
            cart.products.push({
                _id: req.params.pid,
                quantity: 1
            });
        } else {
            product.quantity++;
        }        
        let result = await cartsModel.updateOne({_id: req.params.cid}, cart);
        res.send({status: "success", payload: result});
    } catch (error) {
        console.log("Error al ingresar el producto en el carrito", error)
    }
});



module.exports = router;