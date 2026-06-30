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
  - Project Task
prev_url:
prev_title:
next_url: /weeks/summer/week2
next_title: "Week 2 — Logic & Control Flow"
---

<h2 class="sh" id="topic-1">Variables &amp; Data Types</h2>

<p>ok so before we write a single line of robot code, we need to talk about the most fundamental thing in all of programming: <strong>variables</strong>. if you've never programmed before, don't worry — this is actually pretty intuitive once you have the right mental model for it.</p>

<h3 class="sub">what even IS a variable?</h3>

<p>imagine you're making a sandwich and you need to remember how many slices of bread you have left. you'd probably just... hold that number in your head. your brain grabs a little chunk of memory and stashes the number there so you can use it later. a variable is exactly that — it's a <strong>named slot in your computer's memory</strong> where you can stash a value and pull it back out whenever you need it.</p>

<p>think of it like a labeled box. you write a name on the outside of the box (that's the variable name), you decide what kind of thing goes inside (that's the type), and then you put something in it (that's the value). later, whenever you need that value, you just look at the box with that name on it.</p>

<div class="callout info"><p><strong>what's RAM?</strong> when your program runs, Java grabs a chunk of your computer's RAM (random access memory) to work with. RAM is super fast but temporary — it only exists while the program is running. every variable you declare takes up a little piece of that RAM. when the robot reboots, poof, it's all gone. that's totally fine for us, because the robot starts fresh every time anyway.</p></div>

<p><strong>why does it matter in FRC?</strong> your robot needs to remember TONS of stuff at once — what speed the motor is running at, whether a button is being pressed, what the encoder (an encoder is a sensor that measures how far a motor shaft has rotated) is reading, what subsystem (a subsystem is one distinct part of the robot — intake, drivetrain, shooter, etc. — represented as a class) is active. every single one of those is a variable. you literally cannot write robot code without them.</p>

<h3 class="sub">declaring a variable</h3>

<p>in Java, when you create a variable you have to tell Java three things: the <strong>type</strong> (what kind of thing), the <strong>name</strong> (what you want to call it), and optionally a <strong>starting value</strong>. this process of creating a variable is called "declaring" it.</p>

<p>the format is always: <code>type name = value;</code></p>

<p>let's see each of the four types you'll use in robot code, one by one:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// int — whole numbers only, no decimals</span>
<span class="cmt">// use it for things that are always a whole number: motor IDs, counts, encoder ticks</span>
<span class="type">int</span> motorID = <span class="num">5</span>;

<span class="cmt">// double — decimal numbers (very precise, 64-bit)</span>
<span class="cmt">// use it for speeds, distances, angles — anything that can be a fraction</span>
<span class="type">double</span> motorSpeed = <span class="num">0.75</span>;

<span class="cmt">// boolean — only two possible values: true or false</span>
<span class="cmt">// use it for on/off states, flags, "did this happen?"</span>
<span class="type">boolean</span> isRunning = <span class="kw">false</span>;

<span class="cmt">// String — a piece of text (note the capital S — it's special)</span>
<span class="cmt">// use it for labels, log messages, display names</span>
<span class="type">String</span> subsystemName = <span class="str">"Drivetrain"</span>;</pre>
</div>

<p>here's another example showing a full block of variable declarations you'd actually see in robot code — notice how each line has a comment explaining what it represents:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// shooter subsystem variables</span>
<span class="type">int</span>     topMotorID     = <span class="num">7</span>;      <span class="cmt">// the unique number that identifies this motor on the robot's wiring system</span>
<span class="type">int</span>     bottomMotorID  = <span class="num">8</span>;      <span class="cmt">// same idea — unique ID for the bottom flywheel motor on the CAN bus</span>
<span class="type">double</span>  targetSpeed    = <span class="num">0.85</span>;   <span class="cmt">// desired flywheel speed (0.0 to 1.0)</span>
<span class="type">boolean</span> isAtSpeed      = <span class="kw">false</span>;  <span class="cmt">// whether shooter has reached target speed</span>
<span class="type">String</span>  subsystemName  = <span class="str">"Shooter"</span>; <span class="cmt">// used for logging and dashboard display</span></pre>
</div>

<h3 class="sub">the <code>final</code> keyword — constants</h3>

<p>sometimes you have a value that should <em>never</em> change. like a motor's CAN ID — once you wire it to port 5, it stays port 5 forever. you'd never want some random part of your code to accidentally change that to 7 at runtime and suddenly the wrong motor is spinning.</p>

<p>that's what <code>final</code> is for. it's like a sticky note that you can write on exactly once, and then the note is laminated shut. you can read it forever, but you can NEVER change what it says.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// regular variable — can be changed later</span>
<span class="type">double</span> motorSpeed = <span class="num">0.5</span>;
motorSpeed = <span class="num">0.8</span>;  <span class="cmt">// totally fine, reassignment is allowed</span>

<span class="cmt">// constant — can NEVER be reassigned after this line</span>
<span class="kw">final</span> <span class="type">int</span> kMotorID = <span class="num">5</span>;
kMotorID = <span class="num">6</span>;  <span class="cmt">// COMPILE ERROR: cannot assign a value to final variable kMotorID</span>

<span class="cmt">// in robot code, constants live in Constants.java and look like this:</span>
<span class="kw">public</span> <span class="kw">static</span> <span class="kw">final</span> <span class="type">int</span>    kShooterMotorID  = <span class="num">7</span>;
<span class="kw">public</span> <span class="kw">static</span> <span class="kw">final</span> <span class="type">double</span> kMaxSpeed_mps    = <span class="num">4.5</span>;   <span class="cmt">// meters per second</span>
<span class="kw">public</span> <span class="kw">static</span> <span class="kw">final</span> <span class="type">double</span> kGearRatio        = <span class="num">8.46</span>;  <span class="cmt">// motor turns per wheel turn</span></pre>
</div>

<div class="callout tip"><p><strong>WRT convention:</strong> on our team, constants use a <code>k</code> prefix — <code>kMotorID</code>, <code>kMaxSpeed_mps</code>. member (instance) variables use <code>m_</code> prefix — <code>m_targetSpeed</code>. you'll see this absolutely everywhere in our codebase. we'll go deeper on naming in topic 3, but start noticing it now.</p></div>

<h3 class="sub">the four core types (reference table)</h3>

<p>there are actually tons of types in Java, but these four are what you'll use 95% of the time in robot code. memorize them:</p>

<table>
<thead><tr><th>Type</th><th>Category</th><th>What it holds</th><th>FRC use case</th></tr></thead>
<tbody>
<tr><td><code>int</code></td><td>Primitive</td><td>Whole numbers only (-2 billion to +2 billion)</td><td>Motor CAN IDs, encoder ticks, loop counters, game piece counts</td></tr>
<tr><td><code>double</code></td><td>Primitive</td><td>Decimal numbers, very precise (64-bit)</td><td>Motor speeds (-1.0 to 1.0), distances in meters, velocities, angles in degrees</td></tr>
<tr><td><code>boolean</code></td><td>Primitive</td><td><code>true</code> or <code>false</code>, that's it</td><td>Limit switch state, "is shooter at speed?", "did autonomous finish?", button state</td></tr>
<tr><td><code>String</code></td><td>Non-primitive</td><td>Any text, any length</td><td>Shuffleboard widget labels, log messages, error descriptions, subsystem names</td></tr>
</tbody>
</table>

<div class="callout info"><p><strong>primitive vs object — what's the difference?</strong> primitives (<code>int</code>, <code>double</code>, <code>boolean</code>) are raw values stored directly in memory — super simple, super fast. non-primitives like <code>String</code> are objects, which means they're more complex under the hood and come with built-in methods (<code>name.length()</code>, <code>name.toLowerCase()</code>, etc). the distinction matters more once we hit OOP week, but just know: <code>String</code> with a capital S is special compared to the lowercase primitives.</p></div>

<h3 class="sub">what if you don't give a variable a starting value?</h3>

<p>this is actually an important distinction that trips up beginners a lot. there are two kinds of variables in Java: <strong>instance variables</strong> (variables declared at the top of a class, outside any method) and <strong>local variables</strong> (variables declared inside a method).</p>

<p>instance variables get free default values if you don't set them. local variables do NOT — Java will refuse to let you use one until you've given it a value first.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">ShooterSubsystem</span> {

    <span class="cmt">// instance variables — these get default values automatically</span>
    <span class="kw">private</span> <span class="type">int</span>     m_motorID;    <span class="cmt">// defaults to 0</span>
    <span class="kw">private</span> <span class="type">double</span>  m_speed;      <span class="cmt">// defaults to 0.0</span>
    <span class="kw">private</span> <span class="type">boolean</span> m_isRunning;  <span class="cmt">// defaults to false</span>
    <span class="kw">private</span> <span class="type">String</span>  m_name;       <span class="cmt">// defaults to null (nothing)</span>

    <span class="kw">public void</span> <span class="fn">someMethod</span>() {
        <span class="cmt">// local variable — NO default, must assign before using</span>
        <span class="type">int</span> speed;
        System.out.<span class="fn">println</span>(speed); <span class="cmt">// COMPILE ERROR: variable speed might not have been initialized</span>

        <span class="cmt">// fix: assign it first, then use it</span>
        <span class="type">int</span> fixedSpeed = <span class="num">0</span>;
        System.out.<span class="fn">println</span>(fixedSpeed); <span class="cmt">// works fine, prints: 0</span>
    }
}</pre>
</div>

