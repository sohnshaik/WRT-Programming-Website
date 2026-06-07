---
layout: week
title: "Advanced Classes"
subtitle: "enums, nested classes, ArrayLists, and wrapper classes. patterns you'll see constantly in real robot code :)"
badge: "Summer · Week 7 of 8"
phase: summer
phase_label: Summer
week_label: Week 7
page_id: summer-w7
weekly_test: true
topics:
  - Enums
  - ArrayList
  - Wrapper Classes
prev_url: /weeks/summer/week6
prev_title: "Week 6 — Inheritance & Polymorphism"
next_url: /weeks/summer/week8
next_title: "Week 8 — Recap & Resources"
---

<h2 class="sh" id="topic-1">Enums</h2>

<div class="callout danger"><p><strong>we use enums constantly on 2974.</strong> robot states, game piece types, scoring positions, arm positions — all enums. if you forget this week, you won't be able to read our codebase. ngl this is one of the most important weeks.</p></div>

<p>ok so imagine you're at a restaurant. you can't just say "i want a wombat steak" — you have to order from the menu. an enum is the menu. you define the exact options upfront, and Java will <em>only</em> allow those options. nothing else compiles. nothing else runs.</p>

<p>that sounds limiting, but it's actually the whole point. here's the problem enums solve:</p>

