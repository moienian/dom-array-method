const main = document.getElementById("main");

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const user = await res.json();

  const firstName = user.results[0].name.first;
  const lastName = user.results[0].name.last;

  const element = document.createElement("div");
  element.classList.add("person");
  element.innerHTML = `<h3>${firstName} ${lastName}</h3> ${randomNumber()}`;

  main.appendChild(element);
}

function randomNumber() {
  const number = Math.floor(Math.random() * 1000000);
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
