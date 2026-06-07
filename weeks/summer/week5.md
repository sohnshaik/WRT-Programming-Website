---
layout: week
title: "OOP - Classes & Objects"
subtitle: "the most important week in this course fr. everything in FRC robot code is a class. don't skip this!!"
badge: "Summer · Week 5 of 8"
phase: summer
phase_label: Summer
week_label: Week 5
page_id: summer-w5
weekly_test: true
topics:
  - Classes vs Objects
  - Constructors & Fields
  - Access Modifiers
  - Methods & Encapsulation
prev_url: /weeks/summer/week4
prev_title: "Week 4 — Arrays & Methods"
next_url: /weeks/summer/week6
next_title: "Week 6 — Inheritance & Polymorphism"
---

<div class="callout info"><p><strong>Why this matters:</strong> every subsystem on 2974's robot is a class. <code>Drivetrain.java</code>, <code>Shooter.java</code>, <code>Coral.java</code>, <code>Finger.java</code> — all classes. understanding this week means you can read and write real robot code. OOP is confusing at first ngl but once it clicks it clicks fr.</p></div>

<h2 class="sh" id="topic-1">Classes vs Objects</h2>
<p>here's the most important concept in this entire course: a <strong>class</strong> is a blueprint. an <strong>object</strong> is one specific thing you built from that blueprint. you write the class once. you can create as many objects from it as you want, each completely independent.</p>

<h3 class="sub">Analogy 1 — Cookie Cutter</h3>
<p>think of a class like a cookie cutter. the cutter defines the shape — it's just a template. each cookie you actually cut out is an object. you can make 100 cookies from one cutter and each cookie is separate. if you eat one cookie, the others are fine. if you frost one cookie, the others stay plain.</p>

<h3 class="sub">Analogy 2 — House Blueprint</h3>
<p>or think of a class like a blueprint for a house. the blueprint says: 2 bedrooms, 1 bathroom, a kitchen. the actual house you build from it is an object. you can build 10 identical houses from one blueprint — each house is separate. what happens inside one house doesn't affect the others.</p>

<h3 class="sub">FRC Connection</h3>
<p>on team 2974, <code>DriveSubsystem.java</code> is a class — a blueprint. when the robot starts, it builds ONE object from it: <code>new DriveSubsystem()</code>. that one object represents YOUR robot's drivetrain. same deal for <code>Shooter</code>, <code>Intake</code>, everything. every subsystem file you'll ever write is a class. this is why week 5 is so important.</p>

<h3 class="sub">Anatomy of a Class — Every Part Labeled</h3>
<p>let's look at a full class with every piece called out:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — class definition, every element annotated</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// "public class Motor" — this is the CLASS DECLARATION
// "public"  = anyone can use this class
// "class"   = this is a class (not an interface, not an enum)
// "Motor"   = the name of the class (always PascalCase)</span>
<span class="kw">public class</span> <span class="cls">Motor</span> {

    <span class="cmt">// FIELDS — the data each Motor object stores
    // every Motor gets its OWN copy of these
    // "private" = only code inside Motor can touch these directly</span>
    <span class="kw">private</span> <span class="type">int</span>     m_id;
    <span class="kw">private</span> <span class="type">double</span>  m_speed;
    <span class="kw">private</span> <span class="type">boolean</span> m_isInverted;

    <span class="cmt">// CONSTRUCTOR — runs automatically when you write "new Motor(...)"
    // same name as the class (Motor), no return type (not even void)
    // this is where you set the starting state of the object</span>
    <span class="kw">public</span> <span class="fn">Motor</span>(<span class="type">int</span> id, <span class="type">boolean</span> isInverted) {
        m_id         = id;
        m_isInverted = isInverted;
        m_speed      = <span class="num">0.0</span>; <span class="cmt">// starts at rest</span>
    }

    <span class="cmt">// METHODS — actions the Motor can do or info it can give you</span>
    <span class="kw">public void</span> <span class="fn">setSpeed</span>(<span class="type">double</span> speed) {
        m_speed = m_isInverted ? -speed : speed;
    }

    <span class="kw">public double</span> <span class="fn">getSpeed</span>() {
        <span class="kw">return</span> m_speed;
    }
}</pre>
</div>

<h3 class="sub">Creating Objects and Using Them</h3>
<p>once you have a class, you create objects with the <code>new</code> keyword. each object is completely independent — changing one does NOT change the other.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — creating two Motor objects</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// "new Motor(1, false)" — creates a brand new Motor object
// Java allocates memory for it, runs the constructor, gives you back a reference
// leftMotor and rightMotor are TWO SEPARATE objects</span>
<span class="cls">Motor</span> leftMotor  = <span class="kw">new</span> <span class="fn">Motor</span>(<span class="num">1</span>, <span class="kw">false</span>);
<span class="cls">Motor</span> rightMotor = <span class="kw">new</span> <span class="fn">Motor</span>(<span class="num">2</span>, <span class="kw">true</span>); <span class="cmt">// this one inverts speed</span>

