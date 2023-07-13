<script>
  import { convertFileSrc } from "@tauri-apps/api/tauri";
  import { gridImgWidth, imgDisplayStyle, gridImgFilter } from "../util/settings.js";
  import IconButton from "../components/IconButton.svelte";
  import InputText from "../components/inputs/InputText.svelte";
  export let images
  export let dataset
  export let activeImage

  // image grid style
  $: gridStyle = `grid-template-columns: repeat(auto-fill, minmax(${$gridImgWidth}px, 1fr));`;

  // filter result
  $: images_filtered = filterImages(images, $gridImgFilter)
  const filterImages = (i, f)=>{
    // take the filter string and split it by spaced and commans
    const filter = f.split(/[\s,]+/)
    // iterate the filter objects in the array
    filter.forEach( fil => {
      // Filter for path, tags ("tag", !"tag"), or tag counts ({group}>2, {any}<1)
      if(fil.match(/^".*"$/)){
         // "tag" - must have tag
        const tag = fil.replace(/"/g, "")
        i = i.filter( img => img.tags.includes(tag) )
        console.log(`must have tag ${tag}`)
      } else if(fil.match(/^!"[^"]*"$/)){
        // !"tag" - must not have tag
        const tag = fil.replace(/^!"(.*)"$/, '$1');
        i = i.filter( img => !img.tags.includes(tag) )
        console.log(`must not have tag ${tag}`)
      } else if(fil.match(/{.*}>[0-9]+/)){
        // {group}>2 - must have more than 2 tags
        const [group, count] = fil.replace(/[{}]/g, "").split(">")
        const tags = dataset.tagGroups.find( g => g.name == group)?.tags
        if(tags)
          i = i.filter( img => img.tags.filter( tag => tags.includes(tag)).length > count )
        else if(group == "any")
          i = i.filter( img => img.tags.length > count)
        console.log(`must have more than ${count} tags in group ${group}`)
      } else if(fil.match(/{.*}<[0-9]+/)){
        // {any}<1 - must have less than 1 tag
        const [group, count] = fil.replace(/[{}]/g, "").split("<")
        const tags = dataset.tagGroups.find( g => g.name == group)?.tags
        if(tags)
          i = i.filter( img => img.tags.filter( tag => tags.includes(tag)).length < count )
        else if(group == "any")
          i = i.filter( img => img.tags.length < count)
        console.log(`must have less than ${count} tags in group ${group}`)
      } else {
        // path - path must include
        i = i.filter( img => img.path.includes(fil) )
        console.log(`path must include ${fil}`)
      }
    })
    console.log(i.length)
    return i
  }

</script>

<div
  class="grid gap-2 divide-y divide-zinc-700 h-screen"
  style="grid-template-rows: auto 1fr"
>
  <div
    class="grid gap-1 text-lg"
    style="grid-template-columns: auto auto 1fr auto auto"
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
    <InputText bind:value={$gridImgFilter} placeholder={`Filter for path, tags ("tag", !"tag"), or tag counts ({group}>2, {any}<1)`}/>
    <input type="range" min="80" max="250" bind:value={$gridImgWidth} />

    
  </div>
  {#if $imgDisplayStyle === "grid"}
    <div class="grid gap-2 overflow-y-auto" style={gridStyle}>
      {#each images_filtered as img (img.path)}
        <img
          on:click={()=>{ activeImage = img }}
          class="cursor-pointer rounded-md border {activeImage === img ? 'border-zinc-400' : 'border-zinc-900 hover:border-zinc-600'}"
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
          {#each images as img (img.path)}
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
