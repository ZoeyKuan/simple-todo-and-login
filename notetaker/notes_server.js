import { sidebarBtns } from './noteapp/sidebarBtns.js';
import { notepad, load } from './noteapp/notepad.js';
import { changeFont, loadGoogleFont } from './noteapp/changefont.js';

notepad();

sidebarBtns();

changeFont();

document.addEventListener('DOMContentLoaded', load);