<script>
  // @ts-nocheck

  import InputMultiBlock from '../components/inputs/InputMultiBlock.svelte';
  import InputText from '../components/inputs/InputText.svelte';
  import InputSelect from '../components/inputs/InputSelect.svelte';
  import { convertFileSrc } from '@tauri-apps/api/tauri';
  import { getImageDescription } from '../util/images';
  import IconButton from '../components/IconButton.svelte';
  import InputCheckbox from '../components/inputs/InputCheckbox.svelte';
  export let activeImage;
  export let dataset;

  let width = 0,
    height = 0;
</script>

<InputMultiBlock>
  <div class="container">
    <img
      class="relative"
      src={convertFileSrc(activeImage.path)}
      alt={activeImage.path}
      loading="lazy"
      on:load={(e) => {
        width = e.target.naturalWidth;
        height = e.target.naturalHeight;
      }} />
  </div>
  <div class="text-xs text-zinc-300 break-all">
    {getImageDescription(dataset, activeImage)}
  </div>

  <InputText label="Custom" placeholder={'{custom} interpolated string'} bind:value={activeImage.custom} />

  <InputCheckbox
    label="Export"
    bind:value={activeImage.export}
    on:change={(e) => {
      dataset.images = dataset.images;
    }} />

  <div class="text-xs text-zinc-600 break-all">
    <div>{width} x {height}</div>
    <div>{activeImage.path}</div>
  </div>
</InputMultiBlock>

<style>
  .container {
    width: 100%; /* inherit the width from the parent */
    padding-bottom: 100%; /* keep the aspect ratio 1:1 (square) */
    position: relative; /* for the absolute positioning of the child image */
    overflow: hidden;
  }

  .container img {
    position: absolute; /* this allows us to fill the container */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; /* maintain aspect ratio */
    object-fit: contain;
  }
</style>
