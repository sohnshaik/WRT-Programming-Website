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
prev_url: /weeks/summer/week2
prev_title: "Week 2 — Logic & Control Flow"
next_url: /weeks/summer/week4
next_title: "Week 4 — Arrays & Methods"
---

<h2 class="sh" id="topic-1">For Loops</h2>
<p>okay so imagine your teacher gives you a punishment: write the sentence "I will not throw a gear across the shop" 10 times. you COULD write it out 10 separate times. or you could say "do this 10 times" and let something else handle it. that's a loop. it runs a piece of code over and over automatically.</p>

<p>the <code>for</code> loop is the one you'll use the most. it's built for when you know exactly how many times you want to loop — like "go through all 4 drive motors" or "check each of the 8 sensor readings".</p>

<h3 class="sub">The Three Parts</h3>
<p>a for loop has three pieces crammed into one line, separated by semicolons. here's what each one does:</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Init</div><div class="cc-title">int i = 0</div><div class="cc-desc">runs exactly ONCE, at the very start. this is where you create your counter variable. almost always starts at 0 — you'll see why in a second.</div></div>
  <div class="concept-card"><div class="cc-label">Condition</div><div class="cc-title">i &lt; 5</div><div class="cc-desc">checked before EVERY single iteration. if it's true, run the body. if it's false, stop and exit the loop. this is your "should i keep going?" check.</div></div>
  <div class="concept-card"><div class="cc-label">Step</div><div class="cc-title">i++</div><div class="cc-desc">runs after EVERY iteration, right before the condition gets checked again. this is how your counter moves. <code>i++</code> adds 1, <code>i--</code> subtracts 1, <code>i += 2</code> skips every other.</div></div>
</div>

<h3 class="sub">Execution Order (read this carefully!!)</h3>
<p>the order matters. here's exactly what happens when Java runs a for loop, step by step:</p>
<ol>
  <li><strong>init runs once</strong> — creates the counter variable</li>
  <li><strong>condition is checked</strong> — is it true or false?</li>
  <li><strong>if true</strong> — run everything inside the <code>{ }</code></li>
  <li><strong>step runs</strong> — counter moves forward (or backward)</li>
  <li><strong>go back to step 2</strong> — check the condition again</li>
  <li><strong>if false</strong> — exit the loop, continue with the rest of your code</li>
</ol>

<h3 class="sub">The Simplest Example</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// prints the numbers 0, 1, 2, 3, 4</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; <span class="num">5</span>; i++) {
    System.out.<span class="fn">println</span>(<span class="str">"Iteration: "</span> + i);
}
<span class="cmt">// after the loop, i is gone — it only existed inside the loop</span></pre>
</div>

<p>trace through it yourself: i starts at 0. is 0 &lt; 5? yes. print 0. i becomes 1. is 1 &lt; 5? yes. print 1. ... is 5 &lt; 5? NO. stop. you get 0, 1, 2, 3, 4. five numbers total.</p>

<h3 class="sub">Wait — why does it start at 0?</h3>
<p>computers count from 0, not 1. this is called <strong>zero-indexing</strong> and it shows up everywhere in programming. arrays, lists, loops — they all start at 0. if you want to run a loop 5 times, you go 0, 1, 2, 3, 4 (not 1, 2, 3, 4, 5). once you get used to it, it feels natural. for now just remember: <em>start at 0, condition uses &lt; (not &lt;=)</em>.</p>

<div class="callout tip"><p><strong>the pattern to memorize:</strong> <code>for (int i = 0; i &lt; N; i++)</code> runs exactly N times. i goes from 0 to N-1. this is the most common loop you'll ever write.</p></div>

<h3 class="sub">FRC Example — Initializing Motor IDs</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span>[] motorIDs = {<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>};

<span class="cmt">// loop through all 4 drive motor IDs and print them</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; motorIDs.length; i++) {
    System.out.<span class="fn">println</span>(<span class="str">"Configuring motor ID: "</span> + motorIDs[i]);
}
<span class="cmt">// motorIDs.length is 4, so this runs 4 times (i = 0, 1, 2, 3)</span></pre>
</div>

<div class="callout info"><p><code>array.length</code> gives you the number of elements in an array. using it in your loop condition instead of a hardcoded number is good practice — if you add a 5th motor later, the loop automatically adjusts.</p></div>

