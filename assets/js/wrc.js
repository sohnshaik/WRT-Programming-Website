// ── WRT PROGRAMMING — COURSE JS ──────────────────────────────
// Quiz engine, fill-in-the-blank, progress tracking, sidebar.

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
    const p = this.getProgress();
    p[pageId] = {
      complete: true,
      score, total,
      pct: total > 0 ? Math.round((score / total) * 100) : 100,
      date: new Date().toISOString()
    };
    this.saveProgress(p);
    this.updateSidebar();
  },
  getScore(pageId) {
    return this.getProgress()[pageId] || null;
  },
  totalComplete() {
    return Object.values(this.getProgress()).filter(v => v.complete).length;
  },

  // Update sidebar progress bar + checkmarks
  updateSidebar() {
    const p    = this.getProgress();
    const total = 16;
    const done  = this.totalComplete();
    const pct   = Math.round((done / total) * 100);

    const fill  = document.querySelector('.sp-fill');
    const label = document.querySelector('.sp-pct-text');
    if (fill)  fill.style.width = pct + '%';
    if (label) label.textContent = pct + '%';

    document.querySelectorAll('.nav-item[data-page]').forEach(el => {
      const s = p[el.dataset.page];
      if (s?.complete) {
        el.classList.add('completed');
        const chk = el.querySelector('.ni-check');
        if (chk) chk.textContent = '✓';
      }
    });

    const statsEl = document.getElementById('dash-completed');
    if (statsEl) statsEl.textContent = done;
  },

  // Update dashboard module items with saved scores
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

  // Show score if already completed (page re-visit)
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

    this.el.innerHTML = `
      <div class="quiz-wrap" id="qwrap-${cid}">
        <div class="quiz-head">
          <span class="qh-title">Knowledge Check</span>
          <span class="qh-progress">${this.current + 1} / ${this.questions.length}</span>
        </div>
        <div class="quiz-progress-bar">
          <div class="qpb-fill" style="width:${pct}%"></div>
        </div>
        <div class="quiz-body">
          <div class="quiz-q">${q.question}</div>
          <div class="quiz-options">
            ${q.options.map((opt, i) => `
              <button class="quiz-option" data-idx="${i}"
                onclick="window._quiz_${cid}.select(${i})">
                <span class="opt-letter">${letters[i]}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
          <div class="quiz-feedback" id="qfb-${cid}"></div>
          <div class="quiz-controls">
            <span class="quiz-score">Score: ${this.score} / ${this.questions.length}</span>
            <button class="btn btn-navy btn-sm" id="qnext-${cid}"
              onclick="window._quiz_${cid}.next()" disabled>
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

    if (this.pageId) WRC.markComplete(this.pageId, this.score, this.questions.length);

    const wrap = document.getElementById(`qwrap-${cid}`);
    if (wrap) wrap.style.display = 'none';

    const sc = document.getElementById(`sc-${cid}`);
    sc.classList.add('show');

    const circumference = 2 * Math.PI * 55;
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
      ${this.pageId ? '<div class="sc-saved">✓ Score saved to your progress</div>' : ''}
      <button class="btn btn-outline" onclick="window._quiz_${cid}.reset()">↺ Try Again</button>
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
    // fallback for older browsers
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

// Close sidebar on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSidebar();
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

  // Init
  WRC.updateSidebar();
  WRC.loadModuleScores();

  // Show complete banner if already done
  const pageId = document.body.dataset.pageId;
  if (pageId) WRC.maybeShowBanner(pageId);
});
