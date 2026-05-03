# Hands Save Lives — Website

A multi-file static website for HandsSaveLives.gr — clean, professional, and easy to update without touching multiple files at once.

---

## 📁 Project Structure

```
handssavelives/
│
├── index.html              ← Homepage
│
├── css/
│   └── main.css            ← ALL styles (edit here for design changes)
│
├── js/
│   ├── main.js             ← Homepage JS (scroll effects, animations)
│   └── components.js       ← Shared navbar + footer for sub-pages
│
├── pages/
│   ├── cpr-seminars.html           ← Seminar 01
│   ├── school-seminars.html        ← Seminar 02
│   ├── first-aid-presentations.html← Seminar 03 (new)
│   ├── about.html
│   ├── gallery.html
│   └── contact.html
│
└── images/                 ← Put your photos here
    └── (your images)
```

---

## ✏️ How to make common updates

### Change text on a page
Open the relevant `.html` file in `/pages/` and edit the text directly. Each page is self-contained and clearly structured.

### Change colors or fonts
Open `css/main.css` and look for the `:root` section at the top — all colors and fonts are defined as CSS variables there.

### Add/change navbar or footer links
Open `js/components.js` — the navbar and footer HTML are in the `injectNavbar()` and `injectFooter()` functions. Edit once, applies everywhere.

### Add a new page
1. Copy an existing page from `/pages/` as a template
2. Update the content
3. Add a link to it in `js/components.js` (navbar & footer)
4. That's it — no need to touch any other file

### Add photos to the gallery
1. Drop your `.jpg` / `.webp` images into `/images/`
2. Open `pages/gallery.html`
3. Replace the placeholder `<div>` elements with:
   ```html
   <div class="gallery-item">
     <img src="../images/your-photo.jpg" alt="Description" />
   </div>
   ```

### Update contact info
Open `pages/contact.html` — all phone, email, and address info is in the "Στοιχεία Επικοινωνίας" section.

### Set up the contact form
The form in `contact.html` works with any static form backend. Recommended options:
- **Formspree** (free): Change `action="#"` to `action="https://formspree.io/f/YOUR_ID"`
- **Netlify Forms**: Add `netlify` attribute to `<form>` if hosting on Netlify

---

## 🚀 Deploying to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to Settings → Pages
3. Set source to `main` branch, root folder
4. Your site will be live at `https://yourusername.github.io/repo-name/`

Or use a custom domain by adding a `CNAME` file with your domain name.

---

## 🔤 Fonts used
- **Playfair Display** — display / headings (Google Fonts)
- **DM Sans** — body text (Google Fonts)

Both load from Google Fonts CDN. No local font files needed.
