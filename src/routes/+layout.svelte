<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import { base } from '$app/paths';
  import { getPath, isActiveRoute } from '$lib/utils';

  let sidebarOpen = false;
  let darkMode = false;

  $: currentPath = $page.url.pathname;

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }

  function toggleDarkMode() {
    darkMode = !darkMode;
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', String(darkMode));
  }

  onMount(() => {
    // Prefer localStorage setting, fallback to system setting
    const storedPreference = localStorage.getItem('darkMode');
    if (storedPreference !== null) {
      darkMode = storedPreference === 'true';
    } else {
      darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    document.documentElement.classList.toggle('dark', darkMode);
  });

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/stages', label: 'The Spiral' },
    { href: '/modes', label: 'Modes of Spirou' },
    { href: '/try', label: 'Try Spirou!' },
    { href: '/about', label: 'About Spirou' },
    { href: '/contact', label: 'Contribute / Contact' }
  ];
</script>

<style>
  .active {
    font-weight: bold;
    color: #7c3aed; /* violet-600 */
  }
</style>

<div class="min-h-screen flex bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <!-- Sidebar -->
  <aside class={`w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform bg-gradient-to-b from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 md:relative md:translate-x-0 transition duration-200 ease-in-out z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
    <nav>
      <h2 class="text-xl font-bold px-4 mb-4">Spirou</h2>
      {#each navItems as item}
        <a
          href={getPath(item.href)}
          class="block px-4 py-2 rounded hover:bg-purple-300 dark:hover:bg-purple-700 transition-colors"
          class:active={isActiveRoute(currentPath, item.href)}
        >
          {item.label}
        </a>
      {/each}
    </nav>
  </aside>

  <!-- Content -->
  <div class="flex-1 flex flex-col">
    <!-- Header -->
    <header class="flex items-center justify-between bg-purple-500 text-white px-6 py-4 shadow-md">
      <div class="flex items-center space-x-4">
        <button
          class="md:hidden text-white focus:outline-none"
          on:click={toggleSidebar}
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <a href={getPath('/')} class="flex items-center space-x-3 hover:opacity-90 transition-opacity">
          <img src={getPath('/logo.svg')} alt="Spirou Logo" class="h-8 w-8" />
          <h1 class="text-xl font-semibold text-white">Spirou</h1>
        </a>
      </div>
      <div class="flex items-center space-x-4">
        <button
          class="focus:outline-none text-white"
          on:click={toggleDarkMode}
          title="Toggle dark mode"
        >
          {#if darkMode}
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M21 12.79A9 9 0 0111.21 3 7 7 0 1012 21a9 9 0 009-8.21z"
              />
            </svg>
          {:else}
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 4.5a1 1 0 011-1V2a1 1 0 10-2 0v1.5a1 1 0 011 1zM18.364 5.636a1 1 0 00-1.414-1.414l-1.06 1.06a1 1 0 101.414 1.415l1.06-1.06zM20 11h-1.5a1 1 0 100 2H20a1 1 0 100-2zM5.636 5.636a1 1 0 00-1.414 1.414l1.06 1.06a1 1 0 001.414-1.415l-1.06-1.06zM4.5 11H3a1 1 0 100 2h1.5a1 1 0 100-2zM5.636 18.364a1 1 0 001.414 0l1.06-1.06a1 1 0 10-1.414-1.415l-1.06 1.06a1 1 0 000 1.415zM12 19.5a1 1 0 01-1 1V22a1 1 0 102 0v-1.5a1 1 0 01-1-1zM18.364 18.364a1 1 0 001.414-1.414l-1.06-1.06a1 1 0 10-1.414 1.414l1.06 1.06zM12 7a5 5 0 100 10 5 5 0 000-10z"
              />
            </svg>
          {/if}
        </button>
      </div>
    </header>

    <!-- Page content -->
    <main class="flex-1 p-6">
      <slot />
    </main>
  </div>
</div>
