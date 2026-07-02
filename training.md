---
layout: default
title: Training
page_id: training
no_sidebar: true
---

<div class="course-dash">

  <!-- ── COMPACT PAGE HEADER ─────────────────────────────── -->
  <div class="cd-page-header">
    <div class="cdph-inner">
      <div class="cdph-text">
        <h1>course curriculum</h1>
        <p>16 weeks across two phases — Java foundations then FRC application. {{ site.season }}.</p>
      </div>
      <div class="cdph-actions">
        <div class="cdb-progress" id="home-progress-ui" style="display:none">
          <span class="cdbp-label sp-pct-text">0%</span>
          <div class="cdbp-track"><div class="cdbp-fill sp-fill" style="transform:scaleX(0)"></div></div>
          <span class="cdbp-count"><span id="dash-completed">0</span>/16</span>
        </div>
        <a href="{{ '/weeks/summer/week1' | relative_url }}" class="btn btn-primary btn-sm" id="dash-continue-btn">Continue →</a>
      </div>
    </div>
  </div>

  <!-- ── SUMMER PHASE ────────────────────────────────────── -->
  <div class="cd-phase" id="summer">
    <div class="cd-phase-header">
      <span class="cdph-badge cdph-badge--summer">Summer Phase</span>
      <h2>Java Foundations</h2>
      <span class="cdph-count">8 weeks</span>
    </div>
    <div class="cd-weeks-grid">

      <a class="cdwc" href="{{ '/weeks/summer/week1' | relative_url }}" data-page="summer-w1">
        <div class="cdwc-top">
          <span class="cdwc-num">W1</span>
          <span class="cdwc-status"><span class="cdwc-status-dot"></span><span class="cdwc-status-text">Not started</span></span>
        </div>
        <div class="cdwc-body">
          <div class="cdwc-title">The Basics</div>
          <div class="cdwc-topics">4 topics</div>
        </div>
        <div class="cdwc-footer"></div>
      </a>

      <a class="cdwc" href="{{ '/weeks/summer/week2' | relative_url }}" data-page="summer-w2">
        <div class="cdwc-top">
          <span class="cdwc-num">W2</span>
          <span class="cdwc-status"><span class="cdwc-status-dot"></span><span class="cdwc-status-text">Not started</span></span>
        </div>
        <div class="cdwc-body">
          <div class="cdwc-title">Logic &amp; Control Flow</div>
          <div class="cdwc-topics">4 topics</div>
        </div>
        <div class="cdwc-footer"></div>
      </a>

      <a class="cdwc" href="{{ '/weeks/summer/week3' | relative_url }}" data-page="summer-w3">
        <div class="cdwc-top">
          <span class="cdwc-num">W3</span>
          <span class="cdwc-status"><span class="cdwc-status-dot"></span><span class="cdwc-status-text">Not started</span></span>
        </div>
        <div class="cdwc-body">
          <div class="cdwc-title">Loops</div>
          <div class="cdwc-topics">3 topics</div>
        </div>
        <div class="cdwc-footer"></div>
      </a>

      <a class="cdwc" href="{{ '/weeks/summer/week4' | relative_url }}" data-page="summer-w4">
        <div class="cdwc-top">
          <span class="cdwc-num">W4</span>
          <span class="cdwc-status"><span class="cdwc-status-dot"></span><span class="cdwc-status-text">Not started</span></span>
        </div>
        <div class="cdwc-body">
          <div class="cdwc-title">Arrays &amp; Methods</div>
          <div class="cdwc-topics">4 topics</div>
        </div>
        <div class="cdwc-footer"></div>
      </a>

      <a class="cdwc" href="{{ '/weeks/summer/week5' | relative_url }}" data-page="summer-w5">
        <div class="cdwc-top">
          <span class="cdwc-num">W5</span>
          <span class="cdwc-status"><span class="cdwc-status-dot"></span><span class="cdwc-status-text">Not started</span></span>
        </div>
        <div class="cdwc-body">
          <div class="cdwc-title">OOP — Classes &amp; Objects</div>
          <div class="cdwc-topics">4 topics</div>
        </div>
        <div class="cdwc-footer"></div>
      </a>

      <a class="cdwc" href="{{ '/weeks/summer/week6' | relative_url }}" data-page="summer-w6">
        <div class="cdwc-top">
          <span class="cdwc-num">W6</span>
          <span class="cdwc-status"><span class="cdwc-status-dot"></span><span class="cdwc-status-text">Not started</span></span>
        </div>
        <div class="cdwc-body">
          <div class="cdwc-title">Inheritance &amp; Polymorphism</div>
          <div class="cdwc-topics">4 topics</div>
        </div>
        <div class="cdwc-footer"></div>
      </a>

      <a class="cdwc" href="{{ '/weeks/summer/week7' | relative_url }}" data-page="summer-w7">
        <div class="cdwc-top">
          <span class="cdwc-num">W7</span>
          <span class="cdwc-status"><span class="cdwc-status-dot"></span><span class="cdwc-status-text">Not started</span></span>
        </div>
        <div class="cdwc-body">
          <div class="cdwc-title">Advanced Classes</div>
          <div class="cdwc-topics">3 topics</div>
        </div>
        <div class="cdwc-footer"></div>
      </a>

      <a class="cdwc" href="{{ '/weeks/summer/week8' | relative_url }}" data-page="summer-w8">
        <div class="cdwc-top">
          <span class="cdwc-num">W8</span>
          <span class="cdwc-status"><span class="cdwc-status-dot"></span><span class="cdwc-status-text">Not started</span></span>
        </div>
        <div class="cdwc-body">
          <div class="cdwc-title">Recap &amp; Resources</div>
          <div class="cdwc-topics">3 topics + final project</div>
        </div>
        <div class="cdwc-footer"></div>
      </a>

    </div>
  </div>

  <!-- ── OFFSEASON PHASE ─────────────────────────────────── -->
  <div class="cd-phase cd-phase--offseason" id="offseason">
    <div class="cd-phase-header">
      <span class="cdph-badge cdph-badge--offseason">Offseason</span>
      <h2>FRC Training</h2>
      <span class="cdph-count">8 weeks</span>
    </div>
    <div class="cd-weeks-grid">

      <a class="cdwc" href="{{ '/weeks/offseason/os-week1' | relative_url }}" data-page="offseason-o1">
        <div class="cdwc-top">
          <span class="cdwc-num">O1</span>
          <span class="cdwc-status"><span class="cdwc-status-dot"></span><span class="cdwc-status-text">Not started</span></span>
        </div>
        <div class="cdwc-body">
          <div class="cdwc-title">Git &amp; GitHub</div>
          <div class="cdwc-topics">4 topics</div>
        </div>
        <div class="cdwc-footer"></div>
      </a>

      <a class="cdwc" href="{{ '/weeks/offseason/os-week2' | relative_url }}" data-page="offseason-o2">
        <div class="cdwc-top">
          <span class="cdwc-num">O2</span>
          <span class="cdwc-status"><span class="cdwc-status-dot"></span><span class="cdwc-status-text">Not started</span></span>
        </div>
        <div class="cdwc-body">
          <div class="cdwc-title">WPILib Setup</div>
          <div class="cdwc-topics">3 topics</div>
        </div>
        <div class="cdwc-footer"></div>
      </a>

      <a class="cdwc" href="{{ '/weeks/offseason/os-week3' | relative_url }}" data-page="offseason-o3">
        <div class="cdwc-top">
          <span class="cdwc-num">O3</span>
          <span class="cdwc-status"><span class="cdwc-status-dot"></span><span class="cdwc-status-text">Not started</span></span>
        </div>
        <div class="cdwc-body">
          <div class="cdwc-title">Command-Based Architecture</div>
          <div class="cdwc-topics">4 topics</div>
        </div>
        <div class="cdwc-footer"></div>
      </a>

      <a class="cdwc" href="{{ '/weeks/offseason/os-week4' | relative_url }}" data-page="offseason-o4">
        <div class="cdwc-top">
          <span class="cdwc-num">O4</span>
          <span class="cdwc-status"><span class="cdwc-status-dot"></span><span class="cdwc-status-text">Not started</span></span>
        </div>
        <div class="cdwc-body">
          <div class="cdwc-title">Motors &amp; Sensors</div>
          <div class="cdwc-topics">4 topics</div>
        </div>
        <div class="cdwc-footer"></div>
      </a>

      <a class="cdwc" href="{{ '/weeks/offseason/os-week5' | relative_url }}" data-page="offseason-o5">
        <div class="cdwc-top">
          <span class="cdwc-num">O5</span>
          <span class="cdwc-status"><span class="cdwc-status-dot"></span><span class="cdwc-status-text">Not started</span></span>
        </div>
        <div class="cdwc-body">
          <div class="cdwc-title">PID Control</div>
          <div class="cdwc-topics">4 topics</div>
        </div>
        <div class="cdwc-footer"></div>
      </a>

      <a class="cdwc" href="{{ '/weeks/offseason/os-week6' | relative_url }}" data-page="offseason-o6">
        <div class="cdwc-top">
          <span class="cdwc-num">O6</span>
          <span class="cdwc-status"><span class="cdwc-status-dot"></span><span class="cdwc-status-text">Not started</span></span>
        </div>
        <div class="cdwc-body">
          <div class="cdwc-title">Autonomous &amp; Choreo</div>
          <div class="cdwc-topics">4 topics</div>
        </div>
        <div class="cdwc-footer"></div>
      </a>

      <a class="cdwc" href="{{ '/weeks/offseason/os-week7' | relative_url }}" data-page="offseason-o7">
        <div class="cdwc-top">
          <span class="cdwc-num">O7</span>
          <span class="cdwc-status"><span class="cdwc-status-dot"></span><span class="cdwc-status-text">Not started</span></span>
        </div>
        <div class="cdwc-body">
          <div class="cdwc-title">Subsystem Ownership</div>
          <div class="cdwc-topics">3 topics</div>
        </div>
        <div class="cdwc-footer"></div>
      </a>

      <a class="cdwc" href="{{ '/weeks/offseason/os-week8' | relative_url }}" data-page="offseason-o8">
        <div class="cdwc-top">
          <span class="cdwc-num">O8</span>
          <span class="cdwc-status"><span class="cdwc-status-dot"></span><span class="cdwc-status-text">Not started</span></span>
        </div>
        <div class="cdwc-body">
          <div class="cdwc-title">Build Season Prep</div>
          <div class="cdwc-topics">3 topics</div>
        </div>
        <div class="cdwc-footer"></div>
      </a>

    </div>
  </div>

</div>
