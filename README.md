# MountainPulse Adventure Club
## Kinetic Typography Design System with Tailwind CSS

A high-energy, motion-driven website built with vanilla HTML, Tailwind CSS, and JavaScript. Features infinite marquees, kinetic animations, and form validation.

## 🎯 Features

- **Kinetic Typography**: Massive headlines, infinite scrolling marquees, aggressive scale hierarchy
- **Tailwind CSS Integration**: Modern utility-first CSS with custom design tokens
- **Form Validation**: Real-time validation with error messages and success states
- **Enhanced JS**: Tooltips, smooth scrolling, focus management, active link highlighting
- **Accessibility**: WCAG AAA contrast, reduced motion support, keyboard navigation
- **Responsive Design**: Mobile-first approach with fluid typography using clamp()

## 📦 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd pages
npm install
```

This installs:
- `tailwindcss` - CSS framework
- `autoprefixer` - PostCSS plugin for vendor prefixes
- `@tailwindcss/forms` - Form plugin
- `concurrently` - Run multiple commands simultaneously

### 2. Build CSS

**Development (watch mode):**
```bash
npm run watch
```

This watches `CSS/input.css` and rebuilds `CSS/style.css` whenever changes are made.

**Production (minified):**
```bash
npm run production
```

**One-time build:**
```bash
npm run build
```

### 3. View in Browser

Open `home.html` in your browser after building. All three pages (home, about, contact) are ready to use.

## 📁 Project Structure

```
pages/
├── package.json              # Dependencies and build scripts
├── tailwind.config.js        # Tailwind configuration with design tokens
├── postcss.config.js         # PostCSS configuration
├── CSS/
│   ├── input.css            # Source CSS (Tailwind imports + custom styles)
│   └── style.css            # Generated output (don't edit directly)
├── JS/
│   ├── marquee.js           # Marquee and scroll animations
│   └── forms.js             # Form validation and interactions
├── home.html                # Homepage with hero and features
├── about.html               # About page with team and values
├── contact.html             # Contact/join form
└── .gitignore               # Git ignore rules
```

## 🎨 Design System

### Colors
- `--background`: #09090B (Rich black)
- `--foreground`: #FAFAFA (Off-white)
- `--accent`: #DFE104 (Acid yellow)
- `--border`: #3F3F46 (Zinc gray)
- `--muted`: #27272A (Dark gray)

### Typography
- **Font**: Space Grotesk (primary), Inter (fallback)
- **Hero**: `clamp(3rem, 12vw, 14rem)` - Massive viewport-responsive scaling
- **Display**: `clamp(2.5rem, 8vw, 6rem)` - Large section headers
- **Body**: `clamp(1rem, 1.5vw, 1.25rem)` - Scalable paragraph text

### Spacing
Base unit: 4px (Tailwind standard)
- 1 = 0.25rem
- 4 = 1rem
- 8 = 2rem
- 12 = 3rem
- 32 = 8rem

## ✨ Key Components

### Marquees (Infinite Scrolling)
```html
<section class="marquee-base">
    <div class="marquee-scroll">
        <div class="marquee-item large">500+</div>
        <div class="marquee-separator">•</div>
        <div class="marquee-item">Members</div>
    </div>
</section>
```

### Cards (Hover Color Inversion)
```html
<div class="card-base">
    <h3 class="card-title">Title</h3>
    <p class="card-description">Description text</p>
</div>
```

### Forms (With Validation)
```html
<div class="form-group">
    <label class="form-label" for="name">Name</label>
    <input type="text" id="name" name="name" class="form-input" required>
</div>
```

### Buttons
```html
<button class="btn-primary">Primary</button>
<button class="btn-outline">Outline</button>
<button class="btn-ghost">Ghost</button>
```

## 🔧 JavaScript Features

### Form Validation (`JS/forms.js`)
- Real-time validation on blur
- Custom error messages
- Success state feedback
- Accessible error display

```javascript
// Usage in custom scripts:
const isValid = FormValidation.validateField(inputElement);
FormValidation.showFormSuccess(formElement, 'Custom message', 3000);
```

### Marquee Animation (`JS/marquee.js`)
- Infinite scroll with GPU acceleration
- Scroll-triggered animations
- Sticky card stacking
- Parallax hero effects

### Tooltips
```html
<button data-tooltip="This is a tooltip">Hover me</button>
```

## 🎯 Tailwind Configuration

Custom extensions in `tailwind.config.js`:
- **Colors**: Extended with design system colors
- **Font sizes**: Responsive scales with clamp()
- **Animations**: Marquee, fade-in, slide-up, scale-in
- **Spacing**: Custom 4px-based spacing scale

Override any defaults by extending the config.

## 📱 Responsive Breakpoints

- **Mobile**: Base styles (320px-767px)
- **Tablet (md)**: 768px+
- **Desktop (lg)**: 1024px+

All components adapt to breakpoints. Use Tailwind's `md:` and `lg:` prefixes:

```html
<div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
</div>
```

## ♿ Accessibility

- **Contrast**: 15:1 ratio on primary text (exceeds WCAG AAA)
- **Motion**: Respects `prefers-reduced-motion` media query
- **Focus**: Clear focus indicators on all interactive elements
- **Touch**: Minimum 44x44px touch targets
- **Keyboard**: Full keyboard navigation support

## 🔍 SEO Considerations

- Semantic HTML structure
- Proper heading hierarchy (h1 → h6)
- Meta tags for social sharing
- Schema markup ready for implementation
- Fast load time with minimal CSS/JS

## 🚢 Deployment

### Static Hosting (Netlify, Vercel, GitHub Pages)
1. Build CSS: `npm run production`
2. Commit all files including generated `CSS/style.css`
3. Deploy `pages` folder as root

### With Build Pipeline
1. Commit only source files (`CSS/input.css`, not `style.css`)
2. Add build command: `npm run build`
3. Deploy folder

## 📚 Additional Resources

- [Tailwind CSS Docs](https://tailwindcss.com)
- [MDN Web Docs](https://developer.mozilla.org)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref)

## 📝 Notes

- **CSS Output**: `CSS/style.css` is generated automatically. Don't edit it directly; modify `CSS/input.css` instead.
- **Watch Mode**: Keep the terminal running during development: `npm run watch`
- **Production**: Always minify for deployment: `npm run production`
- **Custom Styles**: Add component styles in `CSS/input.css` under `@layer components`

## 🤝 Contributing

To extend the design system:
1. Add tokens to `tailwind.config.js`
2. Create component styles in `CSS/input.css`
3. Use Tailwind's `@layer` directives to organize code
4. Test responsive behavior across all breakpoints

## 📄 License

MIT License - feel free to use for your projects!
