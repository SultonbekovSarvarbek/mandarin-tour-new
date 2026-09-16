<script>
 import T from './T.svelte';
 let {ru,uz,introRu,introUz}=$props();
</script>
<section class="wrap page-intro"><div class="breadcrumb"><a href="/"><T ru="Главная" uz="Bosh sahifa"/></a><span>/</span><a href="/guide/"><T ru="Полезное" uz="Foydali"/></a></div><div class="eyebrow"><T ru="Памятка путешественника" uz="Sayohatchi eslatmasi"/></div><h1><T {ru} {uz}/></h1><p><T ru={introRu} uz={introUz}/></p></section>
