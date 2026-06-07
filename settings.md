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
        <div class="sett-row-sub">showing wrong? scroll down to fix it</div>
      </div>
      <div class="sett-row-value" id="sett-role">—</div>
    </div>
    <div class="sett-row">
      <div class="sett-row-label">
        <div class="sett-row-title">User ID</div>
        <div class="sett-row-sub">share with a lead if you need account help</div>
      </div>
      <div class="sett-row-value sett-row-mono" id="sett-uid">—</div>
    </div>
  </section>

  <!-- FIX ROLE -->
  <section class="sett-section">
    <div class="sett-section-label">Fix Role</div>
    <div class="sett-row" style="flex-wrap:wrap; gap: 0.75rem;">
      <div class="sett-row-label">
        <div class="sett-row-title">Re-verify access code</div>
        <div class="sett-row-sub">if your role is wrong, enter your access code to update it in the database</div>
      </div>
      <div style="display:flex; gap: 8px; flex:1; min-width:200px;">
        <input type="text" id="sett-role-code" placeholder="access code" autocomplete="off"
          style="flex:1; padding: 8px 12px; border: 1px solid var(--sett-input-border, #d1d5db); border-radius: 6px; font-size: 13px; font-family: inherit; color: #1f2937; background: #fff; outline:none; min-width:0;">
        <button class="btn btn-navy btn-sm" onclick="settingsFixRole()" id="sett-fix-role-btn">Update</button>
      </div>
      <div id="sett-role-msg" style="width:100%; font-size:13px; display:none; font-weight:600; padding: 0 0 4px;"></div>
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

function roleLabel(raw) {
  if (raw === 'admin' || raw === 'leads' || raw === 'teacher') return 'Admin';
  if (raw === 'student') return 'Student';
  return raw || '—'; // fallback for unrecognized / missing values
}

function populateAccount(user, role) {
  var el;
  if (user) {
    if ((el = document.getElementById('sett-name')))  el.textContent = user.displayName || user.email.split('@')[0];
    if ((el = document.getElementById('sett-email'))) el.textContent = user.email;
    if ((el = document.getElementById('sett-role')))  el.textContent = roleLabel(role);
    if ((el = document.getElementById('sett-uid')))   el.textContent = user.uid;
  } else {
    if ((el = document.getElementById('sett-name')))  el.textContent = localStorage.getItem('wrc-name') || '—';
    if ((el = document.getElementById('sett-role')))  el.textContent = roleLabel(localStorage.getItem('wrc-role'));
    if ((el = document.getElementById('sett-uid')))   el.textContent = localStorage.getItem('wrc-uid')  || '—';
  }
}

async function settingsFixRole() {
  var code = (document.getElementById('sett-role-code').value || '').trim();
  var msg  = document.getElementById('sett-role-msg');
  var btn  = document.getElementById('sett-fix-role-btn');
  if (!code) { showRoleMsg('enter your access code first', false); return; }

  btn.disabled = true; btn.textContent = 'checking...';

  // Hash the code (same SHA-256 as login.md)
  var hash;
  try {
    var buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(code));
    hash = Array.from(new Uint8Array(buf)).map(function(b) { return b.toString(16).padStart(2,'0'); }).join('');
  } catch(e) {
    showRoleMsg('error hashing code', false);
    btn.disabled = false; btn.textContent = 'Update';
    return;
  }

  var ACCESS_CODE_HASHES = {
    'fda533469e66a6f2da73b3e0ea0ad14284eebf37766de4114dab47d9ef49d84f': 'student',
    '360835c8908fde77b297a90cfd838461fca6bfe22e428e3f845c0180c6d9032a': 'admin',
  };

  var newRole = ACCESS_CODE_HASHES[hash];
  if (!newRole) {
    showRoleMsg("that code doesn't match any role :( ask a lead for the right one", false);
    btn.disabled = false; btn.textContent = 'Update';
    return;
  }

  var uid = localStorage.getItem('wrc-uid') || window._wrcUid;
  if (!uid) {
    showRoleMsg('not signed in — try refreshing the page', false);
    btn.disabled = false; btn.textContent = 'Update';
    return;
  }

  // Update Firestore via auth.js's exposed Firestore instance
  // We use a fetch to the Firestore REST API since we don't have direct access here
  // Alternatively: dispatch a custom event that auth.js can handle
  window.dispatchEvent(new CustomEvent('wrc-update-role', { detail: { uid: uid, role: newRole } }));

  // Optimistically update the display
  localStorage.setItem('wrc-role', newRole);
  window._wrcRole = newRole;
  var roleEl = document.getElementById('sett-role');
  if (roleEl) roleEl.textContent = roleLabel(newRole);
  showRoleMsg('role updated to ' + roleLabel(newRole) + '! refresh the page to see it everywhere :)', true);
  btn.disabled = false; btn.textContent = 'Update';
  document.getElementById('sett-role-code').value = '';
}

function showRoleMsg(text, ok) {
  var el = document.getElementById('sett-role-msg');
  if (!el) return;
  el.textContent = text;
  el.style.display = 'block';
  el.style.color = ok ? '#00875A' : '#C41230';
  setTimeout(function() { el.style.display = 'none'; }, 5000);
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
