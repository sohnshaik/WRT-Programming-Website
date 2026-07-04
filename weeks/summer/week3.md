---
layout: week
title: "Loops"
subtitle: "for loops, foreach loops, and the very important reason while loops are banned from robot code :D"
badge: "Summer · Week 3 of 8"
phase: summer
phase_label: Summer
week_label: Week 3
page_id: summer-w3
weekly_test: true
topics:
  - For Loops
  - Foreach Loops
  - While Loops & Why They're Banned
  - Loop Visualizer
  - Fill in the Blanks
  - Knowledge Check
  - Coding Challenge
  - Project Task
prev_url: /weeks/summer/week2
prev_title: "Week 2 — Logic & Control Flow"
next_url: /weeks/summer/week4
next_title: "Week 4 — Arrays & Methods"
---

<h2 class="sh" id="topic-1">For Loops</h2>

<p>ok so imagine your teacher gives you a punishment: write the sentence "I will not throw a gear across the shop" 10 times. you COULD write it out 10 separate times — copy paste it, tab over, repeat. or you could just say "do this 10 times" and let something handle the repetition automatically. that's literally what a loop is. it takes a piece of code and runs it over and over without you writing it out each time.</p>

<p>the <code>for</code> loop is the workhorse. it's what you'll reach for the most in Java, and especially in FRC code. it's built for situations where you know (or can figure out) exactly how many times you want to loop — like "go through all 4 drive motors" or "check each of the 8 sensor readings" or "process every module in my swerve drive (swerve is a drivetrain where each wheel can spin and rotate independently, letting the robot move in any direction without turning first)." when the count is known, <code>for</code> is your guy.</p>

<h3 class="sub">the for loop anatomy</h3>

<p>picture a factory assembly line. a conveyor belt carries items past a worker, one at a time. the worker does the exact same job on each item — inspect it, stamp it, move it on. there's a counter keeping track of how many items have been processed. when the counter hits the target number, the belt stops. that's a for loop: a counter, a job to do, and a stopping condition.</p>

<p>in code, the "item on the belt" is whatever index you're currently at. the "job" is the code inside the curly braces. the "stopping condition" is the check that decides whether to keep going or quit. you write all three of those pieces right there in the loop header, and Java takes care of the rest.</p>

<p>here's why this matters in real robot code: your swerve drive has 4 modules. you'll need to configure each one. you COULD write 4 separate blocks of code — one for each module. but if you ever need to change how configuration works, you'd have to change it in 4 places. with a loop, you change it once. modularity is everything in a codebase that 15 people are maintaining.</p>

<h3 class="sub">the three parts of a for loop</h3>

<p>a for loop has three pieces crammed into one line, separated by semicolons. here's what each one does and when it runs:</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Init</div><div class="cc-title">int i = 0</div><div class="cc-desc">runs exactly ONCE, at the very start, before anything else. this is where you create your counter variable. almost always starts at 0 — you'll see why in a second.</div></div>
  <div class="concept-card"><div class="cc-label">Condition</div><div class="cc-title">i &lt; 5</div><div class="cc-desc">checked before EVERY single iteration. if it's true, run the body. if it's false, stop and exit the loop. this is your "should i keep going?" check.</div></div>
  <div class="concept-card"><div class="cc-label">Step</div><div class="cc-title">i++</div><div class="cc-desc">runs after EVERY iteration, right before the condition gets checked again. this is how your counter moves. <code>i++</code> adds 1, <code>i--</code> subtracts 1, <code>i += 2</code> skips every other.</div></div>
</div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// the anatomy of a for loop</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; <span class="num">5</span>; i++) {
    <span class="cmt">// everything in here runs 5 times</span>
    System.out.<span class="fn">println</span>(<span class="str">"Iteration: "</span> + i);
}
<span class="cmt">//  ^--- init     ^----- condition  ^-- step</span>
<span class="cmt">// after the loop, i is gone — it only exists inside the loop header + body</span></pre>
</div>

<h3 class="sub">step-by-step execution trace</h3>

<p>the order of what runs when is not obvious just from reading the syntax, so let's trace through it manually. this is something you should do in your head whenever a loop is confusing you.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — trace this with me</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; <span class="num">4</span>; i++) {
    System.out.<span class="fn">println</span>(<span class="str">"i is: "</span> + i);
}

<span class="cmt">// Here's exactly what Java does, in order:</span>
<span class="cmt">// Step 1: init runs once  → i = 0</span>
<span class="cmt">// Step 2: check condition → is 0 < 4?  YES → run body → prints "i is: 0"</span>
<span class="cmt">// Step 3: step runs       → i++ → i is now 1</span>
<span class="cmt">// Step 4: check condition → is 1 < 4?  YES → run body → prints "i is: 1"</span>
<span class="cmt">// Step 5: step runs       → i++ → i is now 2</span>
<span class="cmt">// Step 6: check condition → is 2 < 4?  YES → run body → prints "i is: 2"</span>
<span class="cmt">// Step 7: step runs       → i++ → i is now 3</span>
<span class="cmt">// Step 8: check condition → is 3 < 4?  YES → run body → prints "i is: 3"</span>
<span class="cmt">// Step 9: step runs       → i++ → i is now 4</span>
<span class="cmt">// Step 10: check condition → is 4 < 4? NO  → EXIT LOOP</span>
<span class="cmt">// Final output: "i is: 0", "i is: 1", "i is: 2", "i is: 3"</span></pre>
</div>

<p>notice the step ALWAYS runs before the condition check — not after. and the condition check ALWAYS happens before the body runs. this order matters. if you forget it, loops with tricky conditions will break in ways you won't expect.</p>

<h3 class="sub">wait — why does it start at 0?</h3>

<p>computers count from 0, not 1. this is called <strong>zero-indexing</strong> and it shows up everywhere in programming. arrays, lists, loops — they all start at 0. if you want to run a loop 5 times, you go 0, 1, 2, 3, 4 (not 1, 2, 3, 4, 5). once you get used to it, it feels natural. for now just memorize the pattern:</p>

