# DOM (Document Object Model)

[Source](https://www.youtube.com/watch?v=XD7fYLQeQIg)

* Document is just a file (html, excel, json)
* In the context of DOM we are talking about HTMl
* An (Element) Object in the DOM is anything you put inside an HTML document
	a) HTML tag is an object
	b) Body / title tag is an object
* A model is how you layout all of this structure
* HTML has different layers starting with the `<html></html>`inside it you can have 

```html
<html>
<head></head>
<body></body>
</html>
``` 
* For `<head>` the `<html>` is a direct parent and for `<body>` this `<html>` is a direct parent

```html
<html>
<head>
<title>Something</title>
</head>
<body></body>
</html>
```

* In the example above the `<title>` tag is the child of the `<head>` and the `<head>` is the parent of the `<title>` tag. 

```html
<html>
<head>
	<title>Something</title>
</head>
<body>
	<h1>Here is the header</h1>
</body>
</html>
```

* In the example above the `<h1>` is the direct child of the `<body>` tag. Also ´<div>` tags can be direct children of the `<body>.

> How you are structuring your web elements. That’s the document object model (DOM)

* `console.log(document)` prints out the entire document. It’s a big gigantic object, it has a lot of properties. If you want to access specific properties of the document, you can use e.g. `console.log(document.head)`, `console.log(document.body)`etc. or any other methods to access the properties of the document.

* You can use different methods to add new elements, review elements, change some elements of the document object.

* A "node", in this context, is simply an HTML element. The "DOM" is a tree structure that represents the HTML of the website, and every HTML element is a "node".

* The DOM is an object-oriented representation of the web page, which can be modified with a scripting language such as JavaScript.

* All of the properties, methods, and events available for manipulating and creating web pages are organized into objects (e.g., the document object that represents the document itself)

**Note:** So `document`is an object that represent the web page that can be manipulated with a scripting language such as Javascript

* A Document object represents the HTML document that is displayed in that window. The Document object has various properties that refer to other objects which allow access to and modification of document content.

* **The HTML DOM document object is the owner of all other objects in your web page. The HTML DOM model is constructed as a tree of Objects**

![Object](https://www.w3schools.com/js/pic_htmltree.gif)
