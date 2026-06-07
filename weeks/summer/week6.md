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

<div class="callout info"><p><strong>Why this matters:</strong> every single time you write <code>extends SubsystemBase</code> or <code>extends Command</code> in WPILib, you are using inheritance. these aren't just keywords you copy-paste — they're the reason the whole command-based framework works. this week makes all of that make sense.</p></div>

<h2 class="sh" id="topic-1">Inheritance</h2>

<p>ok so last week we learned that a class is a blueprint. this week we're asking: what if you could take an existing blueprint and build on top of it? keep everything that's already there, and just add your own stuff? no copy-pasting, no duplicating, no re-writing the same methods five times.</p>

<p>that's inheritance. and once you understand it, every WPILib subsystem you've ever seen will suddenly make total sense.</p>

<h3 class="sub">what even IS inheritance?</h3>

<p>think about a family tree. a kid inherits traits from their parents — eye color, height, maybe a stubborn streak. but they also have their own unique traits on top. the kid IS a person. the parent IS a person. but the kid is also their own specific individual with extra stuff the parent doesn't have.</p>

<p>in programming, inheritance is the same idea. you have a <strong>parent class</strong> (also called a superclass or base class) that has some fields and methods. you have a <strong>child class</strong> (also called a subclass) that automatically gets all of those fields and methods for free, and can add its own on top. the child class IS-A type of the parent class.</p>

<p>the whole point is code reuse. instead of writing the same <code>getName()</code> method in Dog, Cat, and Bird, you write it ONCE in Animal, and all three get it automatically. you fix a bug in Animal, it's fixed everywhere. you add a feature to Animal, every child class gets it for free. this is one of the big wins of object-oriented programming.</p>

<div class="callout info"><p><strong>why does it matter in FRC?</strong> your entire robot codebase is built on inheritance. every subsystem you write extends <code>SubsystemBase</code>. every command you write extends <code>Command</code>. WPILib wrote those parent classes once, with all the framework plumbing built in, and you just build on top. without inheritance, you'd have to re-implement all of that plumbing from scratch every time you make a new subsystem. that would be awful.</p></div>

<h3 class="sub">the vehicle analogy</h3>

<p>let's make this really concrete. imagine you have a general <code>Vehicle</code> class. it has fields like <code>speed</code>, <code>color</code>, and <code>numberOfWheels</code>. it has methods like <code>accelerate()</code> and <code>brake()</code>. any vehicle can do those things.</p>

<p>now you want to make a <code>Car</code>. a Car IS-A Vehicle. it has all that Vehicle stuff. but it also has a <code>trunkSpace</code> field and an <code>openTrunk()</code> method that trucks don't have. a <code>Truck</code> is also a Vehicle, but it has a <code>cargoCapacity</code> field and a <code>lowerTailgate()</code> method instead.</p>

<p>you don't want to copy-paste all the Vehicle code into Car and Truck. that's a nightmare. if you fix a bug in <code>brake()</code>, you'd have to fix it in three places. if you add a new feature to Vehicle, you'd have to add it to every subclass by hand. instead, <code>Car</code> and <code>Truck</code> <em>extend</em> <code>Vehicle</code>. they inherit everything, and each adds their own specific stuff on top.</p>

<div class="callout tip"><p><strong>FRC version of this analogy:</strong> <code>SubsystemBase</code> is the Vehicle. <code>DriveSubsystem</code>, <code>ShooterSubsystem</code>, <code>IntakeSubsystem</code> — those are all the Car and Truck. they all inherit from <code>SubsystemBase</code>, which means they all automatically get the <code>periodic()</code> method hook, they all register with the CommandScheduler, they all behave like a proper subsystem. each one just adds its own motors and logic on top. SubsystemBase was written once by the WPILib team; your team just builds on it.</p></div>

<h3 class="sub">the extends keyword — syntax and mechanics</h3>

<p>let's start simple. here's a parent class <code>Animal</code>, and two child classes <code>Dog</code> and <code>Cat</code> that extend it:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — parent class</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">Animal</span> {
    <span class="kw">private</span> <span class="cls">String</span> m_name;   <span class="cmt">// private — only Animal can access directly</span>

    <span class="kw">public</span> <span class="fn">Animal</span>(<span class="cls">String</span> name) {
        <span class="kw">this</span>.m_name = name;   <span class="cmt">// store the name when created</span>
    }

    <span class="cmt">// public getter — child classes can call this to get the name</span>
    <span class="kw">public</span> <span class="cls">String</span> <span class="fn">getName</span>() {
        <span class="kw">return</span> m_name;
    }

    <span class="cmt">// generic animal sound — children will override this with their own version</span>
    <span class="kw">public void</span> <span class="fn">speak</span>() {
        System.out.<span class="fn">println</span>(<span class="str">"..."</span>);
    }
}</pre>
</div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — child classes that extend Animal</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">Dog</span> <span class="kw">extends</span> <span class="cls">Animal</span> {

    <span class="kw">public</span> <span class="fn">Dog</span>(<span class="cls">String</span> name) {
        <span class="kw">super</span>(name);   <span class="cmt">// call Animal's constructor first — required!</span>
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">speak</span>() {
        System.out.<span class="fn">println</span>(<span class="str">"Woof!"</span>);   <span class="cmt">// Dog's own version of speak()</span>
    }

    <span class="kw">public void</span> <span class="fn">fetch</span>() {
        <span class="cmt">// getName() is inherited from Animal — Dog doesn't need to rewrite it</span>
        System.out.<span class="fn">println</span>(<span class="fn">getName</span>() + <span class="str">" fetches the ball!"</span>);
    }
}

<span class="kw">public class</span> <span class="cls">Cat</span> <span class="kw">extends</span> <span class="cls">Animal</span> {

    <span class="kw">public</span> <span class="fn">Cat</span>(<span class="cls">String</span> name) {
        <span class="kw">super</span>(name);
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">speak</span>() {
        System.out.<span class="fn">println</span>(<span class="str">"Meow!"</span>);   <span class="cmt">// Cat's version is different from Dog's</span>
    }
}

<span class="cmt">// Using them:</span>
<span class="cls">Dog</span> d = <span class="kw">new</span> <span class="fn">Dog</span>(<span class="str">"Rex"</span>);
d.<span class="fn">speak</span>();     <span class="cmt">// "Woof!" — Dog's version</span>
d.<span class="fn">getName</span>();  <span class="cmt">// "Rex"  — inherited from Animal, free!</span>
d.<span class="fn">fetch</span>();    <span class="cmt">// "Rex fetches the ball!"</span>

<span class="cls">Cat</span> c = <span class="kw">new</span> <span class="fn">Cat</span>(<span class="str">"Luna"</span>);
c.<span class="fn">speak</span>();     <span class="cmt">// "Meow!" — Cat's version, different from Dog's</span>
c.<span class="fn">getName</span>();  <span class="cmt">// "Luna"  — same inherited method, different data</span></pre>
</div>

