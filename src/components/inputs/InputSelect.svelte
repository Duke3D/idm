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
    class="bg-zinc-700 rounded-md block w-full text-sm font-medium text-zinc-300"
    bind:value
  >
    {#each array as recent, i}
      <option class="truncate font-medium" value={recent}>{recent}</option>
    {:else}
      <option>{empty}</option>
    {/each}
  </select>
  <slot></slot>
</InputWrap>
