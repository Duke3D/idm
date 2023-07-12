<script>
  import { convertFileSrc } from "@tauri-apps/api/tauri";
  import { gridImgWidth, imgDisplayStyle } from "../util/settings.js";
  import IconButton from "../components/IconButton.svelte";
  export let images
  export let activeImage

  // image grid style
  $: gridStyle = `grid-template-columns: repeat(auto-fill, minmax(${$gridImgWidth}px, 1fr));`;

</script>

<div
  class="grid gap-2 divide-y divide-zinc-700 h-screen"
  style="grid-template-rows: auto 1fr"
>
  <div
    class="grid gap-1 text-lg"
    style="grid-template-columns: auto auto 1fr auto"
  >
    <IconButton
      id="table_rows"
      active={$imgDisplayStyle === "table"}
      click={(e) => {
        $imgDisplayStyle = "table";
      }}
    />
    <IconButton
      id="grid_on"
      active={$imgDisplayStyle === "grid"}
      click={(e) => {
        $imgDisplayStyle = "grid";
      }}
    />
    <span />
    <input type="range" min="80" max="250" bind:value={$gridImgWidth} />
  </div>
  {#if $imgDisplayStyle === "grid"}
    <div class="grid gap-2 overflow-y-auto" style={gridStyle}>
      {#each images as img, i}
        <img
          on:click={()=>{ activeImage = img }}
          class="rounded-md border {activeImage === img ? 'border-zinc-400' : 'border-zinc-900'}"
          src={convertFileSrc(img.path)}
          alt={img.path}
          loading="lazy"
        />
      {/each}
    </div>
  {:else if $imgDisplayStyle === "table"}
    <div class="overflow-y-auto"> 
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th class="truncate">Path</th>
          </tr>
        </thead>
        <tbody>
          {#each images as img, i}
            <tr>
              <td>{i}</td>
              <td class="truncate" style='text-align:right;'><span>{img.path}</span></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>

<style>
  table {
    max-width: 100%;
    display: table;
  }
  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 0;
    width: 100%;
  }
</style>
