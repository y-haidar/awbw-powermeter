/* @refresh reload */
import { render } from 'solid-js/web';

let yhroot = document.createElement('div');
yhroot.id = "yh-root"
document.querySelector('div#calculator > header')?.appendChild(yhroot);

// if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
//     throw new Error(
//         'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
//     );
// }

render(() => <>Hello world!!!!</>, yhroot!);

console.log("unitsInfo ===  3");
// console.log(unitsInfo);
