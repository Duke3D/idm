<script>
  import Icon from "./Icon.svelte";
  export let id = "";
  export let active = false;

  $: css = active ? "bg-zinc-700 hover:bg-zinc-600 drop-shadow-md" : "hover:bg-zinc-600";
</script>

<button class="rounded-md p-0.5 leading-none {css}" on:click on:change>
  <Icon {id} />
</button>
