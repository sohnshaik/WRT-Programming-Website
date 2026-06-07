---
layout: week
title: "Motors & Sensors"
subtitle: "TalonFX (Phoenix 6), current detection, CANcoder, Pigeon 2 — hardware used in the Rebuilt codebase."
badge: "Offseason · Week 4 of 8"
phase: offseason
phase_label: Offseason
week_label: "Week O4"
page_id: "offseason-o4"
weekly_test: true
topics:
  - TalonFX & Phoenix 6
  - Current-Based Detection
  - CANcoder & Pigeon 2
  - Logging & SmartDashboard
prev_url: "/weeks/offseason/os-week3"
prev_title: "O3 — Command-Based"
next_url: "/weeks/offseason/os-week5"
next_title: "O5 — PID Control"
---

<h2 class="sh" id="topic-1">TalonFX &amp; Phoenix 6</h2>
<p>The TalonFX (Falcon 500 / Kraken X60) is our primary drive and mechanism motor. It uses CTRE's Phoenix 6 library — different API from Phoenix 5, and what the Rebuilt codebase is built on. Learn this one well.</p>

<h3 class="sub">Basic Setup</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — TalonFX setup (Phoenix 6)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> com.ctre.phoenix6.hardware.<span class="cls">TalonFX</span>;
<span class="kw">import</span> com.ctre.phoenix6.configs.<span class="cls">TalonFXConfiguration</span>;
<span class="kw">import</span> com.ctre.phoenix6.signals.<span class="cls">NeutralModeValue</span>;
<span class="kw">import</span> com.ctre.phoenix6.signals.<span class="cls">InvertedValue</span>;

<span class="kw">public class</span> <span class="cls">ShooterSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> {
    <span class="kw">private final</span> <span class="cls">TalonFX</span> m_shooterMotor;

    <span class="kw">private static final int</span> kMotorID = <span class="num">11</span>;

    <span class="kw">public</span> <span class="fn">ShooterSubsystem</span>() {
        m_shooterMotor = <span class="kw">new</span> <span class="cls">TalonFX</span>(kMotorID);

        <span class="cls">TalonFXConfiguration</span> config = <span class="kw">new</span> <span class="cls">TalonFXConfiguration</span>();
        config.MotorOutput.NeutralMode  = NeutralModeValue.Coast;
        config.MotorOutput.Inverted     = InvertedValue.CounterClockwise_Positive;
        config.CurrentLimits.SupplyCurrentLimit       = <span class="num">40</span>;
        config.CurrentLimits.SupplyCurrentLimitEnable = <span class="kw">true</span>;

        m_shooterMotor.<span class="fn">getConfigurator</span>().<span class="fn">apply</span>(config);
    }
}</pre>
</div>

<div class="callout info"><p><strong>Phoenix 6 config approach:</strong> Instead of calling dozens of separate setter methods, Phoenix 6 uses a single <code>TalonFXConfiguration</code> object. Build your full config, then apply it once with <code>getConfigurator().apply(config)</code>. Cleaner and less error-prone.</p></div>

<h3 class="sub">Control Requests — How to Drive a TalonFX</h3>
<p>Phoenix 6 uses <em>control request objects</em> instead of a single <code>set()</code> method. You create the request once, update its value, and call <code>setControl()</code>. The Rebuilt codebase uses these heavily.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — control requests (from Rebuilt)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> com.ctre.phoenix6.controls.<span class="cls">DutyCycleOut</span>;
<span class="kw">import</span> com.ctre.phoenix6.controls.<span class="cls">VelocityTorqueCurrentFOC</span>;
<span class="kw">import</span> com.ctre.phoenix6.controls.<span class="cls">MotionMagicVelocityTorqueCurrentFOC</span>;

