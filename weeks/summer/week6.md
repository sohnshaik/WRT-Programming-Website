---
layout: week
title: "Inheritance & Polymorphism"
subtitle: "building class hierarchies, reusing code, and the OOP stuff that makes WPILib make sense :D"
badge: "Summer · Week 6 of 8"
phase: summer
phase_label: Summer
week_label: Week 6
page_id: summer-w6
weekly_test: true
topics:
  - Inheritance
  - Abstract Classes
  - Interfaces
prev_url: /weeks/summer/week5
prev_title: "Week 5 — OOP: Classes & Objects"
next_url: /weeks/summer/week7
next_title: "Week 7 — Advanced Classes"
---

<div class="callout info"><p><strong>Why this matters:</strong> every single time you write <code>extends SubsystemBase</code> or <code>extends Command</code> in WPILib, you are using inheritance. these aren't just keywords you copy paste — they're the reason the whole command-based framework works. this week makes all of that make sense.</p></div>

<h2 class="sh" id="topic-1">Inheritance</h2>

<p>ok so last week we learned that a class is a blueprint. this week we're asking: what if you could take an existing blueprint and build on top of it? like, keep everything that's already there and just add your own stuff on top?</p>

<p>that's inheritance.</p>

<h3 class="sub">The Vehicle Analogy</h3>

<p>imagine you have a general <code>Vehicle</code> class. it has fields like <code>speed</code>, <code>color</code>, and <code>numberOfWheels</code>. it has methods like <code>accelerate()</code> and <code>brake()</code>.</p>

<p>now you want to make a <code>Car</code>. a car is a vehicle — it has all that stuff. but it also has a <code>trunkSpace</code> field and a <code>openTrunk()</code> method that trucks don't have. a <code>Truck</code> is also a vehicle, but it has a <code>cargoCapacity</code> field instead.</p>

<p>you don't want to copy-paste all the Vehicle code into Car and Truck. that's a nightmare — if you fix a bug in <code>brake()</code>, you'd have to fix it in three places. instead, <code>Car</code> and <code>Truck</code> <strong>extend</strong> <code>Vehicle</code>. they inherit everything from it, and each adds their own specific stuff on top.</p>

<div class="callout tip"><p><strong>FRC version of this analogy:</strong> <code>SubsystemBase</code> is the Vehicle. <code>DriveSubsystem</code>, <code>ShooterSubsystem</code>, <code>IntakeSubsystem</code> — those are all the Car/Truck. they all inherit from <code>SubsystemBase</code>, which means they all automatically get the <code>periodic()</code> method, they all register with the CommandScheduler, they all behave like a subsystem. each one just adds its own motors and logic on top.</p></div>

<h3 class="sub">The extends Keyword</h3>

<p>let's start simple. here's a parent class <code>Animal</code>, and a child class <code>Dog</code> that extends it:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — parent class</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">Animal</span> {
    <span class="kw">private</span> <span class="type">String</span> m_name;

    <span class="kw">public</span> <span class="fn">Animal</span>(<span class="type">String</span> name) {
        <span class="kw">this</span>.m_name = name;
    }

    <span class="kw">public</span> <span class="type">String</span> <span class="fn">getName</span>() {
        <span class="kw">return</span> m_name;
    }

    <span class="kw">public void</span> <span class="fn">speak</span>() {
        System.out.<span class="fn">println</span>(<span class="str">"..."</span>); <span class="cmt">// generic animal sound</span>
    }
}</pre>
</div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — child class that extends Animal</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">Dog</span> <span class="kw">extends</span> <span class="cls">Animal</span> {

    <span class="kw">public</span> <span class="fn">Dog</span>(<span class="type">String</span> name) {
        <span class="kw">super</span>(name); <span class="cmt">// call Animal's constructor first</span>
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">speak</span>() {
        System.out.<span class="fn">println</span>(<span class="str">"Woof!"</span>); <span class="cmt">// Dog's own version</span>
    }

    <span class="kw">public void</span> <span class="fn">fetch</span>() {
        System.out.<span class="fn">println</span>(getName() + <span class="str">" fetches the ball!"</span>);
    }
}

