<script>
  import InputText from "../components/inputs/InputText.svelte";
  import InputTextarea from "../components/inputs/InputTextarea.svelte";
  import InputMultiBlock from "../components/inputs/InputMultiBlock.svelte";
  import InputSelect from "../components/inputs/InputSelect.svelte";
  import Button from "../components/Button.svelte";
  import { parseTags, toggleTagOnImage } from "../util/tags";
  import IconButton from "../components/IconButton.svelte";

  export let dataset;
  export let activeImage;

  let editGroups = [];
</script>

<InputMultiBlock>
  {#each dataset.tagGroups as group, i}
    <InputMultiBlock dense={true}>
      {#if editGroups.indexOf(group) >= 0}
        <InputText label={"Group Name"} bind:value={group.name} />
        <InputTextarea label={"Tag List"} bind:value={group.tags} />
        <!-- <span class="text-xs">{parseTags(group.tags).length} tags</span> -->
        <div class="grid grid-cols-2 gap-2">
          <Button
            text={"Ok"}
            col={"green"}
            click={() => {
              editGroups.splice(editGroups.indexOf(group), 1);
              editGroups = editGroups;
            }}
          />
          <Button
            text={"Remove"}
            col={"zinc"}
            click={() => {
              dataset.tagGroups = dataset.tagGroups.filter((_, j) => {
                return i !== j;
              });
            }}
          />
        </div>
      {:else}
        <span class="text-xs font-bold text-zinc-300 block mb-1"
          >{group.name}
          <span class="float-right text sm">
            <IconButton
              id="edit"
              active={true}
              click={(e) => {
                editGroups = [...editGroups, group];
              }}
            />
          </span>
        </span>

        {#each parseTags(group.tags) as tag}
          <button
            class="{activeImage?.tags.indexOf(tag) >= 0
              ? 'bg-zinc-500 text-zinc-200 border'
              : 'bg-zinc-700 text-zinc-400 border border-zinc-800'} text-xs font-bold shadow-md rounded-md px-2 mr-1 mb-0.5"
              on:click={e => {
                if(activeImage) {
                  activeImage = toggleTagOnImage(activeImage, tag)
                }
              }}
          >
            {tag}
          </button>
        {/each}
      {/if}
    </InputMultiBlock>
  {/each}

  <div class="text-sm">
    <IconButton
      id="add"
      active={true}
      click={(e) => {
        dataset.tagGroups = [...dataset.tagGroups, { name: "Group", tags: "" }];
      }}
    />
  </div>
</InputMultiBlock>