<span class="kw">public class</span> <span class="cls">ShooterSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> {
    <span class="kw">private final</span> <span class="cls">TalonFX</span> m_shooterMotor;

    <span class="cmt">// Create request objects ONCE — reuse them every 20ms</span>
    <span class="kw">private final</span> <span class="cls">DutyCycleOut</span>                        m_dutyCycleReq  = <span class="kw">new</span> <span class="cls">DutyCycleOut</span>(<span class="num">0</span>);
    <span class="kw">private final</span> <span class="cls">VelocityTorqueCurrentFOC</span>             m_velocityReq   = <span class="kw">new</span> <span class="cls">VelocityTorqueCurrentFOC</span>(<span class="num">0</span>);

    <span class="cmt">// Simple percent output (-1.0 to 1.0)</span>
    <span class="kw">public void</span> <span class="fn">setPercent</span>(<span class="type">double</span> percent) {
        m_shooterMotor.<span class="fn">setControl</span>(m_dutyCycleReq.<span class="fn">withOutput</span>(percent));
    }

    <span class="cmt">// Velocity control in rotations per second (for spinning up to shot speed)</span>
    <span class="kw">public void</span> <span class="fn">setVelocity_rps</span>(<span class="type">double</span> velocity_rps) {
        m_shooterMotor.<span class="fn">setControl</span>(m_velocityReq.<span class="fn">withVelocity</span>(velocity_rps));
    }

    <span class="kw">public void</span> <span class="fn">stop</span>() {
        m_shooterMotor.<span class="fn">stopMotor</span>();
    }
}</pre>
</div>

<h3 class="sub">Reading TalonFX Signals</h3>
<p>In Phoenix 6, sensor reads are <em>signals</em> — you get a <code>StatusSignal&lt;Double&gt;</code> object, then call <code>.getValueAsDouble()</code>. Get the signal object once in the constructor (sig_ prefix), then read it in periodic.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — StatusSignal reads (sig_ prefix from Rebuilt)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> com.ctre.phoenix6.<span class="cls">StatusSignal</span>;

<span class="kw">public class</span> <span class="cls">ShooterSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> {
    <span class="kw">private final</span> <span class="cls">TalonFX</span> m_shooterMotor;

    <span class="cmt">// Get signal objects once — sig_ prefix (WRT convention)</span>
    <span class="kw">private final</span> <span class="cls">StatusSignal</span><<span class="type">Double</span>> sig_velocity;
    <span class="kw">private final</span> <span class="cls">StatusSignal</span><<span class="type">Double</span>> sig_current;

    <span class="kw">private static final double</span> kAtSpeedThreshold_rps = <span class="num">2.0</span>;
    <span class="kw">private static final double</span> kTargetSpeed_rps       = <span class="num">80.0</span>;

    <span class="kw">public</span> <span class="fn">ShooterSubsystem</span>() {
        m_shooterMotor = <span class="kw">new</span> <span class="cls">TalonFX</span>(<span class="num">11</span>);
        <span class="cmt">// ... config ...</span>

        sig_velocity = m_shooterMotor.<span class="fn">getVelocity</span>();
        sig_current  = m_shooterMotor.<span class="fn">getSupplyCurrent</span>();
    }

    <span class="kw">public double</span> <span class="fn">getVelocity_rps</span>() { <span class="kw">return</span> sig_velocity.<span class="fn">getValueAsDouble</span>(); }
    <span class="kw">public double</span> <span class="fn">getCurrent_A</span>()    { <span class="kw">return</span> sig_current.<span class="fn">getValueAsDouble</span>(); }

    <span class="kw">public boolean</span> <span class="fn">atSpeed</span>() {
        <span class="kw">return</span> Math.<span class="fn">abs</span>(<span class="fn">getVelocity_rps</span>() - kTargetSpeed_rps) < kAtSpeedThreshold_rps;
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">periodic</span>() {
        <span class="cls">StatusSignal</span>.<span class="fn">refreshAll</span>(sig_velocity, sig_current); <span class="cmt">// batch refresh</span>
        SmartDashboard.<span class="fn">putNumber</span>(<span class="str">"Shooter/Velocity_rps"</span>, <span class="fn">getVelocity_rps</span>());
        SmartDashboard.<span class="fn">putBoolean</span>(<span class="str">"Shooter/AtSpeed"</span>, <span class="fn">atSpeed</span>());
    }
}</pre>
</div>

