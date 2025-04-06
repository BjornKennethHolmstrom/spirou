import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html', // Enable SPA mode
      precompress: false
    }),
    // Use different base paths for development vs production
    paths: {
      // Check if we're building for production (GitHub Pages)
      // When running locally with npm run dev, this will be undefined
      base: process.env.NODE_ENV === 'production' ? '/spirou' : ''
    }
  }
};

export default config;
