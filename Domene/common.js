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
 * @param {string} size size of the drink. Allowed values are: small, medium, large
 */
export function addDrinkToCart(name, size) {
    const drink = getDrink(name);
    addToCart(getUserId() ,{
        key: drink.name,
        price: drink.size[size].price,
        description: `${drink.name} - ${drink.size[size].name}`
    });
}

/**
 * Gets a drink by name from the drinks.js data structure.
 * 
 * @param {string} name name of the drink how it appears in the drinks.js data structure
 */
function getDrink(name) {
    return drinks[name];
}


// Dessert management

/**
 * Adds a dessert to the cart for the current logged in user.
 * 
 * @param {string} name name of the dessert how it appears in the desserts.js data structure
 */
export function addDessertToCart(name) {
    const dessert = getDessert(name);
    addToCart(getUserId() ,{
        key: dessert.name,
        price: dessert.price,
        description: drink.name
    });
}

/**
 * Gets a drink by name from the drinks.js data structure.
 * 
 * @param {string} name name of the drink how it appears in the drinks.js data structure
 */
function getDessert(name) {
    return desserts[name];
}

// Cart management

/**
 * Add a generic item to the cart and calculates the current total.
 * Currently *not* incrementing the quantity if duplicate items are added.
 * 
 * @param {string} userId to which user id to add to its cart
 * @param {string} item either a drink (drinks.js) or dessert (desserts.js) 
 */
function addToCart(userId, item) {
    const order = getOrderByUserId(userId);
    const orderLines = [...order?.orderLines ?? [], {
        key: item.key,
        quantity: 1,
        price: item.price,
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