<h3 class="sub">Loops That Count Down or Skip</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// count DOWN from 5 to 1 (like a countdown)</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">5</span>; i &gt; <span class="num">0</span>; i--) {
    System.out.<span class="fn">println</span>(i); <span class="cmt">// prints 5, 4, 3, 2, 1</span>
}

<span class="cmt">// step by 2 — only even numbers</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; <span class="num">10</span>; i += <span class="num">2</span>) {
    System.out.<span class="fn">println</span>(i); <span class="cmt">// prints 0, 2, 4, 6, 8</span>
}

<span class="cmt">// backwards through an array (last element first)</span>
<span class="type">int</span>[] ids = {<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>};
<span class="kw">for</span> (<span class="type">int</span> i = ids.length - <span class="num">1</span>; i &gt;= <span class="num">0</span>; i--) {
    System.out.<span class="fn">println</span>(ids[i]); <span class="cmt">// prints 4, 3, 2, 1</span>
}</pre>
</div>

<h3 class="sub">Common Mistakes</h3>

<div class="callout warning"><p><strong>off-by-one errors.</strong> this is the #1 loop mistake. <code>i &lt; 5</code> runs 5 times (i = 0,1,2,3,4). <code>i &lt;= 5</code> runs 6 times (i = 0,1,2,3,4,5). one character difference, totally different behavior. when in doubt, trace through it manually.</p></div>

<div class="callout danger"><p><strong>infinite loop:</strong> if the condition never becomes false, the loop runs forever and your program freezes. <code>for (int i = 0; i &gt;= 0; i++)</code> — i always stays &gt;= 0 since it's only going up, so it never stops. always double check your condition. in a desktop program, an infinite loop freezes your app. in robot code, it gets worse — keep reading.</p></div>

<div class="callout warning"><p><strong>don't change the counter inside the loop body.</strong> doing <code>i = i + 2</code> inside the loop when you also have <code>i++</code> in the step makes the behavior confusing and hard to reason about. let the step handle moving the counter.</p></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-2">Foreach Loops</h2>
<p>the regular for loop says "go through positions 0, 1, 2, 3 and give me the thing at each spot." the foreach loop says something simpler: "give me each thing in this collection, one by one. i don't care what position it's at." it's cleaner to read when all you're doing is looking at values.</p>

<h3 class="sub">The Syntax</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// for (type variableName : collectionToLoopThrough)</span>
<span class="type">double</span>[] speeds = {<span class="num">0.5</span>, <span class="num">0.75</span>, <span class="num">1.0</span>, <span class="num">-0.5</span>};

<span class="kw">for</span> (<span class="type">double</span> speed : speeds) {
    System.out.<span class="fn">println</span>(<span class="str">"Speed: "</span> + speed);
}
<span class="cmt">// prints 0.5, 0.75, 1.0, -0.5 — one per line</span></pre>
</div>

<p>read it as: "for each <code>double</code> called <code>speed</code> in the <code>speeds</code> array, do this." Java handles the counter and the index stuff behind the scenes. you just see each value, one at a time.</p>

<h3 class="sub">Foreach vs Regular For — Same Task, Two Ways</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — two ways to do the same thing</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">double</span>[] sensorReadings = {<span class="num">12.4</span>, <span class="num">13.1</span>, <span class="num">11.8</span>, <span class="num">14.0</span>};

<span class="cmt">// regular for loop — more verbose, but gives you the index</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; sensorReadings.length; i++) {
    System.out.<span class="fn">println</span>(sensorReadings[i]);
}

<span class="cmt">// foreach — cleaner when you only need the value</span>
<span class="kw">for</span> (<span class="type">double</span> reading : sensorReadings) {
    System.out.<span class="fn">println</span>(reading);
}</pre>
</div>

<p>both do the same thing here. the foreach version is just less noise to read through. when you're reviewing code at 11pm before a competition, that matters.</p>

<h3 class="sub">The Big Limitation — You Get a COPY</h3>
<p>here's the catch: the foreach variable is a <em>copy</em> of each element, not the actual slot in the array. if you change it, you're changing the copy. the original array stays exactly the same.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — the foreach gotcha</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">double</span>[] speeds = {<span class="num">0.5</span>, <span class="num">0.75</span>, <span class="num">1.0</span>};

