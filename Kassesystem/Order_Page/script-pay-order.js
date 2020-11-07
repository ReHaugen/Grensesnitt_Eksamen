import {
  removeOrderLineForLoggedInUser,
  getCurrentTotalForLoggedInUser,
  getOrderLinesForLoggedInUser,
  getOrderLineForLoggedInUser,
  updateOrderLineQuantityForLoggedInUser,
  changeOrderStatusToInProgress,
} from "../../Domene/common.js";

// Set the current total on page load
const totalElement = document.querySelector("#total");
totalElement.innerHTML = `${getCurrentTotalForLoggedInUser()}`;

const orderLinesElement = document.querySelector("#orderLines");
let orderLines = getOrderLinesForLoggedInUser();
orderLines.forEach((orderLine) => {
  const orderLineElement = createOrderLineElement(orderLine);
  orderLinesElement.appendChild(orderLineElement);
});

payEventListener();

/**
 * Creates an order line element.
 * @param {*} orderLine an order line from the order in local storage
 */
export function createOrderLineElement(orderLine) {
  const element = document.createElement("div");
  element.classList.add("orderLine");

  const titleElement = document.createElement("div");
  titleElement.classList.add("normaltext");
  titleElement.classList.add("title");
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
      orderLines = getOrderLinesForLoggedInUser();
      payEventListener();
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

  const buttonContainer = document.createElement('div')
  buttonContainer.appendChild(subtractButton);
  buttonContainer.appendChild(addButton);
  buttonContainer.appendChild(xButton);

  element.appendChild(titleElement);
  element.appendChild(buttonContainer)
  

   // Other text
   if(orderLine.other && orderLine.other.length !== 0) {
    const otherElement = document.createElement('div')
    otherElement.innerHTML = `* ${orderLine.other}`
    otherElement.classList.add('normaltext');
    otherElement.classList.add('other');
    element.appendChild(otherElement);
  }

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

// Add or replace event listeners to pay buttons
function payEventListener() {
  document.querySelectorAll("[name=pay]").forEach((element) => {
    if (orderLines.length == 0) {
      element.style.cursor = "not-allowed";
    } else {
      element.style.cursor = "pointer";
    }
    element.onclick = () => payForOrder();
  });
}

function payForOrder() {
  if (orderLines.length == 0) {
    alert("Du må legge noe inn i handlekurven for å kunne betale");
  } else {
    const consentToPay = confirm(
      `Er du sikker på at du vil betale ${getCurrentTotalForLoggedInUser()} kr for orderen?`
    );
    if (consentToPay) {
      changeOrderStatusToInProgress();
      clearPage();
    }
  }
}

function clearPage() {
  while (orderLinesElement.firstChild) {
    orderLinesElement.removeChild(orderLinesElement.lastChild);
  }
  updateTotal();
}

/**
 * Refresh the entire shopping cart.
 */
export function refreshShoppingCart() {
  orderLines = getOrderLinesForLoggedInUser();
  payEventListener();
  clearPage();
  orderLines.forEach((orderLine) => {
    const orderLineElement = createOrderLineElement(orderLine);
    orderLinesElement.appendChild(orderLineElement);
  });
}
