This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy on GitHub Pages

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Enable GitHub Pages in your repository:**
   - Go to your repository settings
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"

2. **The workflow will automatically:**
   - Build the Next.js static site on every push to the `main` branch
   - Deploy to GitHub Pages
   - Handle basePath configuration automatically (if repo is not at root)

3. **Manual deployment:**
   - You can also trigger the workflow manually from the "Actions" tab

### Configuration

- The workflow file is located at `.github/workflows/nextjs.yml`
- Next.js is configured with `output: 'export'` for static site generation
- The build output is automatically uploaded to GitHub Pages
- The `actions/configure-pages@v5` action automatically handles basePath configuration

### Notes

- The site will be available at `https://[username].github.io/[repository-name]/`
- If your repository is at the root (e.g., `username.github.io`), the basePath will be automatically adjusted
- Static export is enabled, so all pages are pre-rendered at build time