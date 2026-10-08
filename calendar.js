const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuToggle.textContent = open ? '×' : '☰';
  });
  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  }));
  document.addEventListener('click', event => {
    if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    }
  });
}

const year = document.getElementById('currentYear');
if (year) year.textContent = new Date().getFullYear();

// Illustrative sample activities only. Replace with dates confirmed by the school.
const events = [
  {date:'2026-01-12', title:'Suggested term opening', category:'academic', detail:'Example only: confirm the official opening date with the school office.'},
  {date:'2026-02-06', title:'Family consultation day', category:'family', detail:'Example only: a suggested time for families to discuss learner progress with teachers.'},
  {date:'2026-03-13', title:'Learning progress review', category:'academic', detail:'Example only: use this date as a placeholder for an academic progress review.'},
  {date:'2026-04-10', title:'Community and culture day', category:'community', detail:'Example only: a placeholder for a school community or cultural activity.'},
  {date:'2026-05-08', title:'Assessment preparation reminder', category:'reminder', detail:'Example only: remind learners to review classwork and prepare for assessments.'},
  {date:'2026-06-12', title:'Family consultation day', category:'family', detail:'Example only: confirm meeting times and arrangements with the school.'},
  {date:'2026-07-17', title:'Learning progress review', category:'academic', detail:'Example only: placeholder for a mid-year learning review.'},
  {date:'2026-08-14', title:'Educational trip planning', category:'community', detail:'Example only: trip dates, costs, permissions, and arrangements must be confirmed by the school.'},
  {date:'2026-09-11', title:'Family consultation day', category:'family', detail:'Example only: placeholder for a parent or guardian meeting.'},
  {date:'2026-10-09', title:'School activity planning reminder', category:'reminder', detail:'Example only: check official school notices for upcoming activities.'},
  {date:'2026-11-13', title:'Year-end learning review', category:'academic', detail:'Example only: placeholder for reviewing learner progress before year end.'},
  {date:'2026-12-04', title:'Year-end celebration planning', category:'community', detail:'Example only: confirm the date and details with the school office.'}
];

const daysContainer = document.getElementById('calendarDays');
const monthTitle = document.getElementById('monthTitle');
const categoryFilter = document.getElementById('categoryFilter');
const eventList = document.getElementById('eventList');
const selectedEvent = document.getElementById('selectedEvent');
const eventsTitle = document.getElementById('eventsTitle');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');

let visibleMonth = new Date(2026, 0, 1);
let selectedDate = null;

const categoryNames = {
  academic: 'Academic',
  community: 'Community',
  family: 'Family meeting',
  reminder: 'Reminder'
};
const monthFormatter = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' });
const shortMonthFormatter = new Intl.DateTimeFormat('en', { month: 'short' });

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function eventsForDate(key) {
  const category = categoryFilter.value;
  return events.filter(item => item.date === key && (category === 'all' || item.category === category));
}
function eventsForMonth() {
  const prefix = `${visibleMonth.getFullYear()}-${String(visibleMonth.getMonth() + 1).padStart(2, '0')}-`;
  const category = categoryFilter.value;
  return events.filter(item => item.date.startsWith(prefix) && (category === 'all' || item.category === category));
}
function showSelected(item) {
  if (!item) {
    selectedEvent.innerHTML = '<span class="selected-icon">✦</span><div><strong>Select a date</strong><p>Activity details will appear here.</p></div>';
    return;
  }
  const date = new Date(`${item.date}T12:00:00`);
  selectedEvent.innerHTML = `<span class="selected-icon">✦</span><div><strong>${item.title}</strong><p>${date.toLocaleDateString('en', {weekday:'long', day:'numeric', month:'long', year:'numeric'})} · ${categoryNames[item.category]}</p><p>${item.detail}</p></div>`;
}
function renderEventList() {
  const items = eventsForMonth();
  eventsTitle.textContent = `Activities in ${monthFormatter.format(visibleMonth)}`;
  eventList.innerHTML = '';
  if (!items.length) {
    eventList.innerHTML = '<div class="empty-events">No sample activities in this month for the selected category. Choose another month or filter.</div>';
    return;
  }
  items.forEach(item => {
    const date = new Date(`${item.date}T12:00:00`);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `event-item${selectedDate === item.date ? ' selected' : ''}`;
    button.innerHTML = `<span class="event-date"><strong>${date.getDate()}</strong>${shortMonthFormatter.format(date)}</span><span class="event-copy"><strong>${item.title}</strong><small>${categoryNames[item.category]}</small></span>`;
    button.addEventListener('click', () => {
      selectedDate = item.date;
      renderCalendar();
      showSelected(item);
    });
    eventList.appendChild(button);
  });
}
function renderCalendar() {
  monthTitle.textContent = monthFormatter.format(visibleMonth);
  daysContainer.innerHTML = '';
  const firstDay = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
  const startOffset = (firstDay.getDay() + 6) % 7; // Monday-first calendar
  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - startOffset);
  const todayKey = dateKey(new Date());

  for (let i = 0; i < 42; i++) {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    const key = dateKey(date);
    const dayEvents = eventsForDate(key);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'day-cell';
    if (date.getMonth() !== visibleMonth.getMonth()) button.classList.add('outside');
    if (key === todayKey) button.classList.add('today');
    button.setAttribute('aria-label', `${date.toLocaleDateString('en', {weekday:'long', day:'numeric', month:'long', year:'numeric'})}${dayEvents.length ? ', has activity' : ''}`);
    button.innerHTML = `<span class="day-number">${date.getDate()}</span>${dayEvents.slice(0, 1).map(item => `<span class="event-dot ${item.category}">${item.title}</span>`).join('')}`;
    button.addEventListener('click', () => {
      selectedDate = key;
      const item = dayEvents[0];
      renderCalendar();
      renderEventList();
      showSelected(item || null);
      if (!item) {
        selectedEvent.innerHTML = `<span class="selected-icon">✦</span><div><strong>No listed activity</strong><p>${date.toLocaleDateString('en', {weekday:'long', day:'numeric', month:'long', year:'numeric'})}. Check with the school for official updates.</p></div>`;
      }
    });
    daysContainer.appendChild(button);
  }
  renderEventList();
}
prevMonth.addEventListener('click', () => {
  visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1);
  selectedDate = null; renderCalendar(); showSelected(null);
});
nextMonth.addEventListener('click', () => {
  visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1);
  selectedDate = null; renderCalendar(); showSelected(null);
});
categoryFilter.addEventListener('change', () => {
  selectedDate = null; renderCalendar(); showSelected(null);
});
renderCalendar();
