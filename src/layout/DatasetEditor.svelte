<script>
  import InputText from "../components/inputs/InputText.svelte";
  import InputMultiBlock from "../components/inputs/InputMultiBlock.svelte";
  import InputSelect from "../components/inputs/InputSelect.svelte";
  import Button from "../components/Button.svelte";
  export let dataset;

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
</InputMultiBlock>
