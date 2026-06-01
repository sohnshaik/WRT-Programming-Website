---
layout: default
title: Teacher Dashboard
permalink: /dashboard-teacher/
require_role: teacher
---

<style>
.dash-shell { max-width: 1100px; margin: 0 auto; padding: 2rem 2.5rem; }
.dash-hero {
  background: #1B2A4A; border-bottom: 4px solid #C41230;
  padding: 2rem 2.5rem; margin-bottom: 0;
}
.dash-hero h1 { font-size: 1.6rem; font-weight: 900; color: #fff; margin: 0 0 4px; }
.dash-hero p  { font-size: 14px; color: rgba(255,255,255,0.55); margin: 0; }

.dash-stats { display: flex; gap: 1rem; margin: 1.5rem 0; flex-wrap: wrap; }
.dstat {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 8px;
  padding: 1rem 1.25rem; min-width: 120px; flex: 1;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}
.dstat-num   { font-size: 1.8rem; font-weight: 900; color: #1B2A4A; line-height: 1; }
.dstat-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 3px; }

.filter-bar { display: flex; gap: 10px; margin-bottom: 1.25rem; flex-wrap: wrap; }
.filter-input {
  padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 6px;
  font-size: 13px; font-family: inherit; outline: none;
  transition: border-color 0.15s; color: #1e293b;
}
.filter-input:focus { border-color: #C41230; }

.student-table-wrap { overflow-x: auto; }
table.score-table {
  width: 100%; border-collapse: collapse; font-size: 13px;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 8px;
  overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}
.score-table thead { background: #1B2A4A; }
.score-table th {
  padding: 10px 14px; font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: rgba(255,255,255,0.7); text-align: left; white-space: nowrap;
}
.score-table td {
  padding: 9px 14px; border-bottom: 1px solid #f1f5f9;
  color: #475569; white-space: nowrap;
}
.score-table td:first-child { font-weight: 700; color: #1B2A4A; }
.score-table tr:last-child td { border-bottom: none; }
.score-table tr:hover td { background: #f8fafc; }

.score-cell {
  display: inline-block; padding: 2px 8px; border-radius: 4px;
  font-weight: 700; font-family: monospace; font-size: 12px;
}
.sc-great  { background: #f0fdf4; color: #166534; }
.sc-ok     { background: #fefce8; color: #854d0e; }
.sc-bad    { background: #fff1f2; color: #b91c1c; }
.sc-none   { background: #f1f5f9; color: #94a3b8; }

.export-btn {
  padding: 8px 16px; background: #1B2A4A; color: #fff;
  border: none; border-radius: 6px; font-size: 13px; font-weight: 700;
  cursor: pointer; font-family: inherit; transition: background 0.15s;
}
.export-btn:hover { background: #0f1c33; }

.dash-loading {
  text-align: center; padding: 3rem; color: #94a3b8; font-size: 14px;
}
</style>

<div class="dash-hero">
  <h1>teacher dashboard :)</h1>
  <p>all student scores in one place. you can also export to CSV for records!!</p>
</div>

<div class="dash-shell">

  <div class="dash-stats">
    <div class="dstat"><div class="dstat-num" id="stat-students">...</div><div class="dstat-label">students</div></div>
    <div class="dstat"><div class="dstat-num" id="stat-completed">...</div><div class="dstat-label">weeks completed (total)</div></div>
    <div class="dstat"><div class="dstat-num" id="stat-avgpct">...</div><div class="dstat-label">avg score</div></div>
    <div class="dstat"><div class="dstat-num" id="stat-perfect">...</div><div class="dstat-label">100% scores</div></div>
  </div>

  <div class="filter-bar">
    <input class="filter-input" type="text" id="search-students" placeholder="search by name or email..." oninput="filterTable()">
    <select class="filter-input" id="filter-week" onchange="filterTable()">
      <option value="">all weeks</option>
      <option value="summer-w1">W1 - The Basics</option>
      <option value="summer-w2">W2 - Logic &amp; Control Flow</option>
      <option value="summer-w3">W3 - Loops</option>
      <option value="summer-w4">W4 - Arrays &amp; Methods</option>
      <option value="summer-w5">W5 - OOP</option>
      <option value="summer-w6">W6 - Inheritance</option>
      <option value="summer-w7">W7 - Advanced Classes</option>
      <option value="summer-w8">W8 - Bridge Week</option>
      <option value="offseason-o1">O1 - Git &amp; GitHub</option>
      <option value="offseason-o2">O2 - WPILib Setup</option>
      <option value="offseason-o3">O3 - Command-Based</option>
      <option value="offseason-o4">O4 - Motors &amp; Sensors</option>
      <option value="offseason-o5">O5 - PID Control</option>
      <option value="offseason-o6">O6 - Autonomous</option>
      <option value="offseason-o7">O7 - Subsystem Ownership</option>
      <option value="offseason-o8">O8 - Build Season Prep</option>
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

<script type="module">
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDcqxHcEDsCkuZZhytuTqROycH71SOFtiE",
  authDomain: "wrt-programming.firebaseapp.com",
  projectId: "wrt-programming",
  storageBucket: "wrt-programming.firebasestorage.app",
  messagingSenderId: "241876848170",
  appId: "1:241876848170:web:c471b9407abd661d477d53"
};

const WEEKS = [
  { id:'summer-w1', label:'W1' },{ id:'summer-w2', label:'W2' },
  { id:'summer-w3', label:'W3' },{ id:'summer-w4', label:'W4' },
  { id:'summer-w5', label:'W5' },{ id:'summer-w6', label:'W6' },
  { id:'summer-w7', label:'W7' },{ id:'summer-w8', label:'W8' },
  { id:'offseason-o1', label:'O1' },{ id:'offseason-o2', label:'O2' },
  { id:'offseason-o3', label:'O3' },{ id:'offseason-o4', label:'O4' },
  { id:'offseason-o5', label:'O5' },{ id:'offseason-o6', label:'O6' },
  { id:'offseason-o7', label:'O7' },{ id:'offseason-o8', label:'O8' },
];

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

let allStudents = [];

onAuthStateChanged(auth, async (user) => {
  if (!user) { window.location.href = '/login/'; return; }
  const snap = await getDoc(doc(db, 'users', user.uid));
  const role = snap.exists() ? snap.data().role : 'student';
  if (role !== 'teacher' && role !== 'admin') { window.location.href = '/'; return; }

  await loadData();
});

async function loadData() {
  const usersSnap = await getDocs(collection(db, 'users'));
  allStudents = [];

  for (const uDoc of usersSnap.docs) {
    const u = uDoc.data();
    if (u.role !== 'student') continue;
    const scoresSnap = await getDocs(collection(db, 'scores', uDoc.id, 'weeks'));
    const weeks = {};
    scoresSnap.forEach(s => { weeks[s.id] = s.data(); });
    allStudents.push({ uid: uDoc.id, name: u.name || u.email, email: u.email, weeks });
  }

  updateStats();
  renderTable(allStudents);
  document.getElementById('dash-loading').style.display = 'none';
  document.getElementById('score-table').style.display = 'table';
}

function updateStats() {
  let totalCompleted = 0, totalPct = 0, pctCount = 0, perfect = 0;
  allStudents.forEach(s => {
    Object.values(s.weeks).forEach(w => {
      if (w.complete) {
        totalCompleted++;
        totalPct += w.pct;
        pctCount++;
        if (w.pct === 100) perfect++;
      }
    });
  });
  document.getElementById('stat-students').textContent   = allStudents.length;
  document.getElementById('stat-completed').textContent  = totalCompleted;
  document.getElementById('stat-avgpct').textContent     = pctCount ? Math.round(totalPct/pctCount) + '%' : 'N/A';
  document.getElementById('stat-perfect').textContent    = perfect;
}

function renderTable(students) {
  const filterWeek = document.getElementById('filter-week').value;
  const weeks = filterWeek ? WEEKS.filter(w => w.id === filterWeek) : WEEKS;

  const head = document.getElementById('table-head');
  head.innerHTML = '<tr><th>name</th><th>email</th>' + weeks.map(w => `<th>${w.label}</th>`).join('') + '<th>avg</th></tr>';

  const body = document.getElementById('table-body');
  body.innerHTML = students.map(s => {
    const cells = weeks.map(w => {
      const score = s.weeks[w.id];
      if (!score?.complete) return `<td><span class="score-cell sc-none">-</span></td>`;
      const cls = score.pct >= 80 ? 'sc-great' : score.pct >= 60 ? 'sc-ok' : 'sc-bad';
      return `<td><span class="score-cell ${cls}">${score.pct}%</span></td>`;
    }).join('');

    const completedWeeks = Object.values(s.weeks).filter(w => w.complete);
    const avg = completedWeeks.length ? Math.round(completedWeeks.reduce((a,w) => a+w.pct, 0) / completedWeeks.length) : null;
    const avgCell = avg !== null
      ? `<td><strong>${avg}%</strong></td>`
      : `<td><span class="score-cell sc-none">-</span></td>`;

    return `<tr><td>${s.name}</td><td style="font-size:12px;color:#64748b">${s.email}</td>${cells}${avgCell}</tr>`;
  }).join('');
}

window.filterTable = () => {
  const q = document.getElementById('search-students').value.toLowerCase();
  const filtered = allStudents.filter(s =>
    s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
  );
  renderTable(filtered);
};

window.exportCSV = () => {
  const weeks = WEEKS;
  const header = ['Name','Email',...weeks.map(w=>w.label),'Average'].join(',');
  const rows = allStudents.map(s => {
    const scores = weeks.map(w => s.weeks[w.id]?.pct ?? '');
    const completed = weeks.map(w => s.weeks[w.id]).filter(w => w?.complete);
    const avg = completed.length ? Math.round(completed.reduce((a,w)=>a+w.pct,0)/completed.length) : '';
    return [s.name, s.email, ...scores, avg].join(',');
  });
  const csv = [header, ...rows].join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv,' + encodeURIComponent(csv);
  a.download = 'wrt-scores-' + new Date().toISOString().slice(0,10) + '.csv';
  a.click();
};
</script>
