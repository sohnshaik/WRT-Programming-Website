---
layout: week
title: "Motors & Sensors"
subtitle: "SparkMax, TalonFX, encoders, gyroscopes, and SmartDashboard."
badge: "Offseason · Week 4 of 8"
phase: offseason
phase_label: Offseason
week_label: "Week O4"
page_id: "offseason-o4"
prev_url: "/weeks/offseason/os-week3"
prev_title: "O3 — Command-Based"
next_url: "/weeks/offseason/os-week5"
next_title: "O5 — PID Control"
---

<h2 class="sh">Motor Controllers</h2>
<p>2974 primarily uses REV SparkMax (brushless) and CTRE TalonFX (Falcon 500). Both have similar APIs but different setup steps and vendor library imports.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — SparkMax setup</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> com.revrobotics.<span class="cls">CANSparkMax</span>;
<span class="kw">import</span> com.revrobotics.CANSparkLowLevel.<span class="cls">MotorType</span>;

<span class="cls">CANSparkMax</span> motor = <span class="kw">new</span> <span class="cls">CANSparkMax</span>(<span class="num">1</span>, MotorType.kBrushless);
motor.<span class="fn">restoreFactoryDefaults</span>(); <span class="cmt">// always do this first</span>
motor.<span class="fn">setInverted</span>(<span class="kw">false</span>);
motor.<span class="fn">setIdleMode</span>(CANSparkMax.IdleMode.kBrake);

<span class="cmt">// Set speed: -1.0 (full reverse) to 1.0 (full forward)</span>
motor.<span class="fn">set</span>(<span class="num">0.5</span>);</pre>
</div>

<h2 class="sh">Encoders</h2>
<p>Encoders measure rotation — how far a mechanism has moved, how fast it's going. SparkMax has a built-in encoder on NEO motors. Always set conversion factors to get meaningful units.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — reading encoder values</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cls">RelativeEncoder</span> encoder = motor.<span class="fn">getEncoder</span>();

<span class="cmt">// Convert rotations to inches: circumference / gear ratio</span>
<span class="type">double</span> wheelCircumference = <span class="num">2</span> * Math.PI * <span class="num">3.0</span>; <span class="cmt">// 3" radius wheel</span>
encoder.<span class="fn">setPositionConversionFactor</span>(wheelCircumference / GEAR_RATIO);
encoder.<span class="fn">setVelocityConversionFactor</span>(wheelCircumference / GEAR_RATIO / <span class="num">60.0</span>);

<span class="type">double</span> positionInches = encoder.<span class="fn">getPosition</span>();   <span class="cmt">// inches from start</span>
<span class="type">double</span> speedInchPerSec = encoder.<span class="fn">getVelocity</span>(); <span class="cmt">// inches/sec</span>

encoder.<span class="fn">setPosition</span>(<span class="num">0</span>); <span class="cmt">// reset to zero</span></pre>
</div>

<h2 class="sh">Gyroscope (NavX / Pigeon)</h2>
<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — NavX basics</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> com.kauailabs.navx.frc.<span class="cls">AHRS</span>;
<span class="kw">import</span> edu.wpi.first.wpilibj.<span class="cls">SPI</span>;

<span class="cls">AHRS</span> gyro = <span class="kw">new</span> <span class="cls">AHRS</span>(SPI.Port.kMXP);

<span class="type">double</span> heading = gyro.<span class="fn">getAngle</span>(); <span class="cmt">// degrees, accumulates past 360</span>
<span class="type">double</span> yaw     = gyro.<span class="fn">getYaw</span>();   <span class="cmt">// -180 to 180</span>
gyro.<span class="fn">reset</span>(); <span class="cmt">// zero the heading</span></pre>
</div>

<h2 class="sh">SmartDashboard</h2>
<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — logging to Shuffleboard</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> edu.wpi.first.wpilibj.smartdashboard.<span class="cls">SmartDashboard</span>;

<span class="cmt">// Put in periodic() for live updates</span>
SmartDashboard.<span class="fn">putNumber</span>(<span class="str">"Shooter RPM"</span>, encoder.<span class="fn">getVelocity</span>());
SmartDashboard.<span class="fn">putBoolean</span>(<span class="str">"At Speed"</span>, isAtSpeed);
SmartDashboard.<span class="fn">putString</span>(<span class="str">"Robot State"</span>, state.<span class="fn">toString</span>());</pre>
</div>

<h2 class="sh">Knowledge Check</h2>
<div id="quiz-o4"></div>
<script>
const quiz_o4 = new Quiz('quiz-o4', [
  { question: "Why call restoreFactoryDefaults() on a SparkMax at startup?", options: ["Required to initialize CAN","Clears any leftover configuration from previous code deployments","Improves performance","Sets brake mode automatically"], correct: 1, explanation: "SparkMax saves settings in flash memory. If a previous team member set weird limits or inversion, restoreFactoryDefaults() clears it so your code starts from a known state." },
  { question: "What does setPositionConversionFactor() do on an encoder?", options: ["Sets how fast the encoder updates","Converts raw motor rotations into meaningful units (inches, degrees, etc.)","Limits the maximum position","Resets the encoder to zero"], correct: 1, explanation: "Raw encoder output is motor rotations. A conversion factor transforms that into something useful like inches of linear travel or degrees of arm rotation." },
  { question: "Motor.set() takes a value from:", options: ["0 to 100 (percent)","0 to 1 (forward only)","-1.0 to 1.0 (full reverse to full forward)","0 to 12 (voltage)"], correct: 2, explanation: "WPILib motor controllers use -1.0 to 1.0. -1 is full reverse, 0 is stopped, 1 is full forward. Values outside this range are clamped." },
  { question: "Where should SmartDashboard.put...() calls go?", options: ["In the constructor","In initialize()","In periodic() — so values update every 20ms","Only in teleopPeriodic()"], correct: 2, explanation: "periodic() runs every 20ms in all modes. Putting dashboard calls here means you always have live data — during teleop, auto, and disabled. The constructor only runs once." },
  { question: "gyro.getYaw() returns values in what range?", options: ["-360 to 360","0 to 360","-180 to 180","It accumulates indefinitely"], correct: 2, explanation: "getYaw() returns -180 to 180 degrees — standard robot heading. getAngle() accumulates past 360 (useful for tracking multiple rotations)." }
], 'offseason-o4');
</script>
