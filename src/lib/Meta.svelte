<script>
 import {language} from './language.js';
 let {ru,uz,description='Демонстрационная концепция Mandarin Tour. Туры и паломнические поездки.'}=$props();
</script>
<svelte:head><title>{$language==='uz'?uz:ru} — Mandarin</title><meta name="description" content={description}/></svelte:head>
