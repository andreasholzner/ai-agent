// Climbing Log — Shared utilities

const STORAGE_KEY = 'climbing-log-ascents';

// Storage operations
function getAscents() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveAscent(ascent) {
  const ascents = getAscents();

  if (!ascent.id) {
    ascent.id = generateId();
    ascent.createdAt = new Date().toISOString();
  }

  const index = ascents.findIndex(a => a.id === ascent.id);
  if (index >= 0) {
    ascents[index] = ascent;
  } else {
    ascents.push(ascent);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(ascents));
  return ascent;
}

function deleteAscent(id) {
  const ascents = getAscents();
  const filtered = ascents.filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

function getAscent(id) {
  const ascents = getAscents();
  return ascents.find(a => a.id === id);
}

// Filtering and searching
function filterAscents(ascents, searchName = '', searchArea = '', styleFilter = '') {
  return ascents.filter(ascent => {
    const nameMatch = ascent.name.toLowerCase().includes(searchName.toLowerCase());
    const areaMatch = ascent.area.toLowerCase().includes(searchArea.toLowerCase());
    const styleMatch = !styleFilter || ascent.style === styleFilter;
    return nameMatch && areaMatch && styleMatch;
  });
}

// Sorting
function sortByDate(ascents) {
  return [...ascents].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA.getTime() !== dateB.getTime()) {
      return dateB.getTime() - dateA.getTime();
    }
    // Fallback to createdAt if dates are equal
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });
}

// Utilities
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// URL parameter helpers
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

function setQueryParam(param, value) {
  const params = new URLSearchParams(window.location.search);
  if (value) {
    params.set(param, value);
  } else {
    params.delete(param);
  }
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, '', newUrl);
}
