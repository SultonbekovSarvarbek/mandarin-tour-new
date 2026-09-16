<script>
 import Icon from '$lib/Icon.svelte';
 import tours from './tours.json';
 import {language} from './language.js';
 import T from './T.svelte';
 import {reveal} from './reveal.js';
 let {items=tours}=$props();
</script>
<div class="cards" id="cards">
 {#each items as tour (tour.id)}
  {@const c=tour[$language]}
  <article class="card" use:reveal>
   <a class="card-photo photo-link" href={'/tours/'+tour.id+'/'} aria-label={c.name}><img src={'/assets/'+tour.image} alt={c.name+' — '+c.place} loading="lazy" width="600" height="430"/><span class="card-tag">{c.tag}</span></a>
   <div class="card-body"><div class="card-title"><h3><a href={'/tours/'+tour.id+'/'}>{c.name}</a></h3><span>{c.place}</span></div><p>{c.text}</p><div class="card-bottom"><span><T ru="Вылет из Ташкента" uz="Toshkentdan parvoz"/></span><a href={'/tours/'+tour.id+'/'} aria-label={($language==='ru'?'Подробнее: ':'Batafsil: ')+c.name}><T ru="Подробнее" uz="Batafsil"/> <Icon /></a></div></div>
  </article>
 {/each}
</div>
