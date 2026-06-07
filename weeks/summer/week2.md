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
prev_url: /weeks/summer/week1
prev_title: "Week 1 — The Basics"
next_url: /weeks/summer/week3
next_title: "Week 3 — Loops"
---

<h2 class="sh" id="topic-1">Booleans &amp; Logical Operators</h2>

<p>A boolean is the simplest piece of information in computing. It can only be two things: <code>true</code> or <code>false</code>. That's it. Like a light switch - on or off. Nothing in between.</p>

<p>That might sound too simple to be useful, but booleans are actually the backbone of everything a robot does. Every decision the robot makes - every "should I do this right now?" question - is a boolean under the hood. Is the robot allowed to move right now? Is the intake holding something? Has the shooter wheel spun up to the right speed? All booleans. All the time.</p>

<h3 class="sub">declaring a boolean</h3>

<p>you already saw <code>boolean</code> as a type in week 1. here's a reminder of what it looks like and some real FRC examples:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// a boolean can only be true or false — that's the whole type</span>
<span class="type">boolean</span> isEnabled     = <span class="kw">true</span>;   <span class="cmt">// is the robot allowed to move right now?</span>
<span class="type">boolean</span> hasGamePiece  = <span class="kw">false</span>;  <span class="cmt">// is the intake holding something?</span>
<span class="type">boolean</span> isAtSpeed     = <span class="kw">false</span>;  <span class="cmt">// has the shooter wheel spun up?</span>
<span class="type">boolean</span> isAtTarget    = <span class="kw">true</span>;   <span class="cmt">// is the robot aimed at the goal?</span>

<span class="cmt">// booleans are also what comparisons return</span>
<span class="type">double</span> speed = <span class="num">0.85</span>;
<span class="type">boolean</span> isFast = speed > <span class="num">0.5</span>;  <span class="cmt">// true — speed is greater than 0.5</span>
<span class="type">boolean</span> isSlow = speed < <span class="num">0.3</span>;  <span class="cmt">// false — speed is NOT less than 0.3</span></pre>
</div>

<div class="callout info"><p>notice how boolean variable names usually start with "is" or "has" - like <code>isEnabled</code>, <code>hasGamePiece</code>, <code>isAtSpeed</code>. this is a naming convention almost everyone uses because it reads like a yes/no question. "is the robot enabled?" - yes, true. it just makes the code way more readable.</p></div>

<h3 class="sub">comparison operators - making booleans from math</h3>

<p>you can create a boolean by comparing two numbers. these comparisons all return either <code>true</code> or <code>false</code>:</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">==</div><div class="cc-title">equals</div><div class="cc-desc"><code>x == 5</code> — is x equal to 5? (two equals signs, NOT one!)</div></div>
  <div class="concept-card"><div class="cc-label">!=</div><div class="cc-title">not equals</div><div class="cc-desc"><code>x != 5</code> — is x something other than 5?</div></div>
  <div class="concept-card"><div class="cc-label">&lt; and &gt;</div><div class="cc-title">less / greater</div><div class="cc-desc"><code>speed &gt; 0.5</code> — is speed more than 0.5? returns true or false.</div></div>
  <div class="concept-card"><div class="cc-label">&lt;= and &gt;=</div><div class="cc-title">less/greater or equal</div><div class="cc-desc"><code>distance &lt;= 24.0</code> — is distance 24 or less? includes the boundary.</div></div>
</div>

<div class="callout danger"><p><strong>the #1 beginner bug: <code>=</code> vs <code>==</code></strong><br>one equals sign (<code>=</code>) means assignment - you're setting a value. two equals signs (<code>==</code>) means comparison - you're asking if two things are equal. writing <code>if (x = 5)</code> instead of <code>if (x == 5)</code> is a bug. it won't always cause a compile error but it will give you completely wrong behavior. always double-check this.</p></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h3 class="sub">logical operators - combining booleans</h3>

<p>what if you need to check more than one thing at once? that's what logical operators are for. you can combine booleans together to make more powerful conditions.</p>

<p>there are three: <code>&amp;&amp;</code> (AND), <code>||</code> (OR), and <code>!</code> (NOT). let's go through each one with a real story.</p>

<h3 class="sub">&amp;&amp; (AND) - both must be true</h3>

