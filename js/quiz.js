// ── QUIZ ENGINE ──────────────────────────────────────────────
class Quiz {
  constructor(containerId, questions) {
    this.container = document.getElementById(containerId);
    this.questions = questions;
    this.current = 0;
    this.score = 0;
    this.answered = new Array(questions.length).fill(false);
    this.render();
  }

  render() {
    if (!this.container) return;
    const q = this.questions[this.current];
    const letters = ['A','B','C','D'];
    this.container.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-header">
          <span class="quiz-title">⬡ Knowledge Check</span>
          <span class="quiz-progress">${this.current + 1} / ${this.questions.length}</span>
        </div>
        <div class="quiz-body">
          <div class="progress-track" style="margin-bottom:1.25rem">
            <div class="progress-fill" style="width:${((this.current)/this.questions.length)*100}%"></div>
          </div>
          <div class="quiz-question">${q.question}</div>
          <div class="quiz-options" id="options-${this.current}">
            ${q.options.map((opt, i) => `
              <button class="quiz-option" onclick="quiz_${containerId}.select(${i})" id="opt-${i}">
                <span class="option-letter">${letters[i]}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
          <div class="quiz-feedback" id="feedback-${this.current}"></div>
          <div class="quiz-controls">
            <span class="quiz-score">Score: ${this.score}/${this.questions.length}</span>
            <button class="btn btn-outline btn-sm" id="next-btn" onclick="quiz_${containerId}.next()" disabled>
              ${this.current < this.questions.length - 1 ? 'Next →' : 'See Results →'}
            </button>
          </div>
        </div>
      </div>
      <div class="score-card" id="score-card-${containerId}"></div>
    `;
  }

  select(idx) {
    if (this.answered[this.current]) return;
    this.answered[this.current] = true;
    const q = this.questions[this.current];
    const opts = this.container.querySelectorAll('.quiz-option');
    opts.forEach(o => o.disabled = true);
    const correct = q.correct;
    const isRight = idx === correct;
    if (isRight) this.score++;
    opts[idx].classList.add(isRight ? 'correct' : 'wrong');
    if (!isRight) opts[correct].classList.add('correct');
    const fb = document.getElementById(`feedback-${this.current}`);
    fb.classList.add('show', isRight ? 'correct-fb' : 'wrong-fb');
    fb.innerHTML = isRight
      ? `<strong>Correct!</strong> ${q.explanation}`
      : `<strong>Not quite.</strong> ${q.explanation}`;
    document.getElementById('next-btn').disabled = false;
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
    const pct = Math.round((this.score / this.questions.length) * 100);
    let msg = pct === 100 ? "Perfect score. You crushed it." :
              pct >= 80 ? "Solid work. One more pass and you'll have it locked." :
              pct >= 60 ? "Getting there. Review the sections you missed." :
              "Go back through the material and try again — no shame in it.";
    this.container.querySelector('.quiz-container').style.display = 'none';
    const sc = document.getElementById(`score-card-${this.container.id}`);
    sc.classList.add('show');
    sc.innerHTML = `
      <div class="score-num">${pct}%</div>
      <div class="score-label">${this.score} / ${this.questions.length} correct</div>
      <div class="score-msg">${msg}</div>
      <button class="btn btn-outline" onclick="quiz_${this.container.id}.reset()">Try Again</button>
    `;
  }

  reset() {
    this.current = 0;
    this.score = 0;
    this.answered = new Array(this.questions.length).fill(false);
    this.render();
  }
}

// ── FILL-IN-THE-BLANK ENGINE ────────────────────────────────
function checkFills(containerId) {
  const container = document.getElementById(containerId);
  const inputs = container.querySelectorAll('.fill-blank');
  let correct = 0;
  inputs.forEach(input => {
    input.classList.remove('correct-blank','wrong-blank');
    const userVal = input.value.trim().toLowerCase().replace(/\s+/g,'');
    const answers = input.dataset.answer.split('|').map(a => a.trim().toLowerCase().replace(/\s+/g,''));
    if (answers.includes(userVal)) {
      input.classList.add('correct-blank');
      correct++;
    } else {
      input.classList.add('wrong-blank');
    }
  });
  const fb = document.getElementById(containerId + '-result');
  if (fb) {
    fb.textContent = `${correct}/${inputs.length} correct`;
    fb.style.color = correct === inputs.length ? 'var(--green)' : 'var(--amber)';
    fb.style.display = 'block';
  }
}

// ── CODE COPY ────────────────────────────────────────────────
function copyCode(btn) {
  const pre = btn.closest('.code-block').querySelector('pre');
  const text = pre.innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'copied!';
    setTimeout(() => btn.textContent = 'copy', 1500);
  });
}

// ── SIDEBAR MOBILE TOGGLE ────────────────────────────────────
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
}

// ── ACTIVE NAV LINK ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') && path.endsWith(link.getAttribute('href').replace('./',''))) {
      link.classList.add('active');
    }
  });
});

// ── PROGRESS TRACKING (localStorage) ────────────────────────
function markComplete(pageId) {
  const completed = JSON.parse(localStorage.getItem('wrc-progress') || '{}');
  completed[pageId] = true;
  localStorage.setItem('wrc-progress', JSON.stringify(completed));
  const btn = document.getElementById('complete-btn');
  if (btn) { btn.textContent = '✓ Completed'; btn.disabled = true; btn.style.opacity = '0.6'; }
}

function loadProgress() {
  const completed = JSON.parse(localStorage.getItem('wrc-progress') || '{}');
  document.querySelectorAll('[data-page-id]').forEach(el => {
    if (completed[el.dataset.pageId]) {
      el.innerHTML = '✓ ' + el.innerHTML;
      el.style.color = 'var(--green)';
    }
  });
  return completed;
}
