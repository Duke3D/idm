<script>
  import DataCol from '../components/DataCol.svelte'
  import Button from '../components/Button.svelte'
  import DatasetEditor from '../layout/DatasetEditor.svelte'
  import { recentDatasets } from '../util/settings.js'
  import * as dataset from "../util/dataset.js"
  import InputSelect from '../components/inputs/InputSelect.svelte'
  import InputMultiBlock from '../components/inputs/InputMultiBlock.svelte';
  import InputWrap from "../components/inputs/InputWrap.svelte";

  let activeDataset
  let datasetPath

</script>

<div class="flex flex-row h-screen divide-x divide-zinc-700">
  <DataCol css={'w-64'}>
    {#if activeDataset !== undefined}
      <DatasetEditor bind:dataset={activeDataset} path={datasetPath}/>
    {:else}
      <InputMultiBlock>
        <InputSelect label={'Recent Datasets'} array={$recentDatasets} bind:value={datasetPath} empty={"No datasets"}/>
        <InputWrap>
          <Button text={'Load Dataset'} col={'sky'} click={async ()=>{
            ({ dataset: activeDataset , path: datasetPath } = await dataset.load(datasetPath))
          }}/>
          <Button text={'Create Dataset'} col={'indigo'} css={'mt-2'} click={async ()=>{
            ({ dataset: activeDataset , path: datasetPath } = await dataset.create())
          }}/>
        </InputWrap>
      </InputMultiBlock>
    {/if}
    
  </DataCol>
  <DataCol css={'flex-auto'}>
    {#if activeDataset !== undefined}
      <h1>Dataset Info</h1>
    {/if}
  </DataCol>
  <DataCol css={'w-64'}>
    {#if activeDataset !== undefined}
      <h1>Dataset Info</h1>
    {/if}
  </DataCol>
</div>