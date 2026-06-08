---
layout: week
title: "Logic & Control Flow"
subtitle: "Booleans, if/else, switch statements, and logical operators."
badge: "Summer · Week 2 of 8"
phase: summer
phase_label: Summer
week_label: Week 2
page_id: summer-w2
weekly_test: true
topics:
  - Booleans & Logical Operators
  - If / Else
  - Switch Statements
  - Ternary Operator
  - Knowledge Check
  - Project Task
prev_url: /weeks/summer/week1
prev_title: "Week 1 — The Basics"
next_url: /weeks/summer/week3
next_title: "Week 3 — Loops"
---

<h2 class="sh" id="topic-1">Booleans &amp; Logical Operators</h2>

<p>a boolean is the simplest piece of information in computing. it can only be two things: <code>true</code> or <code>false</code>. that's it. like a light switch — on or off, nothing in between.</p>

<p>that might sound too simple to be useful, but booleans are actually the backbone of everything a robot does. every decision the robot makes — every "should i do this right now?" question — is a boolean under the hood. is the robot allowed to move? is the intake (the intake is the mechanism that picks up game pieces) holding something? has the shooter (the shooter launches game pieces into scoring targets) wheel spun up to speed? all booleans. all the time.</p>

<h3 class="sub">what even IS a boolean?</h3>

<p>ok so imagine you have a yes/no checklist. "is the robot enabled?" yes. "does the intake have a game piece (game pieces are the objects FRC robots pick up and score each season — changes every year)?" no. "is the shooter at target speed?" yes. each of those answers is exactly one bit of information — true or false. that's what a boolean is.</p>

<p>at a hardware level, a boolean is literally just 1 bit of memory. the whole entire concept boils down to: is this bit a 1 (true) or a 0 (false)? everything your robot decides — every motion command, every state transition, every safety check — eventually collapses into a bunch of these yes/no decisions chained together.</p>

<p><strong>why does it matter in FRC?</strong> your robot code is FULL of state. is the shooter running? is the limit switch pressed? is the robot in auto or teleop (teleop = the 2-minute period where drivers control the robot manually)? is the alliance station red or blue? every single one of those is a boolean. state machines (a design pattern where the robot switches between named modes like INTAKING, SHOOTING, IDLE) also rely on boolean-reliant things, known as triggers. state machines are one of the more complex things in FRC, so I won't burden y'all with that quite yet. (those who know)</p>

<h3 class="sub">declaring a boolean</h3>

<p>you already saw <code>boolean</code> as a type in week 1. here's a full annotated look with real FRC variable examples:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// a boolean can only be true or false — that's the whole type</span>
<span class="type">boolean</span> isEnabled     = <span class="kw">true</span>;   <span class="cmt">// is the robot allowed to move right now?</span>
<span class="type">boolean</span> hasGamePiece  = <span class="kw">false</span>;  <span class="cmt">// is the intake holding something?</span>
<span class="type">boolean</span> isAtSpeed     = <span class="kw">false</span>;  <span class="cmt">// has the shooter wheel spun up?</span>
<span class="type">boolean</span> isAtTarget    = <span class="kw">true</span>;   <span class="cmt">// is the robot aimed at the goal?</span>

<span class="cmt">// booleans are also what comparisons return</span>
<span class="type">double</span> speed = <span class="num">0.85</span>;
<span class="type">boolean</span> isFast = speed &gt; <span class="num">0.5</span>;  <span class="cmt">// true — speed is greater than 0.5</span>
<span class="type">boolean</span> isSlow = speed &lt; <span class="num">0.3</span>;  <span class="cmt">// false — speed is NOT less than 0.3</span>

<span class="cmt">// member variable convention on WRT: m_ prefix</span>
<span class="kw">private</span> <span class="type">boolean</span> m_isRunning  = <span class="kw">false</span>;  <span class="cmt">// belongs to the class (instance var)</span>
<span class="kw">private</span> <span class="type">boolean</span> m_hasTarget  = <span class="kw">false</span>;  <span class="cmt">// changes during robot operation</span></pre>
</div>

<div class="callout info"><p>notice how boolean variable names almost always start with "is" or "has" — like <code>isEnabled</code>, <code>hasGamePiece</code>, <code>isAtSpeed</code>. this is a naming convention everyone uses because it reads like a yes/no question: "is the robot enabled? yes, true." it makes code way easier to read at a glance.</p></div>

<h3 class="sub">comparison operators — making booleans from math</h3>

<p>you create booleans all the time by comparing two numbers. these comparison operators all return either <code>true</code> or <code>false</code>. you've seen most of these from math class, just written differently:</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">==</div><div class="cc-title">equals</div><div class="cc-desc"><code>x == 5</code> — is x equal to 5? (two equals signs, NOT one — we'll come back to this)</div></div>
  <div class="concept-card"><div class="cc-label">!=</div><div class="cc-title">not equals</div><div class="cc-desc"><code>x != 5</code> — is x something other than 5?</div></div>
  <div class="concept-card"><div class="cc-label">&lt; and &gt;</div><div class="cc-title">less / greater</div><div class="cc-desc"><code>speed &gt; 0.5</code> — is speed more than 0.5? returns true or false.</div></div>
  <div class="concept-card"><div class="cc-label">&lt;= and &gt;=</div><div class="cc-title">less/greater or equal</div><div class="cc-desc"><code>distance &lt;= 24.0</code> — is distance 24 or less? includes the boundary value.</div></div>
</div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">double</span> distanceInches = <span class="num">18.5</span>;
<span class="type">double</span> motorSpeed     = <span class="num">0.72</span>;
<span class="type">int</span>    encoderTicks   = <span class="num">4096</span>;  <span class="cmt">// encoder ticks — raw count of how many pulses the encoder has measured (more ticks = more rotation)</span>

<span class="cmt">// each of these evaluates to true or false</span>
<span class="type">boolean</span> inRange     = distanceInches &lt;= <span class="num">24.0</span>;   <span class="cmt">// true — 18.5 is less than 24</span>
<span class="type">boolean</span> atFullSpeed = motorSpeed &gt;= <span class="num">0.8</span>;         <span class="cmt">// false — 0.72 is not >= 0.8</span>
<span class="type">boolean</span> fullTurn    = encoderTicks == <span class="num">4096</span>;      <span class="cmt">// true — exactly equal</span>
<span class="type">boolean</span> notHome     = encoderTicks != <span class="num">0</span>;          <span class="cmt">// true — ticks are not 0</span></pre>
</div>

<h3 class="sub">logical operators — combining booleans</h3>

<p>what if you need to check more than one thing at once? that's what logical operators are for. you can chain booleans together to build more powerful conditions. there are three: <code>&amp;&amp;</code> (AND), <code>||</code> (OR), and <code>!</code> (NOT). story time for each one.</p>

<h3 class="sub">&amp;&amp; (AND) — the two security guards</h3>

<p>imagine the entrance to a competition field has two security guards. guard one checks if you have a wristband. guard two checks if you have a safety vest. you only get in if BOTH say yes. if either one says no, you're not getting through. that's <code>&amp;&amp;</code>.</p>

<p>in FRC: the robot should only shoot if it HAS a game piece AND is close enough to the goal. if either condition is false — no piece, or too far away — there's no point shooting. both must be true simultaneously.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> hasGamePiece  = <span class="kw">true</span>;
<span class="type">boolean</span> isCloseEnough = <span class="kw">false</span>;

<span class="cmt">// && means BOTH must be true</span>
<span class="type">boolean</span> canShoot = hasGamePiece &amp;&amp; isCloseEnough;
<span class="cmt">// canShoot = false — because isCloseEnough is false</span>
<span class="cmt">// it doesn't matter that hasGamePiece is true</span>
<span class="cmt">// both sides MUST be true for && to give true</span></pre>
</div>

<p>here's the full truth table for <code>&amp;&amp;</code>. a truth table just shows every possible input combination and what you get out:</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">true &amp;&amp; true</div><div class="cc-title">= true</div><div class="cc-desc">both sides are true, so AND is true. robot has piece AND is close. shoot!</div></div>
  <div class="concept-card"><div class="cc-label">true &amp;&amp; false</div><div class="cc-title">= false</div><div class="cc-desc">one side is false. has piece but NOT close enough. can't shoot yet.</div></div>
  <div class="concept-card"><div class="cc-label">false &amp;&amp; true</div><div class="cc-title">= false</div><div class="cc-desc">other side is false. close enough but NO piece. can't shoot.</div></div>
  <div class="concept-card"><div class="cc-label">false &amp;&amp; false</div><div class="cc-title">= false</div><div class="cc-desc">both are false. no piece AND not close. definitely can't shoot.</div></div>
