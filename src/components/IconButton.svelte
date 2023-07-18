<script>
  import Icon from './Icon.svelte';
  export let id = '';
  export let active = false;
  export let css = 'text-md';
  export let text = undefined;

  $: btncss = active ? 'bg-zinc-700 hover:bg-zinc-600 drop-shadow-md text-zinc-400' : 'hover:bg-zinc-600 text-zinc-500';
</script>

<button class="flex items-center justify-between rounded-md p-0.5 leading-none {btncss}" on:click on:change>
  <Icon {css} {id} />
  {#if text}<span class="{css} mx-1">{text}</span>{/if}
</button>
