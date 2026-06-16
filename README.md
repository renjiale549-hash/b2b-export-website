# B2B Export Website

A production-ready static-first B2B export website built with Next.js, TypeScript, and Tailwind CSS. The site is designed for overseas buyers, distributors, and engineering customers, with inquiry generation as the primary goal.

## Pages

- Home
- Products
- Product Detail
- Applications
- About Us
- Blog
- Contact
- Privacy Policy
- Terms of Service

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

Run lint checks:

```bash
npm run lint
```

## Content Management

Mock data lives in `src/lib/data.ts`. Replace products, categories, applications, FAQs, and blog posts there when real content is ready.

## Inquiry Email Setup

The contact form posts to `src/app/api/inquiry/route.ts` and sends inquiry emails through Resend.

Create these environment variables locally and in Vercel:

```bash
RESEND_API_KEY=re_your_resend_api_key
INQUIRY_TO_EMAIL=sales@yourcompany.com
INQUIRY_FROM_EMAIL=Atlas Industrial Supply <onboarding@resend.dev>
```

For production, verify your sending domain in Resend and replace `INQUIRY_FROM_EMAIL` with an address on your own domain, such as:

```bash
INQUIRY_FROM_EMAIL=Atlas Industrial Supply <sales@yourcompany.com>
```

## Deploying to Vercel

1. Push this project to GitHub, GitLab, or Bitbucket.
2. Import the repository in Vercel.
3. Add the environment variables listed above in Project Settings.
4. Keep the default Next.js build settings.
5. Deploy.

The site uses the Next.js App Router, static metadata, and generated static product paths for fast Vercel deployments.
