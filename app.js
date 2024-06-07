console.log("Hello world!");
let cookieCounter = 1;
let cps = 1;
let shopItems = [];

async function getShopItems() {
  let response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  let shopData = await response.json();
  console.log(shopData);
  // shopData.purchase = 0;
  shopData.forEach((item) => {
    item.purchase = 0;
  });

  shopItems = shopData;
  console.log(shopItems);
  loadPrevious();
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
let leftSec = document.querySelector("#sleft");
cBut.addEventListener("click", () => {
  cookieCounter++;
  updateCookieDisplay();
});
setInterval(function () {
  cookieCounter += cps;
  updateCookieDisplay();
}, 1000);
let reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  cookieCounter = 0;
  cps = 1;
  shopItems.forEach((item) => {
    // item.purchase = 0;
    let purchasedBox = document.querySelector(`#owned-item${item.id}`);
    if (purchasedBox) {
      purchasedBox.textContent = ` `;
    }
  });
  saveLocalStorage();
  updateCookieDisplay();
});

let localItems = JSON.stringify(shopItems);
function saveLocalStorage() {
  localStorage.setItem("cookieCounter", cookieCounter);
  localStorage.setItem("cps", cps);
  localStorage.setItem("shopItems", JSON.stringify(shopItems));
}
let loadedCookies = localStorage.getItem("cookieCounter");
let loadedCPS = localStorage.getItem("cps");
let parsedCookies = JSON.parse(loadedCookies);
let parsedCPS = JSON.parse(loadedCPS);
let loadedItems = localStorage.getItem("shopItems");
let parsedItems = JSON.parse(loadedItems);

function loadPrevious() {
  if (localStorage.getItem("cookieCounter")) {
    cookieCounter = parsedCookies;
  }
  if (localStorage.getItem("cps")) {
    cps = parsedCPS;
  }
  if (localStorage.getItem("shopItems")) {
    shopItems = parsedItems;
  }
}
function renderShop() {
  shopItems.forEach((item) => {
    if (item.purchase != 0) {
      purchasedBox = document.createElement("h2");
      purchasedBox.textContent = `${item.name} owned: ${item.purchase}`;
      purchasedBox.id = `owned-item${item.id}`;
      leftSec.appendChild(purchasedBox);
    }
    console.log(item.purchase);
    let itemBox = document.createElement("div");
    itemBox.id = `shop-item-${item.id}`;
    itemBox.textContent = `${item.name}, cost: ${item.cost} cookies, Cps increase ${item.increase} `;
    shopDisplay.appendChild(itemBox);
    let itemButton = document.createElement("button");
    itemButton.textContent = "Buy";
    itemButton.id = "shop-button";
    itemBox.appendChild(itemButton);
    console.log(shopItems);
    itemButton.addEventListener("click", () => {
      if (cookieCounter >= item.cost) {
        cookieCounter -= item.cost;
        cps += item.increase;
        item.purchase++;
        let purchasedBox = document.querySelector(`#owned-item${item.id}`);
        if (purchasedBox) {
          purchasedBox.textContent = `${item.name} owned: ${item.purchase}`;
        } else {
          purchasedBox = document.createElement("h2");
          purchasedBox.textContent = `${item.name} owned: ${item.purchase}`;
          purchasedBox.id = `owned-item${item.id}`;
          leftSec.appendChild(purchasedBox);
        }
      }
      saveLocalStorage();
      updateCookieDisplay();
    });
  });
}
// renderShop();
