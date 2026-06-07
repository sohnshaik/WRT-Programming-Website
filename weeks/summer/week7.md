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
  - Fill in the Blanks
  - Knowledge Check
  - Coding Challenge
  - Project Task
prev_url: /weeks/summer/week6
prev_title: "Week 6 — Inheritance & Polymorphism"
next_url: /weeks/summer/week8
next_title: "Week 8 — Recap & Resources"
---

<h2 class="sh" id="topic-1">Enums</h2>

<div class="callout danger"><p><strong>we use enums constantly on 2974.</strong> robot states, game piece types (whatever object robots pick up and score in that year's FRC game), scoring positions, arm positions — all enums. if you forget this week, you won't be able to read our codebase. ngl this is one of the most important weeks.</p></div>

<p>before we get into syntax, let's talk about the problem enums solve, because the "why" here is way more important than the "how."</p>

<h3 class="sub">what even IS an enum?</h3>

<p>imagine you're at a restaurant. you can't just walk up to the counter and say "i want a unicorn steak with a side of moon rocks." you have to order from the menu. the menu is a fixed list of valid options — you pick one of those, nothing else. an enum is the menu. you define the exact options upfront, and Java will <em>only</em> allow those options. nothing else compiles. nothing else runs.</p>

<p>that sounds limiting, but it's the entire point. before enums existed, people tracked robot state with strings or integers. string "TELEOP" works great — until someone types "Teleop" (capital T) or "TELE0P" (zero instead of an O). Java doesn't catch either of those. the robot just behaves wrong and you spend an hour debugging a typo. an integer 0 for disabled, 1 for teleop, 2 for auto works great — until someone passes 7 and you have no idea what that means. enum fixes all of this: only the exact declared values are valid, and the <em>compiler</em> checks it, not you at runtime.</p>

<p><strong>why does it matter in FRC?</strong> arm positions, drivetrain modes, game piece types, scoring locations, LED states — all of these are "pick from a list" problems. the codebase uses enums for basically all of them. if you see a field declared as <code>ArmState m_state</code> in a WRT subsystem, that's an enum. if you see a switch statement checking <code>m_state</code>, that's an enum. this is the most foundational pattern in how we structure behavior.</p>

<div class="callout warning"><p><strong>the String problem in detail:</strong> say you track robot mode with <code>String m_mode = "TELEOP"</code>. three weeks later, your teammate writes a condition: <code>if (m_mode == "Teleop")</code> — different capitalization. Java won't warn you. the condition is always false. the robot runs teleop code but your condition never triggers. good luck finding that bug at midnight before a competition. enum makes this literally impossible to compile.</p></div>

<h3 class="sub">declaring an enum</h3>

<p>you use the <code>enum</code> keyword instead of <code>class</code>. the values inside are written in SCREAMING_SNAKE_CASE by convention — they're constants, so they get the constant treatment. the name of the enum follows PascalCase like any other type.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// declare the enum — like a class but for a fixed set of values</span>
<span class="kw">public enum</span> <span class="cls">RobotState</span> {
    DISABLED, TELEOP, AUTO, TEST
}

<span class="cmt">// using it — type is RobotState, value must be one of the four</span>
<span class="cls">RobotState</span> state = <span class="cls">RobotState</span>.TELEOP;

<span class="cmt">// comparing with == — no .equals() needed for enums!</span>
<span class="kw">if</span> (state == <span class="cls">RobotState</span>.TELEOP) {
    System.out.<span class="fn">println</span>(<span class="str">"running teleop"</span>);
}

<span class="cmt">// this won't even compile — that's the whole point</span>
<span class="cmt">// RobotState bad = "TELEOP";   &lt;-- compile error, good!</span>
<span class="cmt">// RobotState bad = 1;          &lt;-- compile error, also good!</span></pre>
</div>

<div class="callout info"><p><strong>why SCREAMING_SNAKE_CASE?</strong> enum values are implicitly <code>static final</code> constants — they're created once and never change. Java convention says constants should be all caps with underscores. so <code>INTAKE_POSITION</code>, <code>SCORE_HIGH</code>, <code>FIELD_RELATIVE</code> — not <code>intakePosition</code> or <code>scoreHigh</code>. it visually signals "this is a fixed constant, not a variable."</p></div>

<h3 class="sub">enums + switch statements (this combo is chef's kiss)</h3>

<p>enums and switch statements are designed for each other. you switch on the enum value, and Java can warn you if you miss a case — it knows exactly how many possible values the enum has. compare that to switching on a string or integer where the compiler has no idea how many valid values exist.</p>

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

<div class="callout tip"><p><strong>key syntax detail:</strong> inside the switch you just write <code>case TELEOP</code>, not <code>case RobotState.TELEOP</code>. Java already knows the type from the switch expression — the enum name is redundant and leaving it out is correct style. outside a switch, you always need the full <code>RobotState.TELEOP</code>.</p></div>

<h3 class="sub">the "just use a String" gotcha (don't do this)</h3>

<p>this is a mistake beginners make when they think "eh, what's the difference, a string works fine." let's show exactly what goes wrong. here's the fragile string version versus the correct enum version side by side:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — BAD: string-based state (fragile)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// BAD: nothing stops invalid values from getting in</span>
<span class="kw">private</span> <span class="cls">String</span> m_mode = <span class="str">"IDLE"</span>;

<span class="kw">public void</span> <span class="fn">setMode</span>(<span class="cls">String</span> mode) {
    m_mode = mode; <span class="cmt">// what if someone passes "idle"? or "IDEL"? or "auto "?</span>
                   <span class="cmt">// no error, no warning. silent bug.</span>
}

<span class="kw">if</span> (m_mode == <span class="str">"TELEOP"</span>) { <span class="cmt">// comparing strings with == is wrong anyway</span>
    <span class="fn">runTeleop</span>();           <span class="cmt">// this might never run even if mode IS "TELEOP"</span>
}</pre>
</div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — GOOD: enum-based state (safe)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// GOOD: the compiler enforces every value</span>
<span class="kw">public enum</span> <span class="cls">Mode</span> { IDLE, TELEOP, AUTO, DISABLED }

<span class="kw">private</span> <span class="cls">Mode</span> m_mode = <span class="cls">Mode</span>.IDLE;

<span class="kw">public void</span> <span class="fn">setMode</span>(<span class="cls">Mode</span> mode) {
    m_mode = mode; <span class="cmt">// only valid Mode values can be passed — period</span>
}

<span class="kw">if</span> (m_mode == <span class="cls">Mode</span>.TELEOP) { <span class="cmt">// == works correctly for enums</span>
    <span class="fn">runTeleop</span>();
}</pre>
</div>

<h3 class="sub">enums can have methods</h3>

<p>this is where enums get really interesting — they're actually full classes under the hood. you can add fields, constructors, and methods to them. the most common pattern is a boolean helper method directly on the enum itself, so the logic lives right where the values are defined.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public enum</span> <span class="cls">RobotState</span> {
    DISABLED, TELEOP, AUTO, TEST;  <span class="cmt">// semicolon required when you add methods</span>

    <span class="cmt">// helper method — call as state.isActive()</span>
    <span class="kw">public boolean</span> <span class="fn">isActive</span>() {
        <span class="kw">return this</span> == TELEOP || <span class="kw">this</span> == AUTO || <span class="kw">this</span> == TEST;
    }

    <span class="cmt">// another useful pattern: human-readable label for logging</span>
    <span class="kw">public</span> <span class="cls">String</span> <span class="fn">getLabel</span>() {
        <span class="kw">switch</span> (<span class="kw">this</span>) {
            <span class="kw">case</span> TELEOP:   <span class="kw">return</span> <span class="str">"Teleop"</span>;
            <span class="kw">case</span> AUTO:     <span class="kw">return</span> <span class="str">"Autonomous"</span>;
            <span class="kw">case</span> DISABLED: <span class="kw">return</span> <span class="str">"Disabled"</span>;
            <span class="kw">default</span>:       <span class="kw">return</span> <span class="str">"Test"</span>;
        }
    }
}

<span class="cmt">// usage</span>
<span class="cls">RobotState</span> state = <span class="cls">RobotState</span>.TELEOP;
<span class="kw">if</span> (state.<span class="fn">isActive</span>()) {
    System.out.<span class="fn">println</span>(<span class="str">"Robot is running: "</span> + state.<span class="fn">getLabel</span>()); <span class="cmt">// "Robot is running: Teleop"</span>
}</pre>
</div>

<h3 class="sub">enums in FRC — the WRT state machine pattern</h3>

<p>on 2974, enums power our state machines (a state machine tracks what "mode" the robot is in — like INTAKING, SHOOTING, or IDLE — and behaves differently in each). a subsystem has a "current state" (stored as an enum field), and the periodic loop checks that state and runs the right code. this replaces spaghetti if/else chains with a clean, readable, extensible pattern. when we need to add a new state, we add one value to the enum — we don't hunt through a chain of conditions trying to figure out where to insert a new branch.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — simplified WRT pattern</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public enum</span> <span class="cls">ArmState</span> {
    STOWED, INTAKING, SCORING, CLIMBING
}

<span class="kw">public class</span> <span class="cls">ArmSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> {

    <span class="cmt">// current state lives as a field — m_ prefix because it's a member var</span>
    <span class="kw">private</span> <span class="cls">ArmState</span> m_state = <span class="cls">ArmState</span>.STOWED;

    <span class="cmt">// command calls this to request a state change</span>
    <span class="kw">public void</span> <span class="fn">setState</span>(<span class="cls">ArmState</span> newState) {
        m_state = newState;
    }

    <span class="cmt">// runs every 20ms — switch drives all behavior</span>
    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">periodic</span>() {
        <span class="kw">switch</span> (m_state) {
            <span class="kw">case</span> INTAKING:  <span class="fn">moveToIntakePos</span>();  <span class="kw">break</span>;
            <span class="kw">case</span> SCORING:   <span class="fn">moveToScorePos</span>();   <span class="kw">break</span>;
            <span class="kw">case</span> CLIMBING:  <span class="fn">moveToClimbPos</span>();   <span class="kw">break</span>;
            <span class="kw">default</span>:        <span class="fn">holdPosition</span>();     <span class="cmt">// STOWED — hold where we are</span>
        }
    }

    <span class="cmt">// expose state for other subsystems or dashboard</span>
    <span class="kw">public</span> <span class="cls">ArmState</span> <span class="fn">getState</span>() { <span class="kw">return</span> m_state; }
}</pre>
</div>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">type safety</div><div class="cc-title">Compiler-enforced values</div><div class="cc-desc">Only the defined enum values are valid. typos become compile errors instead of silent runtime bugs.</div></div>
  <div class="concept-card"><div class="cc-label">readability</div><div class="cc-title">Self-documenting code</div><div class="cc-desc"><code>ArmState.SCORING</code> is way clearer than <code>2</code> or <code>"scoring"</code>. anyone reading the code instantly knows what it means.</div></div>
  <div class="concept-card"><div class="cc-label">switch</div><div class="cc-title">Perfect switch companion</div><div class="cc-desc">switch on an enum covers every possible value. the compiler warns you if you miss a case.</div></div>
  <div class="concept-card"><div class="cc-label">methods</div><div class="cc-title">Behavior on the enum</div><div class="cc-desc">you can add methods like <code>isActive()</code> directly to an enum. no separate helper class needed.</div></div>