<div class="callout tip"><p><strong>StatusSignal.refreshAll():</strong> Call this in periodic() to refresh multiple signals at once. This is more efficient than calling <code>.refresh()</code> on each signal separately — Phoenix 6 can batch the CAN reads.</p></div>

<h3 class="sub">Topic 1 — Quick Check</h3>
<div id="quiz-o4-t1"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-2">Current-Based Game Piece Detection</h2>
<p>One of the most common patterns in WRT code: detect a game piece by watching for a stator current spike. When intake rollers stall against a note or ball, current jumps. No extra sensor needed.</p>

<h3 class="sub">How it Works</h3>
<p>Stator current is proportional to torque. When a motor stalls, torque and current both spike. Set a threshold — if current exceeds it, something is blocking the mechanism.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — current spike detection (TalonFX)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">private static final double</span> kPieceDetectedCurrent_A = <span class="num">30.0</span>; <span class="cmt">// tune on robot</span>

<span class="kw">public boolean</span> <span class="fn">hasPiece</span>() {
    <span class="kw">return</span> m_rollerMotor.<span class="fn">getStatorCurrent</span>().<span class="fn">getValueAsDouble</span>() &gt; kPieceDetectedCurrent_A;
}

<span class="cmt">// In Robot.java, wire as a Trigger:</span>
<span class="kw">var</span> trg_hasPiece = <span class="kw">new</span> <span class="cls">Trigger</span>(m_intake::<span class="fn">hasPiece</span>);</pre>
</div>

<div class="callout tip"><p><strong>StatusSignals are cached.</strong> <code>getStatorCurrent()</code> returns a <code>StatusSignal</code>. Call <code>.getValueAsDouble()</code> to read the latest value. For tighter timing, use <code>BaseStatusSignal.refreshAll()</code> to batch-refresh multiple signals per CAN frame.</p></div>

<h3 class="sub">Debounce to Avoid False Positives</h3>
<p>A single spike can be a transient. Use WPILib's <code>Debouncer</code> to require the current to stay high for multiple loop cycles before confirming a detection.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — debounced detection</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> edu.wpi.first.math.filter.<span class="cls">Debouncer</span>;

<span class="kw">private final</span> <span class="cls">Debouncer</span> m_pieceDebouncer = <span class="kw">new</span> <span class="cls">Debouncer</span>(<span class="num">0.1</span>); <span class="cmt">// 100ms</span>

<span class="kw">public boolean</span> <span class="fn">hasPiece</span>() {
    <span class="type">boolean</span> over = m_rollerMotor.<span class="fn">getStatorCurrent</span>().<span class="fn">getValueAsDouble</span>()
                        &gt; kPieceDetectedCurrent_A;
    <span class="kw">return</span> m_pieceDebouncer.<span class="fn">calculate</span>(over);
}</pre>
</div>

<div class="callout warning"><p><strong>tune kPieceDetectedCurrent_A on the actual robot.</strong> start high (~50A), watch telemetry during normal operation, then lower until detection is reliable without false positives.</p></div>


<div id="quiz-o4-t2"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-3">CANcoder &amp; Pigeon 2</h2>
<p>CTRE's CANcoder is an absolute magnetic encoder used on swerve module steering. The Pigeon 2 is our IMU (gyroscope + accelerometer). Both use the Phoenix 6 API.</p>

<h3 class="sub">CANcoder Setup</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — CANcoder (swerve steering absolute encoder)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> com.ctre.phoenix6.hardware.<span class="cls">CANcoder</span>;
<span class="kw">import</span> com.ctre.phoenix6.configs.<span class="cls">CANcoderConfiguration</span>;
<span class="kw">import</span> com.ctre.phoenix6.signals.<span class="cls">AbsoluteSensorRangeValue</span>;

<span class="cls">CANcoder</span> m_encoder = <span class="kw">new</span> <span class="cls">CANcoder</span>(<span class="num">20</span>); <span class="cmt">// CAN ID 20</span>

