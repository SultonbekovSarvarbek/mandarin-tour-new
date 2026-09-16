<script>
 import Icon from '$lib/Icon.svelte';import {page} from '$app/state';import T from '$lib/T.svelte';</script>
<svelte:head><title>{page.status} — Mandarin</title></svelte:head>
<section class="wrap not-found"><div class="eyebrow">{page.status}</div><h1><T ru="Страница не найдена" uz="Sahifa topilmadi"/></h1><a class="button orange" href="/"><T ru="На главную" uz="Bosh sahifaga"/> <Icon /></a></section>
