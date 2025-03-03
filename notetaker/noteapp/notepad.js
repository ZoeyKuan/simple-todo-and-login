import { n } from './globalvar.js';
const popup = document.querySelector('.popup');
let timeout;

const notepad = () => {
 
 n.notespad.addEventListener('mouseenter', () => {
  popup.style.display = 'block';
 });
 
 n.notespad.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  // console.log('enter', n.savedtext)
  var textarea = document.createElement('textarea');
  textarea.value = n.savedtext;
  n.notespad.innerHTML = '';
  n.notespad.appendChild(textarea);
  popup.style.display = 'none';
  n.rightClicked = true;
 });
 
 n.notespad.addEventListener('mouseleave', () => {
  // console.log('moseleave', n.savedtext)
  popup.style.display = 'none';
  if (n.rightClicked) {
   // console.log('left areaaaaa');
   var t = document.querySelector('textarea');
   n.savedtext = t.value == null ? n.savedtext : t.value;
   n.notespad.innerHTML = marked.parse(n.savedtext);
   // notespad.append(popup);
   // rightClicked = false;
   localStorage.setItem('savednotes', n.savedtext);
   // console.log(rightClicked, 'ooooo', localStorage.getItem('savednotes'));
  }
 });
 
 n.notespad.addEventListener('mousemove', (e) => {
  if (!n.rightClicked) {
   clearTimeout(timeout);
   timeout = setTimeout(() => {
    popup.style.left = `${e.pageX + 10}px`;
    popup.style.top = `${e.pageY + 10}px`;
   }, 5);
  }
 });
}

function load() {
 if (localStorage['savednotes']) {
  n.savedtext = localStorage['savednotes'];
  n.notespad.innerHTML = marked.parse(n.savedtext);
  n.notespad.append(popup);
  console.log('loaded saved notes');
 }
}

export{notepad, load};