x-bind
======

`x-bind` allows you to set HTML attributes on elements based on the result of JavaScript expressions.

For example, here's a component where we will use `x-bind` to set the placeholder value of an input.

    <div x-data="{ placeholder: 'Type here...' }">    <input type="text" x-bind:placeholder="placeholder"></div>
    <div x-data="{ placeholder: 'Type here...' }">
        <input type="text" x-bind:placeholder="placeholder">
    </div>

[Shorthand syntax](#shorthand-syntax)
-------------------------------------

If `x-bind:` is too verbose for your liking, you can use the shorthand: `:`. For example, here is the same input element as above, but refactored to use the shorthand syntax.

    <input type="text" :placeholder="placeholder">
    <input type="text" :placeholder="placeholder">

> Despite not being included in the above snippet, `x-bind` cannot be used if no parent element has `x-data` defined. [→ Read more about `x-data`](/directives/data)

[Binding classes](#binding-classes)
-----------------------------------

`x-bind` is most often useful for setting specific classes on an element based on your Alpine state.

Here's a simple example of a simple dropdown toggle, but instead of using `x-show`, we'll use a "hidden" class to toggle an element.

    <div x-data="{ open: false }">    <button x-on:click="open = ! open">Toggle Dropdown</button>     <div :class="open ? '' : 'hidden'">        Dropdown Contents...    </div></div>
    <div x-data="{ open: false }">
        <button x-on:click="open = ! open">Toggle Dropdown</button>
    
        <div :class="open ? '' : 'hidden'">
            Dropdown Contents...
        </div>
    </div>

Now, when `open` is `false`, the "hidden" class will be added to the dropdown.

### [Shorthand conditionals](#shorthand-conditionals)

In cases like these, if you prefer a less verbose syntax you can use JavaScript's short-circuit evaluation instead of standard conditionals:

    <div :class="show ? '' : 'hidden'"><!-- Is equivalent to: --><div :class="show || 'hidden'">
    <div :class="show ? '' : 'hidden'">
    <!-- Is equivalent to: -->
    <div :class="show || 'hidden'">

The inverse is also available to you. Suppose instead of `open`, we use a variable with the opposite value: `closed`.

    <div :class="closed ? 'hidden' : ''"><!-- Is equivalent to: --><div :class="closed && 'hidden'">
    <div :class="closed ? 'hidden' : ''">
    <!-- Is equivalent to: -->
    <div :class="closed && 'hidden'">

### [Class object syntax](#class-object-syntax)

Alpine offers an additional syntax for toggling classes if you prefer. By passing a JavaScript object where the classes are the keys and booleans are the values, Alpine will know which classes to apply and which to remove. For example:

    <div :class="{ 'hidden': ! show }">
    <div :class="{ 'hidden': ! show }">

This technique offers a unique advantage to other methods. When using object-syntax, Alpine will NOT preserve original classes applied to an element's `class` attribute.

For example, if you wanted to apply the "hidden" class to an element before Alpine loads, AND use Alpine to toggle its existence you can only achieve that behavior using object-syntax:

    <div class="hidden" :class="{ 'hidden': ! show }">
    <div class="hidden" :class="{ 'hidden': ! show }">

In case that confused you, let's dig deeper into how Alpine handles `x-bind:class` differently than other attributes.

### [Special behavior](#special-behavior)

`x-bind:class` behaves differently than other attributes under the hood.

Consider the following case.

    <div class="opacity-50" :class="hide && 'hidden'">
    <div class="opacity-50" :class="hide && 'hidden'">

If "class" were any other attribute, the `:class` binding would overwrite any existing class attribute, causing `opacity-50` to be overwritten by either `hidden` or `''`.

However, Alpine treats `class` bindings differently. It's smart enough to preserve existing classes on an element.

For example, if `hide` is true, the above example will result in the following DOM element:

    <div class="opacity-50 hidden">
    <div class="opacity-50 hidden">

If `hide` is false, the DOM element will look like:

    <div class="opacity-50">
    <div class="opacity-50">

This behavior should be invisible and intuitive to most users, but it is worth mentioning explicitly for the inquiring developer or any special cases that might crop up.

[Binding styles](#binding-styles)
---------------------------------

Similar to the special syntax for binding classes with JavaScript objects, Alpine also offers an object-based syntax for binding `style` attributes.

Just like the class objects, this syntax is entirely optional. Only use it if it affords you some advantage.

    <div :style="{ color: 'red', display: 'flex' }"> <!-- Will render: --><div style="color: red; display: flex;" ...>
    <div :style="{ color: 'red', display: 'flex' }">
    
    <!-- Will render: -->
    <div style="color: red; display: flex;" ...>

Conditional inline styling is possible using expressions just like with x-bind:class. Short circuit operators can be used here as well by using a styles object as the second operand.

    <div x-bind:style="true && { color: 'red' }"> <!-- Will render: --><div style="color: red;">
    <div x-bind:style="true && { color: 'red' }">
    
    <!-- Will render: -->
    <div style="color: red;">

One advantage of this approach is being able to mix it in with existing styles on an element:

    <div style="padding: 1rem;" :style="{ color: 'red', display: 'flex' }"> <!-- Will render: --><div style="padding: 1rem; color: red; display: flex;" ...>
    <div style="padding: 1rem;" :style="{ color: 'red', display: 'flex' }">
    
    <!-- Will render: -->
    <div style="padding: 1rem; color: red; display: flex;" ...>

And like most expressions in Alpine, you can always use the result of a JavaScript expression as the reference:

    <div x-data="{ styles: { color: 'red', display: 'flex' }}">    <div :style="styles"></div> <!-- Will render: --><div ...>    <div style="color: red; display: flex;" ...></div>
    <div x-data="{ styles: { color: 'red', display: 'flex' }}">
        <div :style="styles">
    </div>
    
    <!-- Will render: -->
    <div ...>
        <div style="color: red; display: flex;" ...>
    </div>

[Binding Alpine Directives Directly](#bind-directives)
------------------------------------------------------

`x-bind` allows you to bind an object of different directives and attributes to an element.

The object keys can be anything you would normally write as an attribute name in Alpine. This includes Alpine directives and modifiers, but also plain HTML attributes. The object values are either plain strings, or in the case of dynamic Alpine directives, callbacks to be evaluated by Alpine.

    <div x-data="dropdown">    <button x-bind="trigger">Open Dropdown</button>     <span x-bind="dialogue">Dropdown Contents</span></div> <script>    document.addEventListener('alpine:init', () => {        Alpine.data('dropdown', () => ({            open: false,             trigger: {                ['x-ref']: 'trigger',                ['@click']() {                    this.open = true                },            },             dialogue: {                ['x-show']() {                    return this.open                },                ['@click.outside']() {                    this.open = false                },            },        }))    })</script>
    <div x-data="dropdown">
        <button x-bind="trigger">Open Dropdown</button>
    
        <span x-bind="dialogue">Dropdown Contents</span>
    </div>
    
    <script>
        document.addEventListener('alpine:init', () => {
            Alpine.data('dropdown', () => ({
                open: false,
    
                trigger: {
                    ['x-ref']: 'trigger',
                    ['@click']() {
                        this.open = true
                    },
                },
    
                dialogue: {
                    ['x-show']() {
                        return this.open
                    },
                    ['@click.outside']() {
                        this.open = false
                    },
                },
            }))
        })
    </script>

There are a couple of caveats to this usage of `x-bind`:

> When the directive being "bound" or "applied" is `x-for`, you should return a normal expression string from the callback. For example: `['x-for']() { return 'item in items' }`

[← x-show](/directives/show)

[x-on →](/directives/on)

Code highlighting provided by [Torchlight](https://torchlight.dev)