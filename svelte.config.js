import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      // default options are fine for GitHub Pages
      pages: 'build',
      assets: 'build',
      fallback: 'index.html', // Enable SPA mode
      precompress: false
    }),
    // Uncomment this for deployment to GitHub Pages
    paths: {
      base: '/spirou' // Adjust this to match your GitHub repository name
    }
  }
};