<span class="cls">CANcoderConfiguration</span> config = <span class="kw">new</span> <span class="cls">CANcoderConfiguration</span>();
<span class="cmt">// kUnsigned_0To1 = 0 to 1 rotation (easier math than -0.5 to 0.5)</span>
config.MagnetSensor.AbsoluteSensorRange = AbsoluteSensorRangeValue.Unsigned_0To1;
<span class="cmt">// Offset to align 0° to the physical "forward" position of the module</span>
config.MagnetSensor.MagnetOffset = <span class="num">0.247</span>; <span class="cmt">// set per-module during calibration</span>
m_encoder.<span class="fn">getConfigurator</span>().<span class="fn">apply</span>(config);

<span class="cmt">// Read absolute position in rotations</span>
<span class="cls">StatusSignal</span><<span class="type">Double</span>> sig_absPos = m_encoder.<span class="fn">getAbsolutePosition</span>();
<span class="type">double</span> absPosition_rot = sig_absPos.<span class="fn">getValueAsDouble</span>(); <span class="cmt">// 0.0 to 1.0</span></pre>
</div>

<h3 class="sub">Pigeon 2 Gyroscope</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — Pigeon 2 (Phoenix 6)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> com.ctre.phoenix6.hardware.<span class="cls">Pigeon2</span>;

<span class="kw">public class</span> <span class="cls">DrivetrainSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> {
    <span class="kw">private final</span> <span class="cls">Pigeon2</span> m_gyro;
    <span class="kw">private final</span> <span class="cls">StatusSignal</span><<span class="type">Double</span>> sig_yaw;
    <span class="kw">private final</span> <span class="cls">StatusSignal</span><<span class="type">Double</span>> sig_pitch;

    <span class="kw">public</span> <span class="fn">DrivetrainSubsystem</span>() {
        m_gyro  = <span class="kw">new</span> <span class="cls">Pigeon2</span>(<span class="num">0</span>); <span class="cmt">// CAN ID 0</span>
        sig_yaw   = m_gyro.<span class="fn">getYaw</span>();
        sig_pitch = m_gyro.<span class="fn">getPitch</span>();
    }

    <span class="cmt">// Returns heading in degrees (-180 to 180 by default)</span>
    <span class="kw">public double</span> <span class="fn">getHeading_deg</span>() {
        <span class="kw">return</span> sig_yaw.<span class="fn">getValueAsDouble</span>();
    }

    <span class="cmt">// Reset heading (used at start of auto)</span>
    <span class="kw">public void</span> <span class="fn">resetHeading</span>() {
        m_gyro.<span class="fn">reset</span>();
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">periodic</span>() {
        <span class="cls">StatusSignal</span>.<span class="fn">refreshAll</span>(sig_yaw, sig_pitch);
        SmartDashboard.<span class="fn">putNumber</span>(<span class="str">"Drive/Heading_deg"</span>, <span class="fn">getHeading_deg</span>());
    }
}</pre>
</div>

<div class="callout info"><p><strong>Pigeon 2 vs NavX:</strong> Rebuilt uses Pigeon 2 (CTRE) rather than the NavX. The Pigeon 2 has better Phoenix 6 integration — signals, latency compensation, and swerve odometry all work more cleanly with it than with third-party IMUs.</p></div>

<h3 class="sub">Topic 3 — Quick Check</h3>
<div id="quiz-o4-t3"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="topic-4">Logging &amp; SmartDashboard</h2>
<p>Good logging is how you debug at competition without a laptop plugged into the robot. Put useful data on the dashboard and it'll save you when something weird happens on the field.</p>

<h3 class="sub">SmartDashboard Basics</h3>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — dashboard logging in periodic()</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> edu.wpi.first.wpilibj.smartdashboard.<span class="cls">SmartDashboard</span>;