</div>

<h3 class="sub">|| (OR) — at least one guard says yes</h3>

<p>now imagine the intake motor. you want it to run if either button A OR button B on the gamepad is pressed. you don't care which one — if either is pressed, run the intake. that's OR.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> buttonA = <span class="kw">false</span>;
<span class="type">boolean</span> buttonB = <span class="kw">true</span>;

<span class="cmt">// || means AT LEAST ONE must be true</span>
<span class="type">boolean</span> runIntake = buttonA || buttonB;
<span class="cmt">// runIntake = true — because buttonB is true</span>
<span class="cmt">// even though buttonA is false, that's fine</span>
<span class="cmt">// OR only needs ONE side to be true</span></pre>
</div>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">true || true</div><div class="cc-title">= true</div><div class="cc-desc">both are true. either button works. run intake.</div></div>
  <div class="concept-card"><div class="cc-label">true || false</div><div class="cc-title">= true</div><div class="cc-desc">first side is true. button A pressed. run intake.</div></div>
  <div class="concept-card"><div class="cc-label">false || true</div><div class="cc-title">= true</div><div class="cc-desc">second side is true. button B pressed. run intake.</div></div>
  <div class="concept-card"><div class="cc-label">false || false</div><div class="cc-title">= false</div><div class="cc-desc">neither button is pressed. don't run intake.</div></div>
</div>

<h3 class="sub">! (NOT) — flip it</h3>

<p><code>!</code> just flips a boolean. true becomes false, false becomes true. it's useful when you want to say "if this thing is NOT happening." you'll see it constantly in real robot code.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isShooterRunning = <span class="kw">false</span>;

<span class="cmt">// ! flips the value</span>
<span class="type">boolean</span> shouldStartShooter = !isShooterRunning;
<span class="cmt">// shouldStartShooter = true</span>
<span class="cmt">// "if the shooter is NOT running, we should start it"</span>

<span class="cmt">// !true  = false</span>
<span class="cmt">// !false = true</span>
<span class="cmt">// that's literally the whole thing</span>

<span class="cmt">// you'll see this all the time:</span>
<span class="kw">if</span> (!isEnabled)    { <span class="cmt">/* robot disabled, do nothing */</span> }
<span class="kw">if</span> (!hasGamePiece) { <span class="cmt">/* run intake */</span> }
<span class="kw">if</span> (!isAtTarget)   { <span class="cmt">/* keep aiming */</span> }</pre>
</div>

<div class="callout tip"><p><strong>WRT convention:</strong> you'll see <code>!</code> constantly in robot code as "guard conditions" — conditions that block things from happening when they shouldn't. things like <code>if (!isEnabled)</code> at the top of a method to bail out early. it reads naturally in English: "if NOT enabled" — super clean.</p></div>

<h3 class="sub">combining multiple operators</h3>

<p>you can chain all three together to build complex conditions. let's say the robot should only shoot if it's enabled, has a game piece, AND is not already at the target:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isEnabled    = <span class="kw">true</span>;
<span class="type">boolean</span> hasGamePiece = <span class="kw">true</span>;
<span class="type">boolean</span> isAtTarget   = <span class="kw">false</span>;

<span class="cmt">// all three conditions must be met to shoot</span>
<span class="type">boolean</span> shouldShoot = isEnabled &amp;&amp; hasGamePiece &amp;&amp; !isAtTarget;
<span class="cmt">// shouldShoot = true</span>
<span class="cmt">// enabled? yes. has piece? yes. NOT already at target? yes (isAtTarget is false, !false = true)</span>

<span class="cmt">// you can also mix && and ||, but use parentheses to be explicit</span>
<span class="type">boolean</span> shouldIntake = isEnabled &amp;&amp; (!hasGamePiece || isAtTarget);
<span class="cmt">// run intake if enabled AND (either: no piece, OR at target and can cycle again)</span></pre>
</div>

<h3 class="sub">short-circuit evaluation</h3>

<p>here's something interesting about how Java handles <code>&amp;&amp;</code> and <code>||</code>: it's lazy. it only evaluates as much as it needs to.</p>

<p>with <code>&amp;&amp;</code>, if the first part is <code>false</code>, Java immediately knows the whole thing is <code>false</code> (since both sides need to be true). it doesn't even look at the second part. same deal with <code>||</code> — if the first part is <code>true</code>, it stops immediately because it already knows the result is <code>true</code>. this is called short-circuit evaluation.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isEnabled = <span class="kw">false</span>;
<span class="type">boolean</span> hasTarget = <span class="kw">true</span>;

<span class="cmt">// Java sees isEnabled is false first</span>
<span class="cmt">// it STOPS RIGHT THERE and returns false</span>
<span class="cmt">// it never even evaluates hasTarget</span>
<span class="type">boolean</span> result = isEnabled &amp;&amp; hasTarget; <span class="cmt">// false (short-circuited after isEnabled)</span>

<span class="cmt">// same with || — if the first part is true, Java stops</span>
<span class="cmt">// it already knows the result is true, no point checking the rest</span>
<span class="type">boolean</span> result2 = hasTarget || isEnabled; <span class="cmt">// true (stopped after hasTarget)</span></pre>
</div>

<div class="callout info"><p>short-circuit evaluation is really useful in advanced code — you can put the "cheapest" or "most likely to be false" check first in an <code>&amp;&amp;</code> chain so Java skips the expensive operations when they aren't needed. not critical right now, but good to know it exists and that Java does it automatically.</p></div>

<h3 class="sub">the operator precedence gotcha (this WILL bite you)</h3>

<p>ok story time. you want to check: "NOT (a AND b)" — meaning the combined condition is false. so you write <code>!a &amp;&amp; b</code>. but wait — that's actually "NOT a, AND b". those are very different things and Java evaluates them differently.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — BAD (wrong precedence)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isEnabled    = <span class="kw">true</span>;
<span class="type">boolean</span> hasGamePiece = <span class="kw">true</span>;

<span class="cmt">// intent: "NOT (enabled AND has piece)"</span>
<span class="cmt">// i.e. fire a warning if the ready-to-shoot condition is NOT fully met</span>
<span class="type">boolean</span> notReady = !isEnabled &amp;&amp; hasGamePiece;
<span class="cmt">// actual evaluation: (!isEnabled) && hasGamePiece</span>
<span class="cmt">// !isEnabled = !true = false</span>
<span class="cmt">// false && true = false</span>
<span class="cmt">// notReady = false — NOT what you meant!</span></pre>
</div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — GOOD (explicit parentheses)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// intent: "NOT (enabled AND has piece)"</span>
<span class="type">boolean</span> notReady = !(isEnabled &amp;&amp; hasGamePiece);
<span class="cmt">// (isEnabled && hasGamePiece) = (true && true) = true</span>
<span class="cmt">// !(true) = false</span>
<span class="cmt">// notReady = false — correct!</span>

<span class="cmt">// rule of thumb: when mixing ! with && or ||, use parentheses to be explicit</span>
<span class="cmt">// don't rely on your memory of operator precedence — it trips up everyone</span></pre>
</div>

<div class="callout warning"><p><strong>common gotcha:</strong> <code>!</code> has higher precedence than <code>&amp;&amp;</code> and <code>||</code>, so <code>!a &amp;&amp; b</code> is always read as <code>(!a) &amp;&amp; b</code>, not <code>!(a &amp;&amp; b)</code>. if you mean to negate the whole combined expression, wrap it in parentheses: <code>!(a &amp;&amp; b)</code>. when in doubt, add parens. they never hurt.</p></div>

<h3 class="sub">Topic 1 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Robot Ready Check</div><div class="ch-sub">Combine booleans with logical operators</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Start with these variables:<br><code>boolean isEnabled = true;</code><br><code>boolean hasGamePiece = true;</code><br><code>boolean isAtSpeed = false;</code><br><code>double distanceInches = 20.0;</code><br><br>Create two new booleans using <code>&&</code>, <code>||</code>, and <code>!</code>:<br>• <code>readyToShoot</code> — true only if ALL of these are true: enabled, has piece, at speed, AND distance is 24 or less<br>• <code>shouldIntake</code> — true if enabled AND does NOT have a game piece<br><br>Print both. With these values, what should each one be?</p>
    <textarea class="code-input" placeholder="// Write your code here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w2-t1')">Show Solution</button></div>
    <div id="sol-w2-t1" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isEnabled      = <span class="kw">true</span>;
