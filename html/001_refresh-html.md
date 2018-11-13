# HTML Refresh

> HTML Tags mark up the documents content. When the browser parses the document it creates the HTML elements and DOM is generated.

* The `<div>` tag defines a division or a section in an HTML document. The `<div>` element is often used as a container for other HTML elements to style them with CSS or to perform certain tasks with JavaScript.

* Every HTML element has a default display value depending on what type of element it is. The default display value for most elements is block or inline.

* A block-level element always starts on a new line and takes up the full width available (stretches out to the left and right as far as it can). `<div>`

> The `<div>` element is a block-level element. Here is the list of other block level elements [Source](https://www.w3schools.com/html/html_blocks.asp)

* An inline element does not start on a new line and only takes up as much width as necessary. Usually it's `<span>, <b>, <i>, <img>, <input>, <label>`

* The `<div>` element is often used as a container for other HTML elements. The `<div>` element has no required attributes, but `style, class and id` are common.

* When used together with CSS, the `<div>` element can be used to style blocks of content.

### HTML Layout Elements

* Websites often display content in multiple columns (like a magazine or newspaper)

* HTML5 offers new semantics elements that define the different parts of a web page:

* <header> - Defines a header for a document or a section
* <nav> - Defines a container for navigation links
* <section> - Defines a section in a document
* <article> - Defines an independent self-contained article
* <aside> - Defines content aside from the content (like a sidebar)
* <footer> - Defines a footer for a document or a section
* <details> - Defines additional details
* <summary> - Defines a heading for the <details> element

![HTML5](https://www.w3schools.com/html/img_sem_elements.gif)

> The div element should be used only when no other semantic element (such as `<article>` or `<nav>`) is appropriate. 

* There are five different ways to create multicolumn layouts. Each way has its pros and cons:

* HTML tables (not recommended): The `<table>` element was not designed to be a layout tool! The purpose of the `<data>`element is to display tabular data.
* CSS Float property: It is common to do entire web layouts using the CSS float proprty. Disadvantages: it's pain in the ass!
* CSS Flexbox: use of flexbox ensures that elements behave predictably when the page layout must accomodate different screen sizes and different display devices.
* CSS Grid: The CSS Grid View Module offers a grid-based layout system, with rows and columns, making it easier to design web pages without having to use floats and positioning.
