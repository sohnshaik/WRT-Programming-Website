---
layout: week
title: "WPILib Setup"
subtitle: "Dev environment, project structure, RobotContainer, and Constants."
badge: "Offseason · Week 2 of 8"
phase: offseason
phase_label: Offseason
week_label: "Week O2"
page_id: "offseason-o2"
topics:
  - Install WPILib
  - Project Structure
  - Simulating Without Hardware
prev_url: "/weeks/offseason/os-week1"
prev_title: "O1 — Git & GitHub"
next_url: "/weeks/offseason/os-week3"
next_title: "O3 — Command-Based"
---

<h2 class="sh">Install WPILib</h2>
<p>Download and install WPILib from the <a href="https://github.com/wpilibsuite/allwpilib/releases">official releases page</a>. The installer includes VS Code, a JDK, all FRC libraries, and tools like SmartDashboard and AdvantageScope. Use the WPILib VS Code — not a personal install.</p>

<div class="callout warning"><p><strong>Use WPILib's VS Code, not your own.</strong> It comes pre-configured with the Java extension, WPILib extension, and the correct JDK. Installing into a personal VS Code causes path conflicts and missing classpath errors that waste a lot of time.</p></div>

<h2 class="sh">Project Structure</h2>
<table>
<thead><tr><th>File / Folder</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td>Robot.java</td><td>Entry point. Calls robotInit, teleopPeriodic, etc.</td></tr>
<tr><td>RobotContainer.java</td><td>Creates subsystems and binds commands to triggers</td></tr>
<tr><td>Constants.java</td><td>All motor IDs, gear ratios, PID values — no magic numbers</td></tr>
<tr><td>subsystems/</td><td>One file per subsystem — extends SubsystemBase</td></tr>
<tr><td>commands/</td><td>One file per action — extends Command</td></tr>
</tbody>
</table>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — Constants.java pattern</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">public final class</span> <span class="cls">Constants</span> {
    <span class="kw">public static final class</span> <span class="cls">DriveConstants</span> {
        <span class="kw">public static final int</span> LEFT_LEADER_ID  = <span class="num">1</span>;
        <span class="kw">public static final int</span> RIGHT_LEADER_ID = <span class="num">2</span>;
        <span class="kw">public static final double</span> GEAR_RATIO    = <span class="num">8.46</span>;
    }
    <span class="kw">public static final class</span> <span class="cls">ShooterConstants</span> {
        <span class="kw">public static final int</span>    MOTOR_ID   = <span class="num">5</span>;
        <span class="kw">public static final double</span> TARGET_RPM = <span class="num">4000.0</span>;
    }
}</pre>
</div>

<h2 class="sh">Simulating Without Hardware</h2>
<p>WPILib includes a robot simulator. You can run code, view sensor values, and test logic without touching the physical robot. Use it constantly — it's much faster than waiting for robot access.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">terminal — run simulation</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt"># In VS Code with WPILib extension:</span>
<span class="cmt"># Ctrl+Shift+P → WPILib: Simulate Robot Code</span>
<span class="cmt"># Or from terminal:</span>
./gradlew simulateJavaRelease</pre>
</div>

<h2 class="sh">Knowledge Check</h2>
<div id="quiz-o2"></div>
<script>
const quiz_o2 = new Quiz('quiz-o2', [
  { question: "Where do motor IDs and gear ratios belong?", options: ["Directly in subsystem constructors","Constants.java","README.md","A separate hardware.txt file"], correct: 1, explanation: "Constants.java keeps all magic numbers in one place. When you re-wire a motor or change gear ratios, you change it once instead of hunting through multiple files." },
  { question: "What does RobotContainer.java do?", options: ["Runs the 20ms loop","Contains all subsystem logic","Creates subsystem instances and binds commands to controller buttons","Handles autonomous logic only"], correct: 2, explanation: "RobotContainer is the wiring harness. It instantiates every subsystem and connects button presses to commands. It doesn't contain motor control logic itself." },
  { question: "Why use WPILib's included VS Code instead of your own?", options: ["It's required by FRC rules","It comes pre-configured with the correct JDK, extensions, and classpath — avoiding setup issues","It's faster","It has better themes"], correct: 1, explanation: "FRC Java requires specific JDK and classpath settings. WPILib's VS Code has all of this pre-configured. Using your own requires manual setup that often goes wrong." },
  { question: "What is the WPILib simulator useful for?", options: ["Deploying to the robot wirelessly","Testing logic, viewing sensor values, and running code without hardware access","Only testing autonomous routines","Debugging network issues"], correct: 1, explanation: "The simulator lets you run and test robot code on your laptop. You can view SmartDashboard values, test command logic, and iterate fast without fighting for robot time." }
], 'offseason-o2');
</script>
