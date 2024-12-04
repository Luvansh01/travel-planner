const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hash password before saving it
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare entered password with the hashed one in the database
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);