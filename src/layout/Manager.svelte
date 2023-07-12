<script>
  import DataCol from "../components/DataCol.svelte";
  import Button from "../components/Button.svelte";
  import DatasetEditor from "../layout/DatasetEditor.svelte";
  import TagEditor from "../layout/TagEditor.svelte";
  import ImageGrid from "../layout/ImageGrid.svelte";
  import { recentDatasets } from "../util/settings.js";
  import * as dataset from "../util/dataset.js";
  import InputSelect from "../components/inputs/InputSelect.svelte";
  import InputMultiBlock from "../components/inputs/InputMultiBlock.svelte";
  import InputWrap from "../components/inputs/InputWrap.svelte";

  let activeDataset;
  let datasetPath;
</script>

<div
  class="grid overflow-hidden h-screen divide-x divide-zinc-700"
  style="grid-template-columns:250px auto 250px 250px"
>
  <DataCol>
    {#if activeDataset !== undefined}
      <DatasetEditor bind:dataset={activeDataset} path={datasetPath} />
    {:else}
      <InputMultiBlock>
        <InputSelect
          label={"Recent Datasets"}
          array={$recentDatasets}
          bind:value={datasetPath}
          empty={"No datasets"}
        />
        <InputWrap>
          <Button
            text={"Load Dataset"}
            col={"sky"}
            click={async () => {
              ({ dataset: activeDataset, path: datasetPath } =
                await dataset.load(datasetPath));
            }}
          />
          <Button
            text={"Create Dataset"}
            col={"indigo"}
            css={"mt-2"}
            click={async () => {
              ({ dataset: activeDataset, path: datasetPath } =
                await dataset.create());
            }}
          />
        </InputWrap>
      </InputMultiBlock>
    {/if}
  </DataCol>
  <DataCol>
    {#if activeDataset !== undefined}
      <ImageGrid images={activeDataset.images} />
    {/if}
  </DataCol>
  <DataCol>
    {#if activeDataset !== undefined}
      <span>Image Edit</span>
    {/if}
  </DataCol>
  <DataCol>
    {#if activeDataset !== undefined}
      <TagEditor bind:dataset={activeDataset} />
    {/if}
  </DataCol>
</div>
