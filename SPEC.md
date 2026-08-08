# Portfolio Build Spec — Likhitha Swamy (Network Engineer / AI)

This is the shared contract between 4 build agents. Every agent MUST follow the
exact file paths, element IDs, and class names listed here so the pieces integrate
without conflicts. Do not rename anything without updating this file.

## Files (each agent owns exactly one)
- `index.html` — Agent HTML
- `css/style.css` — Agent CSS
- `js/script.js` — Agent JS
- Integration/QA pass on all three — Agent QA (runs last)

index.html links: `<link rel="stylesheet" href="css/style.css">` and
`<script src="js/script.js" defer></script>`. Google Fonts via `<link>` tag
(e.g. "Space Grotesk" for headings + "Inter" for body) is allowed.

## Resume content (source of truth — use verbatim, do not invent facts)

**Name:** Likhitha Swamy
**Location:** Bengaluru, India
**Email:** likhithaswamyls@gmail.com
**Phone:** 7483565189
**LinkedIn:** link text "LinkedIn" (href="#" placeholder, user will fill real URL)
**Tagline ideas (pick/adapt one):** "Network Engineer | AI & Automation Enthusiast" or
"Network Engineer building resilient infrastructure, automated with Python."

### Professional Experience
1. **AT&T** — Network Engineer — Bangalore, India — Sep 2025 - Aug 2026
   - Troubleshoot and resolve Layer 2/Layer 3 incidents involving TCP/IP, BGP, DHCP, DNS, and multi-vendor environments
   - Maintain large-scale LAN/WAN availability and fulfill service requests while strictly meeting operational SLA/SLO targets
   - Manage and escalate infrastructure issues seamlessly using ServiceNow, performing root cause analysis (RCA) to prevent recurring incidents
   - Collaborate directly with external vendors and internal engineering teams for rapid issue mitigation and escalation tracking
   - Utilize Linux and Python scripting to automate routine network monitoring and troubleshooting tasks, improving operational delivery speeds
   - Developed standalone Python scripts to automate routine network health checks and parse device running logs
   - Automated IP reachability testing across lab nodes, decreasing manual testing hours and generating automated connectivity status reports
   - Integrated automated scripts with Git version control to manage network configuration changes and maintain compliance baselines

2. **L&T Technology Services** — AI Intern — Bengaluru, India — October 2023 – December 2023
   - Assisted with artificial intelligence projects, data analysis and data collection
   - OpenCV and Deep Learning for Parking slot detection; worked on the model to increase accuracy and precision

### Technical Skills (group into categories, render as chips/tags)
- Networking & Protocols: TCP/IP, BGP, OSPF, DHCP, DNS, IPv4/IPv6, Routing & Switching, LAN/WAN, VLANs
- Network Technologies: Cisco, Juniper, Palo Alto Networks, ISP Infrastructure
- Security: Network Security Fundamentals, ACLs, Firewall Concepts, NAT/PAT
- Tools & Platforms: ServiceNow, Linux, Git, GitHub, Cisco Packet Tracer
- Operations: Network Monitoring, Incident Management, Root Cause Analysis, SLA/SLO Compliance
- Languages & Databases: Python, SQL
- AI & Data Science: Machine Learning, Deep Learning, OpenCV, Data Visualization, Edge AI
- Additional: Adaptability & Learning, Analytical & Troubleshooting, Communication

### Projects
1. **Enterprise Routing & Switching Topology Design** — Cisco Packet Tracer, Cisco IOS, Routing & Switching
   - Designed and simulated a scalable corporate network topology featuring multi-layered switches and redundant core routers
   - Configured internal routing protocols (OSPF) alongside edge configurations (BGP) to establish resilient, path-optimized traffic routes

2. **Network Configuration Compliance & Backup Automation** — Python, Linux, Git, GitHub
   - Developed standalone Python scripts to automate routine network health checks and parse device running logs
   - Automated IP reachability testing across lab nodes, decreasing manual testing hours, generating automated connectivity status reports
   - Integrated automated scripts with Git version control to manage network configuration changes and maintain compliance baselines

3. **AI-Based Parking Slot Detection** — OpenCV, Deep Learning
   - Assisted with AI projects, data analysis and data collection at L&T Technology Services
   - Worked on model to increase accuracy and precision using OpenCV and Deep Learning

### Education
- Bachelor of Engineering (Electronics & Communication) — Atria Institute of Technology, Bengaluru — CGPA: 8/10
- Pre-University Education — BGS PU College, Sringeri — Percentage: 83.2%

