<!-- src/lib/components/SimpleAssistantSpiralChart.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { getScoresArray, getAssistantColor, getAssistantNames } from '$lib/stores/assistantStore';
  import { selectedStageStore, selectedAssistantStore } from '$lib/stores/spiralStore';
  
  let selectedStage = 'green';
  let selectedAssistant = 'auto';
  let chartCanvas;
  let chart = null;
  let loadingStatus = 'Initializing...';
  let chartId = 'spiral-chart-' + Math.random().toString(36).substring(2, 9);
  
  // Subscribe to the stores
  const unsubscribeStage = selectedStageStore.subscribe(value => {
    console.log('Chart component received stage update:', value);
    selectedStage = value;
    if (chart) {
      // If chart exists, destroy it so we can recreate with new data
      chart.destroy();
      chart = null;
      // Recreate after a small delay
      setTimeout(() => createChart(), 50);
    }
  });
  
  const unsubscribeAssistant = selectedAssistantStore.subscribe(value => {
    console.log('Chart component received assistant update:', value);
    selectedAssistant = value;
    if (chart) {
      // If chart exists, destroy it so we can recreate with new data
      chart.destroy();
      chart = null;
      // Recreate after a small delay
      setTimeout(() => createChart(), 50);
    }
  });
  
  // Clean up subscriptions when component is destroyed
  onDestroy(() => {
    unsubscribeStage();
    unsubscribeAssistant();
    if (chart) {
      chart.destroy();
    }
  });
  
  // Stage data
  const stageLabels = [
    'Beige', 'Purple', 'Red', 'Blue', 'Orange', 
    'Green', 'Yellow', 'Turquoise', 'Coral', 'Ultraviolet'
  ];
  
  const stageIds = [
    'beige', 'purple', 'red', 'blue', 'orange', 
    'green', 'yellow', 'turquoise', 'coral', 'ultraviolet'
  ];
  
  // Function to get recommended assistant for a stage
  function getRecommendedAssistant(stage) {
    let maxScore = 0;
    let recommended = 'claude';
    
    getAssistantNames().forEach(assistant => {
      const scores = getScoresArray(assistant);
      const index = stageIds.indexOf(stage);
      if (scores[index] > maxScore) {
        maxScore = scores[index];
        recommended = assistant;
      }
    });
    
    return recommended;
  }
  
  async function createChart() {
    try {
      loadingStatus = 'Loading Chart.js...';
      const ChartModule = await import('chart.js/auto');
      const Chart = ChartModule.default;
      
      if (!chartCanvas) {
        loadingStatus = 'Canvas element not found';
        console.error('Canvas element not found');
        return;
      }
      
      loadingStatus = 'Preparing data...';
      console.log('Creating chart for stage:', selectedStage, 'assistant:', selectedAssistant);
      
      // Get base assistant color and data
      const baseAssistant = selectedAssistant === 'auto' ? getRecommendedAssistant(selectedStage) : selectedAssistant;
      console.log('Base assistant for chart:', baseAssistant);
      
      const assistantColor = getAssistantColor(baseAssistant);
      const currentAssistantScores = getScoresArray(baseAssistant);
      const highlightColor = 'rgba(255, 215, 0, 0.7)'; // Gold color
      
      // Get best assistants for tooltip
      const bestAssistantPerStage = stageIds.map(stageId => {
        return getRecommendedAssistant(stageId);
      });
      
      // Create datasets array - will have either 1 or 2 datasets
      const datasets = [{
        label: selectedAssistant === 'auto' 
          ? `Auto: ${baseAssistant.charAt(0).toUpperCase() + baseAssistant.slice(1)}` 
          : selectedAssistant.charAt(0).toUpperCase() + selectedAssistant.slice(1),
        data: currentAssistantScores,
        backgroundColor: `${assistantColor}33`,
        borderColor: assistantColor,
        pointBackgroundColor: stageIds.map(stageId => 
          stageId === selectedStage ? highlightColor : assistantColor
        ),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: assistantColor
      }];
      
      // If in auto mode, we don't need a second dataset since we're already showing
      // the recommended assistant as the primary dataset
      
      loadingStatus = 'Creating chart...';
      const ctx = chartCanvas.getContext('2d');
      
      chart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: stageLabels,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              beginAtZero: true,
              min: 0,
              max: 5,
              ticks: {
                stepSize: 1
              }
            }
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 10,
                padding: 10
              }
            },
            tooltip: {
              callbacks: {
                title: function(context) {
                  const index = context[0].dataIndex;
                  return `${stageLabels[index]}: ${context[0].formattedValue}/5`;
                },
                footer: function(context) {
                  const index = context[0].dataIndex;
                  const bestAssistant = bestAssistantPerStage[index];
                  return `Best for this stage: ${bestAssistant.charAt(0).toUpperCase() + bestAssistant.slice(1)}`;
                }
              }
            }
          }
        }
      });
      
      loadingStatus = 'Chart created successfully!';
      console.log('Chart created successfully for stage:', selectedStage);
    } catch (error) {
      loadingStatus = `Error: ${error.message}`;
      console.error('Chart creation error:', error);
    }
  }

  onMount(() => {
    console.log('SimpleAssistantSpiralChartStore mounted with stage:', selectedStage);
    // Create chart when component mounts
    createChart();
  });
</script>

<div class="chart-container" style="position: relative; height:300px; width:100%;">
  <p class="text-sm text-gray-500 text-center mb-2">{loadingStatus}</p>
  <canvas id={chartId} bind:this={chartCanvas}></canvas>
</div>
