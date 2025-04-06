// src/lib/stores/spiralStore.ts
import { writable } from 'svelte/store';

// Create stores for the spiral stage and assistant selection
export const selectedStageStore = writable('green');
export const selectedAssistantStore = writable('auto');

// Function to update the selected stage
export function setSelectedStage(stage: string) {
  console.log('Store: Setting selected stage to', stage);
  selectedStageStore.set(stage);
}

// Function to update the selected assistant
export function setSelectedAssistant(assistant: string) {
  console.log('Store: Setting selected assistant to', assistant);
  selectedAssistantStore.set(assistant);
}
