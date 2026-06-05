---
layout: week
title: "The Basics"
subtitle: "Variables, data types, operators, scope, and writing code other people can actually read."
badge: "Summer · Week 1 of 8"
phase: summer
phase_label: Summer
week_label: Week 1
page_id: summer-w1
weekly_test: true
topics:
  - Variables & Data Types
  - Operators
  - Scope & Naming
  - Type Casting
  - Comments & Code Syntax
prev_url:
prev_title:
next_url: /weeks/summer/week2
next_title: "Week 2 — Logic & Control Flow"
---

<h2 class="sh" id="topic-1">Variables &amp; Data Types</h2>
<p>A variable is a named container for a value. You give it a type, a name, and optionally a starting value. In FRC you use variables everywhere — motor IDs, speeds, sensor readings, on/off flags. Getting good at naming and typing them is literally half of writing good robot code.</p>

<h3 class="sub">Declaring Variables</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// syntax: type name = value;</span>
<span class="type">int</span>     motorID    = <span class="num">1</span>;
<span class="type">double</span>  motorSpeed = <span class="num">0.75</span>;
<span class="type">boolean</span> isRunning  = <span class="kw">false</span>;
<span class="type">String</span>  subsystem  = <span class="str">"Drivetrain"</span>;

<span class="cmt">// final = constant — can NEVER be reassigned</span>
<span class="kw">final</span> <span class="type">int</span> kMotorID = <span class="num">1</span>;</pre>
</div>

<div class="callout tip"><p><strong>WRT convention:</strong> On our team, constants use a <code>k</code> prefix — <code>kMotorID</code>, <code>kMaxSpeed_mps</code>. Member (instance) variables use <code>m_</code> prefix — <code>m_targetSpeed</code>. You'll see this everywhere in our codebase.</p></div>

<h3 class="sub">The Four Core Types</h3>
<p>There are lots of types in Java, but you'll be using these four constantly in robot code:</p>

<table>
<thead><tr><th>Type</th><th>Category</th><th>What it holds</th><th>FRC use case</th></tr></thead>
<tbody>
<tr><td><code>int</code></td><td>Primitive</td><td>Whole numbers</td><td>Motor CAN IDs, encoder ticks, loop counters</td></tr>
<tr><td><code>double</code></td><td>Primitive</td><td>Decimal numbers (64-bit)</td><td>Motor speeds (-1.0 to 1.0), distances, velocities</td></tr>
<tr><td><code>boolean</code></td><td>Primitive</td><td><code>true</code> or <code>false</code></td><td>Limit switch state, shooter at speed, auto done</td></tr>
<tr><td><code>String</code></td><td>Non-primitive</td><td>Text</td><td>Shuffleboard labels, log messages, error descriptions</td></tr>
</tbody>
</table>

<div class="callout info"><p><strong>Primitive vs Object:</strong> Primitives (<code>int</code>, <code>double</code>, <code>boolean</code>) are raw values stored directly. Non-primitives like <code>String</code> are objects with methods (<code>name.length()</code>, <code>name.toLowerCase()</code>). The difference matters more once we hit OOP week.</p></div>

<h3 class="sub">Uninitialized Variables</h3>
<p>Instance variables get default values (<code>0</code>, <code>0.0</code>, <code>false</code>, <code>null</code>). Local variables (inside a method) do NOT — you'll get a compile error if you try to use one before assigning it.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// This will NOT compile -- local var used before assignment</span>
<span class="type">int</span> speed;
System.out.println(speed); <span class="cmt">// error: variable speed might not have been initialized</span>

<span class="cmt">// Fine -- assign first</span>
<span class="type">int</span> speed = <span class="num">0</span>;
System.out.println(speed); <span class="cmt">// prints: 0</span></pre>
</div>

<h3 class="sub">Topic 1 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Robot Constants Block</div><div class="ch-sub">Declare variables like you would in Constants.java</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Declare the following, using proper WRT naming conventions: a constant int for the shooter motor CAN ID of 5, a constant double for max shooter speed of 0.9, a boolean for whether the shooter is currently spinning, and a String for the subsystem name "Shooter".</p>
    <textarea class="code-input" placeholder="// Write your Constants.java block here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w1-t1')">Show Solution</button></div>
    <div id="sol-w1-t1" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">final</span> <span class="type">int</span>     kShooterMotorID  = <span class="num">5</span>;