<span class="type">boolean</span> hasGamePiece   = <span class="kw">true</span>;
<span class="type">boolean</span> isAtSpeed      = <span class="kw">false</span>;
<span class="type">double</span>  distanceInches = <span class="num">20.0</span>;

<span class="cmt">// all four conditions must be met</span>
<span class="type">boolean</span> readyToShoot = isEnabled &amp;&amp; hasGamePiece &amp;&amp; isAtSpeed &amp;&amp; (distanceInches &lt;= <span class="num">24.0</span>);
<span class="cmt">// readyToShoot = false (isAtSpeed is false)</span>

<span class="cmt">// enabled and no game piece = go intake</span>
<span class="type">boolean</span> shouldIntake = isEnabled &amp;&amp; !hasGamePiece;
<span class="cmt">// shouldIntake = false (hasGamePiece is true, so !hasGamePiece is false)</span>

System.out.<span class="fn">println</span>(<span class="str">"readyToShoot: "</span> + readyToShoot);
System.out.<span class="fn">println</span>(<span class="str">"shouldIntake: "</span> + shouldIntake);</pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 1 — Quick Check</h3>
<div id="quiz-w2-t1"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-2">If / Else</h2>

<p>if/else is how your program makes decisions. every single decision your robot makes — whether to spin a motor, which auto routine to run, whether to extend a mechanism — is an if/else somewhere inside. honestly if/else is like 80% of programming, it's that important.</p>

<p>the idea is simple: "IF this condition is true, run this code. ELSE (otherwise), run this other code." Java reads your program line by line, and when it hits an <code>if</code>, it checks the condition. if the condition is <code>true</code>, it runs the block inside the braces. if the condition is <code>false</code>, it skips that block entirely.</p>

<h3 class="sub">what even IS an if/else?</h3>

<p>imagine a bouncer at the door of a venue. they have a guest list. for every person who walks up, they run through a mental checklist: "are you on the list? are you 18+? do you have valid ID?" if all conditions pass, you get in. otherwise, you don't. the bouncer isn't doing math or calculating anything complex — they're just checking yes/no conditions in order and branching based on the result.</p>

<p>your Java program's if/else works exactly like that bouncer. you give it a boolean condition (the check), and it either runs the block inside (let them in) or skips it (turn them away). no guessing, no "maybe" — it's a clean binary branch.</p>

<p><strong>why does it matter in FRC?</strong> every robot behavior is conditional. "if the shooter is at speed, allow firing." "if the sensor sees a game piece, stop the intake." "if we're in auto mode, run the preloaded trajectory." if you can't write if/else well, you literally can't program a robot. this is the single most important topic in week 2.</p>

<h3 class="sub">the simplest possible example</h3>

<p>before we get to robots, here's a completely basic example so you can see exactly what's happening line by line:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isSunny = <span class="kw">true</span>;

<span class="kw">if</span> (isSunny) {                              <span class="cmt">// check: is isSunny true?</span>
    System.out.<span class="fn">println</span>(<span class="str">"wear sunglasses"</span>);  <span class="cmt">// YES: run this block</span>
}
<span class="cmt">// if isSunny were false, this whole block would be skipped</span>
<span class="cmt">// Java would jump straight past it and continue with whatever comes next</span></pre>
</div>

<p>now let's add an <code>else</code> — what to do when the condition is false:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isSunny = <span class="kw">false</span>;

<span class="kw">if</span> (isSunny) {
    System.out.<span class="fn">println</span>(<span class="str">"wear sunglasses"</span>);  <span class="cmt">// skipped (isSunny is false)</span>
} <span class="kw">else</span> {
    System.out.<span class="fn">println</span>(<span class="str">"grab an umbrella"</span>);  <span class="cmt">// this runs</span>
}

<span class="cmt">// output: "grab an umbrella"</span>
<span class="cmt">// the if block was skipped, the else block ran instead</span></pre>
</div>

<h3 class="sub">else if — checking multiple conditions</h3>

<p>sometimes you need more than two outcomes. <code>else if</code> lets you chain conditions: "if this... otherwise if this other thing... otherwise..." you can stack as many <code>else if</code> blocks as you want.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">double</span> distanceInches = <span class="num">18.5</span>;

<span class="kw">if</span> (distanceInches &lt; <span class="num">12.0</span>) {
    <span class="cmt">// runs if distance is less than 12 inches</span>
    System.out.<span class="fn">println</span>(<span class="str">"Too close — stop!"</span>);

} <span class="kw">else if</span> (distanceInches &lt; <span class="num">24.0</span>) {
    <span class="cmt">// runs if distance is between 12 and 24</span>
    <span class="cmt">// (already know it's >= 12 because that check failed above)</span>
    System.out.<span class="fn">println</span>(<span class="str">"In range — score!"</span>);

} <span class="kw">else</span> {
    <span class="cmt">// runs if nothing above was true — distance is 24 or more</span>
    System.out.<span class="fn">println</span>(<span class="str">"Too far — drive closer"</span>);
}

<span class="cmt">// distanceInches is 18.5</span>
<span class="cmt">// check 1: 18.5 < 12.0? no, skip</span>
<span class="cmt">// check 2: 18.5 < 24.0? YES — prints "In range — score!"</span>
<span class="cmt">// else block skipped — we already found a match</span></pre>
</div>

<div class="callout tip"><p>once Java finds a condition that's true in an if/else chain, it runs that block and jumps PAST all remaining else if and else blocks. it doesn't keep checking. that's why order matters — put the most specific or most important checks first.</p></div>

<h3 class="sub">how Java reads an if/else chain, step by step</h3>

<p>let's slow down and trace through exactly what Java is doing. this mental model will help you debug if/else logic when it doesn't do what you expect:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span> score = <span class="num">75</span>;

<span class="kw">if</span> (score &gt;= <span class="num">90</span>) {        <span class="cmt">// step 1: is 75 >= 90? NO. skip this block.</span>
    System.out.<span class="fn">println</span>(<span class="str">"A"</span>);
} <span class="kw">else if</span> (score &gt;= <span class="num">80</span>) { <span class="cmt">// step 2: is 75 >= 80? NO. skip this block.</span>
    System.out.<span class="fn">println</span>(<span class="str">"B"</span>);
} <span class="kw">else if</span> (score &gt;= <span class="num">70</span>) { <span class="cmt">// step 3: is 75 >= 70? YES! run this block.</span>
    System.out.<span class="fn">println</span>(<span class="str">"C"</span>);  <span class="cmt">// this line runs</span>
} <span class="kw">else</span> {                    <span class="cmt">// step 4: skipped — already found match above</span>
    System.out.<span class="fn">println</span>(<span class="str">"F"</span>);
}
<span class="cmt">// output: C</span></pre>
</div>

<h3 class="sub">nested if/else — an if inside an if</h3>

<p>you can put an if/else inside another if/else. this is called nesting. you do this when you only want to check a second condition after the first one passes — like a two-stage gate:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isEnabled     = <span class="kw">true</span>;
<span class="type">boolean</span> hasGamePiece  = <span class="kw">true</span>;
<span class="type">double</span>  distanceInches = <span class="num">20.0</span>;

<span class="cmt">// first gate: is the robot even allowed to move?</span>
<span class="kw">if</span> (isEnabled) {

    <span class="cmt">// only check game piece status if we're enabled</span>
    <span class="kw">if</span> (hasGamePiece) {

        <span class="cmt">// only check distance if we have a piece</span>
        <span class="kw">if</span> (distanceInches &lt;= <span class="num">24.0</span>) {
            System.out.<span class="fn">println</span>(<span class="str">"Shoot!"</span>);
        } <span class="kw">else</span> {
            System.out.<span class="fn">println</span>(<span class="str">"Drive closer"</span>);
        }

    } <span class="kw">else</span> {
        System.out.<span class="fn">println</span>(<span class="str">"Run intake — no game piece"</span>);
    }

} <span class="kw">else</span> {
    System.out.<span class="fn">println</span>(<span class="str">"Robot is disabled"</span>);
}

<span class="cmt">// enabled=true, hasGamePiece=true, distance=20 (<=24)</span>
<span class="cmt">// output: "Shoot!"</span></pre>
</div>

