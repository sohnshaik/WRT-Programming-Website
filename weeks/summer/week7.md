---
layout: week
title: "Advanced Classes"
subtitle: "enums, nested classes, ArrayLists, and wrapper classes. patterns you'll see constantly in real robot code :)"
badge: "Summer · Week 7 of 8"
phase: summer
phase_label: Summer
week_label: Week 7
page_id: summer-w7
topics:
  - Enums
  - ArrayList
  - Wrapper Classes
prev_url: /weeks/summer/week6
prev_title: "Week 6 — Inheritance & Polymorphism"
next_url: /weeks/summer/week8
next_title: "Week 8 — Bridge: XRP & WPILib"
---

<h2 class="sh">Enums</h2>
<p>An enum is a fixed set of named constants. Instead of using magic numbers or strings for states, enums make your code readable and safe — the compiler won't let you pass an invalid value.</p>

<div class="callout danger"><p><strong>We use enums constantly on 2974.</strong> Robot states, game piece types, scoring positions, arm positions — all enums. If you forget this week, you won't be able to read our codebase.</p></div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// Define the enum</span>
<span class="kw">public enum</span> <span class="cls">RobotState</span> {
    DISABLED, TELEOP, AUTO, TEST
}

<span class="cmt">// Use it</span>
<span class="cls">RobotState</span> state = <span class="cls">RobotState</span>.TELEOP;

<span class="kw">switch</span> (state) {
    <span class="kw">case</span> TELEOP:
        <span class="fn">runTeleopCode</span>();
        <span class="kw">break</span>;
    <span class="kw">case</span> AUTO:
        <span class="fn">runAutoCode</span>();
        <span class="kw">break</span>;
    <span class="kw">default</span>:
        <span class="fn">stop</span>();
}</pre>
</div>

<h2 class="sh">ArrayList</h2>
<p>A resizable array. Unlike regular arrays, ArrayLists can grow and shrink. The tradeoff: they only hold objects, not primitives (you need wrapper classes for that).</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> java.util.<span class="cls">ArrayList</span>;

<span class="cls">ArrayList</span>&lt;<span class="type">String</span>&gt; activeSubsystems = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();

activeSubsystems.<span class="fn">add</span>(<span class="str">"Drivetrain"</span>);
activeSubsystems.<span class="fn">add</span>(<span class="str">"Shooter"</span>);
activeSubsystems.<span class="fn">add</span>(<span class="str">"Intake"</span>);

System.out.<span class="fn">println</span>(activeSubsystems.<span class="fn">get</span>(<span class="num">0</span>));      <span class="cmt">// "Drivetrain"</span>
System.out.<span class="fn">println</span>(activeSubsystems.<span class="fn">size</span>());      <span class="cmt">// 3</span>
activeSubsystems.<span class="fn">remove</span>(<span class="str">"Intake"</span>);
System.out.<span class="fn">println</span>(activeSubsystems.<span class="fn">contains</span>(<span class="str">"Intake"</span>)); <span class="cmt">// false</span></pre>
</div>

<table>
<thead><tr><th>Feature</th><th>Array</th><th>ArrayList</th></tr></thead>
<tbody>
<tr><td>size</td><td>Fixed forever</td><td>Grows/shrinks dynamically</td></tr>
<tr><td>types</td><td>Primitives + objects</td><td>Objects only (use wrappers)</td></tr>
<tr><td>syntax</td><td><code>arr[i]</code></td><td><code>list.get(i)</code></td></tr>
<tr><td>use when</td><td>Known fixed size</td><td>Dynamic, unknown size</td></tr>
</tbody>
</table>

<h2 class="sh">Wrapper Classes</h2>
<p>ArrayLists can't hold primitives directly. Wrapper classes are the object versions of primitives.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// Wrappers for primitives</span>
<span class="cls">ArrayList</span>&lt;<span class="cls">Integer</span>&gt; ids    = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(); <span class="cmt">// not int</span>
<span class="cls">ArrayList</span>&lt;<span class="cls">Double</span>&gt;  speeds = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;(); <span class="cmt">// not double</span>

<span class="cmt">// Java autoboxes automatically — int ↔ Integer</span>
ids.<span class="fn">add</span>(<span class="num">5</span>);          <span class="cmt">// int 5 auto-boxed to Integer</span>
<span class="type">int</span> id = ids.<span class="fn">get</span>(<span class="num">0</span>); <span class="cmt">// Integer auto-unboxed to int</span></pre>
</div>

<h2 class="sh">Fill in the Blanks</h2>
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
</div>
<div style="display:flex;align-items:center;gap:12px;margin-top:10px">
  <button class="btn btn-navy btn-sm" onclick="checkFills('fill-w7')">Check Answers</button>
  <span id="fill-w7-result" style="font-size:13px;font-weight:700;display:none"></span>
</div>

<h2 class="sh">Knowledge Check</h2>
<div id="quiz-w7"></div>

<script>
const quiz_w7 = new Quiz('quiz-w7', [
  { question: "Why use an enum instead of strings or integers for robot states?", options: ["Enums are faster","Enums prevent invalid values — the compiler only allows the defined options","Enums use less memory","Java requires enums for switch statements"], correct: 1, explanation: "If you use strings like \"teleop\", nothing stops someone from passing \"Teleop\" or \"TEELOP\". Enums are checked at compile time — only valid values can be used." },
  { question: "What is the main advantage of ArrayList over a regular array?", options: ["Faster access","Can hold primitives directly","Resizable — can add/remove elements after creation","Uses less memory"], correct: 2, explanation: "Arrays are fixed size. ArrayLists grow and shrink dynamically. Use ArrayLists when you don't know the final size upfront." },
  { question: "Why do ArrayLists need wrapper classes for primitives?", options: ["Java generics work with objects only, not primitives","It's a language quirk with no practical reason","Wrappers add useful methods","Performance reasons"], correct: 0, explanation: "Java generics (<code>ArrayList<T></code>) only work with reference types (objects). Primitives like int/double aren't objects, so you use their wrapper counterparts: Integer, Double, Boolean." },
  { question: "Given <code>enum Direction { NORTH, SOUTH, EAST, WEST }</code>, which is valid?", options: ["Direction d = NORTH;","Direction d = Direction.NORTH;","Direction d = \"NORTH\";","Direction d = 0;"], correct: 1, explanation: "Enum values must be accessed through the enum type: Direction.NORTH. You can't use a string or int — that's the whole point of enums." },
  { question: "You call <code>list.remove(\"Shooter\")</code>. What happens?", options: ["Removes element at index equal to the value","Removes the first occurrence of \"Shooter\" from the list","Throws an error","Marks it as null but keeps the slot"], correct: 1, explanation: "<code>remove(Object)</code> removes the first matching element. The list shifts remaining elements down and its size decreases. Unlike arrays, no empty slots." }
], 'summer-w7');
</script>
