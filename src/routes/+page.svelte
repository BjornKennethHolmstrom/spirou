<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
</script>

<div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <section class="text-center py-24 px-6">
    <div class="flex justify-center mb-8">
      <img src="/logo.svg" alt="Spirou Logo" class="h-32 w-32 md:h-48 md:w-48" />
    </div>

    <h1 class="text-5xl md:text-6xl font-extrabold text-purple-700 mb-4">
      Meet Spirou
    </h1>
    <p class="text-xl md:text-2xl text-purple-600 mb-8 max-w-2xl mx-auto">
      Your Spiral-Aligned Guide to Inner & Outer Evolution
    </p>
    <a
      href="/stages"
      class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full text-lg shadow-lg transition-colors"
    >
      Begin the Journey
    </a>
  </section>

  <section class="max-w-5xl mx-auto px-4 py-16">
    <h2 class="text-3xl font-bold mb-6 text-center">What is Spirou?</h2>
    <p class="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
      Spirou is not just an assistant. It's a reflection of the full human journey mapped through Spiral Dynamics—
      brought to life through AI. From survival to transcendence, from personal growth to planetary stewardship,
      Spirou guides you with insight, empathy, and multidimensional wisdom.
    </p>
  </section>

  <section class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-20 px-6">

    <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-xl shadow text-center">
        <h3 class="font-semibold text-xl mb-2 text-green-800">Spiral Matching</h3>
        <p class="text-sm text-gray-700">Discover your current stage and get guidance matched to your personal evolution.</p>
      </div>
      <div class="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-xl shadow text-center">
        <h3 class="font-semibold text-xl mb-2 text-yellow-800">Transcendent Mode</h3>
        <p class="text-sm text-gray-700">Explore mysteries, paradoxes, and beyond-stage reflections through mystical dialogue.</p>
      </div>
      <div class="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl shadow text-center">
        <h3 class="font-semibold text-xl mb-2 text-blue-800">Inner Guide Mode</h3>
        <p class="text-sm text-gray-700">Engage in reflective practices, journaling prompts, and spiritual growth sessions.</p>
      </div>
      <div class="bg-gradient-to-br from-pink-100 to-pink-200 p-6 rounded-xl shadow text-center">
        <h3 class="font-semibold text-xl mb-2 text-pink-800">Worldbuilder Mode</h3>
        <p class="text-sm text-gray-700">Co-create systems, policies, or worlds—Spirou helps build the future with you.</p>
      </div>
    </div>
  </section>

  <section class="py-20 px-6 text-center max-w-3xl mx-auto">
    <blockquote class="italic text-lg text-gray-600">
      “The Spiral is not a ladder to climb, but a rhythm to remember.
      To evolve is not to rise above, but to dance with all that came before.”
    </blockquote>
  </section>
</div>

