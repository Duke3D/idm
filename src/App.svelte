<script>
  import DatasetEditor from "./layout/DatasetEditor.svelte";
  import DatasetLoader from "./layout/DatasetLoader.svelte";
  let datasetPath = undefined
  let activeDataset = undefined

</script>

<main class="font-sans">
  {#if activeDataset !== undefined}
    <DatasetEditor 
      bind:datasetPath={datasetPath} 
      bind:activeDataset={activeDataset}/>
  {:else}
    <DatasetLoader
      bind:datasetPath={datasetPath} 
      bind:activeDataset={activeDataset}/>
  {/if}
</main>
