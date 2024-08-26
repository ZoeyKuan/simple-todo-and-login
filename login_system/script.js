const regBtn = document.querySelector('.center');
const data = sessionStorage.getItem('userlist');
const storedUser = () => {
 var placeholder = JSON.parse(data);
 if (placeholder === null) {
  regBtn.style.display = 'flex';
  return [];
 }
 else return placeholder;
};
storedUser();
const span = document.querySelectorAll('span');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const form = document.querySelector('.form-container');
form.addEventListener('keypress', (e) => {
 // checks if user has pressed the enter key as keycode 13 is enter
 if (e.keyCode == 13){
  for (i=0; i<storedUser().length; i++){
   
   // LOGIN
   if (username.value == Object.keys(storedUser()[i])){
    console.log('it works', Object.keys(storedUser()[i]))
    loggingIn(i, Object.keys(storedUser()[i]));
    break;
   } else {
    console.log('you have not created acc');
    regBtn.style.display = 'flex';
   }
  }
 }
});

function loggingIn(i, key){
 if (password.value == storedUser()[i][key]){
  console.log('Logged in!!!');
  document.querySelector('.center').style.display = 'none';
  for (it=0; it<2; it++) span[it].style.display = 'none';
  document.querySelector('login-msg').style.display = 'block';
  const checked = document.querySelectorAll('.checked');
  for(c=0;c<checked.length;c++) checked[c].style.display = 'block';
  } else {
  console.log('failure to log in');
  // gives error message where user types wrong password
  for (it=0; it<2; it++){
   span[it].style.display = 'block';
  }
  document.querySelector('login-msg').style.display = 'none';
  const checked = document.querySelectorAll('.checked');
  for(c=0;c<checked.length;c++) checked[c].style.display = 'none';
 }
}

document.querySelector('button').addEventListener('click', () => {
 if (window.location.pathname == '/login.html') {
  window.location.assign('register.html');
 } else {
  window.location.assign('login.html');
 }
});