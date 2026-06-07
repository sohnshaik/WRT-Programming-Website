---
layout: week
title: "Command-Based Architecture"
subtitle: "Subsystems, Commands, Triggers, and the Command Scheduler — the way 2974 actually structures robot code."
badge: "Offseason · Week 3 of 8"
phase: offseason
phase_label: Offseason
week_label: "Week O3"
page_id: "offseason-o3"
weekly_test: true
topics:
  - Subsystems
  - Command Lifecycle
  - Triggers & Bindings
  - Command Compositions
prev_url: "/weeks/offseason/os-week2"
prev_title: "O2 — WPILib Setup"
next_url: "/weeks/offseason/os-week4"
next_title: "O4 — Motors & Sensors"
---

<h2 class="sh" id="topic-1">Subsystems</h2>
<p>A subsystem is a class that owns hardware and exposes what that hardware can do. The key rule: <strong>nothing outside the subsystem directly touches its motors or sensors.</strong> Everything goes through methods. This is how 2974's Rebuilt codebase is structured — <code>Intake</code>, <code>Indexer</code>, <code>Shooter</code>, <code>Drivetrain</code> are all subsystems.</p>

<h3 class="sub">Minimal Subsystem Structure</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — IntakeSubsystem.java (WRT style)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> edu.wpi.first.wpilibj2.command.<span class="cls">SubsystemBase</span>;
<span class="kw">import</span> com.ctre.phoenix6.hardware.<span class="cls">TalonFX</span>;
<span class="kw">import</span> com.ctre.phoenix6.configs.<span class="cls">TalonFXConfiguration</span>;
<span class="kw">import</span> com.ctre.phoenix6.signals.<span class="cls">NeutralModeValue</span>;

<span class="kw">public class</span> <span class="cls">IntakeSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> {

    <span class="cmt">// -- Hardware --</span>
    <span class="kw">private final</span> <span class="cls">TalonFX</span> m_rollerMotor;

    <span class="cmt">// -- Constants --</span>
    <span class="kw">private static final int</span>    kMotorID        = <span class="num">9</span>;
    <span class="kw">private static final double</span> kIntakeSpeed    = <span class="num">0.8</span>;
    <span class="kw">private static final int</span>    kCurrentLimit_A = <span class="num">40</span>;

    <span class="kw">public</span> <span class="fn">IntakeSubsystem</span>() {
        m_rollerMotor = <span class="kw">new</span> <span class="cls">TalonFX</span>(kMotorID);
        var config = <span class="kw">new</span> <span class="cls">TalonFXConfiguration</span>();
        config.MotorOutput.NeutralMode = <span class="cls">NeutralModeValue</span>.Coast;
        config.CurrentLimits.StatorCurrentLimit = kCurrentLimit_A;
        config.CurrentLimits.StatorCurrentLimitEnable = <span class="kw">true</span>;
        m_rollerMotor.<span class="fn">getConfigurator</span>().<span class="fn">apply</span>(config);
    }

    <span class="cmt">// ── Public methods (Commands call these) ───────────────────</span>
    <span class="kw">public void</span> <span class="fn">intake</span>()  { m_rollerMotor.<span class="fn">set</span>( kIntakeSpeed); }
    <span class="kw">public void</span> <span class="fn">eject</span>()   { m_rollerMotor.<span class="fn">set</span>(-kIntakeSpeed); }
    <span class="kw">public void</span> <span class="fn">stop</span>()    { m_rollerMotor.<span class="fn">set</span>(<span class="num">0</span>); }

    <span class="cmt">// ── Sensor reads ───────────────────────────────────────────</span>
    <span class="kw">public double</span> <span class="fn">getCurrent_A</span>() {
        <span class="kw">return</span> m_rollerMotor.<span class="fn">getStatorCurrent</span>().<span class="fn">getValueAsDouble</span>();
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">periodic</span>() {
        <span class="cmt">// Log data every 20ms for debugging</span>
        SmartDashboard.<span class="fn">putNumber</span>(<span class="str">"Intake/Current_A"</span>, <span class="fn">getCurrent_A</span>());
    }
}</pre>
</div>