<div class="callout warning"><p><strong>common beginner gotcha:</strong> just because an instance variable <em>can</em> default to 0 or false doesn't mean you should rely on that. always initialize your variables explicitly. it makes your code way clearer and prevents subtle bugs where you forget to set something and it silently uses 0 or null when you didn't expect it.</p></div>

<h3 class="sub">bad names vs good names</h3>

<p>one more thing before the quiz — naming matters a LOT. here's a side-by-side that shows why:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — bad vs good names</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// BAD — what does any of this mean? you have no idea</span>
<span class="type">double</span> x1 = <span class="num">0.8</span>;
<span class="type">int</span> y = <span class="num">3</span>;
<span class="type">boolean</span> f = <span class="kw">true</span>;
<span class="type">String</span> s = <span class="str">"thing"</span>;

<span class="cmt">// GOOD — completely self-documenting, no guessing required</span>
<span class="kw">final</span> <span class="type">double</span>  kMaxShooterSpeed    = <span class="num">0.8</span>;    <span class="cmt">// k prefix = constant</span>
<span class="kw">final</span> <span class="type">int</span>     kShooterMotorID     = <span class="num">3</span>;      <span class="cmt">// immediately obvious what this is</span>
<span class="type">boolean</span> m_isShooterEnabled  = <span class="kw">true</span>;   <span class="cmt">// m_ prefix = member variable</span>
<span class="type">String</span>  m_subsystemName     = <span class="str">"Shooter"</span>; <span class="cmt">// no mystery here</span></pre>
</div>

<h3 class="sub">Topic 1 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Robot Shooter Block</div><div class="ch-sub">Declare variables like you would in Shooter.java</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Declare four variables using WRT naming conventions:<br>• a constant <code>int</code> — the shooter motor's CAN ID (value: 5)<br>• a constant <code>double</code> — the max shooter speed (value: 0.9)<br>• a <code>boolean</code> — whether the shooter is currently spinning (start it as <code>false</code>)<br>• a <code>String</code> — the subsystem name (value: <code>"Shooter"</code>)<br><br>Then print all four with <code>System.out.println</code>.</p>
    <textarea class="code-input" placeholder="// Write your Shooter.java block here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w1-t1')">Show Solution</button></div>
    <div id="sol-w1-t1" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// constants use final + k prefix</span>
<span class="kw">final</span> <span class="type">int</span>    kShooterMotorID     = <span class="num">5</span>;
<span class="kw">final</span> <span class="type">double</span> kMaxShooterSpeed    = <span class="num">0.9</span>;

<span class="cmt">// member variables use m_ prefix (no final, these can change at runtime)</span>
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

<p>operators are just symbols that let you <em>do stuff</em> with values — add them, subtract them, compare them, combine them. you already know most of these from math class. a few have Java-specific twists that are worth knowing cold because they cause real bugs if you don't.</p>

<h3 class="sub">what even IS an operator?</h3>

<p>think of an operator like a tiny machine that takes values in and spits a result out. the <code>+</code> operator takes two numbers and gives you their sum. the <code>></code> operator takes two numbers and gives you a yes/no answer about which is bigger. that's really all it is.</p>

<p><strong>why does it matter in FRC?</strong> literally every calculation on the robot uses operators — converting encoder ticks to rotations, clamping motor speeds to safe ranges, figuring out if a sensor reading crossed a threshold. if you don't understand integer division and modulo, you WILL introduce bugs in your first week of writing real robot code.</p>

<h3 class="sub">arithmetic operators</h3>

<p>let's go through each one with a standalone example. no giant code dumps — just one at a time so you actually remember them:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// + addition — adds two values</span>
<span class="type">double</span> total = <span class="num">3.0</span> + <span class="num">1.5</span>;   <span class="cmt">// total = 4.5</span>

<span class="cmt">// - subtraction — subtracts second from first</span>
<span class="type">double</span> diff = <span class="num">5.0</span> - <span class="num">2.0</span>;    <span class="cmt">// diff = 3.0</span>

<span class="cmt">// * multiplication — multiplies two values</span>
<span class="type">double</span> product = <span class="num">4.0</span> * <span class="num">2.5</span>; <span class="cmt">// product = 10.0</span>

<span class="cmt">// / division — divides first by second (CAREFUL with ints! see below)</span>
<span class="type">double</span> quotient = <span class="num">9.0</span> / <span class="num">4.0</span>; <span class="cmt">// quotient = 2.25</span>

<span class="cmt">// % modulo — gives you the REMAINDER after division</span>
<span class="type">int</span> remainder = <span class="num">7</span> % <span class="num">3</span>;       <span class="cmt">// 7 ÷ 3 = 2, with 1 left over. so remainder = 1</span></pre>
</div>

<h3 class="sub">the integer division gotcha (this WILL bite you)</h3>

<p>ok story time. imagine you have 5 cookies and 2 friends. you want to split them evenly. in real life, each person gets 2.5 cookies. but Java doesn't work like that for integers. Java says: each person gets 2 cookies. the leftover half? thrown in the trash. silently. no warning, no error. just gone.</p>

<p>this is called <strong>integer division</strong> and it is the source of SO many bugs in FRC code. any time you divide two <code>int</code> values, the decimal part is simply chopped off and discarded:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// classic FRC bug: encoder math with integer division</span>
<span class="type">int</span> ticks       = <span class="num">1500</span>;
<span class="type">int</span> ticksPerRev = <span class="num">2048</span>;
<span class="type">int</span> revs        = ticks / ticksPerRev; <span class="cmt">// you think this is ~0.73 right? WRONG</span>
                                        <span class="cmt">// it's 0. the 0.73 is silently thrown away.</span>

<span class="cmt">// ─────────────────────────────────────────</span>
<span class="cmt">// Fix 1: cast one of the ints to double first</span>
<span class="type">double</span> revsFixed = (<span class="type">double</span>) ticks / ticksPerRev; <span class="cmt">// 0.732... correct!!</span>

<span class="cmt">// Fix 2: use a double literal (the .0 forces Java to use double math)</span>
<span class="type">double</span> revsFixed2 = <span class="num">1500.0</span> / ticksPerRev;          <span class="cmt">// also 0.732... correct!!</span>

