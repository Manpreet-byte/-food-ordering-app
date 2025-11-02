const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
require('dotenv').config();

// Image galleries for each menu item - 3-4 high-quality food images
const imageGalleries = {
  "Margherita Pizza": [
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&q=80",
    "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&q=80"
  ],
  "Pepperoni Pizza": [
    "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80",
    "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800&q=80",
    "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=800&q=80",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"
  ],
  "BBQ Chicken Pizza": [
    "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
    "https://images.unsplash.com/photo-1571407970349-bc81e7e96800?w=800&q=80",
    "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=800&q=80"
  ],
  "Veggie Supreme Pizza": [
    "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=800&q=80",
    "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=800&q=80",
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
    "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800&q=80"
  ],
  "Hawaiian Pizza": [
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800&q=80",
    "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=800&q=80"
  ],
  "Classic Beef Burger": [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
    "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=80",
    "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&q=80"
  ],
  "Chicken Burger": [
    "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=80",
    "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&q=80",
    "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?w=800&q=80"
  ],
  "Veggie Burger": [
    "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&q=80",
    "https://images.unsplash.com/photo-1585238341710-4a70e4e5e73d?w=800&q=80",
    "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&q=80",
    "https://images.unsplash.com/photo-1592415612520-08c8b7cc16c9?w=800&q=80"
  ],
  "Bacon Cheeseburger": [
    "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&q=80",
    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80",
    "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&q=80"
  ],
  "Mushroom Swiss Burger": [
    "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=80",
    "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=800&q=80",
    "https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=800&q=80",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"
  ],
  "Spaghetti Carbonara": [
    "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
    "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?w=800&q=80"
  ],
  "Penne Arrabbiata": [
    "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    "https://images.unsplash.com/photo-1611171711912-e0768b1d03f0?w=800&q=80",
    "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=800&q=80",
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80"
  ],
  "Fettuccine Alfredo": [
    "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&q=80",
    "https://images.unsplash.com/photo-1611171711912-e0768b1d03f0?w=800&q=80",
    "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80"
  ],
  "Pesto Pasta": [
    "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=800&q=80",
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80",
    "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80"
  ],
  "Lasagna": [
    "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&q=80",
    "https://images.unsplash.com/photo-1619895092538-128341789043?w=800&q=80",
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80"
  ],
  "Caesar Salad": [
    "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80",
    "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&q=80"
  ],
  "Greek Salad": [
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
    "https://images.unsplash.com/photo-1580013759032-c96505e24c1f?w=800&q=80",
    "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=800&q=80"
  ],
  "Garden Salad": [
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80",
    "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80",
    "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80"
  ],
  "Caprese Salad": [
    "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&q=80",
    "https://images.unsplash.com/photo-1592417817038-d13fd7ab0dce?w=800&q=80",
    "https://images.unsplash.com/photo-1572695157849-1bd0e0a9fb9d?w=800&q=80"
  ],
  "Chicken Salad": [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=800&q=80",
    "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=800&q=80",
    "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&q=80"
  ],
  "Chocolate Brownie": [
    "https://images.unsplash.com/photo-1564355808853-07fdb4e33a9c?w=800&q=80",
    "https://images.unsplash.com/photo-1590841609987-4ac211afdde1?w=800&q=80",
    "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80"
  ],
  "Cheesecake": [
    "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=800&q=80",
    "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=800&q=80",
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80"
  ],
  "Tiramisu": [
    "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
    "https://images.unsplash.com/photo-1606312619070-d48b4ccd8e06?w=800&q=80",
    "https://images.unsplash.com/photo-1534621279-b9f7e97bcc90?w=800&q=80"
  ],
  "Ice Cream Sundae": [
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
    "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&q=80",
    "https://images.unsplash.com/photo-1582053433926-6efcd5454fc8?w=800&q=80",
    "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=800&q=80"
  ],
  "Apple Pie": [
    "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800&q=80",
    "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=800&q=80",
    "https://images.unsplash.com/photo-1621955964441-c173e01c135b?w=800&q=80"
  ],
  "Fresh Orange Juice": [
    "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80",
    "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&q=80",
    "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800&q=80"
  ],
  "Iced Coffee": [
    "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80",
    "https://images.unsplash.com/photo-1546514355-7fdc90ccbd03?w=800&q=80",
    "https://images.unsplash.com/photo-1619221882461-8c4ba1e0f7c7?w=800&q=80",
    "https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=800&q=80"
  ],
  "Mango Smoothie": [
    "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&q=80",
    "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800&q=80",
    "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&q=80"
  ],
  "Lemonade": [
    "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f0f?w=800&q=80",
    "https://images.unsplash.com/photo-1583064313642-a7c149480c7e?w=800&q=80",
    "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
    "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&q=80"
  ],
  "Cappuccino": [
    "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80",
    "https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&q=80",
    "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80"
  ]
};

async function addImageGalleries() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const menuItems = await MenuItem.find({});
    console.log(`Found ${menuItems.length} menu items to update\n`);

    for (const item of menuItems) {
      const gallery = imageGalleries[item.name] || [];
      
      if (gallery.length > 0) {
        await MenuItem.findByIdAndUpdate(item._id, {
          imageGallery: gallery
        });
        console.log(`✓ Added ${gallery.length} images to: ${item.name}`);
      } else {
        console.log(`⚠ No gallery found for: ${item.name}`);
      }
    }

    console.log('\n✅ All image galleries added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding image galleries:', error);
    process.exit(1);
  }
}

addImageGalleries();
