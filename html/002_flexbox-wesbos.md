# Flexbox Tutorial 

[Source](https://flexbox.io/)

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