<div class="callout tip"><p><strong>getConfigurator().apply():</strong> Phoenix 6 uses a configuration object pattern — build a <code>TalonFXConfiguration</code>, set all your options, then call <code>getConfigurator().apply(config)</code> once in the constructor. no burnFlash() needed.</p></div>

<h3 class="sub">Superstructure Pattern</h3>
<p>In Rebuilt, there's a <code>Superstructure</code> class that coordinates multiple subsystems. It's not a WPILib thing — it's a design pattern the team uses. Instead of commands reaching into multiple subsystems, the Superstructure has state-machine methods like <code>intake()</code>, <code>score()</code>, <code>stow()</code> that internally orchestrate the Intake, Indexer, and Shooter together.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — Superstructure concept</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">Superstructure</span> {
    <span class="kw">private final</span> <span class="cls">IntakeSubsystem</span>  m_intake;
    <span class="kw">private final</span> <span class="cls">IndexerSubsystem</span> m_indexer;
    <span class="kw">private final</span> <span class="cls">ShooterSubsystem</span> m_shooter;

    <span class="cmt">// High-level action: coordinates all three subsystems</span>
    <span class="kw">public void</span> <span class="fn">runIntake</span>() {
        m_intake.<span class="fn">intake</span>();
        m_indexer.<span class="fn">index</span>();
    }

    <span class="kw">public void</span> <span class="fn">stopAll</span>() {
        m_intake.<span class="fn">stop</span>();
        m_indexer.<span class="fn">stop</span>();
        m_shooter.<span class="fn">stop</span>();
    }
}</pre>
</div>

<h3 class="sub">Topic 1 — Quick Check</h3>
<div id="quiz-o3-t1"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-2">Command Lifecycle</h2>
<p>Commands are units of robot behavior. Every command goes through the same 4-method lifecycle — understanding this cold will save you hours of debugging.</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">initialize()</div><div class="cc-title">One-time setup</div><div class="cc-desc">Runs once when the command is scheduled. Good for resetting timers, setting initial state, or seeding a target value.</div></div>
  <div class="concept-card"><div class="cc-label">execute()</div><div class="cc-title">The loop</div><div class="cc-desc">Runs every 20ms while the command is active. This is where you control hardware — set motor speeds, update PID, etc.</div></div>
  <div class="concept-card"><div class="cc-label">isFinished()</div><div class="cc-title">Done condition</div><div class="cc-desc">Returns true to tell the Scheduler to end the command. Return false to keep running forever (teleop drive). Return true once a sensor condition is met.</div></div>
  <div class="concept-card"><div class="cc-label">end(boolean)</div><div class="cc-title">Cleanup</div><div class="cc-desc">Runs once when done. The boolean arg is true if interrupted. Always stop motors here so they don't run away when interrupted.</div></div>
</div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — Command pattern (WRT naming)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">IntakeUntilSensorCmd</span> <span class="kw">extends</span> <span class="cls">Command</span> {
    <span class="kw">private final</span> <span class="cls">IntakeSubsystem</span>  m_intake;
    <span class="kw">private final</span> <span class="cls">IndexerSubsystem</span> m_indexer;

    <span class="kw">public</span> <span class="fn">IntakeUntilSensorCmd</span>(<span class="cls">IntakeSubsystem</span> intake, <span class="cls">IndexerSubsystem</span> indexer) {
        m_intake  = intake;
        m_indexer = indexer;
        <span class="fn">addRequirements</span>(intake, indexer); <span class="cmt">// claim both subsystems</span>
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">initialize</span>() {
        <span class="cmt">// Start spinning as soon as command begins</span>
        m_intake.<span class="fn">intake</span>();
        m_indexer.<span class="fn">index</span>();
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">execute</span>() {
        <span class="cmt">// Nothing to do here — motors already running from initialize()</span>
        <span class="cmt">// If we needed to adjust speed based on current, it would go here</span>
    }

    <span class="kw">@Override</span>
    <span class="kw">public boolean</span> <span class="fn">isFinished</span>() {
        <span class="cmt">// Stop when current spike detects a game piece</span>
        <span class="kw">return</span> m_indexer.<span class="fn">hasPiece</span>();
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">end</span>(<span class="type">boolean</span> interrupted) {
        <span class="cmt">// Always stop motors — this runs even if interrupted</span>
        m_intake.<span class="fn">stop</span>();
        m_indexer.<span class="fn">stop</span>();
    }
}</pre>
</div>

