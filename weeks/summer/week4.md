---
layout: week
title: "Arrays & Methods"
subtitle: "storing lists of data and writing reusable blocks of code. methods are your best friend :)"
badge: "Summer · Week 4 of 8"
phase: summer
phase_label: Summer
week_label: Week 4
page_id: summer-w4
weekly_test: true
topics:
  - Arrays
  - Methods
  - Javadocs & Code Documentation
prev_url: /weeks/summer/week3
prev_title: "Week 3 — Loops"
next_url: /weeks/summer/week5
next_title: "Week 5 — OOP: Classes & Objects"
---

<h2 class="sh" id="topic-1">Arrays</h2>
<p>ok so imagine a row of lockers at school. each locker has a number on it (0, 1, 2, 3...) and holds exactly one thing. all the lockers in the row are the same type — you can't have a String locker and an int locker mixed together in the same row. that's an array.</p>

<p>now imagine you need to track 4 motor CAN IDs for your drivetrain. you <em>could</em> do this:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — the messy way</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span> motor1 = <span class="num">1</span>;
<span class="type">int</span> motor2 = <span class="num">2</span>;
<span class="type">int</span> motor3 = <span class="num">3</span>;
<span class="type">int</span> motor4 = <span class="num">4</span>;</pre>
</div>

<p>four separate variables. now imagine you want to loop through them, or pass them all to a method, or print them all. suddenly this gets super annoying. instead, use an array:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — the clean way</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span>[] motorIDs = {<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>};</pre>
</div>

<p>one variable, four values, easy to loop through. much better.</p>

<h3 class="sub">Two Ways to Declare an Array</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// Way 1: declare the size, fill it in later</span>
<span class="cmt">// Java fills all slots with 0 (for int/double) or false (for boolean) automatically</span>
<span class="type">int</span>[] arr = <span class="kw">new</span> <span class="type">int</span>[<span class="num">4</span>];
arr[<span class="num">0</span>] = <span class="num">1</span>;
arr[<span class="num">1</span>] = <span class="num">2</span>;
arr[<span class="num">2</span>] = <span class="num">3</span>;
arr[<span class="num">3</span>] = <span class="num">4</span>;

<span class="cmt">// Way 2: declare with values right away</span>
<span class="type">int</span>[] motorIDs = {<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>};
<span class="type">double</span>[] moduleAngles = {<span class="num">0.0</span>, <span class="num">90.0</span>, <span class="num">180.0</span>, <span class="num">270.0</span>};</pre>
</div>

<div class="callout info"><p>the syntax <code>int[]</code> means "an array of ints." the square brackets after the type tell Java this is an array, not a single int. you can also write <code>int arr[]</code> but the brackets-after-type style is way more common and looks cleaner.</p></div>

<h3 class="sub">Zero Indexing — Read This Twice</h3>
<p>this is the single thing that trips up almost every beginner. please read carefully.</p>

<p>in Java (and basically every programming language), arrays start counting at <strong>zero</strong>, not one. so if you have 4 elements, their indices are <strong>0, 1, 2, 3</strong>. there is no index 4. the first element is always at index 0.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — zero indexing</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">String</span>[] modules = {<span class="str">"FL"</span>, <span class="str">"FR"</span>, <span class="str">"BL"</span>, <span class="str">"BR"</span>};
<span class="cmt">//                    [0]    [1]    [2]    [3]</span>

System.out.<span class="fn">println</span>(modules[<span class="num">0</span>]); <span class="cmt">// "FL" — first element</span>
System.out.<span class="fn">println</span>(modules[<span class="num">1</span>]); <span class="cmt">// "FR"</span>
System.out.<span class="fn">println</span>(modules[<span class="num">3</span>]); <span class="cmt">// "BR" — LAST element</span>

<span class="cmt">// Changing a value</span>
modules[<span class="num">2</span>] = <span class="str">"BackLeft"</span>; <span class="cmt">// now index 2 holds "BackLeft"</span></pre>
</div>

<div class="callout tip"><p>a quick trick: the last element of any array is always at index <code>arr.length - 1</code>. if there are 4 elements, last index is 4 - 1 = 3. if there are 10 elements, last index is 9. memorize this — you'll use it constantly.</p></div>