<p>notice the indentation — each nested level is indented one more step. this is super important for readability. the indentation shows you which if/else belongs to which outer block. if your indentation is a mess, your code is a mess. Java ignores whitespace but your teammates (and future you) don't.</p>

<h3 class="sub">the = vs == gotcha (this WILL bite you)</h3>

<p>ok this is the #1 most common if/else bug for new programmers. here's the story. you're checking if a button ID equals 2, and you write: <code>if (buttonID = 2)</code>. your code compiles... but does the wrong thing completely. why?</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — BAD (single equals in an if)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span> buttonID = <span class="num">1</span>;

<span class="cmt">// WRONG — this is assignment, not comparison</span>
<span class="cmt">// this sets buttonID to 2 AND evaluates to 2 (non-zero = true in some langs)</span>
<span class="cmt">// in Java this is actually a compile error for booleans — but easy to mix up</span>
<span class="kw">if</span> (buttonID = <span class="num">2</span>) {  <span class="cmt">// COMPILE ERROR in Java — but the confusion is real</span>
    System.out.<span class="fn">println</span>(<span class="str">"button 2 pressed"</span>);
}</pre>
</div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — GOOD (double equals for comparison)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span> buttonID = <span class="num">1</span>;

<span class="cmt">// CORRECT — == is comparison, asks "are these equal?"</span>
<span class="kw">if</span> (buttonID == <span class="num">2</span>) {   <span class="cmt">// is buttonID equal to 2? no, it's 1, so skip</span>
    System.out.<span class="fn">println</span>(<span class="str">"button 2 pressed"</span>);  <span class="cmt">// skipped</span>
}

<span class="cmt">// where it REALLY bites you — booleans:</span>
<span class="type">boolean</span> isRunning = <span class="kw">false</span>;
<span class="kw">if</span> (isRunning = <span class="kw">true</span>) {   <span class="cmt">// this SETS isRunning to true AND always runs!</span>
    System.out.<span class="fn">println</span>(<span class="str">"running"</span>);  <span class="cmt">// this ALWAYS prints now — bug!</span>
}

<span class="cmt">// fix:</span>
<span class="kw">if</span> (isRunning == <span class="kw">true</span>) {   <span class="cmt">// correct comparison</span>
    System.out.<span class="fn">println</span>(<span class="str">"running"</span>);
}
<span class="cmt">// even cleaner — booleans don't need == true, just use the variable directly:</span>
<span class="kw">if</span> (isRunning) {
    System.out.<span class="fn">println</span>(<span class="str">"running"</span>);
}</pre>
</div>

<div class="callout danger"><p><strong>danger:</strong> single <code>=</code> is assignment — you're SETTING a value. double <code>==</code> is comparison — you're ASKING if two things are equal. using <code>=</code> inside an if with booleans in Java assigns the value AND uses it as the condition — so <code>if (isRunning = true)</code> will set isRunning to true and ALWAYS execute the block. super sneaky bug that's hard to spot. always double-check your equals signs.</p></div>

<h3 class="sub">the missing braces gotcha</h3>

<p>technically, if your if block only has one line inside it, you can skip the curly braces. please don't. here's why:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — the missing braces trap</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isEnabled = <span class="kw">true</span>;

<span class="cmt">// this LOOKS like both lines are inside the if... but they're not</span>
<span class="kw">if</span> (isEnabled)
    System.out.<span class="fn">println</span>(<span class="str">"robot is enabled"</span>);
    System.out.<span class="fn">println</span>(<span class="str">"running motors"</span>);  <span class="cmt">// ALWAYS runs, not inside the if!</span>

<span class="cmt">// Java ignores indentation. only the FIRST line after a brace-less if is conditional.</span>
<span class="cmt">// the second println runs regardless of isEnabled</span>

<span class="cmt">// fix — always use braces:</span>
<span class="kw">if</span> (isEnabled) {
    System.out.<span class="fn">println</span>(<span class="str">"robot is enabled"</span>);
    System.out.<span class="fn">println</span>(<span class="str">"running motors"</span>);  <span class="cmt">// now correctly inside the if</span>
}</pre>
</div>

<div class="callout warning"><p>always use curly braces <code>{ }</code>, even for single-line if blocks. it takes two seconds and prevents a really sneaky class of bugs. real code review at WRT will flag missing braces. just make it a habit from day one.</p></div>

<h3 class="sub">a full robot decision tree</h3>

<p>here's a realistic decision tree that could live in an autonomous routine. read through it and make sure you can follow the logic step by step:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isEnabled      = <span class="kw">true</span>;
<span class="type">boolean</span> hasGamePiece   = <span class="kw">false</span>;
<span class="type">double</span>  distanceInches = <span class="num">30.0</span>;

<span class="cmt">// check the most blocking condition FIRST</span>
<span class="kw">if</span> (!isEnabled) {
    System.out.<span class="fn">println</span>(<span class="str">"DISABLED — doing nothing"</span>);

} <span class="kw">else if</span> (!hasGamePiece) {
    <span class="cmt">// enabled but no piece — intake is the job</span>
    System.out.<span class="fn">println</span>(<span class="str">"INTAKE — go pick up a piece"</span>);

} <span class="kw">else if</span> (distanceInches &gt; <span class="num">24.0</span>) {
    <span class="cmt">// enabled, has a piece, but too far</span>
    System.out.<span class="fn">println</span>(<span class="str">"DRIVE CLOSER — not in range yet"</span>);

} <span class="kw">else</span> {
    <span class="cmt">// enabled, has piece, in range — all conditions met</span>
    System.out.<span class="fn">println</span>(<span class="str">"SHOOT — all conditions met!"</span>);
}

<span class="cmt">// current values: enabled=true, hasGamePiece=false</span>
<span class="cmt">// output: "INTAKE — go pick up a piece"</span></pre>
</div>

<div class="callout tip"><p>notice that we check <code>!isEnabled</code> first. if the robot is disabled, nothing else matters — no point running through the rest of the logic. this pattern (handling the most blocking condition first, then progressively less critical ones) is how real robot code is structured. it reads like a priority list from most important to least.</p></div>

<h3 class="sub">Fill in the Blanks</h3>
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
    <span class="cmt">// What keyword runs when none of the if / else if conditions matched?</span><br>
    <input class="fill-blank" data-answer="else" placeholder="????"> { System.out.println("fallback"); }
  </div>
</div>
<div style="display:flex;align-items:center;gap:12px;margin-top:10px">
  <button class="btn btn-navy btn-sm" onclick="checkFills('fill-w2')">Check Answers</button>
  <span id="fill-w2-result" style="font-size:13px;font-weight:700;display:none"></span>
</div>

<h3 class="sub">Topic 2 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Robot State Checker</div><div class="ch-sub">Use if/else and booleans in an FRC scenario</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Start with these variables:<br><code>boolean isEnabled = true;</code><br><code>boolean hasGamePiece = false;</code><br><code>double distanceToTarget = 18.5;</code><br><br>Write an if/else chain that checks conditions in this exact order and prints the matching message:<br>1. not enabled → print <code>"Robot disabled"</code><br>2. no game piece → print <code>"Intake"</code><br>3. has piece but distance &gt; 24 → print <code>"Drive closer"</code><br>4. has piece and distance &lt;= 24 → print <code>"Shoot!"</code><br><br>With these starting values, which line should print?</p>
    <textarea class="code-input" placeholder="// Your code here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w2-t2')">Show Solution</button></div>
    <div id="sol-w2-t2" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isEnabled      = <span class="kw">true</span>;
<span class="type">boolean</span> hasGamePiece   = <span class="kw">false</span>;
<span class="type">double</span>  distanceToTarget = <span class="num">18.5</span>;

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

<h3 class="sub">Topic 2 — Quick Check</h3>
<div id="quiz-w2-t2"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-3">Switch Statements</h2>

<p>a switch is like a train track switch that routes trains to different tracks based on a signal. you tell it which track to route to, and it goes directly there — no checking all the other tracks along the way. it's an alternative to writing a huge chain of <code>if / else if / else if...</code> when you're testing one variable against a bunch of specific values.</p>

<p>think about a vending machine. you press B3 and get chips. press B4, get water. press B5, get a soda. the machine doesn't check "is the code greater than B2? is it less than B6?" — it just looks at what you pressed and jumps straight to that slot. that's a switch.</p>

<h3 class="sub">what even IS a switch statement?</h3>