<div class="callout info"><p><strong>Naming convention:</strong> In Rebuilt, command methods use a <code>Cmd()</code> suffix on the subsystem — e.g. <code>intake.intakeCmd()</code> returns a <code>Command</code> that runs intake. This keeps command logic close to the subsystem that owns the hardware instead of in a separate file for every small action.</p></div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — Command factory on the subsystem (Cmd() pattern)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// Inside IntakeSubsystem.java</span>
<span class="kw">public</span> <span class="cls">Command</span> <span class="fn">intakeCmd</span>() {
    <span class="kw">return</span> <span class="fn">startEnd</span>(<span class="kw">this</span>::<span class="fn">intake</span>, <span class="kw">this</span>::<span class="fn">stop</span>)
        .<span class="fn">withName</span>(<span class="str">"IntakeCmd"</span>);
}

<span class="kw">public</span> <span class="cls">Command</span> <span class="fn">ejectCmd</span>() {
    <span class="kw">return</span> <span class="fn">startEnd</span>(<span class="kw">this</span>::<span class="fn">eject</span>, <span class="kw">this</span>::<span class="fn">stop</span>)
        .<span class="fn">withName</span>(<span class="str">"EjectCmd"</span>);
}</pre>
</div>

<h3 class="sub">Topic 2 — Quick Check</h3>
<div id="quiz-o3-t2"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-3">Triggers &amp; Bindings</h2>
<p>Triggers connect driver inputs (and sensor states) to commands. In 2974's codebase, you'll find trigger variable names with the <code>trg_</code> prefix. All bindings live in <code>RobotContainer</code>.</p>

<h3 class="sub">CommandXboxController</h3>
<p>Use <code>CommandXboxController</code> (not the old <code>XboxController</code>). It exposes each button directly as a <code>Trigger</code> object you can chain commands onto.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — RobotContainer.java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> edu.wpi.first.wpilibj2.command.button.<span class="cls">CommandXboxController</span>;

<span class="kw">public class</span> <span class="cls">RobotContainer</span> {

    <span class="cmt">// ── Subsystems ─────────────────────────────────────────────</span>
    <span class="kw">private final</span> <span class="cls">IntakeSubsystem</span>  m_intake  = <span class="kw">new</span> <span class="cls">IntakeSubsystem</span>();
    <span class="kw">private final</span> <span class="cls">ShooterSubsystem</span> m_shooter = <span class="kw">new</span> <span class="cls">ShooterSubsystem</span>();

    <span class="cmt">// ── Controllers ───────────────────────────────────────────</span>
    <span class="kw">private final</span> <span class="cls">CommandXboxController</span> m_driver   = <span class="kw">new</span> <span class="cls">CommandXboxController</span>(<span class="num">0</span>);
    <span class="kw">private final</span> <span class="cls">CommandXboxController</span> m_operator = <span class="kw">new</span> <span class="cls">CommandXboxController</span>(<span class="num">1</span>);

    <span class="kw">public</span> <span class="fn">RobotContainer</span>() {
        <span class="fn">configureBindings</span>();
    }

    <span class="kw">private void</span> <span class="fn">configureBindings</span>() {
        <span class="cmt">// trg_ prefix for trigger variables (WRT convention)</span>
        <span class="kw">var</span> trg_intakeHeld  = m_operator.<span class="fn">rightTrigger</span>(<span class="num">0.1</span>);
        <span class="kw">var</span> trg_ejectHeld   = m_operator.<span class="fn">leftTrigger</span>(<span class="num">0.1</span>);
        <span class="kw">var</span> trg_shootButton = m_operator.<span class="fn">rightBumper</span>();

        <span class="cmt">// whileTrue: runs while button held, ends when released</span>
        trg_intakeHeld.<span class="fn">whileTrue</span>(m_intake.<span class="fn">intakeCmd</span>());
        trg_ejectHeld.<span class="fn">whileTrue</span>(m_intake.<span class="fn">ejectCmd</span>());

        <span class="cmt">// onTrue: runs once when button is pressed, command runs to completion</span>
        trg_shootButton.<span class="fn">onTrue</span>(m_shooter.<span class="fn">shootCmd</span>());
    }
}</pre>
</div>

