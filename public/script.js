// DOM elements
const tbody = document.getElementById('tbody');
const submit = document.getElementById('submit-button');
const name = document.getElementById('name-input');
const email = document.getElementById('email-input');

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
    .get('https://image-uploader-prod.now.sh/api/users/getAllUsers')
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

clearForm = () => {
  name.value = '';
  email.value = '';
};

// add new user to db
addNewUser = async (name, email) => {
  if (name.trim() > 0 && email.trim() > 0) {
    await axios
      .post('https://image-uploader-prod.now.sh/api/users/createUser', {
        name: name,
        email: email
      })
      .then((res, err) => {
        if (res) {
          formSuccess();
        }
        if (err) {
          console.log(err);
          formError();
        }
      });
  }
  await clearForm();
};

// form error
formError = () => {
  const error = document.getElementById('error-span');
  error.innerText = 'ERROR';
  setTimeout(function() {
    error.innerText = '';
  }, 2000);
};

// form success
formSuccess = () => {
  const success = document.getElementById('success-span');
  success.innerText = 'Success!';
  setTimeout(function() {
    success.innerText = '';
  }, 2000);
};

// form & button
submit.addEventListener('click', async () => {
  await addNewUser(name.value, email.value);
});

// toggle api div
let pressed = [];
const secretCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
window.addEventListener('keyup', e => {
  pressed.push(e.keyCode);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  if (JSON.stringify(pressed) === JSON.stringify(secretCode)) {
    toggleApiDiv();
  }
});

toggleApiDiv = () => {
  const apiDiv = document.getElementById('api-container');
  if (apiDiv.style.display === 'none') {
    apiDiv.setAttribute('style', 'display: initial');
  } else {
    apiDiv.setAttribute('style', 'display: none');
  }
};
