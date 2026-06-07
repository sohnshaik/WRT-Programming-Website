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

<p>ok so before last week you learned loops, and you were probably thinking "ok cool, i can repeat stuff." but repeat stuff on WHAT? loops are way more useful when you have a collection of data to work through. that's where arrays come in. an array is just a fixed-size list where every slot holds the same type of thing.</p>

<p>once you have arrays AND loops together, you can do things like "apply this formula to all four drivetrain motors" in four lines instead of sixteen. that combo is one of the most used patterns in all of FRC code.</p>

<h3 class="sub">what even IS an array?</h3>

<p>imagine a row of lockers at school. each locker has a number painted on the door (0, 1, 2, 3...) and can hold exactly one thing inside. all the lockers in the row hold the same type of stuff — you can't have a locker full of text next to a locker full of numbers. the whole row is one unit — one array.</p>

<p>that number painted on the door is called the <strong>index</strong>. the thing inside the locker is the <strong>value</strong>. you get to the value by specifying which locker number you want: <code>lockers[2]</code> means "open locker number 2 and give me what's inside."</p>

<p>now think about real FRC code. a swerve drivetrain has four modules. each module has a motor with a CAN ID. before arrays, you'd track each one with a separate variable:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — the messy way</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// tracking four motors with four separate variables — already painful</span>
<span class="type">int</span> motor1 = <span class="num">1</span>;
<span class="type">int</span> motor2 = <span class="num">2</span>;
<span class="type">int</span> motor3 = <span class="num">3</span>;
<span class="type">int</span> motor4 = <span class="num">4</span>;

<span class="cmt">// now imagine trying to loop through them. you literally can't.</span>
<span class="cmt">// imagine passing them all to a method. nightmare.</span>
<span class="cmt">// imagine changing all four to a new base CAN ID. hunt and replace, four times.</span></pre>
</div>

<p>with an array, you collapse all four into one thing you can loop through, pass around, and update in one place:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — the clean way</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// one variable, four values, perfectly loopable</span>
<span class="type">int</span>[] motorIDs = {<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>};</pre>
</div>

<p>that's the whole pitch for arrays. one variable, ordered list, same type throughout. let's get into the details.</p>

<h3 class="sub">two ways to declare an array</h3>

<p>there are two common patterns for creating an array in Java, and you'll see both in real code. the first is for when you know the size but want to fill it in later. the second is for when you already have the values ready to go.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// Way 1: declare the size, fill it in slot by slot</span>
<span class="cmt">// Java fills all empty slots with 0 for int/double, false for boolean, null for objects</span>
<span class="type">int</span>[] arr = <span class="kw">new</span> <span class="type">int</span>[<span class="num">4</span>]; <span class="cmt">// creates 4 slots, all set to 0 right now</span>
arr[<span class="num">0</span>] = <span class="num">10</span>;           <span class="cmt">// assign slot 0</span>
arr[<span class="num">1</span>] = <span class="num">11</span>;           <span class="cmt">// assign slot 1</span>
arr[<span class="num">2</span>] = <span class="num">12</span>;           <span class="cmt">// assign slot 2</span>
arr[<span class="num">3</span>] = <span class="num">13</span>;           <span class="cmt">// assign slot 3</span>

<span class="cmt">// Way 2: declare and fill in one shot — size is inferred from the list</span>
<span class="type">int</span>[]    motorIDs     = {<span class="num">10</span>, <span class="num">11</span>, <span class="num">12</span>, <span class="num">13</span>};           <span class="cmt">// 4 ints</span>
<span class="type">double</span>[] moduleAngles = {<span class="num">0.0</span>, <span class="num">90.0</span>, <span class="num">180.0</span>, <span class="num">270.0</span>}; <span class="cmt">// 4 doubles</span>
<span class="type">boolean</span>[] sensorStates = {<span class="num">false</span>, <span class="num">false</span>, <span class="num">true</span>, <span class="num">false</span>}; <span class="cmt">// 4 booleans</span></pre>
</div>

<div class="callout info"><p>the syntax <code>int[]</code> means "an array of ints." the square brackets after the type are the signal to Java that this is an array, not a single value. you can also write <code>int arr[]</code> with the brackets after the name, but everyone writes the brackets after the type. go with that style.</p></div>

<p>use Way 1 when your values come from somewhere else at runtime (like reading from sensors). use Way 2 when you know your values at compile time (like constants for CAN IDs or module offsets).</p>

<h3 class="sub">zero indexing — read this twice</h3>

<p>this is the single most common beginner mistake. please read carefully because this trips up almost everyone the first few times.</p>

<p>in Java, arrays start counting at <strong>zero</strong>, not one. if you have a 4-element array, the valid indices are <strong>0, 1, 2, 3</strong>. there is no index 4. the first element is always at index 0, the last is always at index <code>array.length - 1</code>. this is called zero-based indexing and it is universal across nearly every programming language.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — zero indexing</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cls">String</span>[] modules = {<span class="str">"FL"</span>, <span class="str">"FR"</span>, <span class="str">"BL"</span>, <span class="str">"BR"</span>};
<span class="cmt">//                    [0]    [1]    [2]    [3]</span>
<span class="cmt">//               ↑ first                last ↑</span>
<span class="cmt">//              (NOT 1!)           (NOT 4!)</span>

System.out.<span class="fn">println</span>(modules[<span class="num">0</span>]); <span class="cmt">// "FL" — index 0, the first element</span>
System.out.<span class="fn">println</span>(modules[<span class="num">1</span>]); <span class="cmt">// "FR" — index 1</span>
System.out.<span class="fn">println</span>(modules[<span class="num">2</span>]); <span class="cmt">// "BL" — index 2</span>
System.out.<span class="fn">println</span>(modules[<span class="num">3</span>]); <span class="cmt">// "BR" — index 3, the last element</span>

