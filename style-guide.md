---
layout: default
title: Java Style Guide
permalink: /style-guide/
no_auth_guard: true
---

<div class="page-hero" style="border-bottom:4px solid #C41230">
  <div class="ph-breadcrumb"><a href="{{ '/' | relative_url }}">home</a><span>/</span><span>style guide</span></div>
  <div class="ph-badge badge-summer">reference</div>
  <h1>WRT Java Style Guide</h1>
  <p>how we write code on team 2974. read this before writing a single line for a real robot :)</p>
</div>

<div class="content-wrap">

<div class="callout danger"><p><strong>this is not optional!!</strong> PRs that don't follow these conventions will get review comments and sent back. it's not personal, it's just how we keep 8+ programmers from losing their minds during build season :D</p></div>

<h2 class="sh">naming conventions</h2>
<p>we use specific prefixes so you can tell what kind of thing a variable is just by looking at its name. no guessing required.</p>

<table>
<thead><tr><th>prefix</th><th>what it's for</th><th>example</th></tr></thead>
<tbody>
<tr><td>k</td><td>constants (final static values, usually in a Constants.java nested class)</td><td><code>kShooterMotorID</code>, <code>kMaxTranslationSpeed_mps</code></td></tr>
<tr><td>m_</td><td>member/instance variables (fields on a class)</td><td><code>m_drivetrain</code>, <code>m_shooter</code>, <code>m_isRunning</code></td></tr>
<tr><td>trg_</td><td>Trigger objects (WPILib button bindings)</td><td><code>trg_shoot</code>, <code>trg_intakeIn</code></td></tr>
<tr><td>log_</td><td>logging/telemetry objects (AdvantageKit, DataLog)</td><td><code>log_robotPose</code>, <code>log_shooterRPM</code></td></tr>
<tr><td>sig_</td><td>Phoenix 6 StatusSignal objects</td><td><code>sig_velocity</code>, <code>sig_appliedVolts</code></td></tr>
</tbody>
</table>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — naming in practice</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">ShooterSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> {

    <span class="cmt">// m_ prefix for instance fields</span>
    <span class="kw">private final</span> <span class="cls">CANSparkFlex</span> m_shooterMotor;
    <span class="kw">private</span> <span class="type">double</span> m_targetRPS = <span class="num">0.0</span>;
    <span class="kw">private</span> <span class="type">boolean</span> m_isSpunUp = <span class="kw">false</span>;

    <span class="kw">public</span> <span class="cls">ShooterSubsystem</span>() {
        <span class="cmt">// k prefix for constants from Constants.java</span>
        m_shooterMotor = <span class="kw">new</span> <span class="cls">CANSparkFlex</span>(ShooterK.kMotorID, <span class="cls">MotorType</span>.kBrushless);
    }
}</pre>
</div>

<h2 class="sh">constants file structure</h2>
<p>all constants live in <code>Constants.java</code> using nested static classes with the <code>K</code> suffix (short for "constants" -- yes it's a convention, just roll with it lol).</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — Constants.java structure</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public final class</span> <span class="cls">Constants</span> {

    <span class="cmt">// one nested class per subsystem</span>
    <span class="kw">public static final class</span> <span class="cls">ShooterK</span> {
        <span class="kw">public static final int</span>    kMotorID    = <span class="num">11</span>;
        <span class="kw">public static final double</span> kIdleRPS    = <span class="num">0.0</span>;
        <span class="kw">public static final double</span> kShootRPS   = <span class="num">80.0</span>;
        <span class="kw">public static final String</span> kLogTab     = <span class="str">"Shooter"</span>;
    }

    <span class="kw">public static final class</span> <span class="cls">DriveK</span> {
        <span class="cmt">// include units in the name to avoid conversion bugs!!</span>
        <span class="kw">public static final double</span> kMaxTranslation_mps = <span class="num">4.5</span>;
        <span class="kw">public static final double</span> kMaxRotation_radps  = <span class="num">9.42</span>;
        <span class="kw">public static final double</span> kWheelRadius_m      = <span class="num">0.0508</span>;
    }

    <span class="kw">public static final class</span> <span class="cls">ControllerK</span> {
        <span class="kw">public static final int</span> kDriverPort   = <span class="num">0</span>;
        <span class="kw">public static final int</span> kOperatorPort = <span class="num">1</span>;
    }
}</pre>
</div>

