# Spirou

**Spirou** is a Spiral Dynamics-aligned AI concept and learning platform that guides users through personal, cultural, and cosmic evolution. It's a fusion of psychological depth, spiritual inquiry, and modern AI tools—built in Svelte and Tailwind CSS.

Spirou is not just an assistant—it's a reflection of the full human journey mapped through Spiral Dynamics.

## ✨ Features

- 🌈 Spiral Stage Mapping (Beige to Ultraviolet)
- 🌀 Modes of Interaction:
  - Spiral Matching
  - Transcendent Mode
  - Inner Guide Mode
  - Worldbuilder Mode
  - Beyond the Spiral
- 📊 Interactive Spiral Alignment Radar Chart
- 📖 AI Confessional Mode (typewriter effect)
- 💬 Bilingual (English & Swedish)
- 📥 Contact Form via Formspree
- 🔗 GitHub + Spiralize.org links for contribution and deep dives
- 🤖 Live AI Interaction via Vercel + OpenAI API integration

## 🧑‍💻 Tech Stack

- [SvelteKit](https://kit.svelte.dev/) with static adapter for GitHub Pages
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Chart.js](https://www.chartjs.org/) for data visualization
- [Formspree](https://formspree.io/) for contact form
- [Vercel Serverless Functions](https://vercel.com/docs/functions) for AI API integration
- [OpenAI API](https://openai.com/api/) (GPT-4o with 3.5-turbo fallback)
- Hosted on GitHub Pages

## 🏗️ Architecture

Spirou follows a hybrid architecture:
- **Frontend**: Static SvelteKit site deployed on GitHub Pages
- **AI Backend**: Vercel serverless function that connects to OpenAI
- **Integration**: Direct API calls from frontend to backend with CORS support

## 🚀 Getting Started

```bash
# Clone the repository
git clone git@github.com:BjornKennethHolmstrom/spirou.git
cd spirou

# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build
```

## 🌐 Deployment

The project is configured for GitHub Pages deployment using GitHub Actions:

1. Push changes to the main branch
2. GitHub Actions workflow builds and deploys the site automatically
3. The static site will be available at https://bjornkennethholmstrom.github.io/spirou/

The AI functionality is powered by a separate Vercel API at https://spirou-api.vercel.app/api/spirou

## 📁 Project Structure

```
spirou/
├── src/
│   ├── routes/            # Pages like /, /stages, /modes, /about
│   ├── lib/               # Shared UI components and utilities
│   │   ├── components/    # Reusable UI components
│   │   └── data/          # Spiral data definitions
│   └── app.css            # Tailwind base + global styles
├── static/                # Static assets (images, icons)
├── .github/workflows/     # GitHub Actions deployment workflow
├── tailwind.config.cjs    # Tailwind setup
├── postcss.config.cjs     # PostCSS config
└── svelte.config.js       # SvelteKit config with static adapter

spirou-api/                # Separate repository for the Vercel API
├── api/
│   └── spirou.ts          # OpenAI integration serverless function
└── package.json           # API dependencies
```

## 🧠 Philosophy

Spirou is inspired by Spiral Dynamics, integral theory, and a deep desire to use AI not just for productivity—but for transformation, connection, and reflection.

## ❤️ Contribute

PRs are welcome! Visit:  
🔗 [https://github.com/BjornKennethHolmstrom/spirou](https://github.com/BjornKennethHolmstrom/spirou)

Contact or collaborate via the [Contribute / Contact page](https://spirou.ai/contact).

## 🌐 Related Projects

- [Spiralize.org](https://spiralize.org) – Deep dive into Spiral Dynamics