<div class="callout tip"><p><strong>the pattern to memorize:</strong> <code>for (int i = 0; i &lt; N; i++)</code> runs exactly N times. i goes from 0 to N-1. this is the most common loop you'll ever write. if you want to run something 10 times, use <code>i &lt; 10</code>. want 4 times? <code>i &lt; 4</code>. start at 0, use strictly-less-than.</p></div>

<h3 class="sub">FRC example — iterating over swerve modules</h3>

<p>here's where this actually matters in robot code. a swerve drivetrain has 4 modules (each of the 4 corners of the robot; each module has a drive wheel and a steering mechanism): front-left, front-right, back-left, back-right. when you initialize the drive system, you need to configure each module. instead of copying the same code 4 times:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span>[] driveMotorIDs = {<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>}; <span class="cmt">// front-left, front-right, back-left, back-right</span>
<span class="type">int</span>[] steerMotorIDs = {<span class="num">5</span>, <span class="num">6</span>, <span class="num">7</span>, <span class="num">8</span>};

<span class="cmt">// configure all 4 modules in one loop instead of 4 separate blocks</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; driveMotorIDs.length; i++) {
    System.out.<span class="fn">println</span>(<span class="str">"Configuring module "</span> + i
        + <span class="str">": drive="</span> + driveMotorIDs[i]
        + <span class="str">", steer="</span> + steerMotorIDs[i]);
    <span class="cmt">// in real code: swerveModules[i].configure(driveMotorIDs[i], steerMotorIDs[i]);</span>
}
<span class="cmt">// driveMotorIDs.length is 4, so i goes 0, 1, 2, 3</span>
<span class="cmt">// if you add a 5th module later, the loop automatically adjusts — zero maintenance</span></pre>
</div>

<div class="callout info"><p><code>array.length</code> gives you the number of elements in an array. using it in your loop condition instead of a hardcoded number is good practice — if you add or remove elements later, the loop automatically adjusts. hardcoded numbers in loops are a maintenance trap.</p></div>

<h3 class="sub">loops that count down or skip</h3>

<p>the three-part format is flexible. you can count backwards, skip every other number, count by 5s — whatever you need. the key insight is that init, condition, and step are completely independent. you define the behavior you want:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// count DOWN from 5 to 1 (like a launch countdown)</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">5</span>; i &gt; <span class="num">0</span>; i--) {
    System.out.<span class="fn">println</span>(i); <span class="cmt">// prints 5, 4, 3, 2, 1</span>
}

<span class="cmt">// step by 2 — only even numbers</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; <span class="num">10</span>; i += <span class="num">2</span>) {
    System.out.<span class="fn">println</span>(i); <span class="cmt">// prints 0, 2, 4, 6, 8</span>
}

<span class="cmt">// backwards through an array — last element first</span>
<span class="type">int</span>[] ids = {<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>};
<span class="kw">for</span> (<span class="type">int</span> i = ids.length - <span class="num">1</span>; i &gt;= <span class="num">0</span>; i--) {
    System.out.<span class="fn">println</span>(ids[i]); <span class="cmt">// prints 4, 3, 2, 1</span>
    <span class="cmt">// start at index 3 (length-1), go DOWN to 0 inclusive</span>
}</pre>
</div>

<p>that backwards loop is worth understanding. <code>ids.length - 1</code> gives the index of the last element (since arrays are zero-indexed, a 4-element array has valid indices 0, 1, 2, 3 — the last is 3 = length-1). and we use <code>&gt;= 0</code> as the condition because we still want to process index 0.</p>

<h3 class="sub">the off-by-one gotcha (this WILL bite you)</h3>

<p>story time: the single most common bug in any kind of loop-based code is the off-by-one error. it's exactly what it sounds like — you're off by one iteration. either the loop runs once too many times, or once too few. and the worst part is that it often doesn't crash — it just produces slightly wrong output that's hard to notice until something breaks at the worst possible moment.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — the bad version</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span>[] swerveModules = {<span class="num">0</span>, <span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>}; <span class="cmt">// 4 elements, indices 0-3</span>

<span class="cmt">// BAD: <= length instead of < length</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt;= swerveModules.length; i++) {
    System.out.<span class="fn">println</span>(swerveModules[i]); <span class="cmt">// CRASH when i = 4!</span>
}
<span class="cmt">// when i = 4, swerveModules[4] doesn't exist</span>
<span class="cmt">// Java throws ArrayIndexOutOfBoundsException — match over</span></pre>
</div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — the fix</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span>[] swerveModules = {<span class="num">0</span>, <span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>};

<span class="cmt">// CORRECT: strictly less than, not less-than-or-equal</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; swerveModules.length; i++) {
    System.out.<span class="fn">println</span>(swerveModules[i]); <span class="cmt">// i goes 0, 1, 2, 3 — all valid</span>
}
<span class="cmt">// the rule: i < length (not <=) when accessing array indices from 0</span></pre>
</div>

<div class="callout warning"><p><strong>the rule to remember:</strong> <code>i &lt; array.length</code> is almost always what you want. <code>i &lt;= array.length</code> goes one past the end and crashes. one character difference. super easy to typo. when a loop crashes with ArrayIndexOutOfBoundsException, this is the first thing you check.</p></div>

<div class="callout danger"><p><strong>infinite loop:</strong> if the condition NEVER becomes false, the loop runs forever and your program freezes. example: <code>for (int i = 0; i &gt;= 0; i++)</code> — i starts at 0 and only goes up, so <code>i &gt;= 0</code> is always true. no exit. in a desktop program this just locks up your app. in robot code this is worse — keep reading the while loop section for why.</p></div>

<h3 class="sub">Topic 1 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">For Loop Fundamentals</div><div class="ch-sub">build a loop that processes motor IDs</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Start with: <code>int[] motorIDs = {10, 20, 30, 40, 50};</code><br><br>Write a for loop that goes through every element. For each motor:<br>• print a line like <code>"Motor 0: ID 10"</code> — the number is the index, the ID is the array value<br>• if the ID is greater than 35, also print: <code>"Motor X: ID Y — HIGH ID, check wiring"</code><br><br>Which motors in this array should trigger the warning?</p>
    <textarea class="code-input" placeholder="// Write your code here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w3-t1')">Show Solution</button></div>
    <div id="sol-w3-t1" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span>[] motorIDs = {<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>, <span class="num">40</span>, <span class="num">50</span>};

