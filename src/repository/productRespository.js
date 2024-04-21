const Product = require('../dao/models/productModel'); 
class ProductRepository {
  async findAllProducts() {
    try {
      return await Product.find();
    } catch (error) {
      throw new Error(`Unable to retrieve products: ${error.message}`);
    }
  }

  async findProductById(productId) {
    try {
      return await Product.findById(productId);
    } catch (error) {
      throw new Error(`Unable to retrieve product: ${error.message}`);
    }
  }

  async createProduct(productData) {
    try {
      const product = new Product(productData);
      return await product.save();
    } catch (error) {
      throw new Error(`Unable to create product: ${error.message}`);
    }
  }

  async updateProduct(productId, productData) {
    try {
      return await Product.findByIdAndUpdate(productId, productData, { new: true });
    } catch (error) {
      throw new Error(`Unable to update product: ${error.message}`);
    }
  }

  async deleteProduct(productId) {
    try {
      return await Product.findByIdAndDelete(productId);
    } catch (error) {
      throw new Error(`Unable to delete product: ${error.message}`);
    }
  }
}

module.exports = new ProductRepository();
