---
layout: default
title: Home
---

<!-- ── HERO ─────────────────────────────────────────────── -->
<div class="home-hero">
  <div class="hh-inner">
    <div class="hh-logo-wrap">
      <img src="{{ '/assets/images/logo.jpeg' | relative_url }}" alt="Walton Robotics" class="hh-logo">
    </div>
    <div class="hh-text">
      <div class="hh-eyebrow">Walton Robotics · Team 2974 · 2026–27</div>
      <h1 class="hh-title">WRT Programming Course</h1>
      <p class="hh-sub">Learn Java from scratch, write real FRC robot code, and contribute to Team 2974 starting Day 1 of build season. 16 weeks of structured curriculum, quizzes, and hands-on coding challenges.</p>
      <div class="hh-actions">
        <a href="{{ '/weeks/summer/week1' | relative_url }}" class="btn btn-primary">Start Week 1 →</a>
        <a href="#modules" class="btn btn-outline-white">View All Modules</a>
      </div>
    </div>
    <div class="hh-stats-card">
      <div class="hsc-row">
        <div class="hsc-stat"><div class="hsc-num" id="dash-completed">0</div><div class="hsc-label">Completed</div></div>
        <div class="hsc-divider"></div>
        <div class="hsc-stat"><div class="hsc-num">16</div><div class="hsc-label">Weeks</div></div>
        <div class="hsc-divider"></div>
        <div class="hsc-stat"><div class="hsc-num">2</div><div class="hsc-label">Phases</div></div>
      </div>
      <div class="hsc-progress-wrap">
        <div class="hsc-prog-label">
          <span>Your Progress</span>
          <span class="sp-pct-text">0%</span>
        </div>
        <div class="sp-track"><div class="sp-fill" style="width:0%"></div></div>
      </div>
    </div>
  </div>
</div>

<!-- ── MEET THE LEADS ─────────────────────────────────────── -->
<div class="home-section">
  <div class="hs-inner">
    <div class="hs-header">
      <div class="hs-eyebrow">Before You Start</div>
      <h2 class="hs-title">Meet the Programming Leads</h2>
      <p class="hs-sub">Short intro videos from the people running this course. Watch these first — they'll tell you what to expect, what the team builds, and how to get the most out of the next 16 weeks.</p>
    </div>

    <div class="leads-grid">

      <!-- Lead 1 — Chief Programmer -->
      <div class="lead-card">
        <div class="lc-video-wrap" id="lc-vid-1">
          <div class="lc-video-placeholder" data-slot="1">
            <div class="lv-icon">▶</div>
            <div class="lv-name">Chief Programmer</div>
            <div class="lv-sub">Add YouTube URL below</div>
          </div>
          <!-- To embed: replace the placeholder div above with:
          <iframe src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
          -->
        </div>
        <div class="lc-body">
          <div class="lc-role">Chief Programmer</div>
          <div class="lc-name" id="lead-name-1">Your Name</div>
          <div class="lc-bio" id="lead-bio-1">Brief intro — your role on the team, what you're most excited to build this season, and your advice for new programmers.</div>
        </div>
      </div>

      <!-- Lead 2 -->
      <div class="lead-card">
        <div class="lc-video-wrap">
          <div class="lc-video-placeholder" data-slot="2">
            <div class="lv-icon">▶</div>
            <div class="lv-name">Programming Lead</div>
            <div class="lv-sub">Add YouTube URL below</div>
          </div>
        </div>
        <div class="lc-body">
          <div class="lc-role">Programming Lead</div>
          <div class="lc-name" id="lead-name-2">Your Name</div>
          <div class="lc-bio" id="lead-bio-2">Brief intro — your speciality (vision, drivetrain, auto, etc.) and one thing you wish you'd known when you started.</div>
        </div>
      </div>

      <!-- Lead 3 / Mentor -->
      <div class="lead-card">
        <div class="lc-video-wrap">
          <div class="lc-video-placeholder" data-slot="3">
            <div class="lv-icon">▶</div>
            <div class="lv-name">Programming Mentor</div>
            <div class="lv-sub">Add YouTube URL below</div>
          </div>
        </div>
        <div class="lc-body">
          <div class="lc-role">Programming Mentor</div>
          <div class="lc-name" id="lead-name-3">Mentor Name</div>
          <div class="lc-bio" id="lead-bio-3">What you look for when reviewing code, your experience with FRC, and how to ask good questions when you're stuck.</div>
        </div>
      </div>

    </div>

    <div class="callout info" style="margin-top:1.5rem">
      <p><strong>To add your intro video:</strong> Record a 2–3 min video on your phone or laptop, upload it to YouTube as unlisted, then replace the placeholder <code>div</code> in <code>index.md</code> with <code>&lt;iframe src="https://www.youtube.com/embed/YOUR_ID"...&gt;</code>. Update <code>id="lead-name-X"</code> and <code>id="lead-bio-X"</code> spans too.</p>
    </div>
  </div>
