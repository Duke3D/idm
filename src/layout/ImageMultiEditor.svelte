<script>
  import InputMultiBlock from "../components/inputs/InputMultiBlock.svelte";
  import InputText from "../components/inputs/InputText.svelte";
  import InputSelect from "../components/inputs/InputSelect.svelte";
  import { convertFileSrc } from "@tauri-apps/api/tauri";
  import { getImageDescription } from "../util/images";
  import IconButton from "../components/IconButton.svelte";
  import InputCheckbox from "../components/inputs/InputCheckbox.svelte";
  export let activeImages;
  // export let dataset;
</script>

<InputMultiBlock>
  <span class="text-xs text-zinc-300"
    >Editing {activeImages.length} images. Clicking tags will toggle them for all
    selected images.</span
  >
  <div class="grid gap-2" style="grid-template-columns: repeat(4, 1fr);">
    {#each activeImages.slice().reverse() as img}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <img
        class="rounded-md w-full shadow-md cursor-pointer"
        src={convertFileSrc(img.path)}
        alt={img.path}
        loading="lazy"
        on:click={(e) => {
          if (e.shiftKey) {
            activeImages.splice(activeImages.indexOf(img), 1);
            activeImages = activeImages;
          } else {
            activeImages = [img];
          }
        }}
      />
    {/each}
  </div>
</InputMultiBlock>