<div class="callout warning"><p><strong>the String problem:</strong> if you use a String for robot state — "TELEOP", "AUTO", "DISABLED" — nothing stops someone from accidentally typing "Teleop" (capital T) or "TELE0P" (that's a zero, not an O). Java won't catch it. your robot just behaves wrong and you have no idea why. enum fixes this — only the exact defined values are allowed, and the compiler checks it at build time.</p></div>

<h3 class="sub">declaring an enum</h3>

<p>you use the <code>enum</code> keyword instead of <code>class</code>. the values inside are written in SCREAMING_SNAKE_CASE by convention — they're essentially constants, so they get the constant treatment.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// declare the enum — like a class, but for a fixed set of values</span>
<span class="kw">public enum</span> <span class="cls">RobotState</span> {
    DISABLED, TELEOP, AUTO, TEST
}

<span class="cmt">// use it — type is RobotState, value is one of the four options</span>
<span class="cls">RobotState</span> state = <span class="cls">RobotState</span>.TELEOP;

<span class="cmt">// trying to set it to something not in the enum won't compile</span>
<span class="cmt">// RobotState bad = "TELEOP";   &lt;-- compile error, good!</span></pre>
</div>

<h3 class="sub">enums + switch statements (chef's kiss)</h3>

<p>enums and switch statements are made for each other. Java's switch can check every possible enum value, and if you miss one, modern compilers will warn you. way cleaner than a chain of if/else if.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cls">RobotState</span> state = <span class="cls">RobotState</span>.TELEOP;

<span class="kw">switch</span> (state) {
    <span class="kw">case</span> TELEOP:
        <span class="fn">runTeleopCode</span>();
        <span class="kw">break</span>;
    <span class="kw">case</span> AUTO:
        <span class="fn">runAutoCode</span>();
        <span class="kw">break</span>;
    <span class="kw">case</span> DISABLED:
        <span class="fn">stop</span>();
        <span class="kw">break</span>;
    <span class="kw">default</span>:
        <span class="fn">stop</span>();
}</pre>
</div>

<p>notice: inside the switch you just write <code>case TELEOP</code>, not <code>case RobotState.TELEOP</code>. Java already knows the type from the switch expression.</p>

<h3 class="sub">enums + if/else</h3>

<p>you can also compare enum values with <code>==</code> directly — no need for <code>.equals()</code> like you'd use with strings.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">if</span> (state == <span class="cls">RobotState</span>.TELEOP) {
    <span class="fn">runTeleopCode</span>();
} <span class="kw">else if</span> (state == <span class="cls">RobotState</span>.AUTO) {
    <span class="fn">runAutoCode</span>();
}</pre>
</div>

<h3 class="sub">enums can have methods</h3>

<p>this is where enums get really cool — they're actually full classes under the hood. you can add methods to them. here's a useful pattern: an <code>isActive()</code> helper right on the enum itself.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public enum</span> <span class="cls">RobotState</span> {
    DISABLED, TELEOP, AUTO, TEST;

    <span class="cmt">// method on the enum — call it like state.isActive()</span>
    <span class="kw">public boolean</span> <span class="fn">isActive</span>() {
        <span class="kw">return this</span> == TELEOP || <span class="kw">this</span> == AUTO;
    }
}

<span class="cmt">// usage</span>
<span class="cls">RobotState</span> state = <span class="cls">RobotState</span>.TELEOP;
<span class="kw">if</span> (state.<span class="fn">isActive</span>()) {
    System.out.<span class="fn">println</span>(<span class="str">"robot is running"</span>);
}</pre>
</div>

<h3 class="sub">enums in FRC — the WRT state machine pattern</h3>

<p>on 2974, enums are used as state machines. the robot has a current state (stored as an enum value), and the periodic loop checks that state and runs the right code. this is how you manage complex robot behavior without spaghetti if/else chains.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — simplified WRT pattern</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public enum</span> <span class="cls">ArmState</span> {
    STOWED, INTAKING, SCORING, CLIMBING
}

<span class="kw">public class</span> <span class="cls">ArmSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> {
    <span class="kw">private</span> <span class="cls">ArmState</span> m_state = <span class="cls">ArmState</span>.STOWED;

    <span class="kw">public void</span> <span class="fn">setState</span>(<span class="cls">ArmState</span> newState) {
        m_state = newState;
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">periodic</span>() {
        <span class="kw">switch</span> (m_state) {
            <span class="kw">case</span> INTAKING:  <span class="fn">moveToIntakePos</span>();  <span class="kw">break</span>;
            <span class="kw">case</span> SCORING:   <span class="fn">moveToScorePos</span>();   <span class="kw">break</span>;
            <span class="kw">default</span>:        <span class="fn">holdPosition</span>();
        }
    }
}</pre>
</div>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">type safety</div><div class="cc-title">Compiler-enforced values</div><div class="cc-desc">Only the defined enum values are valid. typos compile to errors instead of silent bugs.</div></div>
  <div class="concept-card"><div class="cc-label">readability</div><div class="cc-title">Self-documenting code</div><div class="cc-desc"><code>ArmState.SCORING</code> is way clearer than <code>2</code> or <code>"scoring"</code>. anyone reading the code instantly knows what it means.</div></div>
  <div class="concept-card"><div class="cc-label">switch</div><div class="cc-title">Perfect switch companion</div><div class="cc-desc">switch on an enum covers every possible value. the compiler can warn you if you miss a case.</div></div>
  <div class="concept-card"><div class="cc-label">methods</div><div class="cc-title">Behavior on the enum</div><div class="cc-desc">you can add methods like <code>isActive()</code> directly to an enum. no separate helper class needed.</div></div>
</div>

<div class="callout tip"><p><strong>common mistake:</strong> using a String field like <code>private String m_state = "IDLE"</code> when you should be using an enum. if you catch yourself doing this on WRT code, refactor it. strings for state = bad time guaranteed.</p></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-2">ArrayList</h2>

<p>you know how a regular array is like a row of lockers — fixed number, you can't add or remove lockers after it's built. an <code>ArrayList</code> is like a locker room that automatically expands and contracts. need another locker? it adds one. locker is empty and you don't need it? remove it. the room handles the resizing for you.</p>

<h3 class="sub">array vs ArrayList — when to use which</h3>

<p>this is a real decision you make in code. here's the rule of thumb:</p>

<table>
<thead><tr><th>Situation</th><th>Use</th></tr></thead>
<tbody>
<tr><td>you know EXACTLY how many elements you'll ever have (e.g., exactly 4 motor CAN IDs)</td><td>array</td></tr>
<tr><td>the count changes at runtime, or you don't know the final size upfront</td><td>ArrayList</td></tr>
<tr><td>you need fast index access and the size never changes</td><td>array</td></tr>
<tr><td>you need to add/remove elements frequently</td><td>ArrayList</td></tr>
</tbody>
</table>

<h3 class="sub">importing and creating an ArrayList</h3>

<p>ArrayList lives in <code>java.util</code>, so you need to import it. then you create one with a type parameter in angle brackets — more on that in a second.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> java.util.<span class="cls">ArrayList</span>;

<span class="cmt">// ArrayList&lt;String&gt; means "an ArrayList that holds Strings"</span>
<span class="cls">ArrayList</span>&lt;<span class="type">String</span>&gt; activeSubsystems = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();

<span class="cmt">// the &lt;&gt; on the right is the "diamond operator" — Java infers the type</span></pre>
</div>

<div class="callout info"><p><strong>what's the &lt;String&gt; thing?</strong> that's called a <em>generic type parameter</em>. it tells Java what type of things this list holds. think of it like labeling a box "only apples go in here." if you try to put an orange (Integer) in an apple box (ArrayList&lt;String&gt;), Java stops you at compile time. every ArrayList needs a type parameter.</p></div>

<h3 class="sub">the core methods</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cls">ArrayList</span>&lt;<span class="type">String</span>&gt; subsystems = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();

<span class="cmt">// add() — appends to the end</span>
subsystems.<span class="fn">add</span>(<span class="str">"Drivetrain"</span>);
subsystems.<span class="fn">add</span>(<span class="str">"Shooter"</span>);
subsystems.<span class="fn">add</span>(<span class="str">"Intake"</span>);

<span class="cmt">// get() — access by index (zero-based, same as arrays)</span>
System.out.<span class="fn">println</span>(subsystems.<span class="fn">get</span>(<span class="num">0</span>));       <span class="cmt">// "Drivetrain"</span>

<span class="cmt">// size() — current number of elements</span>
System.out.<span class="fn">println</span>(subsystems.<span class="fn">size</span>());       <span class="cmt">// 3</span>

<span class="cmt">// contains() — check if something's in the list</span>
System.out.<span class="fn">println</span>(subsystems.<span class="fn">contains</span>(<span class="str">"Shooter"</span>)); <span class="cmt">// true</span>

<span class="cmt">// remove() — removes first occurrence of that value</span>
subsystems.<span class="fn">remove</span>(<span class="str">"Intake"</span>);
System.out.<span class="fn">println</span>(subsystems.<span class="fn">contains</span>(<span class="str">"Intake"</span>));  <span class="cmt">// false</span>
System.out.<span class="fn">println</span>(subsystems.<span class="fn">size</span>());              <span class="cmt">// 2</span>

<span class="cmt">// clear() — empties the whole list</span>
subsystems.<span class="fn">clear</span>();
System.out.<span class="fn">println</span>(subsystems.<span class="fn">size</span>());              <span class="cmt">// 0</span></pre>
</div>

<h3 class="sub">iterating with foreach</h3>

<p>the foreach loop works perfectly with ArrayList — same syntax you already know from arrays.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cls">ArrayList</span>&lt;<span class="type">String</span>&gt; subsystems = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
subsystems.<span class="fn">add</span>(<span class="str">"Drivetrain"</span>);
subsystems.<span class="fn">add</span>(<span class="str">"Shooter"</span>);

<span class="kw">for</span> (<span class="type">String</span> name : subsystems) {
    System.out.<span class="fn">println</span>(<span class="str">"active: "</span> + name);
}
<span class="cmt">// active: Drivetrain</span>
<span class="cmt">// active: Shooter</span></pre>
</div>

<h3 class="sub">array vs ArrayList — feature comparison</h3>

<table>
<thead><tr><th>Feature</th><th>Array</th><th>ArrayList</th></tr></thead>
<tbody>
<tr><td>size</td><td>fixed forever at creation</td><td>grows and shrinks dynamically</td></tr>
<tr><td>types</td><td>primitives + objects</td><td>objects only (use wrapper classes)</td></tr>
<tr><td>access syntax</td><td><code>arr[i]</code></td><td><code>list.get(i)</code></td></tr>
<tr><td>length</td><td><code>arr.length</code></td><td><code>list.size()</code></td></tr>
<tr><td>add element</td><td>not possible</td><td><code>list.add(value)</code></td></tr>
<tr><td>remove element</td><td>not possible</td><td><code>list.remove(value)</code></td></tr>
<tr><td>use when</td><td>known fixed size</td><td>dynamic or unknown size</td></tr>
</tbody>
</table>

<h3 class="sub">FRC examples where ArrayList shows up</h3>

<div class="callout info"><p>in real FRC code, ArrayLists come up when you're tracking a <em>variable</em> number of things — like a list of game pieces detected by vision (you don't know how many the camera will see), or a list of commands queued up to run, or a log of recent state transitions.</p></div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — vision example</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> java.util.<span class="cls">ArrayList</span>;

