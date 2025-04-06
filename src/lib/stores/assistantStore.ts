// src/lib/stores/assistantStore.ts
import { writable } from 'svelte/store';

// Define the type for assistant scores
export interface AssistantProfile {
  scores: Record<string, number>;
  color: string;
}

// The main data store containing all assistant profiles
const assistantProfiles: Record<string, AssistantProfile> = {
  chatgpt: {
    scores: { 
      beige: 2, purple: 3, red: 3, blue: 5, orange: 5, 
      green: 4, yellow: 5, turquoise: 4, coral: 4, ultraviolet: 3 
    },
    color: '#10a37f'
  },
  claude: {
    scores: { 
      beige: 2, purple: 4, red: 3, blue: 5, orange: 4, 
      green: 5, yellow: 5, turquoise: 5, coral: 4, ultraviolet: 3 
    },
    color: '#794bc4'
  },
  grok: {
    scores: { 
      beige: 3, purple: 3, red: 4, blue: 3, orange: 5, 
      green: 3, yellow: 5, turquoise: 4, coral: 2, ultraviolet: 2 
    },
    color: '#1f1f1f' // or '#AAAAAA' as in other components
  },
  deepseek: {
    scores: { 
      beige: 1, purple: 4, red: 4, blue: 5, orange: 5, 
      green: 4, yellow: 5, turquoise: 4, coral: 3, ultraviolet: 2 
    },
    color: '#007FFF'
  },
  gemini: {
    scores: { 
      beige: 2, purple: 3, red: 2, blue: 5, orange: 5, 
      green: 4, yellow: 5, turquoise: 3, coral: 2, ultraviolet: 2 
    },
    color: '#4285F4'
  },
  perplexity: {
    scores: { 
      beige: 1, purple: 4, red: 3, blue: 5, orange: 5, 
      green: 4, yellow: 5, turquoise: 4, coral: 2, ultraviolet: 2 
    },
    color: '#222222'
  }
};

// Helper function to convert object scores to array format for the radar chart
export function getScoresArray(assistant: string): number[] {
  const stages = ['beige', 'purple', 'red', 'blue', 'orange', 'green', 'yellow', 'turquoise', 'coral', 'ultraviolet'];
  const profile = assistantProfiles[assistant];
  
  if (!profile) return Array(stages.length).fill(0);
  
  return stages.map(stage => profile.scores[stage] || 0);
}

// Create a writable store with the profiles
export const assistantStore = writable(assistantProfiles);

// Helper functions for common operations
export function getAssistantColor(assistant: string): string {
  return assistantProfiles[assistant]?.color || '#888888';
}

export function getAssistantNames(): string[] {
  return Object.keys(assistantProfiles);
}

export default {
  assistantStore,
  getScoresArray,
  getAssistantColor,
  getAssistantNames
};
