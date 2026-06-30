---
layout: default
title: Admin Dashboard
permalink: /dashboard-teacher/
require_role: teacher
---

<style>
.dash-shell { max-width: 1200px; margin: 0 auto; padding: 2rem 2.5rem; }
.dash-hero {
  background: #1B2A4A; border-bottom: 4px solid #C41230;
  padding: 2rem 2.5rem; margin-bottom: 0;
}
.dash-hero h1 { font-size: 1.6rem; font-weight: 900; color: #fff; margin: 0 0 4px; }
.dash-hero p  { font-size: 14px; color: rgba(255,255,255,0.55); margin: 0; }
.dash-stats { display: flex; gap: 1rem; margin: 1.5rem 0; flex-wrap: wrap; }
.dstat { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem 1.25rem; min-width: 120px; flex: 1; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
.dstat-num   { font-size: 1.8rem; font-weight: 900; color: #1B2A4A; line-height: 1; }
.dstat-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 3px; }
.tab-bar { display: flex; gap: 4px; margin: 1.5rem 0 0; border-bottom: 2px solid #e2e8f0; }
.tab-btn { padding: 8px 18px; background: none; border: none; border-bottom: 2px solid transparent; margin-bottom: -2px; font-size: 13px; font-weight: 700; color: #94a3b8; cursor: pointer; font-family: inherit; transition: all 0.15s; }
.tab-btn.active { color: #1B2A4A; border-bottom-color: #C41230; }
.tab-panel { display: none; padding-top: 1.5rem; }
.tab-panel.active { display: block; }
.filter-bar { display: flex; gap: 10px; margin-bottom: 1.25rem; flex-wrap: wrap; }
.filter-input { padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 13px; font-family: inherit; outline: none; transition: border-color 0.15s; color: #1e293b; background: #fff; }
.filter-input:focus { border-color: #C41230; }
.student-table-wrap { overflow-x: auto; }
table.score-table { width: 100%; border-collapse: collapse; font-size: 13px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
.score-table thead { background: #1B2A4A; }
.score-table th { padding: 10px 14px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.7); text-align: left; white-space: nowrap; }
.score-table td { padding: 9px 14px; border-bottom: 1px solid #f1f5f9; color: #475569; white-space: nowrap; }
.score-table td:first-child { font-weight: 700; color: #1B2A4A; }
.score-table tr:last-child td { border-bottom: none; }
.score-table tr:hover td { background: #f8fafc; }
.score-cell { display: inline-block; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-family: monospace; font-size: 12px; }
.sc-great { background: #f0fdf4; color: #166534; }
.sc-ok    { background: #fefce8; color: #854d0e; }
.sc-bad   { background: #fff1f2; color: #b91c1c; }
.sc-none  { background: #f1f5f9; color: #94a3b8; }
.view-answers-btn { padding: 4px 10px; background: #1B2A4A; color: #fff; border: none; border-radius: 4px; font-size: 11px; font-weight: 700; cursor: pointer; font-family: inherit; white-space: nowrap; }
.view-answers-btn:hover { background: #0f1c33; }
.email-btn { padding: 4px 10px; background: #C41230; color: #fff; border: none; border-radius: 4px; font-size: 11px; font-weight: 700; cursor: pointer; font-family: inherit; white-space: nowrap; text-decoration: none; display: inline-block; }
.email-btn:hover { background: #9e0f26; color: #fff; text-decoration: none; }
.export-btn { padding: 8px 16px; background: #1B2A4A; color: #fff; border: none; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit; }
.export-btn:hover { background: #0f1c33; }
.dash-loading { text-align: center; padding: 3rem; color: #94a3b8; font-size: 14px; }
.answer-panel { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; margin-top: 1rem; }
.ap-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.ap-header h3 { font-size: 15px; font-weight: 700; color: #1B2A4A; margin: 0; }
.answer-list { display: flex; flex-direction: column; gap: 8px; }
.answer-row { background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.9rem 1.1rem; }
.ar-q { font-size: 13px; font-weight: 700; color: #1e293b; margin-bottom: 6px; }
.ar-opts { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
.ar-opt { padding: 3px 10px; border-radius: 4px; font-size: 12px; background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0; }
.ar-opt.sel-correct { background: #f0fdf4; color: #166534; border-color: #86efac; font-weight: 700; }
.ar-opt.sel-wrong   { background: #fff1f2; color: #b91c1c; border-color: #fca5a5; font-weight: 700; }
.ar-opt.answer-key  { background: #eff6ff; color: #1e40af; border-color: #93c5fd; }
.ar-meta { font-size: 11px; color: #94a3b8; }
</style>

<div class="dash-hero">
  <h1>admin dashboard 👑</h1>
  <p>scores, quiz answers by student, and all users in one place. export CSV anytime!!</p>
</div>

<div class="dash-shell">
  <div class="dash-stats">
    <div class="dstat"><div class="dstat-num" id="stat-students">...</div><div class="dstat-label">students</div></div>
    <div class="dstat"><div class="dstat-num" id="stat-completed">...</div><div class="dstat-label">weeks completed</div></div>
    <div class="dstat"><div class="dstat-num" id="stat-avgpct">...</div><div class="dstat-label">avg score</div></div>
    <div class="dstat"><div class="dstat-num" id="stat-perfect">...</div><div class="dstat-label">100% scores</div></div>
  </div>

  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab('scores')">📊 Scores</button>
    <button class="tab-btn" onclick="switchTab('answers')">📝 Quiz Answers</button>
    <button class="tab-btn" onclick="switchTab('users')">👥 Users</button>
  </div>

  <!-- SCORES -->
  <div class="tab-panel active" id="tab-scores">
    <div class="filter-bar">
      <input class="filter-input" type="text" id="search-students" placeholder="search by name or email..." oninput="filterTable()">
      <select class="filter-input" id="filter-week" onchange="filterTable()">
        <option value="">all weeks</option>
        <option value="summer-w1">W1 - The Basics</option><option value="summer-w2">W2 - Logic</option>
        <option value="summer-w3">W3 - Loops</option><option value="summer-w4">W4 - Arrays</option>
        <option value="summer-w5">W5 - OOP</option><option value="summer-w6">W6 - Inheritance</option>
        <option value="summer-w7">W7 - Advanced</option><option value="summer-w8">W8 - Bridge</option>
        <option value="offseason-o1">O1 - Git</option><option value="offseason-o2">O2 - WPILib</option>
        <option value="offseason-o3">O3 - Commands</option><option value="offseason-o4">O4 - Motors</option>
        <option value="offseason-o5">O5 - PID</option><option value="offseason-o6">O6 - Autonomous</option>
        <option value="offseason-o7">O7 - Subsystem</option><option value="offseason-o8">O8 - Build</option>
      </select>
      <button class="export-btn" onclick="exportCSV()">export CSV</button>
    </div>
    <div class="student-table-wrap">
      <div class="dash-loading" id="dash-loading">loading student data... :)</div>
      <table class="score-table" id="score-table" style="display:none">
        <thead id="table-head"></thead>
        <tbody id="table-body"></tbody>
      </table>
    </div>
  </div>

  <!-- ANSWERS -->
  <div class="tab-panel" id="tab-answers">
    <div class="filter-bar">
      <select class="filter-input" id="answer-student-select" onchange="loadAnswersForStudent()">
        <option value="">select a student...</option>
      </select>
      <select class="filter-input" id="answer-quiz-select" onchange="renderAnswerPanel()">
        <option value="">select a quiz/week...</option>
      </select>
    </div>
    <div id="answer-panel-wrap"></div>
  </div>

  <!-- USERS -->
  <div class="tab-panel" id="tab-users">
    <div class="dash-loading" id="users-loading">loading users...</div>
    <table class="score-table" id="users-table" style="display:none">
      <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th></th></tr></thead>
      <tbody id="users-body"></tbody>
    </table>
  </div>
</div>

<script>
/* Admin dashboard logic.
   Firebase is initialized once by auth.js (loaded in the footer). Rather than
   touch Firebase here — and race auth.js's initializeApp() — we wait for the
   `wrc-auth-ready` event auth.js fires once it knows the user + role, then pull
   data through the window._wrc* helpers it exposes. This script is a classic
   (non-module) script so it parses/executes before the deferred auth.js module,
   guaranteeing our listener is registered before the event fires. */

const WEEKS = [
  {id:'summer-w1',label:'W1'},{id:'summer-w2',label:'W2'},{id:'summer-w3',label:'W3'},{id:'summer-w4',label:'W4'},
  {id:'summer-w5',label:'W5'},{id:'summer-w6',label:'W6'},{id:'summer-w7',label:'W7'},{id:'summer-w8',label:'W8'},
  {id:'offseason-o1',label:'O1'},{id:'offseason-o2',label:'O2'},{id:'offseason-o3',label:'O3'},{id:'offseason-o4',label:'O4'},
  {id:'offseason-o5',label:'O5'},{id:'offseason-o6',label:'O6'},{id:'offseason-o7',label:'O7'},{id:'offseason-o8',label:'O8'},
];

let allStudents = [], allUsers = [];
let studentAnswers = {};
let dashBooted = false;

// ── BOOTSTRAP ────────────────────────────────────────────────
function bootDashboard(role) {
  if (dashBooted) return;
  // auth.js already redirects non-admin/leads users; guard here too.
  if (!['admin','leads'].includes(role)) return;
  dashBooted = true;
  loadData();
}

window.addEventListener('wrc-auth-ready', (e) => bootDashboard(e.detail && e.detail.role));
// In case auth.js resolved before this script attached its listener:
if (window._wrcRole) bootDashboard(window._wrcRole);

// Safety net: if Firebase is blocked/offline and auth never resolves, don't spin forever.
setTimeout(() => {
  if (!dashBooted) {
    const el = document.getElementById('dash-loading');
    if (el) el.textContent = 'could not verify your session — try refreshing or signing in again';
  }
}, 9000);

async function loadData() {
  try {
    allUsers    = (await window._wrcLoadAllUsers())         || [];
    allStudents = (await window._wrcLoadAllStudentScores()) || [];

    updateStats(); renderTable(allStudents); renderUsersTable(); populateAnswerStudentSelect();

    document.getElementById('dash-loading').style.display  = 'none';
    document.getElementById('score-table').style.display   = 'table';
    document.getElementById('users-loading').style.display = 'none';
    document.getElementById('users-table').style.display   = 'table';
  } catch (e) {
    console.error('dashboard: loadData failed', e);
    const el = document.getElementById('dash-loading');
    if (el) el.textContent = 'failed to load data — check your connection and Firestore permissions, then refresh';
  }
}

function updateStats() {
  let done=0, sumPct=0, n=0, perfect=0;
  allStudents.forEach(s => Object.values(s.weeks).forEach(w => {
    if (w.complete) { done++; sumPct+=w.pct; n++; if(w.pct===100) perfect++; }
  }));
  document.getElementById('stat-students').textContent  = allStudents.length;
  document.getElementById('stat-completed').textContent = done;
  document.getElementById('stat-avgpct').textContent    = n ? Math.round(sumPct/n)+'%' : 'N/A';
  document.getElementById('stat-perfect').textContent   = perfect;
}

function renderTable(students) {
  const fw = document.getElementById('filter-week').value;
  const wks = fw ? WEEKS.filter(w => w.id === fw) : WEEKS;
  document.getElementById('table-head').innerHTML =
    '<tr><th>name</th><th>email</th>' + wks.map(w=>`<th>${w.label}</th>`).join('') + '<th>avg</th><th></th></tr>';
  document.getElementById('table-body').innerHTML = students.map(s => {
    const cells = wks.map(w => {
      const sc = s.weeks[w.id];
      if (!sc?.complete) return `<td><span class="score-cell sc-none">–</span></td>`;
      const cls = sc.pct>=80?'sc-great':sc.pct>=60?'sc-ok':'sc-bad';
      return `<td><span class="score-cell ${cls}">${sc.pct}%</span></td>`;
    }).join('');
    const done = Object.values(s.weeks).filter(w=>w.complete);
    const avg  = done.length ? Math.round(done.reduce((a,w)=>a+w.pct,0)/done.length) : null;
    const avgCell = avg!==null ? `<td><strong>${avg}%</strong></td>` : `<td><span class="score-cell sc-none">–</span></td>`;
    return `<tr><td>${s.name}</td><td style="font-size:12px;color:#64748b">${s.email}</td>${cells}${avgCell}
      <td><button class="view-answers-btn" onclick="jumpToAnswers('${s.uid}')">answers</button></td></tr>`;
  }).join('');
}

window.filterTable = () => {
  const q = document.getElementById('search-students').value.toLowerCase();
  renderTable(allStudents.filter(s => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)));
};

function renderUsersTable() {
  document.getElementById('users-body').innerHTML = allUsers.map(u => `
    <tr>
      <td>${u.name||'—'}</td>
      <td style="font-size:12px;color:#64748b">${u.email||'—'}</td>
      <td><span class="score-cell ${u.role==='admin'?'sc-great':u.role==='leads'?'sc-ok':'sc-none'}">${u.role||'student'}</span></td>
      <td style="font-size:12px;color:#94a3b8">${u.createdAt?new Date(u.createdAt).toLocaleDateString():'—'}</td>
      <td>${u.email?`<a class="email-btn" href="mailto:${u.email}">email</a>`:'—'}</td>
    </tr>`).join('');
}

function populateAnswerStudentSelect() {
  const sel = document.getElementById('answer-student-select');
  allStudents.forEach(s => {
    const o = document.createElement('option');
    o.value = s.uid; o.textContent = `${s.name} (${s.email})`;
    sel.appendChild(o);
  });
}

window.jumpToAnswers = (uid) => {
  switchTab('answers');
  document.getElementById('answer-student-select').value = uid;
  loadAnswersForStudent();
};

window.loadAnswersForStudent = async () => {
  const uid = document.getElementById('answer-student-select').value;
  if (!uid) return;
  const qSel = document.getElementById('answer-quiz-select');
  qSel.innerHTML = '<option value="">select a quiz/week...</option>';
  document.getElementById('answer-panel-wrap').innerHTML = '<div class="dash-loading">loading...</div>';
  try {
    studentAnswers[uid] = (await window._wrcLoadStudentAnswers(uid)) || {};
    const quizIds = Object.keys(studentAnswers[uid]);
    if (quizIds.length === 0) {
      document.getElementById('answer-panel-wrap').innerHTML = '<div class="dash-loading">no quiz answers saved for this student yet — they need to complete quizzes on the site first</div>';
      return;
    }
    quizIds.forEach(id => {
      const o = document.createElement('option');
      o.value = id; o.textContent = id;
      qSel.appendChild(o);
    });
    qSel.value = quizIds[0];
    renderAnswerPanel();
  } catch(e) {
    document.getElementById('answer-panel-wrap').innerHTML = '<div class="dash-loading">error loading answers</div>';
  }
};

window.renderAnswerPanel = () => {
  const uid  = document.getElementById('answer-student-select').value;
  const qid  = document.getElementById('answer-quiz-select').value;
  const wrap = document.getElementById('answer-panel-wrap');
  if (!uid || !qid) { wrap.innerHTML = ''; return; }
  const data = studentAnswers[uid]?.[qid];
  if (!data) { wrap.innerHTML = '<div class="dash-loading">no data for this quiz</div>'; return; }

  const letters = ['A','B','C','D'];
  const qs = Object.keys(data).sort().map(k => ({key:k,...data[k]}));
  const rows = qs.map(q => {
    const opts = (q.options||[]).map((opt,i) => {
      let cls = '';
      if (i === q.correct && i !== q.selected) cls += ' answer-key';
      if (i === q.selected) cls += q.wasCorrect ? ' sel-correct' : ' sel-wrong';
      return `<span class="ar-opt${cls}">${i===q.selected?'→ ':''}${letters[i]}: ${opt}</span>`;
    }).join('');
    const res = q.wasCorrect
      ? '<span style="color:#166534;font-size:11px;font-weight:700">✓ correct</span>'
      : `<span style="color:#b91c1c;font-size:11px;font-weight:700">✗ wrong — correct was ${letters[q.correct]}</span>`;
    return `<div class="answer-row">
      <div class="ar-q">${q.question||q.key}</div>
      <div class="ar-opts">${opts}</div>
      <div class="ar-meta">${res} · ${q.ts ? new Date(q.ts).toLocaleString() : '—'}</div>
    </div>`;
  }).join('');

  const s = allStudents.find(x => x.uid===uid);
  const sc = s?.weeks[qid];
  wrap.innerHTML = `<div class="answer-panel">
    <div class="ap-header">
      <h3>📝 ${s?.name||uid} — ${qid}${sc?` <span style="font-size:12px;color:#94a3b8;font-weight:400">(${sc.pct}% — ${sc.score}/${sc.total})</span>`:''}</h3>
      ${s?.email?`<a class="email-btn" href="mailto:${s.email}">email student</a>`:''}
    </div>
    <div class="answer-list">${rows||'<div class="dash-loading">no per-question data recorded</div>'}</div>
  </div>`;
};

window.switchTab = (id) => {
  ['scores','answers','users'].forEach((n,i) => {
    document.querySelectorAll('.tab-btn')[i].classList.toggle('active', n===id);
    document.getElementById('tab-'+n).classList.toggle('active', n===id);
  });
};

window.exportCSV = () => {
  const esc = v => {
    const s = (v ?? '').toString();
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  const hdr = ['Name','Email',...WEEKS.map(w=>w.label),'Average'].map(esc).join(',');
  const rows = allStudents.map(s => {
    const scores = WEEKS.map(w => s.weeks[w.id]?.pct ?? '');
    const done = WEEKS.map(w=>s.weeks[w.id]).filter(w=>w?.complete);
    const avg  = done.length ? Math.round(done.reduce((a,w)=>a+w.pct,0)/done.length) : '';
    return [s.name, s.email, ...scores, avg].map(esc).join(',');
  });
  const blob = new Blob([[hdr,...rows].join('\n')], { type: 'text/csv;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'wrt-scores-'+new Date().toISOString().slice(0,10)+'.csv';
  a.click();
  URL.revokeObjectURL(url);
};
</script>