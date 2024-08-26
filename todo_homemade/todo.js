const genSect = document.querySelector('.generated-section');
const input = document.querySelector('#taskinput');

const returnArray = arrayName => {
 return Array.from(document.querySelectorAll(arrayName))
};

const taskHtml = (taskNum, taskName) => {
 return `<div class="todo-item">
 <input type="checkbox">
 <div class="text">${taskNum}. ${taskName}</div>
 <img class="edit" src="imgs/edit.png" alt="Edit">
 <img class="delete" src="imgs/delete.png" alt="Delete">
 </div>`;
};

const regen = array => {
 console.log(array)
 let strArray = [];
 let str = '';
 array.forEach((e, index) => {
  // typeof e == 'string'
  strArray.push(taskHtml(index + 1, e.innerText.slice(3)));
  str += taskHtml(index + 1, e.innerText.slice(3));
 });
 genSect.innerHTML = str;
 return strArray;
};

const del = (array, delIndex) => {
 // works with html collection
 console.log('this is what our del is working with', array)
 array.splice(delIndex, 1);
 return array;
};

const edit = (prev, array, editIndex) => {
 // converts html collection into string
 const main = regen(array);
 const text = returnArray('.text');

 console.log('eating soon?', prev)
 text[editIndex].innerHTML = '<input type="text" id="edit-text">';
 
 const edittedText = document.getElementById('edit-text');
 edittedText.value = prev;
 edittedText.addEventListener('keypress', e => {
  if (e.key == 'Enter') {
   const finalinput = edittedText.value;
   main.splice(editIndex, 1, taskHtml(editIndex + 1, finalinput.slice(3)));
   
   // as we are working with strings due to our lovely splice
   // we need to regen with only strings and not html collections
   let str = '';
   main.forEach(item => {
    str += item
   });
   genSect.innerHTML = str;
   detectEdit();
  }
 });
};

// add a list with all the updated taskArray
const detectEdit = () => {
 genSect.addEventListener('click', e => {
  const tasks = returnArray('.todo-item');
  console.log('our html collection as array', tasks)
  const editIndex = returnArray('.edit').indexOf(e.target);
  const delIndex = returnArray('.delete').indexOf(e.target);
  console.log('go sleep', e.target)
  if (editIndex > -1) {
   console.log('clicked on edit button')
   prevText = tasks[editIndex].innerText;
   edit(prevText, tasks, editIndex);
   // detectEdit();
  }
  if (delIndex > -1) {
   regen(del(tasks, delIndex));
   detectEdit();
  }
 });
};

input.addEventListener('keypress', e => {
 if (e.key == 'Enter') {
  genSect.innerHTML += taskHtml(returnArray('.todo-item').length + 1, input.value);
  input.value = '';
  detectEdit();
 }
});