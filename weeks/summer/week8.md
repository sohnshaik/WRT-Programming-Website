---
layout: week
title: "Bridge Week — XRP & WPILib"
subtitle: "Java meets robot code. Write your first WPILib program and run it on an XRP."
badge: "Summer · Week 8 of 8"
phase: bridge
phase_label: Summer
week_label: Week 8
page_id: summer-w8
prev_url: /weeks/summer/week7
prev_title: "Week 7 — Advanced Classes"
next_url: /weeks/offseason/os-week1
next_title: "O1 — Git & GitHub"
---

<div class="callout tip"><p><strong>You've earned this.</strong> Seven weeks of Java. Now you put it on a real robot. Everything you've learned — classes, methods, loops, enums — shows up here. If something in the robot code looks unfamiliar, go back to the relevant week.</p></div>

<h2 class="sh">How WPILib Wraps Your Java</h2>
<p>WPILib is a library of Java classes that talk to the robot's hardware. Your code extends WPILib classes (which you now understand from Week 6) and fills in the behavior.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — a minimal XRP tank drive program</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">package</span> frc.robot;

<span class="kw">import</span> edu.wpi.first.wpilibj.<span class="cls">TimedRobot</span>;
<span class="kw">import</span> edu.wpi.first.wpilibj.xrp.<span class="cls">XRPMotor</span>;

<span class="kw">public class</span> <span class="cls">Robot</span> <span class="kw">extends</span> <span class="cls">TimedRobot</span> {

    <span class="kw">private final</span> <span class="cls">XRPMotor</span> leftMotor  = <span class="kw">new</span> <span class="cls">XRPMotor</span>(<span class="num">0</span>);
    <span class="kw">private final</span> <span class="cls">XRPMotor</span> rightMotor = <span class="kw">new</span> <span class="cls">XRPMotor</span>(<span class="num">1</span>);

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">teleopPeriodic</span>() {
        <span class="cmt">// Runs every 20ms during teleop</span>
        leftMotor.<span class="fn">set</span>(<span class="num">0.5</span>);  <span class="cmt">// 50% forward</span>
        rightMotor.<span class="fn">set</span>(-<span class="num">0.5</span>); <span class="cmt">// inverted</span>
    }
}</pre>
</div>

<h2 class="sh">The Walton Codebase — Folder Structure</h2>
<table>
<thead><tr><th>Folder / File</th><th>What lives here</th></tr></thead>
<tbody>
<tr><td>robot/</td><td>Robot.java, RobotContainer.java — the entry points</td></tr>
<tr><td>subsystems/</td><td>One file per subsystem (Drivetrain, Shooter, Intake…)</td></tr>
<tr><td>commands/</td><td>One file per action/command</td></tr>
<tr><td>Constants.java</td><td>All motor IDs, gear ratios, PID values — never hardcode</td></tr>
</tbody>
</table>

<h2 class="sh">Your First Git Commit</h2>
<p>Before writing any robot code, you need to be able to push it. Do this now if you haven't yet — the next phase starts with Git.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">terminal</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt"># Clone the training repo</span>
git clone https://github.com/sohnshaik/training-test-1.git

<span class="cmt"># Create your branch</span>
git checkout -b feature/your-name-xrp

<span class="cmt"># After writing your XRP code:</span>
git add .
git commit -m <span class="str">"feat: add XRP tank drive for [your name]"</span>
git push origin feature/your-name-xrp</pre>
</div>

<div class="callout warning"><p><strong>Install WPILib before the next session:</strong> Download WPILib from <a href="https://github.com/wpilibsuite/allwpilib/releases" style="color:#C41230">github.com/wpilibsuite/allwpilib/releases</a>. Install the full package — it includes VS Code, Java, and all the FRC tools.</p></div>

<h2 class="sh">Knowledge Check</h2>
<div id="quiz-w8"></div>

<h2 class="sh">Bridge Assignment</h2>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">🤖</div><div><div class="ch-title">XRP Tank Drive</div><div class="ch-sub">Write real robot code using everything from Weeks 1–7</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Using an XRP robot (or WPILib simulation if no hardware):<br><br>
    1. Create a <code>DriveSubsystem</code> class with two XRPMotor fields<br>
    2. Write a <code>tankDrive(double left, double right)</code> method<br>
    3. Write a <code>stop()</code> method<br>
    4. In <code>teleopPeriodic()</code>, call tankDrive with 0.4 and -0.4 (spin in place)<br>
    5. Add Javadocs to every method<br>
    6. Push to a branch and open a PR<br><br>
    Bonus: Add a RobotState enum with DRIVING and STOPPED, and use it to guard the tankDrive call.</p>
    <textarea class="code-input" placeholder="// Your DriveSubsystem class here..."></textarea>
  </div>
</div>

<script>
const quiz_w8 = new Quiz('quiz-w8', [
  { question: "In WPILib, <code>teleopPeriodic()</code> runs...", options: ["Once at startup","Every time a button is pressed","Every 20ms during the teleop period","Only when you call it manually"], correct: 2, explanation: "Periodic methods run every 20ms on a fixed timer. This is the FRC robot loop. Your code must return within 20ms or the watchdog fires — which is why while loops are banned." },
  { question: "What does <code>Constants.java</code> typically contain?", options: ["The robot's main method","Motor IDs, gear ratios, PID values — any number used across the codebase","All the subsystem classes","The robot's teleop code"], correct: 1, explanation: "Constants keeps all magic numbers in one place. When a motor ID changes (hardware re-wire, broken motor), you change it in ONE place instead of hunting through 20 files." },
  { question: "When you write <code>extends TimedRobot</code>, you are:", options: ["Copying TimedRobot's code into your class","Using polymorphism to replace TimedRobot","Inheriting TimedRobot's loop structure and overriding specific periodic methods","Creating a new instance of TimedRobot"], correct: 2, explanation: "You inherit the framework structure (the 20ms loop, mode switching, etc.) and override only the methods you need. This is exactly the inheritance from Week 6 applied to real robot code." },
  { question: "What folder do subsystem classes like Drivetrain.java live in?", options: ["robot/","commands/","subsystems/","src/"], correct: 2, explanation: "WPILib projects follow a convention: subsystems/ for hardware abstraction, commands/ for actions, and robot/ for entry points." }
], 'summer-w8');
</script>
