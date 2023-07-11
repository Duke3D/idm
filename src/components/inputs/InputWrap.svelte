<script>
  export let label;
</script>

<div class="relative block">
  <label
    class="block mb-1 text-sm font-medium text-zinc-400"
    for="wrapped">{label}</label
  >
  <slot id="input" />
</div>