<p>ok so here's the mental model. with if/else, you're running through a checklist one by one: check condition 1, nope, check condition 2, nope, check condition 3... you're evaluating multiple different expressions. a switch is different. you say "i have this ONE value, and i want to jump directly to whichever case matches." Java evaluates the variable once and routes to the matching case.</p>

<p><strong>why does it matter in FRC?</strong> robot code often has a concept of "states" — the robot is either INTAKING, SHOOTING, CLIMBING, or IDLE. when you want different behavior for each state, a switch is much cleaner than a chain of if/else-if. you can look at a switch and immediately see every possible state and what happens in each one. it's way more readable at a glance.</p>

<h3 class="sub">the syntax, line by line</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span> buttonID = <span class="num">2</span>;

<span class="kw">switch</span> (buttonID) {        <span class="cmt">// which variable are we routing on?</span>

    <span class="kw">case</span> <span class="num">1</span>:                <span class="cmt">// if buttonID == 1...</span>
        System.out.<span class="fn">println</span>(<span class="str">"Run intake"</span>);
        <span class="kw">break</span>;             <span class="cmt">// STOP HERE — exit the switch entirely</span>

    <span class="kw">case</span> <span class="num">2</span>:                <span class="cmt">// if buttonID == 2...</span>
        System.out.<span class="fn">println</span>(<span class="str">"Spin up shooter"</span>);
        <span class="kw">break</span>;             <span class="cmt">// stop — don't run any more cases</span>

    <span class="kw">case</span> <span class="num">3</span>:                <span class="cmt">// if buttonID == 3...</span>
        System.out.<span class="fn">println</span>(<span class="str">"Deploy climber"</span>);
        <span class="kw">break</span>;             <span class="cmt">// stop</span>

    <span class="kw">default</span>:               <span class="cmt">// if none of the cases matched...</span>
        System.out.<span class="fn">println</span>(<span class="str">"Unknown button"</span>);
        <span class="cmt">// no break needed at the end — it's the last case</span>
}

<span class="cmt">// buttonID is 2, so output: "Spin up shooter"</span></pre>
</div>

<p>let's break down every keyword:</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">switch</div><div class="cc-title">the variable to route on</div><div class="cc-desc"><code>switch (buttonID)</code> — you're telling Java "look at this variable and find which case matches its value."</div></div>
  <div class="concept-card"><div class="cc-label">case</div><div class="cc-title">a specific value to match</div><div class="cc-desc"><code>case 2:</code> — "if the variable equals 2, start running code from here." note the colon, not braces.</div></div>
  <div class="concept-card"><div class="cc-label">break</div><div class="cc-title">exit the switch</div><div class="cc-desc"><code>break;</code> — tells Java to stop and jump out of the switch block. without it, Java falls through into the next case (more on this below).</div></div>
  <div class="concept-card"><div class="cc-label">default</div><div class="cc-title">the fallback</div><div class="cc-desc">like else — runs if no case matched. optional but almost always a good idea so you handle unexpected values instead of silently ignoring them.</div></div>
</div>

<h3 class="sub">the fall-through gotcha (this WILL bite you)</h3>

<p>story time. you're writing a robot state machine — different behavior for INTAKING, SHOOTING, and CLIMBING. you write the switch, test button 2 (shooting)... and the robot runs the shooter AND deploys the climber. you look at the code for 10 minutes trying to figure out why. then you realize: you forgot <code>break</code>. this is called fall-through.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — BAD (missing break, fall-through bug)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span> buttonID = <span class="num">2</span>;

<span class="kw">switch</span> (buttonID) {
    <span class="kw">case</span> <span class="num">1</span>:
        System.out.<span class="fn">println</span>(<span class="str">"Run intake"</span>);
        <span class="cmt">// oops — no break here</span>
    <span class="kw">case</span> <span class="num">2</span>:
        System.out.<span class="fn">println</span>(<span class="str">"Spin up shooter"</span>);
        <span class="cmt">// oops — no break here either</span>
    <span class="kw">case</span> <span class="num">3</span>:
        System.out.<span class="fn">println</span>(<span class="str">"Deploy climber"</span>);
        <span class="cmt">// no break — falls into default too</span>
    <span class="kw">default</span>:
        System.out.<span class="fn">println</span>(<span class="str">"Unknown button"</span>);
}

<span class="cmt">// buttonID is 2, Java jumps to case 2...</span>
<span class="cmt">// no break, so falls into case 3...</span>
<span class="cmt">// no break, so falls into default...</span>
<span class="cmt">// output:</span>
<span class="cmt">// "Spin up shooter"</span>
<span class="cmt">// "Deploy climber"       &lt;-- unintended!!</span>
<span class="cmt">// "Unknown button"       &lt;-- unintended!!</span></pre>
</div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — GOOD (break in every case)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span> buttonID = <span class="num">2</span>;

<span class="kw">switch</span> (buttonID) {
    <span class="kw">case</span> <span class="num">1</span>:
        System.out.<span class="fn">println</span>(<span class="str">"Run intake"</span>);
        <span class="kw">break</span>;  <span class="cmt">// case 1 done, exit switch</span>
    <span class="kw">case</span> <span class="num">2</span>:
        System.out.<span class="fn">println</span>(<span class="str">"Spin up shooter"</span>);
        <span class="kw">break</span>;  <span class="cmt">// case 2 done, exit switch</span>
    <span class="kw">case</span> <span class="num">3</span>:
        System.out.<span class="fn">println</span>(<span class="str">"Deploy climber"</span>);
        <span class="kw">break</span>;  <span class="cmt">// case 3 done, exit switch</span>
    <span class="kw">default</span>:
        System.out.<span class="fn">println</span>(<span class="str">"Unknown button"</span>);
}
<span class="cmt">// output: "Spin up shooter"</span>
<span class="cmt">// only case 2 ran — correct!</span></pre>
</div>

<div class="callout danger"><p><strong>danger:</strong> fall-through is almost never what you want. when your robot accidentally deploys the climber because you forgot a <code>break</code> on the shooter case... yeah, that's a bad day at competition. always add <code>break</code> at the end of every case unless you intentionally want fall-through (which is rare and should be documented with a comment).</p></div>

<h3 class="sub">switch with Strings — robot state machines</h3>

<p>switch also works with <code>String</code> values, not just numbers. this is perfect for robot game states where you have named modes:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cls">String</span> robotState = <span class="str">"SHOOTING"</span>;

<span class="kw">switch</span> (robotState) {
    <span class="kw">case</span> <span class="str">"INTAKING"</span>:
        System.out.<span class="fn">println</span>(<span class="str">"running intake motors"</span>);
        <span class="kw">break</span>;

    <span class="kw">case</span> <span class="str">"SHOOTING"</span>:
        System.out.<span class="fn">println</span>(<span class="str">"spinning up flywheels"</span>);
        <span class="kw">break</span>;

    <span class="kw">case</span> <span class="str">"CLIMBING"</span>:
        System.out.<span class="fn">println</span>(<span class="str">"deploying hooks"</span>);
        <span class="kw">break</span>;

    <span class="kw">case</span> <span class="str">"IDLE"</span>:
        System.out.<span class="fn">println</span>(<span class="str">"stopped, waiting for command"</span>);
        <span class="kw">break</span>;

    <span class="kw">default</span>:
        System.out.<span class="fn">println</span>(<span class="str">"unknown state!"</span>);
}

<span class="cmt">// robotState = "SHOOTING"</span>
<span class="cmt">// output: "spinning up flywheels"</span></pre>
</div>

<div class="callout info"><p>in real WRT robot code you'd use an enum instead of a String for states (enums are a type we'll see later), but the switch logic is identical. the pattern is the same: one variable, many possible named values, each routes to its own behavior block.</p></div>

<h3 class="sub">switch vs if-else — when to use which</h3>

<p>they can often do the same thing, but each has a use case where it's clearly better:</p>

<table>
<thead><tr><th>Situation</th><th>Use</th><th>Reason</th></tr></thead>
<tbody>
<tr><td>One variable, many exact values (1, 2, 3 or "SHOOT", "INTAKE")</td><td>switch</td><td>Cleaner, reads like a menu, easier to add new cases</td></tr>
<tr><td>Checking ranges (speed > 0.5, distance &lt; 24)</td><td>if/else</td><td>Switch can't do ranges — cases must be exact values</td></tr>
<tr><td>Multiple variables combined with && / ||</td><td>if/else</td><td>Switch only works on one variable at a time</td></tr>
<tr><td>Complex boolean logic</td><td>if/else</td><td>Switch doesn't support arbitrary boolean expressions</td></tr>
</tbody>
</table>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — switch CANNOT do this (ranges)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// this is WRONG — switch cases can't use comparisons or ranges</span>
<span class="kw">switch</span> (speed) {
    <span class="kw">case</span> &gt; <span class="num">0.5</span>:  <span class="cmt">// COMPILE ERROR — not valid Java</span>
        ...
}

