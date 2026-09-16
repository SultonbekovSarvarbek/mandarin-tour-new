<script>
 import Icon from '$lib/Icon.svelte';
 import Hero from '$lib/Hero.svelte';import TripPicker from '$lib/TripPicker.svelte';import TourCards from '$lib/TourCards.svelte';import T from '$lib/T.svelte';import Meta from '$lib/Meta.svelte';import {reveal} from '$lib/reveal.js';
</script>
<Meta ru="Путешествия со вкусом" uz="Unutilmas sayohatlar"/>
<Hero/><TripPicker/>
<section class="section wrap" use:reveal><div class="section-heading"><div><div class="eyebrow"><T k="directionsEyebrow"/></div><h2><T k="directionsTitle"/></h2></div><a class="text-link" href="/tours/"><T ru="Все туры" uz="Barcha turlar"/> <Icon /></a></div><div style="height:30px"></div><TourCards/></section>
<section class="wrap guide-banner"><div><div class="eyebrow"><T ru="Перед путешествием" uz="Sayohatdan oldin"/></div><h2><T ru="Собраться легко. Отдыхать спокойно." uz="Oson tayyorgarlik. Xotirjam dam."/></h2><p><T ru="Что положить в чемодан, какие документы проверить и куда можно поехать без визы." uz="Chamadonga nima solish, qaysi hujjatlarni tekshirish va qayerga vizasiz borish mumkin."/></p></div><a class="button dark" href="/guide/"><T ru="Советы путешественнику" uz="Sayohatchiga maslahatlar"/> <Icon/></a></section>
<section class="wrap home-bottom" use:reveal><div><h2><T ru="Хороший отдых начинается с заботы." uz="Yaxshi dam olish e’tibordan boshlanadi."/></h2><p><T ru="Познакомьтесь с командой Mandarin Tour." uz="Mandarin Tour jamoasi bilan tanishing."/></p></div><a class="button dark" href="/about/"><T ru="О компании" uz="Kompaniya haqida"/> <Icon /></a></section>
