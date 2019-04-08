# Inviz
An inline and embeddable GraphViz widget for the web. Based on the GraphViz port [Viz.js](https://github.com/mdaines/viz.js/) by [mdaines](https://github.com/mdaines).

To determine whether to use `inviz-lite` or `inviz-full`, see [here](https://github.com/mdaines/viz.js/wiki/Usage).

## Usage as a `script`:
The lite version (dot only / smaller size):
```html
<script src='https://trevorsundberg.github.io/inviz/inviz-lite-1.0.0.js'
        integrity="sha256-G5c0MwvXF81IAMq2aaQIzRg+Oi2HZtjPhvKgBb6pSt0="
        crossorigin="anonymous"
        data-graph='
digraph
{
  a -> b
}
'></script>
```

The full version (neato/dot etc.):
```html
<script src='https://trevorsundberg.github.io/inviz/inviz-full-1.0.0.js'
        integrity="sha256-1A062hLKav9ROdvUr+aNM5Auq7mMj1/zH3N3bpDjacw="
        crossorigin="anonymous"
        data-options='{ "engine": "neato" }'
        data-graph='
digraph
{
  a -> b
}
'></script>
```

The attributes are:
 - `data-graph`: The dot language.
 - `data-options`: A json string described [here](https://github.com/mdaines/viz.js/wiki/API#render-options).

## Usage as an `iframe`:
Be sure to escape reserved characters such as `&` `?` `#` etc.

Sandboxed lite version:
```html
<iframe src='https://trevorsundberg.github.io/inviz/inviz-lite-1.0.0.htm?graph=
digraph
{
  a -> b
}
' sandbox="allow-scripts"></iframe>
```

Sandboxed full version:
```html
<iframe src='https://trevorsundberg.github.io/inviz/inviz-full-1.0.0.htm
             ?options={ "engine": "neato" }&graph=
digraph
{
  a -> b
}
' sandbox="allow-scripts"></iframe>
```

The url parameters:
 - `graph`: The dot language.
 - `options`: A json string described [here](https://github.com/mdaines/viz.js/wiki/API#render-options).

## Html / Styling
The emvbedded `script` will replace itself with a `div`. All attributes that you applied to the `script` (including `id`, `class`, `style`, etc.) will be copied to the `div` and the `script` will be removed. When the graph rendering completes, it produces an `svg` which is then attached under the `div`.

## Events
Any `id` given to the `script` will be also given to the generated `div`, therefore you can find the `div` and listen for events.

 - `graphload`: Fired when the graph finishes loading. The event has two members, `div` and `svg`, which both point at the corresponding DOM elements.