<p>imagine you want to shoot a game piece into the goal. you can only shoot if you HAVE a game piece AND the robot is close enough. if either one is false - no piece, or too far away - you can't shoot. both conditions must be true at the same time.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> hasGamePiece    = <span class="kw">true</span>;
<span class="type">boolean</span> isCloseEnough   = <span class="kw">false</span>;

<span class="cmt">// && means BOTH must be true</span>
<span class="type">boolean</span> canShoot = hasGamePiece &amp;&amp; isCloseEnough;
<span class="cmt">// canShoot = false — because isCloseEnough is false</span>
<span class="cmt">// even though hasGamePiece is true, it doesn't matter</span>
<span class="cmt">// both sides MUST be true for && to give true</span></pre>
</div>

<p>here's the full truth table for <code>&amp;&amp;</code>. a truth table just shows every possible combination of inputs and what you get out:</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">true &amp;&amp; true</div><div class="cc-title">= true</div><div class="cc-desc">both sides are true, so AND is true. robot has piece AND is close. shoot!</div></div>
  <div class="concept-card"><div class="cc-label">true &amp;&amp; false</div><div class="cc-title">= false</div><div class="cc-desc">one side is false. has piece but NOT close enough. can't shoot yet.</div></div>
  <div class="concept-card"><div class="cc-label">false &amp;&amp; true</div><div class="cc-title">= false</div><div class="cc-desc">other side is false. close enough but NO piece. can't shoot.</div></div>
  <div class="concept-card"><div class="cc-label">false &amp;&amp; false</div><div class="cc-title">= false</div><div class="cc-desc">both are false. no piece AND not close. definitely can't shoot.</div></div>
</div>

<h3 class="sub">|| (OR) - at least one must be true</h3>

<p>now imagine the intake motor. you want it to run if either driver button A OR driver button B is pressed. you don't care which one - if either is pressed, run the intake. that's OR.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> buttonA = <span class="kw">false</span>;
<span class="type">boolean</span> buttonB = <span class="kw">true</span>;

<span class="cmt">// || means AT LEAST ONE must be true</span>
<span class="type">boolean</span> runIntake = buttonA || buttonB;
<span class="cmt">// runIntake = true — because buttonB is true</span>
<span class="cmt">// even though buttonA is false, that's okay</span>
<span class="cmt">// OR only needs ONE side to be true</span></pre>
</div>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">true || true</div><div class="cc-title">= true</div><div class="cc-desc">both are true. either button works. run intake.</div></div>
  <div class="concept-card"><div class="cc-label">true || false</div><div class="cc-title">= true</div><div class="cc-desc">first side is true. button A pressed. run intake.</div></div>
  <div class="concept-card"><div class="cc-label">false || true</div><div class="cc-title">= true</div><div class="cc-desc">second side is true. button B pressed. run intake.</div></div>
  <div class="concept-card"><div class="cc-label">false || false</div><div class="cc-title">= false</div><div class="cc-desc">neither button is pressed. don't run intake.</div></div>
</div>

<h3 class="sub">! (NOT) - flip it</h3>

<p><code>!</code> just flips a boolean. true becomes false, false becomes true. it's useful when you want to say "if this thing is NOT happening."</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isShooterRunning = <span class="kw">false</span>;

<span class="cmt">// ! flips the value</span>
<span class="type">boolean</span> shouldStartShooter = !isShooterRunning;
<span class="cmt">// shouldStartShooter = true</span>
<span class="cmt">// "if the shooter is NOT running, we should start it"</span>

<span class="cmt">// !true = false</span>
<span class="cmt">// !false = true</span>
<span class="cmt">// that's the whole thing</span></pre>
</div>

<div class="callout tip"><p>you'll see <code>!</code> constantly in robot code. things like <code>if (!isEnabled)</code>, <code>if (!hasGamePiece)</code>, <code>if (!isAtTarget)</code>. it reads naturally - "if NOT enabled," "if NOT holding a piece," "if NOT at the target." super useful for guard conditions (blocking things from happening when they shouldn't).</p></div>

<h3 class="sub">combining multiple operators</h3>