<span class="kw">final</span> <span class="type">double</span>  kMaxShooterSpeed = <span class="num">0.9</span>;
<span class="type">boolean</span> m_isShooterSpinning = <span class="kw">false</span>;
<span class="type">String</span>  m_subsystemName     = <span class="str">"Shooter"</span>;</pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 1 — Quick Check</h3>
<div id="quiz-w1-t1"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-2">Operators</h2>
<p>Operators let you compute things, compare values, and build expressions. You've seen most of these in math class, but a few are Java-specific and worth knowing cold.</p>

<h3 class="sub">Arithmetic Operators</h3>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Math</div><div class="cc-title">+ &nbsp;- &nbsp;* &nbsp;/ &nbsp;%</div><div class="cc-desc"><code>%</code> is modulo (remainder). <code>7 % 3 = 1</code>. Useful for looping array indices or clamping to a range.</div></div>
  <div class="concept-card"><div class="cc-label">Compound Assignment</div><div class="cc-title">+= &nbsp;-= &nbsp;*= &nbsp;/=</div><div class="cc-desc"><code>speed += 0.1</code> is short for <code>speed = speed + 0.1</code>. You'll write these constantly in control loops.</div></div>
  <div class="concept-card"><div class="cc-label">Increment / Decrement</div><div class="cc-title">++ &nbsp;--</div><div class="cc-desc"><code>i++</code> adds 1. <code>i--</code> subtracts 1. Bread and butter of for loops. Post-increment (<code>i++</code>) returns old value; pre-increment (<code>++i</code>) returns new.</div></div>
  <div class="concept-card"><div class="cc-label">Comparison</div><div class="cc-title">== &nbsp;!= &nbsp;&lt; &nbsp;&gt; &nbsp;&lt;= &nbsp;&gt;=</div><div class="cc-desc">Always return a boolean. Don't confuse <code>==</code> (compare) with <code>=</code> (assign). That's a subtle bug that won't crash but will give wrong results.</div></div>
</div>

<h3 class="sub">Integer Division Gotcha</h3>
<p>When you divide two <code>int</code>s in Java, you get an <code>int</code> back — the decimal is silently dropped. This causes real bugs.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// Integer division -- decimal dropped silently</span>
<span class="type">int</span> ticks = <span class="num">1500</span>;
<span class="type">int</span> ticksPerRev = <span class="num">2048</span>;
<span class="type">int</span> revs = ticks / ticksPerRev; <span class="cmt">// 0 !!! not 0.73</span>

<span class="cmt">// Fix 1: use doubles</span>
<span class="type">double</span> revs2 = (<span class="type">double</span>) ticks / ticksPerRev; <span class="cmt">// 0.732...</span>

<span class="cmt">// Fix 2: if one operand is a double literal, result is double</span>
<span class="type">double</span> revs3 = <span class="num">1500.0</span> / ticksPerRev; <span class="cmt">// also works</span></pre>
</div>

<div class="callout warning"><p><strong>In FRC this bites you hard.</strong> Encoder math, gear ratio calculations, PID error terms — all involve division. Always think about whether you want integer or double division before writing it.</p></div>

<h3 class="sub">Operator Precedence (Short Version)</h3>
<p>Java follows PEMDAS-like rules: <code>*</code> <code>/</code> <code>%</code> before <code>+</code> <code>-</code>, left to right within the same precedence. When in doubt, add parentheses — they're free and make intent obvious.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span> a = <span class="num">2</span> + <span class="num">3</span> * <span class="num">4</span>;   <span class="cmt">// 14, not 20 (multiplication first)</span>
<span class="type">int</span> b = (<span class="num">2</span> + <span class="num">3</span>) * <span class="num">4</span>; <span class="cmt">// 20 (parens override)</span>

<span class="cmt">// FRC example: velocity conversion</span>
<span class="type">double</span> speed_fps = encoderRate * (<span class="num">1.0</span> / <span class="num">2048</span>) * <span class="num">10</span> * wheelCircumference_ft;</pre>
</div>

<h3 class="sub">Topic 2 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Encoder Conversion</div><div class="ch-sub">Use operators to convert raw sensor data</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">A TalonFX encoder reports 2048 ticks per revolution. Given <code>int rawTicks = 9216</code>, calculate: (1) total revolutions as a double, (2) wheel distance in inches assuming a 4-inch diameter wheel (<code>circumference = Math.PI * 4</code>), and (3) whether the robot has moved more than 12 inches (boolean).</p>
    <textarea class="code-input" placeholder="// Write your conversion here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w1-t2')">Show Solution</button></div>
    <div id="sol-w1-t2" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span> rawTicks = <span class="num">9216</span>;