<span class="cmt">// dot notation — call methods ON a specific object
// leftMotor.setSpeed(0.5) means "call setSpeed on leftMotor"</span>
leftMotor.<span class="fn">setSpeed</span>(<span class="num">0.5</span>);
rightMotor.<span class="fn">setSpeed</span>(<span class="num">0.5</span>);

System.out.<span class="fn">println</span>(leftMotor.<span class="fn">getSpeed</span>());  <span class="cmt">//  0.5 — not inverted</span>
System.out.<span class="fn">println</span>(rightMotor.<span class="fn">getSpeed</span>()); <span class="cmt">// -0.5 — inverted!!</span>

<span class="cmt">// changing leftMotor doesn't affect rightMotor at all
// they are independent objects — like two separate houses</span>
leftMotor.<span class="fn">setSpeed</span>(<span class="num">0.0</span>);
System.out.<span class="fn">println</span>(rightMotor.<span class="fn">getSpeed</span>()); <span class="cmt">// still -0.5, unchanged</span></pre>
</div>

<h3 class="sub">What Does <code>new</code> Actually Do?</h3>
<p>when you write <code>new Motor(1, false)</code>, three things happen in order:</p>
<ol>
  <li>Java allocates memory (a chunk of RAM) big enough to hold all of Motor's fields</li>
  <li>Java runs the constructor — your code inside <code>Motor(int id, boolean isInverted)</code> runs, setting the initial values</li>
  <li>Java gives you back a <strong>reference</strong> — an address in memory pointing to where that object lives</li>
</ol>

<div class="callout tip"><p><strong>reference types:</strong> a variable like <code>Motor m</code> doesn't HOLD a Motor inside it — it holds an ADDRESS to where in memory the Motor lives. that's why these are called "reference types." if you're wondering why this matters, it'll click hard once you see null pointer exceptions ngl.</p></div>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Class</div><div class="cc-title">The Blueprint</div><div class="cc-desc">Written once. Defines what data each object stores and what actions it can do. <code>Motor.java</code> is a class.</div></div>
  <div class="concept-card"><div class="cc-label">Object</div><div class="cc-title">The Instance</div><div class="cc-desc">Built from the class at runtime with <code>new</code>. Each object has its OWN independent copy of the fields.</div></div>
  <div class="concept-card"><div class="cc-label">new</div><div class="cc-title">Allocate + Construct</div><div class="cc-desc">Allocates memory, runs the constructor, returns a reference to the new object. You need it to create any object.</div></div>
  <div class="concept-card"><div class="cc-label">Dot Notation</div><div class="cc-title">objectName.method()</div><div class="cc-desc">How you call methods on a specific object. <code>leftMotor.setSpeed(0.5)</code> — calls setSpeed on leftMotor specifically.</div></div>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-2">Constructors &amp; Fields</h2>
<p>fields are the <strong>state</strong> of an object — the things it knows about itself. the constructor is the thing that sets up that state when the object is first created.</p>

<h3 class="sub">Fields (Instance Variables)</h3>
<p>every object gets its OWN copy of the fields. they're declared inside the class but outside any method. on WRT we name them with an <code>m_</code> prefix (m for "member").</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — fields with WRT naming</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">Motor</span> {

    <span class="cmt">// fields — declared here, each object gets its OWN copy
    // private = only this class can access them directly
    // m_ prefix = WRT naming convention for member/instance vars</span>
    <span class="kw">private</span> <span class="type">int</span>     m_motorID;
    <span class="kw">private</span> <span class="type">double</span>  m_speed;
    <span class="kw">private</span> <span class="type">boolean</span> m_isRunning;

    <span class="cmt">// ... constructor and methods go here</span>
}</pre>
</div>

<h3 class="sub">Constructors</h3>
<p>a constructor runs automatically when you write <code>new ClassName(...)</code>. think of it as the object's birth certificate — it sets everything up when the object first comes into existence. two rules you MUST know:</p>
<ul>
  <li>the constructor name must be <strong>exactly the same</strong> as the class name</li>
  <li>no return type — not <code>void</code>, not <code>int</code>, nothing. just the name and parentheses</li>