<div class="callout tip"><p><strong>unit suffixes!!</strong> always include the unit in the constant name for any physical value. <code>kShootSpeed</code> is ambiguous. <code>kShootRPS</code> (rotations per second) or <code>kMaxTranslation_mps</code> (meters per second) is not. this has literally prevented robot crashes. not joking.</p></div>

<h2 class="sh">casing rules</h2>
<div class="concept-grid">
  <div class="concept-card">
    <div class="cc-label">camelCase</div>
    <div class="cc-title">variables + methods</div>
    <div class="cc-desc"><code>motorSpeed</code>, <code>isRunning</code>, <code>getTargetAngle()</code>. first word lowercase, each new word capitalized.</div>
  </div>
  <div class="concept-card">
    <div class="cc-label">PascalCase</div>
    <div class="cc-title">classes + interfaces</div>
    <div class="cc-desc"><code>ShooterSubsystem</code>, <code>DriveCommand</code>, <code>RobotContainer</code>. every word capitalized.</div>
  </div>
  <div class="concept-card">
    <div class="cc-label">k + PascalCase</div>
    <div class="cc-title">constants</div>
    <div class="cc-desc"><code>kMotorID</code>, <code>kMaxSpeed_mps</code>. always <code>k</code> lowercase, then PascalCase. <strong>not</strong> SCREAMING_SNAKE on this team.</div>
  </div>
  <div class="concept-card">
    <div class="cc-label">m_ + camelCase</div>
    <div class="cc-title">member variables</div>
    <div class="cc-desc"><code>m_shooter</code>, <code>m_isSpunUp</code>. the underscore is part of the prefix, not the name.</div>
  </div>
</div>

<div class="callout warning"><p><strong>we don't use SCREAMING_SNAKE_CASE</strong> for constants on this team. i know java tutorials use it. we don't. use <code>k</code> prefix + PascalCase. yes this is different from standard java conventions. no we don't care lol</p></div>

<h2 class="sh">comments</h2>
<p>comments explain <em>why</em>, not <em>what</em>. the code already says what it does. you explain why it's doing that specific thing, especially if it looks weird.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — bad vs good comments</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// BAD: just restates the code, adds nothing</span>
<span class="cmt">// set motor speed to 0.5</span>
m_motor.set(<span class="num">0.5</span>);

<span class="cmt">// GOOD: explains why 0.5, what this achieves</span>
<span class="cmt">// ramp slowly to avoid current spike on enable</span>
m_motor.set(<span class="num">0.5</span>);

<span class="cmt">// ALSO GOOD: explains a non-obvious workaround</span>
<span class="cmt">// inverted because motor is mounted backwards on Oasis (but not Watergate)</span>
m_motor.setInverted(<span class="kw">true</span>);</pre>
</div>

<h3 class="sub">javadoc for public methods</h3>
<p>any public method that's non-trivial needs a javadoc. especially anything other subsystems or commands will call.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — javadoc format</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">/**
 * Sets the shooter target speed and begins spinning up.
 *
 * @param targetRPS desired flywheel speed in rotations per second
 */</span>
<span class="kw">public void</span> <span class="fn">setTargetRPS</span>(<span class="type">double</span> targetRPS) {
    m_targetRPS = targetRPS;
    m_controller.setSetpoint(targetRPS);
}</pre>
</div>