<span class="cmt">// changing a value is the same syntax as reading, just with = on the right</span>
modules[<span class="num">2</span>] = <span class="str">"BackLeft"</span>; <span class="cmt">// slot 2 now holds "BackLeft"</span></pre>
</div>

<div class="callout tip"><p>quick trick you'll use constantly: the last valid index is always <code>arr.length - 1</code>. if there are 4 elements, last index is 3. if there are 10 elements, last index is 9. whenever you need the last element, write <code>arr[arr.length - 1]</code> and you'll never be wrong.</p></div>

<h3 class="sub">the .length property</h3>

<p>every array has a built-in property called <code>.length</code> that tells you exactly how many slots it has. notice: no parentheses. it's a property, not a method call. <code>arr.length</code>, not <code>arr.length()</code>. (this trips people up because String has a <code>.length()</code> method with parentheses. arrays are different.)</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">double</span>[] speeds = {<span class="num">0.5</span>, <span class="num">0.75</span>, <span class="num">1.0</span>, <span class="num">-0.5</span>};

System.out.<span class="fn">println</span>(speeds.length); <span class="cmt">// 4 — counts total slots, not last index</span>
<span class="cmt">// NOTE: last valid INDEX is 3, but LENGTH is 4. classic confusion point.</span>

<span class="cmt">// .length in a for loop — this pattern is everywhere in FRC code</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; speeds.length; i++) {
    System.out.<span class="fn">println</span>(<span class="str">"Speed at index "</span> + i + <span class="str">": "</span> + speeds[i]);
}
<span class="cmt">// prints:</span>
<span class="cmt">// Speed at index 0: 0.5</span>
<span class="cmt">// Speed at index 1: 0.75</span>
<span class="cmt">// Speed at index 2: 1.0</span>
<span class="cmt">// Speed at index 3: -0.5</span></pre>
</div>

<p>using <code>arr.length</code> in your loop condition instead of a hardcoded number is the right habit to build. if you ever resize the array, the loop automatically adjusts — you don't have to hunt down every place you hardcoded the size.</p>

<h3 class="sub">ArrayIndexOutOfBoundsException — the crash you will definitely see</h3>

<p>story time. you have a 4-element array. you're confident the last index is 4, because there are 4 elements. you write <code>arr[4]</code>. the compiler says nothing. you run the program. it immediately crashes with this error:</p>

<p><code>Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 4 out of bounds for length 4</code></p>

<p>this is one of the most common runtime errors in Java. the compiler cannot catch it because the index might not be known until the program actually runs. Java has to wait and see — and when it sees an invalid index, it crashes.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — the classic crash</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">int</span>[] motorIDs = {<span class="num">10</span>, <span class="num">11</span>, <span class="num">12</span>, <span class="num">13</span>};
<span class="cmt">// valid indices: 0, 1, 2, 3</span>

System.out.<span class="fn">println</span>(motorIDs[<span class="num">4</span>]);  <span class="cmt">// CRASH — index 4 doesn't exist</span>
System.out.<span class="fn">println</span>(motorIDs[<span class="num">-1</span>]); <span class="cmt">// CRASH — negative indices are also invalid</span>

<span class="cmt">// BAD loop that crashes — uses <= instead of &lt;</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt;= motorIDs.length; i++) { <span class="cmt">// on last loop: i=4, CRASH</span>
    System.out.<span class="fn">println</span>(motorIDs[i]);
}

<span class="cmt">// GOOD loop — uses strictly less than (&lt;)</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; motorIDs.length; i++) { <span class="cmt">// stops at i=3, perfectly safe</span>
    System.out.<span class="fn">println</span>(motorIDs[i]);
}

<span class="cmt">// safely getting the last element</span>
System.out.<span class="fn">println</span>(motorIDs[motorIDs.length - <span class="num">1</span>]); <span class="cmt">// 13 — always safe</span></pre>
</div>

<div class="callout danger"><p><strong>ArrayIndexOutOfBoundsException:</strong> the two most common causes are (1) using <code>&lt;=</code> instead of <code>&lt;</code> in your loop condition, and (2) using <code>arr.length</code> as an index directly instead of <code>arr.length - 1</code>. both stem from forgetting that indices start at 0 and end at length minus 1, not length.</p></div>

<h3 class="sub">looping through arrays — tying it all together</h3>

<p>arrays and for loops are a combo you'll use constantly. the pattern is always the same: loop from 0 to <code>arr.length - 1</code> (using <code>i &lt; arr.length</code>), and access each element with <code>arr[i]</code>. here's a real FRC example: you have two parallel arrays, one for CAN IDs and one for module offset angles. you want to print info for every module:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — FRC: loop through module CAN IDs</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">final</span> <span class="type">int</span>[]    kModuleCANIDs    = {<span class="num">10</span>, <span class="num">11</span>, <span class="num">12</span>, <span class="num">13</span>};
<span class="kw">final</span> <span class="type">double</span>[] kModuleAngles_deg = {<span class="num">0.0</span>, <span class="num">90.0</span>, <span class="num">180.0</span>, <span class="num">270.0</span>};

<span class="cmt">// both arrays have .length == 4, so this loop runs exactly 4 times (i = 0,1,2,3)</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; kModuleCANIDs.length; i++) {
    System.out.<span class="fn">println</span>(
        <span class="str">"Module "</span> + i +
        <span class="str">": CAN ID = "</span> + kModuleCANIDs[i] +  <span class="cmt">// same index, different array</span>
        <span class="str">", offset angle = "</span> + kModuleAngles_deg[i] + <span class="str">"°"</span>
    );
}
<span class="cmt">// Module 0: CAN ID = 10, offset angle = 0.0°</span>
<span class="cmt">// Module 1: CAN ID = 11, offset angle = 90.0°</span>
<span class="cmt">// Module 2: CAN ID = 12, offset angle = 180.0°</span>
<span class="cmt">// Module 3: CAN ID = 13, offset angle = 270.0°</span></pre>
</div>

