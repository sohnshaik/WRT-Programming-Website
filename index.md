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
      <div class="cdb-progress" id="home-progress-ui" style="display:none">
        <span class="cdbp-label sp-pct-text">0%</span>
        <div class="cdbp-track"><div class="cdbp-fill sp-fill" style="transform:scaleX(0)"></div></div>
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
      <p class="cih-sub">This course takes you from writing your first &quot;Hello World&quot; through advanced robotics programming. Whether you're new to coding or brushing up, we've built a structured path that matches how Walton Robotics actually builds robots. Expect hands-on projects, real team scenarios, and plenty of helpful guidance along the way.</p>
      <p class="cih-sub"> The course itself is split into two halves - the summer and the offseason. I will explain the offseason tasks once we *get* to the offseason lol, but for now, feel free to take a gander if you feel curious. </p>
    </div>
  </div>

  <!-- ── MEET THE LEADS ─────────────────────────────────── -->
  <div class="cd-leads">
    <div class="cd-leads-inner">
      <div class="cd-leads-header">
        <div class="cdlh-label">before you start</div>
        <div class="cdlh-title">meet the programming leads :)</div>
        <div class="cdlh-sub">short intro videos from the people actually running this thing. watch these first — they'll tell you what to expect, what the team builds, and honestly just give you a vibe check.</div>
        <div class="cdlh-scroll-hint"><span class="cdlh-arrow">↓</span> keep scrolling to meet everyone</div>
      </div>

      <div class="leads-stack">

        <div class="lead-card">
          <div class="lc-video-wrap">
           <iframe width="560" height="315" src="https://www.youtube.com/embed/2gwjvVwuv94?si=Z6dASx2Zm66qvE_S" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div class="lc-body">
            <div class="lc-role">Chief Programmer</div>
            <div class="lc-name">Sohan Shaik</div>
            <div class="lc-bio">Hey!! I'm Sohan, the Chief Programmer, Software Lead, or whatever you want to call it, for team 2974. I've been lucky enough to be coding FRC robots since sophomore year and it's lowkey taken up a whoooleeee lot of my time, and fortunately, programming (not the idea but the people around me from programming) is my personality at this point lol. Little bit about me: I love music!! music is life to me and without it I don't think i would be much of a person. of course, i love robotics as a whole, and it does unfortunately take up a lot of my time, but when im free, i love to read; whether it be manwha, manga, or just a long sci-fi novel — i'll read it all. i also am a very big boba person; specifically thai tea boba :D, and i also love castella cakes. gl and i hope y'all will reach out with questions! &lt;3 (srsly tho please ask questions i wish i did so so so much)</div>
          </div>
        </div>

      <div class="lead-card">
          <div class="lc-video-wrap">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/UehFxe04JRI?si=MwiTz-D3HYrhFP3J" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div class="lc-body">
            <div class="lc-role">Programming Lead</div>
            <div class="lc-name">Saarth Pandya</div>
            <div class="lc-bio">Hey guys, I'm Saarth, resident anti-procrastinator, Brawl Stars casual, and 2974 programmer. I started coding FRC bots my sophomore year, and over all of these years I've learned new skills, met new people, and made a bunch of fond memories. FRC programming (or really FRC in general) can get pretty heavy in terms of time commitment and such, and all the Java and FRC code that you need to learn may look intimidating at first, but don't worry- it's genuinely really fun once you get used to it and learn some basics. If it wasn't, I don't think any of us would be doing this. And also, if you're confused or need to ask something, don't hesitate, because as our goat Banks Troutman once famously said: "Ask and you shall receive!</div>
          </div>
        </div>

        <div class="lead-card">
          <div class="lc-video-wrap">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/fryYLp9oOqw?si=0juGfOKQD5G7eYFJ&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div class="lc-body">
            <div class="lc-role">Programming Lead</div>
            <div class="lc-name">Alexandra Ding</div>
            <div class="lc-bio">hi!!!! i'm alexandra, your favorite performative, nonchalant larper and also avid tiramisu enjoyer. i started coding FRC robots starting sophomore year, and i've made a lot of great friends not only on programming, but on this team in general. i'm super excited to see what we can do next year and to continue pushing our limits (wait guys, this is such motivational speach core)! can't wait to meet everyone!!!</div>
          </div>
        </div>

      <div class="lead-card">
          <div class="lc-video-wrap">
            <div class="lc-video-placeholder" data-slot="2">
              <div class="lv-name">Programming Lead</div>
              <div class="lv-sub">video coming soon :)</div>
            </div>
          </div>
          <div class="lc-body">
            <div class="lc-role">Assistant Chief Programmer</div>
            <div class="lc-name">Alex An</div>
            <div class="lc-bio">yo guys what’s up, im alex. i invent brainrot, play geometry dash, and code robots!! im a sophomore and i only started last year so i don’t know how im even here honestly. just in that one year though ive made a lot of great friends in the team and learned a ton about programming and FRC. i think that anybody can succeed at robotics, it’s really not so intimidating once you grasp the basics. work hard and ask us any questions, i believe in you guys! also PLEASE watch frieren</div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</div>
