<script>
 import Icon from '$lib/Icon.svelte';
 import T from './T.svelte';
 import {goto} from '$app/navigation';
 let destination=$state('all');let style=$state('all');
 function submit(event){event.preventDefault();goto('/tours/?'+new URLSearchParams({destination,style}));}
</script>
<form class="trip-picker wrap" action="/tours/" method="GET" onsubmit={submit}>
 <div class="picker-intro"><span class="small-label"><T k="pickerSmall"/></span><strong><T k="pickerTitle"/></strong></div>
 <label><span><T k="directionLabel"/></span><select name="destination" bind:value={destination}><option value="all"><T k="allDirections"/></option><option value="turkey"><T k="turkey"/></option><option value="egypt"><T k="egypt"/></option><option value="dubai"><T k="dubai"/></option></select></label>
 <label><span><T k="styleLabel"/></span><select name="style" bind:value={style}><option value="all"><T k="anyStyle"/></option><option value="beach"><T k="beach"/></option><option value="city"><T k="city"/></option><option value="family"><T k="family"/></option></select></label>
 <button class="button dark" type="submit"><span><T k="find"/></span><Icon /></button>
</form>
