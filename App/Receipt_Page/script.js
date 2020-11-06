import {
  getOrderByKey,
  checkLoginOrRedirect
} from "../../Domene/common.js";

// redirects user to login screen if not logged in.
checkLoginOrRedirect();

const urlParams = new URLSearchParams(window.location.search);
const orderKey = urlParams.get("order");
const order = getOrderByKey(orderKey);

// Set the current total on page load
const totalElement = document.querySelector("#total");
totalElement.innerHTML = `${order.total}`;

const orderLinesElement = document.querySelector("#orderLines");
const orderLines = order.orderLines;
orderLines.forEach((orderLine) => {
  const orderLineElement = createOrderLineElement(orderLine);
  orderLinesElement.appendChild(orderLineElement);
});

/**
 * Creates an order line element.
 * @param {*} orderLine an order line from the order in local storage
 */
function createOrderLineElement(orderLine) {
  const element = document.createElement("div");
  element.classList.add("orderLine");

  const titleElement = document.createElement("div");
  titleElement.classList.add("normaltext");
  titleElement.innerHTML = `${orderLine.quantity}x ${orderLine.description}, ${orderLine.price} kr`;

  element.appendChild(titleElement);
  return element;
}

document.getElementById("alert").onclick = () => alertFunction();
function alertFunction() {
  alert("Kvittering sendt!");
}
