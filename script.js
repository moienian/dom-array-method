const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleMoneyBtn = document.getElementById("double-money");
const sortBtn = document.getElementById("sort");
const showMillionairesBtn = document.getElementById("show-millionaires");
const calculateBtn = document.getElementById("calculate-wealth");

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
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);

  updateDOM(users);
}

function doubleMoney() {
  users = users.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

function sortByRichest() {
  users.sort((a, b) => b.money - a.money);

  updateDOM();
}

function showMillionaires() {
  const millionairesUsers = users.filter(item => {
    return item.money >= 1000000;
  });
  updateDOM(millionairesUsers);
}

function calculateSum() {
  const sum = users.reduce((acc, user) => acc + user.money, 0);
  showSum(sum);
}

function showSum(sum) {
  const el = document.createElement("div");
  el.classList.add("sum");
  el.innerHTML = `<strong>Total:</strong> ${formatCurrency(sum)}`;
  main.appendChild(el);
}

function addData(obj) {
  users.push(obj);
}

function updateDOM(providedData = users) {
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  providedData.forEach(item => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatCurrency(
      item.money
    )}`;
    main.appendChild(element);
  });
}

function formatCurrency(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

addUserBtn.addEventListener("click", getRandomUser);
doubleMoneyBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateBtn.addEventListener("click", calculateSum);