<p>this "parallel arrays" pattern — two arrays with matching indices where <code>arr1[i]</code> and <code>arr2[i]</code> describe the same thing — shows up a lot in FRC. once you get to OOP next week, you'll learn how to bundle those two together into one object. but arrays first.</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Declaration</div><div class="cc-title">int[] arr = new int[4]</div><div class="cc-desc">Declare an array of 4 ints. All slots start at 0 until you assign them explicitly.</div></div>
  <div class="concept-card"><div class="cc-label">Initialization</div><div class="cc-title">int[] arr = {1, 2, 3, 4}</div><div class="cc-desc">Declare and fill in one shot. The size is inferred from how many values you give it.</div></div>
  <div class="concept-card"><div class="cc-label">Access</div><div class="cc-title">arr[0] arr[1]</div><div class="cc-desc">Get or set a value by its index. Zero-indexed — first element is always [0], last is [length-1].</div></div>
  <div class="concept-card"><div class="cc-label">Length</div><div class="cc-title">arr.length</div><div class="cc-desc">How many slots the array has. NOT a method — no parentheses. Last valid index is arr.length - 1.</div></div>
</div>

<h3 class="sub">Topic 1 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Module Sensor Buffer</div><div class="ch-sub">Declare and loop through parallel arrays</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Declare two arrays: a <code>double[]</code> named <code>motorTemps</code> with values <code>{42.1, 38.5, 51.0, 44.8}</code> representing four motor temperatures, and a <code>String[]</code> named <code>moduleNames</code> with values <code>{"FL", "FR", "BL", "BR"}</code>. Then write a for loop that prints each module's name and temperature on one line, like: <code>FL: 42.1°C</code>. After the loop, print the total number of modules using <code>.length</code>.</p>
    <textarea class="code-input" placeholder="// Write your code here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w4-t1')">Show Solution</button></div>
    <div id="sol-w4-t1" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="type">double</span>[] motorTemps  = {<span class="num">42.1</span>, <span class="num">38.5</span>, <span class="num">51.0</span>, <span class="num">44.8</span>};
<span class="cls">String</span>[] moduleNames = {<span class="str">"FL"</span>, <span class="str">"FR"</span>, <span class="str">"BL"</span>, <span class="str">"BR"</span>};

<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; motorTemps.length; i++) {
    System.out.<span class="fn">println</span>(moduleNames[i] + <span class="str">": "</span> + motorTemps[i] + <span class="str">"°C"</span>);
}

System.out.<span class="fn">println</span>(<span class="str">"Total modules: "</span> + moduleNames.length);</pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 1 — Quick Check</h3>
<div id="quiz-w4-t1"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-2">Methods</h2>

<p>ok so now you can write code that loops, stores lists, and makes decisions. but there's a big problem you'll hit almost immediately: copy-paste. you end up writing the same formula or logic in three different places in your file. then you find a bug in it, and now you have to fix it in three places. miss one and your robot does math wrong at a competition.</p>

<p>methods solve this completely. a method is a named block of code that you write once and can call as many times as you want from anywhere. fix it in the method, fixed everywhere.</p>

<h3 class="sub">what even IS a method?</h3>

<p>think of a method like a recipe. you write the pancake recipe once in a cookbook. then whenever you want pancakes, you just say "make pancakes." you don't re-write the whole recipe every time you want breakfast. the recipe is the method. "make pancakes" is calling it.</p>

<p>here's the non-pancake version. say you need to calculate wheel RPM from motor RPM at three different places in your code. without methods, that's three copies of the same formula:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — no methods, very bad</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// Place 1: in driveForward()</span>
<span class="type">double</span> wheelRPM1 = motorRPM1 / <span class="num">8.46</span>;

<span class="cmt">// Place 2: in driveRotate()</span>
<span class="type">double</span> wheelRPM2 = motorRPM2 / <span class="num">8.46</span>;

<span class="cmt">// Place 3: in getTelemetry()</span>
<span class="type">double</span> wheelRPM3 = motorRPM3 / <span class="num">8.46</span>;

<span class="cmt">// ...oops. the real gear ratio is 8.14, not 8.46.</span>
<span class="cmt">// now you need to fix it in 3 places. miss one and your robot math is wrong.</span></pre>
</div>

<p>with a method, you write the formula once. when the gear ratio changes, you fix one line and everywhere is instantly correct:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — with a method, much better</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// write the recipe once — fix gear ratio here, fixed everywhere</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">calcWheelRPM</span>(<span class="type">double</span> motorRPM, <span class="type">double</span> gearRatio) {
    <span class="kw">return</span> motorRPM / gearRatio;
}

<span class="cmt">// call it from anywhere, as many times as you want</span>
<span class="type">double</span> wheelRPM1 = <span class="fn">calcWheelRPM</span>(motorRPM1, <span class="num">8.46</span>);
<span class="type">double</span> wheelRPM2 = <span class="fn">calcWheelRPM</span>(motorRPM2, <span class="num">8.46</span>);
<span class="type">double</span> wheelRPM3 = <span class="fn">calcWheelRPM</span>(motorRPM3, <span class="num">8.46</span>);</pre>
</div>

<h3 class="sub">method anatomy — every piece explained</h3>

