<script>
  import { open } from "@tauri-apps/api/dialog";
  import InputWrap from "./InputWrap.svelte";
  import IconButton from "../IconButton.svelte";
  export let value;
  export let label = undefined;
  export let path = undefined;
  export let placeholder = undefined;
</script>

<InputWrap {label}>
  <div
    class="grid gap-1"
    style="grid-template-columns: 1fr {path ? 'auto' : ''};"
  >
    <input
      autocomplete="off"
      {placeholder}
      id="wrapped"
      bind:value
      type="text"
      class="placeholder:text-zinc-600 drop-shadow-md text-xs font-mono bg-zinc-900 text-zinc-400 border block w-full border-zinc-600 rounded-md px-2 py-1 focus:outline-none focus:border-zinc-300"
    />
    {#if path}
      <IconButton
        id={path === "folder" ? "folder_open" : "file_open"}
        active={true}
        on:click={async (e) => {
          const result = await open({
            directory: true,
            multiple: false,
          });
          if (result) value = result;
        }}
      />
    {/if}
  </div>
</InputWrap>
