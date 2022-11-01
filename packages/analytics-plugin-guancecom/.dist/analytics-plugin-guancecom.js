var AnalyticsPluginGuancecom = (function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var ArrayProto = Array.prototype;
    var ObjProto = Object.prototype;
    var slice = ArrayProto.slice;
    var toString = ObjProto.toString;
    var hasOwnProperty = ObjProto.hasOwnProperty;
    var nativeForEach = ArrayProto.forEach;
    var nativeIsArray = Array.isArray;
    var breaker = false;
    var each = function each(obj, iterator, context) {
      if (obj === null) return false;

      if (nativeForEach && obj.forEach === nativeForEach) {
        obj.forEach(iterator, context);
      } else if (obj.length === +obj.length) {
        for (var i = 0, l = obj.length; i < l; i++) {
          if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
            return false;
          }
        }
      } else {
        for (var key in obj) {
          if (hasOwnProperty.call(obj, key)) {
            if (iterator.call(context, obj[key], key, obj) === breaker) {
              return false;
            }
          }
        }
      }
    };
    function assign(target) {
      each(slice.call(arguments, 1), function (source) {
        for (var prop in source) {
          if (Object.prototype.hasOwnProperty.call(source, prop)) {
            target[prop] = source[prop];
          }
        }
      });
      return target;
    }
    function shallowClone(object) {
      return assign({}, object);
    }
    var extend = function extend(obj) {
      each(slice.call(arguments, 1), function (source) {
        for (var prop in source) {
          if (source[prop] !== void 0) {
            obj[prop] = source[prop];
          }
        }
      });
      return obj;
    };
    var extend2Lev = function extend2Lev(obj) {
      each(slice.call(arguments, 1), function (source) {
        for (var prop in source) {
          if (source[prop] !== void 0) {
            if (isObject(source[prop]) && isObject(obj[prop])) {
              extend(obj[prop], source[prop]);
            } else {
              obj[prop] = source[prop];
            }
          }
        }
      });
      return obj;
    };
    var isArray = nativeIsArray || function (obj) {
      return toString.call(obj) === '[object Array]';
    };
    var isFunction = function isFunction(f) {
      if (!f) {
        return false;
      }

      try {
        return /^\s*\bfunction\b/.test(f);
      } catch (err) {
        return false;
      }
    };
    var isArguments = function isArguments(obj) {
      return !!(obj && hasOwnProperty.call(obj, 'callee'));
    };
    var toArray = function toArray(iterable) {
      if (!iterable) return [];

      if (iterable.toArray) {
        return iterable.toArray();
      }

      if (isArray(iterable)) {
        return slice.call(iterable);
      }

      if (isArguments(iterable)) {
        return slice.call(iterable);
      }

      return values(iterable);
    };
    var values = function values(obj) {
      var results = [];

      if (obj === null) {
        return results;
      }

      each(obj, function (value) {
        results[results.length] = value;
      });
      return results;
    };
    var filter = function filter(arr, fn, self) {
      if (arr.filter) {
        return arr.filter(fn);
      }

      var ret = [];

      for (var i = 0; i < arr.length; i++) {
        if (!hasOwnProperty.call(arr, i)) {
          continue;
        }

        var val = arr[i];

        if (fn.call(self, val, i, arr)) {
          ret.push(val);
        }
      }

      return ret;
    };
    var map = function map(arr, fn, self) {
      if (arr.map) {
        return arr.map(fn);
      }

      var ret = [];

      for (var i = 0; i < arr.length; i++) {
        if (!hasOwnProperty.call(arr, i)) {
          continue;
        }

        var val = arr[i];
        ret.push(fn.call(self, val, i, arr));
      }

      return ret;
    };
    var some = function some(arr, fn, self) {
      if (arr.some) {
        return arr.some(fn);
      }

      var flag = false;

      for (var i = 0; i < arr.length; i++) {
        if (!hasOwnProperty.call(arr, i)) {
          continue;
        }

        var val = arr[i];

        if (fn.call(self, val, i, arr)) {
          flag = true;
          break;
        }
      }

      return flag;
    };
    var every = function every(arr, fn, self) {
      if (arr.every) {
        return arr.every(fn);
      }

      var flag = true;

      for (var i = 0; i < arr.length; i++) {
        if (!hasOwnProperty.call(arr, i)) {
          continue;
        }

        var val = arr[i];

        if (!fn.call(self, val, i, arr)) {
          flag = false;
          break;
        }
      }

      return flag;
    };
    var matchList = function matchList(list, value) {
      return some(list, function (item) {
        return item === value || item instanceof RegExp && item.test(value);
      });
    }; // https://github.com/jquery/jquery/blob/a684e6ba836f7c553968d7d026ed7941e1a612d8/src/selector/escapeSelector.js
    var isObject = function isObject(obj) {
      if (obj === null) return false;
      return toString.call(obj) === '[object Object]';
    };
    var isEmptyObject = function isEmptyObject(obj) {
      if (isObject(obj)) {
        for (var key in obj) {
          if (hasOwnProperty.call(obj, key)) {
            return false;
          }
        }

        return true;
      } else {
        return false;
      }
    };
    var objectEntries = function objectEntries(object) {
      var res = [];
      each(object, function (value, key) {
        res.push([key, value]);
      });
      return res;
    };
    var isString = function isString(obj) {
      return toString.call(obj) === '[object String]';
    };
    var isBoolean = function isBoolean(obj) {
      return toString.call(obj) === '[object Boolean]';
    };
    var isNumber = function isNumber(obj) {
      return toString.call(obj) === '[object Number]' && /[\d\.]+/.test(String(obj));
    };
    var decodeURIComponent = function decodeURIComponent(val) {
      var result = val;

      try {
        result = decodeURIComponent(val);
      } catch (error) {
        result = val;
      }

      return result;
    };
    var throttle = function throttle(func, wait, options) {
      var timeout, context, args, result;
      var previous = 0;
      if (!options) options = {};

      var later = function later() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      };

      var throttled = function throttled() {
        args = arguments;
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now; //下次触发 func 剩余的时间

        var remaining = wait - (now - previous);
        context = this; // 如果没有剩余的时间了或者你改了系统时间

        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }

          previous = now;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }

        return result;
      };

      throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
      };

      return throttled;
    };
    var utf8Encode = function utf8Encode(string) {
      string = (string + '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      var utftext = '',
          start,
          end;
      var stringl = 0,
          n;
      start = end = 0;
      stringl = string.length;

      for (n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
          end++;
        } else if (c1 > 127 && c1 < 2048) {
          enc = String.fromCharCode(c1 >> 6 | 192, c1 & 63 | 128);
        } else {
          enc = String.fromCharCode(c1 >> 12 | 224, c1 >> 6 & 63 | 128, c1 & 63 | 128);
        }

        if (enc !== null) {
          if (end > start) {
            utftext += string.substring(start, end);
          }

          utftext += enc;
          start = end = n + 1;
        }
      }

      if (end > start) {
        utftext += string.substring(start, string.length);
      }

      return utftext;
    };
    var base64Encode = function base64Encode(data) {
      if (typeof btoa === 'function') {
        return btoa(encodeURIComponent(data).replace(/%([0-9A-F]{2})/g, function (match, p1) {
          return String.fromCharCode('0x' + p1);
        }));
      }

      data = String(data);
      var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var o1,
          o2,
          o3,
          h1,
          h2,
          h3,
          h4,
          bits,
          i = 0,
          ac = 0,
          enc = '',
          tmp_arr = [];

      if (!data) {
        return data;
      }

      data = utf8Encode(data);

      do {
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
      } while (i < data.length);

      enc = tmp_arr.join('');

      switch (data.length % 3) {
        case 1:
          enc = enc.slice(0, -2) + '==';
          break;

        case 2:
          enc = enc.slice(0, -1) + '=';
          break;
      }

      return enc;
    };
    /**
     * UUID v4
     * from https://gist.github.com/jed/982883
     */

    function UUID(placeholder) {
      return placeholder ? // eslint-disable-next-line  no-bitwise
      (parseInt(placeholder, 10) ^ Math.random() * 16 >> parseInt(placeholder, 10) / 4).toString(16) : "".concat(1e7, "-", 1e3, "-", 4e3, "-", 8e3, "-", 1e11).replace(/[018]/g, UUID);
    } // 替换url包含数字的路由

    function replaceNumberCharByPath(path) {
      var pathGroup = '';

      if (path) {
        pathGroup = path.replace(/\/([^\/]*)\d([^\/]*)/g, '/?').replace(/\/$/g, '');
      }

      return pathGroup || '/';
    }
    var urlParse = function urlParse(para) {
      var URLParser = function URLParser(a) {
        this._fields = {
          Username: 4,
          Password: 5,
          Port: 7,
          Protocol: 2,
          Host: 6,
          Path: 8,
          URL: 0,
          QueryString: 9,
          Fragment: 10
        };
        this._values = {};
        this._regex = null;
        this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;

        if (typeof a != 'undefined') {
          this._parse(a);
        }
      };

      URLParser.prototype.setUrl = function (a) {
        this._parse(a);
      };

      URLParser.prototype._initValues = function () {
        for (var a in this._fields) {
          this._values[a] = '';
        }
      };

      URLParser.prototype.addQueryString = function (queryObj) {
        if (typeof queryObj !== 'object') {
          return false;
        }

        var query = this._values.QueryString || '';

        for (var i in queryObj) {
          if (new RegExp(i + '[^&]+').test(query)) {
            query = query.replace(new RegExp(i + '[^&]+'), i + '=' + queryObj[i]);
          } else {
            if (query.slice(-1) === '&') {
              query = query + i + '=' + queryObj[i];
            } else {
              if (query === '') {
                query = i + '=' + queryObj[i];
              } else {
                query = query + '&' + i + '=' + queryObj[i];
              }
            }
          }
        }

        this._values.QueryString = query;
      };

      URLParser.prototype.getParse = function () {
        return this._values;
      };

      URLParser.prototype.getUrl = function () {
        var url = '';
        url += this._values.Origin; // url += this._values.Port ? ':' + this._values.Port : ''

        url += this._values.Path;
        url += this._values.QueryString ? '?' + this._values.QueryString : '';
        return url;
      };

      URLParser.prototype._parse = function (a) {
        this._initValues();

        var b = this._regex.exec(a);

        if (!b) {
          throw 'DPURLParser::_parse -> Invalid URL';
        }

        for (var c in this._fields) {
          if (typeof b[this._fields[c]] != 'undefined') {
            this._values[c] = b[this._fields[c]];
          }
        }

        this._values['Path'] = this._values['Path'] || '/';
        this._values['Hostname'] = this._values['Host'].replace(/:\d+$/, '');
        this._values['Origin'] = this._values['Protocol'] + '://' + this._values['Hostname'] + (this._values.Port ? ':' + this._values.Port : ''); // this._values['Hostname'] = this._values['Host'].replace(/:\d+$/, '')
        // this._values['Origin'] =
        //   this._values['Protocol'] + '://' + this._values['Hostname']
      };

      return new URLParser(para);
    };
    function elementMatches(element, selector) {
      if (element.matches) {
        return element.matches(selector);
      } // IE11 support


      if (element.msMatchesSelector) {
        return element.msMatchesSelector(selector);
      }

      return false;
    }
    var getQueryParamsFromUrl = function getQueryParamsFromUrl(url) {
      var result = {};
      var arr = url.split('?');
      var queryString = arr[1] || '';

      if (queryString) {
        result = getURLSearchParams('?' + queryString);
      }

      return result;
    };
    var getURLSearchParams = function getURLSearchParams(queryString) {
      queryString = queryString || '';

      var decodeParam = function decodeParam(str) {
        return decodeURIComponent(str);
      };

      var args = {};
      var query = queryString.substring(1);
      var pairs = query.split('&');

      for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos === -1) continue;
        var name = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        name = decodeParam(name);
        value = decodeParam(value);
        args[name] = value;
      }

      return args;
    };

    function createCircularReferenceChecker() {
      if (typeof WeakSet !== 'undefined') {
        var set = new WeakSet();
        return {
          hasAlreadyBeenSeen(value) {
            var has = set.has(value);

            if (!has) {
              set.add(value);
            }

            return has;
          }

        };
      }

      var array = [];
      return {
        hasAlreadyBeenSeen(value) {
          var has = array.indexOf(value) >= 0;

          if (!has) {
            array.push(value);
          }

          return has;
        }

      };
    }
    /**
     * Similar to `typeof`, but distinguish plain objects from `null` and arrays
     */


    function getType(value) {
      if (value === null) {
        return 'null';
      }

      if (Array.isArray(value)) {
        return 'array';
      }

      return typeof value;
    }
    /**
     * Iterate over source and affect its sub values into destination, recursively.
     * If the source and destination can't be merged, return source.
     */

    function mergeInto(destination, source, circularReferenceChecker) {
      // ignore the source if it is undefined
      if (typeof circularReferenceChecker === 'undefined') {
        circularReferenceChecker = createCircularReferenceChecker();
      }

      if (source === undefined) {
        return destination;
      }

      if (typeof source !== 'object' || source === null) {
        // primitive values - just return source
        return source;
      } else if (source instanceof Date) {
        return new Date(source.getTime());
      } else if (source instanceof RegExp) {
        var flags = source.flags || // old browsers compatibility
        [source.global ? 'g' : '', source.ignoreCase ? 'i' : '', source.multiline ? 'm' : '', source.sticky ? 'y' : '', source.unicode ? 'u' : ''].join('');
        return new RegExp(source.source, flags);
      }

      if (circularReferenceChecker.hasAlreadyBeenSeen(source)) {
        // remove circular references
        return undefined;
      } else if (Array.isArray(source)) {
        var merged = Array.isArray(destination) ? destination : [];

        for (var i = 0; i < source.length; ++i) {
          merged[i] = mergeInto(merged[i], source[i], circularReferenceChecker);
        }

        return merged;
      }

      var merged = getType(destination) === 'object' ? destination : {};

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          merged[key] = mergeInto(merged[key], source[key], circularReferenceChecker);
        }
      }

      return merged;
    }
    /**
     * A simplistic implementation of a deep clone algorithm.
     * Caveats:
     * - It doesn't maintain prototype chains - don't use with instances of custom classes.
     * - It doesn't handle Map and Set
     */

    function deepClone(value) {
      return mergeInto(undefined, value);
    }
    function getStatusGroup(status) {
      if (!status) return status;
      return String(status).substr(0, 1) + String(status).substr(1).replace(/\d*/g, 'x');
    }
    function jsonStringify(value, replacer, space) {
      if (value === null || value === undefined) {
        return JSON.stringify(value);
      }

      var originalToJSON = [false, undefined];

      if (hasToJSON(value)) {
        // We need to add a flag and not rely on the truthiness of value.toJSON
        // because it can be set but undefined and that's actually significant.
        originalToJSON = [true, value.toJSON];
        delete value.toJSON;
      }

      var originalProtoToJSON = [false, undefined];
      var prototype;

      if (typeof value === 'object') {
        prototype = Object.getPrototypeOf(value);

        if (hasToJSON(prototype)) {
          originalProtoToJSON = [true, prototype.toJSON];
          delete prototype.toJSON;
        }
      }

      var result;

      try {
        result = JSON.stringify(value, undefined, space);
      } catch (e) {
        result = '<error: unable to serialize object>';
      } finally {
        if (originalToJSON[0]) {
          value.toJSON = originalToJSON[1];
        }

        if (originalProtoToJSON[0]) {
          prototype.toJSON = originalProtoToJSON[1];
        }
      }

      return result;
    }

    function hasToJSON(value) {
      return typeof value === 'object' && value !== null && value.hasOwnProperty('toJSON');
    }

    function noop() {}
    var ONE_SECOND = 1000;
    var ONE_MINUTE = 60 * ONE_SECOND;
    var ONE_HOUR = 60 * ONE_MINUTE;
    var ONE_DAY = 24 * ONE_HOUR;
    var ONE_YEAR = 365 * ONE_DAY;
    var ONE_KIBI_BYTE = 1024;
    var ONE_MEBI_BYTE = 1024 * ONE_KIBI_BYTE;
    /**
     * Return true if the draw is successful
     * @param threshold between 0 and 100
     */

    function performDraw(threshold) {
      return threshold !== 0 && Math.random() * 100 <= threshold;
    }
    function round(num, decimals) {
      return +num.toFixed(decimals);
    }
    function msToNs(duration) {
      if (typeof duration !== 'number') {
        return duration;
      }

      return round(duration * 1e6, 0);
    }
    function mapValues(object, fn) {
      var newObject = {};
      each(object, function (value, key) {
        newObject[key] = fn(value);
      });
      return newObject;
    }
    function toServerDuration(duration) {
      if (!isNumber(duration)) {
        return duration;
      }

      return round(duration * 1e6, 0);
    }
    function getRelativeTime(timestamp) {
      return timestamp - getNavigationStart();
    }
    function getTimestamp(relativeTime) {
      return Math.round(getNavigationStart() + relativeTime);
    }
    function relativeNow() {
      return performance.now();
    }
    function clocksNow() {
      return {
        relative: relativeNow(),
        timeStamp: timeStampNow()
      };
    }
    function timeStampNow() {
      return dateNow();
    }
    function looksLikeRelativeTime(time) {
      return time < ONE_YEAR;
    }
    function dateNow() {
      // Do not use `Date.now` because sometimes websites are wrongly "polyfilling" it. For example, we
      // had some users using a very old version of `datejs`, which patched `Date.now` to return a Date
      // instance instead of a timestamp[1]. Those users are unlikely to fix this, so let's handle this
      // case ourselves.
      // [1]: https://github.com/datejs/Datejs/blob/97f5c7c58c5bc5accdab8aa7602b6ac56462d778/src/core-debug.js#L14-L16
      return new Date().getTime();
    }
    function elapsed(start, end) {
      return end - start;
    }
    function clocksOrigin() {
      return {
        relative: 0,
        timeStamp: getNavigationStart()
      };
    }
    function relativeToClocks(relative) {
      return {
        relative: relative,
        timeStamp: getCorrectedTimeStamp(relative)
      };
    }
    function currentDrift() {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      return Math.round(dateNow() - (getNavigationStart() + performance.now()));
    }

    function getCorrectedTimeStamp(relativeTime) {
      var correctedOrigin = dateNow() - performance.now(); // apply correction only for positive drift

      if (correctedOrigin > getNavigationStart()) {
        return Math.round(correctedOrigin + relativeTime);
      }

      return getTimestamp(relativeTime);
    }
    /**
     * Navigation start slightly change on some rare cases
     */


    var navigationStart;
    function getNavigationStart() {
      if (navigationStart === undefined) {
        navigationStart = performance.timing.navigationStart;
      }

      return navigationStart;
    }
    function findCommaSeparatedValue(rawString, name) {
      var matches = rawString.match('(?:^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
      return matches ? matches[1] : undefined;
    }
    function findByPath(source, path) {
      var pathArr = path.split('.');

      while (pathArr.length) {
        var key = pathArr.shift();

        if (source && key in source && hasOwnProperty.call(source, key)) {
          source = source[key];
        } else {
          return undefined;
        }
      }

      return source;
    }
    function safeTruncate(candidate, length) {
      var lastChar = candidate.charCodeAt(length - 1); // check if it is the high part of a surrogate pair

      if (lastChar >= 0xd800 && lastChar <= 0xdbff) {
        return candidate.slice(0, length + 1);
      }

      return candidate.slice(0, length);
    }
    function addEventListener(emitter, event, listener, options) {
      return addEventListeners(emitter, [event], listener, options);
    }
    /**
     * Add event listeners to an event emitter object (Window, Element, mock object...).  This provides
     * a few conveniences compared to using `element.addEventListener` directly:
     *
     * * supports IE11 by:
     *   * using an option object only if needed
     *   * emulating the `once` option
     *
     * * wraps the listener with a `monitor` function
     *
     * * returns a `stop` function to remove the listener
     *
     * * with `once: true`, the listener will be called at most once, even if different events are
     *   listened
     */

    function addEventListeners(emitter, events, listener, options) {
      var wrapedListener = options && options.once ? function (event) {
        stop();
        listener(event);
      } : listener;
      options = options && options.passive ? {
        capture: options.capture,
        passive: options.passive
      } : options && options.capture;
      each(events, function (event) {
        emitter.addEventListener(event, wrapedListener, options);
      });

      var stop = function stop() {
        each(events, function (event) {
          emitter.removeEventListener(event, wrapedListener, options);
        });
      };

      return {
        stop: stop
      };
    }
    function includes(candidate, search) {
      // tslint:disable-next-line: no-unsafe-any
      return candidate.indexOf(search) !== -1;
    }
    function createContextManager() {
      var context = {};
      return {
        get: function get() {
          return context;
        },
        add: function add(key, value) {
          if (isString(key)) {
            context[key] = value;
          } else {
            console.error('key 需要传递字符串类型');
          }
        },
        remove: function remove(key) {
          delete context[key];
        },
        set: function set(newContext) {
          if (isObject(newContext)) {
            context = newContext;
          } else {
            console.error('content 需要传递对象类型数据');
          }
        },
        getContext: function getContext() {
          return deepClone(context);
        },
        setContext: function setContext(newContext) {
          context = deepClone(newContext);
        },
        setContextProperty: function setContextProperty(key, property) {
          context[key] = deepClone(property);
        },
        removeContextProperty: function removeContextProperty(key) {
          delete context[key];
        },
        clearContext: function clearContext() {
          context = {};
        }
      };
    }
    function find(array, predicate) {
      for (var i = 0; i < array.length; i += 1) {
        var item = array[i];

        if (predicate(item, i, array)) {
          return item;
        }
      }

      return undefined;
    }
    function findLast(array, predicate) {
      for (var i = array.length - 1; i >= 0; i -= 1) {
        var item = array[i];

        if (predicate(item, i, array)) {
          return item;
        }
      }

      return undefined;
    }
    function isPercentage(value) {
      return isNumber(value) && value >= 0 && value <= 100;
    }
    function getLocationOrigin() {
      return getLinkElementOrigin(window.location);
    }
    function isIE() {
      return Boolean(document.documentMode);
    }
    function isChromium() {
      return !!window.chrome || /HeadlessChrome/.test(window.navigator.userAgent);
    }
    /**
     * IE fallback
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/origin
     */

    function getLinkElementOrigin(element) {
      if (element.origin) {
        return element.origin;
      }

      var sanitizedHost = element.host.replace(/(:80|:443)$/, '');
      return element.protocol + '//' + sanitizedHost;
    }
    function withSnakeCaseKeys(candidate) {
      var result = {};
      each(candidate, function (value, key) {
        result[toSnakeCase(key)] = deepSnakeCase(value);
      });
      return result;
    }
    function deepSnakeCase(candidate) {
      if (isArray(candidate)) {
        return map(candidate, function (value) {
          return deepSnakeCase(value);
        });
      }

      if (typeof candidate === 'object' && candidate !== null) {
        return withSnakeCaseKeys(candidate);
      }

      return candidate;
    }
    function toSnakeCase(word) {
      return word.replace(/[A-Z]/g, function (uppercaseLetter, index) {
        return (index !== 0 ? '_' : '') + uppercaseLetter.toLowerCase();
      }).replace(/-/g, '_');
    }
    function escapeRowData(str) {
      if (typeof str === 'object' && str) {
        str = jsonStringify(str);
      } else if (!isString(str)) {
        return str;
      }

      var reg = /[\s=,"]/g;
      return String(str).replace(reg, function (word) {
        return '\\' + word;
      });
    }
    function escapeJsonValue(value) {
      if (isString(value)) {
        return value;
      } else {
        return jsonStringify(value);
      }
    }
    function escapeFieldValueStr(str) {
      return '"' + str.replace(/[\\]*"/g, '"').replace(/"/g, '\\"') + '"';
    }
    function escapeRowField(value) {
      if (typeof value === 'object' && value) {
        return escapeFieldValueStr(jsonStringify(value));
      } else if (isString(value)) {
        return escapeFieldValueStr(value);
      } else {
        return value;
      }
    }
    function isNullUndefinedDefaultValue(data, defaultValue) {
      if (data !== null && data !== void 0) {
        return data;
      } else {
        return defaultValue;
      }
    }

    var _BoundedBuffer = function _BoundedBuffer() {
      this.buffer = [];
    };

    _BoundedBuffer.prototype = {
      add: function add(item) {
        var length = this.buffer.push(item);

        if (length > this.limit) {
          this.buffer.splice(0, 1);
        }
      },
      drain: function drain(fn) {
        each(this.buffer, function (item) {
          fn(item);
        });
        this.buffer.length = 0;
      }
    };
    var BoundedBuffer = _BoundedBuffer;

    var END_OF_TIMES = Infinity;
    var CLEAR_OLD_CONTEXTS_INTERVAL = ONE_MINUTE;
    function ContextHistory(expireDelay) {
      this.expireDelay = expireDelay;
      this.entries = [];

      var _this = this;

      this.clearOldContextsInterval = setInterval(function () {
        _this.clearOldContexts();
      }, CLEAR_OLD_CONTEXTS_INTERVAL);
    }

    ContextHistory.prototype.add = function (context, startTime) {
      var _this = this;

      var entry = {
        context: context,
        startTime: startTime,
        endTime: END_OF_TIMES,
        remove: function remove() {
          var index = _this.entries.indexOf(entry);

          if (index >= 0) {
            _this.entries.splice(index, 1);
          }
        },
        close: function close(endTime) {
          entry.endTime = endTime;
        }
      };
      this.entries.unshift(entry);
      return entry;
    };

    ContextHistory.prototype.find = function (startTime) {
      if (typeof startTime === 'undefined') {
        startTime = END_OF_TIMES;
      }

      for (var entry of this.entries) {
        if (entry.startTime <= startTime) {
          if (startTime <= entry.endTime) {
            return entry.context;
          }

          break;
        }
      }
    };
    /**
     * Helper function to close the currently active context, if any. This method assumes that entries
     * are not overlapping.
     */


    ContextHistory.prototype.closeActive = function (endTime) {
      var latestEntry = this.entries[0];

      if (latestEntry && latestEntry.endTime === END_OF_TIMES) {
        latestEntry.close(endTime);
      }
    };
    /**
     * Return all contexts that were active during `startTime`, or all currently active contexts if no
     * `startTime` is provided.
     */


    ContextHistory.prototype.findAll = function (startTime) {
      if (typeof startTime === 'undefined') {
        startTime = END_OF_TIMES;
      }

      var result = filter(this.entries, function (entry) {
        return entry.startTime <= startTime && startTime <= entry.endTime;
      });
      return map(result, function (entry) {
        return entry.context;
      });
    };
    /**
     * Remove all entries from this collection.
     */


    ContextHistory.prototype.reset = function () {
      this.entries = [];
    };
    /**
     * Stop internal garbage collection of past entries.
     */


    ContextHistory.prototype.stop = function () {
      clearInterval(this.clearOldContextsInterval);
    };

    ContextHistory.prototype.clearOldContexts = function () {
      var oldTimeThreshold = relativeNow() - this.expireDelay;

      while (this.entries.length > 0 && this.entries[this.entries.length - 1].endTime < oldTimeThreshold) {
        this.entries.pop();
      }
    };

    var ConsoleApiName = {
      log: 'log',
      debug: 'debug',
      info: 'info',
      warn: 'warn',
      error: 'error'
    };
    var display = function display(api) {
      var args = [].slice.call(arguments, 1);

      if (!Object.prototype.hasOwnProperty.call(ConsoleApiName, api)) {
        api = ConsoleApiName.log;
      }

      display[api].apply(display, args);
    };
    display.debug = console.debug.bind(console);
    display.log = console.log.bind(console);
    display.info = console.info.bind(console);
    display.warn = console.warn.bind(console);
    display.error = console.error.bind(console);

    var VariableLibrary = {
      navigator: typeof window.navigator != 'undefined' ? window.navigator : {},
      // 信息map
      infoMap: {
        engine: ['WebKit', 'Trident', 'Gecko', 'Presto'],
        browser: ['Safari', 'Chrome', 'Edge', 'IE', 'IE 11', 'IE 10', 'IE 9', 'IE 8', 'IE 7', 'Firefox', 'Firefox Focus', 'Chromium', 'Opera', 'Vivaldi', 'Yandex', 'Arora', 'Lunascape', 'QupZilla', 'Coc Coc', 'Kindle', 'Iceweasel', 'Konqueror', 'Iceape', 'SeaMonkey', 'Epiphany', '360', '360SE', '360EE', 'UC', 'QQBrowser', 'QQ', 'Baidu', 'Maxthon', 'Sogou', 'LBBROWSER', '2345Explorer', 'TheWorld', 'XiaoMi', 'Quark', 'Qiyu', 'Wechat',, 'WechatWork', 'Taobao', 'Alipay', 'Weibo', 'Douban', 'Suning', 'iQiYi'],
        os: ['Windows', 'Linux', 'Mac OS', 'Android', 'Ubuntu', 'FreeBSD', 'Debian', 'iOS', 'Windows Phone', 'BlackBerry', 'MeeGo', 'Symbian', 'Chrome OS', 'WebOS'],
        device: ['Mobile', 'Tablet', 'iPad']
      }
    }; // 方法库

    var MethodLibrary = {
      // 获取匹配库
      getMatchMap: function getMatchMap(u) {
        return {
          // 内核
          Trident: u.indexOf('Trident') > -1 || u.indexOf('NET CLR') > -1,
          Presto: u.indexOf('Presto') > -1,
          WebKit: u.indexOf('AppleWebKit') > -1,
          Gecko: u.indexOf('Gecko/') > -1,
          // 浏览器
          Safari: u.indexOf('Safari') > -1,
          Chrome: u.indexOf('Chrome') > -1 || u.indexOf('CriOS') > -1,
          IE: u.indexOf('MSIE') > -1 || u.indexOf('Trident') > -1,
          Edge: u.indexOf('Edge') > -1,
          Firefox: u.indexOf('Firefox') > -1 || u.indexOf('FxiOS') > -1,
          'Firefox Focus': u.indexOf('Focus') > -1,
          Chromium: u.indexOf('Chromium') > -1,
          Opera: u.indexOf('Opera') > -1 || u.indexOf('OPR') > -1,
          Vivaldi: u.indexOf('Vivaldi') > -1,
          Yandex: u.indexOf('YaBrowser') > -1,
          Arora: u.indexOf('Arora') > -1,
          Lunascape: u.indexOf('Lunascape') > -1,
          QupZilla: u.indexOf('QupZilla') > -1,
          'Coc Coc': u.indexOf('coc_coc_browser') > -1,
          Kindle: u.indexOf('Kindle') > -1 || u.indexOf('Silk/') > -1,
          Iceweasel: u.indexOf('Iceweasel') > -1,
          Konqueror: u.indexOf('Konqueror') > -1,
          Iceape: u.indexOf('Iceape') > -1,
          SeaMonkey: u.indexOf('SeaMonkey') > -1,
          Epiphany: u.indexOf('Epiphany') > -1,
          360: u.indexOf('QihooBrowser') > -1 || u.indexOf('QHBrowser') > -1,
          '360EE': u.indexOf('360EE') > -1,
          '360SE': u.indexOf('360SE') > -1,
          UC: u.indexOf('UC') > -1 || u.indexOf(' UBrowser') > -1,
          QQBrowser: u.indexOf('QQBrowser') > -1,
          QQ: u.indexOf('QQ/') > -1,
          Baidu: u.indexOf('Baidu') > -1 || u.indexOf('BIDUBrowser') > -1,
          Maxthon: u.indexOf('Maxthon') > -1,
          Sogou: u.indexOf('MetaSr') > -1 || u.indexOf('Sogou') > -1,
          LBBROWSER: u.indexOf('LBBROWSER') > -1,
          '2345Explorer': u.indexOf('2345Explorer') > -1,
          TheWorld: u.indexOf('TheWorld') > -1,
          XiaoMi: u.indexOf('MiuiBrowser') > -1,
          Quark: u.indexOf('Quark') > -1,
          Qiyu: u.indexOf('Qiyu') > -1,
          Wechat: u.indexOf('MicroMessenger') > -1,
          Taobao: u.indexOf('AliApp(TB') > -1,
          Alipay: u.indexOf('AliApp(AP') > -1,
          Weibo: u.indexOf('Weibo') > -1,
          Douban: u.indexOf('com.douban.frodo') > -1,
          Suning: u.indexOf('SNEBUY-APP') > -1,
          iQiYi: u.indexOf('IqiyiApp') > -1,
          // 系统或平台
          Windows: u.indexOf('Windows') > -1,
          Linux: u.indexOf('Linux') > -1 || u.indexOf('X11') > -1,
          'Mac OS': u.indexOf('Macintosh') > -1,
          Android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
          Ubuntu: u.indexOf('Ubuntu') > -1,
          FreeBSD: u.indexOf('FreeBSD') > -1,
          Debian: u.indexOf('Debian') > -1,
          'Windows Phone': u.indexOf('IEMobile') > -1 || u.indexOf('Windows Phone') > -1,
          BlackBerry: u.indexOf('BlackBerry') > -1 || u.indexOf('RIM') > -1,
          MeeGo: u.indexOf('MeeGo') > -1,
          Symbian: u.indexOf('Symbian') > -1,
          iOS: u.indexOf('like Mac OS X') > -1,
          'Chrome OS': u.indexOf('CrOS') > -1,
          WebOS: u.indexOf('hpwOS') > -1,
          // 设备
          Mobile: u.indexOf('Mobi') > -1 || u.indexOf('iPh') > -1 || u.indexOf('480') > -1,
          Tablet: u.indexOf('Tablet') > -1 || u.indexOf('Nexus 7') > -1,
          iPad: u.indexOf('iPad') > -1
        };
      },
      // 在信息map和匹配库中进行匹配
      matchInfoMap: function matchInfoMap(_this) {
        var u = VariableLibrary.navigator.userAgent || {};
        var match = MethodLibrary.getMatchMap(u);

        for (var s in VariableLibrary.infoMap) {
          for (var i = 0; i < VariableLibrary.infoMap[s].length; i++) {
            var value = VariableLibrary.infoMap[s][i];

            if (match[value]) {
              _this[s] = value;
            }
          }
        }
      },
      // 获取当前操作系统
      getOS: function getOS() {
        var _this = this;

        MethodLibrary.matchInfoMap(_this);
        return _this.os || 'Unknown';
      },
      // 获取操作系统版本
      getOSVersion: function getOSVersion() {
        var _this = this;

        var u = VariableLibrary.navigator.userAgent || {};
        _this.osVersion = '';
        _this.osMajor = ''; // 系统版本信息

        var osVersion = {
          Windows: function Windows() {
            var v = u.replace(/^.*Windows NT ([\d.]+);.*$/, '$1');
            var oldWindowsVersionMap = {
              6.4: '10',
              6.3: '8.1',
              6.2: '8',
              6.1: '7',
              '6.0': 'Vista',
              5.2: 'XP',
              5.1: 'XP',
              '5.0': '2000'
            };
            return oldWindowsVersionMap[v] || v;
          },
          Android: function Android() {
            return u.replace(/^.*Android ([\d.]+);.*$/, '$1');
          },
          iOS: function iOS() {
            return u.replace(/^.*OS ([\d_]+) like.*$/, '$1').replace(/_/g, '.');
          },
          Debian: function Debian() {
            return u.replace(/^.*Debian\/([\d.]+).*$/, '$1');
          },
          'Windows Phone': function WindowsPhone() {
            return u.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, '$2');
          },
          'Mac OS': function MacOS() {
            return u.replace(/^.*Mac OS X ([\d_]+).*$/, '$1').replace(/_/g, '.');
          },
          WebOS: function WebOS() {
            return u.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1');
          }
        };

        if (osVersion[_this.os]) {
          _this.osVersion = osVersion[_this.os]();

          if (_this.osVersion === u) {
            _this.osVersion = '';
          }
        }

        if (_this.osVersion) {
          _this.osMajor = _this.osVersion.split('.').length && _this.osVersion.split('.')[0];
        }

        return {
          version: _this.osVersion,
          osMajor: _this.osMajor
        };
      },
      // 获取横竖屏状态
      getOrientationStatu: function getOrientationStatu() {
        var orientationStatus = '';
        var orientation = window.matchMedia('(orientation: portrait)');

        if (orientation.matches) {
          orientationStatus = '竖屏';
        } else {
          orientationStatus = '横屏';
        }

        return orientationStatus;
      },
      // 获取设备类型
      getDeviceType: function getDeviceType() {
        var _this = this;

        _this.device = 'PC';
        MethodLibrary.matchInfoMap(_this);
        return _this.device;
      },
      // 获取网络状态
      getNetwork: function getNetwork() {
        var netWork = navigator && navigator.connection && navigator.connection.effectiveType;
        return netWork;
      },
      // 获取当前语言
      getLanguage: function getLanguage() {
        var _this = this;

        _this.language = function () {
          var language = VariableLibrary.navigator.browserLanguage || VariableLibrary.navigator.language;
          var arr = language.split('-');

          if (arr[1]) {
            arr[1] = arr[1].toUpperCase();
          }

          return arr.join('_');
        }();

        return _this.language;
      },
      // 浏览器信息
      getBrowserInfo: function getBrowserInfo() {
        var _this = this;

        MethodLibrary.matchInfoMap(_this);
        var u = VariableLibrary.navigator.userAgent || {};

        var _mime = function _mime(option, value) {
          var mimeTypes = VariableLibrary.navigator.mimeTypes;

          for (var key in mimeTypes) {
            if (mimeTypes[key][option] == value) {
              return true;
            }
          }

          return false;
        };

        var match = MethodLibrary.getMatchMap(u);
        var is360 = false;

        if (window.chrome) {
          var chrome_version = u.replace(/^.*Chrome\/([\d]+).*$/, '$1');

          if (chrome_version > 36 && window.showModalDialog) {
            is360 = true;
          } else if (chrome_version > 45) {
            is360 = _mime('type', 'application/vnd.chromium.remoting-viewer');
          }
        }

        if (match['Baidu'] && match['Opera']) {
          match['Baidu'] = false;
        }

        if (match['Mobile']) {
          match['Mobile'] = !(u.indexOf('iPad') > -1);
        }

        if (is360) {
          if (_mime('type', 'application/gameplugin')) {
            match['360SE'] = true;
          } else if (VariableLibrary.navigator && typeof VariableLibrary.navigator['connection']['saveData'] == 'undefined') {
            match['360SE'] = true;
          } else {
            match['360EE'] = true;
          }
        }

        if (match['IE'] || match['Edge']) {
          var navigator_top = window.screenTop - window.screenY;

          switch (navigator_top) {
            case 71:
              // 无收藏栏,贴边
              break;

            case 74:
              // 无收藏栏,非贴边
              break;

            case 99:
              // 有收藏栏,贴边
              break;

            case 102:
              // 有收藏栏,非贴边
              match['360EE'] = true;
              break;

            case 75:
              // 无收藏栏,贴边
              break;

            case 74:
              // 无收藏栏,非贴边
              break;

            case 105:
              // 有收藏栏,贴边
              break;

            case 104:
              // 有收藏栏,非贴边
              match['360SE'] = true;
              break;
          }
        }

        var browerVersionMap = {
          Safari: function Safari() {
            return u.replace(/^.*Version\/([\d.]+).*$/, '$1');
          },
          Chrome: function Chrome() {
            return u.replace(/^.*Chrome\/([\d.]+).*$/, '$1').replace(/^.*CriOS\/([\d.]+).*$/, '$1');
          },
          IE: function IE() {
            return u.replace(/^.*MSIE ([\d.]+).*$/, '$1').replace(/^.*rv:([\d.]+).*$/, '$1');
          },
          Edge: function Edge() {
            return u.replace(/^.*Edge\/([\d.]+).*$/, '$1');
          },
          Firefox: function Firefox() {
            return u.replace(/^.*Firefox\/([\d.]+).*$/, '$1').replace(/^.*FxiOS\/([\d.]+).*$/, '$1');
          },
          'Firefox Focus': function FirefoxFocus() {
            return u.replace(/^.*Focus\/([\d.]+).*$/, '$1');
          },
          Chromium: function Chromium() {
            return u.replace(/^.*Chromium\/([\d.]+).*$/, '$1');
          },
          Opera: function Opera() {
            return u.replace(/^.*Opera\/([\d.]+).*$/, '$1').replace(/^.*OPR\/([\d.]+).*$/, '$1');
          },
          Vivaldi: function Vivaldi() {
            return u.replace(/^.*Vivaldi\/([\d.]+).*$/, '$1');
          },
          Yandex: function Yandex() {
            return u.replace(/^.*YaBrowser\/([\d.]+).*$/, '$1');
          },
          Arora: function Arora() {
            return u.replace(/^.*Arora\/([\d.]+).*$/, '$1');
          },
          Lunascape: function Lunascape() {
            return u.replace(/^.*Lunascape[\/\s]([\d.]+).*$/, '$1');
          },
          QupZilla: function QupZilla() {
            return u.replace(/^.*QupZilla[\/\s]([\d.]+).*$/, '$1');
          },
          'Coc Coc': function CocCoc() {
            return u.replace(/^.*coc_coc_browser\/([\d.]+).*$/, '$1');
          },
          Kindle: function Kindle() {
            return u.replace(/^.*Version\/([\d.]+).*$/, '$1');
          },
          Iceweasel: function Iceweasel() {
            return u.replace(/^.*Iceweasel\/([\d.]+).*$/, '$1');
          },
          Konqueror: function Konqueror() {
            return u.replace(/^.*Konqueror\/([\d.]+).*$/, '$1');
          },
          Iceape: function Iceape() {
            return u.replace(/^.*Iceape\/([\d.]+).*$/, '$1');
          },
          SeaMonkey: function SeaMonkey() {
            return u.replace(/^.*SeaMonkey\/([\d.]+).*$/, '$1');
          },
          Epiphany: function Epiphany() {
            return u.replace(/^.*Epiphany\/([\d.]+).*$/, '$1');
          },
          360: function _() {
            return u.replace(/^.*QihooBrowser\/([\d.]+).*$/, '$1');
          },
          '360SE': function SE() {
            var hash = {
              63: '10.0',
              55: '9.1',
              45: '8.1',
              42: '8.0',
              31: '7.0',
              21: '6.3'
            };
            var chrome_version = u.replace(/^.*Chrome\/([\d]+).*$/, '$1');
            return hash[chrome_version] || '';
          },
          '360EE': function EE() {
            var hash = {
              69: '11.0',
              63: '9.5',
              55: '9.0',
              50: '8.7',
              30: '7.5'
            };
            var chrome_version = u.replace(/^.*Chrome\/([\d]+).*$/, '$1');
            return hash[chrome_version] || '';
          },
          Maxthon: function Maxthon() {
            return u.replace(/^.*Maxthon\/([\d.]+).*$/, '$1');
          },
          QQBrowser: function QQBrowser() {
            return u.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1');
          },
          QQ: function QQ() {
            return u.replace(/^.*QQ\/([\d.]+).*$/, '$1');
          },
          Baidu: function Baidu() {
            return u.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, '$1');
          },
          UC: function UC() {
            return u.replace(/^.*UC?Browser\/([\d.]+).*$/, '$1');
          },
          Sogou: function Sogou() {
            return u.replace(/^.*SE ([\d.X]+).*$/, '$1').replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, '$1');
          },
          LBBROWSER: function LBBROWSER() {
            var version = '';

            if (u.indexOf('LieBaoFast') > -1) {
              version = u.replace(/^.*LieBaoFast\/([\d.]+).*$/, '$1');
            }

            var hash = {
              57: '6.5',
              49: '6.0',
              46: '5.9',
              42: '5.3',
              39: '5.2',
              34: '5.0',
              29: '4.5',
              21: '4.0'
            };
            var chrome_version = u.replace(/^.*Chrome\/([\d]+).*$/, '$1');
            return version || hash[chrome_version] || '';
          },
          '2345Explorer': function Explorer() {
            return u.replace(/^.*2345Explorer\/([\d.]+).*$/, '$1');
          },
          TheWorld: function TheWorld() {
            return u.replace(/^.*TheWorld ([\d.]+).*$/, '$1');
          },
          XiaoMi: function XiaoMi() {
            return u.replace(/^.*MiuiBrowser\/([\d.]+).*$/, '$1');
          },
          Quark: function Quark() {
            return u.replace(/^.*Quark\/([\d.]+).*$/, '$1');
          },
          Qiyu: function Qiyu() {
            return u.replace(/^.*Qiyu\/([\d.]+).*$/, '$1');
          },
          Wechat: function Wechat() {
            return u.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1');
          },
          WechatWork: function WechatWork() {
            return u.replace(/^.*wxwork\/([\d.]+).*$/, '$1');
          },
          Taobao: function Taobao() {
            return u.replace(/^.*AliApp\(TB\/([\d.]+).*$/, '$1');
          },
          Alipay: function Alipay() {
            return u.replace(/^.*AliApp\(AP\/([\d.]+).*$/, '$1');
          },
          Weibo: function Weibo() {
            return u.replace(/^.*weibo__([\d.]+).*$/, '$1');
          },
          Douban: function Douban() {
            return u.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1');
          },
          Suning: function Suning() {
            return u.replace(/^.*SNEBUY-APP([\d.]+).*$/, '$1');
          },
          iQiYi: function iQiYi() {
            return u.replace(/^.*IqiyiVersion\/([\d.]+).*$/, '$1');
          }
        };
        _this.browserVersion = '';
        _this.browserMajor = '';

        if (browerVersionMap[_this.browser]) {
          _this.browserVersion = browerVersionMap[_this.browser]();

          if (_this.browserVersion == u) {
            _this.browserVersion = '';
          }
        }

        if (_this.browser == 'Chrome' && u.match(/\S+Browser/)) {
          _this.browser = u.match(/\S+Browser/)[0];
          _this.version = u.replace(/^.*Browser\/([\d.]+).*$/, '$1');
        }

        if (_this.browser == 'Edge') {
          if (_this.version > '75') {
            _this.engine = 'Blink';
          } else {
            _this.engine = 'EdgeHTML';
          }
        }

        if (_this.browser == 'Chrome' && parseInt(_this.browserVersion) > 27) {
          _this.engine = 'Blink';
        } else if (match['Chrome'] && _this.engine == 'WebKit' && parseInt(_this.browserVersion) > 27) {
          _this.engine = 'Blink';
        } else if (_this.browser == 'Opera' && parseInt(_this.version) > 12) {
          _this.engine = 'Blink';
        } else if (_this.browser == 'Yandex') {
          _this.engine = 'Blink';
        }

        if (_this.browserVersion) {
          _this.browserMajor = _this.browserVersion.split('.').length && this.browserVersion.split('.')[0];
        }

        return {
          browser: _this.browser,
          browserVersion: _this.browserVersion,
          engine: _this.engine,
          browserMajor: _this.browserMajor
        };
      },
      // 获取地理位置
      getGeoPostion: function getGeoPostion(callback) {
        navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition( // 位置获取成功
        function (position) {
          callback(position);
        }, // 位置获取失败
        function (error) {
          display.warn(error);
        });
      }
    };
    var deviceInfo = {
      os: MethodLibrary.getOS(),
      osVersion: MethodLibrary.getOSVersion().version,
      osVersionMajor: MethodLibrary.getOSVersion().osMajor,
      browser: MethodLibrary.getBrowserInfo().browser,
      browserVersion: MethodLibrary.getBrowserInfo().browserVersion,
      browserVersionMajor: MethodLibrary.getBrowserInfo().browserMajor,
      screenSize: window.screen.width + '*' + window.screen.height,
      networkType: MethodLibrary.getNetwork(),
      divice: MethodLibrary.getDeviceType()
    };

    var DOM_EVENT = {
      BEFORE_UNLOAD: 'beforeunload',
      CLICK: 'click',
      DBL_CLICK: 'dblclick',
      KEY_DOWN: 'keydown',
      LOAD: 'load',
      POP_STATE: 'popstate',
      SCROLL: 'scroll',
      TOUCH_START: 'touchstart',
      TOUCH_END: 'touchend',
      TOUCH_MOVE: 'touchmove',
      VISIBILITY_CHANGE: 'visibilitychange',
      DOM_CONTENT_LOADED: 'DOMContentLoaded',
      POINTER_DOWN: 'pointerdown',
      POINTER_UP: 'pointerup',
      POINTER_CANCEL: 'pointercancel',
      HASH_CHANGE: 'hashchange',
      PAGE_HIDE: 'pagehide',
      MOUSE_DOWN: 'mousedown',
      MOUSE_UP: 'mouseup',
      MOUSE_MOVE: 'mousemove',
      FOCUS: 'focus',
      BLUR: 'blur',
      CONTEXT_MENU: 'contextmenu',
      RESIZE: 'resize',
      CHANGE: 'change',
      INPUT: 'input',
      PLAY: 'play',
      PAUSE: 'pause',
      SECURITY_POLICY_VIOLATION: 'securitypolicyviolation',
      SELECTION_CHANGE: 'selectionchange'
    };
    var ResourceType = {
      DOCUMENT: 'document',
      XHR: 'xhr',
      BEACON: 'beacon',
      FETCH: 'fetch',
      CSS: 'css',
      JS: 'js',
      IMAGE: 'image',
      FONT: 'font',
      MEDIA: 'media',
      OTHER: 'other'
    };
    var ActionType = {
      CLICK: 'click',
      CUSTOM: 'custom'
    };
    var FrustrationType = {
      RAGE_CLICK: 'rage_click',
      ERROR_CLICK: 'error_click',
      DEAD_CLICK: 'dead_click'
    };
    var RumEventType = {
      ACTION: 'action',
      ERROR: 'error',
      LONG_TASK: 'long_task',
      VIEW: 'view',
      RESOURCE: 'resource',
      LOGGER: 'logger'
    };
    var ViewLoadingType = {
      INITIAL_LOAD: 'initial_load',
      ROUTE_CHANGE: 'route_change'
    };
    var RequestType = {
      FETCH: ResourceType.FETCH,
      XHR: ResourceType.XHR
    };
    var TraceType = {
      DDTRACE: 'ddtrace',
      ZIPKIN_MULTI_HEADER: 'zipkin',
      ZIPKIN_SINGLE_HEADER: 'zipkin_single_header',
      W3C_TRACEPARENT: 'w3c_traceparent',
      SKYWALKING_V3: 'skywalking_v3',
      JAEGER: 'jaeger'
    };
    var ErrorHandling = {
      HANDLED: 'handled',
      UNHANDLED: 'unhandled'
    };

    function instrumentMethod(object, method, instrumentationFactory) {
      var original = object[method];
      var instrumentation = instrumentationFactory(original);

      var instrumentationWrapper = function instrumentationWrapper() {
        if (typeof instrumentation !== 'function') {
          return undefined;
        } // eslint-disable-next-line @typescript-eslint/no-unsafe-return


        return instrumentation.apply(this, arguments);
      };

      object[method] = instrumentationWrapper;
      return {
        stop: function stop() {
          if (object[method] === instrumentationWrapper) {
            object[method] = original;
          } else {
            instrumentation = original;
          }
        }
      };
    }
    function instrumentMethodAndCallOriginal(object, method, aliasOption) {
      return instrumentMethod(object, method, function (original) {
        return function () {
          var result;

          if (aliasOption && aliasOption.before) {
            aliasOption.before.apply(this, arguments);
          }

          if (typeof original === 'function') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            result = original.apply(this, arguments);
          }

          if (aliasOption && aliasOption.after) {
            aliasOption.after.apply(this, arguments);
          }

          return result;
        };
      });
    }

    var UNKNOWN_FUNCTION = '?';
    /**
     * Computes a stack trace for an exception.
     */

    function computeStackTrace(ex) {
      var stack = [];
      var stackProperty = tryToGetString(ex, 'stack');

      if (stackProperty) {
        each(stackProperty.split('\n'), function (line) {
          var stackFrame = parseChromeLine(line) || parseChromeAnonymousLine(line) || parseWinLine(line) || parseGeckoLine(line);

          if (stackFrame) {
            if (!stackFrame.func && stackFrame.line) {
              stackFrame.func = UNKNOWN_FUNCTION;
            }

            stack.push(stackFrame);
          }
        });
      }

      return {
        message: tryToGetString(ex, 'message'),
        name: tryToGetString(ex, 'name'),
        stack: stack
      };
    }
    var fileUrl = '((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\\w+\\.|\\/).*?)';
    var filePosition = '(?::(\\d+))';
    var CHROME_LINE_RE = new RegExp('^\\s*at (.*?) ?\\(' + fileUrl + filePosition + '?' + filePosition + '?\\)?\\s*$', 'i');
    var CHROME_EVAL_RE = new RegExp('\\((\\S*)' + filePosition + filePosition + '\\)');

    function parseChromeLine(line) {
      var parts = CHROME_LINE_RE.exec(line);

      if (!parts) {
        return;
      }

      var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line

      var isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line

      var submatch = CHROME_EVAL_RE.exec(parts[2]);

      if (isEval && submatch) {
        // throw out eval line/column and use top-most line/column number
        parts[2] = submatch[1]; // url

        parts[3] = submatch[2]; // line

        parts[4] = submatch[3]; // column
      }

      return {
        args: isNative ? [parts[2]] : [],
        column: parts[4] ? +parts[4] : undefined,
        func: parts[1] || UNKNOWN_FUNCTION,
        line: parts[3] ? +parts[3] : undefined,
        url: !isNative ? parts[2] : undefined
      };
    }

    var CHROME_ANONYMOUS_FUNCTION_RE = new RegExp('^\\s*at ?' + fileUrl + filePosition + '?' + filePosition + '??\\s*$', 'i');

    function parseChromeAnonymousLine(line) {
      var parts = CHROME_ANONYMOUS_FUNCTION_RE.exec(line);

      if (!parts) {
        return;
      }

      return {
        args: [],
        column: parts[3] ? +parts[3] : undefined,
        func: UNKNOWN_FUNCTION,
        line: parts[2] ? +parts[2] : undefined,
        url: parts[1]
      };
    }

    var WINJS_LINE_RE = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;

    function parseWinLine(line) {
      var parts = WINJS_LINE_RE.exec(line);

      if (!parts) {
        return;
      }

      return {
        args: [],
        column: parts[4] ? +parts[4] : undefined,
        func: parts[1] || UNKNOWN_FUNCTION,
        line: +parts[3],
        url: parts[2]
      };
    }

    var GECKO_LINE_RE = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|capacitor|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i;
    var GECKO_EVAL_RE = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;

    function parseGeckoLine(line) {
      var parts = GECKO_LINE_RE.exec(line);

      if (!parts) {
        return;
      }

      var isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
      var submatch = GECKO_EVAL_RE.exec(parts[3]);

      if (isEval && submatch) {
        // throw out eval line/column and use top-most line number
        parts[3] = submatch[1];
        parts[4] = submatch[2];
        parts[5] = undefined; // no column when eval
      }

      return {
        args: parts[2] ? parts[2].split(',') : [],
        column: parts[5] ? +parts[5] : undefined,
        func: parts[1] || UNKNOWN_FUNCTION,
        line: parts[4] ? +parts[4] : undefined,
        url: parts[3]
      };
    }

    function tryToGetString(candidate, property) {
      if (typeof candidate !== 'object' || !candidate || !(property in candidate)) {
        return undefined;
      }

      var value = candidate[property];
      return typeof value === 'string' ? value : undefined;
    }

    var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
    /**
     * Cross-browser collection of unhandled errors
     *
     * Supports:
     * - Firefox: full stack trace with line numbers, plus column number
     * on top frame; column number is not guaranteed
     * - Opera: full stack trace with line and column numbers
     * - Chrome: full stack trace with line and column numbers
     * - Safari: line and column number for the top frame only; some frames
     * may be missing, and column number is not guaranteed
     * - IE: line and column number for the top frame only; some frames
     * may be missing, and column number is not guaranteed
     *
     * In theory, TraceKit should work on all of the following versions:
     * - IE5.5+ (only 8.0 tested)
     * - Firefox 0.9+ (only 3.5+ tested)
     * - Opera 7+ (only 10.50 tested; versions 9 and earlier may require
     * Exceptions Have Stacktrace to be enabled in opera:config)
     * - Safari 3+ (only 4+ tested)
     * - Chrome 1+ (only 5+ tested)
     * - Konqueror 3.5+ (untested)
     *
     * Tries to catch all unhandled errors and report them to the
     * callback.
     *
     * Callbacks receive a StackTrace object as described in the
     * computeStackTrace docs.
     *
     * @memberof TraceKit
     * @namespace
     */

    function startUnhandledErrorCollection(callback) {
      var _instrumentOnError = instrumentOnError(callback);

      var _instrumentUnhandledRejection = instrumentUnhandledRejection(callback);

      return {
        stop: function stop() {
          _instrumentOnError.stop();

          _instrumentUnhandledRejection.stop();
        }
      };
    }
    /**
     * Install a global onerror handler
     */

    function instrumentOnError(callback) {
      return instrumentMethodAndCallOriginal(window, 'onerror', {
        before: function before(message, url, lineNo, columnNo, errorObj) {
          var stack;

          if (errorObj) {
            stack = computeStackTrace(errorObj);
            callback(stack, errorObj);
          } else {
            var location = {
              url: url,
              column: columnNo,
              line: lineNo
            };
            var name;
            var msg = message;

            if ({}.toString.call(message) === '[object String]') {
              var groups = ERROR_TYPES_RE.exec(msg);

              if (groups) {
                name = groups[1];
                msg = groups[2];
              }
            }

            stack = {
              name: name,
              message: typeof msg === 'string' ? msg : undefined,
              stack: [location]
            };
            callback(stack, message);
          }
        }
      });
    }
    /**
     * Install a global onunhandledrejection handler
     */


    function instrumentUnhandledRejection(callback) {
      return instrumentMethodAndCallOriginal(window, 'onunhandledrejection', {
        before: function before(e) {
          var reason = e.reason || 'Empty reason';
          var stack = computeStackTrace(reason);
          callback(stack, reason);
        }
      });
    }

    var ErrorSource = {
      AGENT: 'agent',
      CONSOLE: 'console',
      NETWORK: 'network',
      SOURCE: 'source',
      LOGGER: 'logger',
      CUSTOM: 'custom'
    };
    function computeRawError(data) {
      var stackTrace = data.stackTrace;
      var originalError = data.originalError;
      var handlingStack = data.handlingStack;
      var startClocks = data.startClocks;
      var nonErrorPrefix = data.nonErrorPrefix;
      var source = data.source;
      var handling = data.handling;

      if (!stackTrace || stackTrace.message === undefined && !(originalError instanceof Error)) {
        return {
          startClocks: startClocks,
          source: source,
          handling: handling,
          originalError: originalError,
          message: nonErrorPrefix + ' ' + jsonStringify(originalError),
          stack: 'No stack, consider using an instance of Error',
          handlingStack: handlingStack,
          type: stackTrace && stackTrace.name
        };
      }

      return {
        startClocks: startClocks,
        source: source,
        handling: handling,
        originalError: originalError,
        message: stackTrace.message || 'Empty message',
        stack: toStackTraceString(stackTrace),
        handlingStack: handlingStack,
        type: stackTrace.name,
        causes: flattenErrorCauses(originalError, source)
      };
    }
    /**
     Creates a stacktrace without SDK internal frames.
     
     Constraints:
     - Has to be called at the utmost position of the call stack.
     - No internal monitoring should encapsulate the function, that is why we need to use callMonitored inside of it.
     */

    function createHandlingStack() {
      /**
       * Skip the two internal frames:
       * - SDK API (console.error, ...)
       * - this function
       * in order to keep only the user calls
       */
      var internalFramesToSkip = 2;
      var error = new Error();
      var formattedStack; // IE needs to throw the error to fill in the stack trace

      if (!error.stack) {
        try {
          throw error;
        } catch (e) {
        }
      }

      var stackTrace = computeStackTrace(error);
      stackTrace.stack = stackTrace.stack.slice(internalFramesToSkip);
      formattedStack = toStackTraceString(stackTrace);
      return formattedStack;
    }
    function toStackTraceString(stack) {
      var result = formatErrorMessage(stack);
      each(stack.stack, function (frame) {
        var func = frame.func === '?' ? '<anonymous>' : frame.func;
        var args = frame.args && frame.args.length > 0 ? '(' + frame.args.join(', ') + ')' : '';
        var line = frame.line ? ':' + frame.line : '';
        var column = frame.line && frame.column ? ':' + frame.column : '';
        result += '\n  at ' + func + args + ' @ ' + frame.url + line + column;
      });
      return result;
    }
    function formatErrorMessage(stack) {
      return (stack.name || 'Error') + ': ' + stack.message;
    }
    function flattenErrorCauses(error, parentSource) {
      var currentError = error;
      var causes = [];

      while (currentError && currentError.cause instanceof Error && causes.length < 10) {
        var stackTrace = computeStackTrace(currentError.cause);
        causes.push({
          message: currentError.cause.message,
          source: parentSource,
          type: stackTrace && stackTrace.name,
          stack: stackTrace && toStackTraceString(stackTrace)
        });
        currentError = currentError.cause;
      }

      return causes.length ? causes : undefined;
    }

    function trackRuntimeError(errorObservable) {
      return startUnhandledErrorCollection(function (stackTrace, originalError) {
        errorObservable.notify(computeRawError({
          stackTrace: stackTrace,
          originalError: originalError,
          startClocks: clocksNow(),
          nonErrorPrefix: 'Uncaught',
          source: ErrorSource.SOURCE,
          handling: ErrorHandling.UNHANDLED
        }));
      });
    }

    var _Observable = function _Observable(onFirstSubscribe) {
      this.observers = [];
      this.onLastUnsubscribe = undefined;
      this.onFirstSubscribe = onFirstSubscribe;
    };

    _Observable.prototype = {
      subscribe: function subscribe(f) {
        if (!this.observers.length && this.onFirstSubscribe) {
          this.onLastUnsubscribe = this.onFirstSubscribe() || undefined;
        }

        this.observers.push(f);

        var _this = this;

        return {
          unsubscribe: function unsubscribe() {
            _this.observers = filter(_this.observers, function (other) {
              return f !== other;
            });

            if (!_this.observers.length && _this.onLastUnsubscribe) {
              _this.onLastUnsubscribe();
            }
          }
        };
      },
      notify: function notify(data) {
        each(this.observers, function (observer) {
          observer(data);
        });
      }
    };
    var Observable = _Observable;
    function mergeObservables() {
      var observables = [].slice.call(arguments);
      var globalObservable = new Observable(function () {
        var subscriptions = map(observables, function (observable) {
          return observable.subscribe(function (data) {
            return globalObservable.notify(data);
          });
        });
        return function () {
          return each(subscriptions, function (subscription) {
            return subscription.unsubscribe();
          });
        };
      });
      return globalObservable;
    }

    var consoleObservablesByApi = {};
    function initConsoleObservable(apis) {
      var consoleObservables = map(apis, function (api) {
        if (!consoleObservablesByApi[api]) {
          consoleObservablesByApi[api] = createConsoleObservable(api);
        }

        return consoleObservablesByApi[api];
      });
      return mergeObservables.apply(this, consoleObservables);
    }
    /* eslint-disable no-console */

    function createConsoleObservable(api) {
      var observable = new Observable(function () {
        var originalConsoleApi = console[api];

        console[api] = function () {
          var params = [].slice.call(arguments);
          originalConsoleApi.apply(console, arguments);
          var handlingStack = createHandlingStack();
          observable.notify(buildConsoleLog(params, api, handlingStack));
        };

        return function () {
          console[api] = originalConsoleApi;
        };
      });
      return observable;
    }

    function buildConsoleLog(params, api, handlingStack) {
      // Todo: remove console error prefix in the next major version
      var message = map(params, function (param) {
        return formatConsoleParameters(param);
      }).join(' ');
      var stack;

      if (api === ConsoleApiName.error) {
        var firstErrorParam = find(params, function (param) {
          return param instanceof Error;
        });
        stack = firstErrorParam ? toStackTraceString(computeStackTrace(firstErrorParam)) : undefined;
        message = 'console error: ' + message;
      }

      return {
        api: api,
        message: message,
        stack: stack,
        handlingStack: handlingStack
      };
    }

    function formatConsoleParameters(param) {
      if (typeof param === 'string') {
        return param;
      }

      if (param instanceof Error) {
        return formatErrorMessage(computeStackTrace(param));
      }

      return jsonStringify(param, undefined, 2);
    }

    var RawReportType = {
      intervention: 'intervention',
      deprecation: 'deprecation',
      cspViolation: 'csp_violation'
    };
    function initReportObservable(apis) {
      var observables = [];

      if (includes(apis, RawReportType.cspViolation)) {
        observables.push(createCspViolationReportObservable());
      }

      var reportTypes = filter(apis, function (api) {
        return api !== RawReportType.cspViolation;
      });

      if (reportTypes.length) {
        observables.push(createReportObservable(reportTypes));
      }

      return mergeObservables.apply(this, observables);
    }

    function createReportObservable(reportTypes) {
      var observable = new Observable(function () {
        if (!window.ReportingObserver) {
          return;
        }

        var handleReports = function handleReports(reports) {
          each(reports, function (report) {
            observable.notify(buildRawReportFromReport(report));
          });
        };

        var observer = new window.ReportingObserver(handleReports, {
          types: reportTypes,
          buffered: true
        });
        observer.observe();
        return function () {
          observer.disconnect();
        };
      });
      return observable;
    }

    function createCspViolationReportObservable() {
      var observable = new Observable(function () {
        var handleCspViolation = function handleCspViolation(event) {
          observable.notify(buildRawReportFromCspViolation(event));
        };

        var _addEventListener = addEventListener(document, DOM_EVENT.SECURITY_POLICY_VIOLATION, handleCspViolation);

        return _addEventListener.stop;
      });
      return observable;
    }

    function buildRawReportFromReport(report) {
      var body = report.body;
      var type = report.type;
      return {
        type: type,
        subtype: body.id,
        message: type + ': ' + body.message,
        stack: buildStack(body.id, body.message, body.sourceFile, body.lineNumber, body.columnNumber)
      };
    }

    function buildRawReportFromCspViolation(event) {
      var type = RawReportType.cspViolation;
      var message = '\'' + event.blockedURI + '\' blocked by \'' + event.effectiveDirective + '\' directive';
      return {
        type: RawReportType.cspViolation,
        subtype: event.effectiveDirective,
        message: type + ': ' + message,
        stack: buildStack(event.effectiveDirective, message + ' of the policy "' + safeTruncate(event.originalPolicy, 100) + '"', event.sourceFile, event.lineNumber, event.columnNumber)
      };
    }

    function buildStack(name, message, sourceFile, lineNumber, columnNumber) {
      return sourceFile && toStackTraceString({
        name: name,
        message: message,
        stack: [{
          func: '?',
          url: sourceFile,
          line: lineNumber,
          column: columnNumber
        }]
      });
    }

    var LifeCycleEventType = {
      PERFORMANCE_ENTRIES_COLLECTED: 'PERFORMANCE_ENTRIES_COLLECTED',
      AUTO_ACTION_CREATED: 'AUTO_ACTION_CREATED',
      AUTO_ACTION_COMPLETED: 'AUTO_ACTION_COMPLETED',
      VIEW_CREATED: 'VIEW_CREATED',
      VIEW_UPDATED: 'VIEW_UPDATED',
      VIEW_ENDED: 'VIEW_ENDED',
      SESSION_RENEWED: 'SESSION_RENEWED',
      SESSION_EXPIRED: 'SESSION_EXPIRED',
      DOM_MUTATED: 'DOM_MUTATED',
      BEFORE_UNLOAD: 'BEFORE_UNLOAD',
      REQUEST_STARTED: 'REQUEST_STARTED',
      REQUEST_COMPLETED: 'REQUEST_COMPLETED',
      RAW_RUM_EVENT_COLLECTED: 'RAW_RUM_EVENT_COLLECTED',
      RUM_EVENT_COLLECTED: 'RUM_EVENT_COLLECTED',
      RAW_ERROR_COLLECTED: 'RAW_ERROR_COLLECTED',
      RECORD_STARTED: 'RECORD_STARTED',
      RECORD_STOPPED: 'RECORD_STOPPED',
      RAW_LOG_COLLECTED: 'RAW_LOG_COLLECTED',
      LOG_COLLECTED: 'LOG_COLLECTED'
    };
    function LifeCycle() {
      this.callbacks = [];
    }
    LifeCycle.prototype = {
      notify: function notify(eventType, data) {
        var eventCallbacks = this.callbacks[eventType];

        if (eventCallbacks) {
          each(eventCallbacks, function (callback) {
            callback(data);
          });
        }
      },
      subscribe: function subscribe(eventType, callback) {
        if (!this.callbacks[eventType]) {
          this.callbacks[eventType] = [];
        }

        this.callbacks[eventType].push(callback);

        var _this = this;

        return {
          unsubscribe: function unsubscribe() {
            _this.callbacks[eventType] = filter(_this.callbacks[eventType], function (other) {
              return other !== callback;
            });
          }
        };
      }
    };

    /**
     * Current limitations:
     * - field path do not support array, 'a.b.c' only
     * - modifiable fields type must be string
     */

    function limitModification(object, modifiableFieldPaths, modifier) {
      var clone = extend2Lev({}, object);
      var result = modifier(clone);
      each(modifiableFieldPaths, function (path) {
        var originalValue = get(object, path);
        var newValue = get(clone, path);

        if (typeof originalValue === 'string' && typeof newValue === 'string') {
          set(object, path, newValue);
        }
      });
      return result;
    }

    function get(object, path) {
      var current = object;

      for (var field of path.split('.')) {
        if (!isValidObjectContaining(current, field)) {
          return;
        }

        current = current[field];
      }

      return current;
    }

    function set(object, path, value) {
      var current = object;
      var fields = path.split('.');

      for (var i = 0; i < fields.length; i += 1) {
        var field = fields[i];

        if (!isValidObjectContaining(current, field)) {
          return;
        }

        if (i !== fields.length - 1) {
          current = current[field];
        } else {
          current[field] = value;
        }
      }
    }

    function isValidObjectContaining(object, field) {
      return typeof object === 'object' && object !== null && field in object;
    }

    function createEventRateLimiter(eventType, limit, onLimitReached) {
      var eventCount = 0;
      var allowNextEvent = false;
      return {
        isLimitReached: function isLimitReached() {
          if (eventCount === 0) {
            setTimeout(function () {
              eventCount = 0;
            }, ONE_MINUTE);
          }

          eventCount += 1;

          if (eventCount <= limit || allowNextEvent) {
            allowNextEvent = false;
            return false;
          }

          if (eventCount === limit + 1) {
            allowNextEvent = true;

            try {
              onLimitReached({
                message: 'Reached max number of ' + eventType + 's by minute: ' + limit,
                source: ErrorSource.AGENT,
                startClocks: clocksNow()
              });
            } finally {
              allowNextEvent = false;
            }
          }

          return true;
        }
      };
    }

    function normalizeUrl(url) {
      return buildUrl(url, getLocationOrigin()).href;
    }
    function isValidUrl(url) {
      try {
        return !!buildUrl(url);
      } catch (e) {
        return false;
      }
    }
    function getOrigin(url) {
      return getLinkElementOrigin(buildUrl(url));
    }
    function getPathName(url) {
      var pathname = buildUrl(url).pathname;
      return pathname[0] === '/' ? pathname : '/' + pathname;
    }
    function buildUrl(url, base) {
      if (checkURLSupported()) {
        return base !== undefined ? new URL(url, base) : new URL(url);
      }

      if (base === undefined && !/:/.test(url)) {
        throw new Error('Invalid URL: ' + url);
      }

      var doc = document;
      var anchorElement = doc.createElement('a');

      if (base !== undefined) {
        doc = document.implementation.createHTMLDocument('');
        var baseElement = doc.createElement('base');
        baseElement.href = base;
        doc.head.appendChild(baseElement);
        doc.body.appendChild(anchorElement);
      }

      anchorElement.href = url;
      return anchorElement;
    }
    var isURLSupported;

    function checkURLSupported() {
      if (isURLSupported !== undefined) {
        return isURLSupported;
      }

      try {
        var url = new URL('http://test/path');
        isURLSupported = url.href === 'http://test/path';
        return isURLSupported;
      } catch (e) {
        isURLSupported = false;
      }

      return isURLSupported;
    }

    var userAgent = navigator.userAgent.toLowerCase();
    var isIos = function isIos() {
      return /iphone os/.test(userAgent);
    };

    var JsBirdge = function JsBirdge() {
      this.bridge = window['FTWebViewJavascriptBridge'];
      this.tagMaps = {};
      window.mapWebViewCallBack = {};

      try {
        this.initBridge();
      } catch (err) {}
    };

    JsBirdge.prototype = {
      initBridge: function initBridge() {
        var _this = this;

        if (isIos()) {
          if (!_this.bridge) {
            if (window.WVJBCallbacks) {
              window.WVJBCallbacks.push(function (bridge) {
                _this.bridge = bridge;
              });
              return;
            } else {
              window.WVJBCallbacks = [function (bridge) {
                _this.bridge = bridge;
                return;
              }];
              var WVJBIframe = document.createElement('iframe');
              WVJBIframe.style.display = 'none';
              WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
              document.documentElement.appendChild(WVJBIframe);
              setTimeout(function () {
                document.documentElement.removeChild(WVJBIframe);
              }, 0);
            }
          }
        }
      },
      sendEvent: function sendEvent(params, callback) {
        if (typeof params === 'undefined') {
          params = {};
        }

        var _this = this;

        var tag = 'Unique id:' + new Date().getTime();

        if (params.name) {
          _this.tagMaps[params.name] = tag;

          window.mapWebViewCallBack[tag] = function (ret, err) {
            return Promise.resolve(ret, err);
          };

          params['_tag'] = tag;

          try {
            if (isIos()) {
              _this.bridge.callHandler('sendEvent', JSON.stringify(params), 'mapWebViewCallBack');
            } else {
              _this.bridge.sendEvent(JSON.stringify(params), 'mapWebViewCallBack');
            }
          } catch (err) {}
        } else {
          callback({
            error: '请传入发送事件的名称！！'
          });
        }
      },
      addEventListener: function addEventListener(params, callback) {
        var tag = 'Unique id:' + new Date().getTime();

        var _this = this;

        if (params.name) {
          _this.tagMaps[params.name] = tag;

          window.mapWebViewCallBack[tag] = function (ret, err) {
            callback(ret, err);
            return;
          };

          params['_tag'] = tag;

          try {
            if (isIos()) {
              _this.bridge.callHandler('addEventListener', JSON.stringify(params), 'mapWebViewCallBack');
            } else {
              _this.bridge.addEventListener(JSON.stringify(params), 'mapWebViewCallBack');
            }
          } catch (err) {}
        } else {
          callback({
            error: '请传入监听事件的名称！！'
          });
        }
      }
    };
    var JsBirdge = JsBirdge;

    var COOKIE_ACCESS_DELAY = ONE_SECOND;
    function setCookie(name, value, expireDelay, options) {
      var date = new Date();
      date.setTime(date.getTime() + expireDelay);
      var expires = 'expires=' + date.toUTCString();
      var sameSite = options && options.crossSite ? 'none' : 'strict';
      var domain = options && options.domain ? ';domain=' + options.domain : '';
      var secure = options && options.secure ? ';secure' : '';
      document.cookie = name + '=' + value + ';' + expires + ';path=/;samesite=' + sameSite + domain + secure;
    }
    function getCookie(name) {
      return findCommaSeparatedValue(document.cookie, name);
    }
    function areCookiesAuthorized(options) {
      if (document.cookie === undefined || document.cookie === null) {
        return false;
      }

      try {
        // Use a unique cookie name to avoid issues when the SDK is initialized multiple times during
        // the test cookie lifetime
        var testCookieName = "dd_cookie_test_".concat(UUID());
        var testCookieValue = 'test';
        setCookie(testCookieName, testCookieValue, ONE_SECOND, options);
        return getCookie(testCookieName) === testCookieValue;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
    /**
     * No API to retrieve it, number of levels for subdomain and suffix are unknown
     * strategy: find the minimal domain on which cookies are allowed to be set
     * https://web.dev/same-site-same-origin/#site
     */

    var getCurrentSiteCache;
    function getCurrentSite() {
      if (getCurrentSiteCache === undefined) {
        // Use a unique cookie name to avoid issues when the SDK is initialized multiple times during
        // the test cookie lifetime
        var testCookieName = "dd_site_test_".concat(UUID());
        var testCookieValue = 'test';
        var domainLevels = window.location.hostname.split('.');
        var candidateDomain = domainLevels.pop();

        while (domainLevels.length && !getCookie(testCookieName)) {
          candidateDomain = domainLevels.pop() + '.' + candidateDomain;
          setCookie(testCookieName, testCookieValue, ONE_SECOND, {
            domain: candidateDomain
          });
        }

        getCurrentSiteCache = candidateDomain;
      }

      return getCurrentSiteCache;
    }

    function catchUserErrors(fn, errorMsg) {
      return function () {
        var args = [].slice.call(arguments);

        try {
          return fn.apply(this, args);
        } catch (err) {
          display.error(errorMsg, err);
        }
      };
    }

    var TRIM_REGIX = /^\s+|\s+$/g;

    function getDatakitUrl(url) {
      if (url.lastIndexOf('/') === url.length - 1) return trim(url) + 'v1/write/rum';
      return trim(url) + '/v1/write/rum';
    }

    function trim(str) {
      return str.replace(TRIM_REGIX, '');
    }

    function getLogsEndPoint(url) {
      if (url.lastIndexOf('/') === url.length - 1) return trim(url) + 'v1/write/logging';
      return trim(url) + '/v1/write/logging';
    }

    function computeTransportConfiguration(initConfiguration) {
      var isIntakeUrl = function isIntakeUrl(url) {
        return false;
      };

      if ('isIntakeUrl' in initConfiguration && isFunction(initConfiguration.isIntakeUrl) && isBoolean(initConfiguration.isIntakeUrl())) {
        isIntakeUrl = initConfiguration.isIntakeUrl;
      }

      var isServerError = function isServerError(request) {
        return false;
      };

      if ('isServerError' in initConfiguration && isFunction(initConfiguration.isServerError) && isBoolean(initConfiguration.isServerError())) {
        isServerError = initConfiguration.isServerError;
      }

      return {
        datakitUrl: getDatakitUrl(initConfiguration.datakitUrl || initConfiguration.datakitOrigin),
        logsEndpoint: getLogsEndPoint(initConfiguration.datakitOrigin),
        isIntakeUrl: isIntakeUrl,
        isServerError: isServerError
      };
    }
    function isIntakeRequest(url, configuration) {
      // return haveSameOrigin(url, configuration.datakitUrl)
      var notTakeRequest = [configuration.datakitUrl];

      if (configuration.logsEndpoint) {
        notTakeRequest.push(configuration.logsEndpoint);
      } // datakit 地址，log 地址，以及客户自定义过滤方法定义url


      return some(notTakeRequest, function (takeUrl) {
        return url.indexOf(takeUrl) === 0;
      }) || configuration.isIntakeUrl(url);
    }

    function validateAndBuildConfiguration(initConfiguration) {
      if (initConfiguration.sampleRate !== undefined && !isPercentage(initConfiguration.sampleRate)) {
        display.error('Sample Rate should be a number between 0 and 100');
        return;
      }

      return assign({
        beforeSend: initConfiguration.beforeSend && catchUserErrors(initConfiguration.beforeSend, 'beforeSend threw an error:'),
        cookieOptions: buildCookieOptions(initConfiguration),
        sampleRate: isNullUndefinedDefaultValue(initConfiguration.sampleRate, 100),
        service: initConfiguration.service,
        version: initConfiguration.version,
        env: initConfiguration.env,
        silentMultipleInit: !!initConfiguration.silentMultipleInit,

        /**
         * beacon payload max queue size implementation is 64kb
         * ensure that we leave room for logs, rum and potential other users
         */
        batchBytesLimit: 16 * ONE_KIBI_BYTE,
        eventRateLimiterThreshold: 3000,

        /**
         * flush automatically, aim to be lower than ALB connection timeout
         * to maximize connection reuse.
         */
        flushTimeout: 30 * ONE_SECOND,

        /**
         * Logs intake limit
         */
        batchMessagesLimit: 50,
        messageBytesLimit: 256 * ONE_KIBI_BYTE
      }, computeTransportConfiguration(initConfiguration));
    }
    function buildCookieOptions(initConfiguration) {
      var cookieOptions = {};
      cookieOptions.secure = mustUseSecureCookie(initConfiguration);
      cookieOptions.crossSite = !!initConfiguration.useCrossSiteSessionCookie;

      if (initConfiguration.trackSessionAcrossSubdomains) {
        cookieOptions.domain = getCurrentSite();
      }

      return cookieOptions;
    }

    function mustUseSecureCookie(initConfiguration) {
      return !!initConfiguration.useSecureSessionCookie || !!initConfiguration.useCrossSiteSessionCookie;
    }

    var fetchObservable;
    function initFetchObservable() {
      if (!fetchObservable) {
        fetchObservable = createFetchObservable();
      }

      return fetchObservable;
    }

    function createFetchObservable() {
      var observable = new Observable(function () {
        if (!window.fetch) {
          return;
        }

        var fetchMethod = instrumentMethod(window, 'fetch', function (originalFetch) {
          return function (input, init) {
            var responsePromise;
            var context = beforeSend(observable, input, init);

            if (context) {
              responsePromise = originalFetch.call(this, context.input, context.init);
              afterSend(observable, responsePromise, context);
            } else {
              responsePromise = originalFetch.call(this, input, init);
            }

            return responsePromise;
          };
        });
        return fetchMethod.stop;
      });
      return observable;
    }

    function beforeSend(observable, input, init) {
      var method = init && init.method || typeof input === 'object' && input.method || 'GET';
      var url = normalizeUrl(typeof input === 'object' && input.url || input);
      var startClocks = clocksNow();
      var context = {
        state: 'start',
        init: init,
        input: input,
        method: method,
        startClocks: startClocks,
        url: url
      };
      observable.notify(context);
      return context;
    }

    function afterSend(observable, responsePromise, startContext) {
      var reportFetch = function reportFetch(response) {
        var context = startContext;
        context.state = 'complete';
        context.duration = elapsed(context.startClocks.timeStamp, timeStampNow());

        if ('stack' in response || response instanceof Error) {
          context.status = 0;
          context.isAborted = response instanceof DOMException && response.code === DOMException.ABORT_ERR;
          context.error = response;
          observable.notify(context);
        } else if ('status' in response) {
          context.response = response;
          context.responseType = response.type;
          context.status = response.status;
          context.isAborted = false;
          observable.notify(context);
        }
      };

      responsePromise.then(reportFetch, reportFetch);
    }

    var xhrObservable;
    var xhrContexts = {};
    var DATA_FLUX_REQUEST_ID_KEY = '_DATAFLUX_REQUEST_UUID';
    function initXhrObservable() {
      if (!xhrObservable) {
        xhrObservable = createXhrObservable();
      }

      return xhrObservable;
    }

    function createXhrObservable() {
      var observable = new Observable(function () {
        var openInstrumentMethod = instrumentMethodAndCallOriginal(XMLHttpRequest.prototype, 'open', {
          before: openXhr
        });
        var sendInstrumentMethod = instrumentMethodAndCallOriginal(XMLHttpRequest.prototype, 'send', {
          before: function before() {
            sendXhr.call(this, observable);
          }
        });
        var abortInstrumentMethod = instrumentMethodAndCallOriginal(XMLHttpRequest.prototype, 'abort', {
          before: abortXhr
        });
        return function () {
          openInstrumentMethod.stop();
          sendInstrumentMethod.stop();
          abortInstrumentMethod.stop();
        };
      });
      return observable;
    }

    function openXhr(method, url) {
      var requestUUID = this[DATA_FLUX_REQUEST_ID_KEY] || UUID();
      this[DATA_FLUX_REQUEST_ID_KEY] = requestUUID;
      xhrContexts[requestUUID] = {
        state: 'open',
        method: method,
        url: normalizeUrl(String(url))
      };
    }

    function sendXhr(observable) {
      var context = xhrContexts[this[DATA_FLUX_REQUEST_ID_KEY]];

      if (!context) {
        return;
      }

      var startContext = context;
      startContext.state = 'start';
      startContext.startTime = relativeNow();
      startContext.startClocks = clocksNow();
      startContext.isAborted = false;
      startContext.xhr = this;
      var hasBeenReported = false;
      var onreadyStateChangeInstrumentMethod = instrumentMethodAndCallOriginal(this, 'onreadystatechange', {
        before: function before() {
          if (this.readyState === XMLHttpRequest.DONE) {
            // Try to report the XHR as soon as possible, because the XHR may be mutated by the
            // application during a future event. For example, Angular is calling .abort() on
            // completed requests during a onreadystatechange event, so the status becomes '0'
            // before the request is collected.
            onEnd.call(this);
          }
        }
      });

      var onEnd = function onEnd() {
        this.removeEventListener('loadend', onEnd);
        onreadyStateChangeInstrumentMethod.stop();

        if (hasBeenReported) {
          return;
        }

        hasBeenReported = true;
        var completeContext = context;
        completeContext.state = 'complete';
        completeContext.duration = elapsed(startContext.startClocks.timeStamp, timeStampNow());
        completeContext.status = this.status;
        observable.notify(shallowClone(completeContext));
        clearRequestId.call(this);
      };

      this.addEventListener('loadend', onEnd);
      observable.notify(startContext);
    }

    function clearRequestId() {
      delete xhrContexts[this[DATA_FLUX_REQUEST_ID_KEY]];
      delete this[DATA_FLUX_REQUEST_ID_KEY];
    }

    function abortXhr() {
      var context = xhrContexts[this[DATA_FLUX_REQUEST_ID_KEY]];

      if (context) {
        context.isAborted = true;
      }
    }

    var commonTags = {
      action_id: 'action.id',
      sdk_name: '_dd.sdk_name',
      sdk_version: '_dd.sdk_version',
      app_id: 'application.id',
      env: 'env',
      service: 'service',
      version: 'version',
      userid: 'user.id',
      user_email: 'user.email',
      user_name: 'user.name',
      session_id: 'session.id',
      session_type: 'session.type',
      session_sampling: 'session.is_sampling',
      is_signin: 'user.is_signin',
      os: 'device.os',
      os_version: 'device.os_version',
      os_version_major: 'device.os_version_major',
      browser: 'device.browser',
      browser_version: 'device.browser_version',
      browser_version_major: 'device.browser_version_major',
      screen_size: 'device.screen_size',
      network_type: 'device.network_type',
      device: 'device.device',
      view_id: 'view.id',
      view_referrer: 'view.referrer',
      view_url: 'view.url',
      view_host: 'view.host',
      view_path: 'view.path',
      view_path_group: 'view.path_group',
      view_url_query: 'view.url_query'
    }; // 需要用双引号将字符串类型的field value括起来， 这里有数组标示[string, path]

    var dataMap = {
      view: {
        type: RumEventType.VIEW,
        tags: {
          view_loading_type: 'view.loading_type',
          view_apdex_level: 'view.apdex_level',
          is_active: 'view.is_active'
        },
        fields: {
          view_error_count: 'view.error.count',
          view_resource_count: 'view.resource.count',
          view_long_task_count: 'view.long_task.count',
          view_action_count: 'view.action.count',
          first_contentful_paint: 'view.first_contentful_paint',
          largest_contentful_paint: 'view.largest_contentful_paint',
          cumulative_layout_shift: 'view.cumulative_layout_shift',
          first_input_delay: 'view.first_input_delay',
          loading_time: 'view.loading_time',
          dom_interactive: 'view.dom_interactive',
          dom_content_loaded: 'view.dom_content_loaded',
          dom_complete: 'view.dom_complete',
          load_event: 'view.load_event',
          first_input_time: 'view.first_input_time',
          first_meaningful_paint: 'view.largest_contentful_paint',
          first_paint_time: 'view.fpt',
          resource_load_time: 'view.resource_load_time',
          time_to_interactive: 'view.tti',
          dom: 'view.dom',
          dom_ready: 'view.dom_ready',
          time_spent: 'view.time_spent'
        }
      },
      resource: {
        type: RumEventType.RESOURCE,
        tags: {
          trace_id: '_dd.trace_id',
          span_id: '_dd.span_id',
          resource_url: 'resource.url',
          resource_url_host: 'resource.url_host',
          resource_url_path: 'resource.url_path',
          resource_url_path_group: 'resource.url_path_group',
          resource_url_query: 'resource.url_query',
          resource_type: 'resource.type',
          resource_status: 'resource.status',
          resource_status_group: 'resource.status_group',
          resource_method: 'resource.method'
        },
        fields: {
          duration: 'resource.duration',
          resource_size: 'resource.size',
          resource_dns: 'resource.dns',
          resource_tcp: 'resource.tcp',
          resource_ssl: 'resource.ssl',
          resource_ttfb: 'resource.ttfb',
          resource_trans: 'resource.trans',
          resource_first_byte: 'resource.firstbyte'
        }
      },
      error: {
        type: RumEventType.ERROR,
        tags: {
          error_id: 'error.id',
          trace_id: '_dd.trace_id',
          span_id: '_dd.span_id',
          error_source: 'error.source',
          error_type: 'error.type',
          error_handling: 'error.handling' //   resource_url: 'error.resource.url',
          //   resource_url_host: 'error.resource.url_host',
          //   resource_url_path: 'error.resource.url_path',
          //   resource_url_path_group: 'error.resource.url_path_group',
          //   resource_status: 'error.resource.status',
          //   resource_status_group: 'error.resource.status_group',
          //   resource_method: 'error.resource.method'

        },
        fields: {
          error_message: ['string', 'error.message'],
          error_stack: ['string', 'error.stack'],
          error_causes: ['string', 'error.causes']
        }
      },
      long_task: {
        type: RumEventType.LONG_TASK,
        tags: {
          long_task_id: 'long_task.id'
        },
        fields: {
          duration: 'long_task.duration'
        }
      },
      action: {
        type: RumEventType.ACTION,
        tags: {
          action_name: 'action.target.name',
          action_type: 'action.type'
        },
        fields: {
          duration: 'action.loading_time',
          action_error_count: 'action.error.count',
          action_resource_count: 'action.resource.count',
          action_frustration_types: 'action.frustration.type',
          action_long_task_count: 'action.long_task.count'
        }
      },
      browser_log: {
        type: RumEventType.LOGGER,
        tags: {
          error_source: 'error.source',
          error_type: 'error.type',
          error_resource_url: 'http.url',
          error_resource_url_host: 'http.url_host',
          error_resource_url_path: 'http.url_path',
          error_resource_url_path_group: 'http.url_path_group',
          error_resource_status: 'http.status_code',
          error_resource_status_group: 'http.status_group',
          error_resource_method: 'http.method',
          action_id: 'user_action.id',
          service: 'service',
          status: 'status'
        },
        fields: {
          message: ['string', 'message']
        }
      }
    };

    function makePublicApi(stub) {
      var publicApi = extend({}, stub, {
        onReady: function onReady(callback) {
          callback();
        }
      }); // Add an "hidden" property to set debug mode. We define it that way to hide it
      // as much as possible but of course it's not a real protection.

      Object.defineProperty(publicApi, '_setDebug', {
        get: function get() {
          return setDebugMode;
        },
        enumerable: false
      });
      return publicApi;
    }
    function defineGlobal(global, name, api) {
      var existingGlobalVariable = global[name];
      global[name] = api;

      if (existingGlobalVariable && existingGlobalVariable.q) {
        each(existingGlobalVariable.q, function (fn) {
          fn();
        });
      }
    }
    function getGlobalObject() {
      if (typeof globalThis === 'object') {
        return globalThis;
      }

      Object.defineProperty(Object.prototype, '_dd_temp_', {
        get: function get() {
          return this;
        },
        configurable: true
      }); // @ts-ignore

      var globalObject = _dd_temp_; // @ts-ignore

      delete Object.prototype._dd_temp_;

      if (typeof globalObject !== 'object') {
        // on safari _dd_temp_ is available on window but not globally
        // fallback on other browser globals check
        if (typeof self === 'object') {
          globalObject = self;
        } else if (typeof window === 'object') {
          globalObject = window;
        } else {
          globalObject = {};
        }
      }

      return globalObject;
    } // export function checkCookiesAuthorized(options) {
    //   if (!areCookiesAuthorized(options)) {
    //     console.warn('Cookies are not authorized, we will not send any data.')
    //     return false
    //   }
    //   return true
    // }
    // export function checkIsNotLocalFile() {
    //   if (isLocalFile()) {
    //     console.error('Execution is not allowed in the current context.')
    //     return false
    //   }
    //   return true
    // }
    // function isLocalFile() {
    //   return window.location.protocol === 'file:'
    // }

    var SESSION_TIME_OUT_DELAY = 4 * ONE_HOUR;
    var SESSION_EXPIRATION_DELAY = 15 * ONE_MINUTE;

    var SESSION_ENTRY_REGEXP = /^([a-z]+)=([a-z0-9-]+)$/;
    var SESSION_ENTRY_SEPARATOR = '&';
    var SESSION_COOKIE_NAME = '_dataflux_s'; // arbitrary values

    var LOCK_RETRY_DELAY = 10;
    var MAX_NUMBER_OF_LOCK_RETRIES = 100;
    var bufferedOperations = [];
    var ongoingOperations;
    function withCookieLockAccess(operations, numberOfRetries) {
      if (typeof numberOfRetries === 'undefined') {
        numberOfRetries = 0;
      }

      if (!ongoingOperations) {
        ongoingOperations = operations;
      }

      if (operations !== ongoingOperations) {
        bufferedOperations.push(operations);
        return;
      }

      if (numberOfRetries >= MAX_NUMBER_OF_LOCK_RETRIES) {
        next();
        return;
      }

      var currentLock;
      var currentSession = retrieveSession();

      if (isCookieLockEnabled()) {
        // if someone has lock, retry later
        if (currentSession.lock) {
          retryLater(operations, numberOfRetries);
          return;
        } // acquire lock


        currentLock = UUID();
        currentSession.lock = currentLock;
        setSession(currentSession, operations.options); // if lock is not acquired, retry later

        currentSession = retrieveSession();

        if (currentSession.lock !== currentLock) {
          retryLater(operations, numberOfRetries);
          return;
        }
      }

      var processedSession = operations.process(currentSession);

      if (isCookieLockEnabled()) {
        // if lock corrupted after process, retry later
        currentSession = retrieveSession();

        if (currentSession.lock !== currentLock) {
          retryLater(operations, numberOfRetries);
          return;
        }
      }

      if (processedSession) {
        persistSession(processedSession, operations.options);
      }

      if (isCookieLockEnabled()) {
        // correctly handle lock around expiration would require to handle this case properly at several levels
        // since we don't have evidence of lock issues around expiration, let's just not do the corruption check for it
        if (!(processedSession && isExpiredState(processedSession))) {
          // if lock corrupted after persist, retry later
          currentSession = retrieveSession();

          if (currentSession.lock !== currentLock) {
            retryLater(operations, numberOfRetries);
            return;
          }

          delete currentSession.lock;
          setSession(currentSession, operations.options);
          processedSession = currentSession;
        }
      } // call after even if session is not persisted in order to perform operations on
      // up-to-date cookie value, the value could have been modified by another tab


      if (operations.after) {
        operations.after(processedSession || currentSession);
      }

      next();
    }
    /**
     * Cookie lock strategy allows mitigating issues due to concurrent access to cookie.
     * This issue concerns only chromium browsers and enabling this on firefox increase cookie write failures.
     */

    function isCookieLockEnabled() {
      return isChromium();
    }

    function retryLater(operations, currentNumberOfRetries) {
      setTimeout(function () {
        withCookieLockAccess(operations, currentNumberOfRetries + 1);
      }, LOCK_RETRY_DELAY);
    }

    function next() {
      ongoingOperations = undefined;
      var nextOperations = bufferedOperations.shift();

      if (nextOperations) {
        withCookieLockAccess(nextOperations);
      }
    }

    function persistSession(session, options) {
      if (isExpiredState(session)) {
        clearSession(options);
        return;
      }

      session.expire = String(dateNow() + SESSION_EXPIRATION_DELAY);
      setSession(session, options);
    }

    function setSession(session, options) {
      setCookie(SESSION_COOKIE_NAME, toSessionString(session), SESSION_EXPIRATION_DELAY, options);
    }

    function toSessionString(session) {
      return map(objectEntries(session), function (item) {
        return item[0] + '=' + item[1];
      }).join(SESSION_ENTRY_SEPARATOR);
    }
    function retrieveSession() {
      var sessionString = getCookie(SESSION_COOKIE_NAME);
      var session = {};

      if (isValidSessionString(sessionString)) {
        each(sessionString.split(SESSION_ENTRY_SEPARATOR), function (entry) {
          var matches = SESSION_ENTRY_REGEXP.exec(entry);

          if (matches !== null) {
            var key = matches[1];
            var value = matches[2];
            session[key] = value;
          }
        });
      }

      return session;
    }

    function isValidSessionString(sessionString) {
      return sessionString !== undefined && (sessionString.indexOf(SESSION_ENTRY_SEPARATOR) !== -1 || SESSION_ENTRY_REGEXP.test(sessionString));
    }

    function isExpiredState(session) {
      return isEmptyObject(session);
    }

    function clearSession(options) {
      setCookie(SESSION_COOKIE_NAME, '', 0, options);
    }

    /**
     * Different session concepts:
     * - tracked, the session has an id and is updated along the user navigation
     * - not tracked, the session does not have an id but it is updated along the user navigation
     * - inactive, no session in store or session expired, waiting for a renew session
     */

    function startSessionStore(options, productKey, computeSessionState) {
      var renewObservable = new Observable();
      var expireObservable = new Observable();
      var watchSessionTimeoutId = setInterval(watchSession, COOKIE_ACCESS_DELAY);
      var sessionCache = retrieveActiveSession();

      function expandOrRenewSession() {
        var isTracked;
        withCookieLockAccess({
          options: options,
          process: function process(cookieSession) {
            var synchronizedSession = synchronizeSession(cookieSession);
            isTracked = expandOrRenewCookie(synchronizedSession);
            return synchronizedSession;
          },
          after: function after(cookieSession) {
            if (isTracked && !hasSessionInCache()) {
              renewSession(cookieSession);
            }

            sessionCache = cookieSession;
          }
        });
      }

      function expandSession() {
        withCookieLockAccess({
          options: options,
          process: function process(cookieSession) {
            return hasSessionInCache() ? synchronizeSession(cookieSession) : undefined;
          }
        });
      }
      /**
       * allows two behaviors:
       * - if the session is active, synchronize the session cache without updating the session cookie
       * - if the session is not active, clear the session cookie and expire the session cache
       */


      function watchSession() {
        withCookieLockAccess({
          options: options,
          process: function process(cookieSession) {
            return !isActiveSession(cookieSession) ? {} : undefined;
          },
          after: synchronizeSession
        });
      }

      function synchronizeSession(cookieSession) {
        if (!isActiveSession(cookieSession)) {
          cookieSession = {};
        }

        if (hasSessionInCache()) {
          if (isSessionInCacheOutdated(cookieSession)) {
            expireSession();
          } else {
            sessionCache = cookieSession;
          }
        }

        return cookieSession;
      }

      function expandOrRenewCookie(cookieSession) {
        var sessionState = computeSessionState(cookieSession[productKey]);
        var trackingType = sessionState.trackingType;
        var isTracked = sessionState.isTracked;
        cookieSession[productKey] = trackingType;

        if (isTracked && !cookieSession.id) {
          cookieSession.id = UUID();
          cookieSession.created = String(dateNow());
        }

        return isTracked;
      }

      function hasSessionInCache() {
        return sessionCache[productKey] !== undefined;
      }

      function isSessionInCacheOutdated(cookieSession) {
        return sessionCache.id !== cookieSession.id || sessionCache[productKey] !== cookieSession[productKey];
      }

      function expireSession() {
        sessionCache = {};
        expireObservable.notify();
      }

      function renewSession(cookieSession) {
        sessionCache = cookieSession;
        renewObservable.notify();
      }

      function retrieveActiveSession() {
        var session = retrieveSession();

        if (isActiveSession(session)) {
          return session;
        }

        return {};
      }

      function isActiveSession(session) {
        // created and expire can be undefined for versions which was not storing them
        // these checks could be removed when older versions will not be available/live anymore
        return (session.created === undefined || dateNow() - Number(session.created) < SESSION_TIME_OUT_DELAY) && (session.expire === undefined || dateNow() < Number(session.expire));
      }

      return {
        expandOrRenewSession: throttle(expandOrRenewSession, COOKIE_ACCESS_DELAY),
        expandSession: expandSession,
        getSession: function getSession() {
          return sessionCache;
        },
        renewObservable: renewObservable,
        expireObservable: expireObservable,
        stop: function stop() {
          clearInterval(watchSessionTimeoutId);
        }
      };
    }

    var VISIBILITY_CHECK_DELAY = ONE_MINUTE;
    var SESSION_CONTEXT_TIMEOUT_DELAY = SESSION_TIME_OUT_DELAY;
    var stopCallbacks = [];
    var startSessionManager = function startSessionManager(options, productKey, computeSessionState) {
      var sessionStore = startSessionStore(options, productKey, computeSessionState);
      stopCallbacks.push(function () {
        return sessionStore.stop();
      });
      var sessionContextHistory = new ContextHistory(SESSION_CONTEXT_TIMEOUT_DELAY);
      stopCallbacks.push(function () {
        return sessionContextHistory.stop();
      });
      sessionStore.renewObservable.subscribe(function () {
        sessionContextHistory.add(buildSessionContext(), relativeNow());
      });
      sessionStore.expireObservable.subscribe(function () {
        sessionContextHistory.closeActive(relativeNow());
      });
      sessionStore.expandOrRenewSession();
      sessionContextHistory.add(buildSessionContext(), clocksOrigin().relative);
      trackActivity(function () {
        return sessionStore.expandOrRenewSession();
      });
      trackVisibility(function () {
        return sessionStore.expandSession();
      });

      function buildSessionContext() {
        return {
          id: sessionStore.getSession().id,
          trackingType: sessionStore.getSession()[productKey]
        };
      }

      return {
        findActiveSession: function findActiveSession(startTime) {
          return sessionContextHistory.find(startTime);
        },
        renewObservable: sessionStore.renewObservable,
        expireObservable: sessionStore.expireObservable
      };
    };

    function trackActivity(expandOrRenewSession) {
      var _addEventListeners = addEventListeners(window, [DOM_EVENT.CLICK, DOM_EVENT.TOUCH_START, DOM_EVENT.KEY_DOWN, DOM_EVENT.SCROLL], expandOrRenewSession, {
        capture: true,
        passive: true
      });

      stopCallbacks.push(_addEventListeners.stop);
    }

    function trackVisibility(expandSession) {
      var expandSessionWhenVisible = function expandSessionWhenVisible() {
        if (document.visibilityState === 'visible') {
          expandSession();
        }
      };

      var _addEventListener = addEventListener(document, DOM_EVENT.VISIBILITY_CHANGE, expandSessionWhenVisible);

      stopCallbacks.push(_addEventListener.stop);
      var visibilityCheckInterval = setInterval(expandSessionWhenVisible, VISIBILITY_CHECK_DELAY);
      stopCallbacks.push(function () {
        clearInterval(visibilityCheckInterval);
      });
    }

    var MAX_ONGOING_BYTES_COUNT = 80 * ONE_KIBI_BYTE;
    var MAX_ONGOING_REQUESTS = 32;
    var MAX_QUEUE_BYTES_COUNT = 3 * ONE_MEBI_BYTE;
    var MAX_BACKOFF_TIME = 256 * ONE_SECOND;
    var INITIAL_BACKOFF_TIME = ONE_SECOND;
    var TransportStatus = {
      UP: 'UP',
      FAILURE_DETECTED: 'FAILURE_DETECTED',
      DOWN: 'DOWN'
    };
    var RetryReason = {
      AFTER_SUCCESS: 'AFTER_SUCCESS',
      AFTER_RESUME: 'AFTER_RESUME'
    };
    function sendWithRetryStrategy(payload, state, sendStrategy, reportError) {
      if (state.transportStatus === TransportStatus.UP && state.queuedPayloads.size() === 0 && state.bandwidthMonitor.canHandle(payload)) {
        send(payload, state, sendStrategy, {
          onSuccess: function onSuccess() {
            return retryQueuedPayloads(RetryReason.AFTER_SUCCESS, state, sendStrategy, reportError);
          },
          onFailure: function onFailure() {
            state.queuedPayloads.enqueue(payload);
            scheduleRetry(state, sendStrategy, reportError);
          }
        });
      } else {
        state.queuedPayloads.enqueue(payload);
      }
    }

    function scheduleRetry(state, sendStrategy, reportError) {
      if (state.transportStatus !== TransportStatus.DOWN) {
        return;
      }

      setTimeout(function () {
        var payload = state.queuedPayloads.first();
        send(payload, state, sendStrategy, {
          onSuccess: function onSuccess() {
            state.queuedPayloads.dequeue(); // if (state.lastFailureStatus !== 0) {
            //   addTelemetryDebug('resuming after transport down', {
            //     failureStatus: state.lastFailureStatus,
            //   })
            // }

            state.currentBackoffTime = INITIAL_BACKOFF_TIME;
            retryQueuedPayloads(RetryReason.AFTER_RESUME, state, sendStrategy, reportError);
          },
          onFailure: function onFailure() {
            state.currentBackoffTime = Math.min(MAX_BACKOFF_TIME, state.currentBackoffTime * 2);
            scheduleRetry(state, sendStrategy, reportError);
          }
        });
      }, state.currentBackoffTime);
    }

    function send(payload, state, sendStrategy, responseData) {
      var onSuccess = responseData.onSuccess;
      var onFailure = responseData.onFailure;
      state.bandwidthMonitor.add(payload);
      sendStrategy(payload, function (response) {
        state.bandwidthMonitor.remove(payload);

        if (wasRequestSuccessful(response)) {
          state.transportStatus = TransportStatus.UP;
          onSuccess();
        } else {
          // do not consider transport down if another ongoing request could succeed
          state.transportStatus = state.bandwidthMonitor.ongoingRequestCount > 0 ? TransportStatus.FAILURE_DETECTED : TransportStatus.DOWN;
          state.lastFailureStatus = response.status;
          onFailure();
        }
      });
    }

    function retryQueuedPayloads(reason, state, sendStrategy, reportError) {
      if (reason === RetryReason.AFTER_SUCCESS && state.queuedPayloads.isFull() && !state.queueFullReported) {
        reportError({
          message: 'Reached max events size queued for upload: ' + MAX_QUEUE_BYTES_COUNT / ONE_MEBI_BYTE + 'MiB',
          source: ErrorSource.AGENT,
          startClocks: clocksNow()
        });
        state.queueFullReported = true;
      }

      var previousQueue = state.queuedPayloads;
      state.queuedPayloads = newPayloadQueue();

      while (previousQueue.size() > 0) {
        sendWithRetryStrategy(previousQueue.dequeue(), state, sendStrategy, reportError);
      }
    }

    function wasRequestSuccessful(response) {
      return response.status !== 0 && response.status < 500;
    }

    function newRetryState() {
      return {
        transportStatus: TransportStatus.UP,
        lastFailureStatus: 0,
        currentBackoffTime: INITIAL_BACKOFF_TIME,
        bandwidthMonitor: newBandwidthMonitor(),
        queuedPayloads: newPayloadQueue(),
        queueFullReported: false
      };
    }

    function newPayloadQueue() {
      var queue = [];
      return {
        bytesCount: 0,
        enqueue: function enqueue(payload) {
          if (this.isFull()) {
            return;
          }

          queue.push(payload);
          this.bytesCount += payload.bytesCount;
        },

        first() {
          return queue[0];
        },

        dequeue() {
          var payload = queue.shift();

          if (payload) {
            this.bytesCount -= payload.bytesCount;
          }

          return payload;
        },

        size() {
          return queue.length;
        },

        isFull() {
          return this.bytesCount >= MAX_QUEUE_BYTES_COUNT;
        }

      };
    }

    function newBandwidthMonitor() {
      return {
        ongoingRequestCount: 0,
        ongoingByteCount: 0,
        canHandle: function canHandle(payload) {
          return this.ongoingRequestCount === 0 || this.ongoingByteCount + payload.bytesCount <= MAX_ONGOING_BYTES_COUNT && this.ongoingRequestCount < MAX_ONGOING_REQUESTS;
        },
        add: function add(payload) {
          this.ongoingRequestCount += 1;
          this.ongoingByteCount += payload.bytesCount;
        },
        remove: function remove(payload) {
          this.ongoingRequestCount -= 1;
          this.ongoingByteCount -= payload.bytesCount;
        }
      };
    }

    /**
     * Use POST request without content type to:
     * - avoid CORS preflight requests
     * - allow usage of sendBeacon
     *
     * multiple elements are sent separated by \n in order
     * to be parsed correctly without content type header
     */

    function addBatchPrecision(url) {
      if (!url) return url;
      return url + (url.indexOf('?') === -1 ? '?' : '&') + 'precision=ms';
    }

    function createHttpRequest(endpointUrl, bytesLimit, reportError) {
      var retryState = newRetryState();

      var sendStrategyForRetry = function sendStrategyForRetry(payload, onResponse) {
        return fetchKeepAliveStrategy(endpointUrl, bytesLimit, payload, onResponse);
      };

      return {
        send: function send(payload) {
          sendWithRetryStrategy(payload, retryState, sendStrategyForRetry, reportError);
        },

        /**
         * Since fetch keepalive behaves like regular fetch on Firefox,
         * keep using sendBeaconStrategy on exit
         */
        sendOnExit: function sendOnExit(payload) {
          sendBeaconStrategy(endpointUrl, bytesLimit, payload);
        }
      };
    }

    function sendBeaconStrategy(endpointUrl, bytesLimit, payload) {
      var data = payload.data;
      var bytesCount = payload.bytesCount;
      var url = addBatchPrecision(endpointUrl);
      var canUseBeacon = !!navigator.sendBeacon && bytesCount < bytesLimit;

      if (canUseBeacon) {
        try {
          var isQueued = navigator.sendBeacon(url, data);

          if (isQueued) {
            return;
          }
        } catch (e) {// reportBeaconError(e)
        }
      }

      sendXHR(url, data);
    }

    function fetchKeepAliveStrategy(endpointUrl, bytesLimit, payload, onResponse) {
      var data = payload.data;
      var bytesCount = payload.bytesCount;
      var url = addBatchPrecision(endpointUrl);
      var canUseKeepAlive = isKeepAliveSupported() && bytesCount < bytesLimit;

      if (canUseKeepAlive) {
        fetch(url, {
          method: 'POST',
          body: data,
          keepalive: true
        }).then(function (response) {
          if (typeof onResponse === 'function') {
            onResponse({
              status: response.status
            });
          }
        }, function () {
          // failed to queue the request
          sendXHR(url, data, onResponse);
        });
      } else {
        sendXHR(url, data, onResponse);
      }
    }

    function isKeepAliveSupported() {
      // Request can throw, cf https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#errors
      try {
        return window.Request && 'keepalive' in new Request('http://a');
      } catch (_unused) {
        return false;
      }
    }

    function sendXHR(url, data, onResponse) {
      var request = new XMLHttpRequest();
      request.open('POST', url, true);
      request.send(data);
      request.addEventListener('loadend', function () {
        if (typeof onResponse === 'function') {
          onResponse({
            status: request.status
          });
        }
      });
    }

    // eslint-disable-next-line no-control-regex

    var HAS_MULTI_BYTES_CHARACTERS = /[^\u0000-\u007F]/;
    var CUSTOM_KEYS = 'custom_keys';
    var processedMessageByDataMap = function processedMessageByDataMap(message) {
      if (!message || !message.type) return {
        rowStr: '',
        rowData: undefined
      };
      var rowData = {
        tags: {},
        fields: {}
      };
      var hasFileds = false;
      var rowStr = '';
      each(dataMap, function (value, key) {
        if (value.type === message.type) {
          rowStr += key + ',';
          rowData.measurement = key;
          var tagsStr = [];
          var tags = extend({}, commonTags, value.tags);
          var filterFileds = ['date', 'type', CUSTOM_KEYS]; // 已经在datamap中定义过的fields和tags

          each(tags, function (value_path, _key) {
            var _value = findByPath(message, value_path);

            filterFileds.push(_key);

            if (_value || isNumber(_value)) {
              rowData.tags[_key] = escapeJsonValue(_value);
              tagsStr.push(escapeRowData(_key) + '=' + escapeRowData(_value));
            }
          });
          var fieldsStr = [];
          each(value.fields, function (_value, _key) {
            if (isArray(_value) && _value.length === 2) {
              _value[0];
                  var value_path = _value[1];

              var _valueData = findByPath(message, value_path);

              filterFileds.push(_key);

              if (_valueData || isNumber(_valueData)) {
                rowData.fields[_key] = _valueData; // 这里不需要转译
                // _valueData =
                //   type === 'string'
                //     ? '"' +
                //       _valueData.replace(/[\\]*"/g, '"').replace(/"/g, '\\"') +
                //       '"'
                //     : escapeRowData(_valueData)

                fieldsStr.push(escapeRowData(_key) + '=' + escapeRowField(_valueData));
              }
            } else if (isString(_value)) {
              var _valueData = findByPath(message, _value);

              filterFileds.push(_key);

              if (_valueData || isNumber(_valueData)) {
                rowData.fields[_key] = _valueData; // 这里不需要转译

                fieldsStr.push(escapeRowData(_key) + '=' + escapeRowField(_valueData));
              }
            }
          });

          if (message.tags && isObject(message.tags) && !isEmptyObject(message.tags)) {
            // 自定义tag， 存储成field
            var _tagKeys = [];
            each(message.tags, function (_value, _key) {
              // 如果和之前tag重名，则舍弃
              if (filterFileds.indexOf(_key) > -1) return;
              filterFileds.push(_key);

              if (_value || isNumber(_value)) {
                _tagKeys.push(_key);

                rowData.fields[_key] = _value; // 这里不需要转译

                fieldsStr.push(escapeRowData(_key) + '=' + escapeRowField(_value));
              }
            });

            if (_tagKeys.length) {
              rowData.fields[CUSTOM_KEYS] = escapeRowField(_tagKeys);
              fieldsStr.push(escapeRowData(CUSTOM_KEYS) + '=' + escapeRowField(_tagKeys));
            }
          }

          if (message.type === RumEventType.LOGGER) {
            // 这里处理日志类型数据自定义字段
            each(message, function (value, key) {
              if (filterFileds.indexOf(key) === -1 && (isNumber(value) || isString(value) || isBoolean(value))) {
                rowData.fields[key] = value; // 这里不需要转译

                fieldsStr.push(escapeRowData(key) + '=' + escapeRowField(value));
              }
            });
          }

          if (tagsStr.length) {
            rowStr += tagsStr.join(',');
          }

          if (fieldsStr.length) {
            rowStr += ' ';
            rowStr += fieldsStr.join(',');
            hasFileds = true;
          }

          rowStr = rowStr + ' ' + message.date;
          rowData.time = toServerDuration(message.date); // 这里不需要转译
        }
      });
      return {
        rowStr: hasFileds ? rowStr : '',
        rowData: hasFileds ? rowData : undefined
      };
    };

    var batch = function batch(request, batchMessagesLimit, batchBytesLimit, messageBytesLimit, flushTimeout, beforeUnloadCallback) {
      this.pushOnlyBuffer = [];
      this.upsertBuffer = {};
      this.bufferBytesCount = 0;
      this.bufferMessagesCount = 0;
      this.request = request;
      this.batchMessagesLimit = batchMessagesLimit;
      this.batchBytesLimit = batchBytesLimit;
      this.messageBytesLimit = messageBytesLimit;
      this.flushTimeout = flushTimeout;

      if (typeof beforeUnloadCallback === 'function') {
        this.beforeUnloadCallback = beforeUnloadCallback;
      } else {
        this.beforeUnloadCallback = noop;
      }

      this.setupFlushOnExit();
      this.flushPeriodically();
    };

    batch.prototype.add = function (message) {
      this.addOrUpdate(message);
    };

    batch.prototype.upsert = function (message, key) {
      this.addOrUpdate(message, key);
    };

    batch.prototype.flush = function (sendFn) {
      if (typeof sendFn !== 'function') {
        sendFn = this.request.send;
      }

      if (this.bufferMessagesCount !== 0) {
        var messages = this.pushOnlyBuffer.concat(values(this.upsertBuffer));
        var bytesCount = this.bufferBytesCount;
        this.pushOnlyBuffer = [];
        this.upsertBuffer = {};
        this.bufferBytesCount = 0;
        this.bufferMessagesCount = 0;

        if (messages.length > 0) {
          sendFn({
            data: messages.join('\n'),
            bytesCount: bytesCount
          });
        }
      }
    };

    batch.prototype.flushOnExit = function () {
      this.flush(this.request.sendOnExit);
    };

    batch.prototype.computeBytesCount = function (candidate) {
      // Accurate bytes count computations can degrade performances when there is a lot of events to process
      if (!HAS_MULTI_BYTES_CHARACTERS.test(candidate)) {
        return candidate.length;
      }

      if (window.TextEncoder !== undefined) {
        return new TextEncoder().encode(candidate).length;
      }

      return new Blob([candidate]).size;
    };

    batch.prototype.addOrUpdate = function (message, key) {
      var _process = this.process(message);

      var processedMessage = _process.processedMessage;
      var messageBytesCount = _process.messageBytesCount;

      if (messageBytesCount >= this.messageBytesLimit) {
        display.warn('Discarded a message whose size was bigger than the maximum allowed size ' + this.messageBytesLimit + 'KB.');
        return;
      }

      if (this.hasMessageFor(key)) {
        this.remove(key);
      }

      if (this.willReachedBytesLimitWith(messageBytesCount)) {
        this.flush();
      }

      this.push(processedMessage, messageBytesCount, key);

      if (this.isFull()) {
        this.flush();
      }
    };

    batch.prototype.process = function (message) {
      var processedMessage = processedMessageByDataMap(message).rowStr;
      var messageBytesCount = this.computeBytesCount(processedMessage);
      return {
        processedMessage: processedMessage,
        messageBytesCount: messageBytesCount
      };
    };

    batch.prototype.push = function (processedMessage, messageBytesCount, key) {
      if (this.bufferMessagesCount > 0) {
        // \n separator at serialization
        this.bufferBytesCount += 1;
      }

      if (key !== undefined) {
        this.upsertBuffer[key] = processedMessage;
      } else {
        this.pushOnlyBuffer.push(processedMessage);
      }

      this.bufferBytesCount += messageBytesCount;
      this.bufferMessagesCount += 1;
    };

    batch.prototype.remove = function (key) {
      var removedMessage = this.upsertBuffer[key];
      delete this.upsertBuffer[key];
      var messageBytesCount = this.computeBytesCount(removedMessage);
      this.bufferBytesCount -= messageBytesCount;
      this.bufferMessagesCount -= 1;

      if (this.bufferMessagesCount > 0) {
        this.bufferBytesCount -= 1;
      }
    };

    batch.prototype.hasMessageFor = function (key) {
      return key !== undefined && this.upsertBuffer[key] !== undefined;
    };

    batch.prototype.willReachedBytesLimitWith = function (messageBytesCount) {
      // byte of the separator at the end of the message
      return this.bufferBytesCount + messageBytesCount + 1 >= this.batchBytesLimit;
    };

    batch.prototype.isFull = function () {
      return this.bufferMessagesCount === this.batchMessagesLimit || this.bufferBytesCount >= this.batchBytesLimit;
    };

    batch.prototype.flushPeriodically = function () {
      var _this = this;

      setTimeout(function () {
        _this.flush();

        _this.flushPeriodically();
      }, this.flushTimeout);
    };

    batch.prototype.setupFlushOnExit = function () {
      /**
       * With sendBeacon, requests are guaranteed to be successfully sent during document unload
       */
      // @ts-ignore this function is not always defined
      var _this = this;

      if (navigator.sendBeacon) {
        /**
         * beforeunload is called before visibilitychange
         * register first to be sure to be called before flush on beforeunload
         * caveat: unload can still be canceled by another listener
         */
        addEventListener(window, DOM_EVENT.BEFORE_UNLOAD, this.beforeUnloadCallback);
        /**
         * Only event that guarantee to fire on mobile devices when the page transitions to background state
         * (e.g. when user switches to a different application, goes to homescreen, etc), or is being unloaded.
         */

        addEventListener(document, DOM_EVENT.VISIBILITY_CHANGE, function () {
          if (document.visibilityState === 'hidden') {
            _this.flushOnExit();
          }
        });
        /**
         * Safari does not support yet to send a request during:
         * - a visibility change during doc unload (cf: https://bugs.webkit.org/show_bug.cgi?id=194897)
         * - a page hide transition (cf: https://bugs.webkit.org/show_bug.cgi?id=188329)
         */

        addEventListener(window, DOM_EVENT.BEFORE_UNLOAD, function () {
          return _this.flushOnExit();
        });
      }
    };

    var Batch = batch;

    var RUM_SESSION_KEY = 'rum';
    var RumTrackingType = {
      NOT_TRACKED: '0',
      // Note: the "tracking type" value (stored in the session cookie) does not match the "session
      // plan" value (sent in RUM events). This is expected, and was done to keep retrocompatibility
      // with active sessions when upgrading the SDK.
      TRACKED_WITH_SESSION_REPLAY: '1',
      TRACKED_WITHOUT_SESSION_REPLAY: '2'
    };
    function startRumSessionManager(configuration, lifeCycle) {
      var sessionManager = startSessionManager(configuration.cookieOptions, RUM_SESSION_KEY, function (rawTrackingType) {
        return computeSessionState(configuration, rawTrackingType);
      });
      sessionManager.expireObservable.subscribe(function () {
        lifeCycle.notify(LifeCycleEventType.SESSION_EXPIRED);
      });
      sessionManager.renewObservable.subscribe(function () {
        lifeCycle.notify(LifeCycleEventType.SESSION_RENEWED);
      });
      return {
        findTrackedSession: function findTrackedSession(startTime) {
          var session = sessionManager.findActiveSession(startTime);

          if (!session || !isTypeTracked(session.trackingType)) {
            return;
          }

          return {
            id: session.id
          };
        }
      };
    }

    function computeSessionState(configuration, rawTrackingType) {
      var trackingType;

      if (hasValidRumSession(rawTrackingType)) {
        trackingType = rawTrackingType;
      } else if (!performDraw(configuration.sampleRate)) {
        trackingType = RumTrackingType.NOT_TRACKED;
      } else if (!performDraw(configuration.sessionReplaySampleRate)) {
        trackingType = RumTrackingType.TRACKED_WITHOUT_SESSION_REPLAY;
      } else {
        trackingType = RumTrackingType.TRACKED_WITH_SESSION_REPLAY;
      }

      return {
        trackingType: trackingType,
        isTracked: isTypeTracked(trackingType)
      };
    }

    function hasValidRumSession(trackingType) {
      return trackingType === RumTrackingType.NOT_TRACKED || trackingType === RumTrackingType.TRACKED_WITH_SESSION_REPLAY || trackingType === RumTrackingType.TRACKED_WITHOUT_SESSION_REPLAY;
    }

    function isTypeTracked(rumSessionType) {
      return rumSessionType === RumTrackingType.TRACKED_WITHOUT_SESSION_REPLAY || rumSessionType === RumTrackingType.TRACKED_WITH_SESSION_REPLAY;
    }

    var ANONYMOUS_ID_COOKIE_NAME = '_dataflulx_usr_id';
    var ANONYMOUS_ID_EXPIRATION = 60 * 24 * ONE_HOUR;
    var startCacheUsrCache = function startCacheUsrCache(configuration) {
      var usrCacheId = getCookie(ANONYMOUS_ID_COOKIE_NAME);

      if (!usrCacheId) {
        usrCacheId = UUID();
        setCookie(ANONYMOUS_ID_COOKIE_NAME, usrCacheId, ANONYMOUS_ID_EXPIRATION, configuration.cookieOptions);
      }

      return {
        getId: function getId() {
          return usrCacheId;
        }
      };
    };

    var FAKE_INITIAL_DOCUMENT = 'initial_document';
    var RESOURCE_TYPES = [[ResourceType.DOCUMENT, function (initiatorType) {
      return FAKE_INITIAL_DOCUMENT === initiatorType;
    }], [ResourceType.XHR, function (initiatorType) {
      return 'xmlhttprequest' === initiatorType;
    }], [ResourceType.FETCH, function (initiatorType) {
      return 'fetch' === initiatorType;
    }], [ResourceType.BEACON, function (initiatorType) {
      return 'beacon' === initiatorType;
    }], [ResourceType.CSS, function (_, path) {
      return path.match(/\.css$/i) !== null;
    }], [ResourceType.JS, function (_, path) {
      return path.match(/\.js$/i) !== null;
    }], [ResourceType.IMAGE, function (initiatorType, path) {
      return includes(['image', 'img', 'icon'], initiatorType) || path.match(/\.(gif|jpg|jpeg|tiff|png|svg|ico)$/i) !== null;
    }], [ResourceType.FONT, function (_, path) {
      return path.match(/\.(woff|eot|woff2|ttf)$/i) !== null;
    }], [ResourceType.MEDIA, function (initiatorType, path) {
      return includes(['audio', 'video'], initiatorType) || path.match(/\.(mp3|mp4)$/i) !== null;
    }]];
    function computeResourceKind(timing) {
      var url = timing.name;

      if (!isValidUrl(url)) {
        return ResourceType.OTHER;
      }

      var path = getPathName(url);
      var type = ResourceType.OTHER;
      each(RESOURCE_TYPES, function (res) {
        var _type = res[0],
            isType = res[1];

        if (isType(timing.initiatorType, path)) {
          type = _type;
          return false;
        }
      });
      return type;
    }

    function areInOrder() {
      var numbers = toArray(arguments);

      for (var i = 1; i < numbers.length; i += 1) {
        if (numbers[i - 1] > numbers[i]) {
          return false;
        }
      }

      return true;
    }

    function isRequestKind(timing) {
      return timing.initiatorType === 'xmlhttprequest' || timing.initiatorType === 'fetch';
    }
    function computePerformanceResourceDuration(entry) {
      // Safari duration is always 0 on timings blocked by cross origin policies.
      if (entry.duration === 0 && entry.startTime < entry.responseEnd) {
        return msToNs(entry.responseEnd - entry.startTime);
      }

      return msToNs(entry.duration);
    }
    function is304(entry) {
      if (entry.encodedBodySize > 0 && entry.transferSize > 0 && entry.transferSize < entry.encodedBodySize) {
        return true;
      } // unknown


      return null;
    }
    function isCacheHit(entry) {
      // if we transferred bytes, it must not be a cache hit
      // (will return false for 304 Not Modified)
      if (entry.transferSize > 0) return false; // if the body size is non-zero, it must mean this is a
      // ResourceTiming2 browser, this was same-origin or TAO,
      // and transferSize was 0, so it was in the cache

      if (entry.decodedBodySize > 0) return true; // fall back to duration checking (non-RT2 or cross-origin)

      return entry.duration < 30;
    } //  interface PerformanceResourceDetails {
    //   redirect?: PerformanceResourceDetailsElement
    //   dns?: PerformanceResourceDetailsElement
    //   connect?: PerformanceResourceDetailsElement
    //   ssl?: PerformanceResourceDetailsElement
    //   firstByte: PerformanceResourceDetailsElement
    //   download: PerformanceResourceDetailsElement
    //   fmp:
    // }
    // page_fmp	float		首屏时间(用于衡量用户什么时候看到页面的主要内容)，跟FCP的时长非常接近，这里我们就用FCP的时间作为首屏时间	firstPaintContentEnd - firstPaintContentStart
    // page_fpt	float		首次渲染时间，即白屏时间(从请求开始到浏览器开始解析第一批HTML文档字节的时间差。)	responseEnd - fetchStart
    // page_tti	float		首次可交互时间(浏览器完成所有HTML解析并且完成DOM构建，此时浏览器开始加载资源。)	domInteractive - fetchStart
    // page_firstbyte	float		首包时间	responseStart - domainLookupStart
    // page_dom_ready	float		DOM Ready时间(如果页面有同步执行的JS，则同步JS执行时间=ready-tti。)	domContentLoadEventEnd - fetchStart
    // page_load	float		页面完全加载时间(load=首次渲染时间+DOM解析耗时+同步JS执行+资源加载耗时。)	loadEventStart - fetchStart
    // page_dns	float		dns解析时间	domainLookupEnd - domainLookupStart
    // page_tcp	float		tcp连接时间	connectEnd - connectStart
    // page_ssl	float		ssl安全连接时间(仅适用于https)	connectEnd - secureConnectionStart
    // page_ttfb	float		请求响应耗时	responseStart - requestStart
    // page_trans	float		内容传输时间	responseEnd - responseStart
    // page_dom	float		DOM解析耗时	domInteractive - responseEnd
    // page_resource_load_time	float		资源加载时间	loadEventStart - domContentLoadedEventEnd
    //  navigationStart：当前浏览器窗口的前一个网页关闭，发生unload事件时的Unix毫秒时间戳。如果没有前一个网页，则等于fetchStart属性。
    // ·   unloadEventStart：如果前一个网页与当前网页属于同一个域名，则返回前一个网页的unload事件发生时的Unix毫秒时间戳。如果没有前一个网页，或者之前的网页跳转不是在同一个域名内，则返回值为0。
    // ·   unloadEventEnd：如果前一个网页与当前网页属于同一个域名，则返回前一个网页unload事件的回调函数结束时的Unix毫秒时间戳。如果没有前一个网页，或者之前的网页跳转不是在同一个域名内，则返回值为0。
    // ·   redirectStart：返回第一个HTTP跳转开始时的Unix毫秒时间戳。如果没有跳转，或者不是同一个域名内部的跳转，则返回值为0。
    // ·   redirectEnd：返回最后一个HTTP跳转结束时（即跳转回应的最后一个字节接受完成时）的Unix毫秒时间戳。如果没有跳转，或者不是同一个域名内部的跳转，则返回值为0。
    // ·   fetchStart：返回浏览器准备使用HTTP请求读取文档时的Unix毫秒时间戳。该事件在网页查询本地缓存之前发生。
    // ·   domainLookupStart：返回域名查询开始时的Unix毫秒时间戳。如果使用持久连接，或者信息是从本地缓存获取的，则返回值等同于fetchStart属性的值。
    // ·   domainLookupEnd：返回域名查询结束时的Unix毫秒时间戳。如果使用持久连接，或者信息是从本地缓存获取的，则返回值等同于fetchStart属性的值。
    // ·   connectStart：返回HTTP请求开始向服务器发送时的Unix毫秒时间戳。如果使用持久连接（persistent connection），则返回值等同于fetchStart属性的值。
    // ·   connectEnd：返回浏览器与服务器之间的连接建立时的Unix毫秒时间戳。如果建立的是持久连接，则返回值等同于fetchStart属性的值。连接建立指的是所有握手和认证过程全部结束。
    // ·   secureConnectionStart：返回浏览器与服务器开始安全链接的握手时的Unix毫秒时间戳。如果当前网页不要求安全连接，则返回0。
    // ·   requestStart：返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的Unix毫秒时间戳。
    // ·   responseStart：返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的Unix毫秒时间戳。
    // ·   responseEnd：返回浏览器从服务器收到（或从本地缓存读取）最后一个字节时（如果在此之前HTTP连接已经关闭，则返回关闭时）的Unix毫秒时间戳。
    // ·   domLoading：返回当前网页DOM结构开始解析时（即Document.readyState属性变为“loading”、相应的readystatechange事件触发时）的Unix毫秒时间戳。
    // ·   domInteractive：返回当前网页DOM结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为“interactive”、相应的readystatechange事件触发时）的Unix毫秒时间戳。
    // ·   domContentLoadedEventStart：返回当前网页DOMContentLoaded事件发生时（即DOM结构解析完毕、所有脚本开始运行时）的Unix毫秒时间戳。
    // ·   domContentLoadedEventEnd：返回当前网页所有需要执行的脚本执行完成时的Unix毫秒时间戳。
    // ·   domComplete：返回当前网页DOM结构生成时（即Document.readyState属性变为“complete”，以及相应的readystatechange事件发生时）的Unix毫秒时间戳。
    // ·   loadEventStart：返回当前网页load事件的回调函数开始时的Unix毫秒时间戳。如果该事件还没有发生，返回0。
    // ·   loadEventEnd：返回当前网页load事件的回调函数运行结束时的Unix毫秒时间戳。如果该事件还没有发生，返回0

    function computePerformanceResourceDetails(entry) {
      var validEntry = toValidEntry(entry);

      if (!validEntry) {
        return undefined;
      }

      var startTime = validEntry.startTime,
          fetchStart = validEntry.fetchStart,
          redirectStart = validEntry.redirectStart,
          redirectEnd = validEntry.redirectEnd,
          domainLookupStart = validEntry.domainLookupStart,
          domainLookupEnd = validEntry.domainLookupEnd,
          connectStart = validEntry.connectStart,
          secureConnectionStart = validEntry.secureConnectionStart,
          connectEnd = validEntry.connectEnd,
          requestStart = validEntry.requestStart,
          responseStart = validEntry.responseStart,
          responseEnd = validEntry.responseEnd;
      var details = {
        firstbyte: formatTiming(startTime, domainLookupStart, responseStart),
        trans: formatTiming(startTime, responseStart, responseEnd),
        ttfb: formatTiming(startTime, requestStart, responseStart)
      }; // Make sure a connection occurred

      if (connectEnd !== fetchStart) {
        details.tcp = formatTiming(startTime, connectStart, connectEnd); // Make sure a secure connection occurred

        if (areInOrder(connectStart, secureConnectionStart, connectEnd)) {
          details.ssl = formatTiming(startTime, secureConnectionStart, connectEnd);
        }
      } // Make sure a domain lookup occurred


      if (domainLookupEnd !== fetchStart) {
        details.dns = formatTiming(startTime, domainLookupStart, domainLookupEnd);
      }

      if (hasRedirection(entry)) {
        details.redirect = formatTiming(startTime, redirectStart, redirectEnd);
      }

      return details;
    }
    function toValidEntry(entry) {
      // Ensure timings are in the right order. On top of filtering out potential invalid
      // RumPerformanceResourceTiming, it will ignore entries from requests where timings cannot be
      // collected, for example cross origin requests without a "Timing-Allow-Origin" header allowing
      // it.
      // page_fmp	float		首屏时间(用于衡量用户什么时候看到页面的主要内容)，跟FCP的时长非常接近，这里我们就用FCP的时间作为首屏时间	firstPaintContentEnd - firstPaintContentStart
      // page_fpt	float		首次渲染时间，即白屏时间(从请求开始到浏览器开始解析第一批HTML文档字节的时间差。)	responseEnd - fetchStart
      // page_tti	float		首次可交互时间(浏览器完成所有HTML解析并且完成DOM构建，此时浏览器开始加载资源。)	domInteractive - fetchStart
      // page_firstbyte	float		首包时间	responseStart - domainLookupStart
      // page_dom_ready	float		DOM Ready时间(如果页面有同步执行的JS，则同步JS执行时间=ready-tti。)	domContentLoadEventEnd - fetchStart
      // page_load	float		页面完全加载时间(load=首次渲染时间+DOM解析耗时+同步JS执行+资源加载耗时。)	loadEventStart - fetchStart
      // page_dns	float		dns解析时间	domainLookupEnd - domainLookupStart
      // page_tcp	float		tcp连接时间	connectEnd - connectStart
      // page_ssl	float		ssl安全连接时间(仅适用于https)	connectEnd - secureConnectionStart
      // page_ttfb	float		请求响应耗时	responseStart - requestStart
      // page_trans	float		内容传输时间	responseEnd - responseStart
      // page_dom	float		DOM解析耗时	domInteractive - responseEnd
      // page_resource_load_time	float		资源加载时间	loadEventStart - domContentLoadedEventEnd
      if (!areInOrder(entry.startTime, entry.fetchStart, entry.domainLookupStart, entry.domainLookupEnd, entry.connectStart, entry.connectEnd, entry.requestStart, entry.responseStart, entry.responseEnd)) {
        return undefined;
      }

      if (!hasRedirection(entry)) {
        return entry;
      }

      var redirectStart = entry.redirectStart;
      var redirectEnd = entry.redirectEnd; // Firefox doesn't provide redirect timings on cross origin requests.
      // Provide a default for those.

      if (redirectStart < entry.startTime) {
        redirectStart = entry.startTime;
      }

      if (redirectEnd < entry.startTime) {
        redirectEnd = entry.fetchStart;
      } // Make sure redirect timings are in order


      if (!areInOrder(entry.startTime, redirectStart, redirectEnd, entry.fetchStart)) {
        return undefined;
      }

      return extend({}, entry, {
        redirectEnd: redirectEnd,
        redirectStart: redirectStart
      }); // return {
      //   ...entry,
      //   redirectEnd,
      //   redirectStart
      // }
    }

    function hasRedirection(entry) {
      // The only time fetchStart is different than startTime is if a redirection occurred.
      return entry.fetchStart !== entry.startTime;
    }

    function formatTiming(origin, start, end) {
      return msToNs(end - start); // return {
      //   duration: msToNs(end - start),
      //   start: msToNs(start - origin)
      // }
    }

    function computeSize(entry) {
      // Make sure a request actually occurred
      if (entry.startTime < entry.responseStart) {
        return entry.decodedBodySize;
      }

      return undefined;
    }
    function isAllowedRequestUrl(configuration, url) {
      return url && !isIntakeRequest(url, configuration);
    }

    function supportPerformanceObject() {
      return window.performance !== undefined && 'getEntries' in performance;
    }

    function supportPerformanceTimingEvent(entryType) {
      return window.PerformanceObserver && PerformanceObserver.supportedEntryTypes !== undefined && includes(PerformanceObserver.supportedEntryTypes, entryType);
    }
    function startPerformanceCollection(lifeCycle, configuration) {
      retrieveInitialDocumentResourceTiming(function (timing) {
        handleRumPerformanceEntries(lifeCycle, configuration, [timing]);
      });

      if (supportPerformanceObject()) {
        var performanceEntries = performance.getEntries(); // Because the performance entry list can be quite large
        // delay the computation to prevent the SDK from blocking the main thread on init

        setTimeout(function () {
          handleRumPerformanceEntries(lifeCycle, configuration, performanceEntries);
        });
      }

      if (window.PerformanceObserver) {
        var handlePerformanceEntryList = function handlePerformanceEntryList(entries) {
          handleRumPerformanceEntries(lifeCycle, configuration, entries.getEntries());
        };

        var mainEntries = ['resource', 'navigation', 'longtask', 'paint'];
        var experimentalEntries = ['largest-contentful-paint', 'first-input', 'layout-shift'];

        try {
          // Experimental entries are not retrieved by performance.getEntries()
          // use a single PerformanceObserver with buffered flag by type
          // to get values that could happen before SDK init
          each(experimentalEntries, function (type) {
            var observer = new PerformanceObserver(handlePerformanceEntryList);
            observer.observe({
              type: type,
              buffered: true
            });
          });
        } catch (e) {
          // Some old browser versions (ex: chrome 67) don't support the PerformanceObserver type and buffered options
          // In these cases, fallback to PerformanceObserver with entryTypes
          each(experimentalEntries, function (type) {
            mainEntries.push(type);
          });
        }

        var mainObserver = new PerformanceObserver(handlePerformanceEntryList);
        mainObserver.observe({
          entryTypes: mainEntries
        });

        if (supportPerformanceObject() && 'addEventListener' in performance) {
          // https://bugzilla.mozilla.org/show_bug.cgi?id=1559377
          performance.addEventListener('resourcetimingbufferfull', function () {
            performance.clearResourceTimings();
          });
        }
      }

      if (!supportPerformanceTimingEvent('navigation')) {
        retrieveNavigationTiming(function (timing) {
          handleRumPerformanceEntries(lifeCycle, configuration, [timing]);
        });
      }

      if (!supportPerformanceTimingEvent('first-input')) {
        retrieveFirstInputTiming(function (timing) {
          return handleRumPerformanceEntries(lifeCycle, configuration, [timing]);
        });
      }
    }
    function retrieveInitialDocumentResourceTiming(callback) {
      runOnReadyState('interactive', function () {
        var timing;
        var forcedAttributes = {
          entryType: 'resource',
          initiatorType: FAKE_INITIAL_DOCUMENT,
          traceId: ''
        };

        if (supportPerformanceTimingEvent('navigation') && performance.getEntriesByType('navigation').length > 0) {
          var navigationEntry = performance.getEntriesByType('navigation')[0];
          timing = extend(navigationEntry.toJSON(), forcedAttributes);
        } else {
          var relativePerformanceTiming = computeRelativePerformanceTiming();
          timing = extend(relativePerformanceTiming, {
            decodedBodySize: 0,
            duration: relativePerformanceTiming.responseEnd,
            name: window.location.href,
            startTime: 0
          }, forcedAttributes);
        }

        callback(timing);
      });
    }

    function retrieveNavigationTiming(callback) {
      function sendFakeTiming() {
        callback(extend(computeRelativePerformanceTiming(), {
          entryType: 'navigation'
        }));
      }

      runOnReadyState('complete', function () {
        // Send it a bit after the actual load event, so the "loadEventEnd" timing is accurate
        setTimeout(sendFakeTiming);
      });
    }
    /**
     * first-input timing entry polyfill based on
     * https://github.com/GoogleChrome/web-vitals/blob/master/src/lib/polyfills/firstInputPolyfill.ts
     */


    function retrieveFirstInputTiming(callback) {
      var startTimeStamp = dateNow();
      var timingSent = false;
      var listeners = addEventListeners(window, [DOM_EVENT.CLICK, DOM_EVENT.MOUSE_DOWN, DOM_EVENT.KEY_DOWN, DOM_EVENT.TOUCH_START, DOM_EVENT.POINTER_DOWN], function (evt) {
        // Only count cancelable events, which should trigger behavior important to the user.
        if (!evt.cancelable) {
          return;
        } // This timing will be used to compute the "first Input delay", which is the delta between
        // when the system received the event (e.g. evt.timeStamp) and when it could run the callback
        // (e.g. performance.now()).


        var timing = {
          entryType: 'first-input',
          processingStart: relativeNow(),
          startTime: evt.timeStamp
        };

        if (evt.type === DOM_EVENT.POINTER_DOWN) {
          sendTimingIfPointerIsNotCancelled(timing);
        } else {
          sendTiming(timing);
        }
      }, {
        passive: true,
        capture: true
      });
      var removeEventListeners = listeners.stop;
      /**
       * Pointer events are a special case, because they can trigger main or compositor thread behavior.
       * We differenciate these cases based on whether or not we see a pointercancel event, which are
       * fired when we scroll. If we're scrolling we don't need to report input delay since FID excludes
       * scrolling and pinch/zooming.
       */

      function sendTimingIfPointerIsNotCancelled(timing) {
        addEventListeners(window, [DOM_EVENT.POINTER_UP, DOM_EVENT.POINTER_CANCEL], function (event) {
          if (event.type === DOM_EVENT.POINTER_UP) {
            sendTiming(timing);
          }
        }, {
          once: true
        });
      }

      function sendTiming(timing) {
        if (!timingSent) {
          timingSent = true;
          removeEventListeners(); // In some cases the recorded delay is clearly wrong, e.g. it's negative or it's larger than
          // the time between now and when the page was loaded.
          // - https://github.com/GoogleChromeLabs/first-input-delay/issues/4
          // - https://github.com/GoogleChromeLabs/first-input-delay/issues/6
          // - https://github.com/GoogleChromeLabs/first-input-delay/issues/7

          var delay = timing.processingStart - timing.startTime;

          if (delay >= 0 && delay < dateNow() - startTimeStamp) {
            callback(timing);
          }
        }
      }
    }

    function runOnReadyState(expectedReadyState, callback) {
      if (document.readyState === expectedReadyState || document.readyState === 'complete') {
        callback();
      } else {
        var eventName = expectedReadyState === 'complete' ? DOM_EVENT.LOAD : DOM_EVENT.DOM_CONTENT_LOADED;
        addEventListener(window, eventName, callback, {
          once: true
        });
      }
    }

    function computeRelativePerformanceTiming() {
      var result = {};
      var timing = performance.timing;

      for (var key in timing) {
        if (isNumber(timing[key])) {
          result[key] = timing[key] === 0 ? 0 : getRelativeTime(timing[key]);
        }
      }

      return result;
    }

    function handleRumPerformanceEntries(lifeCycle, configuration, entries) {
      var rumPerformanceEntries = filter(entries, function (entry) {
        return entry.entryType === 'resource' || entry.entryType === 'navigation' || entry.entryType === 'paint' || entry.entryType === 'longtask' || entry.entryType === 'largest-contentful-paint' || entry.entryType === 'first-input' || entry.entryType === 'layout-shift';
      });
      var rumAllowedPerformanceEntries = filter(rumPerformanceEntries, function (entry) {
        return !isIncompleteNavigation(entry) && !isForbiddenResource(configuration, entry);
      });

      if (rumAllowedPerformanceEntries.length) {
        lifeCycle.notify(LifeCycleEventType.PERFORMANCE_ENTRIES_COLLECTED, rumAllowedPerformanceEntries);
      }
    }

    function isIncompleteNavigation(entry) {
      return entry.entryType === 'navigation' && entry.loadEventEnd <= 0;
    }

    function isForbiddenResource(configuration, entry) {
      return entry.entryType === 'resource' && !isAllowedRequestUrl(configuration, entry.name);
    }

    function supportPerformanceEntry() {
      // Safari 10 doesn't support PerformanceEntry
      return typeof PerformanceEntry === 'function';
    }

    function createDOMMutationObservable() {
      var MutationObserver = getMutationObserverConstructor();
      var observable = new Observable(function () {
        if (!MutationObserver) {
          return;
        }

        var observer = new MutationObserver(function () {
          return observable.notify();
        });
        observer.observe(document, {
          attributes: true,
          characterData: true,
          childList: true,
          subtree: true
        });
        return function () {
          return observer.disconnect();
        };
      });
      return observable;
    }
    function getMutationObserverConstructor() {
      var constructor;
      var browserWindow = window; // Angular uses Zone.js to provide a context persisting across async tasks.  Zone.js replaces the
      // global MutationObserver constructor with a patched version to support the context propagation.
      // There is an ongoing issue[1][2] with this setup when using a MutationObserver within a Angular
      // component: on some occasions, the callback is being called in an infinite loop, causing the
      // page to freeze (even if the callback is completely empty).
      //
      // To work around this issue, we try to get the original MutationObserver constructor stored by
      // Zone.js.
      //
      // [1] https://github.com/angular/angular/issues/26948
      // [2] https://github.com/angular/angular/issues/31712

      if (browserWindow.Zone) {
        var zoneSymbol = browserWindow.Zone.__symbol__; // Zone.js 0.8.6+ is storing original class constructors into the browser 'window' object[3].
        //
        // [3] https://github.com/angular/angular/blob/6375fa79875c0fe7b815efc45940a6e6f5c9c9eb/packages/zone.js/lib/common/utils.ts#L288

        constructor = browserWindow[zoneSymbol('MutationObserver')];

        if (!constructor && browserWindow.MutationObserver) {
          // Anterior Zone.js versions (used in Angular 2) does not expose the original MutationObserver
          // in the 'window' object. Luckily, the patched MutationObserver class is storing an original
          // instance in its properties[4]. Let's get the original MutationObserver constructor from
          // there.
          //
          // [4] https://github.com/angular/zone.js/blob/v0.8.5/lib/common/utils.ts#L412
          var patchedInstance = new browserWindow.MutationObserver(noop);
          var originalInstance = patchedInstance[zoneSymbol('originalInstance')];
          constructor = originalInstance && originalInstance.constructor;
        }
      }

      if (!constructor) {
        constructor = browserWindow.MutationObserver;
      }

      return constructor;
    }

    function createLocationChangeObservable(location) {
      var currentLocation = shallowClone(location);
      var observable = new Observable(function () {
        var _trackHistory = trackHistory(onLocationChange);

        var _trackHash = trackHash(onLocationChange);

        return function () {
          _trackHistory.stop();

          _trackHash.stop();
        };
      });

      function onLocationChange() {
        if (currentLocation.href === location.href) {
          return;
        }

        var newLocation = shallowClone(location);
        observable.notify({
          newLocation: newLocation,
          oldLocation: currentLocation
        });
        currentLocation = newLocation;
      }

      return observable;
    }

    function trackHistory(onHistoryChange) {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      var originalPushState = history.pushState;

      history.pushState = function () {
        originalPushState.apply(this, arguments);
        onHistoryChange();
      }; // eslint-disable-next-line @typescript-eslint/unbound-method


      var originalReplaceState = history.replaceState;

      history.replaceState = function () {
        originalReplaceState.apply(this, arguments);
        onHistoryChange();
      };

      var _addEventListener = addEventListener(window, DOM_EVENT.POP_STATE, onHistoryChange);

      var removeListener = _addEventListener.stop;

      var stop = function stop() {
        removeListener();
        history.pushState = originalPushState;
        history.replaceState = originalReplaceState;
      };

      return {
        stop: stop
      };
    }

    function trackHash(onHashChange) {
      return addEventListener(window, DOM_EVENT.HASH_CHANGE, onHashChange);
    }

    function startLongTaskCollection(lifeCycle, sessionManager) {
      lifeCycle.subscribe(LifeCycleEventType.PERFORMANCE_ENTRIES_COLLECTED, function (entries) {
        for (var entry of entries) {
          if (entry.entryType !== 'longtask') {
            return;
          }

          var session = sessionManager.findTrackedSession(entry.startTime);

          if (!session) {
            break;
          }

          var startClocks = relativeToClocks(entry.startTime);
          var rawRumEvent = {
            date: startClocks.timeStamp,
            long_task: {
              id: UUID(),
              duration: toServerDuration(entry.duration)
            },
            type: RumEventType.LONG_TASK
          };
          lifeCycle.notify(LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, {
            rawRumEvent: rawRumEvent,
            startTime: startClocks.relative,
            domainContext: {
              performanceEntry: entry.toJSON()
            }
          });
        }
      });
    }

    function trackEventCounts(lifeCycle, callback) {
      if (typeof callback === 'undefined') {
        callback = noop;
      }

      var eventCounts = {
        errorCount: 0,
        longTaskCount: 0,
        resourceCount: 0,
        actionCount: 0,
        frustrationCount: 0
      };
      var subscription = lifeCycle.subscribe(LifeCycleEventType.RUM_EVENT_COLLECTED, function (event) {
        switch (event.type) {
          case RumEventType.ERROR:
            eventCounts.errorCount += 1;
            callback(eventCounts);
            break;

          case RumEventType.ACTION:
            if (event.action.frustration) {
              eventCounts.frustrationCount += event.action.frustration.type.length;
            }

            eventCounts.actionCount += 1;
            callback(eventCounts);
            break;

          case RumEventType.LONG_TASK:
            eventCounts.longTaskCount += 1;
            callback(eventCounts);
            break;

          case RumEventType.RESOURCE:
            eventCounts.resourceCount += 1;
            callback(eventCounts);
            break;
        }
      });
      return {
        stop: function stop() {
          subscription.unsubscribe();
        },
        eventCounts: eventCounts
      };
    }

    var PAGE_ACTIVITY_VALIDATION_DELAY = 100; // Delay to wait after a page activity to end the tracking process

    var PAGE_ACTIVITY_END_DELAY = 100;
    /**
     * Wait for the page activity end
     *
     * Detection lifecycle:
     * ```
     *                        Wait page activity end
     *              .-------------------'--------------------.
     *              v                                        v
     *     [Wait for a page activity ]          [Wait for a maximum duration]
     *     [timeout: VALIDATION_DELAY]          [  timeout: maxDuration     ]
     *          /                  \                           |
     *         v                    v                          |
     *  [No page activity]   [Page activity]                   |
     *         |                   |,----------------------.   |
     *         v                   v                       |   |
     *     (Discard)     [Wait for a page activity]        |   |
     *                   [   timeout: END_DELAY   ]        |   |
     *                       /                \            |   |
     *                      v                  v           |   |
     *             [No page activity]    [Page activity]   |   |
     *                      |                 |            |   |
     *                      |                 '------------'   |
     *                      '-----------. ,--------------------'
     *                                   v
     *                                 (End)
     * ```
     *
     * Note: by assuming that maxDuration is greater than VALIDATION_DELAY, we are sure that if the
     * process is still alive after maxDuration, it has been validated.
     */

    function waitPageActivityEnd(lifeCycle, domMutationObservable, configuration, pageActivityEndCallback, maxDuration) {
      var pageActivityObservable = createPageActivityObservable(lifeCycle, domMutationObservable, configuration);
      return doWaitPageActivityEnd(pageActivityObservable, pageActivityEndCallback, maxDuration);
    }
    function doWaitPageActivityEnd(pageActivityObservable, pageActivityEndCallback, maxDuration) {
      var pageActivityEndTimeoutId;
      var hasCompleted = false;
      var validationTimeoutId = setTimeout(function () {
        complete({
          hadActivity: false
        });
      }, PAGE_ACTIVITY_VALIDATION_DELAY);
      var maxDurationTimeoutId = maxDuration && setTimeout(function () {
        return complete({
          hadActivity: true,
          end: timeStampNow()
        });
      }, maxDuration);
      var pageActivitySubscription = pageActivityObservable.subscribe(function (data) {
        var isBusy = data.isBusy;
        clearTimeout(validationTimeoutId);
        clearTimeout(pageActivityEndTimeoutId);
        var lastChangeTime = timeStampNow();

        if (!isBusy) {
          pageActivityEndTimeoutId = setTimeout(function () {
            complete({
              hadActivity: true,
              end: lastChangeTime
            });
          }, PAGE_ACTIVITY_END_DELAY);
        }
      });

      var stop = function stop() {
        hasCompleted = true;
        clearTimeout(validationTimeoutId);
        clearTimeout(pageActivityEndTimeoutId);
        clearTimeout(maxDurationTimeoutId);
        pageActivitySubscription.unsubscribe();
      };

      function complete(event) {
        if (hasCompleted) {
          return;
        }

        stop();
        pageActivityEndCallback(event);
      }

      return {
        stop: stop
      };
    }
    function createPageActivityObservable(lifeCycle, domMutationObservable, configuration) {
      var observable = new Observable(function () {
        var subscriptions = [];
        var firstRequestIndex;
        var pendingRequestsCount = 0;
        subscriptions.push(domMutationObservable.subscribe(notifyPageActivity), lifeCycle.subscribe(LifeCycleEventType.PERFORMANCE_ENTRIES_COLLECTED, function (entries) {
          if (some(entries, function (entry) {
            return entry.entryType === 'resource' && !isExcludedUrl(configuration, entry.name);
          })) {
            notifyPageActivity();
          }
        }), lifeCycle.subscribe(LifeCycleEventType.REQUEST_STARTED, function (startEvent) {
          if (isExcludedUrl(configuration, startEvent.url)) {
            return;
          }

          if (firstRequestIndex === undefined) {
            firstRequestIndex = startEvent.requestIndex;
          }

          pendingRequestsCount += 1;
          notifyPageActivity();
        }), lifeCycle.subscribe(LifeCycleEventType.REQUEST_COMPLETED, function (request) {
          if (isExcludedUrl(configuration, request.url) || firstRequestIndex === undefined || // If the request started before the tracking start, ignore it
          request.requestIndex < firstRequestIndex) {
            return;
          }

          pendingRequestsCount -= 1;
          notifyPageActivity();
        }));
        trackWindowOpen(notifyPageActivity);
        return function () {
          each(subscriptions, function (s) {
            s.unsubscribe();
          });
        };

        function notifyPageActivity() {
          observable.notify({
            isBusy: pendingRequestsCount > 0
          });
        }
      });
      return observable;
    }

    function isExcludedUrl(configuration, requestUrl) {
      return matchList(configuration.excludedActivityUrls, requestUrl);
    }

    function trackWindowOpen(callback) {
      return instrumentMethodAndCallOriginal(window, 'open', {
        before: callback
      });
    }

    var MAX_DURATION_BETWEEN_CLICKS = ONE_SECOND;
    var MAX_DISTANCE_BETWEEN_CLICKS = 100;
    var ClickChainStatus = {
      WaitingForMoreClicks: 'WaitingForMoreClicks',
      WaitingForClicksToStop: 'WaitingForClicksToStop',
      Finalized: 'Finalized'
    };
    function createClickChain(firstClick, onFinalize) {
      var bufferedClicks = [];
      var status = ClickChainStatus.WaitingForMoreClicks;
      var maxDurationBetweenClicksTimeout;
      appendClick(firstClick);

      function appendClick(click) {
        click.stopObservable.subscribe(tryFinalize);
        bufferedClicks.push(click);
        clearTimeout(maxDurationBetweenClicksTimeout);
        maxDurationBetweenClicksTimeout = setTimeout(dontAcceptMoreClick, MAX_DURATION_BETWEEN_CLICKS);
      }

      function tryFinalize() {
        if (status === ClickChainStatus.WaitingForClicksToStop && every(bufferedClicks, function (click) {
          return click.isStopped();
        })) {
          status = ClickChainStatus.Finalized;
          onFinalize(bufferedClicks);
        }
      }

      function dontAcceptMoreClick() {
        clearTimeout(maxDurationBetweenClicksTimeout);

        if (status === ClickChainStatus.WaitingForMoreClicks) {
          status = ClickChainStatus.WaitingForClicksToStop;
          tryFinalize();
        }
      }

      return {
        tryAppend: function tryAppend(click) {
          if (status !== ClickChainStatus.WaitingForMoreClicks) {
            return false;
          }

          if (bufferedClicks.length > 0 && !areEventsSimilar(bufferedClicks[bufferedClicks.length - 1].event, click.event)) {
            dontAcceptMoreClick();
            return false;
          }

          appendClick(click);
          return true;
        },
        stop: function stop() {
          dontAcceptMoreClick();
        }
      };
    }
    /**
     * Checks whether two events are similar by comparing their target, position and timestamp
     */

    function areEventsSimilar(first, second) {
      return first.target === second.target && mouseEventDistance(first, second) <= MAX_DISTANCE_BETWEEN_CLICKS && first.timeStamp - second.timeStamp <= MAX_DURATION_BETWEEN_CLICKS;
    }

    function mouseEventDistance(origin, other) {
      return Math.sqrt(Math.pow(origin.clientX - other.clientX, 2) + Math.pow(origin.clientY - other.clientY, 2));
    }

    var DEFAULT_PROGRAMMATIC_ATTRIBUTE = 'data-guance-action-name';
    function getActionNameFromElement(element, userProgrammaticAttribute) {
      // Proceed to get the action name in two steps:
      // * first, get the name programmatically, explicitly defined by the user.
      // * then, use strategies that are known to return good results. Those strategies will be used on
      //   the element and a few parents, but it's likely that they won't succeed at all.
      // * if no name is found this way, use strategies returning less accurate names as a fallback.
      //   Those are much likely to succeed.
      return getActionNameFromElementProgrammatically(element, DEFAULT_PROGRAMMATIC_ATTRIBUTE) || userProgrammaticAttribute && getActionNameFromElementProgrammatically(element, userProgrammaticAttribute) || getActionNameFromElementForStrategies(element, userProgrammaticAttribute, priorityStrategies) || getActionNameFromElementForStrategies(element, userProgrammaticAttribute, fallbackStrategies) || '';
    }

    function getActionNameFromElementProgrammatically(targetElement, programmaticAttribute) {
      var elementWithAttribute; // We don't use getActionNameFromElementForStrategies here, because we want to consider all parents,
      // without limit. It is up to the user to declare a relevant naming strategy.
      // If available, use element.closest() to match get the attribute from the element or any of its
      // parent.  Else fallback to a more traditional implementation.

      if (supportsElementClosest()) {
        elementWithAttribute = targetElement.closest('[' + programmaticAttribute + ']');
      } else {
        var element = targetElement;

        while (element) {
          if (element.hasAttribute(programmaticAttribute)) {
            elementWithAttribute = element;
            break;
          }

          element = element.parentElement;
        }
      }

      if (!elementWithAttribute) {
        return;
      }

      var name = elementWithAttribute.getAttribute(programmaticAttribute);
      return truncate(normalizeWhitespace(name.trim()));
    }

    var priorityStrategies = [// associated LABEL text
    function (element, userProgrammaticAttribute) {
      // IE does not support element.labels, so we fallback to a CSS selector based on the element id
      // instead
      if (supportsLabelProperty()) {
        if ('labels' in element && element.labels && element.labels.length > 0) {
          return getTextualContent(element.labels[0], userProgrammaticAttribute);
        }
      } else if (element.id) {
        var label = element.ownerDocument && find(element.ownerDocument.querySelectorAll('label'), function (label) {
          return label.htmlFor === element.id;
        });
        return label && getTextualContent(label, userProgrammaticAttribute);
      }
    }, // INPUT button (and associated) value
    function (element) {
      if (element.nodeName === 'INPUT') {
        var input = element;
        var type = input.getAttribute('type');

        if (type === 'button' || type === 'submit' || type === 'reset') {
          return input.value;
        }
      }
    }, // BUTTON, LABEL or button-like element text
    function (element, userProgrammaticAttribute) {
      if (element.nodeName === 'BUTTON' || element.nodeName === 'LABEL' || element.getAttribute('role') === 'button') {
        return getTextualContent(element, userProgrammaticAttribute);
      }
    }, function (element) {
      return element.getAttribute('aria-label');
    }, // associated element text designated by the aria-labelledby attribute
    function (element, userProgrammaticAttribute) {
      var labelledByAttribute = element.getAttribute('aria-labelledby');

      if (labelledByAttribute) {
        labelledByAttribute = labelledByAttribute.split(/\s+/);
        labelledByAttribute = map(labelledByAttribute, function (id) {
          return getElementById(element, id);
        });
        labelledByAttribute = filter(labelledByAttribute, function (label) {
          return Boolean(label);
        });
        labelledByAttribute = map(labelledByAttribute, function (ele) {
          return getTextualContent(ele);
        });
        return labelledByAttribute.join(' ');
      }
    }, function (element) {
      return element.getAttribute('alt');
    }, function (element) {
      return element.getAttribute('name');
    }, function (element) {
      return element.getAttribute('title');
    }, function (element) {
      return element.getAttribute('placeholder');
    }, // SELECT first OPTION text
    function (element) {
      if ('options' in element && element.options.length > 0) {
        return getTextualContent(element.options[0]);
      }
    }];
    var fallbackStrategies = [function (element, userProgrammaticAttribute) {
      return getTextualContent(element, userProgrammaticAttribute);
    }];
    /**
     * Iterates over the target element and its parent, using the strategies list to get an action name.
     * Each strategies are applied on each element, stopping as soon as a non-empty value is returned.
     */

    var MAX_PARENTS_TO_CONSIDER = 10;

    function getActionNameFromElementForStrategies(targetElement, userProgrammaticAttribute, strategies) {
      var element = targetElement;
      var recursionCounter = 0;

      while (recursionCounter <= MAX_PARENTS_TO_CONSIDER && element && element.nodeName !== 'BODY' && element.nodeName !== 'HTML' && element.nodeName !== 'HEAD') {
        for (var strategy of strategies) {
          var name = strategy(element, userProgrammaticAttribute);

          if (typeof name === 'string') {
            var trimmedName = name.trim();

            if (trimmedName) {
              return truncate(normalizeWhitespace(trimmedName));
            }
          }
        } // Consider a FORM as a contextual limit to get the action name.  This is experimental and may
        // be reconsidered in the future.


        if (element.nodeName === 'FORM') {
          break;
        }

        element = element.parentElement;
        recursionCounter += 1;
      }
    }

    function normalizeWhitespace(s) {
      return s.replace(/\s+/g, ' ');
    }

    function truncate(s) {
      return s.length > 100 ? safeTruncate(s, 100) + ' [...]' : s;
    }

    function getElementById(refElement, id) {
      // Use the element ownerDocument here, because tests are executed in an iframe, so
      // document.getElementById won't work.
      return refElement.ownerDocument ? refElement.ownerDocument.getElementById(id) : null;
    }

    function getTextualContent(element, userProgrammaticAttribute) {
      if (element.isContentEditable) {
        return;
      }

      if ('innerText' in element) {
        var text = element.innerText;

        var removeTextFromElements = function removeTextFromElements(query) {
          var list = element.querySelectorAll(query);

          for (var index = 0; index < list.length; index += 1) {
            var _element = list[index];

            if ('innerText' in _element) {
              var textToReplace = _element.innerText;

              if (textToReplace && textToReplace.trim().length > 0) {
                text = text.replace(textToReplace, '');
              }
            }
          }
        };

        if (!supportsInnerTextScriptAndStyleRemoval()) {
          // remove the inner text of SCRIPT and STYLES from the result. This is a bit dirty, but should
          // be relatively fast and work in most cases.
          removeTextFromElements('script, style');
        } // remove the text of elements with programmatic attribute value


        removeTextFromElements('[' + DEFAULT_PROGRAMMATIC_ATTRIBUTE + ']');

        if (userProgrammaticAttribute) {
          removeTextFromElements('[' + userProgrammaticAttribute + ']');
        }

        return text;
      }

      return element.textContent;
    }
    /**
     * Returns true if element.innerText excludes the text from inline SCRIPT and STYLE element. This
     * should be the case everywhere except on Internet Explorer 10 and 11 (see [1])
     *
     * The innerText property relies on what is actually rendered to compute its output, so to check if
     * it actually excludes SCRIPT and STYLE content, a solution would be to create a style element, set
     * its content to '*', inject it in the document body, and check if the style element innerText
     * property returns '*'. Using a new `document` instance won't work as it is not rendered.
     *
     * This solution requires specific CSP rules (see [2]) to be set by the customer. We want to avoid
     * this, so instead we rely on browser detection. In case of false negative, the impact should be
     * low, since we rely on this result to remove the SCRIPT and STYLE innerText (which will be empty)
     * from a parent element innerText.
     *
     * [1]: https://web.archive.org/web/20210602165716/http://perfectionkills.com/the-poor-misunderstood-innerText/#diff-with-textContent
     * [2]: https://github.com/DataDog/browser-sdk/issues/1084
     */


    function supportsInnerTextScriptAndStyleRemoval() {
      return !isIE();
    }
    /**
     * Returns true if the browser supports the element.labels property.  This should be the case
     * everywhere except on Internet Explorer.
     * Note: The result is computed lazily, because we don't want any DOM access when the SDK is
     * evaluated.
     */


    var supportsLabelPropertyResult;

    function supportsLabelProperty() {
      if (supportsLabelPropertyResult === undefined) {
        supportsLabelPropertyResult = 'labels' in HTMLInputElement.prototype;
      }

      return supportsLabelPropertyResult;
    }
    /**
     * Returns true if the browser supports the element.closest method.  This should be the case
     * everywhere except on Internet Explorer.
     * Note: The result is computed lazily, because we don't want any DOM access when the SDK is
     * evaluated.
     */


    var supportsElementClosestResult;

    function supportsElementClosest() {
      if (supportsElementClosestResult === undefined) {
        supportsElementClosestResult = 'closest' in HTMLElement.prototype;
      }

      return supportsElementClosestResult;
    }

    function listenActionEvents(events) {
      var onClick = events.onClick;
      var onPointerDown = events.onPointerDown;
      var hasSelectionChanged = false;
      var selectionEmptyAtPointerDown;
      var hasInputChanged = false;
      var clickContext;
      var listeners = [addEventListener(window, DOM_EVENT.POINTER_DOWN, function (event) {
        hasSelectionChanged = false;
        selectionEmptyAtPointerDown = isSelectionEmpty();

        if (isMouseEventOnElement(event)) {
          clickContext = onPointerDown(event);
        }
      }, {
        capture: true
      }), addEventListener(window, DOM_EVENT.SELECTION_CHANGE, function () {
        if (!selectionEmptyAtPointerDown || !isSelectionEmpty()) {
          hasSelectionChanged = true;
        }
      }, {
        capture: true
      }), addEventListener(window, DOM_EVENT.CLICK, function (clickEvent) {
        if (isMouseEventOnElement(clickEvent) && clickContext) {
          // Use a scoped variable to make sure the value is not changed by other clicks
          var userActivity = {
            selection: hasSelectionChanged,
            input: hasInputChanged
          };

          if (!hasInputChanged) {
            setTimeout(function () {
              userActivity.input = hasInputChanged;
            });
          }

          onClick(clickContext, clickEvent, function () {
            return userActivity;
          });
          clickContext = undefined;
        }
      }, {
        capture: true
      }), addEventListener(window, DOM_EVENT.INPUT, function () {
        hasInputChanged = true;
      }, {
        capture: true
      })];
      return {
        stop: function stop() {
          each(listeners, function (listener) {
            return listener.stop();
          });
        }
      };
    }

    function isSelectionEmpty() {
      var selection = window.getSelection();
      return !selection || selection.isCollapsed;
    }

    function isMouseEventOnElement(event) {
      return event.target instanceof Element;
    }

    var MIN_CLICKS_PER_SECOND_TO_CONSIDER_RAGE = 3;
    function computeFrustration(clicks, rageClick) {
      if (isRage(clicks)) {
        rageClick.addFrustration(FrustrationType.RAGE_CLICK);

        if (clicks.some(isDead)) {
          rageClick.addFrustration(FrustrationType.DEAD_CLICK);
        }

        if (rageClick.hasError) {
          rageClick.addFrustration(FrustrationType.ERROR_CLICK);
        }

        return {
          isRage: true
        };
      }

      var hasSelectionChanged = some(clicks, function (click) {
        return click.getUserActivity().selection;
      });
      each(clicks, function (click) {
        if (click.hasError) {
          click.addFrustration(FrustrationType.ERROR_CLICK);
        }

        if (isDead(click) && // Avoid considering clicks part of a double-click or triple-click selections as dead clicks
        !hasSelectionChanged) {
          click.addFrustration(FrustrationType.DEAD_CLICK);
        }
      });
      return {
        isRage: false
      };
    }
    function isRage(clicks) {
      if (some(clicks, function (click) {
        return click.getUserActivity().selection;
      })) {
        return false;
      }

      for (var i = 0; i < clicks.length - (MIN_CLICKS_PER_SECOND_TO_CONSIDER_RAGE - 1); i += 1) {
        if (clicks[i + MIN_CLICKS_PER_SECOND_TO_CONSIDER_RAGE - 1].event.timeStamp - clicks[i].event.timeStamp <= ONE_SECOND) {
          return true;
        }
      }

      return false;
    }
    var DEAD_CLICK_EXCLUDE_SELECTOR = // inputs that don't trigger a meaningful event like "input" when clicked, including textual
    // inputs (using a negative selector is shorter here)
    'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="range"]),' + 'textarea,' + 'select,' + // canvas, as there is no good way to detect activity occurring on them
    'canvas,' + // links that are interactive (have an href attribute) or any of their descendants, as they can
    // open a new tab or navigate to a hash without triggering a meaningful event
    'a[href],' + 'a[href] *';
    function isDead(click) {
      if (click.hasPageActivity || click.getUserActivity().input) {
        return false;
      }

      return !elementMatches(click.event.target, DEAD_CLICK_EXCLUDE_SELECTOR);
    }

    var CLICK_ACTION_MAX_DURATION = 10 * ONE_SECOND;
    var ACTION_CONTEXT_TIME_OUT_DELAY = 5 * ONE_MINUTE; // arbitrary

    function trackClickActions(lifeCycle, domMutationObservable, configuration) {
      var history = new ContextHistory(ACTION_CONTEXT_TIME_OUT_DELAY);
      var stopObservable = new Observable();
      var currentClickChain;
      lifeCycle.subscribe(LifeCycleEventType.SESSION_RENEWED, function () {
        history.reset();
      });
      lifeCycle.subscribe(LifeCycleEventType.BEFORE_UNLOAD, stopClickChain);
      lifeCycle.subscribe(LifeCycleEventType.VIEW_ENDED, stopClickChain);

      var _listenActionEvents = listenActionEvents({
        onPointerDown: function onPointerDown(pointerDownEvent) {
          return processPointerDown(configuration, pointerDownEvent);
        },
        onClick: function onClick(clickActionBase, clickEvent, getUserActivity) {
          return processClick(configuration, lifeCycle, domMutationObservable, history, stopObservable, appendClickToClickChain, clickActionBase, clickEvent, getUserActivity);
        }
      });

      var stopActionEventsListener = _listenActionEvents.stop;
      var actionContexts = {
        findActionId: function findActionId(startTime) {
          return configuration.trackFrustrations ? history.findAll(startTime) : history.find(startTime);
        }
      };
      return {
        stop: function stop() {
          stopClickChain();
          stopObservable.notify();
          stopActionEventsListener();
        },
        actionContexts: actionContexts
      };

      function stopClickChain() {
        if (currentClickChain) {
          currentClickChain.stop();
        }
      }

      function appendClickToClickChain(click) {
        if (!currentClickChain || !currentClickChain.tryAppend(click)) {
          var rageClick = click.clone();
          currentClickChain = createClickChain(click, function (clicks) {
            finalizeClicks(clicks, rageClick);
          });
        }
      }

      function processPointerDown(configuration, pointerDownEvent) {
        var clickActionBase = computeClickActionBase(pointerDownEvent, configuration.actionNameAttribute);
        return clickActionBase;
      }

      function processClick(configuration, lifeCycle, domMutationObservable, history, stopObservable, appendClickToClickChain, clickActionBase, clickEvent, getUserActivity) {
        var click = newClick(lifeCycle, history, getUserActivity, clickActionBase, clickEvent);

        if (configuration.trackFrustrations) {
          appendClickToClickChain(click);
        }

        var _waitPageActivityEnd = waitPageActivityEnd(lifeCycle, domMutationObservable, configuration, function (pageActivityEndEvent) {
          if (pageActivityEndEvent.hadActivity && pageActivityEndEvent.end < click.startClocks.timeStamp) {
            // If the clock is looking weird, just discard the click
            click.discard();
          } else {
            click.stop(pageActivityEndEvent.hadActivity ? pageActivityEndEvent.end : undefined); // Validate or discard the click only if we don't track frustrations. It'll be done when
            // the click chain is finalized.

            if (!configuration.trackFrustrations) {
              if (!pageActivityEndEvent.hadActivity) {
                // If we are not tracking frustrations, we should discard the click to keep backward
                // compatibility.
                click.discard();
              } else {
                click.validate();
              }
            }
          }
        }, CLICK_ACTION_MAX_DURATION);

        var viewEndedSubscription = lifeCycle.subscribe(LifeCycleEventType.VIEW_ENDED, function (data) {
          click.stop(data.endClocks.timeStamp);
        });
        var stopSubscription = stopObservable.subscribe(function () {
          click.stop();
        });
        click.stopObservable.subscribe(function () {
          viewEndedSubscription.unsubscribe();

          _waitPageActivityEnd.stop();

          stopSubscription.unsubscribe();
        });
      }
    }

    function computeClickActionBase(event, actionNameAttribute) {
      var target;
      var position; // if (isExperimentalFeatureEnabled('clickmap')) {
      //   var rect = event.target.getBoundingClientRect()
      //   target = assign(
      //     {
      //       width: Math.round(rect.width),
      //       height: Math.round(rect.height),
      //     },
      //     getSelectorsFromElement(event.target, actionNameAttribute)
      //   )
      //   position = {
      //     // Use clientX and Y because for SVG element offsetX and Y are relatives to the <svg> element
      //     x: Math.round(event.clientX - rect.left),
      //     y: Math.round(event.clientY - rect.top),
      //   }
      // }

      return {
        type: 'click',
        target: target,
        position: position,
        name: getActionNameFromElement(event.target, actionNameAttribute)
      };
    }

    var ClickStatus = {
      // Initial state, the click is still ongoing.
      ONGOING: 'ONGOING',
      // The click is no more ongoing but still needs to be validated or discarded.
      STOPPED: 'STOPPED',
      // Final state, the click has been stopped and validated or discarded.
      FINALIZED: 'FINALIZED'
    };

    function newClick(lifeCycle, history, getUserActivity, clickActionBase, clickEvent) {
      var id = UUID();
      var startClocks = clocksNow();
      var historyEntry = history.add(id, startClocks.relative);
      var eventCountsSubscription = trackEventCounts(lifeCycle);
      var status = ClickStatus.ONGOING;
      var activityEndTime;
      var frustrationTypes = [];
      var stopObservable = new Observable();

      function stop(newActivityEndTime) {
        if (status !== ClickStatus.ONGOING) {
          return;
        }

        activityEndTime = newActivityEndTime;
        status = ClickStatus.STOPPED;

        if (activityEndTime) {
          historyEntry.close(getRelativeTime(activityEndTime));
        } else {
          historyEntry.remove();
        }

        eventCountsSubscription.stop();
        stopObservable.notify();
      }

      return {
        event: clickEvent,
        stop: stop,
        startClocks: startClocks,
        stopObservable: stopObservable,
        hasError: eventCountsSubscription.eventCounts.errorCount > 0,
        hasPageActivity: activityEndTime !== undefined,
        getUserActivity: getUserActivity,
        addFrustration: function addFrustration(frustrationType) {
          frustrationTypes.push(frustrationType);
        },
        isStopped: function isStopped() {
          return status === ClickStatus.STOPPED || status === ClickStatus.FINALIZED;
        },
        clone: function clone() {
          return newClick(lifeCycle, history, getUserActivity, clickActionBase, clickEvent);
        },
        validate: function validate(domEvents) {
          stop();

          if (status !== ClickStatus.STOPPED) {
            return;
          }

          var _eventCountsSubscription = eventCountsSubscription.eventCounts;
          var resourceCount = _eventCountsSubscription.resourceCount;
          var errorCount = _eventCountsSubscription.errorCount;
          var longTaskCount = _eventCountsSubscription.longTaskCount;
          var clickAction = assign({
            type: ActionType.CLICK,
            duration: activityEndTime && elapsed(startClocks.timeStamp, activityEndTime),
            startClocks: startClocks,
            id: id,
            frustrationTypes: frustrationTypes,
            counts: {
              resourceCount,
              errorCount,
              longTaskCount
            },
            events: isNullUndefinedDefaultValue(domEvents, [clickEvent]),
            event: clickEvent
          }, clickActionBase);
          lifeCycle.notify(LifeCycleEventType.AUTO_ACTION_COMPLETED, clickAction);
          status = ClickStatus.FINALIZED;
        },
        discard: function discard() {
          stop();
          status = ClickStatus.FINALIZED;
        }
      };
    }

    function finalizeClicks(clicks, rageClick) {
      var _computeFrustration = computeFrustration(clicks, rageClick);

      var isRage = _computeFrustration.isRage;

      if (isRage) {
        each(clicks, function (click) {
          click.discard();
        });
        rageClick.stop(timeStampNow());
        rageClick.validate(map(clicks, function (click) {
          return click.event;
        }));
      } else {
        rageClick.discard();
        each(clicks, function (click) {
          click.validate();
        });
      }
    }

    function startActionCollection(lifeCycle, domMutationObservable, configuration) {
      lifeCycle.subscribe(LifeCycleEventType.AUTO_ACTION_COMPLETED, function (action) {
        lifeCycle.notify(LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, processAction(action));
      });
      var actionContexts = {
        findActionId: noop
      };

      if (configuration.trackInteractions) {
        actionContexts = trackClickActions(lifeCycle, domMutationObservable, configuration).actionContexts;
      }

      return {
        actionContexts: actionContexts,
        addAction: function addAction(action, savedCommonContext) {
          lifeCycle.notify(LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, extend({
            savedCommonContext: savedCommonContext
          }, processAction(action)));
        }
      };
    }

    function processAction(action) {
      var autoActionProperties = isAutoAction(action) ? {
        action: {
          error: {
            count: action.counts.errorCount
          },
          id: action.id,
          loadingTime: toServerDuration(action.duration),
          frustration: {
            type: action.frustrationTypes
          },
          long_task: {
            count: action.counts.longTaskCount
          },
          resource: {
            count: action.counts.resourceCount
          }
        },
        _dd: {
          action: {
            target: action.target,
            position: action.position
          }
        }
      } : {
        action: {
          loadingTime: 0
        }
      };
      var customerContext = !isAutoAction(action) ? action.context : undefined;
      var actionEvent = extend2Lev({
        action: {
          id: UUID(),
          target: {
            name: action.name
          },
          type: action.type
        },
        date: action.startClocks.timeStamp,
        type: RumEventType.ACTION
      }, autoActionProperties);
      return {
        customerContext: customerContext,
        rawRumEvent: actionEvent,
        startTime: action.startClocks.relative,
        domainContext: isAutoAction(action) ? {
          event: action.event,
          events: action.events
        } : {}
      };
    }

    function isAutoAction(action) {
      return action.type !== ActionType.CUSTOM;
    }

    function startRumBatch(configuration, lifeCycle, reportError) {
      var batch = makeRumBatch(configuration, lifeCycle, reportError);
      lifeCycle.subscribe(LifeCycleEventType.RUM_EVENT_COLLECTED, function (serverRumEvent) {
        if (serverRumEvent.type === RumEventType.VIEW) {
          batch.upsert(serverRumEvent, serverRumEvent.view.id);
        } else {
          batch.add(serverRumEvent);
        }
      });
    }

    function makeRumBatch(configuration, lifeCycle, reportError) {
      var primaryBatch = createRumBatch(configuration.datakitUrl, function () {
        lifeCycle.notify(LifeCycleEventType.BEFORE_UNLOAD);
      });

      function createRumBatch(endpointUrl, unloadCallback) {
        return new Batch(createHttpRequest(endpointUrl, configuration.batchBytesLimit, reportError), configuration.batchMessagesLimit, configuration.batchBytesLimit, configuration.messageBytesLimit, configuration.flushTimeout, unloadCallback);
      }

      return {
        add: function add(message) {
          primaryBatch.add(message);
        },
        upsert: function upsert(message, key) {
          primaryBatch.upsert(message, key);
        }
      };
    }

    var SessionType = {
      SYNTHETICS: 'synthetics',
      USER: 'user'
    };
    var VIEW_EVENTS_MODIFIABLE_FIELD_PATHS = [// Fields with sensitive data
    'view.url', 'view.referrer', 'action.target.name', 'error.message', 'error.stack', 'error.resource.url', 'resource.url'];
    var OTHER_EVENTS_MODIFIABLE_FIELD_PATHS = VIEW_EVENTS_MODIFIABLE_FIELD_PATHS.concat([// User-customizable field
    'tags']);
    function startRumAssembly(configuration, lifeCycle, sessionManager, userSessionManager, viewContexts, urlContexts, actionContexts, getCommonContext, reportError) {
      var eventRateLimiters = {};
      eventRateLimiters[RumEventType.ERROR] = createEventRateLimiter(RumEventType.ERROR, configuration.eventRateLimiterThreshold, reportError);
      eventRateLimiters[RumEventType.ACTION] = createEventRateLimiter(RumEventType.ACTION, configuration.eventRateLimiterThreshold, reportError);
      lifeCycle.subscribe(LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, function (data) {
        var startTime = data.startTime;
        var rawRumEvent = data.rawRumEvent;
        var savedCommonContext = data.savedCommonContext;
        var customerContext = data.customerContext;
        var domainContext = data.domainContext;
        var viewContext = viewContexts.findView(startTime);
        var urlContext = urlContexts.findUrl(startTime);
        var session = sessionManager.findTrackedSession(rawRumEvent.type !== RumEventType.VIEW ? startTime : undefined);

        if (session && viewContext && urlContext) {
          var actionId = actionContexts.findActionId(startTime);
          var commonContext = savedCommonContext || getCommonContext();
          var rumContext = {
            _dd: {
              sdkName: configuration.sdkName,
              sdkVersion: configuration.sdkVersion,
              drift: currentDrift()
            },
            terminal: {
              type: 'web'
            },
            application: {
              id: configuration.applicationId
            },
            device: deviceInfo,
            env: configuration.env || '',
            service: viewContext.service || configuration.service || 'browser',
            version: viewContext.version || configuration.version || '',
            source: 'browser',
            date: timeStampNow(),
            user: {
              id: userSessionManager.getId(),
              is_signin: 'F'
            },
            session: {
              // must be computed on each event because synthetics instrumentation can be done after sdk execution
              // cf https://github.com/puppeteer/puppeteer/issues/3667
              type: getSessionType(),
              id: session.id
            },
            view: {
              id: viewContext.id,
              name: viewContext.name,
              url: urlContext.url,
              referrer: urlContext.referrer,
              host: urlContext.host,
              path: urlContext.path,
              pathGroup: urlContext.pathGroup,
              urlQuery: urlContext.urlQuery
            },
            action: needToAssembleWithAction(rawRumEvent) && actionId ? {
              id: actionId
            } : undefined
          };
          var rumEvent = extend2Lev(rumContext, viewContext, rawRumEvent);
          var serverRumEvent = withSnakeCaseKeys(rumEvent);
          var context = extend2Lev({}, commonContext.context, customerContext);

          if (!isEmptyObject(context)) {
            serverRumEvent.tags = context;
          }

          if (!('has_replay' in serverRumEvent.session)) {
            serverRumEvent.session.has_replay = commonContext.hasReplay;
          }

          if (!isEmptyObject(commonContext.user)) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            serverRumEvent.user = extend2Lev({
              // id: session.getAnonymousID(),
              is_signin: 'T'
            }, commonContext.user);
          }

          if (shouldSend(serverRumEvent, configuration.beforeSend, eventRateLimiters, domainContext)) {
            if (isEmptyObject(serverRumEvent.tags)) {
              delete serverRumEvent.tags;
            } // if (
            //   serverRumEvent.type === 'error'
            // ) {
            //   console.log(serverRumEvent, '======serverRumEvent-====')
            // }
            // console.log('======serverRumEvent-====', serverRumEvent )


            lifeCycle.notify(LifeCycleEventType.RUM_EVENT_COLLECTED, serverRumEvent);
          }
        }
      });
    }

    function shouldSend(event, beforeSend, eventRateLimiters, domainContext) {
      if (beforeSend) {
        var result = limitModification(event, event.type === RumEventType.VIEW ? VIEW_EVENTS_MODIFIABLE_FIELD_PATHS : OTHER_EVENTS_MODIFIABLE_FIELD_PATHS, function (event) {
          return beforeSend(event, domainContext);
        });

        if (result === false && event.type !== RumEventType.VIEW) {
          return false;
        }

        if (result === false) {
          display.warn("Can't dismiss view events using beforeSend!");
        }
      }

      var rateLimitReached = false;

      if (eventRateLimiters[event.type]) {
        rateLimitReached = eventRateLimiters[event.type].isLimitReached();
      }

      return !rateLimitReached;
    }

    function needToAssembleWithAction(event) {
      return [RumEventType.ERROR, RumEventType.RESOURCE, RumEventType.LONG_TASK].indexOf(event.type) !== -1;
    }

    function getSessionType() {
      return window._DATAFLUX_SYNTHETICS_BROWSER === undefined ? SessionType.USER : SessionType.SYNTHETICS;
    }

    /**
     * Internal context keep returning v1 format
     * to not break compatibility with logs data format
     */
    function startInternalContext(applicationId, sessionManager, viewContexts, actionContexts, urlContexts) {
      return {
        get: function get(startTime) {
          var viewContext = viewContexts.findView(startTime);
          var urlContext = urlContexts.findUrl(startTime);
          var session = sessionManager.findTrackedSession(startTime);

          if (session && viewContext && urlContext) {
            var actionId = actionContexts.findActionId(startTime);
            return {
              application: {
                id: applicationId
              },
              session: {
                id: session.id
              },
              userAction: actionId ? {
                id: actionId
              } : undefined,
              view: {
                id: viewContext.id,
                name: viewContext.name,
                url: urlContext.url,
                referrer: urlContext.referrer,
                host: urlContext.host,
                path: urlContext.pathname,
                pathGroup: urlContext.pathGroup,
                urlQuery: urlContext.urlQuery
              }
            };
          }
        }
      };
    }

    /**
     * We want to attach to an event:
     * - the url corresponding to its start
     * - the referrer corresponding to the previous view url (or document referrer for initial view)
     */

    var URL_CONTEXT_TIME_OUT_DELAY = SESSION_TIME_OUT_DELAY;
    function startUrlContexts(lifeCycle, locationChangeObservable, location) {
      var urlContextHistory = new ContextHistory(URL_CONTEXT_TIME_OUT_DELAY);
      var previousViewUrl;
      lifeCycle.subscribe(LifeCycleEventType.VIEW_ENDED, function (data) {
        urlContextHistory.closeActive(data.endClocks.relative);
      });
      lifeCycle.subscribe(LifeCycleEventType.VIEW_CREATED, function (data) {
        var viewUrl = location.href;
        urlContextHistory.add(buildUrlContext({
          url: viewUrl,
          location: location,
          referrer: !previousViewUrl ? document.referrer : previousViewUrl
        }), data.startClocks.relative);
        previousViewUrl = viewUrl;
      });
      var locationChangeSubscription = locationChangeObservable.subscribe(function (data) {
        var current = urlContextHistory.find();

        if (current) {
          var changeTime = relativeNow();
          urlContextHistory.closeActive(changeTime);
          urlContextHistory.add(buildUrlContext({
            url: data.newLocation.href,
            location: data.newLocation,
            referrer: current.referrer
          }), changeTime);
        }
      });

      function buildUrlContext(data) {
        return {
          url: data.url,
          referrer: data.referrer,
          host: data.location.host,
          path: data.location.pathname,
          pathGroup: replaceNumberCharByPath(data.location.pathname),
          urlQuery: jsonStringify(getQueryParamsFromUrl(data.location.href))
        };
      }

      return {
        findUrl: function findUrl(startTime) {
          return urlContextHistory.find(startTime);
        },
        stop: function stop() {
          locationChangeSubscription.unsubscribe();
          urlContextHistory.stop();
        }
      };
    }

    var VIEW_CONTEXT_TIME_OUT_DELAY = SESSION_TIME_OUT_DELAY;
    function startViewContexts(lifeCycle) {
      var viewContextHistory = new ContextHistory(VIEW_CONTEXT_TIME_OUT_DELAY);
      lifeCycle.subscribe(LifeCycleEventType.VIEW_CREATED, function (view) {
        viewContextHistory.add(buildViewContext(view), view.startClocks.relative);
      });
      lifeCycle.subscribe(LifeCycleEventType.VIEW_ENDED, function (data) {
        viewContextHistory.closeActive(data.endClocks.relative);
      });
      lifeCycle.subscribe(LifeCycleEventType.SESSION_RENEWED, function () {
        viewContextHistory.reset();
      });

      function buildViewContext(view) {
        return {
          service: view.service,
          version: view.version,
          id: view.id,
          name: view.name
        };
      }

      return {
        findView: function findView(startTime) {
          return viewContextHistory.find(startTime);
        },
        stop: function stop() {
          viewContextHistory.stop();
        }
      };
    }

    function trackConsoleError(errorObservable) {
      var subscription = initConsoleObservable([ConsoleApiName.error]).subscribe(function (consoleError) {
        errorObservable.notify({
          startClocks: clocksNow(),
          message: consoleError.message,
          stack: consoleError.stack,
          source: ErrorSource.CONSOLE,
          handling: ErrorHandling.HANDLED,
          handlingStack: consoleError.handlingStack
        });
      });
      return {
        stop: function stop() {
          subscription.unsubscribe();
        }
      };
    }

    function trackReportError(errorObservable) {
      var subscription = initReportObservable([RawReportType.cspViolation, RawReportType.intervention]).subscribe(function (reportError) {
        errorObservable.notify({
          startClocks: clocksNow(),
          message: reportError.message,
          stack: reportError.stack,
          type: reportError.subtype,
          source: ErrorSource.REPORT,
          handling: ErrorHandling.UNHANDLED
        });
      });
      return {
        stop: function stop() {
          subscription.unsubscribe();
        }
      };
    }

    function startErrorCollection(lifeCycle) {
      var errorObservable = new Observable();
      trackConsoleError(errorObservable);
      trackRuntimeError(errorObservable);
      trackReportError(errorObservable);
      errorObservable.subscribe(function (error) {
        lifeCycle.notify(LifeCycleEventType.RAW_ERROR_COLLECTED, {
          error: error
        });
      });
      return doStartErrorCollection(lifeCycle);
    }
    function doStartErrorCollection(lifeCycle) {
      lifeCycle.subscribe(LifeCycleEventType.RAW_ERROR_COLLECTED, function (error) {
        lifeCycle.notify(LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, assign({
          customerContext: error.customerContext,
          savedCommonContext: error.savedCommonContext
        }, processError(error.error)));
      });
      return {
        addError: function addError(providedError, savedCommonContext) {
          var error = providedError.error;
          var stackTrace = error instanceof Error ? computeStackTrace(error) : undefined;
          var rawError = computeRawError({
            stackTrace,
            originalError: error,
            handlingStack: providedError.handlingStack,
            startClocks: providedError.startClocks,
            nonErrorPrefix: 'Provided',
            source: ErrorSource.CUSTOM,
            handling: ErrorHandling.HANDLED
          });
          lifeCycle.notify(LifeCycleEventType.RAW_ERROR_COLLECTED, {
            customerContext: providedError.context,
            savedCommonContext: savedCommonContext,
            error: rawError
          });
        }
      };
    }

    function processError(error) {
      var rawRumEvent = {
        date: error.startClocks.timeStamp,
        error: {
          id: UUID(),
          message: error.message,
          source: error.source,
          stack: error.stack,
          handling_stack: error.handlingStack,
          type: error.type,
          handling: error.handling,
          causes: error.causes,
          source_type: 'browser'
        },
        type: RumEventType.ERROR
      };
      return {
        rawRumEvent: rawRumEvent,
        startTime: error.startClocks.relative,
        domainContext: {
          error: error.originalError
        }
      };
    }

    var trackFirstHiddenSingleton;
    function trackFirstHidden(emitter) {
      if (typeof emitter === 'undefined') {
        emitter = window;
      }

      if (!trackFirstHiddenSingleton) {
        if (document.visibilityState === 'hidden') {
          trackFirstHiddenSingleton = {
            timeStamp: 0
          };
        } else {
          trackFirstHiddenSingleton = {
            timeStamp: Infinity
          };
          var listeners = addEventListeners(emitter, [DOM_EVENT.PAGE_HIDE, DOM_EVENT.VISIBILITY_CHANGE], function (evt) {
            if (event.type === 'pagehide' || document.visibilityState === 'hidden') {
              trackFirstHiddenSingleton.timeStamp = event.timeStamp;
              stopListeners();
            }
          }, {
            capture: true
          });
          var stopListeners = listeners.stop;
        }
      }

      return trackFirstHiddenSingleton;
    }

    // It happens in some cases like sleep mode or some browser implementations

    var TIMING_MAXIMUM_DELAY = 10 * ONE_MINUTE;
    function trackInitialViewTimings(lifeCycle, callback) {
      var timings = {};

      function setTimings(newTimings) {
        timings = extend(timings, newTimings);
        callback(timings);
      }

      var _trackNavigationTimings = trackNavigationTimings(lifeCycle, setTimings);

      var stopNavigationTracking = _trackNavigationTimings.stop;

      var _trackFirstContentfulPaint = trackFirstContentfulPaint(lifeCycle, function (firstContentfulPaint) {
        setTimings({
          firstContentfulPaint: firstContentfulPaint
        });
      });

      var stopFCPTracking = _trackFirstContentfulPaint.stop;

      var _trackLargestContentfulPaint = trackLargestContentfulPaint(lifeCycle, window, function (largestContentfulPaint) {
        setTimings({
          largestContentfulPaint: largestContentfulPaint
        });
      });

      var stopLCPTracking = _trackLargestContentfulPaint.stop;

      var _trackFirstInputTimings = trackFirstInputTimings(lifeCycle, function (firttime) {
        setTimings({
          firstInputDelay: firttime.firstInputDelay,
          firstInputTime: firttime.firstInputTime
        });
      });

      var stopFIDTracking = _trackFirstInputTimings.stop;
      return {
        stop: function stop() {
          stopNavigationTracking();
          stopFCPTracking();
          stopLCPTracking();
          stopFIDTracking();
        }
      };
    }
    function trackNavigationTimings(lifeCycle, callback) {
      var subscribe = lifeCycle.subscribe(LifeCycleEventType.PERFORMANCE_ENTRIES_COLLECTED, function (entries) {
        for (var entry of entries) {
          if (entry.entryType === 'navigation') {
            callback({
              fetchStart: entry.fetchStart,
              responseEnd: entry.responseEnd,
              domComplete: entry.domComplete,
              domContentLoaded: entry.domContentLoadedEventEnd,
              domInteractive: entry.domInteractive,
              loadEvent: entry.loadEventEnd,
              loadEventEnd: entry.loadEventEnd,
              loadEventStart: entry.loadEventStart,
              domContentLoadedEventEnd: entry.domContentLoadedEventEnd,
              domContentLoadedEventStart: entry.domContentLoadedEventStart
            });
          }
        }
      });
      return {
        stop: subscribe.unsubscribe
      };
    }
    function trackFirstContentfulPaint(lifeCycle, callback) {
      var firstHidden = trackFirstHidden();
      var subscribe = lifeCycle.subscribe(LifeCycleEventType.PERFORMANCE_ENTRIES_COLLECTED, function (entries) {
        var fcpEntry = find(entries, function (entry) {
          return entry.entryType === 'paint' && entry.name === 'first-contentful-paint' && entry.startTime < firstHidden.timeStamp && entry.startTime < TIMING_MAXIMUM_DELAY;
        });

        if (fcpEntry) {
          callback(fcpEntry.startTime);
        }
      });
      return {
        stop: subscribe.unsubscribe
      };
    }
    /**
     * Track the largest contentful paint (LCP) occurring during the initial View.  This can yield
     * multiple values, only the most recent one should be used.
     * Documentation: https://web.dev/lcp/
     * Reference implementation: https://github.com/GoogleChrome/web-vitals/blob/master/src/getLCP.ts
     */

    function trackLargestContentfulPaint(lifeCycle, emitter, callback) {
      var firstHidden = trackFirstHidden(); // Ignore entries that come after the first user interaction.  According to the documentation, the
      // browser should not send largest-contentful-paint entries after a user interact with the page,
      // but the web-vitals reference implementation uses this as a safeguard.

      var firstInteractionTimestamp = Infinity;

      var _addEventListeners = addEventListeners(emitter, [DOM_EVENT.POINTER_DOWN, DOM_EVENT.KEY_DOWN], function (event) {
        firstInteractionTimestamp = event.timeStamp;
      }, {
        capture: true,
        once: true
      });

      var stopEventListener = _addEventListeners.stop;
      var subscribe = lifeCycle.subscribe(LifeCycleEventType.PERFORMANCE_ENTRIES_COLLECTED, function (entries) {
        var lcpEntry = findLast(entries, function (entry) {
          return entry.entryType === 'largest-contentful-paint' && entry.startTime < firstInteractionTimestamp && entry.startTime < firstHidden.timeStamp && entry.startTime < TIMING_MAXIMUM_DELAY;
        });

        if (lcpEntry) {
          callback(lcpEntry.startTime);
        }
      });
      var unsubscribeLifeCycle = subscribe.unsubscribe;
      return {
        stop: function stop() {
          stopEventListener();
          unsubscribeLifeCycle();
        }
      };
    }
    /**
     * Track the first input occurring during the initial View to return:
     * - First Input Delay
     * - First Input Time
     * Callback is called at most one time.
     * Documentation: https://web.dev/fid/
     * Reference implementation: https://github.com/GoogleChrome/web-vitals/blob/master/src/getFID.ts
     */

    function trackFirstInputTimings(lifeCycle, callback) {
      var firstHidden = trackFirstHidden();
      var subscribe = lifeCycle.subscribe(LifeCycleEventType.PERFORMANCE_ENTRIES_COLLECTED, function (entries) {
        var firstInputEntry = find(entries, function (entry) {
          return entry.entryType === 'first-input' && entry.startTime < firstHidden.timeStamp;
        });

        if (firstInputEntry) {
          var firstInputDelay = elapsed(firstInputEntry.startTime, firstInputEntry.processingStart);
          callback({
            // Ensure firstInputDelay to be positive, see
            // https://bugs.chromium.org/p/chromium/issues/detail?id=1185815
            firstInputDelay: firstInputDelay >= 0 ? firstInputDelay : 0,
            firstInputTime: firstInputEntry.startTime
          });
        }
      });
      return {
        stop: subscribe.unsubscribe
      };
    }

    function trackViewMetrics(lifeCycle, domMutationObservable, configuration, scheduleViewUpdate, loadingType, viewStart) {
      var viewMetrics = {
        eventCounts: {
          errorCount: 0,
          longTaskCount: 0,
          resourceCount: 0,
          actionCount: 0,
          frustrationCount: 0
        }
      };

      var _trackEventCounts = trackEventCounts(lifeCycle, function (newEventCounts) {
        viewMetrics.eventCounts = newEventCounts;
        scheduleViewUpdate();
      });

      var stopEventCountsTracking = _trackEventCounts.stop;

      var _trackLoadingTime = trackLoadingTime(lifeCycle, domMutationObservable, configuration, loadingType, viewStart, function (newLoadingTime) {
        viewMetrics.loadingTime = newLoadingTime;
        scheduleViewUpdate();
      });

      var setLoadEvent = _trackLoadingTime.setLoadEvent;
      var stopLoadingTimeTracking = _trackLoadingTime.stop;
      var stopCLSTracking;

      if (isLayoutShiftSupported()) {
        viewMetrics.cumulativeLayoutShift = 0;

        var _trackLayoutShift = trackCumulativeLayoutShift(lifeCycle, function (cumulativeLayoutShift) {
          viewMetrics.cumulativeLayoutShift = cumulativeLayoutShift;
          scheduleViewUpdate();
        });

        stopCLSTracking = _trackLayoutShift.stop;
      } else {
        stopCLSTracking = noop;
      }

      return {
        stop: function stop() {
          stopEventCountsTracking();
          stopLoadingTimeTracking();
          stopCLSTracking();
        },
        setLoadEvent: setLoadEvent,
        viewMetrics: viewMetrics
      };
    }

    function trackLoadingTime(lifeCycle, domMutationObservable, configuration, loadType, viewStart, callback) {
      var isWaitingForLoadEvent = loadType === ViewLoadingType.INITIAL_LOAD;
      var isWaitingForActivityLoadingTime = true;
      var loadingTimeCandidates = [];

      function invokeCallbackIfAllCandidatesAreReceived() {
        if (!isWaitingForActivityLoadingTime && !isWaitingForLoadEvent && loadingTimeCandidates.length > 0) {
          callback(Math.max.apply(Math, loadingTimeCandidates));
        }
      }

      var _waitPageActivityEnd = waitPageActivityEnd(lifeCycle, domMutationObservable, configuration, function (event) {
        if (isWaitingForActivityLoadingTime) {
          isWaitingForActivityLoadingTime = false;

          if (event.hadActivity) {
            loadingTimeCandidates.push(elapsed(viewStart.timeStamp, event.end));
          }

          invokeCallbackIfAllCandidatesAreReceived();
        }
      });

      var stop = _waitPageActivityEnd.stop;
      return {
        setLoadEvent: function setLoadEvent(loadEvent) {
          if (isWaitingForLoadEvent) {
            isWaitingForLoadEvent = false;
            loadingTimeCandidates.push(loadEvent);
            invokeCallbackIfAllCandidatesAreReceived();
          }
        },
        stop: stop
      };
    }
    /**
     * Track the cumulative layout shifts (CLS).
     * Layout shifts are grouped into session windows.
     * The minimum gap between session windows is 1 second.
     * The maximum duration of a session window is 5 second.
     * The session window layout shift value is the sum of layout shifts inside it.
     * The CLS value is the max of session windows values.
     *
     * This yields a new value whenever the CLS value is updated (a higher session window value is computed).
     *
     * See isLayoutShiftSupported to check for browser support.
     *
     * Documentation:
     * https://web.dev/cls/
     * https://web.dev/evolving-cls/
     * Reference implementation: https://github.com/GoogleChrome/web-vitals/blob/master/src/getCLS.ts
     */


    function trackCumulativeLayoutShift(lifeCycle, callback) {
      var maxClsValue = 0;
      var window = slidingSessionWindow();

      var _subscribe = lifeCycle.subscribe(LifeCycleEventType.PERFORMANCE_ENTRIES_COLLECTED, function (entries) {
        for (var entry of entries) {
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            window.update(entry);

            if (window.value() > maxClsValue) {
              maxClsValue = window.value();
              callback(round(maxClsValue, 4));
            }
          }
        }
      });

      var stop = _subscribe.unsubscribe;
      return {
        stop: stop
      };
    }

    function slidingSessionWindow() {
      var _value = 0;
      var startTime;
      var endTime;
      return {
        update: function update(entry) {
          var shouldCreateNewWindow = startTime === undefined || entry.startTime - endTime >= ONE_SECOND || entry.startTime - startTime >= 5 * ONE_SECOND;

          if (shouldCreateNewWindow) {
            startTime = endTime = entry.startTime;
            _value = entry.value;
          } else {
            _value += entry.value;
            endTime = entry.startTime;
          }
        },
        value: function value() {
          return _value;
        }
      };
    }
    /**
     * Check whether `layout-shift` is supported by the browser.
     */


    function isLayoutShiftSupported() {
      return supportPerformanceTimingEvent('layout-shift');
    }

    var THROTTLE_VIEW_UPDATE_PERIOD = 3000;
    var SESSION_KEEP_ALIVE_INTERVAL = 5 * ONE_MINUTE;
    function trackViews(location, lifeCycle, domMutationObservable, configuration, locationChangeObservable, areViewsTrackedAutomatically, initialViewOptions) {
      var _trackInitialView = trackInitialView(initialViewOptions);

      var stopInitialViewTracking = _trackInitialView.stop;
      var initialView = _trackInitialView.initialView;
      var currentView = initialView;

      var _startViewLifeCycle = startViewLifeCycle();

      var stopViewLifeCycle = _startViewLifeCycle.stop;
      var locationChangeSubscription;

      if (areViewsTrackedAutomatically) {
        locationChangeSubscription = renewViewOnLocationChange(locationChangeObservable);
      }

      function trackInitialView(options) {
        var initialView = newView(lifeCycle, domMutationObservable, configuration, location, ViewLoadingType.INITIAL_LOAD, clocksOrigin(), options);

        var _trackInitialViewTimings = trackInitialViewTimings(lifeCycle, function (timings) {
          initialView.updateTimings(timings);
          initialView.scheduleUpdate();
        });

        return {
          initialView: initialView,
          stop: _trackInitialViewTimings.stop
        };
      }

      function trackViewChange(startClocks, viewOptions) {
        return newView(lifeCycle, domMutationObservable, configuration, location, ViewLoadingType.ROUTE_CHANGE, startClocks, viewOptions);
      }

      function startViewLifeCycle() {
        lifeCycle.subscribe(LifeCycleEventType.SESSION_RENEWED, function () {
          // do not trigger view update to avoid wrong data
          currentView.end(); // Renew view on session renewal

          currentView = trackViewChange(undefined, {
            name: currentView.name,
            service: currentView.service,
            version: currentView.version
          });
        }); // End the current view on page unload

        lifeCycle.subscribe(LifeCycleEventType.BEFORE_UNLOAD, function () {
          currentView.end();
          currentView.triggerUpdate();
        }); // Session keep alive

        var keepAliveInterval = window.setInterval(function () {
          currentView.triggerUpdate();
        }, SESSION_KEEP_ALIVE_INTERVAL);
        return {
          stop: function stop() {
            clearInterval(keepAliveInterval);
          }
        };
      }

      function renewViewOnLocationChange(locationChangeObservable) {
        return locationChangeObservable.subscribe(function (params) {
          var oldLocation = params.oldLocation;
          var newLocation = params.newLocation;

          if (areDifferentLocation(oldLocation, newLocation)) {
            currentView.end();
            currentView.triggerUpdate();
            currentView = trackViewChange();
            return;
          }
        });
      }

      return {
        addTiming: function addTiming(name, time) {
          if (typeof time === 'undefined') {
            time = timeStampNow();
          }

          currentView.addTiming(name, time);
          currentView.scheduleUpdate();
        },
        startView: function startView(options, startClocks) {
          currentView.end(startClocks);
          currentView.triggerUpdate();
          currentView = trackViewChange(startClocks, options);
        },
        stop: function stop() {
          if (locationChangeSubscription) {
            locationChangeSubscription.unsubscribe();
          }

          stopInitialViewTracking();
          stopViewLifeCycle();
          currentView.end();
        }
      };
    }

    function newView(lifeCycle, domMutationObservable, configuration, initialLocation, loadingType, startClocks, viewOptions) {
      // Setup initial values
      if (typeof startClocks === 'undefined') {
        startClocks = clocksNow();
      }

      var id = UUID();
      var timings = {};
      var customTimings = {};
      var documentVersion = 0;
      var endClocks;
      var location = shallowClone(initialLocation);
      var name;
      var service;
      var version;

      if (viewOptions) {
        name = viewOptions.name;
        service = viewOptions.service;
        version = viewOptions.version;
      }

      lifeCycle.notify(LifeCycleEventType.VIEW_CREATED, {
        id: id,
        name: name,
        startClocks: startClocks,
        service: service,
        version: version
      }); // Update the view every time the measures are changing

      var scheduleViewUpdate = throttle(triggerViewUpdate, THROTTLE_VIEW_UPDATE_PERIOD, {
        leading: false
      });
      var cancelScheduleViewUpdate = scheduleViewUpdate.cancel;

      var _trackViewMetrics = trackViewMetrics(lifeCycle, domMutationObservable, configuration, scheduleViewUpdate, loadingType, startClocks);

      var setLoadEvent = _trackViewMetrics.setLoadEvent;
      var stopViewMetricsTracking = _trackViewMetrics.stop;
      var viewMetrics = _trackViewMetrics.viewMetrics; // Initial view update

      triggerViewUpdate();

      function triggerViewUpdate() {
        documentVersion += 1;
        var currentEnd = endClocks === undefined ? timeStampNow() : endClocks.timeStamp;
        lifeCycle.notify(LifeCycleEventType.VIEW_UPDATED, assign({
          customTimings: customTimings,
          documentVersion: documentVersion,
          id: id,
          name: name,
          service: service,
          version: version,
          loadingType: loadingType,
          location: location,
          startClocks: startClocks,
          timings: timings,
          duration: elapsed(startClocks.timeStamp, currentEnd),
          isActive: endClocks === undefined
        }, viewMetrics));
      }

      return {
        name: name,
        service: service,
        version: version,
        scheduleUpdate: scheduleViewUpdate,
        end: function end(clocks) {
          if (typeof clocks === 'undefined') {
            clocks = clocksNow();
          }

          endClocks = clocks;
          lifeCycle.notify(LifeCycleEventType.VIEW_ENDED, {
            endClocks
          });
          stopViewMetricsTracking();
        },
        triggerUpdate: function triggerUpdate() {
          // cancel any pending view updates execution
          cancelScheduleViewUpdate();
          triggerViewUpdate();
        },
        updateTimings: function updateTimings(newTimings) {
          timings = newTimings;

          if (newTimings.loadEvent !== undefined) {
            setLoadEvent(newTimings.loadEvent);
          }
        },
        addTiming: function addTiming(name, time) {
          var relativeTime = looksLikeRelativeTime(time) ? time : elapsed(startClocks.timeStamp, time);
          customTimings[sanitizeTiming(name)] = relativeTime;
        }
      };
    }
    /**
     * Timing name is used as facet path that must contain only letters, digits, or the characters - _ . @ $
     */


    function sanitizeTiming(name) {
      var sanitized = name.replace(/[^a-zA-Z0-9-_.@$]/g, '_');

      if (sanitized !== name) {
        console.warn('Invalid timing name: ' + name + ', sanitized to: ' + sanitized);
      }

      return sanitized;
    }

    function areDifferentLocation(currentLocation, otherLocation) {
      return currentLocation.pathname !== otherLocation.pathname || !isHashAnAnchor(otherLocation.hash) && getPathFromHash(otherLocation.hash) !== getPathFromHash(currentLocation.hash);
    }

    function isHashAnAnchor(hash) {
      var correspondingId = hash.substr(1);
      return !!document.getElementById(correspondingId);
    }

    function getPathFromHash(hash) {
      var index = hash.indexOf('?');
      return index < 0 ? hash : hash.slice(0, index);
    }

    function startViewCollection(lifeCycle, configuration, location, domMutationObservable, locationChangeObservable, initialViewOptions) {
      lifeCycle.subscribe(LifeCycleEventType.VIEW_UPDATED, function (view) {
        lifeCycle.notify(LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, processViewUpdate(view));
      });
      return trackViews(location, lifeCycle, domMutationObservable, configuration, locationChangeObservable, !configuration.trackViewsManually, initialViewOptions);
    }

    function computePerformanceViewDetails(entry) {
      var validEntry = toValidEntry(entry);

      if (!validEntry) {
        return undefined;
      }

      var fetchStart = validEntry.fetchStart,
          responseEnd = validEntry.responseEnd,
          domInteractive = validEntry.domInteractive,
          domContentLoaded = validEntry.domContentLoaded,
          domComplete = validEntry.domComplete,
          loadEventEnd = validEntry.loadEventEnd,
          loadEventStart = validEntry.loadEventStart,
          domContentLoadedEventEnd = validEntry.domContentLoadedEventEnd;
      var details = {
        fmp: toServerDuration(validEntry.largestContentfulPaint)
      };

      if (responseEnd !== fetchStart) {
        details.fpt = toServerDuration(responseEnd - fetchStart);
        var apdexLevel = parseInt((responseEnd - fetchStart) / 1000); // 秒数取整

        details.apdexLevel = apdexLevel > 9 ? 9 : apdexLevel;
      }

      if (domInteractive !== fetchStart) {
        details.tti = toServerDuration(domInteractive - fetchStart);
      }

      if (domContentLoaded !== fetchStart) {
        details.dom_ready = toServerDuration(domContentLoaded - fetchStart);
      } // Make sure a connection occurred


      if (loadEventEnd !== fetchStart) {
        details.load = toServerDuration(loadEventEnd - fetchStart);
      }

      if (loadEventStart !== domContentLoadedEventEnd) {
        details.resource_load_time = toServerDuration(loadEventStart - domContentLoadedEventEnd);
      }

      if (domComplete !== domInteractive) {
        details.dom = toServerDuration(domComplete - domInteractive);
      }

      return details;
    }

    function processViewUpdate(view) {
      var viewEvent = {
        _dd: {
          document_version: view.documentVersion
        },
        date: view.startClocks.timeStamp,
        type: RumEventType.VIEW,
        view: {
          action: {
            count: view.eventCounts.actionCount
          },
          frustration: {
            count: view.eventCounts.frustrationCount
          },
          cumulative_layout_shift: view.cumulativeLayoutShift,
          first_byte: toServerDuration(view.timings.firstByte),
          dom_complete: toServerDuration(view.timings.domComplete),
          dom_content_loaded: toServerDuration(view.timings.domContentLoaded),
          dom_interactive: toServerDuration(view.timings.domInteractive),
          error: {
            count: view.eventCounts.errorCount
          },
          first_contentful_paint: toServerDuration(view.timings.firstContentfulPaint),
          first_input_delay: toServerDuration(view.timings.firstInputDelay),
          first_input_time: toServerDuration(view.timings.firstInputTime),
          is_active: view.isActive,
          name: view.name,
          largest_contentful_paint: toServerDuration(view.timings.largestContentfulPaint),
          load_event: toServerDuration(view.timings.loadEvent),
          loading_time: discardNegativeDuration(toServerDuration(view.loadingTime)),
          loading_type: view.loadingType,
          long_task: {
            count: view.eventCounts.longTaskCount
          },
          resource: {
            count: view.eventCounts.resourceCount
          },
          time_spent: toServerDuration(view.duration)
        } // session: {
        //   has_replay: replayStats ? true : undefined,
        // },

      };

      if (!isEmptyObject(view.customTimings)) {
        viewEvent.view.custom_timings = mapValues(view.customTimings, toServerDuration);
      }

      viewEvent = extend2Lev(viewEvent, {
        view: computePerformanceViewDetails(view.timings)
      });
      return {
        rawRumEvent: viewEvent,
        startTime: view.startClocks.relative,
        domainContext: {
          location: view.location
        }
      };
    }

    function discardNegativeDuration(duration) {
      return isNumber(duration) && duration < 0 ? undefined : duration;
    }

    function TraceIdentifier() {
      this.buffer = new Uint8Array(8);
      getCrypto().getRandomValues(this.buffer);
      this.buffer[0] = this.buffer[0] & 0x7f;
    }

    TraceIdentifier.prototype = {
      // buffer: new Uint8Array(8),
      toString: function toString(radix) {
        var high = this.readInt32(0);
        var low = this.readInt32(4);
        var str = '';

        while (1) {
          var mod = high % radix * 4294967296 + low;
          high = Math.floor(high / radix);
          low = Math.floor(mod / radix);
          str = (mod % radix).toString(radix) + str;

          if (!high && !low) {
            break;
          }
        }

        return str;
      },
      toDecimalString: function toDecimalString() {
        return this.toString(10);
      },
      readInt32: function readInt32(offset) {
        return this.buffer[offset] * 16777216 + (this.buffer[offset + 1] << 16) + (this.buffer[offset + 2] << 8) + this.buffer[offset + 3];
      }
    };

    function getCrypto() {
      return window.crypto || window.msCrypto;
    }
    /**
     *
     * @param {*} configuration  配置信息
     */


    function DDtraceTracer(traceSampled) {
      this._spanId = new TraceIdentifier().toDecimalString();
      this._traceId = new TraceIdentifier().toDecimalString();
      this._traceSampled = traceSampled;
    }
    DDtraceTracer.prototype = {
      isTracingSupported: function isTracingSupported() {
        return getCrypto() !== undefined;
      },
      getSpanId: function getSpanId() {
        return this._spanId;
      },
      getTraceId: function getTraceId() {
        return this._traceId;
      },
      makeTracingHeaders: function makeTracingHeaders() {
        return {
          'x-datadog-origin': 'rum',
          'x-datadog-parent-id': this.getSpanId(),
          'x-datadog-sampling-priority': this._traceSampled ? '2' : '-1',
          'x-datadog-trace-id': this.getTraceId()
        };
      }
    };

    function uuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        /* tslint:disable */
        var r = Math.random() * 16 | 0;
        /* tslint:disable */

        var v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
    }
    /**
     *
     * @param {*} configuration  配置信息
     * @param {*} requestUrl 请求的url
     */


    function SkyWalkingTracer(configuration, requestUrl, traceSampled) {
      this._spanId = uuid();
      this._traceId = uuid();
      this._applicationId = configuration.applicationId;
      this._env = configuration.env;
      this._version = configuration.version;
      this._urlParse = urlParse(requestUrl).getParse();
      this._traceSampled = traceSampled;
    }
    SkyWalkingTracer.prototype = {
      isTracingSupported: function isTracingSupported() {
        if (this._env && this._version && this._urlParse) return true;
        return false;
      },
      getSpanId: function getSpanId() {
        return this._spanId;
      },
      getTraceId: function getTraceId() {
        return this._traceId;
      },
      getSkyWalkingSw8: function getSkyWalkingSw8() {
        try {
          var traceIdStr = String(base64Encode(this._traceId));
          var segmentId = String(base64Encode(this._spanId));
          var service = String(base64Encode(this._applicationId + '_rum_' + this.env));
          var instance = String(base64Encode(this._version));
          var endpoint = String(base64Encode(window.location.href));
          var peer = String(base64Encode(this._urlParse.Host));
          var index = '0'; // var values = `${1}-${traceIdStr}-${segmentId}-${index}-${service}-${instance}-${endpoint}-${peer}`;

          return (this._traceSampled ? '1' : '0') + '-' + traceIdStr + '-' + segmentId + '-' + index + '-' + service + '-' + instance + '-' + endpoint + '-' + peer;
        } catch (err) {
          return '';
        }
      },
      makeTracingHeaders: function makeTracingHeaders() {
        return {
          sw8: this.getSkyWalkingSw8()
        };
      }
    };

    // === Generate a random 64-bit number in fixed-length hex format
    function randomTraceId$3() {
      var digits = '0123456789abcdef';
      var n = '';

      for (var i = 0; i < 16; i += 1) {
        var rand = Math.floor(Math.random() * 16);
        n += digits[rand];
      }

      return n;
    }
    /**
     *
     * @param {*} configuration  配置信息
     */


    function JaegerTracer(configuration, traceSampled) {
      var rootSpanId = randomTraceId$3(); // this._traceId = randomTraceId() + rootSpanId // 默认用128bit,兼容其他配置

      if (configuration.traceId128Bit) {
        // 128bit生成traceid
        this._traceId = randomTraceId$3() + rootSpanId;
      } else {
        this._traceId = rootSpanId;
      }

      this._spanId = rootSpanId;
      this._traceSampled = traceSampled;
    }
    JaegerTracer.prototype = {
      isTracingSupported: function isTracingSupported() {
        return true;
      },
      getSpanId: function getSpanId() {
        return this._spanId;
      },
      getTraceId: function getTraceId() {
        return this._traceId;
      },
      getUberTraceId: function getUberTraceId() {
        //{trace-id}:{span-id}:{parent-span-id}:{flags}
        return this._traceId + ':' + this._spanId + ':' + '0' + ':' + (this._traceSampled ? '1' : '0');
      },
      makeTracingHeaders: function makeTracingHeaders() {
        return {
          'uber-trace-id': this.getUberTraceId()
        };
      }
    };

    // === Generate a random 64-bit number in fixed-length hex format
    function randomTraceId$2() {
      var digits = '0123456789abcdef';
      var n = '';

      for (var i = 0; i < 16; i += 1) {
        var rand = Math.floor(Math.random() * 16);
        n += digits[rand];
      }

      return n;
    }
    /**
     *
     * @param {*} configuration  配置信息
     */


    function ZipkinSingleTracer(configuration, traceSampled) {
      var rootSpanId = randomTraceId$2();
      this._traceId = randomTraceId$2() + rootSpanId;
      this._spanId = rootSpanId;
      this._traceSampled = traceSampled;
    }
    ZipkinSingleTracer.prototype = {
      isTracingSupported: function isTracingSupported() {
        return true;
      },
      getSpanId: function getSpanId() {
        return this._spanId;
      },
      getTraceId: function getTraceId() {
        return this._traceId;
      },
      getB3Str: function getB3Str() {
        //{TraceId}-{SpanId}-{SamplingState}-{ParentSpanId}
        return this._traceId + '-' + this._spanId + '-' + (this._traceSampled ? '1' : '0');
      },
      makeTracingHeaders: function makeTracingHeaders() {
        return {
          b3: this.getB3Str()
        };
      }
    };

    // === Generate a random 64-bit number in fixed-length hex format
    function randomTraceId$1() {
      var digits = '0123456789abcdef';
      var n = '';

      for (var i = 0; i < 16; i += 1) {
        var rand = Math.floor(Math.random() * 16);
        n += digits[rand];
      }

      return n;
    }
    /**
     *
     * @param {*} configuration  配置信息
     */


    function ZipkinMultiTracer(configuration, traceSampled) {
      var rootSpanId = randomTraceId$1();

      if (configuration.traceId128Bit) {
        // 128bit生成traceid
        this._traceId = randomTraceId$1() + rootSpanId;
      } else {
        this._traceId = rootSpanId;
      }

      this._spanId = rootSpanId;
      this._traceSampled = traceSampled;
    }
    ZipkinMultiTracer.prototype = {
      isTracingSupported: function isTracingSupported() {
        return true;
      },
      getSpanId: function getSpanId() {
        return this._spanId;
      },
      getTraceId: function getTraceId() {
        return this._traceId;
      },
      makeTracingHeaders: function makeTracingHeaders() {
        return {
          'X-B3-TraceId': this.getTraceId(),
          'X-B3-SpanId': this.getSpanId(),
          //  'X-B3-ParentSpanId': '',
          'X-B3-Sampled': this._traceSampled ? '1' : '0' //  'X-B3-Flags': '0'

        };
      }
    };

    // === Generate a random 64-bit number in fixed-length hex format
    function randomTraceId() {
      var digits = '0123456789abcdef';
      var n = '';

      for (var i = 0; i < 16; i += 1) {
        var rand = Math.floor(Math.random() * 16);
        n += digits[rand];
      }

      return n;
    }
    /**
     *
     * @param {*} configuration  配置信息
     */


    function W3cTraceParentTracer(configuration, traceSampled) {
      var rootSpanId = randomTraceId();
      this._traceId = randomTraceId() + rootSpanId;
      this._spanId = rootSpanId;
      this._traceSampled = traceSampled;
    }
    W3cTraceParentTracer.prototype = {
      isTracingSupported: function isTracingSupported() {
        return true;
      },
      getSpanId: function getSpanId() {
        return this._spanId;
      },
      getTraceId: function getTraceId() {
        return this._traceId;
      },
      getTraceParent: function getTraceParent() {
        // '{version}-{traceId}-{spanId}-{sampleDecision}'
        return '00-' + this._traceId + '-' + this._spanId + '-' + (this._traceSampled ? '01' : '00');
      },
      makeTracingHeaders: function makeTracingHeaders() {
        return {
          traceparent: this.getTraceParent()
        };
      }
    };

    function clearTracingIfNeeded(context) {
      if (context.status === 0 && !context.isAborted) {
        context.traceId = undefined;
        context.spanId = undefined;
        context.traceSampled = undefined;
      }
    }
    function startTracer(configuration, sessionManager) {
      return {
        clearTracingIfNeeded: clearTracingIfNeeded,
        traceFetch: function traceFetch(context) {
          return injectHeadersIfTracingAllowed(configuration, context, sessionManager, function (tracingHeaders) {
            if (context.input instanceof Request && (!context.init || !context.init.headers)) {
              context.input = new Request(context.input);
              each(tracingHeaders, function (value, key) {
                context.input.headers.append(key, value);
              });
            } else {
              context.init = shallowClone(context.init);
              var headers = [];

              if (context.init.headers instanceof Headers) {
                context.init.headers.forEach(function (value, key) {
                  headers.push([key, value]);
                });
              } else if (isArray(context.init.headers)) {
                each(context.init.headers, function (header) {
                  headers.push(header);
                });
              } else if (context.init.headers) {
                each(context.init.headers, function (value, key) {
                  headers.push([key, value]);
                });
              } // context.init.headers = headers.concat(objectEntries(tracingHeaders))
              // 转换成对象，兼容部分


              var headersMap = {};
              each(headers.concat(objectEntries(tracingHeaders)), function (header) {
                headersMap[header[0]] = header[1];
              });
              context.init.headers = headersMap;
            }
          });
        },
        traceXhr: function traceXhr(context, xhr) {
          return injectHeadersIfTracingAllowed(configuration, context, sessionManager, function (tracingHeaders) {
            each(tracingHeaders, function (value, name) {
              xhr.setRequestHeader(name, value);
            });
          });
        }
      };
    }

    function isAllowedUrl(configuration, requestUrl) {
      var requestOrigin = getOrigin(requestUrl);
      var flag = false;
      each(configuration.allowedTracingOrigins, function (allowedOrigin) {
        if (requestOrigin === allowedOrigin || allowedOrigin instanceof RegExp && allowedOrigin.test(requestOrigin)) {
          flag = true;
          return false;
        }
      });
      return flag;
    }

    function injectHeadersIfTracingAllowed(configuration, context, sessionManager, inject) {
      if (!isAllowedUrl(configuration, context.url) || !configuration.traceType || !sessionManager.findTrackedSession()) {
        return;
      }

      var traceSampled = !isNumber(configuration.tracingSampleRate) || performDraw(configuration.tracingSampleRate);
      var tracer;

      switch (configuration.traceType) {
        case TraceType.DDTRACE:
          tracer = new DDtraceTracer(traceSampled);
          break;

        case TraceType.SKYWALKING_V3:
          tracer = new SkyWalkingTracer(configuration, context.url, traceSampled);
          break;

        case TraceType.ZIPKIN_MULTI_HEADER:
          tracer = new ZipkinMultiTracer(configuration, traceSampled);
          break;

        case TraceType.JAEGER:
          tracer = new JaegerTracer(configuration, traceSampled);
          break;

        case TraceType.W3C_TRACEPARENT:
          tracer = new W3cTraceParentTracer(configuration, traceSampled);
          break;

        case TraceType.ZIPKIN_SINGLE_HEADER:
          tracer = new ZipkinSingleTracer(configuration, traceSampled);
          break;
      }

      if (!tracer || !tracer.isTracingSupported()) {
        return;
      }

      context.traceId = tracer.getTraceId();
      context.spanId = tracer.getSpanId();
      context.traceSampled = traceSampled;
      inject(tracer.makeTracingHeaders());
    }

    var nextRequestIndex = 1;
    function startRequestCollection(lifeCycle, configuration, sessionManager) {
      var tracer = startTracer(configuration, sessionManager);
      trackXhr(lifeCycle, configuration, tracer);
      trackFetch(lifeCycle, configuration, tracer);
    }
    function trackXhr(lifeCycle, configuration, tracer) {
      var subscription = initXhrObservable().subscribe(function (rawContext) {
        var context = rawContext;

        if (!isAllowedRequestUrl(configuration, context.url)) {
          return;
        }

        switch (context.state) {
          case 'start':
            tracer.traceXhr(context, context.xhr);
            context.requestIndex = getNextRequestIndex();
            lifeCycle.notify(LifeCycleEventType.REQUEST_STARTED, {
              requestIndex: context.requestIndex,
              url: context.url
            });
            break;

          case 'complete':
            tracer.clearTracingIfNeeded(context);
            lifeCycle.notify(LifeCycleEventType.REQUEST_COMPLETED, {
              duration: context.duration,
              method: context.method,
              requestIndex: context.requestIndex,
              spanId: context.spanId,
              startClocks: context.startClocks,
              status: context.status,
              traceId: context.traceId,
              traceSampled: context.traceSampled,
              type: RequestType.XHR,
              url: context.url,
              xhr: context.xhr
            });
            break;
        }
      });
      return {
        stop: function stop() {
          return subscription.unsubscribe();
        }
      };
    }
    function trackFetch(lifeCycle, configuration, tracer) {
      var subscription = initFetchObservable().subscribe(function (rawContext) {
        var context = rawContext;

        if (!isAllowedRequestUrl(configuration, context.url)) {
          return;
        }

        switch (context.state) {
          case 'start':
            tracer.traceFetch(context);
            context.requestIndex = getNextRequestIndex();
            lifeCycle.notify(LifeCycleEventType.REQUEST_STARTED, {
              requestIndex: context.requestIndex,
              url: context.url
            });
            break;

          case 'complete':
            tracer.clearTracingIfNeeded(context);
            lifeCycle.notify(LifeCycleEventType.REQUEST_COMPLETED, {
              duration: context.duration,
              method: context.method,
              requestIndex: context.requestIndex,
              responseType: context.responseType,
              spanId: context.spanId,
              startClocks: context.startClocks,
              status: context.status,
              traceId: context.traceId,
              traceSampled: context.traceSampled,
              type: RequestType.FETCH,
              url: context.url,
              response: context.response,
              init: context.init,
              input: context.input
            });
            break;
        }
      });
      return {
        stop: function stop() {
          return subscription.unsubscribe();
        }
      };
    }

    function getNextRequestIndex() {
      var result = nextRequestIndex;
      nextRequestIndex += 1;
      return result;
    }

    /**
     * Look for corresponding timing in resource timing buffer
     *
     * Observations:
     * - Timing (start, end) are nested inside the request (start, end)
     * - Browsers generate a timing entry for OPTIONS request
     *
     * Strategy:
     * - from valid nested entries
     * - if a single timing match, return the timing
     * - if two following timings match (OPTIONS request), return the timing for the actual request
     * - otherwise we can't decide, return undefined
     */

    function matchRequestTiming(request) {
      if (!performance || !('getEntriesByName' in performance)) {
        return;
      }

      var sameNameEntries = performance.getEntriesByName(request.url, 'resource');

      if (!sameNameEntries.length || !('toJSON' in sameNameEntries[0])) {
        return;
      }

      var candidates = map(sameNameEntries, function (entry) {
        return entry.toJSON();
      });
      candidates = filter(candidates, toValidEntry);
      candidates = filter(candidates, function (entry) {
        return isBetween(entry, request.startClocks.relative, endTime({
          startTime: request.startClocks.relative,
          duration: request.duration
        }));
      });

      if (candidates.length === 1) {
        return candidates[0];
      }

      if (candidates.length === 2 && firstCanBeOptionRequest(candidates)) {
        return candidates[1];
      }

      return;
    }

    function firstCanBeOptionRequest(correspondingEntries) {
      return endTime(correspondingEntries[0]) <= correspondingEntries[1].startTime;
    }

    function endTime(timing) {
      return timing.startTime + timing.duration;
    }

    function isBetween(timing, start, end) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      var errorMargin = 1;
      return timing.startTime >= start - errorMargin && endTime(timing) <= end + errorMargin;
    }

    function startResourceCollection(lifeCycle, configuration) {
      lifeCycle.subscribe(LifeCycleEventType.REQUEST_COMPLETED, function (request) {
        lifeCycle.notify(LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, processRequest(request));
      });
      lifeCycle.subscribe(LifeCycleEventType.PERFORMANCE_ENTRIES_COLLECTED, function (entries) {
        for (var entry of entries) {
          if (entry.entryType === 'resource' && !isRequestKind(entry)) {
            lifeCycle.notify(LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, processResourceEntry(entry));
          }
        }
      });
    }

    function processRequest(request) {
      var type = request.type === RequestType.XHR ? ResourceType.XHR : ResourceType.FETCH;
      var matchingTiming = matchRequestTiming(request);
      var startClocks = matchingTiming ? relativeToClocks(matchingTiming.startTime) : request.startClocks;
      var correspondingTimingOverrides = matchingTiming ? computePerformanceEntryMetrics(matchingTiming) : undefined;
      var tracingInfo = computeRequestTracingInfo(request);
      var urlObj = urlParse(request.url).getParse();
      var resourceEvent = extend2Lev({
        date: startClocks.timeStamp,
        resource: {
          id: UUID,
          type: type,
          duration: msToNs(request.duration),
          method: request.method,
          status: request.status,
          statusGroup: getStatusGroup(request.status),
          url: request.url,
          urlHost: urlObj.Host,
          urlPath: urlObj.Path,
          urlPathGroup: replaceNumberCharByPath(urlObj.Path),
          urlQuery: jsonStringify(getQueryParamsFromUrl(request.url))
        },
        type: RumEventType.RESOURCE
      }, tracingInfo, correspondingTimingOverrides);
      return {
        startTime: startClocks.relative,
        rawRumEvent: resourceEvent,
        domainContext: {
          performanceEntry: matchingTiming && toPerformanceEntryRepresentation(matchingTiming),
          xhr: request.xhr,
          response: request.response,
          requestInput: request.input,
          requestInit: request.init,
          error: request.error
        }
      };
    }

    function processResourceEntry(entry) {
      var type = computeResourceKind(entry);
      var entryMetrics = computePerformanceEntryMetrics(entry);
      var tracingInfo = computeEntryTracingInfo(entry);
      var urlObj = urlParse(entry.name).getParse();
      var statusCode = '';

      if (is304(entry)) {
        statusCode = 304;
      } else if (isCacheHit(entry)) {
        statusCode = 200;
      }

      var startClocks = relativeToClocks(entry.startTime);
      var resourceEvent = extend2Lev({
        date: startClocks.timeStamp,
        resource: {
          id: UUID(),
          type: type,
          url: entry.name,
          urlHost: urlObj.Host,
          urlPath: urlObj.Path,
          urlPathGroup: replaceNumberCharByPath(urlObj.Path),
          urlQuery: jsonStringify(getQueryParamsFromUrl(entry.name)),
          method: 'GET',
          status: statusCode,
          statusGroup: getStatusGroup(statusCode)
        },
        type: RumEventType.RESOURCE
      }, tracingInfo, entryMetrics);
      return {
        startTime: startClocks.relative,
        rawRumEvent: resourceEvent,
        domainContext: {
          performanceEntry: toPerformanceEntryRepresentation(entry)
        }
      };
    }

    function computePerformanceEntryMetrics(timing) {
      return {
        resource: extend2Lev({}, {
          duration: computePerformanceResourceDuration(timing),
          size: computeSize(timing)
        }, computePerformanceResourceDetails(timing))
      };
    }

    function toPerformanceEntryRepresentation(entry) {
      if (supportPerformanceEntry() && entry instanceof PerformanceEntry) {
        entry.toJSON();
      }

      return entry;
    }

    function computeRequestTracingInfo(request) {
      var hasBeenTraced = request.traceSampled && request.traceId && request.spanId;

      if (!hasBeenTraced) {
        return undefined;
      }

      return {
        _dd: {
          spanId: request.spanId,
          traceId: request.traceId
        },
        resource: {
          id: UUID()
        }
      };
    }

    function computeEntryTracingInfo(entry) {
      return entry.traceId ? {
        _dd: {
          traceId: entry.traceId
        }
      } : undefined;
    }

    function startRum(configuration, getCommonContext, initialViewOptions) {
      var lifeCycle = new LifeCycle();

      var reportError = function reportError(error) {
        lifeCycle.notify(LifeCycleEventType.RAW_ERROR_COLLECTED, {
          error: error
        });
      };

      startRumBatch(configuration, lifeCycle, reportError);
      var session = startRumSessionManager(configuration, lifeCycle);
      var userSession = startCacheUsrCache(configuration);
      var domMutationObservable = createDOMMutationObservable();
      var locationChangeObservable = createLocationChangeObservable(location);

      var _startRumEventCollection = startRumEventCollection(location, lifeCycle, configuration, session, userSession, locationChangeObservable, domMutationObservable, getCommonContext, reportError);

      var viewContexts = _startRumEventCollection.viewContexts;
      var urlContexts = _startRumEventCollection.urlContexts;
      var actionContexts = _startRumEventCollection.actionContexts;
      startLongTaskCollection(lifeCycle, session);
      startResourceCollection(lifeCycle);

      var _startViewCollection = startViewCollection(lifeCycle, configuration, location, domMutationObservable, locationChangeObservable, initialViewOptions);

      var addTiming = _startViewCollection.addTiming;
      var startView = _startViewCollection.startView;

      var _startErrorCollection = startErrorCollection(lifeCycle);

      var addError = _startErrorCollection.addError;
      startRequestCollection(lifeCycle, configuration, session);
      startPerformanceCollection(lifeCycle, configuration);
      var internalContext = startInternalContext(configuration.applicationId, session, viewContexts, actionContexts, urlContexts);
      return {
        addAction: _startRumEventCollection.addAction,
        addError: addError,
        addTiming: addTiming,
        configuration: configuration,
        lifeCycle: lifeCycle,
        viewContexts: viewContexts,
        session: session,
        startView: startView,
        getInternalContext: internalContext.get
      };
    }
    function startRumEventCollection(location, lifeCycle, configuration, sessionManager, userSessionManager, locationChangeObservable, domMutationObservable, getCommonContext, reportError) {
      var viewContexts = startViewContexts(lifeCycle);
      var urlContexts = startUrlContexts(lifeCycle, locationChangeObservable, location);

      var _startActionCollection = startActionCollection(lifeCycle, domMutationObservable, configuration);

      var actionContexts = _startActionCollection.actionContexts;
      startRumAssembly(configuration, lifeCycle, sessionManager, userSessionManager, viewContexts, urlContexts, actionContexts, getCommonContext, reportError);
      return {
        viewContexts: viewContexts,
        urlContexts: urlContexts,
        addAction: _startActionCollection.addAction,
        actionContexts: actionContexts,
        stop: function stop() {
          viewContexts.stop();
        }
      };
    }

    var buildEnv = {
      sdkVersion: '2.2.3',
      sdkName: 'df_web_rum_sdk'
    };

    function validateAndBuildRumConfiguration(initConfiguration) {
      if (!initConfiguration.applicationId) {
        display.error('Application ID is not configured, no RUM data will be collected.');
        return;
      }

      if (!initConfiguration.datakitUrl && !initConfiguration.datakitOrigin) {
        display.error('datakitOrigin is not configured, no RUM data will be collected.');
        return false;
      } // TODO remove fallback in next major


      if (initConfiguration.sessionReplaySampleRate !== undefined && !isPercentage(initConfiguration.sessionReplaySampleRate)) {
        display.error('Premium Sample Rate should be a number between 0 and 100');
        return;
      }

      if (initConfiguration.allowedTracingOrigins !== undefined) {
        if (!isArray(initConfiguration.allowedTracingOrigins)) {
          display.error('Allowed Tracing Origins should be an array');
          return;
        }
      }

      if (initConfiguration.allowedDDTracingOrigins !== undefined) {
        if (!isArray(initConfiguration.allowedDDTracingOrigins)) {
          display.error('Allowed Tracing Origins should be an array');
          return;
        }
      }

      if (initConfiguration.tracingSampleRate !== undefined && !isPercentage(initConfiguration.tracingSampleRate)) {
        display.error('Tracing Sample Rate should be a number between 0 and 100');
        return;
      }

      if (initConfiguration.excludedActivityUrls !== undefined && !isArray(initConfiguration.excludedActivityUrls)) {
        display.error('Excluded Activity Urls should be an array');
        return;
      }

      var baseConfiguration = validateAndBuildConfiguration(initConfiguration);

      if (!baseConfiguration) {
        return;
      }

      var trackFrustrations = !!initConfiguration.trackFrustrations;
      return assign({
        applicationId: initConfiguration.applicationId,
        actionNameAttribute: initConfiguration.actionNameAttribute,
        sessionReplaySampleRate: isNullUndefinedDefaultValue(initConfiguration.sessionReplaySampleRate, 100),
        tracingSampleRate: initConfiguration.tracingSampleRate,
        allowedTracingOrigins: isNullUndefinedDefaultValue(initConfiguration.allowedTracingOrigins || initConfiguration.allowedDDTracingOrigins, []),
        excludedActivityUrls: isNullUndefinedDefaultValue(initConfiguration.excludedActivityUrls, []),
        trackInteractions: !!initConfiguration.trackInteractions || trackFrustrations,
        trackFrustrations: trackFrustrations,
        trackViewsManually: !!initConfiguration.trackViewsManually,
        traceType: isNullUndefinedDefaultValue(initConfiguration.traceType, TraceType.DDTRACE),
        traceId128Bit: !!initConfiguration.traceId128Bit,
        isJsBirdge: !!initConfiguration.isJsBirdge // 是否需要对webview 发送数据，需要装我们对应ios sdk

      }, baseConfiguration, buildEnv);
    }

    function makeRumPublicApi(startRumImpl) {
      var isAlreadyInitialized = false;
      var globalContextManager = createContextManager();
      var userContextManager = createContextManager();
      var bufferApiCalls = new BoundedBuffer();

      var _addTimingStrategy = function addTimingStrategy(name, time) {
        if (typeof time === 'undefined') {
          time = timeStampNow();
        }

        bufferApiCalls.add(function () {
          return _addTimingStrategy(name, time);
        });
      };

      var _startViewStrategy = function startViewStrategy(options, startClocks) {
        if (typeof startClocks === 'undefined') {
          startClocks = clocksNow();
        }

        bufferApiCalls.add(function () {
          return _startViewStrategy(options, startClocks);
        });
      };

      var _addActionStrategy = function addActionStrategy(action, commonContext) {
        if (typeof commonContext == 'undefined') {
          commonContext = {
            context: globalContextManager.getContext(),
            user: userContextManager.getContext()
          };
        }

        bufferApiCalls.add(function () {
          return _addActionStrategy(action, commonContext);
        });
      };

      var _addErrorStrategy = function addErrorStrategy(providedError, commonContext) {
        if (typeof commonContext == 'undefined') {
          commonContext = {
            context: globalContextManager.getContext(),
            user: userContextManager.getContext()
          };
        }

        bufferApiCalls.add(function () {
          return _addErrorStrategy(providedError, commonContext);
        });
      };

      var getInternalContextStrategy = function getInternalContextStrategy() {
        return undefined;
      };

      var getInitConfigurationStrategy = function getInitConfigurationStrategy() {
        return undefined;
      };

      function initRum(initConfiguration) {
        if (!canHandleSession(initConfiguration)) {
          return;
        }

        if (!canInitRum(initConfiguration)) {
          return;
        }

        var configuration = validateAndBuildRumConfiguration(initConfiguration);

        if (!configuration) {
          return;
        }

        if (!configuration.trackViewsManually) {
          doStartRum(configuration);
        } else {
          // drain beforeInitCalls by buffering them until we start RUM
          // if we get a startView, drain re-buffered calls before continuing to drain beforeInitCalls
          // in order to ensure that calls are processed in order
          var beforeInitCalls = bufferApiCalls;
          bufferApiCalls = new BoundedBuffer();

          _startViewStrategy = function _startViewStrategy(options) {
            doStartRum(configuration, options);
          };

          beforeInitCalls.drain();
        }

        getInitConfigurationStrategy = function getInitConfigurationStrategy() {
          return deepClone(initConfiguration);
        };

        isAlreadyInitialized = true;
      }

      function doStartRum(configuration, initialViewOptions) {
        var startRumResults = startRumImpl(configuration, function () {
          return {
            user: userContextManager.getContext(),
            context: globalContextManager.getContext()
          };
        }, initialViewOptions);
        _startViewStrategy = startRumResults.startView;
        _addActionStrategy = startRumResults.addAction;
        _addErrorStrategy = startRumResults.addError;
        _addTimingStrategy = startRumResults.addTiming;
        getInternalContextStrategy = startRumResults.getInternalContext;
        bufferApiCalls.drain();
      }

      var startView = function startView(options) {
        var sanitizedOptions = typeof options === 'object' ? options : {
          name: options
        };

        _startViewStrategy(sanitizedOptions);
      };

      var rumPublicApi = makePublicApi({
        init: initRum,

        /** @deprecated: use setGlobalContextProperty instead */
        addRumGlobalContext: globalContextManager.add,
        setGlobalContextProperty: globalContextManager.setContextProperty,

        /** @deprecated: use removeGlobalContextProperty instead */
        removeRumGlobalContext: globalContextManager.remove,
        removeGlobalContextProperty: globalContextManager.removeContextProperty,

        /** @deprecated: use getGlobalContext instead */
        getRumGlobalContext: globalContextManager.get,
        getGlobalContext: globalContextManager.getContext,

        /** @deprecated: use setGlobalContext instead */
        setRumGlobalContext: globalContextManager.set,
        setGlobalContext: globalContextManager.setContext,
        clearGlobalContext: globalContextManager.clearContext,
        getInitConfiguration: function getInitConfiguration() {
          return getInitConfigurationStrategy();
        },
        getInternalContext: function getInternalContext(startTime) {
          return getInternalContextStrategy(startTime);
        },
        addDebugSession: function addDebugSession(id) {},
        clearDebugSession: function clearDebugSession() {},
        getDebugSession: function getDebugSession() {},
        addAction: function addAction(name, context) {
          _addActionStrategy({
            name: name,
            context: deepClone(context),
            startClocks: clocksNow(),
            type: ActionType.CUSTOM
          });
        },

        /**
         * @deprecated use addAction instead
         */
        // addUserAction: function (name, context) {
        //   rumPublicApi.addAction(name, context)
        // },
        addError: function addError(error, context) {
          var handlingStack = createHandlingStack();

          _addErrorStrategy({
            error: error,
            handlingStack: handlingStack,
            context: deepClone(context),
            startClocks: clocksNow()
          });
        },
        addTiming: function addTiming(name, time) {
          _addTimingStrategy(name, time);
        },
        setUser: function setUser(newUser) {
          if (typeof newUser !== 'object' || !newUser) {
            display.error('Unsupported user:', newUser);
          } else {
            userContextManager.setContext(sanitizeUser(newUser));
          }
        },
        getUser: userContextManager.getContext,
        setUserProperty: function setUserProperty(key, property) {
          var newUser = {};
          newUser[key] = property;
          var sanitizedProperty = sanitizeUser(newUser)[key];
          userContextManager.setContextProperty(key, sanitizedProperty);
        },
        removeUserProperty: userContextManager.removeContextProperty,

        /** @deprecated: renamed to clearUser */
        removeUser: userContextManager.clearContext,
        clearUser: userContextManager.clearContext,
        startView: startView
      });
      return rumPublicApi;

      function sanitizeUser(newUser) {
        var shallowClonedUser = assign(newUser, {});

        if ('id' in shallowClonedUser) {
          shallowClonedUser.id = String(shallowClonedUser.id);
        }

        if ('name' in shallowClonedUser) {
          shallowClonedUser.name = String(shallowClonedUser.name);
        }

        if ('email' in shallowClonedUser) {
          shallowClonedUser.email = String(shallowClonedUser.email);
        }

        return shallowClonedUser;
      }

      function canHandleSession(initConfiguration) {
        if (!areCookiesAuthorized(buildCookieOptions(initConfiguration))) {
          display.warn('Cookies are not authorized, we will not send any data.');
          return false;
        }

        if (isLocalFile()) {
          display.error('Execution is not allowed in the current context.');
          return false;
        }

        return true;
      }

      function canInitRum(initConfiguration) {
        if (isAlreadyInitialized) {
          if (!initConfiguration.silentMultipleInit) {
            display.error('DATAFLUX_RUM is already initialized.');
          }

          return false;
        }

        return true;
      }

      function isLocalFile() {
        return window.location.protocol === 'file:';
      }
    }

    var datafluxRum = makeRumPublicApi(startRum);
    defineGlobal(getGlobalObject(), 'DATAFLUX_RUM', datafluxRum);

    function guancecom(analytics, settings, integrations) {
        var defaultOptions = {
            env: 'production',
            version: '1.0.0',
            traceType: 'jaeger',
            trackInteractions: true,
        };
        var options = __assign(__assign({}, defaultOptions), settings);
        datafluxRum.init(options);
        function addAction(ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var event;
                return __generator(this, function (_a) {
                    event = ctx.event;
                    datafluxRum.addAction(event.event, event);
                    return [2 /*return*/, Promise.resolve()];
                });
            });
        }
        var guancecom = {
            name: 'Guance.com',
            type: 'destination',
            version: '2.1.5-1',
            isLoaded: function () { return true; },
            load: function () { return Promise.resolve(); },
            track: addAction,
            // identify: send,
            page: function () { return Promise.resolve(); },
        };
        return guancecom;
    }

    return guancecom;

})();
