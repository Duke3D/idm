<script>
  export let css = '';
</script>

<div class={css + ' p-2 text-slate-400 overflow-y-auto flex flex-col'}>
  <slot />
</div>