<span class="kw">final</span> <span class="type">int</span> kTicksPerRev = <span class="num">2048</span>;
<span class="kw">final</span> <span class="type">double</span> kWheelCircumference_in = Math.PI * <span class="num">4.0</span>;

<span class="type">double</span> revolutions   = (<span class="type">double</span>) rawTicks / kTicksPerRev; <span class="cmt">// 4.5</span>
<span class="type">double</span> distance_in   = revolutions * kWheelCircumference_in;
<span class="type">boolean</span> movedAFoot   = distance_in > <span class="num">12.0</span>; <span class="cmt">// true</span></pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 2 — Quick Check</h3>
<div id="quiz-w1-t2"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-3">Scope &amp; Naming</h2>
<p>Scope controls where a variable can be accessed. Naming controls whether anyone can understand your code in two months. Both matter a lot in a team codebase.</p>

<h3 class="sub">Scope Rules</h3>
<p>A variable lives within its enclosing curly braces <code>{ }</code>. Once execution leaves that block, the variable is gone.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public void</span> <span class="fn">periodic</span>() {
    <span class="type">double</span> speed = <span class="num">0.5</span>; <span class="cmt">// lives for the whole method</span>

    <span class="kw">if</span> (isButtonPressed) {
        <span class="type">double</span> boost = <span class="num">0.2</span>; <span class="cmt">// lives only inside this if block</span>
        speed += boost;
    }

    <span class="cmt">// boost is gone here -- compile error if you reference it</span>
    setMotor(speed); <span class="cmt">// speed is still alive</span>
}</pre>
</div>

<h3 class="sub">Class Scope vs Method Scope</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="type">ShooterSubsystem</span> {
    <span class="cmt">// Class scope — accessible from any method in this class</span>
    <span class="kw">private</span> <span class="type">double</span> m_targetSpeed = <span class="num">0.0</span>;
    <span class="kw">private</span> <span class="type">boolean</span> m_isSpinning = <span class="kw">false</span>;

    <span class="kw">public void</span> <span class="fn">setSpeed</span>(<span class="type">double</span> speed) {
        <span class="cmt">// Method scope — this 'clampedSpeed' only lives in setSpeed()</span>
        <span class="type">double</span> clampedSpeed = Math.min(speed, <span class="num">1.0</span>);
        m_targetSpeed = clampedSpeed; <span class="cmt">// sets the class variable</span>
    }

    <span class="kw">public double</span> <span class="fn">getSpeed</span>() {
        <span class="kw">return</span> m_targetSpeed; <span class="cmt">// class vars accessible here too</span>
    }
}</pre>
</div>

<div class="callout info"><p><strong>Access modifiers:</strong> <code>private</code> means only THIS class can access it. <code>public</code> means any class can. In FRC, member variables are almost always <code>private</code> — external code should use methods to get/set values, not reach in directly.</p></div>

<h3 class="sub">Naming Conventions</h3>
<p>We have a lot of programmers. Everyone thinks differently. Code that makes sense to you at midnight might be unreadable to someone else at 6am at regionals.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — bad vs good</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// BAD -- what does any of this mean?</span>
<span class="type">double</span> x1 = <span class="num">0.8</span>;
<span class="type">int</span> y = <span class="num">3</span>;
<span class="type">boolean</span> f = <span class="kw">true</span>;

<span class="cmt">// GOOD -- self-documenting</span>
<span class="type">double</span> m_maxShooterSpeed = <span class="num">0.8</span>;
<span class="type">int</span>    kShooterMotorID   = <span class="num">3</span>;
<span class="type">boolean</span> m_isShooterEnabled = <span class="kw">true</span>;</pre>
</div>

<table>
<thead><tr><th>What it is</th><th>Convention</th><th>Example</th></tr></thead>
<tbody>
<tr><td>Local variable / parameter</td><td>camelCase</td><td><code>targetSpeed</code>, <code>motorId</code></td></tr>
<tr><td>Instance (member) variable</td><td>m_camelCase</td><td><code>m_targetSpeed</code>, <code>m_isRunning</code></td></tr>
<tr><td>Constant (<code>final</code>)</td><td>kCamelCase</td><td><code>kMaxSpeed_mps</code>, <code>kMotorID</code></td></tr>
<tr><td>Class name</td><td>PascalCase</td><td><code>ShooterSubsystem</code>, <code>DriveCommand</code></td></tr>
<tr><td>Method name</td><td>camelCase</td><td><code>setSpeed()</code>, <code>getPosition()</code></td></tr>
</tbody>
</table>

