<script>
  import InputMultiBlock from "../components/inputs/InputMultiBlock.svelte";
  import InputTextarea from "../components/inputs/InputTextarea.svelte";
  import InputText from "../components/inputs/InputText.svelte";
  import InputSelect from "../components/inputs/InputSelect.svelte";
  import Button from "../components/Button.svelte";
  import {
    parseTags,
    toggleTagOnImage,
    getImageDescription,
  } from "../util/tags";
  import IconButton from "../components/IconButton.svelte";
  import InputNumber from "../components/inputs/InputNumber.svelte";
  import { invoke } from "@tauri-apps/api/tauri";
  export let dataset = undefined;
  export let activeImage = undefined;

  let editGroups = [];
  let exportStatus = "Export";
</script>

<InputMultiBlock>
  <InputTextarea
    label={"Description String"}
    bind:value={dataset.descriptionString}
  />
  <div class="grid grid-cols-2 gap-2">
    <InputNumber label={"Precrop Width"} bind:value={dataset.exportCropWidth} />
    <InputNumber label={"Precrop Height"} bind:value={dataset.exportCropHeight} />
  </div>
  <div class="grid grid-cols-2 gap-2">
    <InputNumber label={"Out Width"} bind:value={dataset.exportWidth} />
    <InputNumber label={"Out Height"} bind:value={dataset.exportHeight} />
  </div>
  <InputText
    label={"Export Path"}
    bind:value={dataset.exportPath}
    path={"folder"}
  />
  <div class="grid grid-cols-2 gap-2">
    <Button
      text={exportStatus}
      col={"green"}
      click={() => {
        let done = 0,
          max = dataset.images.length;
        exportStatus = `Exporting: 0/${max}`;
        let tasks = dataset.images.map((img, i) =>
          invoke("export_image", {
            imgPath: img.path,
            exportPath:
              dataset.exportPath +
              (dataset.exportPath.endsWith("/") ? "" : "/") +
              i +
              ".png",
            description: getImageDescription(dataset, img),
            width: dataset.exportWidth,
            height: dataset.exportHeight,
            cropwidth: dataset.exportCropWidth,
            cropheight: dataset.exportCropHeight,
          }).then(() => (exportStatus = `Exporting: ${++done}/${max}`))
        );

        Promise.all(tasks).then(() => {
          exportStatus = `Export done! ${max}/${max}`;
        });
      }}
    />
    <Button
      text={"Reveal in Explorer"}
      col={"zinc"}
      click={() => {
        invoke("open_explorer", { path: dataset.exportPath });
      }}
    />
  </div>

  {#each dataset.tagGroups as group, i}
    <InputMultiBlock dense={true}>
      {#if editGroups.indexOf(group) >= 0}
        <InputText label={"Group Name"} bind:value={group.name} />
        <InputTextarea label={"Tag List"} bind:value={group.tags} />
        <!-- <span class="text-xs">{parseTags(group.tags).length} tags</span> -->
        <div class="grid grid-cols-2 gap-2">
          <Button
            text={"Ok"}
            col={"green"}
            click={() => {
              editGroups.splice(editGroups.indexOf(group), 1);
              editGroups = editGroups;
            }}
          />
          <Button
            text={"Remove"}
            col={"zinc"}
            click={() => {
              dataset.tagGroups = dataset.tagGroups.filter((_, j) => {
                return i !== j;
              });
            }}
          />
        </div>
      {:else}
        <span class="text-xs font-bold text-zinc-300 block mb-1"
          >{group.name}
          <span class="float-right text sm">
            <IconButton
              id="edit"
              active={true}
              click={(e) => {
                editGroups = [...editGroups, group];
              }}
            />
          </span>
        </span>

        {#each parseTags(group.tags) as tag}
          <button
            class="{activeImage?.tags.indexOf(tag) >= 0
              ? 'bg-zinc-500 text-zinc-200 border'
              : 'bg-zinc-700 text-zinc-400 border border-zinc-800'} focus-visible:outline-none text-xs font-bold shadow-md rounded-md px-2 mr-1 mb-0.5"
            on:click={(e) => {
              if (activeImage) {
                activeImage = toggleTagOnImage(activeImage, tag);
              }
            }}
          >
            {tag}
          </button>
        {/each}
      {/if}
    </InputMultiBlock>
  {/each}

  <div class="text-sm">
    <IconButton
      id="add"
      active={true}
      click={(e) => {
        dataset.tagGroups = [...dataset.tagGroups, { name: "Group", tags: "" }];
      }}
    />
  </div>
</InputMultiBlock>