</div>

<div class="callout tip"><p><strong>WRT convention:</strong> if you catch yourself writing <code>private String m_state = "IDLE"</code> in a subsystem, stop and refactor it to an enum. strings for state is a code smell we actively avoid. the PR reviewer will flag it every time.</p></div>

<h3 class="sub">Topic 1 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Shooter State Machine</div><div class="ch-sub">Model a shooter subsystem using an enum and switch</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Declare an enum called <code>ShooterState</code> with values: <code>IDLE</code>, <code>SPOOLING</code>, <code>READY</code>, <code>FIRING</code>. Then write a method <code>void runShooter(ShooterState state)</code> that uses a switch statement: IDLE stops the motor, SPOOLING runs it at 0.5, READY runs it at 0.9, FIRING runs it at full speed (1.0) and calls a <code>fire()</code> method. Add a helper method <code>boolean isSpinning(ShooterState state)</code> that returns true if the state is not IDLE.</p>
    <textarea class="code-input" placeholder="// Write your ShooterState enum and methods here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w7-t1')">Show Solution</button></div>
    <div id="sol-w7-t1" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public enum</span> <span class="cls">ShooterState</span> {
    IDLE, SPOOLING, READY, FIRING;

    <span class="cmt">// helper lives right on the enum — no separate utility needed</span>
    <span class="kw">public boolean</span> <span class="fn">isSpinning</span>() {
        <span class="kw">return this</span> != IDLE;
    }
}

