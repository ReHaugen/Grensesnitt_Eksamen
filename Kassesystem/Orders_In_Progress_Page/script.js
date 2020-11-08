import {
  checkLoginOrRedirectKasseSystem,
  getOrdersInProgress,
  changeOrderStatusToDone,
  changeOrderStatusToCancelled
} from "../../Domene/common.js";
checkLoginOrRedirectKasseSystem();

const orders = getOrdersInProgress();
const orderHistoryElement = document.querySelector("#orders");

if (orders.length === 0) {
  noOrdersMessage();
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
  titleElement.innerHTML = `Ordre #${order.key.substring(0, 5)} (${
    order.userId
  })`;
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

  // Button container
  const buttonContainer = document.createElement('div')
  buttonContainer.classList.add('buttonContainer')
  element.appendChild(buttonContainer)

  // Cancel button
  const cancelButton = document.createElement("button");
  cancelButton.innerHTML = "KANSELLER";
  cancelButton.classList.add("large-button");
  buttonContainer.appendChild(cancelButton);

  cancelButton.onclick = () => {
    const consentToCancel = confirm("Er du sikker på at du vil kansellere denne orderen?");
    if(consentToCancel) {
      changeOrderStatusToCancelled(order.key)
      orderHistoryElement.removeChild(element);
      if(orderHistoryElement.children.length === 0) {
        noOrdersMessage()
      }
    }
  }

  // Done button
  const doneButton = document.createElement("button");
  doneButton.innerHTML = "FERDIG";
  doneButton.classList.add("large-button");
  buttonContainer.appendChild(doneButton);

  doneButton.onclick = () => {
    changeOrderStatusToDone(order.key);
    orderHistoryElement.removeChild(element);
    if(orderHistoryElement.children.length === 0) {
      noOrdersMessage()
    }
  }

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
  
  // Other text
  if (orderLine.other && orderLine.other.length !== 0) {
    const otherElement = document.createElement("div");
    otherElement.innerHTML = `* ${orderLine.other}`;
    otherElement.classList.add("normaltext");
    otherElement.classList.add("other");
    element.appendChild(otherElement);
  }

  return element;
}


function noOrdersMessage() {
  orderHistoryElement.innerHTML = "<p class='normaltext'>Her var det tomt. Det er ingen ordrer som venter akkurat nå.</p>";
}