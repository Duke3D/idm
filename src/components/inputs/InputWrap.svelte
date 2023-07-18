<script>
  export let label = undefined;
</script>

<div class="relative block">
  {#if label !== undefined}
    <label class="block mb-1 text-xs font-medium text-zinc-400" for="wrapped">{label}</label>
  {/if}
  <slot id="input" />
</div>

<style></style>
