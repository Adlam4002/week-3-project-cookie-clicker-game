console.log("Hello world!");
let cookieCounter = 1;
let cps = 1;

// need dom manipulation
// need a cookie count
// need to see cps
// need cookie picture to click on
// select or these items from the dom or create them with JS
let shopItems = [];
// need a way to store the shop item that we get from the API
// fetch the items from the API async and await
//fetch the shop items from API
//turn the data into json, use .json()
//put the items in the shop items array
async function getShopItems() {
  let response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  let shopData = await response.json();
  console.log(shopData);
  shopItems = shopData;
  renderShop();
}

getShopItems();
console.log(shopItems);
function updateCookieDisplay() {
  cookieDisplay.textContent = `Cookies: ${cookieCounter}`;
  cpsDisplay.textContent = `Cookies per second: ${cps}`;
  saveLocalStorage();
}
let midSection = document.querySelector("#smiddle");
function makeCookieDispay(x) {
  let box = document.createElement("h1");
  box.textContent = `Cookies: ${x}`;
  box.id = "cBox";
  midSection.appendChild(box);
}
function makeCPSDispay(x) {
  let box = document.createElement("h1");
  box.textContent = `Cookies per second: ${x}`;
  box.id = "cpsBox";
  midSection.appendChild(box);
}
makeCookieDispay(cookieCounter);
makeCPSDispay(cps);
let cookieDisplay = document.querySelector("#cBox");
let cpsDisplay = document.querySelector("#cpsBox");
let shopDisplay = document.querySelector("#sright");
let cBut = document.querySelector("#cookie-button");

cBut.addEventListener("click", () => {
  cookieCounter++;
  updateCookieDisplay();
  //   console.log(cookieCounter);
});
setInterval(function () {
  cookieCounter += cps;
  updateCookieDisplay();
}, 1000);
let reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  cookieCounter = 0;
  cps = 1;
});
// ------------------------------------------add event lisntener to the cookie
// ------------------------------------------select the cookie from the dom and then need to add even listner
// ------------------------------------------when I click, the value of the cookieCounter goes up by 1
// ------------------------------------------goog ethe increment operator (just one way of doing it)

// need to have all the game information in one function

// i need to check if there are any values stored in local storage  (need to atleast be storing cookieCounter and cps --> the version in local storage is more up to date.)
// need to load the game to start the game could have a function, load(), that calls the game function
// fetch the shop items
// display the shop items on the page
// we need a timer to increase our cookies each second --> setInterval two parameters  first is the function to add cps to the cookieCounter, second is the tiome interval in ms (1000ms)
// i want to update the value displayed on the page --> for more control this couls be in a seperate dfunction that is called inside the interval, updateDisplay()
// I want to update the value in local storage --> this couls also be a seperate function called within the interval, saveLocalStorage()

// Extra tools if I want to use them to seperate different tasks into different functions. -->
// need a method to turn the data into strings
// need a method to set the items using key and value in local storage

function saveLocalStorage() {
  localStorage.setItem("cookieCounter", cookieCounter);
  localStorage.setItem("cps", cps);
}
let loadedCookies = localStorage.getItem("cookieCounter");
let loadedCPS = localStorage.getItem("cps");
let parsedCookies = JSON.parse(loadedCookies);
let parsedCPS = JSON.parse(loadedCPS);
function loadPrevious() {
  if (localStorage.getItem("cookieCounter")) {
    cookieCounter = parsedCookies;
  }
  if (localStorage.getItem("cps")) {
    cps = parsedCPS;
  }
}
loadPrevious();
function renderShop() {
  // Could create DOM elements to display shop items
  shopItems.forEach((item) => {
    let itemBox = document.createElement("div");
    itemBox.id = `shop-item-${item.id}`;
    itemBox.textContent = `${item.name}, cost: ${item.cost} cookies, Cps increase ${item.increase} `;
    shopDisplay.appendChild(itemBox);
    let itemButton = document.createElement("button");
    itemButton.textContent = "Buy";
    itemBox.appendChild(itemButton);
    itemButton.addEventListener("click", () => {
      if (cookieCounter >= item.cost) {
        cookieCounter -= item.cost;
        cps += item.increase;
        updateCookieDisplay();
      }
    });
    //loop through array and create the elements you want
  });
}
// renderShop();