</ul>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — constructor examples</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">Motor</span> {

    <span class="kw">private</span> <span class="type">int</span>     m_motorID;
    <span class="kw">private</span> <span class="type">double</span>  m_speed;
    <span class="kw">private</span> <span class="type">boolean</span> m_isRunning;

    <span class="cmt">// VALID constructor — same name as class, no return type
    // takes an int parameter called motorID</span>
    <span class="kw">public</span> <span class="fn">Motor</span>(<span class="type">int</span> motorID) {
        m_motorID  = motorID;
        m_speed    = <span class="num">0.0</span>;
        m_isRunning = <span class="kw">false</span>;
    }

    <span class="cmt">// INVALID — has "void" before the name, so Java treats this
    // as a regular method named "Motor", not a constructor!!</span>
    <span class="cmt">// public void Motor(int motorID) { ... } // do NOT do this</span>
}</pre>
</div>

<h3 class="sub">The <code>this</code> Keyword — Really Important</h3>
<p>inside any method (or constructor), <code>this</code> refers to the specific object the method is running on. if you have <code>Motor leftMotor</code> and <code>Motor rightMotor</code> and you call <code>leftMotor.setSpeed(0.5)</code>, then inside <code>setSpeed</code>, <code>this</code> refers to <code>leftMotor</code>. if you call <code>rightMotor.setSpeed(0.5)</code>, <code>this</code> refers to <code>rightMotor</code>.</p>

<p>the main reason you'll use <code>this</code> in constructors is to solve a naming conflict. what happens when a parameter has the same name as a field?</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — the naming conflict problem</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">Motor</span> {

    <span class="kw">private</span> <span class="type">int</span> m_motorID;

    <span class="cmt">// what if the parameter has the same name as the field?
    // Java has to pick one -- it picks the LOCAL one (the parameter)
    // so "motorID = motorID" just assigns the parameter to itself,
    // and the field m_motorID stays 0 forever. silent bug!!</span>
    <span class="kw">public</span> <span class="fn">Motor</span>(<span class="type">int</span> motorID) {
        motorID = motorID; <span class="cmt">// WRONG — assigns param to itself!!</span>
    }
}</pre>
</div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — the fix: use this to specify the field</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">Motor</span> {

    <span class="kw">private</span> <span class="type">int</span>     m_motorID;
    <span class="kw">private</span> <span class="type">double</span>  m_speed;
    <span class="kw">private</span> <span class="type">boolean</span> m_isInverted;

    <span class="kw">public</span> <span class="fn">Motor</span>(<span class="type">int</span> motorID, <span class="type">boolean</span> isInverted) {
        <span class="cmt">// "this.m_motorID" = the field on THIS specific object
        // "motorID"        = the parameter passed into the constructor
        // using m_ prefix actually sidesteps this ambiguity most of the time,
        // but it's still good to know why "this" exists</span>
        <span class="kw">this</span>.m_motorID   = motorID;
        <span class="kw">this</span>.m_isInverted = isInverted;
        <span class="kw">this</span>.m_speed      = <span class="num">0.0</span>;
    }
}</pre>
</div>

<div class="callout info"><p><strong>WRT tip:</strong> using the <code>m_</code> prefix on fields mostly avoids this problem — your field is <code>m_motorID</code> and your parameter is <code>motorID</code>, so they never clash. but you'll see <code>this</code> used constantly in Java code out in the wild, so make sure you know what it means.</p></div>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Fields</div><div class="cc-title">State of an object</div><div class="cc-desc">Declared at class level. Each object gets its own copy. Use <code>m_</code> prefix on WRT. Usually private.</div></div>
  <div class="concept-card"><div class="cc-label">Constructor</div><div class="cc-title">Object's birth certificate</div><div class="cc-desc">Same name as class. No return type. Runs once when <code>new</code> is called. Sets up initial state.</div></div>
  <div class="concept-card"><div class="cc-label">this</div><div class="cc-title">Current object</div><div class="cc-desc"><code>this</code> inside a method refers to the specific object the method was called on. Used to resolve naming conflicts.</div></div>
  <div class="concept-card"><div class="cc-label">m_ prefix</div><div class="cc-title">WRT naming rule</div><div class="cc-desc">All instance variables on 2974 use <code>m_</code>: <code>m_speed</code>, <code>m_isRunning</code>, <code>m_motorID</code>. Keeps fields visually distinct from locals.</div></div>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-3">Access Modifiers</h2>
<p>access modifiers control who can see and use a field or method. they're how you protect your data from being messed with by other parts of the code.</p>

<h3 class="sub">The Filing Cabinet Analogy</h3>
<p>imagine each field is a filing cabinet in your class. <code>private</code> means only YOU (this class) can open that cabinet. <code>public</code> means anyone walking by can open it. <code>protected</code> means you and your family (subclasses — more on that in week 6) can open it.</p>

