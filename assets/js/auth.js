// ── WRC AUTH ─────────────────────────────────────────────────
// Firebase auth state, Firestore score sync, role-based access.
// Loaded on every page. Hides content via #wrc-auth-overlay until
// auth check resolves so the back-button can't flash protected pages.

import { initializeApp }    from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDcqxHcEDsCkuZZhytuTqROycH71SOFtiE",
  authDomain: "wrt-programming.firebaseapp.com",
  projectId: "wrt-programming",
  storageBucket: "wrt-programming.firebasestorage.app",
  messagingSenderId: "241876848170",
  appId: "1:241876848170:web:c471b9407abd661d477d53"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

// ── STATE ─────────────────────────────────────────────────────
export let currentUser = null;
export let currentRole = null;

// ── OVERLAY HELPER ────────────────────────────────────────────
function dismissOverlay() {
  const overlay = document.getElementById('wrc-auth-overlay');
  if (overlay) {
    overlay.style.opacity = '0';
    setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 280);
  }
}

// For pages that don't require auth, dismiss overlay immediately —
// no need to wait for Firebase before showing public content.
// (For auth-gated pages, the overlay stays until the check resolves.)
if (!document.body.dataset.requireAuth) {
  dismissOverlay();
}

// Safety timeout: dismiss overlay after 5s even if Firebase never responds
// (covers auth-gated pages on slow/blocked connections)
setTimeout(dismissOverlay, 5000);

// ── AUTH STATE ────────────────────────────────────────────────
onAuthStateChanged(auth, async (user) => {
  const body         = document.body;
  const requireAuth  = body.dataset.requireAuth;
  const requiredRole = body.dataset.requireRole;
  const isLoginPage  = window.location.pathname.includes('/login');

  if (user) {
    currentUser = user;
    try {
      const snap = await getDoc(doc(db, 'users', user.uid));
      currentRole = snap.exists() ? snap.data().role : 'student';
    } catch {
      currentRole = localStorage.getItem('wrc-role') || 'student';
    }
    localStorage.setItem('wrc-role', currentRole);
    localStorage.setItem('wrc-uid',  user.uid);
    localStorage.setItem('wrc-name', user.displayName || user.email);

    window._wrcRole = currentRole;
    window._wrcUid  = user.uid;

    renderUserChip(user, currentRole);
    // Show progress UI for authenticated users
    const progressEl = document.getElementById('sidebar-progress');
    const signoutHint = document.getElementById('sidebar-progress-signout');
    if (progressEl) progressEl.style.display = '';
    if (signoutHint) signoutHint.style.display = 'none';
    const homePct = document.getElementById('home-progress-ui');
    if (homePct) homePct.style.display = '';
    window.dispatchEvent(new CustomEvent('wrc-auth-ready', { detail: { user, role: currentRole } }));

    // Role gate: admin pages
    if (requiredRole && !['admin', 'leads'].includes(currentRole)) {
      window.location.replace('/');
      return;
    }

    // Sync Firestore scores into local progress (per-user)
    const scores = await loadScoresFromFirestore(user.uid);
    if (typeof WRC !== 'undefined') {
      // Replace local progress with this user's Firestore data — prevents
      // stale data from a previous user bleeding through on shared devices.
      WRC.saveProgress(scores);
      WRC.updateSidebar();
      WRC.loadModuleScores();
    }

    // Admins get answer-key overlays on quizzes
    if (['admin', 'leads'].includes(currentRole)) {
      document.querySelectorAll('.quiz-wrap, .weekly-test-block').forEach(el => {
        el.dataset.adminView = '1';
      });
    }

    dismissOverlay();

  } else {
    currentUser = null;
    currentRole = null;
    window._wrcRole = null;
    window._wrcUid  = null;
    localStorage.removeItem('wrc-role');
    localStorage.removeItem('wrc-uid');
    localStorage.removeItem('wrc-name');
    localStorage.removeItem('wrc-progress-v2');

    renderUserChip(null, null);

    if (requireAuth && !isLoginPage) {
      // replaceState removes the protected page from history so back-button skips it
      history.replaceState(null, '', window.location.href);
      window.location.replace('/login/');
      return;
    }

    dismissOverlay();
  }
});

