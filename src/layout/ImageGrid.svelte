<script>
  import { convertFileSrc } from "@tauri-apps/api/tauri";
  import IconButton from "../components/IconButton.svelte";
  export let images;

  // image grid style
  let imgWidth = 100
  $: gridStyle = `grid-template-columns: repeat(auto-fill, minmax(${imgWidth}px, 1fr));`
  let displayStyle = "grid"
</script>

<div class="grid gap-2 divide-y divide-zinc-700 h-screen" style="grid-template-rows: auto 1fr">
  <div class="grid gap-1 text-lg" style="grid-template-columns: auto auto 1fr auto">
    <IconButton id="table_rows" active={displayStyle==="table"} click={ e => { displayStyle="table"}}/>
    <IconButton id="grid_on" active={displayStyle==="grid"} click={ e => { displayStyle="grid"}}/>
    <span></span>
    <input type=range min=50 max=200 bind:value={imgWidth} />
  </div>
  <div class="grid gap-2 overflow-y-auto" style={gridStyle}>
    {#each images as img, i}
      <img class="rounded-md" src={convertFileSrc(img.path)} alt={img.path} loading="lazy" />
    {/each}
  </div>
</div>

<style> 
  
</style>