<span class="cmt">// camera sees 0, 1, or many game pieces — ArrayList fits perfectly</span>
<span class="cls">ArrayList</span>&lt;<span class="type">String</span>&gt; detectedPieces = <span class="fn">getVisionTargets</span>();

<span class="kw">if</span> (detectedPieces.<span class="fn">size</span>() > <span class="num">0</span>) {
    <span class="type">String</span> closest = detectedPieces.<span class="fn">get</span>(<span class="num">0</span>); <span class="cmt">// grab the first one</span>
    <span class="fn">driveToTarget</span>(closest);
}</pre>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-3">Wrapper Classes</h2>

<p>remember how we said ArrayList can only hold objects, not primitives? that's a problem if you want an <code>ArrayList&lt;int&gt;</code>, because <code>int</code> is a primitive, not an object. Java's solution: wrapper classes. every primitive type has an object version that "wraps" it.</p>

<h3 class="sub">the primitive-to-wrapper mapping</h3>

<table>
<thead><tr><th>Primitive</th><th>Wrapper Class</th><th>Example use</th></tr></thead>
<tbody>
<tr><td><code>int</code></td><td><code>Integer</code></td><td><code>ArrayList&lt;Integer&gt;</code></td></tr>
<tr><td><code>double</code></td><td><code>Double</code></td><td><code>ArrayList&lt;Double&gt;</code></td></tr>
<tr><td><code>boolean</code></td><td><code>Boolean</code></td><td><code>ArrayList&lt;Boolean&gt;</code></td></tr>
<tr><td><code>char</code></td><td><code>Character</code></td><td><code>ArrayList&lt;Character&gt;</code></td></tr>
<tr><td><code>long</code></td><td><code>Long</code></td><td><code>ArrayList&lt;Long&gt;</code></td></tr>
</tbody>
</table>

