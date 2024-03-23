const fs = require('fs');

class ProductManager{
    constructor(path){
        this.path = path;
    }

    async getProducts(){
        try{
            const data = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
            return data.productos;
        } catch(error){
            console.log(`El error es: ${error}`);
        }
    }

    // El atributo code no se debe repetir.
    async addProduct(newProduct){
        try {
            const data = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
            let lastId = 0;
            let existsProduct = false;

            data.productos.forEach(auxProduct => {
                if(auxProduct.code == newProduct.code){
                    existsProduct = true;
                } else {
                    lastId = auxProduct.id;
                };
            });
            if (!existsProduct) {
                lastId++;
                newProduct.id = lastId;
                data.productos.push(newProduct);
                try {
                    await fs.promises.writeFile(this.path, JSON.stringify(data));
                } catch (error) {
                    console.error(`Error en la escritura del archivo: ${error}`);
                }
            } else {
                console.error("Error, el producto ya se encuentra registrado en la base de datos");
            }
        } catch (error) {
            console.error(`Error al leer el archivo: ${error}`);
        }
    }

    async getProductsById(id){
        let resultado = undefined;
        let existsProduct = false;
        try{
            (await this.getProducts()).forEach(auxProduct => {
                if(auxProduct.id == id){
                    resultado = auxProduct;
                    existsProduct = true;
                }
            })
            if(existsProduct){
                return resultado;
            }
        } catch(error){
            console.error(error);
        };
    };
    
    async updateProduct(id, updateProduct){
        try {
            const data = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
            for (let i = 0; i < data.productos.length; i++) {
                if (data.productos[i].id == id) {
                    const idProduct = data.productos[i].id;
                    data.productos[i] = updateProduct;
                    data.productos[i].id = idProduct;
                }
            }
            try {
                await fs.promises.writeFile(this.path, JSON.stringify(data));
            } catch (error) {
                console.error(`Error en la escritura del archivo: ${error}`);
            }
        } catch (error) {
            console.error(error)
        }
    }

    async deleteProduct(id){
        try {
            const data = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
            data.productos = data.productos.filter(product => product.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(data));
            console.log("Producto eliminado con exito")
        } catch (error) {
            console.error(error)
        }
    }

}

module.exports = ProductManager;