<span class="cmt">// Fix 3: declare both as double from the start if you need decimals</span>
<span class="type">double</span> dTicks       = <span class="num">1500.0</span>;
<span class="type">double</span> dTicksPerRev = <span class="num">2048.0</span>;
<span class="type">double</span> revsFixed3   = dTicks / dTicksPerRev; <span class="cmt">// 0.732... correct!!</span></pre>
</div>

<div class="callout danger"><p><strong>this bites you HARD in FRC.</strong> encoder math, gear ratio calculations, PID error terms, distance calculations — all of these involve division. every time you write a division, ask yourself: "do I want integer or decimal math here?" if there's any chance the answer has a decimal, use doubles.</p></div>

<h3 class="sub">modulo — the clock operator</h3>

<p>modulo (<code>%</code>) gives you the <em>remainder</em> after dividing. here's a quick way to think about it: imagine a 12-hour clock. if it's 8pm and you add 15 hours, what time is it? 8 + 15 = 23, but on a 12-hour clock that's 23 % 12 = 11. so it's 11am.</p>

<p>in robot code, modulo is great for things like "wrap around to the beginning of a list" or "keep an angle between 0 and 360":</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// basic examples</span>
<span class="type">int</span> a = <span class="num">10</span> % <span class="num">3</span>;  <span class="cmt">// 10 ÷ 3 = 3 remainder 1 → a = 1</span>
<span class="type">int</span> b = <span class="num">12</span> % <span class="num">4</span>;  <span class="cmt">// 12 ÷ 4 = 3 remainder 0 → b = 0 (divides evenly)</span>
<span class="type">int</span> c = <span class="num">7</span> % <span class="num">10</span>; <span class="cmt">// 7 ÷ 10 = 0 remainder 7 → c = 7 (smaller ÷ bigger = smaller)</span>

<span class="cmt">// FRC use case: cycle through an array of 4 autos</span>
<span class="type">int</span> index = <span class="num">0</span>;
index = (index + <span class="num">1</span>) % <span class="num">4</span>; <span class="cmt">// 0→1→2→3→0→1→2→3... wraps around forever</span></pre>
</div>

<h3 class="sub">shortcut assignment operators</h3>

<p>these are just shorthand for "do the thing and save the result back." you'll write these ALL the time in loops and control code:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">double</span> speed = <span class="num">0.5</span>;

<span class="cmt">// long way vs shorthand — they're exactly the same thing</span>
speed = speed + <span class="num">0.1</span>;  <span class="cmt">// speed is now 0.6</span>
speed += <span class="num">0.1</span>;         <span class="cmt">// speed is now 0.7 — shorthand for speed = speed + 0.1</span>

speed -= <span class="num">0.2</span>;         <span class="cmt">// speed is now 0.5 — shorthand for speed = speed - 0.2</span>
speed *= <span class="num">2.0</span>;         <span class="cmt">// speed is now 1.0 — shorthand for speed = speed * 2.0</span>
speed /= <span class="num">4.0</span>;         <span class="cmt">// speed is now 0.25 — shorthand for speed = speed / 4.0</span>

<span class="cmt">// ++ and -- add or subtract exactly 1</span>
<span class="type">int</span> count = <span class="num">0</span>;
count++;  <span class="cmt">// count is now 1 — shorthand for count = count + 1</span>
count++;  <span class="cmt">// count is now 2</span>
count--;  <span class="cmt">// count is now 1 — shorthand for count = count - 1</span></pre>
</div>

<h3 class="sub">comparison operators</h3>

<p>these compare two values and always give you back a <code>boolean</code> (true or false). you use these constantly in <code>if</code> statements and conditions (which we cover next week):</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span> speed = <span class="num">80</span>;

<span class="type">boolean</span> r1 = speed == <span class="num">80</span>;  <span class="cmt">// true  — is speed EQUAL to 80?</span>
<span class="type">boolean</span> r2 = speed != <span class="num">80</span>;  <span class="cmt">// false — is speed NOT EQUAL to 80?</span>
<span class="type">boolean</span> r3 = speed > <span class="num">50</span>;   <span class="cmt">// true  — is speed GREATER THAN 50?</span>
<span class="type">boolean</span> r4 = speed < <span class="num">100</span>;  <span class="cmt">// true  — is speed LESS THAN 100?</span>
<span class="type">boolean</span> r5 = speed >= <span class="num">80</span>;  <span class="cmt">// true  — greater than OR equal to?</span>
<span class="type">boolean</span> r6 = speed <= <span class="num">79</span>;  <span class="cmt">// false — less than or equal to 79?</span></pre>
</div>

<div class="callout danger"><p><strong>the = vs == trap.</strong> <code>=</code> is assignment (stores a value). <code>==</code> is comparison (checks if two things are equal). accidentally writing <code>=</code> when you meant <code>==</code> won't always cause a compile error — it can just silently do the wrong thing. triple-check this any time you're writing a condition.</p></div>

<h3 class="sub">operator precedence — order of operations</h3>

<p>Java follows the same rules as math class: multiplication and division happen before addition and subtraction. when in doubt, use parentheses — they're free and make your intent obvious to anyone reading the code.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span> a = <span class="num">2</span> + <span class="num">3</span> * <span class="num">4</span>;      <span class="cmt">// 14, not 20 — multiplication happens first</span>
<span class="type">int</span> b = (<span class="num">2</span> + <span class="num">3</span>) * <span class="num">4</span>;    <span class="cmt">// 20 — parentheses force addition to go first</span>

<span class="cmt">// FRC example: velocity conversion with explicit parentheses</span>
<span class="cmt">// (much easier to read and verify than a long unseparated expression)</span>
<span class="type">double</span> kWheelCircumference_ft = Math.PI * (<span class="num">4.0</span> / <span class="num">12.0</span>); <span class="cmt">// 4-inch radius in feet</span>
<span class="type">double</span> speed_fps = encoderRate * (<span class="num">1.0</span> / <span class="num">2048</span>) * <span class="num">10</span> * kWheelCircumference_ft;</pre>
</div>

<h3 class="sub">Topic 2 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Encoder Conversion</div><div class="ch-sub">Use operators to convert raw sensor data</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">A TalonFX encoder reports 2048 ticks per revolution. Start with <code>int rawTicks = 9216;</code> and calculate three things — print each one:<br>1. total revolutions as a double (hint: <code>rawTicks / 2048.0</code> — the <code>.0</code> matters, try it without and see what breaks)<br>2. distance in inches — a 4-inch diameter wheel has a circumference of <code>Math.PI * 4</code>, so distance = revolutions × circumference<br>3. a boolean: has the robot moved more than 12 inches?</p>
    <textarea class="code-input" placeholder="// Write your conversion here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w1-t2')">Show Solution</button></div>
    <div id="sol-w1-t2" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span> rawTicks = <span class="num">9216</span>;
<span class="kw">final</span> <span class="type">int</span> kTicksPerRev = <span class="num">2048</span>;
<span class="kw">final</span> <span class="type">double</span> kWheelCircumference_in = Math.PI * <span class="num">4.0</span>; <span class="cmt">// π × diameter</span>

<span class="cmt">// cast rawTicks to double BEFORE dividing to avoid integer division</span>
<span class="type">double</span> revolutions   = (<span class="type">double</span>) rawTicks / kTicksPerRev; <span class="cmt">// 4.5 revolutions</span>
<span class="type">double</span> distance_in   = revolutions * kWheelCircumference_in; <span class="cmt">// ~56.5 inches</span>
<span class="type">boolean</span> movedAFoot   = distance_in > <span class="num">12.0</span>; <span class="cmt">// true — definitely moved more than a foot</span></pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 2 — Quick Check</h3>
<div id="quiz-w1-t2"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-3">Scope &amp; Naming</h2>

<p>two of the most important "invisible" concepts in programming — you can't see scope in the output of your program, and naming doesn't affect whether the code runs. but both of them will absolutely destroy you if you ignore them when working on a team.</p>

<h3 class="sub">what even IS scope?</h3>

