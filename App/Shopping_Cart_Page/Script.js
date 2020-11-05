import { removeOrderLineFromOrderForLoggedInUser, getCurrentTotalForLoggedInUser, getOrderLinesForLoggedInUser } from "../../Domene/common.js";

// Set the current total on page load
const totalElement = document.querySelector('#total');
totalElement.innerHTML = `${getCurrentTotalForLoggedInUser()}`;

const orderLinesElement = document.querySelector('#orderLines');
const orderLines = getOrderLinesForLoggedInUser();
orderLines.forEach((orderLine) => {
    const orderLineElement = createOrderLineElement(orderLine);
    orderLinesElement.appendChild(orderLineElement);
})

/**
 * Creates an order line element.
 * @param {*} orderLine an order line from the order in local storage
 */
function createOrderLineElement(orderLine) {
    const element = document.createElement('div');
    element.classList.add('orderLine');
    
    const titleElement = document.createElement('div');
    titleElement.classList.add("normaltext")
    titleElement.innerHTML = `${orderLine.quantity}x ${orderLine.description}, ${orderLine.price} kr`

    const xButton = document.createElement('button');
    xButton.classList.add('small-button');
    xButton.innerHTML = "x";

    // Remove the order line, update the total and remove the entire order line event when clicked
    xButton.onclick = () => {
        removeOrderLineFromOrderForLoggedInUser(orderLine.key);
        totalElement.innerHTML = `${getCurrentTotalForLoggedInUser()}`;
        orderLinesElement.removeChild(element);
    }

    element.appendChild(titleElement);
    element.appendChild(xButton);

    return element;
}


