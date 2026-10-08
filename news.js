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

const storyContent = {
  culture: {
    title: 'Celebrating talent, culture, and togetherness',
    body: 'School activities can give learners a chance to express themselves, discover new interests, and appreciate the experiences of their classmates. Use this space for a school-approved report with the real event date, highlights, and photographs.'
  },
  learning: {
    title: 'Building skills for a changing world',
    body: 'Learning combines classroom practice with curiosity, creativity, and opportunities to explore new ideas. Replace this sample with a confirmed school update about a lesson, project, achievement, or learning initiative.'
  },
  families: {
    title: 'Working together with families',
    body: 'A strong relationship between families and school staff helps keep learners supported. Add approved details here about a real parent meeting, family partnership activity, or school announcement.'
  },
  progress: {
    title: 'Small steps, steady progress',
    body: 'Regular practice, asking questions, and reflecting on feedback can help learners grow over time. Replace this sample story with a verified learning highlight from the school community.'
  },
  trips: {
    title: 'Learning beyond the classroom',
    body: 'Educational visits can help learners connect classroom topics with the world around them. Publish trip details only after the school confirms the activity, date, arrangements, and any required permissions.'
  }
};

const modal = document.getElementById('storyModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');
let previousFocus = null;

document.querySelectorAll('.read-story').forEach(button => {
  button.addEventListener('click', () => {
    const story = storyContent[button.dataset.story];
    if (!story || !modal) return;
    previousFocus = button;
    modalTitle.textContent = story.title;
    modalBody.textContent = story.body;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close').focus();
  });
});
function closeModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = '';
  if (previousFocus) previousFocus.focus();
}
closeModalButtons.forEach(button => button.addEventListener('click', closeModal));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal && !modal.hidden) closeModal();
});

const filterButtons = document.querySelectorAll('.filter-tab');
const searchInput = document.getElementById('newsSearch');
const cards = document.querySelectorAll('#latest-news .news-card');
const noResults = document.getElementById('noResults');
const resultsCount = document.getElementById('resultsCount');
let activeFilter = 'all';

function filterNews() {
  const query = (searchInput.value || '').trim().toLowerCase();
  let visibleCount = 0;
  cards.forEach(card => {
    const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
    const text = `${card.dataset.search || ''} ${card.textContent || ''}`.toLowerCase();
    const searchMatch = !query || text.includes(query);
    const visible = categoryMatch && searchMatch;
    card.hidden = !visible;
    if (visible) visibleCount++;
  });
  noResults.hidden = visibleCount !== 0;
  resultsCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'story' : 'stories'}`;
}
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    filterNews();
  });
});
searchInput.addEventListener('input', filterNews);
filterNews();
