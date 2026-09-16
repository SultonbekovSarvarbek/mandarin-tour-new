export function reveal(node) {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !node.animate) return;
  let animation;
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    animation = node.animate([{opacity:0,translate:'0 16px'},{opacity:1,translate:'0 0'}],{duration:550,easing:'cubic-bezier(.22,1,.36,1)'});
  },{threshold:.05});
  observer.observe(node);
  const stop = () => { observer.disconnect(); animation?.cancel(); };
  preference.addEventListener('change',stop);
  return {destroy(){stop();preference.removeEventListener('change',stop);}};
}