<p>you need to be able to look at any method signature and immediately know what every word means. let's go piece by piece through a real example. each number below corresponds to a label in the code:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — method anatomy</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">//  [1]    [2]    [3]       [4]          [5]                    [5]</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">calcWheelRPM</span>(<span class="type">double</span> motorRPM, <span class="type">double</span> gearRatio) {
    <span class="kw">return</span> motorRPM / gearRatio; <span class="cmt">// [6] — the body, and return statement</span>
} <span class="cmt">// closing brace ends the method</span></pre>
</div>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">[1] public</div><div class="cc-title">Access modifier</div><div class="cc-desc"><code>public</code> means any code anywhere can call this method. <code>private</code> limits it to only code inside the same class. start with <code>public</code> for now — we go deeper on this in the OOP week.</div></div>
  <div class="concept-card"><div class="cc-label">[2] static</div><div class="cc-title">Belongs to the class</div><div class="cc-desc"><code>static</code> means this method belongs to the class itself, not to a specific object. you can call it as <code>ClassName.calcWheelRPM(...)</code> without creating an object first. utility methods are almost always static.</div></div>
  <div class="concept-card"><div class="cc-label">[3] double</div><div class="cc-title">Return type</div><div class="cc-desc">what type of value this method hands back. use <code>void</code> if it does something but doesn't give you a value back. the type here must match what you <code>return</code> inside the body.</div></div>
  <div class="concept-card"><div class="cc-label">[4] calcWheelRPM</div><div class="cc-title">Method name</div><div class="cc-desc">camelCase, starts with a lowercase verb. describes what the method DOES. on WRT, names follow patterns: <code>setX()</code>, <code>getX()</code>, or action words like <code>spin()</code>, <code>stop()</code>, <code>extend()</code>.</div></div>
  <div class="concept-card"><div class="cc-label">[5] (double motorRPM, double gearRatio)</div><div class="cc-title">Parameters</div><div class="cc-desc">the inputs to the method. each has a type and a name. the method works with its own copy of these values — changing them inside the method doesn't affect the caller's variables.</div></div>
  <div class="concept-card"><div class="cc-label">[6] return</div><div class="cc-title">Return statement</div><div class="cc-desc"><code>return</code> ends the method immediately and sends a value back. the type of the value must match the declared return type. for <code>void</code> methods, you can omit return entirely or write bare <code>return;</code>.</div></div>
</div>

<h3 class="sub">void methods — doing things without returning anything</h3>

<p>not every method hands back a value. sometimes a method just does something — sets a motor speed, prints some info to the console, runs an animation. for those, you use <code>void</code> as the return type. void literally means "nothing" — this method gives nothing back.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — void vs returning</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// void method — does something useful, returns nothing</span>
<span class="kw">public static</span> <span class="type">void</span> <span class="fn">printSpeed</span>(<span class="type">double</span> speed) {
    System.out.<span class="fn">println</span>(<span class="str">"Current speed: "</span> + speed);
    <span class="cmt">// no return statement needed — Java auto-returns when the block ends</span>
    <span class="cmt">// (you CAN write bare "return;" to exit early, but it's optional here)</span>
}

<span class="cmt">// returning method — calculates something and hands the result back</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">clampSpeed</span>(<span class="type">double</span> speed, <span class="type">double</span> maxSpeed) {
    <span class="kw">if</span> (speed &gt; maxSpeed)  <span class="kw">return</span>  maxSpeed; <span class="cmt">// early return if too high</span>
    <span class="kw">if</span> (speed &lt; -maxSpeed) <span class="kw">return</span> -maxSpeed; <span class="cmt">// early return if too low</span>
    <span class="kw">return</span> speed;                             <span class="cmt">// already in range, return as-is</span>
}

<span class="cmt">// calling them — notice the difference</span>
<span class="fn">printSpeed</span>(<span class="num">0.75</span>);                                 <span class="cmt">// called as a statement — no assignment</span>
<span class="type">double</span> safeSpeed = <span class="fn">clampSpeed</span>(<span class="num">1.5</span>, <span class="num">1.0</span>); <span class="cmt">// safeSpeed = 1.0 (was clamped)</span>
<span class="type">double</span> alsoSafe  = <span class="fn">clampSpeed</span>(<span class="num">0.8</span>, <span class="num">1.0</span>); <span class="cmt">// alsoSafe = 0.8 (already in range)</span></pre>
</div>

<div class="callout warning"><p>you cannot do <code>double x = printSpeed(0.75);</code> — there's nothing to assign because printSpeed returns void. the compiler will tell you "incompatible types: void cannot be converted to double." if you need to both do something AND get a value back, use a return type other than void.</p></div>

<h3 class="sub">parameters vs arguments — the distinction that trips everyone up</h3>

<p>these two words get used interchangeably all the time, but they actually mean different things. here's the one-line version: a parameter is the placeholder in the method's definition. an argument is the actual value you pass in when you call it.</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Parameter</div><div class="cc-title">In the method definition</div><div class="cc-desc"><code>double motorRPM</code> and <code>double gearRatio</code> in the signature are parameters. they're like the blanks in a recipe: "add ___ cups of flour." the recipe doesn't know the number yet.</div></div>
  <div class="concept-card"><div class="cc-label">Argument</div><div class="cc-title">In the method call</div><div class="cc-desc"><code>5400.0</code> and <code>8.46</code> when you write <code>calcWheelRPM(5400.0, 8.46)</code> are arguments. they're the actual ingredients filling in the blanks in the recipe.</div></div>
</div>

<p>in everyday conversation, people say "parameter" to mean both. that's fine. but in an interview or a code review, knowing the technical distinction shows you actually understand what's happening under the hood.</p>

<h3 class="sub">methods calling other methods</h3>

<p>this is where things get powerful. methods can call other methods. you break down complex behavior into small, understandable pieces, and then compose them together. in FRC you'll see this all the time — a high-level <code>shoot()</code> method might call <code>spinUpFlywheels()</code>, then wait for <code>isAtSpeed()</code>, then call <code>activateIndexer()</code>.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — methods calling methods</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// step 1: a focused method that does one thing</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">motorRPMtoWheelRPM</span>(<span class="type">double</span> motorRPM, <span class="type">double</span> gearRatio) {
    <span class="kw">return</span> motorRPM / gearRatio;
}