</div>

<!-- ── HOW THIS WORKS ─────────────────────────────────────── -->
<div class="home-section home-section--alt">
  <div class="hs-inner">
    <div class="hs-header">
      <div class="hs-eyebrow">Course Structure</div>
      <h2 class="hs-title">How It Works</h2>
    </div>

    <div class="how-grid">
      <div class="how-card">
        <div class="how-num">01</div>
        <div class="how-icon">📖</div>
        <div class="how-title">Read & Watch</div>
        <div class="how-desc">Each week has explanations, diagrams, and code examples. Read everything before starting the quiz — context matters.</div>
      </div>
      <div class="how-card">
        <div class="how-num">02</div>
        <div class="how-icon">✏️</div>
        <div class="how-title">Fill in the Blanks</div>
        <div class="how-desc">Short exercises to confirm you understand the syntax. Get these right before moving to the MCQ section.</div>
      </div>
      <div class="how-card">
        <div class="how-num">03</div>
        <div class="how-icon">🧠</div>
        <div class="how-title">Take the Quiz</div>
        <div class="how-desc">5–6 MCQ questions per week. Scores are saved locally. You need ≥70% to unlock the complete-week badge.</div>
      </div>
      <div class="how-card">
        <div class="how-num">04</div>
        <div class="how-icon">⚡</div>
        <div class="how-title">Coding Challenge</div>
        <div class="how-desc">Apply what you learned in a realistic FRC scenario. A hidden solution is available — try it yourself first.</div>
      </div>
      <div class="how-card">
        <div class="how-num">05</div>
        <div class="how-icon">🔁</div>
        <div class="how-title">Repeat Weekly</div>
        <div class="how-desc">Summer = 8 weeks of pure Java. Offseason = 8 weeks of FRC-specific content. One week per training session.</div>
      </div>
      <div class="how-card">
        <div class="how-num">06</div>
        <div class="how-icon">🤖</div>
        <div class="how-title">Build Season</div>
        <div class="how-desc">Complete all 16 weeks and you'll be ready to write real competition code from Day 1 of the build season.</div>
      </div>
    </div>
  </div>
</div>