<p>imagine your house has rooms. stuff you bring into the kitchen — a cup, a bowl, some cereal — only exists in the kitchen. you can't take a kitchen cup into the bedroom just by thinking about it; you'd have to explicitly carry it through the door. scope is the same idea: a variable only exists in the <strong>room (block of code)</strong> where it was created.</p>

<p>in Java, "rooms" are defined by curly braces <code>{ }</code>. anything declared inside a pair of curly braces only exists within those curly braces. once execution leaves that block, the variable is gone — Java frees up that memory automatically.</p>

<p><strong>why does it matter in FRC?</strong> "cannot find symbol" is one of the most common compile errors beginners hit, and it almost always means you tried to use a variable outside the scope where it was declared. understanding scope lets you read that error immediately and know exactly where the fix goes.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public void</span> <span class="fn">periodic</span>() {
    <span class="cmt">// 'speed' is declared here — it lives for the WHOLE method</span>
    <span class="type">double</span> speed = <span class="num">0.5</span>;

    <span class="kw">if</span> (isButtonPressed) {
        <span class="cmt">// 'boost' is declared inside this if block</span>
        <span class="cmt">// it ONLY exists inside these curly braces</span>
        <span class="type">double</span> boost = <span class="num">0.2</span>;
        speed += boost;  <span class="cmt">// fine — both 'speed' and 'boost' exist here</span>
    }
    <span class="cmt">// 'boost' is GONE here — the if block ended, boost died with it</span>
    <span class="cmt">// trying to use boost here would be a compile error: cannot find symbol</span>

    <span class="fn">setMotor</span>(speed);  <span class="cmt">// 'speed' is still alive — it was declared in this method scope</span>
}</pre>
</div>

<h3 class="sub">nested scopes — going deeper</h3>

<p>scopes can be nested inside each other like Russian dolls. inner scopes can see variables from outer scopes. outer scopes cannot see variables from inner scopes.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public void</span> <span class="fn">runShooter</span>(<span class="type">double</span> requestedSpeed) {
    <span class="cmt">// method scope — visible to everything below in this method</span>
    <span class="type">double</span> safeSpeed = Math.<span class="fn">min</span>(requestedSpeed, <span class="num">1.0</span>);

    <span class="kw">if</span> (safeSpeed > <span class="num">0.1</span>) {
        <span class="cmt">// if-block scope — 'clampedOutput' only lives in here</span>
        <span class="type">double</span> clampedOutput = safeSpeed * <span class="num">0.9</span>;  <span class="cmt">// 10% safety margin</span>
        m_motor.<span class="fn">set</span>(clampedOutput);  <span class="cmt">// fine — clampedOutput exists here</span>

        <span class="cmt">// this inner scope can see 'safeSpeed' from the outer scope ✓</span>
        System.out.<span class="fn">println</span>(<span class="str">"Running at: "</span> + safeSpeed);
    }
    <span class="cmt">// clampedOutput is gone — can't use it here</span>
    <span class="cmt">// safeSpeed is still alive — use it freely</span>
}</pre>
</div>

<h3 class="sub">class scope vs method scope</h3>

<p>there's one more level above method scope: <strong>class scope</strong>. variables declared directly inside a class (not inside any method) are accessible from any method in that class. these are your instance variables — the things that represent the "state" of the object:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">ShooterSubsystem</span> {

    <span class="cmt">// CLASS SCOPE — these are accessible from ANY method in ShooterSubsystem</span>
    <span class="kw">private</span> <span class="type">double</span>  m_targetSpeed = <span class="num">0.0</span>;
    <span class="kw">private</span> <span class="type">boolean</span> m_isSpinning  = <span class="kw">false</span>;

    <span class="kw">public void</span> <span class="fn">setSpeed</span>(<span class="type">double</span> speed) {
        <span class="cmt">// METHOD SCOPE — 'clampedSpeed' only lives inside setSpeed()</span>
        <span class="type">double</span> clampedSpeed = Math.<span class="fn">min</span>(speed, <span class="num">1.0</span>);
        m_targetSpeed = clampedSpeed;   <span class="cmt">// modifying the class-level variable ✓</span>
        m_isSpinning = (clampedSpeed > <span class="num">0.05</span>); <span class="cmt">// reading AND writing class vars ✓</span>
    }

    <span class="kw">public double</span> <span class="fn">getSpeed</span>() {
        <span class="cmt">// m_targetSpeed is accessible here too — it's class scope</span>
        <span class="kw">return</span> m_targetSpeed;
        <span class="cmt">// clampedSpeed is NOT accessible here — it died when setSpeed() ended</span>
    }
}</pre>
</div>

<div class="callout info"><p><strong>access modifiers:</strong> <code>private</code> means only THIS class can access it. <code>public</code> means any class can. in FRC, member variables are almost always <code>private</code> — external code uses methods (like <code>getSpeed()</code>) to read and write values instead of reaching into the class directly. this is called encapsulation, and we'll cover it deeply in OOP week.</p></div>

<h3 class="sub">naming conventions — the full table</h3>

<p>on a team with 10+ programmers all editing the same codebase at 1am at a regional, naming conventions are the difference between "oh i see exactly what that does" and "whose code is this and why is nothing labeled." we have a full style guide, but here's the naming cheat sheet:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — bad vs good names side by side</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// BAD — cryptic garbage. no one knows what this does</span>
<span class="type">double</span> x1   = <span class="num">0.8</span>;
<span class="type">int</span>    y     = <span class="num">3</span>;
<span class="type">boolean</span> f   = <span class="kw">true</span>;

<span class="cmt">// GOOD — completely self-documenting</span>
<span class="kw">final</span> <span class="type">double</span>  kMaxShooterSpeed_mps = <span class="num">0.8</span>;  <span class="cmt">// k prefix + units in name!!</span>
<span class="kw">final</span> <span class="type">int</span>     kShooterMotorID       = <span class="num">3</span>;
<span class="type">boolean</span> m_isShooterEnabled          = <span class="kw">true</span>;</pre>
</div>

<table>
<thead><tr><th>What it is</th><th>Convention</th><th>Example</th></tr></thead>
<tbody>
<tr><td>Local variable or parameter</td><td>camelCase</td><td><code>targetSpeed</code>, <code>motorId</code>, <code>angleRad</code></td></tr>
<tr><td>Instance (member) variable</td><td>m_camelCase</td><td><code>m_targetSpeed</code>, <code>m_isRunning</code>, <code>m_encoder</code></td></tr>
<tr><td>Constant (<code>final</code> value)</td><td>kCamelCase</td><td><code>kMaxSpeed_mps</code>, <code>kMotorID</code>, <code>kGearRatio</code></td></tr>
<tr><td>Class name</td><td>PascalCase</td><td><code>ShooterSubsystem</code>, <code>DriveCommand</code>, <code>Constants</code></td></tr>
<tr><td>Method name</td><td>camelCase</td><td><code>setSpeed()</code>, <code>getPosition()</code>, <code>isAtTarget()</code></td></tr>
</tbody>
</table>

<div class="callout warning"><p><strong>unit suffixes:</strong> on WRT, we often put units directly in constant names — <code>kMaxSpeed_mps</code> (meters per second), <code>kArmLength_in</code> (inches), <code>kAngle_deg</code> (degrees). this sounds like overkill until you're trying to debug why your robot is driving 3x too fast because someone mixed up meters and feet. the suffix makes unit conversion bugs immediately obvious.</p></div>

<h3 class="sub">Topic 3 — Quick Check</h3>
<div id="quiz-w1-t3"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-4">Type Casting</h2>

<p>sometimes you have a value stored as one type and you need it in another type. like you have a speed in <code>int</code> form but the motor library expects a <code>double</code>. or you have a precise <code>double</code> position and you want a whole-number count of full rotations. converting between types is called <strong>type casting</strong>.</p>

<h3 class="sub">what even IS type casting?</h3>

<p>picture pouring water between containers. if you pour from a small cup into a large bucket, all the water makes it — nothing lost. that's widening conversion. but if you try to pour from a large bucket into a small cup, the cup can only hold so much — some water spills on the floor and is gone forever. that's narrowing conversion.</p>

