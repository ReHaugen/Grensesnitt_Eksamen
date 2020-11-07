import { checkLoginOrRedirectKasseSystem, getOrders } from '../../Domene/common.js'
checkLoginOrRedirectKasseSystem();

const orders = getOrders();
const orderHistoryElement = document.querySelector("#orders");

if (orders.length === 0) {
  orderHistoryElement.innerHTML =
    "<p class='normaltext'>Her var det tomt. Hva med å legge inn en ny bestilling?</p>";
} else {
  orders.forEach((order) =>
    orderHistoryElement.appendChild(createOrderHistoryElement(order))
  );
}

/**
 * Creates an order history element
 * @param {*} order order from the order in local storage
 */
function createOrderHistoryElement(order) {
  const element = document.createElement("div");
  element.classList.add("order");

  // Title
  const titleElement = document.createElement("h3");
  titleElement.innerHTML = `Ordre #${order.key.substring(0, 5)} (${order.userId})`;
  titleElement.classList.add("normaltext");
  titleElement.classList.add("title");
  element.appendChild(titleElement);

  // Status
  const statusElement = document.createElement("span");
  statusElement.innerHTML = `Status: ${order.orderStatus}`;
  statusElement.classList.add("normaltext");
  statusElement.classList.add("status");
  element.appendChild(statusElement);
  
  // Order lines
  order.orderLines.forEach((orderLine) =>
    element.appendChild(createOrderLineElement(orderLine))
  );

  // Sum
  const sumElement = document.createElement("span");
  sumElement.innerHTML = `SUM: ${order.total} kr`;
  sumElement.classList.add("normaltext");
  sumElement.classList.add("sum");
  element.appendChild(sumElement);

  return element;
}

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
