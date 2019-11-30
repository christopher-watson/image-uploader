// DOM elements
const tbody = document.getElementById('tbody');

// toggle name
toggleName = data => {
  if (data.target.innerText === data.target.getAttribute('name')) {
    data.target.innerText = data.target.getAttribute('mail');
    data.target.setAttribute('class', 'text-muted');
  } else {
    data.target.innerText = data.target.getAttribute('name');
    data.target.removeAttribute('class', 'text-muted');
  }
};

// new table row
let trow = (name, email) => {
  let row = document.createElement('tr');
  let data = document.createElement('td');
  data.innerText = name;
  data.setAttribute('name', name);
  data.setAttribute('mail', email);
  data.addEventListener('click', e => {
    toggleName(e);
  });
  row.appendChild(data);
  return row;
};

// grab all users from db
getAllUsers = () => {
  axios
    .get(
      'https://image-uploader.christopherwatson.now.sh/api/users/getAllUsers'
    )
    .then(async res => {
      data = await res.data;
      for (var i of data) {
        await tbody.appendChild(
          trow(i.name.charAt(0).toUpperCase() + i.name.slice(1), i.email)
        );
      }
    });
};
getAllUsers();

// add new user to db
addNewUser = (name, email) => {
  axios.post(
    'https://image-uploader.christopherwatson.now.sh/api/users/createUser',
    {
      name: name,
      email: email
    }
  );
};

// form & button
const submit = document.getElementById('submit-button');
const name = document.getElementById('name-input');
const email = document.getElementById('email-input');
submit.addEventListener('click', async () => {
  await addNewUser(name.value, email.value);
  email.value = '';
  name.value = '';
});
