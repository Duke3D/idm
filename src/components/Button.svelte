<script>
  export let text = ''
  export let css = ''
  export let col = 'zinc'
  export let click = ()=>{}
  export let disabled = false
  
  let cols
  $: {
    cols = {
    zinc  : 'bg-zinc-500 hover:bg-zinc-400 text-zinc-800',
    sky   : 'bg-sky-500 hover:bg-sky-400 text-sky-950',
    indigo: 'bg-indigo-500 hover:bg-indigo-400 text-indigo-950',
    disabled: 'bg-zinc-600 text-zinc-800'
   }[disabled ? 'disabled' : col]

  } 

</script>

<button
  on:click={click}
  { disabled }
  class="font-semibold py-1 text-sm {cols} w-full rounded-md {css} disabled:opacity-75">{text}</button>