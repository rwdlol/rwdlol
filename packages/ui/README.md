# @rwdlol/ui

Custom Astro components.

## Use it

```astro
---
import { PageShell } from "@rwdlol/ui";
---
```

```js
// astro.config.mjs: removes CSS that a page does not use
import rwdlolUi from "@rwdlol/ui/integration";
export default defineConfig({ integrations: [rwdlolUi()] });
```

The package has only four public files:

| Import                   | File                 | What it gives you                                                     |
| ------------------------ | -------------------- | --------------------------------------------------------------------- |
| `@rwdlol/ui`             | `src/index.ts`       | Astro components (`<Button />`) and their types                       |
| `@rwdlol/ui/html`        | `src/html.ts`        | HTML-string functions (`makeButtonHtml()`), for Storybook or plain JS |
| `@rwdlol/ui/styles.css`  | `src/styles.css`     | All CSS: tokens, base styles, every component                         |
| `@rwdlol/ui/integration` | `src/integration.js` | Astro integration that removes unused CSS                             |

## Folders

```
src/
  index.ts             list of Astro components
  html.ts              list of HTML-string functions
  styles.css           list of all CSS files
  integration.js       the Astro integration
  components/          one folder per component
  helpers/             small helpers used by components
  removeUnusedCss/     the code behind integration.js
  styles/              tokens and base CSS
```

## One component = one folder

The old finished components are in `backup/ui/components/` (in the repo root). To bring one back, move its folder into `src/components/` and add its lines to `index.ts`, `html.ts` and `styles.css`.

Every file name says what it is for:

| File                | What it does                                                   |
| ------------------- | -------------------------------------------------------------- |
| `Button.html.ts`    | The props type and `makeButtonHtml(props)`, which returns HTML |
| `Button.astro`      | The Astro component. It only calls `makeButtonHtml()`          |
| `Button.css`        | The styles                                                     |
| `Button.stories.ts` | Storybook stories and tests                                    |
| `Button.browser.ts` | Only if the component needs JavaScript in the browser          |
| `Button.example.ts` | Only if several stories share the same example data            |

The HTML lives in `.html.ts` so the Astro page and Storybook show exactly the same HTML.

## Add a new component

Example: a `Badge`.

1. Make the folder `src/components/Badge/`.
2. `Badge.html.ts`: write `BadgeProps` and `makeBadgeHtml(props)`. Use `escapeHtml()` from `../../helpers/htmlHelpers.ts` for every text that comes from props.
3. `Badge.astro`:

   ```astro
   ---
   import { makeBadgeHtml, type BadgeProps } from "./Badge.html.ts";

   type Props = BadgeProps;
   ---

   <Fragment set:html={makeBadgeHtml(Astro.props)} />
   ```

4. `Badge.css`: styles with class names like `.badge`, `.badge__icon`, `.badge--big`.
5. `Badge.stories.ts`: copy one from another component.
6. Add one line to each list:
   - `src/index.ts`: `export { default as Badge } from "./components/Badge/Badge.astro";` and `export type { BadgeProps } from "./components/Badge/Badge.html.ts";`
   - `src/html.ts`: `export { makeBadgeHtml, type BadgeProps } from "./components/Badge/Badge.html.ts";`
   - `src/styles.css`: `@import "./components/Badge/Badge.css";`

Inside the package, always import with a relative path (`./`, `../`), never with `@rwdlol/ui/...`.

## Breakpoints

| Name    | Min-Width |
| ------- | --------- |
| pocket  | 320px     |
| mobile  | 480px     |
| tablet  | 768px     |
| laptop  | 1024px    |
| desktop | 1280px    |
| wide    | 1600px    |
|         | 1920px    |