<h3 class="sub">The .length Property</h3>
<p>every array has a built-in property called <code>.length</code> that tells you how many slots it has. you don't call it like a method (no parentheses) — it's a property.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">double</span>[] speeds = {<span class="num">0.5</span>, <span class="num">0.75</span>, <span class="num">1.0</span>, <span class="num">-0.5</span>};

System.out.<span class="fn">println</span>(speeds.length); <span class="cmt">// 4 — not 3, not 5, exactly 4</span>

<span class="cmt">// Using .length in a for loop (from week 3!)</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; speeds.length; i++) {
    System.out.<span class="fn">println</span>(<span class="str">"Speed "</span> + i + <span class="str">": "</span> + speeds[i]);
}</pre>
</div>

<p>using <code>arr.length</code> in your loop condition instead of a hardcoded number is good practice — if you ever change the array size, the loop automatically adjusts.</p>

<h3 class="sub">ArrayIndexOutOfBoundsException</h3>
<p>this is one of the most common runtime errors in Java. it happens when you try to access an index that doesn't exist.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — the classic crash</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span>[] motorIDs = {<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>};
<span class="cmt">// valid indices: 0, 1, 2, 3</span>

System.out.<span class="fn">println</span>(motorIDs[<span class="num">4</span>]); <span class="cmt">// CRASH — index 4 doesn't exist!!</span>
System.out.<span class="fn">println</span>(motorIDs[<span class="num">-1</span>]); <span class="cmt">// CRASH — negative indices also invalid</span>

<span class="cmt">// The safe version: always stop at .length - 1</span>
System.out.<span class="fn">println</span>(motorIDs[motorIDs.length - <span class="num">1</span>]); <span class="cmt">// 4 — last element safely</span></pre>
</div>

<div class="callout danger"><p><strong>ArrayIndexOutOfBoundsException</strong> crashes your program at runtime — the compiler won't catch it for you. the two most common causes: (1) using <code>arr.length</code> as an index (instead of <code>arr.length - 1</code>), or (2) forgetting zero-indexing and starting your loop at 1 instead of 0.</p></div>

<h3 class="sub">Looping Through Arrays — Tying It All Together</h3>
<p>remember from week 3 how we used for loops? arrays and for loops are a combo you'll use constantly. the pattern is always the same:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — FRC: loop through CAN IDs</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">final</span> <span class="type">int</span>[] kModuleCANIDs = {<span class="num">10</span>, <span class="num">11</span>, <span class="num">12</span>, <span class="num">13</span>};
<span class="kw">final</span> <span class="type">double</span>[] kModuleAngles_deg = {<span class="num">0.0</span>, <span class="num">90.0</span>, <span class="num">180.0</span>, <span class="num">270.0</span>};

<span class="cmt">// Loop through every module and print its info</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; kModuleCANIDs.length; i++) {
    System.out.<span class="fn">println</span>(<span class="str">"Module "</span> + i + <span class="str">": CAN ID = "</span> + kModuleCANIDs[i]
        + <span class="str">", angle = "</span> + kModuleAngles_deg[i] + <span class="str">"°"</span>);
}</pre>
</div>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Declaration</div><div class="cc-title">int[] arr = new int[4]</div><div class="cc-desc">Declare an array of 4 ints. All slots start at 0 until you assign them.</div></div>
  <div class="concept-card"><div class="cc-label">Initialization</div><div class="cc-title">int[] arr = {1, 2, 3, 4}</div><div class="cc-desc">Declare and fill in one shot. The size is automatically set by how many values you give it.</div></div>
  <div class="concept-card"><div class="cc-label">Access</div><div class="cc-title">arr[0] arr[1]</div><div class="cc-desc">Get a value by its index. Zero-indexed — first element is always [0].</div></div>
  <div class="concept-card"><div class="cc-label">Length</div><div class="cc-title">arr.length</div><div class="cc-desc">How many slots the array has. Last valid index is always arr.length - 1.</div></div>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-2">Methods</h2>
<p>think of a method like a recipe. you write the recipe once — say, how to make pancakes. then whenever you want pancakes, you just say "make pancakes." you don't rewrite the whole recipe every time. methods work exactly the same way.</p>

