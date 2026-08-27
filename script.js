import { callGemini } from './gemini-api.js';

let jobs = [];
const selectedFilters = new Set();
const get = (id) => document.getElementById(id);

document.addEventListener('DOMContentLoaded', initialize);

async function initialize() {
  setupTabs();
  setupCoach();
  get('searchInput').addEventListener('input', renderJobs);
  get('filterToolbar').addEventListener('click', handleFilterClick);
  get('jobGrid').addEventListener('click', handleFilterClick);
  get('jobGrid').addEventListener('click', handleSalaryClick);

  try {
    const response = await fetch('./data.json');
    if (!response.ok) throw new Error('Failed to load data');
    jobs = await response.json();
    renderFilters();
    renderJobs();
  } catch (error) {
    get('jobGrid').innerHTML = '<p class="empty-results">Unable to load job listings.</p>';
    console.error(error);
  }
}

function setupTabs() {
  document.querySelectorAll('[data-view]').forEach((tab) => tab.addEventListener('click', () => {
    const jobsVisible = tab.dataset.view === 'jobs';
    get('jobsView').hidden = !jobsVisible;
    get('coachView').hidden = jobsVisible;
    document.querySelectorAll('[data-view]').forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', active);
    });
  }));
}

function renderFilters() {
  const available = new Set();
  jobs.forEach((job) => getJobTags(job).forEach((tag) => available.add(tag)));
  get('filterToolbar').innerHTML = [...available].sort().slice(0, 18).map(createFilterButton).join('');
}

function handleFilterClick(event) {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  const filter = button.dataset.filter;
  selectedFilters.has(filter) ? selectedFilters.delete(filter) : selectedFilters.add(filter);
  renderFilters();
  renderJobs();
}

function createFilterButton(tag) {
  return `<button type="button" class="filter-chip ${selectedFilters.has(tag) ? 'active' : ''}" data-filter="${tag}" aria-pressed="${selectedFilters.has(tag)}">${tag}</button>`;
}

function renderJobs() {
  const query = get('searchInput').value.trim().toLowerCase();
  const visibleJobs = jobs.filter((job) => {
    const tags = getJobTags(job);
    const searchableText = [job.company, job.position, job.location, ...tags].join(' ').toLowerCase();
    return (!query || searchableText.includes(query)) && [...selectedFilters].every((filter) => tags.includes(filter));
  });
  get('resultsCount').textContent = `${visibleJobs.length} ${visibleJobs.length === 1 ? 'role' : 'roles'} available`;
  get('jobGrid').innerHTML = visibleJobs.length ? visibleJobs.map(createJobCard).join('') : '<p class="empty-results">No roles match those filters.</p>';
}

function getJobTags(job) {
  return [job.role, job.level, ...(job.languages || []), ...(job.tools || [])];
}

function createJobCard(job) {
  const badges = [job.new ? '<span class="badge new">New!</span>' : '', job.featured ? '<span class="badge featured">Featured</span>' : ''].join('');
  return `<article class="job-card-container"><div class="job-card"><div class="job-header"><div><h2 class="job-position">${job.position}</h2><p class="job-company">${job.company}</p><p class="job-meta">${job.postedAt} • ${job.contract} • ${job.location}</p></div><div>${badges}</div></div><div class="job-tags">${getJobTags(job).map(createFilterButton).join('')}</div><div class="job-actions"><button type="button" class="salary-button" data-salary="${job.id}" aria-expanded="false">View Salary</button><p class="salary-result" data-salary-result="${job.id}" hidden>${getSalaryEstimate(job)} <small>Estimated annual range</small></p></div></div></article>`;
}

function getSalaryEstimate(job) {
  if (job.location.toLowerCase().includes('nigeria')) {
    const nairaRanges = { Junior: '₦3.5m - ₦6m', Midweight: '₦6m - ₦10m', Senior: '₦10m - ₦18m' };
    return nairaRanges[job.level] || '₦5m - ₦12m';
  }
  const ranges = { Junior: '$55k - $75k', Midweight: '$75k - $105k', Senior: '$105k - $145k' };
  return ranges[job.level] || '$70k - $120k';
}

function handleSalaryClick(event) {
  const button = event.target.closest('[data-salary]');
  if (!button) return;
  const result = document.querySelector(`[data-salary-result="${button.dataset.salary}"]`);
  const open = result.hidden;
  result.hidden = !open;
  button.setAttribute('aria-expanded', open);
  button.textContent = open ? 'Hide Salary' : 'View Salary';
}

function setupCoach() {
  get('cvFile').addEventListener('change', handleFileUpload);
  get('cvInput').addEventListener('input', () => { get('analyzeButton').disabled = !get('cvInput').value.trim(); });
  get('analyzeButton').addEventListener('click', analyzeCv);
  get('careerButton').addEventListener('click', askCareerAssistant);
}

async function askCareerAssistant() {
  const role = get('careerRole').value.trim();
  const question = get('careerQuestion').value.trim();
  const button = get('careerButton');
  const error = get('careerError');
  const result = get('careerResult');
  if (!role || !question) {
    error.textContent = 'Please enter a target role and your question.';
    error.hidden = false;
    return;
  }
  button.disabled = true;
  button.textContent = 'Thinking...';
  error.hidden = true;
  result.hidden = true;
  const topic = get('careerTopic').value;
  const prompt = `You are a practical career advisor for professionals in Nigeria and globally. The user's target role is ${role}. They need help with ${topic}. Answer this question clearly and actionably: ${question}. Give specific next steps, useful skills, and realistic advice. Keep the response concise and format it with short headings.`;
  try {
    result.textContent = await callGemini(prompt);
    result.hidden = false;
  } catch (assistantError) {
    error.textContent = assistantError.message || 'Unable to reach the career assistant right now.';
    error.hidden = false;
  } finally {
    button.disabled = false;
    button.textContent = 'Ask Career Assistant';
  }
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  get('fileName').textContent = file.name;
  get('fileMessage').hidden = true;

  if (!file.type.includes('text') && !file.name.toLowerCase().endsWith('.txt')) {
    get('fileMessage').textContent = 'File selected. Please paste its text below so it can be analyzed.';
    get('fileMessage').hidden = false;
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    get('cvInput').value = reader.result;
    get('analyzeButton').disabled = !get('cvInput').value.trim();
  });
  reader.readAsText(file);
}

async function analyzeCv() {
  const button = get('analyzeButton');
  const error = get('coachError');
  const result = get('coachResult');
  button.disabled = true;
  button.textContent = 'Analyzing...';
  error.hidden = true;
  result.hidden = true;
  try {
    const prompt = `Analyze this CV:\n\n${get('cvInput').value}\n\nReturn a response with 3 sections:\n1. Skill Gap Report: What skills is this person missing for Senior Frontend roles\n2. Top 3 Skills To Learn: List 3 specific skills they should learn this month\n3. Readiness Score: X% ready for Senior Frontend role\n\nFormat it nicely with headers.`;
    result.textContent = await callGemini(prompt);
    result.hidden = false;
  } catch (analysisError) {
    error.textContent = analysisError.message || 'Unable to analyze your CV right now.';
    error.hidden = false;
  } finally {
    button.disabled = !get('cvInput').value.trim();
    button.textContent = 'Analyze My CV';
  }
}
