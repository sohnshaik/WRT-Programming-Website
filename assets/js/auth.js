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

    // Role gate: teacher/admin pages
    if (requiredRole && !['teacher', 'admin', 'leads'].includes(currentRole)) {
      window.location.replace('/');
      return;
    }

    // Sync Firestore scores into local progress
    const scores = await loadScoresFromFirestore(user.uid);
    if (typeof WRC !== 'undefined') {
      const local = WRC.getProgress();
      Object.assign(local, scores);
      WRC.saveProgress(local);
      WRC.updateSidebar();
      WRC.loadModuleScores();
    }

    // Admins/leads get answer-key overlays on quizzes
    if (['admin', 'leads', 'teacher'].includes(currentRole)) {
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

// ── USER CHIP ─────────────────────────────────────────────────
function renderUserChip(user, role) {
  const existing = document.getElementById('wrc-user-chip');
  if (existing) existing.remove();
  const staticBtn = document.getElementById('topbar-signin-static');
  if (staticBtn) staticBtn.style.display = 'none';

  const topbar = document.querySelector('.topbar-links');
  if (!topbar) return;

  const chip = document.createElement('div');
  chip.id = 'wrc-user-chip';
  chip.style.cssText = 'display:flex;align-items:center;gap:8px;margin-left:8px;';

  if (user) {
    const isDashRole = ['teacher', 'admin', 'leads'].includes(role);
    const badge = role === 'admin' ? '👑' : isDashRole ? '🎓' : '';
    chip.innerHTML = `
      <span style="font-size:12px;color:rgba(255,255,255,0.7)">${badge} ${user.displayName || user.email.split('@')[0]}</span>
      ${isDashRole
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
  window.location.replace('/login/');
};

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
      if (u.role === 'student') {
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
