const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  image: String, // URL to image (Cloudinary or any source)
  category: String, // Optional: food type/category (e.g., pizza, dessert)
}, {
  timestamps: true,
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
