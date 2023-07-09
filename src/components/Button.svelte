<script>
  export let text = ''
  export let col = 'sky'
  export let css = ''
  export let click = ()=>{}

  const cols = {
    sky   : 'bg-sky-500 hover:bg-sky-700',
    indigo: 'bg-indigo-500 hover:bg-indigo-700',
    slate : 'bg-slate-500 hover:bg-slate-700'
  }[col]

</script>

<button
  on:click={click}
  class="text-white font-semibold py-2 text-sm {cols} w-full rounded-md {css}">{text}</button>