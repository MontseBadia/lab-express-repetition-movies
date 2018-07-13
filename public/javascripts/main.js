// const favButton = document.getElementById('btn-fav');
// favButton.addEventListener('click', handleClick);

// function handleClick () {
//   favButton.classList.toggle('btn-fav');
// }

'use strict';

function main () {
  console.log('hello');
  const username = document.getElementById('signup-username');
  username.addEventListener('change', handleChange);

  function handleChange () {
    console.log(username);
    axios.get(`/api/user/${username.value}`)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err); // no need for a next cause is the browser
      });
  }
};

window.addEventListener('load', main);