<span class="kw">public void</span> <span class="fn">runShooter</span>(<span class="cls">ShooterState</span> state) {
    <span class="kw">switch</span> (state) {
        <span class="kw">case</span> IDLE:
            m_motor.<span class="fn">set</span>(<span class="num">0.0</span>);  <span class="cmt">// stop completely</span>
            <span class="kw">break</span>;
        <span class="kw">case</span> SPOOLING:
            m_motor.<span class="fn">set</span>(<span class="num">0.5</span>);  <span class="cmt">// spin up slowly</span>
            <span class="kw">break</span>;
        <span class="kw">case</span> READY:
            m_motor.<span class="fn">set</span>(<span class="num">0.9</span>);  <span class="cmt">// near full speed, waiting to fire</span>
            <span class="kw">break</span>;
        <span class="kw">case</span> FIRING:
            m_motor.<span class="fn">set</span>(<span class="num">1.0</span>);  <span class="cmt">// full blast</span>
            <span class="fn">fire</span>();             <span class="cmt">// activate the kicker/feeder</span>
            <span class="kw">break</span>;
    }
}

<span class="cmt">// usage example</span>
<span class="cls">ShooterState</span> current = <span class="cls">ShooterState</span>.READY;
<span class="kw">if</span> (current.<span class="fn">isSpinning</span>()) {
    System.out.<span class="fn">println</span>(<span class="str">"shooter is spinning"</span>); <span class="cmt">// prints — READY is not IDLE</span>
}</pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 1 — Quick Check</h3>
<div id="quiz-w7-t1"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-2">ArrayList</h2>

<p>you've used arrays before. you know the deal: declare the size upfront, access by index, done. but what happens when you don't know the size upfront? what if the size needs to change while the program is running? that's where <code>ArrayList</code> comes in.</p>

<h3 class="sub">what even IS an ArrayList?</h3>

<p>imagine a whiteboard where you write down a list of tasks. you can add new items at the bottom, erase items you finished, check if something is on the list — and the whiteboard is magic: it's as long as you need it to be. there's no "sorry, the whiteboard is full" — it just grows. that's an ArrayList.</p>

<p>contrast that with a regular array. a regular array is like a row of fixed lockers — you bolt them to the wall at construction time and you're stuck with that count forever. need one more locker? too bad. have an empty one? it just sits there wasting space. if you know you need exactly N items and that will never change, an array is great. but as soon as the count might change, ArrayList wins.</p>

<p><strong>why does it matter in FRC?</strong> vision processing returns a variable number of detected targets — you might see 0, 1, or 5 game pieces and you don't know which until the camera tells you. a list of queued commands is dynamic — new commands get added and completed commands get removed. error logs, telemetry history, active subsystems — all of these have counts that change at runtime. that's ArrayList territory.</p>

<h3 class="sub">array vs ArrayList — the mental model</h3>

<p>here's a quick rule of thumb that covers most cases: use an array when you KNOW the size upfront and it will never change. use ArrayList when the size is dynamic or unknown at compile time. a few examples from FRC to make it concrete:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — when to use which</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// ARRAY: exactly 4 swerve modules (each of the 4 wheel assemblies on a swerve robot — each one can drive and steer independently), always exactly 4 — fixed forever</span>
<span class="type">int</span>[] kModuleCanIDs = {<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>}; <span class="cmt">// CAN ID — each motor on the robot needs a unique number so the code knows which one to talk to</span>

<span class="cmt">// ARRAYLIST: unknown number of vision targets — changes every frame</span>
<span class="cls">ArrayList</span>&lt;<span class="cls">String</span>&gt; detectedTargets = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();

<span class="cmt">// ARRAY: exactly 3 PID constants — fixed (kP = how aggressively to correct error, kI = correction for persistent error, kD = dampens overshooting)</span>
<span class="type">double</span>[] kPIDConstants = {<span class="num">0.5</span>, <span class="num">0.0</span>, <span class="num">0.1</span>};

<span class="cmt">// ARRAYLIST: log of recent state transitions — grows over time</span>
<span class="cls">ArrayList</span>&lt;<span class="cls">String</span>&gt; m_stateLog = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();</pre>
</div>

<h3 class="sub">importing and creating an ArrayList</h3>

<p>ArrayList lives in <code>java.util</code>, which is NOT automatically imported. you have to explicitly import it at the top of your file. then you create one with a type parameter in angle brackets — that type parameter says what kind of things this list holds.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// this import is REQUIRED — without it you get "cannot find symbol"</span>
<span class="kw">import</span> java.util.<span class="cls">ArrayList</span>;

<span class="cmt">// ArrayList&lt;String&gt; means "a list that holds Strings"</span>
<span class="cls">ArrayList</span>&lt;<span class="cls">String</span>&gt; names = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();

<span class="cmt">// the &lt;&gt; on the right is the diamond operator — Java infers the type</span>
<span class="cmt">// you could write new ArrayList&lt;String&gt;() but &lt;&gt; is cleaner and preferred</span>

<span class="cmt">// ArrayList of integers (note: Integer, not int — covered in topic 3)</span>
<span class="cls">ArrayList</span>&lt;<span class="cls">Integer</span>&gt; motorIDs = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();

