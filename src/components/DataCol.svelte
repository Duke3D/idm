<script>
  export let css = '';
</script>

<div class={css + ' pt-2 px-2 text-slate-400 overflow-y-auto flex flex-col'}>
  <slot />
</div>
