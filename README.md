# Red Canyon Roasting Company

Static marketing website for Red Canyon Roasting Company — a specialty coffee roaster sourcing single origin beans from East Africa and Hawai'i. The exclusive coffee roaster for all Rangeway Basecamps.

**Live site:** [redcanyonroasting.co](https://redcanyonroasting.co)

## Tech Stack

- Vanilla HTML, CSS, JavaScript — no frameworks, no build tools
- Google Fonts (Outfit)
- Font Awesome 6 (social icons)
- GitHub Pages hosting

## Structure

```
index.html          Home page
origins.html        Coffee origins detail
story.html          Brand story
rangeway.html       Rangeway partnership
community.html      Events and community
styles.css          Global stylesheet
main.js             Site JavaScript (includes shared nav/footer)
data/events.json    Upcoming events data
favicon.svg         SVG favicon
```

## Development

No install step required. Open any HTML file directly or serve with any static server:

```sh
python3 -m http.server 8000
```

### Updating shared nav/footer

Edit the nav or footer template in `main.js`. All 5 pages inject nav/footer from JS at runtime, so changes propagate automatically.

### Updating events

Edit `data/events.json`. Events are sorted by date and past events are automatically filtered out.

```json
{
  "date": "2026-03-07",
  "name": "Bay Area Rivian Club — Spring Kickoff",
  "location": "Marin Headlands, CA",
  "link": "https://optional-link.com"
}
```

## Deployment

Hosted on GitHub Pages. Push to `main` branch to deploy.