<span class="cmt">// step 2: another focused method that does one thing</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">wheelRPMtoSpeed_fps</span>(<span class="type">double</span> wheelRPM, <span class="type">double</span> wheelDiam_in) {
    <span class="type">double</span> circumference_ft = Math.PI * wheelDiam_in / <span class="num">12.0</span>; <span class="cmt">// convert inches to feet</span>
    <span class="kw">return</span> wheelRPM * circumference_ft / <span class="num">60.0</span>;               <span class="cmt">// RPM to fps</span>
}

<span class="cmt">// step 3: a higher-level method that calls both of the above</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">motorRPMtoSpeed_fps</span>(<span class="type">double</span> motorRPM, <span class="type">double</span> gearRatio, <span class="type">double</span> wheelDiam_in) {
    <span class="type">double</span> wheelRPM = <span class="fn">motorRPMtoWheelRPM</span>(motorRPM, gearRatio);   <span class="cmt">// call #1</span>
    <span class="kw">return</span> <span class="fn">wheelRPMtoSpeed_fps</span>(wheelRPM, wheelDiam_in);           <span class="cmt">// call #2</span>
    <span class="cmt">// reading this, you can understand what it does without seeing the math</span>
}</pre>
</div>

<p>each of those small methods is easy to test in isolation and easy to read. the composed version reads almost like English. this is the core idea behind good code structure — small, focused pieces that you build up into bigger behavior.</p>

<div class="callout tip"><p><strong>WRT naming patterns:</strong> in our codebase, methods fall into categories. <code>setX()</code> methods change state (like <code>setSpeed(double speed)</code>). <code>getX()</code> methods read state (like <code>getPosition()</code>). action methods describe mechanism behavior: <code>spin()</code>, <code>stop()</code>, <code>extend()</code>, <code>retract()</code>. when naming a method, pick a verb that describes exactly what it does. vague names like <code>calc()</code> or <code>doThing()</code> are not acceptable in real code review.</p></div>

<h3 class="sub">common method mistakes (this WILL bite you)</h3>

<p>three mistakes that beginners hit over and over. recognize these so you can fix them in 10 seconds instead of staring at the error for 20 minutes.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — mistakes to know cold</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// MISTAKE 1: forgetting the return statement</span>
<span class="cmt">// compiler says: missing return statement</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">addValues</span>(<span class="type">double</span> a, <span class="type">double</span> b) {
    <span class="type">double</span> result = a + b;
    <span class="cmt">// oops — computed result but never returned it</span>
    <span class="cmt">// fix: add "return result;" here</span>
}

<span class="cmt">// MISTAKE 2: return type doesn't match what you actually return</span>
<span class="cmt">// compiler says: incompatible types: double cannot be converted to int</span>
<span class="kw">public static</span> <span class="type">int</span> <span class="fn">getSpeed</span>() {
    <span class="kw">return</span> <span class="num">0.75</span>; <span class="cmt">// 0.75 is a double, but signature says int — mismatch</span>
    <span class="cmt">// fix: either change return type to double, or return (int) 0.75</span>
}

<span class="cmt">// MISTAKE 3: calling with wrong argument types</span>
<span class="cmt">// compiler says: method calcWheelRPM(double,double) not applicable for arguments (String,double)</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">calcWheelRPM</span>(<span class="type">double</span> motorRPM, <span class="type">double</span> gearRatio) {
    <span class="kw">return</span> motorRPM / gearRatio;
}
<span class="fn">calcWheelRPM</span>(<span class="str">"5400"</span>, <span class="num">8.46</span>); <span class="cmt">// "5400" is a String — wrong type, compile error</span>
<span class="cmt">// fix: pass the number as a number: calcWheelRPM(5400.0, 8.46)</span></pre>
</div>

<h3 class="sub">Topic 2 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Clamp and Convert</div><div class="ch-sub">Write two utility methods and call them in sequence</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Write two static methods: (1) <code>clampSpeed(double speed, double max)</code> that returns <code>speed</code> clamped to the range <code>[-max, max]</code> — if speed is above max, return max; if below -max, return -max; otherwise return speed as-is. (2) <code>printModuleSpeeds(double[] speeds)</code> that loops through an array of doubles and prints each one clamped to 1.0, formatted as <code>"Module 0: 0.8"</code>. In <code>main</code>, create a double array <code>{0.5, 1.3, -0.7, -1.1}</code> and call <code>printModuleSpeeds</code> on it.</p>
    <textarea class="code-input" placeholder="// Write your code here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w4-t2')">Show Solution</button></div>
    <div id="sol-w4-t2" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public static</span> <span class="type">double</span> <span class="fn">clampSpeed</span>(<span class="type">double</span> speed, <span class="type">double</span> max) {
    <span class="kw">if</span> (speed &gt;  max) <span class="kw">return</span>  max; <span class="cmt">// too high — cap at max</span>
    <span class="kw">if</span> (speed &lt; -max) <span class="kw">return</span> -max; <span class="cmt">// too low — cap at -max</span>
    <span class="kw">return</span> speed;                   <span class="cmt">// already in range</span>
}

<span class="kw">public static</span> <span class="type">void</span> <span class="fn">printModuleSpeeds</span>(<span class="type">double</span>[] speeds) {
    <span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; speeds.length; i++) {
        <span class="type">double</span> clamped = <span class="fn">clampSpeed</span>(speeds[i], <span class="num">1.0</span>); <span class="cmt">// call the other method</span>
        System.out.<span class="fn">println</span>(<span class="str">"Module "</span> + i + <span class="str">": "</span> + clamped);
    }
}

