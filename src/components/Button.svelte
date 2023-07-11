<script>
  export let text = ''
  export let col = 'zinc'
  export let css = ''
  export let click = ()=>{}

  const cols = {
    zinc  : 'bg-zinc-500 hover:bg-zinc-400 text-zinc-800',
    sky   : 'bg-sky-500 hover:bg-sky-400 text-sky-950',
    indigo: 'bg-indigo-500 hover:bg-indigo-400 text-indigo-950',
  }[col]

</script>

<button
  on:click={click}
  class="font-semibold py-1 text-sm {cols} w-full rounded-md {css}">{text}</button>