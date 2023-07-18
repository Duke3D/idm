<script>
  import InputMultiBlock from "../components/inputs/InputMultiBlock.svelte";
  import InputTextarea from "../components/inputs/InputTextarea.svelte";
  import InputText from "../components/inputs/InputText.svelte";
  import InputSelect from "../components/inputs/InputSelect.svelte";
  import Button from "../components/Button.svelte";
  import { getImageDescription } from "../util/images.js";
  import IconButton from "../components/IconButton.svelte";
  import InputNumber from "../components/inputs/InputNumber.svelte";
  import { invoke } from "@tauri-apps/api/tauri";
  import { createDir, removeDir } from "@tauri-apps/api/fs";
  import InputCheckbox from "../components/inputs/InputCheckbox.svelte";
  export let dataset = undefined;

  let exportStatus = "Export";
</script>

<div class="overflow-y-auto">
  <InputMultiBlock>
    <div>
      <InputCheckbox label="Center crop" bind:value={dataset.exportCrop} />
      {#if dataset.exportCrop}
        <div class="grid grid-cols-2 gap-2 mt-2">
          <InputNumber
            label={"Crop Width"}
            bind:value={dataset.exportCropWidth}
          />
          <InputNumber
            label={"Crop Height"}
            bind:value={dataset.exportCropHeight}
          />
        </div>
      {/if}
    </div>

    <div>
      <InputCheckbox label="Resize" bind:value={dataset.exportResize} />
      {#if dataset.exportResize}
        <div class="grid grid-cols-2 gap-2 mt-2">
          <InputNumber
            label={"Resize Width"}
            bind:value={dataset.exportWidth}
          />
          <InputNumber
            label={"Resize Height"}
            bind:value={dataset.exportHeight}
          />
        </div>
      {/if}
    </div>

    <div>
      <InputText
        label={"Export Path"}
        bind:value={dataset.exportPath}
        path={"folder"}
      />
      <div class="mt-2" />
      <InputCheckbox
        label="Clear target folder before export"
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
              await removeDir(dataset.exportPath, { recursive: true });
            } catch (e) {}
          }
          await createDir(dataset.exportPath, { recursive: true });
          const filtered = dataset.images.filter((img) => img.export);
          let done = 0,
            max = filtered.length;
          exportStatus = `Exporting: 0/${max}`;
          let tasks = filtered.map((img, i) => {

            const cropwidth = dataset.exportCrop ? dataset.exportCropWidth : 0;
            const cropheight = dataset.exportCrop ? dataset.exportCropHeight : 0;
            const width = dataset.exportResize ? dataset.exportWidth : 0;
            const height = dataset.exportResize ? dataset.exportHeight : 0;

            return invoke("export_image", {
              imgPath: img.path,
              exportPath:
                dataset.exportPath +
                (dataset.exportPath.endsWith("/") ? "" : "/") +
                i +
                ".png",
              description: getImageDescription(dataset, img),
              width,
              height,
              cropwidth,
              cropheight,
            }).then(() => (exportStatus = `Exporting: ${++done}/${max}`));
          });

          Promise.all(tasks).then(() => {
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
