import {
  removeOrderLineForLoggedInUser,
  getCurrentTotalForLoggedInUser,
  getOrderLinesForLoggedInUser,
  getOrderLineForLoggedInUser,
  updateOrderLineQuantityForLoggedInUser,
} from "../../Domene/common.js";

// Set the current total on page load
const totalElement = document.querySelector("#total");
totalElement.innerHTML = `${getCurrentTotalForLoggedInUser()}`;

const orderLinesElement = document.querySelector("#orderLines");
const orderLines = getOrderLinesForLoggedInUser();
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

  const xButton = document.createElement("button");
  xButton.classList.add("small-button");
  xButton.innerHTML = "x";

  // Remove the order line, update the total and remove the entire order line event when clicked
  xButton.onclick = () => {
    removeOrderLineForLoggedInUser(orderLine.key);
    orderLinesElement.removeChild(element);
    updateTotal();
  };

  const subtractButton = document.createElement("button");
  subtractButton.classList.add("small-button");
  subtractButton.innerHTML = "-";

  // Subtract one from the order line
  subtractButton.onclick = () => {
    const subtractedByOne = orderLine.quantity - 1;
    if (subtractedByOne !== 0) {
      updateOrderLineQuantityForLoggedInUser(orderLine.key, subtractedByOne);
      const refreshedOrderLine = getOrderLineForLoggedInUser(orderLine.key);
      replaceOrderLineEvent(element, refreshedOrderLine);
    } else {
      removeOrderLineForLoggedInUser(orderLine.key);
      orderLinesElement.removeChild(element);
    }
    updateTotal();
  };

  const addButton = document.createElement("button");
  addButton.classList.add("small-button");
  addButton.innerHTML = "+";

  // Add one to the order line
  addButton.onclick = () => {
    const addedOne = orderLine.quantity + 1;
    updateOrderLineQuantityForLoggedInUser(orderLine.key, addedOne);
    const refreshedOrderLine = getOrderLineForLoggedInUser(orderLine.key);
    replaceOrderLineEvent(element, refreshedOrderLine);
    updateTotal();
  };

  element.appendChild(titleElement);
  element.appendChild(subtractButton);
  element.appendChild(addButton);
  element.appendChild(xButton);

  return element;
}

/**
 * Refreshes the state and replaces the element with a new one based of the new order line
 */
function replaceOrderLineEvent(element, orderLine) {
  orderLinesElement.replaceChild(createOrderLineElement(orderLine), element);
}

/**
 * Updates the total
 */
function updateTotal() {
  totalElement.innerHTML = `${getCurrentTotalForLoggedInUser()}`;
}
