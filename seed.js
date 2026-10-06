import promisePool from './src/utils/database.js';

const seedMenu = async () => {
  const items = [
    [
      'Aloo Gobi',
      'Potato and cauliflower curry',
      11.0,
      'Main',
      'Vegetarian',
      'aloo-gobi.jpg',
    ],
    [
      'Basmati Rice',
      'Steamed fragrant basmati rice',
      4.0,
      'Side',
      'Vegetarian',
      'basmati-rice.jpg',
    ],
    [
      'Chicken Curry',
      'Spicy chicken curry with herbs',
      15.0,
      'Main',
      'None',
      'chicken-curry.jpg',
    ],
    [
      'Chicken Mo:Mo',
      'Steamed dumplings with chicken',
      10.0,
      'Starter',
      'None',
      'chicken-momo.jpg',
    ],
    [
      'Chow Mein',
      'Stir-fried noodles with vegetables',
      10.0,
      'Main',
      'None',
      'chow-mein.jpg',
    ],
    [
      'Dal Bhat',
      'Traditional lentil soup with rice',
      12.0,
      'Main',
      'Vegetarian',
      'dal-bhat.jpg',
    ],
    [
      'Garlic Naan',
      'Freshly baked flatbread with garlic',
      3.5,
      'Side',
      'Vegetarian',
      'garlic-naan.jpg',
    ],
    [
      'Gulab Jamun',
      'Sweet deep-fried dough balls in syrup',
      6.0,
      'Dessert',
      'Vegetarian',
      'gulab-jamun.jpg',
    ],
    [
      'Kheer',
      'Traditional rice pudding with nuts',
      5.0,
      'Dessert',
      'Vegetarian',
      'kheer.jpg',
    ],
    [
      'Mango Lassi',
      'Sweet yogurt-based mango drink',
      4.5,
      'Drink',
      'Vegetarian',
      'mango-lassi.jpg',
    ],
    [
      'Masala Tea',
      'Warm spiced milk tea',
      4.0,
      'Drink',
      'Vegetarian',
      'masala-tea.jpg',
    ],
    [
      'Paneer Tikka',
      'Grilled marinated cottage cheese',
      13.0,
      'Starter',
      'Vegetarian',
      'paneer-tikka.jpg',
    ],
    [
      'Samosa',
      'Crispy pastry filled with spiced potatoes',
      5.0,
      'Starter',
      'Vegetarian',
      'samosa.jpg',
    ],
    [
      'Thukpa',
      'Hearty Tibetan noodle soup',
      11.0,
      'Main',
      'None',
      'thukpa.jpg',
    ],
    [
      'Veg Mo:Mo',
      'Steamed dumplings with mixed vegetables',
      9.0,
      'Starter',
      'Vegetarian',
      'veg-momo.jpg',
    ],
  ];

  for (const item of items) {
    await promisePool.execute(
      'INSERT INTO wsk_menu (name, description, price, category, dietary_tags, image_filename) VALUES (?, ?, ?, ?, ?, ?)',
      item
    );
  }

  console.log('Menu seeded successfully');
  process.exit();
};

seedMenu();