<p>notice the pattern: wrapper class names are just the capitalized version of the primitive name, except <code>int</code> → <code>Integer</code> and <code>char</code> → <code>Character</code>.</p>

<h3 class="sub">autoboxing — Java does the conversion for you</h3>

<p>you might be thinking "do I have to manually convert int to Integer every time?" — nope. Java is smart enough to do it automatically. this is called <strong>autoboxing</strong> (primitive to wrapper) and <strong>unboxing</strong> (wrapper back to primitive).</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> java.util.<span class="cls">ArrayList</span>;

<span class="cls">ArrayList</span>&lt;<span class="cls">Integer</span>&gt; motorIDs = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();

<span class="cmt">// autoboxing: int 5 is automatically converted to Integer(5)</span>
motorIDs.<span class="fn">add</span>(<span class="num">5</span>);
motorIDs.<span class="fn">add</span>(<span class="num">12</span>);
motorIDs.<span class="fn">add</span>(<span class="num">3</span>);

<span class="cmt">// unboxing: Integer is automatically converted back to int</span>
<span class="type">int</span> first = motorIDs.<span class="fn">get</span>(<span class="num">0</span>); <span class="cmt">// works fine — Java unboxes it</span>

<span class="cls">ArrayList</span>&lt;<span class="cls">Double</span>&gt; speeds = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
speeds.<span class="fn">add</span>(<span class="num">0.75</span>);   <span class="cmt">// double literal — autoboxed to Double</span>
speeds.<span class="fn">add</span>(<span class="num">-1.0</span>);
<span class="type">double</span> s = speeds.<span class="fn">get</span>(<span class="num">0</span>); <span class="cmt">// unboxed back to double</span></pre>
</div>

