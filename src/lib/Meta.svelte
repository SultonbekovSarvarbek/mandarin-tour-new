<script>
 import {language,localized} from './language.js';
 let {ru,uz,description}=$props();
 const summary=$derived(description || localized($language,'Демонстрационная концепция Mandarin Tour. Туры и паломнические поездки.','Mandarin Tour namoyish konsepsiyasi. Turlar va ziyorat safarlari.'));
</script>
<svelte:head><title>{localized($language,ru,uz)} — Mandarin</title><meta name="description" content={summary}/></svelte:head>