<p>in Java: going from a smaller type (like <code>int</code>) to a larger type (like <code>double</code>) is widening — no information is lost, Java does it automatically. going from a larger type (<code>double</code>) to a smaller type (<code>int</code>) is narrowing — you LOSE the decimal part, and Java forces you to explicitly say you're okay with that.</p>

<p><strong>why does it matter in FRC?</strong> you're constantly moving data between sensor readings (often <code>double</code>), loop counters (<code>int</code>), motor inputs (<code>double</code>), and display strings (<code>String</code>). knowing when Java will auto-convert and when you need to be explicit — and knowing what gets lost — prevents real runtime bugs.</p>

<h3 class="sub">widening vs narrowing</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// ── WIDENING — automatic, zero data lost ──────────────────────────</span>
<span class="cmt">// int is 32 bits, double is 64 bits — int fits perfectly inside double</span>
<span class="type">int</span> ticks = <span class="num">500</span>;
<span class="type">double</span> pos = ticks; <span class="cmt">// Java automatically converts: pos = 500.0</span>
<span class="cmt">// no cast needed, no data lost — Java handles this silently</span>

<span class="cmt">// ── NARROWING — must be EXPLICIT, data will be lost ───────────────</span>
<span class="cmt">// double is 64 bits, int is 32 bits — the decimal part gets chopped</span>
<span class="type">double</span> reading = <span class="num">3.87</span>;
<span class="type">int</span> truncated = (<span class="type">int</span>) reading; <span class="cmt">// you must write (int) to say "yes i know i'm losing data"</span>
                                <span class="cmt">// truncated = 3 — the .87 is GONE</span>

<span class="cmt">// more examples of narrowing</span>
<span class="type">double</span> a = <span class="num">9.99</span>;   <span class="type">int</span> ia = (<span class="type">int</span>) a;  <span class="cmt">// ia = 9, NOT 10</span>
<span class="type">double</span> b = <span class="num">1.01</span>;   <span class="type">int</span> ib = (<span class="type">int</span>) b;  <span class="cmt">// ib = 1</span>
<span class="type">double</span> c = <span class="num">-2.8</span>;  <span class="type">int</span> ic = (<span class="type">int</span>) c;  <span class="cmt">// ic = -2 (not -3 — truncates TOWARD ZERO)</span></pre>
</div>

<div class="callout danger"><p><strong>truncation is NOT rounding.</strong> this trips up basically everyone at first. <code>(int) 3.87</code> is <code>3</code>, not <code>4</code>. <code>(int) 9.99</code> is <code>9</code>, not <code>10</code>. <code>(int) -1.9</code> is <code>-1</code>, not <code>-2</code>. Java ALWAYS truncates toward zero — it literally just throws away everything after the decimal point. if you need actual rounding, use <code>Math.round(3.87)</code> which gives you <code>4L</code> (a long), then cast that to int: <code>(int) Math.round(3.87)</code> = <code>4</code>.</p></div>

<h3 class="sub">common casting examples in robot code</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// scenario 1: encoder math — need double result from int inputs</span>
<span class="type">int</span>    rawTicks     = <span class="num">3072</span>;
<span class="type">int</span>    ticksPerRev  = <span class="num">2048</span>;
<span class="type">double</span> revolutions  = (<span class="type">double</span>) rawTicks / ticksPerRev; <span class="cmt">// cast first, then divide</span>
<span class="cmt">// without the cast: 3072 / 2048 = 1 (integer division! wrong!)</span>
<span class="cmt">// with the cast: 3072.0 / 2048 = 1.5 (correct)</span>

<span class="cmt">// scenario 2: gear ratio math</span>
<span class="kw">final</span> <span class="type">double</span> kGearRatio = <span class="num">8.46</span>;
<span class="type">double</span> motorRPM = <span class="num">5400.0</span>;
<span class="type">double</span> wheelRPM = motorRPM / kGearRatio; <span class="cmt">// ~638.3 RPM</span>
<span class="type">int</span>    wheelRPM_approx = (<span class="type">int</span>) wheelRPM;  <span class="cmt">// 638 — dropped the .3</span>

<span class="cmt">// scenario 3: rounding properly (for display purposes)</span>
<span class="type">double</span> speed_mps = <span class="num">3.7892</span>;
<span class="type">int</span>    rounded   = (<span class="type">int</span>) Math.<span class="fn">round</span>(speed_mps); <span class="cmt">// 4 — actually rounds correctly</span></pre>
</div>

<h3 class="sub">String conversion</h3>

<p>converting numbers to Strings (and back) comes up constantly for Shuffleboard displays, log messages, and parsing config. there are a few different ways to do it:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// ── Number → String (for display and logging) ─────────────────────</span>
<span class="type">double</span> speed = <span class="num">0.75</span>;

<span class="cmt">// method 1: string concatenation — easiest</span>
<span class="type">String</span> label1 = <span class="str">"Speed: "</span> + speed;           <span class="cmt">// "Speed: 0.75"</span>

<span class="cmt">// method 2: String.format — gives you control over decimal places</span>
<span class="type">String</span> label2 = String.<span class="fn">format</span>(<span class="str">"%.2f m/s"</span>, speed); <span class="cmt">// "0.75 m/s" (2 decimal places)</span>
<span class="type">String</span> label3 = String.<span class="fn">format</span>(<span class="str">"%.0f RPM"</span>, <span class="num">638.3</span>); <span class="cmt">// "638 RPM" (0 decimal places)</span>

<span class="cmt">// method 3: Integer.toString / Double.toString</span>
<span class="type">String</span> idStr  = Integer.<span class="fn">toString</span>(<span class="num">7</span>);              <span class="cmt">// "7"</span>

<span class="cmt">// ── String → Number (parsing config, reading sensor text) ─────────</span>
<span class="type">String</span> raw = <span class="str">"42"</span>;
<span class="type">int</span>    parsed1 = Integer.<span class="fn">parseInt</span>(raw);           <span class="cmt">// 42</span>
<span class="type">double</span> parsed2 = Double.<span class="fn">parseDouble</span>(<span class="str">"3.14"</span>);       <span class="cmt">// 3.14</span></pre>
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
    <p class="ch-prompt">Start with these two variables:<br><code>final double kGearRatio = 8.46;</code><br><code>double motorRPM = 5400.0;</code><br><br>Do three things:<br>1. Calculate <code>wheelRPM</code> by dividing motorRPM by kGearRatio. Print it.<br>2. Cast <code>wheelRPM</code> to an <code>int</code> and store it in a new variable. Print it — what did casting do to the decimal?<br>3. Add a comment above each line explaining what it does.</p>
    <textarea class="code-input" placeholder="// Write your code here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w1-t4')">Show Solution</button></div>
    <div id="sol-w1-t4" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// gear ratio between motor shaft and wheel shaft</span>
<span class="kw">final</span> <span class="type">double</span> kGearRatio = <span class="num">8.46</span>;
<span class="cmt">// Falcon 500 free-spin speed</span>
<span class="type">double</span> motorRPM = <span class="num">5400.0</span>;
<span class="cmt">// wheel speed after gear reduction (motor spins faster than wheel)</span>
<span class="type">double</span> wheelRPM = motorRPM / kGearRatio; <span class="cmt">// ~638.3 RPM</span>
<span class="cmt">// truncated to int — loses fractional precision but gives us whole RPM</span>
<span class="type">int</span> wheelRPM_int = (<span class="type">int</span>) wheelRPM; <span class="cmt">// 638</span>
<span class="cmt">// wheel circumference in feet (4-inch radius = 4/12 foot radius)</span>
<span class="type">double</span> kCircumference_ft = <span class="num">2</span> * Math.PI * (<span class="num">4.0</span> / <span class="num">12.0</span>);
<span class="cmt">// surface speed = RPM × circumference ÷ 60 seconds per minute</span>
<span class="type">double</span> speed_fps = wheelRPM * kCircumference_ft / <span class="num">60.0</span>;</pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 4 — Quick Check</h3>
<div id="quiz-w1-t4"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-5">Comments &amp; Code Syntax</h2>

