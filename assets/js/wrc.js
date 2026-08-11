// ── WRT PROGRAMMING — COURSE JS ──────────────────────────────
// Quiz engine, fill-in-the-blank, progress tracking, sidebar,
// dark mode, and answer tracking.

// ── DARK MODE ────────────────────────────────────────────────
(function() {
  try {
    const saved = localStorage.getItem('wrc-dark');
    document.documentElement.setAttribute('data-theme', saved === '0' ? 'light' : 'dark');
  } catch {}
})();

function toggleDark() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  try { localStorage.setItem('wrc-dark', isDark ? '0' : '1'); } catch {}
}

// ── PROGRESS & SCORE STORAGE ─────────────────────────────────
const WRC = {
  KEY: 'wrc-progress-v2',

  getProgress() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '{}'); }
    catch { return {}; }
  },
  saveProgress(data) {
    try { localStorage.setItem(this.KEY, JSON.stringify(data)); }
    catch (e) { console.warn('WRC: localStorage unavailable', e); }
  },
  markComplete(pageId, score, total) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 100;
    const p = this.getProgress();
    p[pageId] = { complete: true, score, total, pct, date: new Date().toISOString() };
    this.saveProgress(p);
    this.updateSidebar();

    const uid = localStorage.getItem('wrc-uid');
    if (uid && typeof window._wrcSaveToFirestore === 'function') {
      window._wrcSaveToFirestore(uid, pageId, score, total, pct);
    }
  },
  getScore(pageId) {
    return this.getProgress()[pageId] || null;
  },
  totalComplete() {
    // Count distinct weeks via sidebar items — prevents double-counting
    // when both a topic quiz (summer-w7) and weekly test (summer-w7-test) exist
    const p = this.getProgress();
    const pages = document.querySelectorAll('.nav-item[data-page]');
    let done = 0;
    pages.forEach(el => {
      const key = el.dataset.page;
      if (p[key]?.complete || p[key + '-test']?.complete) done++;
    });
    return done;
  },

  updateSidebar() {
    const p    = this.getProgress();
    const pages = document.querySelectorAll('.nav-item[data-page]');
    const total = pages.length || 16;
    const done  = this.totalComplete();
    const pct   = Math.round((done / total) * 100);

    const fill  = document.querySelector('.sp-fill');
    const label = document.querySelector('.sp-pct-text');
    if (fill)  fill.style.transform = 'scaleX(' + (pct / 100) + ')';
    if (label) label.textContent = pct + '%';

    pages.forEach(el => {
      const key = el.dataset.page;
      const s = p[key] || p[key + '-test'];
      if (s?.complete) {
        el.classList.add('completed');
        const chk = el.querySelector('.ni-check');
        if (chk) chk.textContent = '✓';
      }
    });

    const statsEl = document.getElementById('dash-completed');
    if (statsEl) statsEl.textContent = done;
  },

  loadModuleScores() {
    const p = this.getProgress();
    document.querySelectorAll('.module-item[data-page]').forEach(el => {
      const s = p[el.dataset.page];
      if (!s?.complete) return;

      el.classList.add('completed');
      const num = el.querySelector('.mi-num');
      if (num) num.style.background = '#00875A';

      const scoreEl  = el.querySelector('.mi-score');
      const statusEl = el.querySelector('.mi-status');
      if (scoreEl && s.total > 0) {
        scoreEl.textContent = s.pct + '%';
        scoreEl.classList.add('has-score');
      }
      if (statusEl) {
        statusEl.textContent = 'Complete';
        statusEl.className   = 'mi-status status-done';
      }
    });
  },

  loadDashboardCards() {
    const p = this.getProgress();
    const cards = document.querySelectorAll('.cdwc[data-page]');
    if (!cards.length) return;

    let firstIncomplete = null;

    cards.forEach(card => {
      const pageId = card.dataset.page;
      const s = p[pageId];
      const statusText = card.querySelector('.cdwc-status-text');

      if (s?.complete) {
        card.classList.add('cdwc--completed');
        if (statusText) statusText.textContent = 'Completed';
      } else if (!firstIncomplete) {
        firstIncomplete = { card, statusText };
      }
    });

    const continueBtn = document.getElementById('dash-continue-btn');
    if (firstIncomplete) {
      firstIncomplete.card.classList.add('cdwc--active');
      if (firstIncomplete.statusText) firstIncomplete.statusText.textContent = 'Up next';
      if (continueBtn) {
        const href = firstIncomplete.card.getAttribute('href');
        if (href) continueBtn.setAttribute('href', href);
        const hasProgress = Object.values(p).some(v => v.complete);
        continueBtn.textContent = hasProgress ? 'Continue \u2192' : 'Start learning \u2192';
      }
    } else if (Object.keys(p).length > 0 && continueBtn) {
      continueBtn.textContent = 'All done! \uD83C\uDF89';
    }
  },

  maybeShowBanner(pageId) {
    const s = this.getScore(pageId);
    const banner = document.getElementById('complete-banner');
    if (s?.complete && banner) banner.style.display = 'flex';
  }
};

