---
layout: week
title: "Logic & Control Flow"
subtitle: "Booleans, if/else, switch statements, and logical operators."
badge: "Summer · Week 2 of 8"
phase: summer
phase_label: Summer
week_label: Week 2
page_id: summer-w2
prev_url: /weeks/summer/week1
prev_title: "Week 1 — The Basics"
next_url: /weeks/summer/week3
next_title: "Week 3 — Loops"
---

<h2 class="sh">Booleans & Logical Operators</h2>
<p>A boolean holds exactly one of two values: <code>true</code> or <code>false</code>. Robot code is basically one giant decision tree — is the button pressed? Is the sensor triggered? Is the robot in auto? All booleans.</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">AND</div><div class="cc-title">&amp;&amp;</div><div class="cc-desc">Both sides must be true. <code>isEnabled &amp;&amp; hasTarget</code> — only fires if both are true.</div></div>
  <div class="concept-card"><div class="cc-label">OR</div><div class="cc-title">||</div><div class="cc-desc">At least one side must be true. <code>buttonA || buttonB</code> — fires if either is pressed.</div></div>
  <div class="concept-card"><div class="cc-label">NOT</div><div class="cc-title">!</div><div class="cc-desc">Flips the value. <code>!isRunning</code> is true when isRunning is false. Used constantly for guard conditions.</div></div>
  <div class="concept-card"><div class="cc-label">Comparison</div><div class="cc-title">== &nbsp;!= &nbsp;&lt; &nbsp;&gt;</div><div class="cc-desc">These return a boolean. <code>speed &gt; 0.5</code> evaluates to true or false.</div></div>
</div>

<h2 class="sh">If / Else</h2>
<p>Run code only when a condition is true. The most fundamental control structure in any language.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">double</span> distanceInches = <span class="num">14.5</span>;

<span class="kw">if</span> (distanceInches &lt; <span class="num">12.0</span>) {
    System.out.<span class="fn">println</span>(<span class="str">"Too close — stop!"</span>);
} <span class="kw">else if</span> (distanceInches &lt; <span class="num">24.0</span>) {
    System.out.<span class="fn">println</span>(<span class="str">"In range — score!"</span>);
} <span class="kw">else</span> {
    System.out.<span class="fn">println</span>(<span class="str">"Too far — drive closer"</span>);
}</pre>
</div>

<div class="callout tip"><p><strong>FRC connection:</strong> Almost every autonomous decision in robot code is an if/else chain. "If the sensor reads X, do Y. Otherwise do Z." That's it. This is the core logic pattern.</p></div>

<h2 class="sh">Switch Statements</h2>
<p>When you have one variable that could be many specific values, a switch is cleaner than a long if-else chain. In FRC we use these constantly for game states, robot modes, and enum-based control.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span> buttonID = <span class="num">2</span>;

<span class="kw">switch</span> (buttonID) {
    <span class="kw">case</span> <span class="num">1</span>:
        System.out.<span class="fn">println</span>(<span class="str">"Run intake"</span>);
        <span class="kw">break</span>;
    <span class="kw">case</span> <span class="num">2</span>:
        System.out.<span class="fn">println</span>(<span class="str">"Spin up shooter"</span>);
        <span class="kw">break</span>;
    <span class="kw">case</span> <span class="num">3</span>:
        System.out.<span class="fn">println</span>(<span class="str">"Deploy climber"</span>);
        <span class="kw">break</span>;
    <span class="kw">default</span>:
        System.out.<span class="fn">println</span>(<span class="str">"Unknown button"</span>);
}</pre>
</div>

<div class="callout warning"><p><strong>Don't forget <code>break</code>:</strong> Without it, Java "falls through" into the next case and keeps executing. Sometimes intentional, almost always a bug if you forgot it.</p></div>