<table>
<thead><tr><th>Modifier</th><th>Who can access it</th><th>When to use</th></tr></thead>
<tbody>
<tr><td><code>public</code></td><td>Anyone, anywhere</td><td>Methods you want other classes to call</td></tr>
<tr><td><code>private</code></td><td>Only inside this class</td><td>Instance variables — almost always</td></tr>
<tr><td><code>protected</code></td><td>This class + subclasses</td><td>When you're designing for inheritance (week 6)</td></tr>
</tbody>
</table>

<h3 class="sub">Why Private Fields?</h3>
<p>what if someone set your motor's speed to 9999? if <code>m_speed</code> is public, any code anywhere can write <code>motor.m_speed = 9999.0</code> and there's nothing stopping it. if <code>m_speed</code> is private with a setter method, you can check before accepting the value:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — public field (dangerous) vs private + setter (safe)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// BAD — public field, anyone can set any value with no checking</span>
<span class="kw">public class</span> <span class="cls">DangerousMotor</span> {
    <span class="kw">public</span> <span class="type">double</span> speed; <span class="cmt">// anyone can do: motor.speed = 9999.0</span>
}

<span class="cmt">// GOOD — private field + setter with validation</span>
<span class="kw">public class</span> <span class="cls">SafeMotor</span> {
    <span class="kw">private</span> <span class="type">double</span> m_speed;

    <span class="kw">public void</span> <span class="fn">setSpeed</span>(<span class="type">double</span> speed) {
        <span class="cmt">// clamp to safe range before storing — can't set 9999 now</span>
        <span class="kw">if</span> (speed > <span class="num">1.0</span>)  speed = <span class="num">1.0</span>;
        <span class="kw">if</span> (speed < <span class="num">-1.0</span>) speed = <span class="num">-1.0</span>;
        m_speed = speed;
    }

    <span class="kw">public double</span> <span class="fn">getSpeed</span>() {
        <span class="kw">return</span> m_speed;
    }
}</pre>
</div>

<p>this pattern — private fields with public getter/setter methods — is called <strong>encapsulation</strong>. it's one of the core ideas of OOP and it's why real FRC code works reliably.</p>

<div class="callout warning"><p><strong>WRT rule:</strong> all instance variables are private. period. no exceptions. if another class needs the value, you write a getter. if another class needs to change it, you write a setter with validation.</p></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-4">Methods &amp; Encapsulation</h2>
<p>you learned methods in week 4. now they're inside a class, which makes them <strong>instance methods</strong> — methods that belong to a specific object and can access that object's fields directly.</p>

<h3 class="sub">Static vs Instance Methods</h3>
<p>in week 4, some methods were <code>static</code> — you could call them without creating an object (<code>Math.abs(-5)</code> — no <code>new Math()</code> needed). instance methods are different: you call them ON an object (<code>leftMotor.setSpeed(0.5)</code>), and they can access <code>this</code> and all the fields.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — static vs instance method</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">Motor</span> {

    <span class="kw">private</span> <span class="type">double</span> m_speed;

    <span class="cmt">// INSTANCE method — belongs to each object
    // can access this.m_speed, no need to pass fields as parameters
    // called as: myMotor.setSpeed(0.5)</span>
    <span class="kw">public void</span> <span class="fn">setSpeed</span>(<span class="type">double</span> speed) {
        m_speed = speed; <span class="cmt">// accesses this object's field directly</span>
    }

    <span class="cmt">// STATIC method — belongs to the CLASS, not any object
    // cannot access m_speed or "this" — no object context
    // called as: Motor.clamp(1.5)  (no object needed)</span>
    <span class="kw">public static double</span> <span class="fn">clamp</span>(<span class="type">double</span> value) {
        <span class="kw">return</span> Math.<span class="fn">max</span>(<span class="num">-1.0</span>, Math.<span class="fn">min</span>(<span class="num">1.0</span>, value));
    }
}</pre>
</div>