<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; motorIDs.length; i++) {
    System.out.<span class="fn">print</span>(<span class="str">"Motor "</span> + i + <span class="str">": ID "</span> + motorIDs[i]);
    <span class="kw">if</span> (motorIDs[i] &gt; <span class="num">35</span>) {
        System.out.<span class="fn">println</span>(<span class="str">" — HIGH ID, check wiring"</span>);
    } <span class="kw">else</span> {
        System.out.<span class="fn">println</span>(); <span class="cmt">// just a newline</span>
    }
}
<span class="cmt">// Output:</span>
<span class="cmt">// Motor 0: ID 10</span>
<span class="cmt">// Motor 1: ID 20</span>
<span class="cmt">// Motor 2: ID 30</span>
<span class="cmt">// Motor 3: ID 40 — HIGH ID, check wiring</span>
<span class="cmt">// Motor 4: ID 50 — HIGH ID, check wiring</span></pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 1 — Quick Check</h3>
<div id="quiz-w3-t1"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-2">Foreach Loops</h2>

<p>the regular for loop says "go through positions 0, 1, 2, 3 and give me the thing at each spot." it needs you to manage an index variable, check the length, all of that. the foreach loop says something simpler: "give me each thing in this collection, one at a time. i don't need to know what position it's at." when all you're doing is reading each value, foreach is cleaner and harder to mess up.</p>

<p>you'll use foreach constantly in FRC code for things like reading sensor arrays, logging subsystem states, or checking a list of conditions. any time you're going front-to-back through a collection and don't need the index, foreach is the move.</p>

<h3 class="sub">foreach — cleaner iteration</h3>

<p>think of a teacher taking attendance. she doesn't call out "student number 0, student number 1" — she just goes "for each student in this room, call their name." she doesn't care about the position. she just wants to hit every person, one at a time, from start to finish. that's a foreach loop.</p>

<p>in Java, the foreach is written with a colon instead of semicolons. you name the type and a variable that will hold the current element, then put the collection after the colon. each pass through the loop, that variable gets the next element automatically. no counter, no index, no length check.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// syntax: for (type variableName : collectionToLoopThrough)</span>
<span class="type">double</span>[] speeds = {<span class="num">0.5</span>, <span class="num">0.75</span>, <span class="num">1.0</span>, <span class="num">-0.5</span>};

<span class="kw">for</span> (<span class="type">double</span> speed : speeds) {
    <span class="cmt">// 'speed' is automatically each element, one per iteration</span>
    System.out.<span class="fn">println</span>(<span class="str">"Speed: "</span> + speed);
}
<span class="cmt">// reads as: "for each double called 'speed' in the 'speeds' array, do this"</span>
<span class="cmt">// prints: Speed: 0.5 / Speed: 0.75 / Speed: 1.0 / Speed: -0.5</span></pre>
</div>

<p>read it out loud: "for each double called speed in speeds." that's exactly what it does. no counting, no indexing, no off-by-one risk. Java handles the iteration behind the scenes.</p>

<h3 class="sub">foreach vs regular for — same task, two ways</h3>

<p>both of these do the same thing. use this comparison to see exactly what foreach is saving you from writing:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — two ways to do the same thing</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">double</span>[] sensorReadings = {<span class="num">12.4</span>, <span class="num">13.1</span>, <span class="num">11.8</span>, <span class="num">14.0</span>};

<span class="cmt">// regular for loop — need to manage index, length, and access manually</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; sensorReadings.length; i++) {
    System.out.<span class="fn">println</span>(sensorReadings[i]);
}

<span class="cmt">// foreach — cleaner when you only need the value, not the index</span>
<span class="kw">for</span> (<span class="type">double</span> reading : sensorReadings) {
    System.out.<span class="fn">println</span>(reading);
}</pre>
</div>

<p>both do the same thing. the foreach version has fewer things that can go wrong — no off-by-one, no length check mistake, no accidental wrong index. when you're reviewing code at 11pm before a competition, that matters.</p>

<h3 class="sub">the copy gotcha — this WILL confuse you</h3>

<p>here's the catch with foreach, and it's important enough to dedicate a whole section to. the foreach variable is a <em>copy</em> of each element, not the actual slot in the array. if you change it, you're changing the copy. the original array stays exactly the same.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — the foreach gotcha</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">double</span>[] speeds = {<span class="num">0.5</span>, <span class="num">0.75</span>, <span class="num">1.0</span>};

<span class="cmt">// WRONG — looks like it scales everything by 0.8, but it doesn't</span>
<span class="kw">for</span> (<span class="type">double</span> speed : speeds) {
    speed = speed * <span class="num">0.8</span>; <span class="cmt">// modifies the LOCAL copy of 'speed' — NOT speeds[i]</span>
}
System.out.<span class="fn">println</span>(speeds[<span class="num">0</span>]); <span class="cmt">// still 0.5 — nothing changed in the array!</span>

<span class="cmt">// CORRECT — use a regular for loop to write back to the array</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; speeds.length; i++) {
    speeds[i] = speeds[i] * <span class="num">0.8</span>; <span class="cmt">// writes to the actual array slot</span>
}
System.out.<span class="fn">println</span>(speeds[<span class="num">0</span>]); <span class="cmt">// now 0.4 — correctly changed</span></pre>
</div>

<div class="callout warning"><p><strong>foreach gotcha:</strong> the foreach variable is a copy of each primitive value, not a reference to the original slot. modifying it does nothing to the array. use a regular for loop whenever you need to write back to the array.</p></div>

<p>this trips people up even after years of experience. the mental model that helps: foreach is "read mode." you're visiting each element to look at it. if you want to edit it, you need to use a regular for loop so you have the index to write back with.</p>

