---
layout: week
title: "PID Control"
subtitle: "P, I, D terms, WPILib PIDController, feedforward, and tuning basics."
badge: "Offseason · Week 5 of 8"
phase: offseason
phase_label: Offseason
week_label: "Week O5"
page_id: "offseason-o5"
topics:
  - What is PID?
  - The P, I, D Terms
  - Tuning Process
prev_url: "/weeks/offseason/os-week4"
prev_title: "O4 — Motors & Sensors"
next_url: "/weeks/offseason/os-week6"
next_title: "O6 — Autonomous"
---

<h2 class="sh">What is PID?</h2>
<p>PID is a control algorithm that continuously adjusts an output (like motor speed) to reach and maintain a target (like a specific angle or RPM). Without it, motors overshoot, oscillate, or never reach their target accurately.</p>

<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">P — Proportional</div><div class="cc-title">React to current error</div><div class="cc-desc">Output = kP × error. Bigger error = bigger correction. Too high → oscillation. Too low → slow.</div></div>
  <div class="concept-card"><div class="cc-label">I — Integral</div><div class="cc-title">React to accumulated error</div><div class="cc-desc">Fixes steady-state error. Rarely needed in FRC. Start with 0 and only add if the mechanism never quite reaches target.</div></div>
  <div class="concept-card"><div class="cc-label">D — Derivative</div><div class="cc-title">React to rate of change</div><div class="cc-desc">Dampens oscillation. Output = kD × (error change rate). Like a shock absorber. Add after P to smooth out oscillation.</div></div>
  <div class="concept-card"><div class="cc-label">Feedforward</div><div class="cc-title">Predict what's needed</div><div class="cc-desc">kS (static friction), kV (velocity), kA (acceleration). Reduces the work PID has to do by predicting the right output.</div></div>
</div>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — WPILib PIDController</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="kw">import</span> edu.wpi.first.math.controller.<span class="cls">PIDController</span>;

<span class="cls">PIDController</span> pid = <span class="kw">new</span> <span class="cls">PIDController</span>(<span class="num">0.1</span>, <span class="num">0.0</span>, <span class="num">0.01</span>); <span class="cmt">// kP, kI, kD</span>
pid.<span class="fn">setSetpoint</span>(<span class="num">4000.0</span>); <span class="cmt">// target RPM</span>
pid.<span class="fn">setTolerance</span>(<span class="num">50.0</span>);  <span class="cmt">// ±50 RPM counts as "at target"</span>

<span class="cmt">// In execute() — call every 20ms with current measurement</span>
<span class="type">double</span> currentRPM = encoder.<span class="fn">getVelocity</span>();
<span class="type">double</span> output = pid.<span class="fn">calculate</span>(currentRPM);
motor.<span class="fn">set</span>(output);

<span class="kw">if</span> (pid.<span class="fn">atSetpoint</span>()) {
    System.out.<span class="fn">println</span>(<span class="str">"At target!"</span>);
}</pre>
</div>

<h2 class="sh">Tuning Process</h2>
<table>
<thead><tr><th>Step</th><th>What to do</th><th>What to look for</th></tr></thead>
<tbody>
<tr><td>1. Start with P only</td><td>Set kI=0, kD=0. Increase kP until it moves</td><td>Reaches target but oscillates</td></tr>
<tr><td>2. Add D</td><td>Increase kD slowly</td><td>Oscillation dampens without slowing response</td></tr>
<tr><td>3. Add I if needed</td><td>Only if it never quite reaches setpoint</td><td>Steady-state error eliminated</td></tr>
<tr><td>4. Add Feedforward</td><td>kS for static friction, kV for velocity</td><td>Faster response, less PID correction needed</td></tr>
</tbody>
</table>

<h2 class="sh">Knowledge Check</h2>
<div id="quiz-o5"></div>
<script>
const quiz_o5 = new Quiz('quiz-o5', [
  { question: "The P term in PID responds to:", options: ["The accumulated past error","The rate of error change","The current error right now","The target setpoint"], correct: 2, explanation: "P = proportional = current error × kP. Bigger error → bigger output. Smaller error → smaller output. Simple but powerful." },
  { question: "Your mechanism oscillates around the setpoint. Which term do you increase?", options: ["kP","kI","kD","setTolerance"], correct: 2, explanation: "kD is the derivative — it dampens oscillation by reacting to how fast the error is changing. Like a shock absorber on the controller." },
  { question: "Your mechanism gets close to the setpoint but always stops slightly short. Which term fixes it?", options: ["kP (increase)","kI (add a small value)","kD (increase)","Feedforward only"], correct: 1, explanation: "Steady-state error (always a bit off) is the I term's job. kI accumulates the error over time and adds a correction. Use sparingly — it can cause wind-up." },
  { question: "pid.calculate(measurement) should be called:", options: ["Once in the constructor","Only when the setpoint changes","Every 20ms in execute()","Only when atSetpoint() is false"], correct: 2, explanation: "PID needs to continuously update. Call calculate() every loop cycle with the latest measurement so it can keep correcting in real time." },
  { question: "What is the purpose of feedforward in a control loop?", options: ["Replaces PID entirely","Predicts the needed output based on physics, reducing the correction PID has to make","Sets the maximum motor output","Only used for velocity control"], correct: 1, explanation: "Feedforward models the physics. For a flywheel, kV × targetRPM predicts the voltage needed to spin at that speed. PID then only corrects small deviations, instead of fighting from scratch." }
], 'offseason-o5');
</script>
