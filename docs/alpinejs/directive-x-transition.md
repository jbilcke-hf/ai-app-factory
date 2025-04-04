x-transition
============

Alpine provides a robust transitions utility out of the box. With a few `x-transition` directives, you can create smooth transitions between when an element is shown or hidden.

There are two primary ways to handle transitions in Alpine:

*   [The Transition Helper](#the-transition-helper)
*   [Applying CSS Classes](#applying-css-classes)

[The transition helper](#the-transition-helper)
-----------------------------------------------

The simplest way to achieve a transition using Alpine is by adding `x-transition` to an element with `x-show` on it. For example:

    <div x-data="{ open: false }">    <button @click="open = ! open">Toggle</button>     <div x-show="open" x-transition>        Hello 👋    </div></div>
    <div x-data="{ open: false }">
        <button @click="open = ! open">Toggle</button>
    
        <div x-show="open" x-transition>
            Hello 👋
        </div>
    </div>

Toggle

Hello 👋

As you can see, by default, `x-transition` applies pleasant transition defaults to fade and scale the revealing element.

You can override these defaults with modifiers attached to `x-transition`. Let's take a look at those.

### [Customizing duration](#customizing-duration)

Initially, the duration is set to be 150 milliseconds when entering, and 75 milliseconds when leaving.

You can configure the duration you want for a transition with the `.duration` modifier:

    <div ... x-transition.duration.500ms>
    <div ... x-transition.duration.500ms>

The above `<div>` will transition for 500 milliseconds when entering, and 500 milliseconds when leaving.

If you wish to customize the durations specifically for entering and leaving, you can do that like so:

    <div ...    x-transition:enter.duration.500ms    x-transition:leave.duration.400ms>
    <div ...
        x-transition:enter.duration.500ms
        x-transition:leave.duration.400ms
    >

> Despite not being included in the above snippet, `x-transition` cannot be used if no parent element has `x-data` defined. [→ Read more about `x-data`](/directives/data)

### [Customizing delay](#customizing-delay)

You can delay a transition using the `.delay` modifier like so:

    <div ... x-transition.delay.50ms>
    <div ... x-transition.delay.50ms>

The above example will delay the transition and in and out of the element by 50 milliseconds.

### [Customizing opacity](#customizing-opacity)

By default, Alpine's `x-transition` applies both a scale and opacity transition to achieve a "fade" effect.

If you wish to only apply the opacity transition (no scale), you can accomplish that like so:

    <div ... x-transition.opacity>
    <div ... x-transition.opacity>

### [Customizing scale](#customizing-scale)

Similar to the `.opacity` modifier, you can configure `x-transition` to ONLY scale (and not transition opacity as well) like so:

    <div ... x-transition.scale>
    <div ... x-transition.scale>

The `.scale` modifier also offers the ability to configure its scale values AND its origin values:

    <div ... x-transition.scale.80>
    <div ... x-transition.scale.80>

The above snippet will scale the element up and down by 80%.

Again, you may customize these values separately for enter and leaving transitions like so:

    <div ...    x-transition:enter.scale.80    x-transition:leave.scale.90>
    <div ...
        x-transition:enter.scale.80
        x-transition:leave.scale.90
    >

To customize the origin of the scale transition, you can use the `.origin` modifier:

    <div ... x-transition.scale.origin.top>
    <div ... x-transition.scale.origin.top>

Now the scale will be applied using the top of the element as the origin, instead of the center by default.

Like you may have guessed, the possible values for this customization are: `top`, `bottom`, `left`, and `right`.

If you wish, you can also combine two origin values. For example, if you want the origin of the scale to be "top right", you can use: `.origin.top.right` as the modifier.

[Applying CSS classes](#applying-css-classes)
---------------------------------------------

For direct control over exactly what goes into your transitions, you can apply CSS classes at different stages of the transition.

> The following examples use [TailwindCSS](https://tailwindcss.com/docs/transition-property) utility classes.

    <div x-data="{ open: false }">    <button @click="open = ! open">Toggle</button>     <div        x-show="open"        x-transition:enter="transition ease-out duration-300"        x-transition:enter-start="opacity-0 scale-90"        x-transition:enter-end="opacity-100 scale-100"        x-transition:leave="transition ease-in duration-300"        x-transition:leave-start="opacity-100 scale-100"        x-transition:leave-end="opacity-0 scale-90"    >Hello 👋</div></div>
    <div x-data="{ open: false }">
        <button @click="open = ! open">Toggle</button>
    
        <div
            x-show="open"
            x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0 scale-90"
            x-transition:enter-end="opacity-100 scale-100"
            x-transition:leave="transition ease-in duration-300"
            x-transition:leave-start="opacity-100 scale-100"
            x-transition:leave-end="opacity-0 scale-90"
        >Hello 👋</div>
    </div>

Toggle

Hello 👋

Directive

Description

`:enter`

Applied during the entire entering phase.

`:enter-start`

Added before element is inserted, removed one frame after element is inserted.

`:enter-end`

Added one frame after element is inserted (at the same time `enter-start` is removed), removed when transition/animation finishes.

`:leave`

Applied during the entire leaving phase.

`:leave-start`

Added immediately when a leaving transition is triggered, removed after one frame.

`:leave-end`

Added one frame after a leaving transition is triggered (at the same time `leave-start` is removed), removed when the transition/animation finishes.

[← x-for](/directives/for)

[x-effect →](/directives/effect)

Code highlighting provided by [Torchlight](https://torchlight.dev)