<h3 class="sub">when to use which loop type</h3>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Use Foreach</div><div class="cc-title">Reading values</div><div class="cc-desc">printing, summing, finding max/min, checking conditions. you just need to look at each value and don't need to know its position. cleaner and safer.</div></div>
  <div class="concept-card"><div class="cc-label">Use Regular For</div><div class="cc-title">Writing values</div><div class="cc-desc">when you need to modify elements in place (<code>arr[i] = ...</code>). foreach gives you a copy — you need the index to actually write back to the array.</div></div>
  <div class="concept-card"><div class="cc-label">Use Regular For</div><div class="cc-title">Need the index</div><div class="cc-desc">when you need to know "which position am i at?" — like printing "index 2 failed" or comparing adjacent elements. foreach hides the index.</div></div>
  <div class="concept-card"><div class="cc-label">Use Regular For</div><div class="cc-title">Backwards or skipping</div><div class="cc-desc">foreach always goes forward, one element at a time. if you need to iterate in reverse, skip elements, or step by 2, regular for is your only option.</div></div>
</div>

<h3 class="sub">FRC example — reading all sensor values</h3>

<p>this is exactly what foreach is made for. you want to scan every sensor in an array and react to what you see. no need for the index — you just need each value:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">double</span>[] distanceSensors_in = {<span class="num">14.2</span>, <span class="num">9.8</span>, <span class="num">22.1</span>, <span class="num">11.5</span>};

<span class="type">double</span> total = <span class="num">0.0</span>;
<span class="type">int</span> warningCount = <span class="num">0</span>;

<span class="cmt">// foreach is perfect here — just reading, no writes, no index needed</span>
<span class="kw">for</span> (<span class="type">double</span> dist : distanceSensors_in) {
    total += dist; <span class="cmt">// accumulate for average</span>
    <span class="kw">if</span> (dist &lt; <span class="num">12.0</span>) {
        System.out.<span class="fn">println</span>(<span class="str">"Warning: obstacle close at "</span> + dist + <span class="str">" in"</span>);
        warningCount++;
    }
}

<span class="type">double</span> avg = total / distanceSensors_in.length;
System.out.<span class="fn">println</span>(<span class="str">"Average distance: "</span> + avg + <span class="str">" in"</span>);
System.out.<span class="fn">println</span>(<span class="str">"Warnings triggered: "</span> + warningCount);</pre>
</div>

<h3 class="sub">Topic 2 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Sensor Array Scanner</div><div class="ch-sub">use foreach to analyze readings</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Start with: <code>double[] voltages = {11.8, 12.4, 9.1, 12.7, 10.5, 12.1};</code><br><br>Use a foreach loop (not a regular for loop) to go through every voltage. Inside the loop:<br>• add each voltage to a running total<br>• if the voltage is below 11.0, increment a warning counter<br><br>After the loop, print the total sum and how many low-battery warnings there were.<br><br>Hint: declare <code>double total = 0;</code> and <code>int warnings = 0;</code> before the loop.</p>
    <textarea class="code-input" placeholder="// Write your code here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w3-t2')">Show Solution</button></div>
    <div id="sol-w3-t2" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">double</span>[] voltages = {<span class="num">11.8</span>, <span class="num">12.4</span>, <span class="num">9.1</span>, <span class="num">12.7</span>, <span class="num">10.5</span>, <span class="num">12.1</span>};
<span class="type">double</span> total = <span class="num">0</span>;
<span class="type">int</span> warnings = <span class="num">0</span>;

<span class="kw">for</span> (<span class="type">double</span> v : voltages) {
    total += v;
    <span class="kw">if</span> (v &lt; <span class="num">11.0</span>) warnings++;
}

System.out.<span class="fn">println</span>(<span class="str">"Total: "</span> + total);
System.out.<span class="fn">println</span>(<span class="str">"Low battery warnings: "</span> + warnings);
<span class="cmt">// Total: 70.7</span>
<span class="cmt">// Low battery warnings: 1  (only 9.1 is below 11.0)</span></pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 2 — Quick Check</h3>
<div id="quiz-w3-t2"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-3">While Loops &amp; Why They're Banned</h2>

<p>ok, we need to have a talk. while loops are a perfectly normal, fundamental part of Java. you'll use them in regular desktop and console programs. they're not bad. but in FRC robot code, they are effectively banned from periodic methods — and it's not an arbitrary rule somebody made up. it comes from a real, documented failure mode that has actually ended robots' matches at real competitions. let's understand what a while loop is, why it's useful normally, and why it's so dangerous in robot code specifically.</p>

<h3 class="sub">while loops — and why they're banned</h3>

<p>imagine doing dishes. you stand at the sink and keep washing while there are still dirty dishes. you don't know in advance how many dishes there are — you just keep going until there aren't any left. that's a while loop: you don't know the count up front, so you keep looping as long as some condition is true.</p>

<p>for loops are for "do this exactly N times." while loops are for "do this until something changes." that distinction is what makes while loops useful in certain contexts — specifically, when you genuinely don't know how many iterations you'll need.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// basic while loop — same structure as a for loop, just more explicit</span>
<span class="type">int</span> count = <span class="num">0</span>;
<span class="kw">while</span> (count &lt; <span class="num">5</span>) {
    System.out.<span class="fn">println</span>(count);
    count++; <span class="cmt">// YOU are responsible for moving the counter — easy to forget!</span>
}
<span class="cmt">// prints 0, 1, 2, 3, 4 — same result as a for loop</span></pre>
</div>

<p>notice: unlike a for loop, the counter variable lives OUTSIDE the loop. the step is inside the body — YOU have to remember to write it. a for loop's structure forces you to handle all three pieces (init, condition, step) right there in the header. a while loop doesn't. this is why forgetting the step in a while loop is one of the most common bugs beginners write.</p>

<h3 class="sub">when while loops are fine (and actually good)</h3>

<p>in a console program running on a normal computer, while loops are super natural. here are real use cases where they're the right tool:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — fine in normal programs</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// keep asking until valid input — you don't know how many tries it takes</span>
<span class="kw">while</span> (!userHasEnteredValidInput) {
    <span class="fn">promptUserForInput</span>();
}

