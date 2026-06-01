---
layout: week
title: "OOP - Classes & Objects"
subtitle: "the most important week in this course fr. everything in FRC robot code is a class. don't skip this!!"
badge: "Summer · Week 5 of 8"
phase: summer
phase_label: Summer
week_label: Week 5
page_id: summer-w5
prev_url: /weeks/summer/week4
prev_title: "Week 4 — Arrays & Methods"
next_url: /weeks/summer/week6
next_title: "Week 6 — Inheritance & Polymorphism"
---

<div class="callout info"><p><strong>Why this matters:</strong> Every subsystem on 2974's robot is a class. <code>Drivetrain.java</code>, <code>Shooter.java</code>, <code>Coral.java</code>, <code>Finger.java</code> — all classes. Understanding this week means you can read and write real robot code.</p></div>

<h2 class="sh">Classes vs Objects</h2>
<p>A <strong>class</strong> is a blueprint. An <strong>object</strong> is one specific thing built from that blueprint. You write the class once, then create as many objects as you need — each with their own independent data.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — class definition</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">Motor</span> {
    <span class="cmt">// Instance variables — each Motor object gets its own copy</span>
    <span class="kw">private</span> <span class="type">int</span>     id;
    <span class="kw">private</span> <span class="type">double</span>  speed;
    <span class="kw">private</span> <span class="type">boolean</span> isInverted;

    <span class="cmt">// Constructor — runs when you do "new Motor(...)"</span>
    <span class="kw">public</span> <span class="fn">Motor</span>(<span class="type">int</span> id, <span class="type">boolean</span> isInverted) {
        <span class="kw">this</span>.id         = id;
        <span class="kw">this</span>.isInverted = isInverted;
        <span class="kw">this</span>.speed      = <span class="num">0.0</span>;
    }

    <span class="kw">public void</span> <span class="fn">setSpeed</span>(<span class="type">double</span> speed) {
        <span class="kw">this</span>.speed = isInverted ? -speed : speed;
    }

    <span class="kw">public double</span> <span class="fn">getSpeed</span>() { <span class="kw">return</span> speed; }
}</pre>
</div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — creating and using objects</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cls">Motor</span> leftMotor  = <span class="kw">new</span> <span class="fn">Motor</span>(<span class="num">1</span>, <span class="kw">false</span>);
<span class="cls">Motor</span> rightMotor = <span class="kw">new</span> <span class="fn">Motor</span>(<span class="num">2</span>, <span class="kw">true</span>); <span class="cmt">// inverted</span>

leftMotor.<span class="fn">setSpeed</span>(<span class="num">0.5</span>);
rightMotor.<span class="fn">setSpeed</span>(<span class="num">0.5</span>);

System.out.<span class="fn">println</span>(leftMotor.<span class="fn">getSpeed</span>());  <span class="cmt">// 0.5</span>
System.out.<span class="fn">println</span>(rightMotor.<span class="fn">getSpeed</span>()); <span class="cmt">// -0.5 — inverted!</span></pre>
</div>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Instance Variables</div><div class="cc-title">Data each object stores</div><div class="cc-desc">Each object gets its own copy. <code>leftMotor.id</code> and <code>rightMotor.id</code> are completely separate.</div></div>
  <div class="concept-card"><div class="cc-label">Constructor</div><div class="cc-title">Runs on <code>new</code></div><div class="cc-desc">Same name as class. No return type. Sets the initial state of the object.</div></div>
  <div class="concept-card"><div class="cc-label">this</div><div class="cc-title">Refers to current object</div><div class="cc-desc">When a parameter and instance variable share a name, <code>this.speed</code> means the instance variable.</div></div>
  <div class="concept-card"><div class="cc-label">Encapsulation</div><div class="cc-title">Private + getters/setters</div><div class="cc-desc">Keep data private, expose it through methods that can validate input. Prevents accidental corruption.</div></div>
</div>

