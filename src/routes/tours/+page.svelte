<script>
 import Select from '$lib/Select.svelte';
 import {page} from '$app/state';import {goto} from '$app/navigation';import tours from '$lib/tours.json';import TourCards from '$lib/TourCards.svelte';import T from '$lib/T.svelte';import Meta from '$lib/Meta.svelte';
 import {language, localized, tourCopy} from '$lib/language.js';
 import {onMount} from 'svelte';
 let mounted=$state(false);
 onMount(()=>{mounted=true;});
 const destination=$derived(mounted ? page.url.searchParams.get('destination')||'all' : 'all');
 const style=$derived(mounted ? page.url.searchParams.get('style')||'all' : 'all');
 const matches=$derived(tours.filter(t=>(destination==='all'||t.id===destination)&&(style==='all'||t.tags.includes(style))));
 const filters=[['all','all'],['beach','beach'],['city','city'],['family','family']];
 const link=(d,s)=>'/tours/?'+new URLSearchParams({destination:d,style:s});
</script>
<Meta ru="Каталог туров" uz="Turlar katalogi"/>
<section class="wrap page-intro"><div class="breadcrumb"><a href="/"><T ru="Главная" uz="Bosh sahifa"/></a><span>/</span><span><T ru="Туры" uz="Turlar"/></span></div><div class="eyebrow"><T k="directionsEyebrow"/></div><h1><T k="directionsTitle"/></h1><p><T k="directionsText"/></p></section>
<section class="wrap section catalog-section"><div class="catalog-toolbar"><div class="filters" aria-label={localized($language,'Формат отдыха','Dam olish turi')}>{#each filters as [value,key]}<a class:active={style===value} href={link(destination,value)} aria-current={style===value?'true':undefined} data-sveltekit-noscroll><T k={key}/></a>{/each}</div><Select value={destination} label={localized($language,'Направление','Yo‘nalish')} options={[{value:'all',label:localized($language,'Все направления','Barcha yo‘nalishlar')},...tours.map(t=>({value:t.id,label:tourCopy(t,$language).name}))]} onchange={value=>goto(link(value,style),{noScroll:true})}/></div>
<p class="result" role="status"><T ru="Найдено направлений:" uz="Topilgan yo‘nalishlar:"/> {matches.length}</p>
{#if matches.length}<TourCards items={matches}/>{:else}<div id="empty"><h2><T k="emptyTitle"/></h2><p><T k="emptyText"/></p><a class="button dark" href="/tours/"><T k="reset"/></a></div>{/if}<p class="price-note"><T k="priceNote"/></p></section>
