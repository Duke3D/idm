<script>
  import InputWrap from "./InputWrap.svelte"
  export let label
  export let value
</script>

<InputWrap {label}>
  <input
    id="wrapped"
    bind:value
    type="text"
    class="shadow-sm bg-zinc-900 text-zinc-400 border block w-full border-zinc-600 rounded-lg px-2 py-1 focus:outline-none focus:border-zinc-300"
  />
</InputWrap>
