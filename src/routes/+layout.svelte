<script>
 import Icon from '$lib/Icon.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { onNavigate, afterNavigate, goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { language } from '$lib/language.js';
  import T from '$lib/T.svelte';
  import tours from '$lib/tours.json';
  import '$lib/style.css';
  import '$lib/pages.css';
  import '$lib/motion.css';
  import '$lib/app.css';
  let { children } = $props();
  let menuOpen = $state(false);
  let languageReady = $state(false);
  let main;
  let routeAnimation;
  const umra = $derived(page.url.pathname.startsWith('/umra'));
  const links = $derived(umra ? [
    ['/umra/','Главная','Bosh sahifa'], ['/umra/programs/','Программы','Dasturlar'],
    ['/umra/preparation/','Подготовка','Tayyorgarlik'], ['/umra/contacts/','Контакты','Aloqa']
  ] : [
    ['/tours/','Туры','Turlar'], ['/about/','О нас','Biz haqimizda'],
    ['/umra/','Family Mandarin Umra','Family Mandarin Umra'], ['/contacts/','Контакты','Aloqa']
  ]);
  $effect(() => {
    if (browser && languageReady) {
      document.documentElement.lang = $language;
      try { sessionStorage.setItem('mandarin-language',$language); } catch {}
    }
  });
  onMount(() => {
    try { if(sessionStorage.getItem('mandarin-language') === 'uz') language.set('uz'); } catch {}
    languageReady = true;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const stop = () => routeAnimation?.cancel();
    preference.addEventListener('change',stop);
    const lifecycle = new AbortController();
    if(document.modelContext?.registerTool) {
      Promise.resolve(document.modelContext.registerTool({
        name:'filter_destinations', title:'Подобрать направление',
        description:'Open the travel catalogue with country and travel-style filters. Does not book or contact anyone.',
        inputSchema:{type:'object',properties:{destination:{type:'string',enum:['all','turkey','egypt','dubai']},style:{type:'string',enum:['all','beach','city','family']}},required:['destination','style'],additionalProperties:false},
        annotations:{readOnlyHint:false,untrustedContentHint:false},
        async execute(input) {
          if(!input || !['all','turkey','egypt','dubai'].includes(input.destination) || !['all','beach','city','family'].includes(input.style)) throw new Error('Invalid destination or style');
          await goto('/tours/?'+new URLSearchParams(input));
          return {destinations:tours.filter(t=>(input.destination==='all'||t.id===input.destination)&&(input.style==='all'||t.tags.includes(input.style))).map(t=>({id:t.id,name:t[$language].name})),bookingCreated:false};
        }
      },{signal:lifecycle.signal})).catch(()=>{});
    }
    return () => { stop(); lifecycle.abort(); preference.removeEventListener('change',stop); };
  });
  onNavigate(async navigation => {
    menuOpen = false;
    if(navigation.from?.url.pathname === navigation.to?.url.pathname || !main?.animate || matchMedia('(prefers-reduced-motion: reduce)').matches || document.hidden) return;
    routeAnimation?.cancel();
    const outgoing = main.animate([{opacity:1,translate:'0 0'},{opacity:0,translate:'0 -8px'}],{duration:140,easing:'ease-in',fill:'forwards'});
    routeAnimation=outgoing;
    await outgoing.finished.catch(()=>{});
    return () => {
      outgoing.cancel();
      if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      routeAnimation=main.animate([{opacity:0,translate:'0 14px'},{opacity:1,translate:'0 0'}],{duration:360,easing:'cubic-bezier(.22,1,.36,1)'});
    };
  });
  afterNavigate(() => { menuOpen=false; });
</script>

<div class:umra-page={umra} class="site-shell">
  <a class="skip" href="#main"><T ru="К содержимому" uz="Asosiy mazmunga" /></a>
  {#if umra}
    <div class="umra-top wrap"><a href="/"><Icon name="arrow-left" /> Mandarin Tour</a><span>FAMILY MANDARIN UMRA</span></div>
  {:else}
    <div class="topbar"><span><T k="top" /></span><span><T k="hours" /></span></div>
  {/if}
  <header class="header wrap">
    {#if umra}
      <a href="/umra/" class="umra-brand">FAMILY MANDARIN<span>UMRA</span></a>
    {:else}
      <a class="brand" href="/" aria-label="Mandarin Tour"><span class="brand-icon">m<span>✦</span></span><span>mandarin<span class="brand-small">TOUR & TRAVEL</span></span></a>
    {/if}
    <nav id="main-nav" class:open={menuOpen} aria-label={$language==='ru'?'Основное меню':'Asosiy menyu'}>
      {#each links as [href,ru,uz]}
        <a {href} aria-current={page.url.pathname===href ? 'page' : undefined}><T {ru} {uz}/></a>
      {/each}
    </nav>
    <div class="header-actions">
      <div class="language-select">
        <Icon name="globe" />
        <select bind:value={$language} aria-label={$language==='ru'?'Язык сайта':'Sayt tili'}>
          <option value="ru" lang="ru">Русский</option>
          <option value="uz" lang="uz">O‘zbekcha</option>
        </select>
        <Icon name="chevron-down" />
      </div>
      {#if !umra}<a class="phone" href="tel:+998974544444">+998 97 454 44 44</a>{/if}
      <button class="menu" aria-controls="main-nav" aria-expanded={menuOpen} aria-label={$language==='ru'?'Открыть меню':'Menyuni ochish'} onclick={()=>menuOpen=!menuOpen}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
    </div>
  </header>
  <main id="main" class="route-content" bind:this={main} tabindex="-1">
    {@render children()}
  </main>
  <footer class="wrap"><a href="/" class="brand">mandarin<span class="orange-text">✦</span></a><p><T k="concept" /></p><a href={umra?'https://www.instagram.com/familymandarin_umra/':'https://www.instagram.com/mandarintour.uz/'} target="_blank" rel="noopener">Instagram <Icon name="external" /></a></footer>
</div>
