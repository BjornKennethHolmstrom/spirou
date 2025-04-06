<!-- src/routes/contact/+page.svelte -->
<script lang="ts">
  export let formSubmitted = false;
</script>

<div class="max-w-3xl mx-auto py-16 px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <h1 class="text-4xl font-bold mb-6 text-purple-700">Contribute & Contact</h1>

  <p class="mb-8 text-gray-700">
    Spirou is an open, evolving project—and your energy is welcome! Whether you want to collaborate on development, contribute ideas, or just share feedback, we'd love to hear from you.
  </p>

  <div class="mb-12">
    <h2 class="text-2xl font-semibold mb-4">Contribute on GitHub</h2>
    <p class="text-gray-700 mb-4">
      The source code and design discussions live on GitHub. Feel free to star the project, open issues, or submit pull requests.
    </p>
    <a
      href="https://github.com/BjornKennethHolmstrom/spirou"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded shadow"
    >
      Visit GitHub Repository
    </a>
  </div>

  <div class="mb-12">
    <h2 class="text-2xl font-semibold mb-4">Send a Message</h2>
    {#if formSubmitted}
      <div class="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded">
        Thank you! Your message has been sent.
      </div>
    {:else}
      <form
        action="https://formspree.io/f/mrbpobed"
        method="POST"
        on:submit={() => formSubmitted = true}
        class="space-y-6"
      >
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          placeholder="Your full name"
          class="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="you@example.com"
          class="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          placeholder="Share your thoughts, ideas, or questions..."
          class="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        ></textarea>
      </div>

        <button
          type="submit"
          class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md shadow transition duration-150 ease-in-out"
        >
          Send Message
        </button>
      </form>
    {/if}
  </div>
</div>
