
<script>
  export let label = undefined;
  export let value = undefined;
</script>

<div class="flex items-center justify-between w-full">
  <label for=export class="text-xs text-zinc-400 break-all">{label}</label>
  <input id=export type="checkbox" bind:checked={value} on:change/>
</div>