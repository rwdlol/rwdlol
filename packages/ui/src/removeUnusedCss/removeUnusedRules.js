import postcss from "postcss";
import { CLASS_IN_SELECTOR } from "./findClassNames.js";

function selectorNeedsUnusedClass(selector, componentClasses, usedClasses) {
  const selectorWithoutNot = selector.replace(/:not\([^)]*\)/g, "");
  for (const [, name] of selectorWithoutNot.matchAll(CLASS_IN_SELECTOR)) {
    if (componentClasses.has(name) && !usedClasses.has(name)) return true;
  }
  return false;
}

function isInsideKeyframes(rule) {
  const parent = rule.parent;
  return parent?.type === "atrule" && /keyframes$/i.test(parent.name);
}

function removeUnusedSelectors(rule, componentClasses, usedClasses) {
  const kept = [];
  for (const selector of rule.selectors) {
    if (!selectorNeedsUnusedClass(selector, componentClasses, usedClasses)) kept.push(selector);
  }

  if (kept.length === 0) {
    rule.remove();
  } else if (kept.length !== rule.selectors.length) {
    rule.selectors = kept;
  }
}

export function removeUnusedRules(css, componentClasses, usedClasses) {
  const root = postcss.parse(css);

  root.walkRules((rule) => {
    if (isInsideKeyframes(rule)) return;
    removeUnusedSelectors(rule, componentClasses, usedClasses);
  });

  root.walkAtRules((atRule) => {
    const isEmpty = atRule.nodes && atRule.nodes.length === 0;
    if (isEmpty) atRule.remove();
  });

  return root.toString();
}