<span class="cmt">// this does NOT change the array — you're modifying a copy</span>
<span class="kw">for</span> (<span class="type">double</span> speed : speeds) {
    speed = speed * <span class="num">0.8</span>; <span class="cmt">// changes the local 'speed' variable, NOT speeds[i]</span>
}
System.out.<span class="fn">println</span>(speeds[<span class="num">0</span>]); <span class="cmt">// still 0.5 — nothing changed!!</span>

<span class="cmt">// to actually modify the array, use a regular for loop with the index</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; speeds.length; i++) {
    speeds[i] = speeds[i] * <span class="num">0.8</span>; <span class="cmt">// NOW it changes the real array</span>
}
System.out.<span class="fn">println</span>(speeds[<span class="num">0</span>]); <span class="cmt">// 0.4 — changed!</span></pre>
</div>

<div class="callout warning"><p><strong>foreach gotcha:</strong> the foreach variable is a copy of each element, not a reference to the original slot. modifying it doesn't change the array. use a regular for loop if you need to write back to the array.</p></div>

<h3 class="sub">When to Use Which</h3>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Use Foreach</div><div class="cc-title">Reading values</div><div class="cc-desc">printing, summing, finding max/min, checking conditions. you just need to look at each value and you don't need to know the position.</div></div>
  <div class="concept-card"><div class="cc-label">Use Regular For</div><div class="cc-title">Writing values</div><div class="cc-desc">when you need to modify the array in place, or when you need to know the index (like printing "index 2 is out of range").</div></div>
  <div class="concept-card"><div class="cc-label">Use Regular For</div><div class="cc-title">Backwards / skipping</div><div class="cc-desc">foreach always goes forward one at a time. if you need to go backwards or skip elements, regular for is the only option.</div></div>
  <div class="concept-card"><div class="cc-label">Either Works</div><div class="cc-title">Just reading, don't care about index</div><div class="cc-desc">if you just want each value and don't care where it is, foreach is cleaner. both are correct.</div></div>
</div>

<h3 class="sub">FRC Example — Reading Sensor Values</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">double</span>[] distanceSensors_in = {<span class="num">14.2</span>, <span class="num">9.8</span>, <span class="num">22.1</span>, <span class="num">11.5</span>};

<span class="cmt">// foreach is perfect here — just reading each value</span>
<span class="type">double</span> total = <span class="num">0.0</span>;
<span class="kw">for</span> (<span class="type">double</span> dist : distanceSensors_in) {
    total += dist;
    <span class="kw">if</span> (dist &lt; <span class="num">12.0</span>) {
        System.out.<span class="fn">println</span>(<span class="str">"Warning: obstacle close at "</span> + dist + <span class="str">" in"</span>);
    }
}
System.out.<span class="fn">println</span>(<span class="str">"Average distance: "</span> + (total / distanceSensors_in.length));</pre>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-3">While Loops &amp; Why They're Banned</h2>
<p>okay, we need to talk about while loops. they're a perfectly normal part of Java. you'll use them in regular desktop and console programs. but in FRC robot code, they are banned — and it's not an arbitrary rule. it comes from a real failure mode that has actually broken robots in real competition matches. let's understand why.</p>

<h3 class="sub">What a While Loop Is</h3>
<p>a while loop keeps running as long as a condition is true. that's it. there's no counter built in — it's purely condition-based.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// runs as long as count is less than 5</span>
<span class="type">int</span> count = <span class="num">0</span>;
<span class="kw">while</span> (count &lt; <span class="num">5</span>) {
    System.out.<span class="fn">println</span>(count);
    count++;
}
<span class="cmt">// prints 0, 1, 2, 3, 4 — same as a for loop in this case</span>

<span class="cmt">// common use in console programs: wait for valid input</span>
<span class="kw">while</span> (!userHasEnteredValidInput) {
    <span class="fn">promptUserForInput</span>();  <span class="cmt">// keep asking until they give something good</span>
}</pre>
</div>

<p>that second example is actually a great use of a while loop! for a console app on a computer, it's fine. the program just sits there waiting. nobody cares. but that exact pattern is what kills robots.</p>

<h3 class="sub">The FRC Problem — The 20ms Loop</h3>
<p>here's what you need to know about how FRC robots work. your robot's code runs on a 20 millisecond cycle. every 20ms, the framework (WPILib) calls your code to say "hey, update yourself." it reads the latest joystick input, updates motor commands, reads sensors — all of that happens 50 times per second, like clockwork.</p>

