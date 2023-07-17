<script>
  import Button from "../components/Button.svelte";
  import IconButton from "../components/IconButton.svelte";
  import InputMultiBlock from "../components/inputs/InputMultiBlock.svelte";
  import InputText from "../components/inputs/InputText.svelte";
  import InputTextArray from "../components/inputs/InputTextArray.svelte";
  import InputTextarea from "../components/inputs/InputTextarea.svelte";
  import * as tagFun from "../util/tags";
  import { tick } from "svelte";
  export let dataset;
  export let activeImages = undefined;
  let editGroup;
  $: editTags = editGroup && tagFun.getGroupTagData(editGroup, dataset);

  const imgWithTagCount = (id) => {
    // count how many images have the tag id
    return activeImages.filter((image) => image.tags.indexOf(id) >= 0).length;
  };

  const resolveTagCss = (tagId, activeImages) => {
    let css =
      "focus-visible:outline-none text-xs font-bold shadow-md rounded-md px-2 mr-1 mb-0.5 ";
    let count = imgWithTagCount(tagId);

    if (count === 0) {
      // if no images have the tag
      css += "bg-zinc-700 text-zinc-400 border border-zinc-800";
    } else if (count === activeImages.length) {
      // if all images have the tag
      css += "bg-zinc-500 text-zinc-200 border border-zinc-200";
    } else {
      // if some images have the tag
      css += "bg-zinc-700 text-zinc-400 border border-zinc-300";
    }

    return css;
  };
</script>

<InputTextarea
  label={"Description String"}
  bind:value={dataset.descriptionString}
/>
{#if editGroup !== undefined}
  <div class="grid grid-cols-2 gap-2">
    <InputText label={"Group Name"} bind:value={editGroup.name} />
    <InputText
      label={"Join String"}
      bind:value={editGroup.joinString}
      on:input={(e) => {
        // an ugly fix that makes the join string update globally
        if (editGroup.joinString !== e.target.value) {
          editGroup.joinString = e.target.value;
          dataset = dataset;
          console.log("force")
        }
      }}
    />
  </div>

  <InputTextArray
    label={"Tag List"}
    bind:array={editTags}
    elementBindKey={"name"}
    createFun={(e) => {
      tagFun.createTag(editGroup, dataset);
      dataset = dataset;
    }}
    deleteFun={(tag) => {
      tagFun.removeTag(tag, dataset);
      dataset = dataset;
    }}
  />
  <!-- <InputTextarea label={"Tag List"} bind:value={editGroup.tags} /> -->
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
        tagFun.removeTagGroup(editGroup, dataset);
        dataset = dataset;
        editGroup = undefined;
      }}
    />
  </div>
{:else}
  {#each dataset.tagGroups as group, i}
    <InputMultiBlock dense={true}>
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

      {#each group.tags as tagId}
        <button
          class={resolveTagCss(tagId, activeImages)}
          on:click={(e) => {
            if (imgWithTagCount(tagId) === 0) {
              activeImages.forEach((img) =>
                tagFun.enableTagIdOnImage(img, tagId)
              );
            } else {
              activeImages.forEach((img) =>
                tagFun.disableTagIdOnImage(img, tagId)
              );
            }
            dataset = dataset;
          }}
        >
          {tagFun.resolveTagId(dataset, tagId).name}
        </button>
      {/each}
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
{/if}