<h3 class="sub">The Full Encapsulation Pattern</h3>
<p>here's the complete getter/setter pattern you'll use on literally every subsystem you write. private fields, public getters that return the value, public setters that validate before storing.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — full getter/setter pattern</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">Motor</span> {

    <span class="kw">private</span> <span class="type">int</span>     m_motorID;
    <span class="kw">private</span> <span class="type">double</span>  m_speed;
    <span class="kw">private</span> <span class="type">boolean</span> m_isRunning;

    <span class="kw">public</span> <span class="fn">Motor</span>(<span class="type">int</span> motorID) {
        m_motorID  = motorID;
        m_speed    = <span class="num">0.0</span>;
        m_isRunning = <span class="kw">false</span>;
    }

    <span class="cmt">// GETTER — just returns the value, no parameters
    // naming convention: getX() where X is the field name</span>
    <span class="kw">public double</span> <span class="fn">getSpeed</span>() {
        <span class="kw">return</span> m_speed;
    }

    <span class="kw">public int</span> <span class="fn">getMotorID</span>() {
        <span class="kw">return</span> m_motorID;
    }

    <span class="kw">public boolean</span> <span class="fn">isRunning</span>() { <span class="cmt">// booleans often use "is" instead of "get"</span>
        <span class="kw">return</span> m_isRunning;
    }

    <span class="cmt">// SETTER — takes the new value as a parameter, validates it
    // naming convention: setX() where X is the field name</span>
    <span class="kw">public void</span> <span class="fn">setSpeed</span>(<span class="type">double</span> speed) {
        <span class="cmt">// Math.max and Math.min together clamp to [-1.0, 1.0]</span>
        m_speed = Math.<span class="fn">max</span>(<span class="num">-1.0</span>, Math.<span class="fn">min</span>(<span class="num">1.0</span>, speed));
    }

    <span class="cmt">// ACTION methods — verbs that do something meaningful</span>
    <span class="kw">public void</span> <span class="fn">start</span>(<span class="type">double</span> speed) {
        <span class="fn">setSpeed</span>(speed); <span class="cmt">// reuse the setter's validation!</span>
        m_isRunning = <span class="kw">true</span>;
    }

    <span class="kw">public void</span> <span class="fn">stop</span>() {
        m_speed    = <span class="num">0.0</span>;
        m_isRunning = <span class="kw">false</span>;
    }
}</pre>
</div>

<h3 class="sub">A Real-Looking FRC Subsystem</h3>
<p>here's what this all looks like assembled into something that genuinely resembles what you'd write in actual robot code:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — ShooterSubsystem (simplified but real-looking)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">/**
 * Models the shooter mechanism.
 * Manages flywheel speed and tracks whether we're at target velocity.
 */</span>
<span class="kw">public class</span> <span class="cls">ShooterSubsystem</span> {

    <span class="cmt">// fields — all private, all m_ prefixed</span>
    <span class="kw">private</span> <span class="type">int</span>     m_topMotorID;
    <span class="kw">private</span> <span class="type">int</span>     m_bottomMotorID;
    <span class="kw">private</span> <span class="type">double</span>  m_targetSpeed;
    <span class="kw">private</span> <span class="type">boolean</span> m_isAtSpeed;

    <span class="kw">public</span> <span class="fn">ShooterSubsystem</span>(<span class="type">int</span> topID, <span class="type">int</span> bottomID) {
        m_topMotorID    = topID;
        m_bottomMotorID = bottomID;
        m_targetSpeed   = <span class="num">0.0</span>;
        m_isAtSpeed     = <span class="kw">false</span>;
    }

    <span class="cmt">/** Sets the target flywheel speed, clamped to [0.0, 1.0]. */</span>
    <span class="kw">public void</span> <span class="fn">setTargetSpeed</span>(<span class="type">double</span> speed) {
        m_targetSpeed = Math.<span class="fn">max</span>(<span class="num">0.0</span>, Math.<span class="fn">min</span>(<span class="num">1.0</span>, speed));
    }

    <span class="cmt">/** @return current target speed */</span>
    <span class="kw">public double</span> <span class="fn">getTargetSpeed</span>() { <span class="kw">return</span> m_targetSpeed; }

    <span class="cmt">/** @return true if shooter is at target speed */</span>
    <span class="kw">public boolean</span> <span class="fn">isAtSpeed</span>() { <span class="kw">return</span> m_isAtSpeed; }

    <span class="cmt">/** Spins up the shooter to full power. */</span>
    <span class="kw">public void</span> <span class="fn">spinUp</span>() { <span class="fn">setTargetSpeed</span>(<span class="num">1.0</span>); }

    <span class="cmt">/** Stops the shooter and resets speed tracking. */</span>
    <span class="kw">public void</span> <span class="fn">stop</span>() {
        m_targetSpeed = <span class="num">0.0</span>;
        m_isAtSpeed   = <span class="kw">false</span>;
    }

    <span class="cmt">/** @return a human-readable status string for dashboards */</span>
    <span class="kw">public</span> <span class="cls">String</span> <span class="fn">getStatusString</span>() {
        <span class="kw">return</span> String.<span class="fn">format</span>(<span class="str">"Shooter: %.2f | %s"</span>,
            m_targetSpeed, m_isAtSpeed ? <span class="str">"AT SPEED"</span> : <span class="str">"SPINNING UP"</span>);
    }
}</pre>
</div>

