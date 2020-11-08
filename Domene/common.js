import drinks from "./drinks.js";
import desserts from "./desserts.js";

// Constants

const localStorageOrdersName = "orders";
const localStorageOrdersDraftName = "orders-draft"; // Orders in draft is stored here. Not shown in "Kassasystem"
const localStorageUserIdName = "userId";

const orderStatus = {
  DRAFT: "Kladd",
  IN_PROGRESS: "Tilberedes på kjøkkenet",
  DONE: "Ferdig ✅",
  CANCELLED: "Kansellert ❌"
};

// User management

/**
 * Get the current 'logged in' user.
 * Currently just a string from local storage.
 */
function getUserId() {
  return localStorage.getItem(localStorageUserIdName);
}

/**
 * Sets the current user id to local storage and prepares a new order.
 * Can also be used to clear an order since it cleares the order for the specified user.
 *
 * @param {string} userId - can be anything; a nickname, full name or email
 */
export function setUserId(userId) {
  localStorage.setItem(localStorageUserIdName, userId);
  localStorage.setItem(
    localStorageOrdersDraftName,
    JSON.stringify({
      ...getDraftOrders(),
      [userId]: getEmptyDraftOrder(),
    })
  );
}

/**
 * Check whether the user is logged in
 */
function isLoggedIn() {
  return getUserId() ? true : false
}

/**
 * If user is not logged in, redirect to login page..
 */
export function checkLoginOrRedirect() {
  if(!isLoggedIn()) {
    window.location.replace(`../Login_Page/LoginPage.html`);
  }
}

/**
 * If user is not logged in, redirect to login page..
 */
export function checkLoginOrRedirectKasseSystem() {
  if(!isLoggedIn()) {
    window.location.replace(`../Home_Page/HomePage.html`);
  }
}

export function logout() {
  localStorage.removeItem(localStorageUserIdName)
}

// Drink management

/**
 * Adds a drink to the cart for the current logged in user.
 *
 * @param {string} name name of the drink how it appears in the drinks.js data structure
 * @param {string} size size of the drink. Allowed values are: small, medium, large,
 * @param {number} quantity number of drinks to add to cart
 */
export function addDrinkToCart(name, size, quantity, other) {
  const drink = getDrink(name);
  addToCart(
    getUserId(),
    {
      key: generateUUID(),
      price: drink.size[size].price,
      description: `${drink.name} - ${drink.size[size].name}`,
      other: other
    },
    quantity
  );
}

/**
 * Gets a drink by name from the drinks.js data structure.
 *
 * @param {string} name name of the drink how it appears in the drinks.js data structure
 */
export function getDrink(name) {
  return drinks[name];
}

// Dessert management

/**
 * Adds a dessert to the cart for the current logged in user.
 *
 * @param {string} name name of the dessert how it appears in the desserts.js data structure
 * @param {number} quantity number of desserts to add to cart
 */
export function addDessertToCart(name, quantity, other) {
  const dessert = getDessert(name);
  addToCart(
    getUserId(),
    {
      key: generateUUID(),
      price: dessert.price,
      description: dessert.name,
      other: other
    },
    quantity
  );
}

/**
 * Gets a drink by name from the drinks.js data structure.
 *
 * @param {string} name name of the drink how it appears in the drinks.js data structure
 */
export function getDessert(name) {
  return desserts[name];
}

// Cart management

/**
 * Add a generic item to the cart and calculates the current total.
 * Currently *not* incrementing the quantity if duplicate items are added.
 *
 * @param {string} userId to which user id to add to its cart
 * @param {string} item either a drink (drinks.js) or dessert (desserts.js)
 * @param {number} quantity number of items in order
 */
function addToCart(userId, item, quantity = 1) {
  const order = getOrderDraftByUserId(userId);
  const orderLines = [
    ...(order?.orderLines ?? []),
    {
      key: item.key,
      quantity: quantity,
      singlePrice: item.price,
      price: item.price * quantity,
      description: item.description,
      other: item.other
    },
  ];
  const currentTotal = orderLines
    .map((orderLine) => orderLine.price)
    .reduce((prev, next) => prev + next);

  localStorage.setItem(
    localStorageOrdersDraftName,
    JSON.stringify({
      ...getDraftOrders,
      [userId]: {
        ...order,
        total: currentTotal,
        orderLines: orderLines,
      },
    })
  );
}

/**
 * Remove a order line by key for the current logged in user
 * @param {string} key the key identifyer for the order line
 */
export function removeOrderLineForLoggedInUser(key) {
  const userId = getUserId();
  const order = getOrderDraftByUserId(userId);
  const orderLines = order.orderLines.filter(
    (orderLine) => orderLine.key !== key
  );
  const currentTotal = orderLines
    .map((orderLine) => orderLine.price)
    .reduce((prev, next) => prev + next, 0);

  localStorage.setItem(
    localStorageOrdersDraftName,
    JSON.stringify({
      ...getDraftOrders,
      [userId]: {
        ...order,
        total: currentTotal,
        orderLines: orderLines,
      },
    })
  );
}

