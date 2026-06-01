---
layout: week
title: "Build Season Prep"
subtitle: "SCRUM, sprint planning, Git workflow for build season, and AdvantageKit intro."
badge: "Offseason · Week 8 of 8"
phase: offseason
phase_label: Offseason
week_label: "Week O8"
page_id: "offseason-o8"
topics:
  - SCRUM for FRC
  - Build Season Git Workflow
  - AdvantageKit & Logging
prev_url: "/weeks/offseason/os-week7"
prev_title: "O7 — Subsystem Ownership"
next_url: ""
next_title: ""
---

<div class="callout info"><p><strong>Build season starts at kickoff.</strong> Six weeks to build and program a competition robot. This week is about knowing how the team operates so you can contribute from day one.</p></div>

<h2 class="sh">SCRUM for FRC</h2>
<p>2974 uses a simplified SCRUM process during build season. Sprints are usually 3–5 days (aligned with build sessions). Tasks are tracked as GitHub Issues.</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Sprint</div><div class="cc-title">A short work cycle</div><div class="cc-desc">Usually 3–5 days. Start with planning (what will we finish?), end with a review (what did we accomplish?).</div></div>
  <div class="concept-card"><div class="cc-label">Backlog</div><div class="cc-title">All the work to do</div><div class="cc-desc">GitHub Issues for every programming task. Feature, bug, documentation — everything gets an issue.</div></div>
  <div class="concept-card"><div class="cc-label">Standup</div><div class="cc-title">Daily 5-min check-in</div><div class="cc-desc">Three questions: What did you do? What will you do? Anything blocking you? Keep it short.</div></div>
  <div class="concept-card"><div class="cc-label">Code Freeze</div><div class="cc-title">No new features before comp</div><div class="cc-desc">48h before competition, only bug fixes. New features introduce new bugs. Ship stable code.</div></div>
</div>

<h2 class="sh">Build Season Git Workflow</h2>
<div class="code-block">
<div class="cb-header"><span class="cb-lang">terminal — build season branch rules</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt"># main = deployed code. Never break main.</span>
<span class="cmt"># dev = integration branch (features merge here first)</span>
<span class="cmt"># feature/* = your work</span>

<span class="cmt"># Start a task</span>
git checkout dev
git pull
git checkout -b feature/auto-align-vision

<span class="cmt"># Finish and merge</span>
git push origin feature/auto-align-vision
<span class="cmt"># Open PR → dev (NOT main)</span>
<span class="cmt"># Get review → merge → test on robot</span>
<span class="cmt"># When dev is stable → merge dev → main</span></pre>
</div>

<h2 class="sh">AdvantageKit — Logging</h2>
<p>AdvantageKit is a logging framework used by top FRC teams. It records all sensor inputs, so you can replay a match log and debug exactly what happened — like a flight data recorder for the robot.</p>

<div class="callout tip"><p><strong>Why this matters at competition:</strong> When the robot does something weird in a match, you have 6 minutes between matches to fix it. AdvantageScope + match logs let you replay exactly what the robot saw and did, instead of guessing.</p></div>

<h2 class="sh">Build Season Checklist</h2>
<table>
<thead><tr><th>Before Kickoff</th><th>Status</th></tr></thead>
<tbody>
<tr><td>WPILib installed and updated</td><td>✓ Do this now</td></tr>
<tr><td>Added to WaltonRobotics GitHub org</td><td>Ask Hrehaan/Sohan</td></tr>
<tr><td>Git workflow practiced (PRs, reviews)</td><td>Complete O1 assignment</td></tr>
<tr><td>Can write a basic subsystem from scratch</td><td>Complete O7 capstone</td></tr>
<tr><td>Understand command-based architecture</td><td>Complete O3</td></tr>
</tbody>
</table>

<h2 class="sh">Knowledge Check</h2>
<div id="quiz-o8"></div>
<script>
const quiz_o8 = new Quiz('quiz-o8', [
  { question: "What are the three standup questions?", options: ["What did you code, what broke, what do you need","What did you do, what will you do, what's blocking you","What's your task, how long will it take, is it done","Who reviewed your PR, was it merged, what's next"], correct: 1, explanation: "Classic standup: done, doing, blocked. Keep it under 5 minutes. Blockers are the most important part — surface them early so teammates can help." },
  { question: "During build season, feature branches merge into:", options: ["main directly","dev (integration branch), not main","A separate release branch","Any branch the author chooses"], correct: 1, explanation: "Features merge into dev first. Multiple features are integrated and tested together on dev before a stable batch merges to main. This keeps main deployable at all times." },
  { question: "Code freeze means:", options: ["Literally freezing the robot in place","No code changes allowed at all","Only bug fixes allowed — no new features — typically 48h before competition","The robot can't be reprogrammed"], correct: 2, explanation: "New features = new bugs. 48h before competition, you stop adding features and only fix confirmed bugs. Ships stable, tested code to the event." },
  { question: "What is AdvantageKit primarily used for?", options: ["Autonomous path planning","Recording all sensor inputs for post-match replay and debugging","Real-time motor control","Vision processing"], correct: 1, explanation: "AdvantageKit logs every sensor input in a structured way. In AdvantageScope, you can replay a match log and see exactly what the robot saw at any moment — invaluable for debugging competition issues." },
  { question: "A GitHub Issue in the sprint backlog should contain:", options: ["Only the issue title","Title, clear description of what needs to be done, and acceptance criteria for when it's done","Only the assignee","Only a link to the PR"], correct: 1, explanation: "Good issues have: a clear title, description of the task or bug, and acceptance criteria. 'Add PID to shooter' is bad. 'Implement velocity PID on shooter flywheel to hit 4000RPM within ±50RPM' is good." }
], 'offseason-o8');
</script>