<div class="callout tip"><p><strong>WRT method conventions:</strong> getters are <code>getX()</code> (or <code>isX()</code> for booleans), setters are <code>setX()</code>, and action methods are descriptive verbs like <code>spinUp()</code>, <code>stop()</code>, <code>deploy()</code>. keep the names obvious — someone at 2am during build season needs to read this.</p></div>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Instance Method</div><div class="cc-title">Belongs to an object</div><div class="cc-desc">Can access all the object's fields via <code>this</code>. Called on an object: <code>motor.setSpeed(0.5)</code>.</div></div>
  <div class="concept-card"><div class="cc-label">Getter</div><div class="cc-title">getX() / isX()</div><div class="cc-desc">Returns the value of a private field. No parameters. Just <code>return m_field;</code>.</div></div>
  <div class="concept-card"><div class="cc-label">Setter</div><div class="cc-title">setX(value)</div><div class="cc-desc">Accepts a new value, validates it, stores it. This is where you catch bad inputs before they corrupt your state.</div></div>
  <div class="concept-card"><div class="cc-label">Encapsulation</div><div class="cc-title">private + methods</div><div class="cc-desc">Wrapping private data with public methods that control access. The core OOP pattern. Every subsystem uses this.</div></div>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

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

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh">Fill in the Blanks</h2>
<div id="fill-w5">
  <div class="fill-container">
    <span class="cmt">// Declare a private double field (WRT style)</span><br>
    <input class="fill-blank" data-answer="private" placeholder="???????"> <span class="type">double</span> m_motorSpeed;
  </div>
  <div class="fill-container">
    <span class="cmt">// Constructor for class Intake taking int motorID</span><br>
    <span class="kw">public</span> <input class="fill-blank" data-answer="Intake" placeholder="??????"> (<span class="type">int</span> motorID) { }
  </div>
  <div class="fill-container">
    <span class="cmt">// Create a new Motor with id=3, inverted=false</span><br>
    <span class="cls">Motor</span> m = <input class="fill-blank" data-answer="new Motor(3, false)|new Motor(3,false)" placeholder="??????????????????">
  </div>
  <div class="fill-container">
    <span class="cmt">// Inside a method, refer to this object's own field</span><br>
    <input class="fill-blank" data-answer="this" placeholder="????">.<span class="fn">m_speed</span> = speed;
  </div>
</div>
<div style="display:flex;align-items:center;gap:12px;margin-top:10px">
  <button class="btn btn-navy btn-sm" onclick="checkFills('fill-w5')">Check Answers</button>
  <span id="fill-w5-result" style="font-size:13px;font-weight:700;display:none"></span>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh">Knowledge Check</h2>
<div id="quiz-w5"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh">Coding Challenge</h2>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Build an Intake Class</div><div class="ch-sub">Write a real FRC subsystem class from scratch</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Write an <code>Intake</code> class with private fields <code>int m_motorID</code>, <code>double m_speed</code>, <code>boolean m_isRunning</code>. Constructor takes motorID, sets speed=0 and isRunning=false. Methods: <code>start(double speed)</code>, <code>stop()</code>, <code>isRunning()</code>, <code>getSpeed()</code>. Then create two objects and test them. Make sure the two objects are fully independent!!</p>
    <textarea class="code-input" placeholder="public class Intake { ... }"></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w5')">Show Solution</button></div>
    <div id="sol-w5" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">Intake</span> {
    <span class="kw">private</span> <span class="type">int</span>     m_motorID;
    <span class="kw">private</span> <span class="type">double</span>  m_speed;
    <span class="kw">private</span> <span class="type">boolean</span> m_isRunning;

    <span class="kw">public</span> <span class="fn">Intake</span>(<span class="type">int</span> motorID) {
        m_motorID  = motorID;
        m_speed     = <span class="num">0.0</span>;
        m_isRunning = <span class="kw">false</span>;
    }

    <span class="kw">public void</span> <span class="fn">start</span>(<span class="type">double</span> speed) {
        m_speed     = speed;
        m_isRunning = <span class="kw">true</span>;
    }

    <span class="kw">public void</span> <span class="fn">stop</span>() {
        m_speed     = <span class="num">0.0</span>;
        m_isRunning = <span class="kw">false</span>;
    }

    <span class="kw">public boolean</span> <span class="fn">isRunning</span>() { <span class="kw">return</span> m_isRunning; }
    <span class="kw">public double</span>  <span class="fn">getSpeed</span>()   { <span class="kw">return</span> m_speed; }
}

