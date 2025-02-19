import { Elysia } from "elysia";
// import { html, Html } from '@elysiajs/html'
import { ListenCallback } from "elysia/dist/universal/server";
import { ElysiaWS } from "elysia/dist/ws";
// @ts-ignore
// import text from "./dist/script.js" with {type: "text"}
// import { } from "./src/index.tsx" with {type: "text"}
// import { watchFile } from 'node:fs';
import chokidar from 'chokidar';
// import open from 'open';

// const text = import("./tools.txt", { with: { type: "text" } });

// globalThis is not replaced on HMR
declare global {
  var ws: ElysiaWS<any>
  var isOpened: boolean
}

const app = new Elysia()

app.get('/live-reload.js', () => `
  (function() {
    // const basePath = 'http://localhost:8088/tools.js';
    // fetch(basePath)
    //   .then(response => response.text())
    //   .then(script => {
    //     eval(script);
    //     console.log('========== Loaded ==========');
    //   })
    let script = document.createElement('script') ;
    script.id = "yh-script";
    document.head.appendChild(script) ;
    const socket = new WebSocket("ws://localhost:8088/live-reload");
      socket.onmessage = function(msg) {
      // if(msg.data === 'live-reload') {
      //   // location.reload()
      //   fetch(basePath)
      //     .then(response => response.text())
      //     .then(script => {
      //       eval(script);
      //       console.log('========== Loaded ==========');
      //     })
      // }
      let yhscript_old = document.getElementById("yh-script");
      yhscript_old.remove();
      const yhroot = document.getElementById("yh-root");
      if (yhroot) yhroot.remove();

      let script = document.createElement('script') ;
      script.id = "yh-script";
      script.type = "module";
      script.textContent = msg.data;
      document.head.appendChild(script);
      console.log('========== Loaded ==========');
    };
    console.log('=========== Live reload enabled. ===========');
  })();
`)

app.ws(`/live-reload`, {
  open: (ws) => {
    globalThis.ws = ws
  }
})

let is_debounced = false;

chokidar.watch('./dist/script.js', { usePolling: true }).on('change', (event, path) => {
  console.log(event);
  if (!is_debounced) {
    is_debounced = true;
    setTimeout(() => {
      is_debounced = false;
      const file = Bun.file("./dist/script.js");
      file.text().then((v) => { if (globalThis.ws) globalThis.ws.send(v); });
    }, 100)
  }
});


// watchFile("./dist/script.js", async () => {
//   const file = Bun.file("./dist/script.js");
//   text = await file.text();
//   if (globalThis.ws) globalThis.ws.send(text);
// });

const callback: ListenCallback = async ({ hostname, port, }) => {
  if (!globalThis.isOpened) {
    globalThis.isOpened = true
    // open(`http://${hostname}:${port}`) // https://www.npmjs.com/package/open
  }

  // if (globalThis.ws) globalThis.ws.send('live-reload')
  // if (globalThis.ws) globalThis.ws.send(text);
}

app.listen(8088, callback);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