<span class="cmt">// game loop — keep playing until the player quits</span>
<span class="kw">while</span> (!playerHasQuit) {
    <span class="fn">updateGame</span>();
    <span class="fn">renderFrame</span>();
}

<span class="cmt">// read lines from a file until we hit the end</span>
<span class="kw">while</span> (scanner.<span class="fn">hasNextLine</span>()) {
    <span class="cls">String</span> line = scanner.<span class="fn">nextLine</span>();
    <span class="fn">processLine</span>(line);
}</pre>
</div>

<p>all of these are totally fine on a regular computer. the program just... waits. nobody cares. your desktop app isn't going to explode if it blocks for a second. but this exact pattern is what kills robots at competition.</p>

<h3 class="sub">the FRC problem — the 20ms loop</h3>

<p>here's what you need to understand about how FRC robots actually run. your robot's control loop runs on a 20 millisecond cycle. every 20ms, WPILib (the FRC framework) calls your code to say "hey, update yourself." it reads the latest joystick input from the driver station (the laptop at the driver's station running the FRC Driver Station software -- it connects wirelessly to the robot), updates motor commands, reads sensors, updates dashboards — all of that runs 50 times per second, like clockwork.</p>

<p>the framework EXPECTS your code to run fast and return control within that 20ms window. run, return. run, return. over and over. every piece of your robot's responsiveness — joystick response, motor updates, safety checks — depends on your code completing quickly every single cycle and handing control back.</p>

<div class="callout danger"><p><strong>here's what a while loop does to this.</strong> your periodic method gets called. inside it, there's a <code>while (!atTarget) { move(); }</code>. Java starts running the while loop. the target isn't reached yet, so it loops. again. again. still looping. 20ms pass. 40ms. 100ms. the framework can't get control back because your while loop has it. motors stop being commanded because nobody is calling them. the driver pushes the joystick and nothing happens. the system logs a warning. then the watchdog fires.</p></div>

<h3 class="sub">the watchdog — the robot's dead-man's switch</h3>

<p>the watchdog is a safety timer built into WPILib. if your code doesn't return control to the framework within a few hundred milliseconds, the watchdog assumes something is catastrophically wrong and automatically disables the robot. it cuts motor output. everything stops. the robot goes limp.</p>

<p>this is actually the RIGHT call — a frozen, unresponsive robot on a field with other robots and field elements is genuinely dangerous. but it means your robot just became a paperweight in the middle of a match because your while loop was waiting for a sensor that took too long to settle.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — BANNED in robot periodic methods</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// DO NOT DO THIS inside any periodic method in robot code</span>
<span class="kw">public void</span> <span class="fn">teleopPeriodic</span>() {
    <span class="cmt">// this blocks the 20ms cycle until the encoder reaches target</span>
    <span class="cmt">// if the encoder is slow or stuck, this runs forever</span>
    <span class="cmt">// the watchdog fires, the robot disables mid-match</span>
    <span class="kw">while</span> (!arm.<span class="fn">isAtTarget</span>()) {
        arm.<span class="fn">driveToTarget</span>(); <span class="cmt">// BAD: blocks the entire framework</span>
    }
}

<span class="cmt">// the right pattern for "keep doing this until something happens" is</span>
<span class="cmt">// a state machine that checks once per cycle and returns immediately</span>
<span class="cmt">// you'll learn state machines in Phase 2 — for now, just know: no while loops</span></pre>
</div>

<h3 class="sub">a real story — while loops at competition</h3>

<p>this isn't hypothetical. during a regional qualification match, a team's autonomous (the 15-second period at the start of a match where the robot runs without driver input) routine had a while loop waiting for an arm encoder to reach a target position. the encoder was slow to settle due to mechanical slop in the gearbox. the while loop kept running. 50ms. 100ms. 200ms. the watchdog fired. the robot disabled for the rest of the auto period.</p>

<p>when teleop (teleop = the 2-minute driver-controlled period of the match) started, the robot was oriented the wrong direction because auto never finished. it drove forward and immediately hit a field element. the team got a foul. they missed playoffs by one match. one while loop. one competition. don't be that team.</p>

<div class="callout warning"><p><strong>to be fair:</strong> while loops are completely fine in the console programs this course has you build. the ban is specific to FRC robot periodic methods where the 20ms cycle is sacred. you'll write plenty of while loops this course — just never inside <code>teleopPeriodic()</code>, <code>autonomousPeriodic()</code>, or any method that runs on the robot's loop.</p></div>

<div class="callout info"><p><strong>what to use instead in robot code:</strong> when you need "keep doing this until something happens" behavior, the answer is state machines and the WPILib Command-Based framework. your state machine checks conditions once per 20ms cycle and decides what to do next — it never blocks. you'll learn Command-Based programming in Phase 2 and it will make total sense once you've seen why blocking loops are a problem.</p></div>

<h3 class="sub">the infinite loop gotcha</h3>

<p>the most classic while loop mistake is forgetting to update the condition variable, creating an infinite loop that never exits. with a for loop, the step is right there in the header — you have to write it. with a while loop, nothing reminds you:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — the infinite loop mistake</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// BAD — forgot to increment count, loops forever</span>
<span class="type">int</span> count = <span class="num">0</span>;
<span class="kw">while</span> (count &lt; <span class="num">5</span>) {
    System.out.<span class="fn">println</span>(count);
    <span class="cmt">// oops — forgot count++ here</span>
    <span class="cmt">// count stays 0 forever, 0 < 5 is always true, program freezes</span>
}

<span class="cmt">// FIXED</span>
<span class="type">int</span> count = <span class="num">0</span>;
<span class="kw">while</span> (count &lt; <span class="num">5</span>) {
    System.out.<span class="fn">println</span>(count);
    count++; <span class="cmt">// now count moves toward the exit condition</span>
}</pre>
</div>

<p>if your console program hangs and won't respond, 9 times out of 10 you have an infinite loop. check your while loop conditions and make sure something inside the loop is actually moving toward making the condition false.</p>

<h3 class="sub">Topic 3 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Console Input Validator</div><div class="ch-sub">a while loop that's perfectly fine on a computer</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Write a while loop that counts up from 1 and keeps going until it finds the first number divisible by both 3 and 7.<br><br>• start with <code>int n = 1;</code><br>• each iteration: print the current value of <code>n</code>, then add 1<br>• the loop condition should keep running while <code>n</code> is NOT divisible by both 3 and 7<br>• after the loop, print <code>"Found it: " + n</code><br><br>What number should it stop on? Verify it manually before running.</p>
    <textarea class="code-input" placeholder="// Write your code here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w3-t3')">Show Solution</button></div>
    <div id="sol-w3-t3" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span> n = <span class="num">1</span>;
<span class="kw">while</span> (n % <span class="num">3</span> != <span class="num">0</span> || n % <span class="num">7</span> != <span class="num">0</span>) {
    System.out.<span class="fn">println</span>(n);
    n++;
}
System.out.<span class="fn">println</span>(<span class="str">"Found it: "</span> + n);
<span class="cmt">// prints 1 through 20, then:</span>
<span class="cmt">// Found it: 21</span>
<span class="cmt">// 21 = 3 × 7 — the smallest number divisible by both</span></pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 3 — Quick Check</h3>
<div id="quiz-w3-t3"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-4">Loop Visualizer</h2>
<p>adjust the values and watch the loop execute.</p>
<div class="interactive-box">
  <div class="ib-header">Interactive — For Loop Visualizer</div>
  <div class="ib-body">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:1rem">
      <div>
        <label style="font-size:12px;font-weight:700;color:#6b7280;display:block;margin-bottom:5px">Start (i =)</label>
        <input type="number" id="ls" value="0" min="0" max="5" style="width:100%;padding:7px;border:1px solid #e5e7eb;border-radius:4px;font-size:14px">
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:#6b7280;display:block;margin-bottom:5px">End (i &lt;)</label>
        <input type="number" id="le" value="6" min="1" max="12" style="width:100%;padding:7px;border:1px solid #e5e7eb;border-radius:4px;font-size:14px">
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:#6b7280;display:block;margin-bottom:5px">Step</label>
        <select id="lx" style="width:100%;padding:7px;border:1px solid #e5e7eb;border-radius:4px;font-size:14px">
          <option value="1">i++ (+1)</option>
          <option value="2">i+=2 (+2)</option>
          <option value="-1">i-- (-1)</option>
        </select>
      </div>
    </div>
    <button class="btn btn-navy btn-sm" onclick="runViz()">Run</button>
    <div id="viz-code" style="margin-top:12px;font-family:monospace;font-size:13px;background:#1e2638;color:#6ee7b7;padding:8px 12px;border-radius:5px"></div>
    <div id="viz-out" style="margin-top:10px;min-height:40px"></div>
  </div>
</div>

<h2 class="sh" id="topic-5">Fill in the Blanks</h2>
<div id="fill-w3">
  <div class="fill-container">
    <span class="cmt">// Loop 10 times (i = 0 to 9)</span><br>
    <span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i <input class="fill-blank" data-answer="< 10|<10" placeholder="???"> ; <input class="fill-blank" data-answer="i++" placeholder="???"> ) { }
  </div>
  <div class="fill-container">
    <span class="cmt">// Foreach over double array called readings</span><br>
    <span class="kw">for</span> (<span class="type">double</span> <input class="fill-blank" data-answer="val|value|r|reading|v|d" placeholder="???"> : readings) { }
  </div>
  <div class="fill-container">
    <span class="cmt">// Loop counting DOWN from 5 to 1</span><br>
    <span class="kw">for</span> (<span class="type">int</span> i = <span class="num">5</span>; i > <span class="num">0</span>; <input class="fill-blank" data-answer="i--|i -= 1|i=i-1" placeholder="???"> ) { }
  </div>
