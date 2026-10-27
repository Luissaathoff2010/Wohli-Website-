/* Anmelden / Registrieren für Gäste und Gastgeber (Demo ohne Server) */
(function () {
  const W = window.Wohlii;
  const { store, $, $$ } = W;

  document.addEventListener('DOMContentLoaded', () => {
    const role = W.param('rolle') === 'host' ? 'host' : 'guest';
    const next = W.param('next');
    const app = $('#app');
    app.innerHTML = `
      <div class="auth">
        <div class="auth-art"><img src="assets/img/macro/${role === 'host' ? 'leinen' : 'gischt'}.jpg" alt=""><p>Schön, dass Sie da sind.</p></div>
        <div class="auth-panel">
          <div class="tabs" role="tablist" aria-label="Anmelden oder registrieren">
            <button type="button" role="tab" aria-selected="true" data-tab="login">Anmelden</button>
            <button type="button" role="tab" aria-selected="false" data-tab="register">Neues Konto</button>
          </div>

          <form id="f-login" class="stack" novalidate>
            <h1 style="font-size:2rem;margin:0">Anmelden</h1>
            <label for="l-email">E-Mail-Adresse<input id="l-email" type="email" autocomplete="email" required></label>
            <label for="l-pw">Passwort<input id="l-pw" type="password" autocomplete="current-password" required></label>
            <p class="error" id="l-err" role="alert"></p>
            <button class="btn btn-primary" type="submit">Anmelden</button>
          </form>

          <form id="f-register" class="stack" novalidate hidden>
            <h1 style="font-size:2rem;margin:0">Neues Konto</h1>
            <fieldset class="tabs" style="border:0;margin:0" aria-label="Ich bin …">
              <label class="check"><input type="radio" name="r-role" value="guest" ${role === 'guest' ? 'checked' : ''}> Gast</label>
              <label class="check" style="margin-left:1rem"><input type="radio" name="r-role" value="host" ${role === 'host' ? 'checked' : ''}> Gastgeber / Vermieter</label>
            </fieldset>
            <label for="r-name">Ihr Name<input id="r-name" autocomplete="name" required></label>
            <label for="r-house" id="r-house-wrap" ${role === 'host' ? '' : 'hidden'}>Name Ihres Hauses / Ihrer Unterkunft<input id="r-house" placeholder="z. B. Apartmenthaus Seeblick"></label>
            <label for="r-email">E-Mail-Adresse<input id="r-email" type="email" autocomplete="email" required></label>
            <label for="r-pw">Passwort <span class="hint">mindestens 8 Zeichen</span><input id="r-pw" type="password" autocomplete="new-password" minlength="8" required></label>
            <label class="check small" style="font-weight:400"><input type="checkbox" id="r-privacy" required> Ich habe die <a href="datenschutz.html" target="_blank">Datenschutzerklärung</a> gelesen.</label>
            <p class="error" id="r-err" role="alert"></p>
            <button class="btn btn-primary" type="submit">Konto anlegen</button>
          </form>

          <div class="demo-box">
            <strong>Prototyp – zum Ausprobieren:</strong><br>
            Gast: <code>gast@demo.wohlii</code> · Passwort <code>wohlii</code><br>
            Gastgeber (Apartmenthaus Saathoff): <code>vermieter@demo.wohlii</code> · Passwort <code>wohlii</code><br>
            <span class="small muted">Im Prototyp werden Konten nur in Ihrem Browser gespeichert. Für den Livebetrieb kommt ein Server mit sicherer Anmeldung dazu.</span>
          </div>
        </div>
      </div>`;

    const go = (user) => {
      location.href = next && !/^https?:|^\/\//.test(next) ? next : user.role === 'host' ? 'vermieter.html' : 'konto.html';
    };
    const tab = (name) => {
      $$('[data-tab]').forEach((b) => b.setAttribute('aria-selected', b.dataset.tab === name));
      $('#f-login').hidden = name !== 'login';
      $('#f-register').hidden = name !== 'register';
    };
    $$('[data-tab]').forEach((b) => b.addEventListener('click', () => tab(b.dataset.tab)));
    if (W.param('neu') !== null) tab('register');
    $$('[name="r-role"]').forEach((r) => r.addEventListener('change', () => { $('#r-house-wrap').hidden = r.value !== 'host' || !r.checked; }));

    $('#f-login').addEventListener('submit', async (e) => {
      e.preventDefault();
      $('#l-err').textContent = '';
      try { go(await store.login($('#l-email').value, $('#l-pw').value)); } catch (err) { $('#l-err').textContent = err.message; }
    });
    $('#f-register').addEventListener('submit', async (e) => {
      e.preventDefault();
      const err = $('#r-err');
      err.textContent = '';
      const email = $('#r-email').value.trim();
      if (!$('#r-name').value.trim()) return (err.textContent = 'Bitte geben Sie Ihren Namen ein.');
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return (err.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      if ($('#r-pw').value.length < 8) return (err.textContent = 'Das Passwort braucht mindestens 8 Zeichen.');
      if (!$('#r-privacy').checked) return (err.textContent = 'Bitte bestätigen Sie die Datenschutzerklärung.');
      try {
        const user = await store.register({ role: $('[name="r-role"]:checked').value, name: $('#r-name').value, email, password: $('#r-pw').value, houseName: $('#r-house').value.trim() });
        go(user);
      } catch (x) { err.textContent = x.message; }
    });
  });
})();
