const User = require('../dao/models/userModel');

class UserRepository {
  async findUserById(userId) {
    try {
      return await User.findById(userId);
    } catch (error) {
      throw new Error(`Unable to retrieve user: ${error.message}`);
    }
  }

  async createUser(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw new Error(`Unable to create user: ${error.message}`);
    }
  }

  async updateUser(userId, userData) {
    try {
      return await User.findByIdAndUpdate(userId, userData, { new: true });
    } catch (error) {
      throw new Error(`Unable to update user: ${error.message}`);
    }
  }

  async deleteUser(userId) {
    try {
      return await User.findByIdAndDelete(userId);
    } catch (error) {
      throw new Error(`Unable to delete user: ${error.message}`);
    }
  }
}

module.exports = new UserRepository();