<h3 class="sub">Trigger Methods</h3>
<table>
<thead><tr><th>Method</th><th>When command runs</th><th>Common use</th></tr></thead>
<tbody>
<tr><td><code>onTrue(cmd)</code></td><td>Once, when button pressed</td><td>One-shot actions (fire, reset)</td></tr>
<tr><td><code>onFalse(cmd)</code></td><td>Once, when button released</td><td>Cleanup on release</td></tr>
<tr><td><code>whileTrue(cmd)</code></td><td>While button held (restarts if it ends)</td><td>Intake, eject, any held action</td></tr>
<tr><td><code>toggleOnTrue(cmd)</code></td><td>Toggles on/off with each press</td><td>Shooter spin-up</td></tr>
</tbody>
</table>

<h3 class="sub">Sensor Triggers</h3>
<p>Triggers don't have to come from buttons. You can make a trigger from any boolean condition — sensor readings, game state, etc.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — trigger from sensor</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> edu.wpi.first.wpilibj2.command.button.<span class="cls">Trigger</span>;

<span class="cmt">// Trigger fires when indexer current exceeds 30A (piece detected)</span>
<span class="kw">var</span> trg_hasPiece = <span class="kw">new</span> <span class="cls">Trigger</span>(() -> m_indexer.<span class="fn">getCurrent_A</span>() > <span class="num">30.0</span>);

<span class="cmt">// Automatically rumble controller when piece is picked up</span>
trg_hasPiece.<span class="fn">onTrue</span>(
    <span class="cls">Commands</span>.<span class="fn">runOnce</span>(() -> m_driver.<span class="fn">getHID</span>().<span class="fn">setRumble</span>(RumbleType.kBothRumble, <span class="num">0.5</span>))
    .<span class="fn">andThen</span>(<span class="cls">Commands</span>.<span class="fn">waitSeconds</span>(<span class="num">0.3</span>))
    .<span class="fn">andThen</span>(<span class="cls">Commands</span>.<span class="fn">runOnce</span>(() -> m_driver.<span class="fn">getHID</span>().<span class="fn">setRumble</span>(RumbleType.kBothRumble, <span class="num">0</span>)))
);</pre>
</div>

<h3 class="sub">Topic 3 — Quick Check</h3>
<div id="quiz-o3-t3"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-4">Command Compositions</h2>
<p>You can chain and combine commands without writing new Command classes. These compositional methods are static helpers in <code>Commands.*</code> — import them with a static import.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — command compositions</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import static</span> edu.wpi.first.wpilibj2.command.Commands.*;