<p>say you need to calculate wheel RPM from motor RPM three different places in your code. without methods, you'd copy-paste the formula three times:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — no methods, very bad</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// Place 1</span>
<span class="type">double</span> wheelRPM1 = motorRPM1 / <span class="num">8.46</span>;

<span class="cmt">// Place 2</span>
<span class="type">double</span> wheelRPM2 = motorRPM2 / <span class="num">8.46</span>;

<span class="cmt">// Place 3</span>
<span class="type">double</span> wheelRPM3 = motorRPM3 / <span class="num">8.46</span>; <span class="cmt">// wait, what if the gear ratio changes?? now i need to update 3 places</span></pre>
</div>

<p>now imagine you realize the gear ratio is 8.14, not 8.46. you have to hunt down and fix all three copies. if you miss one, your robot does math wrong. with a method, you fix it once and everywhere is automatically correct.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — with a method, much better</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public static</span> <span class="type">double</span> <span class="fn">calcWheelRPM</span>(<span class="type">double</span> motorRPM, <span class="type">double</span> gearRatio) {
    <span class="kw">return</span> motorRPM / gearRatio;
}

<span class="cmt">// Now use it anywhere — fix the formula once, fixed everywhere</span>
<span class="type">double</span> wheelRPM1 = <span class="fn">calcWheelRPM</span>(motorRPM1, <span class="num">8.46</span>);
<span class="type">double</span> wheelRPM2 = <span class="fn">calcWheelRPM</span>(motorRPM2, <span class="num">8.46</span>);
<span class="type">double</span> wheelRPM3 = <span class="fn">calcWheelRPM</span>(motorRPM3, <span class="num">8.46</span>);</pre>
</div>

<h3 class="sub">Method Anatomy — Line by Line</h3>
<p>let's break down every word of a method signature. this is important — you need to be able to read one and know exactly what it does.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — method anatomy</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">//  [1]    [2]    [3]      [4]              [5]</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">calcWheelRPM</span>(<span class="type">double</span> motorRPM, <span class="type">double</span> gearRatio) {
    <span class="kw">return</span> motorRPM / gearRatio; <span class="cmt">// [6]</span>
}</pre>
</div>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">[1] public</div><div class="cc-title">Who can call this?</div><div class="cc-desc"><code>public</code> means any code anywhere can call this method. <code>private</code> would mean only code inside the same class can call it.</div></div>
  <div class="concept-card"><div class="cc-label">[2] static</div><div class="cc-title">No object needed</div><div class="cc-desc"><code>static</code> means this method belongs to the class itself, not to a specific instance. you can call it as <code>ClassName.calcWheelRPM(...)</code> without creating an object first.</div></div>
  <div class="concept-card"><div class="cc-label">[3] double</div><div class="cc-title">Return type</div><div class="cc-desc">what type of value this method hands back when it's done. use <code>void</code> if it doesn't return anything at all.</div></div>
  <div class="concept-card"><div class="cc-label">[4] calcWheelRPM</div><div class="cc-title">Method name</div><div class="cc-desc">camelCase, starts with a verb. describes what the method does. on WRT, method names are usually <code>setX()</code>, <code>getX()</code>, or an action like <code>spin()</code>, <code>stop()</code>.</div></div>
  <div class="concept-card"><div class="cc-label">[5] (double motorRPM, double gearRatio)</div><div class="cc-title">Parameters</div><div class="cc-desc">the inputs. each parameter has a type and a name. the method gets its own copy of whatever values you pass in.</div></div>
  <div class="concept-card"><div class="cc-label">[6] return</div><div class="cc-title">Sends back a value</div><div class="cc-desc"><code>return</code> ends the method and sends a value back to whoever called it. the type must match the return type in the signature.</div></div>
</div>

<h3 class="sub">void Methods — No Return Value</h3>
<p>not every method needs to return something. if a method just does something (like setting a motor speed) without needing to hand back a value, you use <code>void</code> as the return type.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — void vs returning</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// void method — does something, returns nothing</span>
<span class="kw">public static</span> <span class="type">void</span> <span class="fn">printSpeed</span>(<span class="type">double</span> speed) {
    System.out.<span class="fn">println</span>(<span class="str">"Current speed: "</span> + speed);
    <span class="cmt">// no return statement needed (or you can write bare: return;)</span>
}

