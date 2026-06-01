---
layout: week
title: "The Basics"
subtitle: "Variables, data types, operators, scope, and writing code other people can read."
badge: "Summer · Week 1 of 8"
phase: summer
phase_label: Summer
week_label: Week 1
page_id: summer-w1
prev_url:
prev_title:
next_url: /weeks/summer/week2
next_title: "Week 2 — Logic & Control Flow"
---

<h2 class="sh">Variables</h2>
<p>A variable is a named container for a value. You give it a type, a name, and a starting value. In FRC you use variables constantly — motor IDs, speeds, sensor readings, on/off flags. Naming them well is half the job.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// type name = value;</span>
<span class="type">int</span>     motorID    = <span class="num">1</span>;
<span class="type">double</span>  motorSpeed = <span class="num">0.75</span>;
<span class="type">boolean</span> isRunning  = <span class="kw">false</span>;
<span class="type">String</span>  subsystem  = <span class="str">"Drivetrain"</span>;

<span class="cmt">// final = constant, can never be reassigned</span>
<span class="kw">final</span> <span class="type">int</span> MAX_MOTOR_ID = <span class="num">20</span>;</pre>
</div>

<div class="callout tip"><p><strong>FRC connection:</strong> The <code>Constants.java</code> file in every robot project is full of <code>final</code> variables — motor IDs, gear ratios, PID values. You'll be writing and reading these all season.</p></div>

<h2 class="sh">Data Types</h2>
<p>Every variable has a type. Types tell Java how much memory to use and what operations make sense. There are <strong>primitive</strong> types (built-in, lowercase) and <strong>non-primitive</strong> types (objects, uppercase).</p>

<table>
<thead><tr><th>Type</th><th>Category</th><th>Example</th><th>FRC use</th></tr></thead>
<tbody>
<tr><td>int</td><td>Primitive</td><td>5, -3, 1000</td><td>Motor IDs, counter values</td></tr>
<tr><td>double</td><td>Primitive</td><td>0.75, -1.0</td><td>Motor speeds, sensor readings</td></tr>
<tr><td>boolean</td><td>Primitive</td><td>true / false</td><td>Button state, limit switch</td></tr>
<tr><td>String</td><td>Non-primitive</td><td>"Drivetrain"</td><td>Logging, Shuffleboard labels</td></tr>
</tbody>
</table>

<h3 class="sub">Type Casting</h3>
<p>Converting between types. Small → large (e.g. <code>int</code> → <code>double</code>) happens automatically. Large → small requires an explicit cast and truncates the value — it does <em>not</em> round.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// Implicit — int fits inside double, no data lost</span>
<span class="type">int</span> ticks = <span class="num">500</span>;
<span class="type">double</span> pos = ticks; <span class="cmt">// becomes 500.0</span>

<span class="cmt">// Explicit — decimal part gets chopped, NOT rounded</span>
<span class="type">double</span> reading = <span class="num">3.87</span>;
<span class="type">int</span> truncated = (<span class="type">int</span>) reading; <span class="cmt">// becomes 3</span></pre>
</div>

<h2 class="sh">Operators</h2>
<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Math</div><div class="cc-title">+ &nbsp;− &nbsp;* &nbsp;/ &nbsp;%</div><div class="cc-desc"><code>%</code> is remainder (modulo). <code>7 % 3 = 1</code>. Useful for wrapping around array indices.</div></div>
  <div class="concept-card"><div class="cc-label">Assignment</div><div class="cc-title">+= &nbsp;−= &nbsp;*= &nbsp;/=</div><div class="cc-desc"><code>speed += 0.1</code> is shorthand for <code>speed = speed + 0.1</code>. You'll write this constantly.</div></div>
  <div class="concept-card"><div class="cc-label">Increment/Decrement</div><div class="cc-title">++ &nbsp;−−</div><div class="cc-desc"><code>i++</code> adds 1. <code>i--</code> subtracts 1. Used in every for loop.</div></div>
  <div class="concept-card"><div class="cc-label">Comparison</div><div class="cc-title">== &nbsp;!= &nbsp;&lt; &nbsp;&gt; &nbsp;&lt;= &nbsp;&gt;=</div><div class="cc-desc">Return a boolean. Don't mix up <code>==</code> (compare) with <code>=</code> (assign) — that bug is silent and brutal.</div></div>
</div>

