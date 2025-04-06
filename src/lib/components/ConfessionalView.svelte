<!-- src/lib/components/ConfessionalView.svelte -->
<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { writable } from 'svelte/store';

  const assistantOptions = ['chatgpt', 'claude', 'grok', 'gemini', 'deepseek', 'perplexity'];
  let activeAssistant = 'chatgpt';
  let displayedText = '';
  let animationTimeout;

  // Import your existing assistantConfessions
  import { assistantConfessions } from '$lib/data/assistantConfessions';

  async function animateConfession() {
    clearTimeout(animationTimeout);
    displayedText = '';
    await tick();

    const confession = assistantConfessions[activeAssistant]?.en || '';
    let i = 0;

    function type() {
      if (i < confession.length) {
        displayedText += confession[i++];
        animationTimeout = setTimeout(type, 15);
      }
    }

    type();
  }

  $: activeAssistant, animateConfession();
</script>

<div class="mb-6">
  <label class="block font-semibold mb-2 text-purple-700">Choose an Assistant</label>
  <select
    bind:value={activeAssistant}
    class="p-2 rounded border border-purple-300 bg-white dark:bg-gray-800 dark:text-white"
  >
    {#each assistantOptions as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
</div>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 font-mono whitespace-pre-wrap leading-relaxed text-sm text-gray-700 dark:text-gray-200">
  <span>{displayedText}</span><span class="blinking-cursor">▍</span>
</div>

<style>
  .blinking-cursor {
    animation: blink 1s step-end infinite;
  }
  @keyframes blink {
    50% { opacity: 0; }
  }
</style>

