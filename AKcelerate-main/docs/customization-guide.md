# Customization Guide

## Changing Brand Colors

Edit `/design-system/tokens/colors.css`:
```css
:root {
  --color-primary: #YOUR_COLOR;
  --color-accent:  #YOUR_ACCENT;
}
```
This will propagate across all pages automatically.

## Adding a New Page

1. Create `public/your-page.html` (copy an existing page as template)
2. Add route in `server/server.js`:
   ```js
   app.get('/your-page', (req, res) => {
     res.sendFile(path.join(__dirname, '../public/your-page.html'));
   });
   ```
3. Add nav link to all pages

## Editing the Nav Dropdown

Dropdown HTML is in each page's `<nav>` section inside `.nav-dropdown` divs.
Items are `.nav-dropdown-item` links inside `.nav-dropdown-menu`.

## Adding a New Service Page

1. Copy `public/services/predictive-maintenance.html`
2. Update: title, meta description, hero content, stats, features, process
3. Add to Solutions dropdown in all page navs
4. Add route in `server/server.js`

## Changing Fonts

1. Update Google Fonts `<link>` in each page's `<head>`
2. Update tokens in `/design-system/tokens/typography.css`

## Adding Chart.js Charts

```html
<canvas id="myChart"></canvas>
<script>
new Chart(document.getElementById('myChart'), {
  type: 'line',
  data: { ... },
  options: { ... }
});
</script>
```

## Environment Variables

Create `.env` in project root:
```
PORT=5000
NODE_ENV=production
CONTACT_EMAIL=akceleratehq@gmail.com
```
