// Keep each widget's token and lifetime separate across wizard/success screens.
export function mountTurnstile(element, action, sitekey, onToken, onError, browser = window) {
  let widget = null;
  let timer;
  let disposed = false;
  function clearToken() {
    const input = element.querySelector('[name="cf-turnstile-response"]');
    if (input) input.value = '';
    onToken?.('');
  }
  function reset() {
    clearToken();
    onError('');
    if (widget !== null) browser.turnstile.reset(widget);
    else render();
  }
  function render() {
    if (disposed || widget !== null || !browser.turnstile) return;
    widget = browser.turnstile.render(element, {
      sitekey, theme: 'light', action,
      callback: token => { if (!disposed) { onToken?.(token); onError(''); } },
      'expired-callback': () => { if (!disposed) { clearToken(); onError('La vérification a expiré. Veuillez la renouveler.'); } },
      'error-callback': () => { if (!disposed) { clearToken(); onError('La vérification est indisponible. Veuillez la relancer.'); } },
    });
    browser.clearInterval(timer);
  }
  const listener = event => { if (event.detail === action) reset(); };
  browser.addEventListener('orizia-turnstile-reset', listener);
  timer = browser.setInterval(render, 100);
  render();
  return () => {
    disposed = true;
    browser.clearInterval(timer);
    browser.removeEventListener('orizia-turnstile-reset', listener);
    if (widget !== null) browser.turnstile.remove(widget);
  };
}
