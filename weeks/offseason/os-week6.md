---
layout: week
title: "Autonomous & Choreo"
subtitle: "Auto sequences, field coordinates, odometry, and Choreo path following."
badge: "Offseason · Week 6 of 8"
phase: offseason
phase_label: Offseason
week_label: "Week O6"
page_id: "offseason-o6"
topics:
  - Autonomous Period
  - Choreo Path Following
  - Auto Chooser
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

<h2 class="sh">Choreo Path Following</h2>
<p>Choreo is WRT's path following library. you design robot trajectories visually in the Choreo desktop app, export them, and follow them precisely in code using odometry. it integrates tightly with WPILib's command-based architecture and is what you'll use for all multi-piece autos on the actual robot.</p>

<div class="callout info"><p><strong>why Choreo, not PathPlanner?</strong> Choreo generates time-optimized trajectories with physics constraints baked in, exports a standard JSON format, and has first-class WPILib integration. it's also what the team has standardized on — so all existing auto routines use it. see the style guide for the team's official stance.</p></div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — Choreo auto (WPILib integration)</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> choreo.auto.<span class="cls">AutoFactory</span>;
<span class="kw">import</span> choreo.auto.<span class="cls">AutoRoutine</span>;
<span class="kw">import</span> choreo.auto.<span class="cls">AutoTrajectory</span>;

<span class="cmt">// In RobotContainer, build a routine from a .traj file</span>
<span class="cls">AutoRoutine</span> twopiece = autoFactory.<span class="fn">newRoutine</span>(<span class="str">"twoPiece"</span>);
<span class="cls">AutoTrajectory</span> traj = twopiece.<span class="fn">trajectory</span>(<span class="str">"twoPiece"</span>);

<span class="cmt">// chain commands: follow path, then score</span>
twopiece.<span class="fn">active</span>().<span class="fn">onTrue</span>(
    traj.<span class="fn">cmd</span>().<span class="fn">andThen</span>(<span class="kw">new</span> <span class="fn">ScoreCommand</span>(m_shooter))
);

<span class="kw">return</span> twopiece.<span class="fn">cmd</span>();</pre>
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
  { question: "Choreo uses odometry to follow paths. Odometry tracks:", options: ["Robot battery voltage","Robot position on the field using encoder + gyro data","Camera detection results","Driver joystick input"], correct: 1, explanation: "Odometry combines encoder (distance traveled) and gyroscope (heading) data to estimate the robot's position on the field. Choreo uses this to accurately follow trajectories." },
  { question: "WaitCommand(2.0) in a sequence does what?", options: ["Waits 2 seconds before the sequence starts","Pauses the sequence for 2 seconds","Runs the next command for 2 seconds","Sets a 2-second timeout on the whole auto"], correct: 1, explanation: "WaitCommand(n) is a command that runs for n seconds and then finishes. Useful for adding deliberate pauses between actions in a sequence." }
], 'offseason-o6');
</script>
