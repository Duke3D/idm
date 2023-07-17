<script>
  import InputMultiBlock from "../components/inputs/InputMultiBlock.svelte";
  import InputText from "../components/inputs/InputText.svelte";
  import InputSelect from "../components/inputs/InputSelect.svelte";
  import { convertFileSrc } from "@tauri-apps/api/tauri";
  import { getImageDescription } from "../util/images";
  import IconButton from "../components/IconButton.svelte";
  import InputCheckbox from "../components/inputs/InputCheckbox.svelte";
  export let activeImages;
  export let dataset;
</script>

<InputMultiBlock>
  <span class="text-xs text-zinc-300">Editing {activeImages.length} images. Clicking tags will toggle them for all selected images.</span>
  <!-- <div>
    <img
      class="rounded-md w-full"
      src={convertFileSrc(activeImage.path)}
      alt={activeImage.path}
      loading="lazy"
    />
  </div>
  <div class="text-xs text-zinc-300 break-all">
    {getImageDescription(dataset, activeImage)}
  </div>

  <InputCheckbox
    label="Export"
    bind:value={activeImage.export}
    on:change={(e) => {
      dataset.images = dataset.images;
    }}
  />
  <div class="text-xs text-zinc-600 break-all">{activeImage.path}</div> -->
</InputMultiBlock>
