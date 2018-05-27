var S = 'setPrototypeOf';
var G = 'getPrototypeOf';
var O = Object;
var OP = O.prototype;
var M = 'Cannot convert undefined or null to object';
var gpo = O[G];
var spo = O[S];

if (!spo) {
  if ({ __proto__: null } instanceof O) {
    var has = function(o, k) {
      return OP.hasOwnProperty.call(o, k);
    };
    var _gpo = gpo;
    gpo = function gpo(o) {
      if (o == undefined) throw TypeError(M);
      o = O(o);
      if (has(o, '__proto__')) return o.__proto__;
      if (_gpo) return _gpo(o);
      if (typeof o.constructor === 'function' && o instanceof o.constructor) {
        return o.constructor.prototype;
      }
      return o instanceof O ? OP : null;
    };
    spo = function mixinProperties(o, proto) {
      O.defineProperty(o, '__proto__', {
        value: proto,
        enumerable: false,
        writable: true,
        configurable: true
      });
      var keys = O.getOwnPropertyNames(proto);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (!has(o, key)) {
          var descriptor = O.getOwnPropertyDescriptor(proto, key);
          if (descriptor.configurable) {
            O.defineProperty(o, key, descriptor);
          }
        }
      }
      return o;
    };
  } else {
    spo = function setProtoOf(o, proto) {
      o.__proto__ = proto;
      return o;
    };
  }
}

if (!gpo) {
  gpo = function(o) {
    if (o == undefined) throw TypeError(M);
    o = O(o);
    return o.__proto__;
  };
}

exports[G] = gpo;
exports[S] = spo;
exports.polyfill = function() {
  O[G] = gpo;
  O[S] = spo;
};
