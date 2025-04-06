<!-- src/routes/stages/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';

  const currentPath = derived(page, ($page) => $page.url.pathname);

  onMount(() => {
    document.title = 'The Spiral | Spirou';
  });

  const stages = [
    {
      id: 'beige',
      title: '🪨 Beige – Survival',
      description: 'Instinctual and basic needs—focus on food, water, shelter, reproduction.'
    },
    {
      id: 'purple',
      title: '🔮 Purple – Tribal',
      description: 'Animistic thinking, traditions, family bonds, safety in groups.'
    },
    {
      id: 'red',
      title: '🔥 Red – Power',
      description: 'Impulsive action, dominance, asserting self-will and power.'
    },
    {
      id: 'blue',
      title: '🏛 Blue – Order',
      description: 'Law, discipline, belief systems, purpose and structure.'
    },
    {
      id: 'orange',
      title: '🧠 Orange – Success',
      description: 'Achievement, science, strategy, rationality, material progress.'
    },
    {
      id: 'green',
      title: '💚 Green – Harmony',
      description: 'Community, empathy, consensus, care for people and nature.'
    },
    {
      id: 'yellow',
      title: '🌈 Yellow – Integration',
      description: 'Systemic thinking, flexibility, seeing multiple perspectives.'
    },
    {
      id: 'turquoise',
      title: '🌀 Turquoise – Holism',
      description: 'Global consciousness, harmony with life, spiritual integration.'
    },
    {
      id: 'coral',
      title: '🧬 Coral – Emergence',
      description: 'Post-integrative, paradoxical insight, cosmic participation.'
    },
    {
      id: 'ultraviolet',
      title: '✨ Ultraviolet – Transcendence',
      description: 'Mystical unity, all-inclusive awareness, source beyond form.'
    }
  ];

  const stageColorClasses = {
    beige:       { bg: 'bg-amber-100', text: 'text-amber-800' },
    purple:      { bg: 'bg-purple-100', text: 'text-purple-800' },
    red:         { bg: 'bg-red-100', text: 'text-red-800' },
    blue:        { bg: 'bg-blue-100', text: 'text-blue-800' },
    orange:      { bg: 'bg-orange-100', text: 'text-orange-800' },
    green:       { bg: 'bg-green-100', text: 'text-green-800' },
    yellow:      { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    turquoise:   { bg: 'bg-cyan-100', text: 'text-cyan-800' },
    coral:       { bg: 'bg-pink-100', text: 'text-pink-800' },
    ultraviolet: { bg: 'bg-violet-100', text: 'text-violet-800' }
  };
</script>

<div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <h1 class="text-4xl font-bold text-center text-purple-700 mb-12">The Spiral Stages</h1>

  <div class="max-w-6xl mx-auto">
    <h2 class="text-xl font-semibold text-gray-600 mb-4">--- Tier 1* ---</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each stages.slice(0, 6) as stage}
        <div class={`p-6 rounded-xl shadow ${stageColorClasses[stage.id].bg}`}>
          <h3 class={`text-xl font-bold mb-2 ${stageColorClasses[stage.id].text}`}>{stage.title}</h3>
          <p class="text-sm text-gray-700">{stage.description}</p>
        </div>
      {/each}
    </div>

    <h2 class="text-xl font-semibold text-gray-600 my-8">--- Tier 2* ---</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each stages.slice(6) as stage}
        <div class={`p-6 rounded-xl shadow ${stageColorClasses[stage.id].bg}`}>
          <h3 class={`text-xl font-bold mb-2 ${stageColorClasses[stage.id].text}`}>{stage.title}</h3>
          <p class="text-sm text-gray-700">{stage.description}</p>
        </div>
      {/each}
    </div>
  </div>

  <div class="mt-12 text-center">
    <a
      href="/modes"
      class="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full text-lg shadow transition-colors"
    >
      Explore How Spirou Interacts With Each Stage →
    </a>
  </div>

  <div class="mt-12 text-center text-sm text-gray-500 italic">
    * Spiral Dynamics commonly groups the first six stages as "Tier 1" (focused on problem-solving within a worldview)
    and the later stages as "Tier 2" (focused on integrating multiple worldviews).
  </div>

  <div class="mt-12 text-center">
    <p class="text-gray-600 text-sm">
      Curious to go deeper? Explore Spiral Dynamics in depth at
      <a href="https://spiralize.org" target="_blank" class="text-purple-600 underline hover:text-purple-800">spiralize.org</a>.
    </p>
  </div>

</div>

