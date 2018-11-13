# Flexbox Tutorial 

* [Source](https://flexbox.io/)
* [The full reference about Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

```html
 <div class="container">
    <div class="box box1">1</div>
    <div class="box box2">2</div>
    <div class="box box3">3</div>
    <div class="box box4">4</div>
    <div class="box box5">5</div>
    <div class="box box6">6</div>
    <div class="box box7">7</div>
    <div class="box box8">8</div>
    <div class="box box9">9</div>
    <div class="box box10">10</div>
  </div>
  
 // flex container and items:

<div class="bg-white text-5xl flex border ">
    <div class="bg-red text-white py-8">1</div>
    <div class="bg-blue text-white py-8">2</div>
    <div class="bg-green text-white py-8">3</div>
    <div class="bg-purple text-white py-8">4</div>
    <div class="bg-grey text-white py-8">5</div>
    <div class="bg-orange text-white py-8">6</div>
    <div class="bg-green text-white py-8">7</div>
    <div class="bg-yellow text-white py-8">8</div>
    <div class="bg-red  text-white py-8">9</div>
    <div class="bg-purple text-white py-8">10</div>
  </div>
``` 
* In the example above you see the flex container and nested are flex items. This don't to have be `divs` it can be paragraphs, images, sections Whatever you want!

* When we are defining `flex-direction` we have two axises. We have the main axis:

- If the direction is row the `main axis` is from left to right!
- If the direciton is row we have the `cross axis` that goes from top to bottom

![Axis](https://css-tricks.com/wp-content/uploads/2011/08/flexbox.png)


- If the direciton is column the `main axis` is going to be from top to bottom
- If the direciton is column the `cross axis` is going from left to right!

![Axis](https://i.stack.imgur.com/yE7AF.png)

* The nature of flexbox is is going to try to work with the `width` that you gave it but if it's not going to work out it will evenly distribute the items. But if you would show the item with a full width, you can use `flex-wrap` in order to force items to be in the same width you give it to flex.

**Note:** By default there is `flex-wrap: no-wrap`. If we change the direction of wrap to `flex-wrap: wrap-reverse;` the main axis stays the same from left to right, but the cross-axis goes from bottom to top instead of top to bottom.

* Flexbox order starts with `0` as the base number, so if you add e.g. `order: 1` to some element it will go up to the end, since all the other items have `order: 0` by default.

#### Justify-Content

* Justify content says how the content is aligned on the main axis. 

* The main axis by default is from left to right, across the screen. The cross axis is from top to bottom across the screen.

* `justify-content: flex-start` is the default, because items are aligend from left to right inside the container. This is a default setting of justify-content.

* `justify-content: flex-end` will move all the items to the end of the flex container. The flex container in our case is a `<div>` and the `<div>` element is a block level element, it always starts on a new line and takes up the full width.

* `justify-content: space-between` will evenly distribute all items inside the flexbox container. It will distribute the items alongs the main axis.

* When we switch the `flex-direction:` from `row` to `column` in order to use the `space-between` we need to give a container a height `min-height:` so it can evenly distribute the items. Otherwise it will just fill the current space without the spaces in between.

* When you do `justify-content` always ask where is my `main axis` where is my `cross axis`. 

> `justify-content` aligns the items on the main axis. By default the main axis is left to right and cross axis from top to bottom. 

#### Align Items

> The difference here is that we are not concerned about main axis, we are concerned about the cross axis. Which is by default top to bottom. 

* If you use the `align-items: center` in the block on the main axis nothing will happen. But if we'll give hight to the container and use `align-itmes: center` is will automatically put it in the middle of the screen, in the middle of the `cross-axis`. 

* By default the `align-items: stretch` is set to strech, will will stretch the elements evenly along the `cross-axis`. 

* We can use `align-items: center` to align items in the center of the container. But we can also use `align-itmes: flex-start` to align items of the start of the container, even the space is much more bigger such as the whole screen. 

* If you want to center something in the middle of the screen, you can use the comibation `justify-content: center; align-items: center` and it will automatically put the content in the middle of the screen. You need to add `height: 100vh` so you can use the whole available screen.

* `align-items: baseline` aligns the items on the same line e.g. you have items with different sizes, they will be aligned on the baseline exactly in the middle. 

![Base](https://css-tricks.com/wp-content/uploads/2018/10/align-items.svg)