<h2 class="sh">magic numbers = banned :)</h2>
<p>a magic number is a raw number in your code with no explanation. they're basically bugs waiting to happen because nobody knows what they mean 6 months later.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — magic numbers</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// BAD -- what is 11? what is 80? who knows!!</span>
m_motor = <span class="kw">new</span> <span class="cls">CANSparkFlex</span>(<span class="num">11</span>, <span class="cls">MotorType</span>.kBrushless);
m_controller.setSetpoint(<span class="num">80.0</span>);

<span class="cmt">// GOOD -- self-documenting, easy to change from one place</span>
m_motor = <span class="kw">new</span> <span class="cls">CANSparkFlex</span>(ShooterK.kMotorID, <span class="cls">MotorType</span>.kBrushless);
m_controller.setSetpoint(ShooterK.kShootRPS);</pre>
</div>

<h2 class="sh">subsystem structure</h2>
<p>all subsystems extend <code>SubsystemBase</code> and follow the same section layout. makes it easier to jump between files without getting lost.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — subsystem template</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">package</span> frc.robot.subsystems;

<span class="kw">import</span> edu.wpi.first.wpilibj2.command.SubsystemBase;

<span class="kw">public class</span> <span class="cls">ExampleSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> {

    <span class="cmt">// ---- HARDWARE -----------------------------------------------</span>
    <span class="kw">private final</span> <span class="cls">CANSparkFlex</span> m_motor;

    <span class="cmt">// ---- STATE --------------------------------------------------</span>
    <span class="kw">private</span> <span class="type">double</span> m_targetRPS = <span class="num">0.0</span>;

    <span class="cmt">// ---- CONSTRUCTOR --------------------------------------------</span>
    <span class="kw">public</span> <span class="cls">ExampleSubsystem</span>() {
        m_motor = <span class="kw">new</span> <span class="cls">CANSparkFlex</span>(ExampleK.kMotorID, <span class="cls">MotorType</span>.kBrushless);
        configureMotor();
    }

    <span class="kw">private void</span> <span class="fn">configureMotor</span>() {
        m_motor.restoreFactoryDefaults();
        m_motor.setInverted(<span class="kw">false</span>);
        m_motor.burnFlash(); <span class="cmt">// saves config to motor controller NVRAM</span>
    }

    <span class="cmt">// ---- PUBLIC API ---------------------------------------------</span>
    <span class="kw">public void</span> <span class="fn">setSpeed</span>(<span class="type">double</span> rps) { m_targetRPS = rps; }

    <span class="kw">public boolean</span> <span class="fn">isAtTarget</span>() {
        <span class="kw">return</span> Math.abs(m_motor.getEncoder().getVelocity() - m_targetRPS) &lt; ExampleK.kTolerance_rps;
    }

    <span class="cmt">// ---- PERIODIC -----------------------------------------------</span>
    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">periodic</span>() {
        <span class="cmt">// runs every 20ms. telemetry + closed-loop control goes here</span>
        m_motor.set(m_targetRPS / ExampleK.kMaxRPS);
    }
}</pre>
</div>

<h2 class="sh">no while loops in robot code</h2>
<div class="callout danger"><p><strong>seriously, no while loops.</strong> the robot runs a 20ms control loop managed by WPILib. a blocking while loop freezes that loop and the watchdog kills the robot. use commands, state machines, or periodic methods instead.</p></div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — while loop vs command-based</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// NEVER DO THIS in robot code</span>
<span class="kw">while</span> (!m_shooter.isAtTarget()) {
    <span class="cmt">// blocks the entire robot loop. watchdog WILL fire. robot dies.</span>
}

<span class="cmt">// CORRECT: use a command with isFinished()</span>
<span class="kw">new</span> <span class="cls">WaitUntilCommand</span>(m_shooter::isAtTarget)
    .andThen(<span class="kw">new</span> <span class="cls">ShootCommand</span>(m_shooter));</pre>
</div>

<h2 class="sh">git conventions</h2>
<p>check O1 for the full git workflow. these are the non-negotiables:</p>

