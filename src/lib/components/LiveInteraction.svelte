<!-- src/lib/components/LiveInteraction.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  export let selectedStage: string = 'green';
  export let selectedMode: string = 'spiral-matching';

  let userMessage: string = '';
  let response: string = '';
  let loading: boolean = false;
  let error: string | null = null;

  const stages = [
    'beige', 'purple', 'red', 'blue', 'orange',
    'green', 'yellow', 'turquoise', 'coral', 'ultraviolet'
  ];

  const modes = [
    { id: 'spiral-matching', label: '🧩 Spiral Matching' },
    { id: 'transcendent', label: '✨ Transcendent Mode' },
    { id: 'inner-guide', label: '🧘 Inner Guide Mode' },
    { id: 'worldbuilder', label: '🌍 Worldbuilder Mode' },
    { id: 'beyond-spiral', label: '🚀 Beyond the Spiral' }
  ];

  async function handleSubmit() {
    if (!userMessage.trim()) return;
    
    loading = true;
    error = null;
    response = '';

    try {
      // Use the Vercel API endpoint directly for static hosting
      const apiUrl = 'https://spirou-api.vercel.app/api/spirou';
      
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stage: selectedStage,
          mode: selectedMode,
          userMessage
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned ${res.status}: ${await res.text()}`);
      }

      const data = await res.json();
      response = data.response || 'No response received.';
    } catch (err: any) {
      error = `Error: ${err.message}`;
      console.error('API call error:', err);
    } finally {
      loading = false;
    }
  }
</script>

<div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-2xl mx-auto">
  <h2 class="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-4 text-center">🧠 Try Spirou</h2>

  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your message to Spirou:</label>
      <textarea
        bind:value={userMessage}
        rows="4"
        class="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:border-purple-500"
        placeholder="Type your question, reflection, or request..."
      ></textarea>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Stage</label>
        <select bind:value={selectedStage} class="w-full p-2 rounded border dark:bg-gray-900 dark:text-gray-100">
          {#each stages as stage}
            <option value={stage}>{stage.charAt(0).toUpperCase() + stage.slice(1)}</option>
          {/each}
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Mode</label>
        <select bind:value={selectedMode} class="w-full p-2 rounded border dark:bg-gray-900 dark:text-gray-100">
          {#each modes as mode}
            <option value={mode.id}>{mode.label}</option>
          {/each}
        </select>
      </div>
    </div>

    <button
      type="submit"
      class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full shadow disabled:opacity-50"
      disabled={loading}
    >
      {loading ? 'Thinking...' : 'Ask Spirou'}
    </button>
  </form>

  {#if error}
    <div class="mt-6 p-4 bg-red-100 dark:bg-red-800 rounded shadow text-red-700 dark:text-red-200">
      <h3 class="font-bold mb-2">Error:</h3>
      <p>{error}</p>
      <p class="mt-2 text-sm">Try again or check the console for more details.</p>
    </div>
  {/if}

  {#if response}
    <div class="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded shadow text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
      <h3 class="font-bold mb-2 text-purple-700 dark:text-purple-300">Spirou replies:</h3>
      <p>{response}</p>
    </div>
  {/if}
</div>