<span class="cmt">// correct — use if/else for range checks</span>
<span class="kw">if</span> (speed &gt; <span class="num">0.5</span>) {
    <span class="cmt">// this works fine</span>
}</pre>
</div>

<h3 class="sub">Fill in the Blanks — Switch</h3>
<div id="fill-w2-switch">
  <div class="fill-container">
    <span class="cmt">// what keyword starts a switch block?</span><br>
    <input class="fill-blank" data-answer="switch" placeholder="??????"> (gameState) { }
  </div>
  <div class="fill-container">
    <span class="cmt">// prevent fall-through — what goes at the end of each case?</span><br>
    <span class="kw">case</span> <span class="num">1</span>: doSomething(); <input class="fill-blank" data-answer="break" placeholder="?????">;
  </div>
  <div class="fill-container">
    <span class="cmt">// what keyword is the switch "else" fallback?</span><br>
    <input class="fill-blank" data-answer="default" placeholder="???????>">: System.out.println("unknown");
  </div>
</div>
<div style="display:flex;align-items:center;gap:12px;margin-top:10px">
  <button class="btn btn-navy btn-sm" onclick="checkFills('fill-w2-switch')">Check Answers</button>
  <span id="fill-w2-switch-result" style="font-size:13px;font-weight:700;display:none"></span>
</div>

<h3 class="sub">Topic 3 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Robot State Router</div><div class="ch-sub">Write a switch for a robot state machine</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Declare <code>String robotState = "SHOOTING";</code> and write a switch on it with four cases:<br>• <code>"INTAKING"</code> → print <code>"running intake"</code><br>• <code>"SHOOTING"</code> → print <code>"shooting game piece"</code><br>• <code>"CLIMBING"</code> → print <code>"deploying climber"</code><br>• default → print <code>"idle"</code><br><br>Run it with "SHOOTING", then change the value to "CLIMBING" and verify the right case runs. Don't forget <code>break;</code> after each case.</p>
    <textarea class="code-input" placeholder="// Write your code here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w2-t3')">Show Solution</button></div>
    <div id="sol-w2-t3" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cls">String</span> robotState = <span class="str">"SHOOTING"</span>;

<span class="kw">switch</span> (robotState) {
    <span class="kw">case</span> <span class="str">"INTAKING"</span>:
        System.out.<span class="fn">println</span>(<span class="str">"running intake"</span>);
        <span class="kw">break</span>;
    <span class="kw">case</span> <span class="str">"SHOOTING"</span>:
        System.out.<span class="fn">println</span>(<span class="str">"shooting game piece"</span>);
        <span class="kw">break</span>;
    <span class="kw">case</span> <span class="str">"CLIMBING"</span>:
        System.out.<span class="fn">println</span>(<span class="str">"deploying climber"</span>);
        <span class="kw">break</span>;
    <span class="kw">default</span>:
        System.out.<span class="fn">println</span>(<span class="str">"idle"</span>);
}
<span class="cmt">// output: "shooting game piece"</span></pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 3 — Quick Check</h3>
<div id="quiz-w2-t3"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-4">Ternary Operator</h2>

<p>the ternary operator is basically a one-line if/else. it's shorthand for a simple "yes or no, pick one of two values" decision. once you see it a few times you'll start using it constantly for quick, compact checks.</p>

<p>it's called "ternary" because it takes THREE operands: a condition, a value if true, and a value if false. most operators take one or two operands, so three is unusual — hence the special name.</p>

<h3 class="sub">what even IS the ternary operator?</h3>

<p>ok so imagine someone asks you "hey, do you want pizza or tacos?" and you just say "pizza" or "tacos" — a quick yes/no pick between two options. that's the ternary. instead of writing a whole if/else block to choose between two values, you write it on one line:</p>

<p>the format is: <code>condition ? valueIfTrue : valueIfFalse</code></p>

<p>read it as: "is the condition true? if yes, give me valueIfTrue. if no, give me valueIfFalse."</p>

<p><strong>why does it matter in FRC?</strong> you'll see ternaries constantly in robot code for compact value selection — picking a motor direction based on a flag, clamping a speed to 0 if disabled, selecting a string label for the dashboard. it keeps simple conditional assignments short and readable instead of taking up 5 lines for an if/else.</p>

<h3 class="sub">ternary vs if/else — they're equivalent</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isEnabled = <span class="kw">true</span>;

<span class="cmt">// if/else version — fine but takes 5 lines</span>
<span class="type">double</span> speed1;
<span class="kw">if</span> (isEnabled) {
    speed1 = <span class="num">0.8</span>;
} <span class="kw">else</span> {
    speed1 = <span class="num">0.0</span>;
}

<span class="cmt">// ternary version — same thing in one line</span>
<span class="type">double</span> speed2 = isEnabled ? <span class="num">0.8</span> : <span class="num">0.0</span>;
<span class="cmt">//                ^           ^      ^</span>
<span class="cmt">//          condition     if true   if false</span>

<span class="cmt">// both produce the same result: speed = 0.8 (isEnabled is true)</span></pre>
</div>

<p>let's annotate the syntax more carefully:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// general form:</span>
<span class="cmt">// result = condition ? valueIfTrue : valueIfFalse;</span>

<span class="type">boolean</span> isReversed = <span class="kw">true</span>;
<span class="type">double</span>  intakeSpeed = isReversed ? <span class="num">-0.5</span> : <span class="num">0.5</span>;
<span class="cmt">// isReversed is true, so intakeSpeed = -0.5</span>

<span class="type">boolean</span> hasGamePiece = <span class="kw">false</span>;
<span class="cls">String</span>  statusLabel = hasGamePiece ? <span class="str">"LOADED"</span> : <span class="str">"EMPTY"</span>;
<span class="cmt">// hasGamePiece is false, so statusLabel = "EMPTY"</span>

<span class="type">boolean</span> isAutoMode = <span class="kw">true</span>;
<span class="type">double</span>  driveSpeed = isAutoMode ? <span class="num">0.6</span> : <span class="num">1.0</span>;
<span class="cmt">// isAutoMode is true, so driveSpeed = 0.6 (slower in auto for precision)</span></pre>
</div>

<h3 class="sub">FRC examples — where ternary shines</h3>

<p>ternary is perfect for quick value selection in robot code. here are the patterns you'll actually see:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// clamp speed to 0 when disabled</span>
<span class="type">double</span> m_outputSpeed = isEnabled ? motorSpeed : <span class="num">0.0</span>;

<span class="cmt">// direction flag — run motor forward or backward</span>
<span class="type">double</span> direction = isReversed ? -<span class="num">1.0</span> : <span class="num">1.0</span>;
<span class="type">double</span> finalSpeed = baseSpeed * direction;

<span class="cmt">// dashboard label — compact string selection</span>
<span class="cls">String</span> pieceLabel = hasGamePiece ? <span class="str">"LOADED"</span> : <span class="str">"NO PIECE"</span>;

<span class="cmt">// return a default value if something's null (advanced usage)</span>
<span class="cls">String</span> autoName = (selectedAuto != <span class="kw">null</span>) ? selectedAuto : <span class="str">"Default Auto"</span>;</pre>
</div>

