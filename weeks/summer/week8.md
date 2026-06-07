---
layout: week
title: "Recap & Resources"
subtitle: "pull everything together. here's your java cheat sheet, the links that actually matter, and the final piece of your project."
badge: "Summer · Week 8 of 8"
phase: summer
phase_label: Summer
week_label: Week 8
page_id: summer-w8
weekly_test: true
topics:
  - Java Foundations Recap
  - FRC & WRT Resources
  - MiniBot Final Project
prev_url: /weeks/summer/week7
prev_title: "Week 7 — Advanced Classes"
next_url: /weeks/offseason/os-week1
next_title: "O1 — Git & GitHub"
---

<h2 class="sh" id="topic-1">Java Foundations Recap</h2>
<p>Seven weeks of content, distilled. use this as a reference when you're writing code and forget something — that's what it's here for. no shame in checking :)</p>

<h3 class="sub">Week 1 — The Basics</h3>
<p>Week 1 gave you the atoms that everything else is built from. types, variables, naming, casting. none of it feels exciting in isolation, but when you're deep in a subsystem at 11pm during build season and a casting bug is silently giving you the wrong encoder position, you'll be really glad you understand how this works. these are the rules that never go away.</p>

<table>
<thead><tr><th>Concept</th><th>Key Syntax</th><th>WRT Rule</th></tr></thead>
<tbody>
<tr><td>Constants</td><td><code>final int kMotorID = 5;</code></td><td><code>k</code> prefix, always <code>final</code></td></tr>
<tr><td>Member vars</td><td><code>private double m_speed = 0.0;</code></td><td><code>m_</code> prefix, always <code>private</code></td></tr>
<tr><td>Primitive types</td><td><code>int</code>, <code>double</code>, <code>boolean</code></td><td>Use <code>double</code> for motor speeds (−1.0 to 1.0)</td></tr>
<tr><td>Widening cast</td><td><code>double d = myInt;</code> (automatic)</td><td>int → double is safe, no cast needed</td></tr>
<tr><td>Narrowing cast</td><td><code>int i = (int) myDouble;</code></td><td>Truncates (doesn't round). Watch encoder math!</td></tr>
<tr><td>Comments</td><td><code>// inline</code>, <code>/* block */</code>, <code>/** javadoc */</code></td><td>Every public method gets a Javadoc</td></tr>
</tbody>
</table>

<div class="callout warning"><p><strong>common gotcha:</strong> narrowing casts truncate silently. if your encoder calculation returns <code>3.99</code> rotations and you cast to <code>int</code> you get <code>3</code>, not <code>4</code>. this will not cause a compiler error. you will not know why your robot is off by a full rotation. use <code>Math.round()</code> when you need rounding, and only cast when you genuinely want truncation.</p></div>

<h3 class="sub">Week 2 — Logic &amp; Control Flow</h3>
<p>Week 2 is where your code started making decisions. in real robot code, you're constantly asking questions: is the shooter up to speed? is the intake extended? is the robot in auto or teleop? every sensor check, every state guard, every auto routine selection runs through this logic. if you can write a clean if/switch block you can write 80% of the control flow you'll need in a real robot.</p>

<table>
<thead><tr><th>Concept</th><th>Key Syntax</th><th>FRC Use Case</th></tr></thead>
<tbody>
<tr><td>Boolean operators</td><td><code>&amp;&amp;</code> <code>||</code> <code>!</code></td><td>Guard conditions: <code>isEnabled &amp;&amp; hasTarget</code></td></tr>
<tr><td>if / else if / else</td><td><code>if (x) { } else if (y) { } else { }</code></td><td>Auto state logic, sensor range checks</td></tr>
<tr><td>Switch</td><td><code>switch(val) { case X: ...; break; }</code></td><td>Game state machine, robot mode selection</td></tr>
<tr><td>Ternary</td><td><code>int x = (a > b) ? a : b;</code></td><td>Compact speed clamping, direction flags</td></tr>
</tbody>
</table>

<div class="callout warning"><p><strong>common gotcha:</strong> forgetting <code>break;</code> in a switch case causes fall-through. Java will silently execute the next case's code after yours finishes. this is one of the most common first-season bugs and the compiler gives you zero warning about it. every case needs a <code>break;</code> unless you intentionally want fall-through (which is rare).</p></div>

<h3 class="sub">Weeks 3 &amp; 4 — Loops, Arrays, Methods</h3>
<p>Weeks 3 and 4 gave you the ability to repeat work and package it up neatly. swerve drives have four modules — you don't write four copies of the same logic, you loop over an array. unit conversions happen dozens of times per second — you don't inline the math every time, you write a static method in a utility class and call it. these are the tools that keep robot code from becoming a spaghetti mess.</p>

<table>
<thead><tr><th>Concept</th><th>Key Syntax</th><th>FRC Use Case</th></tr></thead>
<tbody>
<tr><td>for loop</td><td><code>for (int i = 0; i &lt; n; i++)</code></td><td>Process encoder arrays, iterate modules</td></tr>
<tr><td>while loop</td><td><code>while (condition)</code></td><td>Avoid in robot code — periodic() is your loop</td></tr>
<tr><td>enhanced for</td><td><code>for (Type x : array)</code></td><td>Read all swerve module states</td></tr>
<tr><td>Array declaration</td><td><code>double[] arr = new double[4];</code></td><td>Swerve module speeds, sensor history buffers</td></tr>
<tr><td>Static methods</td><td><code>public static double clamp(double v, ...)</code></td><td>Math utilities in Constants or MathUtil</td></tr>
<tr><td>Return types</td><td><code>public double getVelocity() { return m_vel; }</code></td><td>All getters in subsystems</td></tr>
</tbody>
</table>

<div class="callout danger"><p><strong>danger:</strong> never put a <code>while</code> loop inside <code>periodic()</code>. <code>periodic()</code> is already being called every 20ms by the scheduler — it IS your loop. if you write <code>while (condition)</code> inside it, you will block the entire robot loop, the watchdog will fire, and your robot will fault or disable. this is a disqualification risk during a match. for loops are fine (as long as they're bounded). while loops are not.</p></div>

<h3 class="sub">Weeks 5, 6, 7 — OOP</h3>
<p>Weeks 5, 6, and 7 are where everything came together. classes, inheritance, interfaces, enums — these aren't abstract concepts, they're the direct blueprint of how WRT's robot code is structured. every mechanism on the robot is a class that extends SubsystemBase. every state machine uses an enum. every abstract sensor abstraction uses an interface. you've been learning the actual architecture of our robot, just with simplified examples.</p>

<table>
<thead><tr><th>Concept</th><th>Key Syntax</th><th>WRT Pattern</th></tr></thead>
<tbody>
<tr><td>Subsystem class</td><td><code>public class Shooter extends SubsystemBase</code></td><td>One class per mechanism, in subsystems/</td></tr>
<tr><td>Constructor</td><td><code>public Shooter() { m_motor = new TalonFX(kMotorID); }</code></td><td>Initialize hardware, apply configs</td></tr>
<tr><td>periodic()</td><td><code>@Override public void periodic()</code></td><td>Logging, odometry, state updates — runs every 20ms</td></tr>
<tr><td>Inheritance</td><td><code>extends SubsystemBase</code></td><td>WPILib gives you the scheduler loop for free</td></tr>
<tr><td>Interfaces</td><td><code>implements ISensor</code></td><td>Used for vision targets, sensor abstraction</td></tr>
<tr><td>Enums</td><td><code>enum State { IDLE, SPINNING, AT_SPEED }</code></td><td>Subsystem state machines — very common</td></tr>
<tr><td>Private modifier</td><td><code>private final TalonFX m_motor;</code></td><td>Hardware fields are ALWAYS private final</td></tr>
</tbody>
</table>

<h3 class="sub">the most common mistakes you'll make in your first real code session</h3>
<p>knowing the concepts is one thing. actually sitting down to write subsystem code for the first time is another. these are the six things that will trip you up, almost guaranteed, in that first real session.</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Integer Division</div><div class="cc-title">5 / 2 = 2, not 2.5</div><div class="cc-desc">When both sides of a division are <code>int</code>, Java discards the decimal entirely. this doesn't round, it truncates. encoder math is where this bites hardest — if you write <code>ticks / kTicksPerRev</code> and both are <code>int</code>, you'll silently lose precision on every cycle. fix: <code>(double) ticks / kTicksPerRev</code>. make one side a double and the whole expression becomes double division.</div></div>
  <div class="concept-card"><div class="cc-label">== vs .equals()</div><div class="cc-title">For objects, use .equals()</div><div class="cc-desc"><code>==</code> asks "are these the exact same object in memory?" which is not what you want for string comparisons. two separate <code>String</code> objects with identical characters will return <code>false</code> from <code>==</code>. always use <code>.equals()</code> for Strings and objects. primitives (<code>int</code>, <code>double</code>, <code>boolean</code>) are fine with <code>==</code>. example: <code>if (name.equals("driver"))</code> not <code>if (name == "driver")</code>.</div></div>
  <div class="concept-card"><div class="cc-label">While loops in robot</div><div class="cc-title">DO NOT DO THIS</div><div class="cc-desc"><code>periodic()</code> is called every 20ms by the CommandScheduler. it is already a loop. if you put a <code>while (condition) { }</code> inside periodic, you block that thread and the watchdog kills the robot. the symptom is: robot enables, then immediately disables with a "loop overrun" warning. if you see that, look for blocking code (while loops, <code>Thread.sleep()</code>, anything that waits). example of what NOT to do: <code>while (!atSpeed()) { }</code> inside periodic.</div></div>
  <div class="concept-card"><div class="cc-label">Missing break in switch</div><div class="cc-title">Fall-through is silent</div><div class="cc-desc">Forgetting <code>break;</code> in a switch case silently runs the next case after yours finishes. the compiler won't warn you, the linter might not catch it, and it will manifest as weird behavior where two different state transitions happen when only one should. every case needs <code>break;</code> unless you are intentionally falling through (add a comment if you are). example: missing <code>break;</code> after <code>case IDLE:</code> means the <code>DRIVING</code> case also executes immediately.</div></div>
  <div class="concept-card"><div class="cc-label">Hardcoded numbers</div><div class="cc-title">Put them in Constants</div><div class="cc-desc">Magic numbers — raw integers and doubles scattered through your code with no label — make robot code nearly impossible to maintain. when a motor ID changes from port 5 to port 7, you want to change exactly one line in Constants.java, not hunt through ten files. rule: if a number has a physical meaning (an ID, a speed limit, a threshold), it belongs in Constants. never write <code>new TalonFX(5)</code>; always write <code>new TalonFX(DriveK.kFLMotorID)</code>.</div></div>
  <div class="concept-card"><div class="cc-label">Truncation ≠ Rounding</div><div class="cc-title">(int) 3.9 = 3, not 4</div><div class="cc-desc">Java's cast-to-int operation always chops toward zero. <code>(int) 3.9</code> gives <code>3</code>. <code>(int) -3.9</code> gives <code>-3</code>. neither rounds. this matters any time you're converting a floating-point sensor value or encoder reading to an integer index. if you need actual rounding, use <code>Math.round()</code> which returns a <code>long</code>, or <code>(int) Math.round(x)</code>. only use the cast directly when you want truncation on purpose.</div></div>
</div>

<h3 class="sub">patterns you'll use daily in WRT code</h3>
<p>beyond the raw syntax, there are a handful of patterns that show up constantly in real robot code. if these feel familiar when you open the Rebuilt repo for the first time, you'll be in great shape.</p>

<p><strong>1. private final field + k constant</strong> — every piece of hardware follows this pattern. the constant lives in Constants.java, the hardware object is a private final field in the subsystem.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// In Constants.java — the number lives here, nowhere else</span>
<span class="kw">public static final class</span> <span class="cls">ShooterK</span> {
    <span class="kw">public static final</span> <span class="type">int</span> kTopMotorID = <span class="num">11</span>;
    <span class="kw">public static final</span> <span class="type">double</span> kTargetSpeedRPS = <span class="num">80.0</span>;
}

<span class="cmt">// In ShooterSubsystem.java — hardware is private final, ID comes from constants</span>
<span class="kw">public class</span> <span class="cls">ShooterSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> {
    <span class="kw">private final</span> <span class="cls">TalonFX</span> m_topMotor = <span class="kw">new</span> <span class="cls">TalonFX</span>(<span class="cls">ShooterK</span>.kTopMotorID);
}</pre>
</div>

<p><strong>2. subsystem method that returns a Command</strong> — this is how WRT subsystems expose behavior. instead of calling motor.set() from Robot.java, the subsystem returns a Command object that encapsulates the action. Robot.java just wires the command to a trigger.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// In ShooterSubsystem.java</span>
<span class="cmt">/**
 * Spins the shooter to target speed and holds it.
 * @return a Command that runs until interrupted
 */</span>
<span class="kw">public</span> <span class="cls">Command</span> <span class="fn">shoot</span>() {
    <span class="kw">return</span> <span class="fn">startEnd</span>(
        () -> m_topMotor.<span class="fn">set</span>(<span class="cls">ShooterK</span>.kTargetSpeedRPS),
        () -> m_topMotor.<span class="fn">set</span>(<span class="num">0.0</span>)
    );
}

<span class="cmt">// In Robot.java — clean, declarative wiring</span>
trg_shootButton.<span class="fn">whileTrue</span>(m_shooter.<span class="fn">shoot</span>());</pre>
</div>

<p><strong>3. state machine with enum + switch</strong> — when a subsystem has multiple modes, use an enum to name the states and a switch to handle each one. this is cleaner and safer than string or integer comparisons.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">private enum</span> <span class="cls">State</span> { IDLE, SPINNING, AT_SPEED }
<span class="kw">private</span> <span class="cls">State</span> m_state = <span class="cls">State</span>.IDLE;

<span class="kw">@Override</span>
<span class="kw">public void</span> <span class="fn">periodic</span>() {
    <span class="kw">switch</span> (m_state) {
        <span class="kw">case</span> IDLE:
            m_topMotor.<span class="fn">set</span>(<span class="num">0.0</span>);
            <span class="kw">break</span>;
        <span class="kw">case</span> SPINNING:
            m_topMotor.<span class="fn">set</span>(<span class="cls">ShooterK</span>.kTargetSpeedRPS);
            <span class="cmt">// check if we've reached speed</span>
            <span class="kw">if</span> (m_topMotor.<span class="fn">getVelocity</span>().<span class="fn">getValueAsDouble</span>() >= <span class="cls">ShooterK</span>.kTargetSpeedRPS) {
                m_state = <span class="cls">State</span>.AT_SPEED;
            }
            <span class="kw">break</span>;
        <span class="kw">case</span> AT_SPEED:
            <span class="cmt">// hold speed, maybe signal ready</span>
            <span class="kw">break</span>;
    }
}</pre>
</div>

<p><strong>4. the periodic() logging pattern</strong> — in WRT code, every subsystem logs its state every cycle. this makes debugging infinitely easier because you can rewind the robot's behavior from a log file. the logging calls go at the end of periodic().</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">@Override</span>
<span class="kw">public void</span> <span class="fn">periodic</span>() {
    <span class="cmt">// 1. do the actual subsystem work first</span>
    <span class="kw">switch</span> (m_state) { <span class="cmt">/* ... */</span> }

    <span class="cmt">// 2. log everything at the end — WaltLogger is our wrapper over AdvantageKit</span>
    log_state.<span class="fn">accept</span>(m_state.<span class="fn">toString</span>());
    log_velocity.<span class="fn">accept</span>(m_topMotor.<span class="fn">getVelocity</span>().<span class="fn">getValueAsDouble</span>());
    log_atSpeed.<span class="fn">accept</span>(m_state == <span class="cls">State</span>.AT_SPEED);
}</pre>
</div>

<div class="callout tip"><p><strong>WRT convention:</strong> logging fields use the <code>log_</code> prefix, just like <code>m_</code> for member vars and <code>k</code> for constants. if you see a field like <code>log_velocity</code> in the codebase, it's a WaltLogger instance. you'll use these in the offseason weeks.</p></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-2">FRC &amp; WRT Resources</h2>
<p>you don't need to memorize everything — you need to know where to look. these are the only links you'll actually need during build season.</p>

<h3 class="sub">how to actually use these resources</h3>
<p>there's a skill to using documentation efficiently. here's the mental model that most experienced WRT members use:</p>

<ul>
  <li><strong>Google / W3Schools / GeeksForGeeks</strong> — use these when you forget basic Java syntax. "how do i convert int to string java", "java enhanced for loop syntax", "how does switch fall-through work". fast answers for language questions.</li>
  <li><strong>WPILib Docs</strong> — use these when you need to understand a framework concept. "how does SubsystemBase work", "what is the CommandScheduler", "how do Triggers work". if it's a WPILib class, the docs have the definitive answer.</li>
  <li><strong>CTRE Phoenix 6 API</strong> — use this when you're working with hardware. "TalonFX setControl", "CANcoder getAbsolutePosition", "StatusSignal vs getValue". Phoenix 6 has a totally different API than Phoenix 5 so make sure you're on the right version (we're on 6).</li>
  <li><strong>WRT Rebuilt repo</strong> — use this when you want to see how WE actually do something. don't just read the docs and guess, read how Swerve.java or Shooter.java actually uses the API. this is the real thing, not a tutorial.</li>
  <li><strong>Ask a mentor</strong> — last resort after you've checked the docs and the repo. mentors want you to have already looked before asking. "i checked X and Y and couldn't figure out Z" is a way better question than "how do i do Z".</li>
</ul>

<div class="callout tip"><p><strong>WRT convention:</strong> the WRT Rebuilt repo is the single most useful resource you have. before asking a mentor how to do something, search the codebase for it. we probably already solved it. use GitHub's search (Ctrl+K in the browser) or clone the repo and use your IDE's full-text search. finding a real example beats any tutorial.</p></div>

<div class="callout info"><p><strong>on WPILib versions:</strong> WPILib releases a new version every year, usually in January. make sure you're reading the docs for the same year as the codebase you're working on. a method that exists in 2025 might not exist in 2024, or might have a different signature. check the repo's <code>build.gradle</code> to see which year/version is in use before trusting a doc page.</p></div>

<h3 class="sub">Learn Java</h3>
<div class="resource-grid">
  <a class="resource-card" href="https://www.w3schools.com/java/" target="_blank" rel="noopener">
    <div class="rc-icon rc-icon--orange"><i data-lucide="book-open"></i></div>
    <div class="rc-body">
      <div class="rc-title">W3Schools Java</div>
      <div class="rc-desc">Clean, beginner-friendly reference for every Java topic. Great for quick syntax lookups.</div>
      <div class="rc-tag">w3schools.com</div>
    </div>
  </a>
  <a class="resource-card" href="https://www.geeksforgeeks.org/java/" target="_blank" rel="noopener">
    <div class="rc-icon rc-icon--green"><i data-lucide="code-2"></i></div>
    <div class="rc-body">
      <div class="rc-title">GeeksForGeeks Java</div>
      <div class="rc-desc">More in-depth than W3. Good for OOP concepts, data structures, and interview-style problems.</div>
      <div class="rc-tag">geeksforgeeks.org</div>
    </div>
  </a>
  <a class="resource-card" href="https://docs.oracle.com/en/java/javase/17/docs/api/" target="_blank" rel="noopener">
    <div class="rc-icon rc-icon--blue"><i data-lucide="file-text"></i></div>
    <div class="rc-body">
      <div class="rc-title">Java SE 17 API Docs</div>
      <div class="rc-desc">The official source. Use when you need exact method signatures, exceptions, and return types.</div>
      <div class="rc-tag">docs.oracle.com</div>
    </div>
  </a>
</div>

<h3 class="sub">FRC &amp; WPILib</h3>
<div class="resource-grid">
  <a class="resource-card" href="https://docs.wpilib.org" target="_blank" rel="noopener">
    <div class="rc-icon rc-icon--red"><i data-lucide="bot"></i></div>
    <div class="rc-body">
      <div class="rc-title">WPILib Docs</div>
      <div class="rc-desc">Command-based framework, SubsystemBase, TimedRobot, motor controllers. The FRC bible.</div>
      <div class="rc-tag">docs.wpilib.org</div>
    </div>
  </a>
  <a class="resource-card" href="https://api.ctr-electronics.com/phoenix6/release/java/" target="_blank" rel="noopener">
    <div class="rc-icon rc-icon--orange"><i data-lucide="zap"></i></div>
    <div class="rc-body">
      <div class="rc-title">CTRE Phoenix 6 API</div>
      <div class="rc-desc">TalonFX, CANcoder, Pigeon 2 Java API. We use Phoenix 6 exclusively on WRT hardware.</div>
      <div class="rc-tag">ctr-electronics.com</div>
    </div>
  </a>
  <a class="resource-card" href="https://github.com/WaltonRobotics/Rebuilt" target="_blank" rel="noopener">
    <div class="rc-icon rc-icon--red"><i data-lucide="github"></i></div>
    <div class="rc-body">
      <div class="rc-title">WRT Rebuilt Repo</div>
      <div class="rc-desc">Our actual robot code. Read it. Model your code after it. This is what you'll be contributing to.</div>
      <div class="rc-tag">github.com</div>
    </div>
  </a>
  <a class="resource-card" href="https://choreo.autos" target="_blank" rel="noopener">
    <div class="rc-icon rc-icon--blue"><i data-lucide="map"></i></div>
    <div class="rc-body">
      <div class="rc-title">Choreo</div>
      <div class="rc-desc">Path planner we use for autonomous. You'll use this in offseason once you understand subsystems.</div>
      <div class="rc-tag">choreo.autos</div>
    </div>
  </a>
</div>

<h3 class="sub">WRT Codebase Structure (for reference)</h3>
<p>This is how our actual robot code is organized. Everything you've learned maps directly to something in here.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">project structure — WaltonRobotics/Rebuilt</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre>src/main/java/frc/robot/
├── Main.java                    <span class="cmt">// entry point: RobotBase.startRobot(Robot::new)</span>
├── Robot.java                   <span class="cmt">// extends TimedRobot — your periodic() lives here</span>
├── Constants.java               <span class="cmt">// inner classes: DriveK, ShooterK, IntakeK, etc.</span>
├── FieldConstants.java          <span class="cmt">// field geometry constants</span>
├── subsystems/
│   ├── Swerve.java              <span class="cmt">// extends SubsystemBase</span>
│   ├── Intake.java              <span class="cmt">// extends SubsystemBase</span>
│   ├── Indexer.java             <span class="cmt">// extends SubsystemBase</span>
│   ├── Superstructure.java      <span class="cmt">// orchestrates intake + indexer + shooter</span>
│   └── shooter/
│       ├── Shooter.java         <span class="cmt">// extends SubsystemBase</span>
│       └── ShooterCalc.java     <span class="cmt">// shot math — static methods</span>
├── autons/
│   └── WaltAdaptableAutonFactory.java  <span class="cmt">// Choreo-based auto builder</span>
└── vision/
    └── WaltCamera.java          <span class="cmt">// AprilTag / note detection</span></pre>
</div>

<div class="callout info"><p><strong>No RobotContainer.</strong> Unlike some WPILib templates, we don't use a <code>RobotContainer</code> class. Subsystem instantiation and button bindings happen directly in <code>Robot.java</code>. That said — the command-based concepts you learned still apply. <code>SubsystemBase</code>, <code>Commands.sequence()</code>, <code>Triggers</code> — all of it is real.</p></div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — Robot.java pattern (simplified)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">Robot</span> <span class="kw">extends</span> <span class="cls">TimedRobot</span> {

    <span class="cmt">// All subsystems instantiated as fields</span>
    <span class="kw">private final</span> <span class="cls">DriveSubsystem</span> m_drive = <span class="kw">new</span> <span class="cls">DriveSubsystem</span>();
    <span class="kw">private final</span> <span class="cls">ShooterSubsystem</span> m_shooter = <span class="kw">new</span> <span class="cls">ShooterSubsystem</span>();

    <span class="kw">public</span> <span class="cls">Robot</span>() {
        configureBindings();
    }

    <span class="kw">private void</span> <span class="fn">configureBindings</span>() {
        <span class="cmt">// Button → Command mappings go here</span>
        <span class="cmt">// trg_shootButton.onTrue(m_shooter.shoot());</span>
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">robotPeriodic</span>() {
        <span class="cmt">// CommandScheduler runs all subsystem periodic() calls</span>
        <span class="cls">CommandScheduler</span>.getInstance().<span class="fn">run</span>();
    }
}</pre>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-3">MiniBot Final Project</h2>
<p>this is what you've been building all summer. bring all your files together, make sure they compile and are consistent, and submit. this is a real deliverable!!</p>

<h3 class="sub">before you start — do a quick audit</h3>
<p>before you start writing Robot.java, spend 10 minutes going through every file you've written and answering these questions. you'd rather fix these now than discover them in a PR review.</p>

<ul>
  <li><strong>Constants.java:</strong> are all your inner classes there? does DriveK have all the motor IDs and limits that DriveSubsystem references? does ShooterK have everything ShooterSubsystem needs?</li>
  <li><strong>AutoLogic.java:</strong> does it compile standalone? does it import anything from your other files, or is it just pure Java logic?</li>
  <li><strong>SensorProcessor.java:</strong> does every method take parameters instead of hardcoded values? are the array sizes pulled from constants instead of being magic numbers?</li>
  <li><strong>DriveCalculator.java:</strong> are all the conversion factors in Constants rather than inline in the method bodies?</li>
  <li><strong>DriveSubsystem.java:</strong> do all your getter methods actually return values (not void)? does periodic() have logging calls? are all hardware fields private final?</li>
  <li><strong>ShooterSubsystem.java:</strong> same checklist as DriveSubsystem. does it demonstrate inheritance properly — is it extending the right base class?</li>
  <li><strong>RobotState.java:</strong> does the enum have all the states you plan to use in Robot.java? does the interface from W7 have at least one method that something implements?</li>
</ul>

<div class="callout tip"><p><strong>tip:</strong> open each file in your IDE and let it compile. if you're getting "cannot find symbol" errors, your files probably reference constants or methods that exist in other files but aren't imported yet. fix imports before you start assembling Robot.java.</p></div>

<h3 class="sub">What You Should Have</h3>
<p>by the end of week 7 you should have created all of these files. if any are missing, go back to that week and complete them first.</p>

<table>
<thead><tr><th>File</th><th>Created in</th><th>What it has</th></tr></thead>
<tbody>
<tr><td><code>Constants.java</code></td><td>Week 1</td><td>Inner classes <code>DriveK</code> and <code>ShooterK</code>, each with at least 3-4 typed, named constants using the <code>k</code> prefix and <code>public static final</code>. motor IDs, speed limits, encoder ratios — the source of truth for every number in your project.</td></tr>
<tr><td><code>AutoLogic.java</code></td><td>Week 2</td><td>A static class with a method that takes a mode selector (String or int) and uses if/switch to return or describe an auto routine. demonstrates you can write decision logic cleanly.</td></tr>
<tr><td><code>SensorProcessor.java</code></td><td>Week 3</td><td>Static utility methods that take a <code>double[]</code> sensor array as a parameter, process it with a for loop, and return a result (average, max, filtered value, etc.). no while loops, no hardcoded array sizes.</td></tr>
<tr><td><code>DriveCalculator.java</code></td><td>Week 4</td><td>Static math utility methods for unit conversions and clamping. things like <code>ticksToMeters(double ticks)</code>, <code>clampSpeed(double speed)</code>. all conversion constants come from Constants.java.</td></tr>
<tr><td><code>DriveSubsystem.java</code></td><td>Week 5</td><td>Extends SubsystemBase, has private final motor fields initialized from DriveK constants, implements <code>periodic()</code> with logging calls, has public getter/setter methods with Javadoc, returns a <code>Command</code> from at least one method.</td></tr>
<tr><td><code>ShooterSubsystem.java</code></td><td>Week 6</td><td>Extends the same SubsystemBase base class as DriveSubsystem (demonstrating that both use inheritance the same way). has its own state enum, a <code>shoot()</code> method that returns a Command, and periodic() logging. shows you can apply the same pattern to a different mechanism.</td></tr>
<tr><td><code>RobotState.java</code></td><td>Week 7</td><td>Top-level enum with at least IDLE, DRIVING, SHOOTING states. also contains or references the interface from W7 (something like <code>ILoggable</code> or <code>IStateProvider</code>) that at least one subsystem implements.</td></tr>
</tbody>
</table>

<h3 class="sub">how to connect it all together</h3>
<p>when you're assembling Robot.java, the order of dependencies matters. think of it as a layered graph where each layer can only depend on layers below it, not above it.</p>

<ul>
  <li><strong>Layer 0 — Constants.java:</strong> no dependencies on anything in your project. it just has numbers. every other file can import it freely.</li>
  <li><strong>Layer 1 — utility classes (AutoLogic, SensorProcessor, DriveCalculator):</strong> these only depend on Constants (for k values). they're pure logic — no subsystems, no hardware. they can be tested in isolation.</li>
  <li><strong>Layer 2 — subsystems (DriveSubsystem, ShooterSubsystem):</strong> depend on Constants (for IDs and limits) and optionally on the utility classes. they do NOT depend on each other in your minibot (in real code, a Superstructure class would coordinate them). they do NOT depend on Robot.java.</li>
  <li><strong>Layer 3 — RobotState.java:</strong> can be imported by subsystems (they track state) and by Robot.java (it sets the top-level state). it has no dependency on any specific subsystem.</li>
  <li><strong>Layer 4 — Robot.java:</strong> depends on everything. it imports and instantiates the subsystems, uses RobotState, wires commands to triggers. it sits at the top of the dependency graph.</li>
</ul>

<div class="callout info"><p><strong>why this matters:</strong> if you find that Constants.java is trying to import something from DriveSubsystem, or that SensorProcessor is calling methods on your subsystem, you have a circular dependency. that design is broken. layers should only flow downward. clean dependency graphs are one of the things senior devs look for in code reviews.</p></div>

<h3 class="sub">Final Assembly — Robot.java</h3>
<p>write a <code>Robot.java</code> that ties everything together. it doesn't need to run on actual hardware — focus on the structure being correct.</p>

<div class="project-task">
  <div class="pt-header">
    <div class="pt-icon"><i data-lucide="wrench"></i></div>
    <div class="pt-header-title">Final Project — Week 8</div>
    <div class="pt-filename">Robot.java</div>
  </div>
  <div class="pt-body">
    <p>Create <code>Robot.java</code> that:</p>
    <ul>
      <li>Extends <code>TimedRobot</code> (WRT pattern — no RobotContainer)</li>
      <li>Declares <code>DriveSubsystem</code> and <code>ShooterSubsystem</code> as <code>private final</code> fields</li>
      <li>Calls <code>configureBindings()</code> from the constructor</li>
      <li>Has a <code>robotPeriodic()</code> that calls <code>CommandScheduler.getInstance().run()</code></li>
      <li>Has a stub <code>configureBindings()</code> with comments showing where Trigger bindings would go</li>
      <li>Uses <code>RobotState</code> enum to track current state in a <code>private RobotState m_state</code> field</li>
    </ul>
    <p>Then go through ALL your files from weeks 1–7 and make sure:</p>
    <ul>
      <li>All constants use <code>k</code> prefix and are <code>final</code></li>
      <li>All member vars use <code>m_</code> prefix and are <code>private</code></li>
      <li>Every public method has a Javadoc comment</li>
      <li>No magic numbers anywhere — everything is in Constants.java</li>
    </ul>
    <span class="pt-note">submit: push all .java files to a branch in the team repo and open a PR. title it "feat: minibot project — [your name]"</span>
  </div>
</div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — Robot.java starter</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">package</span> frc.robot;

<span class="kw">import</span> edu.wpi.first.wpilibj.<span class="cls">TimedRobot</span>;
<span class="kw">import</span> edu.wpi.first.wpilibj2.command.<span class="cls">CommandScheduler</span>;
<span class="kw">import</span> frc.robot.subsystems.<span class="cls">DriveSubsystem</span>;
<span class="kw">import</span> frc.robot.subsystems.<span class="cls">ShooterSubsystem</span>;

<span class="cmt">/**
 * Main robot class. Extends TimedRobot — WPILib calls our periodic methods
 * every 20ms. No RobotContainer; subsystems and bindings live here.
 */</span>
<span class="kw">public class</span> <span class="cls">Robot</span> <span class="kw">extends</span> <span class="cls">TimedRobot</span> {

    <span class="cmt">/** Current high-level robot state. */</span>
    <span class="kw">private</span> <span class="cls">RobotState</span> m_state = <span class="cls">RobotState</span>.IDLE;

    <span class="cmt">/** All subsystems as private final fields. */</span>
    <span class="kw">private final</span> <span class="cls">DriveSubsystem</span>   m_drive   = <span class="kw">new</span> <span class="cls">DriveSubsystem</span>();
    <span class="kw">private final</span> <span class="cls">ShooterSubsystem</span> m_shooter = <span class="kw">new</span> <span class="cls">ShooterSubsystem</span>();

    <span class="kw">public</span> <span class="cls">Robot</span>() {
        configureBindings();
    }

    <span class="cmt">/** Wire controller buttons to commands here. */</span>
    <span class="kw">private void</span> <span class="fn">configureBindings</span>() {
        <span class="cmt">// TODO: trg_shootButton.onTrue(m_shooter.shoot());</span>
        <span class="cmt">// TODO: trg_driveJoystick → m_drive.driveArcade(...);</span>
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">robotPeriodic</span>() {
        <span class="cmt">// Runs all registered periodic() methods for every subsystem</span>
        <span class="cls">CommandScheduler</span>.getInstance().<span class="fn">run</span>();
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">teleopInit</span>() {
        m_state = <span class="cls">RobotState</span>.DRIVING;
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">disabledInit</span>() {
        m_state = <span class="cls">RobotState</span>.IDLE;
    }
}</pre>
</div>

<h3 class="sub">submission checklist</h3>
<p>go through this before you open your PR. each item has a one-line example of what "correct" looks like.</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">WRT naming (required)</div><div class="cc-title">k prefix, m_ prefix, PascalCase classes</div><div class="cc-desc">every constant has <code>k</code>: <code>public static final int kMotorID = 5;</code>. every member var has <code>m_</code>: <code>private double m_speed = 0.0;</code>. class names are PascalCase, method names are camelCase. if you see a naked number or a variable named just <code>speed</code>, fix it.</div></div>
  <div class="concept-card"><div class="cc-label">Javadocs (required)</div><div class="cc-title">Every public method documented</div><div class="cc-desc">every <code>public</code> method needs a <code>/** ... */</code> comment above it explaining what it does. example: <code>/** Sets the drive speed. @param speed -1.0 to 1.0 */</code>. if your IDE shows a yellow underline on a public method, that's probably a missing Javadoc warning.</div></div>
  <div class="concept-card"><div class="cc-label">No magic numbers (required)</div><div class="cc-title">Everything in Constants.java</div><div class="cc-desc">search your files for raw literals. <code>new TalonFX(5)</code> is wrong, <code>new TalonFX(DriveK.kFLMotorID)</code> is right. <code>if (speed > 0.8)</code> is wrong, <code>if (speed > DriveK.kMaxSpeed)</code> is right. the only numbers allowed inline are 0, 1, and -1 in trivial arithmetic.</div></div>
  <div class="concept-card"><div class="cc-label">private final hardware (required)</div><div class="cc-title">All hardware fields locked down</div><div class="cc-desc">every motor, sensor, and hardware object in your subsystems must be <code>private final</code>. example: <code>private final TalonFX m_motor = new TalonFX(ShooterK.kTopMotorID);</code>. <code>public</code> hardware fields are a safety and maintainability issue — other classes should never reach into a subsystem and poke hardware directly.</div></div>
  <div class="concept-card"><div class="cc-label">Compiles clean (required)</div><div class="cc-title">Zero red errors in IDE</div><div class="cc-desc">your code must have no compile errors. yellow warnings are ok if you understand them. red errors are not. common sources: missing imports, type mismatches, calling void methods expecting a return value, missing override methods from an interface. fix all red before submitting.</div></div>
  <div class="concept-card"><div class="cc-label">PR title format (required)</div><div class="cc-title">feat: minibot project — [name]</div><div class="cc-desc">your pull request title should follow the format exactly: <code>feat: minibot project — [your name]</code>. this is your first real PR to a team repo and it's also your first exposure to conventional commits format, which WRT uses for all its commit messages. get used to it now.</div></div>
</div>

<h3 class="sub">Grading Rubric</h3>
<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Naming (20pts)</div><div class="cc-title">k, m_, proper case</div><div class="cc-desc">All constants have k prefix. All member vars have m_ prefix. Classes are PascalCase. Methods are camelCase.</div></div>
  <div class="concept-card"><div class="cc-label">Constants (15pts)</div><div class="cc-title">No magic numbers</div><div class="cc-desc">Every number is defined in Constants.java in the appropriate inner class. Nothing hardcoded inline.</div></div>
  <div class="concept-card"><div class="cc-label">OOP (25pts)</div><div class="cc-title">Classes, inheritance, interface, enum</div><div class="cc-desc">DriveSubsystem and ShooterSubsystem show inheritance. RobotState enum is used. Interface from W7 is implemented.</div></div>
  <div class="concept-card"><div class="cc-label">Methods (20pts)</div><div class="cc-title">Parameters, return types, Javadoc</div><div class="cc-desc">All public methods have correct return types, meaningful parameters, and Javadoc. No void where a value should be returned.</div></div>
  <div class="concept-card"><div class="cc-label">Loops + Arrays (10pts)</div><div class="cc-title">SensorProcessor usage</div><div class="cc-desc">SensorProcessor.java uses arrays and loops correctly. No while loops in periodic methods.</div></div>
  <div class="concept-card"><div class="cc-label">Code Style (10pts)</div><div class="cc-title">Readable, commented</div><div class="cc-desc">Code is consistently indented. Comments explain the why, not the what. No dead code or commented-out blocks.</div></div>
</div>

<h3 class="sub" id="weekly-test">Week 8 Review Quiz</h3>
<p>covers material from all 8 weeks — think of it as a mini version of the final java quiz</p>
<div class="weekly-test-block">
  <div class="wt-header">
    <div class="wt-icon"><i data-lucide="clipboard-list"></i></div>
    <div>
      <div class="wt-title">week 8 test</div>
      <div class="wt-sub">comprehensive review · 10 questions · all topics</div>
    </div>
  </div>
  <div id="test-summer-w8"></div>
</div>

<script>
const test_w8 = new Quiz('test-summer-w8', [
  { question: "On WRT, constants are declared as:", options: ["public static final with SCREAMING_SNAKE","private final with k prefix","public final with k prefix","static int with no prefix"], correct: 1, explanation: "WRT constants use <code>k</code> prefix and are <code>final</code>. They live inside inner classes in Constants.java — e.g., <code>DriveK.kFLMotorID</code>." },
  { question: "What is the WRT entry point pattern?", options: ["RobotContainer creates subsystems","Main.java → Robot extends TimedRobot, subsystems as fields","Robot extends CommandRobot","Main.java → Robot extends SubsystemBase"], correct: 1, explanation: "WRT uses <code>Main.java</code> → <code>Robot extends TimedRobot</code>. Subsystems are <code>private final</code> fields in Robot. No RobotContainer." },
  { question: "Why are while loops forbidden inside periodic()?", options: ["They slow down the JVM","They block the 20ms robot loop, triggering the watchdog","WPILib doesn't support them","They cause memory leaks"], correct: 1, explanation: "<code>periodic()</code> must return within 20ms. A while loop blocks it indefinitely. The watchdog fires, the robot faults." },
  { question: "What does <code>CommandScheduler.getInstance().run()</code> do?", options: ["Creates a new command","Cancels all running commands","Runs all subsystem periodic() methods and advances commands","Starts the robot loop"], correct: 2, explanation: "This is the heartbeat of the command-based framework. It calls <code>periodic()</code> on every registered subsystem and advances all active commands." },
  { question: "Which is the correct way to store a drivetrain's motor?", options: ["public TalonFX motor;","static int m_motor;","private final TalonFX m_leftMotor;","final double kMotor;"], correct: 2, explanation: "Hardware fields are always <code>private final</code> with the <code>m_</code> prefix. <code>public</code> exposes internals. <code>static</code> doesn't make sense for hardware." },
  { question: "What does <code>(int) 4.9</code> evaluate to?", options: ["5 (rounded up)","4 (truncated)","Error","4.9"], correct: 1, explanation: "Casting to int always truncates toward zero — it doesn't round. <code>(int) 4.9 = 4</code>. Use <code>Math.round()</code> when you need rounding." },
  { question: "An enum is best used for:", options: ["Storing a list of numbers","Representing a fixed set of named states or modes","Declaring class fields","Type casting between primitives"], correct: 1, explanation: "Enums represent a fixed, named set of values. In robot code: <code>RobotState.IDLE</code>, <code>RobotState.SHOOTING</code>. Much safer than using ints or Strings for state." },
  { question: "What is the purpose of the <code>k</code> prefix on a constant?", options: ["It's a required Java keyword","It's WRT convention marking a constant value (final)","It makes the variable public","It prevents runtime errors"], correct: 1, explanation: "The <code>k</code> prefix is WRT convention (from our codebase). It visually distinguishes constants from variables at a glance. Combined with <code>final</code>, it enforces immutability." },
  { question: "Which method in SubsystemBase runs every robot loop cycle?", options: ["init()","update()","periodic()","run()"], correct: 2, explanation: "<code>periodic()</code> is called every 20ms by the CommandScheduler. Put state updates, logging, and odometry math here." },
  { question: "Which of these correctly implements an interface <code>ISensor</code>?", options: ["class MyClass extends ISensor","class MyClass inherits ISensor","class MyClass implements ISensor","interface MyClass uses ISensor"], correct: 2, explanation: "Classes <em>implement</em> interfaces. <code>extends</code> is for class inheritance. An interface is a contract — the implementing class must provide all the interface's methods." }
], 'summer-w8-test');
</script>
