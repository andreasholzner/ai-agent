# Climbing Log — Prototype Specification

## Overview
This document clarifies all implementation choices and technical decisions for the first prototype of the Climbing Log app.

## Technology Stack
- **Frontend**: Plain HTML5, CSS3, vanilla JavaScript (ES6+)
- **Data Persistence**: Browser localStorage
- **Authentication**: None (single-user, no accounts)
- **Font**: Roboto (primary), Open Sans (fallback), sans-serif
- **Color System**: CSS custom properties from `colors.css`

## Data Model

### Ascent Object
```javascript
{
  id: string (UUID),
  name: string (required, route name),
  area: string (required, climbing area),
  grade: string (no validation, any format),
  style: string (enum: 'sport', 'trad', 'top-rope', 'indoor'),
  date: string (ISO 8601 format: YYYY-MM-DD),
  notes: string (optional),
  createdAt: string (ISO 8601 timestamp for sorting fallback)
}
```

### localStorage Key
- Key: `climbing-log-ascents`
- Value: JSON stringified array of Ascent objects

## File Structure
```
climbing-log/
├── specs/
│   ├── climbing-log.md       (original spec)
│   └── prototype.md          (this file)
└── src/
    ├── colors.css            (design tokens)
    ├── log-climb.html        (form page — modified from baseline)
    ├── ascents.html          (overview page — new)
    └── app.js                (shared JavaScript utilities — new)
```

## Pages

### 1. Form Page (`log-climb.html`)
**Purpose**: Create and edit ascents

**Features**:
- Route name input (required)
- Area input (required)
- Grade input (optional, accepts any string)
- Date picker (required, type="date")
- Climbing style selector (radio chips): sport, trad, top-rope, indoor
- Notes textarea (optional)
- Clear and Save buttons

**Behavior**:
- Save creates new ascent with generated ID
- If URL has `?edit=<id>`, pre-fill form with that ascent's data
- Save updates existing ascent if in edit mode
- Clear button resets form (or cancels edit)
- Submit validates required fields (name, area, date)
- Success: redirect to ascents.html
- Navigation link to "All Ascents" page

### 2. Overview Page (`ascents.html`)
**Purpose**: View, search, filter, edit, and delete ascents

**Features**:
- **Search**:
  - Text input for route name (real-time filter, case-insensitive contains match)
  - Text input for area (real-time filter, case-insensitive contains match)
- **Filter**:
  - Dropdown select by climbing style (includes "All Styles" option)
- **Sort**:
  - Default: newest date first
  - If dates are identical, fall back to createdAt
- **Display Format**:
  - List of ascents (rows or cards, details below)
  - Each ascent shows: name, area, date, grade, style
  - Edit button → navigate to log-climb.html?edit=<id>
  - Delete button → confirm dialog → remove and refresh
- **Pagination**:
  - Optional (implement only if prototype feels cramped)
  - If implemented: show 10-20 ascents per page
- **Empty State**:
  - Message when no ascents match filters
- **Navigation**:
  - Link to "Log a Climb" page

## UI & Styling

### Responsive Design
- Mobile-first approach
- Breakpoint: max-width 420px (single column layout where applicable)
- Use relative units (rem, clamp) for scalability

### Typography
- Font family: `'Roboto', 'Open Sans', system-ui, sans-serif`
- Sizes inherit from baseline (log-climb.html uses ~15px base)
- Weights: 400 (regular), 500 (medium), 600 (bold)

### Colors
- Use CSS custom properties from `colors.css`
- Dark theme: dark background (#0f1117), blue accents
- Minimal graphical elements (straight lines, clean borders)

### Form Styling
- Reuse card, field, input, button styles from log-climb.html
- Climbing style options: radio chips (as baseline)
- Validation: show required field hints, no inline error messages for prototype

## JavaScript (`app.js`)

### Functions to Implement
```javascript
// Storage
getAscents()           // return all ascents from localStorage
saveAscent(ascent)     // add or update ascent, generate ID if new
deleteAscent(id)       // remove ascent by ID
getAscent(id)          // fetch single ascent

// Search/Filter
filterAscents(ascents, searchName, searchArea, styleFilter)
  // return filtered array

// Utilities
generateId()           // create unique ID (timestamp + random)
sortByDate(ascents)    // sort descending (newest first)
```

### Form Behavior (log-climb.html)
- On page load: check URL params for `?edit=<id>`
  - If present, fetch ascent and populate form
  - Change button text from "Save Ascent" to "Update Ascent"
- On submit:
  - Validate required fields
  - Create/update ascent object
  - Save to localStorage
  - Redirect to ascents.html
- On reset: clear all fields (or cancel edit)

### Overview Behavior (ascents.html)
- On page load: fetch and display all ascents
- On search/filter input: debounce (100ms) and re-render list
- On edit click: navigate to log-climb.html?edit=<id>
- On delete click: confirm ("Delete this ascent?") then delete and re-render
- On "Log a Climb" link: navigate to log-climb.html (without edit params)

## Validation

### Required Fields
- Route name: must be non-empty string
- Area: must be non-empty string
- Date: must be valid date (HTML5 date input handles this)

### Optional Fields
- Grade: any string (no format validation)
- Notes: any text

### No validation for:
- Grade format (accepts "5.10a", "7a+", "V5", custom, etc.)
- Date range (past/future allowed)
- Duplicate names/areas (allowed)

## Performance & Limitations
- Target: <100 ascents per year
- localStorage limit: typically 5-10 MB (sufficient for this scale)
- No pagination required for <100 ascents, but can be added if desired
- No debouncing required for search (data set too small), but safe to add

## Browser Compatibility
- HTML5 features used: date input, localStorage, ES6 JavaScript
- Assume modern browsers (Chrome, Firefox, Safari, Edge recent versions)
- No polyfills or special fallbacks needed

## Accessibility
- No specific WCAG compliance required for prototype
- Basic semantic HTML (headings, form labels, buttons)
- Focus states on inputs (inherited from baseline styles)

## Future Considerations (Out of Scope)
- Multi-user synchronization
- Export/import (CSV, JSON)
- Sync across devices
- Advanced filtering (grade ranges, date ranges)
- Statistics/analytics
- Photos/media
- Offline-first PWA
- Backend API integration

## Testing Checklist (Manual)
- [ ] Create a new ascent and verify it appears in ascents list
- [ ] Edit an ascent and verify changes are saved
- [ ] Delete an ascent with confirmation
- [ ] Search by name filters results
- [ ] Search by area filters results
- [ ] Style filter works correctly
- [ ] Combined search + filter works
- [ ] Date sort is correct (newest first)
- [ ] Page navigation works (between form and overview)
- [ ] Form validation shows required field errors
- [ ] Responsive layout works on mobile (420px width)
- [ ] localStorage persists after page reload
- [ ] Clearing form works as expected