<p>so what does <code>Dog</code> inherit from <code>Animal</code>? every <code>public</code> and <code>protected</code> method and field. <code>getName()</code> is inherited and just works. <code>m_name</code> is <code>private</code>, so Dog can't access it directly — but it can call <code>getName()</code>, which is the proper way anyway. the data is there, Dog just goes through the getter.</p>

<h3 class="sub">the real WPILib version</h3>

<p>now let's look at exactly this pattern but in actual FRC code. here's a simplified version of SubsystemBase and a real DriveSubsystem built on top of it:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — SubsystemBase is Animal, DriveSubsystem is Dog</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// SubsystemBase — WPILib gives you this, simplified here for clarity</span>
<span class="kw">public class</span> <span class="cls">SubsystemBase</span> {

    <span class="kw">public</span> <span class="fn">SubsystemBase</span>() {
        <span class="cmt">// registers THIS subsystem with the CommandScheduler automatically</span>
        <span class="cmt">// this is why your subsystem gets periodic() called every 20ms without you doing anything</span>
        CommandScheduler.<span class="fn">getInstance</span>().<span class="fn">registerSubsystem</span>(<span class="kw">this</span>);
    }

    <span class="cmt">// empty by default — you override this in your subsystem to do stuff every loop</span>
    <span class="kw">public void</span> <span class="fn">periodic</span>() {}
}

<span class="cmt">// Your subsystem — inherits all of SubsystemBase's plumbing for free</span>
<span class="kw">public class</span> <span class="cls">DriveSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> {

    <span class="kw">private</span> <span class="type">double</span> m_leftSpeed  = <span class="num">0.0</span>;
    <span class="kw">private</span> <span class="type">double</span> m_rightSpeed = <span class="num">0.0</span>;

    <span class="kw">public</span> <span class="fn">DriveSubsystem</span>() {
        <span class="kw">super</span>();   <span class="cmt">// runs SubsystemBase() — registers with CommandScheduler</span>
                   <span class="cmt">// without this, periodic() would never be called on your subsystem</span>
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">periodic</span>() {
        <span class="cmt">// runs every 20ms — this is where you'd update SmartDashboard, run PID loops, etc.</span>
        <span class="fn">updateDashboard</span>();
    }

    <span class="kw">public void</span> <span class="fn">drive</span>(<span class="type">double</span> left, <span class="type">double</span> right) {
        m_leftSpeed  = left;
        m_rightSpeed = right;
        <span class="cmt">// in real code, you'd set the actual TalonFX motors here</span>
    }
}</pre>
</div>

<p>the pattern is identical to Animal/Dog. SubsystemBase has the common plumbing (registration, periodic hook). DriveSubsystem inherits all of that, overrides <code>periodic()</code> with its own behavior, and adds <code>drive()</code> which is unique to the drive system. ShooterSubsystem would do the exact same thing but with flywheel logic instead. IntakeSubsystem too. they all share the SubsystemBase foundation.</p>

<h3 class="sub">@Override — your typo catcher</h3>

<p>you've seen <code>@Override</code> in every example above. let's actually talk about what it does, because it's more useful than you might think.</p>

<p>when you write <code>@Override</code> above a method, you're telling Java two things: first, "i am intentionally replacing a method from the parent class." second, "if i got the name or signature wrong, tell me NOW rather than silently letting it slip through."</p>

<p>here's the scenario where it saves you. imagine you meant to override <code>periodic()</code> but you accidentally typed <code>Periodic()</code> (capital P). without <code>@Override</code>, Java doesn't know you intended to override anything. it silently creates a brand new method called <code>Periodic</code> that is NEVER called by anyone. your code compiles, the robot starts, periodic logic never runs, and you have no idea why. you spend an hour debugging. with <code>@Override</code>, you get an instant compile error: "method does not override a method from its superclass." zero wasted time.</p>

<div class="callout warning"><p><strong>common gotcha:</strong> always use <code>@Override</code> when you intend to override a method. it's not required to make the override work, but skipping it removes a really useful safety net. the WRT style guide (and basically every Java style guide) requires it.</p></div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — @Override catching a typo</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">DriveSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> {

    <span class="cmt">// WITHOUT @Override — this compiles fine but never runs!</span>
    <span class="cmt">// Java thinks you're just creating a new method called "Periodic" (capital P)</span>
    <span class="kw">public void</span> <span class="fn">Periodic</span>() {     <span class="cmt">// silent bug — nobody ever calls this</span>
        <span class="fn">updateDashboard</span>();
    }

    <span class="cmt">// WITH @Override — Java checks that periodic() exists in the parent</span>
    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">Periodic</span>() {     <span class="cmt">// COMPILE ERROR: method does not override a method from its superclass</span>
        <span class="fn">updateDashboard</span>();        <span class="cmt">// immediately tells you about the typo — much better!</span>
    }
}</pre>
</div>

<h3 class="sub">super() — finishing the parent first</h3>

<p>when you create a <code>Dog</code>, Java needs to set up the Animal part of it before Dog can do its own setup. that's what <code>super()</code> is for. it calls the parent class's constructor. Java <strong>requires</strong> this to be the very first line of the child constructor — no exceptions, no workarounds.</p>

<p>think about why this rule makes sense. if Dog tries to set up its own fields before Animal has run its constructor, those fields might depend on stuff Animal was supposed to initialize. you'd get weird null pointer errors or garbage values. Java enforces "parent first, child second" to prevent this entire category of bugs.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — super() and super.method()</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">Dog</span> <span class="kw">extends</span> <span class="cls">Animal</span> {
    <span class="kw">public</span> <span class="fn">Dog</span>(<span class="cls">String</span> name) {
        <span class="kw">super</span>(name);   <span class="cmt">// MUST be first line — calls Animal(String name)</span>
                        <span class="cmt">// Animal sets up m_name, THEN Dog can do its own setup</span>
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">speak</span>() {
        <span class="kw">super</span>.<span class="fn">speak</span>();            <span class="cmt">// optional: run Animal's version first ("...")</span>
        System.out.<span class="fn">println</span>(<span class="str">"Woof!"</span>);  <span class="cmt">// then add Dog's own behavior on top</span>
    }
}

<span class="cmt">// In FRC: ShooterSubsystem calling super() on SubsystemBase</span>
<span class="kw">public class</span> <span class="cls">ShooterSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> {
    <span class="kw">public</span> <span class="fn">ShooterSubsystem</span>() {
        <span class="kw">super</span>();   <span class="cmt">// SubsystemBase registers this subsystem with CommandScheduler</span>
                   <span class="cmt">// if you forget this, subsystem never gets registered, periodic() never runs</span>
    }
}</pre>
</div>

