<script>
  import InputText from "../components/inputs/InputText.svelte";
  import InputMultiBlock from "../components/inputs/InputMultiBlock.svelte";
  import InputSelect from "../components/inputs/InputSelect.svelte";
  import Button from "../components/Button.svelte";
  import * as datasetFun from "../util/dataset.js";
  import * as imagesFun from "../util/images.js";
  import InputWrap from "../components/inputs/InputWrap.svelte";
  import { open } from "@tauri-apps/api/dialog";

  export let dataset;
  export let path;
  let selectedInputFolder;
  
  const addFolder = async () => {
    let selected = await open({
      directory: true,
      multiple: true,
    })
    if(selected === null) return
    if(!Array.isArray(selected)) {
      selected = [selected]
    }
    dataset.inputFolders = [...dataset.inputFolders, ...selected]
    imagesFun.rescanImageFolders(dataset)
  }

  const removeFolder = () => {
    dataset.inputFolders = dataset.inputFolders.filter((folder) => {
      return folder !== selectedInputFolder;
    });
    selectedInputFolder = undefined
    imagesFun.rescanImageFolders(dataset)
  };

</script>

<InputMultiBlock>
  <InputText label={"Dataset Name"} bind:value={dataset.name} />
  <InputSelect
    empty={"No image folders"}
    label={"Input Image Folders"}
    array={dataset.inputFolders}
    bind:value={selectedInputFolder}
  >
    <div class="grid grid-cols-2 gap-2 mt-2">
      <Button text={"Add Folder"} col={"zinc"} click={addFolder} />
      <Button
        text={"Remove Folder"}
        col={"zinc"}
        click={removeFolder}
        disabled={selectedInputFolder == undefined}
      />
    </div>
  </InputSelect>
  <InputWrap>
    <Button
      text={"Save Dataset"}
      col={"sky"}
      click={() => {
        datasetFun.save(path, dataset);
      }}
    />
    <Button
      text={"Close Dataset"}
      col={"zinc"}
      click={() => {
        datasetFun.save(path, dataset);
        dataset = undefined;
      }}
      css={"mt-2"}
    />
  </InputWrap>
  <div class="text-xs text-zinc-600 break-all">{path}</div>
</InputMultiBlock>