<span class="kw">public static</span> <span class="type">void</span> <span class="fn">main</span>(<span class="cls">String</span>[] args) {
    <span class="type">double</span>[] rawSpeeds = {<span class="num">0.5</span>, <span class="num">1.3</span>, <span class="num">-0.7</span>, <span class="num">-1.1</span>};
    <span class="fn">printModuleSpeeds</span>(rawSpeeds);
    <span class="cmt">// Module 0: 0.5</span>
    <span class="cmt">// Module 1: 1.0  ← clamped from 1.3</span>
    <span class="cmt">// Module 2: -0.7</span>
    <span class="cmt">// Module 3: -1.0 ← clamped from -1.1</span>
}</pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 2 — Quick Check</h3>
<div id="quiz-w4-t2"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-3">Javadocs &amp; Code Documentation</h2>

<p>story time. it's 11pm the night before a regional competition. a motor controller is behaving weird and you need to dig into the subsystem code to figure out what's wrong. you open the file and you see this:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — the nightmare</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public static</span> <span class="type">double</span> <span class="fn">calc</span>(<span class="type">double</span> x, <span class="type">double</span> y) {
    <span class="kw">return</span> x / y;
}

<span class="kw">public static</span> <span class="type">double</span> <span class="fn">conv</span>(<span class="type">double</span> a, <span class="type">double</span> b, <span class="type">double</span> c) {
    <span class="kw">return</span> a * Math.PI * b / <span class="num">12.0</span> * c / <span class="num">60.0</span>;
}</pre>
</div>

<p>what does <code>calc</code> do? what are x and y in units? what does <code>conv</code> return? no idea. you wrote this code two months ago and now nobody — including you — can read it. you have to dig through every call site to piece together what it does. at 11pm. at a competition. this is a real situation that happens to real teams.</p>

<p>good documentation is how you avoid this entirely. let's look at all three comment types and then go deep on the one that actually matters for team code.</p>

<h3 class="sub">the three comment types in Java</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — all three comment types</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// 1. Single-line comment — use for quick inline explanations</span>
<span class="cmt">// starts with // and goes to the end of the line</span>
<span class="cmt">// compiler completely ignores everything after //</span>
<span class="type">double</span> safeSpeed = Math.<span class="fn">min</span>(speed, <span class="num">1.0</span>); <span class="cmt">// clamp — TalonFX faults above 1.0</span>

<span class="cmt">/*
 * 2. Block comment — spans multiple lines
 * use when you want to explain a whole section,
 * or temporarily disable a chunk of code during debugging
 * starts with slash-asterisk, ends with asterisk-slash
 */</span>

<span class="cmt">/**
 * 3. Javadoc comment — this is the important one for team code
 * same as a block comment but with TWO asterisks to start
 * IDEs like VS Code and IntelliJ show this as a hover tooltip
 * place one directly above every public class and every public method
 *
 * @param speed  the target speed in range -1.0 to 1.0
 * @return       true if the motor reached the target speed
 */</span>
<span class="kw">public boolean</span> <span class="fn">setSpeed</span>(<span class="type">double</span> speed) {
    <span class="cmt">// implementation here...</span>
    <span class="kw">return</span> <span class="num">true</span>;
}</pre>
</div>

<div class="callout info"><p>the difference between <code>/* ... */</code> and <code>/** ... */</code> is literally one asterisk. but that one asterisk tells IDEs and documentation generators to treat it specially. always use <code>/**</code> for method documentation, not <code>/*</code>.</p></div>

<h3 class="sub">Javadoc in full — @param and @return</h3>

<p>Javadoc is what turns your comments into actual living documentation. hover over a method call in VS Code after adding a Javadoc and you'll see a tooltip pop up with the description, parameters, and return value. your teammates don't have to scroll to the method definition to understand how to use it — the tooltip appears right there.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — full javadoc example</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">/**
 * Calculates wheel RPM from a motor's RPM and the drivetrain gear ratio.
 * Use this any time you need to convert raw motor velocity to actual wheel speed.
 * The gear ratio is defined as motor turns per wheel turn (e.g. 8.46 means
 * the motor spins 8.46 times for every 1 rotation of the wheel).
 *
 * @param motorRPM  the motor's rotational speed in RPM (Falcon 500 free speed: ~6380)
 * @param gearRatio motor turns per wheel turn — higher ratio = more torque, less speed
 * @return the resulting wheel speed in RPM as a double
 */</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">motorRPMtoWheelRPM</span>(<span class="type">double</span> motorRPM, <span class="type">double</span> gearRatio) {
    <span class="kw">return</span> motorRPM / gearRatio;
}

<span class="cmt">/**
 * Clamps a speed value to a safe operating range.
 * TalonFX motor controllers fault if commanded above 1.0 or below -1.0.
 * Always clamp before passing values to motor.set().
 *
 * @param speed    the raw speed to clamp (can be any double)
 * @param maxSpeed the maximum allowed magnitude, usually 1.0
 * @return speed clamped to the range [-maxSpeed, maxSpeed]
 */</span>
<span class="kw">public static</span> <span class="type">double</span> <span class="fn">clampSpeed</span>(<span class="type">double</span> speed, <span class="type">double</span> maxSpeed) {
    <span class="kw">if</span> (speed &gt;  maxSpeed) <span class="kw">return</span>  maxSpeed;
    <span class="kw">if</span> (speed &lt; -maxSpeed) <span class="kw">return</span> -maxSpeed;
    <span class="kw">return</span> speed;
}</pre>
</div>

<div class="callout tip"><p>the tags you need to know: <code>@param</code> documents one input — one line per parameter, name then description. <code>@return</code> documents what gets handed back. there's also <code>@throws</code> for documenting exceptions, but <code>@param</code> and <code>@return</code> cover 90% of what you'll write. also: put the @param lines in the same order as the parameters appear in the signature.</p></div>

<h3 class="sub">class-level Javadoc</h3>