<span class="cmt">// sequence: A → B → C, one at a time</span>
<span class="cls">Command</span> auto = <span class="fn">sequence</span>(
    m_drive.<span class="fn">driveDistanceCmd</span>(<span class="num">1.5</span>),    <span class="cmt">// drive 1.5m</span>
    m_shooter.<span class="fn">spinUpCmd</span>(),             <span class="cmt">// then spin up shooter</span>
    <span class="fn">waitUntil</span>(m_shooter::<span class="fn">atSpeed</span>),     <span class="cmt">// wait for speed</span>
    m_indexer.<span class="fn">feedCmd</span>()                <span class="cmt">// then fire</span>
);

<span class="cmt">// parallel: A and B run simultaneously, wait for BOTH</span>
<span class="cls">Command</span> spinAndDrive = <span class="fn">parallel</span>(
    m_shooter.<span class="fn">spinUpCmd</span>(),
    m_drive.<span class="fn">driveDistanceCmd</span>(<span class="num">2.0</span>)
);

<span class="cmt">// race: run A and B, end when EITHER finishes</span>
<span class="cls">Command</span> intakeOrTimeout = <span class="fn">race</span>(
    m_intake.<span class="fn">intakeUntilPieceCmd</span>(),
    <span class="fn">waitSeconds</span>(<span class="num">3.0</span>)  <span class="cmt">// safety timeout</span>
);

<span class="cmt">// runOnce: one-time lambda, no subsystem requirement</span>
<span class="cls">Command</span> resetOdometry = <span class="fn">runOnce</span>(() -> m_drive.<span class="fn">resetPose</span>(startPose));</pre>
</div>

<div class="callout tip"><p><strong>Always add timeouts to autos.</strong> <code>race(actualCommand, waitSeconds(5.0))</code> prevents a broken sensor from freezing your entire autonomous. In competition, autos that hang are worse than autos that do nothing.</p></div>

<h3 class="sub">Default Commands</h3>
<p>A default command is what runs on a subsystem when no other command is using it. The drivetrain's default command is teleop drive — when no auto command is claiming the drive, the driver has control.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — registering defaults in constructor</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// In RobotContainer constructor (or subsystem constructor)</span>
m_drive.<span class="fn">setDefaultCommand</span>(
    m_drive.<span class="fn">teleopDriveCmd</span>(
        () -> -m_driver.<span class="fn">getLeftY</span>(),
        () -> -m_driver.<span class="fn">getRightX</span>()
    )
);</pre>
</div>

<h3 class="sub">Topic 4 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Write RobotContainer Bindings</div><div class="ch-sub">Triggers, commands, Cmd() pattern</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Write a <code>configureBindings()</code> method for a robot with an <code>IntakeSubsystem</code> and <code>ShooterSubsystem</code>. The operator's right trigger (threshold 0.1) should run intake while held. The right bumper should trigger a shoot sequence: spin up the shooter, wait until at speed, then feed for 0.5 seconds. Use WRT naming conventions (<code>trg_</code> prefix, <code>Cmd()</code> methods).</p>
    <textarea class="code-input" placeholder="private void configureBindings() { ... }"></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-o3-t4')">Show Solution</button></div>
    <div id="sol-o3-t4" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">private void</span> <span class="fn">configureBindings</span>() {
    <span class="kw">var</span> trg_intakeHeld  = m_operator.<span class="fn">rightTrigger</span>(<span class="num">0.1</span>);
    <span class="kw">var</span> trg_shootButton = m_operator.<span class="fn">rightBumper</span>();

    trg_intakeHeld.<span class="fn">whileTrue</span>(m_intake.<span class="fn">intakeCmd</span>());

    trg_shootButton.<span class="fn">onTrue</span>(
        <span class="fn">sequence</span>(
            m_shooter.<span class="fn">spinUpCmd</span>(),
            <span class="fn">waitUntil</span>(m_shooter::<span class="fn">atSpeed</span>),
            m_indexer.<span class="fn">feedCmd</span>().<span class="fn">withTimeout</span>(<span class="num">0.5</span>),
            m_shooter.<span class="fn">stopCmd</span>()
        )
    );
}</pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 4 — Quick Check</h3>
<div id="quiz-o3-t4"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="weekly-test">Weekly Test</h2>
<p>covers command-based architecture. your score goes to the leads :) try it from memory first!!</p>
<div class="weekly-test-block">
  <div class="wt-header">
    <div class="wt-icon">📋</div>
    <div>
      <div class="wt-title">O3 weekly test</div>
      <div class="wt-sub">subsystems, commands, triggers, compositions · 8 questions</div>
    </div>
  </div>
  <div id="test-offseason-o3"></div>
