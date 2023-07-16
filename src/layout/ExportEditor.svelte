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
  import { createDir, removeDir } from "@tauri-apps/api/fs";
  import InputCheckbox from "../components/inputs/InputCheckbox.svelte";
  export let dataset = undefined;
  export let activeImage = undefined;


  let exportStatus = "Export";
</script>

<div class=overflow-y-auto>
  <InputMultiBlock>
    <div class="grid grid-cols-2 gap-2">
      <InputNumber label={"Precrop Width"} bind:value={dataset.exportCropWidth} />
      <InputNumber
        label={"Precrop Height"}
        bind:value={dataset.exportCropHeight}
      />
    </div>
    <div class="grid grid-cols-2 gap-2">
      <InputNumber label={"Out Width"} bind:value={dataset.exportWidth} />
      <InputNumber label={"Out Height"} bind:value={dataset.exportHeight} />
    </div>
    <div>
      <InputText
        label={"Export Path"}
        bind:value={dataset.exportPath}
        path={"folder"}
      />
      <div class="mt-2" />
      <InputCheckbox
        label="Clear target folder on export"
        bind:value={dataset.exportClear}
      />
    </div>
    <div class="grid grid-cols-2 gap-2">
      <Button
        text={exportStatus}
        col={"green"}
        click={async () => {
          if (dataset.exportClear) {
            try {
              await createDir(dataset.exportPath, { recursive: true });
            } catch (e) {}
          }
          await createDir(dataset.exportPath, { recursive: true });
          const filtered = dataset.images.filter((img) => img.export);
          let done = 0, max = filtered.length;
          exportStatus = `Exporting: 0/${max}`;
          let tasks = filtered.map((img, i) => {
            return invoke("export_image", {
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
            }).then(() => (exportStatus = `Exporting: ${++done}/${max}`));
          });

          Promise.all(tasks).then(() => {
            console.log("done!")
            exportStatus = `Done: ${max}/${max}`;
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
  </InputMultiBlock>
</div>