<span class="cmt">// Dog inherits getName() from Animal — no need to rewrite it!</span>
<span class="cls">Dog</span> d = <span class="kw">new</span> <span class="fn">Dog</span>(<span class="str">"Rex"</span>);
d.<span class="fn">speak</span>();   <span class="cmt">// "Woof!" — uses Dog's version</span>
d.<span class="fn">getName</span>(); <span class="cmt">// "Rex" — inherited from Animal, works for free</span>
d.<span class="fn">fetch</span>();   <span class="cmt">// "Rex fetches the ball!" — Dog-specific method</span></pre>
</div>

<p>so what does <code>Dog</code> inherit from <code>Animal</code>? every <code>public</code> and <code>protected</code> method and field. <code>getName()</code> comes for free. <code>m_name</code> is <code>private</code>, so Dog can't access it directly, but it can use <code>getName()</code> which is the proper way to get at it anyway.</p>

<h3 class="sub">The Real WPILib Version</h3>

<p>now let's look at exactly this pattern but in FRC code:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — SubsystemBase is Animal, DriveSubsystem is Dog</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// SubsystemBase (WPILib gives you this, simplified here)</span>
<span class="kw">public class</span> <span class="cls">SubsystemBase</span> {
    <span class="kw">public</span> <span class="fn">SubsystemBase</span>() {
        CommandScheduler.getInstance().<span class="fn">registerSubsystem</span>(<span class="kw">this</span>);
        <span class="cmt">// this is why every subsystem gets registered automatically</span>
    }

    <span class="kw">public void</span> <span class="fn">periodic</span>() {} <span class="cmt">// runs every 20ms — override in your subsystem</span>
}

<span class="cmt">// Your subsystem inherits all of that</span>
<span class="kw">public class</span> <span class="cls">DriveSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> {

    <span class="kw">private</span> <span class="type">double</span> m_leftSpeed  = <span class="num">0.0</span>;
    <span class="kw">private</span> <span class="type">double</span> m_rightSpeed = <span class="num">0.0</span>;

    <span class="kw">public</span> <span class="fn">DriveSubsystem</span>() {
        <span class="kw">super</span>(); <span class="cmt">// registers with CommandScheduler — inherited behavior!</span>
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">periodic</span>() {
        <span class="cmt">// runs every 20ms — our custom logic goes here</span>
        <span class="fn">updateSmartDashboard</span>();
    }

    <span class="kw">public void</span> <span class="fn">drive</span>(<span class="type">double</span> left, <span class="type">double</span> right) {
        m_leftSpeed  = left;
        m_rightSpeed = right;
    }
}</pre>
</div>

<h3 class="sub">@Override — your typo catcher</h3>

<p>notice the <code>@Override</code> annotation on <code>periodic()</code>. this tells Java "i am intentionally replacing a method from the parent class." if the parent doesn't have a method with that exact name and signature, Java gives you an error. this is actually super useful — it catches typos.</p>

<p>imagine you meant to override <code>periodic()</code> but you accidentally typed <code>Periodic()</code> (capital P). without <code>@Override</code>, Java silently creates a brand new method called <code>Periodic</code> that never gets called. your code compiles, runs, and does nothing. with <code>@Override</code>, you get an immediate compile error saying "no method Periodic() in parent class" — which is exactly what you want.</p>

<h3 class="sub">super() — finishing the parent first</h3>

<p>when you create a <code>Dog</code>, Java needs to also finish setting up the <code>Animal</code> part of it before Dog can do its own setup. <code>super()</code> calls the parent class's constructor. Java <strong>requires</strong> this to be the very first line of the child constructor — no exceptions.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — super() and super.method()</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">Dog</span> <span class="kw">extends</span> <span class="cls">Animal</span> {
    <span class="kw">public</span> <span class="fn">Dog</span>(<span class="type">String</span> name) {
        <span class="kw">super</span>(name); <span class="cmt">// MUST be first line — calls Animal(String name)</span>
        <span class="cmt">// now Dog can do its own setup</span>
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">speak</span>() {
        <span class="kw">super</span>.<span class="fn">speak</span>(); <span class="cmt">// optional: run Animal's version first</span>
        System.out.<span class="fn">println</span>(<span class="str">"Woof!"</span>); <span class="cmt">// then add Dog's behavior</span>
    }
}</pre>
</div>

