import drinks from './drinks.js';
import desserts from './desserts.js';

// Constants
const localStorageOrdersName = "orders";
const localStorageUserIdName = "userId";

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
    localStorage.setItem(localStorageUserIdName, userId)
    localStorage.setItem(localStorageOrdersName, JSON.stringify({
        ...getOrders(),
        [userId]: {
            total: 0,
            orderLines: []
        },
    }));
}

// Drink management

/**
 * Adds a drink to the cart for the current logged in user.
 * 
 * @param {string} name name of the drink how it appears in the drinks.js data structure
 * @param {string} size size of the drink. Allowed values are: small, medium, large,
 * @param {number} quantity number of drinks to add to cart 
 */
export function addDrinkToCart(name, size, quantity) {
    const drink = getDrink(name);
    addToCart(getUserId() ,{
        key: generateUUID(),
        price: drink.size[size].price,
        description: `${drink.name} - ${drink.size[size].name}`
    }, quantity);
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
export function addDessertToCart(name, quantity) {
    const dessert = getDessert(name);
    addToCart(getUserId(), {
        key: generateUUID(),
        price: dessert.price,
        description: dessert.name
    }, quantity);
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
    const order = getOrderByUserId(userId);
    const orderLines = [...order?.orderLines ?? [], {
        key: item.key,
        quantity: quantity,
        price: (item.price * quantity),
        description: item.description
    }];
    const currentTotal = orderLines.map(orderLine => orderLine.price).reduce((prev, next) => prev + next);

    localStorage.setItem(localStorageOrdersName, 
        JSON.stringify({ ...getOrders, 
            [userId]: {
                total: currentTotal,
                orderLines: orderLines
            }
        })
    );
}

/**
 * Remove a order line by key for the current logged in user
 * @param {string} key the key identifyer for the order line 
 */
export function removeOrderLineFromOrderForLoggedInUser(key) {
    const userId = getUserId();
    const order = getOrderByUserId(userId); 
    const orderLines = order.orderLines.filter((orderLine) => orderLine.key !== key);
    const currentTotal = orderLines.map(orderLine => orderLine.price).reduce((prev, next) => prev + next,  0);
    
    localStorage.setItem(localStorageOrdersName, 
        JSON.stringify({ ...getOrders, 
            [userId]: {
                ...order,
                total: currentTotal,
                orderLines: orderLines
            }
        })
    );
}


/**
 * Gets the current total of the logged in user
 * @returns {number} the current total
 */
export function getCurrentTotalForLoggedInUser() {
    const userId = getUserId();
    const order = getOrderByUserId(userId);
    return order.total;
}

/**
 * Gets the order lines of the logged in user
 */
export function getOrderLinesForLoggedInUser() {
    const userId = getUserId();
    const order = getOrderByUserId(userId);
    return order.orderLines;
}

/**
 * Gets the current order for the specified user from local storage.
 * 
 * @param {string} userId to which user it concerns
 */
function getOrderByUserId(userId) {
    const orders = JSON.parse(localStorage.getItem(localStorageOrdersName));
    return orders[userId];
}

/**
 * Get all orders from the local storage
 */
function getOrders() {
    return JSON.parse(localStorage.getItem(localStorageOrdersName));
}

/**
 * Generates a random uuid
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
