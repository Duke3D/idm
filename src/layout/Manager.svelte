<script>
  import DataCol from '../components/DataCol.svelte'
  import Button from '../components/Button.svelte'
  import DatasetEditor from '../layout/DatasetEditor.svelte'
  import { recentDatasets } from '../util/settings.js'
  import { open, save } from '@tauri-apps/api/dialog'
  import { writeTextFile, readTextFile } from '@tauri-apps/api/fs'

  let dataset
  let datasetPath

  const makeDataset = (input) => {
    // function creates default dataset info and merges it with input if provided
    const result = {
      name  : '',
      images: [],
      ...( input !== undefined ? input : {} )
    }
    return result
  }

  const loadDataset = async () => {
    // select file, load it
    if(!datasetPath)
      datasetPath = await open({
        filters: [{
          name      : 'Dataset',
          extensions: ['json']
        }]
      })
    if(datasetPath) {
      const data = await readTextFile(datasetPath)
      dataset = makeDataset(JSON.parse(data))
      addToRecent(datasetPath)
    }

  }

  const createDataset = async () => {
    datasetPath = await save({
      filters: [{
        name      : 'Dataset',
        extensions: ['json']
      }]
    })
    addToRecent(datasetPath)
    dataset = makeDataset()
    saveDataset()
  }

  const saveDataset = async () => {
    writeTextFile({path: datasetPath, contents: JSON.stringify(dataset)})
    addToRecent(datasetPath)
  }

  const addToRecent = (r) => {
    if(r)
      recentDatasets.update( v => {
        if(v.indexOf(r) < 0)
          v.push(r)
        return v
      })
  }

  const closeDataset = () => {
    // TODO: check for changes by keeping a most recent save state
    dataset = datasetPath = undefined
  }

</script>

<div class="flex flex-row h-screen">
  <DataCol css={'w-64'}>
    {#if dataset !== undefined}
      <DatasetEditor {dataset}/>
      <Button text={'Save Dataset'} col={'sky'} click={saveDataset} css={'mt-2'}/>
      <Button text={'Close Dataset'} col={'slate'} click={closeDataset} css={'mt-2'}/>
    {:else}
      <div class='mt-2'>
        <label for=recent class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Recent Datasets</label>
        <select id=recent size="5" class='bg-slate-900 rounded-md block w-full' bind:value={datasetPath} on:change={() => console.log(datasetPath)}>
          {#each $recentDatasets as recent, i}
          <option class=truncate value={recent}>{recent}</option >
          {:else}
          <option>No Datasets</option >
          {/each}
        </select>
      </div>
      <Button text={'Load Dataset'} col={'sky'} click={loadDataset} css={'mt-2'}/>
      <Button text={'Create Dataset'} col={'indigo'} css={'mt-2'} click={createDataset}/>
    {/if}
  </DataCol>
  <DataCol css={'flex-auto bg-gray-900'}>
    {#if dataset !== undefined}
      <h1>Dataset Info</h1>
    {/if}
  </DataCol>
  <DataCol css={'w-64'}>
    {#if dataset !== undefined}
      <h1>Dataset Info</h1>
    {/if}
  </DataCol>
</div>

<!--
  import { writeTextFile, BaseDirectory } from '@tauri-apps/api/fs'
import { open } from '@tauri-apps/api/dialog'

  let name = ''
  const greetMsg = ''

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    // greetMsg = await invoke("greet", { name })
    // Write a text file to the `$APPCONFIG/app.conf` path
    // greetMsg = await writeTextFile('app.conf', 'file contents', { dir: BaseDirectory.AppConfig });

    // Open a selection dialog for image files
    const selected = await open({
      multiple: true,
      filters : [{
        name      : 'Image',
        extensions: ['png', 'jpeg']
      }]
    })
    if (Array.isArray(selected)) {
      // user selected multiple files
    } else if (selected === null) {
      // user cancelled the selection
    } else {
      // user selected a single file
    }
  } -->