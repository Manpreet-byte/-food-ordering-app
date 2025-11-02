const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
require('dotenv').config();

const enhancedMenuData = [
  // PIZZAS
  {
    name: "Margherita Pizza",
    isVegetarian: true,
    preparationTime: 35,
    rating: 4.7,
    ingredients: ["Fresh Mozzarella", "Tomato Sauce", "Fresh Basil", "Olive Oil", "Pizza Dough"],
    allergens: ["Gluten", "Dairy"],
    nutritionalInfo: { calories: "250 kcal", protein: "12g", carbs: "30g", fat: "9g" }
  },
  {
    name: "Pepperoni Pizza",
    isVegetarian: false,
    preparationTime: 35,
    rating: 4.8,
    ingredients: ["Pepperoni", "Mozzarella", "Tomato Sauce", "Italian Herbs", "Pizza Dough"],
    allergens: ["Gluten", "Dairy", "Pork"],
    nutritionalInfo: { calories: "300 kcal", protein: "15g", carbs: "32g", fat: "13g" }
  },
  {
    name: "BBQ Chicken Pizza",
    isVegetarian: false,
    preparationTime: 40,
    rating: 4.6,
    ingredients: ["Grilled Chicken", "BBQ Sauce", "Red Onions", "Cilantro", "Mozzarella"],
    allergens: ["Gluten", "Dairy"],
    nutritionalInfo: { calories: "320 kcal", protein: "18g", carbs: "35g", fat: "11g" }
  },
  {
    name: "Veggie Supreme Pizza",
    isVegetarian: true,
    preparationTime: 38,
    rating: 4.5,
    ingredients: ["Bell Peppers", "Mushrooms", "Olives", "Onions", "Tomatoes", "Mozzarella"],
    allergens: ["Gluten", "Dairy"],
    nutritionalInfo: { calories: "240 kcal", protein: "10g", carbs: "33g", fat: "8g" }
  },
  {
    name: "Hawaiian Pizza",
    isVegetarian: false,
    preparationTime: 35,
    rating: 4.3,
    ingredients: ["Ham", "Pineapple", "Mozzarella", "Tomato Sauce"],
    allergens: ["Gluten", "Dairy", "Pork"],
    nutritionalInfo: { calories: "270 kcal", protein: "14g", carbs: "34g", fat: "9g" }
  },

  // BURGERS
  {
    name: "Classic Beef Burger",
    isVegetarian: false,
    preparationTime: 25,
    rating: 4.8,
    ingredients: ["Beef Patty", "Lettuce", "Tomato", "Onions", "Pickles", "Cheese", "Burger Bun"],
    allergens: ["Gluten", "Dairy", "Soy"],
    nutritionalInfo: { calories: "550 kcal", protein: "28g", carbs: "45g", fat: "26g" }
  },
  {
    name: "Chicken Burger",
    isVegetarian: false,
    preparationTime: 25,
    rating: 4.6,
    ingredients: ["Grilled Chicken", "Lettuce", "Tomato", "Mayo", "Burger Bun"],
    allergens: ["Gluten", "Eggs"],
    nutritionalInfo: { calories: "480 kcal", protein: "32g", carbs: "42g", fat: "18g" }
  },
  {
    name: "Veggie Burger",
    isVegetarian: true,
    preparationTime: 25,
    rating: 4.4,
    ingredients: ["Veggie Patty", "Lettuce", "Tomato", "Avocado", "Whole Wheat Bun"],
    allergens: ["Gluten", "Soy"],
    nutritionalInfo: { calories: "380 kcal", protein: "15g", carbs: "48g", fat: "14g" }
  },
  {
    name: "Bacon Cheeseburger",
    isVegetarian: false,
    preparationTime: 28,
    rating: 4.9,
    ingredients: ["Beef Patty", "Bacon", "Cheddar Cheese", "Lettuce", "Tomato", "Special Sauce"],
    allergens: ["Gluten", "Dairy", "Pork"],
    nutritionalInfo: { calories: "680 kcal", protein: "35g", carbs: "46g", fat: "38g" }
  },
  {
    name: "Mushroom Swiss Burger",
    isVegetarian: false,
    preparationTime: 28,
    rating: 4.5,
    ingredients: ["Beef Patty", "Sautéed Mushrooms", "Swiss Cheese", "Caramelized Onions"],
    allergens: ["Gluten", "Dairy"],
    nutritionalInfo: { calories: "590 kcal", protein: "30g", carbs: "44g", fat: "29g" }
  },

  // PASTA
  {
    name: "Spaghetti Carbonara",
    isVegetarian: false,
    preparationTime: 30,
    rating: 4.7,
    ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Black Pepper"],
    allergens: ["Gluten", "Eggs", "Dairy", "Pork"],
    nutritionalInfo: { calories: "520 kcal", protein: "22g", carbs: "58g", fat: "22g" }
  },
  {
    name: "Penne Arrabbiata",
    isVegetarian: true,
    preparationTime: 25,
    rating: 4.5,
    ingredients: ["Penne Pasta", "Tomatoes", "Garlic", "Red Chili", "Olive Oil", "Basil"],
    allergens: ["Gluten"],
    nutritionalInfo: { calories: "380 kcal", protein: "12g", carbs: "62g", fat: "10g" }
  },
  {
    name: "Fettuccine Alfredo",
    isVegetarian: true,
    preparationTime: 28,
    rating: 4.6,
    ingredients: ["Fettuccine", "Heavy Cream", "Butter", "Parmesan", "Garlic"],
    allergens: ["Gluten", "Dairy"],
    nutritionalInfo: { calories: "620 kcal", protein: "18g", carbs: "65g", fat: "32g" }
  },
  {
    name: "Pesto Pasta",
    isVegetarian: true,
    preparationTime: 25,
    rating: 4.4,
    ingredients: ["Pasta", "Basil Pesto", "Pine Nuts", "Parmesan", "Cherry Tomatoes"],
    allergens: ["Gluten", "Dairy", "Tree Nuts"],
    nutritionalInfo: { calories: "450 kcal", protein: "15g", carbs: "58g", fat: "18g" }
  },
  {
    name: "Lasagna",
    isVegetarian: false,
    preparationTime: 45,
    rating: 4.8,
    ingredients: ["Lasagna Sheets", "Ground Beef", "Ricotta", "Mozzarella", "Tomato Sauce"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    nutritionalInfo: { calories: "580 kcal", protein: "28g", carbs: "52g", fat: "26g" }
  },

  // SALADS
  {
    name: "Caesar Salad",
    isVegetarian: false,
    preparationTime: 15,
    rating: 4.5,
    ingredients: ["Romaine Lettuce", "Caesar Dressing", "Parmesan", "Croutons"],
    allergens: ["Gluten", "Dairy", "Eggs", "Fish"],
    nutritionalInfo: { calories: "280 kcal", protein: "8g", carbs: "22g", fat: "18g" }
  },
  {
    name: "Greek Salad",
    isVegetarian: true,
    preparationTime: 15,
    rating: 4.6,
    ingredients: ["Cucumbers", "Tomatoes", "Feta", "Olives", "Red Onions", "Olive Oil"],
    allergens: ["Dairy"],
    nutritionalInfo: { calories: "220 kcal", protein: "6g", carbs: "12g", fat: "16g" }
  },
  {
    name: "Garden Salad",
    isVegetarian: true,
    preparationTime: 12,
    rating: 4.3,
    ingredients: ["Mixed Greens", "Carrots", "Cucumbers", "Tomatoes", "Vinaigrette"],
    allergens: [],
    nutritionalInfo: { calories: "120 kcal", protein: "3g", carbs: "15g", fat: "6g" }
  },
  {
    name: "Caprese Salad",
    isVegetarian: true,
    preparationTime: 10,
    rating: 4.7,
    ingredients: ["Fresh Mozzarella", "Tomatoes", "Basil", "Balsamic Glaze", "Olive Oil"],
    allergens: ["Dairy"],
    nutritionalInfo: { calories: "260 kcal", protein: "14g", carbs: "8g", fat: "20g" }
  },
  {
    name: "Chicken Salad",
    isVegetarian: false,
    preparationTime: 20,
    rating: 4.5,
    ingredients: ["Grilled Chicken", "Mixed Greens", "Cherry Tomatoes", "Avocado", "Ranch Dressing"],
    allergens: ["Eggs", "Dairy"],
    nutritionalInfo: { calories: "380 kcal", protein: "32g", carbs: "18g", fat: "22g" }
  },

  // DESSERTS
  {
    name: "Chocolate Brownie",
    isVegetarian: true,
    preparationTime: 25,
    rating: 4.8,
    ingredients: ["Chocolate", "Butter", "Eggs", "Sugar", "Flour", "Vanilla"],
    allergens: ["Gluten", "Eggs", "Dairy"],
    nutritionalInfo: { calories: "420 kcal", protein: "5g", carbs: "52g", fat: "22g" }
  },
  {
    name: "Cheesecake",
    isVegetarian: true,
    preparationTime: 30,
    rating: 4.9,
    ingredients: ["Cream Cheese", "Graham Crackers", "Sugar", "Eggs", "Vanilla"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    nutritionalInfo: { calories: "480 kcal", protein: "8g", carbs: "45g", fat: "30g" }
  },
  {
    name: "Tiramisu",
    isVegetarian: true,
    preparationTime: 35,
    rating: 4.7,
    ingredients: ["Ladyfingers", "Mascarpone", "Espresso", "Cocoa Powder", "Eggs"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    nutritionalInfo: { calories: "390 kcal", protein: "7g", carbs: "38g", fat: "24g" }
  },
  {
    name: "Ice Cream Sundae",
    isVegetarian: true,
    preparationTime: 10,
    rating: 4.6,
    ingredients: ["Vanilla Ice Cream", "Chocolate Sauce", "Whipped Cream", "Cherry", "Nuts"],
    allergens: ["Dairy", "Tree Nuts"],
    nutritionalInfo: { calories: "350 kcal", protein: "6g", carbs: "48g", fat: "16g" }
  },
  {
    name: "Apple Pie",
    isVegetarian: true,
    preparationTime: 30,
    rating: 4.5,
    ingredients: ["Apples", "Pie Crust", "Cinnamon", "Sugar", "Butter"],
    allergens: ["Gluten", "Dairy"],
    nutritionalInfo: { calories: "320 kcal", protein: "3g", carbs: "52g", fat: "12g" }
  },

  // BEVERAGES
  {
    name: "Fresh Orange Juice",
    isVegetarian: true,
    preparationTime: 5,
    rating: 4.6,
    ingredients: ["Fresh Oranges"],
    allergens: [],
    nutritionalInfo: { calories: "110 kcal", protein: "2g", carbs: "26g", fat: "0g" }
  },
  {
    name: "Iced Coffee",
    isVegetarian: true,
    preparationTime: 8,
    rating: 4.5,
    ingredients: ["Coffee", "Ice", "Milk", "Sugar"],
    allergens: ["Dairy"],
    nutritionalInfo: { calories: "120 kcal", protein: "3g", carbs: "18g", fat: "4g" }
  },
  {
    name: "Mango Smoothie",
    isVegetarian: true,
    preparationTime: 10,
    rating: 4.7,
    ingredients: ["Mango", "Yogurt", "Honey", "Ice"],
    allergens: ["Dairy"],
    nutritionalInfo: { calories: "220 kcal", protein: "6g", carbs: "42g", fat: "4g" }
  },
  {
    name: "Lemonade",
    isVegetarian: true,
    preparationTime: 5,
    rating: 4.4,
    ingredients: ["Lemons", "Sugar", "Water", "Mint"],
    allergens: [],
    nutritionalInfo: { calories: "100 kcal", protein: "0g", carbs: "26g", fat: "0g" }
  },
  {
    name: "Cappuccino",
    isVegetarian: true,
    preparationTime: 8,
    rating: 4.6,
    ingredients: ["Espresso", "Steamed Milk", "Milk Foam"],
    allergens: ["Dairy"],
    nutritionalInfo: { calories: "80 kcal", protein: "4g", carbs: "8g", fat: "4g" }
  }
];

async function updateMenuItems() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Get all menu items
    const menuItems = await MenuItem.find({});
    console.log(`Found ${menuItems.length} menu items to update`);

    for (let i = 0; i < menuItems.length && i < enhancedMenuData.length; i++) {
      const item = menuItems[i];
      const enhancedData = enhancedMenuData[i];

      await MenuItem.findByIdAndUpdate(item._id, {
        ...enhancedData
      });

      console.log(`✓ Updated: ${item.name}`);
    }

    console.log('\n✅ All menu items updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating menu items:', error);
    process.exit(1);
  }
}

updateMenuItems();