<table>
<thead><tr><th>rule</th><th>why</th></tr></thead>
<tbody>
<tr><td>never commit directly to <code>main</code></td><td>main = always working. one bad push during competition is a crisis</td></tr>
<tr><td>branch name: <code>type/short-desc</code></td><td><code>feature/shooter-pid</code>, <code>fix/intake-stall</code>, <code>refactor/constants-cleanup</code></td></tr>
<tr><td>commit messages: imperative tense</td><td>"add shooter PID" not "added shooter PID" or "adding shooter PID"</td></tr>
<tr><td>keep PRs small and focused</td><td>one feature per PR. giant PRs are painful to review and silently break things</td></tr>
<tr><td>needs at least one approval</td><td>sohan, hrehaan, or alexandra reviews before merging to main</td></tr>
</tbody>
</table>

<h2 class="sh">WPILib 2025 notes</h2>
<p>WPILib updates every year and things get deprecated. here's what matters for 2025:</p>

<div class="concept-grid">
  <div class="concept-card">
    <div class="cc-label">Java 17</div>
    <div class="cc-title">still required</div>
    <div class="cc-desc">WPILib 2025 uses Java 17. WPILib installer sets this up automatically. don't mess with the JDK path.</div>
  </div>
  <div class="concept-card">
    <div class="cc-label">REVLib 2025</div>
    <div class="cc-title">SparkFlex added</div>
    <div class="cc-desc">CANSparkFlex is the Spark MAX successor. we use both. config API is nearly identical so it's not too bad.</div>
  </div>
  <div class="concept-card">
    <div class="cc-label">Phoenix 6</div>
    <div class="cc-title">use this, not Phoenix 5</div>
    <div class="cc-desc">Phoenix 6 is the current CTRE library. Phoenix 5 / old TalonSRX API is deprecated. if you see Phoenix 5 in old code, don't copy it.</div>
  </div>
  <div class="concept-card">
    <div class="cc-label">Commands</div>
    <div class="cc-title">no big changes</div>
    <div class="cc-desc">command-based architecture is stable. SubsystemBase, CommandBase, Scheduler all work the same as before.</div>
  </div>
</div>

<div class="callout info"><p><strong>not sure what version we're on?</strong> check <code>build.gradle</code> in the robot repo. look for the wpilib version string. if you're confused just ask before changing anything :)</p></div>

<h2 class="sh">pre-PR checklist</h2>
<p>run through this before opening a pull request. if you can't check all of these, fix it first!!</p>

<div class="concept-grid">
  <div class="concept-card">
    <div class="cc-label">naming</div>
    <div class="cc-title">prefixes used correctly?</div>
    <div class="cc-desc">k, m_, trg_, log_ where appropriate. no raw magic numbers. no SCREAMING_SNAKE.</div>
  </div>
  <div class="concept-card">
    <div class="cc-label">comments</div>
    <div class="cc-title">public methods documented?</div>
    <div class="cc-desc">any public non-trivial method has a javadoc. workarounds have inline comments explaining why.</div>
  </div>
  <div class="concept-card">
    <div class="cc-label">constants</div>
    <div class="cc-title">in Constants.java?</div>
    <div class="cc-desc">no hardcoded IDs, speeds, or PID values in subsystem files. all in the relevant K class.</div>
  </div>
  <div class="concept-card">
    <div class="cc-label">loops</div>
    <div class="cc-title">no while loops?</div>
    <div class="cc-desc">no blocking loops anywhere in robot code. check commands, periodic methods, and auto routines.</div>
  </div>
  <div class="concept-card">
    <div class="cc-label">burnFlash</div>
    <div class="cc-title">called after config?</div>
    <div class="cc-desc">any SparkMAX/SparkFlex config needs <code>burnFlash()</code> to persist through power cycles. easy to forget.</div>
  </div>
  <div class="concept-card">
    <div class="cc-label">sim</div>
    <div class="cc-title">doesn't crash in sim?</div>
    <div class="cc-desc">run in simulation mode. it doesn't need to work perfectly, it just shouldn't throw exceptions.</div>
  </div>
</div>

</div>
