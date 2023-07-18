<script>
  import DataCol from '../components/DataCol.svelte';
  import InputSourceEditor from './InputSourceEditor.svelte';
  import ExportEditor from './ExportEditor.svelte';
  import ImageEditor from './ImageEditor.svelte';
  import ImageMultiEditor from './ImageMultiEditor.svelte';
  import ImageGrid from './ImageGrid.svelte';
  import { activeTab } from '../util/settings.js';
  import InputMultiBlock from '../components/inputs/InputMultiBlock.svelte';
  import TabBar from '../components/TabBar.svelte';
  import TagEditor from './TagEditor.svelte';
  import { onMount, onDestroy } from 'svelte';
  import * as datasetFun from '../util/dataset.js';

  export let datasetPath;
  export let activeDataset;
  let activeImages = [];

  let serializedDataset = JSON.stringify(activeDataset);
  $: hasChanges = hasChanges || serializedDataset !== JSON.stringify(activeDataset);

  const keyDown = (e) => {
    // ctrl + s, only if down
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      datasetFun.save(datasetPath, activeDataset);
      serializedDataset = JSON.stringify(activeDataset);
      hasChanges = false;
    }
  };

  onMount(() => {
    window.addEventListener('keydown', keyDown);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', keyDown);
  });
</script>

<div class="grid h-screen" style="grid-template-rows: auto 1fr;">
  <TabBar bind:active={$activeTab} tabs={['Dataset', 'Images', 'Export']}>
    {#if hasChanges}
      <span class="text-sm text-zinc-400 animate-pulse">Unsaved changes! (Ctrl + S)</span>
    {/if}
  </TabBar>

  {#if $activeTab === 'Dataset'}
    <DataCol css="overflow-y-auto  max-w-lg">
      <InputSourceEditor bind:dataset={activeDataset} path={datasetPath} />
    </DataCol>
  {:else if $activeTab === 'Images'}
    <div class="grid overflow-hidden divide-x divide-zinc-700" style="grid-template-columns:2fr 1fr 1fr">
      <DataCol>
        <ImageGrid bind:dataset={activeDataset} images={activeDataset.images} bind:activeImages />
      </DataCol>
      <DataCol>
        {#if activeImages.length > 1}
          <ImageMultiEditor bind:dataset={activeDataset} bind:activeImages />
        {:else if activeImages.length === 1}
          <ImageEditor bind:dataset={activeDataset} bind:activeImage={activeImages[0]} />
        {:else}
          <span class="text-xs text-zinc-500 leading"
            >Select an image by clicking on it, or using arrow keys. Shift + Click to select and edit multiple images.</span>
        {/if}
      </DataCol>
      <DataCol css="overflow-y-auto">
        <InputMultiBlock>
          <TagEditor bind:dataset={activeDataset} bind:activeImages />
        </InputMultiBlock>
      </DataCol>
    </div>
  {:else if $activeTab === 'Export'}
    <DataCol css="overflow-y-auto  max-w-lg">
      <InputMultiBlock>
        <ExportEditor bind:dataset={activeDataset} />
      </InputMultiBlock>
    </DataCol>
  {/if}
</div>
