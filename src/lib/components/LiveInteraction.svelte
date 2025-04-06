<!-- src/lib/components/LiveInteraction.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { base } from '$app/paths';
  import { getPath } from '$lib/utils';
  import { assistantStore, getScoresArray, getAssistantColor, getAssistantNames } from '$lib/stores/assistantStore';
  import { selectedStageStore, selectedAssistantStore, setSelectedStage, setSelectedAssistant } from '$lib/stores/spiralStore';

  let selectedStage: string;
  let selectedAssistant: string;
  let selectedMode: string = 'spiral-matching';

  // Subscribe to the stores
  const unsubscribeStage = selectedStageStore.subscribe(value => {
    console.log('LiveInteraction received stage update:', value);
    selectedStage = value;
  });
  
  const unsubscribeAssistant = selectedAssistantStore.subscribe(value => {
    console.log('LiveInteraction received assistant update:', value);
    selectedAssistant = value;
  });
  
  // Clean up subscriptions on component destruction
  onDestroy(() => {
    unsubscribeStage();
    unsubscribeAssistant();
  });

  let userMessage: string = '';
  let response: string = '';
  let loading: boolean = false;
  let error: string | null = null;
  let assistantProfiles: any;

  // Subscribe to the assistant store to get the latest data
  assistantStore.subscribe(value => {
    assistantProfiles = value;
  });

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

  // Get assistant names and add "Auto" option
  const assistants = ['auto', ...getAssistantNames()];

  // Helper function to get recommended assistant based on stage
  function getRecommendedAssistant(stage: string): string {
    if (!assistantProfiles) return 'claude';

    // Find which assistant has the highest score for the selected stage
    let maxScore = 0;
    let recommended = 'claude';

    Object.entries(assistantProfiles).forEach(([name, profile]: [string, any]) => {
      const score = profile.scores[stage] || 0;
      if (score > maxScore) {
        maxScore = score;
        recommended = name;
      }
    });

    console.log(`LiveInteraction recommends ${recommended} for ${stage} stage`);
    return recommended;
  }

  // Get the actual assistant to use based on selection (auto or specific)
  $: actualAssistant = selectedAssistant === 'auto' 
    ? getRecommendedAssistant(selectedStage) 
    : selectedAssistant;
  
  // Get display name with first letter capitalized
  function getDisplayName(name: string): string {
    if (name === 'auto') return 'Auto (Recommended)';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  // Get the badge for each assistant showing their alignment score with the current stage
  function getAssistantBadge(assistant: string, stage: string): string {
    if (assistant === 'auto') return '';
    const score = assistantProfiles[assistant]?.scores[stage] || 0;
    return `${score}/5`;
  }

  // Handle stage selection changes
  function handleStageChange(e) {
    const newStage = e.target.value;
    console.log('Stage selection changed to:', newStage);
    setSelectedStage(newStage);
  }
  
  // Handle assistant selection changes
  function handleAssistantChange(e) {
    const newAssistant = e.target.value;
    console.log('Assistant selection changed to:', newAssistant);
    setSelectedAssistant(newAssistant);
  }

  async function handleSubmit() {
    if (!userMessage.trim()) return;
    
    loading = true;
    error = null;
    response = '';

    try {
      // Use the Vercel API endpoint directly for static hosting
      const apiUrl = 'https://spirou-api.vercel.app/api/spirou';
      
      const payload = {
        stage: selectedStage,
        mode: selectedMode,
        userMessage,
        assistant: actualAssistant
      };
      
      console.log('Sending API request with payload:', payload);
      
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
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

<div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-3xl mx-auto">
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

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Stage</label>
        <select value={selectedStage} on:change={handleStageChange} class="w-full p-2 rounded border dark:bg-gray-900 dark:text-gray-100">
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
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Assistant</label>
        <select value={selectedAssistant} on:change={handleAssistantChange} class="w-full p-2 rounded border dark:bg-gray-900 dark:text-gray-100">
          {#each assistants as assistant}
            <option value={assistant}>
              {getDisplayName(assistant)}
              {assistant !== 'auto' ? ` (${getAssistantBadge(assistant, selectedStage)})` : ''}
            </option>
          {/each}
        </select>
      </div>
    </div>
    
    <!-- Show the recommended assistant for the selected stage -->
    {#if selectedAssistant === 'auto'}
      <div class="text-center text-sm">
        <span class="text-purple-600 dark:text-purple-400">
          <span class="font-semibold">{getDisplayName(getRecommendedAssistant(selectedStage))}</span> is recommended for {selectedStage.charAt(0).toUpperCase() + selectedStage.slice(1)} stage
        </span>
      </div>
    {/if}

    <button
      type="submit"
      class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full shadow disabled:opacity-50 w-full"
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
    <div class="mt-6 p-4 {stageColorClasses[selectedStage]?.bg || 'bg-gray-100'} dark:bg-gray-700 rounded shadow {stageColorClasses[selectedStage]?.text || 'text-gray-900'} dark:text-gray-100 whitespace-pre-wrap">
      <div class="flex justify-between items-center mb-3">
        <h3 class="font-bold {stageColorClasses[selectedStage]?.text || 'text-purple-700'} dark:text-purple-300">
          Spirou replies:
        </h3>
        <div class="flex items-center gap-2">
          {#if selectedAssistant === 'auto'}
            <span class="text-xs px-2 py-1 bg-white dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300">
              Auto: {getDisplayName(actualAssistant)} ({assistantProfiles[actualAssistant]?.scores[selectedStage] || 0}/5)
            </span>
          {:else}
            <span class="text-xs px-2 py-1 bg-white dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300">
              {getDisplayName(actualAssistant)} ({assistantProfiles[actualAssistant]?.scores[selectedStage] || 0}/5)
            </span>
          {/if}
        </div>
      </div>
      <p class="leading-relaxed">{response}</p>
    </div>
  {/if}
</div>