<span class="cmt">// returning method — calculates something and hands it back</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">clampSpeed</span>(<span class="type">double</span> speed, <span class="type">double</span> maxSpeed) {
    <span class="kw">if</span> (speed &gt; maxSpeed)  <span class="kw">return</span> maxSpeed;
    <span class="kw">if</span> (speed &lt; -maxSpeed) <span class="kw">return</span> -maxSpeed;
    <span class="kw">return</span> speed;
}

<span class="cmt">// Calling them</span>
<span class="fn">printSpeed</span>(<span class="num">0.75</span>);                         <span class="cmt">// no assignment needed, it just prints</span>
<span class="type">double</span> safe = <span class="fn">clampSpeed</span>(<span class="num">1.5</span>, <span class="num">1.0</span>); <span class="cmt">// safe = 1.0 (was clamped)</span></pre>
</div>

<h3 class="sub">Parameters vs Arguments</h3>
<p>these two words sound similar but mean different things. this is a small distinction but comes up all the time:</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Parameter</div><div class="cc-title">The variable in the declaration</div><div class="cc-desc">It's the name in the method signature: <code>double motorRPM</code>. it's like a placeholder — the method doesn't know the actual value yet.</div></div>
  <div class="concept-card"><div class="cc-label">Argument</div><div class="cc-title">The actual value you pass in</div><div class="cc-desc">It's the real value when you call the method: <code>calcWheelRPM(5400.0, 8.46)</code>. <code>5400.0</code> and <code>8.46</code> are the arguments.</div></div>
</div>

<h3 class="sub">Methods Calling Methods</h3>
<p>methods can call other methods. this is how you build up complex behavior from small, readable pieces. in FRC you'll see this constantly — a high-level <code>shoot()</code> method might call <code>spinUpFlywheels()</code>, <code>checkAtSpeed()</code>, and <code>activateIndexer()</code>.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — methods calling methods</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public static</span> <span class="type">double</span> <span class="fn">motorRPMtoWheelRPM</span>(<span class="type">double</span> motorRPM, <span class="type">double</span> gearRatio) {
    <span class="kw">return</span> motorRPM / gearRatio;
}

<span class="kw">public static</span> <span class="type">double</span> <span class="fn">wheelRPMtoSpeed_fps</span>(<span class="type">double</span> wheelRPM, <span class="type">double</span> wheelDiam_in) {
    <span class="type">double</span> circumference_ft = Math.PI * wheelDiam_in / <span class="num">12.0</span>;
    <span class="kw">return</span> wheelRPM * circumference_ft / <span class="num">60.0</span>;
}

<span class="cmt">// This method calls both of the above</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">motorRPMtoSpeed_fps</span>(<span class="type">double</span> motorRPM, <span class="type">double</span> gearRatio, <span class="type">double</span> wheelDiam_in) {
    <span class="type">double</span> wheelRPM = <span class="fn">motorRPMtoWheelRPM</span>(motorRPM, gearRatio);   <span class="cmt">// call #1</span>
    <span class="kw">return</span> <span class="fn">wheelRPMtoSpeed_fps</span>(wheelRPM, wheelDiam_in);           <span class="cmt">// call #2</span>
}</pre>
</div>

<div class="callout tip"><p><strong>WRT patterns:</strong> in our subsystem code, methods fall into a few common categories. <code>setX()</code> methods change something (like <code>setSpeed()</code>). <code>getX()</code> methods return the current state (like <code>getPosition()</code>). action methods describe what the mechanism does, like <code>spin()</code>, <code>stop()</code>, <code>extend()</code>. keep your names consistent with this pattern.</p></div>

<h3 class="sub">Common Method Mistakes</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — mistakes to avoid</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// MISTAKE 1: forgetting to return</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">addValues</span>(<span class="type">double</span> a, <span class="type">double</span> b) {
    <span class="type">double</span> result = a + b;
    <span class="cmt">// oops — forgot to return result. compile error!!</span>
}

