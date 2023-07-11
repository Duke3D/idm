<script>
  import InputText from "../components/inputs/InputText.svelte";
  import InputMultiBlock from "../components/inputs/InputMultiBlock.svelte";
  import InputSelect from "../components/inputs/InputSelect.svelte";
  import Button from "../components/Button.svelte"
  import * as datasetFun from "../util/dataset.js"
  import InputWrap from "../components/inputs/InputWrap.svelte";

  export let dataset
  export let path
  let selectedInputFolder

  const addFolder = () => {

  }

  const removeFolder = () => {

  }

</script>

<InputMultiBlock>
  <InputText label={"Name"} bind:value={dataset.name} />
  <InputSelect
    empty={"No image folders"}
    label={"Input Image Folders"}
    array={dataset.inputFolders}
    bind:value={selectedInputFolder}>
    <div class="grid grid-cols-2 gap-2 mt-2">
      <Button text={'Add Folder'} col={'zinc'} click={addFolder}/>
      <Button text={'Remove Folder'} col={'zinc'} click={removeFolder} disabled={true}/>
    </div>
  </InputSelect>
  <InputWrap >
    <Button text={'Save Dataset'} col={'sky'} click={()=>{
      datasetFun.save(path, dataset)
    }}/>
    <Button text={'Close Dataset'} col={'zinc'} click={()=>{
      datasetFun.save(path, dataset)
      dataset = undefined
    }} css={'mt-2'}/>
  </InputWrap>
  <div class="text-xs text-zinc-600 break-all">{path}</div>
</InputMultiBlock>