<p>you can also use <code>super.methodName()</code> to call the parent's version of a method from inside the overriding method. it's optional — you don't have to call it. but sometimes you want the parent's behavior PLUS your own extra stuff on top.</p>

<h3 class="sub">The "is-a" test</h3>

<p>here's a quick mental test for whether inheritance makes sense: can you say "[child class] IS-A [parent class]" and have it be true? if yes, inheritance is probably right.</p>

<ul>
  <li>Dog IS-A Animal — yes, makes sense</li>
  <li>DriveSubsystem IS-A SubsystemBase — yes, that's valid</li>
  <li>ShooterSubsystem IS-A SubsystemBase — yes</li>
  <li>Motor IS-A SubsystemBase — no, a motor isn't a subsystem. use composition (store it as a field) instead</li>
</ul>

<div class="callout warning"><p><strong>One important limit:</strong> in Java, a class can only extend ONE parent class. this is called single inheritance. so <code>DriveSubsystem extends SubsystemBase</code> is fine, but you can't write <code>DriveSubsystem extends SubsystemBase, Robot</code>. if you need multiple capabilities, use interfaces (topic 3!).</p></div>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">extends</div><div class="cc-title">Inherit from a class</div><div class="cc-desc">Child gets all public/protected methods and fields. Can only extend one class (single inheritance).</div></div>
  <div class="concept-card"><div class="cc-label">super()</div><div class="cc-title">Call parent constructor</div><div class="cc-desc">Must be the very first line in a child constructor. Java requires the parent to be set up before the child adds its own fields.</div></div>
  <div class="concept-card"><div class="cc-label">@Override</div><div class="cc-title">Replace a parent method</div><div class="cc-desc">Tells Java you're intentionally replacing a method. If the parent doesn't have a matching method, Java errors — catching typos before they become silent bugs.</div></div>
  <div class="concept-card"><div class="cc-label">is-a test</div><div class="cc-title">Sanity check for inheritance</div><div class="cc-desc">Ask: "Child IS-A Parent — is that true?" DriveSubsystem IS-A SubsystemBase — yes. Motor IS-A SubsystemBase — no. That's your guide.</div></div>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-2">Abstract Classes</h2>

<p>ok so now you know what inheritance is. abstract classes are the next step up. they add one more idea: "some methods in this parent class are mandatory — every child MUST implement them."</p>

<h3 class="sub">The Template Analogy</h3>

<p>imagine a paper form with some fields already filled in (like the date, your school name, the instructions) and some blanks you have to fill in yourself (like your name, your answers). you can't hand in the form without filling in the blanks — that's not allowed.</p>

<p>an abstract class is like that form. it has some stuff already implemented (concrete methods — the pre-filled fields), and some blanks that MUST be filled in by whoever extends it (abstract methods). and just like the blank form itself isn't a finished submission — you can't create an object directly from an abstract class.</p>

<div class="callout tip"><p><strong>FRC connection:</strong> <code>Command</code> in WPILib is abstract. it has default implementations of <code>initialize()</code>, <code>execute()</code>, <code>end()</code>, and <code>isFinished()</code> — some are blank, some return defaults. your <code>DriveCommand</code> fills in the parts that matter for driving. this is why every command you write <code>extends Command</code>.</p></div>

<h3 class="sub">abstract methods — the blanks</h3>

<p>an abstract method has no body. it's just a declaration — a promise that "any non-abstract subclass will have this method." the child class is responsible for actually implementing it.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — abstract class with abstract and concrete methods</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public abstract class</span> <span class="cls">Shape</span> {

    <span class="cmt">// abstract method — no body, subclass MUST implement</span>
    <span class="kw">public abstract double</span> <span class="fn">area</span>();

    <span class="cmt">// concrete method — already implemented, subclass can optionally override</span>
    <span class="kw">public void</span> <span class="fn">describe</span>() {
        System.out.<span class="fn">println</span>(<span class="str">"I am a shape with area: "</span> + <span class="fn">area</span>());
    }
}

<span class="kw">public class</span> <span class="cls">Circle</span> <span class="kw">extends</span> <span class="cls">Shape</span> {
    <span class="kw">private</span> <span class="type">double</span> m_radius;

    <span class="kw">public</span> <span class="fn">Circle</span>(<span class="type">double</span> radius) {
        m_radius = radius;
    }

    <span class="kw">@Override</span>
    <span class="kw">public double</span> <span class="fn">area</span>() { <span class="cmt">// REQUIRED — must fill in this blank</span>
        <span class="kw">return</span> Math.PI * m_radius * m_radius;
    }
}

