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

addNewUser = (name, email) => {
  axios.post(
    'https://image-uploader.christopherwatson.now.sh/api/users/createUser',
    {
      name: name,
      email: email
    }
  );
};

const submit = document.getElementById('submit-button');
const name = document.getElementById('name-input');
const email = document.getElementById('email-input');
submit.addEventListener('click', async () => {
  await addNewUser(name.value, email.value).then( (res, err) => {
    if(!err){
      console.log(res)
      await tbody.appendChild(
        trow(name.value.charAt(0).toUpperCase() + name.value.slice(1))
      );
    }
    else {
      console.log(err);
    }
  });

  email.value = '';
  name.value = '';
});
