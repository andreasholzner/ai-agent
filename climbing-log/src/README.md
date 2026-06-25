# Source folder

This folder contains all source code for the Climbing Log app.

## Files

- **log-climb.html** — Form page for logging and editing climbing ascents
- **ascents.html** — Overview page for viewing, searching, filtering, and managing ascents
- **app.js** — Shared JavaScript utilities for storage, filtering, and sorting
- **colors.css** — Design tokens defining the dark theme with blue accents

## Getting Started

### Start the HTTP Server

The app is a static HTML/CSS/JS application that uses browser localStorage for data persistence. You'll need to serve it over HTTP.

**Using Python 3:**
```bash
cd climbing-log/src
python3 -m http.server 8000
```

**Using Node.js (with http-server):**
```bash
cd climbing-log/src
npx http-server -p 8000
```

### Access the App

Once the server is running, open your browser and navigate to:

- **Log a Climb (Form)**: http://localhost:8000/log-climb.html
- **All Ascents (Overview)**: http://localhost:8000/ascents.html

## Features

- **Create ascents** — Log new climbing routes with name, area, grade, style, and optional notes
- **Edit ascents** — Modify existing ascents from the overview page
- **Delete ascents** — Remove ascents with confirmation
- **Search** — Find ascents by route name or climbing area (case-insensitive)
- **Filter** — Filter ascents by climbing style (sport, trad, top-rope, indoor)
- **Sort** — Automatically sorted by date (newest first)
- **Persistence** — All data is stored in browser localStorage

## Data

All ascent data is stored in your browser's localStorage under the key `climbing-log-ascents`. The data persists between browser sessions but is specific to each browser/device.

To clear all data, open your browser's Developer Console and run:
```javascript
localStorage.removeItem('climbing-log-ascents')
```

## Browser Compatibility

Works on modern browsers (Chrome, Firefox, Safari, Edge) that support:
- HTML5 date input
- localStorage API
- ES6 JavaScript