<h2 class="sh">Fill in the Blanks</h2>
<div id="fill-w2">
  <div class="fill-container">
    <span class="cmt">// True only if both speed is high AND target is locked</span><br>
    <span class="type">boolean</span> canShoot = isAtSpeed <input class="fill-blank" data-answer="&&|&amp;&amp;" placeholder="??"> hasTarget;
  </div>
  <div class="fill-container">
    <span class="cmt">// Run this block if speed is greater than 0.5</span><br>
    <input class="fill-blank" data-answer="if" placeholder="??"> (speed <input class="fill-blank" data-answer="> 0.5|>0.5" placeholder="???"> ) { }
  </div>
  <div class="fill-container">
    <span class="cmt">// Prevent fall-through in a switch case</span><br>
    <span class="kw">case</span> <span class="num">1</span>: doSomething(); <input class="fill-blank" data-answer="break" placeholder="????">;
  </div>
</div>
<div style="display:flex;align-items:center;gap:12px;margin-top:10px">
  <button class="btn btn-navy btn-sm" onclick="checkFills('fill-w2')">Check Answers</button>
  <span id="fill-w2-result" style="font-size:13px;font-weight:700;display:none"></span>
</div>

<h2 class="sh">Knowledge Check</h2>
<div id="quiz-w2"></div>

<h2 class="sh">Coding Challenge</h2>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Robot State Checker</div><div class="ch-sub">Use if/else and booleans in an FRC scenario</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Given: <code>boolean isEnabled = true</code>, <code>boolean hasGamePiece = false</code>, <code>double distanceToTarget = 18.5</code> (inches).<br><br>Write an if/else chain that prints: "Intake" if no game piece, "Drive closer" if piece held but distance > 24, "Shoot!" if piece held and distance ≤ 24, and "Robot disabled" if not enabled. Check isEnabled first.</p>
    <textarea class="code-input" placeholder="// Your code here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w2')">Show Solution</button></div>
    <div id="sol-w2" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isEnabled = <span class="kw">true</span>;
<span class="type">boolean</span> hasGamePiece = <span class="kw">false</span>;
<span class="type">double</span> distanceToTarget = <span class="num">18.5</span>;

<span class="kw">if</span> (!isEnabled) {
    System.out.<span class="fn">println</span>(<span class="str">"Robot disabled"</span>);
} <span class="kw">else if</span> (!hasGamePiece) {
    System.out.<span class="fn">println</span>(<span class="str">"Intake"</span>);
} <span class="kw">else if</span> (distanceToTarget &gt; <span class="num">24.0</span>) {
    System.out.<span class="fn">println</span>(<span class="str">"Drive closer"</span>);
} <span class="kw">else</span> {
    System.out.<span class="fn">println</span>(<span class="str">"Shoot!"</span>);
}</pre>
      </div>
    </div>
  </div>
</div>

<script>
const quiz_w2 = new Quiz('quiz-w2', [
  { question: "What does <code>&&</code> require to return true?", options: ["At least one side is true","Both sides must be true","Neither side is true","Exactly one side is true"], correct: 1, explanation: "<code>&&</code> is AND — both sides must be true for the whole expression to be true. If either is false, the whole thing is false." },
  { question: "What does <code>!isRunning</code> evaluate to when <code>isRunning = true</code>?", options: ["true","false","null","Compile error"], correct: 1, explanation: "<code>!</code> flips the boolean. <code>!true = false</code>. This is used constantly for guard conditions: <code>if (!isRunning) { start(); }</code>" },
  { question: "What happens in a switch statement if you forget <code>break</code>?", options: ["Nothing — break is optional","Compile error","Fall-through: execution continues into the next case","The switch restarts"], correct: 2, explanation: "Without break, Java falls through into the next case and executes it too, even if it didn't match. Almost always a bug." },
  { question: "Which expression is true when speed is between 0.3 and 0.8?", options: ["speed > 0.3 || speed < 0.8","speed > 0.3 && speed < 0.8","speed == 0.3 && speed == 0.8","!(speed < 0.3 && speed > 0.8)"], correct: 1, explanation: "Use && to require both conditions simultaneously. OR would be wrong — almost everything satisfies 'greater than 0.3 OR less than 0.8'." },
  { question: "Which is true about if-else vs switch?", options: ["Switch can handle ranges like speed > 0.5","If-else can only handle integers","Switch is cleaner for many fixed values of one variable; if-else handles ranges and complex conditions","They're identical in capability"], correct: 2, explanation: "Switch is great when one variable maps to many exact values (button IDs, enum states). If-else handles anything — ranges, multiple variables, complex logic." }
], 'summer-w2');
</script>