<span class="cmt">// In subsystem periodic() — runs every 20ms in all modes</span>
<span class="kw">@Override</span>
<span class="kw">public void</span> <span class="fn">periodic</span>() {
    <span class="cmt">// Use "Subsystem/Value" format — creates organized groups in Shuffleboard</span>
    SmartDashboard.<span class="fn">putNumber</span>(<span class="str">"Shooter/Velocity_rps"</span>, <span class="fn">getVelocity_rps</span>());
    SmartDashboard.<span class="fn">putNumber</span>(<span class="str">"Shooter/Current_A"</span>,    <span class="fn">getCurrent_A</span>());
    SmartDashboard.<span class="fn">putBoolean</span>(<span class="str">"Shooter/AtSpeed"</span>,       <span class="fn">atSpeed</span>());
    SmartDashboard.<span class="fn">putString</span>(<span class="str">"Shooter/State"</span>,         m_state.<span class="fn">toString</span>());
}</pre>
</div>

<h3 class="sub">What to Log</h3>
<table>
<thead><tr><th>Always log</th><th>Why it matters</th></tr></thead>
<tbody>
<tr><td>Motor velocity (rps or rpm)</td><td>Check if mechanism is actually spinning</td></tr>
<tr><td>Motor current (A)</td><td>Detect stalls, game piece detection, mechanical issues</td></tr>
<tr><td>At-speed / at-position booleans</td><td>Confirm state machine transitions happen correctly</td></tr>
<tr><td>Sensor readings (encoder pos, gyro heading)</td><td>Debug odometry and positioning in auto</td></tr>
<tr><td>Active command name</td><td>Know what command is controlling what subsystem</td></tr>
</tbody>
</table>

<h3 class="sub">DataLog (for Post-Match Analysis)</h3>
<p>SmartDashboard is live. DataLog writes to a USB drive on the roboRIO for reviewing after a match. WPILib's <code>DataLogManager</code> makes this easy — Rebuilt uses it for deeper diagnostics.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — DataLog setup (in Robot.java)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> edu.wpi.first.wpilibj.<span class="cls">DataLogManager</span>;
<span class="kw">import</span> edu.wpi.first.util.datalog.<span class="cls">DoubleLogEntry</span>;
<span class="kw">import</span> edu.wpi.first.util.datalog.<span class="cls">DataLog</span>;

<span class="cmt">// In robotInit():</span>
DataLogManager.<span class="fn">start</span>(); <span class="cmt">// writes to USB if present, otherwise /home/lvuser/</span>

<span class="cmt">// In subsystem constructor:</span>
<span class="cls">DataLog</span> log = DataLogManager.<span class="fn">getLog</span>();
<span class="cls">DoubleLogEntry</span> m_velocityLog = <span class="kw">new</span> <span class="cls">DoubleLogEntry</span>(log, <span class="str">"/shooter/velocity_rps"</span>);

<span class="cmt">// In periodic():</span>
m_velocityLog.<span class="fn">append</span>(<span class="fn">getVelocity_rps</span>());</pre>
</div>

<div class="callout tip"><p><strong>Advantage Scope:</strong> Download log files from the roboRIO and visualize them in Advantage Scope. It shows motor velocity, current, and position over time — invaluable for tuning PID and debugging auto failures after the match.</p></div>

