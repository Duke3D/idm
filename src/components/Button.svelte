<script>
  export let text = ''
  export let col = 'sky'
  export let css = ''

  export let click = ()=>{}
</script>

<button
  on:click={click}
  class="text-white font-semibold py-2 text-sm bg-{col}-500 hover:bg-{col}-700 w-full rounded-md {css}">{text}</button>