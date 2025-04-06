import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      // default options are fine for GitHub Pages
    }),
    paths: {
      base: '/spirou' // if deployed under github.com/yourname/spirou
    }
  }
};

