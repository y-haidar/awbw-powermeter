import text from "./ui.vue?raw";

let yhroot = document.createElement('div');
yhroot.id = "yh-root"
// @ts-ignore
// yhroot.style = `
//     margin-right: 10px;
// `;
yhroot.innerHTML = text;
document.querySelector('div#calculator')?.prepend(yhroot);

// @ts-ignore
import _t1 from "./tools.js";
_t1;
// @ts-ignore
import _t2 from "./ui.js";
_t2