<div class="callout warning"><p><strong>Unit suffixes:</strong> On WRT, we often put units in constant names — <code>kMaxSpeed_mps</code> (meters per second), <code>kArmLength_in</code> (inches). It prevents unit conversion bugs, which are incredibly common in FRC.</p></div>

<h3 class="sub">Topic 3 — Quick Check</h3>
<div id="quiz-w1-t3"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-4">Type Casting</h2>
<p>Sometimes you need to convert a value from one type to another. Java has rules about when this happens automatically and when you have to be explicit about it.</p>

<h3 class="sub">Widening vs Narrowing</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// WIDENING — automatic, no data lost</span>
<span class="cmt">// int (32-bit) fits inside double (64-bit), Java does this for you</span>
<span class="type">int</span> ticks = <span class="num">500</span>;
<span class="type">double</span> pos = ticks; <span class="cmt">// becomes 500.0 automatically</span>

<span class="cmt">// NARROWING — must be explicit, data can be lost</span>
<span class="type">double</span> reading = <span class="num">3.87</span>;
<span class="type">int</span> truncated = (<span class="type">int</span>) reading; <span class="cmt">// 3 -- decimal chopped, NOT rounded</span>

<span class="cmt">// Another common case</span>
<span class="type">double</span> precise = <span class="num">9.99</span>;
<span class="type">int</span> whole = (<span class="type">int</span>) precise; <span class="cmt">// 9, not 10</span></pre>
</div>

<div class="callout danger"><p><strong>Truncation is NOT rounding.</strong> <code>(int) 3.87</code> is <code>3</code>, not <code>4</code>. <code>(int) -1.9</code> is <code>-1</code>, not <code>-2</code>. Java always truncates toward zero. If you need rounding, use <code>Math.round()</code>, which returns a <code>long</code>, then cast that.</p></div>

<h3 class="sub">String Conversion</h3>
<p>Converting numbers to Strings (and back) comes up constantly for Shuffleboard, logging, and parsing config files.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// Number → String (for Shuffleboard / logging)</span>
<span class="type">double</span> speed = <span class="num">0.75</span>;
<span class="type">String</span> label = <span class="str">"Speed: "</span> + speed; <span class="cmt">// "Speed: 0.75"</span>
<span class="type">String</span> formatted = String.format(<span class="str">"%.2f m/s"</span>, speed); <span class="cmt">// "0.75 m/s"</span>

<span class="cmt">// String → Number (parsing config, sensor text feeds)</span>
<span class="type">String</span> raw = <span class="str">"42"</span>;
<span class="type">int</span> parsed = Integer.parseInt(raw);     <span class="cmt">// 42</span>
<span class="type">double</span> parsed2 = Double.parseDouble(<span class="str">"3.14"</span>); <span class="cmt">// 3.14</span></pre>
</div>

<h3 class="sub">Fill in the Blanks</h3>
<div id="fill-w1">
  <div class="fill-container">
    <span class="cmt">// Declare an int for motor ID of 5</span><br>
    <input class="fill-blank" data-answer="int" placeholder="???"> motorID = 5;
  </div>
  <div class="fill-container">
    <span class="cmt">// Declare a constant double for max speed (WRT style)</span><br>
    <span class="kw">final</span> <input class="fill-blank" data-answer="double" placeholder="???"> kMaxSpeed = 1.0;
  </div>
  <div class="fill-container">
    <span class="cmt">// Explicitly cast a double to int (truncates)</span><br>
    <span class="type">double</span> val = 4.9;<br>
    <span class="type">int</span> result = (<input class="fill-blank" data-answer="int" placeholder="??">)val;
  </div>
  <div class="fill-container">
    <span class="cmt">// Widening cast — int automatically fits in...</span><br>
    <span class="type">int</span> ticks = <span class="num">500</span>;<br>
    <input class="fill-blank" data-answer="double" placeholder="???"> pos = ticks;
  </div>
</div>
<div style="display:flex;align-items:center;gap:12px;margin-top:10px">
  <button class="btn btn-navy btn-sm" onclick="checkFills('fill-w1')">Check Answers</button>
  <span id="fill-w1-result" style="font-size:13px;font-weight:700;display:none"></span>
</div>

<h3 class="sub">Topic 4 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Motor Calculator</div><div class="ch-sub">Variables, types, casting, operators all in one</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Declare <code>final double kGearRatio = 8.46</code> and <code>double motorRPM = 5400.0</code>. Calculate <code>wheelRPM</code> as a double. Cast it to int. Then calculate the wheel surface speed in ft/s given a 4-inch radius wheel (<code>circumference = 2 * Math.PI * (4.0/12.0)</code> feet). Comment every line.</p>
    <textarea class="code-input" placeholder="// Write your code here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w1-t4')">Show Solution</button></div>
    <div id="sol-w1-t4" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// Gear ratio between motor and wheel shaft</span>