<h2 class="sh">Access Modifiers</h2>
<table>
<thead><tr><th>Modifier</th><th>Who can access it</th><th>When to use</th></tr></thead>
<tbody>
<tr><td>public</td><td>Anyone, anywhere</td><td>Methods you want others to call</td></tr>
<tr><td>private</td><td>Only inside this class</td><td>Instance variables (almost always)</td></tr>
<tr><td>protected</td><td>This class + subclasses</td><td>When you plan for inheritance</td></tr>
</tbody>
</table>

<h2 class="sh">Live Class Builder</h2>
<div class="interactive-box">
  <div class="ib-header">Type field declarations and watch the class generate</div>
  <div class="ib-body">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
      <div>
        <label style="font-size:12px;font-weight:700;color:#6b7280;display:block;margin-bottom:5px">Class name</label>
        <input id="cn" value="Subsystem" oninput="buildCls()" style="width:100%;padding:7px;border:1px solid #e5e7eb;border-radius:4px;font-size:14px;font-family:monospace">
      </div>
      <div>
        <label style="font-size:12px;font-weight:700;color:#6b7280;display:block;margin-bottom:5px">Fields (comma sep, e.g. <code>int id, double speed</code>)</label>
        <input id="cf" value="int id, double speed, boolean isEnabled" oninput="buildCls()" style="width:100%;padding:7px;border:1px solid #e5e7eb;border-radius:4px;font-size:13px;font-family:monospace">
      </div>
    </div>
    <div id="cls-out" style="background:#1e2638;border-radius:6px;padding:1rem;font-family:monospace;font-size:13px;line-height:1.7;color:#e2e8f0;white-space:pre;overflow-x:auto"></div>
  </div>
</div>

<h2 class="sh">Fill in the Blanks</h2>
<div id="fill-w5">
  <div class="fill-container">
    <span class="cmt">// Declare a private double field</span><br>
    <input class="fill-blank" data-answer="private" placeholder="???????"> <span class="type">double</span> motorSpeed;
  </div>
  <div class="fill-container">
    <span class="cmt">// Constructor for class Intake taking int motorID</span><br>
    <span class="kw">public</span> <input class="fill-blank" data-answer="Intake" placeholder="??????"> (<span class="type">int</span> motorID) { }
  </div>
  <div class="fill-container">
    <span class="cmt">// Create a new Motor with id=3, inverted=false</span><br>
    <span class="cls">Motor</span> m = <input class="fill-blank" data-answer="new Motor(3, false)|new Motor(3,false)" placeholder="??????????????????">
  </div>
</div>
<div style="display:flex;align-items:center;gap:12px;margin-top:10px">
  <button class="btn btn-navy btn-sm" onclick="checkFills('fill-w5')">Check Answers</button>
  <span id="fill-w5-result" style="font-size:13px;font-weight:700;display:none"></span>
</div>

<h2 class="sh">Knowledge Check</h2>
<div id="quiz-w5"></div>

<h2 class="sh">Coding Challenge</h2>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Build an Intake Class</div><div class="ch-sub">Write a real FRC subsystem class from scratch</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Write an <code>Intake</code> class with private fields <code>int motorID</code>, <code>double speed</code>, <code>boolean isRunning</code>. Constructor takes motorID, sets speed=0 and isRunning=false. Methods: <code>start(double speed)</code>, <code>stop()</code>, <code>isRunning()</code>, <code>getSpeed()</code>. Then create two objects and test them.</p>
    <textarea class="code-input" placeholder="public class Intake { ... }"></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w5')">Show Solution</button></div>
    <div id="sol-w5" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">Intake</span> {
    <span class="kw">private</span> <span class="type">int</span>     motorID;
    <span class="kw">private</span> <span class="type">double</span>  speed;
    <span class="kw">private</span> <span class="type">boolean</span> isRunning;

    <span class="kw">public</span> <span class="fn">Intake</span>(<span class="type">int</span> motorID) {
        <span class="kw">this</span>.motorID   = motorID;
        <span class="kw">this</span>.speed     = <span class="num">0.0</span>;
        <span class="kw">this</span>.isRunning = <span class="kw">false</span>;
    }
    <span class="kw">public void</span> <span class="fn">start</span>(<span class="type">double</span> speed) { <span class="kw">this</span>.speed = speed; isRunning = <span class="kw">true</span>; }
    <span class="kw">public void</span> <span class="fn">stop</span>() { speed = <span class="num">0.0</span>; isRunning = <span class="kw">false</span>; }
    <span class="kw">public boolean</span> <span class="fn">isRunning</span>() { <span class="kw">return</span> isRunning; }
    <span class="kw">public double</span>  <span class="fn">getSpeed</span>()   { <span class="kw">return</span> speed; }
}

