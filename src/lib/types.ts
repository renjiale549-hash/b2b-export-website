export type Product = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  image: string;
  specs: {
    label: string;
    value: string;
  }[];
  features: string[];
  applications: string[];
};

export type Category = {
  name: string;
  slug: string;
  description: string;
};

export type Application = {
  title: string;
  description: string;
  industries: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
};
