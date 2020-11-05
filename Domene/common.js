import drinks from './drinks.js';

const localStorageOrdersName = "orders";
const localStorageUserIdName = "userId";

export function addDrinkToCart(name, size) {
    const drink = getDrink(name);
    addToCart(getUserId() ,{
        key: drink.name,
        price: drink.size[size].price,
        description: `${drink.name} - ${drink.size[size].name}`
    });
}

function getDrink(name) {
    return drinks[name];
}

function getUserId() {
    return localStorage.getItem(localStorageUserIdName);
}

export function setUserId(userId) {
    localStorage.setItem(localStorageUserIdName, userId)
    localStorage.setItem(localStorageOrdersName, JSON.stringify({
        [userId]: {
            total: 0,
            orderLines: []
        },
    }));
}

function addToCart(userId, item) {
    const order = getOrdersByUserId(userId);
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

function getOrdersByUserId(userId) {
    const orders = JSON.parse(localStorage.getItem(localStorageOrdersName));
    return orders[userId];
}

function getOrders() {
    return JSON.parse(localStorage.getItem(localStorageOrdersName));
}

