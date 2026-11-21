/* TechFest 2026 — vanilla JavaScript, shared across all three pages. */
'use strict';

const STORAGE_KEYS = {
  theme: 'techfest-theme',
  savedEvents: 'techfest-saved-events'
};

const EVENTS = [
  {
    id: 'TF01', title: 'CodeSprint 2026', type: 'competition', day: 1, time: '10:00',
    venue: 'Computing Lab 1', seats: 36,
    description: 'Race against the clock to solve algorithmic puzzles, think clearly and write efficient code.'
  },
  {
    id: 'TF02', title: 'UI/UX Design Dash', type: 'competition', day: 1, time: '11:00',
    venue: 'Design Studio', seats: 24,
    description: 'Turn a user problem into a thoughtful interface in this fast-paced design challenge.'
  },
  {
    id: 'TF03', title: 'Build with AI', type: 'workshop', day: 2, time: '09:30',
    venue: 'Innovation Lab', seats: 30,
    description: 'Explore practical AI tools and learn how to shape a small idea into a working prototype.'
  },
  {
    id: 'TF04', title: 'Cybersecurity 101', type: 'workshop', day: 1, time: '13:00',
    venue: 'Computing Lab 2', seats: 28,
    description: 'Understand common digital threats and practise the habits that make systems safer.'
  },
  {
    id: 'TF05', title: 'Robotics Arena', type: 'competition', day: 2, time: '11:30',
    venue: 'Innovation Hall', seats: 20,
    description: 'Watch ideas move off the screen as teams test their robots through a series of challenges.'
  },
  {
    id: 'TF06', title: 'The Future of Tech', type: 'talk', day: 2, time: '14:00',
    venue: 'Main Auditorium', seats: 120,
    description: 'Hear speakers discuss emerging technologies, responsible innovation and the skills ahead.'
  },
  {
    id: 'TF07', title: 'Web Dev Studio', type: 'workshop', day: 1, time: '15:00',
    venue: 'Computing Lab 1', seats: 32,
    description: 'Build a responsive web page with semantic HTML, modern CSS and plain JavaScript.'
  },
  {
    id: 'TF08', title: 'Tech Careers: Ask Me Anything', type: 'talk', day: 2, time: '15:30',
    venue: 'Main Auditorium', seats: 100,
    description: 'Get honest perspectives on portfolios, internships, teamwork and starting a tech career.'
  }
];

function readSavedEvents() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.savedEvents) || '[]');
    if (!Array.isArray(stored)) return [];
    return stored.filter((id) => EVENTS.some((event) => event.id === id));
  } catch (error) {
    return [];
  }
}

let savedEventIds = readSavedEvents();

function writeSavedEvents() {
  try {
    localStorage.setItem(STORAGE_KEYS.savedEvents, JSON.stringify(savedEventIds));
  } catch (error) {
    // The site remains usable if browser storage is unavailable.
  }
  updateSavedCounts();
}

function updateSavedCounts() {
  const count = String(savedEventIds.length);
  document.querySelectorAll('.saved-count, #saved-count-inline, #saved-count-heading').forEach((element) => {
    element.textContent = count;
  });
}

function getEventById(id) {
  return EVENTS.find((event) => event.id === id);
}

function formatDay(day) {
  return day === 1 ? 'Day 1 · 12 Dec' : 'Day 2 · 13 Dec';
}

