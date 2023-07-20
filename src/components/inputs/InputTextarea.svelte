<script>
  import InputWrap from './InputWrap.svelte';
  export let label;
  export let value;
  export let placeholder = undefined;
</script>

<InputWrap {label}>
  <textarea
    {placeholder}
    spellcheck="false"
    id="wrapped"
    bind:value
    rows="3"
    class="drop-shadow-md text-xs font-mono bg-zinc-900 text-zinc-400 border block w-full border-zinc-600 rounded-md px-2 py-1 focus:outline-none focus:border-zinc-300 placeholder:text-zinc-600" />
</InputWrap>