<span class="cmt">// Can't do this — Shape is abstract, it has blanks not filled in</span>
<span class="cmt">// Shape s = new Shape();  ← compile error!</span>

<span class="cmt">// This is fine — Circle filled in all the blanks</span>
<span class="cls">Circle</span> c = <span class="kw">new</span> <span class="fn">Circle</span>(<span class="num">5.0</span>);
c.<span class="fn">describe</span>(); <span class="cmt">// "I am a shape with area: 78.53..."</span></pre>
</div>

<h3 class="sub">The WPILib Command Pattern</h3>

<p>here's a simplified version of how <code>Command</code> actually works in WPILib:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — simplified WPILib Command</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public abstract class</span> <span class="cls">Command</span> {
    <span class="cmt">// default implementations — override only what you need</span>
    <span class="kw">public void</span>    <span class="fn">initialize</span>() {}                    <span class="cmt">// optional: runs once when command starts</span>
    <span class="kw">public void</span>    <span class="fn">execute</span>()    {}                    <span class="cmt">// optional: runs every loop tick</span>
    <span class="kw">public void</span>    <span class="fn">end</span>(<span class="type">boolean</span> interrupted) {}        <span class="cmt">// optional: runs when command ends</span>
    <span class="kw">public boolean</span> <span class="fn">isFinished</span>() { <span class="kw">return false</span>; }    <span class="cmt">// default: run forever until interrupted</span>
}

<span class="cmt">// Your command overrides just what it needs</span>
<span class="kw">public class</span> <span class="cls">DriveCommand</span> <span class="kw">extends</span> <span class="cls">Command</span> {
    <span class="kw">private final</span> <span class="cls">DriveSubsystem</span> m_drive;

    <span class="kw">public</span> <span class="fn">DriveCommand</span>(<span class="cls">DriveSubsystem</span> drive) {
        m_drive = drive;
        <span class="fn">addRequirements</span>(drive); <span class="cmt">// inherited from Command</span>
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">execute</span>() {
        m_drive.<span class="fn">drive</span>(joystick.<span class="fn">getY</span>(), joystick.<span class="fn">getRawAxis</span>(<span class="num">1</span>));
    }

    <span class="cmt">// isFinished() not overridden — defaults to false, runs until interrupted</span>
    <span class="cmt">// initialize() and end() not overridden — defaults are fine</span>
}</pre>
</div>

<p>notice that not every method needs to be abstract. <code>Command</code> provides default method bodies — like <code>isFinished()</code> defaulting to <code>false</code> — so you only override the ones you actually care about. abstract methods have no body at all and force you to implement them. concrete methods in abstract classes have a body and are optional to override.</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">abstract class</div><div class="cc-title">The template/form</div><div class="cc-desc">Has some implemented methods and some abstract (blank) ones. Can't be instantiated directly.</div></div>
  <div class="concept-card"><div class="cc-label">abstract method</div><div class="cc-title">A required blank</div><div class="cc-desc">No body — declared with just a type and name. Non-abstract subclasses MUST provide an implementation.</div></div>
  <div class="concept-card"><div class="cc-label">concrete method</div><div class="cc-title">A pre-filled field</div><div class="cc-desc">Has an actual implementation body. Subclasses can optionally override it or just use the default.</div></div>
  <div class="concept-card"><div class="cc-label">can't instantiate</div><div class="cc-title">new Command() = error</div><div class="cc-desc">Abstract classes have unfilled blanks, so creating one directly makes no sense. You must extend it and fill in the blanks first.</div></div>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-3">Interfaces</h2>

<p>now here's where it gets interesting. inheritance has one big limitation: a class can only extend ONE parent. but what if you want a class to have multiple capabilities from multiple sources?</p>

<p>that's what interfaces are for.</p>

<h3 class="sub">The Contract Analogy</h3>

<p>an interface is a contract. it says: "any class that signs this contract PROMISES to have these methods." it doesn't care HOW you implement them — it just says they must exist.</p>

