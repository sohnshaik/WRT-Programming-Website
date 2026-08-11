---
layout: default
title: Sign In
permalink: /login/
no_sidebar: true
no_auth_guard: true
---

<style>
.auth-shell {
  min-height: calc(100vh - var(--topbar-h, 52px));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: #f8f9fb;
}
.auth-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.10);
  overflow: hidden;
}
.auth-header {
  background: #1B2A4A;
  padding: 1.75rem 2rem;
  text-align: center;
  border-bottom: 4px solid #C41230;
}
.auth-header img { width: 52px; height: 52px; object-fit: contain; border-radius: 6px; margin-bottom: 0.75rem; }
.auth-header h1 { font-size: 1.2rem; font-weight: 900; color: #fff; margin: 0 0 4px; }
.auth-header p { font-size: 12px; color: rgba(255,255,255,0.5); margin: 0; }
.auth-body { padding: 1.75rem 2rem; }
.auth-tabs {
  display: flex; gap: 4px; margin-bottom: 1.5rem;
  background: #f1f5f9; border-radius: 6px; padding: 3px;
}
.auth-tab {
  flex: 1; padding: 7px 12px; border: none;
  background: transparent; border-radius: 4px;
  font-size: 13px; font-weight: 700; cursor: pointer;
  transition: all 0.15s; color: #64748b;
  font-family: inherit;
}
.auth-tab.active { background: #fff; color: #1B2A4A; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
.auth-form { display: none; }
.auth-form.active { display: block; }
.auth-field { margin-bottom: 1rem; }
.auth-field label { display: block; font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.05em; }
.auth-field input, .auth-field select {
  width: 100%; padding: 9px 12px;
  border: 1px solid #e2e8f0; border-radius: 6px;
  font-size: 14px; font-family: inherit; color: #1e293b;
  outline: none; transition: border-color 0.15s;
  box-sizing: border-box;
}
.auth-field input:focus, .auth-field select:focus { border-color: #C41230; }
.auth-field select { cursor: pointer; }
.auth-submit {
  width: 100%; padding: 10px; background: #C41230; color: #fff;
  border: none; border-radius: 6px; font-size: 14px; font-weight: 700;
  cursor: pointer; font-family: inherit; transition: background 0.15s;
  margin-top: 0.25rem;
}
.auth-submit:hover { background: #a50f28; }
.auth-submit:disabled { opacity: 0.5; cursor: default; }
.auth-error {
  background: #fff1f2; border: 1px solid #fca5a5;
  border-radius: 5px; padding: 8px 12px;
  font-size: 13px; color: #b91c1c; margin-bottom: 1rem;
  display: none;
}
.auth-error.show { display: block; }
.auth-success {
  background: #f0fdf4; border: 1px solid #86efac;
  border-radius: 5px; padding: 8px 12px;
  font-size: 13px; color: #166534; margin-bottom: 1rem;
  display: none;
}
.auth-success.show { display: block; }
.auth-note {
  margin-top: 1rem; font-size: 12px; color: #94a3b8;
  text-align: center; line-height: 1.5;
}
</style>

<div class="auth-shell">
  <div class="auth-card">
    <div class="auth-header">
      <img src="{{ '/assets/images/logo.jpeg' | relative_url }}" alt="WRT">
      <h1>WRT Programming Course</h1>
      <p>sign in or create an account to get started :)</p>
    </div>
    <div class="auth-body">

      <div class="auth-error" id="auth-error"></div>
      <div class="auth-success" id="auth-success"></div>

      <div class="auth-tabs">
        <button class="auth-tab active" onclick="switchTab('login')">sign in</button>
        <button class="auth-tab" onclick="switchTab('register')">create account</button>
      </div>

      <!-- Login form -->
      <form class="auth-form active" id="form-login" onsubmit="handleLogin(event)">
        <div class="auth-field">
          <label>email</label>
          <input type="email" id="login-email" placeholder="your@waltonrobotics.com" required>
        </div>
        <div class="auth-field">
          <label>password</label>
          <input type="password" id="login-password" placeholder="••••••••" required>
        </div>
        <button class="auth-submit" type="submit" id="login-btn">sign in</button>
        <p class="auth-note">forgot your password? use the <button type="button" style="background:none;border:none;color:inherit;text-decoration:underline;cursor:pointer;padding:0;font:inherit" onclick="sendPasswordReset()">reset link</button> or slack sohan / hrehaan</p>
      </form>

      <!-- Register form -->
      <form class="auth-form" id="form-register" onsubmit="handleRegister(event)">
        <div class="auth-field">
          <label>display name</label>
          <input type="text" id="reg-name" placeholder="your name" required>
        </div>
        <div class="auth-field">
          <label>email</label>
          <input type="email" id="reg-email" placeholder="your@waltonrobotics.com" required>
        </div>
        <div class="auth-field">
          <label>password</label>
          <input type="password" id="reg-password" placeholder="at least 8 chars" minlength="8" required>
        </div>
        <div class="auth-field">
          <label>access code</label>
          <input type="text" id="reg-code" placeholder="ask your programming lead" required>
          <p style="font-size:11px;color:#94a3b8;margin:4px 0 0">slack sohan or another programming lead for this :)</p>
        </div>
        <button class="auth-submit" type="submit" id="register-btn">create account</button>
      </form>

    </div>
  </div>
</div>

<script type="module">
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// !! ADD YOUR FIREBASE CONFIG HERE AFTER CREATING A PROJECT AT console.firebase.google.com
const firebaseConfig = {
  apiKey: "AIzaSyDcqxHcEDsCkuZZhytuTqROycH71SOFtiE",
  authDomain: "wrt-programming.firebaseapp.com",
  projectId: "wrt-programming",
  storageBucket: "wrt-programming.firebasestorage.app",
  messagingSenderId: "241876848170",
  appId: "1:241876848170:web:c471b9407abd661d477d53"
};

// Access codes are SHA-256 hashed — plaintext codes are never stored in source.
// To generate a new hash: https://emn178.github.io/online-tools/sha256.html
const ACCESS_CODE_HASHES = {
  'fda533469e66a6f2da73b3e0ea0ad14284eebf37766de4114dab47d9ef49d84f': 'student',
  '360835c8908fde77b297a90cfd838461fca6bfe22e428e3f845c0180c6d9032a': 'admin',
};

async function hashCode(raw) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw.trim()));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

