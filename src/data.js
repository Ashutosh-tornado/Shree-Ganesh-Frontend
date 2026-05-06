export const products = [
  {
    id: 1,
    name: 'Premium Californian Almonds',
    description: 'Jumbo sized premium almonds rich in protein and healthy fats.',
    price: 1299,
    category: 'Almonds',
    tag: 'Best Seller',
    image: '/products/almonds.webp'
  },

  {
    id: 2,
    name: 'Jumbo W240 Cashews',
    description: 'Creamy and crunchy premium quality cashews.',
    price: 1499,
    category: 'Cashews',
    tag: 'Premium Selection',
    image: '/products/cashews.webp'
  },

  {
    id: 3,
    name: 'Iranian Pistachios',
    description: 'Fresh roasted pistachios with rich flavor and crunch.',
    price: 2199,
    category: 'Pistachios',
    tag: 'New Arrival',
    image: '/products/pistachios.webp'
  },

  {
    id: 4,
    name: 'Premium Raisins',
    description: 'Naturally sweet raisins packed with antioxidants.',
    price: 699,
    category: 'Raisins',
    tag: '',
    image: '/products/raisins.webp'
  },

  {
    id: 5,
    name: 'Chilean Walnuts',
    description: 'Crunchy premium walnuts full of omega-3 goodness.',
    price: 1899,
    category: 'Walnuts',
    tag: '',
    image: '/products/shelled-walnuts.webp'
  },

  {
    id: 6,
    name: 'Afghan Dry Fig (Anjeer)',
    description: 'Soft and naturally sweet Afghan anjeer rich in fiber.',
    price: 1599,
    category: 'Dry Fig',
    tag: 'Limited Stock',
    image: '/products/anjeer.webp'
  },

  {
    id: 7,
    name: 'Premium Dried Dates',
    description: 'Naturally dried dates with rich caramel sweetness.',
    price: 899,
    category: 'Dates',
    tag: '',
    image: '/products/dried-dates.webp'
  },

  {
    id: 8,
    name: 'Premium Arabian Dates',
    description: 'Soft, juicy and luxurious premium quality dates.',
    price: 1199,
    category: 'Dates',
    tag: 'Best Seller',
    image: '/products/premium-dates.webp'
  },

  {
    id: 9,
    name: 'Walnut Kernels',
    description: 'Handpicked walnut kernels with rich buttery texture.',
    price: 2099,
    category: 'Walnuts',
    tag: '',
    image: '/products/walnut-kernels.webp'
  },

  {
    id: 10,
    name: 'Turkish Apricots',
    description: 'Sweet and chewy apricots loaded with nutrients.',
    price: 1399,
    category: 'Apricots',
    tag: '',
    image: '/products/apricots.webp'
  },

  {
    id: 11,
    name: 'Royal Mix Dry Fruits',
    description: 'A luxurious mix of premium nuts and dry fruits.',
    price: 2499,
    category: 'Mixed',
    tag: 'Premium Selection',
    image: '/products/mixed-dry-fruits.webp'
  },

  {
    id: 12,
    name: 'Mamra Badam',
    description: 'High-quality Mamra almonds known for rich nutrition.',
    price: 2899,
    category: 'Almonds',
    tag: 'Luxury',
    image: '/products/mamra-badam.webp'
  },

  {
    id: 13,
    name: 'Mejdool Dates',
    description: 'Large juicy Medjool dates with natural sweetness.',
    price: 1799,
    category: 'Dates',
    tag: 'Premium',
    image: '/products/mejdool-dates.webp'
  },

  {
    id: 14,
    name: 'Roasted Cashews',
    description: 'Perfectly roasted cashews with rich buttery taste.',
    price: 1599,
    category: 'Cashews',
    tag: '',
    image: '/products/roasted-cashews.webp'
  },
];
//   {
//     id: 15,
//     name: 'Shelled Walnuts',
//     description: 'Premium shelled walnuts freshly packed for daily nutrition.',
//     price: 1999,
//     category: 'Walnuts',
//     tag: '',
//     image: '/products/shelled-walnuts.webp'
//   }
// ];

export const featuredProducts = products.slice(0, 6);

export const categories = [
  'All',
  'Almonds',
  'Cashews',
  'Pistachios',
  'Dates',
  'Walnuts',
  'Dry Fig',
  'Raisins',
  'Apricots',
  'Mixed'
];