# Red Canyon Roasting Company

Static marketing website for Red Canyon Roasting Company — a specialty coffee roaster sourcing single origin beans from East Africa and Hawai'i. The exclusive coffee roaster for all Rangeway Basecamps.

**Live site:** [redcanyonroasting.co](https://redcanyonroasting.co)

## Tech Stack

- Vanilla HTML, CSS, JavaScript — no frameworks, no build tools
- Google Fonts (Outfit)
- Firebase Hosting
- Optional `build.sh` for syncing shared nav/footer partials

## Structure

```
index.html          Home page
origins.html        Coffee origins detail
story.html          Brand story
rangeway.html       Rangeway partnership
community.html      Events and community
styles.css          Global stylesheet
main.js             Site JavaScript
data/events.json    Upcoming events data
partials/           Shared nav and footer HTML
build.sh            Partial sync script
favicon.svg         SVG favicon
```

## Development

No install step required. Open any HTML file directly or serve with any static server:

```sh
python3 -m http.server 8000
```

### Updating shared nav/footer

Edit `partials/nav.html` or `partials/footer.html`, then run:

```sh
./build.sh
```

This syncs the partials into all 5 pages, applying per-page `nav-dark` class and active link states.

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

Hosted on Firebase Hosting. Deploy with:

```sh
firebase deploy
```