// ── USER CHIP & DROPDOWN ──────────────────────────────────────
function renderUserChip(user, role) {
  const existing = document.getElementById('wrc-user-chip');
  if (existing) existing.remove();
  const staticBtn = document.getElementById('topbar-signin-static');
  if (staticBtn) staticBtn.style.display = 'none';

  const topbar = document.querySelector('.topbar-links');
  if (!topbar) return;

  const chip = document.createElement('div');
  chip.id    = 'wrc-user-chip';
  chip.className = 'user-chip';

  if (user) {
    const isDashRole  = ['admin', 'leads'].includes(role);
    const roleLabel   = ['admin', 'leads'].includes(role) ? 'Admin' : 'Student';
    const roleBadge   = role === 'admin' ? ' <i data-lucide="crown" style="width: 1em; height: 1em; display: inline-block; vertical-align: -0.125em;"></i>' : isDashRole ? ' <i data-lucide="mortarboard" style="width: 1em; height: 1em; display: inline-block; vertical-align: -0.125em;"></i>' : '';
    const initials    = (user.displayName || user.email || '?').charAt(0).toUpperCase();
    const name        = user.displayName || user.email.split('@')[0];

    chip.innerHTML = `
      <button class="uc-trigger" aria-expanded="false" aria-haspopup="true">
        <span class="uc-avatar">${initials}</span>
        <span class="uc-name">${name}</span>
        <span class="uc-caret" aria-hidden="true"></span>
      </button>
      <div class="uc-dropdown" role="menu">
        <div class="ucd-profile">
          <div class="ucd-avatar">${initials}</div>
          <div class="ucd-info">
            <div class="ucd-fullname">${user.displayName || name}</div>
            <div class="ucd-email">${user.email}</div>
          </div>
        </div>
        <div class="ucd-role-row">
          <span class="ucd-role-badge">${roleLabel}${roleBadge}</span>
        </div>
        <div class="ucd-sep"></div>
        <a href="/settings/" class="ucd-item" role="menuitem">
          <span class="ucd-item-icon"><i data-lucide="settings"></i></span>Settings
        </a>
        ${isDashRole ? `<a href="/dashboard-teacher/" class="ucd-item" role="menuitem"><span class="ucd-item-icon"><i data-lucide="bar-chart-3"></i></span>Dashboard</a>` : ''}
        <div class="ucd-sep"></div>
        <button class="ucd-item ucd-signout" role="menuitem" onclick="wrcSignOut()">
          <span class="ucd-item-icon"><i data-lucide="arrow-right-from-bracket"></i></span>Sign out
        </button>
      </div>
    `;
  } else {
    chip.innerHTML = `<a href="/login/" class="uc-signin">sign in</a>`;
  }

  topbar.appendChild(chip);

  const trigger  = chip.querySelector('.uc-trigger');
  const dropdown = chip.querySelector('.uc-dropdown');
  if (trigger && dropdown) {
    trigger.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('uc-open');
      closeAllDropdowns();
      if (!isOpen) {
        dropdown.classList.add('uc-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
    // Clicks inside dropdown don't bubble up to the outside-click handler
    dropdown.addEventListener('click', e => e.stopPropagation());
    // Reinitialize icons after rendering user chip
    if (typeof initIcons === 'function') initIcons();
  }
}

function closeAllDropdowns() {
  document.querySelectorAll('.uc-dropdown.uc-open').forEach(d => {
    d.classList.remove('uc-open');
    const t = d.previousElementSibling;
    if (t) t.setAttribute('aria-expanded', 'false');
  });
}

// Module-level listeners — added once, handle all dropdowns
document.addEventListener('click', closeAllDropdowns);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllDropdowns(); });

