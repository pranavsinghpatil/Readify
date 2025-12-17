# CSS: The Design System

**Goal**: A reading experience better than PDF.
We focus on **typography**, **readability**, and **responsiveness**.

## 🎨 Technology: Vanilla CSS + Variables

We don't use Tailwind or Bootstrap. Why?
1.  **Control**: We need precise control over print layouts and typography.
2.  **Size**: A 5KB CSS file vs a 100KB framework.
3.  **Simplicity**: Easy for anyone to edit `style.css`.

## 🧩 CSS Variables (Theming)

We use CSS variables for everything. This makes implementing **Dark Mode** trivial.

```css
:root {
    --bg-color: #ffffff;
    --text-color: #1a1a1a;
    --accent-color: #0066cc;
    --font-serif: 'Merriweather', serif;
    --font-sans: 'Inter', sans-serif;
}

[data-theme="dark"] {
    --bg-color: #121212;
    --text-color: #e0e0e0;
    --accent-color: #4da6ff;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
}
```

## 📱 Responsive Layout

We use **CSS Grid** for the main layout.

```css
.container {
    display: grid;
    grid-template-columns: 250px 1fr 300px; /* Sidebar | Content | Q&A */
    gap: 2rem;
}

@media (max-width: 1024px) {
    .container {
        grid-template-columns: 1fr; /* Stack everything on mobile */
    }
}
```

## 📖 Typography for Research

Reading long papers is tiring. We optimize for it:
*   **Line Length**: 60-75 characters (optimal for eye tracking).
*   **Line Height**: 1.6 (spacious).
*   **Font**: A high-quality serif for body text (like Merriweather or Literata) and sans-serif for headings.

## 🖨 Print Styles

Users might want to print the simplified version.

```css
@media print {
    .sidebar, .qa-panel, .nav-button {
        display: none; /* Hide UI elements */
    }
    body {
        font-size: 12pt;
        color: black;
    }
}
```
