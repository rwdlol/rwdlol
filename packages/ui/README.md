# @rwdlol/ui

Accessible Astro components with design tokens.

Examples: [www.rwd.lol/storybook](https://www.rwd.lol/storybook/)

## Install

```bash
npm install @rwdlol/ui
```

Needs Astro 7 or newer.

## Use

```astro
---
import "@rwdlol/ui/styles.css";
import { Header, Hero, Card, Footer } from "@rwdlol/ui";

const links = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact/" },
];
---

<Header siteName="My Site" links={links} currentPath={Astro.url.pathname} />
<Hero title="Welcome" text="Built with @rwdlol/ui." primaryLabel="Start" primaryHref="/start/" />
<Card title="Fast" text="Static HTML." href="/about/" linkLabel="About us" />
<Footer links={links} copyright="© 2026 My Site" />
```

## Components

| Component   | Props                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------- |
| `Accordion` | `id`, `items`, `headingLevel`, `allowMultiple`                                            |
| `Alert`     | `type`, `title`, `message`                                                                |
| `Button`    | `label`, `variant`, `size`, `href`, `type`, `disabled`, `fullWidth`                       |
| `Card`      | `title`, `text`, `href`, `linkLabel`, `headingLevel`                                      |
| `Footer`    | `links`, `copyright`                                                                      |
| `Header`    | `siteName`, `links`, `currentPath`, `brandHref`, `menuLabel`, `menuId`                    |
| `Hero`      | `title`, `text`, `primaryLabel`, `primaryHref`, `secondaryLabel`, `secondaryHref`         |
| `Input`     | `id`, `label`, `type`, `value`, `hint`, `error`, `required`, `multiline`, `autocomplete`  |
| `SkillList` | `title`, `items`, `headingLevel`                                                          |

Every props type is exported too, e.g. `import type { ButtonProps } from "@rwdlol/ui"`.

Header and Accordion add a small script for the mobile menu and open/close. Without JavaScript they still show all content.

## Smaller CSS

This integration removes the styles your built pages don't use:

```js
import rwdlolUi from "@rwdlol/ui/integration";

export default defineConfig({
  integrations: [rwdlolUi({ safelist: ["btn--lg"] })],
});
```

`safelist` keeps classes you only add with JavaScript.

## In the browser

`@rwdlol/ui/html` has the same components as functions that return HTML. All text is escaped.

```js
import { Alert } from "@rwdlol/ui/html";

status.innerHTML = Alert({ type: "success", title: "Message sent" });
```

## Theme

Override the CSS variables from [`tokens.css`](./src/styles/tokens.css):

```css
:root {
  --color-primary: #7c3aed;
  --radius: 8px;
}
```

Heads-up: `1rem` is `1px` in this package, so `16rem` means 16px.

## License

MIT © Rawand
