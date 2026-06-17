import { advantage } from "./types/advantage";
import { application } from "./types/application";
import { blogPost } from "./types/blog-post";
import { category } from "./types/category";
import { faq } from "./types/faq";
import { product } from "./types/product";
import { siteSettings } from "./types/site-settings";
import { themeSettings } from "./types/theme-settings";

export const schemaTypes = [siteSettings, themeSettings, category, product, application, advantage, faq, blogPost];
