const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");

let users = [];
getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: formatCurrency(Math.floor(Math.random() * 1000000))
  };

  addData(newUser);

  updateDOM(users);
}
function addData(obj) {
  users.push(obj);
}

function updateDOM(providedData = users) {
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  providedData.forEach(item => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${item.money}`;
    main.appendChild(element);
  });
}

function formatCurrency(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

addUserBtn.addEventListener("click", getRandomUser);
