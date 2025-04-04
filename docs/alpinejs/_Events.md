Events
======

Alpine makes it simple to listen for browser events and react to them.

[Listening for simple events](#listening-for-simple-events)
-----------------------------------------------------------

By using `x-on`, you can listen for browser events that are dispatched on or within an element.

Here's a basic example of listening for a click on a button:

    <button x-on:click="console.log('clicked')">...</button>
    <button x-on:click="console.log('clicked')">...</button>

As an alternative, you can use the event shorthand syntax if you prefer: `@`. Here's the same example as before, but using the shorthand syntax (which we'll be using from now on):

    <button @click="...">...</button>
    <button @click="...">...</button>

In addition to `click`, you can listen for any browser event by name. For example: `@mouseenter`, `@keyup`, etc... are all valid syntax.

[Listening for specific keys](#listening-for-specific-keys)
-----------------------------------------------------------

Let's say you wanted to listen for the `enter` key to be pressed inside an `<input>` element. Alpine makes this easy by adding the `.enter` like so:

    <input @keyup.enter="...">
    <input @keyup.enter="...">

You can even combine key modifiers to listen for key combinations like pressing `enter` while holding `shift`:

    <input @keyup.shift.enter="...">
    <input @keyup.shift.enter="...">

[Preventing default](#preventing-default)
-----------------------------------------

When reacting to browser events, it is often necessary to "prevent default" (prevent the default behavior of the browser event).

For example, if you want to listen for a form submission but prevent the browser from submitting a form request, you can use `.prevent`:

    <form @submit.prevent="...">...</form>
    <form @submit.prevent="...">...</form>

You can also apply `.stop` to achieve the equivalent of `event.stopPropagation()`.

[Accessing the event object](#accessing-the-event-object)
---------------------------------------------------------

Sometimes you may want to access the native browser event object inside your own code. To make this easy, Alpine automatically injects an `$event` magic variable:

    <button @click="$event.target.remove()">Remove Me</button>
    <button @click="$event.target.remove()">Remove Me</button>

[Dispatching custom events](#dispatching-custom-events)
-------------------------------------------------------

In addition to listening for browser events, you can dispatch them as well. This is extremely useful for communicating with other Alpine components or triggering events in tools outside of Alpine itself.

Alpine exposes a magic helper called `$dispatch` for this:

    <div @foo="console.log('foo was dispatched')">    <button @click="$dispatch('foo')"></button></div>
    <div @foo="console.log('foo was dispatched')">
        <button @click="$dispatch('foo')"></button>
    </div>

As you can see, when the button is clicked, Alpine will dispatch a browser event called "foo", and our `@foo` listener on the `<div>` will pick it up and react to it.

[Listening for events on window](#listening-for-events-on-window)
-----------------------------------------------------------------

Because of the nature of events in the browser, it is sometimes useful to listen to events on the top-level window object.

This allows you to communicate across components completely like the following example:

    <div x-data>    <button @click="$dispatch('foo')"></button></div> <div x-data @foo.window="console.log('foo was dispatched')">...</div>
    <div x-data>
        <button @click="$dispatch('foo')"></button>
    </div>
    
    <div x-data @foo.window="console.log('foo was dispatched')">...</div>

In the above example, if we click the button in the first component, Alpine will dispatch the "foo" event. Because of the way events work in the browser, they "bubble" up through parent elements all the way to the top-level "window".

Now, because in our second component we are listening for "foo" on the window (with `.window`), when the button is clicked, this listener will pick it up and log the "foo was dispatched" message.

[→ Read more about x-on](/directives/on)

[← Templating](/essentials/templating)

[Lifecycle →](/essentials/lifecycle)

Code highlighting provided by [Torchlight](https://torchlight.dev)