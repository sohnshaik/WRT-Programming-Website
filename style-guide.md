---
layout: default
title: Style Guide
permalink: /style-guide/
---

<div class="page-hero" style="border-bottom:4px solid #C41230">
  <div class="ph-breadcrumb"><a href="{{ '/' | relative_url }}">Home</a><span>/</span><span>Style Guide</span></div>
  <div class="ph-badge badge-summer">Reference</div>
  <h1>Course Style Guide</h1>
  <p>Every component used in this course, documented in one place. Use this when building new weeks or reviewing existing ones.</p>
</div>

<div class="content-wrap">

<h2 class="sh">Color Palette</h2>
<div class="concept-grid">
  <div class="concept-card" style="border-top-color:#C41230">
    <div class="cc-label" style="color:#C41230">Primary</div>
    <div class="cc-title" style="color:#C41230">#C41230</div>
    <div class="cc-desc">Walton Red — callouts, active states, accents, primary buttons</div>
  </div>
  <div class="concept-card" style="border-top-color:#1B2A4A">
    <div class="cc-label" style="color:#1B2A4A">Navy</div>
    <div class="cc-title" style="color:#1B2A4A">#1B2A4A</div>
    <div class="cc-desc">Walton Navy — topbar, code headers, tables, navy buttons</div>
  </div>
  <div class="concept-card" style="border-top-color:#00875A">
    <div class="cc-label" style="color:#00875A">Green</div>
    <div class="cc-title" style="color:#00875A">#00875A</div>
    <div class="cc-desc">Correct answers, completed states, success callouts</div>
  </div>
  <div class="concept-card" style="border-top-color:#b45309">
    <div class="cc-label" style="color:#b45309">Amber</div>
    <div class="cc-title" style="color:#b45309">#b45309</div>
    <div class="cc-desc">Warnings, in-progress states, caution callouts</div>
  </div>
</div>

<h2 class="sh">Callout Boxes</h2>
<div class="callout tip"><p><strong>Tip</strong> — Use <code>.callout.tip</code> for helpful hints, FRC connections, and best practices. Green left border.</p></div>
<div class="callout info"><p><strong>Info</strong> — Use <code>.callout.info</code> for neutral context, background information. Blue left border.</p></div>
<div class="callout warning"><p><strong>Warning</strong> — Use <code>.callout.warning</code> for gotchas, common mistakes, things to double-check. Amber left border.</p></div>
<div class="callout danger"><p><strong>Danger</strong> — Use <code>.callout.danger</code> for bans, breaking rules, things that will crash the robot. Red left border. Use sparingly.</p></div>