<h3 class="sub">Topic 4 — Coding Prompt</h3>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Build a Shooter Subsystem</div><div class="ch-sub">TalonFX + Phoenix 6 signals + SmartDashboard</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Write a complete <code>ShooterSubsystem</code> that: creates a TalonFX on CAN ID 11, configures it with Coast neutral mode and a 40A current limit, creates <code>sig_velocity</code> and <code>sig_current</code> signals, exposes <code>setVelocity_rps(double)</code>, <code>stop()</code>, <code>getVelocity_rps()</code>, and <code>atSpeed()</code> (within 2 rps of 80 rps target), and logs velocity and at-speed to SmartDashboard in <code>periodic()</code>.</p>
    <textarea class="code-input" placeholder="public class ShooterSubsystem extends SubsystemBase { ... }"></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-o4-t4')">Show Solution</button></div>
    <div id="sol-o4-t4" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">ShooterSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> {
    <span class="kw">private final</span> <span class="cls">TalonFX</span>                      m_motor;
    <span class="kw">private final</span> <span class="cls">VelocityTorqueCurrentFOC</span>     m_velocityReq   = <span class="kw">new</span> <span class="cls">VelocityTorqueCurrentFOC</span>(<span class="num">0</span>);
    <span class="kw">private final</span> <span class="cls">StatusSignal</span><<span class="type">Double</span>>           sig_velocity;
    <span class="kw">private final</span> <span class="cls">StatusSignal</span><<span class="type">Double</span>>           sig_current;

    <span class="kw">private static final int</span>    kMotorID              = <span class="num">11</span>;
    <span class="kw">private static final double</span> kTargetSpeed_rps      = <span class="num">80.0</span>;
    <span class="kw">private static final double</span> kAtSpeedTolerance_rps = <span class="num">2.0</span>;

    <span class="kw">public</span> <span class="fn">ShooterSubsystem</span>() {
        m_motor = <span class="kw">new</span> <span class="cls">TalonFX</span>(kMotorID);

        <span class="cls">TalonFXConfiguration</span> cfg = <span class="kw">new</span> <span class="cls">TalonFXConfiguration</span>();
        cfg.MotorOutput.NeutralMode                 = NeutralModeValue.Coast;
        cfg.CurrentLimits.SupplyCurrentLimit        = <span class="num">40</span>;
        cfg.CurrentLimits.SupplyCurrentLimitEnable  = <span class="kw">true</span>;
        m_motor.<span class="fn">getConfigurator</span>().<span class="fn">apply</span>(cfg);

        sig_velocity = m_motor.<span class="fn">getVelocity</span>();
        sig_current  = m_motor.<span class="fn">getSupplyCurrent</span>();
    }

    <span class="kw">public void</span> <span class="fn">setVelocity_rps</span>(<span class="type">double</span> v) {
        m_motor.<span class="fn">setControl</span>(m_velocityReq.<span class="fn">withVelocity</span>(v));
    }
    <span class="kw">public void</span> <span class="fn">stop</span>() { m_motor.<span class="fn">stopMotor</span>(); }

    <span class="kw">public double</span>  <span class="fn">getVelocity_rps</span>() { <span class="kw">return</span> sig_velocity.<span class="fn">getValueAsDouble</span>(); }
    <span class="kw">public boolean</span> <span class="fn">atSpeed</span>() {
        <span class="kw">return</span> Math.<span class="fn">abs</span>(<span class="fn">getVelocity_rps</span>() - kTargetSpeed_rps) < kAtSpeedTolerance_rps;
    }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">periodic</span>() {
        <span class="cls">StatusSignal</span>.<span class="fn">refreshAll</span>(sig_velocity, sig_current);
        SmartDashboard.<span class="fn">putNumber</span>(<span class="str">"Shooter/Velocity_rps"</span>, <span class="fn">getVelocity_rps</span>());
        SmartDashboard.<span class="fn">putBoolean</span>(<span class="str">"Shooter/AtSpeed"</span>,       <span class="fn">atSpeed</span>());
    }
}</pre>
      </div>
    </div>
  </div>
</div>

<h3 class="sub">Topic 4 — Quick Check</h3>
<div id="quiz-o4-t4"></div>

<hr style="border:none;border-top:1px solid #eee;margin:2.5rem 0">

<h2 class="sh" id="weekly-test">Weekly Test</h2>
<p>covers motors, sensors, and Phoenix 6. your score goes to the leads :)</p>
<div class="weekly-test-block">
  <div class="wt-header">
    <div class="wt-icon">📋</div>
    <div>
      <div class="wt-title">O4 weekly test</div>
      <div class="wt-sub">TalonFX, SparkMax, CANcoder, Pigeon 2, SmartDashboard · 8 questions</div>
    </div>
  </div>
  <div id="test-offseason-o4"></div>
</div>

