<script>
  import { language } from './language.js';
  import ruCopy from './ru.json';
  import uzCopy from './uz.json';
  let { k = '', ru = '', uz = '' } = $props();
  const copy = $derived(k ? ($language === 'uz' ? uzCopy[k] : ruCopy[k]) : ($language === 'uz' ? uz : ru));
</script>
{@html copy || ruCopy[k] || ru}