<!-- ── COURSE MODULES ─────────────────────────────────────── -->
<div class="home-section" id="modules">
  <div class="hs-inner">

    <div class="hs-header">
      <div class="hs-eyebrow">Phase 1 · 8 Weeks</div>
      <h2 class="hs-title">Summer — Java Foundations</h2>
      <p class="hs-sub">No robot required. Pure Java on your laptop. By the end you'll have the OOP fundamentals needed to read and write real WPILib code.</p>
    </div>

    <div class="module-list">
      <a class="module-item" href="{{ '/weeks/summer/week1' | relative_url }}" data-page="summer-w1">
        <div class="mi-num"><span class="mi-phase">SUM</span>W1</div>
        <div class="mi-body"><div class="mi-title">The Basics</div><div class="mi-sub">Variables, data types, operators, scope, readability</div></div>
        <div class="mi-right"><span class="mi-score">—</span><span class="mi-status status-todo">Not Started</span></div>
      </a>
      <a class="module-item" href="{{ '/weeks/summer/week2' | relative_url }}" data-page="summer-w2">
        <div class="mi-num"><span class="mi-phase">SUM</span>W2</div>
        <div class="mi-body"><div class="mi-title">Logic &amp; Control Flow</div><div class="mi-sub">Booleans, if/else, switch statements, logical operators</div></div>
        <div class="mi-right"><span class="mi-score">—</span><span class="mi-status status-todo">Not Started</span></div>
      </a>
      <a class="module-item" href="{{ '/weeks/summer/week3' | relative_url }}" data-page="summer-w3">
        <div class="mi-num"><span class="mi-phase">SUM</span>W3</div>
        <div class="mi-body"><div class="mi-title">Loops</div><div class="mi-sub">For loops, foreach, and why while loops are banned from robot code</div></div>
        <div class="mi-right"><span class="mi-score">—</span><span class="mi-status status-todo">Not Started</span></div>
      </a>
      <a class="module-item" href="{{ '/weeks/summer/week4' | relative_url }}" data-page="summer-w4">
        <div class="mi-num"><span class="mi-phase">SUM</span>W4</div>
        <div class="mi-body"><div class="mi-title">Arrays &amp; Methods</div><div class="mi-sub">Arrays, ArrayLists, method signatures, Javadocs</div></div>
        <div class="mi-right"><span class="mi-score">—</span><span class="mi-status status-todo">Not Started</span></div>
      </a>
      <a class="module-item" href="{{ '/weeks/summer/week5' | relative_url }}" data-page="summer-w5">
        <div class="mi-num"><span class="mi-phase">SUM</span>W5</div>
        <div class="mi-body"><div class="mi-title">OOP — Classes &amp; Objects</div><div class="mi-sub">Classes, constructors, encapsulation, getters/setters</div></div>
        <div class="mi-right"><span class="mi-score">—</span><span class="mi-status status-todo">Not Started</span></div>
      </a>
      <a class="module-item" href="{{ '/weeks/summer/week6' | relative_url }}" data-page="summer-w6">
        <div class="mi-num"><span class="mi-phase">SUM</span>W6</div>
        <div class="mi-body"><div class="mi-title">Inheritance &amp; Polymorphism</div><div class="mi-sub">extends, super, @Override, abstract classes, interfaces</div></div>
        <div class="mi-right"><span class="mi-score">—</span><span class="mi-status status-todo">Not Started</span></div>
      </a>
      <a class="module-item" href="{{ '/weeks/summer/week7' | relative_url }}" data-page="summer-w7">
        <div class="mi-num"><span class="mi-phase">SUM</span>W7</div>
        <div class="mi-body"><div class="mi-title">Advanced Classes</div><div class="mi-sub">Enums, nested classes, ArrayLists deep dive</div></div>
        <div class="mi-right"><span class="mi-score">—</span><span class="mi-status status-todo">Not Started</span></div>
      </a>
      <a class="module-item" href="{{ '/weeks/summer/week8' | relative_url }}" data-page="summer-w8">
        <div class="mi-num mi-bridge"><span class="mi-phase">SUM</span>W8</div>
        <div class="mi-body"><div class="mi-title">Bridge Week — XRP &amp; WPILib</div><div class="mi-sub">Java meets robot code. First WPILib program on real hardware</div></div>
        <div class="mi-right"><span class="mi-score">—</span><span class="mi-status status-todo">Not Started</span></div>
      </a>
    </div>

    <div class="phase-divider">
      <div class="hs-header" style="margin-top:3rem">
        <div class="hs-eyebrow">Phase 2 · 8 Weeks</div>
        <h2 class="hs-title">Offseason — FRC Training</h2>
        <p class="hs-sub">Robot-specific content. Git workflow, WPILib, command-based architecture, motors, PID, PathPlanner. This is the real stuff.</p>
      </div>
    </div>

    <div class="module-list">
      <a class="module-item" href="{{ '/weeks/offseason/os-week1' | relative_url }}" data-page="offseason-o1">
        <div class="mi-num mi-frc"><span class="mi-phase">FRC</span>O1</div>
        <div class="mi-body"><div class="mi-title">Git &amp; GitHub</div><div class="mi-sub">Branches, PRs, commit messages, the 2974 team workflow</div></div>
        <div class="mi-right"><span class="mi-score">—</span><span class="mi-status status-todo">Not Started</span></div>
      </a>
      <a class="module-item" href="{{ '/weeks/offseason/os-week2' | relative_url }}" data-page="offseason-o2">
        <div class="mi-num mi-frc"><span class="mi-phase">FRC</span>O2</div>
        <div class="mi-body"><div class="mi-title">WPILib Setup</div><div class="mi-sub">Dev environment, project structure, RobotContainer, Constants</div></div>
        <div class="mi-right"><span class="mi-score">—</span><span class="mi-status status-todo">Not Started</span></div>
      </a>
      <a class="module-item" href="{{ '/weeks/offseason/os-week3' | relative_url }}" data-page="offseason-o3">
        <div class="mi-num mi-frc"><span class="mi-phase">FRC</span>O3</div>
        <div class="mi-body"><div class="mi-title">Command-Based Architecture</div><div class="mi-sub">Subsystems, Commands, Triggers, the Scheduler</div></div>
        <div class="mi-right"><span class="mi-score">—</span><span class="mi-status status-todo">Not Started</span></div>
      </a>
      <a class="module-item" href="{{ '/weeks/offseason/os-week4' | relative_url }}" data-page="offseason-o4">
        <div class="mi-num mi-frc"><span class="mi-phase">FRC</span>O4</div>
        <div class="mi-body"><div class="mi-title">Motors &amp; Sensors</div><div class="mi-sub">SparkMax, TalonFX, encoders, gyroscopes, SmartDashboard</div></div>
        <div class="mi-right"><span class="mi-score">—</span><span class="mi-status status-todo">Not Started</span></div>
      </a>
      <a class="module-item" href="{{ '/weeks/offseason/os-week5' | relative_url }}" data-page="offseason-o5">
        <div class="mi-num mi-frc"><span class="mi-phase">FRC</span>O5</div>
        <div class="mi-body"><div class="mi-title">PID Control</div><div class="mi-sub">P, I, D terms, WPILib PIDController, feedforward, tuning</div></div>
        <div class="mi-right"><span class="mi-score">—</span><span class="mi-status status-todo">Not Started</span></div>
      </a>
      <a class="module-item" href="{{ '/weeks/offseason/os-week6' | relative_url }}" data-page="offseason-o6">
        <div class="mi-num mi-frc"><span class="mi-phase">FRC</span>O6</div>
        <div class="mi-body"><div class="mi-title">Autonomous &amp; PathPlanner</div><div class="mi-sub">Auto sequences, field coordinates, odometry, PathPlanner</div></div>
        <div class="mi-right"><span class="mi-score">—</span><span class="mi-status status-todo">Not Started</span></div>
      </a>
      <a class="module-item" href="{{ '/weeks/offseason/os-week7' | relative_url }}" data-page="offseason-o7">
        <div class="mi-num mi-frc"><span class="mi-phase">FRC</span>O7</div>
        <div class="mi-body"><div class="mi-title">Subsystem Ownership</div><div class="mi-sub">Read, document, improve a real subsystem. Capstone project.</div></div>
        <div class="mi-right"><span class="mi-score">—</span><span class="mi-status status-todo">Not Started</span></div>
      </a>
      <a class="module-item" href="{{ '/weeks/offseason/os-week8' | relative_url }}" data-page="offseason-o8">
        <div class="mi-num mi-frc"><span class="mi-phase">FRC</span>O8</div>
        <div class="mi-body"><div class="mi-title">Build Season Prep</div><div class="mi-sub">SCRUM, sprint planning, Git workflow, AdvantageKit intro</div></div>
        <div class="mi-right"><span class="mi-score">—</span><span class="mi-status status-todo">Not Started</span></div>
      </a>
    </div>

  </div>
