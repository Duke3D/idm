<script>
  import InputMultiBlock from "../components/inputs/InputMultiBlock.svelte";
  import InputText from "../components/inputs/InputText.svelte";
  import InputSelect from "../components/inputs/InputSelect.svelte";
  import { convertFileSrc } from "@tauri-apps/api/tauri";
  import { getImageDescription } from "../util/tags";
  export let activeImage;
  export let dataset;
</script>

<InputMultiBlock>
  <div>
    <img
      class="rounded-md"
      src={convertFileSrc(activeImage.path)}
      alt={activeImage.path}
      loading="lazy"
    />
  </div>
  <div class="text-xs text-zinc-300 break-all">
    {getImageDescription(dataset, activeImage)}
  </div>
  <div class="text-xs text-zinc-600 break-all">{activeImage.path}</div>
</InputMultiBlock>