<span class="cmt">// create two SEPARATE objects from the same class</span>
<span class="cls">Intake</span> front = <span class="kw">new</span> <span class="fn">Intake</span>(<span class="num">5</span>);
<span class="cls">Intake</span> back  = <span class="kw">new</span> <span class="fn">Intake</span>(<span class="num">6</span>);

front.<span class="fn">start</span>(<span class="num">0.8</span>);
System.out.<span class="fn">println</span>(front.<span class="fn">isRunning</span>()); <span class="cmt">// true</span>
System.out.<span class="fn">println</span>(back.<span class="fn">isRunning</span>());  <span class="cmt">// false — completely separate!!</span></pre>
      </div>
    </div>
  </div>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<div class="project-task">
  <div class="pt-header">
    <div class="pt-icon"><i data-lucide="wrench"></i></div>
    <div class="pt-header-title">Project Task — Week 5</div>
    <div class="pt-filename">DriveSubsystem.java</div>
  </div>
  <div class="pt-body">
    <p>Create <code>DriveSubsystem.java</code> — the heart of your MiniBot project. This models how a real FRC drivetrain subsystem is structured on team 2974.</p>
    <ul>
      <li>Private fields: <code>int[] m_motorIDs</code> (4 motors: FL, FR, BL, BR), <code>double m_currentSpeed</code>, <code>boolean m_isInverted</code></li>
      <li>Constructor takes no parameters — initialize <code>m_motorIDs</code> from your <code>Constants.DriveK</code> values (use the IDs you defined in week 1)</li>
      <li><code>public void setSpeed(double speed)</code> — clamp speed to [-1.0, 1.0] before storing</li>
      <li><code>public double getSpeed()</code> — return current speed</li>
      <li><code>public void stop()</code> — sets speed to 0</li>
      <li><code>public boolean isMoving()</code> — returns true if |speed| > 0.01</li>
      <li><code>public String getStatusString()</code> — returns a formatted string like "Drive: 0.75 m/s | MOVING"</li>
      <li>Full Javadoc on the class and every public method</li>
    </ul>
    <span class="pt-note">note: don't worry about actual WPILib motor objects yet — just model the data and logic. we'll wire it up properly later.</span>
  </div>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="weekly-test">Weekly Test</h2>
<p>covers everything from week 5. the big OOP week. score goes to the leads — try without looking back!!</p>
<div class="weekly-test-block">
  <div class="wt-header">
    <div class="wt-icon"><i data-lucide="clipboard-list"></i></div>
    <div>
      <div class="wt-title">week 5 test</div>
      <div class="wt-sub">classes, objects, constructors, encapsulation · 8 questions!!</div>
    </div>
  </div>
  <div id="test-summer-w5"></div>
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
  { question: "What is the difference between a class and an object?", options: ["They're the same thing with different names","A class is the blueprint; an object is one specific instance built from it","A class holds data; an object holds methods","An object is defined using the class keyword"], correct: 1, explanation: "<code>Motor</code> is a class (the blueprint). <code>leftMotor = new Motor(1, false)</code> creates an object. You can make many independent objects from one class — like many cookies from one cutter." },
  { question: "What makes a constructor different from a regular method?", options: ["Constructors are always private","Constructors use the void return type","Constructors have the same name as the class, no return type, and run automatically on new","Constructors can't take parameters"], correct: 2, explanation: "Three things: same name as the class, no return type (not even void!), and Java calls it automatically when you use new. If you write void before it, it becomes a regular method." },
  { question: "Why should instance variables almost always be private?", options: ["The code runs faster with private","Encapsulation — you control and validate how the data is changed via setters","Java requires it for fields","It uses less memory"], correct: 1, explanation: "With private fields and setters, you validate input before accepting it. Prevents someone from setting m_speed to 9999 or NaN by accident. This is encapsulation." },
  { question: "What does <code>this</code> refer to inside an instance method?", options: ["The class itself","The current object — the specific instance the method was called on","The parent class","The previous method that was called"], correct: 1, explanation: "<code>this</code> is the current object. If you call <code>leftMotor.setSpeed(0.5)</code>, inside setSpeed, <code>this</code> refers to <code>leftMotor</code>. If you call it on rightMotor, this is rightMotor." },
  { question: "You have <code>Motor m1 = new Motor(1, false)</code> and <code>Motor m2 = new Motor(2, true)</code>. You call <code>m1.setSpeed(0.8)</code>. Does <code>m2</code>'s speed change?", options: ["Yes — objects share their fields","No — each object has its own independent copy of instance variables","Only if they were created from the same class","Only if m_speed is static"], correct: 1, explanation: "Objects are independent. m1 and m2 each have their own m_speed, m_motorID, and m_isInverted. Changing one never affects the other. Like two separate houses built from the same blueprint." },
  { question: "What does the <code>new</code> keyword do?", options: ["Declares a variable type","Allocates memory, runs the constructor, and returns a reference to the new object","Defines a class","Creates a copy of an existing object"], correct: 1, explanation: "new does three things: allocates memory for the object, runs the constructor to initialize it, and gives you back a reference (an address) pointing to where the object lives in memory." },
  { question: "Which of these is a getter for a private field <code>m_speed</code>?", options: ["public void setSpeed(double speed) { m_speed = speed; }","public double getSpeed() { return m_speed; }","private double m_speed;","public double m_speed = 0.0;"], correct: 1, explanation: "A getter returns the value of a private field. It's public, returns the field's type, takes no parameters, and just returns the field. <code>public double getSpeed() { return m_speed; }</code> is the pattern." },
  { question: "A variable marked <code>private</code> can be accessed from...", options: ["Anywhere in the project","Any class in the same package","Only inside the class it was declared in","Subclasses only"], correct: 2, explanation: "private means only the class it was declared in can access it directly. Other classes must use public methods (getters/setters) to interact with private data. That's the whole point of encapsulation." }
], 'summer-w5');