<h3 class="sub">useful static methods on wrapper classes</h3>

<p>wrapper classes aren't just containers — they come with handy static methods. these are super useful for parsing user input or config values.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// parse a String into a number — used constantly for config parsing</span>
<span class="type">int</span>    port   = <span class="cls">Integer</span>.<span class="fn">parseInt</span>(<span class="str">"5800"</span>);    <span class="cmt">// returns int 5800</span>
<span class="type">double</span> speed  = <span class="cls">Double</span>.<span class="fn">parseDouble</span>(<span class="str">"0.75"</span>);  <span class="cmt">// returns double 0.75</span>

<span class="cmt">// built-in min/max constants</span>
System.out.<span class="fn">println</span>(<span class="cls">Integer</span>.MAX_VALUE);  <span class="cmt">// 2147483647 (biggest int possible)</span>
System.out.<span class="fn">println</span>(<span class="cls">Integer</span>.MIN_VALUE);  <span class="cmt">// -2147483648 (smallest int possible)</span>

<span class="cmt">// convert number to String</span>
<span class="type">String</span> s = <span class="cls">Integer</span>.<span class="fn">toString</span>(<span class="num">42</span>);  <span class="cmt">// "42"</span></pre>
</div>

<h3 class="sub">the NullPointerException trap</h3>

<p>here's a real gotcha with wrapper classes. because they're objects (not primitives), they can be <code>null</code>. if you try to unbox a null wrapper into a primitive, Java throws a NullPointerException at runtime. this is one of the most common bugs in Java code.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — danger zone</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cls">Integer</span> val = <span class="kw">null</span>; <span class="cmt">// Integer can be null — it's an object</span>

<span class="cmt">// this line will throw NullPointerException at runtime!</span>
<span class="type">int</span> x = val; <span class="cmt">// Java tries to unbox null → CRASH</span>

<span class="cmt">// safe pattern: check for null before unboxing</span>
<span class="kw">if</span> (val != <span class="kw">null</span>) {
    <span class="type">int</span> x2 = val; <span class="cmt">// safe now</span>
}</pre>
</div>

<div class="callout warning"><p><strong>in practice:</strong> this mostly bites you when getting values out of a Map or when a method can return null. if you're just using an ArrayList&lt;Integer&gt; with values you added yourself, you're fine. but good to know fr.</p></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="fill">Fill in the Blanks</h2>
<div id="fill-w7">
  <div class="fill-container">
    <span class="cmt">// Declare a RobotState enum with TELEOP and AUTO</span><br>
    <span class="kw">public</span> <input class="fill-blank" data-answer="enum" placeholder="????"> <span class="cls">RobotState</span> { TELEOP, AUTO }
  </div>
  <div class="fill-container">
    <span class="cmt">// Create an ArrayList of Strings</span><br>
    <span class="cls">ArrayList</span>&lt;<input class="fill-blank" data-answer="String" placeholder="??????">&gt; names = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
  </div>
  <div class="fill-container">
    <span class="cmt">// Get the second element from list</span><br>
    <span class="type">String</span> s = list.<input class="fill-blank" data-answer="get(1)|get( 1 )" placeholder="??????">;
  </div>
  <div class="fill-container">
    <span class="cmt">// ArrayList that holds integers (use wrapper)</span><br>
    <span class="cls">ArrayList</span>&lt;<input class="fill-blank" data-answer="Integer" placeholder="???????">&gt; ids = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
  </div>
  <div class="fill-container">
    <span class="cmt">// Parse the String "42" into an int</span><br>
    <span class="type">int</span> x = <span class="cls">Integer</span>.<input class="fill-blank" data-answer="parseInt(&quot;42&quot;)|parseInt( &quot;42&quot; )" placeholder="?????????">;
  </div>
