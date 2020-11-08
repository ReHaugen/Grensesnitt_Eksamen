# Group 24 - EivindCafé☕️
Semester task - DS3801 Grensesnittdesign - Kristiania University College. 

## Customer app: 
![](Images/app.gif)

## Cash register system for employees:

## Table of contents
1. [Quick start. ](#start)
2. [About. ](#about)
3. [Concept and prototype. ](#concept)
4. [Logo. ](#logo)
5. [Class description. ](#classdescription)
6. [Technology used. ](#technology) 

<a name="start"></a>
## Quick start:
* Clone the repositiry to your local machine. 
* Open the folder where you saved the repository.
* Open index.html in your favourite browser.
* NB. For the best user experience, open the app [in mobile version mode](https://www.cqlcorp.com/insights/how-to-view-the-mobile-version-of-a-website-on-your-desktop/)

<a name="about"></a>
## About the project:
* The project started 07.09.2020 and lasted to 09.11.2020.
* We are three students collaborating on this exam project. 
* In this assignment, we will create a cash register system for employees and an app for customers in Eivind's café. The solution we create will be intuitive, efficient and simple to understand and use. 
* The target group is students, because they often but coffee on the go, work in cafes and use cafes when they study. Therefore, we have tried to get a stylish and consistent design. But of course we want the solution to be used by everyone, so the main focus is simplicity.
* We strive to meet the users expectations and needs, as quickly and dependably as possible.
* In the app, which will primarily be used on mobile phones, customers can order certain products or an order that contains several different products. The user can also see an overview of the total price of an order, be able to add more than one item to their order, remove items from the order and see an overview of previous orders. 
* In the cash register system, which is not primarily on the phone, the employee can choose which employee is logged in, complete orders and see an overview of previous orders. They can also see orders coming from the customers app and tap that it is complete when done.
* The orders, even drafts, are stored in the Local Storage of your web browser.

<a name="concept"></a>
## Concept and prototype: 
* Through qualitative interviews, we came to the conclusion that it is important for the user that the solution is easy to use, easily accessible, it must be aesthetically pleasing and they must receive good information about the actions they do. This was what we had in mind when we made thread sketches and flow charts, and at last the clickable, finished prototype of what the finished product should look like.
* The clickable finished prototype is clear, intuitive and easy to use as you can see for yourself below. 
* We made the prototypes in Adobe XD. 

### App prototype:
https://xd.adobe.com/view/801e8487-66c4-492e-bc81-af03c40a28bb-d54d/ <br/>
![](Images/app-prototype.gif) 

### Cash register system prototype: 
https://xd.adobe.com/view/d9408b03-aea0-4d67-bcf2-b3519c99ca66-8c13/ <br/>
![](Images/cashregistersystem-prototype.gif)

<a name="logo"></a>
## Logo: 
* We think it is important to have a logo to make the page unique, recognizable and it will work as a kind of jewelry on the page. We did it the easy way and made a logo out of a cool font that we liked called "Lobster" that seemed like a good fit for a cafe. Then we added an icon of coffeebeans. 
* The advantages of using a font and icon as a logo instead of an image - except that it is quick and easy - are that you can style it as you wish. Make it bigger, smaller, with shadows and fit the logo to the different pages. Below you can see the logo how it looks in the front page and in the other pages.  
* We styled the logo in warm earth tones that blended in perfectly with the rest of the clean design. This gives the page that delicate feeling that reminds us of a good cup of coffee. <br/>
![](Images/logo1.png) <br/>
![](Images/logo2.png)

<a name="classdescription"></a>
## Class description: 

### Customer app
* **<ins>Login page: </ins>** This page is the front page of EivindCafés order app where the customer either log in or use the app as an anonymous guest. The main function here is to navigate the customer on to the menu where they can place their order. 

* **<ins>Menu page: </ins>** On the menu page the customer can see all the items from the drink and dessert menu, and add the the suff they want to order in the shopping cart. When they click on the coffees they will get an popup menu where they can choose between small, medium and large beverages. 

* **<ins>Shopping cart page: </ins>** Is where you get an overview of everything you have added to the cart. You can adjust the number with plus- and minus buttons and you can remove items you dont want anymore. Then you click on one of the pay-buttons that will take you further to the next page. 

* **<ins>Receipt page: </ins>** Will show you what you ordered and paid for. 

* **<ins>Profile page: </ins>** Consists of four buttons, where the first one "order history" will show you all the orders you have placed and paid for earlier. The two next buttons is for the customer to be able to change profile- and app settings. We have not added any function here for now, but this can be a nice hobby project for us later when we dont have time pressure. The last button is a log out button, that takes you to the first page "login page". 

* **<ins>Order history page: </ins>** Will show the user all the previous orders that has been placed. 

### Employee cash register system 
* **<ins>Login page: </ins>** The front page of the cash register system where the employees enter their employee number and password. This takes you further to the navigation page. 

* **<ins>Navigation page: </ins>** This is where the employee choose between making an order for the customer, see the orders which has come from the customer app or watch orders that are finished in the order history page. 

* **<ins>Order page: </ins>** This page holds the drink- and dessert menu and the shopping cart. 

* **<ins>Orders in progress page: </ins>** When the employee has placed an order manually for a customer or a customer has ordered through the app, it will show here. And this is where the employees keep track of the ordres they need to prepare, befor they either press the finish og the cancel order button. 

* **<ins>Order history page: </ins>** When orders are done, they end up here. 

<a name="technology"></a>
## Technology used
* To create this project we have used different technologies to make it look good and work smooth:
* Storing and retrieving information in local storage. 
* CSS3: Flexbox, grid, psuedo elements.  
* HTML5: Syntax elements. 
* Vanilla JavaScript: ES6, modules. 