<p>it's not just methods that get Javadocs — public classes do too. a class-level Javadoc sits above the class declaration and describes what the class represents, what it's responsible for, and any important notes about how to use it.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — class-level javadoc</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">/**
 * Utility class for swerve drivetrain calculations.
 * Contains static methods for converting between encoder ticks, RPM, and
 * real-world speeds and distances. All methods are stateless (no instance needed).
 *
 * Used by: DriveSubsystem, autonomous routines, telemetry dashboards.
 */</span>
<span class="kw">public class</span> <span class="cls">DriveCalculator</span> {

    <span class="cmt">/**
     * Converts encoder ticks to wheel revolutions.
     * @param ticks       raw encoder tick count from TalonFX
     * @param ticksPerRev encoder ticks per full motor revolution (TalonFX = 2048)
     * @return total revolutions as a double
     */</span>
    <span class="kw">public static</span> <span class="type">double</span> <span class="fn">ticksToRevolutions</span>(<span class="type">int</span> ticks, <span class="type">int</span> ticksPerRev) {
        <span class="kw">return</span> (<span class="type">double</span>) ticks / ticksPerRev; <span class="cmt">// cast to avoid integer division</span>
    }
}</pre>
</div>

<h3 class="sub">good comments vs bad comments</h3>

<p>here's the thing — writing useless comments is almost as bad as writing no comments at all. a bad comment just restates what the code obviously already says. a good comment explains WHY something is done, or gives context that isn't obvious from reading the code itself.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — bad vs good comments</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// BAD: tells me what I can already see. zero extra information.</span>
<span class="type">double</span> clamped = Math.<span class="fn">min</span>(speed, <span class="num">1.0</span>); <span class="cmt">// set clamped to min of speed and 1.0</span>

<span class="cmt">// GOOD: tells me WHY — and includes the specific thing to watch out for</span>
<span class="type">double</span> clamped = Math.<span class="fn">min</span>(speed, <span class="num">1.0</span>); <span class="cmt">// clamp — TalonFX faults above 1.0</span>


<span class="cmt">// BAD: the number 8.46 is magic — where did it come from? when does it change?</span>
<span class="type">double</span> wheelRPM = motorRPM / <span class="num">8.46</span>;

<span class="cmt">// GOOD: the constant is named and the comment explains the physical meaning</span>
<span class="kw">final</span> <span class="type">double</span> kGearRatio = <span class="num">8.46</span>; <span class="cmt">// L2 SDS MK4i gear ratio (motor turns per wheel turn)</span>
<span class="type">double</span> wheelRPM = motorRPM / kGearRatio;


<span class="cmt">// BAD: vague javadoc that adds nothing — you could have just read the signature</span>
<span class="cmt">/**
 * calculates rpm
 * @param a the a
 * @param b the b
 * @return something
 */</span>

<span class="cmt">// GOOD: specific enough that a teammate understands without reading the body</span>
<span class="cmt">/**
 * Converts motor RPM to actual wheel surface speed in feet per second.
 * Uses wheel circumference (pi * diameter / 12 for inches to feet) and
 * divides by 60 to convert from per-minute to per-second.
 *
 * @param wheelRPM     wheel rotational speed in RPM (after gear reduction)
 * @param wheelDiam_in wheel outer diameter in inches (e.g. 4.0 for 4" wheels)
 * @return surface speed in feet per second
 */</span></pre>
</div>

<div class="callout warning"><p><strong>WRT rule:</strong> every <code>public</code> method gets a Javadoc. every tricky calculation or non-obvious logic gets an inline comment explaining WHY. if you submit code for the real robot codebase, undocumented public methods will be flagged in code review and sent back. this is not optional.</p></div>

<h3 class="sub">Topic 3 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Document Your Utility Class</div><div class="ch-sub">Add proper Javadoc to a DriveCalculator class</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Below is a utility class with three methods but no documentation. Add: (1) a class-level Javadoc above <code>DriveCalculator</code>, (2) a full method Javadoc with <code>@param</code> and <code>@return</code> above each method. Then add inline comments inside each method body explaining WHY (not just what) each line does. Finally, name the class-level constant properly with a k-prefix and a units suffix.</p>
    <textarea class="code-input" placeholder="public class DriveCalculator {
    static double GEAR_RATIO = 8.46;

    public static double toWheelRPM(double motorRPM) {
        return motorRPM / GEAR_RATIO;
    }

    public static double toSpeed(double wheelRPM, double diam) {
        return wheelRPM * Math.PI * diam / 12.0 / 60.0;
    }

    public static double clamp(double v, double max) {
        if (v > max) return max;
        if (v < -max) return -max;
        return v;
    }
}"></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w4-t3')">Show Solution</button></div>
    <div id="sol-w4-t3" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">/**
 * Static utility class for swerve drivetrain calculations.
 * All methods are stateless — no object needed, just call directly.
 * Used by DriveSubsystem and telemetry code.
 */</span>