</div>
<div style="display:flex;align-items:center;gap:12px;margin-top:10px">
  <button class="btn btn-navy btn-sm" onclick="checkFills('fill-w3')">Check Answers</button>
  <span id="fill-w3-result" style="font-size:13px;font-weight:700;display:none"></span>
</div>

<h2 class="sh" id="topic-6">Knowledge Check</h2>
<div id="quiz-w3"></div>

<h2 class="sh" id="topic-7">Coding Challenge</h2>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Sensor Array Analyzer</div><div class="ch-sub">Process a real FRC-style sensor array</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Start with: <code>double[] readings = {12.4, 13.1, 11.8, 14.0, 12.7};</code><br><br>Use a regular for loop (with an index variable) to:<br>• add up all readings, then after the loop print the average (sum ÷ number of readings)<br>• track the highest value seen — after the loop print it<br>• for any reading below 12.0, print a warning like <code>"Reading 2: 11.8 — LOW"</code></p>
    <textarea class="code-input" placeholder="// Your code here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w3')">Show Solution</button></div>
    <div id="sol-w3" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">double</span>[] readings = {<span class="num">12.4</span>, <span class="num">13.1</span>, <span class="num">11.8</span>, <span class="num">14.0</span>, <span class="num">12.7</span>};
<span class="type">double</span> sum = <span class="num">0</span>;
<span class="type">double</span> max = readings[<span class="num">0</span>];

<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; readings.length; i++) {
    sum += readings[i];
    <span class="kw">if</span> (readings[i] &gt; max) max = readings[i];
    <span class="kw">if</span> (readings[i] &lt; <span class="num">12.0</span>)
        System.out.<span class="fn">println</span>(<span class="str">"Reading "</span> + i + <span class="str">": "</span> + readings[i] + <span class="str">" — LOW"</span>);
}
System.out.<span class="fn">println</span>(<span class="str">"Average: "</span> + (sum / readings.length));
System.out.<span class="fn">println</span>(<span class="str">"Max: "</span> + max);</pre>
      </div>
    </div>
  </div>
</div>