window.switchTab = (tab) => {
  document.querySelectorAll('.auth-tab').forEach((t,i) => t.classList.toggle('active', (i===0&&tab==='login')||(i===1&&tab==='register')));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  document.getElementById('form-' + tab).classList.add('active');
  clearMessages();
};

function showError(msg) {
  const el = document.getElementById('auth-error');
  el.textContent = msg; el.classList.add('show');
  document.getElementById('auth-success').classList.remove('show');
}
function showSuccess(msg) {
  const el = document.getElementById('auth-success');
  el.textContent = msg; el.classList.add('show');
  document.getElementById('auth-error').classList.remove('show');
}
function clearMessages() {
  document.getElementById('auth-error').classList.remove('show');
  document.getElementById('auth-success').classList.remove('show');
}

window.handleLogin = async (e) => {
  e.preventDefault();
  const btn = document.getElementById('login-btn');
  btn.disabled = true; btn.textContent = 'signing in...';
  clearMessages();
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, 'users', cred.user.uid));
    const role = snap.exists() ? snap.data().role : 'student';
    localStorage.setItem('wrc-role', role);
    localStorage.setItem('wrc-uid',  cred.user.uid);
    localStorage.setItem('wrc-name', cred.user.displayName || email);
    showSuccess('welcome back!! redirecting...');
    setTimeout(() => { window.location.href = role === 'admin' ? '/dashboard-teacher/' : '/'; }, 900);
  } catch(err) {
    showError(friendlyError(err.code));
    btn.disabled = false; btn.textContent = 'sign in';
  }
};

window.handleRegister = async (e) => {
  e.preventDefault();
  const btn = document.getElementById('register-btn');
  btn.disabled = true; btn.textContent = 'creating account...';
  clearMessages();
  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const code     = document.getElementById('reg-code').value.trim();

  const hash = await hashCode(code);
  const role = ACCESS_CODE_HASHES[hash];
  if (!role) {
    showError("that access code isn't right :( ask a programming lead for the correct one!!");
    btn.disabled = false; btn.textContent = 'create account';
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    await setDoc(doc(db, 'users', cred.user.uid), { name, email, role, createdAt: new Date().toISOString() });
    localStorage.setItem('wrc-role', role);
    localStorage.setItem('wrc-uid',  cred.user.uid);
    localStorage.setItem('wrc-name', name);
    showSuccess('account created!! welcome to the team :D redirecting...');
    setTimeout(() => { window.location.href = '/'; }, 1200);
  } catch(err) {
    showError(friendlyError(err.code));
    btn.disabled = false; btn.textContent = 'create account';
  }
};

function friendlyError(code) {
  const map = {
    'auth/user-not-found':      "can't find an account with that email :(",
    'auth/wrong-password':      'wrong password!! try again',
    'auth/email-already-in-use':'that email is already registered. try signing in instead!',
    'auth/weak-password':       'password needs to be at least 6 characters',
    'auth/invalid-email':       'that email looks wrong :(',
    'auth/too-many-requests':   'too many attempts. wait a bit and try again',
    'auth/invalid-credential':  'email or password is incorrect :(',
  };
  return map[code] || 'something went wrong: ' + code;
}

window.sendPasswordReset = async () => {
  const email = document.getElementById('login-email').value.trim();
  if (!email) {
    showError('enter your email above first, then click the reset link :)');
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email);
    showSuccess('reset email sent!! check your inbox (and spam folder)');
  } catch(err) {
    showError(friendlyError(err.code));
  }
};
</script>