<p>you can also use <code>super.methodName()</code> (not just <code>super()</code>) to call the parent's version of a method from inside the overriding method. you'll see this sometimes in FRC when a child command wants to run the parent's behavior AND add its own on top. it's optional — most of the time you just replace the parent method entirely.</p>

<h3 class="sub">the "is-a" test — know when to use inheritance</h3>

<p>not every relationship between classes should use inheritance. here's a simple mental test: can you honestly say "[child class] IS-A [parent class]" and have it be true in a real-world sense? if yes, inheritance is probably the right call. if no, you should probably use composition (store it as a field) instead.</p>

<ul>
  <li>Dog IS-A Animal — yes, that's true in the real world. inheritance makes sense.</li>
  <li>DriveSubsystem IS-A SubsystemBase — yes. it's a kind of subsystem. extends is right.</li>
  <li>ShooterSubsystem IS-A SubsystemBase — yes. same deal.</li>
  <li>Motor IS-A SubsystemBase — no. a motor is a hardware component the subsystem uses, not a subsystem itself. the motor should be a <em>field</em> inside the subsystem, not a parent class.</li>
  <li>Constants IS-A Robot — definitely no. constants are just data, not a kind of robot.</li>
</ul>

<p>when the is-a test fails, it usually means you want <strong>composition</strong> instead — you store the other thing as a field (has-a relationship). DriveSubsystem HAS-A TalonFX motor. it doesn't extend TalonFX.</p>

<div class="callout warning"><p><strong>one important limit:</strong> in Java, a class can only extend ONE parent class. this is called single inheritance. so <code>DriveSubsystem extends SubsystemBase</code> is fine, but you can't write <code>DriveSubsystem extends SubsystemBase, SomeOtherClass</code>. Java doesn't allow it. if you need multiple capabilities, that's what interfaces are for — topic 3!</p></div>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">extends</div><div class="cc-title">Inherit from a class</div><div class="cc-desc">Child gets all public/protected methods and fields from parent. Can only extend one class (single inheritance). Child adds its own stuff on top.</div></div>
  <div class="concept-card"><div class="cc-label">super()</div><div class="cc-title">Call parent constructor</div><div class="cc-desc">Must be the very first line in a child constructor. Parent gets set up fully before child adds its own fields. Java enforces this rule.</div></div>
  <div class="concept-card"><div class="cc-label">@Override</div><div class="cc-title">Replace a parent method</div><div class="cc-desc">Tells Java you're intentionally replacing a method. If the parent doesn't have a matching method, Java errors immediately — catching typos before they become silent bugs.</div></div>
  <div class="concept-card"><div class="cc-label">is-a test</div><div class="cc-title">Sanity check for inheritance</div><div class="cc-desc">Ask: "Child IS-A Parent — is that actually true?" DriveSubsystem IS-A SubsystemBase — yes. Motor IS-A SubsystemBase — no, that's a has-a, use a field instead.</div></div>
</div>

<h3 class="sub">Topic 1 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Build an Inheritance Hierarchy</div><div class="ch-sub">Parent class + two children, like WPILib subsystems</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Create a parent class <code>FRCSubsystem</code> with a private String field <code>m_name</code>, a constructor taking a name, a public <code>getName()</code> getter, and a public void <code>periodic()</code> method that prints "periodic: [name]". Then create two children: <code>Drivetrain</code> that overrides <code>periodic()</code> to print "driving: [name]", and <code>Shooter</code> that overrides <code>periodic()</code> to print "shooting: [name]". Both children must call <code>super(name)</code> in their constructors and use <code>@Override</code>. Then create one of each and call <code>periodic()</code> on both.</p>
    <textarea class="code-input" placeholder="// Write your code here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w6-t1')">Show Solution</button></div>
    <div id="sol-w6-t1" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">FRCSubsystem</span> {
    <span class="kw">private</span> <span class="cls">String</span> m_name;

    <span class="kw">public</span> <span class="fn">FRCSubsystem</span>(<span class="cls">String</span> name) {
        <span class="kw">this</span>.m_name = name;
    }

    <span class="kw">public</span> <span class="cls">String</span> <span class="fn">getName</span>() { <span class="kw">return</span> m_name; }

    <span class="kw">public void</span> <span class="fn">periodic</span>() {
        System.out.<span class="fn">println</span>(<span class="str">"periodic: "</span> + m_name);
    }
}

<span class="kw">public class</span> <span class="cls">Drivetrain</span> <span class="kw">extends</span> <span class="cls">FRCSubsystem</span> {
    <span class="kw">public</span> <span class="fn">Drivetrain</span>() {
        <span class="kw">super</span>(<span class="str">"Drivetrain"</span>);   <span class="cmt">// parent constructor first</span>
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">periodic</span>() {
        System.out.<span class="fn">println</span>(<span class="str">"driving: "</span> + <span class="fn">getName</span>());   <span class="cmt">// getName() inherited</span>
    }
}

<span class="kw">public class</span> <span class="cls">Shooter</span> <span class="kw">extends</span> <span class="cls">FRCSubsystem</span> {
    <span class="kw">public</span> <span class="fn">Shooter</span>() {
        <span class="kw">super</span>(<span class="str">"Shooter"</span>);
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">periodic</span>() {
        System.out.<span class="fn">println</span>(<span class="str">"shooting: "</span> + <span class="fn">getName</span>());
    }
}

<span class="cmt">// Testing it out:</span>
<span class="cls">Drivetrain</span> drive = <span class="kw">new</span> <span class="fn">Drivetrain</span>();
<span class="cls">Shooter</span>    shoot = <span class="kw">new</span> <span class="fn">Shooter</span>();

drive.<span class="fn">periodic</span>();  <span class="cmt">// "driving: Drivetrain"</span>
shoot.<span class="fn">periodic</span>();  <span class="cmt">// "shooting: Shooter"</span></pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 1 — Quick Check</h3>
<div id="quiz-w6-t1"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-2">Abstract Classes</h2>

<p>ok so now you know what inheritance is. abstract classes are the next step up. they add one more idea on top: some methods in this parent class are mandatory. every child MUST implement them, or Java won't compile. it's a way of enforcing a contract between the parent and all of its children.</p>

<p>you've been using abstract classes since the moment you wrote <code>extends Command</code>. now let's understand why.</p>

<h3 class="sub">what even IS an abstract class?</h3>

<p>imagine a paper form with some fields already filled in — like the date, the school name, the instructions at the top — and some fields that are intentionally left blank for you to fill in. the pre-filled fields are done. your job is the blanks. and critically: you cannot hand in an incomplete form. if you haven't filled in your name or answers, it's rejected.</p>

<p>an abstract class is exactly like that form. it has some methods with real implementations already written (called <strong>concrete methods</strong> — the pre-filled fields). and it has some methods with no body at all (called <strong>abstract methods</strong> — the blanks you MUST fill in). if a child class doesn't fill in all the blanks, Java refuses to compile. and just like you can't submit the blank form itself as a finished submission, you can't directly create an object from an abstract class.</p>

