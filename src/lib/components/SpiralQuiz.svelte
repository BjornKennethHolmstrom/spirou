<!-- src/lib/components/SpiralQuiz.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { browser } from '$app/environment';

  export let result;

  let initialResponses = {
    beige: 3,
    purple: 3,
    red: 3,
    blue: 3,
    orange: 3,
    green: 3,
    yellow: 3,
    turquoise: 3,
    coral: 3,
    ultraviolet: 3
  };

  if (browser) {
    const saved = localStorage.getItem('spirou-quiz-responses');
    if (saved) {
      try {
        initialResponses = JSON.parse(saved);
      } catch (e) {
        console.warn("Failed to parse stored quiz responses", e);
      }
    }
  }

  export const responses = writable(initialResponses);

  if (browser) {
    responses.subscribe((value) => {
      localStorage.setItem('spirou-quiz-responses', JSON.stringify(value));
    });
  }

  const questions = [
    {
      id: 'q1',
      text: 'I feel most at ease when I have everything I need to survive.',
      stage: 'beige'
    },
    {
      id: 'q2',
      text: 'Traditions and rituals are very important to me.',
      stage: 'purple'
    },
    {
      id: 'q3',
      text: 'I value strength, boldness, and asserting myself.',
      stage: 'red'
    },
    {
      id: 'q4',
      text: 'Order, structure, and following rules make society work.',
      stage: 'blue'
    },
    {
      id: 'q5',
      text: 'Success, innovation, and measurable goals drive me.',
      stage: 'orange'
    },
    {
      id: 'q6',
      text: 'Empathy, equality, and care for all are core values to me.',
      stage: 'green'
    },
    {
      id: 'q7',
      text: 'I enjoy seeing connections between complex systems.',
      stage: 'yellow'
    },
    {
      id: 'q8',
      text: 'I think globally and feel part of a planetary whole.',
      stage: 'turquoise'
    },
    {
      id: 'q9',
      text: 'I am drawn to emerging insights beyond conventional systems.',
      stage: 'coral'
    },
    {
      id: 'q10',
      text: 'I feel connected to everything in a mystical, ineffable way.',
      stage: 'ultraviolet'
    }
  ];

  const stageLabels = {
    beige: 'Survival',
    purple: 'Tribal',
    red: 'Power',
    blue: 'Order',
    orange: 'Success',
    green: 'Harmony',
    yellow: 'Integration',
    turquoise: 'Holism',
    coral: 'Emergence',
    ultraviolet: 'Transcendence'
  };

  const stageColorClasses = {
    beige: { bg: 'bg-amber-100', text: 'text-amber-800' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-800' },
    red: { bg: 'bg-red-100', text: 'text-red-800' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-800' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-800' },
    green: { bg: 'bg-green-100', text: 'text-green-800' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    turquoise: { bg: 'bg-teal-100', text: 'text-teal-800' },
    coral: { bg: 'bg-pink-100', text: 'text-pink-800' },
    ultraviolet: { bg: 'bg-indigo-100', text: 'text-indigo-800' }
  };

  let showResults = false;

  function calculateResults() {
    // We're already storing the values in $responses, so just set showResults to true
    showResults = true;
  }

  $: result = responses; // responses is the final map of stage scores
</script>

<div class="max-w-3xl mx-auto p-6">
  <h2 class="text-3xl font-bold mb-6 text-center text-purple-700">🌀 Spiral Matching Quiz</h2>

{#if !showResults}
  <form on:submit|preventDefault={calculateResults} class="space-y-8">
    {#each questions as q}
      <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <label class="block font-semibold mb-2 text-purple-700 dark:text-purple-300">
          {q.text}
        </label>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          bind:value={$responses[q.stage]}
          on:input={(e) =>
            responses.update(r => ({ ...r, [q.stage]: +e.target.value }))
          }
          class="w-full mt-2"
        />
        <div class="text-sm text-gray-600 mt-1 text-center">
          {stageLabels[q.stage]}: {$responses[q.stage]} / 5
        </div>
      </div>
    {/each}

      <button
        type="submit"
        class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded shadow"
      >
        Show My Spiral Alignment
      </button>
    </form>
  {:else}
    <div class="space-y-8">
      <h2 class="text-2xl font-bold text-center text-purple-700 mb-6">
        Your Spiral Profile
      </h2>

      {#each Object.entries($responses) as [stage, value]}
        <div class={`p-4 rounded-xl shadow ${stageColorClasses[stage]?.bg || 'bg-gray-100'}`}>
          <h3 class={`text-lg font-semibold mb-1 ${stageColorClasses[stage]?.text || 'text-gray-800'}`}>
            {stageLabels[stage]}
          </h3>
          <div class="w-full bg-gray-200 rounded-full h-3 mt-2 mb-1">
            <div
              class="h-3 rounded-full"
              style="width: {(value / 5) * 100}%; background-color: var(--tw-gradient-to, #8b5cf6);"
            ></div>
          </div>
          <p class="text-sm text-gray-700 dark:text-gray-300 text-right">
            Score: {value} / 5
          </p>
        </div>
      {/each}

      <!-- Add a button to take the quiz again -->
      <div class="text-center mt-6">
        <button
          on:click={() => showResults = false}
          class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded shadow"
        >
          Take Quiz Again
        </button>
      </div>
    </div>
  {/if}
  <br>
  <div class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
    <p>
      Want a more detailed spiral assessment?
      <a href="https://spiralize.org/quiz" target="_blank" class="text-purple-600 underline hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">
        Try the full quiz at spiralize.org/quiz
      </a>
    </p>
  </div>
</div>
