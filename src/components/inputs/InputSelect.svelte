<script>
  import InputWrap from "./InputWrap.svelte";
  export let label
  export let array
  export let value
  export let empty
</script>

<InputWrap {label}>
  <select
    id="recent"
    size="5"
    class="p-1 bg-zinc-700 rounded-md block w-full text-xs font-medium text-zinc-300 overflow-y-auto drop-shadow-md"
    bind:value
  >
    {#each array as recent}
      <option class="truncate font-medium" value={recent}>{recent}</option>
    {:else}
      <option class="opacity-75" value={undefined} disabled>{empty}</option>
    {/each}
  </select>
  <slot></slot>
</InputWrap>