<span class="kw">final</span> <span class="type">double</span> kGearRatio = <span class="num">8.46</span>;
<span class="cmt">// Falcon 500 free-spin RPM</span>
<span class="type">double</span> motorRPM = <span class="num">5400.0</span>;
<span class="cmt">// Wheel speed after gear reduction</span>
<span class="type">double</span> wheelRPM = motorRPM / kGearRatio; <span class="cmt">// ~638.3 RPM</span>
<span class="cmt">// Truncated to integer (loses fractional part)</span>
<span class="type">int</span> wheelRPM_int = (<span class="type">int</span>) wheelRPM; <span class="cmt">// 638</span>
<span class="cmt">// Wheel circumference in feet (4-inch radius wheel)</span>
<span class="type">double</span> kCircumference_ft = <span class="num">2</span> * Math.PI * (<span class="num">4.0</span> / <span class="num">12.0</span>);
<span class="cmt">// Surface speed in feet per second (RPM * circumference / 60)</span>
<span class="type">double</span> speed_fps = wheelRPM * kCircumference_ft / <span class="num">60.0</span>;</pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 4 — Quick Check</h3>
<div id="quiz-w1-t4"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-5">Comments &amp; Code Syntax</h2>
<p>Java has strict rules about how code is structured. getting these right means the compiler stops yelling at you. understanding comments means your teammates (and future you) can actually read what you wrote.</p>

<h3 class="sub">The Three Comment Types</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — all three comment types</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// Single-line comment — explain a tricky line inline
// Everything after // on this line is ignored by the compiler</span>

<span class="cmt">/*
 * Block comment — spans multiple lines.
 * Use when you want to describe a section of code
 * or temporarily disable a chunk during debugging.
 */</span>

<span class="cmt">/**
 * Javadoc comment — generates HTML documentation.
 * Use above every public class and public method.
 *
 * @param speed the target motor speed (-1.0 to 1.0)
 * @return true if the motor reached the target speed
 */</span>
<span class="kw">public boolean</span> <span class="fn">setSpeed</span>(<span class="type">double</span> speed) {
    <span class="cmt">// implementation here...</span>
    <span class="kw">return</span> <span class="kw">true</span>;
}</pre>
</div>

<div class="callout tip"><p><strong>WRT rule:</strong> every <code>public</code> method gets a Javadoc. every tricky piece of logic gets an inline comment explaining <em>why</em>, not just <em>what</em>. "// set speed" is useless. "// clamp to safe range — motor faults above 1.0" is not.</p></div>

<h3 class="sub">Java Code Structure</h3>
<p>every Java file follows this exact structure. if something is in the wrong order, the compiler refuses to compile it.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — anatomy of a class file</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">package</span> frc.robot.subsystems;   <span class="cmt">// 1. package declaration (optional, but always present in FRC)</span>

<span class="kw">import</span> edu.wpi.first.wpilibj2.command.SubsystemBase; <span class="cmt">// 2. imports</span>

<span class="cmt">/** Javadoc for the class */</span>
<span class="kw">public class</span> <span class="cls">ShooterSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> { <span class="cmt">// 3. class declaration</span>

    <span class="cmt">// 4. fields (member variables)</span>
    <span class="kw">private final</span> <span class="type">int</span> m_motorID;

    <span class="cmt">// 5. constructor</span>
    <span class="kw">public</span> <span class="cls">ShooterSubsystem</span>() {
        m_motorID = <span class="num">5</span>;
    }

    <span class="cmt">// 6. methods</span>
    <span class="kw">public int</span> <span class="fn">getMotorID</span>() {
        <span class="kw">return</span> m_motorID;
    }

} <span class="cmt">// end of class — no semicolon after the closing brace!!</span></pre>
</div>