const test_w5 = new Quiz('test-summer-w5', [
  { question: "A class is to an object as a blueprint is to...", options: ["Another blueprint","The house built from it","The architect who made it","The land it sits on"], correct: 1, explanation: "The blueprint is the class — it defines the design. The house you build from it is the object — one specific instance. You can build many houses (objects) from one blueprint (class), each independent." },
  { question: "What does <code>new Motor(3, false)</code> do?", options: ["Declares the Motor class","Creates a new Motor object, allocates memory, and runs the constructor","Calls a static method named Motor","Converts 3 into a Motor type"], correct: 1, explanation: "new allocates memory, runs the constructor (Motor(3, false)), and returns a reference to the newly created object. Without new, you can't create an object." },
  { question: "Which of these is a valid constructor for a class named <code>Shooter</code>?", options: ["public void Shooter() { }","public int Shooter(int id) { return id; }","public Shooter(int id) { m_id = id; }","private void shooter() { }"], correct: 2, explanation: "A constructor has the same name as the class (Shooter, not shooter) and NO return type — not void, not int, nothing. <code>public Shooter(int id) { ... }</code> is the only valid form here." },
  { question: "Inside the method <code>setSpeed(double speed)</code>, what does <code>this</code> refer to?", options: ["The class definition","The specific object that setSpeed was called on","The parameter named speed","The parent class"], correct: 1, explanation: "this is the current object — whatever instance the method is running on. If leftMotor.setSpeed(0.5) is called, this inside that method is leftMotor." },
  { question: "Why are instance variables made private instead of public?", options: ["Private is faster to compile","Private variables use less RAM","Encapsulation — private fields + public setters let you validate and control how data changes","Java requires all fields to be private"], correct: 2, explanation: "Encapsulation: with a public field, anything can set it to any value. With private + setter, you validate input first (clamp to range, check for null, etc). This prevents silent corruption of your object's state." },
  { question: "You create <code>Motor a = new Motor(1)</code> and <code>Motor b = new Motor(2)</code>. You call <code>a.stop()</code>. What happens to <code>b</code>?", options: ["b also stops — they share fields","b is unaffected — each object has its own independent copy of fields","b throws an error","b gets garbage collected"], correct: 1, explanation: "a and b are separate objects. Each has its own m_speed, m_motorID, etc. Calling a method on one object never affects another object of the same class." },
  { question: "What is a getter method?", options: ["A method that sets a private field to a new value","A method that returns the value of a private field","A constructor that takes no parameters","A static method that creates a new object"], correct: 1, explanation: "A getter returns a private field's value: <code>public double getSpeed() { return m_speed; }</code>. It's how outside code reads data without having direct access to the private field." },
  { question: "What is the difference between <code>private</code> and <code>public</code> access?", options: ["private is faster, public is slower","public fields are stored in RAM, private are on the stack","private can only be accessed inside the class it's declared in; public can be accessed from anywhere","There is no real difference, just style"], correct: 2, explanation: "private = only this class can access it. public = any class anywhere can access it. WRT rule: all instance variables are private. Only methods you want other classes to call should be public." }
], 'summer-w5-test');

document.addEventListener('DOMContentLoaded', buildCls);
</script>
