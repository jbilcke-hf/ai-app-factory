x-model
=======

`x-model` allows you to bind the value of an input element to Alpine data.

Here's a simple example of using `x-model` to bind the value of a text field to a piece of data in Alpine.

    <div x-data="{ message: '' }">    <input type="text" x-model="message">     <span x-text="message"></span></div>
    <div x-data="{ message: '' }">
        <input type="text" x-model="message">
    
        <span x-text="message"></span>
    </div>

Now as the user types into the text field, the `message` will be reflected in the `<span>` tag.

`x-model` is two-way bound, meaning it both "sets" and "gets". In addition to changing data, if the data itself changes, the element will reflect the change.

We can use the same example as above but this time, we'll add a button to change the value of the `message` property.

    <div x-data="{ message: '' }">    <input type="text" x-model="message">     <button x-on:click="message = 'changed'">Change Message</button></div>
    <div x-data="{ message: '' }">
        <input type="text" x-model="message">
    
        <button x-on:click="message = 'changed'">Change Message</button>
    </div>

 Change Message

Now when the `<button>` is clicked, the input element's value will instantly be updated to "changed".

`x-model` works with the following input elements:

*   `<input type="text">`
*   `<textarea>`
*   `<input type="checkbox">`
*   `<input type="radio">`
*   `<select>`
*   `<input type="range">`

