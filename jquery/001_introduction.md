# JQuery Basics

[Treehouse Course](https://teamtreehouse.com/library/what-is-jquery)

DOM (document object model) is the representation of the webpage. Sort of like a blueprint containing all of your webpages content and elements. You can use JS or JQuery to access this elements on the blueprint and tell the browser how this elements should display and behave. 

With JQuery you use css selectors to select all elements on a page and do something with them. You essentially say please locate on my webpage and html element or collection of elements with the class of .x or id of #y and do something with them. What we can do with Jquery?
    + create
    + insert
    + remove
    + hide
    + make bigger or smaller
    + change text/color
    + modify html attributes and so on

`JQuery()`is a JavaScript function, like any other function. JQuery is just JavaScript, it's essentially collection of functions that makes it easier working with the DOM. You can select an element by `JQuery('.box')` once you have selected an element you can change, animate or manipulate that element. There is a shorthand for the `JQuery()` function, you can use `$()`.

```js
JQuery('.box').hide()
$('.box').hide() 
``` 
Both are the same functions.

### Click event

JQuery clicks method is part of the group of methods that listen for and run code in response to an action that has occured on your webpage. Like the user clicking the button, submitting the form, moving mouse around the screen. With JQuery you select an element using css selector `$('.box')` then you use click method to do something with the element you have just selected by passing a callback function `$('.box').click(() => alert('You clicked here'))`