<div class="project-task" id="topic-8">
  <div class="pt-header">
    <div class="pt-icon"><i data-lucide="wrench"></i></div>
    <div class="pt-header-title">Project Task — Week 3</div>
    <div class="pt-filename">SensorProcessor.java</div>
  </div>
  <div class="pt-body">
    <p>Create <code>SensorProcessor.java</code> in your <code>minibot-project</code> folder. This class processes a batch of sensor readings — simulating how a robot analyzes data from multiple distance sensors at once.</p>
    <ul>
      <li>Declare a <code>static double[] processSensorReadings(double[] rawReadings)</code> method</li>
      <li>Use a regular for loop to iterate through all readings</li>
      <li>Filter out any readings below 0.0 (replace with 0.0 — sensor noise)</li>
      <li>Cap any readings above 120.0 inches at 120.0 (max sensor range)</li>
      <li>Return the cleaned array</li>
      <li>Also write <code>static double findAverage(double[] readings)</code> using a foreach loop</li>
      <li>Also write <code>static double findMax(double[] readings)</code> using a regular for loop</li>
      <li>In a <code>main</code> method, test with: <code>{-2.0, 14.5, 150.0, 12.1, 0.5, 88.3}</code></li>
    </ul>
    <span class="pt-note">no while loops allowed anywhere in this file. you know why :)</span>
  </div>
</div>

<h2 class="sh" id="weekly-test">Weekly Test</h2>
<p>covers everything from week 3. your score gets sent to the leads :) try without looking back first!!</p>
<div class="weekly-test-block">
  <div class="wt-header">
    <div class="wt-icon"><i data-lucide="clipboard-list"></i></div>
    <div>
      <div class="wt-title">week 3 test</div>
      <div class="wt-sub">for loops, foreach, while loops & why they're banned · 8 questions!!</div>
    </div>
  </div>
  <div id="test-summer-w3"></div>
</div>

<script>
function runViz() {
  const s = parseInt(document.getElementById('ls').value);
  const e = parseInt(document.getElementById('le').value);
  const x = parseInt(document.getElementById('lx').value);
  const stepLabel = x===1?'i++':x===2?'i+=2':'i--';
  const op = x<0?'>':'<';
  document.getElementById('viz-code').textContent = `for (int i = ${s}; i ${op} ${e}; ${stepLabel}) { ... }`;
  const vals = []; let i=s, n=0;
  while(n<25){ if(x<0?i<=e:i>=e)break; vals.push(i); i+=x; n++; }
  if(vals.length===0){ document.getElementById('viz-out').innerHTML='<span style="color:#C41230;font-size:13px">Loop never executes — condition is false immediately.</span>'; return; }
  document.getElementById('viz-out').innerHTML = `<div style="font-size:12px;color:#6b7280;margin-bottom:6px">${vals.length} iteration(s) — i values:</div>` +
    vals.map(v=>`<span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:5px;background:#eef1f7;border:1px solid #c5cedf;color:#1B2A4A;font-family:monospace;font-size:13px;font-weight:700;margin:2px">${v}</span>`).join('');
}

const quiz_w3_t1 = new Quiz('quiz-w3-t1', [
  { question: "How many times does <code>for (int i = 0; i &lt; 5; i++)</code> execute?", options: ["4","5","6","depends on the body"], correct: 1, explanation: "i takes values 0, 1, 2, 3, 4 — that's 5 iterations. the condition 5 < 5 is false so the loop stops. the pattern 'i < N starting from 0' always runs exactly N times." },
  { question: "In a for loop, when does the STEP (i++) run?", options: ["Before the condition check","After the body, before the next condition check","After the condition check but before the body","Only on the last iteration"], correct: 1, explanation: "The order is: init once, then check condition, run body, run step, check condition, run body, run step... The step always runs after the body and before the next condition check." },
  { question: "What does <code>array.length</code> return for <code>int[] arr = {10, 20, 30};</code>?", options: ["2 (last valid index)","3 (number of elements)","4","30 (last value)"], correct: 1, explanation: "length returns the number of elements, which is 3. valid indices are 0, 1, 2 (0 to length-1). using length in your loop condition instead of hardcoding 3 is best practice." }
], 'summer-w3');

const quiz_w3_t2 = new Quiz('quiz-w3-t2', [
  { question: "You do <code>for (double x : arr) { x = x * 2; }</code>. What happens to arr?", options: ["All elements are doubled","Nothing — x is a copy, the array is unchanged","Only the first element is doubled","Compile error"], correct: 1, explanation: "The foreach variable is a copy of each value. modifying x only changes the local copy, not the actual array slot. to double elements in place you need a regular for loop with arr[i] = arr[i] * 2." },
  { question: "When should you use a foreach loop instead of a regular for loop?", options: ["When you need to modify array elements","When you need to iterate backwards","When you only need to read each value and don't need the index","When you need to skip elements"], correct: 2, explanation: "Foreach shines for read-only traversal: summing, printing, finding max/min. use regular for when you need the index to write back, go backwards, or access elements by position." },
  { question: "What is the foreach syntax for a String array called 'names'?", options: ["<code>for (String : names)</code>","<code>for (String name in names)</code>","<code>for (String name : names)</code>","<code>foreach (String name in names)</code>"], correct: 2, explanation: "The syntax is: for (Type variableName : collection). you need the type, a variable name you make up, a colon, and the collection. Java doesn't have a 'foreach' keyword — it's still 'for' with a colon." }
], 'summer-w3');

const quiz_w3_t3 = new Quiz('quiz-w3-t3', [
  { question: "Why are while loops banned inside FRC robot periodic methods?", options: ["They use more memory than for loops","WPILib doesn't compile them","A stuck while loop blocks the robot's 20ms cycle, the watchdog fires, and the robot disables mid-match","They're slower than for loops"], correct: 2, explanation: "The FRC framework calls your code every 20ms and expects it back quickly. a while loop that waits for a sensor blocks this cycle. the watchdog timer fires and disables the robot. this has happened at real competitions." },
  { question: "What does the WPILib watchdog timer do when your code takes too long?", options: ["Logs a warning and continues normally","Disables the robot by cutting motor output","Restarts the robot program","Slows the update rate to 10ms"], correct: 1, explanation: "The watchdog is a dead-man's switch. if your code doesn't return control within the allowed time, it assumes something is wrong and disables the robot. it's a safety feature — an unresponsive robot is dangerous on a field." },
  { question: "You forget to increment the counter inside a while loop. What happens?", options: ["The loop runs zero times","The loop runs exactly once","The condition never becomes false, causing an infinite loop","Java throws a LoopException"], correct: 2, explanation: "If the variable controlling the condition never changes, the condition stays true forever. infinite loop. your program freezes. in robot code, the watchdog disables the robot. always make sure something inside your while loop moves toward making the condition false." }
], 'summer-w3');

