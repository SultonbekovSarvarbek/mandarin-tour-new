<script>
  let { name = 'arrow-right' } = $props();
</script>
<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
  {#if name === 'arrow-left'}
    <path d="M19 12H5m7-7-7 7 7 7" />
  {:else if name === 'external'}
    <path d="M14 3h7v7m0-7L10 14M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" />
  {:else if name === 'menu'}
    <path d="M4 6h16M4 12h16M4 18h16" />
  {:else if name === 'close'}
    <path d="m6 6 12 12M6 18 18 6" />
  {:else if name === 'check'}
    <path d="m5 12 4 4L19 6" />
  {:else}
    <path d="M5 12h14m-7-7 7 7-7 7" />
  {/if}
</svg>
