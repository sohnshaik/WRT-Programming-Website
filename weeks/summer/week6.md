---
layout: week
title: "Inheritance & Polymorphism"
subtitle: "building class hierarchies, reusing code, and the OOP stuff that makes WPILib make sense :D"
badge: "Summer · Week 6 of 8"
phase: summer
phase_label: Summer
week_label: Week 6
page_id: summer-w6
topics:
  - Inheritance
  - Abstract Classes
  - Interfaces
prev_url: /weeks/summer/week5
prev_title: "Week 5 — OOP: Classes & Objects"
next_url: /weeks/summer/week7
next_title: "Week 7 — Advanced Classes"
---

<div class="callout info"><p><strong>Why this matters:</strong> When you extend <code>SubsystemBase</code> or <code>Command</code> in WPILib, you're using inheritance. These are abstract classes. Understanding this week means understanding how the entire command-based framework works under the hood.</p></div>

<h2 class="sh">Inheritance</h2>
<p>A child class can <strong>extend</strong> a parent class and inherit all its methods and fields. The child can add new methods and override existing ones.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">Animal</span> {
    <span class="kw">public void</span> <span class="fn">speak</span>() { System.out.<span class="fn">println</span>(<span class="str">"..."</span>); }
}

<span class="kw">public class</span> <span class="cls">Dog</span> <span class="kw">extends</span> <span class="cls">Animal</span> {
    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">speak</span>() { System.out.<span class="fn">println</span>(<span class="str">"Woof!"</span>); }
}

<span class="cmt">// FRC equivalent:</span>
<span class="kw">public class</span> <span class="cls">DriveSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> {
    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">periodic</span>() { <span class="cmt">/* runs every 20ms */</span> }
}</pre>
</div>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">extends</div><div class="cc-title">Inherit from a class</div><div class="cc-desc">Child gets all public/protected methods and fields. Can only extend one class.</div></div>
  <div class="concept-card"><div class="cc-label">super()</div><div class="cc-title">Call parent constructor</div><div class="cc-desc">Must be the first line in child constructor. Initializes the parent's fields before child adds its own.</div></div>
  <div class="concept-card"><div class="cc-label">@Override</div><div class="cc-title">Replace a parent method</div><div class="cc-desc">Write a new version of the method in the child class. Parent version is replaced for that object.</div></div>
  <div class="concept-card"><div class="cc-label">abstract</div><div class="cc-title">Must be implemented</div><div class="cc-desc">Abstract methods have no body — child classes must provide the implementation. Can't instantiate abstract classes.</div></div>
</div>

<h2 class="sh">Abstract Classes</h2>
<p><code>SubsystemBase</code> and <code>Command</code> in WPILib are abstract. They define the structure every subsystem/command must follow, but leave the specifics to you.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — simplified WPILib pattern</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public abstract class</span> <span class="cls">Command</span> {
    <span class="kw">public void</span>    <span class="fn">initialize</span>() {}   <span class="cmt">// optional to override</span>
    <span class="kw">public void</span>    <span class="fn">execute</span>()    {}
    <span class="kw">public void</span>    <span class="fn">end</span>(<span class="type">boolean</span> interrupted) {}
    <span class="kw">public boolean</span> <span class="fn">isFinished</span>() { <span class="kw">return false</span>; }
}

<span class="cmt">// Your command extends it and overrides what it needs</span>
<span class="kw">public class</span> <span class="cls">DriveCommand</span> <span class="kw">extends</span> <span class="cls">Command</span> {
    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">execute</span>() { <span class="fn">drive</span>(joystick.<span class="fn">getY</span>()); }
}</pre>
</div>

<h2 class="sh">Interfaces</h2>
<p>An interface is a contract — a list of methods a class promises to implement. Unlike inheritance, a class can implement multiple interfaces.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public interface</span> <span class="cls">Loggable</span> {
    <span class="type">String</span> <span class="fn">getLogData</span>(); <span class="cmt">// no body — must implement</span>
}

<span class="kw">public class</span> <span class="cls">Drivetrain</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> <span class="kw">implements</span> <span class="cls">Loggable</span> {
    <span class="kw">@Override</span>
    <span class="kw">public</span> <span class="type">String</span> <span class="fn">getLogData</span>() {
        <span class="kw">return</span> <span class="str">"Left: "</span> + leftSpeed + <span class="str">" Right: "</span> + rightSpeed;
    }
}</pre>
</div>

<h2 class="sh">Fill in the Blanks</h2>
<div id="fill-w6">
  <div class="fill-container">
    <span class="cmt">// DriveSubsystem inherits from SubsystemBase</span><br>
    <span class="kw">public class</span> <span class="cls">DriveSubsystem</span> <input class="fill-blank" data-answer="extends" placeholder="???????"> <span class="cls">SubsystemBase</span> { }
  </div>
  <div class="fill-container">
    <span class="cmt">// Override the speak method from Animal</span><br>
    <input class="fill-blank" data-answer="@Override" placeholder="?????????"><br>
    <span class="kw">public void</span> <span class="fn">speak</span>() { System.out.<span class="fn">println</span>(<span class="str">"Woof"</span>); }
  </div>
  <div class="fill-container">
    <span class="cmt">// Implement an interface</span><br>
    <span class="kw">public class</span> <span class="cls">Shooter</span> <input class="fill-blank" data-answer="implements" placeholder="??????????"> <span class="cls">Loggable</span> { }
  </div>
</div>
<div style="display:flex;align-items:center;gap:12px;margin-top:10px">
  <button class="btn btn-navy btn-sm" onclick="checkFills('fill-w6')">Check Answers</button>
  <span id="fill-w6-result" style="font-size:13px;font-weight:700;display:none"></span>
</div>

<h2 class="sh">Knowledge Check</h2>
<div id="quiz-w6"></div>

<script>
const quiz_w6 = new Quiz('quiz-w6', [
  { question: "When you write <code>class DriveSubsystem extends SubsystemBase</code>, what does that mean?", options: ["DriveSubsystem replaces SubsystemBase","DriveSubsystem inherits all methods and behavior from SubsystemBase","SubsystemBase is inside DriveSubsystem","They share instance variables"], correct: 1, explanation: "extends means inheritance. DriveSubsystem gets all of SubsystemBase's methods (like periodic()) and can add its own or override them." },
  { question: "What does @Override do?", options: ["Creates a new method","Marks that you're replacing a parent class method with a new version","Prevents the method from being overridden further","Makes the method run faster"], correct: 1, explanation: "@Override is an annotation telling Java 'this method intentionally replaces a parent method'. If the parent doesn't have a matching method, the compiler will error — catching typos." },
  { question: "Can a class implement multiple interfaces?", options: ["No — only one interface per class","Yes — use implements InterfaceA, InterfaceB","Yes — use multiple extends keywords","Only in Java 17+"], correct: 1, explanation: "A class can only extend ONE parent class (single inheritance), but it can implement as many interfaces as needed with a comma-separated list." },
  { question: "What is an abstract method?", options: ["A method that runs automatically","A method with no body that subclasses MUST implement","A private method","A static helper method"], correct: 1, explanation: "Abstract methods are declared without a body. Any non-abstract subclass must provide an implementation. This is how WPILib forces you to implement execute(), isFinished(), etc. in commands." },
  { question: "In a child constructor, what must <code>super()</code> be?", options: ["The last line","Anywhere in the constructor","The first line","Only needed if the parent has parameters"], correct: 2, explanation: "super() must be the very first line in a child constructor. Java needs to finish initializing the parent object before the child adds its own setup." }
], 'summer-w6');
</script>