<span class="cmt">// MISTAKE 2: wrong return type</span>
<span class="kw">public static</span> <span class="type">int</span> <span class="fn">getSpeed</span>() {
    <span class="kw">return</span> <span class="num">0.75</span>; <span class="cmt">// compile error — 0.75 is a double, not an int</span>
}

<span class="cmt">// MISTAKE 3: calling with wrong argument type</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">calcWheelRPM</span>(<span class="type">double</span> motorRPM, <span class="type">double</span> gearRatio) {
    <span class="kw">return</span> motorRPM / gearRatio;
}
<span class="fn">calcWheelRPM</span>(<span class="str">"5400"</span>, <span class="num">8.46</span>); <span class="cmt">// compile error — "5400" is a String, not a double</span></pre>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-3">Javadocs &amp; Code Documentation</h2>
<p>here's a scenario that happens to every programmer. you write code at 11pm, you're in the zone, it makes total sense. you come back to it three weeks later and genuinely have no idea what it does. or worse — someone else has to fix your code at a competition when you're not around.</p>

<p>good comments save everyone. bad comments (or no comments) waste time and cause bugs. let's look at all three ways to comment in Java, then focus on the one that matters most for team code.</p>

<h3 class="sub">The Three Comment Types</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — all three comment types</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// 1. Single-line comment — explain what a tricky line does, inline
// everything after // on this line is ignored by the compiler</span>

<span class="cmt">/*
 * 2. Block comment — spans multiple lines.
 * use when you want to describe a whole section,
 * or temporarily comment out a chunk while debugging.
 */</span>

<span class="cmt">/**
 * 3. Javadoc comment — this is the special one.
 * IDEs like VS Code show this as a hover tooltip.
 * use above every public class and public method.
 *
 * @param speed  the target motor speed (-1.0 to 1.0)
 * @return       true if the motor reached target speed
 */</span>
<span class="kw">public boolean</span> <span class="fn">setSpeed</span>(<span class="type">double</span> speed) {
    <span class="cmt">// implementation here</span>
    <span class="kw">return</span> <span class="kw">true</span>;
}</pre>
</div>

<h3 class="sub">Javadoc in Full — With @param and @return</h3>
<p>Javadoc is what turns your comments into actual documentation. hover over a method call in VS Code and you'll see the Javadoc pop up. it's how your teammates know what your method needs and what it gives back without having to read the whole implementation.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — full javadoc example</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">/**
 * Calculates the wheel RPM from a motor's RPM and the drivetrain gear ratio.
 * Used whenever we need to convert raw motor speed to actual wheel speed.
 *
 * @param motorRPM  the motor's rotational speed in RPM (e.g. 5400.0 for a Falcon 500)
 * @param gearRatio the gear reduction between motor and wheel (e.g. 8.46 means
 *                  the motor spins 8.46x faster than the wheel)
 * @return the resulting wheel RPM as a double
 */</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">calcWheelRPM</span>(<span class="type">double</span> motorRPM, <span class="type">double</span> gearRatio) {
    <span class="kw">return</span> motorRPM / gearRatio;
}</pre>
</div>

<div class="callout tip"><p>the tags you need to know: <code>@param</code> documents one input parameter (one line per parameter). <code>@return</code> documents what the method gives back. there are others like <code>@throws</code> but those two cover 90% of what you'll write.</p></div>

<h3 class="sub">Good Comments vs Bad Comments</h3>
<p>the point of a comment is to explain <em>why</em> something is happening, not just restate <em>what</em> the code already obviously says. "// set speed" tells me nothing. "// clamp to safe range — motor faults if speed exceeds 1.0" tells me something useful.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — bad vs good comments</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// BAD: this just repeats what the code says. useless.</span>
<span class="type">double</span> clampedSpeed = Math.<span class="fn">min</span>(speed, <span class="num">1.0</span>); <span class="cmt">// set clampedSpeed to min of speed and 1.0</span>

<span class="cmt">// GOOD: explains WHY, gives context that isn't obvious from the code</span>
<span class="type">double</span> clampedSpeed = Math.<span class="fn">min</span>(speed, <span class="num">1.0</span>); <span class="cmt">// clamp to safe range — TalonFX faults above 1.0</span>

