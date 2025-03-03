import { n, button, f } from './globalvar.js';
function sidebarBtns(){
 button[0].addEventListener('mouseover', () => {
  f.fontChange.style.display = 'block';
  button[0].style.display = 'none';
 });
 
 button[1].addEventListener('click', () => {
  navigator.clipboard.writeText(n.savedtext);
  alert('Copied the text:\n' + n.savedtext);
 });
 
 button[2].addEventListener('click', () => {
  var s = n.notespad.textContent;
  // the popup counts as 4 words so i had to remove that xd
  var count = s.trim().split(/\s+/).length;
  // using the bool was much accurate than eventlistener
  if (!n.rightClicked) count = count - 4;
  if (count > 0 & s != '') {
   alert(`Word Count: ${count}`);
  } else alert('Word Count: 0');
 });
}
export{sidebarBtns};