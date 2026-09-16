import { writable } from 'svelte/store';
export const locales = ['ru', 'uz', 'uz-Cyrl'];
export const language = writable('ru');

// Uzbek Latin → Cyrillic. Keep markup, brand names and technical abbreviations intact.
const letters = {a:'а',b:'б',d:'д',f:'ф',g:'г',h:'ҳ',i:'и',j:'ж',k:'к',l:'л',m:'м',n:'н',o:'о',p:'п',q:'қ',r:'р',s:'с',t:'т',u:'у',v:'в',x:'х',y:'й',z:'з',c:'ц'};
const pairs = {"o'":'ў',"g'":'ғ',sh:'ш',ch:'ч',yo:'ё',yu:'ю',ya:'я',ye:'е'};
export function cyrillic(text = '') {
  return text.split(/(<[^>]*>|Family Mandarin Umra|Mandarin Tour|MANDARIN TOUR|Cambridge Residence|Telegram|Instagram|eSIM|KLCC|eVisa|Visa on Arrival|PDF)/g).map((part,index) => {
    if(index % 2) return part;
    return part.replace(/[A-Za-z][A-Za-z‘’ʻʼ'`]*/g, word => {
      const normalized = word.replace(/[‘’ʻʼ`]/g,"'");
      const lower = normalized.toLowerCase();
      const exceptions = {sentabr:'сентябрь',ekskursiya:'экскурсия',ekskursiyalar:'экскурсиялар',konsepsiyasi:'концепцияси'};
      let result = exceptions[lower] || '';
      if(!result) for(let i=0;i<lower.length;i++) {
        const pair=lower.slice(i,i+2);
        if(pair==='yo' && lower[i+2]==="'") {result+='йў';i+=2;}
        else if(pairs[pair]) {result+=pairs[pair];i++;}
        else if(lower[i]==='e') result+=(i===0||/[aeiou]/.test(lower[i-1]))?'э':'е';
        else result+=letters[lower[i]] || (lower[i]==="'"?'ъ':lower[i]);
      }
      if(word===word.toUpperCase()) return result.toUpperCase();
      return /^[A-Z]/.test(word) ? result[0].toUpperCase()+result.slice(1) : result;
    });
  }).join('');
}
export function localized(locale, ru, uz) {
  return locale === 'ru' ? ru : locale === 'uz-Cyrl' ? cyrillic(uz) : uz;
}
export function tourCopy(tour, locale) {
  if(locale !== 'uz-Cyrl') return tour[locale];
  return Object.fromEntries(Object.entries(tour.uz).map(([key,value])=>[key,cyrillic(value)]));
}
