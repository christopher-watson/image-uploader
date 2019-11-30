// DOM elements
const tbody = document.getElementById('tbody');

// new table row
let trow = text => {
  let row = document.createElement('tr');
  let data = document.createElement('td');
  data.innerText = text;
  row.appendChild(data);
  return row;
};

// grab all users from db
getAllUsers = () => {
  axios
    .get(
      'https://image-uploader.christopherwatson.now.sh/api/users/findAllUsers'
    )
    .then(async res => {
      data = await res.data;
      for (var i of data) {
        await tbody.appendChild(
          trow(i.name.charAt(0).toUpperCase() + i.name.slice(1))
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