<script>
// ── TOPIC 1: TalonFX & Phoenix 6 ──────────────────────────────
const quiz_o4_t1 = new Quiz('quiz-o4-t1', [
  { question: "In Phoenix 6, how do you apply a TalonFX configuration?", options: ["motor.setConfig(config)","motor.configure(config)","motor.getConfigurator().apply(config)","motor.applyConfig(config)"], correct: 2, explanation: "Phoenix 6 uses getConfigurator().apply(config). You build a TalonFXConfiguration object with all your settings, then apply it once in the constructor." },
  { question: "What is a StatusSignal in Phoenix 6?", options: ["A CAN error flag","An object that holds a sensor value you can read with getValueAsDouble()","A motor state enum","A configuration option"], correct: 1, explanation: "StatusSignal<Double> holds a sensor value. Get the signal object once in the constructor (sig_ prefix), then call getValueAsDouble() to read it. Refreshing is done explicitly." },
  { question: "What naming prefix does WRT use for Phoenix 6 signal variables?", options: ["s_","signal_","sig_","status_"], correct: 2, explanation: "sig_ prefix for status signal variables — sig_velocity, sig_current, sig_position. This convention is from the Rebuilt codebase." }
], 'offseason-o4');

// ── TOPIC 2: Current Detection ─────────────────────────────
const quiz_o4_t2 = new Quiz('quiz-o4-t2', [
  { question: "Why call restoreFactoryDefaults() on a SparkMax at startup?", options: ["Required to initialize CAN","Clears leftover config from previous deployments","Improves motor performance","Sets brake mode automatically"], correct: 1, explanation: "SparkMax saves settings in flash. Previous code might have set weird limits or inversions. restoreFactoryDefaults() starts clean." },
  { question: "Why do you call burnFlash() on a SparkMax?", options: ["It optimizes power usage","It writes your configuration to flash memory so it persists through power cycles","It resets the encoder","It's required to enable CAN communication"], correct: 1, explanation: "burnFlash() saves your configuration to the SparkMax's flash. Without it, settings are lost on power cycle. Always call it last in the constructor, never in loops." },
  { question: "How do you detect a game piece in the intake using only current sensing?", options: ["Read the beam break sensor","Check motor.getAppliedOutput() > 0.8","Check motor.getOutputCurrent() > threshold","Use motor.getStallCondition()"], correct: 2, explanation: "When intake rollers stall against a note, current spikes. getOutputCurrent() > 30.0 (or your tuned threshold) is a common, reliable piece detection method." }
], 'offseason-o4');

// ── TOPIC 3: CANcoder & Pigeon 2 ──────────────────────────────
const quiz_o4_t3 = new Quiz('quiz-o4-t3', [
  { question: "What is a CANcoder primarily used for on WRT's swerve drive?", options: ["Measuring motor RPM","Absolute steering angle of each swerve module","Robot heading","Drive wheel odometry"], correct: 1, explanation: "CANcoder is an absolute magnetic encoder. In swerve, each module has one to measure the absolute steering angle so the robot knows which way wheels are pointing after a power cycle." },
  { question: "Which IMU (gyroscope) does the Rebuilt codebase use?", options: ["NavX","ADIS16448","Pigeon 2","MPU6050"], correct: 2, explanation: "WRT uses the CTRE Pigeon 2 IMU. It integrates cleanly with Phoenix 6 — signals, latency compensation, and swerve odometry all work better with it than third-party IMUs." },
  { question: "What does MagnetOffset in CANcoder config do?", options: ["Calibrates the maximum angle","Sets the zero position to align with the mechanism's physical forward","Compensates for temperature drift","Sets the sensor range"], correct: 1, explanation: "MagnetOffset shifts the reported angle so that 0 degrees corresponds to the physical 'forward' orientation of the swerve module. Set per-module during calibration." }
], 'offseason-o4');

