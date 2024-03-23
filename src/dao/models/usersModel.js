// users.models.js
const Mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userCollection = "usuarios";

const userSchema = new Mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cart: { type: Mongoose.Schema.Types.ObjectId, ref: 'Carts' },
    role: { type: String, default: 'user' }
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const userModel = Mongoose.model(userCollection, userSchema);

module.exports = userModel;