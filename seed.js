import promisePool from './src/utils/database.js';

const seedMenu = async () => {
  const createTable = `
        CREATE TABLE IF NOT EXISTS wsk_menu (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            price DECIMAL(10,2) NOT NULL,
            category VARCHAR(255),
            dietary_tags VARCHAR(255)
        )`;

  const insertData = `
        INSERT INTO wsk_menu (name, description, price, category, dietary_tags) VALUES 
        ('Chicken Mo:Mo', 'Steamed dumplings with savory chicken filling and tangy tomato achar', 8.50, 'Main', 'None'),
        ('Veg Mo:Mo', 'Steamed dumplings with mixed vegetables and Himalayan spices', 7.50, 'Main', 'Vegan'),
        ('Dal Bhat', 'Traditional lentil soup with rice, vegetable curry, and homemade pickles', 12.00, 'Main', 'Gluten-Free, Vegetarian'),
        ('Chow Mein', 'Wok-tossed noodles with fresh vegetables and chicken', 10.00, 'Main', 'None'),
        ('Thukpa', 'Hearty Himalayan noodle soup with vegetables and herbs', 9.00, 'Main', 'Vegetarian'),
        ('Paneer Tikka', 'Grilled marinated cottage cheese cubes with mint chutney', 11.50, 'Starter', 'Vegetarian, Gluten-Free'),
        ('Chicken Curry', 'Classic Nepali style spicy chicken curry', 13.00, 'Main', 'Gluten-Free'),
        ('Samosa', 'Crispy pastry filled with spiced potatoes and peas', 5.00, 'Starter', 'Vegan'),
        ('Aloo Gobi', 'Stir-fried potato and cauliflower curry', 10.50, 'Main', 'Vegan, Gluten-Free'),
        ('Mango Lassi', 'Sweet and creamy yogurt drink with mango pulp', 4.00, 'Drink', 'Vegetarian, Gluten-Free'),
        ('Masala Tea', 'Traditional spiced milk tea', 3.00, 'Drink', 'Vegetarian, Gluten-Free'),
        ('Garlic Naan', 'Oven-baked flatbread topped with garlic and butter', 3.50, 'Side', 'Vegetarian'),
        ('Plain Basmati Rice', 'Steamed aromatic basmati rice', 3.00, 'Side', 'Vegan, Gluten-Free'),
        ('Gulab Jamun', 'Sweet milk dough balls soaked in cardamom syrup', 5.00, 'Dessert', 'Vegetarian'),
        ('Kheer', 'Traditional rich rice pudding with nuts', 5.50, 'Dessert', 'Vegetarian, Gluten-Free')`;

  await promisePool.execute(createTable);
  await promisePool.execute(insertData);
  console.log('Menu table created and 15 items injected successfully!');
  process.exit();
};

seedMenu();
