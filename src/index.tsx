/* @refresh reload */
import { render } from 'solid-js/web';

let yhroot = document.createElement('div');
yhroot.id = "yh-root"
document.querySelector('div#calculator > header')?.appendChild(yhroot);

render(() => <>Hello world!!!!</>, yhroot!);

console.log("unitsInfo ===  1");


// @ts-ignore
import { } from "./tools.js";
