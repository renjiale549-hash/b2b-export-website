# OddHug Toys

OddHug Toys is a responsive, inquiry-focused brand website for ugly-cute plush toys, quirky monster gifts, wholesale buyers, and custom toy projects.

## Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Sanity CMS and custom `/admin` content panel
- Resend inquiry email API
- Vercel deployment

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production checks:

```bash
npm run lint
npm run build
npm run start
```

## Inquiry Email

Copy `.env.example` to `.env.local` and configure:

```bash
RESEND_API_KEY=re_your_resend_api_key
INQUIRY_RECEIVER_EMAIL=inquiry@yourdomain.com
INQUIRY_FROM_EMAIL=OddHug Toys <onboarding@resend.dev>
```

`INQUIRY_TO_EMAIL` remains supported as a fallback for existing deployments. For production sending, verify your domain in Resend and use an address on that domain for `INQUIRY_FROM_EMAIL`.

The form sends to `/api/inquiry`, validates required fields, includes a honeypot and minimum submit time, and sends the email with the subject `New Inquiry from OddHug Toys Website`.

## Content Management

Daily content management is available at:

```text
/admin
```

The advanced Sanity Studio remains available at:

```text
/studio
```

Configure Sanity and admin variables from `.env.example`. To replace the existing industrial demo content with the OddHug starter content and upload the included toy artwork:

```bash
npm run sanity:sync-oddhug
```

The sync script only replaces website content document types. It does not delete the Sanity project or unrelated assets.

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Add all required environment variables from `.env.example`.
4. Keep the default Next.js build settings.
5. Deploy.

After changing environment variables, redeploy the project. Content saved through `/admin` revalidates the relevant website pages automatically.

## Testing the Inquiry Form

1. Start the site locally.
2. Open `/contact`.
3. Submit a valid name, email, and message.
4. Confirm the success message appears.
5. Confirm the inquiry arrives at `INQUIRY_RECEIVER_EMAIL`.

If the Resend variables are missing or the sending domain is not accepted, the form displays an error and does not report a false success.
