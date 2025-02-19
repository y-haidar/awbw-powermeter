# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.


# Tampermonkey Side

```js
// ==UserScript==
// @name         Scratchpad-LiveReload
// @namespace    https://awbw.amarriner.com/
// @version      2025-02-11
// @description  TODO: add description, and rename
// @author       yhaidar
// @match        https://awbw.amarriner.com/game.php?games_id=*
// @match        https://awbw.amarriner.com/moveplanner.php?*
// @icon         https://awbw.amarriner.com/favicon.ico
// @require      http://localhost:8088/live-reload.js
// @grant        unsafeWindow
// @run-at document-idle
// @license MIT
// ==/UserScript==
```