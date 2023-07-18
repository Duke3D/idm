<script>
  import { convertFileSrc } from "@tauri-apps/api/tauri";
  import {
    gridImgWidth,
    imgDisplayStyle,
    gridImgFilter,
  } from "../util/settings.js";
  import { onMount, onDestroy } from "svelte";
  import IconButton from "../components/IconButton.svelte";
  import InputText from "../components/inputs/InputText.svelte";
  import * as tagFun from "../util/tags.js";
  export let images;
  export let dataset;
  export let activeImages;

  // image grid style
  $: gridStyle = `grid-template-columns: repeat(auto-fill, minmax(${$gridImgWidth}px, 1fr));`;

  // filter result
  $: visibleImages = getGridImages(images, $gridImgFilter);
  const getGridImages = (i, f) => {
    // take the filter string and split it by spaced and commans
    const filter = f.split(/[\s,]+/);
    // iterate the filter objects in the array
    filter.forEach((fil) => {
      // Filter for path, tags ("tag", !"tag"), or tag counts ({group}>2, {any}<1)
      if (fil.match(/^".*"$/)) {
        // "tag" - must have tag
        const tag = tagFun.resolveTagName(dataset, fil.replace(/"/g, ""));
        if (tag) i = i.filter((img) => img.tags.indexOf(tag.id) >= 0);
      } else if (fil.match(/^!"[^"]*"$/)) {
        // !"tag" - must not have tag
        const tag = tagFun.resolveTagName(
          dataset,
          fil.replace(/^!"(.*)"$/, "$1")
        );
        if (tag) i = i.filter((img) => img.tags.indexOf(tag.id) < 0);
      } else if (fil.match(/{.*}>[0-9]+/)) {
        // {group}>2 - must have more than 2 tags
        const [group, count] = fil.replace(/[{}]/g, "").split(">");
        const tags = dataset.tagGroups.find((g) => g.name == group)?.tags;
        if (tags)
          i = i.filter(
            (img) =>
              img.tags.filter((tag) => tags.indexOf(tag) >= 0).length > count
          );
        else if (group == "any") i = i.filter((img) => img.tags.length > count);
      } else if (fil.match(/{.*}<[0-9]+/)) {
        // {any}<1 - must have less than 1 tag
        const [group, count] = fil.replace(/[{}]/g, "").split("<");
        const tags = dataset.tagGroups.find((g) => g.name == group)?.tags;
        if (tags)
          i = i.filter(
            (img) =>
              img.tags.filter((tag) => tags.indexOf(tag) >= 0).length < count
          );
        else if (group == "any") i = i.filter((img) => img.tags.length < count);
      } else {
        // path - path must include
        i = i.filter((img) => img.path.includes(fil));
      }
    });

    // sort
    i = i.sort((a, b) => {
      if (!a.export) return 1;
      if (!b.export) return -1;
      return 0;
    });

    return i;
  };

  const keyDown = (e) => {
    if (activeImages.length > 1) return;
    // arrow key up and down to navigate to next, previous image
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const index = visibleImages.findIndex((img) => img === activeImages[0]);
      if (index > 0) {
        activeImages[0] = visibleImages[index - 1];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const index = visibleImages.findIndex((img) => img === activeImages[0]);
      if (index < visibleImages.length - 1) {
        activeImages[0] = visibleImages[index + 1];
      }
    }
  };

  onMount(() => {
    window.addEventListener("keydown", keyDown);
  });

  onDestroy(() => {
    window.removeEventListener("keydown", keyDown);
  });
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
      on:click={(e) => {
        $imgDisplayStyle = "table";
      }}
    />
    <IconButton
      id="grid_on"
      active={$imgDisplayStyle === "grid"}
      on:click={(e) => {
        $imgDisplayStyle = "grid";
      }}
    />
    <InputText
      bind:value={$gridImgFilter}
      placeholder={`Filter for path, tags ("tag", !"tag"), or tag counts ({group}>2, {any}<1)`}
    />
    <input type="range" min="80" max="250" bind:value={$gridImgWidth} />
  </div>
  {#if $imgDisplayStyle === "grid"}
    <div class="grid gap-2 overflow-y-auto p-1 user-select: none;" style={gridStyle}>
      {#each visibleImages as img (img.path)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img
          on:click={(e) => {
            // if pressed shift, add to active images
            if (e.shiftKey) {
              if (activeImages.indexOf(img) < 0) {
                activeImages = [...activeImages, img]
              } else {
                activeImages = activeImages.filter((i) => i !== img)}
            } else {
              if (activeImages.length === 1 && activeImages[0] === img) {
                activeImages = []
              } else {
                activeImages = [img]
              }
            }
          }}
          class="cursor-pointer rounded-md drop-shadow-md border border-zinc-900 {!img.export
            ? 'opacity-30 grayscale brightness-50'
            : ''} {activeImages.indexOf(img) >= 0
            ? 'outline outline-zinc-300'
            : 'hover:border-zinc-500'}"
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
          {#each images as img, i (img.path)}
            <tr>
              <td>{i}</td>
              <td class="truncate" style="text-align:right;"
                ><span>{img.path}</span></td
              >
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
