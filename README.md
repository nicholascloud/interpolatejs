# interpolate.js

__NOTE:__ This project is no longer maintained. Consider using [sprintf.js](https://github.com/alexei/sprintf.js) instead. If you are using ES2015, [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) might be a suitable alternative as well.

`interpolate.js` is a simple string interpolation module for both node.js and web browser use.  `interpolate` may be consumed as a CommonJS module, an AMD module, or as a browser global.

## Building interpolate

To build `interpolate`, make sure you have [anvil.js](http://anvil-js.org/) installed globally.

```
> npm install -g anvil.js
```

At the prompt, invoke anvil. This will copy the necessary files in the `build` directory.

```
> anvil
```

## Using interpolate

There are two ways to use interpolate: as a function, and as an object.

For simple interpolation, use `interpolate` as a function:

```javascript
var interpolate = require('interpolate');

var template = "{0} ordered {1} for ${2} on {3}.";
console.log(interpolate(template, "Nick", "The Dark Knight Rises", 15.00, "amazon.com"));
// => "Nick ordered The Dark Knight Rises for $15.00 on amazon.com."
```

If you want to reuse the same template string, you can create an object with `interpolate` that can be reused and passed around.

```javascript
var interpolate = require('interpolate');

var template = interpolate("In a duel to the death, {0} will always beat {1}.");
console.log(template.format("Ninjas", "Pirates"));
// => "In a duel to the death, Ninjas will always beat Pirates."
console.log(template.format("Pirates", "Ninjas"));
// => "In a duel to the death, Pirates will always beat Ninjas."
```

When using interpolate as an object, you can always fetch the original template by calling `toString()`.

If you are really feeling brave, you might consider creating a method on the `String` object to perform interpolation for you.

```javascript
var interpolate = require('interpolate');

String.prototype.fmt = function () {
  var args = Array.prototype.slice.call(arguments, 0);
  args.unshift(this);
  return interpolate.apply(null, args);
};

console.log("I need your {0}, your {1}, and your {2}.".fmt("clothes", "boots", "motorcycle"));
// => "I need your clothes, your boots, and your motorcycle."
```

## License

Copyright (c) 2012 Nicholas Cloud

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
