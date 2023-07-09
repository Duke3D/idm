<script>
  export let dataset
</script>

<label class="relative block">
  <input
  class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300
  rounded-md py-2 p-3 shadow-sm focus:outline-none focus:border-sky-500
  focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Dataset Name" type="text" name="name" bind:value={dataset.name}/>
</label>