<p>the framework <em>expects</em> your code to run and return within that 20ms window. then it calls you again next cycle. run, return. run, return. over and over. the whole robot's responsiveness depends on your code being fast and returning quickly every time.</p>

<div class="callout danger"><p><strong>here's what a while loop does to this.</strong> your periodic method gets called. inside it, there's a <code>while (!atTarget) { driveToTarget(); }</code>. Java starts running the while loop. the target isn't reached yet, so it keeps looping. one cycle, two cycles, ten cycles. it's still running. the framework can't get control back. motors stop updating because nobody's calling them. the driver pushes the joystick and nothing happens. <strong>the watchdog timer fires.</strong></p></div>

<h3 class="sub">The Watchdog — The Robot's Dead-Man's Switch</h3>
<p>the watchdog is basically a safety timer. if your code doesn't return control to the framework within a few hundred milliseconds, the watchdog assumes something is horribly wrong and automatically disables the robot. it cuts motor output. everything stops.</p>

<p>this is the right call actually — a frozen robot is dangerous. but it means your robot just went completely limp in the middle of a match because your while loop was waiting for a sensor that took too long to trigger.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — fine in normal programs, BANNED in robot code</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// this is fine in a console app or desktop program</span>
<span class="kw">while</span> (!isAtPosition) {
    <span class="fn">driveForward</span>();
}

<span class="cmt">// in robot code, this blocks the entire 20ms cycle</span>
<span class="cmt">// the watchdog fires, the robot gets disabled mid-match</span>
<span class="cmt">// DO NOT DO THIS IN ROBOT CODE</span>

<span class="cmt">// the right pattern is state machines + the command framework</span>
<span class="cmt">// you'll learn those in Phase 2 — for now, just know: no while loops in robot code</span></pre>
</div>

<h3 class="sub">A Real Story</h3>
<p>this isn't hypothetical. during a regional qualification match, a team's auto routine had a while loop waiting for an arm encoder to reach a target position. the encoder was slow to settle. the while loop kept running. the watchdog fired at the 200ms mark. the robot disabled for the rest of the auto period and drove into a field element when teleop started because it was physically pointing the wrong direction. that team missed playoffs by one match.</p>

<p>don't be that team.</p>

<div class="callout warning"><p><strong>to be fair:</strong> while loops are totally fine in standalone Java programs — anything that runs on a regular computer. the ban is specific to FRC robot code where the 20ms periodic loop matters. you'll write plenty of while loops in the console programs this course has you build. just never in the robot project.</p></div>

<div class="callout info"><p><strong>what to use instead:</strong> when you need "keep doing this until something happens" behavior in robot code, the answer is state machines and the WPILib command framework. your state machine checks conditions once per cycle and decides what to do. it never blocks. you'll learn this in Phase 2 — it's genuinely elegant once it clicks.</p></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh">Loop Visualizer</h2>
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

<h2 class="sh">Fill in the Blanks</h2>
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

<h2 class="sh">Knowledge Check</h2>
<div id="quiz-w3"></div>

<h2 class="sh">Coding Challenge</h2>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Sensor Array Analyzer</div><div class="ch-sub">Process a real FRC-style sensor array</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Given <code>double[] readings = {12.4, 13.1, 11.8, 14.0, 12.7};</code>, use a regular for loop to: calculate and print the average, find and print the maximum value, and print a warning for any reading below 12.0 inches.</p>
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
        System.out.<span class="fn">println</span>(<span class="str">"Warning: low reading at ["</span> + i + <span class="str">"]"</span>);
}
System.out.<span class="fn">println</span>(<span class="str">"Average: "</span> + (sum / readings.length));
System.out.<span class="fn">println</span>(<span class="str">"Max: "</span> + max);</pre>
      </div>
    </div>
  </div>
</div>

<div class="project-task">
  <div class="pt-header">
    <div class="pt-icon"><i data-lucide="wrench"></i></div>
    <div class="pt-header-title">Project Task — Week 3</div>
    <div class="pt-filename">SensorProcessor.java</div>
  </div>
  <div class="pt-body">
    <p>Create <code>SensorProcessor.java</code>. This class processes a batch of sensor readings — simulating how a robot might analyze distance sensor data from multiple sensors.</p>
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