</div>
<div style="display:flex;align-items:center;gap:12px;margin-top:10px">
  <button class="btn btn-navy btn-sm" onclick="checkFills('fill-w7')">Check Answers</button>
  <span id="fill-w7-result" style="font-size:13px;font-weight:700;display:none"></span>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="quiz">Knowledge Check</h2>
<div id="quiz-w7"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="challenge">Coding Challenge</h2>
<p>practice the ArrayList operations before the project task. try to predict the output before running.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — what does this print?</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> java.util.<span class="cls">ArrayList</span>;

<span class="cls">ArrayList</span>&lt;<span class="type">String</span>&gt; list = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
list.<span class="fn">add</span>(<span class="str">"alpha"</span>);
list.<span class="fn">add</span>(<span class="str">"beta"</span>);
list.<span class="fn">add</span>(<span class="str">"gamma"</span>);
list.<span class="fn">remove</span>(<span class="str">"beta"</span>);
list.<span class="fn">add</span>(<span class="str">"delta"</span>);

System.out.<span class="fn">println</span>(list.<span class="fn">size</span>());
System.out.<span class="fn">println</span>(list.<span class="fn">get</span>(<span class="num">1</span>));
System.out.<span class="fn">println</span>(list.<span class="fn">contains</span>(<span class="str">"beta"</span>));

<span class="kw">for</span> (<span class="type">String</span> s : list) {
    System.out.<span class="fn">println</span>(s);
}</pre>
</div>

<div class="callout tip"><p>answers: <code>size()</code> → 3, <code>get(1)</code> → "gamma" (after removing "beta", gamma shifts to index 1), <code>contains("beta")</code> → false. the foreach prints: alpha, gamma, delta.</p></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<div class="project-task">
  <div class="pt-header">
    <div class="pt-icon"><i data-lucide="wrench"></i></div>
    <div class="pt-header-title">Project Task — Week 7</div>
    <div class="pt-filename">RobotState.java</div>
  </div>
  <div class="pt-body">
    <p>Create <code>RobotState.java</code> — the glue that brings your MiniBot's subsystems together. This class tracks what the robot is currently doing and what it should do next.</p>
    <ul>
      <li>Define an inner enum: <code>public enum State { IDLE, INTAKING, DRIVING, SHOOTING, STOPPED }</code></li>
      <li>Private fields: <code>State m_currentState</code>, <code>ArrayList&lt;String&gt; m_stateHistory</code></li>
      <li>Constructor: initialize state to <code>State.IDLE</code>, initialize the ArrayList</li>
      <li><code>public void setState(State newState)</code> — updates current state AND adds the state name to history</li>
      <li><code>public State getState()</code> — returns current state</li>
      <li><code>public boolean isActive()</code> — returns true if state is NOT IDLE and NOT STOPPED</li>
      <li><code>public ArrayList&lt;String&gt; getHistory()</code> — returns the history list</li>
      <li><code>public String getLastAction()</code> — returns the last entry in history, or "none" if empty</li>
      <li>In <code>main</code>: create a RobotState, transition through several states, print the history</li>
    </ul>
    <span class="pt-note">this class will be used in your final Robot.java in week 8!</span>
  </div>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="weekly-test">Weekly Test</h2>
<p>covers everything from week 7. almost done with the summer section!! score goes to leads :)</p>
<div class="weekly-test-block">
  <div class="wt-header">
    <div class="wt-icon"><i data-lucide="clipboard-list"></i></div>
    <div>
      <div class="wt-title">week 7 test</div>
      <div class="wt-sub">enums, ArrayList, wrapper classes · 8 questions!!</div>
    </div>
  </div>
  <div id="test-summer-w7"></div>