<p>think of it like a job description. if you hire someone as "a driver," you're saying they must be able to drive — you don't care if they learned in a car, a truck, or a simulator. the contract is "can drive." the implementation is their problem.</p>

<h3 class="sub">Defining and Implementing an Interface</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — a simple interface</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// Interface — just a contract, no fields, all abstract methods by default</span>
<span class="kw">public interface</span> <span class="cls">Loggable</span> {
    <span class="type">String</span> <span class="fn">getLogData</span>(); <span class="cmt">// no body — every Loggable class must implement this</span>
}

<span class="cmt">// A class implements the interface</span>
<span class="kw">public class</span> <span class="cls">DriveSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> <span class="kw">implements</span> <span class="cls">Loggable</span> {

    <span class="kw">private</span> <span class="type">double</span> m_leftSpeed;
    <span class="kw">private</span> <span class="type">double</span> m_rightSpeed;

    <span class="cmt">// Must implement getLogData() — required by the contract</span>
    <span class="kw">@Override</span>
    <span class="kw">public</span> <span class="type">String</span> <span class="fn">getLogData</span>() {
        <span class="kw">return</span> <span class="str">"Left: "</span> + m_leftSpeed + <span class="str">" Right: "</span> + m_rightSpeed;
    }
}</pre>
</div>

<p>the key word is <code>implements</code> — not <code>extends</code>. you <em>extend</em> a class, you <em>implement</em> an interface.</p>

<h3 class="sub">Implementing Multiple Interfaces</h3>

<p>here's the big deal — a class can implement as many interfaces as it wants. can only extend ONE class, but implement MULTIPLE interfaces:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — multiple interfaces</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public interface</span> <span class="cls">Loggable</span> {
    <span class="type">String</span> <span class="fn">getLogData</span>();
}

<span class="kw">public interface</span> <span class="cls">Stoppable</span> {
    <span class="kw">void</span> <span class="fn">stop</span>();
}

<span class="cmt">// DriveSubsystem extends ONE class but implements multiple interfaces</span>
<span class="kw">public class</span> <span class="cls">DriveSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> <span class="kw">implements</span> <span class="cls">Loggable</span>, <span class="cls">Stoppable</span> {

    <span class="kw">@Override</span>
    <span class="kw">public</span> <span class="type">String</span> <span class="fn">getLogData</span>() {
        <span class="kw">return</span> <span class="str">"DriveSubsystem: left="</span> + m_leftSpeed + <span class="str">" right="</span> + m_rightSpeed;
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">stop</span>() {
        m_leftSpeed  = <span class="num">0.0</span>;
        m_rightSpeed = <span class="num">0.0</span>;
    }
}</pre>
</div>

<h3 class="sub">FRC: the Sendable interface</h3>

<p>a real interface from WPILib: <code>Sendable</code>. any class that implements <code>Sendable</code> can send its data to Shuffleboard (the dashboard on your driver station laptop). you implement <code>initSendable()</code> and WPILib handles the rest — it polls your data and displays it automatically.</p>

<p><code>SubsystemBase</code> actually already implements <code>Sendable</code>, which is one reason your subsystems show up on Shuffleboard without extra work. this is inheritance + interfaces working together.</p>

<h3 class="sub">Interface vs Abstract Class — which one when?</h3>

<p>this is the question everyone asks. here's the simple version:</p>

<table>
<thead><tr><th>Use an interface when...</th><th>Use an abstract class when...</th></tr></thead>
<tbody>
<tr><td>You want to say what a class CAN DO (capabilities)</td><td>You want to say what a class IS (identity)</td></tr>
<tr><td>The class might already extend something else</td><td>You want to share actual implementation code</td></tr>
<tr><td>Multiple unrelated classes need the same capability</td><td>You have a clear parent-child relationship</td></tr>
<tr><td>"This thing can be logged / stopped / tuned"</td><td>"This IS a subsystem / IS a command"</td></tr>
</tbody>
</table>

