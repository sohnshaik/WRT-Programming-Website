---
layout: week
title: "Subsystem Ownership"
subtitle: "Read, document, and improve a real subsystem from Watergate, Oasis, or Shosty."
badge: "Offseason · Week 7 of 8"
phase: offseason
phase_label: Offseason
week_label: "Week O7"
page_id: "offseason-o7"
prev_url: "/weeks/offseason/os-week6"
prev_title: "O6 — Autonomous"
next_url: "/weeks/offseason/os-week8"
next_title: "O8 — Build Season Prep"
---

<div class="callout tip"><p><strong>This is the capstone.</strong> No new concepts — this week you apply everything. Pick a subsystem from Watergate, Oasis, or Shosty and own it. Read it, document it, improve it, and present it.</p></div>

<h2 class="sh">How to Read Unfamiliar Code</h2>
<p>Opening a file you've never seen before is disorienting. Here's a systematic approach that works every time.</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Step 1</div><div class="cc-title">Read the fields</div><div class="cc-desc">Instance variables tell you what hardware this subsystem controls. Motor IDs, sensors, state variables.</div></div>
  <div class="concept-card"><div class="cc-label">Step 2</div><div class="cc-title">Read the constructor</div><div class="cc-desc">How is the hardware configured? What are the default settings?</div></div>
  <div class="concept-card"><div class="cc-label">Step 3</div><div class="cc-title">Read the public methods</div><div class="cc-desc">These are the subsystem's API — what commands can call. Understand inputs and outputs.</div></div>
  <div class="concept-card"><div class="cc-label">Step 4</div><div class="cc-title">Read periodic()</div><div class="cc-desc">What runs every 20ms? Logging, safety checks, state machines.</div></div>
</div>

<h2 class="sh">Documentation Checklist</h2>
<p>Before your PR is ready, every method needs a Javadoc:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — Javadoc template</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">/**
 * Sets the shooter flywheel to a target RPM.
 * Call this before firing to pre-spin the wheel.
 *
 * @param targetRPM the desired flywheel speed in RPM (0 to 6000)
 */</span>
<span class="kw">public void</span> <span class="fn">setTargetRPM</span>(<span class="type">double</span> targetRPM) {
    <span class="kw">this</span>.targetRPM = Math.<span class="fn">min</span>(targetRPM, <span class="num">6000</span>);
}</pre>
</div>

<h2 class="sh">Capstone Assignment</h2>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">🤖</div><div><div class="ch-title">Subsystem Ownership</div><div class="ch-sub">Read → document → improve → present</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">
    1. Pick one subsystem from Watergate, Oasis, or Shosty (ask Hrehaan/Sohan for access)<br>
    2. Read the entire file using the 4-step process above<br>
    3. Add Javadoc comments to every public method<br>
    4. Find one bug or improvement (unused variable, missing null check, magic number, etc.)<br>
    5. Fix it on a branch<br>
    6. Open a PR with a description of what you changed and why<br>
    7. Prepare a 5-minute walkthrough: "Here's what this subsystem does, here's how it works, here's what I improved"<br><br>
    This is exactly what you'll do during build season when you own a subsystem.
    </p>
  </div>
</div>

<h2 class="sh">Knowledge Check</h2>
<div id="quiz-o7"></div>
<script>
const quiz_o7 = new Quiz('quiz-o7', [
  { question: "First thing to read when you open an unfamiliar subsystem file:", options: ["The periodic() method","The private instance variables — they tell you what hardware exists","The imports","The class declaration"], correct: 1, explanation: "Instance variables are the subsystem's inventory. Motors, sensors, state — if you know what hardware exists, the rest of the code makes sense." },
  { question: "A Javadoc @param tag documents:", options: ["The return value","A method parameter — its name and what it means","The class author","When the method was last modified"], correct: 1, explanation: "@param describes each parameter: what it is, valid range, units. @return describes the return value. These are the two most important tags to write." },
  { question: "You find the number 5.23 used directly in the code with no variable name. This is called a:", options: ["Constant","Magic number — should be extracted to Constants.java","Float literal","Acceptable shorthand"], correct: 1, explanation: "Magic numbers are hardcoded values with no context. 5.23 could be a gear ratio, a PID value, or a timeout. Extract it to Constants.java with a descriptive name." },
  { question: "You want to test your subsystem changes before touching the robot. You:", options: ["Deploy immediately and test on hardware","Use WPILib simulation to verify behavior first","Ask someone else to test","Submit the PR and hope for the best"], correct: 1, explanation: "Always simulate first. The simulator can catch logic errors, null pointer exceptions, and basic behavior issues before you risk the hardware." }
], 'offseason-o7');
</script>
