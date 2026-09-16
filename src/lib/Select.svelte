<script>
 import Icon from './Icon.svelte';
 let {value,options,label,onchange}= $props();
 const id=$props.id();
 let open=$state(false);let active=$state(0);let root;let trigger;
 const selected=$derived(options.find(o=>o.value===value)||options[0]);
 function show(){active=Math.max(0,options.findIndex(o=>o.value===value));open=true;}
 function choose(index){open=false;onchange?.(options[index].value);trigger?.focus();}
 function keydown(event){
  if(['ArrowDown','ArrowUp','Home','End','Enter',' '].includes(event.key)){
   event.preventDefault();
   if(!open){show();return;}
   if(event.key==='Enter'||event.key===' '){choose(active);return;}
   active=event.key==='Home'?0:event.key==='End'?options.length-1:(active+(event.key==='ArrowDown'?1:-1)+options.length)%options.length;
  } else if(event.key==='Escape'){open=false;event.preventDefault();}else if(event.key==='Tab')open=false;
 }
 $effect(()=>{if(open)root?.querySelector('[data-active="true"]')?.scrollIntoView({block:'nearest'});});
</script>
<svelte:window onpointerdown={e=>{if(open&&!root?.contains(e.target))open=false;}}/>
<div class="custom-select" bind:this={root}>
 <button bind:this={trigger} type="button" class="select-trigger" role="combobox" aria-label={label} aria-expanded={open} aria-controls={id+'-list'} aria-haspopup="listbox" aria-activedescendant={open?id+'-'+active:undefined} onclick={()=>open?open=false:show()} onkeydown={keydown}>
  <span>{selected?.label}</span><Icon name="chevron-down"/>
 </button>
 {#if open}
  <div id={id+'-list'} class="select-options" role="listbox" aria-label={label}>
   {#each options as option,index}
    <div id={id+'-'+index} role="option" aria-selected={option.value===value} data-active={index===active} class="select-option" tabindex="-1" onpointermove={()=>active=index} onclick={()=>choose(index)} onkeydown={keydown}>
     <span>{option.label}</span>{#if option.value===value}<Icon name="check"/>{/if}
    </div>
   {/each}
  </div>
 {/if}
</div>
<style>
 .custom-select{position:relative;width:280px;max-width:100%;flex-shrink:0}
 .select-trigger{width:100%;min-height:50px;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:13px 16px;border:1px solid var(--line);border-radius:12px;background:#fff;color:var(--ink);font:600 15px/1.4 Manrope,Arial,sans-serif;text-align:left;cursor:pointer;transition:border-color .2s,box-shadow .2s}
 .select-trigger>span{min-width:0;overflow-wrap:anywhere}.select-trigger:global(.icon){flex-shrink:0}.select-trigger:hover,.select-trigger[aria-expanded=true]{border-color:var(--ink)}
 .select-trigger:focus-visible{outline:3px solid color-mix(in srgb,var(--orange) 35%,transparent);outline-offset:3px}.select-trigger[aria-expanded=true] :global(.icon){transform:rotate(180deg)}
 .select-options{position:absolute;top:calc(100% + 8px);left:0;width:100%;z-index:20;padding:6px;border:1px solid var(--line);border-radius:14px;background:#fff;box-shadow:0 14px 40px #10291f20;max-height:300px;overflow-y:auto;overscroll-behavior:contain}
 .select-option{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:44px;padding:10px 12px;border-radius:8px;font-size:15px;line-height:1.4;cursor:pointer;color:var(--ink)}
 .select-option[data-active=true]{background:var(--soft)}.select-option[aria-selected=true]{color:var(--orange);font-weight:700}.select-option :global(.icon){width:18px;height:18px}
 @media(max-width:720px){.custom-select{width:100%;margin:0 0 18px}.select-trigger{font-size:16px;min-height:52px}.select-option{font-size:16px;min-height:46px}}
</style>
