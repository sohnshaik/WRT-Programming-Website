---
layout: week
title: "Autonomous & PathPlanner"
subtitle: "Auto sequences, field coordinates, odometry, and PathPlanner."
badge: "Offseason · Week 6 of 8"
phase: offseason
phase_label: Offseason
week_label: "Week O6"
page_id: "offseason-o6"
prev_url: "/weeks/offseason/os-week5"
prev_title: "O5 — PID Control"
next_url: "/weeks/offseason/os-week7"
next_title: "O7 — Subsystem Ownership"
---

<h2 class="sh">Autonomous Period</h2>
<p>During the 15-second auto period, the robot runs entirely on its own — no driver input. Your code must handle all movement, scoring, and positioning decisions using sensors and pre-planned paths.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — simple auto command sequence</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import static</span> edu.wpi.first.wpilibj2.command.Commands.*;

<span class="cls">Command</span> getAutoCommand() {
    <span class="kw">return</span> <span class="fn">sequence</span>(
        <span class="kw">new</span> <span class="fn">DriveForwardCommand</span>(drive, <span class="num">1.5</span>),   <span class="cmt">// drive 1.5m</span>
        <span class="fn">parallel</span>(
            <span class="kw">new</span> <span class="fn">SpinUpShooterCommand</span>(shooter),  <span class="cmt">// spin up while</span>
            <span class="fn">new</span> <span class="fn">WaitCommand</span>(<span class="num">1.5</span>)               <span class="cmt">// waiting 1.5s</span>
        ),
        <span class="kw">new</span> <span class="fn">ScoreCommand</span>(shooter),             <span class="cmt">// shoot</span>
        <span class="kw">new</span> <span class="fn">DriveBackCommand</span>(drive, <span class="num">0.5</span>)       <span class="cmt">// back off</span>
    );
}</pre>
</div>

<h2 class="sh">PathPlanner</h2>
<p>PathPlanner is a tool for designing robot paths visually and following them precisely using odometry. Most competitive teams use it for complex multi-note or multi-piece autos.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — PathPlanner auto</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> com.pathplanner.lib.auto.<span class="cls">AutoBuilder</span>;
<span class="kw">import</span> com.pathplanner.lib.path.<span class="cls">PathPlannerPath</span>;

<span class="cmt">// Load a path created in PathPlanner app</span>
<span class="cls">PathPlannerPath</span> path = <span class="cls">PathPlannerPath</span>.<span class="fn">fromPathFile</span>(<span class="str">"2 Piece Auto"</span>);

<span class="cmt">// Follow it</span>
<span class="cls">Command</span> autoCmd = <span class="cls">AutoBuilder</span>.<span class="fn">followPath</span>(path);

<span class="cmt">// Or build a named auto from PathPlanner</span>
<span class="cls">Command</span> namedAuto = <span class="cls">AutoBuilder</span>.<span class="fn">buildAuto</span>(<span class="str">"2 Piece Center"</span>);</pre>
</div>

<h2 class="sh">Auto Chooser</h2>
<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — RobotContainer auto chooser</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">private final</span> <span class="cls">SendableChooser</span>&lt;<span class="cls">Command</span>&gt; autoChooser = <span class="kw">new</span> <span class="cls">SendableChooser</span>&lt;&gt;();

<span class="kw">public</span> <span class="fn">RobotContainer</span>() {
    autoChooser.<span class="fn">setDefaultOption</span>(<span class="str">"Do Nothing"</span>, <span class="kw">new</span> <span class="cls">WaitCommand</span>(<span class="num">15</span>));
    autoChooser.<span class="fn">addOption</span>(<span class="str">"Drive Forward"</span>, <span class="kw">new</span> <span class="fn">DriveForwardCommand</span>(drive, <span class="num">1.5</span>));
    autoChooser.<span class="fn">addOption</span>(<span class="str">"2 Piece"</span>, <span class="cls">AutoBuilder</span>.<span class="fn">buildAuto</span>(<span class="str">"2 Piece Center"</span>));
    SmartDashboard.<span class="fn">putData</span>(<span class="str">"Auto Mode"</span>, autoChooser);
}

<span class="kw">public</span> <span class="cls">Command</span> <span class="fn">getAutonomousCommand</span>() {
    <span class="kw">return</span> autoChooser.<span class="fn">getSelected</span>();
}</pre>
</div>

<h2 class="sh">Knowledge Check</h2>
<div id="quiz-o6"></div>
<script>
const quiz_o6 = new Quiz('quiz-o6', [
  { question: "sequence(A, B, C) runs commands:", options: ["All at once","A then B then C, each waiting for the previous to finish","Randomly","In reverse order"], correct: 1, explanation: "sequence() is serial. A must call isFinished() returning true before B starts. This is the most common auto structure." },
  { question: "What does an auto chooser let you do?", options: ["Switch between auto routines from the driver station before a match","Change auto logic mid-match","Select which subsystems are active","Override driver inputs"], correct: 0, explanation: "The auto chooser appears on SmartDashboard/Shuffleboard. The drive team picks an auto strategy before the match. getAutonomousCommand() returns the selected command." },
  { question: "PathPlanner uses odometry to follow paths. Odometry tracks:", options: ["Robot battery voltage","Robot position on the field using encoder + gyro data","Camera detection results","Driver joystick input"], correct: 1, explanation: "Odometry combines encoder (distance traveled) and gyroscope (heading) data to estimate the robot's position on the field. PathPlanner uses this to accurately follow trajectories." },
  { question: "WaitCommand(2.0) in a sequence does what?", options: ["Waits 2 seconds before the sequence starts","Pauses the sequence for 2 seconds","Runs the next command for 2 seconds","Sets a 2-second timeout on the whole auto"], correct: 1, explanation: "WaitCommand(n) is a command that runs for n seconds and then finishes. Useful for adding deliberate pauses between actions in a sequence." }
], 'offseason-o6');
</script>
