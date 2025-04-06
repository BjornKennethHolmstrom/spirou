<!-- src/routes/try/+page.svelte -->
<script lang="ts">
  import SpiralQuiz from '$lib/components/SpiralQuiz.svelte';
  import ConfessionalView from '$lib/components/ConfessionalView.svelte';
  import LiveInteraction from '$lib/components/LiveInteraction.svelte';

  let activeTab: 'quiz' | 'confession' | 'live-interaction' = 'quiz';
</script>

<div class="max-w-4xl mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold text-purple-700 text-center mb-8">Try Spirou</h1>

  <div class="flex justify-center mb-6 space-x-4">
    <button
      class="px-4 py-2 rounded font-semibold transition-colors"
      class:bg-purple-600={activeTab === 'quiz'}
      class:text-white={activeTab === 'quiz'}
      class:bg-purple-100={activeTab !== 'quiz'}
      class:text-purple-700={activeTab !== 'quiz'}
      on:click={() => activeTab = 'quiz'}
    >
      Spiral Quiz
    </button>
    <button
      class="px-4 py-2 rounded font-semibold transition-colors"
      class:bg-purple-600={activeTab === 'confession'}
      class:text-white={activeTab === 'confession'}
      class:bg-purple-100={activeTab !== 'confession'}
      class:text-purple-700={activeTab !== 'confession'}
      on:click={() => activeTab = 'confession'}
    >
      Confessional Mode
    </button>
    <button
      class="px-4 py-2 rounded font-semibold transition-colors"
      class:bg-purple-600={activeTab === 'live-interaction'}
      class:text-white={activeTab === 'live-interaction'}
      class:bg-purple-100={activeTab !== 'live-interaction'}
      class:text-purple-700={activeTab !== 'live-interaction'}
      on:click={() => activeTab = 'live-interaction'}
    >
      Live Interaction
    </button>
  </div>

  {#if activeTab === 'quiz'}
    <SpiralQuiz />
  {:else if activeTab === 'confession'}
    <ConfessionalView />
  {:else if activeTab === 'live-interaction'}
    <LiveInteraction />
  {/if}
</div>


