const { Router } = require("express");
const productsModel = require('../dao/models/productsModel');

const router = Router()

// GET api/products/
router.get('/', async (req, res) => {
    try {
        const products = await productsModel.find();
        const limit = req.query.limit;

        if(!limit || limit < 0) return res.json({
            ok: true,
            products: products
        });
        res.json({
            ok: true,
            products: products.slice(undefined, limit)
        });
    } catch(error) {
        console.error("Error en la obtencion de los productos: ", error);
    };
});

//GET api/products/:id
router.get('/:id', async (req, res) => {
    try {
        const product = await productsModel.findById(req.params.id);
        if(!product) return res.status(400).json({
            ok: true,
            message: `No existe el producto con el id ${req.params.id}`
        });
        res.json({
            ok: true,
            product: product
        });
    } catch (error) {
        console.log("Error al obtener el prodcuto");
    }
});

// POST api/products/
router.post('/', async (req, res) => {
    try{
        let {title, description, price, thumbnail, code, stock} = req.body;
        if (!title || !description || !price || !thumbnail || !code || !stock) return res.send({status: "error", error: "Incomplete values"});
        let result = await productsModel.create({
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        });
        res.send({status: "success", payload: result});

    } catch(error){
        console.log(error)
    }
})

// PUT api/products/:id

router.put('/:id', async (req, res) => {
    try {
        let {title, description, price, thumbnail, code, stock} = req.body;
        if (!title || !description || !price || !thumbnail || !code || !stock) return res.send({status: "error", error: "Incomplete values"});
        let result = await productsModel.updateOne({_id: req.params.id},
            {
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            });
        
        res.send({status: "success", payload: result});
    } catch (error) {
        console.log("Error al actualizar el producto - ", error);
    };
});

// DELETE api/products/:id

router.delete('/:id', async(req, res) => {
    try {
        let result = await productsModel.deleteOne({_id: req.params.id})
        res.send({status: "success", payload: result});
    } catch (error) {
        console.log("Error al eliminar el producto - ", error);
    };
});

module.exports = router;