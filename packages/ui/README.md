# @rwdlol/ui

Accessible Astro components with design tokens.

**Live docs and examples:** [www.rwd.lol/storybook](https://www.rwd.lol/storybook/)

- Plain HTML and CSS: no client-side JavaScript is shipped by the components
- Accessible by default: tested against WCAG 2.1 AA
- Typed props: your editor and `astro check` catch wrong or missing props
- Works with Astro 5, 6 and 7

> **Upgrading from 1.x?** Version 1 was a class-only CSS/SCSS framework (`@rwdlol/ui/css`, `@rwdlol/ui/scss`).
> Version 2 is a new Astro component library and does not include those files.
> To keep the CSS framework, stay on `npm i @rwdlol/ui@^1`.

## Install

```bash
npm install @rwdlol/ui
```

## Usage

Load the global styles once (for example in your layout), then use the components:

```astro
---
import '@rwdlol/ui/styles.css';
import { Header, Hero, Card, Button, Footer } from '@rwdlol/ui';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Contact', href: '/contact/' },
];
---

<Header siteName="My Site" links={links} currentPath={Astro.url.pathname} />

<main>
  <Hero
    title="Welcome"
    text="Built with @rwdlol/ui."
    primaryLabel="Get started"
    primaryHref="/start/"
  />

  <div class="container">
    <Card title="Fast" text="Static HTML, no JavaScript needed." href="/about/" linkLabel="Read more" />
    <Button label="Send" type="submit" />
  </div>
</main>

<Footer links={links} copyright="© 2026 My Site" />
```

## Smaller CSS (recommended)

Add the integration to ship only the styles your pages use, for example only `.btn--sm`
if you never use large buttons. It runs after `astro build`; `astro dev` keeps every style.

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import rwdlolUi from '@rwdlol/ui/integration';

export default defineConfig({
  integrations: [rwdlolUi()],
});
```

If you add classes yourself with JavaScript (e.g. `el.classList.add('btn--lg')`), keep them with:

```js
rwdlolUi({ safelist: ['btn--lg'] })
```

## Components

| Component   | Main props                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------ |
| `Alert`     | `type` (`info`, `success`, `warning`, `error`), `title`, `message`                                     |
| `Button`    | `label`, `variant` (`primary`, `secondary`, `danger`), `size`, `href`, `type`, `disabled`, `fullWidth` |
| `Card`      | `title`, `text`, `href`, `linkLabel`, `headingLevel`                                                   |
| `Footer`    | `links`, `copyright`                                                                                   |
| `Header`    | `siteName`, `links`, `currentPath`, `brandHref`                                                        |
| `Hero`      | `title`, `text`, `primaryLabel`/`primaryHref`, `secondaryLabel`/`secondaryHref`                        |
| `Input`     | `id`, `label`, `type`, `value`, `hint`, `error`, `required`, `multiline`                               |
| `SkillList` | `title`, `items`, `headingLevel`                                                                       |

All prop types are exported: `import type { ButtonProps } from '@rwdlol/ui';`

## Using components in the browser

Every component also exists as a function that returns an HTML string. Use these in `<script>` tags, for example to show validation messages:

```astro
<div id="status"></div>

<script>
  import { Alert } from '@rwdlol/ui/html';

  document.getElementById('status')!.innerHTML = Alert({
    type: 'success',
    title: 'Message sent',
  });
</script>
```

All text is HTML-escaped, so user input can't inject markup.

## Theming

Colors, spacing and fonts are CSS variables. Override them after importing the styles:

```css
:root {
  --color-primary: #7c3aed;
  --color-primary-hover: #6d28d9;
  --color-primary-light: #f3e8ff;
  --radius: 8px;
}
```

See [`src/styles/tokens.css`](./src/styles/tokens.css) for every variable.
You can also import the files separately: `@rwdlol/ui/styles/tokens.css` and `@rwdlol/ui/styles/base.css`.

## License

MIT © Rawand