// ── SIGN OUT ─────────────────────────────────────────────────
window.wrcSignOut = async () => {
  await signOut(auth);
  window.location.replace('/login/');
};

// ── ROLE UPDATE (dispatched from settings.md) ─────────────────
window.addEventListener('wrc-update-role', async (e) => {
  const { uid, role } = e.detail;
  if (!uid || !role) return;
  try {
    await setDoc(doc(db, 'users', uid), { role }, { merge: true });
    currentRole = role;
    window._wrcRole = role;
    localStorage.setItem('wrc-role', role);
    if (currentUser) renderUserChip(currentUser, role);
  } catch(err) {
    console.warn('WRC: role update failed', err);
  }
});

// ── SCORE SYNC ───────────────────────────────────────────────
window._wrcSaveToFirestore = (...args) => saveScoreToFirestore(...args);

async function saveScoreToFirestore(uid, pageId, score, total, pct) {
  if (!uid) return;
  try {
    await setDoc(doc(db, 'scores', uid, 'weeks', pageId), {
      score, total, pct,
      date: new Date().toISOString(),
      complete: true
    });
  } catch(e) {
    console.warn('WRC: Firestore write failed', e);
  }
}

async function loadScoresFromFirestore(uid) {
  if (!uid) return {};
  try {
    const snap = await getDocs(collection(db, 'scores', uid, 'weeks'));
    const scores = {};
    snap.forEach(d => { scores[d.id] = d.data(); });
    return scores;
  } catch(e) {
    console.warn('WRC: Firestore read failed', e);
    return {};
  }
}

// ── QUIZ ANSWER TRACKING ─────────────────────────────────────
// Called from wrc.js Quiz.select() to save per-question responses
window._wrcSaveAnswer = (pageId, questionIdx, answerData) => {
  saveAnswerToFirestore(pageId, questionIdx, answerData);
};

async function saveAnswerToFirestore(pageId, questionIdx, answerData) {
  const uid = localStorage.getItem('wrc-uid');
  if (!uid) return;
  try {
    await setDoc(
      doc(db, 'answers', uid, 'quizzes', pageId),
      { [`q${questionIdx}`]: { ...answerData, ts: new Date().toISOString() } },
      { merge: true }
    );
  } catch(e) {
    console.warn('WRC: Failed to save answer', e);
  }
}

// ── ADMIN: LOAD ALL STUDENT SCORES ───────────────────────────
window._wrcLoadAllStudentScores = async function() {
  const results = [];
  try {
    const usersSnap = await getDocs(collection(db, 'users'));
    for (const userDoc of usersSnap.docs) {
      const u = userDoc.data();
      if (u.role === 'student' && !u.isTest) {
        const scoresSnap = await getDocs(collection(db, 'scores', userDoc.id, 'weeks'));
        const weeks = {};
        scoresSnap.forEach(s => { weeks[s.id] = s.data(); });
        results.push({ uid: userDoc.id, name: u.name || u.email, email: u.email, weeks });
      }
    }
  } catch(e) {
    console.error('WRC: Failed to load student scores', e);
  }
  return results;
};

// ── ADMIN: LOAD QUIZ ANSWERS FOR ONE STUDENT ─────────────────
window._wrcLoadStudentAnswers = async function(uid) {
  try {
    const snap = await getDocs(collection(db, 'answers', uid, 'quizzes'));
    const answers = {};
    snap.forEach(d => { answers[d.id] = d.data(); });
    return answers;
  } catch(e) {
    return {};
  }
};

// ── ADMIN: LOAD ALL USERS ────────────────────────────────────
window._wrcLoadAllUsers = async function() {
  try {
    const snap = await getDocs(collection(db, 'users'));
    return snap.docs.map(d => ({ uid: d.id, ...d.data() }));
  } catch(e) {
    return [];
  }
};