</div>

<script>
// ── TOPIC 1: Subsystems ───────────────────────────────────────
const quiz_o3_t1 = new Quiz('quiz-o3-t1', [
  { question: "Where should motor hardware objects (like TalonFX) be declared?", options: ["In RobotContainer","As a static in Constants.java","As a private member variable inside the subsystem class","In a separate Hardware.java file"], correct: 2, explanation: "Hardware belongs inside the subsystem as a private member. Nothing outside should touch it directly — only through the subsystem's public methods." },
  { question: "Why do we call <code>getConfigurator().apply(config)</code> in the TalonFX constructor?", options: ["Required to start CAN communication","Writes all motor settings (neutral mode, current limits, inversion) to the controller","It speeds up the motor","It resets the encoder to zero"], correct: 1, explanation: "Phoenix 6 uses a configuration object pattern. You build a TalonFXConfiguration, set all your options, then apply it once. Settings take effect immediately." },
  { question: "On WRT, what suffix do command factory methods use?", options: ["Command","Action","Cmd()","Run()"], correct: 2, explanation: "WRT uses the Cmd() suffix — <code>intakeCmd()</code>, <code>shootCmd()</code>, <code>spinUpCmd()</code>. This keeps commands co-located with the subsystem that owns the hardware." }
], 'offseason-o3');

// ── TOPIC 2: Command Lifecycle ────────────────────────────────
const quiz_o3_t2 = new Quiz('quiz-o3-t2', [
  { question: "Where does ongoing motor control logic go in a command?", options: ["initialize()","execute()","end()","isFinished()"], correct: 1, explanation: "execute() runs every 20ms while the command is active. Set motor speeds, update PID, etc. here. initialize() is one-time setup." },
  { question: "Why call addRequirements(subsystem) in a command?", options: ["Initializes the subsystem","Tells the Scheduler this command uses that subsystem, preventing conflicts","Gives the command subsystem access","Optional — just convention"], correct: 1, explanation: "Requirements let the Scheduler prevent two commands from fighting over the same subsystem. The newer command interrupts the older one." },
  { question: "You want a teleop drive command to run forever. isFinished() returns:", options: ["true","false","null","throws exception"], correct: 1, explanation: "Return false to keep running. The command ends only when interrupted — by another command claiming the drivetrain, or robot disable." }
], 'offseason-o3');

// ── TOPIC 3: Triggers ─────────────────────────────────────────
const quiz_o3_t3 = new Quiz('quiz-o3-t3', [
  { question: "On WRT, trigger variables use what prefix?", options: ["btn_","t_","trg_","trigger_"], correct: 2, explanation: "WRT uses <code>trg_</code> prefix for trigger variables — <code>trg_intakeHeld</code>, <code>trg_shootButton</code>. This convention comes straight from the Rebuilt codebase." },
  { question: "Which trigger method runs a command repeatedly while a button is held?", options: ["onTrue()","onFalse()","whileTrue()","toggleOnTrue()"], correct: 2, explanation: "whileTrue() runs the command for as long as the trigger condition is true. When the button is released, the command is interrupted and end() is called." },
  { question: "You want a command to fire once when a current spike is detected. What's the right approach?", options: ["Check the current in execute() and return true from isFinished()","Create a Trigger from a lambda (() -> current > threshold) and call .onTrue()","Poll the sensor in a while loop","Use a timer to check every second"], correct: 1, explanation: "new Trigger(() -> m_subsystem.getCurrent() > 30) creates a trigger from any boolean expression. Then .onTrue(command) fires it once when the condition first becomes true." }
], 'offseason-o3');

