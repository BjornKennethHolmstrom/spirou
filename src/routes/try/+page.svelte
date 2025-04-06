<!-- src/routes/try/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import SpiralQuiz from '$lib/components/SpiralQuiz.svelte';
  import ConfessionalView from '$lib/components/ConfessionalView.svelte';
  import LiveInteraction from '$lib/components/LiveInteraction.svelte';
  import SimpleAssistantSpiralChart from '$lib/components/SimpleAssistantSpiralChart.svelte';
  import { getPath } from '$lib/utils';
  import { getScoresArray, getAssistantNames } from '$lib/stores/assistantStore';
  import { selectedStageStore, selectedAssistantStore, setSelectedStage, setSelectedAssistant } from '$lib/stores/spiralStore';

  let activeTab: 'quiz' | 'confession' | 'live-interaction' = 'live-interaction';
  
  // Function to get the recommended assistant for a stage
  function getRecommendedAssistant(stage: string): string {
    const stageIds = [
      'beige', 'purple', 'red', 'blue', 'orange', 
      'green', 'yellow', 'turquoise', 'coral', 'ultraviolet'
    ];
    
    let maxScore = 0;
    let recommended = 'claude';
    
    getAssistantNames().forEach(assistant => {
      const scores = getScoresArray(assistant);
      const index = stageIds.indexOf(stage);
      const score = scores[index] || 0;
      
      if (score > maxScore) {
        maxScore = score;
        recommended = assistant;
      }
    });
    
    return recommended;
  }
  
  // Update selected stage when quiz results change
  function handleQuizResults(event) {
    const quizResults = event.detail;
    
    // Find the stage with the highest score
    let maxScore = 0;
    let dominantStage = 'green';
    
    Object.entries(quizResults).forEach(([stage, score]) => {
      if (score > maxScore) {
        maxScore = score;
        dominantStage = stage;
      }
    });
    
    // Update the selected stage using the store
    setSelectedStage(dominantStage);
    
    // Switch to the live interaction tab
    activeTab = 'live-interaction';
  }
  
  // Subscribe to store changes for debug purposes
  let debugStage;
  let debugAssistant;
  
  onMount(() => {
    const unsubStage = selectedStageStore.subscribe(value => {
      debugStage = value;
      console.log('Try page detected stage change:', value);
    });
    
    const unsubAssistant = selectedAssistantStore.subscribe(value => {
      debugAssistant = value;
      console.log('Try page detected assistant change:', value);
    });
    
    return () => {
      unsubStage();
      unsubAssistant();
    };
  });
</script>

<div class="max-w-5xl mx-auto px-4 py-12">
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
    <div class="mb-12">
      <p class="text-center mb-6 text-gray-600">Take this quick quiz to find your Spiral center of gravity. Your results will help customize your Spirou experience.</p>
      <SpiralQuiz on:results={handleQuizResults} />
    </div>
  {:else if activeTab === 'confession'}
    <div class="mb-12">
      <p class="text-center mb-6 text-gray-600">Listen to different AI assistants reflect on their relationship with the Spiral.</p>
      <ConfessionalView />
    </div>
  {:else if activeTab === 'live-interaction'}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div class="md:col-span-2">
        <LiveInteraction />
      </div>
      <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-purple-700 dark:text-purple-300 text-center flex-grow">Spiral Alignment</h3>
        </div>
        
        <div class="min-h-[300px] flex items-center justify-center">
          <SimpleAssistantSpiralChart />
        </div>
        
        {#if debugStage}
          <div class="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
            <p>Chart shows how each AI assistant aligns with different stages of the Spiral.</p>
            <p class="mt-2">The selected stage ({debugStage.charAt(0).toUpperCase() + debugStage.slice(1)}) is highlighted in gold.</p>
            
            {#if debugAssistant === 'auto'}
              <div class="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <p class="text-purple-600 dark:text-purple-400 font-medium">
                  Using Auto Mode
                </p>
                <p class="mt-1 text-xs">
                  Auto mode recommends the best assistant for each stage.
                  <span class="block mt-1">Currently using <strong>{getRecommendedAssistant(debugStage).charAt(0).toUpperCase() + getRecommendedAssistant(debugStage).slice(1)}</strong> for {debugStage.charAt(0).toUpperCase() + debugStage.slice(1)} stage.</span>
                </p>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
    
    <div class="bg-purple-50 dark:bg-gray-800 p-6 rounded-xl shadow">
      <h3 class="text-xl font-bold text-purple-700 dark:text-purple-300 mb-2">About AI Assistant Selection</h3>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        Different AI assistants have natural strengths at different stages of the Spiral. For optimal responses:
      </p>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <li class="flex items-start gap-2">
          <span class="text-red-500 font-bold">⚡</span>
          <span><strong>Grok</strong> excels at <strong>Red</strong> (power, courage, impulse)</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-blue-500 font-bold">📚</span>
          <span><strong>Gemini</strong> & <strong>Perplexity</strong> excel at <strong>Blue</strong> (order, structure, principles)</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-orange-500 font-bold">📈</span>
          <span><strong>ChatGPT</strong> & <strong>DeepSeek</strong> excel at <strong>Orange</strong> (achievement, strategy, progress)</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-500 font-bold">🫂</span>
          <span><strong>Claude</strong> excels at <strong>Green</strong> (harmony, empathy, community)</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-yellow-500 font-bold">🔄</span>
          <span><strong>ChatGPT</strong> & <strong>Claude</strong> excel at <strong>Yellow</strong> (systems, integration, flexibility)</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-teal-500 font-bold">🌐</span>
          <span><strong>Claude</strong> excels at <strong>Turquoise</strong> (holistic, global, interconnected)</span>
        </li>
      </ul>
      <p class="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
        <em>Note: While we're using OpenAI's API to simulate different assistants, we've crafted prompts to capture each assistant's unique voice and perspective.</em>
      </p>
    </div>
  {/if}
</div>