<h2 class="sh">Readability &amp; Naming</h2>
<p>We have a lot of programmers. Everyone thinks differently. Code that makes sense to you at midnight might be unreadable to someone else the next morning — including future you.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — bad vs good</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// BAD</span>
<span class="type">double</span> x1 = <span class="num">0.8</span>;
<span class="type">int</span> y = <span class="num">3</span>;
<span class="type">boolean</span> f = <span class="kw">true</span>;

<span class="cmt">// GOOD — self-documenting</span>
<span class="type">double</span> maxShooterSpeed  = <span class="num">0.8</span>;
<span class="type">int</span>    shooterMotorID   = <span class="num">3</span>;
<span class="type">boolean</span> isShooterEnabled = <span class="kw">true</span>;</pre>
</div>

<div class="callout warning"><p><strong>Conventions:</strong> Variables &amp; methods → <code>camelCase</code>. Classes → <code>PascalCase</code>. Constants → <code>SCREAMING_SNAKE_CASE</code>. Never use Java keywords (<code>int</code>, <code>class</code>, <code>for</code>) as names.</p></div>

<h2 class="sh">Fill in the Blanks</h2>
<div id="fill-w1">
  <div class="fill-container">
    <span class="cmt">// Declare an int variable for a motor ID of 5</span><br>
    <input class="fill-blank" data-answer="int" placeholder="???"> motorID = 5;
  </div>
  <div class="fill-container">
    <span class="cmt">// Declare a constant double for max speed</span><br>
    <span class="kw">final</span> <input class="fill-blank" data-answer="double" placeholder="???"> MAX_SPEED = 1.0;
  </div>
  <div class="fill-container">
    <span class="cmt">// Explicitly cast a double to int</span><br>
    <span class="type">double</span> val = 4.9;<br>
    <span class="type">int</span> result = (<input class="fill-blank" data-answer="int" placeholder="??">)val;
  </div>
  <div class="fill-container">
    <span class="cmt">// Increment i by 1</span><br>
    <span class="type">int</span> i = 0;<br>
    <input class="fill-blank" data-answer="i++|i += 1|i=i+1|i = i + 1" placeholder="???">; <span class="cmt">// i is now 1</span>
  </div>
</div>
<div style="display:flex;align-items:center;gap:12px;margin-top:10px">
  <button class="btn btn-navy btn-sm" onclick="checkFills('fill-w1')">Check Answers</button>
  <span id="fill-w1-result" style="font-size:13px;font-weight:700;display:none"></span>
</div>

<h2 class="sh">Knowledge Check</h2>
<div id="quiz-w1"></div>

<h2 class="sh">Coding Challenge</h2>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Motor Calculator</div><div class="ch-sub">Apply variables, types, and operators</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Write a snippet that: declares a <code>final double GEAR_RATIO = 8.46</code>, a <code>double motorRPM = 5400.0</code>, calculates <code>wheelRPM = motorRPM / GEAR_RATIO</code>, casts it to an <code>int</code>, and puts a comment above every line.</p>
    <textarea class="code-input" placeholder="// Write your code here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w1')">Show Solution</button></div>
    <div id="sol-w1" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// Gear ratio between motor shaft and wheel shaft</span>
<span class="kw">final</span> <span class="type">double</span> GEAR_RATIO = <span class="num">8.46</span>;
<span class="cmt">// Free-spin RPM of the Falcon 500</span>
<span class="type">double</span> motorRPM = <span class="num">5400.0</span>;
<span class="cmt">// Actual wheel speed after gear reduction</span>
<span class="type">double</span> wheelRPM = motorRPM / GEAR_RATIO;
<span class="cmt">// Truncate to int (loses decimal precision)</span>
<span class="type">int</span> wheelRPMInt = (<span class="type">int</span>) wheelRPM;</pre>
      </div>
    </div>
  </div>
</div>

<h2 class="sh">Weekly Test</h2>
<p>this covers everything from week 1. it's a bit longer than the topic quizzes and your score gets sent to the leads :) try it without looking back at the content first!!</p>
<div class="weekly-test-block">
  <div class="wt-header">
    <div class="wt-icon">📋</div>
    <div>
      <div class="wt-title">week 1 test</div>
      <div class="wt-sub">variables, types, operators, naming conventions. 8 questions. good luck!!</div>
    </div>
  </div>
  <div id="test-summer-w1"></div>
</div>

