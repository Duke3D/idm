<script>
  import DataCol from "../components/DataCol.svelte";
  import Button from "../components/Button.svelte";
  import InputSourceEditor from "./InputSourceEditor.svelte";
  import ExportEditor from "./ExportEditor.svelte";
  import ImageEditor from "./ImageEditor.svelte";
  import ImageGrid from "./ImageGrid.svelte";
  import { activeTab } from "../util/settings.js";
  import InputMultiBlock from "../components/inputs/InputMultiBlock.svelte";
  import TabBar from "../components/TabBar.svelte";
  import TagEditor from "./TagEditor.svelte";

  export let datasetPath;
  export let activeDataset;
  let activeImage;
</script>

<div class="grid h-screen" style="grid-template-rows: auto 1fr;">
  <TabBar bind:active={$activeTab} tabs={["Dataset", "Images", "Export"]} />

  {#if $activeTab === "Dataset"}
    <DataCol css="overflow-y-auto  max-w-lg">
      <InputSourceEditor bind:dataset={activeDataset} path={datasetPath} />
    </DataCol>
  {:else if $activeTab === "Images"}
    <div
      class="grid overflow-hidden divide-x divide-zinc-700"
      style="grid-template-columns:2fr 1fr 1fr"
    >
      <DataCol>
        <ImageGrid
          bind:dataset={activeDataset}
          images={activeDataset.images}
          bind:activeImage
        />
      </DataCol>
      <DataCol>
        {#if activeImage !== undefined}
          <ImageEditor bind:dataset={activeDataset} bind:activeImage />
        {/if}
      </DataCol>
      <DataCol css="overflow-y-auto">
        <InputMultiBlock>
          <TagEditor bind:dataset={activeDataset} bind:activeImage />
        </InputMultiBlock>
      </DataCol>
    </div>
  {:else if $activeTab === "Export"}
    <DataCol css="overflow-y-auto  max-w-lg">
      <InputMultiBlock>
        <ExportEditor bind:dataset={activeDataset} bind:activeImage />
      </InputMultiBlock>
    </DataCol>
  {/if}
</div>
