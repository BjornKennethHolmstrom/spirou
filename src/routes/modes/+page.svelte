<!-- src/routes/modes/+page.svelte -->
<script lang="ts">
  const modes = [
    {
      title: "🌀 Spiral Matching",
      color: "from-green-100 to-green-200",
      textColor: "text-green-800",
      description:
        "Discover your current stage and get guidance matched to your personal evolution."
    },
    {
      title: "✨ Transcendent Mode",
      color: "from-yellow-100 to-yellow-200",
      textColor: "text-yellow-800",
      description:
        "Explore mysteries, paradoxes, and beyond-stage reflections through mystical dialogue."
    },
    {
      title: "🔮 Inner Guide Mode",
      color: "from-blue-100 to-blue-200",
      textColor: "text-blue-800",
      description:
        "Engage in reflective practices, journaling prompts, and spiritual growth sessions."
    },
    {
      title: "🛠️ Worldbuilder Mode",
      color: "from-pink-100 to-pink-200",
      textColor: "text-pink-800",
      description:
        "Co-create systems, policies, or worlds—Spirou helps build the future with you."
    },
    {
      title: "🌌 Beyond the Spiral",
      color: "from-purple-100 to-purple-200",
      textColor: "text-purple-800",
      description:
        "Venture past known models into open consciousness—where emergence meets the unknown."
    }
  ];
</script>

<svelte:head>
  <title>Modes of Spirou | Spirou</title>
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <section class="text-center py-24 px-6">
    <h1 class="text-5xl md:text-6xl font-extrabold text-purple-700 mb-4">Modes of Spirou</h1>
    <p class="text-xl md:text-2xl text-purple-600 mb-8 max-w-2xl mx-auto">
      Different ways to experience the Spiral—tailored to your inner journey and outer expression.
    </p>
  </section>

  <section class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-20">
    {#each modes as mode}
      <div class={`bg-gradient-to-br ${mode.color} p-6 rounded-xl shadow text-center`}>
        <h3 class={`font-semibold text-xl mb-2 ${mode.textColor}`}>{mode.title}</h3>
        <p class="text-sm text-gray-700">{mode.description}</p>
      </div>
    {/each}
  </section>
</div>

