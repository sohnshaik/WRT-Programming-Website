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

<h3 class="sub">Week 2 — Logic &amp; Control Flow</h3>
<table>
<thead><tr><th>Concept</th><th>Key Syntax</th><th>FRC Use Case</th></tr></thead>
<tbody>
<tr><td>Boolean operators</td><td><code>&amp;&amp;</code> <code>||</code> <code>!</code></td><td>Guard conditions: <code>isEnabled &amp;&amp; hasTarget</code></td></tr>
<tr><td>if / else if / else</td><td><code>if (x) { } else if (y) { } else { }</code></td><td>Auto state logic, sensor range checks</td></tr>
<tr><td>Switch</td><td><code>switch(val) { case X: ...; break; }</code></td><td>Game state machine, robot mode selection</td></tr>
<tr><td>Ternary</td><td><code>int x = (a > b) ? a : b;</code></td><td>Compact speed clamping, direction flags</td></tr>
</tbody>
</table>

<h3 class="sub">Weeks 3 &amp; 4 — Loops, Arrays, Methods</h3>
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

<h3 class="sub">Weeks 5, 6, 7 — OOP</h3>
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

<h3 class="sub">Common Mistakes (and how to dodge them)</h3>
<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Integer Division</div><div class="cc-title">5 / 2 = 2, not 2.5</div><div class="cc-desc">Cast to double first: <code>(double) ticks / kTicksPerRev</code>. Bites you in encoder math every time.</div></div>
  <div class="concept-card"><div class="cc-label">== vs .equals()</div><div class="cc-title">For objects, use .equals()</div><div class="cc-desc"><code>==</code> checks reference identity for objects. Strings must use <code>.equals()</code>. Primitives use <code>==</code>.</div></div>
  <div class="concept-card"><div class="cc-label">While loops in robot</div><div class="cc-title">DO NOT DO THIS</div><div class="cc-desc"><code>periodic()</code> is already called every 20ms. A while loop inside it will freeze the robot loop and trigger the watchdog.</div></div>
  <div class="concept-card"><div class="cc-label">Missing break in switch</div><div class="cc-title">Fall-through is silent</div><div class="cc-desc">Forgetting <code>break;</code> in a switch case will silently run the next case too. The compiler won't warn you.</div></div>
  <div class="concept-card"><div class="cc-label">Hardcoded numbers</div><div class="cc-title">Put them in Constants</div><div class="cc-desc">Never write <code>new TalonFX(5)</code>. Always <code>new TalonFX(DriveK.kFLMotorID)</code>. Hardware changes = one-line fix.</div></div>
  <div class="concept-card"><div class="cc-label">Truncation ≠ Rounding</div><div class="cc-title">(int) 3.9 = 3, not 4</div><div class="cc-desc">Java casts to int by dropping the decimal, not rounding. Use <code>Math.round()</code> if you actually need rounding.</div></div>
</div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-2">FRC &amp; WRT Resources</h2>
<p>you don't need to memorize everything — you need to know where to look. these are the only links you'll actually need during build season.</p>

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

<h3 class="sub">What You Should Have</h3>
<p>by the end of week 7 you should have created all of these files. if any are missing, go back to that week and complete them first.</p>

<table>
<thead><tr><th>File</th><th>Created in</th><th>What it has</th></tr></thead>
<tbody>
<tr><td><code>Constants.java</code></td><td>Week 1</td><td>Inner classes <code>DriveK</code> and <code>ShooterK</code> with typed, named constants</td></tr>
<tr><td><code>AutoLogic.java</code></td><td>Week 2</td><td>Static method using if/switch to select an auto routine</td></tr>
<tr><td><code>SensorProcessor.java</code></td><td>Week 3</td><td>Static methods using loops + arrays to process sensor data</td></tr>
<tr><td><code>DriveCalculator.java</code></td><td>Week 4</td><td>Static math utility methods (unit conversions, clamping)</td></tr>
<tr><td><code>DriveSubsystem.java</code></td><td>Week 5</td><td>Extends SubsystemBase, <code>periodic()</code>, getter/setter methods</td></tr>
<tr><td><code>ShooterSubsystem.java</code></td><td>Week 6</td><td>Extends same base class as DriveSubsystem, demonstrates inheritance</td></tr>
<tr><td><code>RobotState.java</code></td><td>Week 7</td><td>Enum with IDLE, DRIVING, SHOOTING states + an interface</td></tr>
</tbody>
</table>

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