</div>

<script>
const quiz_w7 = new Quiz('quiz-w7', [
  { question: "Why use an enum instead of strings or integers for robot states?", options: ["Enums are faster at runtime","Enums prevent invalid values — the compiler only allows the defined options","Enums use less memory than Strings","Java requires enums for switch statements"], correct: 1, explanation: "if you use strings like \"teleop\", nothing stops someone from passing \"Teleop\" or \"TEELOP\". enums are checked at compile time — only the exact defined values are allowed. bugs caught at compile time > bugs found at competition." },
  { question: "What is the main advantage of ArrayList over a regular array?", options: ["Faster element access","Can hold primitives like int directly","Resizable — can add and remove elements after creation","Uses less memory than arrays"], correct: 2, explanation: "arrays are fixed size forever. ArrayLists grow and shrink dynamically. use ArrayList when you don't know the final size upfront or when the count changes at runtime." },
  { question: "Why do ArrayLists need wrapper classes for primitives?", options: ["Java generics only work with reference types (objects), not primitives","It's just a language quirk with no real reason","Wrappers make the code run faster","The compiler requires it for all collections"], correct: 0, explanation: "Java generics like ArrayList&lt;T&gt; only accept reference types. primitives (int, double, boolean) aren't objects — they're value types. wrapper classes (Integer, Double, Boolean) are the object versions that generics can hold." },
  { question: "Given <code>enum Direction { NORTH, SOUTH, EAST, WEST }</code>, which line is valid?", options: ["Direction d = NORTH;","Direction d = Direction.NORTH;","Direction d = \"NORTH\";","Direction d = 0;"], correct: 1, explanation: "enum values must be accessed through the enum type name: Direction.NORTH. you can't use a plain string or int — that's exactly the whole point of using enums instead of strings/ints." },
  { question: "Which ArrayList method checks whether a specific value is in the list?", options: ["list.has(value)","list.includes(value)","list.contains(value)","list.find(value)"], correct: 2, explanation: "<code>contains(value)</code> returns true if the value is in the list, false otherwise. no equivalent built into regular arrays — you'd have to loop through manually. this is one of the reasons ArrayList is convenient." },
  { question: "What is autoboxing?", options: ["Manually converting int to Integer before calling add()","Java automatically converting a primitive to its wrapper class when needed","A feature that makes ArrayList faster","A way to store primitives directly in ArrayList without wrappers"], correct: 1, explanation: "autoboxing is Java's automatic conversion from a primitive (like int) to its wrapper class (like Integer). when you call list.add(5) on an ArrayList&lt;Integer&gt;, Java autoboxes the int 5 into an Integer object for you. unboxing is the reverse." },
  { question: "What does <code>Integer.parseInt(\"42\")</code> return?", options: ["The String \"42\"","The Integer object 42","The int value 42","null"], correct: 2, explanation: "<code>parseInt</code> is a static method on the Integer wrapper class that converts a String to a primitive int. it returns the int 42, not an Integer object and not a String. super useful for reading config values or user input." },
  { question: "What is printed by this code?<br><code>ArrayList&lt;String&gt; list = new ArrayList&lt;&gt;();<br>list.add(\"A\"); list.add(\"B\"); list.add(\"C\");<br>list.remove(\"B\");<br>System.out.println(list.get(1));</code>", options: ["B","A","C","IndexOutOfBoundsException"], correct: 2, explanation: "after adding A, B, C — indices are 0=A, 1=B, 2=C. after removing \"B\", the list shifts: 0=A, 1=C. so get(1) returns \"C\". ArrayList automatically closes the gap when you remove an element — no null slots left behind." }
], 'summer-w7');