<span class="cmt">// starting with some items — use add() after creation</span>
<span class="cls">ArrayList</span>&lt;<span class="cls">String</span>&gt; subsystems = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
subsystems.<span class="fn">add</span>(<span class="str">"Drivetrain"</span>);
subsystems.<span class="fn">add</span>(<span class="str">"Shooter"</span>);
subsystems.<span class="fn">add</span>(<span class="str">"Intake"</span>);</pre>
</div>

<div class="callout info"><p><strong>what's the &lt;String&gt; thing?</strong> that's called a <em>generic type parameter</em>. it tells Java what type of objects this list holds. think of it as labeling a box "only apples go in here." if you try to add an orange (Integer) to an apple box (ArrayList&lt;String&gt;), Java stops you at compile time. always specify the type. an untyped raw ArrayList is legal but a code smell.</p></div>

<h3 class="sub">the core methods — add, get, size, contains, remove, clear</h3>

<p>these six methods handle probably 90% of everything you'll do with an ArrayList. learn them cold:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cls">ArrayList</span>&lt;<span class="cls">String</span>&gt; subsystems = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();

<span class="cmt">// add() — appends to the end of the list</span>
subsystems.<span class="fn">add</span>(<span class="str">"Drivetrain"</span>);   <span class="cmt">// list: [Drivetrain]</span>
subsystems.<span class="fn">add</span>(<span class="str">"Shooter"</span>);      <span class="cmt">// list: [Drivetrain, Shooter]</span>
subsystems.<span class="fn">add</span>(<span class="str">"Intake"</span>);       <span class="cmt">// list: [Drivetrain, Shooter, Intake]</span>

<span class="cmt">// get() — access by index, zero-based just like arrays</span>
<span class="cls">String</span> first = subsystems.<span class="fn">get</span>(<span class="num">0</span>);  <span class="cmt">// "Drivetrain"</span>
<span class="cls">String</span> second = subsystems.<span class="fn">get</span>(<span class="num">1</span>); <span class="cmt">// "Shooter"</span>

<span class="cmt">// size() — how many elements are currently in the list</span>
<span class="type">int</span> count = subsystems.<span class="fn">size</span>();    <span class="cmt">// 3</span>

<span class="cmt">// contains() — checks if a value is in the list</span>
<span class="type">boolean</span> hasShooter = subsystems.<span class="fn">contains</span>(<span class="str">"Shooter"</span>); <span class="cmt">// true</span>
<span class="type">boolean</span> hasDrive   = subsystems.<span class="fn">contains</span>(<span class="str">"Climber"</span>); <span class="cmt">// false</span>

<span class="cmt">// remove(object) — removes the first matching element</span>
subsystems.<span class="fn">remove</span>(<span class="str">"Intake"</span>);     <span class="cmt">// list: [Drivetrain, Shooter]</span>
System.out.<span class="fn">println</span>(subsystems.<span class="fn">size</span>());      <span class="cmt">// 2</span>

<span class="cmt">// isEmpty() — true if list has zero elements</span>
System.out.<span class="fn">println</span>(subsystems.<span class="fn">isEmpty</span>());  <span class="cmt">// false</span>

<span class="cmt">// clear() — removes everything from the list</span>
subsystems.<span class="fn">clear</span>();
System.out.<span class="fn">println</span>(subsystems.<span class="fn">size</span>());      <span class="cmt">// 0</span>
System.out.<span class="fn">println</span>(subsystems.<span class="fn">isEmpty</span>());  <span class="cmt">// true</span></pre>
</div>

<h3 class="sub">iterating over an ArrayList with for-each</h3>

<p>the for-each loop works identically with ArrayList as it does with arrays. the syntax is the same, the behavior is the same. just plug the ArrayList in where you'd put the array:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cls">ArrayList</span>&lt;<span class="cls">String</span>&gt; subsystems = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
subsystems.<span class="fn">add</span>(<span class="str">"Drivetrain"</span>);
subsystems.<span class="fn">add</span>(<span class="str">"Shooter"</span>);
subsystems.<span class="fn">add</span>(<span class="str">"Intake"</span>);

<span class="cmt">// for-each: same as with arrays — element type, variable name, list</span>
<span class="kw">for</span> (<span class="cls">String</span> name : subsystems) {
    System.out.<span class="fn">println</span>(<span class="str">"active: "</span> + name);
}
<span class="cmt">// active: Drivetrain</span>
<span class="cmt">// active: Shooter</span>
<span class="cmt">// active: Intake</span>

<span class="cmt">// you can also use a regular index-based for loop if you need the index</span>
<span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i &lt; subsystems.<span class="fn">size</span>(); i++) {
    System.out.<span class="fn">println</span>(i + <span class="str">": "</span> + subsystems.<span class="fn">get</span>(i));
}
<span class="cmt">// 0: Drivetrain</span>
<span class="cmt">// 1: Shooter</span>
<span class="cmt">// 2: Intake</span></pre>
</div>

<h3 class="sub">the remove-by-index vs remove-by-value gotcha (this WILL bite you)</h3>

<p>ok here's a subtle one. <code>remove()</code> is overloaded: you can call it with a value to remove (like <code>remove("Intake")</code>) or with an index to remove (like <code>remove(2)</code>). for an ArrayList of Strings, this is fine. but for an <code>ArrayList&lt;Integer&gt;</code>, there's a trap: Java will prefer the index version if you pass a plain <code>int</code>.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — dangerous with Integer lists</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cls">ArrayList</span>&lt;<span class="cls">Integer</span>&gt; ids = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
ids.<span class="fn">add</span>(<span class="num">10</span>);
ids.<span class="fn">add</span>(<span class="num">20</span>);
ids.<span class="fn">add</span>(<span class="num">30</span>);

<span class="cmt">// this removes the element AT INDEX 1 (which is 20), not the value 1!</span>
ids.<span class="fn">remove</span>(<span class="num">1</span>); <span class="cmt">// list is now [10, 30] — might not be what you wanted</span>

