import type { Application, BlogPost, Category, Faq, Product, SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "Atlas Industrial Supply",
  url: "https://example.com",
  email: "sales@example.com",
  phone: "+1 555 0189",
  address: "Global Export Office, Shenzhen, China",
  tagline: "Reliable industrial products for global B2B buyers.",
  heroEyebrow: "Global B2B Supply Partner",
  heroTitle: "Export-ready industrial products for serious procurement teams.",
  heroDescription:
    "Atlas Industrial Supply helps importers, distributors, and engineering contractors source reliable valves, fittings, and custom assemblies with clear specifications and responsive quoting.",
  heroImage: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1400&q=80",
  categorySectionTitle: "Built for distributor shelves and project sites.",
  categorySectionDescription:
    "Start with standard catalog products, then adapt materials, packaging, labeling, and documentation for your market.",
  featuredProductsTitle: "Popular export items",
  featuredProductsDescription: "Mock product data is centralized so your real catalog can replace it cleanly later.",
  companySectionTitle: "Export cooperation without unnecessary friction.",
  companySectionDescription:
    "We focus on clear communication, stable specifications, and documentation that helps international buyers move faster from sample approval to repeat orders.",
  ctaEyebrow: "Ready to source?",
  ctaTitle: "Send your RFQ and receive a practical export quotation.",
  ctaDescription:
    "Share product specs, target quantity, destination, and packaging requirements. Our team will respond with suitable options.",
  primaryColor: "#0f766e",
  accentColor: "#f59e0b",
  navItems: [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/applications", label: "Applications" },
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
};

export const categories: Category[] = [
  {
    name: "Industrial Valves",
    slug: "industrial-valves",
    description: "Ball valves, gate valves, and check valves for fluid control projects.",
  },
  {
    name: "Pipe Fittings",
    slug: "pipe-fittings",
    description: "Precision fittings for OEM, construction, and maintenance supply chains.",
  },
  {
    name: "Custom Assemblies",
    slug: "custom-assemblies",
    description: "Made-to-order assemblies with flexible branding and packaging options.",
  },
];

export const products: Product[] = [
  {
    slug: "stainless-steel-ball-valve",
    name: "Stainless Steel Ball Valve",
    category: "Industrial Valves",
    summary: "Two-piece stainless steel valve for water, oil, gas, and light chemical lines.",
    description:
      "A durable full-port stainless steel ball valve designed for overseas distributors and engineering contractors who require stable quality, consistent packaging, and flexible order quantities.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80",
    specs: [
      { label: "Material", value: "SS304 / SS316" },
      { label: "Size Range", value: "1/4 inch to 4 inch" },
      { label: "Pressure", value: "PN16 / PN25 / PN40" },
      { label: "Connection", value: "Threaded / Flanged" },
    ],
    features: ["Full-port flow path", "Low torque handle", "OEM logo available", "Export carton packaging"],
    applications: ["Water treatment", "Industrial piping", "HVAC systems"],
  },
  {
    slug: "forged-brass-gate-valve",
    name: "Forged Brass Gate Valve",
    category: "Industrial Valves",
    summary: "Compact forged brass valve for plumbing, water supply, and building projects.",
    description:
      "A reliable brass gate valve line built for importers who need stable lead times, repeatable machining quality, and market-ready labeling.",
    image: "https://images.unsplash.com/photo-1584275142334-4164381f37f7?auto=format&fit=crop&w=1200&q=80",
    specs: [
      { label: "Material", value: "Forged brass" },
      { label: "Size Range", value: "1/2 inch to 2 inch" },
      { label: "Surface", value: "Natural brass / Nickel plated" },
      { label: "Standard", value: "EN / ISO compatible" },
    ],
    features: ["Compact body", "Smooth stem operation", "Retail or bulk packing", "Private label support"],
    applications: ["Residential plumbing", "Commercial buildings", "Water supply"],
  },
  {
    slug: "carbon-steel-pipe-elbow",
    name: "Carbon Steel Pipe Elbow",
    category: "Pipe Fittings",
    summary: "Welded pipe elbows for construction, machinery, and industrial piping networks.",
    description:
      "A high-volume pipe fitting product designed for project procurement and distributor inventory programs, with dimensional consistency and inspection documents available.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
    specs: [
      { label: "Material", value: "Carbon steel" },
      { label: "Angle", value: "45 / 90 / 180 degree" },
      { label: "Radius", value: "Short / Long radius" },
      { label: "Finish", value: "Black / Galvanized / Painted" },
    ],
    features: ["Stable wall thickness", "Batch traceability", "Project documentation", "Palletized export packing"],
    applications: ["Oil and gas", "Construction", "Mechanical equipment"],
  },
  {
    slug: "oem-hose-connector-kit",
    name: "OEM Hose Connector Kit",
    category: "Custom Assemblies",
    summary: "Configurable connector kits for distributors, repair brands, and equipment makers.",
    description:
      "A flexible connector kit program with custom components, instructions, barcode labels, and branded packaging for channel-ready sales.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1200&q=80",
    specs: [
      { label: "Material", value: "Brass / Stainless steel / Plastic" },
      { label: "Kit Size", value: "5 to 30 pcs" },
      { label: "Packaging", value: "Bag / Blister / Color box" },
      { label: "MOQ", value: "Negotiable by configuration" },
    ],
    features: ["Custom BOM support", "Barcode labels", "Instruction sheet available", "Distributor-ready cartons"],
    applications: ["Aftermarket repair", "OEM equipment", "Retail distribution"],
  },
];

export const applications: Application[] = [
  {
    title: "Water Treatment",
    description: "Valves and fittings for filtration skids, municipal facilities, and commercial water systems.",
    industries: ["Municipal projects", "Commercial buildings", "Equipment integrators"],
  },
  {
    title: "Industrial Piping",
    description: "Durable components for process lines, utilities, and scheduled maintenance programs.",
    industries: ["Manufacturing", "Energy", "Chemical handling"],
  },
  {
    title: "OEM Equipment",
    description: "Configurable parts and assemblies for machinery brands that need repeatable supply.",
    industries: ["Machinery", "HVAC", "Repair kits"],
  },
];

export const advantages = [
  "Export-ready documentation and packaging",
  "Flexible OEM branding for distributors",
  "Consistent batch inspection and quality control",
  "Responsive quoting for project and repeat orders",
];

export const faqs: Faq[] = [
  {
    question: "Can you support OEM branding?",
    answer: "Yes. We can support logo marking, labels, color boxes, instruction sheets, and carton marks based on order quantity.",
  },
  {
    question: "What documents can you provide?",
    answer: "Typical documents include commercial invoice, packing list, certificate of origin, inspection report, and product specifications.",
  },
  {
    question: "Do you accept small trial orders?",
    answer: "For standard items, trial orders are possible. For custom assemblies, MOQ depends on packaging and component configuration.",
  },
  {
    question: "How fast can I receive a quotation?",
    answer: "Most standard inquiries receive a response within one business day when drawings, quantities, and destination are provided.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-evaluate-b2b-suppliers",
    title: "How Overseas Buyers Can Evaluate Industrial Suppliers",
    date: "2026-01-10",
    excerpt: "A practical checklist for reviewing product consistency, export documents, packaging, and response quality.",
    readTime: "4 min read",
  },
  {
    slug: "oem-packaging-for-distributors",
    title: "OEM Packaging Options for Distributor Programs",
    date: "2026-01-18",
    excerpt: "How labels, color boxes, carton marks, and kit instructions help importers build channel-ready products.",
    readTime: "3 min read",
  },
  {
    slug: "project-quotation-information",
    title: "What Information Helps Us Quote Your Project Faster",
    date: "2026-02-02",
    excerpt: "Send clearer RFQs with specifications, drawings, annual volume, target market, and logistics preferences.",
    readTime: "3 min read",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