// ── WEEK 7 TEST ────────────────────────────────────────────────
const test_w7 = new Quiz('test-summer-w7', [
  { question: "You're tracking robot state. Why is <code>enum RobotMode { DISABLED, TELEOP, AUTO }</code> better than using a String field?", options: ["Enums are stored more efficiently in memory","The compiler rejects any value not in the enum — no typos, no invalid states","Enums work with switch statements but Strings don't","Strings can't store values like TELEOP"], correct: 1, explanation: "the whole point of enums is compile-time safety. with a String, nothing stops the code from accidentally assigning \"Tele0p\" or \"auto\" (lowercase) — Java won't catch it. enums make invalid states literally impossible to compile." },
  { question: "How do you correctly access an enum value?", options: ["Just write the value name: TELEOP","Access it through the enum type: RobotMode.TELEOP","Use a string and cast it: (RobotMode) \"TELEOP\"","Use the index: RobotMode[1]"], correct: 1, explanation: "enum values are accessed as EnumName.VALUE — like RobotMode.TELEOP. you can't use just TELEOP on its own (outside a switch case), and you definitely can't cast from a String." },
  { question: "Your robot subsystem needs to track a variable number of detected game pieces from vision. Which should you use?", options: ["int[] detected = new int[10];","ArrayList&lt;String&gt; detected = new ArrayList&lt;&gt;();","String detected = \"\";","boolean hasDetected = false;"], correct: 1, explanation: "when the count is variable and unknown at compile time, ArrayList is the right call. a fixed array would waste memory or overflow. ArrayList grows and shrinks automatically to fit however many pieces the camera sees." },
  { question: "What does <code>list.contains(\"Intake\")</code> return if \"Intake\" was previously removed from the list?", options: ["true","false","null","It throws an exception"], correct: 1, explanation: "<code>contains()</code> checks if the value is currently in the list. if you called remove(\"Intake\") before this, it's gone, and contains returns false. no exceptions — just a boolean answer." },
  { question: "Why can't you write <code>ArrayList&lt;int&gt; ids = new ArrayList&lt;&gt;();</code>?", options: ["ArrayList only works with Strings","Java generics require reference types (objects), and int is a primitive","int is too small for ArrayList to hold","You need to import int first"], correct: 1, explanation: "Java generics only work with reference types. int is a primitive value type, not an object. you have to use the wrapper class: ArrayList&lt;Integer&gt;. Java then handles the int ↔ Integer conversion for you automatically via autoboxing." },
  { question: "What is unboxing?", options: ["Removing an element from an ArrayList","Java automatically converting a wrapper class (like Integer) back to a primitive (like int)","Declaring an ArrayList with no type parameter","Clearing all values from an ArrayList"], correct: 1, explanation: "unboxing is the reverse of autoboxing — Java automatically converting a wrapper object (Integer, Double, etc.) back into the primitive type when needed. like when you do: int x = myArrayList.get(0); Java unboxes the Integer into an int." },
  { question: "What does <code>Integer.parseInt(\"100\")</code> return?", options: ["The String \"100\"","The Integer object wrapping 100","The primitive int 100","A compile error"], correct: 2, explanation: "parseInt is a static method that converts a String to a primitive int. it returns the primitive int 100, not a String and not an Integer wrapper object. same idea for Double.parseDouble() with doubles." },
  { question: "What is the output of this code?<br><code>enum Color { RED, GREEN, BLUE }<br>Color c = Color.GREEN;<br>if (c == Color.RED) {<br>&nbsp;&nbsp;System.out.println(\"red\");<br>} else if (c == Color.GREEN) {<br>&nbsp;&nbsp;System.out.println(\"green\");<br>} else {<br>&nbsp;&nbsp;System.out.println(\"blue\");<br>}</code>", options: ["red","green","blue","Nothing is printed"], correct: 1, explanation: "c is Color.GREEN. the first if checks c == Color.RED — false. the else if checks c == Color.GREEN — true. so it prints \"green\". enum values are compared with == (not .equals()), and it works perfectly because each enum value is a singleton object." }
], 'summer-w7-test');
</script>