<span class="cmt">// to remove the value 10 specifically, wrap it in Integer.valueOf()</span>
ids.<span class="fn">remove</span>(<span class="cls">Integer</span>.<span class="fn">valueOf</span>(<span class="num">10</span>)); <span class="cmt">// now removes the value 10, not index 10</span>

<span class="cmt">// for String lists this isn't an issue because String != int</span>
<span class="cls">ArrayList</span>&lt;<span class="cls">String</span>&gt; names = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
names.<span class="fn">add</span>(<span class="str">"Alice"</span>);
names.<span class="fn">remove</span>(<span class="str">"Alice"</span>); <span class="cmt">// unambiguous: removes the value "Alice"</span></pre>
</div>

<div class="callout warning"><p><strong>common gotcha:</strong> <code>list.remove(1)</code> on an ArrayList&lt;Integer&gt; removes the element at index 1, NOT the element with value 1. to remove by value from an integer list, use <code>list.remove(Integer.valueOf(yourValue))</code>. this catches a lot of people off guard the first time.</p></div>

<h3 class="sub">array vs ArrayList — full feature comparison</h3>

<table>
<thead><tr><th>Feature</th><th>Array</th><th>ArrayList</th></tr></thead>
<tbody>
<tr><td>size</td><td>fixed forever at creation</td><td>grows and shrinks dynamically</td></tr>
<tr><td>types allowed</td><td>primitives + objects</td><td>objects only (use wrapper classes for primitives)</td></tr>
<tr><td>element access</td><td><code>arr[i]</code></td><td><code>list.get(i)</code></td></tr>
<tr><td>length/size</td><td><code>arr.length</code></td><td><code>list.size()</code></td></tr>
<tr><td>add element</td><td>not possible after creation</td><td><code>list.add(value)</code></td></tr>
<tr><td>remove element</td><td>not possible</td><td><code>list.remove(value)</code></td></tr>
<tr><td>check membership</td><td>must loop manually</td><td><code>list.contains(value)</code></td></tr>
<tr><td>use when</td><td>known, fixed size</td><td>dynamic or unknown size</td></tr>
</tbody>
</table>

<div class="callout info"><p><strong>FRC real talk:</strong> in WPILib code you'll often see arrays for things that are truly fixed — the four module positions, the three PID gains, the set of auton options. but for anything that gets built up over time (vision targets, active commands, logs), ArrayList is the right tool. both show up, so you need to be comfortable with both.</p></div>

<h3 class="sub">Topic 2 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Vision Target Tracker</div><div class="ch-sub">Use an ArrayList to manage a dynamic list of targets</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Create an ArrayList&lt;String&gt; called <code>targets</code>. Add four targets: "NoteA", "NoteB", "NoteC", "NoteD". Then: (1) print the size, (2) print the element at index 2, (3) remove "NoteB", (4) print the size again, (5) check if "NoteB" is still in the list and print the result, (6) use a for-each loop to print all remaining targets. Make sure to import ArrayList.</p>
    <textarea class="code-input" placeholder="// Write your vision tracker here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w7-t2')">Show Solution</button></div>
    <div id="sol-w7-t2" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> java.util.<span class="cls">ArrayList</span>;

<span class="cls">ArrayList</span>&lt;<span class="cls">String</span>&gt; targets = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
targets.<span class="fn">add</span>(<span class="str">"NoteA"</span>);
targets.<span class="fn">add</span>(<span class="str">"NoteB"</span>);
targets.<span class="fn">add</span>(<span class="str">"NoteC"</span>);
targets.<span class="fn">add</span>(<span class="str">"NoteD"</span>);

System.out.<span class="fn">println</span>(targets.<span class="fn">size</span>());          <span class="cmt">// 4</span>
System.out.<span class="fn">println</span>(targets.<span class="fn">get</span>(<span class="num">2</span>));          <span class="cmt">// "NoteC"</span>

targets.<span class="fn">remove</span>(<span class="str">"NoteB"</span>);                    <span class="cmt">// removes by value</span>

System.out.<span class="fn">println</span>(targets.<span class="fn">size</span>());          <span class="cmt">// 3</span>
System.out.<span class="fn">println</span>(targets.<span class="fn">contains</span>(<span class="str">"NoteB"</span>)); <span class="cmt">// false — it was removed</span>

<span class="kw">for</span> (<span class="cls">String</span> t : targets) {
    System.out.<span class="fn">println</span>(t);  <span class="cmt">// NoteA, NoteC, NoteD</span>
}</pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 2 — Quick Check</h3>
<div id="quiz-w7-t2"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-3">Wrapper Classes</h2>

<p>you just learned that ArrayList only holds objects, not primitives. so <code>ArrayList&lt;int&gt;</code> won't compile. but you might very well need a list of integers. what do you do? Java's answer is wrapper classes — object versions of every primitive type.</p>

<h3 class="sub">what even IS a wrapper class?</h3>

<p>imagine you need to ship a piece of candy in the mail. you can't just tape a single Skittle to a postcard — it's too small and fragile, it doesn't have an address, and the post office doesn't know what to do with it. but if you put it in a box, suddenly it has all the structure the mail system needs: an address label, dimensions, packaging. the candy itself didn't change — you just wrapped it.</p>

<p>a primitive (like <code>int</code>) is the raw candy. a wrapper class (like <code>Integer</code>) is the box. the value inside is the same, but now it's a full object with methods, and it can go anywhere an object is expected — like inside an ArrayList.</p>

<p><strong>why does it matter in FRC?</strong> once you start using collections (ArrayList, HashMap, etc.) you will constantly see <code>Integer</code>, <code>Double</code>, and <code>Boolean</code> in type parameters. you also use the static utility methods on wrapper classes — <code>Integer.parseInt()</code> is everywhere in config reading and dashboard input handling.</p>

<h3 class="sub">the primitive-to-wrapper mapping</h3>

<p>every primitive type has a corresponding wrapper class. the pattern is just "capitalize it" — with two exceptions: <code>int</code> maps to <code>Integer</code> (not "Int") and <code>char</code> maps to <code>Character</code> (not "Char").</p>