<span class="kw">public class</span> <span class="cls">DriveCalculator</span> {

    <span class="cmt">// k prefix = constant, units suffix = what it represents physically</span>
    <span class="kw">static final</span> <span class="type">double</span> kGearRatio = <span class="num">8.46</span>; <span class="cmt">// L2 SDS MK4i: motor turns per wheel turn</span>

    <span class="cmt">/**
     * Converts motor RPM to wheel RPM using the drivetrain gear ratio.
     * Higher gear ratio = lower wheel RPM for the same motor RPM.
     *
     * @param motorRPM raw motor speed in RPM from encoder
     * @return wheel rotational speed in RPM
     */</span>
    <span class="kw">public static</span> <span class="type">double</span> <span class="fn">toWheelRPM</span>(<span class="type">double</span> motorRPM) {
        <span class="kw">return</span> motorRPM / kGearRatio; <span class="cmt">// gear ratio reduces speed: motor spins faster than wheel</span>
    }

    <span class="cmt">/**
     * Converts wheel RPM and wheel diameter to surface speed in feet per second.
     * Uses circumference (pi * diameter) and converts inches to feet and minutes to seconds.
     *
     * @param wheelRPM  wheel rotational speed in RPM
     * @param diam      wheel outer diameter in inches
     * @return surface speed in feet per second
     */</span>
    <span class="kw">public static</span> <span class="type">double</span> <span class="fn">toSpeed</span>(<span class="type">double</span> wheelRPM, <span class="type">double</span> diam) {
        <span class="kw">return</span> wheelRPM * Math.PI * diam / <span class="num">12.0</span> / <span class="num">60.0</span>;
        <span class="cmt">// Math.PI * diam = circumference in inches</span>
        <span class="cmt">// / 12.0 = convert inches to feet</span>
        <span class="cmt">// / 60.0 = convert per-minute to per-second</span>
    }

    <span class="cmt">/**
     * Clamps a value to a symmetric range [-max, max].
     * TalonFX faults if commanded outside -1.0 to 1.0, so always clamp first.
     *
     * @param v   value to clamp
     * @param max maximum allowed magnitude (positive, e.g. 1.0)
     * @return v clamped to [-max, max]
     */</span>
    <span class="kw">public static</span> <span class="type">double</span> <span class="fn">clamp</span>(<span class="type">double</span> v, <span class="type">double</span> max) {
        <span class="kw">if</span> (v &gt;  max) <span class="kw">return</span>  max; <span class="cmt">// above ceiling — cap it</span>
        <span class="kw">if</span> (v &lt; -max) <span class="kw">return</span> -max; <span class="cmt">// below floor — cap it</span>
        <span class="kw">return</span> v;                   <span class="cmt">// already in range — pass through unchanged</span>
    }
}</pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 3 — Quick Check</h3>
<div id="quiz-w4-t3"></div>

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

<span class="kw">public static</span> <span class="type">void</span> <span class="fn">main</span>(<span class="cls">String</span>[] args) {
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
const quiz_w4_t1 = new Quiz('quiz-w4-t1', [
  { question: "You declare <code>int[] arr = new int[5];</code>. What is <code>arr[0]</code> before you assign anything to it?", options: ["1","null","undefined","0 (default)"], correct: 3, explanation: "Java automatically fills a brand-new int array with 0 in every slot. boolean arrays get false, and object arrays get null. so before you assign anything, arr[0] is 0 — not 1, not undefined, exactly 0." },
  { question: "What is the last valid index of <code>String[] names = {\"FL\", \"FR\", \"BL\", \"BR\"};</code>?", options: ["4","3","0","-1"], correct: 1, explanation: "there are 4 elements (indices 0, 1, 2, 3). the last valid index is always arr.length - 1, which is 4 - 1 = 3. using index 4 would throw an ArrayIndexOutOfBoundsException at runtime." },
  { question: "What does <code>arr.length</code> give you for a 6-element array?", options: ["5","6","7","The last index"], correct: 1, explanation: "arr.length is the total count of slots — for 6 elements it's 6. note: arr.length is NOT the last index (which would be 5). this distinction is one of the most common sources of ArrayIndexOutOfBoundsExceptions." }
], 'summer-w4');

const quiz_w4_t2 = new Quiz('quiz-w4-t2', [
  { question: "What is the difference between a parameter and an argument?", options: ["They're the same thing","A parameter is in the method definition; an argument is the actual value passed when calling","An argument is in the definition; a parameter is what you pass","Parameters are only used in static methods"], correct: 1, explanation: "parameter = the variable placeholder in the method signature (like <code>double speed</code>). argument = the actual value you supply when calling the method (like <code>0.75</code>). a parameter is the blank in the recipe; an argument is the real ingredient." },
  { question: "A method is declared as <code>public static void printInfo(String name)</code>. Can you write <code>String result = printInfo(\"FL\");</code>?", options: ["Yes, result will be null","Yes, result will be an empty String","No — void methods return nothing, you can't assign them","Yes, but only if you add a return statement"], correct: 2, explanation: "void means the method returns NOTHING. you cannot assign the result of a void call to a variable because there is no result. the compiler will error: 'incompatible types: void cannot be converted to String.'" },
  { question: "What happens if a method declares return type <code>double</code> but you forget the return statement?", options: ["It returns 0.0 automatically","It returns null","The compiler gives a 'missing return statement' error","It runs fine, just prints nothing"], correct: 2, explanation: "Java's compiler checks that every path through a non-void method actually ends with a return statement. if there's a path that falls off the end without returning, you get a compile error: 'missing return statement.' Java will NOT silently return 0 for you." }
], 'summer-w4');

const quiz_w4_t3 = new Quiz('quiz-w4-t3', [
  { question: "What comment syntax triggers IDE hover tooltips and documentation generation?", options: ["// double slash","/* block comment */","/** javadoc comment */","# hash comment"], correct: 2, explanation: "Javadoc comments start with /** (two asterisks) and end with */. the extra asterisk is what tells IDEs like VS Code and documentation tools like javadoc.exe to treat this as formal documentation. regular block comments (/* */) are ignored by those tools." },
  { question: "What is the purpose of <code>@param</code> in a Javadoc?", options: ["It makes the method run faster","It documents one input parameter — its name, meaning, and expected range","It replaces the method signature","It tells the compiler the parameter type"], correct: 1, explanation: "@param documents one parameter per line. you write it as @param paramName description. a good @param tells teammates what the value represents, what units it's in, and what range is valid — information that isn't in the method signature itself." },
  { question: "Which is a GOOD inline comment?", options: ["// set speed to 0.5","// speed = 0.5","double speed = 0.5; // safe default — prevents motor jerk on startup","speed = speed * 2; // multiply speed by 2"], correct: 2, explanation: "a good comment explains WHY, not just what. 'prevents motor jerk on startup' tells you something you couldn't have guessed from reading the code alone — the reason behind the choice. the others just restate what the code already says." }
], 'summer-w4');

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