<p>you can chain all three together to build complex conditions. let's say the robot should only shoot if it's enabled, has a game piece, AND is not already at the target (no need to shoot if you're already there):</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isEnabled    = <span class="kw">true</span>;
<span class="type">boolean</span> hasGamePiece = <span class="kw">true</span>;
<span class="type">boolean</span> isAtTarget   = <span class="kw">false</span>;

<span class="cmt">// all three conditions must be met</span>
<span class="type">boolean</span> shouldShoot = isEnabled &amp;&amp; hasGamePiece &amp;&amp; !isAtTarget;
<span class="cmt">// shouldShoot = true</span>
<span class="cmt">// enabled? yes. has piece? yes. NOT already at target? yes (isAtTarget is false, !false = true)</span>

<span class="cmt">// you can also mix && and ||, but use parentheses to be clear</span>
<span class="type">boolean</span> shouldIntake = isEnabled &amp;&amp; (!hasGamePiece || isAtTarget);
<span class="cmt">// run intake if enabled AND (either: no piece yet, OR at target and can cycle)</span></pre>
</div>

<h3 class="sub">short-circuit evaluation</h3>

<p>here's something interesting about how Java handles <code>&amp;&amp;</code> and <code>||</code>: it's lazy. it only checks as much as it needs to.</p>

<p>with <code>&amp;&amp;</code>, if the first part is <code>false</code>, Java immediately knows the whole thing is <code>false</code> (since both sides need to be true). it doesn't even look at the second part. this is called short-circuit evaluation.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isEnabled   = <span class="kw">false</span>;
<span class="type">boolean</span> hasTarget   = <span class="kw">true</span>;

<span class="cmt">// Java sees isEnabled is false first</span>
<span class="cmt">// it STOPS RIGHT THERE and returns false</span>
<span class="cmt">// it never even checks hasTarget</span>
<span class="type">boolean</span> result = isEnabled &amp;&amp; hasTarget; <span class="cmt">// false, short-circuited</span>

<span class="cmt">// same with || — if the first part is true, Java stops</span>
<span class="cmt">// it already knows the result is true, no need to check the rest</span>
<span class="type">boolean</span> result2 = isEnabled || hasTarget; <span class="cmt">// true, stopped after hasTarget</span></pre>
</div>

<div class="callout info"><p>short-circuit evaluation is actually really useful in advanced code - you can put the "cheapest" check first so Java doesn't bother running the expensive one if it doesn't have to. not critical right now, but good to know it exists.</p></div>

<h3 class="sub">Topic 1 - Quick Check</h3>
<div id="quiz-w2-t1"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-2">If / Else</h2>

<p>if/else is how your program makes decisions. every decision your robot makes is an if/else somewhere inside. honestly if/else is like 80% of programming, it's that important lol.</p>

<p>the idea is simple: "IF this condition is true, run this code. ELSE (otherwise), run this other code." Java reads your program line by line, and when it hits an <code>if</code>, it checks the condition. if the condition is <code>true</code>, it runs the block inside the braces. if the condition is <code>false</code>, it skips that block entirely.</p>

<h3 class="sub">the simplest possible example</h3>

<p>before we get to robots, here's a completely basic example so you can see exactly what's happening:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isSunny = <span class="kw">true</span>;

<span class="kw">if</span> (isSunny) {
    <span class="cmt">// this block runs ONLY if isSunny is true</span>
    System.out.<span class="fn">println</span>(<span class="str">"wear sunglasses"</span>);
}

<span class="cmt">// if isSunny was false, the println above would be skipped completely</span>
<span class="cmt">// Java would just jump to here and keep going</span></pre>
</div>

<p>now let's add an <code>else</code> - what to do when the condition is false:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isSunny = <span class="kw">false</span>;

<span class="kw">if</span> (isSunny) {
    System.out.<span class="fn">println</span>(<span class="str">"wear sunglasses"</span>);
} <span class="kw">else</span> {
    <span class="cmt">// this runs when isSunny is false</span>
    System.out.<span class="fn">println</span>(<span class="str">"grab an umbrella"</span>);
}

<span class="cmt">// output: "grab an umbrella"</span>
<span class="cmt">// the if block was skipped, the else block ran</span></pre>
</div>

<h3 class="sub">else if - checking multiple conditions</h3>

<p>sometimes you need more than two outcomes. <code>else if</code> lets you chain conditions: "if this... otherwise if this other thing... otherwise..."</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">double</span> distanceInches = <span class="num">18.5</span>;

<span class="kw">if</span> (distanceInches &lt; <span class="num">12.0</span>) {
    <span class="cmt">// runs if distance is less than 12 inches</span>
    System.out.<span class="fn">println</span>(<span class="str">"Too close — stop!"</span>);
} <span class="kw">else if</span> (distanceInches &lt; <span class="num">24.0</span>) {
    <span class="cmt">// runs if distance is between 12 and 24 inches</span>
    <span class="cmt">// (we already know it's NOT less than 12 because that was checked first)</span>
    System.out.<span class="fn">println</span>(<span class="str">"In range — score!"</span>);
} <span class="kw">else</span> {
    <span class="cmt">// runs if none of the above conditions were true</span>
    <span class="cmt">// meaning distance is 24 or more</span>
    System.out.<span class="fn">println</span>(<span class="str">"Too far — drive closer"</span>);
}

<span class="cmt">// distanceInches is 18.5</span>
<span class="cmt">// first check: 18.5 < 12.0? no, skip</span>
<span class="cmt">// second check: 18.5 < 24.0? YES — prints "In range — score!"</span>
<span class="cmt">// the else block is skipped because we already found a true condition</span></pre>
</div>

<div class="callout tip"><p>once Java finds a condition that's true in an if/else chain, it runs that block and jumps PAST all the remaining else if and else blocks. it doesn't keep checking. that's why order matters - put the most specific checks first.</p></div>

<h3 class="sub">how Java reads an if/else chain, step by step</h3>

<p>let's slow down and walk through exactly what Java is doing. take this example:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span> score = <span class="num">75</span>;

<span class="kw">if</span> (score >= <span class="num">90</span>) {        <span class="cmt">// step 1: is 75 >= 90? NO. skip this block.</span>
    System.out.<span class="fn">println</span>(<span class="str">"A"</span>);
} <span class="kw">else if</span> (score >= <span class="num">80</span>) { <span class="cmt">// step 2: is 75 >= 80? NO. skip this block.</span>
    System.out.<span class="fn">println</span>(<span class="str">"B"</span>);
} <span class="kw">else if</span> (score >= <span class="num">70</span>) { <span class="cmt">// step 3: is 75 >= 70? YES! run this block.</span>
    System.out.<span class="fn">println</span>(<span class="str">"C"</span>);  <span class="cmt">// this runs</span>
} <span class="kw">else</span> {                    <span class="cmt">// step 4: skipped — we already found our match above</span>
    System.out.<span class="fn">println</span>(<span class="str">"F"</span>);
}

<span class="cmt">// output: C</span></pre>
</div>

<h3 class="sub">nested if/else - an if inside an if</h3>

<p>you can put an if/else inside another if/else. this is called nesting. you do this when you need to check a second condition only after the first one passes:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isEnabled   = <span class="kw">true</span>;
<span class="type">boolean</span> hasGamePiece = <span class="kw">true</span>;
<span class="type">double</span> distanceInches = <span class="num">20.0</span>;

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

<span class="cmt">// output: "Shoot!" (enabled, has piece, within 24 inches)</span></pre>
</div>

<p>notice the indentation - each nested level is indented one more time. this is super important for readability. the indentation shows you which if/else belongs to which outer block. if your indentation is a mess, your code is a mess.</p>

<h3 class="sub">the braces debate - single-line ifs</h3>

<p>technically, if your if block only has one line inside it, you can skip the curly braces:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// this works but is considered risky</span>
<span class="kw">if</span> (isEnabled)
    System.out.<span class="fn">println</span>(<span class="str">"robot is enabled"</span>);

<span class="cmt">// the DANGER: if you add a second line later, thinking it's inside the if...</span>
<span class="kw">if</span> (isEnabled)
    System.out.<span class="fn">println</span>(<span class="str">"robot is enabled"</span>);
    System.out.<span class="fn">println</span>(<span class="str">"running motors"</span>);  <span class="cmt">// ALWAYS runs!! not inside the if!</span>

<span class="cmt">// the indentation LOOKS like it's inside the if, but Java ignores indentation</span>
<span class="cmt">// only the first line after the if is conditional. the second always runs.</span>
<span class="cmt">// just use braces every time to avoid this gotcha</span></pre>
</div>

<div class="callout warning"><p>always use curly braces <code>{ }</code>, even for single-line if blocks. it takes two seconds and prevents a really sneaky class of bugs. real code review at WRT will flag missing braces. just make it a habit.</p></div>

<h3 class="sub">putting it together - a full robot decision tree</h3>

<p>here's a realistic decision tree that could live in an autonomous routine. read through it and make sure you can follow the logic:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">boolean</span> isEnabled      = <span class="kw">true</span>;
<span class="type">boolean</span> hasGamePiece   = <span class="kw">false</span>;
<span class="type">double</span>  distanceInches = <span class="num">30.0</span>;

<span class="cmt">// always check the "gate" condition first</span>
<span class="kw">if</span> (!isEnabled) {
    System.out.<span class="fn">println</span>(<span class="str">"DISABLED — doing nothing"</span>);

} <span class="kw">else if</span> (!hasGamePiece) {
    <span class="cmt">// enabled but no piece — intake is our job</span>
    System.out.<span class="fn">println</span>(<span class="str">"INTAKE — go pick up a piece"</span>);

} <span class="kw">else if</span> (distanceInches &gt; <span class="num">24.0</span>) {
    <span class="cmt">// has a piece but too far — drive closer</span>
    System.out.<span class="fn">println</span>(<span class="str">"DRIVE CLOSER — not in range yet"</span>);

} <span class="kw">else</span> {
    <span class="cmt">// enabled, has piece, in range — shoot!</span>
    System.out.<span class="fn">println</span>(<span class="str">"SHOOT — all conditions met!"</span>);
}

<span class="cmt">// current values: enabled, no game piece</span>
<span class="cmt">// output: "INTAKE — go pick up a piece"</span></pre>
</div>

<div class="callout tip"><p>notice that we use <code>!isEnabled</code> at the top to handle the "disabled" case early and get it out of the way. this pattern - checking the most blocking condition first - is common and makes your code easier to read. if it's disabled, nothing else matters, so deal with it immediately.</p></div>

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

<h3 class="sub">Coding Challenge</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Robot State Checker</div><div class="ch-sub">Use if/else and booleans in an FRC scenario</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Given: <code>boolean isEnabled = true</code>, <code>boolean hasGamePiece = false</code>, <code>double distanceToTarget = 18.5</code> (inches).<br><br>Write an if/else chain that prints: "Robot disabled" if not enabled, "Intake" if no game piece, "Drive closer" if piece held but distance &gt; 24, and "Shoot!" if piece held and distance &lt;= 24. Check isEnabled first.</p>
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

<h3 class="sub">Topic 2 - Quick Check</h3>
<div id="quiz-w2-t2"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-3">Switch Statements</h2>

<p>a switch is like a menu. you pick one option based on a value, and Java jumps straight to that option. it's an alternative to writing a huge chain of <code>if / else if / else if / else if...</code> when you're checking one variable against a bunch of specific values.</p>

<p>think about a vending machine. you press B3 and get chips. you press B4 and get water. you press B5 and get a soda. the machine doesn't check "is it greater than B2? is it less than B6?" - it just looks at what you pressed and goes directly to that slot. that's a switch.</p>

<h3 class="sub">the syntax, line by line</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span> buttonID = <span class="num">2</span>;

<span class="kw">switch</span> (buttonID) {        <span class="cmt">// which variable are we switching on?</span>

    <span class="kw">case</span> <span class="num">1</span>:                <span class="cmt">// if buttonID == 1...</span>
        System.out.<span class="fn">println</span>(<span class="str">"Run intake"</span>);
        <span class="kw">break</span>;             <span class="cmt">// STOP HERE — don't fall into the next case</span>

    <span class="kw">case</span> <span class="num">2</span>:                <span class="cmt">// if buttonID == 2...</span>
        System.out.<span class="fn">println</span>(<span class="str">"Spin up shooter"</span>);
        <span class="kw">break</span>;             <span class="cmt">// stop</span>

    <span class="kw">case</span> <span class="num">3</span>:                <span class="cmt">// if buttonID == 3...</span>
        System.out.<span class="fn">println</span>(<span class="str">"Deploy climber"</span>);
        <span class="kw">break</span>;             <span class="cmt">// stop</span>

    <span class="kw">default</span>:               <span class="cmt">// if none of the cases matched...</span>
        System.out.<span class="fn">println</span>(<span class="str">"Unknown button"</span>);
        <span class="cmt">// no break needed at the end — it's the last case</span>
}

<span class="cmt">// buttonID is 2, so output: "Spin up shooter"</span></pre>
</div>

<p>let's break down each keyword:</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">switch</div><div class="cc-title">the variable to check</div><div class="cc-desc"><code>switch (buttonID)</code> — you're telling Java "look at this variable and find which case matches."</div></div>
  <div class="concept-card"><div class="cc-label">case</div><div class="cc-title">a specific value to match</div><div class="cc-desc"><code>case 2:</code> — "if the variable equals 2, run from here." note the colon, not braces.</div></div>
  <div class="concept-card"><div class="cc-label">break</div><div class="cc-title">exit the switch</div><div class="cc-desc"><code>break;</code> — tells Java to stop and jump out of the switch. without it, Java falls through into the next case.</div></div>
  <div class="concept-card"><div class="cc-label">default</div><div class="cc-title">the fallback</div><div class="cc-desc">like else — runs if no case matched. optional but usually a good idea to include it.</div></div>
</div>

<h3 class="sub">the fall-through bug (this WILL get you)</h3>

<p>forgetting <code>break</code> is one of the most common switch mistakes. here's exactly what happens:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — what happens without break</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span> buttonID = <span class="num">2</span>;

<span class="kw">switch</span> (buttonID) {
    <span class="kw">case</span> <span class="num">1</span>:
        System.out.<span class="fn">println</span>(<span class="str">"Run intake"</span>);
        <span class="cmt">// NO BREAK HERE</span>
    <span class="kw">case</span> <span class="num">2</span>:
        System.out.<span class="fn">println</span>(<span class="str">"Spin up shooter"</span>);
        <span class="cmt">// NO BREAK HERE EITHER</span>
    <span class="kw">case</span> <span class="num">3</span>:
        System.out.<span class="fn">println</span>(<span class="str">"Deploy climber"</span>);
        <span class="cmt">// still no break</span>
    <span class="kw">default</span>:
        System.out.<span class="fn">println</span>(<span class="str">"Unknown button"</span>);
}

<span class="cmt">// buttonID is 2, so Java jumps to case 2...</span>
<span class="cmt">// ...but there's no break, so it falls into case 3...</span>
<span class="cmt">// ...still no break, falls into default</span>
<span class="cmt">// output:</span>
<span class="cmt">// "Spin up shooter"</span>
<span class="cmt">// "Deploy climber"</span>
<span class="cmt">// "Unknown button"</span>
<span class="cmt">// that's not what you wanted!!</span></pre>
</div>

<div class="callout danger"><p>fall-through is almost always a bug. when your robot accidentally deploys the climber because you forgot a <code>break</code> on the shooter case... yeah. that's a bad day at competition. always add <code>break</code> at the end of every case unless you INTENTIONALLY want fall-through (very rare).</p></div>

<h3 class="sub">switch with Strings</h3>

<p>switch also works with <code>String</code> values, not just numbers. this is useful for robot game states:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">String</span> robotState = <span class="str">"SHOOTING"</span>;

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
    <span class="kw">default</span>:
        System.out.<span class="fn">println</span>(<span class="str">"idle"</span>);
}