<h2 class="sh">Code Blocks</h2>
<p>All code blocks use a dark surface (<code>#1e2638</code>) with the <code>.code-block</code> wrapper. The header shows the language and a copy button. Hand-rolled syntax highlighting uses span classes.</p>

<div class="code-block">
<div class="cb-header"><span class="cb-lang">java — example</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// This is a comment</span>
<span class="kw">public class</span> <span class="cls">Example</span> {
    <span class="kw">private</span> <span class="type">double</span> speed = <span class="num">0.5</span>;
    <span class="kw">public void</span> <span class="fn">run</span>() {
        System.out.<span class="fn">println</span>(<span class="str">"Running at: "</span> + speed);
    }
}</pre>
</div>

<table>
<thead><tr><th>Span class</th><th>Color</th><th>Use for</th></tr></thead>
<tbody>
<tr><td>.kw</td><td>#f472b6 pink</td><td>Keywords: public, private, class, extends, new, if, return</td></tr>
<tr><td>.type</td><td>#93c5fd blue</td><td>Primitive types: int, double, boolean, void</td></tr>
<tr><td>.str</td><td>#fbbf24 amber</td><td>String literals: "hello"</td></tr>
<tr><td>.num</td><td>#c4b5fd purple</td><td>Numeric literals: 0, 1.5, 100</td></tr>
<tr><td>.cmt</td><td>#64748b gray</td><td>Comments: // and /* */</td></tr>
<tr><td>.fn</td><td>#6ee7b7 green</td><td>Method calls: println(), set(), calculate()</td></tr>
<tr><td>.cls</td><td>#fde68a yellow</td><td>Class names: Motor, SubsystemBase, ArrayList</td></tr>
</tbody>
</table>

<h2 class="sh">Concept Grid</h2>
<p>Use <code>.concept-grid</code> + <code>.concept-card</code> for 3–4 related concepts side by side. Auto-fits to available width.</p>
<div class="concept-grid">
  <div class="concept-card"><div class="cc-label">Label</div><div class="cc-title">Card Title</div><div class="cc-desc">Short description. One idea per card. 2–3 sentences max.</div></div>
  <div class="concept-card"><div class="cc-label">Label</div><div class="cc-title">Card Title</div><div class="cc-desc">Short description. One idea per card. 2–3 sentences max.</div></div>
  <div class="concept-card"><div class="cc-label">Label</div><div class="cc-title">Card Title</div><div class="cc-desc">Short description. One idea per card. 2–3 sentences max.</div></div>
  <div class="concept-card"><div class="cc-label">Label</div><div class="cc-title">Card Title</div><div class="cc-desc">Short description. One idea per card. 2–3 sentences max.</div></div>
</div>

<h2 class="sh">Tables</h2>
<p>Navy header, zebra-hover rows, mono font on first column for code values.</p>
<table>
<thead><tr><th>Column A</th><th>Column B</th><th>Column C</th></tr></thead>
<tbody>
<tr><td>value-one</td><td>Description of value one</td><td>Notes</td></tr>
<tr><td>value-two</td><td>Description of value two</td><td>Notes</td></tr>
<tr><td>value-three</td><td>Description of value three</td><td>Notes</td></tr>
</tbody>
</table>

<h2 class="sh">Buttons</h2>
<div style="display:flex;gap:10px;flex-wrap:wrap;margin:1rem 0">
  <button class="btn btn-primary">Primary</button>
  <button class="btn btn-navy">Navy</button>
  <button class="btn btn-outline">Outline</button>
  <button class="btn btn-success">Success</button>
  <button class="btn btn-primary btn-sm">Primary Small</button>
  <button class="btn btn-outline btn-sm">Outline Small</button>
  <button class="btn btn-navy" disabled>Disabled</button>
</div>

<h2 class="sh">Fill-in-the-Blank</h2>
<div id="fill-sg">
  <div class="fill-container">
    <span class="cmt">// Type the missing keyword</span><br>
    <span class="kw">public</span> <input class="fill-blank" data-answer="static" placeholder="??????"> <span class="type">void</span> <span class="fn">main</span>(<span class="type">String</span>[] args) { }
  </div>
</div>
<div style="display:flex;align-items:center;gap:12px;margin-top:10px">
  <button class="btn btn-navy btn-sm" onclick="checkFills('fill-sg')">Check</button>
  <span id="fill-sg-result" style="font-size:13px;font-weight:700;display:none"></span>
</div>

<h2 class="sh">Quiz Engine</h2>
<div id="quiz-sg"></div>

<h2 class="sh">Coding Challenge</h2>
<div class="challenge">
  <div class="ch-header"><div class="ch-icon">⚡</div><div><div class="ch-title">Challenge Title</div><div class="ch-sub">Scenario or context</div></div></div>
  <div class="ch-body">
    <p class="ch-prompt">Challenge instructions go here. Be specific — reference exact variable names, expected outputs, and constraints.</p>
    <textarea class="code-input" placeholder="// Your code here..."></textarea>
    <div style="margin-top:10px"><button class="btn btn-outline btn-sm" onclick="showSolution('sol-sg')">Show Solution</button></div>
    <div id="sol-sg" style="display:none;margin-top:1rem">
      <div class="code-block"><div class="cb-header"><span class="cb-lang">solution</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
<pre><span class="cmt">// Solution goes here</span>
System.out.<span class="fn">println</span>(<span class="str">"Hello, WRT!"</span>);</pre>
      </div>
    </div>
  </div>
</div>

<h2 class="sh">Page Navigation</h2>
<div class="page-nav">
  <a href="#" class="pn-link">
    <span class="pn-label">← Previous</span>
    <span class="pn-title">Previous Week Title</span>
  </a>
  <a href="#" class="pn-link pn-next">
    <span class="pn-label">Next →</span>
    <span class="pn-title">Next Week Title</span>
  </a>
</div>

<h2 class="sh">Typography Rules</h2>
<table>
<thead><tr><th>Element</th><th>Class / Tag</th><th>Use</th></tr></thead>
<tbody>
<tr><td>Section heading</td><td><code>h2.sh</code></td><td>Every major section. Gets red left border + navy text.</td></tr>
<tr><td>Sub-heading</td><td><code>h3.sub</code></td><td>Subsections within a topic.</td></tr>
<tr><td>Body text</td><td><code>p</code></td><td>Explanations, context. Keep under 4 sentences before a code example.</td></tr>
<tr><td>Inline code</td><td><code>code</code></td><td>Variable names, method names, keywords inline in text.</td></tr>
</tbody>
</table>

<h2 class="sh">Writing Rules</h2>
<div class="callout tip"><p><strong>Keep explanations short.</strong> One paragraph of context, then a code example. Programmers learn by reading code, not prose. If you need more than 4 sentences to explain something, it probably needs a code example.</p></div>
<div class="callout tip"><p><strong>Always include an FRC connection.</strong> Every concept should connect to something real on the robot. "In FRC you'll use this for..." makes the material land.</p></div>
<div class="callout warning"><p><strong>Don't use while loops in any example robot code.</strong> Even as a "bad example" — new programmers will copy it. If you need to show a while loop, clearly label it "Not in robot code — pure Java only."</p></div>
<div class="callout warning"><p><strong>Quiz questions should be specific, not trick questions.</strong> Each question tests one concept. Wrong answers should be plausibly wrong, not obviously absurd.</p></div>

</div>

<script>
const quiz_sg = new Quiz('quiz-sg', [
  { question: "Which <code>.callout</code> variant should you use when warning about something that could crash the robot?", options: [".callout.warning",".callout.danger",".callout.info",".callout.tip"], correct: 1, explanation: "<code>.callout.danger</code> is for bans and robot-breaking rules. Use it sparingly — if everything is marked danger, nothing feels urgent." },
  { question: "Which span class makes a method call green in a code block?", options: [".fn",".kw",".type",".cls"], correct: 0, explanation: "<code>.fn</code> is the method/function color (#6ee7b7 green). It applies to method names like <code>set()</code>, <code>println()</code>, <code>calculate()</code>." }
], null);
</script>
