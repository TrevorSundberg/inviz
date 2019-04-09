# Inviz
An inline and embeddable GraphViz widget for the web. Based on the GraphViz port [Viz.js](https://github.com/mdaines/viz.js/) by [mdaines](https://github.com/mdaines). See the [Demo](https://trevorsundberg.github.io/inviz/demo.htm) or see it working live in a [Blog Post](https://motley-coder.com/2019/04/05/inviz-an-inline-graphviz-widget/).

To determine whether to use `inviz-lite` or `inviz-full`, see [here](https://github.com/mdaines/viz.js/wiki/Usage).

## Usage as a `script`:
The lite version (dot only / smaller size):
```html
<script src='https://trevorsundberg.github.io/inviz/inviz-lite-1.0.0.js'
        integrity="sha256-QovDThk2+wF/x72ecMlxvLg+8D0Pn8L3/+evm9iXf+E="
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
        integrity="sha256-vdYlSK71imkC88FbMiIa9uZPUlNyZ1W0ydJv2p+pijg="
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
 - `data-graph-url`: Alternative url that points to a graph file with the dot language `*.gv`.
 - `data-options`: A json string described [here](https://github.com/mdaines/viz.js/wiki/API#render-options).

## Usage as an `iframe`:
Be sure to escape reserved characters such as `&` `?` `#` etc.

Sandboxed lite version:
```html
<iframe src='https://trevorsundberg.github.io/inviz/inviz-lite-1.0.0.htm?inviz-graph=
digraph
{
  a -> b
}
' sandbox="allow-scripts"></iframe>
```

Sandboxed full version:
```html
<iframe src='https://trevorsundberg.github.io/inviz/inviz-full-1.0.0.htm
             ?inviz-options={ "engine": "neato" }&inviz-graph=
digraph
{
  a -> b
}
' sandbox="allow-scripts"></iframe>
```

The url parameters:
 - `inviz-graph`: The dot language.
 - `inviz-graph-url`: Alternative url that points to a graph file with the dot language `*.gv`.
 - `inviz-options`: A json string described [here](https://github.com/mdaines/viz.js/wiki/API#render-options).

## Usage with Gists / Raw Files
As a convenience, you can use the `data-graph-url` attribute or `inviz-graph-url` parameter to point directly to a raw Gist or file e.g. from a GitHub repository. Using the following Gist as an example:
https://gist.github.com/TrevorSundberg/0d7344511320dd4bdf83f70715da8373

Embedding as a `script`:
```html
<script src="https://trevorsundberg.github.io/inviz/inviz-lite-1.0.0.js"
        integrity="sha256-QovDThk2+wF/x72ecMlxvLg+8D0Pn8L3/+evm9iXf+E="
        crossorigin="anonymous"
        data-graph-url="https://gist.githubusercontent.com/TrevorSundberg/0d7344511320dd4bdf83f70715da8373/raw"></script>
```

Embedding as an `iframe` (encode the url characters if needed):
```html
<iframe src='https://trevorsundberg.github.io/inviz/inviz-lite-1.0.0.htm?inviz-graph-url=
             https://gist.githubusercontent.com/TrevorSundberg/0d7344511320dd4bdf83f70715da8373/raw'
        sandbox="allow-scripts"></iframe>
```

Note that you can actually remove the commit ID and filename from the Raw url and it will always display the latest version.

For example the full url was:

`https://gist.githubusercontent.com/TrevorSundberg/0d7344511320dd4bdf83f70715da8373/raw/49c12d9a0f1a8865d8d0ee3bc3a343ae6ea63883/demo.gv`

Removing `/49c12d9a0f1a8865d8d0ee3bc3a343ae6ea63883/demo.gv` and we get:

`https://gist.githubusercontent.com/TrevorSundberg/0d7344511320dd4bdf83f70715da8373/raw`

Therefore the graphs will dynamically update as you update the gist. Obviously you can link to a specific commit if needed.

## Html / Styling
The embedded `script` will replace itself with a `div`. All attributes that you applied to the `script` (including `id`, `class`, `style`, etc.) will be copied to the `div` and the `script` will be removed. When the graph rendering completes, it produces an `svg` which is then attached under the `div`.

## Events
Any `id` given to the `script` will be also given to the generated `div`, therefore you can find the `div` and listen for events.

 - `graphload`: Fired when the graph finishes loading. The event has two members, `div` and `svg`, which both point at the corresponding DOM elements.
