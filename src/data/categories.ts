import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'newborn-baby',
    name: 'Newborn Baby Items',
    urduName: 'نوزائیدہ بچوں کے آئٹمز',
    slug: 'newborn-baby-items',
    description: 'Ultra-soft cotton baby suits, cozy blankets, rompers, caps, socks, mittens, and curated newborn gift sets.',
    urduDescription: 'نوزائیدہ بچوں کے نرم کاٹن سوٹس، کمبل، ٹوپیاں، موزے اور خصوصی تحفہ بکس',
    image: '/src/assets/images/category_newborn_baby_1792391584131.jpg',
    subcategories: [
      'Newborn baby clothes',
      'Baby suits & rompers',
      'Baby caps, socks & mittens',
      'Baby blankets & wraps',
      'Baby accessories',
      'Newborn gift sets'
    ]
  },
  {
    id: 'laces-accessories',
    name: 'Laces & Accessories',
    urduName: 'لیسز اور فیشن لوازمات',
    slug: 'laces-and-accessories',
    description: 'Designer fancy laces, embroidered zari borders, dress piping, gota work, and bridal embellishments.',
    urduDescription: 'فینسی لیسز، کڑھائی والے بارڈرز، زری گوٹا پٹی اور برائیڈل سوٹ کی تزئین',
    image: '/src/assets/images/category_laces_embroidery_1792391584728.jpg',
    subcategories: [
      'Fancy laces',
      'Embroidered laces',
      'Decorative dress borders',
      'Fashion & garment accessories',
      'Bridal & party-wear embellishments'
    ]
  },
  {
    id: 'gifts',
    name: 'Gifts & Keepsakes',
    urduName: 'تحائف اور گفٹ باکسز',
    slug: 'gifts',
    description: 'Luxury gift boxes, special occasion presents, personalized gift items for children, family, and loved ones.',
    urduDescription: 'خوبصورت گفٹ بکس، سالگرہ کے تحائف اور فیملی و دوستوں کے لیے تحفے',
    image: '/src/assets/images/category_gifts_1792391659825.jpg',
    subcategories: [
      'Birthday gifts',
      'Luxury gift boxes',
      'Decorative gift items',
      'Gifts for children',
      'Gifts for family & friends',
      'Special occasion gifts'
    ]
  },
  {
    id: 'toys',
    name: 'Toys & Indoor Games',
    urduName: 'کھلونے اور تعلیمی گیمز',
    slug: 'toys',
    description: 'Plush soft teddy bears, Montessori educational toys, dolls, sports cars, board games, and children celebration gifts.',
    urduDescription: 'نرم ٹیڈی بیئرز، تعلیمی کھلونے، گڑیا، گاڑیاں اور بچوں کے انڈور کھیل',
    image: '/src/assets/images/category_toys_1792391659308.jpg',
    subcategories: [
      'Soft toys & teddy bears',
      'Educational toys',
      'Baby toys',
      'Dolls & toy cars',
      'Indoor games',
      "Children's gift toys"
    ]
  },
  {
    id: 'electronic-items',
    name: 'Electronic Items & Gadgets',
    urduName: 'الیکٹرانک اشیاء اور لائٹس',
    slug: 'electronic-items',
    description: 'Practical daily electronic accessories, LED decorative fairy lights, portable desk fans, clocks, and giftable gadgets.',
    urduDescription: 'روزمرہ کی چھوٹی الیکٹرانک اشیاء، ڈیکوریشن ایل ای ڈی لائٹس اور کارآمد گیجٹس',
    image: '/src/assets/images/category_electronics_1792391661227.jpg',
    subcategories: [
      'Small electronic accessories',
      'LED lights & decorative lighting',
      'Useful household electronic items',
      'Giftable gadgets',
      'Other available electronic products'
    ]
  },
  {
    id: 'garments-fashion',
    name: 'Garments & Fashion',
    urduName: 'گارمنٹس اور فیشن کلیکشن',
    slug: 'garments-and-fashion',
    description: 'Handpicked men, women, and children casual and festive apparel, seasonal party wear, and stylish accessories.',
    urduDescription: 'مردانہ، زنانہ اور بچوں کے دیدہ زیب سوٹس، کرتہ کلیکشن اور سیزنل فیشن',
    image: '/src/assets/images/category_garments_1792391660770.jpg',
    subcategories: [
      "Men's clothing",
      "Women's clothing",
      "Children's clothing",
      'Baby garments',
      'Casual & party wear',
      'Seasonal clothing',
      'Fashion accessories'
    ]
  },
  {
    id: 'mehndi-bridal',
    name: 'Mehndi & Bridal Items',
    urduName: 'مہندی اور برائیڈل لوازمات',
    slug: 'mehndi-and-bridal-items',
    description: 'Hand-decorated mehndi thaal trays, genuine henna cones, bridal jewelry accessories, mayun dupattas, and dholki props.',
    urduDescription: 'مہندی کے تھال، حنا کونز، دلہن کے لوازمات، مایوں اور ڈھولکی کا سامان',
    image: '/src/assets/images/category_bridal_mehndi_1792391584624.jpg',
    subcategories: [
      'Mehndi cones',
      'Bridal accessories',
      'Wedding decorations',
      'Decorative trays (Thaal)',
      'Mehndi ceremony accessories',
      'Bridal gift items',
      'Mayun & dholki accessories'
    ]
  },
  {
    id: 'birthday-party',
    name: 'Birthday Party Items',
    urduName: 'سالگرہ پارٹی کا سامان',
    slug: 'birthday-party-items',
    description: 'Vibrant balloons, custom banners, party hats, cake toppers, sparkler candles, return gift hampers, and wrapping supplies.',
    urduDescription: 'سالگرہ کے غبارے، بینرز، کیک ٹاپرز، موم بتیاں اور پارٹی ڈیکوریشن',
    image: '/src/assets/images/category_party_celebration_1792391585549.jpg',
    subcategories: [
      'Birthday balloons',
      'Birthday banners',
      'Cake decoration accessories',
      'Birthday candles',
      'Party hats',
      'Birthday decoration sets',
      'Return gifts',
      'Birthday gift wrapping accessories'
    ]
  },
  {
    id: 'marriage-wedding',
    name: 'Marriage & Wedding Items',
    urduName: 'شادی بیاہ کا مکمل سامان',
    slug: 'marriage-and-wedding-items',
    description: 'Wedding favor net baskets, velvet mithai boxes, wedding room decor, baraat & walima accessories, and trousseau packaging.',
    urduDescription: 'شادی کی روایتی ڈیکوریشن، مٹھائی بکس، برائیڈل ٹوکری اور ولیمے کا سامان',
    image: '/src/assets/images/category_wedding_favors_1792391661046.jpg',
    subcategories: [
      'Wedding decorations',
      'Gift packing accessories',
      'Wedding favor items',
      'Decorative trays & baskets',
      'Bridal shower & dholki accessories',
      'Mehndi, baraat & walima accessories',
      'Wedding gift items'
    ]
  }
];