<span class="cmt">// BAD: vague method name + no javadoc = nightmare to maintain</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">calc</span>(<span class="type">double</span> x, <span class="type">double</span> y) {
    <span class="kw">return</span> x / y;
}

<span class="cmt">// GOOD: self-documenting name + javadoc = easy to understand</span>
<span class="cmt">/**
 * Converts motor RPM to wheel RPM using gear reduction.
 * @param motorRPM  raw motor speed in RPM
 * @param gearRatio reduction ratio (motor turns / wheel turn)
 * @return wheel speed in RPM
 */</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">motorRPMtoWheelRPM</span>(<span class="type">double</span> motorRPM, <span class="type">double</span> gearRatio) {
    <span class="kw">return</span> motorRPM / gearRatio;
}</pre>
</div>

<div class="callout warning"><p><strong>WRT rule:</strong> every <code>public</code> method gets a Javadoc. every tricky algorithm gets inline comments explaining <em>why</em>, not just <em>what</em>. if you're writing code that's going into the real robot codebase, undocumented public methods will get flagged in code review.</p></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

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

<h2 class="sh">Coding Challenge</h2>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Wheel Speed Calculator</div><div class="ch-sub">Write reusable methods for real FRC drivetrain math</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Write three static methods: (1) <code>motorRPMtoWheelRPM(double motorRPM, double gearRatio)</code> that returns motorRPM divided by gearRatio, (2) <code>wheelRPMtoSpeed_fps(double wheelRPM, double wheelDiam_in)</code> that returns wheel surface speed in feet per second using <code>Math.PI * wheelDiam_in / 12.0 * wheelRPM / 60.0</code>, and (3) <code>getModuleInfo(int[] canIDs, double[] angles)</code> that loops through both arrays and prints each module's CAN ID and angle on one line. Add a Javadoc to each method with @param and @return tags. In your <code>main</code>, call all three with a Falcon 500 at 5400 RPM, gear ratio 8.46, and 4-inch wheels.</p>
    <textarea class="code-input" placeholder="// Your code here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w4')">Show Solution</button></div>
    <div id="sol-w4" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">/**
 * Converts motor RPM to wheel RPM using gear ratio.
 * @param motorRPM  the motor's speed in RPM
 * @param gearRatio reduction ratio (motor turns per wheel turn)
 * @return wheel speed in RPM
 */</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">motorRPMtoWheelRPM</span>(<span class="type">double</span> motorRPM, <span class="type">double</span> gearRatio) {
    <span class="kw">return</span> motorRPM / gearRatio;
}

<span class="cmt">/**
 * Converts wheel RPM to surface speed in feet per second.
 * @param wheelRPM      wheel rotational speed in RPM
 * @param wheelDiam_in  wheel diameter in inches
 * @return surface speed in feet per second
 */</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">wheelRPMtoSpeed_fps</span>(<span class="type">double</span> wheelRPM, <span class="type">double</span> wheelDiam_in) {
    <span class="type">double</span> circumference_ft = Math.PI * wheelDiam_in / <span class="num">12.0</span>;
    <span class="kw">return</span> wheelRPM * circumference_ft / <span class="num">60.0</span>;
}

<span class="cmt">/**
 * Prints each swerve module's CAN ID and angle.
 * @param canIDs  array of module CAN IDs
 * @param angles  array of module angles in degrees (same order as canIDs)
 */</span>
<span class="kw">public static</span> <span class="type">void</span> <span class="fn">getModuleInfo</span>(<span class="type">int</span>[] canIDs, <span class="type">double</span>[] angles) {
    <span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; canIDs.length; i++) {
        System.out.<span class="fn">println</span>(<span class="str">"Module "</span> + i + <span class="str">": CAN="</span> + canIDs[i] + <span class="str">", angle="</span> + angles[i] + <span class="str">"°"</span>);
    }
}