/**
 * Update the quantity for the order line by key
 * @param {*} key the key identifyer for the order line
 * @param {*} quantity the new quantity
 */
export function updateOrderLineQuantityForLoggedInUser(key, quantity) {
  const userId = getUserId();
  const order = getOrderDraftByUserId(userId);
  const orderLines = order.orderLines.map((orderLine) =>
    orderLine.key === key
      ? {
          ...orderLine,
          quantity: quantity,
          price: orderLine.singlePrice * quantity,
        }
      : orderLine
  );
  const currentTotal = orderLines
    .map((orderLine) => orderLine.price)
    .reduce((prev, next) => prev + next, 0);

  localStorage.setItem(
    localStorageOrdersDraftName,
    JSON.stringify({
      ...getDraftOrders,
      [userId]: {
        ...order,
        total: currentTotal,
        orderLines: orderLines,
      },
    })
  );
}

/**
 * Gets the current total of the logged in user
 * @returns {number} the current total
 */
export function getCurrentTotalForLoggedInUser() {
  const userId = getUserId();
  const order = getOrderDraftByUserId(userId);
  return order.total;
}

/**
 * Gets the order key for the logged in user
 */
export function getOrderKeyForLoggedInUser() {
  const userId = getUserId();
  const order = getOrderDraftByUserId(userId);
  return order.key;
}

/**
 * Gets the order lines of the logged in user
 */
export function getOrderLinesForLoggedInUser() {
  const userId = getUserId();
  const order = getOrderDraftByUserId(userId);
  return order.orderLines;
}
/**
 * Gets the order line by key for the logged in user
 * @param {string} key the key identifyer for the order line
 */
export function getOrderLineForLoggedInUser(key) {
  const userId = getUserId();
  const orderLines = getOrderDraftByUserId(userId).orderLines;

  return orderLines.find((orderLine) => orderLine.key === key);
}

/**
 * Returns all orders for the current logged in user
 */
export function getOrderHistoryForLoggedInUser() {
  const userId = getUserId();
  const orders = getOrders();
  return orders?.filter(order => order.userId === userId) ?? [];
}


/**
 * Gets the current order for the specified user from local storage.
 *
 * @param {string} userId to which user it concerns
 */
function getOrderDraftByUserId(userId) {
  const orders = getDraftOrders();
  return orders[userId];
}

/**
 * Get all draft orders from the local storage
 */
function getDraftOrders() {
  return JSON.parse(localStorage.getItem(localStorageOrdersDraftName));
}

export function getOrdersInProgress() {
  const orders = getOrders();
  return orders.filter((order) => order.orderStatus === orderStatus.IN_PROGRESS);
}

/**
 * Get all orders from the local storage
 */
export function getOrders() {
  return JSON.parse(localStorage.getItem(localStorageOrdersName));
}

/**
 * Get order by key
 * @param {string} key 
 */
export function getOrderByKey(key) {
  return getOrders().find(order => order.key === key);
}

/**
 * Gets an empty order draft with an unique key identifier
 */
function getEmptyDraftOrder() {
  return {
    key: generateUUID(),
    total: 0,
    orderLines: [],
    orderStatus: orderStatus.DRAFT,
  };
}

/**
 * Change the status for an order from DRAFT to IN_PROGRESS for the currently logged in user.
 * Moves the order from 'order-draft' to 'order' and gives the order an unique key.
 */
export function changeOrderStatusToInProgress() {
  const userId = getUserId();
  const order = getOrderDraftByUserId(userId);

  // Move from draft orders to orders
  localStorage.setItem(
    localStorageOrdersName,
    JSON.stringify([
      ...(getOrders() ?? []),
      {
        ...order,
        orderStatus: orderStatus.IN_PROGRESS,
        userId: userId,
      },
    ])
  );

  // remove draft order
  localStorage.setItem(
    localStorageOrdersDraftName,
    JSON.stringify({
      ...getDraftOrders(),
      [userId]: getEmptyDraftOrder(),
    })
  );
}

/**
 * Change the status from IN_PROGRESS to CANCELLED
 * @param {string} key the key identifyer for the order
 */
export function changeOrderStatusToCancelled(key) {
  const orders = getOrders().map((order) => order.key === key ? { ...order, orderStatus: orderStatus.CANCELLED } : order)
  localStorage.setItem(
    localStorageOrdersName,
    JSON.stringify([...orders])
  );
}

/**
 * Change the status from IN_PROGRESS to DONE
 * @param {string} key the key identifyer for the order
 */
export function changeOrderStatusToDone(key) {
  const orders = getOrders().map((order) => order.key === key ? { ...order, orderStatus: orderStatus.DONE } : order)
  localStorage.setItem(
    localStorageOrdersName,
    JSON.stringify([...orders])
  );
}

/**
 * Generates a random uuid
 */
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