<span class="cmt">// output: "spinning up flywheels"</span></pre>
</div>

<h3 class="sub">switch vs if-else - when to use which</h3>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">use switch when...</div><div class="cc-title">one variable, many exact values</div><div class="cc-desc">you're checking one variable against specific values like 1, 2, 3 or "INTAKE", "SHOOT". switch is cleaner and easier to read here.</div></div>
  <div class="concept-card"><div class="cc-label">use if-else when...</div><div class="cc-title">ranges or complex logic</div><div class="cc-desc">you need <code>speed &gt; 0.5</code>, or checking multiple variables, or using && / ||. switch can't do ranges or complex boolean conditions.</div></div>
</div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — switch can NOT do this</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// this is WRONG — switch cases can't use ranges or comparisons</span>
<span class="kw">switch</span> (speed) {
    <span class="kw">case</span> > <span class="num">0.5</span>:   <span class="cmt">// COMPILE ERROR — can't do this in switch</span>
        ...
}

<span class="cmt">// use if-else for ranges instead</span>
<span class="kw">if</span> (speed > <span class="num">0.5</span>) {
    <span class="cmt">// this works fine</span>
}</pre>
</div>

<h3 class="sub">Fill in the Blanks - Switch</h3>
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

<h3 class="sub">Topic 3 - Quick Check</h3>
<div id="quiz-w2-t3"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<div class="project-task">
  <div class="pt-header">
    <div class="pt-icon"><i data-lucide="wrench"></i></div>
    <div class="pt-header-title">Project Task — Week 2</div>
    <div class="pt-filename">AutoLogic.java</div>
  </div>
  <div class="pt-body">
    <p>Create <code>AutoLogic.java</code>. This class simulates autonomous decision making — the logic the robot uses when it's driving itself.</p>
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

<h2 class="sh">Knowledge Check</h2>
<div id="quiz-w2"></div>

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