<p>the key insight is: abstract classes let you say "here's a bunch of functionality I've already written for you, AND here's a list of things you must provide yourself." it's a partial blueprint that requires some customization before it's usable.</p>

<div class="callout info"><p><strong>why does it matter in FRC?</strong> <code>Command</code> in WPILib is basically an abstract class. it has default implementations for <code>initialize()</code>, <code>execute()</code>, <code>end()</code>, and <code>isFinished()</code>. you pick which ones to override based on what your command needs to do. WPILib could have made some of them truly abstract (required to override), but it chose to give defaults so you only have to write what you care about. the pattern is the same though: parent provides structure, child fills in the details.</p></div>

<h3 class="sub">abstract methods — the mandatory blanks</h3>

<p>an abstract method has NO body. it's just a declaration — a type, a name, and a semicolon. no curly braces, no code inside. it's a promise that says "any concrete (non-abstract) subclass WILL have this method implemented."</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — abstract class with both kinds of methods</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public abstract class</span> <span class="cls">Shape</span> {

    <span class="cmt">// abstract method — no body! every subclass MUST implement this</span>
    <span class="kw">public abstract double</span> <span class="fn">area</span>();

    <span class="cmt">// concrete method — fully implemented, subclass can use it as-is</span>
    <span class="cmt">// notice it CALLS area() even though area() has no body here</span>
    <span class="cmt">// that's fine — when executed on a real subclass, that subclass's area() will run</span>
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
    <span class="kw">public double</span> <span class="fn">area</span>() {
        <span class="kw">return</span> Math.PI * m_radius * m_radius;   <span class="cmt">// blank filled in!</span>
    }
    <span class="cmt">// describe() is inherited for free — no need to rewrite it</span>
}

<span class="kw">public class</span> <span class="cls">Rectangle</span> <span class="kw">extends</span> <span class="cls">Shape</span> {
    <span class="kw">private</span> <span class="type">double</span> m_width;
    <span class="kw">private</span> <span class="type">double</span> m_height;

    <span class="kw">public</span> <span class="fn">Rectangle</span>(<span class="type">double</span> w, <span class="type">double</span> h) {
        m_width = w;
        m_height = h;
    }

    <span class="kw">@Override</span>
    <span class="kw">public double</span> <span class="fn">area</span>() {
        <span class="kw">return</span> m_width * m_height;   <span class="cmt">// different implementation of the same contract</span>
    }
}

<span class="cmt">// This would be a compile error — Shape has unfilled blanks (area()):</span>
<span class="cmt">// Shape s = new Shape();  ← ERROR: Shape is abstract; cannot be instantiated</span>

<span class="cmt">// These are fine — Circle and Rectangle filled in all the blanks:</span>
<span class="cls">Circle</span>    c = <span class="kw">new</span> <span class="fn">Circle</span>(<span class="num">5.0</span>);
<span class="cls">Rectangle</span> r = <span class="kw">new</span> <span class="fn">Rectangle</span>(<span class="num">3.0</span>, <span class="num">4.0</span>);

c.<span class="fn">describe</span>();   <span class="cmt">// "I am a shape with area: 78.53..." — concrete method inherited!</span>
r.<span class="fn">describe</span>();   <span class="cmt">// "I am a shape with area: 12.0"</span></pre>
</div>

<p>one thing worth noting: the <code>describe()</code> method in <code>Shape</code> calls <code>area()</code> — even though <code>Shape.area()</code> has no body. this is fine. when <code>describe()</code> actually runs on a Circle or Rectangle, Java uses that specific subclass's version of <code>area()</code>. the abstract method is just a placeholder during the parent's code; the real implementation gets filled in at runtime. this is called polymorphism, and it's really powerful.</p>

<h3 class="sub">you CANNOT instantiate an abstract class — here's why</h3>

<p>the compile error you get when you try to do <code>new Shape()</code> is intentional. abstract classes have abstract methods with no body. if Java let you create a Shape object and you called <code>shape.area()</code>, there would be NO code to run. the method literally doesn't exist yet. Java prevents this at compile time so you never get that crash at runtime.</p>

<p>you MUST extend the abstract class in a concrete subclass first. once you've filled in all the blanks (implemented all abstract methods), Java allows you to create objects of that subclass.</p>

<div class="callout danger"><p><strong>danger:</strong> if you extend an abstract class but forget to implement one of its abstract methods, your subclass becomes abstract too (even without the <code>abstract</code> keyword). Java will refuse to let you instantiate it and will give you a compile error listing exactly which methods you forgot to implement.</p></div>

<h3 class="sub">the WPILib Command pattern — abstract in the real world</h3>

<p>here's the Command pattern from WPILib, which is the most important abstract class you'll use all season. note that the actual WPILib Command is more complex, but this captures the key idea:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — simplified WPILib Command (the template)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// WPILib gives you this — it's effectively an abstract class</span>
<span class="kw">public abstract class</span> <span class="cls">Command</span> {

    <span class="cmt">// concrete with defaults — override ONLY what you need</span>
    <span class="kw">public void</span>    <span class="fn">initialize</span>() {}                      <span class="cmt">// runs once when command starts</span>
    <span class="kw">public void</span>    <span class="fn">execute</span>()    {}                      <span class="cmt">// runs every 20ms while command is active</span>
    <span class="kw">public void</span>    <span class="fn">end</span>(<span class="type">boolean</span> interrupted) {}          <span class="cmt">// runs once when command finishes</span>
    <span class="kw">public boolean</span> <span class="fn">isFinished</span>() { <span class="kw">return</span> <span class="num">false</span>; }      <span class="cmt">// return true to end the command naturally</span>

    <span class="cmt">// utility method — concrete, fully implemented for you</span>
    <span class="kw">public final void</span> <span class="fn">addRequirements</span>(<span class="cls">Subsystem</span>... requirements) { <span class="cmt">/* ... */</span> }
}

<span class="cmt">// Your command overrides only what matters for this specific command</span>
<span class="kw">public class</span> <span class="cls">DriveCommand</span> <span class="kw">extends</span> <span class="cls">Command</span> {
    <span class="kw">private final</span> <span class="cls">DriveSubsystem</span> m_drive;
    <span class="kw">private final</span> <span class="cls">Joystick</span>       m_joystick;

    <span class="kw">public</span> <span class="fn">DriveCommand</span>(<span class="cls">DriveSubsystem</span> drive, <span class="cls">Joystick</span> joystick) {
        m_drive    = drive;
        m_joystick = joystick;
        <span class="fn">addRequirements</span>(drive);   <span class="cmt">// inherited concrete method — tells scheduler this command owns the drive</span>
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">execute</span>() {
        <span class="cmt">// this is the only part unique to driving — fill in only this blank</span>
        m_drive.<span class="fn">drive</span>(m_joystick.<span class="fn">getY</span>(), m_joystick.<span class="fn">getRawAxis</span>(<span class="num">1</span>));
    }

    <span class="cmt">// isFinished() not overridden — defaults to false, runs until interrupted by another command</span>
    <span class="cmt">// initialize() not overridden — nothing to set up for a continuous drive command</span>
    <span class="cmt">// end() not overridden — drive(0,0) gets called by the next command automatically</span>
}</pre>
</div>