</div>

<!-- ── RESOURCES ─────────────────────────────────────────── -->
<div class="home-section home-section--alt">
  <div class="hs-inner">
    <div class="hs-header">
      <div class="hs-eyebrow">Helpful Links</div>
      <h2 class="hs-title">Resources</h2>
    </div>
    <div class="resources-grid">
      <a class="resource-card" href="https://docs.wpilib.org" target="_blank" rel="noopener">
        <div class="rc-icon">📚</div>
        <div class="rc-title">WPILib Docs</div>
        <div class="rc-sub">Official FRC Java documentation</div>
      </a>
      <a class="resource-card" href="https://github.com/WaltonRobotics" target="_blank" rel="noopener">
        <div class="rc-icon">🐙</div>
        <div class="rc-title">WaltonRobotics GitHub</div>
        <div class="rc-sub">Team source code and training repo</div>
      </a>
      <a class="resource-card" href="https://pathplanner.dev" target="_blank" rel="noopener">
        <div class="rc-icon">🗺️</div>
        <div class="rc-title">PathPlanner</div>
        <div class="rc-sub">Autonomous path design tool</div>
      </a>
      <a class="resource-card" href="{{ '/style-guide' | relative_url }}">
        <div class="rc-icon">🎨</div>
        <div class="rc-title">Style Guide</div>
        <div class="rc-sub">Course component reference</div>
      </a>
    </div>
  </div>
</div>
