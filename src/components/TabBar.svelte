<script>
  export let active;
  export let tabs = [];
</script>

<div class="flex bg-zinc-900">
  {#each tabs as tab, i}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      on:click={(e) => (active = tab)}
      class="cursor-pointer px-2 py-1 text-sm border-zinc-700  border-r {active === tab
        ? 'text-zinc-300 bg-zinc-800'
        : 'text-zinc-600 border-b'}
        "
    >
      {tab}
    </div>
  {/each}
  <div class="flex-grow border-b border-zinc-700"></div>
</div>