const quiz_w3 = new Quiz('quiz-w3', [
  { question: "How many times does <code>for (int i = 2; i &lt; 7; i++)</code> execute?", options: ["4","5","6","7"], correct: 1, explanation: "i takes values 2, 3, 4, 5, 6 — that's 5 iterations. the loop stops before i reaches 7. off-by-one errors are super common — trace through it manually when you're unsure." },
  { question: "Why are while loops banned in FRC robot code?", options: ["They use more memory","WPILib doesn't support them","A stuck while loop blocks the robot's 20ms cycle, freezing motor updates and tripping the watchdog","They're slower than for loops"], correct: 2, explanation: "The FRC framework expects your code to return every 20ms. a while loop that waits for a sensor blocks this cycle indefinitely. the watchdog fires, disabling the robot mid-match. this has happened at real competitions." },
  { question: "You want to multiply every element in an array by 2. Which loop type should you use?", options: ["Foreach — it's cleaner","Regular for loop with index","While loop","Either works identically"], correct: 1, explanation: "You need the index to write back: <code>arr[i] = arr[i] * 2</code>. a foreach gives you a copy of the value — changes to that copy do NOT affect the original array." },
  { question: "<code>for (int i = 0; i &gt;= 0; i++)</code> — what happens?", options: ["Runs once","Never runs","Runs forever (infinite loop)","Compile error"], correct: 2, explanation: "i starts at 0, condition is i >= 0. since i keeps increasing, it will always be >= 0. the condition never becomes false. infinite loop." },
  { question: "A foreach loop gives you:", options: ["The index of each element","A copy of each element's value","A reference you can use to modify the array","The length of the array"], correct: 1, explanation: "Foreach gives you a copy of the value — not a reference to the slot. modifying the variable inside a foreach does NOT change the original array. use a regular for loop if you need to write back." }
], 'summer-w3');

const test_w3 = new Quiz('test-summer-w3', [
  { question: "How many times does <code>for (int i = 0; i &lt; 8; i++)</code> execute?", options: ["7","8","9","6"], correct: 1, explanation: "i goes 0, 1, 2, 3, 4, 5, 6, 7 — that's 8 iterations. the loop stops when i reaches 8 (because 8 < 8 is false). the pattern <code>i < N</code> always runs exactly N times starting from 0." },
  { question: "After <code>for (int i = 0; i &lt; 5; i++) { }</code> finishes, what is the value of i?", options: ["4","5","0","i doesn't exist after the loop"], correct: 3, explanation: "The variable i is declared inside the for loop header, so it only exists during the loop. once the loop ends, i goes out of scope and is gone. you'd get a compile error if you tried to access it after." },
  { question: "You want to set every element in an array to 0.0. Which loop should you use?", options: ["Foreach — shorter syntax","Regular for loop with the index","Either — foreach can modify arrays too","While loop"], correct: 1, explanation: "Foreach gives you a copy of each value. modifying the copy doesn't change the array. to actually write to <code>arr[i]</code>, you need the index, which only the regular for loop gives you." },
  { question: "Why are while loops banned in FRC robot code?", options: ["They compile to slower bytecode","If the loop condition stays true too long, it blocks the 20ms robot cycle and the watchdog disables the robot","WPILib throws an exception if you use one","They can't access sensor data"], correct: 1, explanation: "The WPILib framework calls your code every 20ms and expects it to return quickly. a blocking while loop prevents that. the watchdog timer fires and the robot gets disabled. this has happened in real competition matches." },
  { question: "A while loop blocks the 20ms robot cycle. What does the watchdog do when this happens?", options: ["Logs a warning and continues","Restarts the loop from the beginning","Disables the robot by cutting motor output","Slows the loop down to 100ms"], correct: 2, explanation: "The watchdog is a dead-man's switch — if your code doesn't return control within a set time, it assumes something is wrong and disables the robot. motors stop, driver loses control. it's a safety feature, but it means your bug just ended your match." },
  { question: "What does this print? <code>for (int i = 1; i &lt;= 3; i++) { System.out.println(i); }</code>", options: ["0 1 2","1 2 3","1 2 3 4","0 1 2 3"], correct: 1, explanation: "i starts at 1 (not 0), and the condition is <= 3 (not < 3). so i goes 1, 2, 3. when i becomes 4, the condition 4 <= 3 is false and the loop exits. prints 1, 2, 3." },
  { question: "You have <code>int[] ids = {10, 20, 30, 40};</code>. Which loop prints them in reverse order (40, 30, 20, 10)?", options: ["<code>for (int id : ids)</code>","<code>for (int i = ids.length; i > 0; i--)</code>","<code>for (int i = ids.length - 1; i >= 0; i--)</code>","<code>for (int i = 3; i > 0; i--)</code>"], correct: 2, explanation: "Start at the last valid index (length - 1 = 3), go down to 0 inclusive (>= 0). so i = 3, 2, 1, 0 and you print ids[3]=40, ids[2]=30, ids[1]=20, ids[0]=10. option B starts at length=4 which is one past the end and would throw an ArrayIndexOutOfBoundsException." },
  { question: "When is a foreach loop preferred over a regular for loop?", options: ["When you need to modify the array in place","When you need to iterate backwards","When you only need to read each value and don't need the index","When you need to skip elements"], correct: 2, explanation: "Foreach shines when you just want each value — summing, printing, finding max/min. it's cleaner and harder to mess up. use a regular for loop when you need the index (to write back, go backwards, or skip)." }
], 'summer-w3-test');
document.addEventListener('DOMContentLoaded', runViz);
</script>
