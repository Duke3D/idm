<script>
  import InputText from '../components/inputs/InputText.svelte'
  export let dataset
</script>

<InputText label={"Name"} bind:value={dataset.name}/>