<span class="kw">public static</span> <span class="type">void</span> <span class="fn">main</span>(<span class="type">String</span>[] args) {
    <span class="type">double</span> motorRPM  = <span class="num">5400.0</span>;
    <span class="type">double</span> gearRatio = <span class="num">8.46</span>;
    <span class="type">double</span> wheelDiam = <span class="num">4.0</span>;

    <span class="type">double</span> wheelRPM  = <span class="fn">motorRPMtoWheelRPM</span>(motorRPM, gearRatio);
    <span class="type">double</span> speed_fps = <span class="fn">wheelRPMtoSpeed_fps</span>(wheelRPM, wheelDiam);

    System.out.<span class="fn">println</span>(<span class="str">"Wheel RPM: "</span>  + wheelRPM);
    System.out.<span class="fn">println</span>(<span class="str">"Speed fps: "</span>  + speed_fps);

    <span class="type">int</span>[]    canIDs = {<span class="num">10</span>, <span class="num">11</span>, <span class="num">12</span>, <span class="num">13</span>};
    <span class="type">double</span>[] angles = {<span class="num">0.0</span>, <span class="num">90.0</span>, <span class="num">180.0</span>, <span class="num">270.0</span>};
    <span class="fn">getModuleInfo</span>(canIDs, angles);
}</pre>
      </div>
    </div>
  </div>
</div>

<div class="project-task">
  <div class="pt-header">
    <div class="pt-icon"><i data-lucide="wrench"></i></div>
    <div class="pt-header-title">Project Task — Week 4</div>
    <div class="pt-filename">DriveCalculator.java</div>
  </div>
  <div class="pt-body">
    <p>Create <code>DriveCalculator.java</code>. This utility class handles all the math your drivetrain needs — converting between encoder ticks, RPMs, and real-world distances.</p>
    <ul>
      <li><code>static double ticksToRevolutions(int ticks, int ticksPerRev)</code> — divide ticks by ticksPerRev, return as double</li>
      <li><code>static double revolutionsToInches(double revolutions, double wheelDiameterInches)</code> — multiply by Math.PI * diameter</li>
      <li><code>static double motorRPMtoWheelRPM(double motorRPM, double gearRatio)</code> — divide motorRPM by gearRatio</li>
      <li><code>static double[] processModuleSpeeds(double[] rawSpeeds, double maxSpeed)</code> — loop through and clamp each speed to [-maxSpeed, maxSpeed], return cleaned array</li>
      <li>Add full Javadoc to every method including @param and @return</li>
      <li>In <code>main</code>: test with a TalonFX (2048 ticks/rev), gear ratio 8.46, wheel diameter 4 inches</li>
    </ul>
    <span class="pt-note">these calculations will be used inside your DriveSubsystem in week 5!</span>
  </div>
</div>

<h2 class="sh" id="weekly-test">Weekly Test</h2>
<p>covers everything from week 4. score gets sent to the leads :) try without looking back first!!</p>
<div class="weekly-test-block">
  <div class="wt-header">
    <div class="wt-icon"><i data-lucide="clipboard-list"></i></div>
    <div>
      <div class="wt-title">week 4 test</div>
      <div class="wt-sub">arrays, methods, javadoc · 8 questions!!</div>
    </div>
  </div>
  <div id="test-summer-w4"></div>
</div>

<script>
const quiz_w4 = new Quiz('quiz-w4', [
  { question: "An array is declared as <code>int[] arr = new int[4];</code>. What is <code>arr[0]</code>?", options: ["1","undefined","0 (default)","null"], correct: 2, explanation: "Java fills brand-new numeric arrays with 0 automatically. boolean arrays get false, and object arrays get null. so <code>arr[0]</code> on a freshly declared int array is 0 — you haven't put anything there yet." },
  { question: "What is the difference between a parameter and an argument?", options: ["They're the same thing","A parameter is in the method signature; an argument is the actual value you pass when calling it","An argument is in the method signature; a parameter is what you pass","Parameters are only used with static methods"], correct: 1, explanation: "parameter = the variable declared in the method's parentheses (the placeholder). argument = the real value you pass in when you call the method. example: <code>double motorRPM</code> in the signature is a parameter. <code>5400.0</code> when you call it is the argument." },
  { question: "What does a <code>void</code> return type mean?", options: ["The method returns 0","The method returns null","The method doesn't return any value","The method can return any type"], correct: 2, explanation: "void means the method does something (like set a speed, print text, run an action) but doesn't hand back a value. you can't write <code>double x = setSpeed(0.5);</code> if setSpeed is void — there's nothing to assign." },
  { question: "What index is the LAST element of <code>double[] arr = new double[6];</code>?", options: ["6","5","7","-1"], correct: 1, explanation: "arrays are zero-indexed. a 6-element array has indices 0, 1, 2, 3, 4, 5. the last valid index is always arr.length - 1, which is 6 - 1 = 5. trying to use index 6 throws an ArrayIndexOutOfBoundsException." },
  { question: "Why use methods instead of writing the same code multiple times?", options: ["Methods run faster","One place to fix bugs; reusable across the whole codebase; easier to read","Methods use less memory","Java requires it"], correct: 1, explanation: "if you fix a bug inside a method, it's fixed everywhere that method gets called. if you copy-pasted the same 10 lines in 5 different places, you have to hunt down and fix all 5 — and you'll probably miss one. that's how competition day bugs happen." }
], 'summer-w4');

