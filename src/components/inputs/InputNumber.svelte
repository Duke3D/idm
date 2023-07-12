<script>
  import InputWrap from "./InputWrap.svelte"
  export let label
  export let value
  export let min = 0
  export let max = Infinity
</script>

<InputWrap {label}>
  <input
    id="wrapped"
    bind:value
    {min} {max}
    type="number"
    class="drop-shadow-md text-xs font-mono bg-zinc-900 text-zinc-400 border block w-full border-zinc-600 rounded-md px-2 py-1 focus:outline-none focus:border-zinc-300"
  />
</InputWrap>