<div class="callout tip"><p><strong>Quick rule:</strong> if it's a capability ("can do X"), interface. if it's an identity ("is a type of Y"), abstract class. <code>Loggable</code> is a capability — interface. <code>SubsystemBase</code> is an identity — abstract class. <code>Sendable</code> is a capability — interface. <code>Command</code> is an identity — abstract class.</p></div>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">interface</div><div class="cc-title">A contract / capability</div><div class="cc-desc">No fields, no implementation. Just method signatures. A class promises to implement all of them by using <code>implements</code>.</div></div>
  <div class="concept-card"><div class="cc-label">implements</div><div class="cc-title">Sign the contract</div><div class="cc-desc">Use <code>implements</code> (not <code>extends</code>) to adopt an interface. You must implement every method the interface declares.</div></div>
  <div class="concept-card"><div class="cc-label">multiple interfaces</div><div class="cc-title">Stack capabilities freely</div><div class="cc-desc">A class can implement as many interfaces as needed. <code>implements Loggable, Stoppable, Sendable</code> is totally valid.</div></div>
  <div class="concept-card"><div class="cc-label">Sendable</div><div class="cc-title">WPILib real example</div><div class="cc-desc">Implementing <code>Sendable</code> lets a class send data to Shuffleboard. <code>SubsystemBase</code> already implements it for you.</div></div>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh">Fill in the Blanks</h2>
<div id="fill-w6">
  <div class="fill-container">
    <span class="cmt">// DriveSubsystem inherits from SubsystemBase</span><br>
    <span class="kw">public class</span> <span class="cls">DriveSubsystem</span> <input class="fill-blank" data-answer="extends" placeholder="???????"> <span class="cls">SubsystemBase</span> { }
  </div>
  <div class="fill-container">
    <span class="cmt">// Tell Java you're intentionally replacing the parent's speak() method</span><br>
    <input class="fill-blank" data-answer="@Override" placeholder="?????????"><br>
    <span class="kw">public void</span> <span class="fn">speak</span>() { System.out.<span class="fn">println</span>(<span class="str">"Woof"</span>); }
  </div>
  <div class="fill-container">
    <span class="cmt">// Shooter signs the Loggable contract</span><br>
    <span class="kw">public class</span> <span class="cls">Shooter</span> <input class="fill-blank" data-answer="implements" placeholder="??????????"> <span class="cls">Loggable</span> { }
  </div>
  <div class="fill-container">
    <span class="cmt">// Call the parent constructor (must be first line)</span><br>
    <span class="kw">public</span> <span class="fn">Dog</span>(<span class="type">String</span> name) {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<input class="fill-blank" data-answer="super(name)" placeholder="??????????"><span class="cmt">// parent constructor</span><br>
    }
  </div>
</div>
<div style="display:flex;align-items:center;gap:12px;margin-top:10px">
  <button class="btn btn-navy btn-sm" onclick="checkFills('fill-w6')">Check Answers</button>
  <span id="fill-w6-result" style="font-size:13px;font-weight:700;display:none"></span>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh">Knowledge Check</h2>
