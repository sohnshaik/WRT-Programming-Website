---
layout: week
title: "Git & GitHub"
subtitle: "Branches, pull requests, commit messages, and the 2974 team workflow."
badge: "Offseason · Week 1 of 8"
phase: offseason
phase_label: Offseason
week_label: Week O1
page_id: offseason-o1
prev_url: /weeks/summer/week8
prev_title: "Week 8 — Bridge: XRP & WPILib"
next_url: /weeks/offseason/os-week2
next_title: "O2 — WPILib Setup"
---

<div class="callout danger"><p><strong>This comes before WPILib.</strong> A programmer who can't use Git can't safely contribute to the team codebase during build season. Learn this first, use it every session.</p></div>

<h2 class="sh">Core Concepts</h2>
<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Repository</div><div class="cc-title">The project + its history</div><div class="cc-desc">Every commit ever made, every branch, every file. Lives on GitHub and on your laptop.</div></div>
  <div class="concept-card"><div class="cc-label">Commit</div><div class="cc-title">A saved snapshot</div><div class="cc-desc">A point-in-time capture of your files with a message explaining what changed. The unit of work in Git.</div></div>
  <div class="concept-card"><div class="cc-label">Branch</div><div class="cc-title">A parallel line of work</div><div class="cc-desc">Work on a feature in isolation without breaking main. When done, merge it back via a PR.</div></div>
  <div class="concept-card"><div class="cc-label">Pull Request</div><div class="cc-title">Request to merge + review</div><div class="cc-desc">Open a PR when your branch is ready. Teammates review before it merges to main.</div></div>
</div>

<h2 class="sh">Daily Workflow</h2>
<div class="code-block">
<div class="cb-header"><span class="cb-lang">terminal</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt"># 1. Start from current main</span>
git checkout main
git pull

<span class="cmt"># 2. Create your feature branch</span>
git checkout -b feature/shooter-pid

<span class="cmt"># 3. Make changes, then stage and commit</span>
git add .
git commit -m <span class="str">"feat: add velocity PID to shooter flywheel"</span>

<span class="cmt"># 4. Push and open a PR</span>
git push origin feature/shooter-pid
<span class="cmt"># → go to GitHub and open a Pull Request</span></pre>
</div>

<div class="callout warning"><p><strong>Never push directly to main.</strong> Always work on a branch and open a PR. Even if you're the only one working on it. This keeps the robot's working code safe from in-progress changes.</p></div>

<h2 class="sh">Branch Naming</h2>
<table>
<thead><tr><th>Prefix</th><th>Use for</th><th>Example</th></tr></thead>
<tbody>
<tr><td>feature/</td><td>New functionality</td><td><code>feature/auto-align</code></td></tr>
<tr><td>fix/</td><td>Bug fix</td><td><code>fix/shooter-pid-oscillation</code></td></tr>
<tr><td>refactor/</td><td>Cleanup, no behavior change</td><td><code>refactor/drivetrain-cleanup</code></td></tr>
<tr><td>docs/</td><td>Comments/docs only</td><td><code>docs/intake-javadocs</code></td></tr>
</tbody>
</table>

<h2 class="sh">Commit Messages</h2>
<div class="code-block">
<div class="cb-header"><span class="cb-lang">terminal — bad vs good</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt"># BAD</span>
git commit -m <span class="str">"stuff"</span>
git commit -m <span class="str">"fixed it"</span>
git commit -m <span class="str">"asdf"</span>

<span class="cmt"># GOOD — type: short description of what changed</span>
git commit -m <span class="str">"feat: add encoder-based speed control to shooter"</span>
git commit -m <span class="str">"fix: prevent motor from running past limit switch"</span>
git commit -m <span class="str">"refactor: extract PID constants to Constants.java"</span></pre>
</div>

<h2 class="sh">Fill in the Blanks</h2>
<div id="fill-o1">
  <div class="fill-container">
    <span class="cmt"># Create AND switch to new branch feature/elevator</span><br>
    git <input class="fill-blank" data-answer="checkout -b|switch -c" placeholder="???????????"> feature/elevator
  </div>
  <div class="fill-container">
    <span class="cmt"># Stage all changed files</span><br>
    git <input class="fill-blank" data-answer="add ." placeholder="?????">
  </div>
  <div class="fill-container">
    <span class="cmt"># Get the latest changes from remote main</span><br>
    git <input class="fill-blank" data-answer="pull" placeholder="????">
  </div>
</div>
<div style="display:flex;align-items:center;gap:12px;margin-top:10px">
  <button class="btn btn-navy btn-sm" onclick="checkFills('fill-o1')">Check Answers</button>
  <span id="fill-o1-result" style="font-size:13px;font-weight:700;display:none"></span>
</div>

<h2 class="sh">Knowledge Check</h2>
<div id="quiz-o1"></div>

<h2 class="sh">Assignment — Your First PR</h2>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">📝</div><div><div class="ch-title">First PR on the Team Repo</div><div class="ch-sub">Real Git on real code</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">1. Clone <a href="https://github.com/sohnshaik/training-test-1" style="color:#C41230">sohnshaik/training-test-1</a><br>
    2. Create branch <code>feature/yourname-intro</code><br>
    3. Add file <code>intros/yourname.md</code> with your name + one thing you want to build this season<br>
    4. Commit with a proper message<br>
    5. Push and open a Pull Request<br>
    6. Request review from Hrehaan or Sohan<br><br>
    When it merges, you've officially contributed to the team codebase.</p>
  </div>
</div>

<script>
const quiz_o1 = new Quiz('quiz-o1', [
  { question: "You're starting work on a new auto routine. First thing you do?", options: ["Edit files directly on main","git pull on main, then create a new branch","Create a commit on main first","Delete other branches"], correct: 1, explanation: "Always pull latest main before branching. Your feature branch starts from the current state of the codebase. Then create your branch and work in isolation." },
  { question: "You changed 3 files. You only want to commit 1. Which command?", options: ["git add .","git commit -f Shooter.java","git add ShooterSubsystem.java","git stage --only ShooterSubsystem.java"], correct: 2, explanation: "git add filename stages just that one file. git add . stages everything. Be deliberate — unrelated files in a commit make history messy." },
  { question: "What does a Pull Request do?", options: ["Pulls latest code to your laptop","Requests to merge your branch into another branch, with a review step","Creates a backup","Deletes your branch after merging"], correct: 1, explanation: "A PR is a merge request + review. Teammates check your code before it hits main. This is how we catch bugs before they reach a competition robot." },
  { question: "Git shows conflict markers in a file. What do you do?", options: ["Delete the file and restart","Run git undo","Open the file, pick the correct version, remove markers, then commit","Force push to override"], correct: 2, explanation: "Open the conflicted file. Git marks both versions with <<< === >>> markers. Keep the right one (or combine them), delete the markers, then git add and commit. VS Code's merge editor makes this visual." },
  { question: "Best commit message?", options: ["\"asdf\"","\"changes to shooter\"","\"feat: add velocity-based PID to shooter flywheel\"","\"I worked on the shooter today and it now does PID\""], correct: 2, explanation: "Good commit messages are specific and use a type prefix. They describe WHAT changed. Anyone reading the log should understand it without opening the diff." }
], 'offseason-o1');
</script>
