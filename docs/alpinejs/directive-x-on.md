x-on
====

`x-on` allows you to easily run code on dispatched DOM events.

Here's an example of simple button that shows an alert when clicked.

    <button x-on:click="alert('Hello World!')">Say Hi</button>
    <button x-on:click="alert('Hello World!')">Say Hi</button>

> `x-on` can only listen for events with lower case names, as HTML attributes are case-insensitive. Writing `x-on:CLICK` will listen for an event named `click`. If you need to listen for a custom event with a camelCase name, you can use the [`.camel` helper](#camel) to work around this limitation. Alternatively, you can use [`x-bind`](/directives/bind#bind-directives) to attach an `x-on` directive to an element in javascript code (where case will be preserved).

[Shorthand syntax](#shorthand-syntax)
-------------------------------------

If `x-on:` is too verbose for your tastes, you can use the shorthand syntax: `@`.

Here's the same component as above, but using the shorthand syntax instead:

    <button @click="alert('Hello World!')">Say Hi</button>
    <button @click="alert('Hello World!')">Say Hi</button>

> Despite not being included in the above snippet, `x-on` cannot be used if no parent element has `x-data` defined. [→ Read more about `x-data`](/directives/data)

[The event object](#the-event-object)
-------------------------------------

If you wish to access the native JavaScript event object from your expression, you can use Alpine's magic `$event` property.

    <button @click="alert($event.target.getAttribute('message'))" message="Hello World">Say Hi</button>
    <button @click="alert($event.target.getAttribute('message'))" message="Hello World">Say Hi</button>

In addition, Alpine also passes the event object to any methods referenced without trailing parenthesis. For example:

    <button @click="handleClick">...</button> <script>    function handleClick(e) {        // Now you can access the event object (e) directly    }</script>
    <button @click="handleClick">...</button>
    
    <script>
        function handleClick(e) {
            // Now you can access the event object (e) directly
        }
    </script>

[Keyboard events](#keyboard-events)
-----------------------------------

Alpine makes it easy to listen for `keydown` and `keyup` events on specific keys.

Here's an example of listening for the `Enter` key inside an input element.

    <input type="text" @keyup.enter="alert('Submitted!')">
    <input type="text" @keyup.enter="alert('Submitted!')">

You can also chain these key modifiers to achieve more complex listeners.

Here's a listener that runs when the `Shift` key is held and `Enter` is pressed, but not when `Enter` is pressed alone.

    <input type="text" @keyup.shift.enter="alert('Submitted!')">
    <input type="text" @keyup.shift.enter="alert('Submitted!')">

You can directly use any valid key names exposed via [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) as modifiers by converting them to kebab-case.

    <input type="text" @keyup.page-down="alert('Submitted!')">
    <input type="text" @keyup.page-down="alert('Submitted!')">

For easy reference, here is a list of common keys you may want to listen for.

Modifier

Keyboard Key

`.shift`

Shift

`.enter`

Enter

`.space`

Space

`.ctrl`

Ctrl

`.cmd`

Cmd

`.meta`

Cmd on Mac, Windows key on Windows

`.alt`

Alt

`.up` `.down` `.left` `.right`

Up/Down/Left/Right arrows

`.escape`

Escape

`.tab`

Tab

`.caps-lock`

Caps Lock

`.equal`

Equal, `=`

`.period`

Period, `.`

`.comma`

Comma, `,`

`.slash`

Forward Slash, `/`

[Mouse events](#mouse-events)
-----------------------------

Like the above Keyboard Events, Alpine allows the use of some key modifiers for handling `click` events.

Modifier

Event Key

`.shift`

shiftKey

`.ctrl`

ctrlKey

`.cmd`

metaKey

`.meta`

metaKey

`.alt`

altKey

These work on `click`, `auxclick`, `context` and `dblclick` events, and even `mouseover`, `mousemove`, `mouseenter`, `mouseleave`, `mouseout`, `mouseup` and `mousedown`.

Here's an example of a button that changes behaviour when the `Shift` key is held down.

    <button type="button"    @click="message = 'selected'"    @click.shift="message = 'added to selection'">    @mousemove.shift="message = 'add to selection'"    @mouseout="message = 'select'"    x-text="message"></button>
    <button type="button"
        @click="message = 'selected'"
        @click.shift="message = 'added to selection'">
        @mousemove.shift="message = 'add to selection'"
        @mouseout="message = 'select'"
        x-text="message"></button>

> Note: Normal click events with some modifiers (like `ctrl`) will automatically become `contextmenu` events in most browsers. Similarly, `right-click` events will trigger a `contextmenu` event, but will also trigger an `auxclick` event if the `contextmenu` event is prevented.

[Custom events](#custom-events)
-------------------------------

Alpine event listeners are a wrapper for native DOM event listeners. Therefore, they can listen for ANY DOM event, including custom events.

Here's an example of a component that dispatches a custom DOM event and listens for it as well.

    <div x-data @foo="alert('Button Was Clicked!')">    <button @click="$event.target.dispatchEvent(new CustomEvent('foo', { bubbles: true }))">...</button></div>
    <div x-data @foo="alert('Button Was Clicked!')">
        <button @click="$event.target.dispatchEvent(new CustomEvent('foo', { bubbles: true }))">...</button>
    </div>

When the button is clicked, the `@foo` listener will be called.

Because the `.dispatchEvent` API is verbose, Alpine offers a `$dispatch` helper to simplify things.

Here's the same component re-written with the `$dispatch` magic property.

    <div x-data @foo="alert('Button Was Clicked!')">    <button @click="$dispatch('foo')">...</button></div>
    <div x-data @foo="alert('Button Was Clicked!')">
        <button @click="$dispatch('foo')">...</button>
    </div>

[→ Read more about `$dispatch`](/magics/dispatch)

[Modifiers](#modifiers)
-----------------------

Alpine offers a number of directive modifiers to customize the behavior of your event listeners.

### [.prevent](#prevent)

`.prevent` is the equivalent of calling `.preventDefault()` inside a listener on the browser event object.

    <form @submit.prevent="console.log('submitted')" action="/foo">    <button>Submit</button></form>
    <form @submit.prevent="console.log('submitted')" action="/foo">
        <button>Submit</button>
    </form>

In the above example, with the `.prevent`, clicking the button will NOT submit the form to the `/foo` endpoint. Instead, Alpine's listener will handle it and "prevent" the event from being handled any further.

### [.stop](#stop)

Similar to `.prevent`, `.stop` is the equivalent of calling `.stopPropagation()` inside a listener on the browser event object.

    <div @click="console.log('I will not get logged')">    <button @click.stop>Click Me</button></div>
    <div @click="console.log('I will not get logged')">
        <button @click.stop>Click Me</button>
    </div>

In the above example, clicking the button WON'T log the message. This is because we are stopping the propagation of the event immediately and not allowing it to "bubble" up to the `<div>` with the `@click` listener on it.

### [.outside](#outside)

`.outside` is a convenience helper for listening for a click outside of the element it is attached to. Here's a simple dropdown component example to demonstrate:

    <div x-data="{ open: false }">    <button @click="open = ! open">Toggle</button>     <div x-show="open" @click.outside="open = false">        Contents...    </div></div>
    <div x-data="{ open: false }">
        <button @click="open = ! open">Toggle</button>
    
        <div x-show="open" @click.outside="open = false">
            Contents...
        </div>
    </div>

In the above example, after showing the dropdown contents by clicking the "Toggle" button, you can close the dropdown by clicking anywhere on the page outside the content.

This is because `.outside` is listening for clicks that DON'T originate from the element it's registered on.

> It's worth noting that the `.outside` expression will only be evaluated when the element it's registered on is visible on the page. Otherwise, there would be nasty race conditions where clicking the "Toggle" button would also fire the `@click.outside` handler when it is not visible.

### [.window](#window)

When the `.window` modifier is present, Alpine will register the event listener on the root `window` object on the page instead of the element itself.

    <div @keyup.escape.window="...">...</div>
    <div @keyup.escape.window="...">...</div>

The above snippet will listen for the "escape" key to be pressed ANYWHERE on the page.

Adding `.window` to listeners is extremely useful for these sorts of cases where a small part of your markup is concerned with events that take place on the entire page.

### [.document](#document)

`.document` works similarly to `.window` only it registers listeners on the `document` global, instead of the `window` global.

### [.once](#once)

By adding `.once` to a listener, you are ensuring that the handler is only called ONCE.

    <button @click.once="console.log('I will only log once')">...</button>
    <button @click.once="console.log('I will only log once')">...</button>

### [.debounce](#debounce)

Sometimes it is useful to "debounce" an event handler so that it only is called after a certain period of inactivity (250 milliseconds by default).

For example if you have a search field that fires network requests as the user types into it, adding a debounce will prevent the network requests from firing on every single keystroke.

    <input @input.debounce="fetchResults">
    <input @input.debounce="fetchResults">

Now, instead of calling `fetchResults` after every keystroke, `fetchResults` will only be called after 250 milliseconds of no keystrokes.

If you wish to lengthen or shorten the debounce time, you can do so by trailing a duration after the `.debounce` modifier like so:

    <input @input.debounce.500ms="fetchResults">
    <input @input.debounce.500ms="fetchResults">

Now, `fetchResults` will only be called after 500 milliseconds of inactivity.

### [.throttle](#throttle)

`.throttle` is similar to `.debounce` except it will release a handler call every 250 milliseconds instead of deferring it indefinitely.

This is useful for cases where there may be repeated and prolonged event firing and using `.debounce` won't work because you want to still handle the event every so often.

For example:

    <div @scroll.window.throttle="handleScroll">...</div>
    <div @scroll.window.throttle="handleScroll">...</div>

The above example is a great use case of throttling. Without `.throttle`, the `handleScroll` method would be fired hundreds of times as the user scrolls down a page. This can really slow down a site. By adding `.throttle`, we are ensuring that `handleScroll` only gets called every 250 milliseconds.

> Fun Fact: This exact strategy is used on this very documentation site to update the currently highlighted section in the right sidebar.

Just like with `.debounce`, you can add a custom duration to your throttled event:

    <div @scroll.window.throttle.750ms="handleScroll">...</div>
    <div @scroll.window.throttle.750ms="handleScroll">...</div>

Now, `handleScroll` will only be called every 750 milliseconds.

### [.self](#self)

By adding `.self` to an event listener, you are ensuring that the event originated on the element it is declared on, and not from a child element.

    <button @click.self="handleClick">    Click Me     <img src="..."></button>
    <button @click.self="handleClick">
        Click Me
    
        <img src="...">
    </button>

In the above example, we have an `<img>` tag inside the `<button>` tag. Normally, any click originating within the `<button>` element (like on `<img>` for example), would be picked up by a `@click` listener on the button.

However, in this case, because we've added a `.self`, only clicking the button itself will call `handleClick`. Only clicks originating on the `<img>` element will not be handled.

### [.camel](#camel)

    <div @custom-event.camel="handleCustomEvent">    ...</div>
    <div @custom-event.camel="handleCustomEvent">
        ...
    </div>

Sometimes you may want to listen for camelCased events such as `customEvent` in our example. Because camelCasing inside HTML attributes is not supported, adding the `.camel` modifier is necessary for Alpine to camelCase the event name internally.

By adding `.camel` in the above example, Alpine is now listening for `customEvent` instead of `custom-event`.

### [.dot](#dot)

    <div @custom-event.dot="handleCustomEvent">    ...</div>
    <div @custom-event.dot="handleCustomEvent">
        ...
    </div>

Similar to the `.camelCase` modifier there may be situations where you want to listen for events that have dots in their name (like `custom.event`). Since dots within the event name are reserved by Alpine you need to write them with dashes and add the `.dot` modifier.

In the code example above `custom-event.dot` will correspond to the event name `custom.event`.

### [.passive](#passive)

Browsers optimize scrolling on pages to be fast and smooth even when JavaScript is being executed on the page. However, improperly implemented touch and wheel listeners can block this optimization and cause poor site performance.

If you are listening for touch events, it's important to add `.passive` to your listeners to not block scroll performance.

    <div @touchstart.passive="...">...</div>
    <div @touchstart.passive="...">...</div>

[→ Read more about passive listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners)

### .capture

Add this modifier if you want to execute this listener in the event's capturing phase, e.g. before the event bubbles from the target element up the DOM.

    <div @click.capture="console.log('I will log first')">    <button @click="console.log('I will log second')"></button></div>
    <div @click.capture="console.log('I will log first')">
        <button @click="console.log('I will log second')"></button>
    </div>

[→ Read more about the capturing and bubbling phase of events](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#usecapture)

[← x-bind](/directives/bind)

[x-text →](/directives/text)

Code highlighting provided by [Torchlight](https://torchlight.dev)