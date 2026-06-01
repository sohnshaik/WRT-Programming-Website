// ── WRC AUTH ─────────────────────────────────────────────────
// Handles Firebase auth state, syncing Firestore scores, and
// role-based access. Loaded on every page via the default layout.

import { initializeApp }    from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// !! PASTE YOUR FIREBASE CONFIG HERE — same config as login.md
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

// ── AUTH GUARD ───────────────────────────────────────────────
// Pages with data-require-auth on <body> redirect to /login/ if not signed in.
// Pages with data-require-role="teacher" also check role.

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    // get role from Firestore (source of truth)
    try {
      const snap = await getDoc(doc(db, 'users', user.uid));
      currentRole = snap.exists() ? snap.data().role : 'student';
    } catch {
      currentRole = localStorage.getItem('wrc-role') || 'student';
    }
    localStorage.setItem('wrc-role', currentRole);
    localStorage.setItem('wrc-uid',  user.uid);
    localStorage.setItem('wrc-name', user.displayName || user.email);

    renderUserChip(user, currentRole);

    // Role gate: teacher pages
    const body = document.body;
    const requiredRole = body.dataset.requireRole;
    if (requiredRole && !['teacher','admin'].includes(currentRole)) {
      window.location.href = '/';
    }
  } else {
    currentUser = null;
    currentRole = null;
    localStorage.removeItem('wrc-role');
    localStorage.removeItem('wrc-uid');
    localStorage.removeItem('wrc-name');

    // Auth gate: protected pages
    const requireAuth = document.body.dataset.requireAuth;
    const isLoginPage = window.location.pathname.includes('/login');
    if (requireAuth && !isLoginPage) {
      window.location.href = '/login/';
    }
    renderUserChip(null, null);
  }
});

// ── USER CHIP IN TOPBAR ───────────────────────────────────────
function renderUserChip(user, role) {
  const existing = document.getElementById('wrc-user-chip');
  if (existing) existing.remove();
  // Replace static fallback sign-in button once we know auth state
  const staticBtn = document.getElementById('topbar-signin-static');
  if (staticBtn) staticBtn.style.display = 'none';

  const topbar = document.querySelector('.topbar-links');
  if (!topbar) return;

  const chip = document.createElement('div');
  chip.id = 'wrc-user-chip';
  chip.style.cssText = 'display:flex;align-items:center;gap:8px;margin-left:8px;';

  if (user) {
    const roleBadge = role === 'admin' ? '👑' : role === 'teacher' ? '🎓' : '';
    chip.innerHTML = `
      <span style="font-size:12px;color:rgba(255,255,255,0.7)">${roleBadge} ${user.displayName || user.email.split('@')[0]}</span>
      ${role === 'teacher' || role === 'admin'
        ? `<a href="/dashboard-teacher/" style="font-size:12px;color:#fff;background:rgba(255,255,255,0.1);padding:4px 10px;border-radius:4px;text-decoration:none;border:1px solid rgba(255,255,255,0.2)">dashboard</a>`
        : ''}
      <button onclick="wrcSignOut()" style="font-size:12px;color:rgba(255,255,255,0.6);background:none;border:1px solid rgba(255,255,255,0.15);border-radius:4px;padding:4px 10px;cursor:pointer;font-family:inherit">sign out</button>
    `;
  } else {
    chip.innerHTML = `<a href="/login/" style="font-size:12px;color:#fff;background:#C41230;padding:5px 12px;border-radius:4px;text-decoration:none;font-weight:700">sign in</a>`;
  }

  topbar.appendChild(chip);
}

// ── SIGN OUT ─────────────────────────────────────────────────
window.wrcSignOut = async () => {
  await signOut(auth);
  window.location.href = '/login/';
};

// Expose to wrc.js (which is a regular script, not a module)
window._wrcSaveToFirestore = (...args) => saveScoreToFirestore(...args);

// ── FIRESTORE SCORE SYNC ──────────────────────────────────────
// Exposed to wrc.js (non-module) via window global
async function saveScoreToFirestore(uid, pageId, score, total, pct) {
  if (!uid) return;
  try {
    await setDoc(doc(db, 'scores', uid, 'weeks', pageId), {
      score, total, pct,
      date: new Date().toISOString(),
      complete: true
    });
  } catch(e) {
    console.warn('WRC: Firestore write failed, score saved locally only', e);
  }
}

// Load all scores for a user from Firestore
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

// ── TEACHER: LOAD ALL STUDENT SCORES ─────────────────────────
async function loadAllStudentScores() {
  const results = [];
  try {
    // Get all users
    const usersSnap = await getDocs(collection(db, 'users'));
    for (const userDoc of usersSnap.docs) {
      const userData = userDoc.data();
      if (userData.role === 'student') {
        const scoresSnap = await getDocs(collection(db, 'scores', userDoc.id, 'weeks'));
        const weeks = {};
        scoresSnap.forEach(s => { weeks[s.id] = s.data(); });
        results.push({ uid: userDoc.id, name: userData.name, email: userData.email, weeks });
      }
    }
  } catch(e) {
    console.error('WRC: Failed to load student scores', e);
  }
  return results;
}
