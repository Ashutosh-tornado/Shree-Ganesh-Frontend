export const products = [
  {
    id: 1,
    name: 'Premium Californian Almonds',
    description: 'Jumbo sized, crunchy and sweet almonds packed with nutrients.',
    price: 1299,
    category: 'Almonds',
    tag: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    name: 'Jumbo W240 Cashews',
    description: 'Creamy, rich and perfectly roasted cashews from Mangalore.',
    price: 1499,
    category: 'Cashews',
    tag: 'Premium Selection',
    image: 'https://images.unsplash.com/photo-1599557034458-132d73315eb0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    name: 'Iranian Pistachios',
    description: 'Lightly salted and roasted pistachios with a distinct flavor.',
    price: 2199,
    category: 'Pistachios',
    tag: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    name: 'Omani Dates',
    description: 'Soft, naturally sweet, and luscious premium dates.',
    price: 899,
    category: 'Dates',
    tag: '',
    image: 'https://images.unsplash.com/photo-1616851083437-05c0800c732c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    name: 'Afghan Anjeer (Figs)',
    description: 'Sun-dried figs, rich in fiber and natural sweetness.',
    price: 1599,
    category: 'Figs',
    tag: 'Limited Stock',
    image: 'https://images.unsplash.com/photo-1601004128956-6541f487e914?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    name: 'Chilean Walnuts',
    description: 'Premium light halves, crisp and full of flavor.',
    price: 1899,
    category: 'Walnuts',
    tag: '',
    image: 'https://images.unsplash.com/photo-1574519961609-b13c3835f8d2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 7,
    name: 'Royal Nut Mix',
    description: 'A luxurious blend of premium nuts and berries.',
    price: 2499,
    category: 'Mixes',
    tag: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1596660603099-03a116f1c4e7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 8,
    name: 'Roasted & Salted Almonds',
    description: 'Perfectly roasted almonds with a hint of sea salt.',
    price: 1399,
    category: 'Almonds',
    tag: '',
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=800'
  }
];

export const featuredProducts = products.slice(0, 3);

export const categories = [
  'All',
  'Almonds',
  'Cashews',
  'Dates',
  'Figs',
  'Pistachios',
  'Walnuts',
  'Mixes'
];
