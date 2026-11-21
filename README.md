# TechFest 2026 — University Tech Fest Website

A responsive three-page event website built with semantic HTML5, hand-written CSS3 and vanilla JavaScript for CS-554 Advanced Web Technologies, Assignment 1 — Version B.

## Pages

- `index.html` — event hero, editable dates and venue, countdown, Why Attend section, sponsor strip, accessible schedule table, footer.
- `events.html` — eight JavaScript-rendered event cards, text search, combined type/day filters, chronological sorting, empty state, and saved personal schedule.
- `register.html` — participant registration form with per-field validation and a success summary.

## Visual identity — silver, purple and black

The shared visual system uses metallic silver surfaces, deep black sections and purple highlights. The homepage hero uses a chrome robotic hand image; the poster concept below removes the orbiting purple rings and keeps the angular metallic details.

![TechFest 2026 poster concept without purple orbit rings](assets/techfest-poster-no-rings.png)

![Chrome robotic hand hero artwork](assets/robot-hand-silver-purple.png)

The static design preview in `assets/homepage-visual-preview.svg` is retained as an earlier layout reference. After deploying, replace it with a real screenshot of the live homepage so the README meets the assignment screenshot requirement. Add the published GitHub Pages URL below.

**Live site:** Add your GitHub Pages URL after deployment.

## Run locally

No build tools, dependencies or frameworks are required. Open `index.html` in a browser, or use VS Code Live Server for a local preview. Keep the `css` and `js` folders beside the HTML files.

## Before submitting

The assignment scenario does not provide confirmed event logistics or sponsor details. This implementation uses **editable sample content**:

- Dates: 12–13 December 2026
- Venue: University Main Campus, Lahore
- Schedule locations, event capacities and sponsor wordmarks
- Contact email: `computingsociety@example.edu.pk`

Replace these with the Computing Society's approved information before publishing. Update the countdown date in `index.html` (`data-event-start`) if the event starts at a different date/time. The schedule in `index.html` should also be kept in sync with the programme on `events.html`.

The registration form is a front-end demonstration: it validates the values in the browser and displays a summary, but it does not send or store registration data on a server. Do not describe it as a live registration system unless a backend or approved form service is connected.

## Assignment features checklist

- [x] Three pages with unique titles and meta descriptions
- [x] Semantic `header`, `nav`, one `main`, `section`/`article`, and `footer`
- [x] One `h1` per page; labelled controls and grouped radio inputs
- [x] Home-page accessible schedule table with `caption`, `thead`, and `scope="col"`
- [x] Shared external stylesheet, `border-box` reset, mobile-first design
- [x] Flexbox navigation and sponsor strip; CSS Grid event cards (1 / 2 / 4 columns)
- [x] Scrollable schedule table container on small screens
- [x] CSS custom properties, OS-aware dark mode, manual persistent theme toggle
- [x] Visible `:focus-visible` styles and fluid `clamp()` headings
- [x] Eight events rendered from a JavaScript array using `createElement` and `textContent`
- [x] Combined title search, type select and day radio filters; chronological order and empty state
- [x] Saved event buttons and persistent navbar count using `localStorage`
- [x] Registration validation: `.edu.pk` email, `F2026` + six digits, team size 1–4, individual team-size rule
- [x] Per-field error messages and validated registration summary
- [x] Bonus: countdown timer stops at zero and respects reduced-motion preferences

## Suggested Git commits

Make at least six real, meaningful commits in your own public repository. For example:

1. `feat: add semantic home page and event hero`
2. `feat: build accessible event schedule table`
3. `feat: add responsive shared styles and dark theme`
4. `feat: render event cards from JavaScript data`
5. `feat: add combined event filters and saved schedule`
6. `feat: validate registration form and show summary`
7. `docs: add project setup and deployment guide`

Do not create fake commits or upload a pre-written history. Make each commit after implementing and testing the corresponding change.

## GitHub Pages deployment

1. Create a **public** GitHub repository and upload the contents of this folder (the HTML files should be at the repository root).
2. Commit and push your work.
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
5. Wait for GitHub Pages to publish and open the URL shown in the Pages settings.
6. Test all three pages, the dark-mode toggle, saved schedule and form at mobile and desktop widths.

## Validation and evidence

Before submission:

- Run `index.html`, `events.html` and `register.html` through the W3C Nu HTML Checker: <https://validator.w3.org/nu/>.
- Run Lighthouse in Chrome DevTools with the **mobile** device profile on the deployed Home page.
- Capture the required validator results for all three pages and the Lighthouse mobile report for `index.html`.
- Assemble the screenshots into a PDF of no more than two pages for the LMS.

Lighthouse scores and W3C validation results are not claimed here; obtain them from your deployed version after replacing sample content and testing.

## Project structure

```text
techfest-2026-website/
├── index.html
├── events.html
├── register.html
├── README.md
├── assets/
│   ├── homepage-visual-preview.svg
│   ├── robot-hand-silver-purple.png
│   └── techfest-poster-no-rings.png
├── css/
│   └── style.css
└── js/
    └── script.js
```


## Latest visual refinement

The shared theme now uses brushed silver, charcoal black, and a muted violet accent (no neon glow). Main content cards, event cards, filters, and the registration form use black surfaces with silver borders. The registration form has explicit light/dark theme styling so labels, inputs, selects, radio choices, validation messages, and the success summary remain legible in dark mode.
