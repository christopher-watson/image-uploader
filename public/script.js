// import axios from 'axios'

// DOM elements
const tbody = document.getElementById('tbody');

// new table row
let trow = () => {
  let row = document.createElement('tr');
  let data = document.createElement('td');
  data.innerText = 'Test';
  row.appendChild(data);
  return row;
};

tbody.appendChild(trow());
axios
  .get('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => console.log(res));
