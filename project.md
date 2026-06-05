---
layout: default
title: MiniBot Project
page_id: project
require_auth: true
---

<div class="page-hero">
  <div class="ph-badge badge-summer">Summer Project</div>
  <h1>MiniBot — The Course Project</h1>
  <p>you're building a real WRT-style robot codebase from scratch across 8 weeks. every week adds a new piece. by week 8, you'll have a fully structured robot program.</p>
</div>

<div class="content-wrap">

<h2 class="sh">What You're Building</h2>
<p>MiniBot is a simplified version of our actual FRC robot code. it uses the same patterns, naming conventions, and file structure as <a href="https://github.com/WaltonRobotics/Rebuilt" target="_blank" rel="noopener">WaltonRobotics/Rebuilt</a>. when you're done, your code could be the base of a real robot project.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">final project structure</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre>minibot/
├── Constants.java               <span class="cmt">// Week 1 — all robot constants</span>
├── AutoLogic.java               <span class="cmt">// Week 2 — if/switch auto selection</span>
├── SensorProcessor.java         <span class="cmt">// Week 3 — loops + arrays</span>
├── DriveCalculator.java         <span class="cmt">// Week 4 — static utility methods</span>
├── subsystems/
│   ├── DriveSubsystem.java      <span class="cmt">// Week 5 — first OOP class</span>
│   └── ShooterSubsystem.java    <span class="cmt">// Week 6 — inheritance</span>
├── RobotState.java              <span class="cmt">// Week 7 — enum + interface</span>
└── Robot.java                   <span class="cmt">// Week 8 — final assembly</span></pre>
</div>

<h2 class="sh">Week-by-Week Checklist</h2>

<table>
<thead><tr><th>Week</th><th>File</th><th>What to build</th><th>Core concept</th></tr></thead>
<tbody>
<tr>
  <td><a href="{{ '/weeks/summer/week1' | relative_url }}">Week 1</a></td>
  <td><code>Constants.java</code></td>
  <td>Inner classes <code>DriveK</code> + <code>ShooterK</code> with motor IDs, speeds, gear ratios</td>
  <td>Variables, <code>final</code>, naming conventions</td>
</tr>
<tr>
  <td><a href="{{ '/weeks/summer/week2' | relative_url }}">Week 2</a></td>
  <td><code>AutoLogic.java</code></td>
  <td>Static method that uses if/switch to return an auto routine name given an input mode int</td>
  <td>if/else, switch, booleans</td>
</tr>
<tr>
  <td><a href="{{ '/weeks/summer/week3' | relative_url }}">Week 3</a></td>
  <td><code>SensorProcessor.java</code></td>
  <td>Static methods: average of double array, count values above a threshold, find min/max</td>
  <td>for loops, arrays, methods</td>
</tr>
<tr>
  <td><a href="{{ '/weeks/summer/week4' | relative_url }}">Week 4</a></td>
  <td><code>DriveCalculator.java</code></td>
  <td>Static utility methods: RPM to m/s, ticks to rotations, clamp(val, min, max), deadband(input, threshold)</td>
  <td>Static methods, parameters, return types</td>
</tr>
<tr>
  <td><a href="{{ '/weeks/summer/week5' | relative_url }}">Week 5</a></td>
  <td><code>DriveSubsystem.java</code></td>
  <td>Class with <code>private final</code> motor fields, constructor, <code>periodic()</code>, <code>drive(double speed)</code>, <code>stop()</code>, getters</td>
  <td>OOP, encapsulation, constructors</td>
</tr>
<tr>
  <td><a href="{{ '/weeks/summer/week6' | relative_url }}">Week 6</a></td>
  <td><code>ShooterSubsystem.java</code></td>
  <td>Extends same abstract base as DriveSubsystem. Adds <code>m_targetRPS</code>, <code>isAtSpeed()</code>, overrides <code>periodic()</code></td>
  <td>Inheritance, <code>extends</code>, <code>@Override</code></td>
</tr>
<tr>
  <td><a href="{{ '/weeks/summer/week7' | relative_url }}">Week 7</a></td>
  <td><code>RobotState.java</code></td>
  <td>Enum with <code>IDLE</code>, <code>DRIVING</code>, <code>SHOOTING</code>, <code>DISABLED</code>. Plus interface <code>IControllable</code> with method signatures.</td>
  <td>Enums, interfaces, nested classes</td>
</tr>
<tr>
  <td><a href="{{ '/weeks/summer/week8' | relative_url }}">Week 8</a></td>
  <td><code>Robot.java</code></td>
  <td>Extends <code>TimedRobot</code>. Fields for both subsystems. <code>configureBindings()</code>. <code>robotPeriodic()</code> with CommandScheduler. Uses <code>RobotState</code>.</td>
  <td>Full project integration</td>
</tr>
</tbody>
</table>

<h2 class="sh">Submission</h2>
<p>at the end of week 8, you'll push all your .java files to a branch in the team repo and open a pull request. the leads will review your code — same process as real contributions to our robot.</p>

<div class="callout tip"><p><strong>PR title format:</strong> <code>feat: minibot project — [your name]</code><br>
Include a short description of what you built and anything you're unsure about. We give feedback, not just grades.</p></div>

<h2 class="sh">Grading (quick version)</h2>
<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">20 pts</div><div class="cc-title">Naming conventions</div><div class="cc-desc">k prefix on constants. m_ prefix on member vars. PascalCase classes. camelCase methods.</div></div>
  <div class="concept-card"><div class="cc-label">20 pts</div><div class="cc-title">OOP structure</div><div class="cc-desc">Subsystems have proper constructors, periodic(), getters/setters. Inheritance and interface used correctly.</div></div>
  <div class="concept-card"><div class="cc-label">20 pts</div><div class="cc-title">No magic numbers</div><div class="cc-desc">Every constant lives in Constants.java. Nothing hardcoded inline — not even CAN IDs.</div></div>
  <div class="concept-card"><div class="cc-label">20 pts</div><div class="cc-title">Comments</div><div class="cc-desc">Every public method has a Javadoc. Tricky logic has inline // comments explaining the why.</div></div>
  <div class="concept-card"><div class="cc-label">20 pts</div><div class="cc-title">Compiles + runs</div><div class="cc-desc">Your code should compile without errors. Logic should be sound — no while loops in periodic(), no raw mutation of private fields from outside the class.</div></div>
</div>

</div>
