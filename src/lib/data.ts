import type { Application, BlogPost, Category, Faq, Product, SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "OddHug Toys",
  url: "https://b2b-export-website.vercel.app",
  email: "inquiry@oddhugtoys.com",
  phone: "+86 000 0000 0000",
  address: "Creative toy studio, Shenzhen, China",
  tagline: "Ugly-cute toys, plush friends & quirky gifts.",
  heroEyebrow: "Oddly adorable since the first hug",
  heroTitle: "Ugly-Cute Toys That Make People Smile",
  heroDescription:
    "Meet OddHug Toys — quirky plush friends, weird little monsters, and collectible gifts designed for brands, retailers, and toy lovers.",
  heroImage: "/oddhug/hero-toy-scene.svg",
  categorySectionTitle: "Collections for shelves, gifts, and happy weirdos.",
  categorySectionDescription:
    "Choose from ready-to-inquire plush friends, mini monsters, funny gift toys, and custom projects for retail or brand campaigns.",
  featuredProductsTitle: "Quirky favorites",
  featuredProductsDescription:
    "A playful starter catalog for ugly-cute plush toys and collectible gift ideas. Replace these with your real OddHug products anytime.",
  companySectionTitle: "Every odd little friend deserves a hug.",
  companySectionDescription:
    "OddHug Toys designs strange-but-sweet plush characters and collectible toys with soft materials, memorable faces, and a tiny spark of weirdness. We help retailers, brands, and gift buyers turn imperfect little monsters into friends people want to keep.",
  ctaEyebrow: "Start an OddHug inquiry",
  ctaTitle: "Tell us what kind of weird-cute friend you want to make.",
  ctaDescription:
    "Share your toy type, quantity, market, and custom ideas. We will reply with practical options for samples, wholesale orders, or custom toy projects.",
  primaryColor: "#ff7fb2",
  accentColor: "#ffe66d",
  navItems: [
    { href: "/", label: "Home" },
    { href: "/products", label: "Collections" },
    { href: "/#why-oddhug", label: "Why OddHug" },
    { href: "/contact", label: "Inquiry" },
  ],
  seoTitle: "OddHug Toys | Ugly-Cute Plush Toys & Quirky Gifts",
  seoDescription:
    "OddHug Toys creates ugly-cute plush toys, quirky monster gifts, and custom toy projects for retailers, brands, and toy lovers.",
};

export const categories: Category[] = [
  {
    name: "Weird Plush Friends",
    slug: "weird-plush-friends",
    description:
      "Soft, oddly charming plush characters with funny faces, hug-ready shapes, and strong shelf personality for gifts and retail.",
  },
  {
    name: "Mini Monster Toys",
    slug: "mini-monster-toys",
    description:
      "Pocket-sized monster collectibles for blind boxes, impulse gifts, campaign giveaways, and playful brand drops.",
  },
  {
    name: "Funny Gift Toys",
    slug: "funny-gift-toys",
    description:
      "Quirky toy gifts made for birthdays, pop-up stores, lifestyle shops, and customers who like cute things with a twist.",
  },
  {
    name: "Custom Toy Projects",
    slug: "custom-toy-projects",
    description:
      "Inquiry-based plush and collectible toy projects for brands, retailers, events, and limited-edition collaborations.",
  },
];

