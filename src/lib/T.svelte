<script>
  import { language, localized } from './language.js';
  import ruCopy from './ru.json';
  import uzCopy from './uz.json';
  let { k = '', ru = '', uz = '' } = $props();
  const copy = $derived(localized($language, k ? ruCopy[k] : ru, k ? uzCopy[k] : uz));
</script>
{@html copy || ruCopy[k] || ru}