// ── TOPIC 4: Compositions ─────────────────────────────────────
const quiz_o3_t4 = new Quiz('quiz-o3-t4', [
  { question: "What does sequence(A, B, C) do?", options: ["Runs all three at once","Runs A, waits for it to finish, then B, then C","Runs whichever finishes first","Runs them in random order"], correct: 1, explanation: "sequence() is serial composition — each command waits for the previous to finish before starting the next. Backbone of most auto routines." },
  { question: "What does race(A, B) do?", options: ["Runs A and B, waits for both","Runs A and B, ends when EITHER finishes","Runs A and then B","Runs whichever has higher priority"], correct: 1, explanation: "race() runs commands in parallel but ends as soon as the FIRST one finishes, interrupting the others. Great for safety timeouts: race(realCommand, waitSeconds(5))." },
  { question: "A default command runs:", options: ["At robot startup only","During disabled mode only","Whenever no other command is using that subsystem","Every 20ms regardless of state"], correct: 2, explanation: "Default commands fill the gap. When nothing else claims the drivetrain, the teleop default runs. When a button command ends, the default resumes automatically." }
], 'offseason-o3');

// ── WEEKLY TEST ───────────────────────────────────────────────
const test_o3 = new Quiz('test-offseason-o3', [
  { question: "What's the purpose of a Subsystem in WPILib?", options: ["Runs the main robot loop","Owns hardware and exposes methods to control it","Stores robot constants","Handles driver input"], correct: 1, explanation: "Subsystems own hardware (motors, sensors) and expose public methods. Nothing external touches the hardware directly." },
  { question: "Where should motor speed setpoint logic go in a running command?", options: ["initialize()","end()","isFinished()","execute()"], correct: 3, explanation: "execute() runs every 20ms. That's where you put ongoing control — updating motor speeds, checking sensors, etc." },
  { question: "What does addRequirements() do?", options: ["Adds subsystem methods to the command","Registers the command with the Scheduler","Prevents two commands from controlling the same subsystem simultaneously","Initializes all required hardware"], correct: 2, explanation: "addRequirements() tells the Scheduler which subsystems a command uses. If another command tries to use the same subsystem, the newer one interrupts the older." },
  { question: "On WRT, trigger variables are named with what prefix?", options: ["btn_","t_","trg_","trigger_"], correct: 2, explanation: "WRT convention: trg_ prefix for trigger variables. This comes from the Rebuilt codebase." },
  { question: "Which composition runs commands one after another?", options: ["parallel()","race()","sequence()","all()"], correct: 2, explanation: "sequence() is serial — A finishes, then B starts, then C. parallel() runs them simultaneously. race() ends when the first finishes." },
  { question: "whileTrue(cmd) on a Trigger means:", options: ["cmd runs once when trigger activates","cmd runs while trigger is true; ends when trigger goes false","cmd toggles on/off","cmd runs indefinitely"], correct: 1, explanation: "whileTrue() keeps the command running as long as the trigger condition is true. When the condition goes false, the command is interrupted." },
  { question: "Where do all button/trigger bindings go on WRT's robot?", options: ["Robot.java","Each subsystem constructor","RobotContainer.configureBindings()","A dedicated Bindings.java file"], correct: 2, explanation: "RobotContainer is the single place where all trigger-to-command bindings are configured. This makes it easy to find and modify driver controls." },
  { question: "You have a shoot auto that sometimes gets stuck. What's the best fix?", options: ["Add a Thread.sleep()","Wrap the command in race() with a waitSeconds() timeout","Increase the motor speed","Check isFinished() more frequently"], correct: 1, explanation: "race(shootCommand, waitSeconds(5)) ensures the sequence moves on even if a sensor never triggers. Always add timeouts to autonomous sequences in competition code." }
], 'offseason-o3-test');
</script>
