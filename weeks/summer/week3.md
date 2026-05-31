---
layout: week
title: "Loops"
subtitle: "For loops, foreach loops, and the very important reason while loops are banned from robot code."
badge: "Summer · Week 3 of 8"
phase: summer
phase_label: Summer
week_label: Week 3
page_id: summer-w3
prev_url: /weeks/summer/week2
prev_title: "Week 2 — Logic & Control Flow"
next_url: /weeks/summer/week4
next_title: "Week 4 — Arrays & Methods"
---

<h2 class="sh">For Loops</h2>
<p>The for loop runs code a set number of times. Use it whenever you know how many iterations you need.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// for (init; condition; step)</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; <span class="num">5</span>; i++) {
    System.out.<span class="fn">println</span>(<span class="str">"Iteration: "</span> + i);
}
<span class="cmt">// Prints: 0, 1, 2, 3, 4</span></pre>
</div>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Init</div><div class="cc-title">int i = 0</div><div class="cc-desc">Runs once at the start. Almost always starts at 0 because arrays are zero-indexed.</div></div>
  <div class="concept-card"><div class="cc-label">Condition</div><div class="cc-title">i &lt; 5</div><div class="cc-desc">Checked before each iteration. Loop keeps going while true. When false, the loop exits.</div></div>
  <div class="concept-card"><div class="cc-label">Step</div><div class="cc-title">i++</div><div class="cc-desc">Runs after each iteration. <code>i++</code> counts up, <code>i--</code> counts down, <code>i += 2</code> skips every other.</div></div>
</div>

<div class="callout danger"><p><strong>Infinite loop:</strong> If the condition never becomes false, the loop runs forever and your program freezes. <code>for (int i = 0; i >= 0; i++)</code> — i always stays ≥ 0, so it never stops. Always double-check your condition.</p></div>

<h2 class="sh">Foreach Loops</h2>
<p>Cleaner syntax for looping through every element when you don't need the index.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">double</span>[] speeds = {<span class="num">0.5</span>, <span class="num">0.75</span>, <span class="num">1.0</span>, <span class="num">-0.5</span>};

<span class="cmt">// Foreach — clean, read-only</span>
<span class="kw">for</span> (<span class="type">double</span> speed : speeds) {
    System.out.<span class="fn">println</span>(speed);
}

<span class="cmt">// Regular for — use this to MODIFY the array</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; speeds.length; i++) {
    speeds[i] = speeds[i] * <span class="num">0.8</span>; <span class="cmt">// reduce all by 20%</span>
}</pre>
</div>

<div class="callout warning"><p><strong>Foreach gotcha:</strong> The foreach variable is a copy of each element, not a reference to the original slot. Modifying it doesn't change the array. Use a regular for loop if you need to write back.</p></div>

<h2 class="sh">⛔ The While Loop Ban</h2>
<p>While loops repeat as long as a condition is true. They work fine in normal Java programs. In robot code they are banned. Here's why.</p>

<div class="callout danger"><p><strong>FRC robots run on a 20ms loop cycle.</strong> The framework calls your code every 20ms to update motors, read sensors, and respond to the driver. If your code contains a while loop that gets stuck — waiting for a sensor, waiting for a button — it blocks the entire 20ms cycle. Motors stop updating. The driver loses control. The watchdog timer fires and disables the robot.<br><br>This has happened in real matches. Do not use while loops in robot code. Ever.</p></div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — fine in normal programs, BANNED in robot code</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// ❌ DO NOT DO THIS IN ROBOT CODE</span>
<span class="kw">while</span> (!atTarget) {
    <span class="fn">driveToTarget</span>();  <span class="cmt">// blocks the entire robot loop until done</span>
}

<span class="cmt">// ✓ Use state machines and command-based instead (you'll learn this in Phase 2)</span></pre>
</div>

<h2 class="sh">Loop Visualizer</h2>
<p>Adjust the values and watch the loop execute.</p>
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
  { question: "How many times does <code>for (int i = 2; i < 7; i++)</code> execute?", options: ["4","5","6","7"], correct: 1, explanation: "i takes values 2,3,4,5,6 — 5 iterations. The loop stops before i reaches 7. Off-by-one errors are extremely common — count carefully." },
  { question: "Why are while loops banned in FRC robot code?", options: ["They use more memory","WPILib doesn't support them","A stuck while loop blocks the robot's 20ms cycle, freezing motor updates and tripping the watchdog","They're slower than for loops"], correct: 2, explanation: "The FRC framework expects your code to return every 20ms. A while loop that waits for a sensor blocks this cycle indefinitely. The watchdog fires, disabling the robot mid-match." },
  { question: "You want to multiply every element in an array by 2. Which loop type?", options: ["Foreach — it's cleaner","Regular for loop with index","While loop","Either works identically"], correct: 1, explanation: "You need the index to write back: <code>arr[i] = arr[i] * 2</code>. A foreach gives you a copy of the value — changes don't affect the original array." },
  { question: "<code>for (int i = 0; i >= 0; i++)</code> — what happens?", options: ["Runs once","Never runs","Runs forever (infinite loop)","Compile error"], correct: 2, explanation: "i starts at 0, condition is i >= 0. Since i keeps increasing, it will always be >= 0. Condition never becomes false. Infinite loop." },
  { question: "A foreach loop gives you:", options: ["The index of each element","A copy of each element's value","A reference you can use to modify the array","The length of the array"], correct: 1, explanation: "Foreach gives you a copy of the value — not a reference to the slot. Modifying the variable inside a foreach does NOT change the original array." }
], 'summer-w3');
document.addEventListener('DOMContentLoaded', runViz);
</script>