export const products: Product[] = [
  {
    slug: "blobbo-weird-plush-friend",
    name: "Blobbo Weird Plush Friend",
    category: "Weird Plush Friends",
    summary: "A round, sleepy-eyed plush friend with a wonderfully awkward smile.",
    description:
      "Blobbo is the OddHug mascot for anyone who has ever felt a little lumpy but still lovable. Its soft body, embroidered face, and giftable size make it a warm option for retailers, toy shops, and cozy brand campaigns.",
    image: "/oddhug/blobbo-plush.svg",
    specs: [
      { label: "Product Type", value: "Soft plush toy" },
      { label: "Suggested Size", value: "18 cm / 25 cm / custom" },
      { label: "Material", value: "Soft plush fabric with PP cotton filling" },
      { label: "Order Type", value: "Wholesale or custom project inquiry" },
    ],
    features: ["Ugly-cute original face", "Soft huggable body", "Embroidery details", "Retail tag and packaging options"],
    applications: ["Gift shops", "Toy boutiques", "Brand mascot gifts"],
    seoTitle: "Blobbo Weird Plush Friend | OddHug Toys",
    seoDescription: "A soft ugly-cute plush friend for gifts, retail, and custom brand toy projects.",
  },
  {
    slug: "grumpy-sprout-mini-monster",
    name: "Grumpy Sprout Mini Monster",
    category: "Mini Monster Toys",
    summary: "A tiny collectible monster with little horns, big feelings, and a very squishy mood.",
    description:
      "Grumpy Sprout is designed for small collectible programs, counter displays, blind boxes, and playful promotional gifts. It looks annoyed, but that is exactly why people want to take it home.",
    image: "/oddhug/grumpy-sprout.svg",
    specs: [
      { label: "Product Type", value: "Mini plush or vinyl-style collectible" },
      { label: "Suggested Size", value: "8 cm / 12 cm / custom" },
      { label: "Color Options", value: "Mint, lavender, lemon, custom palette" },
      { label: "Packaging", value: "Hang tag, display box, or blind box concept" },
    ],
    features: ["Small collectible format", "Expressive monster face", "Great for series drops", "Custom colors available"],
    applications: ["Blind box programs", "Event giveaways", "Lifestyle retail"],
    seoTitle: "Grumpy Sprout Mini Monster Toy | OddHug Toys",
    seoDescription: "A quirky mini monster collectible for retail, gifts, and custom toy drops.",
  },
  {
    slug: "wonky-heart-gift-toy",
    name: "Wonky Heart Gift Toy",
    category: "Funny Gift Toys",
    summary: "A crooked little heart toy for people who prefer feelings with personality.",
    description:
      "Wonky Heart is a soft, funny gift toy for stores that want something sweeter than a joke product and stranger than a standard plush. It works well for seasonal gifts, friendship gifts, and cheerful counter displays.",
    image: "/oddhug/wonky-heart.svg",
    specs: [
      { label: "Product Type", value: "Funny plush gift" },
      { label: "Suggested Size", value: "12 cm / 18 cm / custom" },
      { label: "Material", value: "Short plush, embroidery, PP cotton" },
      { label: "Branding", value: "Custom tag, label, card, or message" },
    ],
    features: ["Gift-ready character concept", "Soft candy color palette", "Custom message card option", "Retail-friendly size"],
    applications: ["Gift stores", "Seasonal campaigns", "Friendship gifts"],
    seoTitle: "Wonky Heart Funny Gift Toy | OddHug Toys",
    seoDescription: "A crooked, cute plush heart gift toy for retail and custom campaigns.",
  },
  {
    slug: "custom-oddhug-character-project",
    name: "Custom OddHug Character Project",
    category: "Custom Toy Projects",
    summary: "Turn a strange sketch, mascot, or brand idea into a hug-worthy toy concept.",
    description:
      "For custom projects, OddHug Toys helps shape quirky characters into sample-ready plush or collectible toy concepts. Share your idea, target quantity, market, and mood, and we will suggest a practical path forward.",
    image: "/oddhug/custom-monster.svg",
    specs: [
      { label: "Project Type", value: "Custom plush or collectible toy" },
      { label: "Input", value: "Sketch, mascot, reference, or mood board" },
      { label: "Support", value: "Character refinement, sample direction, packaging ideas" },
      { label: "Order Flow", value: "Inquiry, concept review, sampling, quotation" },
    ],
    features: ["Custom character support", "Retail and brand campaign use", "Packaging concept options", "Inquiry-based quoting"],
    applications: ["Brand mascots", "Limited editions", "Retail collaborations"],
    seoTitle: "Custom Ugly-Cute Toy Projects | OddHug Toys",
    seoDescription: "Custom plush and quirky toy project support for brands, retailers, and creative campaigns.",
  },
];

export const applications: Application[] = [
  {
    title: "Retail Gift Shelves",
    description:
      "Ugly-cute plush friends and funny toys that help gift shops, toy boutiques, and lifestyle stores stand out from ordinary plush displays.",
    industries: ["Gift shops", "Toy boutiques", "Lifestyle retail"],
  },
  {
    title: "Brand Campaigns",
    description:
      "Custom character toys, mascot gifts, and playful limited editions for launches, events, pop-ups, and community campaigns.",
    industries: ["Brand mascots", "Pop-up events", "Campaign gifts"],
  },
  {
    title: "Collectible Drops",
    description:
      "Mini monster concepts for blind boxes, series-based collections, seasonal sets, and small toys that invite repeat discovery.",
    industries: ["Blind boxes", "Collectibles", "Limited editions"],
  },
];

export const advantages = [
  "Ugly-Cute Original Style",
  "Soft & Huggable Materials",
  "Great for Gifts & Retail",
  "Inquiry-Based Custom Orders",
];

export const faqs: Faq[] = [
  {
    question: "Do you sell online directly?",
    answer:
      "OddHug Toys is currently inquiry-based. We focus on wholesale, retail, brand, and custom toy project inquiries rather than direct checkout.",
  },
  {
    question: "Can you help with custom toy ideas?",
    answer:
      "Yes. Share your sketch, mascot, theme, or mood board, and we can discuss character direction, materials, size, packaging, and sample options.",
  },
  {
    question: "What product types can I ask about?",
    answer:
      "You can inquire about plush toys, mini monster toys, funny gift toys, collectible concepts, wholesale orders, and custom toy projects.",
  },
  {
    question: "What should I include in my inquiry?",
    answer:
      "Please include product type, estimated quantity, country, preferred size, target use, and any reference images or brand requirements.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "why-ugly-cute-toys-work",
    title: "Why Ugly-Cute Toys Make People Smile",
    date: "2026-03-05",
    excerpt:
      "A little weirdness can make a toy feel more personal, more memorable, and much easier to love.",
    readTime: "3 min read",
  },
  {
    slug: "choosing-plush-toys-for-retail",
    title: "Choosing Quirky Plush Toys for Retail Shelves",
    date: "2026-03-14",
    excerpt:
      "How retailers can choose plush friends with strong faces, clear gift appeal, and enough personality to stop shoppers.",
    readTime: "4 min read",
  },
  {
    slug: "custom-monster-toy-projects",
    title: "Planning a Custom Monster Toy Project",
    date: "2026-03-28",
    excerpt:
      "What to prepare before asking for a custom plush or collectible toy quote, from mood to quantity to packaging ideas.",
    readTime: "4 min read",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