// ── WEEK 4 TEST ───────────────────────────────────────────────
const test_w4 = new Quiz('test-summer-w4', [
  { question: "Given <code>int[] arr = {5, 10, 15};</code>, what is the value of <code>arr[0]</code>?", options: ["10","15","5","0"], correct: 2, explanation: "arrays are zero-indexed — the FIRST element is always at index 0, not index 1. so arr[0] is 5, arr[1] is 10, and arr[2] is 15." },
  { question: "What causes an <code>ArrayIndexOutOfBoundsException</code>?", options: ["Declaring an array with size 0","Trying to access an index that doesn't exist in the array","Declaring an array without values","Using a double array instead of int"], correct: 1, explanation: "this exception happens at runtime when you try to access an index that's outside the valid range. for a 4-element array, valid indices are 0-3. trying to use index 4 (or anything negative) throws this error and crashes the program." },
  { question: "A method with return type <code>void</code>...", options: ["Returns 0 when done","Cannot take any parameters","Does not return a value","Always returns null"], correct: 2, explanation: "void means the method performs an action but hands nothing back. examples: printing something, setting a motor speed, toggling a flag. you can't use its result in an expression because there is no result." },
  { question: "In the method <code>public static double calcRPM(double motorRPM, double gearRatio)</code>, what are <code>motorRPM</code> and <code>gearRatio</code> called?", options: ["Arguments","Return values","Parameters","Constructors"], correct: 2, explanation: "the variables listed inside a method's parentheses in its declaration are called parameters. they're placeholders that get filled in when someone calls the method. the actual values passed in when calling are called arguments." },
  { question: "You found a bug in a formula that's copy-pasted in 6 different places. What's the main advantage of using a method instead?", options: ["Methods compile faster","You only fix the bug once in the method and it's fixed everywhere automatically","Methods use less RAM","Java forces you to use methods for math"], correct: 1, explanation: "this is the core argument for methods. one method = one place to fix bugs, one place to improve the logic, one place to add comments. copy-pasted code multiplies your maintenance work by however many copies exist." },
  { question: "You have <code>String[] names = {\"FL\", \"FR\", \"BL\", \"BR\"};</code>. How do you access the LAST element?", options: ["names[4]","names[names.length]","names[names.length - 1]","names[-1]"], correct: 2, explanation: "the last element is always at index arr.length - 1. here that's 4 - 1 = 3, so names[3] = \"BR\". using names[4] or names[names.length] would throw an ArrayIndexOutOfBoundsException — those indices don't exist." },
  { question: "What is the purpose of <code>@param</code> and <code>@return</code> in a Javadoc comment?", options: ["They make the method run faster","They tell the compiler what types to expect","They document what inputs the method takes and what value it gives back","They replace the need for a method signature"], correct: 2, explanation: "@param documents each input parameter — what it is, what units, what range is valid. @return documents what the method hands back. together they let teammates (and future you) understand how to use the method without reading the whole body." },
  { question: "Looking at <code>public static int getModuleCount(double[] modules)</code> — what does this method return?", options: ["A double","A double array","An int","void (nothing)"], correct: 2, explanation: "the return type is the third word in the signature, right before the method name. here it's <code>int</code>, so the method returns an int. if it said <code>void</code> there, it would return nothing." }
], 'summer-w4-test');
</script>