<h3 class="sub">The Semicolon Rule</h3>
<p>every statement ends with <code>;</code>. the compiler treats a semicolon as "end of instruction." forgetting one is the #1 beginner compile error.</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Needs ;</div><div class="cc-title">Variable declarations</div><div class="cc-desc"><code>int x = 5;</code> — every variable declaration and assignment.</div></div>
  <div class="concept-card"><div class="cc-label">Needs ;</div><div class="cc-title">Method calls</div><div class="cc-desc"><code>motor.set(0.5);</code> — every standalone method call is a statement.</div></div>
  <div class="concept-card"><div class="cc-label">No ;</div><div class="cc-title">Block headers</div><div class="cc-desc"><code>if (x > 0) {</code> — no semicolon. The <code>{ }</code> wraps the body.</div></div>
  <div class="concept-card"><div class="cc-label">No ;</div><div class="cc-title">Class / method signatures</div><div class="cc-desc"><code>public class Robot {</code> — no semicolon. Body follows in { }.</div></div>
</div>

<h3 class="sub">Case Sensitivity &amp; Reserved Keywords</h3>
<p>Java is case-sensitive. <code>Speed</code>, <code>speed</code>, and <code>SPEED</code> are three different variables. keywords like <code>class</code>, <code>int</code>, <code>if</code>, <code>return</code>, <code>final</code>, <code>void</code> are reserved — you can't use them as variable names.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — common beginner mistakes</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// WRONG — 'Class' is not the same as 'class'</span>
<span class="type">Class</span> myClass = <span class="kw">new</span> <span class="type">Class</span>();  <span class="cmt">// compile error: Class is a different thing</span>

<span class="cmt">// WRONG — can't name a variable 'class' (reserved keyword)</span>
<span class="type">int</span> class = <span class="num">5</span>;  <span class="cmt">// compile error: 'class' is a keyword</span>

<span class="cmt">// CORRECT</span>
<span class="type">int</span> myClass = <span class="num">5</span>;
<span class="type">String</span> className = <span class="str">"Shooter"</span>;</pre>
</div>

<div class="callout info"><p><strong>Helpful tip from W3Schools:</strong> <a href="https://www.w3schools.com/java/java_syntax.asp" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">w3schools.com/java/java_syntax.asp</a> has a clean breakdown of Java syntax rules with runnable examples — good bookmark for when you hit a weird compiler error.</p></div>

<h3 class="sub">Topic 5 — Quick Check</h3>
<div id="quiz-w1-t5"></div>

<div class="project-task">
  <div class="pt-header">
    <div class="pt-icon"><i data-lucide="wrench"></i></div>
    <div class="pt-header-title">Project Task — Week 1</div>
    <div class="pt-filename">Constants.java</div>
  </div>
  <div class="pt-body">
    <p>Create your <code>Constants.java</code> file. This is the foundation of your whole MiniBot project — every number goes here.</p>
    <ul>
      <li>Create two <code>public static final class</code> inner classes: <code>DriveK</code> and <code>ShooterK</code></li>
      <li>Inside <code>DriveK</code>: four motor IDs (FL, FR, BL, BR), a max speed constant in m/s, and a gear ratio</li>
      <li>Inside <code>ShooterK</code>: two motor IDs (top and bottom flywheel), a max RPS, and a speed threshold for "at speed" detection</li>
      <li>All constants use <code>k</code> prefix and are <code>public static final</code></li>
      <li>Add a Javadoc comment to the class and each inner class</li>
    </ul>
    <span class="pt-note">you'll add to this file in later weeks as you need more constants. keep it tidy.</span>
  </div>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="weekly-test">Weekly Test</h2>
<p>covers everything from week 1. a bit longer than the topic quizzes and your score gets sent to the leads :) try it without looking back at the content first!!</p>
<div class="weekly-test-block">
  <div class="wt-header">
    <div class="wt-icon"><i data-lucide="clipboard-list"></i></div>
    <div>
      <div class="wt-title">week 1 test</div>
      <div class="wt-sub">variables, types, operators, scope, naming conventions · 8 questions · good luck!!</div>
    </div>
  </div>
  <div id="test-summer-w1"></div>
</div>

<script>
// ── TOPIC 1 QUIZ: Variables & Data Types ──────────────────────
const quiz_w1_t1 = new Quiz('quiz-w1-t1', [
  { question: "What does the <code>final</code> keyword do in Java?", options: ["Makes the variable global","Prevents the variable from being reassigned","Makes the variable a primitive","Hides the variable from other classes"], correct: 1, explanation: "<code>final</code> means the variable can only be assigned once. After that, any attempt to reassign it is a compile error. That's why we use it for constants like motor IDs." },
  { question: "On team 2974, how should a constant integer for a motor ID be named?", options: ["MOTOR_ID","motorId","kMotorID","m_motorID"], correct: 2, explanation: "WRT uses the <code>k</code> prefix for constants — <code>kMotorID</code>. <code>m_</code> prefix is for instance (member) variables. SCREAMING_SNAKE is standard Java but not our convention." },
  { question: "Which type would you use to store a motor speed that ranges from -1.0 to 1.0?", options: ["int","boolean","double","String"], correct: 2, explanation: "<code>double</code> holds decimal numbers. Motor speeds are almost always doubles. <code>int</code> would truncate everything to -1, 0, or 1." },
  { question: "What default value does an uninitialized <em>instance</em> boolean have?", options: ["true","null","0","false"], correct: 3, explanation: "Instance booleans default to <code>false</code>. Numeric types default to 0. Reference types default to <code>null</code>. Local variables get no default — using one before assignment is a compile error." }
], 'summer-w1');

// ── TOPIC 2 QUIZ: Operators ────────────────────────────────────
const quiz_w1_t2 = new Quiz('quiz-w1-t2', [
  { question: "What does <code>7 % 3</code> evaluate to?", options: ["2.33","1","2","0"], correct: 1, explanation: "The <code>%</code> operator returns the remainder. 7 ÷ 3 = 2 with a remainder of 1. So <code>7 % 3 = 1</code>." },
  { question: "What is the result of <code>int result = 5 / 2;</code> in Java?", options: ["2.5","3","2","Compile error"], correct: 2, explanation: "Integer division in Java drops the decimal part. 5 / 2 = 2 (not 2.5). This is a VERY common source of bugs in FRC encoder math." },
  { question: "What does <code>speed += 0.1;</code> mean?", options: ["speed = 0.1","speed = speed - 0.1","speed = speed + 0.1","speed + 0.1 == speed"], correct: 2, explanation: "<code>+=</code> is compound assignment. <code>x += y</code> is equivalent to <code>x = x + y</code>." },
  { question: "Output of: <code>int x = 10; x += 3; System.out.println(x);</code>", options: ["10","3","13","103"], correct: 2, explanation: "x starts at 10, then x += 3 makes it 13." }
], 'summer-w1');

// ── TOPIC 3 QUIZ: Scope & Naming ──────────────────────────────
const quiz_w1_t3 = new Quiz('quiz-w1-t3', [
  { question: "A variable declared inside an if block is accessible...", options: ["Anywhere in the file","Anywhere in the method","Only inside that if block","Only in the class"], correct: 2, explanation: "Scope!! Variables live and die within their enclosing <code>{ }</code>. Declare inside an if? Gone when that block ends. Classic 'cannot find symbol' error." },
  { question: "On WRT, which prefix is used for instance (member) variables?", options: ["k","m_","s_","_"], correct: 1, explanation: "Member variables use <code>m_</code> prefix — <code>m_targetSpeed</code>, <code>m_isRunning</code>. Constants use <code>k</code>. This is a WRT-specific convention from our codebase." },
  { question: "Which naming convention is used for Java class names?", options: ["camelCase","PascalCase","SCREAMING_SNAKE","kCamelCase"], correct: 1, explanation: "Classes always use PascalCase — first letter of every word capitalized. <code>ShooterSubsystem</code>, <code>DriveCommand</code>, <code>RobotContainer</code>." },
  { question: "Why do WRT constants sometimes include unit suffixes like <code>kMaxSpeed_mps</code>?", options: ["It's required by WPILib","To prevent unit conversion bugs","It makes the code compile faster","To match Java naming rules"], correct: 1, explanation: "Unit suffixes (_mps, _in, _ft) prevent unit confusion bugs. If one method expects meters/s and you pass feet/s by mistake, the bug is immediate and obvious from the name." }
], 'summer-w1');

// ── TOPIC 4 QUIZ: Type Casting ─────────────────────────────────
const quiz_w1_t4 = new Quiz('quiz-w1-t4', [
  { question: "You cast <code>double speed = 3.9</code> to int. What value do you get?", options: ["4 (rounds up)","3 (truncates)","3.9 (unchanged)","Compile error"], correct: 1, explanation: "Java truncates toward zero when casting double to int. <code>(int) 3.9 = 3</code>, not 4. Use <code>Math.round()</code> if you need rounding." },
  { question: "Which of these is a widening conversion (automatic, no data loss)?", options: ["double to int","int to boolean","int to double","double to String"], correct: 2, explanation: "<code>int</code> → <code>double</code> is widening. An int (32-bit) fits perfectly inside a double (64-bit). Java does this automatically. The others lose information or require explicit casts." },
  { question: "What is <code>(int) -2.8</code>?", options: ["-3","-2","2","3"], correct: 1, explanation: "Truncation toward zero: -2.8 becomes -2 (not -3). Java always chops toward zero regardless of whether the number is positive or negative." },
  { question: "How do you convert an int to a String for a Shuffleboard label?", options: ["(String) myInt","myInt.toString()","Integer.parseString(myInt)","\"\" + myInt  OR  Integer.toString(myInt)"], correct: 3, explanation: "Two common ways: concatenate with empty string (<code>\"\" + 42</code> gives <code>\"42\"</code>), or use <code>Integer.toString(42)</code>. Both work." }
], 'summer-w1');

// ── TOPIC 5 QUIZ: Comments & Code Syntax ─────────────────────
const quiz_w1_t5 = new Quiz('quiz-w1-t5', [
  { question: "Which comment type generates HTML documentation when you run Javadoc?", options: ["// single-line","/* block */","/** javadoc */","<!-- html -->"], correct: 2, explanation: "<code>/** ... */</code> is Javadoc syntax. IDEs (VS Code, IntelliJ) show these as hover tooltips. Every public method and class in WRT code should have one." },
  { question: "Which statement correctly ends with a semicolon?", options: ["if (x > 0) {","public class Robot {","int speed = 5;","public void periodic() {"], correct: 2, explanation: "Statements (declarations, assignments, method calls) end with <code>;</code>. Block headers like class signatures, if, for, and method signatures do NOT get semicolons — they're followed by <code>{ }</code>." },
  { question: "What do curly braces { } indicate in Java?", options: ["The start of a comment","A code block (method body, if body, class body)","The end of a file","An array literal"], correct: 1, explanation: "Curly braces delimit blocks. A method body lives inside <code>{ }</code>, as do if/else branches, loops, and class bodies. Everything inside a pair of braces is one 'scope'." },
  { question: "Which identifier would cause a compile error in Java?", options: ["mySpeed","m_targetVelocity","class","kMotorID"], correct: 2, explanation: "<code>class</code> is a reserved keyword in Java — you can't use it as a variable name. Java has ~50 reserved keywords: <code>if</code>, <code>int</code>, <code>return</code>, <code>final</code>, <code>void</code>... your IDE highlights them." }
], 'summer-w1');

// ── WEEK 1 TEST ────────────────────────────────────────────────
const test_w1 = new Quiz('test-summer-w1', [
  { question: "On team 2974, constants are named with which prefix?", options: ["SCREAMING_SNAKE_CASE","k prefix (e.g. kMotorID)","m_ prefix","no prefix, just final"], correct: 1, explanation: "WRT uses <code>k</code> prefix for constants — <code>kMotorID</code>, <code>kMaxSpeed_mps</code>. SCREAMING_SNAKE is standard Java but not our convention." },
  { question: "Which type would you use for a motor speed between -1.0 and 1.0?", options: ["int","boolean","double","String"], correct: 2, explanation: "<code>double</code> handles decimal values. Motor speeds are almost always doubles like 0.75 or -1.0." },
  { question: "What is the output of <code>(int) 7.99</code>?", options: ["8","7","8.0","Compile error"], correct: 1, explanation: "Casting truncates toward zero, it doesn't round. <code>(int) 7.99 = 7</code>." },
  { question: "Why do we use <code>final</code> for motor IDs in Constants.java?", options: ["Makes the code faster","Prevents accidental reassignment","Required by WPILib","Makes the variable public"], correct: 1, explanation: "<code>final</code> means the value can never be changed after assignment. Motor IDs should never change at runtime, so making them final prevents accidents." },
  { question: "Which is the correct WRT-style member variable declaration?", options: ["private double targetSpeed;","private double m_targetSpeed;","private double kTargetSpeed;","private double TARGET_SPEED;"], correct: 1, explanation: "We use <code>m_</code> prefix for instance/member variables. So <code>m_targetSpeed</code> is correct." },
  { question: "What does <code>11 % 4</code> evaluate to?", options: ["2","2.75","3","0"], correct: 2, explanation: "11 divided by 4 is 2 with a remainder of 3. <code>%</code> returns that remainder. So <code>11 % 4 = 3</code>." },
  { question: "Which of these follows camelCase correctly?", options: ["isShooterRunning","IsShooterRunning","is_shooter_running","ISSHOOTERRUNNING"], correct: 0, explanation: "camelCase: first word lowercase, each subsequent word starts with a capital. <code>isShooterRunning</code> is correct." },
  { question: "A local variable declared inside an if block...", options: ["Is accessible anywhere in the method","Is accessible anywhere in the class","Is only accessible inside that if block","Defaults to 0 if not assigned"], correct: 2, explanation: "Scope!! Variables live and die within their enclosing curly braces. A local var in an if block dies when that block ends." }
], 'summer-w1-test');
</script>