<table>
<thead><tr><th>Primitive</th><th>Wrapper Class</th><th>Example use</th></tr></thead>
<tbody>
<tr><td><code>int</code></td><td><code>Integer</code></td><td><code>ArrayList&lt;Integer&gt;</code></td></tr>
<tr><td><code>double</code></td><td><code>Double</code></td><td><code>ArrayList&lt;Double&gt;</code></td></tr>
<tr><td><code>boolean</code></td><td><code>Boolean</code></td><td><code>ArrayList&lt;Boolean&gt;</code></td></tr>
<tr><td><code>char</code></td><td><code>Character</code></td><td><code>ArrayList&lt;Character&gt;</code></td></tr>
<tr><td><code>long</code></td><td><code>Long</code></td><td><code>ArrayList&lt;Long&gt;</code></td></tr>
<tr><td><code>float</code></td><td><code>Float</code></td><td><code>ArrayList&lt;Float&gt;</code></td></tr>
</tbody>
</table>

<h3 class="sub">autoboxing — Java does the conversion for you</h3>

<p>you might be thinking "do I have to manually wrap every int before adding it to a list?" — nope. Java has a feature called <strong>autoboxing</strong> that automatically converts primitives to their wrapper types when needed, and <strong>unboxing</strong> that converts wrapper types back to primitives. in practice this means you just write normal code and Java handles the boxing behind the scenes.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> java.util.<span class="cls">ArrayList</span>;

<span class="cls">ArrayList</span>&lt;<span class="cls">Integer</span>&gt; motorIDs = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();

<span class="cmt">// autoboxing: int literal 5 is automatically wrapped into Integer(5)</span>
motorIDs.<span class="fn">add</span>(<span class="num">5</span>);   <span class="cmt">// you write int, Java stores Integer — transparent</span>
motorIDs.<span class="fn">add</span>(<span class="num">12</span>);
motorIDs.<span class="fn">add</span>(<span class="num">3</span>);

<span class="cmt">// unboxing: Integer from the list is automatically unwrapped to int</span>
<span class="type">int</span> first = motorIDs.<span class="fn">get</span>(<span class="num">0</span>); <span class="cmt">// Java unboxes Integer → int automatically</span>
System.out.<span class="fn">println</span>(first);  <span class="cmt">// 5</span>

<span class="cmt">// doubles work the same way</span>
<span class="cls">ArrayList</span>&lt;<span class="cls">Double</span>&gt; speeds = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
speeds.<span class="fn">add</span>(<span class="num">0.75</span>);    <span class="cmt">// autoboxed: double → Double</span>
speeds.<span class="fn">add</span>(<span class="num">-1.0</span>);
<span class="type">double</span> s = speeds.<span class="fn">get</span>(<span class="num">0</span>); <span class="cmt">// unboxed: Double → double</span>
System.out.<span class="fn">println</span>(s);   <span class="cmt">// 0.75</span></pre>
</div>

<div class="callout info"><p><strong>the mental model:</strong> autoboxing and unboxing happen at the Java compiler level. when you write <code>list.add(5)</code>, the compiler silently rewrites it to <code>list.add(Integer.valueOf(5))</code>. when you write <code>int x = list.get(0)</code>, it silently becomes <code>int x = list.get(0).intValue()</code>. you never see it, but it's happening. this is why autoboxing has a tiny performance cost — it's creating objects. in robot code it's never a bottleneck, but worth knowing.</p></div>

<h3 class="sub">useful static methods on wrapper classes</h3>

<p>wrapper classes aren't just containers for primitives — they come packed with handy static utility methods. these are some of the most-used methods in all of Java programming, not just FRC:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// parseInt / parseDouble — convert Strings to numbers</span>
<span class="cmt">// used constantly for reading config values, dashboard input, etc.</span>
<span class="type">int</span>    port  = <span class="cls">Integer</span>.<span class="fn">parseInt</span>(<span class="str">"5800"</span>);    <span class="cmt">// int 5800</span>
<span class="type">double</span> speed = <span class="cls">Double</span>.<span class="fn">parseDouble</span>(<span class="str">"0.75"</span>);  <span class="cmt">// double 0.75</span>

<span class="cmt">// parse fails loudly if the string isn't a valid number</span>
<span class="cmt">// Integer.parseInt("abc") throws NumberFormatException — good to know</span>

<span class="cmt">// MAX_VALUE / MIN_VALUE — boundary constants</span>
<span class="type">int</span> biggest  = <span class="cls">Integer</span>.MAX_VALUE;  <span class="cmt">// 2147483647 (2^31 - 1)</span>
<span class="type">int</span> smallest = <span class="cls">Integer</span>.MIN_VALUE;  <span class="cmt">// -2147483648</span>

<span class="cmt">// toString — convert number to String</span>
<span class="cls">String</span> s  = <span class="cls">Integer</span>.<span class="fn">toString</span>(<span class="num">42</span>);   <span class="cmt">// "42"</span>
<span class="cls">String</span> sd = <span class="cls">Double</span>.<span class="fn">toString</span>(<span class="num">3.14</span>); <span class="cmt">// "3.14"</span>

<span class="cmt">// valueOf — explicitly create a wrapper object from a primitive</span>
<span class="cls">Integer</span> boxed = <span class="cls">Integer</span>.<span class="fn">valueOf</span>(<span class="num">99</span>); <span class="cmt">// explicit boxing (autoboxing does this for you normally)</span></pre>
</div>

<h3 class="sub">the NullPointerException trap (this WILL bite you)</h3>

<p>here's the nastiest gotcha with wrapper classes, and it trips up intermediate programmers more than beginners. because wrapper classes are objects (not primitives), they can be <code>null</code>. that's fine for storage. the problem is when you try to <em>unbox</em> a null wrapper back to a primitive — Java throws a NullPointerException. and NPEs are runtime errors, not compile errors, which means the program compiles just fine and then crashes on a specific code path.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — the null trap</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// BAD: unboxing null crashes at runtime</span>
<span class="cls">Integer</span> val = <span class="kw">null</span>; <span class="cmt">// Integer is an object — null is valid here</span>

