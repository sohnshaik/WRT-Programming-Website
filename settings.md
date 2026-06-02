---
layout: default
title: Settings
require_auth: true
page_id: settings
---

<div class="settings-page">

  <div class="sett-hd">
    <h1>Settings</h1>
    <p>Preferences and account info.</p>
  </div>

  <!-- APPEARANCE -->
  <section class="sett-section">
    <div class="sett-section-label">Appearance</div>
    <div class="sett-row">
      <div class="sett-row-label">
        <div class="sett-row-title">Dark mode</div>
        <div class="sett-row-sub">Switch the interface to a dark theme</div>
      </div>
      <button class="sett-toggle" id="sett-dark-btn" role="switch" aria-checked="false" onclick="settingsToggleDark()">
        <span class="sett-toggle-knob"></span>
        <span class="sett-toggle-label" id="sett-dark-label">Off</span>
      </button>
    </div>
  </section>

  <!-- ACCOUNT -->
  <section class="sett-section">
    <div class="sett-section-label">Account</div>
    <div class="sett-row">
      <div class="sett-row-label">
        <div class="sett-row-title">Name</div>
      </div>
      <div class="sett-row-value" id="sett-name">—</div>
    </div>
    <div class="sett-row">
      <div class="sett-row-label">
        <div class="sett-row-title">Email</div>
      </div>
      <div class="sett-row-value" id="sett-email">—</div>
    </div>
    <div class="sett-row">
      <div class="sett-row-label">
        <div class="sett-row-title">Role</div>
      </div>
      <div class="sett-row-value" id="sett-role">—</div>
    </div>
    <div class="sett-row">
      <div class="sett-row-label">
        <div class="sett-row-title">User ID</div>
        <div class="sett-row-sub">Share with a lead if you need account help</div>
      </div>
      <div class="sett-row-value sett-row-mono" id="sett-uid">—</div>
    </div>
  </section>

  <!-- PROGRESS -->
  <section class="sett-section">
    <div class="sett-section-label">Progress</div>
    <div class="sett-row">
      <div class="sett-row-label">
        <div class="sett-row-title">Reset local progress</div>
        <div class="sett-row-sub">Clears saved quiz scores and completion markers from this device. Your Firestore scores are kept.</div>
      </div>
      <button class="btn btn-sm sett-danger-btn" id="sett-reset-btn" onclick="settingsResetProgress()">Reset</button>
    </div>
  </section>

  <!-- SESSION -->
  <section class="sett-section">
    <div class="sett-section-label">Session</div>
    <div class="sett-row">
      <div class="sett-row-label">
        <div class="sett-row-title">Sign out</div>
        <div class="sett-row-sub">Sign out of your WRT account on this device</div>
      </div>
      <button class="btn btn-sm" onclick="wrcSignOut()">Sign out</button>
    </div>
  </section>

</div>

<script>
function updateSettingsDarkBtn() {
  var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  var btn = document.getElementById('sett-dark-btn');
  if (!btn) return;
  btn.setAttribute('aria-checked', isDark ? 'true' : 'false');
  btn.classList.toggle('is-on', isDark);
  var label = document.getElementById('sett-dark-label');
  if (label) label.textContent = isDark ? 'On' : 'Off';
}

function settingsToggleDark() {
  toggleDark();
  updateSettingsDarkBtn();
}

function settingsResetProgress() {
  if (!confirm('Reset all saved quiz scores and completion status? This cannot be undone.')) return;
  WRC.saveProgress({});
  WRC.updateSidebar();
  if (typeof WRC.loadDashboardCards === 'function') WRC.loadDashboardCards();
  var btn = document.getElementById('sett-reset-btn');
  if (btn) {
    btn.textContent = 'Done!';
    btn.disabled = true;
    setTimeout(function() { btn.textContent = 'Reset'; btn.disabled = false; }, 2000);
  }
}

function populateAccount(user, role) {
  var el;
  if (user) {
    if ((el = document.getElementById('sett-name')))  el.textContent = user.displayName || user.email.split('@')[0];
    if ((el = document.getElementById('sett-email'))) el.textContent = user.email;
    if ((el = document.getElementById('sett-role')))  el.textContent = role || '—';
    if ((el = document.getElementById('sett-uid')))   el.textContent = user.uid;
  } else {
    // Fallback from localStorage (already populated by auth.js for returning users)
    if ((el = document.getElementById('sett-name')))  el.textContent = localStorage.getItem('wrc-name')  || '—';
    if ((el = document.getElementById('sett-role')))  el.textContent = localStorage.getItem('wrc-role')  || '—';
    if ((el = document.getElementById('sett-uid')))   el.textContent = localStorage.getItem('wrc-uid')   || '—';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  updateSettingsDarkBtn();
  populateAccount(null, null); // fill from localStorage while auth resolves
});

// Auth resolves async — repopulate with accurate Firebase data
window.addEventListener('wrc-auth-ready', function(e) {
  populateAccount(e.detail.user, e.detail.role);
});
</script>