// ── TOPIC 4: Logging ──────────────────────────────────────────
const quiz_o4_t4 = new Quiz('quiz-o4-t4', [
  { question: "Where should SmartDashboard.put...() calls go?", options: ["In the constructor","In initialize()","In periodic() — updates every 20ms","Only in teleopPeriodic()"], correct: 2, explanation: "periodic() runs every 20ms in all modes. Putting dashboard calls here means you always have live data — during teleop, auto, and disabled. The constructor only runs once." },
  { question: "What's the recommended SmartDashboard key format?", options: ["Just the value name (e.g. 'Velocity')","Subsystem/Value (e.g. 'Shooter/Velocity_rps')","RobotName.Subsystem.Value","No standard — any string works"], correct: 1, explanation: "'Subsystem/Value' format creates organized groups in Shuffleboard. 'Shooter/Velocity_rps' appears under a Shooter group, making the dashboard much more readable." },
  { question: "What does DataLogManager do that SmartDashboard doesn't?", options: ["Logs faster","Writes data to a file for post-match analysis in tools like Advantage Scope","Sends data to the FMS","Shows more decimal places"], correct: 1, explanation: "DataLogManager writes timestamped data to USB/roboRIO storage. After a match you can open the log in Advantage Scope to see what happened over time — invaluable for debugging." }
], 'offseason-o4');

// ── WEEKLY TEST ───────────────────────────────────────────────
const test_o4 = new Quiz('test-offseason-o4', [
  { question: "In Phoenix 6, what method applies a TalonFXConfiguration to the motor?", options: ["motor.setConfig(cfg)","motor.configure(cfg)","motor.getConfigurator().apply(cfg)","motor.applySettings(cfg)"], correct: 2, explanation: "Phoenix 6 uses getConfigurator().apply(config). Build your config object with all settings, then apply once in the constructor." },
  { question: "What WRT naming prefix is used for Phoenix 6 StatusSignal variables?", options: ["s_","signal_","sig_","status_"], correct: 2, explanation: "sig_ prefix — sig_velocity, sig_current. This comes from the Rebuilt codebase." },
  { question: "Why do you call burnFlash() on a SparkMax?", options: ["Speeds up CAN communication","Writes config to flash so it persists through power cycles","Enables current limiting","Required to use encoder readings"], correct: 1, explanation: "Without burnFlash(), SparkMax config is lost on power cycle. Always call it last in the constructor, never in loops (flash has limited write cycles)." },
  { question: "A current-based piece detection check for the intake would look like:", options: ["motor.isStalled()","motor.getOutputCurrent() > kPieceDetectedCurrent_A","encoder.getVelocity() < 5","motor.getAppliedOutput() > 0.9"], correct: 1, explanation: "getOutputCurrent() > threshold is the standard piece detection pattern on WRT. When rollers stall against a note, current spikes significantly." },
  { question: "What is a CANcoder's MagnetOffset used for on swerve?", options: ["Compensating for magnetic field interference","Zeroing the module steering to the physical forward position","Setting the encoder resolution","Limiting maximum turn angle"], correct: 1, explanation: "MagnetOffset shifts the reported angle. Set per-module during calibration so 0 degrees = wheel pointing forward. Critical for swerve to work correctly." },
  { question: "Which gyroscope is used in WRT's Rebuilt codebase?", options: ["NavX (MXP)","ADIS16448","Pigeon 2","ADXRS450"], correct: 2, explanation: "WRT uses the CTRE Pigeon 2. It integrates best with Phoenix 6 — signals, latency compensation, and swerve odometry all work more cleanly than with third-party gyros." },
  { question: "What does StatusSignal.refreshAll(sig1, sig2) do?", options: ["Resets all signals to zero","Refreshes multiple signals in one batch CAN read","Clears error flags","Forces an immediate motor update"], correct: 1, explanation: "refreshAll() batches multiple signal reads together, which is more efficient than refreshing each one individually. Call it in periodic() before reading signal values." },
  { question: "In SmartDashboard key names, what format does WRT use?", options: ["SubsystemName_ValueName","Subsystem/Value (e.g. 'Shooter/Velocity_rps')","RobotName.Subsystem.Value","Any unique string"], correct: 1, explanation: "Subsystem/Value format creates grouped entries in Shuffleboard. 'Shooter/Velocity_rps' appears under a Shooter group, making the dashboard organized and readable." }
], 'offseason-o4-test');
</script>