function formatTime(time) {
  const [hourText, minute] = time.split(':');
  const hour = Number(hourText);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute} ${suffix}`;
}

/* Theme preference: a saved user choice takes priority over the OS preference. */
function initialiseTheme() {
  let storedTheme = null;
  try { storedTheme = localStorage.getItem(STORAGE_KEYS.theme); } catch (error) { /* Use the operating-system preference. */ }
  if (storedTheme === 'light' || storedTheme === 'dark') {
    document.documentElement.dataset.theme = storedTheme;
  }
  updateThemeButtons();
}

function isDarkTheme() {
  const explicitTheme = document.documentElement.dataset.theme;
  if (explicitTheme) return explicitTheme === 'dark';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function updateThemeButtons() {
  const dark = isDarkTheme();
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.textContent = dark ? 'Light mode' : 'Dark mode';
    button.setAttribute('aria-label', dark ? 'Switch to light colour theme' : 'Switch to dark colour theme');
    button.setAttribute('aria-pressed', String(dark));
  });
}

function initialiseThemeToggle() {
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const nextTheme = isDarkTheme() ? 'light' : 'dark';
      document.documentElement.dataset.theme = nextTheme;
      try { localStorage.setItem(STORAGE_KEYS.theme, nextTheme); } catch (error) { /* Ignore storage restrictions. */ }
      updateThemeButtons();
    });
  });
}

function initialiseMobileNavigation() {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if (!menuButton || !nav) return;
  menuButton.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.textContent = isOpen ? 'Close' : 'Menu';
  });
}

/* Home page countdown bonus. The timer stops at zero. */
function initialiseCountdown() {
  const countdown = document.getElementById('event-countdown');
  if (!countdown) return;
  const eventStart = new Date(countdown.dataset.eventStart).getTime();
  const fields = {
    days: document.getElementById('count-days'),
    hours: document.getElementById('count-hours'),
    minutes: document.getElementById('count-minutes'),
    seconds: document.getElementById('count-seconds')
  };
  let timerId;
  const update = () => {
    const remaining = Math.max(0, eventStart - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    fields.days.textContent = String(Math.floor(totalSeconds / 86400)).padStart(2, '0');
    fields.hours.textContent = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, '0');
    fields.minutes.textContent = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    fields.seconds.textContent = String(totalSeconds % 60).padStart(2, '0');
    if (remaining === 0) {
      countdown.setAttribute('aria-label', 'TechFest 2026 has started');
      if (timerId) window.clearInterval(timerId);
    }
  };
  update();
  if (eventStart > Date.now()) timerId = window.setInterval(update, 1000);
}

/* Events page: data-driven DOM rendering and combined filters. */
function createEventCard(event) {
  const article = document.createElement('article');
  article.className = 'event-card';
  article.dataset.eventId = event.id;

  const top = document.createElement('div');
  top.className = 'event-card-top';
  const badge = document.createElement('span');
  badge.className = `category-badge category-${event.type}`;
  badge.textContent = event.type;
  const eventId = document.createElement('span');
  eventId.className = 'event-id';
  eventId.textContent = event.id;
  top.append(badge, eventId);

  const heading = document.createElement('h3');
  heading.textContent = event.title;
  const description = document.createElement('p');
  description.className = 'event-description';
  description.textContent = event.description;

  const metadata = document.createElement('div');
  metadata.className = 'event-meta';
  const dayInfo = document.createElement('div');
  const dayLabel = document.createElement('span');
  dayLabel.textContent = 'Day';
  const dayValue = document.createElement('strong');
  dayValue.textContent = formatDay(event.day);
  dayInfo.append(dayLabel, dayValue);
  const timeInfo = document.createElement('div');
  const timeLabel = document.createElement('span');
  timeLabel.textContent = 'Time';
  const timeValue = document.createElement('strong');
  timeValue.textContent = formatTime(event.time);
  timeInfo.append(timeLabel, timeValue);
  const venueInfo = document.createElement('div');
  const venueLabel = document.createElement('span');
  venueLabel.textContent = 'Venue';
  const venueValue = document.createElement('strong');
  venueValue.textContent = event.venue;
  venueInfo.append(venueLabel, venueValue);
  metadata.append(dayInfo, timeInfo, venueInfo);

  const bottom = document.createElement('div');
  bottom.className = 'event-card-bottom';
  const seats = document.createElement('span');
  seats.className = 'seats-left';
  seats.textContent = `${event.seats} places listed`;
  const saveButton = document.createElement('button');
  saveButton.className = 'save-event-button';
  saveButton.type = 'button';
  saveButton.dataset.saveEvent = event.id;
  const isSaved = savedEventIds.includes(event.id);
  saveButton.setAttribute('aria-pressed', String(isSaved));
  saveButton.textContent = isSaved ? '★ Saved' : '☆ Add to my schedule';
  saveButton.addEventListener('click', () => toggleSavedEvent(event.id));
  bottom.append(seats, saveButton);

  article.append(top, heading, description, metadata, bottom);
  return article;
}

function renderEvents(eventsToRender) {
  const grid = document.getElementById('event-grid');
  const emptyState = document.getElementById('empty-state');
  const resultCount = document.getElementById('event-result-count');
  if (!grid || !emptyState || !resultCount) return;
  grid.replaceChildren();
  const sortedEvents = [...eventsToRender].sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));
  sortedEvents.forEach((event) => grid.append(createEventCard(event)));
  emptyState.hidden = sortedEvents.length !== 0;
  resultCount.textContent = `Showing ${sortedEvents.length} of ${EVENTS.length} events`;
}

function applyEventFilters() {
  const searchInput = document.getElementById('event-search');
  const typeSelect = document.getElementById('type-filter');
  const selectedDay = document.querySelector('input[name="day-filter"]:checked');
  if (!searchInput || !typeSelect || !selectedDay) return;
  const query = searchInput.value.trim().toLocaleLowerCase();
  const type = typeSelect.value;
  const day = selectedDay.value;
  const filteredEvents = EVENTS.filter((event) => {
    const matchesSearch = event.title.toLocaleLowerCase().includes(query);
    const matchesType = type === 'all' || event.type === type;
    const matchesDay = day === 'all' || String(event.day) === day;
    return matchesSearch && matchesType && matchesDay;
  });
  renderEvents(filteredEvents);
}

function toggleSavedEvent(id) {
  if (savedEventIds.includes(id)) {
    savedEventIds = savedEventIds.filter((savedId) => savedId !== id);
  } else {
    savedEventIds = [...savedEventIds, id];
  }
  writeSavedEvents();
  applyEventFilters();
  renderSavedEvents();
}

function renderSavedEvents() {
  const list = document.getElementById('saved-list');
  if (!list) return;
  list.replaceChildren();
  const savedEvents = savedEventIds
    .map(getEventById)
    .filter(Boolean)
    .sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));
  if (savedEvents.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'saved-empty';
    empty.textContent = 'You have not saved any events yet. Use “Add to my schedule” on an event card to build your line-up.';
    list.append(empty);
    return;
  }
  savedEvents.forEach((event) => {
    const row = document.createElement('div');
    row.className = 'saved-event-row';
    const details = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = event.title;
    const meta = document.createElement('span');
    meta.textContent = `${formatDay(event.day)} · ${formatTime(event.time)} · ${event.venue}`;
    details.append(title, meta);
    const remove = document.createElement('button');
    remove.className = 'remove-saved';
    remove.type = 'button';
    remove.textContent = 'Remove';
    remove.setAttribute('aria-label', `Remove ${event.title} from my schedule`);
    remove.addEventListener('click', () => toggleSavedEvent(event.id));
    row.append(details, remove);
    list.append(row);
  });
}

function initialiseEventsPage() {
  const grid = document.getElementById('event-grid');
  if (!grid) return;
  document.getElementById('event-search').addEventListener('input', applyEventFilters);
  document.getElementById('type-filter').addEventListener('change', applyEventFilters);
  document.querySelectorAll('input[name="day-filter"]').forEach((radio) => radio.addEventListener('change', applyEventFilters));
  document.getElementById('clear-saved').addEventListener('click', () => {
    savedEventIds = [];
    writeSavedEvents();
    applyEventFilters();
    renderSavedEvents();
  });
  updateSavedCounts();
  applyEventFilters();
  renderSavedEvents();
}

/* Registration page: add event options and validate every field accessibly. */
function populateEventOptions() {
  const select = document.getElementById('event-choice');
  if (!select) return;
  [...EVENTS].sort((a, b) => a.day - b.day || a.time.localeCompare(b.time)).forEach((event) => {
    const option = document.createElement('option');
    option.value = event.id;
    option.textContent = `${event.title} — ${formatDay(event.day)}, ${formatTime(event.time)}`;
    select.append(option);
  });
}

function setFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);
  if (error) error.textContent = message;
  if (field) {
    if (message) {
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', `${fieldId}-error`);
    } else {
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    }
  }
}

function validateRegistrationForm() {
  const form = document.getElementById('registration-form');
  const values = {
    fullName: document.getElementById('full-name').value.trim(),
    email: document.getElementById('university-email').value.trim(),
    registrationNumber: document.getElementById('registration-number').value.trim().toUpperCase(),
    eventId: document.getElementById('event-choice').value,
    teamSize: Number(document.getElementById('team-size').value),
    participation: form.querySelector('input[name="participation"]:checked')?.value || '',
    tshirtSize: document.getElementById('tshirt-size').value,
    terms: document.getElementById('terms').checked
  };
  let valid = true;
  const errors = {
    'full-name': values.fullName ? '' : 'Please enter your full name.',
    'university-email': /^[^\s@]+@[^\s@]+\.edu\.pk$/i.test(values.email) ? '' : 'Enter a valid university email ending in .edu.pk.',
    'registration-number': /^F2026\d{6}$/.test(values.registrationNumber) ? '' : 'Use the format F2026 followed by exactly 6 digits.',
    'event-choice': getEventById(values.eventId) ? '' : 'Please select an event.',
    'team-size': Number.isInteger(values.teamSize) && values.teamSize >= 1 && values.teamSize <= 4 ? '' : 'Team size must be a whole number from 1 to 4.',
    'tshirt-size': values.tshirtSize ? '' : 'Please choose a T-shirt size.',
    'terms': values.terms ? '' : 'You must agree to the participation terms.'
  };
  if (values.participation === 'individual' && values.teamSize !== 1) {
    errors['team-size'] = 'Individual participation requires a team size of 1.';
  }
  Object.entries(errors).forEach(([fieldId, message]) => {
    setFieldError(fieldId, message);
    if (message) valid = false;
  });
  const participationError = document.getElementById('participation-error');
  if (participationError) participationError.textContent = values.participation ? '' : 'Please select a participation type.';
  if (!values.participation) valid = false;
  return { valid, values };
}

function showRegistrationSummary(values) {
  const summary = document.getElementById('registration-summary');
  const details = document.getElementById('summary-details');
  const event = getEventById(values.eventId);
  details.replaceChildren();
  const summaryItems = [
    ['Participant', values.fullName],
    ['University email', values.email],
    ['Registration number', values.registrationNumber],
    ['Event', event ? event.title : ''],
    ['Participation', values.participation === 'individual' ? 'Individual' : 'Team'],
    ['Team size', String(values.teamSize)],
    ['T-shirt size', values.tshirtSize]
  ];
  summaryItems.forEach(([label, value]) => {
    const wrapper = document.createElement('div');
    const term = document.createElement('dt');
    term.textContent = label;
    const description = document.createElement('dd');
    description.textContent = value;
    wrapper.append(term, description);
    details.append(wrapper);
  });
  summary.hidden = false;
}

function initialiseRegistrationForm() {
  const form = document.getElementById('registration-form');
  if (!form) return;
  populateEventOptions();
  const participationRadios = form.querySelectorAll('input[name="participation"]');
  const teamSize = document.getElementById('team-size');
  participationRadios.forEach((radio) => radio.addEventListener('change', () => {
    if (radio.checked && radio.value === 'individual') {
      teamSize.value = '1';
    }
    setFieldError('team-size', '');
    document.getElementById('registration-summary').hidden = true;
  }));
  form.addEventListener('input', (event) => {
    const field = event.target;
    const id = field.id;
    if (id && document.getElementById(`${id}-error`)) setFieldError(id, '');
    document.getElementById('registration-summary').hidden = true;
  });
  form.addEventListener('change', () => {
    document.getElementById('registration-summary').hidden = true;
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const result = validateRegistrationForm();
    const status = document.getElementById('form-status');
    if (!result.valid) {
      status.textContent = 'Please review the highlighted fields and try again.';
      document.getElementById('registration-summary').hidden = true;
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    status.textContent = 'All fields passed validation.';
    showRegistrationSummary(result.values);
    document.getElementById('registration-summary').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initialiseTheme();
  initialiseThemeToggle();
  initialiseMobileNavigation();
  updateSavedCounts();
  initialiseCountdown();
  initialiseEventsPage();
  initialiseRegistrationForm();
});