<span class="cls">Intake</span> front = <span class="kw">new</span> <span class="fn">Intake</span>(<span class="num">5</span>);
<span class="cls">Intake</span> back  = <span class="kw">new</span> <span class="fn">Intake</span>(<span class="num">6</span>);
front.<span class="fn">start</span>(<span class="num">0.8</span>);
System.out.<span class="fn">println</span>(front.<span class="fn">isRunning</span>()); <span class="cmt">// true</span>
System.out.<span class="fn">println</span>(back.<span class="fn">isRunning</span>());  <span class="cmt">// false — separate object!</span></pre>
      </div>
    </div>
  </div>
</div>

<script>
function buildCls() {
  const name = document.getElementById('cn').value || 'MyClass';
  const raw = document.getElementById('cf').value;
  const fields = raw.split(',').map(f=>f.trim()).filter(Boolean);
  const fLines = fields.map(f=>`    private ${f};`).join('\n');
  const cParams = fields.join(', ');
  const cAssigns = fields.map(f=>{ const v=f.trim().split(' ').pop(); return `        this.${v} = ${v};`; }).join('\n');
  const getters = fields.map(f=>{ const p=f.trim().split(' '); const t=p[0],v=p[1]; const cap=v[0].toUpperCase()+v.slice(1); return `    public ${t} get${cap}() { return ${v}; }`; }).join('\n');
  document.getElementById('cls-out').textContent =
    `public class ${name} {\n\n${fLines}\n\n    public ${name}(${cParams}) {\n${cAssigns}\n    }\n\n${getters}\n}`;
}
const quiz_w5 = new Quiz('quiz-w5', [
  { question: "What is the difference between a class and an object?", options: ["Same thing, different names","Class is the blueprint; object is one instance built from it","Class holds data; object holds methods","Object is defined with the class keyword"], correct: 1, explanation: "Motor is a class (blueprint). leftMotor = new Motor(1,false) creates an object. You can create many independent objects from one class." },
  { question: "What makes a constructor different from a regular method?", options: ["Constructors are always private","Constructors use void return type","Same name as class, no return type, runs automatically on new","Constructors can't take parameters"], correct: 2, explanation: "Constructor = same name as class, no return type (not even void), called automatically when you use new." },
  { question: "Why should instance variables almost always be private?", options: ["Runs faster","Encapsulation — control and validate how data is changed","Java requires it","Uses less memory"], correct: 1, explanation: "With private fields + setters, you validate input before accepting it. Prevents someone from setting motorSpeed to 9999 or -Infinity by accident." },
  { question: "Two Motor objects m1 and m2. You call m1.setSpeed(0.8). Does m2.speed change?", options: ["Yes — they share instance variables","No — each object has its own independent copy of instance variables","Only if they have the same ID","Only if speed is static"], correct: 1, explanation: "Each object is independent. m1 and m2 each have their own speed, id, and isInverted. Changing one doesn't affect the other." },
  { question: "What does <code>this</code> refer to inside a method?", options: ["The class itself","The current object (the instance the method was called on)","The parent class","The previous method called"], correct: 1, explanation: "this refers to the current object — the specific instance the method is running on. Used to distinguish instance variables from parameters with the same name." }
], 'summer-w5');
document.addEventListener('DOMContentLoaded', buildCls);
</script>
