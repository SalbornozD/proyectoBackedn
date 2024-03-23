const fs = require('fs');

class CartManager{
    constructor(path){
        this.path = path;
    }

    async addCart(){
        try {
            const data = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
            let lastId = data.carritos.length + 1;
            const newCart = {
                id: lastId,
                products: []
            };
            data.carritos.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(data));
            
        } catch (error) {
            console.error(`Error al crear el carrito: ${error}`);
        }
    }

    async addProductToCart(idCarrito, idProducto){
        try {
            const data = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
            const auxCart = data.carritos.find((carrito) => carrito.id == idCarrito);
            if (auxCart){
                let auxProduct = auxCart.products.find((productoAuxiliar) => productoAuxiliar.id == idProducto);
                if (auxProduct) {
                    auxProduct.quantity = auxProduct.quantity + 1;
                } else {
                    auxProduct = {
                        id: idProducto,
                        quantity: 1
                    }
                    auxCart.products.push(auxProduct);
                }
            } else {
                console.log(`Error, el carrito con id ${idCarrito}, no existe.`)
            }
            await fs.promises.writeFile(this.path, JSON.stringify(data));
        } catch (error) {
            console.log(`Error al ingresar el producto con id ${idProducto}, en el carrito de id ${idCarrito}`);
        }
    }

    async getProductsByCart(idCarrito){
        try {
            const data = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
            const auxCart = data.carritos.find((carrito) => carrito.id == idCarrito);
            if (auxCart) return auxCart.products;
            else console.log("Error el carrito no existe");
        } catch (error) {
            console.log("Error al obtener el carrito - ", error)
        }
    }

}

module.exports = CartManager;