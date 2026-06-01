---
layout: week
title: "Arrays & Methods"
subtitle: "storing lists of data and writing reusable blocks of code. methods are your best friend :)"
badge: "Summer · Week 4 of 8"
phase: summer
phase_label: Summer
week_label: Week 4
page_id: summer-w4
topics:
  - Arrays
  - Methods
  - Javadocs & Code Documentation
prev_url: /weeks/summer/week3
prev_title: "Week 3 — Loops"
next_url: /weeks/summer/week5
next_title: "Week 5 — OOP: Classes & Objects"
---

<h2 class="sh">Arrays</h2>
<p>An array stores multiple values of the same type in one variable. Fixed size — once you create it, you can't add or remove slots.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// Method 1: declare size, fill later (defaults to 0 / false / null)</span>
<span class="type">int</span>[] motorIDs = <span class="kw">new</span> <span class="type">int</span>[<span class="num">4</span>];
motorIDs[<span class="num">0</span>] = <span class="num">1</span>;  motorIDs[<span class="num">1</span>] = <span class="num">2</span>;

<span class="cmt">// Method 2: declare with values directly</span>
<span class="type">double</span>[] speeds = {<span class="num">0.5</span>, <span class="num">0.75</span>, <span class="num">1.0</span>, <span class="num">-0.5</span>};

<span class="cmt">// Access by index — ALWAYS starts at 0</span>
System.out.<span class="fn">println</span>(speeds[<span class="num">0</span>]); <span class="cmt">// 0.5</span>
System.out.<span class="fn">println</span>(speeds.length); <span class="cmt">// 4</span></pre>
</div>

<div class="callout warning"><p><strong>Index out of bounds:</strong> Accessing an index that doesn't exist (like <code>arr[4]</code> on a 4-element array) throws an <code>ArrayIndexOutOfBoundsException</code> and crashes your program. This is one of the most common runtime errors in Java.</p></div>

<h2 class="sh">Methods</h2>
<p>A method is a named, reusable block of code. Instead of writing the same logic in 10 places, write it once as a method and call it anywhere.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — method anatomy</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">//  access  return-type  name      parameters</span>
<span class="kw">public static</span> <span class="type">double</span>  <span class="fn">calcWheelRPM</span>(<span class="type">double</span> motorRPM, <span class="type">double</span> gearRatio) {
    <span class="kw">return</span> motorRPM / gearRatio;
}

<span class="cmt">// Call it:</span>
<span class="type">double</span> wheelSpeed = <span class="fn">calcWheelRPM</span>(<span class="num">5400.0</span>, <span class="num">8.46</span>); <span class="cmt">// 638.3...</span></pre>
</div>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Return type</div><div class="cc-title">What it sends back</div><div class="cc-desc">The type of value the method returns. Use <code>void</code> when it returns nothing.</div></div>
  <div class="concept-card"><div class="cc-label">Parameters</div><div class="cc-title">Inputs to the method</div><div class="cc-desc">Variables declared in the parentheses. The method gets a copy of whatever you pass in.</div></div>
  <div class="concept-card"><div class="cc-label">return</div><div class="cc-title">Sends back a value</div><div class="cc-desc">Ends the method and returns a value to the caller. Void methods can use bare <code>return;</code> or omit it.</div></div>
  <div class="concept-card"><div class="cc-label">static</div><div class="cc-title">No object needed</div><div class="cc-desc">A static method belongs to the class, not an instance. Call it as <code>ClassName.method()</code>.</div></div>
</div>

<h2 class="sh">Javadocs</h2>
<p>Special comments that describe your methods for teammates. Essential on a team where multiple people touch the same code.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">/**
 * Calculates wheel RPM from motor RPM and gear ratio.
 *
 * @param motorRPM  the motor's free-spin RPM
 * @param gearRatio the reduction ratio (e.g. 8.46 means motor spins 8.46x faster)
 * @return the resulting wheel RPM
 */</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">calcWheelRPM</span>(<span class="type">double</span> motorRPM, <span class="type">double</span> gearRatio) {
    <span class="kw">return</span> motorRPM / gearRatio;
}</pre>
</div>

<h2 class="sh">Fill in the Blanks</h2>
<div id="fill-w4">
  <div class="fill-container">
    <span class="cmt">// Method that returns nothing, takes a double speed param</span><br>
    <span class="kw">public static</span> <input class="fill-blank" data-answer="void" placeholder="????"> <span class="fn">setSpeed</span>(<span class="type">double</span> speed) { }
  </div>
  <div class="fill-container">
    <span class="cmt">// Return the sum of a and b</span><br>
    <span class="kw">public static</span> <span class="type">int</span> <span class="fn">add</span>(<span class="type">int</span> a, <span class="type">int</span> b) { <input class="fill-blank" data-answer="return a + b;|return a+b;" placeholder="???????????"> }
  </div>
  <div class="fill-container">
    <span class="cmt">// Access the 3rd element (index 2) of array arr</span><br>
    <span class="type">int</span> val = arr[<input class="fill-blank" data-answer="2" placeholder="?">];
  </div>
</div>
<div style="display:flex;align-items:center;gap:12px;margin-top:10px">
  <button class="btn btn-navy btn-sm" onclick="checkFills('fill-w4')">Check Answers</button>
  <span id="fill-w4-result" style="font-size:13px;font-weight:700;display:none"></span>
</div>

<h2 class="sh">Knowledge Check</h2>
<div id="quiz-w4"></div>

<script>
const quiz_w4 = new Quiz('quiz-w4', [
  { question: "An array is declared as <code>int[] arr = new int[4];</code>. What is <code>arr[0]</code>?", options: ["1","undefined","0 (default)","null"], correct: 2, explanation: "Numeric arrays default to 0, boolean arrays to false, object arrays to null. Index 0 on a fresh int array is 0." },
  { question: "What is the difference between a parameter and an argument?", options: ["They're the same thing","A parameter is in the method signature; an argument is the actual value you pass when calling it","An argument is in the method signature; a parameter is what you pass","Parameters are only used with static methods"], correct: 1, explanation: "Parameter = the variable declared in the method's parentheses. Argument = the actual value passed when you call the method. Small distinction but worth knowing." },
  { question: "What does a <code>void</code> return type mean?", options: ["The method returns 0","The method returns null","The method doesn't return any value","The method can return any type"], correct: 2, explanation: "void means the method does something (side effects) but doesn't hand back a value. Like <code>setSpeed()</code> — you give it a speed, it sets it, nothing to return." },
  { question: "What index is the LAST element of <code>double[] arr = new double[6];</code>?", options: ["6","5","7","-1"], correct: 1, explanation: "Arrays are zero-indexed. A 6-element array has indices 0–5. Index 6 would throw ArrayIndexOutOfBoundsException." },
  { question: "Why use methods instead of writing the same code multiple times?", options: ["Methods run faster","One place to fix bugs; reusable across the whole codebase; easier to read","Methods use less memory","Java requires it"], correct: 1, explanation: "If you fix a bug in a method, it's fixed everywhere it's called. If you copy-pasted the same 10 lines in 5 places, you fix it 5 times — and probably miss one." }
], 'summer-w4');
</script>