<script>
const quiz_w1 = new Quiz('quiz-w1', [
  { question: "What is the correct way to declare a constant integer in Java?", options: ["const int MAX = 10;","final int MAX = 10;","int final MAX = 10;","static int MAX = 10;"], correct: 1, explanation: "<code>final</code> is the Java keyword for constants. <code>const</code> doesn't exist in Java -- that's C/C++." },
  { question: "You cast <code>double speed = 3.9</code> to int. What value do you get?", options: ["4 (rounds up)","3 (truncates)","3.9 (unchanged)","Compile error"], correct: 1, explanation: "Java truncates toward zero when casting double to int. <code>(int) 3.9 = 3</code>, not 4. This trips people up with encoder conversions." },
  { question: "Which variable name follows Java conventions for a non-constant?", options: ["MotorSpeed","motorspeed","motorSpeed","motor_speed"], correct: 2, explanation: "Non-constant variables use camelCase. <code>MotorSpeed</code> is PascalCase (for class names). <code>motor_speed</code> is snake_case (not java)." },
  { question: "What does the <code>%</code> operator return?", options: ["A percentage","The remainder after division","Division rounded to int","None of the above"], correct: 1, explanation: "<code>%</code> is modulo -- returns the remainder. <code>7 % 3 = 1</code>. In FRC it's useful for cycling through array slots." },
  { question: "A variable declared inside an if block is accessible...", options: ["Anywhere in the file","Anywhere in the method","Only inside that if block","Only in the class"], correct: 2, explanation: "Scope!! Variables live and die within their enclosing curly braces. Declare inside an if? Gone when that block ends. Classic 'cannot find symbol' compiler error." },
  { question: "Output of: <code>int x = 10; x += 3; System.out.println(x);</code>", options: ["10","3","13","103"], correct: 2, explanation: "<code>x += 3</code> means <code>x = x + 3</code>. Starts at 10, becomes 13." }
], 'summer-w1');

// ── WEEK 1 TEST ───────────────────────────────────────────────
const test_w1 = new Quiz('test-summer-w1', [
  { question: "On team 2974, constants are named with which prefix?", options: ["SCREAMING_SNAKE_CASE","k prefix (e.g. kMotorID)","m_ prefix","no prefix, just final"], correct: 1, explanation: "WRT uses <code>k</code> prefix for constants -- <code>kMotorID</code>, <code>kMaxSpeed_mps</code>, etc. SCREAMING_SNAKE is standard java but not our convention." },
  { question: "Which type would you use for a motor speed between -1.0 and 1.0?", options: ["int","boolean","double","String"], correct: 2, explanation: "<code>double</code> handles decimal values. Motor speeds are almost always doubles like 0.75 or -1.0." },
  { question: "What is the output of <code>(int) 7.99</code>?", options: ["8","7","8.0","Compile error"], correct: 1, explanation: "Casting truncates toward zero, it doesn't round. <code>(int) 7.99 = 7</code>." },
  { question: "Why do we use <code>final</code> for motor IDs in Constants.java?", options: ["Makes the code faster","Prevents accidental reassignment","Required by WPILib","Makes the variable public"], correct: 1, explanation: "<code>final</code> means the value can never be changed after assignment. Motor IDs should never change at runtime, so making them final prevents accidents." },
  { question: "Which is valid Java syntax for a member variable on team 2974?", options: ["private double targetSpeed;","private double m_targetSpeed;","private double kTargetSpeed;","private double TARGET_SPEED;"], correct: 1, explanation: "We use <code>m_</code> prefix for instance/member variables. So <code>m_targetSpeed</code> is correct." },
  { question: "What does <code>11 % 4</code> evaluate to?", options: ["2","2.75","3","0"], correct: 2, explanation: "11 divided by 4 is 2 with a remainder of 3. <code>%</code> returns that remainder. So <code>11 % 4 = 3</code>." },
  { question: "Which of these follows camelCase correctly?", options: ["isShooterRunning","IsShooterRunning","is_shooter_running","ISSHOOTERRUNNING"], correct: 0, explanation: "camelCase: first word lowercase, each subsequent word starts with a capital. <code>isShooterRunning</code> is correct." },
  { question: "A <code>final</code> variable that has never been assigned a value will...", options: ["Default to 0","Default to null","Cause a compile error","Work fine"], correct: 2, explanation: "Java requires <code>final</code> variables to be assigned exactly once. Declaring without assigning is a compile error." }
], 'summer-w1-test');
</script>