<p>last topic of week 1! this is about the structure of Java files and how to write code that other humans (and future you) can actually understand.</p>

<h3 class="sub">what even IS a comment, and why bother?</h3>

<p>a comment is text in your code that the compiler completely ignores — it's purely there for humans to read. think of it like sticky notes you leave on your code explaining what's going on.</p>

<p>here's the scenario: it's 1am at a regional. your robot is broken. some subsystem has weird behavior in autonomous and no one knows why. the programmer who wrote that code graduated last year. the code has zero comments. the variable names are <code>x1</code>, <code>y</code>, and <code>val2</code>. nobody can fix it in time. that's the horror story that motivates good commenting habits.</p>

<p><strong>why does it matter in FRC?</strong> FRC is a team sport. other people WILL read your code. you WILL read your own code six months later and have no memory of what you were thinking. comments are how you leave a trail of breadcrumbs for everyone who comes after you — including yourself.</p>

<h3 class="sub">the three comment types</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — all three comment types</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// ── Type 1: Single-line comment ───────────────────────────────────
// everything after // on this line is ignored by the compiler
// use for: quick explanations of a single line, inline notes</span>
<span class="type">double</span> speed = <span class="num">0.5</span>; <span class="cmt">// starting speed — will be adjusted by driver input</span>

<span class="cmt">/*
 * ── Type 2: Block comment ─────────────────────────────────────────
 * spans multiple lines.
 * use for: explaining a big section of code, temporarily disabling
 * a chunk during debugging (just wrap it in these and it's gone)
 *
 * this entire block is ignored by the compiler
 */</span>

<span class="cmt">/**
 * ── Type 3: Javadoc comment ───────────────────────────────────────
 * this generates HTML documentation AND shows as hover tooltips in your IDE.
 * use above EVERY public class and EVERY public method.
 * the @param tag explains an input parameter.
 * the @return tag explains what the method gives back.
 *
 * @param speed the target motor speed, from -1.0 (full reverse) to 1.0 (full forward)
 * @return true if the motor successfully reached the target speed within tolerance
 */</span>
<span class="kw">public boolean</span> <span class="fn">setSpeed</span>(<span class="type">double</span> speed) {
    <span class="cmt">// implementation here...</span>
    <span class="kw">return</span> <span class="kw">true</span>;
}</pre>
</div>

<div class="callout tip"><p><strong>WRT rule:</strong> every <code>public</code> method gets a Javadoc comment. every tricky piece of logic gets an inline comment explaining <em>why</em>, not just <em>what</em>. "// set speed" is useless — the code already says that. "// clamp to safe range — motor faults if output exceeds 1.0" is actually helpful. explain the reason, not the action.</p></div>

<h3 class="sub">the anatomy of a Java file</h3>

<p>every Java file has a specific structure that Java expects. if things are in the wrong order, the compiler refuses to compile. here's a labeled breakdown of what a complete robot subsystem file looks like:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — anatomy of a class file</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">package</span> frc.robot.subsystems;   <span class="cmt">// 1. package — tells Java where this file lives in the project</span>
                                 <span class="cmt">//    always matches the folder path. always first line.</span>

<span class="kw">import</span> edu.wpi.first.wpilibj2.command.<span class="cls">SubsystemBase</span>; <span class="cmt">// 2. imports — bring in other classes you need</span>
<span class="kw">import</span> com.ctre.phoenix6.hardware.<span class="cls">TalonFX</span>;           <span class="cmt">// TalonFX = the motor controller our team uses (made by CTRE)</span>

<span class="cmt">/** 3. Javadoc for the class — what does this subsystem do? */</span>
<span class="kw">public class</span> <span class="cls">ShooterSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> {  <span class="cmt">// 3. class declaration</span>
                                                          <span class="cmt">//    'extends SubsystemBase' = this is a WPILib (the Java library all FRC teams use for robot programming) subsystem</span>

    <span class="cmt">// 4. fields (instance variables) — the "state" of this subsystem</span>
    <span class="kw">private final</span> <span class="cls">TalonFX</span> m_motor;
    <span class="kw">private</span> <span class="type">double</span>          m_targetSpeed = <span class="num">0.0</span>;

    <span class="cmt">// 5. constructor — runs once when the subsystem is created at robot startup</span>
    <span class="kw">public</span> <span class="cls">ShooterSubsystem</span>() {
        m_motor = <span class="kw">new</span> <span class="cls">TalonFX</span>(<span class="num">7</span>); <span class="cmt">// create the motor object on CAN ID 7</span>
    }

    <span class="cmt">// 6. methods — what this subsystem can DO</span>
    <span class="kw">public void</span> <span class="fn">setSpeed</span>(<span class="type">double</span> speed) {
        m_targetSpeed = Math.<span class="fn">min</span>(speed, <span class="num">1.0</span>);
        m_motor.<span class="fn">set</span>(m_targetSpeed);
    }

    <span class="kw">public double</span> <span class="fn">getSpeed</span>() {
        <span class="kw">return</span> m_targetSpeed;
    }

} <span class="cmt">// end of class — NO semicolon after the closing brace!!</span></pre>
</div>

<h3 class="sub">the semicolon rule</h3>

<p>think of semicolons like periods at the end of sentences. every complete statement (an instruction to the computer) ends with a <code>;</code>. block headers (things that introduce a block of code with <code>{ }</code>) do NOT get semicolons.</p>