<span class="type">int</span> x = val; <span class="cmt">// NullPointerException! Java tries to call val.intValue()</span>
             <span class="cmt">// but val IS null — you can't call methods on null</span>

<span class="cmt">// ─────────────────────────────────────────────────────────────────</span>
<span class="cmt">// SAFE pattern: null-check before unboxing</span>
<span class="cls">Integer</span> maybeNull = <span class="fn">getSomeValueThatMightBeNull</span>();

<span class="kw">if</span> (maybeNull != <span class="kw">null</span>) {
    <span class="type">int</span> safe = maybeNull; <span class="cmt">// only unbox when you know it's not null</span>
    <span class="fn">doSomething</span>(safe);
} <span class="kw">else</span> {
    <span class="fn">handleMissingValue</span>();
}

<span class="cmt">// or use a default with a ternary</span>
<span class="type">int</span> withDefault = (maybeNull != <span class="kw">null</span>) ? maybeNull : <span class="num">0</span>;</pre>
</div>

<div class="callout warning"><p><strong>in practice:</strong> this bites you most when reading from a Map (HashMap returns null for missing keys) or when a method signature returns a nullable Integer. if you're adding values to an ArrayList yourself and they're not null, you're fine. but any time a method CAN return null and you're unboxing the result, add a null check. your future self will thank you.</p></div>

<h3 class="sub">putting it all together — ArrayList + wrapper classes + enums</h3>

<p>let's write a snippet that uses all three concepts from this week together. this is actually close to patterns you'll see in real subsystem code:</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — all three concepts together</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> java.util.<span class="cls">ArrayList</span>;

<span class="kw">public enum</span> <span class="cls">GamePiece</span> { CONE, CUBE, NONE }

<span class="kw">public class</span> <span class="cls">PieceTracker</span> {

    <span class="cmt">// ArrayList of enum values — tracks pieces seen this match</span>
    <span class="kw">private</span> <span class="cls">ArrayList</span>&lt;<span class="cls">GamePiece</span>&gt; m_history = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();

    <span class="cmt">// ArrayList of wrapper Doubles — scores recorded over time</span>
    <span class="kw">private</span> <span class="cls">ArrayList</span>&lt;<span class="cls">Double</span>&gt; m_scores = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();

    <span class="kw">public void</span> <span class="fn">recordScore</span>(<span class="cls">GamePiece</span> piece, <span class="type">double</span> points) {
        m_history.<span class="fn">add</span>(piece);   <span class="cmt">// autoboxing not needed — GamePiece IS an object</span>
        m_scores.<span class="fn">add</span>(points);   <span class="cmt">// autoboxed: double → Double transparently</span>
    }

    <span class="kw">public int</span> <span class="fn">getConeCount</span>() {
        <span class="type">int</span> count = <span class="num">0</span>;
        <span class="kw">for</span> (<span class="cls">GamePiece</span> p : m_history) {
            <span class="kw">if</span> (p == <span class="cls">GamePiece</span>.CONE) count++;  <span class="cmt">// == works for enum values</span>
        }
        <span class="kw">return</span> count;
    }

    <span class="kw">public double</span> <span class="fn">getTotalScore</span>() {
        <span class="type">double</span> total = <span class="num">0.0</span>;
        <span class="kw">for</span> (<span class="cls">Double</span> s : m_scores) {
            total += s;  <span class="cmt">// unboxed: Double → double for the addition</span>
        }
        <span class="kw">return</span> total;
    }
}</pre>
</div>

<h3 class="sub">Topic 3 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Motor ID Manager</div><div class="ch-sub">ArrayList&lt;Integer&gt; with autoboxing and wrapper utilities</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Create an ArrayList&lt;Integer&gt; called <code>motorIDs</code>. Add CAN IDs: 1, 5, 8, 12, 20. Then: (1) print the total count, (2) remove the ID at index 2 (which is 8), (3) add a new ID parsed from the String "15" using Integer.parseInt(), (4) print whether 5 is in the list using contains(), (5) use a for-each loop to print all IDs. Make sure the output makes sense given each step.</p>
    <textarea class="code-input" placeholder="// Write your motor ID manager here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-w7-t3')">Show Solution</button></div>
    <div id="sol-w7-t3" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> java.util.<span class="cls">ArrayList</span>;

<span class="cls">ArrayList</span>&lt;<span class="cls">Integer</span>&gt; motorIDs = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
motorIDs.<span class="fn">add</span>(<span class="num">1</span>);   <span class="cmt">// autoboxed: int → Integer</span>
motorIDs.<span class="fn">add</span>(<span class="num">5</span>);
motorIDs.<span class="fn">add</span>(<span class="num">8</span>);
motorIDs.<span class="fn">add</span>(<span class="num">12</span>);
motorIDs.<span class="fn">add</span>(<span class="num">20</span>);

System.out.<span class="fn">println</span>(motorIDs.<span class="fn">size</span>());   <span class="cmt">// 5</span>

motorIDs.<span class="fn">remove</span>(<span class="num">2</span>);   <span class="cmt">// removes element AT INDEX 2 (the value 8)</span>
                       <span class="cmt">// list is now [1, 5, 12, 20]</span>

<span class="cmt">// parse "15" and add it</span>
<span class="type">int</span> newID = <span class="cls">Integer</span>.<span class="fn">parseInt</span>(<span class="str">"15"</span>);
motorIDs.<span class="fn">add</span>(newID);   <span class="cmt">// list is now [1, 5, 12, 20, 15]</span>

System.out.<span class="fn">println</span>(motorIDs.<span class="fn">contains</span>(<span class="num">5</span>));  <span class="cmt">// true — 5 is still in the list</span>

<span class="kw">for</span> (<span class="cls">Integer</span> id : motorIDs) {
    System.out.<span class="fn">println</span>(id);  <span class="cmt">// 1, 5, 12, 20, 15</span>
}</pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 3 — Quick Check</h3>
<div id="quiz-w7-t3"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-4">Fill in the Blanks</h2>
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

