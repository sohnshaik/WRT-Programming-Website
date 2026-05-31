---
layout: week
title: "Command-Based Architecture"
subtitle: "Subsystems, Commands, Triggers, and the Command Scheduler."
badge: "Offseason · Week 3 of 8"
phase: offseason
phase_label: Offseason
week_label: "Week O3"
page_id: "offseason-o3"
prev_url: "/weeks/offseason/os-week2"
prev_title: "O2 — WPILib Setup"
next_url: "/weeks/offseason/os-week4"
next_title: "O4 — Motors & Sensors"
---

<h2 class="sh">The Big Idea</h2>
<p>Command-based splits robot code into <strong>Subsystems</strong> (hardware + what it can do) and <strong>Commands</strong> (actions that use that hardware). Think Lego — subsystems are pieces, commands are what you build with them.</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Subsystem</div><div class="cc-title">Hardware abstraction</div><div class="cc-desc">Motors, sensors, state. Exposes methods like setSpeed(), stop(), getPosition(). Never control hardware from outside the subsystem.</div></div>
  <div class="concept-card"><div class="cc-label">Command</div><div class="cc-title">An action</div><div class="cc-desc">Uses subsystems. Has initialize(), execute(), end(), isFinished(). Runs on the 20ms loop.</div></div>
  <div class="concept-card"><div class="cc-label">Scheduler</div><div class="cc-title">Traffic controller</div><div class="cc-desc">Runs active commands every 20ms. Prevents two commands from fighting over the same subsystem.</div></div>
  <div class="concept-card"><div class="cc-label">Trigger</div><div class="cc-title">What starts a command</div><div class="cc-desc">Button press, sensor threshold, timer. Configured in RobotContainer.</div></div>
</div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — subsystem</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">DriveSubsystem</span> <span class="kw">extends</span> <span class="cls">SubsystemBase</span> {
    <span class="kw">private final</span> <span class="cls">CANSparkMax</span> leftMotor  = <span class="kw">new</span> <span class="cls">CANSparkMax</span>(DriveConstants.LEFT_ID,  MotorType.kBrushless);
    <span class="kw">private final</span> <span class="cls">CANSparkMax</span> rightMotor = <span class="kw">new</span> <span class="cls">CANSparkMax</span>(DriveConstants.RIGHT_ID, MotorType.kBrushless);

    <span class="kw">public void</span> <span class="fn">tankDrive</span>(<span class="type">double</span> left, <span class="type">double</span> right) {
        leftMotor.<span class="fn">set</span>(left); rightMotor.<span class="fn">set</span>(right);
    }
    <span class="kw">public void</span> <span class="fn">stop</span>() { leftMotor.<span class="fn">set</span>(<span class="num">0</span>); rightMotor.<span class="fn">set</span>(<span class="num">0</span>); }

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">periodic</span>() {
        SmartDashboard.<span class="fn">putNumber</span>(<span class="str">"Left Speed"</span>, leftMotor.<span class="fn">get</span>());
    }
}</pre>
</div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — command</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public class</span> <span class="cls">TeleopDriveCommand</span> <span class="kw">extends</span> <span class="cls">Command</span> {
    <span class="kw">private final</span> <span class="cls">DriveSubsystem</span> drive;
    <span class="kw">private final</span> <span class="cls">XboxController</span>  controller;

    <span class="kw">public</span> <span class="fn">TeleopDriveCommand</span>(<span class="cls">DriveSubsystem</span> drive, <span class="cls">XboxController</span> controller) {
        <span class="kw">this</span>.drive = drive; <span class="kw">this</span>.controller = controller;
        <span class="fn">addRequirements</span>(drive); <span class="cmt">// claim the subsystem</span>
    }
    <span class="kw">@Override</span> <span class="kw">public void</span> <span class="fn">execute</span>() {
        drive.<span class="fn">tankDrive</span>(-controller.<span class="fn">getLeftY</span>(), -controller.<span class="fn">getRightY</span>());
    }
    <span class="kw">@Override</span> <span class="kw">public void</span> <span class="fn">end</span>(<span class="type">boolean</span> interrupted) { drive.<span class="fn">stop</span>(); }
    <span class="kw">@Override</span> <span class="kw">public boolean</span> <span class="fn">isFinished</span>() { <span class="kw">return false</span>; }
}</pre>
</div>

<h2 class="sh">Command Compositions</h2>
<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — auto sequence</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import static</span> edu.wpi.first.wpilibj2.command.Commands.*;

<span class="cls">Command</span> auto = <span class="fn">sequence</span>(
    <span class="kw">new</span> <span class="fn">DriveForwardCommand</span>(drive, <span class="num">1.5</span>),
    <span class="kw">new</span> <span class="fn">ScoreCommand</span>(shooter),
    <span class="fn">parallel</span>(
        <span class="kw">new</span> <span class="fn">DriveBackCommand</span>(drive, <span class="num">1.0</span>),
        <span class="kw">new</span> <span class="fn">StowCommand</span>(arm)
    )
);</pre>
</div>

<h2 class="sh">Knowledge Check</h2>
<div id="quiz-o3"></div>
<script>
const quiz_o3 = new Quiz('quiz-o3', [
  { question: "Where does ongoing motor control logic go in a command?", options: ["initialize()","execute()","end()","isFinished()"], correct: 1, explanation: "execute() runs every 20ms while the command is active. Set motor speeds here. initialize() is one-time setup." },
  { question: "Why call addRequirements(subsystem) in a command?", options: ["Initializes the subsystem","Tells the Scheduler this command uses that subsystem, preventing conflicts","Gives the command subsystem access","Optional — just convention"], correct: 1, explanation: "The Scheduler uses requirements to prevent two commands from running the same subsystem simultaneously. The new command interrupts the old one." },
  { question: "You want a teleop drive command to run forever. isFinished() returns:", options: ["true","false","null","Throws exception"], correct: 1, explanation: "Return false to keep running. The command ends only when interrupted — by another command claiming the drivetrain, or robot disable." },
  { question: "What does sequence(A, B, C) do?", options: ["Runs all three at once","Runs A, waits for it to finish, then B, then C","Runs whichever finishes first","Runs them in random order"], correct: 1, explanation: "sequence() is a serial composition. A runs to completion, then B starts, then C. This is the backbone of most auto routines." },
  { question: "A default command runs:", options: ["At robot startup","During disabled mode only","Whenever no other command is using that subsystem","Every 20ms regardless"], correct: 2, explanation: "Default commands fill the gap. When nothing else claims the drivetrain, the teleop drive default command runs. When a button command finishes, the default resumes." }
], 'offseason-o3');
</script>