<p>see how clean that is? you wrote exactly one method. the framework handles everything else. that's the power of abstract classes — WPILib designed a template where you only fill in the parts that are unique to your use case.</p>

<h3 class="sub">abstract vs concrete — when does a method have a body?</h3>

<p>here's the distinction laid out clearly:</p>

<table>
<thead><tr><th>Method type</th><th>Has a body?</th><th>Can subclass override it?</th><th>Must subclass implement it?</th></tr></thead>
<tbody>
<tr><td>abstract method</td><td>No — declaration only</td><td>N/A, must implement it</td><td>Yes — compile error if not</td></tr>
<tr><td>concrete method (in abstract class)</td><td>Yes — full implementation</td><td>Optionally, with @Override</td><td>No — use the default or override</td></tr>
<tr><td>concrete method (in regular class)</td><td>Yes</td><td>Optionally, with @Override</td><td>No</td></tr>
</tbody>
</table>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">abstract class</div><div class="cc-title">The template / form</div><div class="cc-desc">Has some implemented concrete methods and some abstract (blank) ones. Can't be instantiated directly — must be extended first.</div></div>
  <div class="concept-card"><div class="cc-label">abstract method</div><div class="cc-title">A mandatory blank</div><div class="cc-desc">No body. Just a declaration. Non-abstract subclasses MUST provide a full implementation or they can't compile.</div></div>
  <div class="concept-card"><div class="cc-label">concrete method</div><div class="cc-title">A pre-filled field</div><div class="cc-desc">Has an actual implementation. Subclasses inherit it for free and can optionally override it with their own version.</div></div>
  <div class="concept-card"><div class="cc-label">new Command() = error</div><div class="cc-title">Can't instantiate abstract</div><div class="cc-desc">Abstract classes have unfilled blanks. Creating one directly would produce an object with missing behavior. Extend it and fill the blanks first.</div></div>
</div>

<h3 class="sub">Topic 2 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Abstract Robot Action</div><div class="ch-sub">Build an abstract base class, then make two concrete actions</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Create an abstract class <code>RobotAction</code> with: an abstract method <code>String getDescription()</code> (returns a description of the action), an abstract method <code>boolean isDone()</code> (returns whether the action is complete), and a concrete method <code>void printStatus()</code> that prints "Action: [getDescription()] | Done: [isDone()]". Then create two concrete subclasses: <code>DriveForward</code> (description: "Driving forward", isDone: always returns false) and <code>StopAll</code> (description: "Stopping all motors", isDone: always returns true). Create one of each and call <code>printStatus()</code>.</p>
    <textarea class="code-input" placeholder="// Write your code here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w6-t2')">Show Solution</button></div>
    <div id="sol-w6-t2" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public abstract class</span> <span class="cls">RobotAction</span> {

    <span class="cmt">// abstract — every subclass must implement these two</span>
    <span class="kw">public abstract</span> <span class="cls">String</span>  <span class="fn">getDescription</span>();
    <span class="kw">public abstract boolean</span> <span class="fn">isDone</span>();

    <span class="cmt">// concrete — shared across all subclasses, uses abstract methods</span>
    <span class="kw">public void</span> <span class="fn">printStatus</span>() {
        System.out.<span class="fn">println</span>(<span class="str">"Action: "</span> + <span class="fn">getDescription</span>() + <span class="str">" | Done: "</span> + <span class="fn">isDone</span>());
    }
}

<span class="kw">public class</span> <span class="cls">DriveForward</span> <span class="kw">extends</span> <span class="cls">RobotAction</span> {
    <span class="kw">@Override</span>
    <span class="kw">public</span> <span class="cls">String</span> <span class="fn">getDescription</span>() { <span class="kw">return</span> <span class="str">"Driving forward"</span>; }

    <span class="kw">@Override</span>
    <span class="kw">public boolean</span> <span class="fn">isDone</span>() { <span class="kw">return</span> <span class="num">false</span>; }   <span class="cmt">// runs continuously</span>
}

<span class="kw">public class</span> <span class="cls">StopAll</span> <span class="kw">extends</span> <span class="cls">RobotAction</span> {
    <span class="kw">@Override</span>
    <span class="kw">public</span> <span class="cls">String</span> <span class="fn">getDescription</span>() { <span class="kw">return</span> <span class="str">"Stopping all motors"</span>; }

    <span class="kw">@Override</span>
    <span class="kw">public boolean</span> <span class="fn">isDone</span>() { <span class="kw">return</span> <span class="num">true</span>; }   <span class="cmt">// finishes immediately</span>
}

<span class="cmt">// Using them:</span>
<span class="cls">DriveForward</span> df = <span class="kw">new</span> <span class="fn">DriveForward</span>();
<span class="cls">StopAll</span>      sa = <span class="kw">new</span> <span class="fn">StopAll</span>();

df.<span class="fn">printStatus</span>();  <span class="cmt">// "Action: Driving forward | Done: false"</span>
sa.<span class="fn">printStatus</span>();  <span class="cmt">// "Action: Stopping all motors | Done: true"</span></pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 2 — Quick Check</h3>
<div id="quiz-w6-t2"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-3">Interfaces</h2>

<p>now here's where it gets interesting. inheritance is great, but it has one hard limit: a class can only extend ONE parent. if DriveSubsystem already extends SubsystemBase, it can't also extend some other class for logging, or some other class for tuning. you're stuck with one parent.</p>

<p>interfaces solve this. they let you layer in extra "capabilities" on top of whatever class hierarchy you already have, without the single-inheritance restriction.</p>

<h3 class="sub">what even IS an interface?</h3>

<p>think of a job posting. the posting says "to get this job, you must be able to: write code, do code reviews, and attend stand-up meetings." it doesn't tell you HOW to write code or what your code review process looks like. it just says you MUST be able to do those things. you sign the offer letter, you're promising to fulfill that contract.</p>

<p>an interface is exactly that. it's a list of method signatures (names, parameters, return types) with NO implementations. any class that says <code>implements MyInterface</code> is making a legal promise: "i will provide all of these methods." Java enforces this promise at compile time.</p>

<p>the critical difference from abstract classes: interfaces define what a class <em>can do</em> (capabilities), not what it <em>is</em> (identity). <code>Loggable</code> is a capability. <code>SubsystemBase</code> is an identity. <code>Stoppable</code> is a capability. <code>Command</code> is an identity.</p>