<p>quick check on the concepts before the weekly test. no pressure!</p>
<div id="quiz-w6"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<div class="project-task">
  <div class="pt-header">
    <div class="pt-icon"><i data-lucide="wrench"></i></div>
    <div class="pt-header-title">Project Task — Week 6</div>
    <div class="pt-filename">ShooterSubsystem.java</div>
  </div>
  <div class="pt-body">
    <p>Create <code>ShooterSubsystem.java</code>. Like <code>DriveSubsystem</code>, this models a real FRC shooter. This week you'll use what you learned about inheritance to structure it the way WPILib expects.</p>
    <ul>
      <li>Class signature: <code>public class ShooterSubsystem</code> — it should conceptually extend SubsystemBase (write the extends, even if SubsystemBase isn't imported in your standalone file)</li>
      <li>Private fields: <code>int m_topMotorID</code>, <code>int m_bottomMotorID</code>, <code>double m_targetRPS</code>, <code>boolean m_isSpinning</code></li>
      <li>Constructor: initialize motor IDs from <code>Constants.ShooterK</code></li>
      <li><code>public void spinUp(double targetRPS)</code> — sets target, sets isSpinning to true</li>
      <li><code>public void stop()</code> — resets target to 0, isSpinning to false</li>
      <li><code>public boolean isAtSpeed()</code> — returns true if isSpinning AND targetRPS >= Constants.ShooterK.kSpeedThreshold</li>
      <li><code>public String getLogData()</code> — implement a method that returns a log string (this is like implementing an interface)</li>
      <li>Javadoc on every public method</li>
    </ul>
    <span class="pt-note">week 7 will bring DriveSubsystem and ShooterSubsystem together in a RobotState class!</span>
  </div>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="weekly-test">Weekly Test</h2>
<p>covers everything from week 6. inheritance is one of the most tested topics in Java interviews ngl. score goes to leads!!</p>
<div class="weekly-test-block">
  <div class="wt-header">
    <div class="wt-icon"><i data-lucide="clipboard-list"></i></div>
    <div>
      <div class="wt-title">week 6 test</div>
      <div class="wt-sub">inheritance, abstract classes, interfaces · 8 questions!!</div>
    </div>
  </div>
  <div id="test-summer-w6"></div>
</div>

<script>
const quiz_w6 = new Quiz('quiz-w6', [
  { question: "When you write <code>class DriveSubsystem extends SubsystemBase</code>, what does that mean?", options: ["DriveSubsystem replaces SubsystemBase entirely","DriveSubsystem inherits all methods and behavior from SubsystemBase","SubsystemBase is stored inside DriveSubsystem as a field","They share the same instance variables"], correct: 1, explanation: "extends means inheritance. DriveSubsystem gets all of SubsystemBase's methods (like periodic() and addRequirements()) automatically. It can add its own methods and override existing ones. It doesn't replace SubsystemBase — it builds on top of it." },
  { question: "What does @Override do, and why is it useful beyond just documenting your intent?", options: ["It makes the method run faster than the parent version","It marks that you're replacing a parent class method AND causes a compile error if no matching parent method exists","It prevents the child from calling super.method()","It makes the overriding method private"], correct: 1, explanation: "@Override is a safety net. Without it, if you accidentally type 'Periodic()' instead of 'periodic()', Java silently creates a brand new method that never gets called. With @Override, you get an immediate compile error saying the parent doesn't have that method — catching your typo before it becomes a runtime mystery." },
  { question: "Can a class in Java extend multiple parent classes?", options: ["Yes — use extends ClassA, ClassB","No — Java only allows single inheritance for classes","Yes, but only abstract classes","Yes if both parent classes are in the same package"], correct: 1, explanation: "Java only allows a class to extend ONE parent class. This is called single inheritance. It's a design decision to keep class hierarchies from getting too complicated and ambiguous. If you need multiple capabilities, use interfaces — a class can implement as many as it wants." },
  { question: "Can a class implement multiple interfaces?", options: ["No — only one interface per class, like inheritance","Yes — use implements InterfaceA, InterfaceB with commas","Yes — but only if both interfaces have no overlapping method names","Only if the class is abstract"], correct: 1, explanation: "Yes! This is one of the key advantages of interfaces over abstract classes. A class can only extend one parent but can implement as many interfaces as it needs. Comma-separate them: implements Loggable, Stoppable, Sendable." },
  { question: "Can you do <code>new Command()</code> if Command is an abstract class?", options: ["Yes — abstract classes can still be instantiated","No — abstract classes can't be instantiated directly","Only if you pass all required arguments","Only inside the class itself"], correct: 1, explanation: "Abstract classes can't be instantiated. They have abstract methods with no body — you'd end up with an object that can't run those methods. You must create a non-abstract subclass that implements all abstract methods, then instantiate that." },
  { question: "In a child constructor, where must super() appear?", options: ["Anywhere in the constructor body","After all the this.field = value assignments","As the very first line","It's optional and can be placed anywhere"], correct: 2, explanation: "super() must be the very first line of a child constructor. Java requires the parent to be fully constructed before the child can set up its own fields. If you put it anywhere else, you get a compile error. If you don't include it and the parent has a no-arg constructor, Java adds it silently — but best practice is to always write it explicitly." },
  { question: "A class needs to 'be a subsystem' AND 'be loggable' AND 'be stoppable.' Which of these should be an abstract class and which should be interfaces?", options: ["All three should be abstract classes — extend all three","SubsystemBase as abstract class, Loggable and Stoppable as interfaces","All three should be interfaces","SubsystemBase as interface, Loggable and Stoppable as abstract classes"], correct: 1, explanation: "SubsystemBase represents what the class IS (its identity) — abstract class. Loggable and Stoppable represent what the class CAN DO (capabilities) — interfaces. A class extends ONE parent (SubsystemBase) and implements multiple capability contracts (Loggable, Stoppable). This is the core OOP design rule." },
  { question: "Which of these correctly applies the 'is-a' test to decide if inheritance is appropriate?", options: ["Motor is-a SubsystemBase — yes, extend it","DriveSubsystem is-a SubsystemBase — yes, extend it","Constants is-a Robot — yes, extend it","ShooterK is-a DriveK — yes, extend it"], correct: 1, explanation: "DriveSubsystem IS-A SubsystemBase — it's a specific kind of subsystem. That passes the is-a test and inheritance makes sense. A Motor is NOT a subsystem — it's a hardware component the subsystem uses. That should be a field (composition), not inheritance. Constants and ShooterK don't have an is-a relationship either." }
], 'summer-w6');

const test_w6 = new Quiz('test-summer-w6', [
  { question: "What does the <code>extends</code> keyword do in Java?", options: ["Imports a class from another package","Makes a class inherit all public/protected methods and fields from a parent class","Creates a copy of the parent class","Prevents the child from adding new methods"], correct: 1, explanation: "extends sets up inheritance. The child class gets all public and protected methods and fields from the parent. It can add its own methods, and override existing ones with @Override." },
  { question: "What does @Override do and why is it a good idea?", options: ["Makes the method run in place of all parent methods everywhere","Declares the method as abstract so subclasses must implement it","Tells Java you're intentionally replacing a parent method, and gives you a compile error if there's no matching parent method (catches typos)","Prevents this method from being overridden by any further child classes"], correct: 2, explanation: "@Override is a safety annotation. If you typo the method name, Java will error and tell you the parent doesn't have that method — instead of silently creating a new method that never gets called. Always use it when overriding." },
  { question: "In Java, how many parent classes can one class extend?", options: ["As many as you want, using extends ClassA, ClassB","Two, if both are abstract","Only one — Java uses single inheritance for classes","Only one, unless they're in the same package"], correct: 2, explanation: "Java classes use single inheritance — you can only extend one parent class. This keeps class hierarchies simple and unambiguous. For multiple capabilities, use interfaces." },
  { question: "Can a class implement multiple interfaces?", options: ["No — only one at a time, like extends","Yes — comma-separate them: implements InterfaceA, InterfaceB","Yes, but only if neither interface has abstract methods","Only if the class is also abstract"], correct: 1, explanation: "Implementing multiple interfaces is totally fine and very common. You comma-separate them in the class signature. Every interface's methods must be implemented in the class." },
  { question: "Can you create an object directly from an abstract class?", options: ["Yes — abstract classes work just like regular classes","No — abstract classes have unimplemented methods and can't be instantiated","Yes, but only in the same package","Only if you pass the right constructor arguments"], correct: 1, explanation: "Abstract classes can't be instantiated. They have abstract methods with no body — you'd have an object missing required behavior. You must extend the abstract class and implement all its abstract methods in a concrete subclass first." },
  { question: "In a child constructor, where must super() go?", options: ["Anywhere in the constructor is fine","After all field assignments","As the very first statement in the constructor body","It's never required if you call this() instead"], correct: 2, explanation: "super() must be the very first line of the constructor. Java needs to fully set up the parent part of the object before the child adds its own stuff. Any other position causes a compile error." },
  { question: "A class can use multiple of which of these?", options: ["Parent classes (via extends)","Interfaces (via implements)","Both equally — you can extend multiple and implement multiple","Neither — a class can only have one parent or one interface"], correct: 1, explanation: "A class can implement as many interfaces as it wants, but can only extend one parent class. That's the key asymmetry between interfaces and abstract classes in Java." },
  { question: "What is the 'is-a' relationship test for inheritance?", options: ["Check if both classes are in the same file","Ask if the child class IS-A type of the parent class — if yes, inheritance makes sense","Check if both classes have the same constructor parameters","Ask if the child class has more methods than the parent"], correct: 1, explanation: "The is-a test: 'DriveSubsystem IS-A SubsystemBase' — true, inheritance makes sense. 'Motor IS-A SubsystemBase' — no, a motor is hardware the subsystem uses, not a subsystem itself. Use composition (a field) for has-a relationships, not inheritance." }
], 'summer-w6-test');
</script>