// ── QUIZ ENGINE ──────────────────────────────────────────────
class Quiz {
  constructor(containerId, questions, pageId) {
    this.containerId = containerId;
    this.el          = document.getElementById(containerId);
    this.questions   = questions;
    this.pageId      = pageId;
    this.current     = 0;
    this.score       = 0;
    this.answered    = new Array(questions.length).fill(false);
    if (this.el) {
      window[`_quiz_${containerId}`] = this;
      this.render();
    }
  }

  render() {
    const q       = this.questions[this.current];
    const letters = ['A', 'B', 'C', 'D'];
    const pct     = Math.round((this.current / this.questions.length) * 100);
    const cid     = this.containerId;
    // Admin hint: highlights the correct option for leads reviewing questions.
    // Note: answers are also visible in page source — this quiz is a learning
    // check, not a verified exam. See item 28 in the design audit.
    const isAdmin = ['admin', 'leads', 'teacher'].includes(window._wrcRole);

    this.el.innerHTML = `
      <div class="quiz-wrap" id="qwrap-${cid}">
        <div class="quiz-head">
          <span class="qh-title">Knowledge Check</span>
          <span class="qh-progress">${this.current + 1} / ${this.questions.length}</span>
        </div>
        <div class="quiz-progress-bar">
          <div class="qpb-fill" style="transform:scaleX(${pct / 100})"></div>
        </div>
        <div class="quiz-body">
          <div class="quiz-q">${q.question}</div>
          <div class="quiz-options">
            ${q.options.map((opt, i) => `
              <button class="quiz-option${isAdmin && i === q.correct ? ' admin-correct-hint' : ''}" data-idx="${i}"
                onclick="window['_quiz_${cid}'].select(${i})">
                <span class="opt-letter">${letters[i]}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
          <div class="quiz-feedback" id="qfb-${cid}"></div>
          <div class="quiz-controls">
            <button class="btn btn-navy btn-sm" id="qnext-${cid}"
              onclick="window['_quiz_${cid}'].next()" disabled>
              ${this.current < this.questions.length - 1 ? 'Next Question →' : 'See Results →'}
            </button>
          </div>
        </div>
      </div>
      <div class="score-card" id="sc-${cid}"></div>
    `;
  }

  select(idx) {
    if (this.answered[this.current]) return;
    this.answered[this.current] = true;

    const q    = this.questions[this.current];
    const opts = this.el.querySelectorAll('.quiz-option');
    opts.forEach(o => o.disabled = true);

    const isRight = idx === q.correct;
    if (isRight) this.score++;

    opts[idx].classList.add(isRight ? 'correct' : 'wrong');
    if (!isRight) opts[q.correct].classList.add('correct');

    const fb = document.getElementById(`qfb-${this.containerId}`);
    fb.classList.add('show', isRight ? 'fb-correct' : 'fb-wrong');
    fb.innerHTML = isRight
      ? `<strong>✓ Correct!</strong> ${q.explanation}`
      : `<strong>✗ Not quite.</strong> ${q.explanation}`;

    document.getElementById(`qnext-${this.containerId}`).disabled = false;

    // Save per-question answer for admin review
    // Use containerId as the doc key so multiple quizzes on the same page
    // don't overwrite each other (e.g. quiz-w7-t1, quiz-w7-t2, quiz-w7)
    if (this.pageId && typeof window._wrcSaveAnswer === 'function') {
      window._wrcSaveAnswer(this.containerId, this.current, {
        question:  q.question,
        selected:  idx,
        correct:   q.correct,
        wasCorrect: isRight,
        options:   q.options
      });
    }
  }

  next() {
    if (this.current < this.questions.length - 1) {
      this.current++;
      this.render();
    } else {
      this.showResults();
    }
  }

  showResults() {
    const pct   = Math.round((this.score / this.questions.length) * 100);
    const msg   = pct === 100 ? 'Perfect score. 🎯'
                : pct >= 80  ? 'Solid work. Review the ones you missed.'
                : pct >= 60  ? 'Getting there — go back through the material.'
                :              'Read the week again carefully, then retry.';
    const color = pct >= 80 ? '#00875A' : pct >= 60 ? '#b45309' : '#C41230';
    const cid   = this.containerId;

    // First-attempt-only scoring: only record if no prior score exists for this page.
    // Retakes are allowed for learning, but only the first attempt counts toward progress.
    const existingScore = this.pageId ? WRC.getScore(this.pageId) : null;
    const isFirstAttempt = !existingScore?.complete;
    if (this.pageId && isFirstAttempt) WRC.markComplete(this.pageId, this.score, this.questions.length);

    const wrap = document.getElementById(`qwrap-${cid}`);
    if (wrap) wrap.style.display = 'none';

    const sc = document.getElementById(`sc-${cid}`);
    sc.classList.add('show');

    const circumference = 2 * Math.PI * 55;
    const savedNote = this.pageId
      ? (isFirstAttempt
          ? '<div class="sc-saved">✓ first attempt saved to your progress</div>'
          : `<div class="sc-saved">↺ retake — first attempt was ${existingScore.score}/${existingScore.total} (${existingScore.pct}%)</div>`)
      : '';

    sc.innerHTML = `
      <div class="sc-ring" style="border:8px solid ${color}20">
        <svg style="position:absolute;top:-8px;left:-8px;width:126px;height:126px"
             viewBox="0 0 126 126">
          <circle cx="63" cy="63" r="55" fill="none"
            stroke="${color}" stroke-width="8"
            stroke-dasharray="${(circumference * pct / 100).toFixed(1)} 9999"
            stroke-linecap="round"
            transform="rotate(-90 63 63)"
            style="transition:stroke-dasharray 0.6s ease"/>
        </svg>
        <span class="sc-pct">${pct}%</span>
        <span class="sc-pct-label">score</span>
      </div>
      <div class="sc-score">${this.score} of ${this.questions.length} correct</div>
      <div class="sc-msg">${msg}</div>
      ${savedNote}
      <button class="btn btn-outline" onclick="window['_quiz_${cid}'].reset()">↺ Try Again</button>
    `;

    const banner = document.getElementById('complete-banner');
    if (banner && pct >= 70) banner.style.display = 'flex';
  }

  reset() {
    this.current  = 0;
    this.score    = 0;
    this.answered = new Array(this.questions.length).fill(false);
    this.render();
  }
}

// ── FILL-IN-THE-BLANK ────────────────────────────────────────
function checkFills(id) {
  const container = document.getElementById(id);
  if (!container) return;
  let correct = 0;
  const inputs = container.querySelectorAll('.fill-blank');
  inputs.forEach(inp => {
    inp.classList.remove('correct-blank', 'wrong-blank');
    const val     = inp.value.trim().toLowerCase().replace(/\s+/g, '');
    const answers = inp.dataset.answer.split('|')
      .map(a => a.trim().toLowerCase().replace(/\s+/g, ''));
    if (answers.includes(val)) { inp.classList.add('correct-blank'); correct++; }
    else inp.classList.add('wrong-blank');
  });
  const res = document.getElementById(id + '-result');
  if (res) {
    res.textContent = correct === inputs.length
      ? `✓ All ${inputs.length} correct!`
      : `${correct} / ${inputs.length} correct`;
    res.style.color = correct === inputs.length ? '#00875A' : '#b45309';
    res.style.display = 'inline';
  }
}

// ── CODE COPY ────────────────────────────────────────────────
function copyCode(btn) {
  const pre = btn.closest('.code-block')?.querySelector('pre')
           || btn.closest('figure.highlight')?.querySelector('pre');
  if (!pre) return;
  navigator.clipboard.writeText(pre.innerText).then(() => {
    const orig = btn.textContent;
    btn.textContent = 'copied ✓';
    setTimeout(() => btn.textContent = orig, 1800);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = pre.innerText;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = 'copied ✓';
    setTimeout(() => btn.textContent = 'copy', 1800);
  });
}

// ── SOLUTION TOGGLE ──────────────────────────────────────────
function showSolution(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const isHidden = el.style.display === 'none' || !el.style.display;
  el.style.display = isHidden ? 'block' : 'none';
}

// ── SIDEBAR ──────────────────────────────────────────────────
function toggleSidebar() {
  const sb       = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (!sb) return;
  const isOpen = sb.classList.toggle('open');
  if (backdrop) backdrop.classList.toggle('show', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeSidebar() {
  const sb       = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (sb) sb.classList.remove('open');
  if (backdrop) backdrop.classList.remove('show');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeSidebar(); closeSearch(); }
});

// ── NAV GROUP COLLAPSE ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-group-label').forEach(label => {
    label.addEventListener('click', () => {
      label.classList.toggle('collapsed');
      const items = label.nextElementSibling;
      if (items) {
        items.style.display = label.classList.contains('collapsed') ? 'none' : '';
      }
    });
  });

  WRC.updateSidebar();
  WRC.loadModuleScores();
  WRC.loadDashboardCards();

  const pageId = document.body.dataset.pageId;
  if (pageId) WRC.maybeShowBanner(pageId);

  // Platform-aware keyboard shortcut label (Windows/Linux → Ctrl+K, Mac → ⌘K)
  const kbdEl = document.getElementById('search-kbd');
  if (kbdEl && !/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) {
    kbdEl.textContent = 'Ctrl+K';
  }
});

// ── SIDEBAR COLLAPSE (DESKTOP) ────────────────────────────────
function toggleSidebarWidth() {
  const sb     = document.getElementById('sidebar');
  const main   = document.getElementById('main-content');
  const footer = document.querySelector('.site-footer');
  const btn    = document.getElementById('sidebar-collapse-btn');
  if (!sb) return;
  const isCollapsed = sb.classList.toggle('collapsed');
  if (main)   main.classList.toggle('sidebar-collapsed', isCollapsed);
  if (footer) footer.classList.toggle('sidebar-collapsed', isCollapsed);
  if (btn)    btn.textContent = isCollapsed ? '›' : '‹';
  try { localStorage.setItem('wrc-sidebar-collapsed', isCollapsed ? '1' : '0'); } catch {}
}

// Restore collapse state on load
document.addEventListener('DOMContentLoaded', () => {
  try {
    const collapsed = localStorage.getItem('wrc-sidebar-collapsed') === '1';
    if (collapsed) {
      const sb     = document.getElementById('sidebar');
      const main   = document.getElementById('main-content');
      const footer = document.querySelector('.site-footer');
      const btn    = document.getElementById('sidebar-collapse-btn');
      if (sb) sb.classList.add('collapsed');
      if (main) main.classList.add('sidebar-collapsed');
      if (footer) footer.classList.add('sidebar-collapsed');
      if (btn) btn.textContent = '›';
    }
  } catch {}
});

// ── SEARCH ────────────────────────────────────────────────────
const SEARCH_INDEX = [
  { id:'summer-w1', badge:'W1', title:'The Basics', sub:'Variables, data types, casting, operators, scope, readability, constants, String methods', url:'/weeks/summer/week1' },
  { id:'summer-w2', badge:'W2', title:'Logic & Control Flow', sub:'Booleans, if/else, switch, logical operators, &&, ||, !', url:'/weeks/summer/week2' },
  { id:'summer-w3', badge:'W3', title:'Loops', sub:'For loops, foreach, while loop ban, FRC 20ms cycle, watchdog, infinite loops', url:'/weeks/summer/week3' },
  { id:'summer-w4', badge:'W4', title:'Arrays & Methods', sub:'Arrays, ArrayLists, method signatures, parameters, return types, Javadocs, void', url:'/weeks/summer/week4' },
  { id:'summer-w5', badge:'W5', title:'OOP — Classes & Objects', sub:'Classes, objects, constructors, encapsulation, private, getters, setters, this keyword', url:'/weeks/summer/week5' },
  { id:'summer-w6', badge:'W6', title:'Inheritance & Polymorphism', sub:'extends, super, Override, abstract classes, interfaces, implements, SubsystemBase, Command', url:'/weeks/summer/week6' },
  { id:'summer-w7', badge:'W7', title:'Advanced Classes', sub:'Enums, enum switch, ArrayList, wrapper classes, Integer, Double, autoboxing', url:'/weeks/summer/week7' },
  { id:'summer-w8', badge:'W8', title:'Recap & Resources', sub:'Java recap, FRC prep, command-based preview, WPILib resources, study checklist, what comes next', url:'/weeks/summer/week8' },
  { id:'offseason-o1', badge:'O1', title:'Git & GitHub', sub:'Branches, pull requests, commits, branch naming, feature branches, conflict resolution', url:'/weeks/offseason/os-week1' },
  { id:'offseason-o2', badge:'O2', title:'WPILib Setup', sub:'Install WPILib, VS Code, RobotContainer, Constants.java, project structure, simulation', url:'/weeks/offseason/os-week2' },
  { id:'offseason-o3', badge:'O3', title:'Command-Based Architecture', sub:'Subsystems, Commands, Scheduler, Triggers, addRequirements, execute, isFinished, sequence, parallel, TalonFX, Phoenix 6', url:'/weeks/offseason/os-week3' },
  { id:'offseason-o4', badge:'O4', title:'Motors & Sensors', sub:'TalonFX, stator current detection, Debouncer, CANcoder, Pigeon 2, SmartDashboard, VelocityTorqueCurrentFOC, MotionMagic', url:'/weeks/offseason/os-week4' },
  { id:'offseason-o5', badge:'O5', title:'PID Control', sub:'Proportional, Integral, Derivative, kP kI kD, PIDController, setpoint, feedforward, tuning, oscillation', url:'/weeks/offseason/os-week5' },
  { id:'offseason-o6', badge:'O6', title:'Autonomous & Choreo', sub:'Auto routines, sequence, WaitCommand, Choreo, odometry, field coordinates, auto chooser', url:'/weeks/offseason/os-week6' },
  { id:'offseason-o7', badge:'O7', title:'Subsystem Ownership', sub:'Code reading, Javadoc, @param, @return, magic numbers, Constants, capstone, PR review', url:'/weeks/offseason/os-week7' },
  { id:'offseason-o8', badge:'O8', title:'Build Season Prep', sub:'SCRUM, sprint planning, standup, backlog, code freeze, AdvantageKit, logging, GitHub Issues', url:'/weeks/offseason/os-week8' },
];

function openSearch() {
  const overlay = document.getElementById('search-overlay');
  if (!overlay) return;
  overlay.classList.add('open');
  setTimeout(() => {
    const input = document.getElementById('search-input');
    if (input) { input.value = ''; input.focus(); }
    renderSearchResults('');
  }, 50);
}

function closeSearch() {
  const overlay = document.getElementById('search-overlay');
  if (overlay) overlay.classList.remove('open');
}

// Focus trap for search modal — keeps Tab/Shift+Tab inside the modal
document.addEventListener('keydown', e => {
  const overlay = document.getElementById('search-overlay');
  if (!overlay?.classList.contains('open') || e.key !== 'Tab') return;
  const modal = overlay.querySelector('.search-modal');
  if (!modal) return;
  const focusable = Array.from(modal.querySelectorAll('button, input, a[href], [tabindex]:not([tabindex="-1"])')).filter(el => !el.disabled);
  if (!focusable.length) return;
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

function searchTopics(query) {
  renderSearchResults(query.trim().toLowerCase());
}

function renderSearchResults(q) {
  const container = document.getElementById('search-results');
  if (!container) return;

  const matches = q.length === 0
    ? SEARCH_INDEX
    : SEARCH_INDEX.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.sub.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q)
      );

  if (matches.length === 0) {
    container.innerHTML = `<div class="sm-empty">No results for "<strong>${q}</strong>"</div>`;
    return;
  }

  container.innerHTML = matches.map(item => `
    <a class="sm-result" href="${item.url}" onclick="closeSearch()">
      <span class="sr-badge">${item.badge}</span>
      <div class="sr-body">
        <div class="sr-title">${item.title}</div>
        <div class="sr-sub">${item.sub.split(',').slice(0,4).join(' · ')}</div>
      </div>
      <span class="sr-arrow">→</span>
    </a>
  `).join('');
}

document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    const overlay = document.getElementById('search-overlay');
    if (overlay?.classList.contains('open')) closeSearch();
    else openSearch();
  }
});

// ── CODE INPUT EDITOR BEHAVIOUR ───────────────────────────────
// Tab = 4 spaces, Enter = auto-indent, } = auto-dedent
document.addEventListener('keydown', e => {
  const ta = e.target;
  if (!ta.classList.contains('code-input')) return;

  const INDENT = '    '; // 4 spaces

  if (e.key === 'Tab') {
    e.preventDefault();
    const s = ta.selectionStart, en = ta.selectionEnd;
    if (s === en) {
      // No selection — insert 4 spaces at cursor
      ta.value = ta.value.slice(0, s) + INDENT + ta.value.slice(en);
      ta.selectionStart = ta.selectionEnd = s + 4;
    } else {
      // Selection — indent every selected line
      const lines = ta.value.split('\n');
      let charCount = 0, firstLine = -1, lastLine = -1;
      for (let i = 0; i < lines.length; i++) {
        if (charCount <= s && firstLine === -1) firstLine = i;
        if (charCount <= en - 1) lastLine = i;
        charCount += lines[i].length + 1;
      }
      for (let i = firstLine; i <= lastLine; i++) lines[i] = INDENT + lines[i];
      ta.value = lines.join('\n');
      ta.selectionStart = s + 4;
      ta.selectionEnd = en + 4 * (lastLine - firstLine + 1);
    }

  } else if (e.key === 'Enter') {
    e.preventDefault();
    const s = ta.selectionStart;
    const textBefore = ta.value.slice(0, s);
    const currentLine = textBefore.split('\n').pop();
    // Match indentation of current line
    const indentMatch = currentLine.match(/^(\s*)/);
    let indent = indentMatch ? indentMatch[1] : '';
    // Extra indent after opening brace
    if (currentLine.trimEnd().endsWith('{')) indent += INDENT;
    ta.value = ta.value.slice(0, s) + '\n' + indent + ta.value.slice(ta.selectionEnd);
    ta.selectionStart = ta.selectionEnd = s + 1 + indent.length;

  } else if (e.key === '}') {
    e.preventDefault();
    const s = ta.selectionStart;
    const textBefore = ta.value.slice(0, s);
    const currentLine = textBefore.split('\n').pop();
    // De-indent by one level if the line is only whitespace so far
    let insert = '}';
    if (/^\s+$/.test(currentLine) && currentLine.length >= 4) {
      // Remove one indent level from the current line
      const lineStart = s - currentLine.length;
      ta.value = ta.value.slice(0, lineStart) + currentLine.slice(4) + '}' + ta.value.slice(s);
      ta.selectionStart = ta.selectionEnd = s - 4 + 1;
    } else {
      ta.value = ta.value.slice(0, s) + '}' + ta.value.slice(ta.selectionEnd);
      ta.selectionStart = ta.selectionEnd = s + 1;
    }
  }
});
