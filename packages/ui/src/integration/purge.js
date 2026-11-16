import postcss from "postcss";
import { CLASS_IN_SELECTOR } from "@rwdlol/ui/integration/classes.js";

function selectorNeedsUnusedClass(selector, owned, used) {
  const selectorWithoutNot = selector.replace(/:not\([^)]*\)/g, '');
  for (const [, name] of selectorWithoutNot.matchAll(CLASS_IN_SELECTOR)) {
    if (owned.has(name) && !used.has(name)) return true;
  }
  return false;
}

function isInsideKeyframes(rule) {
  return rule.parent?.type === 'atrule' && /keyframes$/i.test(rule.parent.name);
}

export function purge(css, owned, used) {
  const root = postcss.parse(css);

  root.walkRules((rule) => {
    if (isInsideKeyframes(rule)) return;
    const kept = rule.selectors.filter((selector) => !selectorNeedsUnusedClass(selector, owned, used));
    if (kept.length === 0) rule.remove();
    else if (kept.length !== rule.selectors.length) rule.selectors = kept;
  });

  root.walkAtRules((atRule) => {
    if (atRule.nodes && atRule.nodes.length === 0) atRule.remove();
  });

  return root.toString();
}