<p>forgetting a semicolon is literally the #1 beginner compile error. the good news: the compiler will tell you exactly which line it's on.</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Needs ;</div><div class="cc-title">Variable declarations</div><div class="cc-desc"><code>int x = 5;</code> — every variable declaration and assignment is a statement.</div></div>
  <div class="concept-card"><div class="cc-label">Needs ;</div><div class="cc-title">Method calls</div><div class="cc-desc"><code>motor.set(0.5);</code> — every standalone method call is a complete statement.</div></div>
  <div class="concept-card"><div class="cc-label">No ;</div><div class="cc-title">if/for/while headers</div><div class="cc-desc"><code>if (x > 0) {</code> — no semicolon. The opening <code>{</code> starts the block body instead.</div></div>
  <div class="concept-card"><div class="cc-label">No ;</div><div class="cc-title">Class and method signatures</div><div class="cc-desc"><code>public class Robot {</code> and <code>public void periodic() {</code> — no semicolon, body follows in <code>{ }</code>.</div></div>
</div>

<h3 class="sub">case sensitivity and reserved keywords</h3>

<p>Java is completely case-sensitive. <code>Speed</code>, <code>speed</code>, and <code>SPEED</code> are three totally different variables. some words are "reserved" — they're part of the Java language itself and you can't use them as variable names. things like <code>class</code>, <code>int</code>, <code>if</code>, <code>return</code>, <code>final</code>, <code>void</code>, <code>new</code>. your IDE will highlight them in a different color to warn you.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — common beginner syntax mistakes</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// WRONG — 'class' is a reserved keyword, can't use it as a variable name</span>
<span class="type">int</span> class = <span class="num">5</span>;  <span class="cmt">// COMPILE ERROR: 'class' is reserved by Java</span>

<span class="cmt">// WRONG — 'Class' with capital C is totally different from 'class'</span>
<span class="cmt">// Class (capital C) is an actual Java built-in type, unrelated to what you want</span>

<span class="cmt">// WRONG — forgot semicolon on variable declaration</span>
<span class="type">int</span> motorID = <span class="num">5</span>   <span class="cmt">// COMPILE ERROR: ';' expected</span>

<span class="cmt">// WRONG — semicolon where it doesn't belong</span>
<span class="kw">if</span> (speed > <span class="num">0.5</span>); {  <span class="cmt">// this compiles but does something totally wrong!!</span>
    m_motor.<span class="fn">set</span>(speed);
}

<span class="cmt">// CORRECT</span>
<span class="type">int</span>    myClass    = <span class="num">5</span>;
<span class="type">String</span> className  = <span class="str">"Shooter"</span>;
<span class="kw">if</span> (speed > <span class="num">0.5</span>) {
    m_motor.<span class="fn">set</span>(speed);
}</pre>
</div>

<div class="callout warning"><p><strong>the sneaky semicolon bug:</strong> <code>if (condition);</code> with a semicolon after the condition is actually valid Java — it creates an if statement with an empty body. the block that follows runs unconditionally. this is a bug that compiles perfectly and is incredibly hard to spot. always check your if/for/while lines for rogue semicolons.</p></div>

<div class="callout info"><p><strong>helpful reference:</strong> <a href="https://www.w3schools.com/java/java_syntax.asp" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">w3schools.com/java/java_syntax.asp</a> has a clean, runnable breakdown of Java syntax rules — good bookmark for when you hit a weird compiler error and don't know what's wrong.</p></div>

<h3 class="sub">Topic 5 — Quick Check</h3>
<div id="quiz-w1-t5"></div>

<div class="project-task" id="topic-6">
  <div class="pt-header">
    <div class="pt-icon"><i data-lucide="wrench"></i></div>
    <div class="pt-header-title">Project Task — Week 1</div>
    <div class="pt-filename">Constants.java</div>
  </div>
  <div class="pt-body">
    <p><strong>first time only — set up your project environment:</strong></p>
    <ol>
      <li><strong>install VS Code</strong> if you don't have it → <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer">code.visualstudio.com</a></li>
      <li><strong>install the Java extension:</strong> open VS Code → press <kbd>Ctrl+Shift+X</kbd> → search <code>Extension Pack for Java</code> → Install</li>
      <li><strong>get the project folder:</strong>
        <ul>
          <li><em>if you have a repo link:</em> open a terminal (<kbd>Ctrl+`</kbd> in VS Code) and run <code>git clone [URL of the repository that you made] minibot-project</code></li>
          <li><em>if starting from scratch:</em> create a new folder called <code>minibot-project</code> anywhere on your computer</li>
        </ul>
      </li>
      <li><strong>open the folder in VS Code:</strong> File → Open Folder → select <code>minibot-project</code></li>
      <li><strong>create a Github repository for your project:</strong> follow the instructions on this google doc :D <a href="https://docs.google.com/document/d/1RONII6XiNW-G7-xRZELJVoiIMVbDhLi5nUja9T_fLfI/edit?usp=sharing" target="_blank" rel="noopener no referrer">GitHub Setup Guide</a>
        <ul>
          <li><strong>things to note:</strong>
            <ul>
            <li>you should be commiting very periodically — either whenever something major is working, you're finished with your week, or if you're leaving ur desktop/laptop, you get the gist.</li>
            <li>use commit names that are meaningful, rather than just random sentences that don't have meaning to others (like sometimes i use).</li>
            </ul>
          </li>
        </ul>
      </li>
    </ol>
    <p>now create <code>Constants.java</code> directly inside your <code>minibot-project</code> folder. this is the foundation of your entire MiniBot project — every magic number in your robot code lives here, named and typed properly so nothing is mysterious to anyone reading it later.</p>
    <ul>
      <li>Create two <code>public static final class</code> inner classes: <code>DriveK</code> and <code>ShooterK</code></li>
      <li>Inside <code>DriveK</code>: four motor CAN IDs (FL, FR, BL, BR as <code>kFrontLeftID</code> etc.), a max speed constant in m/s, and a gear ratio</li>
      <li>Inside <code>ShooterK</code>: two motor CAN IDs (top and bottom flywheel), a max RPS target, and a speed threshold double for "at speed" detection</li>
      <li>All constants use <code>k</code> prefix and are <code>public static final</code> — no bare numbers anywhere</li>
      <li>Add a Javadoc <code>/** ... */</code> comment above the outer <code>Constants</code> class and each inner class explaining what goes in each</li>
      <li>Include unit suffixes where the unit matters (speeds in _mps, lengths in _in, etc.)</li>
      <li>Reference: <a href="https://github.com/WaltonRobotics/Rebuilt/blob/codebase-rewrite/src/main/java/frc/robot/Constants.java" target="_blank" rel="noopener noreferrer">Constants.java from the 2026 season</a></li>
    </ul>
    <span class="pt-note">you'll keep adding to this file every week as you need new constants. start clean and organized — future you at 1am will be grateful.</span>
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
  { question: "What does the <code>final</code> keyword do in Java?", options: ["Makes the variable global","Prevents the variable from being reassigned","Makes the variable a primitive","Hides the variable from other classes"], correct: 1, explanation: "<code>final</code> means the variable can only be assigned once. After that, any attempt to reassign it is a compile error. That's why we use it for constants like motor IDs — they should never change after being set." },
  { question: "On team 2974, how should a constant integer for a motor ID be named?", options: ["MOTOR_ID","motorId","kMotorID","m_motorID"], correct: 2, explanation: "WRT uses the <code>k</code> prefix for constants — <code>kMotorID</code>. <code>m_</code> prefix is for instance (member) variables. SCREAMING_SNAKE is standard Java convention but not what we use on this team." },
  { question: "Which type would you use to store a motor speed that ranges from -1.0 to 1.0?", options: ["int","boolean","double","String"], correct: 2, explanation: "<code>double</code> holds decimal numbers. Motor speeds are almost always doubles like 0.75 or -1.0. Using <code>int</code> would truncate everything to just -1, 0, or 1 — not useful at all." },
  { question: "What default value does an uninitialized <em>instance</em> boolean have?", options: ["true","null","0","false"], correct: 3, explanation: "Instance booleans default to <code>false</code>. Numeric types default to 0 (or 0.0). Reference types like String default to <code>null</code>. Local variables inside a method get NO default — using one before assignment is a compile error." }
], 'summer-w1');

// ── TOPIC 2 QUIZ: Operators ────────────────────────────────────
const quiz_w1_t2 = new Quiz('quiz-w1-t2', [
  { question: "What does <code>7 % 3</code> evaluate to?", options: ["2.33","1","2","0"], correct: 1, explanation: "The <code>%</code> operator returns the remainder after division. 7 ÷ 3 = 2 with a remainder of 1. So <code>7 % 3 = 1</code>. Think of it as: how much is left over that couldn't fit in a full group?" },
  { question: "What is the result of <code>int result = 5 / 2;</code> in Java?", options: ["2.5","3","2","Compile error"], correct: 2, explanation: "Integer division in Java drops the decimal part completely. 5 / 2 = 2 (not 2.5). The .5 is silently thrown away. This is a very common source of bugs in FRC encoder and gear ratio math." },
  { question: "What does <code>speed += 0.1;</code> mean?", options: ["speed = 0.1","speed = speed - 0.1","speed = speed + 0.1","speed + 0.1 == speed"], correct: 2, explanation: "<code>+=</code> is a compound assignment operator. <code>x += y</code> is exactly equivalent to <code>x = x + y</code>. It's just a shorter way to write 'add this to the existing value and save it back'." },
  { question: "Output of: <code>int x = 10; x += 3; System.out.println(x);</code>", options: ["10","3","13","103"], correct: 2, explanation: "x starts at 10. Then <code>x += 3</code> makes it x = x + 3 = 13. Then println prints 13. The original 10 is gone — it was replaced by 13." }
], 'summer-w1');

// ── TOPIC 3 QUIZ: Scope & Naming ──────────────────────────────
const quiz_w1_t3 = new Quiz('quiz-w1-t3', [
  { question: "A variable declared inside an if block is accessible...", options: ["Anywhere in the file","Anywhere in the method","Only inside that if block","Only in the class"], correct: 2, explanation: "Scope! Variables live and die within their enclosing curly braces <code>{ }</code>. Declare a variable inside an if block? It disappears the moment that block ends. Trying to use it outside gives a 'cannot find symbol' compile error." },
  { question: "On WRT, which prefix is used for instance (member) variables?", options: ["k","m_","s_","_"], correct: 1, explanation: "Member variables use the <code>m_</code> prefix — like <code>m_targetSpeed</code> or <code>m_isRunning</code>. Constants use the <code>k</code> prefix. This is a WRT-specific convention you'll see throughout our codebase." },
  { question: "Which naming convention is used for Java class names?", options: ["camelCase","PascalCase","SCREAMING_SNAKE","kCamelCase"], correct: 1, explanation: "Classes always use PascalCase — every word starts with a capital letter. <code>ShooterSubsystem</code>, <code>DriveCommand</code>, <code>RobotContainer</code>. This is standard across all Java, not just WRT." },
  { question: "Why do WRT constants sometimes include unit suffixes like <code>kMaxSpeed_mps</code>?", options: ["It's required by WPILib","To prevent unit conversion bugs","It makes the code compile faster","To match Java naming rules"], correct: 1, explanation: "Unit suffixes (_mps, _in, _ft, _deg) prevent unit confusion bugs. If one method expects meters/s and you accidentally pass feet/s, the name mismatch makes the bug obvious. Without suffixes, this kind of error can hide for weeks." }
], 'summer-w1');

// ── TOPIC 4 QUIZ: Type Casting ─────────────────────────────────
const quiz_w1_t4 = new Quiz('quiz-w1-t4', [
  { question: "You cast <code>double speed = 3.9</code> to int. What value do you get?", options: ["4 (rounds up)","3 (truncates)","3.9 (unchanged)","Compile error"], correct: 1, explanation: "Java truncates toward zero when casting double to int — it literally chops off the decimal part. <code>(int) 3.9 = 3</code>, not 4. If you want actual rounding, use <code>Math.round()</code> instead." },
  { question: "Which of these is a widening conversion (automatic, no data loss)?", options: ["double to int","int to boolean","int to double","double to String"], correct: 2, explanation: "<code>int</code> → <code>double</code> is widening. A 32-bit int fits perfectly inside a 64-bit double with no information lost. Java does this automatically without needing a cast. The other options either lose information or require explicit handling." },
  { question: "What is <code>(int) -2.8</code>?", options: ["-3","-2","2","3"], correct: 1, explanation: "Java always truncates toward zero regardless of sign. -2.8 truncated toward zero is -2 (not -3). The rule is simple: just drop everything after the decimal point." },
  { question: "How do you convert an int to a String for a Shuffleboard label?", options: ["(String) myInt","myInt.toString()","Integer.parseString(myInt)","\"\" + myInt  OR  Integer.toString(myInt)"], correct: 3, explanation: "Two common ways: concatenate with an empty string (<code>\"\" + 42</code> gives <code>\"42\"</code>), or use <code>Integer.toString(42)</code>. Both produce the String \"42\". The <code>(String)</code> cast won't work — Java doesn't allow primitive-to-String casts." }
], 'summer-w1');

// ── TOPIC 5 QUIZ: Comments & Code Syntax ─────────────────────
const quiz_w1_t5 = new Quiz('quiz-w1-t5', [
  { question: "Which comment type generates HTML documentation when you run Javadoc?", options: ["// single-line","/* block */","/** javadoc */","<!-- html -->"], correct: 2, explanation: "<code>/** ... */</code> is Javadoc syntax. IDEs like VS Code and IntelliJ show these as hover tooltips when you mouse over a method. Every public method and class in WRT code should have one." },
  { question: "Which statement correctly ends with a semicolon?", options: ["if (x > 0) {","public class Robot {","int speed = 5;","public void periodic() {"], correct: 2, explanation: "Statements — declarations, assignments, method calls — end with <code>;</code>. Block headers like class signatures, if conditions, for loops, and method signatures do NOT get semicolons — their body follows in <code>{ }</code>." },
  { question: "What do curly braces { } indicate in Java?", options: ["The start of a comment","A code block (method body, if body, class body)","The end of a file","An array literal"], correct: 1, explanation: "Curly braces delimit blocks of code. A method body lives inside <code>{ }</code>, as do if/else branches, loops, and class bodies. Everything inside a matching pair of braces is one scope." },
  { question: "Which identifier would cause a compile error in Java?", options: ["mySpeed","m_targetVelocity","class","kMotorID"], correct: 2, explanation: "<code>class</code> is a reserved keyword in Java — you cannot use it as a variable name. Java has about 50 reserved keywords including <code>if</code>, <code>int</code>, <code>return</code>, <code>final</code>, <code>void</code>, <code>new</code>. Your IDE highlights them in a different color to warn you." }
], 'summer-w1');

// ── WEEK 1 TEST ────────────────────────────────────────────────
const test_w1 = new Quiz('test-summer-w1', [
  { question: "On team 2974, constants are named with which prefix?", options: ["SCREAMING_SNAKE_CASE","k prefix (e.g. kMotorID)","m_ prefix","no prefix, just final"], correct: 1, explanation: "WRT uses <code>k</code> prefix for constants — <code>kMotorID</code>, <code>kMaxSpeed_mps</code>. SCREAMING_SNAKE is common in standard Java but not what we use. <code>m_</code> is for member variables, not constants." },
  { question: "Which type would you use for a motor speed between -1.0 and 1.0?", options: ["int","boolean","double","String"], correct: 2, explanation: "<code>double</code> handles decimal values. Motor speeds are almost always doubles like 0.75 or -1.0. An <code>int</code> could only represent -1, 0, or 1 — way too coarse." },
  { question: "What is the output of <code>(int) 7.99</code>?", options: ["8","7","8.0","Compile error"], correct: 1, explanation: "Casting truncates toward zero, it does NOT round. <code>(int) 7.99 = 7</code>. The .99 is thrown away. If you need 8, use <code>Math.round(7.99)</code> which gives 8." },
  { question: "Why do we use <code>final</code> for motor IDs in Constants.java?", options: ["Makes the code faster","Prevents accidental reassignment","Required by WPILib","Makes the variable public"], correct: 1, explanation: "<code>final</code> means the value can never be changed after its initial assignment. Motor CAN IDs should never change at runtime, so making them final prevents accidental reassignment that could cause the wrong motor to spin." },
  { question: "Which is the correct WRT-style member variable declaration?", options: ["private double targetSpeed;","private double m_targetSpeed;","private double kTargetSpeed;","private double TARGET_SPEED;"], correct: 1, explanation: "We use <code>m_</code> prefix for instance/member variables — so <code>m_targetSpeed</code> is correct. <code>k</code> prefix is for constants. <code>TARGET_SPEED</code> is SCREAMING_SNAKE which we don't use." },
  { question: "What does <code>11 % 4</code> evaluate to?", options: ["2","2.75","3","0"], correct: 2, explanation: "11 divided by 4 is 2 with a remainder of 3. The <code>%</code> operator returns that remainder. So <code>11 % 4 = 3</code>. Quick check: 4 × 2 = 8, and 11 - 8 = 3." },
  { question: "Which of these follows camelCase correctly?", options: ["isShooterRunning","IsShooterRunning","is_shooter_running","ISSHOOTERRUNNING"], correct: 0, explanation: "camelCase: first word is fully lowercase, each subsequent word starts with a capital letter. <code>isShooterRunning</code> is correct. <code>IsShooterRunning</code> is PascalCase (used for class names, not variables)." },
  { question: "A local variable declared inside an if block...", options: ["Is accessible anywhere in the method","Is accessible anywhere in the class","Is only accessible inside that if block","Defaults to 0 if not assigned"], correct: 2, explanation: "Scope! Variables live and die within their enclosing curly braces. A local var in an if block is completely gone when that block ends. Trying to access it outside gives a 'cannot find symbol' compile error." }
], 'summer-w1-test');
</script>
