x-teleport
==========

The `x-teleport` directive allows you to transport part of your Alpine template to another part of the DOM on the page entirely.

This is useful for things like modals (especially nesting them), where it's helpful to break out of the z-index of the current Alpine component.

[x-teleport](#x-teleport)
-------------------------

By attaching `x-teleport` to a `<template>` element, you are telling Alpine to "append" that element to the provided selector.

> The `x-teleport` selector can be any string you would normally pass into something like `document.querySelector`. It will find the first element that matches, be it a tag name (`body`), class name (`.my-class`), ID (`#my-id`), or any other valid CSS selector.

[→ Read more about `document.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

Here's a contrived modal example:

    <body>    <div x-data="{ open: false }">        <button @click="open = ! open">Toggle Modal</button>         <template x-teleport="body">            <div x-show="open">                Modal contents...            </div>        </template>    </div>     <div>Some other content placed AFTER the modal markup.</div>     ... </body>
    <body>
        <div x-data="{ open: false }">
            <button @click="open = ! open">Toggle Modal</button>
    
            <template x-teleport="body">
                <div x-show="open">
                    Modal contents...
                </div>
            </template>
        </div>
    
        <div>Some other content placed AFTER the modal markup.</div>
    
        ...
    
    </body>

Toggle Modal

Some other content placed AFTER the modal markup.

Modal contents...

Notice how when toggling the modal, the actual modal contents show up AFTER the "Some other content..." element? This is because when Alpine is initializing, it sees `x-teleport="body"` and appends and initializes that element to the provided element selector.

[Forwarding events](#forwarding-events)
---------------------------------------

Alpine tries its best to make the experience of teleporting seamless. Anything you would normally do in a template, you should be able to do inside an `x-teleport` template. Teleported content can access the normal Alpine scope of the component as well as other features like `$refs`, `$root`, etc...

However, native DOM events have no concept of teleportation, so if, for example, you trigger a "click" event from inside a teleported element, that event will bubble up the DOM tree as it normally would.

To make this experience more seamless, you can "forward" events by simply registering event listeners on the `<template x-teleport...>` element itself like so:

    <div x-data="{ open: false }">    <button @click="open = ! open">Toggle Modal</button>     <template x-teleport="body" @click="open = false">        <div x-show="open">            Modal contents...            (click to close)        </div>    </template></div>
    <div x-data="{ open: false }">
        <button @click="open = ! open">Toggle Modal</button>
    
        <template x-teleport="body" @click="open = false">
            <div x-show="open">
                Modal contents...
                (click to close)
            </div>
        </template>
    </div>

Toggle Modal

Modal contents...

(click to close)

Notice how we are now able to listen for events dispatched from within the teleported element from outside the `<template>` element itself?

Alpine does this by looking for event listeners registered on `<template x-teleport...>` and stops those events from propagating past the live, teleported, DOM element. Then, it creates a copy of that event and re-dispatches it from `<template x-teleport...>`.

[Nesting](#nesting)
-------------------

Teleporting is especially helpful if you are trying to nest one modal within another. Alpine makes it simple to do so:

    <div x-data="{ open: false }">    <button @click="open = ! open">Toggle Modal</button>     <template x-teleport="body">        <div x-show="open">            Modal contents...             <div x-data="{ open: false }">                <button @click="open = ! open">Toggle Nested Modal</button>                 <template x-teleport="body">                    <div x-show="open">                        Nested modal contents...                    </div>                </template>            </div>        </div>    </template></div>
    <div x-data="{ open: false }">
        <button @click="open = ! open">Toggle Modal</button>
    
        <template x-teleport="body">
            <div x-show="open">
                Modal contents...
    
                <div x-data="{ open: false }">
                    <button @click="open = ! open">Toggle Nested Modal</button>
    
                    <template x-teleport="body">
                        <div x-show="open">
                            Nested modal contents...
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </div>

Toggle Modal

Modal contents...

Toggle Nested Modal

Nested modal contents...

After toggling "on" both modals, they are authored as children, but will be rendered as sibling elements on the page, not within one another.

[← x-cloak](/directives/cloak)

[x-if →](/directives/if)

Code highlighting provided by [Torchlight](https://torchlight.dev)