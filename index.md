---
layout: default
title: Home
no_sidebar: true
page_id: home
---

<div class="course-dash">

  <!-- ── BANNER ──────────────────────────────────────────── -->
  <div class="cd-banner">
    <div class="cdb-inner">
      <img src="{{ '/assets/images/logo.jpeg' | relative_url }}" alt="Walton Robotics" class="cdb-logo">
      <div class="cdb-text">
        <h1>WRT Java &amp; FRC Course</h1>
        <div class="cdb-season">Walton Robotics · Team 2974 · {{ site.season }}</div>
      </div>
      <div class="cdb-progress">
        <span class="cdbp-label sp-pct-text">0%</span>
        <div class="cdbp-track"><div class="cdbp-fill sp-fill" style="width:0%"></div></div>
        <span class="cdbp-count"><span id="dash-completed">0</span>/16</span>
      </div>
      <a href="{{ '/training' | relative_url }}" class="btn btn-primary" id="dash-continue-btn">Start learning →</a>
    </div>
  </div>

  <!-- ── COURSE INTRO ────────────────────────────────────── -->
  <div class="course-intro">
    <div class="ci-header">
      <div class="cih-label">welcome to wrt programming</div>
      <h2>Learn Java &amp; FRC from the ground up</h2>
      <p class="cih-sub">this course takes you from writing your first &quot;Hello World&quot; through advanced robotics programming. whether you're new to coding or brushing up, we've built a structured path that matches how walton robotics actually builds robots. expect hands-on projects, real team scenarios, and plenty of helpful guidance along the way.</p>
    </div>
  </div>

  <!-- ── SUMMER PHASE ────────────────────────────────────── -->
  <!-- Summer Phase section removed from home - see /training/ for the dashboard -->

  <!-- ── OFFSEASON PHASE ─────────────────────────────────── -->
  <!-- Offseason Phase section removed from home - see /training/ for the dashboard -->

  <!-- ── MEET THE LEADS ─────────────────────────────────── -->
  <div class="cd-leads">
    <div class="cd-leads-inner">
      <div class="cd-leads-header">
        <div class="cdlh-label">before you start</div>
        <div class="cdlh-title">meet the programming leads :)</div>
        <div class="cdlh-sub">short intro videos from the people actually running this thing. watch these first — they'll tell you what to expect, what the team builds, and honestly just vibe check you lol. we don't bite fr.</div>
      </div>

      <div class="leads-grid leads-grid--4">

        <div class="lead-card">
          <div class="lc-video-wrap">
            <div class="lc-video-placeholder" data-slot="1">
              <div class="lv-icon">▶</div>
              <div class="lv-name">Chief Programmer</div>
              <div class="lv-sub">video coming soon :)</div>
            </div>
          </div>
          <div class="lc-body">
            <div class="lc-role">Chief Programmer</div>
            <div class="lc-name">Sohan Shaik</div>
            <div class="lc-bio">hey!! i'm sohan, the chief programmer for team 2974. i've been coding robots since sophomore year and tbh it's lowkey my whole personality at this point lol. this course is basically everything i wish someone had sat me down and taught me when i joined. gl &lt;3</div>
          </div>
        </div>

        <div class="lead-card">
          <div class="lc-video-wrap">
            <div class="lc-video-placeholder" data-slot="2">
              <div class="lv-icon">▶</div>
              <div class="lv-name">Programming Lead</div>
              <div class="lv-sub">video coming soon :)</div>
            </div>
          </div>
          <div class="lc-body">
            <div class="lc-role">Programming Lead</div>
            <div class="lc-name">Hrehaan Bedi</div>
            <div class="lc-bio">what's up, i'm hrehaan!! i mainly do auto and vision stuff. if you ever see a PathPlanner path that's kinda unhinged, that was probably me. come find me if you're confused about anything — no dumb questions fr :D</div>
          </div>
        </div>

        <div class="lead-card">
          <div class="lc-video-wrap">
            <div class="lc-video-placeholder" data-slot="3">
              <div class="lv-icon">▶</div>
              <div class="lv-name">Programming Lead</div>
              <div class="lv-sub">video coming soon :)</div>
            </div>
          </div>
          <div class="lc-body">
            <div class="lc-role">Programming Lead</div>
            <div class="lc-name">Alexandra Chau</div>
            <div class="lc-bio">hi!! i'm alexandra and i mostly handle subsystem ownership + PR reviews. if your code review has a lot of comments... that's probably me :] i promise it comes from a good place. ask me anything about command-based or WPILib!!</div>
          </div>
        </div>

        {% comment %}mentor card — add when video is ready{% endcomment %}

      </div>
    </div>
  </div>

</div>
