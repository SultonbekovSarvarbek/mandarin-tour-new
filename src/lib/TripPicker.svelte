<script>
 import Icon from '$lib/Icon.svelte';
 import T from './T.svelte';
 import tours from './tours.json';
 import {language} from './language.js';
 import {goto} from '$app/navigation';
 let destination=$state('all');let style=$state('all');
 function submit(event){event.preventDefault();goto('/tours/?'+new URLSearchParams({destination,style}));}
</script>
<form class="trip-picker wrap" action="/tours/" method="GET" onsubmit={submit}>
 <div class="picker-intro"><span class="small-label"><T k="pickerSmall"/></span><strong><T k="pickerTitle"/></strong></div>
 <label><span><T k="directionLabel"/></span><select name="destination" bind:value={destination}><option value="all"><T k="allDirections"/></option>{#each tours as tour}<option value={tour.id}>{tour[$language].name}</option>{/each}</select></label>
 <label><span><T k="styleLabel"/></span><select name="style" bind:value={style}><option value="all"><T k="anyStyle"/></option><option value="beach"><T k="beach"/></option><option value="city"><T k="city"/></option><option value="family"><T k="family"/></option></select></label>
 <button class="button dark" type="submit"><span><T k="find"/></span><Icon /></button>
</form>
