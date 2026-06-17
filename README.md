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

The site includes a Shopline-style Chinese admin panel and is wired to Sanity CMS as the content database and image storage. When Sanity environment variables are missing or the dataset is empty, the site falls back to mock data in `src/lib/data.ts`.

Open the daily-use admin panel at:

```text
/admin
```

Use the custom admin panel to manage:

- Products, main images, and product galleries
- Homepage section order, visibility, titles, descriptions, buttons, and images
- Categories, applications, FAQs, advantages, and blog summaries
- Company profile, navigation, SEO, CTA text, and brand colors

The advanced Sanity Studio is still available at:


```text
/studio
```

Use Studio only for advanced content maintenance or direct schema-level edits.

Seed the Sanity dataset with the current mock content after creating a Sanity project:

```bash
npx sanity dataset import sanity/seed.ndjson production --replace
```

## Inquiry Email Setup

The contact form posts to `src/app/api/inquiry/route.ts` and sends inquiry emails through Resend.

Create these environment variables locally and in Vercel:

```bash
RESEND_API_KEY=re_your_resend_api_key
INQUIRY_TO_EMAIL=sales@yourcompany.com
INQUIRY_FROM_EMAIL=Atlas Industrial Supply <onboarding@resend.dev>
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_optional_read_token
SANITY_API_WRITE_TOKEN=your_sanity_write_token
SANITY_REVALIDATE_SECRET=use_a_long_random_secret
ADMIN_PASSWORD=change_this_admin_password
ADMIN_SESSION_SECRET=use_a_long_random_session_secret
```

For production, verify your sending domain in Resend and replace `INQUIRY_FROM_EMAIL` with an address on your own domain, such as:

```bash
INQUIRY_FROM_EMAIL=Atlas Industrial Supply <sales@yourcompany.com>
```

## Deploying to Vercel

1. Push this project to GitHub, GitLab, or Bitbucket.
2. Import the repository in Vercel.
3. Install the Sanity integration from Vercel Marketplace or create a Sanity project manually.
4. Add the environment variables listed above in Project Settings.
5. Keep the default Next.js build settings.
6. Deploy.

The site uses the Next.js App Router, static metadata, and generated static product paths for fast Vercel deployments.

## Sanity Webhook

Optional: create a Sanity webhook that sends a `POST` request to:

```text
https://your-domain.com/api/revalidate
```

Add this header:

```text
x-revalidate-secret: your SANITY_REVALIDATE_SECRET value
```

This refreshes static pages after publishing content.
