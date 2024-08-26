const storedUser = () => {
 var c = JSON.parse(sessionStorage.getItem('userlist'));
 if (c == undefined) return [];
 else return c;
};
let upload = storedUser();
let isRepeat = false;

// just check for repeated user ID. 
// if username is repeated, then every
// function will reject the username and password
const user = (idk) => {
 for (i=0; i<idk.length; i++){
  if (Object.keys(idk[i]).includes(username.value)){
   isRepeat = true;
   break;
  } else {
   isRepeat = false;
  }
 }
 if (!isRepeat) return [username.value, password.value];
 else return [undefined, undefined];
};

// checks for username in the username input
const span = document.querySelectorAll('span');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const form = document.querySelector('.form-container');
const img = document.querySelectorAll('img');
form.addEventListener('keypress', (e) => {
 var uname;
 var pword;
 if (e.keyCode == 13){
  for (image=0; image<img.length; image++)
  img[image].style.display = 'none';
  uname = user(storedUser);
  console.log(typeof uname)
  console.log(user(storedUser)[0], user(storedUser)[1])
  // storedUser.forEach((dict) =>{
  //  console.log(dict)
  //  pword = pw(isRepeat);
  //  console.log(typeof pword)
  // });
  register(uname[0], uname[1]);
 }
});

function register(u, p){
 if (isRepeat){
  for (it=0; it<2; it++) span[it].style.display = 'block';
  for (image=0; image<img.length; image++) img[image].style.display = 'none';
  return;
 }
 if (p == "" || p == undefined) return;
 for (it=0; it<2; it++) span[it].style.display = 'none';
 var dict = {};
 dict[u] = p;
 upload.push(dict);
 sessionStorage.setItem('userlist', JSON.stringify(upload));
 console.log('reged', dict)
 for (image=0; image<img.length; image++) img[image].style.display = 'block';
 isRepeat = false;
}

document.querySelector('button').addEventListener('click', () => {
 if (window.location.pathname == '/login') {
  window.location.assign('register.html');
 } else {
  window.location.assign('login.html');
 }
});