<h3 class="sub">the nested ternary gotcha (don't do this)</h3>

<p>ok so now that you know ternary exists, someone will show you that you can nest them — a ternary inside a ternary. resist this. it becomes completely unreadable almost immediately. here's what i mean:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — BAD (nested ternary, unreadable)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">double</span> distanceInches = <span class="num">18.0</span>;

<span class="cmt">// what does this even say?? you have to trace it for 30 seconds</span>
<span class="cls">String</span> action = distanceInches &lt; <span class="num">12.0</span> ? <span class="str">"TOO CLOSE"</span>
               : distanceInches &lt; <span class="num">24.0</span> ? <span class="str">"IN RANGE"</span>
               : <span class="str">"TOO FAR"</span>;

<span class="cmt">// technically works but nobody should write this — use if/else instead</span></pre>
</div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — GOOD (if/else for multi-branch logic)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">double</span> distanceInches = <span class="num">18.0</span>;

<span class="cls">String</span> action;
<span class="kw">if</span> (distanceInches &lt; <span class="num">12.0</span>) {
    action = <span class="str">"TOO CLOSE"</span>;
} <span class="kw">else if</span> (distanceInches &lt; <span class="num">24.0</span>) {
    action = <span class="str">"IN RANGE"</span>;      <span class="cmt">// 18.0 hits this case</span>
} <span class="kw">else</span> {
    action = <span class="str">"TOO FAR"</span>;
}
<span class="cmt">// clear, readable, easy to modify</span></pre>
</div>

<div class="callout warning"><p><strong>common gotcha:</strong> ternary is for simple two-option picks — use it when the logic is truly one line and immediately obvious. if you're nesting ternaries or the condition is getting complex, switch to if/else. code review will catch this. readability is more important than compactness.</p></div>

<h3 class="sub">Topic 4 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Compact Motor Direction</div><div class="ch-sub">Use ternary for quick value selection</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Start with these two booleans:<br><code>boolean isRunning = true;</code><br><code>boolean isReversed = false;</code><br><br>Using ternary operators only (no if/else allowed):<br>• <code>double intakeSpeed</code> — should be <code>0.7</code> if running, <code>0.0</code> if not<br>• <code>String directionLabel</code> — should be <code>"FORWARD"</code> if not reversed, <code>"REVERSE"</code> if reversed<br><br>Print both. Then flip <code>isRunning</code> to false, recalculate, and print again to check.</p>
    <textarea class="code-input" placeholder="// Write your code here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w2-t4')">Show Solution</button></div>
    <div id="sol-w2-t4" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isRunning  = <span class="kw">true</span>;
<span class="type">boolean</span> isReversed = <span class="kw">false</span>;

<span class="type">double</span>  intakeSpeed    = isRunning  ? <span class="num">0.7</span>         : <span class="num">0.0</span>;
<span class="cls">String</span>  directionLabel = isReversed ? <span class="str">"REVERSE"</span>   : <span class="str">"FORWARD"</span>;

System.out.<span class="fn">println</span>(<span class="str">"intakeSpeed: "</span>    + intakeSpeed);    <span class="cmt">// 0.7</span>
System.out.<span class="fn">println</span>(<span class="str">"directionLabel: "</span> + directionLabel); <span class="cmt">// FORWARD</span></pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 4 — Quick Check</h3>
<div id="quiz-w2-t4"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<div class="project-task" id="topic-6">
  <div class="pt-header">
    <div class="pt-icon"><i data-lucide="wrench"></i></div>
    <div class="pt-header-title">Project Task — Week 2</div>
    <div class="pt-filename">AutoLogic.java</div>
  </div>
  <div class="pt-body">
    <p>Create <code>AutoLogic.java</code> in your <code>minibot-project</code> folder. This class simulates autonomous decision making — the logic your robot uses when it's driving itself without a driver.</p>
    <ul>
      <li>Write a <code>static String decideAction(boolean hasGamePiece, double distanceInches, boolean isEnabled)</code> method</li>
      <li>Returns "DISABLED" if not enabled</li>
      <li>Returns "INTAKE" if no game piece</li>
      <li>Returns "DRIVE_CLOSER" if game piece held but distance > 24.0 inches</li>
      <li>Returns "SHOOT" if game piece held and distance &lt;= 24.0 inches</li>
      <li>Add a Javadoc comment above the method explaining each parameter</li>
      <li>Add a <code>main</code> method that tests all 4 cases with <code>System.out.println()</code></li>
    </ul>
    <span class="pt-note">save this file — you'll connect it to your subsystem classes in later weeks.</span>
  </div>
</div>

<h2 class="sh" id="topic-5">Knowledge Check</h2>
<div id="quiz-w2"></div>

<h2 class="sh" id="weekly-test">Weekly Test</h2>
<p>covers everything from week 2. a bit longer than topic quizzes and your score gets sent to the leads :) try without looking back first!!</p>
<div class="weekly-test-block">
  <div class="wt-header">
    <div class="wt-icon"><i data-lucide="clipboard-list"></i></div>
    <div>
      <div class="wt-title">week 2 test</div>
      <div class="wt-sub">booleans, logical operators, if/else, switch · 8 questions · good luck!!</div>
    </div>
  </div>
  <div id="test-summer-w2"></div>
</div>

<script>
// ── TOPIC 1 QUIZ: Booleans & Logical Operators ─────────────────
const quiz_w2_t1 = new Quiz('quiz-w2-t1', [
  { question: "What are the only two possible values a <code>boolean</code> variable can hold?", options: ["0 and 1","yes and no","true and false","on and off"], correct: 2, explanation: "booleans in Java are always exactly <code>true</code> or <code>false</code>. nothing in between. that's the whole type. 0 and 1 are integers, not booleans, even though they look similar." },
  { question: "What does <code>&&</code> (AND) require to return <code>true</code>?", options: ["At least one side is true","Both sides must be true","Neither side is true","Exactly one side is true"], correct: 1, explanation: "<code>&&</code> is AND — both sides must be true for the whole expression to come out true. if even one side is false, the whole thing is false. think of it as a two-key safety system - both keys need to turn." },
  { question: "What does <code>!isRunning</code> evaluate to when <code>isRunning = true</code>?", options: ["true","false","null","Compile error"], correct: 1, explanation: "<code>!</code> flips the boolean. <code>!true</code> = <code>false</code>. <code>!false</code> = <code>true</code>. when <code>isRunning</code> is <code>true</code>, <code>!isRunning</code> is <code>false</code>. super useful for guard conditions like <code>if (!isRunning) { start(); }</code>." },
  { question: "Which expression is true when speed is between 0.3 and 0.8?", options: ["speed > 0.3 || speed < 0.8","speed > 0.3 && speed < 0.8","speed == 0.3 && speed == 0.8","!(speed < 0.3 && speed > 0.8)"], correct: 1, explanation: "you need BOTH conditions true at the same time - speed more than 0.3 AND less than 0.8. that's <code>&&</code>. if you used <code>||</code> (OR), almost any number would satisfy it since almost everything is either > 0.3 or < 0.8." }
], 'summer-w2');

// ── TOPIC 2 QUIZ: If / Else ─────────────────────────────────────
const quiz_w2_t2 = new Quiz('quiz-w2-t2', [
  { question: "What happens when Java reaches an <code>if</code> whose condition is <code>false</code>?", options: ["It crashes","It runs the if block anyway","It skips the if block entirely","It asks the user for input"], correct: 2, explanation: "when the condition is false, Java skips the entire if block and moves on. if there's an else, that runs instead. nothing inside the if block executes at all." },
  { question: "In an if / else if / else chain, how many blocks run at most?", options: ["All of them","None of them","Exactly one","It depends on the conditions"], correct: 2, explanation: "exactly one block runs. Java checks conditions top to bottom and runs the FIRST one that's true, then jumps past the rest. if none are true, the else block runs (if one exists)." },
  { question: "Why should you check <code>isEnabled</code> first in a robot decision tree?", options: ["It runs faster","The compiler requires it","It gates everything else — if disabled, nothing else matters","It's a WPILib requirement"], correct: 2, explanation: "if the robot is disabled, there's no point checking any other condition. putting the most important gate first means you handle the critical case immediately and the rest of the logic only runs when it should." },
  { question: "What bug does <code>if (x = 5)</code> introduce compared to <code>if (x == 5)</code>?", options: ["Compile error always","x gets set to 5 instead of compared — wrong behavior","x gets set to 0","The if block never runs"], correct: 1, explanation: "single <code>=</code> is assignment — it sets x to 5. double <code>==</code> is comparison — it asks 'is x equal to 5?' using assignment inside an if is a subtle bug that can be really hard to spot. always use <code>==</code> for comparisons." }
], 'summer-w2');

