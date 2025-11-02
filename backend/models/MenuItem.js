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
  imageGallery: {
    type: [String], // Array of image URLs for gallery view
    default: [],
  },
  category: String, // Optional: food type/category (e.g., pizza, dessert)
  available: {
    type: Boolean,
    default: true,
  },
  isVegetarian: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.5,
  },
  preparationTime: {
    type: Number, // in minutes
    default: 30,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  allergens: {
    type: [String],
    default: [],
  },
  nutritionalInfo: {
    calories: String,
    protein: String,
    carbs: String,
    fat: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