<h2 class="sh" id="topic-5">Knowledge Check</h2>
<div id="quiz-w7"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-6">Coding Challenge</h2>
<p>practice the ArrayList operations before the project task. try to predict the output before running.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — what does this print?</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> java.util.<span class="cls">ArrayList</span>;

<span class="cls">ArrayList</span>&lt;<span class="cls">String</span>&gt; list = <span class="kw">new</span> <span class="cls">ArrayList</span>&lt;&gt;();
list.<span class="fn">add</span>(<span class="str">"alpha"</span>);
list.<span class="fn">add</span>(<span class="str">"beta"</span>);
list.<span class="fn">add</span>(<span class="str">"gamma"</span>);
list.<span class="fn">remove</span>(<span class="str">"beta"</span>);
list.<span class="fn">add</span>(<span class="str">"delta"</span>);

System.out.<span class="fn">println</span>(list.<span class="fn">size</span>());
System.out.<span class="fn">println</span>(list.<span class="fn">get</span>(<span class="num">1</span>));
System.out.<span class="fn">println</span>(list.<span class="fn">contains</span>(<span class="str">"beta"</span>));

<span class="kw">for</span> (<span class="cls">String</span> s : list) {
    System.out.<span class="fn">println</span>(s);
}</pre>
</div>

<div class="callout tip"><p>answers: <code>size()</code> → 3, <code>get(1)</code> → "gamma" (after removing "beta", gamma shifts to index 1), <code>contains("beta")</code> → false. the foreach prints: alpha, gamma, delta.</p></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<div class="project-task" id="topic-7">
  <div class="pt-header">
    <div class="pt-icon"><i data-lucide="wrench"></i></div>
    <div class="pt-header-title">Project Task — Week 7</div>
    <div class="pt-filename">RobotState.java</div>
  </div>
  <div class="pt-body">
    <p>Create <code>RobotState.java</code> in your <code>minibot-project</code> folder — the glue that brings your MiniBot's subsystems together. This class tracks what the robot is currently doing and what it should do next.</p>
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
const quiz_w7_t1 = new Quiz('quiz-w7-t1', [
  { question: "What keyword do you use to declare an enum in Java?", options: ["class", "enum", "type", "const"], correct: 1, explanation: "the enum keyword declares a fixed set of named constants. it looks similar to class but creates an enumeration type instead of a full class. syntax: public enum MyEnum { VAL1, VAL2, VAL3 }" },
  { question: "Given <code>enum Direction { NORTH, SOUTH, EAST, WEST }</code>, which assignment is valid?", options: ["Direction d = NORTH;", "Direction d = Direction.NORTH;", "Direction d = \"NORTH\";", "Direction d = 0;"], correct: 1, explanation: "enum values must be accessed through the enum type name: Direction.NORTH. outside a switch statement, the full qualified form is required. you can't use a plain string or integer — that's the entire point of using enums instead of those types." },
  { question: "Inside a switch(direction) statement where direction is a Direction enum, how do you write a case for NORTH?", options: ["case Direction.NORTH:", "case \"NORTH\":", "case NORTH:", "case 0:"], correct: 2, explanation: "inside a switch whose expression is already typed as Direction, Java knows the type. you just write 'case NORTH:' — the enum name prefix is redundant and not needed. outside a switch you always use Direction.NORTH." }
], 'summer-w7');

const quiz_w7_t2 = new Quiz('quiz-w7-t2', [
  { question: "What import is required to use ArrayList?", options: ["import java.lang.ArrayList;", "import java.util.ArrayList;", "import java.collections.ArrayList;", "No import needed — ArrayList is built-in"], correct: 1, explanation: "ArrayList lives in the java.util package, which is NOT automatically imported. you need 'import java.util.ArrayList;' at the top of any file that uses it. forgetting this gives you a 'cannot find symbol' compile error." },
  { question: "What does <code>list.contains(\"Shooter\")</code> return if \"Shooter\" was removed from the list?", options: ["true", "false", "null", "It throws an exception"], correct: 1, explanation: "contains() checks if the value is currently in the list. if you removed \"Shooter\" earlier, it's gone and contains() returns false. it never throws an exception for a missing element — it just returns false." },
  { question: "You have an ArrayList of 3 elements. You call remove(\"B\") where \"B\" is the second element. What is the new size?", options: ["3", "2", "1", "0"], correct: 1, explanation: "remove() removes the first occurrence of the specified value and the list automatically closes the gap. if you had [A, B, C] and remove B, you get [A, C] with size 2. there's no 'hole' left behind like there would be in a fixed array." }
], 'summer-w7');

const quiz_w7_t3 = new Quiz('quiz-w7-t3', [
  { question: "Why can't you write <code>ArrayList&lt;int&gt;</code>?", options: ["ArrayList only works with String", "Java generics require reference types, and int is a primitive", "int is too small to be in a list", "You need to import int first"], correct: 1, explanation: "Java generics (the <T> type parameter) only accept reference types — meaning objects. int is a primitive value type, not an object. you must use the wrapper class Integer instead: ArrayList<Integer>. autoboxing then handles int ↔ Integer conversion transparently." },
  { question: "What does <code>Integer.parseInt(\"100\")</code> return?", options: ["The String \"100\"", "The Integer object wrapping 100", "The primitive int 100", "A compile error"], correct: 2, explanation: "parseInt is a static method that parses a String and returns a primitive int. it returns int 100, not a String and not an Integer wrapper. same idea: Double.parseDouble(\"3.14\") returns primitive double 3.14." },
  { question: "What happens if you try to unbox a null Integer into an int?", options: ["You get 0 as a default value", "You get a NullPointerException at runtime", "You get a compile error", "Java automatically uses Integer.MIN_VALUE"], correct: 1, explanation: "wrapper objects can be null — they're objects. but when Java tries to unbox null into a primitive, it calls .intValue() on a null reference, which throws NullPointerException at runtime. the fix: always null-check before unboxing a value that might be null." }
], 'summer-w7');

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
