---
layout: default
title: Style Guide
page_id: style-guide
---

<div class="page-hero">
  <div class="ph-breadcrumb">
    <a href="{{ '/' | relative_url }}">Home</a>
    <span>/</span>
    <span>Style Guide</span>
  </div>
  <h1>Component Style Guide</h1>
  <p>Documentation for course components, typography, and interactive elements.</p>
</div>

<div class="content-wrap">

<h2 class="sh">Typography</h2>
<p>All course content follows a clean, readable hierarchy. Headers are bold and purposeful, body text is set in a comfortable serif face.</p>

<div class="interactive-box">
  <div class="ib-header">Heading Hierarchy</div>
  <div class="ib-body">
    <h2 class="sh">Section Header (h2.sh)</h2>
    <p>Main content sections start with a bold red accent bar on the left.</p>
    <h3 class="sub">Subsection (h3.sub)</h3>
    <p>Smaller headers for subsections within a section.</p>
  </div>
</div>

<h2 class="sh">Callout Boxes</h2>
<p>Highlighted callouts draw attention to key concepts, warnings, or tips.</p>

<div class="callout tip">
  <p><strong>💡 Tip:</strong> Use callout boxes to highlight important information students should remember.</p>
</div>

<div class="callout danger">
  <p><strong>⚠️ Warning:</strong> Use danger callouts for common mistakes or critical warnings.</p>
</div>

<div class="callout success">
  <p><strong>✓ Success:</strong> Use success callouts to reinforce correct concepts.</p>
</div>

<h2 class="sh">Code Blocks</h2>
<p>Code blocks are syntax-highlighted and include a copy button for easy reference.</p>

<div class="code-block">
  <div class="cb-header"><span class="cb-lang">java</span><button class="cb-copy" onclick="copyCode(this)">copy</button></div>
  <pre><span class="kw">public static void</span> main(<span class="cls">String</span>[] args) {
    <span class="cls">System</span>.out.println(<span class="str">"Hello, World!"</span>);
}</pre>
</div>

<h2 class="sh">Concept Grids</h2>
<p>Concept grids break down ideas into digestible, visual chunks.</p>

<div class="concept-grid">
  <div class="concept-card">
    <div class="cc-label">Key Term</div>
    <div class="cc-title">Short Title</div>
    <div class="cc-desc">Explain the concept clearly and concisely. Use 1-2 sentences.</div>
  </div>
  <div class="concept-card">
    <div class="cc-label">Another Term</div>
    <div class="cc-title">Related Concept</div>
    <div class="cc-desc">Connect ideas to help students see relationships between topics.</div>
  </div>
  <div class="concept-card">
    <div class="cc-label">Best Practice</div>
    <div class="cc-title">Apply What You Learn</div>
    <div class="cc-desc">Always end with actionable takeaways students can use in code.</div>
  </div>
</div>

<h2 class="sh">Buttons</h2>
<p>Course uses semantic button styles for different actions.</p>

<div class="interactive-box">
  <div class="ib-header">Button Styles</div>
  <div class="ib-body" style="display: flex; gap: 10px; flex-wrap: wrap;">
    <button class="btn btn-primary">Primary Button</button>
    <button class="btn btn-navy">Navy Button</button>
    <button class="btn btn-outline">Outline Button</button>
    <button class="btn btn-success">Success Button</button>
    <button class="btn btn-sm">Small Button</button>
  </div>
</div>

<h2 class="sh">Quiz Component</h2>
<p>Knowledge checks throughout the course use standardized quiz displays with immediate feedback.</p>

<div class="interactive-box">
  <div class="ib-header">Quiz Structure</div>
  <div class="ib-body">
    <p>Quizzes feature:</p>
    <ul>
      <li>Multiple choice questions with A/B/C/D options</li>
      <li>Real-time scoring and progress tracking</li>
      <li>Detailed explanations after each answer</li>
      <li>Final score card with actionable feedback</li>
    </ul>
  </div>
</div>

<h2 class="sh">Layout & Spacing</h2>

<div class="concept-grid">
  <div class="concept-card">
    <div class="cc-label">Sidebar</div>
    <div class="cc-title">250px Fixed</div>
    <div class="cc-desc">Collapsible to 60px icon-only mode. Use Cmd+K to search.</div>
  </div>
  <div class="concept-card">
    <div class="cc-label">Content Max Width</div>
    <div class="cc-title">900px</div>
    <div class="cc-desc">Prevents lines from getting too long, improving readability.</div>
  </div>
  <div class="concept-card">
    <div class="cc-label">Vertical Rhythm</div>
    <div class="cc-title">1.5rem Grid</div>
    <div class="cc-desc">Consistent spacing between sections creates visual hierarchy.</div>
  </div>
</div>

<h2 class="sh">Color Palette</h2>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
  <div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
    <div style="background: #1B2A4A; height: 80px;"></div>
    <div style="padding: 0.75rem; font-size: 12px;">
      <div style="font-weight: 700; color: #1B2A4A;">Navy</div>
      <div style="color: #999; font-family: monospace;">#1B2A4A</div>
    </div>
  </div>
  <div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
    <div style="background: #C41230; height: 80px;"></div>
    <div style="padding: 0.75rem; font-size: 12px;">
      <div style="font-weight: 700;">Red (Accent)</div>
      <div style="color: #999; font-family: monospace;">#C41230</div>
    </div>
  </div>
  <div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
    <div style="background: #00875A; height: 80px;"></div>
    <div style="padding: 0.75rem; font-size: 12px;">
      <div style="font-weight: 700;">Green (Success)</div>
      <div style="color: #999; font-family: monospace;">#00875A</div>
    </div>
  </div>
</div>

<h2 class="sh">Navigation</h2>

<div class="interactive-box">
  <div class="ib-header">Sidebar Navigation</div>
  <div class="ib-body">
    <p><strong>Features:</strong></p>
    <ul>
      <li><strong>Collapsible:</strong> Click the ‹ icon to collapse to icon-only view</li>
      <li><strong>Searchable:</strong> Press Cmd+K or click the search button to find topics</li>
      <li><strong>Progress Tracking:</strong> Completed weeks show a ✓ indicator</li>
      <li><strong>Active Highlight:</strong> Current page is highlighted in red</li>
      <li><strong>Grouped by Phase:</strong> Summer (Java) and Offseason (FRC) content separated</li>
    </ul>
  </div>
</div>

<h2 class="sh">Mobile Responsiveness</h2>

<div class="concept-grid">
  <div class="concept-card">
    <div class="cc-label">Below 900px</div>
    <div class="cc-title">Sidebar Slides Out</div>
    <div class="cc-desc">Sidebar becomes an overlay. Collapse toggle hidden. Click hamburger to open.</div>
  </div>
  <div class="concept-card">
    <div class="cc-label">Below 600px</div>
    <div class="cc-title">Mobile Optimization</div>
    <div class="cc-desc">Smaller fonts, single-column grids, larger touch targets.</div>
  </div>
</div>

<h2 class="sh">Accessibility</h2>

<div class="callout tip">
  <p><strong>Accessible Design:</strong></p>
  <ul>
    <li>All interactive elements are keyboard accessible</li>
    <li>Color contrast meets WCAG AA standards</li>
    <li>Semantic HTML prevents screen reader confusion</li>
    <li>Code examples use proper syntax highlighting for clarity</li>
  </ul>
</div>

</div>
