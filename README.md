# Walton Robotics Programming Course
### Team 2974 · 2026–27 Season

A two-phase FRC programming course built with Jekyll and hosted on GitHub Pages. Covers Java foundations through full FRC robot development.

**Live site: [wrtprogramming.com](https://wrtprogramming.com/)**

---

## Structure

```mermaid
graph TD
    ROOT["wrtprogramming.com"] --> PHASE1["Phase 1: Java Foundations\nweeks/summer/"]
    ROOT --> PHASE2["Phase 2: FRC Training\nweeks/offseason/"]
    ROOT --> AUTH["Auth & Dashboards"]
    ROOT --> INFRA["Infrastructure"]

    AUTH --> LOGIN["login.md"]
    AUTH --> DASH["dashboard-teacher.md"]
    AUTH --> FB["Firebase Auth + Firestore"]

    INFRA --> JEKYLL["Jekyll + GitHub Pages\n_layouts/  _includes/  _data/"]
    INFRA --> SCSS["_sass/partials/\ntokens · components · dark mode"]
    INFRA --> WRC["assets/js/wrc.js\nquiz engine + progress tracking"]
    INFRA --> AUTHJS["assets/js/auth.js\nFirebase auth module"]
```

### Course Weeks

| # | Phase 1 — Java Foundations (`weeks/summer/`) | # | Phase 2 — FRC Training (`weeks/offseason/`) |
|---|---|---|---|
| W1 | The Basics | O1 | Git & GitHub |
| W2 | Logic & Control Flow | O2 | WPILib Setup & Project Structure |
| W3 | Loops | O3 | Command-Based Architecture |
| W4 | Arrays & Methods | O4 | Motor Controllers & Sensors |
| W5 | Classes & Objects | O5 | PID Control |
| W6 | Inheritance & Polymorphism | O6 | Autonomous & Choreo |
| W7 | Advanced Classes (Enums, Interfaces) | O7 | Subsystem Capstone |
| W8 | Recap & Resources | O8 | Build Season Prep |

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Site generator | Jekyll (Ruby) |
| Styles | SCSS compiled by Jekyll |
| Auth & data | Firebase Auth + Firestore |
| Quiz engine | Vanilla JS (`wrc.js`) |
| Hosting | GitHub Pages |
| Fonts | JetBrains Mono + DM Sans |

---

## Features

- **Firebase auth** — student accounts with role-based access (student / admin)
- **Score sync** — quiz scores saved to Firestore, visible on teacher dashboard
- **Interactive quizzes** with per-question feedback and explanations
- **Weekly tests** — 8-question tests at the end of each summer week
- **Fill-in-the-blank exercises** for syntax practice
- **Coding challenges** with hidden solutions
- **Progress tracking** — mark pages complete, synced to cloud
- **Dark mode default** — built for programmers
- **Mobile responsive**
- **Teacher dashboard** — view all student scores and answer breakdowns

---

## Deploying to GitHub Pages

1. Push to `main`
2. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**
3. Site will be live at your custom domain (set via `CNAME`)

Jekyll is built automatically by GitHub Pages on every push.

---

## Contributing

Found a mistake or want to improve an explanation?

1. Branch off main: `git checkout -b fix/week3-typo`
2. Make your changes
3. Open a PR with a short description
4. Tag Sohan for review

Fixing course content is itself a Git exercise — that's intentional.

---

*"Ask and you shall receive." — Banks*
