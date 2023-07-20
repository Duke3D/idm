<script>
  import Button from '../components/Button.svelte';
  import InputMultiBlock from '../components/inputs/InputMultiBlock.svelte';
  import InputSelect from '../components/inputs/InputSelect.svelte';
  import InputWrap from '../components/inputs/InputWrap.svelte';
  import { recentDatasets } from '../util/settings';
  import { setUnsavedIndicator, setFilename } from '../util/window'
  import * as dataset from '../util/dataset.js';
  export let datasetPath;
  export let activeDataset;

  setUnsavedIndicator(false);
  setFilename("")
</script>

<div class="flex h-screen">
  <div class="m-auto w-96">
    <InputMultiBlock>
      <InputSelect label={'Recent Datasets'} array={$recentDatasets} bind:value={datasetPath} empty={'No datasets'} />
      <InputWrap>
        <Button
          text={'Load Dataset'}
          col={'sky'}
          click={async () => {
            ({ dataset: activeDataset, path: datasetPath } = await dataset.load(datasetPath));
          }} />
        <Button
          text={'Create Dataset'}
          col={'indigo'}
          css={'mt-2'}
          click={async () => {
            ({ dataset: activeDataset, path: datasetPath } = await dataset.create());
          }} />
      </InputWrap>
    </InputMultiBlock>
  </div>
</div>