[Text inputs](#text-inputs)
---------------------------

    <input type="text" x-model="message"> <span x-text="message"></span>
    <input type="text" x-model="message">
    
    <span x-text="message"></span>

> Despite not being included in the above snippet, `x-model` cannot be used if no parent element has `x-data` defined. [→ Read more about `x-data`](/directives/data)

[Textarea inputs](#textarea-inputs)
-----------------------------------

    <textarea x-model="message"></textarea> <span x-text="message"></span>
    <textarea x-model="message"></textarea>
    
    <span x-text="message"></span>

[Checkbox inputs](#checkbox-inputs)
-----------------------------------

### [Single checkbox with boolean](#single-checkbox-with-boolean)

    <input type="checkbox" id="checkbox" x-model="show"> <label for="checkbox" x-text="show"></label>
    <input type="checkbox" id="checkbox" x-model="show">
    
    <label for="checkbox" x-text="show"></label>

### [Multiple checkboxes bound to array](#multiple-checkboxes-bound-to-array)

    <input type="checkbox" value="red" x-model="colors"><input type="checkbox" value="orange" x-model="colors"><input type="checkbox" value="yellow" x-model="colors"> Colors: <span x-text="colors"></span>
    <input type="checkbox" value="red" x-model="colors">
    <input type="checkbox" value="orange" x-model="colors">
    <input type="checkbox" value="yellow" x-model="colors">
    
    Colors: <span x-text="colors"></span>

  

Colors:

[Radio inputs](#radio-inputs)
-----------------------------

    <input type="radio" value="yes" x-model="answer"><input type="radio" value="no" x-model="answer"> Answer: <span x-text="answer"></span>
    <input type="radio" value="yes" x-model="answer">
    <input type="radio" value="no" x-model="answer">
    
    Answer: <span x-text="answer"></span>

 

Answer:

[Select inputs](#select-inputs)
-------------------------------

### [Single select](#single-select)

    <select x-model="color">    <option>Red</option>    <option>Orange</option>    <option>Yellow</option></select> Color: <span x-text="color"></span>
    <select x-model="color">
        <option>Red</option>
        <option>Orange</option>
        <option>Yellow</option>
    </select>
    
    Color: <span x-text="color"></span>

Red Orange Yellow

Color:

### [Single select with placeholder](#single-select-with-placeholder)

    <select x-model="color">    <option value="" disabled>Select A Color</option>    <option>Red</option>    <option>Orange</option>    <option>Yellow</option></select> Color: <span x-text="color"></span>
    <select x-model="color">
        <option value="" disabled>Select A Color</option>
        <option>Red</option>
        <option>Orange</option>
        <option>Yellow</option>
    </select>
    
    Color: <span x-text="color"></span>

Select A Color Red Orange Yellow

Color:

### [Multiple select](#multiple-select)

    <select x-model="color" multiple>    <option>Red</option>    <option>Orange</option>    <option>Yellow</option></select> Colors: <span x-text="color"></span>
    <select x-model="color" multiple>
        <option>Red</option>
        <option>Orange</option>
        <option>Yellow</option>
    </select>
    
    Colors: <span x-text="color"></span>

Red Orange Yellow

Color:

### [Dynamically populated Select Options](#dynamically-populated-select-options)

    <select x-model="color">    <template x-for="color in ['Red', 'Orange', 'Yellow']">        <option x-text="color"></option>    </template></select> Color: <span x-text="color"></span>
    <select x-model="color">
        <template x-for="color in ['Red', 'Orange', 'Yellow']">
            <option x-text="color"></option>
        </template>
    </select>
    
    Color: <span x-text="color"></span>

RedOrangeYellow

Color:

[Range inputs](#range-inputs)
-----------------------------

    <input type="range" x-model="range" min="0" max="1" step="0.1"> <span x-text="range"></span>
    <input type="range" x-model="range" min="0" max="1" step="0.1">
    
    <span x-text="range"></span>

0.5

[Modifiers](#modifiers)
-----------------------

### [`.lazy`](#lazy)

On text inputs, by default, `x-model` updates the property on every keystroke. By adding the `.lazy` modifier, you can force an `x-model` input to only update the property when user focuses away from the input element.

This is handy for things like real-time form-validation where you might not want to show an input validation error until the user "tabs" away from a field.

    <input type="text" x-model.lazy="username"><span x-show="username.length > 20">The username is too long.</span>
    <input type="text" x-model.lazy="username">
    <span x-show="username.length > 20">The username is too long.</span>

### [`.number`](#number)

By default, any data stored in a property via `x-model` is stored as a string. To force Alpine to store the value as a JavaScript number, add the `.number` modifier.

    <input type="text" x-model.number="age"><span x-text="typeof age"></span>
    <input type="text" x-model.number="age">
    <span x-text="typeof age"></span>

### [`.boolean`](#boolean)

By default, any data stored in a property via `x-model` is stored as a string. To force Alpine to store the value as a JavaScript boolean, add the `.boolean` modifier. Both integers (1/0) and strings (true/false) are valid boolean values.

    <select x-model.boolean="isActive">    <option value="true">Yes</option>    <option value="false">No</option></select><span x-text="typeof isActive"></span>
    <select x-model.boolean="isActive">
        <option value="true">Yes</option>
        <option value="false">No</option>
    </select>
    <span x-text="typeof isActive"></span>

### [`.debounce`](#debounce)

By adding `.debounce` to `x-model`, you can easily debounce the updating of bound input.

This is useful for things like real-time search inputs that fetch new data from the server every time the search property changes.

    <input type="text" x-model.debounce="search">
    <input type="text" x-model.debounce="search">

The default debounce time is 250 milliseconds, you can easily customize this by adding a time modifier like so.

    <input type="text" x-model.debounce.500ms="search">
    <input type="text" x-model.debounce.500ms="search">

### [`.throttle`](#throttle)

Similar to `.debounce` you can limit the property update triggered by `x-model` to only updating on a specified interval.

The default throttle interval is 250 milliseconds, you can easily customize this by adding a time modifier like so.

    <input type="text" x-model.throttle.500ms="search">
    <input type="text" x-model.throttle.500ms="search">

### [`.fill`](#fill)

By default, if an input has a value attribute, it is ignored by Alpine and instead, the value of the input is set to the value of the property bound using `x-model`.

But if a bound property is empty, then you can use an input's value attribute to populate the property by adding the `.fill` modifier.

[Programmatic access](#programmatic access)
-------------------------------------------

Alpine exposes under-the-hood utilities for getting and setting properties bound with `x-model`. This is useful for complex Alpine utilities that may want to override the default x-model behavior, or instances where you want to allow `x-model` on a non-input element.

You can access these utilities through a property called `_x_model` on the `x-model`ed element. `_x_model` has two methods to get and set the bound property:

*   `el._x_model.get()` (returns the value of the bound property)
*   `el._x_model.set()` (sets the value of the bound property)

    <div x-data="{ username: 'calebporzio' }">    <div x-ref="div" x-model="username"></div>     <button @click="$refs.div._x_model.set('phantomatrix')">        Change username to: 'phantomatrix'    </button>     <span x-text="$refs.div._x_model.get()"></span></div>
    <div x-data="{ username: 'calebporzio' }">
        <div x-ref="div" x-model="username"></div>
    
        <button @click="$refs.div._x_model.set('phantomatrix')">
            Change username to: 'phantomatrix'
        </button>
    
        <span x-text="$refs.div._x_model.get()"></span>
    </div>

Change username to: 'phantomatrix' calebporzio

[← x-html](/directives/html)

[x-modelable →](/directives/modelable)

Code highlighting provided by [Torchlight](https://torchlight.dev)