# Polyfill for `Object.setPrototypeOf` and `Object.getPrototypeOf`

## Usage

```
$ npm install spo-gpo
```

As a ponyfill:

```js
const assert = require('assert');
const { setPrototypeOf, getPrototypeOf } = require('spo-gpo');

const obj = {};
const proto = {
  foo: function() {
    return 'bar';
  }
};

assert(getPrototypeOf(obj) === Object.prototype);

setPrototypeOf(obj, proto);

assert(obj.foo() === 'bar');
assert(getPrototypeOf(obj) === proto);
```

Globally, as a polyfill:

```js
require('spo-gpo/polyfill');

const proto = {
  foo: function() {
    return 'bar';
  }
};

const obj = Object.setPrototypeOf({}, proto);

obj.foo(); // 'bar'
Object.getPrototypeOf(obj); // proto
```

## Related projects

* [wesleytodd/setprototypeof](https://github.com/wesleytodd/setprototypeof)
* [paulmillr/es6-shim](https://github.com/paulmillr/es6-shim)
* [zloirock/core-js](https://github.com/zloirock/core-js)