<div class="callout info"><p><strong>why does it matter in FRC?</strong> you can only extend one parent, but your subsystem might need to do multiple things that don't come from SubsystemBase. it might need to be loggable (send data to a custom logger). it might need to be stoppable (emergency stop behavior). it might need to be tunable (adjustable PID gains from dashboard). interfaces let you layer all of those capabilities onto a class that already has a parent.</p></div>

<h3 class="sub">defining and implementing an interface</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — a simple Loggable interface</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// Interface definition — just a contract, no bodies, no fields</span>
<span class="kw">public interface</span> <span class="cls">Loggable</span> {
    <span class="cls">String</span> <span class="fn">getLogData</span>();   <span class="cmt">// no body — any Loggable MUST implement this</span>
}

<span class="cmt">// A class that extends AND implements at the same time</span>
<span class="kw">public class</span> <span class="cls">DriveSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> <span class="kw">implements</span> <span class="cls">Loggable</span> {

    <span class="kw">private</span> <span class="type">double</span> m_leftSpeed  = <span class="num">0.0</span>;
    <span class="kw">private</span> <span class="type">double</span> m_rightSpeed = <span class="num">0.0</span>;

    <span class="cmt">// must implement getLogData() — Loggable contract requires it</span>
    <span class="kw">@Override</span>
    <span class="kw">public</span> <span class="cls">String</span> <span class="fn">getLogData</span>() {
        <span class="kw">return</span> <span class="str">"Left: "</span> + m_leftSpeed + <span class="str">" Right: "</span> + m_rightSpeed;
    }

    <span class="cmt">// still overrides periodic() from SubsystemBase like normal</span>
    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">periodic</span>() {
        System.out.<span class="fn">println</span>(<span class="fn">getLogData</span>());   <span class="cmt">// use our own Loggable method in periodic</span>
    }
}</pre>
</div>

