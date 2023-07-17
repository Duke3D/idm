<script>
  import Button from "../components/Button.svelte";
  import IconButton from "../components/IconButton.svelte";
  import InputMultiBlock from "../components/inputs/InputMultiBlock.svelte";
  import InputText from "../components/inputs/InputText.svelte";
  import InputTextArray from "../components/inputs/InputTextArray.svelte";
  import InputTextarea from "../components/inputs/InputTextarea.svelte";
  import * as tagFun from "../util/tags";

  export let dataset;
  export let activeImage = undefined;
  let editGroup;
  $: editTags = editGroup && tagFun.getGroupTagData(editGroup, dataset);
</script>

<InputTextarea
  label={"Description String"}
  bind:value={dataset.descriptionString}
/>
{#each dataset.tagGroups as group, i}
  <InputMultiBlock dense={true}>
    {#if editGroup === group}
      <InputText label={"Group Name"} bind:value={group.name} />
      <InputTextArray
        label={"Tag List"}
        bind:array={editTags}
        elementBindKey={"name"}
        createFun={(e) => {
          tagFun.createTag(group, dataset);
          dataset = dataset;
        }}
        deleteFun={(tag) => {
          tagFun.removeTag(tag, dataset)
          dataset = dataset;
        }}
      />
      <!-- <InputTextarea label={"Tag List"} bind:value={group.tags} /> -->
      <div class="grid grid-cols-2 gap-2">
        <Button
          text={"Ok"}
          col={"green"}
          click={() => {
            editGroup = undefined;
          }}
        />
        <Button
          text={"Remove"}
          col={"zinc"}
          click={() => {
            tagFun.removeTagGroup(group, dataset);
            dataset = dataset;
          }}
        />
      </div>
    {:else}
      <span class="text-xs font-bold text-zinc-300 block mb-1"
        >{group.name}
        <span class="float-right">
          <IconButton
            css={"text-sm"}
            id="edit"

            on:click={(e) => {
              editGroup = group;
            }}
          />
        </span>
      </span>

      {#each group.tags as tag}
        <button
          class="{activeImage?.tags.indexOf(tag.id) >= 0
            ? 'bg-zinc-500 text-zinc-200 border'
            : 'bg-zinc-700 text-zinc-400 border border-zinc-800'} focus-visible:outline-none text-xs font-bold shadow-md rounded-md px-2 mr-1 mb-0.5"
          on:click={(e) => {
            if (activeImage) {
              activeImage = tagFun.toggleTagIdOnImage(activeImage, tag.id);
              dataset = dataset;
            }
          }}
        >
          {tagFun.resolveTagId(dataset, tag).name}
        </button>
      {/each}
    {/if}
  </InputMultiBlock>
{/each}

<div class="text-sm">
  <IconButton
    id="add"
    css="text-md"
    active={true}
    on:click={(e) => {
      tagFun.createTagGroup(dataset);
      dataset = dataset;
    }}
  />
</div>
