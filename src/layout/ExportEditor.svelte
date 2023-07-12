<script>
    import InputMultiBlock from "../components/inputs/InputMultiBlock.svelte";
    import InputText from "../components/inputs/InputText.svelte";



  export let dataset
</script>

<InputMultiBlock>
  <InputText label={"Description String"} bind:value={dataset.descriptionString} />
</InputMultiBlock>
