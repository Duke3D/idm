<script>
  export let dense = false;
  let css = dense
    ? "[&>*:not(:first-child)]:pt-1 [&>*]:pb-1"
    : "divide-y divide-zinc-700 [&>*:not(:first-child)]:pt-3 [&>*]:pb-3";
</script>

<div class={css}>
  <slot />
</div>
