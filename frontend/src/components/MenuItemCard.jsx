import React from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

// Helper function to generate estimated delivery time
const getDeliveryTime = (category) => {
  const deliveryTimes = {
    'Pizza': '35-45',
    'Burger': '25-35',
    'Pasta': '30-40',
    'Salad': '15-25',
    'Dessert': '20-30',
    'Beverage': '10-15',
    'Appetizer': '20-30',
    'Asian': '30-40',
    'Mexican': '25-35',
  };
  return deliveryTimes[category] || '30-40';
};

export default function MenuItemCard({ item }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    try {
      if (!item.available) {
        toast.warning(`${item.name} is currently unavailable`);
        return;
      }
      addToCart(item);
      toast.success(`${item.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={item.imageUrl || 'https://via.placeholder.com/400x300?text=Delicious+Food'}
          alt={item.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Delicious+Food';
          }}
        />
        {!item.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-xl">Unavailable</span>
          </div>
        )}
        {item.available && (
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow text-xs font-medium text-gray-700">
            🕒 {getDeliveryTime(item.category)} min
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.name}</h3>
        <p className="text-gray-600 mb-3 text-sm line-clamp-2">{item.description}</p>
        
        {item.category && (
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-3">
            {item.category}
          </span>
        )}
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-green-600">
            ${item.price?.toFixed(2) || '0.00'}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={!item.available}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              item.available
                ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {item.available ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}