<p>the key word is <code>implements</code> — not <code>extends</code>. you <em>extend</em> a class (there's one parent). you <em>implement</em> an interface (you can have as many as you want). the order in the class signature is always: <code>extends</code> first, then <code>implements</code>.</p>

<h3 class="sub">implementing multiple interfaces — this is the big deal</h3>

<p>here's where interfaces really shine over abstract classes. a class can implement as many interfaces as it wants, separated by commas:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — stacking multiple interfaces</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// Two separate interfaces — separate capabilities</span>
<span class="kw">public interface</span> <span class="cls">Loggable</span> {
    <span class="cls">String</span> <span class="fn">getLogData</span>();   <span class="cmt">// "i can describe my own state"</span>
}

<span class="kw">public interface</span> <span class="cls">Stoppable</span> {
    <span class="kw">void</span> <span class="fn">stop</span>();   <span class="cmt">// "i have an emergency stop"</span>
}

<span class="cmt">// extends ONE class, implements MULTIPLE interfaces</span>
<span class="kw">public class</span> <span class="cls">DriveSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> <span class="kw">implements</span> <span class="cls">Loggable</span>, <span class="cls">Stoppable</span> {

    <span class="kw">private</span> <span class="type">double</span> m_leftSpeed  = <span class="num">0.0</span>;
    <span class="kw">private</span> <span class="type">double</span> m_rightSpeed = <span class="num">0.0</span>;

    <span class="kw">@Override</span>
    <span class="kw">public</span> <span class="cls">String</span> <span class="fn">getLogData</span>() {
        <span class="kw">return</span> <span class="str">"Drive — L: "</span> + m_leftSpeed + <span class="str">" R: "</span> + m_rightSpeed;
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">stop</span>() {
        m_leftSpeed  = <span class="num">0.0</span>;
        m_rightSpeed = <span class="num">0.0</span>;
        <span class="cmt">// in real code: set TalonFX outputs to 0.0</span>
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">periodic</span>() { <span class="cmt">/* normal periodic logic */</span> }
}

<span class="cmt">// ShooterSubsystem can implement the same interfaces independently</span>
<span class="kw">public class</span> <span class="cls">ShooterSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> <span class="kw">implements</span> <span class="cls">Loggable</span>, <span class="cls">Stoppable</span> {

    <span class="kw">private</span> <span class="type">double</span> m_flywheelSpeed = <span class="num">0.0</span>;

    <span class="kw">@Override</span>
    <span class="kw">public</span> <span class="cls">String</span> <span class="fn">getLogData</span>() {
        <span class="kw">return</span> <span class="str">"Shooter — flywheel: "</span> + m_flywheelSpeed;   <span class="cmt">// different data, same contract</span>
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">stop</span>() {
        m_flywheelSpeed = <span class="num">0.0</span>;
    }
}</pre>
</div>

<p>both DriveSubsystem and ShooterSubsystem implement Loggable and Stoppable — but each one provides its OWN implementation of those methods. the contract is the same ("you must have <code>getLogData()</code> and <code>stop()</code>"), but the behavior is completely different per class. this is polymorphism working through interfaces.</p>

<h3 class="sub">using interfaces as types — the real power move</h3>

<p>here's the part that makes interfaces really powerful in practice. because every Loggable class is guaranteed to have <code>getLogData()</code>, you can write code that accepts ANY Loggable and calls that method without knowing what the actual class is:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — coding to interfaces, not specific classes</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// This logger works with ANY class that implements Loggable</span>
<span class="cmt">// it doesn't know or care if it's a DriveSubsystem or a ShooterSubsystem</span>
<span class="kw">public class</span> <span class="cls">RobotLogger</span> {
    <span class="kw">public void</span> <span class="fn">log</span>(<span class="cls">Loggable</span> target) {
        System.out.<span class="fn">println</span>(<span class="str">"[LOG] "</span> + target.<span class="fn">getLogData</span>());
    }
}

<span class="cmt">// And you'd use it like this:</span>
<span class="cls">RobotLogger</span>      logger = <span class="kw">new</span> <span class="fn">RobotLogger</span>();
<span class="cls">DriveSubsystem</span>   drive  = <span class="kw">new</span> <span class="fn">DriveSubsystem</span>();
<span class="cls">ShooterSubsystem</span> shoot  = <span class="kw">new</span> <span class="fn">ShooterSubsystem</span>();

logger.<span class="fn">log</span>(drive);   <span class="cmt">// "Drive — L: 0.0 R: 0.0"</span>
logger.<span class="fn">log</span>(shoot);   <span class="cmt">// "Shooter — flywheel: 0.0"</span>

<span class="cmt">// Same method call, different behavior based on the actual object type</span>
<span class="cmt">// the log() method doesn't need to know which type it is — that's the whole point</span></pre>
</div>

<h3 class="sub">FRC: the Sendable interface</h3>

<p>here's a real interface from WPILib that your code already uses: <code>Sendable</code>. any class that implements <code>Sendable</code> can send its data to Shuffleboard (the dashboard running on the driver station laptop). you implement <code>initSendable()</code> and WPILib handles polling your data and displaying it automatically.</p>

<p>here's the cool part: <code>SubsystemBase</code> already implements <code>Sendable</code>. so when you extend SubsystemBase, your subsystem inherits Sendable behavior too. that's why your subsystems show up on Shuffleboard without you having to do any extra work. it's inheritance and interfaces both working together at the same time.</p>

<p>WPILib also has interfaces like <code>MotorController</code> (a contract for anything that controls a motor — TalonFX, SparkMax, etc.), and <code>Encoder</code>. writing code against those interfaces means your code works with any hardware that implements the contract, not just one specific brand of motor controller.</p>

<h3 class="sub">interface vs abstract class — the comparison table</h3>

<p>this is the question everyone asks once they've seen both. here's the clear breakdown:</p>

<table>
<thead><tr><th></th><th>Abstract Class</th><th>Interface</th></tr></thead>
<tbody>
<tr><td>Can have fields?</td><td>Yes — instance variables allowed</td><td>No — no instance variables (only constants)</td></tr>
<tr><td>Can have concrete methods?</td><td>Yes</td><td>Yes, with <code>default</code> keyword (Java 8+)</td></tr>
<tr><td>Can have abstract methods?</td><td>Yes</td><td>All methods are abstract by default</td></tr>
<tr><td>How many can a class use?</td><td>One (single inheritance)</td><td>As many as you want</td></tr>
<tr><td>Keyword used by child</td><td><code>extends</code></td><td><code>implements</code></td></tr>
<tr><td>Best for</td><td>"IS-A" relationships, shared state</td><td>"CAN-DO" capabilities, multiple contracts</td></tr>
<tr><td>WPILib example</td><td>SubsystemBase, Command</td><td>Sendable, MotorController</td></tr>
</tbody>
</table>

<div class="callout tip"><p><strong>quick rule:</strong> if it's a capability ("can do X"), use an interface. if it's an identity ("is a type of Y"), use an abstract class or regular class. <code>Loggable</code> is a capability — interface. <code>SubsystemBase</code> is an identity — abstract class. <code>Sendable</code> is a capability — interface. <code>Command</code> is an identity — abstract class. if you're still not sure, ask yourself: does this thing need shared state (fields)? if yes, abstract class. if no, probably interface.</p></div>

<h3 class="sub">the interface gotcha — no instance variables</h3>

<p>this is the one thing that bites people when they first try to write interfaces: you cannot put instance variables (regular fields) in an interface. only constants (public static final) are allowed.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — what's allowed in an interface</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public interface</span> <span class="cls">Loggable</span> {

    <span class="cmt">// constants are fine — public static final is implied</span>
    <span class="type">int</span> kMaxLogLength = <span class="num">256</span>;   <span class="cmt">// implicitly public static final</span>

    <span class="cmt">// abstract method — fine, this is what interfaces are for</span>
    <span class="cls">String</span> <span class="fn">getLogData</span>();

    <span class="cmt">// default method (Java 8+) — provides a default implementation</span>
    <span class="kw">default void</span> <span class="fn">printLog</span>() {
        System.out.<span class="fn">println</span>(<span class="fn">getLogData</span>());
    }

    <span class="cmt">// THIS IS NOT ALLOWED — no instance variables in interfaces</span>
    <span class="cmt">// String m_name;   ← COMPILE ERROR</span>
    <span class="cmt">// int m_count = 0; ← COMPILE ERROR</span>
}</pre>
</div>

<p>the reason is conceptual: interfaces don't hold state. they define behavior. if you need shared state (fields), that's a sign you want an abstract class, not an interface. an interface just says "you must have these methods." what data you use to implement those methods is YOUR class's business, not the interface's.</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">interface</div><div class="cc-title">A contract / capability</div><div class="cc-desc">No instance fields, just method signatures. A class promises to implement all of them using the <code>implements</code> keyword.</div></div>
  <div class="concept-card"><div class="cc-label">implements</div><div class="cc-title">Sign the contract</div><div class="cc-desc">Use <code>implements</code> (not <code>extends</code>) to adopt an interface. You must implement every method the interface declares, or get a compile error.</div></div>
  <div class="concept-card"><div class="cc-label">multiple interfaces</div><div class="cc-title">Stack capabilities freely</div><div class="cc-desc">A class can implement as many interfaces as needed. <code>implements Loggable, Stoppable, Sendable</code> is totally valid. One parent, many contracts.</div></div>
  <div class="concept-card"><div class="cc-label">Sendable</div><div class="cc-title">WPILib real example</div><div class="cc-desc">Implementing <code>Sendable</code> lets a class push data to Shuffleboard. SubsystemBase already implements it, so your subsystems get this for free via inheritance.</div></div>
</div>

<h3 class="sub">Topic 3 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Multi-Capability Subsystem</div><div class="ch-sub">Combine inheritance + multiple interfaces like a real FRC class</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Define two interfaces: <code>Stoppable</code> (with method <code>void stop()</code>) and <code>Reportable</code> (with method <code>String getStatus()</code>). Then create a parent class <code>BaseSubsystem</code> with a private String <code>m_name</code>, a constructor, and a <code>getName()</code> getter. Finally create <code>IntakeSubsystem</code> that extends <code>BaseSubsystem</code> and implements both interfaces. Give it a boolean field <code>m_running</code>, a method <code>run()</code> that sets it to true, and implement <code>stop()</code> (sets to false) and <code>getStatus()</code> (returns "Intake [name]: running=[value]"). Create one, call run(), then print status, then stop and print again.</p>
    <textarea class="code-input" placeholder="// Write your code here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w6-t3')">Show Solution</button></div>
    <div id="sol-w6-t3" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public interface</span> <span class="cls">Stoppable</span> {
    <span class="kw">void</span> <span class="fn">stop</span>();
}

<span class="kw">public interface</span> <span class="cls">Reportable</span> {
    <span class="cls">String</span> <span class="fn">getStatus</span>();
}

<span class="kw">public class</span> <span class="cls">BaseSubsystem</span> {
    <span class="kw">private</span> <span class="cls">String</span> m_name;

    <span class="kw">public</span> <span class="fn">BaseSubsystem</span>(<span class="cls">String</span> name) { m_name = name; }
    <span class="kw">public</span> <span class="cls">String</span> <span class="fn">getName</span>()            { <span class="kw">return</span> m_name; }
}

<span class="cmt">// extends one class, implements two interfaces</span>
<span class="kw">public class</span> <span class="cls">IntakeSubsystem</span> <span class="kw">extends</span> <span class="cls">BaseSubsystem</span> <span class="kw">implements</span> <span class="cls">Stoppable</span>, <span class="cls">Reportable</span> {

    <span class="kw">private boolean</span> m_running = <span class="num">false</span>;

    <span class="kw">public</span> <span class="fn">IntakeSubsystem</span>() {
        <span class="kw">super</span>(<span class="str">"Intake"</span>);
    }

    <span class="kw">public void</span> <span class="fn">run</span>()  { m_running = <span class="num">true</span>;  }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">stop</span>() { m_running = <span class="num">false</span>; }

    <span class="kw">@Override</span>
    <span class="kw">public</span> <span class="cls">String</span> <span class="fn">getStatus</span>() {
        <span class="kw">return</span> <span class="str">"Intake "</span> + <span class="fn">getName</span>() + <span class="str">": running="</span> + m_running;
    }
}

<span class="cmt">// Testing it out:</span>
<span class="cls">IntakeSubsystem</span> intake = <span class="kw">new</span> <span class="fn">IntakeSubsystem</span>();
intake.<span class="fn">run</span>();
System.out.<span class="fn">println</span>(intake.<span class="fn">getStatus</span>());   <span class="cmt">// "Intake Intake: running=true"</span>
intake.<span class="fn">stop</span>();
System.out.<span class="fn">println</span>(intake.<span class="fn">getStatus</span>());   <span class="cmt">// "Intake Intake: running=false"</span></pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 3 — Quick Check</h3>
<div id="quiz-w6-t3"></div>

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
const quiz_w6_t1 = new Quiz('quiz-w6-t1', [
  { question: "What does <code>extends</code> do in Java?", options: ["Imports a class from another file","Makes a child class inherit all public/protected methods and fields from a parent class","Creates a copy of the parent class with different data","Prevents the child from adding new methods"], correct: 1, explanation: "extends sets up inheritance. The child class gets all public and protected methods and fields from the parent for free. It can add its own on top and override existing ones with @Override." },
  { question: "Why should you use <code>@Override</code> when overriding a method?", options: ["It makes the method run faster","It's required — the override won't work without it","It tells Java you're intentionally replacing a parent method and gives a compile error if the parent method name doesn't exist — catching typos","It prevents the parent's version from ever running again"], correct: 2, explanation: "@Override is a safety annotation. Without it, a typo in the method name silently creates a new method that nobody calls. With it, Java checks the parent has a matching method and errors immediately if not. Always use it." },
  { question: "In a child constructor, where must <code>super()</code> be placed?", options: ["After all field assignments","Anywhere in the constructor body","As the very first statement — Java requires the parent to be set up before the child","It's never required if the parent has a no-argument constructor"], correct: 2, explanation: "super() must be the very first line. Java needs to fully construct the parent part before the child adds its own fields. Any other position gives a compile error." },
  { question: "Which situation passes the 'is-a' test and warrants using inheritance?", options: ["Motor is-a SubsystemBase","Constants is-a Robot","DriveSubsystem is-a SubsystemBase","RobotLogger is-a Timer"], correct: 2, explanation: "DriveSubsystem IS-A SubsystemBase — it's a specific kind of subsystem. That's a valid is-a relationship. A Motor is something a subsystem HAS (use a field). Constants and Timer have no meaningful is-a relationship." }
], 'summer-w6');

const quiz_w6_t2 = new Quiz('quiz-w6-t2', [
  { question: "Can you do <code>new Shape()</code> if Shape is declared as <code>abstract class Shape</code>?", options: ["Yes — abstract classes are just regular classes with extra methods","No — abstract classes cannot be instantiated directly","Only if you pass all required arguments to the constructor","Only if Shape has no abstract methods"], correct: 1, explanation: "Abstract classes cannot be instantiated. They have abstract methods with no body — you'd get an object with missing behavior. You must extend the abstract class in a concrete subclass that fills in all the abstract methods first." },
  { question: "What is an abstract method?", options: ["A method with the private modifier so only the class can use it","A method with no body — just a declaration that any non-abstract subclass must implement","A method that runs automatically without being called","A method inherited from Object"], correct: 1, explanation: "Abstract methods have no body at all — just the return type, name, and parameters. Any non-abstract subclass MUST provide a full implementation or Java will refuse to compile." },
  { question: "What happens if a subclass extends an abstract class but doesn't implement all the abstract methods?", options: ["The missing methods default to doing nothing","The subclass compiles but crashes at runtime when those methods are called","The subclass becomes abstract too and cannot be instantiated — compile error if you try","Java automatically generates default implementations"], correct: 2, explanation: "If a subclass doesn't implement all abstract methods from its parent, it too becomes abstract (even without the keyword). Java will give you a compile error if you try to instantiate it, listing exactly which methods you forgot." },
  { question: "In the WPILib Command pattern, what does it mean that Command has concrete methods with default empty bodies?", options: ["Those methods will throw exceptions if you call them","You MUST override all of them or your command won't work","You can choose which ones to override — you only need to write the methods that matter for your specific command","They run automatically and cannot be overridden"] , correct: 2, explanation: "Command provides defaults for initialize(), execute(), end(), and isFinished(). You only override the ones you actually need. A continuous drive command might only override execute(). A timed command might also override isFinished(). This is the template pattern — fill in only the blanks that matter." }
], 'summer-w6');

const quiz_w6_t3 = new Quiz('quiz-w6-t3', [
  { question: "A class already extends SubsystemBase. It also needs to be Loggable and Stoppable. What's the correct syntax?", options: ["extends SubsystemBase, Loggable, Stoppable","extends SubsystemBase implements Loggable implements Stoppable","extends SubsystemBase implements Loggable, Stoppable","implements Loggable, Stoppable extends SubsystemBase"], correct: 2, explanation: "The correct order is extends first, then implements, with multiple interfaces comma-separated. 'class Foo extends SubsystemBase implements Loggable, Stoppable' is the proper Java syntax." },
  { question: "Can an interface have instance variables (fields like 'int m_count')?", options: ["Yes — interfaces work exactly like abstract classes","No — interfaces can only have constants (public static final) and method signatures","Yes, but only if they're private","Yes, if the interface also has a constructor"], correct: 1, explanation: "Interfaces cannot have instance variables. They define behavior (method signatures), not state. Only constants (public static final) are allowed. If you need shared state, that's a sign you want an abstract class instead." },
  { question: "How many interfaces can a single class implement?", options: ["One — same restriction as extends","Two — one parent class and one interface","As many as it needs, comma-separated after implements","Three maximum"], correct: 2, explanation: "A class can implement as many interfaces as it wants. There's no limit. This is the key advantage over abstract classes — you get multiple capability contracts without the single-inheritance restriction." },
  { question: "Which keyword is used when a class adopts an interface?", options: ["extends","inherits","implements","uses"], correct: 2, explanation: "You use 'implements' for interfaces, not 'extends'. You extend classes, you implement interfaces. The distinction matters because a class can only extend one thing but can implement many." }
], 'summer-w6');

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
