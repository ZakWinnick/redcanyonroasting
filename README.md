# Red Canyon Roasting Company

Static marketing website for Red Canyon Roasting Company - a specialty coffee roaster sourcing single origin beans from East Africa and Hawai'i.

Live site: [redcanyonroasting.co](https://redcanyonroasting.co)

## Tech Stack

- Vanilla HTML, CSS, JavaScript (no build framework)
- Google Fonts (Outfit + Bricolage Grotesque)
- Font Awesome 6 (social icons)
- GitHub Pages hosting

## Structure

- `index.html` - Home page
- `origins.html` - Coffee origins and product details
- `story.html` - Brand story
- `rangeway.html` - Rangeway partnership
- `community.html` - Events and community
- `brew-guides.html` - Brewing content hub
- `origin-stories.html` - Origin content hub
- `event-recaps.html` - Community recap hub
- `styles.css` - Global stylesheet
- `main.js` - Shared nav/footer, events, analytics hooks, newsletter submit
- `data/events.json` - Upcoming events data
- `favicon.svg` - Site favicon
- `og-image.svg` - Social share image

## Development

No install step required. Open any HTML file directly or serve with a static server:

```sh
python3 -m http.server 8000
```

## Content Updates

### Navigation and footer

Both are injected by `main.js` into `#nav-root` and `#footer-root`.

### Events

Edit `data/events.json` using `YYYY-MM-DD` date format.

```json
{
  "date": "2026-03-07",
  "name": "Bay Area Rivian Club - Spring Kickoff",
  "location": "Marin Headlands, CA",
  "link": "https://optional-link.com"
}
```

Past events are filtered automatically.

### Newsletter endpoint

Forms submit to the endpoint in `data-newsletter-endpoint` (on `<body>` or each `.newsletter-form`).
Default fallback in JS is Buttondown embed API format.

## Deployment

Hosted on GitHub Pages. Push to `main` branch to deploy.
