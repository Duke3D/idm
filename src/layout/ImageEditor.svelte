<script>
  import InputMultiBlock from "../components/inputs/InputMultiBlock.svelte";
  import InputText from "../components/inputs/InputText.svelte";
  import InputSelect from "../components/inputs/InputSelect.svelte";
  import { convertFileSrc } from "@tauri-apps/api/tauri";
  export let activeImage

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
  <div class="text-xs text-zinc-600 break-all">{activeImage.path}</div>
</InputMultiBlock>