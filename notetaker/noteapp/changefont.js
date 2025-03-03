import { button, f } from './globalvar.js';
const allopts = document.querySelectorAll('#idk li');
const font = document.querySelector('.font');

const changeFont = () => {
 f.fontChange.addEventListener('click', (e) => {
  const target = e.target;
  const index = Array.from(allopts).indexOf(target);
  if (index === -1) return; // Skip if clicked item is not a valid option
  allopts.forEach(opt => opt.style.textDecoration = 'none');
  const { fontSize, fontFamily } = f.fontStyles[index];
  font.style.fontSize = fontSize;
  font.style.fontFamily = fontFamily;
  allopts[index].style.textDecoration = 'underline';
 });
 
 f.fontChange.addEventListener('mouseleave', () => {
  f.fontChange.style.display = 'none';
  button[0].style.display = 'block';
 });
}

function loadGoogleFont(fontName, fontWeight = '400') {
 const link = document.createElement('link');
 link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@${fontWeight}&display=swap`;
 link.rel = 'stylesheet';
 document.head.appendChild(link);
}

export{changeFont, loadGoogleFont}