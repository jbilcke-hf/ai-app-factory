x-for
=====

Alpine's `x-for` directive allows you to create DOM elements by iterating through a list. Here's a simple example of using it to create a list of colors based on an array.

    <ul x-data="{ colors: ['Red', 'Orange', 'Yellow'] }">    <template x-for="color in colors">        <li x-text="color"></li>    </template></ul>
    <ul x-data="{ colors: ['Red', 'Orange', 'Yellow'] }">
        <template x-for="color in colors">
            <li x-text="color"></li>
        </template>
    </ul>

*   Red
*   Orange
*   Yellow

You may also pass objects to `x-for`.

    <ul x-data="{ car: { make: 'Jeep', model: 'Grand Cherokee', color: 'Black' } }">    <template x-for="(value, index) in car">        <li>            <span x-text="index"></span>: <span x-text="value"></span>        </li>    </template></ul>
    <ul x-data="{ car: { make: 'Jeep', model: 'Grand Cherokee', color: 'Black' } }">
        <template x-for="(value, index) in car">
            <li>
                <span x-text="index"></span>: <span x-text="value"></span>
            </li>
        </template>
    </ul>

*   make: Jeep
*   model: Grand Cherokee
*   color: Black

There are two rules worth noting about `x-for`:

> `x-for` MUST be declared on a `<template>` element. That `<template>` element MUST contain only one root element

[Keys](#keys)
-------------

It is important to specify unique keys for each `x-for` iteration if you are going to be re-ordering items. Without dynamic keys, Alpine may have a hard time keeping track of what re-orders and will cause odd side-effects.

    <ul x-data="{ colors: [    { id: 1, label: 'Red' },    { id: 2, label: 'Orange' },    { id: 3, label: 'Yellow' },]}">    <template x-for="color in colors" :key="color.id">        <li x-text="color.label"></li>    </template></ul>
    <ul x-data="{ colors: [
        { id: 1, label: 'Red' },
        { id: 2, label: 'Orange' },
        { id: 3, label: 'Yellow' },
    ]}">
        <template x-for="color in colors" :key="color.id">
            <li x-text="color.label"></li>
        </template>
    </ul>

Now if the colors are added, removed, re-ordered, or their "id"s change, Alpine will preserve or destroy the iterated `<li>`elements accordingly.

[Accessing indexes](#accessing-indexes)
---------------------------------------

If you need to access the index of each item in the iteration, you can do so using the `([item], [index]) in [items]` syntax like so:

    <ul x-data="{ colors: ['Red', 'Orange', 'Yellow'] }">    <template x-for="(color, index) in colors">        <li>            <span x-text="index + ': '"></span>            <span x-text="color"></span>        </li>    </template></ul>
    <ul x-data="{ colors: ['Red', 'Orange', 'Yellow'] }">
        <template x-for="(color, index) in colors">
            <li>
                <span x-text="index + ': '"></span>
                <span x-text="color"></span>
            </li>
        </template>
    </ul>

You can also access the index inside a dynamic `:key` expression.

    <template x-for="(color, index) in colors" :key="index">
    <template x-for="(color, index) in colors" :key="index">

[Iterating over a range](#iterating-over-a-range)
-------------------------------------------------

If you need to simply loop `n` number of times, rather than iterate through an array, Alpine offers a short syntax.

    <ul>    <template x-for="i in 10">        <li x-text="i"></li>    </template></ul>
    <ul>
        <template x-for="i in 10">
            <li x-text="i"></li>
        </template>
    </ul>

`i` in this case can be named anything you like.

> Despite not being included in the above snippet, `x-for` cannot be used if no parent element has `x-data` defined. [→ Read more about `x-data`](/directives/data)

[Contents of a `<template>`](#contents-of-a-template)
-----------------------------------------------------

As mentioned above, an `<template>` tag must contain only one root element.

For example, the following code will not work:

    <template x-for="color in colors">    <span>The next color is </span><span x-text="color"></template>
    <template x-for="color in colors">
        <span>The next color is </span><span x-text="color">
    </template>

but this code will work:

    <template x-for="color in colors">    <p>        <span>The next color is </span><span x-text="color">    </p></template>
    <template x-for="color in colors">
        <p>
            <span>The next color is </span><span x-text="color">
        </p>
    </template>

[← x-modelable](/directives/modelable)

[x-transition →](/directives/transition)

Code highlighting provided by [Torchlight](https://torchlight.dev)