### Certifications & Patents
- CCNA (Cisco Certified Network Associate)
- Patent Published: AI-Controlled Touchless Water Dispenser (App No: 202441077657 A)

### Leadership
- Secretary, IEEE Atria SBC (2024 - 2025)
- MDC, IEEE Atria SPS (2024)

## Page sections & required IDs (Agent HTML must use these exact ids/classes)
- `<header id="navbar">` with class `.navbar`, nav links using `.nav-link` and `data-target` matching section ids, plus a `.nav-toggle` hamburger button for mobile
- `<section id="hero">` — name, tagline, CTA buttons `.btn.btn-primary` (e.g. "View Projects" -> #projects) and `.btn.btn-outline` (e.g. "Contact Me" -> #contact). Include an element `<span class="typed-text">` + `<span class="cursor">` for a JS typing effect that cycles through role strings (data attribute `data-roles='["Network Engineer","AI Enthusiast","Automation Builder"]'`). Include a `<canvas id="bg-canvas">` full-bleed behind hero/whole page for a subtle animated particle/network-line background (fixed position, low opacity, behind content, z-index -1).
- `<section id="about">` — short 2-3 sentence bio synthesized from resume (network engineer + AI intern background), `.section-title` heading pattern used on every section (small eyebrow label + big title), reused across all sections
- `<section id="experience">` — timeline using `.timeline`, `.timeline-item`, `.timeline-dot`, `.timeline-content` (class names to be styled by CSS agent and animated by JS agent via scroll-reveal class `.reveal`)
- `<section id="skills">` — skill categories as `.skill-category` cards, each containing `.skill-tag` chips
- `<section id="projects">` — `.projects-grid` of `.project-card` (title, description bullets, `.tech-stack` tag list)
- `<section id="education">` — `.education-grid` or timeline reuse
- `<section id="certifications">` — `.cert-grid` of `.cert-card`
- `<section id="contact">` — email/phone/linkedin as `.contact-link` items, plus a simple mailto contact CTA button
- `<footer>` with small credit line and back-to-top link `#hero`

Every top-level `<section>` wrapper should have class `.section` and every direct
content block intended to animate-in on scroll should have class `.reveal`
(JS will toggle `.reveal.active` via IntersectionObserver — CSS defines the
before/after transition state for `.reveal` / `.reveal.active`).

## Design direction (Agent CSS)
- Dark theme: near-black background (e.g. `#0a0e14` / `#0d1117` range), off-white text
  (`#e6edf3`), one accent color evoking network/tech — electric blue or cyan
  (e.g. `#4fd1ff` / `#00d9ff`) plus a secondary accent (violet or teal) for gradients.
- CSS custom properties in `:root` for all colors/spacing/fonts so it's easy to tweak.
- Best-practice "senior software engineer portfolio" look: generous whitespace,
  large confident hero typography, subtle glassmorphism cards
  (`background: rgba(...); backdrop-filter: blur(...)`), soft glowing borders/shadows
  on hover, gradient text on the name/hero heading, monospace accents for
  labels/eyebrows (like `> const role = "Network Engineer"`).
- Slow, subtle animations ONLY: gentle fade+slide-up on scroll reveal (~0.6-0.8s
  ease-out), slow floating/pulsing glow blobs in the background (12-20s loop),
  smooth hover transitions (0.3s), NO fast/flashy/strobing effects.
- Fully responsive: mobile nav collapses to hamburger + slide-in menu, grids
  collapse to single column under ~700px.
- Include a subtle custom scrollbar style and a `prefers-reduced-motion` media
  query that disables/shortens animations for accessibility.

## Animations (Agent JS)
- IntersectionObserver toggling `.active` on `.reveal` elements as they enter viewport.
- Typing effect in hero cycling through `data-roles` array (type, pause, delete, next).
- Mobile nav toggle open/close + close on link click + smooth scroll to section anchors.
- Active nav-link highlight based on scroll position (swap `.active` class on `.nav-link`).
- Canvas background: lightweight animated network of moving dots with faint connecting
  lines (classic "network nodes" canvas effect, fits the networking theme), slow speed,
  low particle count (~40-60), pause when tab not visible (use
  `document.hidden`/`visibilitychange`) for performance.
- Navbar shrink/add `.scrolled` class after scrolling past hero.
- No external JS libraries — vanilla JS only.

## Non-goals
- No build tooling, no frameworks, no npm — plain HTML/CSS/JS only, opened directly
  in a browser via `index.html`.
- No fabricated resume content — only use facts listed above.
