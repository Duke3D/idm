<script>
  import IconButton from '../IconButton.svelte';
  import InputWrap from './InputWrap.svelte';
  export let array;
  export let label = undefined;
  export let placeholder = undefined;
  export let elementBindKey = undefined;
  export let buttons = [];
  export let createFun = undefined;
  export let deleteFun;

  let btnWithDel = [
    ...buttons,
    {
      id: 'delete',
      fun: deleteFun,
    },
  ];
</script>

<InputWrap {label}>
  {#each array as element, i}
    <div class="grid gap-1 mt-1" style="grid-template-columns: 1fr repeat({btnWithDel.length}, auto);">
      <input
        {placeholder}
        id="wrapped"
        bind:value={element[elementBindKey]}
        type="text"
        autocomplete="off"
        class="placeholder:text-zinc-600 drop-shadow-md text-xs font-mono bg-zinc-900 text-zinc-400 border block w-full border-zinc-600 rounded-md px-2 py-1 focus:outline-none focus:border-zinc-300" />
      {#each btnWithDel as btn}
        <IconButton
          id={btn.id}
          on:click={(e) => {
            btn.fun(element, i);
          }} />
      {/each}
    </div>
  {/each}

  <div class="text-center mt-2">
    <IconButton id="add" css="text-xs font-medium" text="Create Tag" on:click={createFun} />
  </div>
</InputWrap>
