import { Elysia } from "elysia";
import { ListenCallback } from "elysia/dist/universal/server";
import { ElysiaWS } from "elysia/dist/ws";
import chokidar from 'chokidar';

// globalThis is not replaced on HMR
declare global {
  var ws: ElysiaWS<any>
}

const app = new Elysia()

app.get('/live-reload.js', () => `
  (function() {
    let script = document.createElement('script') ;
    script.id = "yh-script";
    document.head.appendChild(script) ;
    const socket = new WebSocket("ws://localhost:8088/live-reload");
    socket.onmessage = function(msg) {
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
    const file = Bun.file("./dist/script.js");
    file.text().then((v) => { ws.send(v); });
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

app.listen(8088);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
