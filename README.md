# Interactive Whisky Flavor Map

An interactive visualization of 200+ American whiskeys mapped by oakiness and fruit intensity.

## Features

- 🗺️ Visual flavor map with 200+ bottles
- 🔍 AI-powered search for any whisky
- 🎯 Filter by distillery and category
- 📊 Hover tooltips with proof and details
- 📱 Mobile responsive

## Live Demo

https://dmvwhisky.com/whisky-flavor-map-2/

## How It Works

Whiskeys are plotted on two axes:
- **X-axis (Horizontal):** Oakiness (0-10) - vanilla, wood, char, leather
- **Y-axis (Vertical):** Fruit Intensity (0-10) - cherry, apple, citrus, berry

Search for any whisky and AI analyzes reviews to calculate its position and find similar bottles.

## Tech Stack

- React (via CDN)
- Tailwind CSS
- Netlify Functions
- Anthropic Claude API

## Setup

1. Clone this repository
2. Deploy to Netlify
3. Add `ANTHROPIC_API_KEY` environment variable in Netlify
4. Done!

## Data Sources

Flavor profiles based on reviews from:
- Bourbon Culture (thebourbonculture.com)
- Breaking Bourbon (breakingbourbon.com)

## License

MIT License - Feel free to use and modify!

## Author

Created by Bruce Esposito for DMV Whisky

---

**Note:** You'll need your own Anthropic API key to enable the search feature.
```

---
