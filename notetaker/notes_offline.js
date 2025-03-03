const notespad = document.querySelector('.notes');
const button = document.querySelectorAll('.butt');
const fontChange = document.querySelector('#idk');
let rightClicked = false;
const allopts = document.querySelectorAll('#idk li');
const font = document.querySelector('.font');
const popup = document.querySelector('.popup');
let savedtext = '';
let timeout;

function load() {
 if (localStorage['savednotes']) {
  savedtext = localStorage['savednotes'];
  notespad.innerHTML = marked.parse(savedtext);
  notespad.append(popup);
  console.log('loaded saved notes');
 }
}

notespad.addEventListener('mouseenter', () => {
 popup.style.display = 'block';
});

notespad.addEventListener('contextmenu', (e) => {
 e.preventDefault();
 // console.log('enter', savedtext)
 var textarea = document.createElement('textarea');
 textarea.value = savedtext;
 notespad.innerHTML = '';
 notespad.appendChild(textarea);
 popup.style.display = 'none';
 rightClicked = true;
});

notespad.addEventListener('mouseleave', () => {
 // console.log('moseleave', savedtext)
 popup.style.display = 'none';
 if (rightClicked) {
  // console.log('left areaaaaa');
  var t = document.querySelector('textarea');
  savedtext = t.value == null ? savedtext : t.value;
  notespad.innerHTML = marked.parse(savedtext);
  // notespad.append(popup);
  // rightClicked = false;
  localStorage.setItem('savednotes', savedtext);
  // console.log(rightClicked, 'ooooo', localStorage.getItem('savednotes'));
 }
});

notespad.addEventListener('mousemove', (e) => {
 if (!rightClicked) {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
   popup.style.left = `${e.pageX + 10}px`;
   popup.style.top = `${e.pageY + 10}px`;
  }, 5);
 }
});

button[0].addEventListener('mouseover', () => {
 fontChange.style.display = 'block';
 button[0].style.display = 'none';
});

button[1].addEventListener('click', () => {
 navigator.clipboard.writeText(savedtext);
 alert('Copied the text:\n' + savedtext);
});

button[2].addEventListener('click', () => {
 var s = notespad.textContent;
 // the popup counts as 4 words so i had to remove that xd
 var count = s.trim().split(/\s+/).length;
 // using the bool was much accurate than eventlistener
 if (!rightClicked) count = count - 4;
 if (count > 0 & s != '') {
  alert(`Word Count: ${count}`);
 } else alert('Word Count: 0');
});

const fontStyles = [
 { fontSize: '1.5rem', fontFamily: '"Reenie Beanie", cursive' },
 { fontSize: '1rem', fontFamily: '"Edu AU VIC WA NT Hand", system-ui' },
 { fontSize: '1rem', fontFamily: '"Gloria Hallelujah", system-ui' },
 { fontSize: '1rem', fontFamily: '"Homemade Apple", system-ui' },
 { fontSize: '1rem', fontFamily: '"Nothing You Could Do", system-ui' },
 { fontSize: '1.2rem', fontFamily: '"Shantell Sans", cursive' },
 { fontSize: '1.5rem', fontFamily: '"Sacramento", cursive' }
];

fontChange.addEventListener('click', (e) => {
 const target = e.target;
 const index = Array.from(allopts).indexOf(target);
 if (index === -1) return; // Skip if clicked item is not a valid option
 allopts.forEach(opt => opt.style.textDecoration = 'none');
 const { fontSize, fontFamily } = fontStyles[index];
 font.style.fontSize = fontSize;
 font.style.fontFamily = fontFamily;
 allopts[index].style.textDecoration = 'underline';
});

fontChange.addEventListener('mouseleave', () => {
 fontChange.style.display = 'none';
 button[0].style.display = 'block';
});

function loadGoogleFont(fontName, fontWeight = '400') {
 const link = document.createElement('link');
 link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@${fontWeight}&display=swap`;
 link.rel = 'stylesheet';
 document.head.appendChild(link);
}

document.addEventListener('DOMContentLoaded', load);