// ── TOPIC 3 QUIZ: Switch Statements ────────────────────────────
const quiz_w2_t3 = new Quiz('quiz-w2-t3', [
  { question: "What happens in a switch statement if you forget <code>break</code>?", options: ["Nothing — break is optional","Compile error","Fall-through: execution continues into the next case","The switch restarts from the top"], correct: 2, explanation: "without break, Java falls through into the next case and executes it too, even though it didn't match. then it falls into the next one, and the next. this almost always a bug. always include break at the end of each case." },
  { question: "Which of these is a valid reason to choose switch over if-else?", options: ["You need to check if a number is greater than 50","You need multiple variables compared","One variable maps to many exact fixed values","You need to combine && and || conditions"], correct: 2, explanation: "switch shines when one variable matches against specific exact values — like button IDs (1, 2, 3) or named states ('SHOOTING', 'INTAKING'). for ranges like speed > 0.5 or complex boolean logic, use if-else." },
  { question: "What does the <code>default</code> case do in a switch?", options: ["It always runs first","It runs when none of the cases matched","It prevents fall-through","It stops the switch from running"], correct: 1, explanation: "<code>default</code> is the switch equivalent of <code>else</code> — it runs when no case matched the variable's value. it's optional but good practice so unexpected values are handled instead of silently ignored." },
  { question: "Can a switch statement check ranges like <code>speed > 0.5</code>?", options: ["Yes, using case > 0.5:","Only in newer versions of Java","No — switch cases must be exact values","Yes, with a special syntax"], correct: 2, explanation: "nope! switch cases must be exact, fixed values (like 1, 2, 3 or \"SHOOT\", \"INTAKE\"). you can't write <code>case > 0.5:</code> — that's a compile error. use if-else when you need ranges or comparisons." }
], 'summer-w2');

// ── TOPIC 4 QUIZ: Ternary Operator ─────────────────────────────
const quiz_w2_t4 = new Quiz('quiz-w2-t4', [
  { question: "What does <code>boolean isReady = true; double speed = isReady ? 0.8 : 0.0;</code> set speed to?", options: ["0.0","0.8","true","Compile error"], correct: 1, explanation: "the ternary evaluates the condition first. isReady is true, so speed gets the true-branch value, which is 0.8. if isReady were false, speed would be 0.0." },
  { question: "What is the format of a ternary expression?", options: ["condition ? valueIfFalse : valueIfTrue","condition : valueIfTrue ? valueIfFalse","condition ? valueIfTrue : valueIfFalse","if (condition) valueIfTrue else valueIfFalse"], correct: 2, explanation: "ternary format is always: <code>condition ? valueIfTrue : valueIfFalse</code>. the question mark separates the condition from the values, the colon separates true from false. read it as 'is condition true? use this : or use this'." },
  { question: "When should you NOT use a ternary operator?", options: ["When picking between two speeds","When assigning a direction label","When nesting multiple conditions together","When checking if a boolean is true"], correct: 2, explanation: "nested ternaries are nearly unreadable. if you need to pick from 3 or more options based on multiple conditions, use if-else instead. ternary is great for simple two-option picks, terrible for complex multi-branch logic." },
  { question: "What is <code>String label = hasGamePiece ? \"LOADED\" : \"EMPTY\";</code> equivalent to?", options: ["switch on hasGamePiece","An if/else that assigns 'LOADED' if true, 'EMPTY' if false","A boolean that is true when loaded","A method call that returns hasGamePiece"], correct: 1, explanation: "the ternary is exactly equivalent to: <code>if (hasGamePiece) { label = \"LOADED\"; } else { label = \"EMPTY\"; }</code>. it's just a more compact way to write that same logic on one line." }
], 'summer-w2');

// ── TOPIC COMBINED QUIZ ─────────────────────────────────────────
const quiz_w2 = new Quiz('quiz-w2', [
  { question: "What does <code>&&</code> require to return true?", options: ["At least one side is true","Both sides must be true","Neither side is true","Exactly one side is true"], correct: 1, explanation: "<code>&&</code> is AND — both sides must be true for the whole expression to be true. if either side is false, the whole thing is false. it's like a two-key safety lock." },
  { question: "What does <code>!isRunning</code> evaluate to when <code>isRunning = true</code>?", options: ["true","false","null","Compile error"], correct: 1, explanation: "<code>!</code> flips the boolean. <code>!true = false</code>. this is used constantly for guard conditions: <code>if (!isRunning) { start(); }</code>. when isRunning is true, !isRunning is false, so the start() block would be skipped." },
  { question: "What happens in a switch statement if you forget <code>break</code>?", options: ["Nothing — break is optional","Compile error","Fall-through: execution continues into the next case","The switch restarts"], correct: 2, explanation: "without break, Java falls through into the next case and executes it too, even if it didn't match. this is almost always a bug. for example, if buttonID is 2 but case 2 has no break, Java will also run case 3 and case 4." },
  { question: "Which expression is true when speed is between 0.3 and 0.8?", options: ["speed > 0.3 || speed < 0.8","speed > 0.3 && speed < 0.8","speed == 0.3 && speed == 0.8","!(speed < 0.3 && speed > 0.8)"], correct: 1, explanation: "use && to require both conditions simultaneously. you need the speed to be more than 0.3 AND less than 0.8. OR would be wrong — almost everything satisfies 'greater than 0.3 OR less than 0.8', which is nearly every number." },
  { question: "Which is true about if-else vs switch?", options: ["Switch can handle ranges like speed > 0.5","If-else can only handle integers","Switch is cleaner for many fixed values of one variable; if-else handles ranges and complex conditions","They're identical in capability"], correct: 2, explanation: "switch is great when one variable maps to many exact values like button IDs or enum states. if-else handles anything -- ranges, multiple variables, complex boolean logic. knowing when to use each one is a key skill." }
], 'summer-w2');

// ── WEEK 2 TEST ───────────────────────────────────────────────
const test_w2 = new Quiz('test-summer-w2', [
  { question: "What does <code>||</code> (OR) return when both sides are false?", options: ["true","false","null","Compile error"], correct: 1, explanation: "OR returns true if at least one side is true. if both sides are false, there is no true side to carry the result, so the whole expression is false. true || false = true. false || false = false." },
  { question: "In robot code, you want to check if the robot is enabled AND has a game piece. Which is correct?", options: ["isEnabled || hasGamePiece","isEnabled && hasGamePiece","!isEnabled && hasGamePiece","isEnabled != hasGamePiece"], correct: 1, explanation: "you need BOTH conditions true at the same time, so you use <code>&&</code> (AND). OR would run if only one of them is true, which isn't what you want. you need enabled AND piece — both." },
  { question: "What does <code>!isAtTarget</code> mean?", options: ["isAtTarget is null","isAtTarget is true","isAtTarget is false (the value gets flipped)","Compile error"], correct: 2, explanation: "<code>!</code> is the NOT operator — it flips the boolean. if isAtTarget is false, !isAtTarget evaluates to true. if isAtTarget is true, !isAtTarget evaluates to false. you read it as 'not at target'." },
  { question: "A switch statement without a <code>break</code> at the end of a case will...", options: ["Stop at the end of that case","Jump to the default case","Fall through into the next case","Throw a runtime error"], correct: 2, explanation: "fall-through!! without break, Java keeps executing into the next case regardless of whether it matched. so if buttonID is 2 and case 2 has no break, Java will also run case 3, case 4, and so on until it hits a break or the end of the switch." },
  { question: "Which if-else structure correctly checks if robot is disabled first?", options: ["if (!hasGamePiece) {} else if (!isEnabled) {}","if (!isEnabled) {} else if (!hasGamePiece) {}","if (isEnabled) {} else {}","switch(isEnabled) { case true: }"], correct: 1, explanation: "check isEnabled first since it gate-keeps everything else. if the robot is disabled, nothing else matters — no point checking for game pieces or distance. <code>if (!isEnabled)</code> handles the disabled case first, then the rest of the logic runs only when enabled." },
  { question: "What is the result of <code>true && false</code>?", options: ["true","false","null","1"], correct: 1, explanation: "AND requires both sides to be true. true && false = false because the second side is false. both sides must be true for && to return true. only true && true = true." },
  { question: "What is the result of <code>true || false</code>?", options: ["true","false","null","1"], correct: 0, explanation: "OR requires at least one side to be true. true || false = true because the first side is true. OR only returns false when BOTH sides are false. here, one side is true, so the whole expression is true." },
  { question: "When is a switch statement preferred over if-else?", options: ["When you need to check ranges (speed > 0.5)","When one variable maps to many exact fixed values","When you have complex boolean logic","When you need multiple variables compared"], correct: 1, explanation: "switch shines when one variable has many exact values to check -- like button IDs (1, 2, 3) or state strings ('SHOOTING', 'INTAKING', 'CLIMBING'). for ranges and complex logic involving multiple variables or && / || conditions, use if-else." }
], 'summer-w2-test');
</script>
