---
name: code-style
description: How to write code so a 14-year-old can understand it. Use before writing or editing ANY file in this project.
---

# Code style for languagekrd

Every file must be easy enough for a 14-year-old to read. Always, for the whole project.

## Rules

1. **Medium files, max five jobs each.** If a file grows past ~120 lines, split it.
2. **Names instead of comments.** Do not write comments. If code needs a comment, rename the function or split it until it doesn't.
   - Good: `findWordsInBlogTable()`, `goToProfileIfLoggedIn()`, `takeItemsFromStock()`
   - Bad: `getData()`, `handle()`, `process()`
3. **Plain steps.** A function reads top to bottom: check input → read database → save → return. No clever one-liners, no deep abstractions.
   - Add numbers with a `for … of` loop, not `.reduce()`.
   - No nested `a ? b : c ? d : e`. Use `if` lines., except the code is short whe nyou write nested, the nyou can write nested code style.
   - Prefer plain exported functions over classes with `static` members. A class is fine when it really holds state for one thing (a map, the image cropper).
