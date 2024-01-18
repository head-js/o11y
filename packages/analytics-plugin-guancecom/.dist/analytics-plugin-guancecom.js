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

    /**
     * Gets the original value for a DOM API that was potentially patched by Zone.js.
     *
     * Zone.js[1] is a library that patches a bunch of JS and DOM APIs. It usually stores the original
     * value of the patched functions/constructors/methods in a hidden property prefixed by
     * __zone_symbol__.
     *
     * In multiple occasions, we observed that Zone.js is the culprit of important issues leading to
     * browser resource exhaustion (memory leak, high CPU usage). This method is used as a workaround to
     * use the original DOM API instead of the one patched by Zone.js.
     *
     * [1]: https://github.com/angular/angular/tree/main/packages/zone.js
     */
    function getZoneJsOriginalValue(target, name) {
      var browserWindow = window;
      var original;
      if (browserWindow.Zone && typeof browserWindow.Zone.__symbol__ === 'function') {
        original = target[browserWindow.Zone.__symbol__(name)];
      }
      if (!original) {
        original = target[name];
      }
      return original;
    }

    var onMonitorErrorCollected;
    var debugMode = false;
    function startMonitorErrorCollection(newOnMonitorErrorCollected) {
      onMonitorErrorCollected = newOnMonitorErrorCollected;
    }
    function setDebugMode(newDebugMode) {
      debugMode = newDebugMode;
    }
    function monitor(fn) {
      return function () {
        return callMonitored(fn, this, arguments);
      };
    }
    function callMonitored(fn, context, args) {
      try {
        return fn.apply(context, args);
      } catch (e) {
        displayIfDebugEnabled(ConsoleApiName.error, e);
        if (onMonitorErrorCollected) {
          try {
            onMonitorErrorCollected(e);
          } catch (e) {
            displayIfDebugEnabled(ConsoleApiName.error, e);
          }
        }
      }
    }
    function displayIfDebugEnabled(api) {
      var args = [].slice.call(arguments, 1);
      //   display.apply(null, [api, '[MONITOR]'].concat(args))
      if (debugMode) {
        display.apply(null, [api, '[MONITOR]'].concat(args));
      }
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

    function _typeof$9(obj) { "@babel/helpers - typeof"; return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$9(obj); }
    function makePublicApi(stub) {
      var publicApi = assign({
        onReady: function onReady(callback) {
          callback();
        }
      }, stub);

      // Add an "hidden" property to set debug mode. We define it that way to hide it
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
          catchUserErrors(fn, 'onReady callback threw an error:')();
        });
      }
    }
    function getGlobalObject() {
      if ((typeof globalThis === "undefined" ? "undefined" : _typeof$9(globalThis)) === 'object') {
        return globalThis;
      }
      Object.defineProperty(Object.prototype, '_gc_temp_', {
        get: function get() {
          return this;
        },
        configurable: true
      });
      // @ts-ignore
      var globalObject = _gc_temp_;
      // @ts-ignore
      delete Object.prototype._gc_temp_;
      if (_typeof$9(globalObject) !== 'object') {
        // on safari _gc_temp_ is available on window but not globally
        // fallback on other browser globals check
        if ((typeof self === "undefined" ? "undefined" : _typeof$9(self)) === 'object') {
          globalObject = self;
        } else if ((typeof window === "undefined" ? "undefined" : _typeof$9(window)) === 'object') {
          globalObject = window;
        } else {
          globalObject = {};
        }
      }
      return globalObject;
    }
    // export function checkCookiesAuthorized(options) {
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

    function setTimeout$1(callback, delay) {
      return getZoneJsOriginalValue(getGlobalObject(), 'setTimeout')(monitor(callback), delay);
    }
    function clearTimeout(timeoutId) {
      getZoneJsOriginalValue(getGlobalObject(), 'clearTimeout')(timeoutId);
    }
    function setInterval(callback, delay) {
      return getZoneJsOriginalValue(window, 'setInterval')(monitor(callback), delay);
    }
    function clearInterval(timeoutId) {
      getZoneJsOriginalValue(window, 'clearInterval')(timeoutId);
    }

    function _typeof$8(obj) { "@babel/helpers - typeof"; return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$8(obj); }
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
    var keys = function keys(obj) {
      var results = [];
      if (obj === null) {
        return results;
      }
      each(obj, function (value, key) {
        results[results.length] = key;
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
    var matchList = function matchList(list, value, useStartsWith) {
      if (useStartsWith === undefined) {
        useStartsWith = false;
      }
      return some(list, function (item) {
        try {
          if (typeof item === 'function') {
            return item(value);
          } else if (item instanceof RegExp) {
            return item.test(value);
          } else if (typeof item === 'string') {
            return useStartsWith ? startsWith(value, item) : item === value;
          }
        } catch (e) {
          display.error(e);
        }
        return false;
      });
    };
    // https://github.com/jquery/jquery/blob/a684e6ba836f7c553968d7d026ed7941e1a612d8/src/selector/escapeSelector.js
    var cssEscape = function cssEscape(str) {
      str = str + '';
      if (window.CSS && window.CSS.escape) {
        return window.CSS.escape(str);
      }

      // eslint-disable-next-line no-control-regex
      return str.replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function (ch, asCodePoint) {
        if (asCodePoint) {
          // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
          if (ch === '\0') {
            return "\uFFFD";
          }
          // Control characters and (dependent upon position) numbers get escaped as code points
          return ch.slice(0, -1) + '\\' + ch.charCodeAt(ch.length - 1).toString(16) + ' ';
        }
        // Other potentially-special ASCII characters get backslash-escaped
        return '\\' + ch;
      });
    };
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
    var throttle = function throttle(fn, wait, options) {
      var needLeadingExecution = options && options.leading !== undefined ? options.leading : true;
      var needTrailingExecution = options && options.trailing !== undefined ? options.trailing : true;
      var inWaitPeriod = false;
      var pendingExecutionWithParameters;
      var pendingTimeoutId;
      var context = this;
      return {
        throttled: function throttled() {
          if (inWaitPeriod) {
            pendingExecutionWithParameters = arguments;
            return;
          }
          if (needLeadingExecution) {
            fn.apply(context, arguments);
          } else {
            pendingExecutionWithParameters = arguments;
          }
          inWaitPeriod = true;
          pendingTimeoutId = setTimeout$1(function () {
            if (needTrailingExecution && pendingExecutionWithParameters) {
              fn.apply(context, pendingExecutionWithParameters);
            }
            inWaitPeriod = false;
            pendingExecutionWithParameters = undefined;
          }, wait);
        },
        cancel: function cancel() {
          clearTimeout(pendingTimeoutId);
          inWaitPeriod = false;
          pendingExecutionWithParameters = undefined;
        }
      };
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
      return placeholder ?
      // eslint-disable-next-line  no-bitwise
      (parseInt(placeholder, 10) ^ Math.random() * 16 >> parseInt(placeholder, 10) / 4).toString(16) : "".concat(1e7, "-", 1e3, "-", 4e3, "-", 8e3, "-", 1e11).replace(/[018]/g, UUID);
    }

    // 替换url包含数字的路由
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
        if (_typeof$8(queryObj) !== 'object') {
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
        url += this._values.Origin;
        // url += this._values.Port ? ':' + this._values.Port : ''
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
        this._values['Origin'] = this._values['Protocol'] + '://' + this._values['Hostname'] + (this._values.Port ? ':' + this._values.Port : '');
        // this._values['Hostname'] = this._values['Host'].replace(/:\d+$/, '')
        // this._values['Origin'] =
        //   this._values['Protocol'] + '://' + this._values['Hostname']
      };

      return new URLParser(para);
    };
    function elementMatches(element, selector) {
      if (element.matches) {
        return element.matches(selector);
      }
      // IE11 support
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
          hasAlreadyBeenSeen: function hasAlreadyBeenSeen(value) {
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
        hasAlreadyBeenSeen: function hasAlreadyBeenSeen(value) {
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
      return _typeof$8(value);
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
      if (_typeof$8(source) !== 'object' || source === null) {
        // primitive values - just return source
        return source;
      } else if (source instanceof Date) {
        return new Date(source.getTime());
      } else if (source instanceof RegExp) {
        var flags = source.flags ||
        // old browsers compatibility
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
    function noop() {}
    var ONE_SECOND = 1000;
    var ONE_MINUTE = 60 * ONE_SECOND;
    var ONE_HOUR = 60 * ONE_MINUTE;
    var ONE_DAY = 24 * ONE_HOUR;
    var ONE_YEAR = 365 * ONE_DAY;

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
    function preferredNow() {
      return relativeNow();
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
    function addDuration(a, b) {
      return a + b;
    }
    function getCorrectedTimeStamp(relativeTime) {
      var correctedOrigin = dateNow() - performance.now();
      // apply correction only for positive drift
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
    var COMMA_SEPARATED_KEY_VALUE = /([\w-]+)\s*=\s*([^;]+)/g;
    function findCommaSeparatedValue(rawString, name) {
      COMMA_SEPARATED_KEY_VALUE.lastIndex = 0;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        var match = COMMA_SEPARATED_KEY_VALUE.exec(rawString);
        if (match) {
          if (match[1] === name) {
            return match[2];
          }
        } else {
          break;
        }
      }
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
      var lastChar = candidate.charCodeAt(length - 1);
      // check if it is the high part of a surrogate pair
      if (lastChar >= 0xd800 && lastChar <= 0xdbff) {
        return candidate.slice(0, length + 1);
      }
      return candidate.slice(0, length);
    }
    function isMatchOption(item) {
      var itemType = getType(item);
      return itemType === 'string' || itemType === 'function' || item instanceof RegExp;
    }
    function includes(candidate, search) {
      // tslint:disable-next-line: no-unsafe-any
      return candidate.indexOf(search) !== -1;
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
    var Browser = {
      IE: 0,
      CHROMIUM: 1,
      SAFARI: 2,
      OTHER: 3
    };
    function isIE() {
      return detectBrowserCached() === Browser.IE;
    }
    function isChromium() {
      return detectBrowserCached() === Browser.CHROMIUM;
    }
    function isSafari() {
      return detectBrowserCached() === Browser.SAFARI;
    }
    var browserCache;
    function detectBrowserCached() {
      return isNullUndefinedDefaultValue(browserCache, browserCache = detectBrowser());
    }
    function detectBrowser(browserWindow) {
      var _browserWindow$naviga;
      if (typeof browserWindow === 'undefined') {
        browserWindow = window;
      }
      var userAgent = browserWindow.navigator.userAgent;
      if (browserWindow.chrome || /HeadlessChrome/.test(userAgent)) {
        return Browser.CHROMIUM;
      }
      if (
      // navigator.vendor is deprecated, but it is the most resilient way we found to detect
      // "Apple maintained browsers" (AKA Safari). If one day it gets removed, we still have the
      // useragent test as a semi-working fallback.
      ((_browserWindow$naviga = browserWindow.navigator.vendor) === null || _browserWindow$naviga === void 0 ? void 0 : _browserWindow$naviga.indexOf('Apple')) === 0 || /safari/i.test(userAgent) && !/chrome|android/i.test(userAgent)) {
        return Browser.SAFARI;
      }
      if (browserWindow.document.documentMode) {
        return Browser.IE;
      }
      return Browser.OTHER;
    }

    /**
     * IE fallback
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/origin
     */
    function getLinkElementOrigin(element) {
      if (element.origin && element.origin !== 'null') {
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
      if (_typeof$8(candidate) === 'object' && candidate !== null) {
        return withSnakeCaseKeys(candidate);
      }
      return candidate;
    }
    function toSnakeCase(word) {
      return word.replace(/[A-Z]/g, function (uppercaseLetter, index) {
        return (index !== 0 ? '_' : '') + uppercaseLetter.toLowerCase();
      }).replace(/-/g, '_');
    }
    function isNullUndefinedDefaultValue(data, defaultValue) {
      if (data !== null && data !== void 0) {
        return data;
      } else {
        return defaultValue;
      }
    }
    function objectHasValue(object, value) {
      return some(keys(object), function (key) {
        return object[key] === value;
      });
    }
    function startsWith(candidate, search) {
      return candidate.slice(0, search.length) === search;
    }
    function tryToClone(response) {
      try {
        return response.clone();
      } catch (e) {
        // clone can throw if the response has already been used by another instrumentation or is disturbed
        return;
      }
    }
    function isHashAnAnchor(hash) {
      var correspondingId = hash.substr(1);
      if (!correspondingId) return false;
      return !!document.getElementById(correspondingId);
    }
    function getPathFromHash(hash) {
      var index = hash.indexOf('?');
      return index < 0 ? hash : hash.slice(0, index);
    }

    var BUFFER_LIMIT = 500;
    var _BoundedBuffer = function _BoundedBuffer() {
      this.buffer = [];
    };
    _BoundedBuffer.prototype = {
      add: function add(callback) {
        var length = this.buffer.push(callback);
        if (length > BUFFER_LIMIT) {
          this.buffer.splice(0, 1);
        }
      },
      drain: function drain() {
        each(this.buffer, function (callback) {
          callback();
        });
        this.buffer.length = 0;
      }
    };
    var BoundedBuffer = _BoundedBuffer;

    function _createForOfIteratorHelper$4(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$4(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
    function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }
    function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    var END_OF_TIMES = Infinity;
    var CLEAR_OLD_CONTEXTS_INTERVAL = ONE_MINUTE;
    function ContextHistory(expireDelay, maxEntries) {
      this.expireDelay = expireDelay;
      this.entries = [];
      this.maxEntries = maxEntries;
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
      if (this.maxEntries && this.entries.length >= this.maxEntries) {
        this.entries.pop();
      }
      this.entries.unshift(entry);
      return entry;
    };
    ContextHistory.prototype.find = function (startTime) {
      if (typeof startTime === 'undefined') {
        startTime = END_OF_TIMES;
      }
      var _iterator = _createForOfIteratorHelper$4(this.entries),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var entry = _step.value;
          if (entry.startTime <= startTime) {
            if (startTime <= entry.endTime) {
              return entry.context;
            }
            break;
          }
        }
        //
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
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
    ContextHistory.prototype.findAll = function (startTime, duration) {
      if (typeof duration === 'undefined') {
        duration = 0;
      }
      if (typeof startTime === 'undefined') {
        startTime = END_OF_TIMES;
      }
      var endTime = addDuration(startTime, duration);
      var result = filter(this.entries, function (entry) {
        return entry.startTime <= endTime && startTime <= entry.endTime;
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

    var VariableLibrary = {
      navigator: typeof window !== 'undefined' && typeof window.navigator != 'undefined' ? window.navigator : {},
      // 信息map
      infoMap: {
        engine: ['WebKit', 'Trident', 'Gecko', 'Presto'],
        browser: ['Safari', 'Chrome', 'Edge', 'IE', 'IE 11', 'IE 10', 'IE 9', 'IE 8', 'IE 7', 'Firefox', 'Firefox Focus', 'Chromium', 'Opera', 'Vivaldi', 'Yandex', 'Arora', 'Lunascape', 'QupZilla', 'Coc Coc', 'Kindle', 'Iceweasel', 'Konqueror', 'Iceape', 'SeaMonkey', 'Epiphany', '360', '360SE', '360EE', 'UC', 'QQBrowser', 'QQ', 'Baidu', 'Maxthon', 'Sogou', 'LBBROWSER', '2345Explorer', 'TheWorld', 'XiaoMi', 'Quark', 'Qiyu', 'Wechat',, 'WechatWork', 'Taobao', 'Alipay', 'Weibo', 'Douban', 'Suning', 'iQiYi'],
        os: ['Windows', 'Linux', 'Mac OS', 'Android', 'Ubuntu', 'FreeBSD', 'Debian', 'iOS', 'Windows Phone', 'BlackBerry', 'MeeGo', 'Symbian', 'Chrome OS', 'WebOS'],
        device: ['Mobile', 'Tablet', 'iPad']
      }
    };
    // 方法库
    var MethodLibrary = {
      // 获取匹配库
      getMatchMap: monitor(function (u) {
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
          Edge: u.indexOf('Edge') > -1 || u.indexOf('Edg') > -1,
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
      }),
      // 在信息map和匹配库中进行匹配
      matchInfoMap: monitor(function (_this) {
        var u = VariableLibrary.navigator.userAgent || '';
        var match = MethodLibrary.getMatchMap(u);
        for (var s in VariableLibrary.infoMap) {
          for (var i = 0; i < VariableLibrary.infoMap[s].length; i++) {
            var value = VariableLibrary.infoMap[s][i];
            if (match[value]) {
              _this[s] = value;
            }
          }
        }
      }),
      // 获取当前操作系统
      getOS: monitor(function () {
        var _this = this;
        MethodLibrary.matchInfoMap(_this);
        return _this.os || 'Unknown';
      }),
      // 获取操作系统版本
      getOSVersion: monitor(function () {
        var _this = this;
        var u = VariableLibrary.navigator.userAgent || '';
        _this.osVersion = '';
        _this.osMajor = '';
        // 系统版本信息
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
      }),
      // 获取横竖屏状态
      getOrientationStatu: monitor(function () {
        var orientationStatus = '';
        var orientation = window.matchMedia('(orientation: portrait)');
        if (orientation.matches) {
          orientationStatus = '竖屏';
        } else {
          orientationStatus = '横屏';
        }
        return orientationStatus;
      }),
      // 获取设备类型
      getDeviceType: monitor(function () {
        var _this = this;
        _this.device = 'PC';
        MethodLibrary.matchInfoMap(_this);
        return _this.device;
      }),
      // 获取网络状态
      getNetwork: monitor(function () {
        var connection = window.navigator.connection || window.navigator.mozConnection || window.navigator.webkitConnection;
        var result = 'unknown';
        var type = connection ? connection.type || connection.effectiveType : null;
        if (type && typeof type === 'string') {
          switch (type) {
            // possible type values
            case 'bluetooth':
            case 'cellular':
              result = 'cellular';
              break;
            case 'none':
              result = 'none';
              break;
            case 'ethernet':
            case 'wifi':
            case 'wimax':
              result = 'wifi';
              break;
            case 'other':
            case 'unknown':
              result = 'unknown';
              break;
            // possible effectiveType values
            case 'slow-2g':
            case '2g':
            case '3g':
              result = 'cellular';
              break;
            case '4g':
              result = 'wifi';
              break;
          }
        }
        return result;
      }),
      // 获取当前语言
      getLanguage: monitor(function () {
        var _this = this;
        _this.language = function () {
          var language = VariableLibrary.navigator.browserLanguage || VariableLibrary.navigator.language || '';
          var arr = language.split('-');
          if (arr[1]) {
            arr[1] = arr[1].toUpperCase();
          }
          return arr.join('_');
        }();
        return _this.language;
      }),
      // 浏览器信息
      getBrowserInfo: monitor(function () {
        var _this = this;
        MethodLibrary.matchInfoMap(_this);
        var u = VariableLibrary.navigator.userAgent || '';
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
        if (typeof window !== 'undefined' && window.chrome) {
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
          } else if (VariableLibrary.navigator && VariableLibrary.navigator.connection && typeof VariableLibrary.navigator['connection']['saveData'] == 'undefined') {
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
            return u.replace(/^.*Edge?\/([\d.]+).*$/, '$1');
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
      }),
      // 获取地理位置
      getGeoPostion: monitor(function (callback) {
        navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition(
        // 位置获取成功
        function (position) {
          callback(position);
        },
        // 位置获取失败
        function (error) {
          display.warn(error);
        });
      })
    };
    var _deviceInfo = {};
    if (typeof window !== 'undefined') {
      _deviceInfo = {
        os: MethodLibrary.getOS(),
        MethodLibrary: MethodLibrary,
        osVersion: MethodLibrary.getOSVersion().version,
        osVersionMajor: MethodLibrary.getOSVersion().osMajor,
        browser: MethodLibrary.getBrowserInfo().browser,
        browserVersion: MethodLibrary.getBrowserInfo().browserVersion,
        browserVersionMajor: MethodLibrary.getBrowserInfo().browserMajor,
        screenSize: window.screen.width + '*' + window.screen.height,
        networkType: MethodLibrary.getNetwork(),
        divice: MethodLibrary.getDeviceType()
      };
    }
    var deviceInfo = _deviceInfo;

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
      PAGE_SHOW: 'pageshow',
      FREEZE: 'freeze',
      RESUME: 'resume',
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
      SELECTION_CHANGE: 'selectionchange',
      STORAGE: 'storage'
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
      W3C_TRACEPARENT_64: 'w3c_traceparent_64bit',
      SKYWALKING_V3: 'skywalking_v3',
      JAEGER: 'jaeger'
    };
    var ErrorHandling = {
      HANDLED: 'handled',
      UNHANDLED: 'unhandled'
    };
    var NonErrorPrefix = {
      UNCAUGHT: 'Uncaught',
      PROVIDED: 'Provided'
    };

    function instrumentMethod(object, method, instrumentationFactory) {
      var original = object[method];
      var instrumentation = instrumentationFactory(original);
      var instrumentationWrapper = function instrumentationWrapper() {
        if (typeof instrumentation !== 'function') {
          return undefined;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
            callMonitored(aliasOption.before, this, arguments);
            // aliasOption.before.apply(this, arguments)
          }

          if (typeof original === 'function') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            result = original.apply(this, arguments);
          }
          if (aliasOption && aliasOption.after) {
            callMonitored(aliasOption.after, this, arguments);
            // aliasOption.after.apply(this, arguments)
          }

          return result;
        };
      });
    }
    function instrumentSetter(object, property, after) {
      var originalDescriptor = Object.getOwnPropertyDescriptor(object, property);
      if (!originalDescriptor || !originalDescriptor.set || !originalDescriptor.configurable) {
        return {
          stop: noop
        };
      }
      // Using the patched `setTimeout` from Zone.js triggers a rendering loop in some Angular
      // component, see issue RUMF-1443
      var instrumentation = function instrumentation(thisObject, value) {
        // put hooked setter into event loop to avoid of set latency
        setTimeout$1(function () {
          after(thisObject, value);
        }, 0);
      };
      var instrumentationWrapper = function instrumentationWrapper(value) {
        originalDescriptor.set.call(this, value);
        instrumentation(this, value);
      };
      Object.defineProperty(object, property, {
        set: instrumentationWrapper
      });
      return {
        stop: function stop() {
          if (Object.getOwnPropertyDescriptor(object, property) && Object.getOwnPropertyDescriptor(object, property).set === instrumentationWrapper) {
            Object.defineProperty(object, property, originalDescriptor);
          } else {
            instrumentation = noop;
          }
        }
      };
    }

    function _typeof$7(obj) { "@babel/helpers - typeof"; return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$7(obj); }

    /**
     * Custom implementation of JSON.stringify that ignores some toJSON methods. We need to do that
     * because some sites badly override toJSON on certain objects. Removing all toJSON methods from
     * nested values would be too costly, so we just detach them from the root value, and native classes
     * used to build JSON values (Array and Object).
     *
     * Note: this still assumes that JSON.stringify is correct.
     */
    function jsonStringify(value, replacer, space) {
      if (_typeof$7(value) !== 'object' || value === null) {
        return JSON.stringify(value);
      }

      // Note: The order matter here. We need to detach toJSON methods on parent classes before their
      // subclasses.
      var restoreObjectPrototypeToJson = detachToJsonMethod(Object.prototype);
      var restoreArrayPrototypeToJson = detachToJsonMethod(Array.prototype);
      var restoreValuePrototypeToJson = detachToJsonMethod(Object.getPrototypeOf(value));
      var restoreValueToJson = detachToJsonMethod(value);
      try {
        return JSON.stringify(value, replacer, space);
      } catch (_unused) {
        return '<error: unable to serialize object>';
      } finally {
        restoreObjectPrototypeToJson();
        restoreArrayPrototypeToJson();
        restoreValuePrototypeToJson();
        restoreValueToJson();
      }
    }
    function detachToJsonMethod(value) {
      var object = value;
      var objectToJson = object.toJSON;
      if (objectToJson) {
        delete object.toJSON;
        return function () {
          object.toJSON = objectToJson;
        };
      }
      return noop;
    }

    function _typeof$6(obj) { "@babel/helpers - typeof"; return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$6(obj); }
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
      if (_typeof$6(candidate) !== 'object' || !candidate || !(property in candidate)) {
        return undefined;
      }
      var value = candidate[property];
      return typeof value === 'string' ? value : undefined;
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types
    var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?([\s\S]*)$/;
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
        before: function before(messageObj, url, line, column, errorObj) {
          var stackTrace;
          if (errorObj instanceof Error) {
            stackTrace = computeStackTrace(errorObj);
          } else {
            var location = {
              url: url,
              column: column,
              line: line
            };
            var parse = tryToParseMessage(messageObj);
            stackTrace = {
              name: parse.name,
              message: parse.message,
              stack: [location]
            };
          }
          callback(stackTrace, isNullUndefinedDefaultValue(errorObj, messageObj));
        }
      });
    }
    function tryToParseMessage(messageObj) {
      var name;
      var message;
      if ({}.toString.call(messageObj) === '[object String]') {
        var groups = ERROR_TYPES_RE.exec(messageObj);
        if (groups) {
          name = groups[1];
          message = groups[2];
        }
      }
      return {
        name: name,
        message: message
      };
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

    function _createForOfIteratorHelper$3(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
    function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }
    function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    var ONE_KIBI_BYTE = 1024;
    var ONE_MEBI_BYTE = 1024 * ONE_KIBI_BYTE;
    // eslint-disable-next-line no-control-regex
    var HAS_MULTI_BYTES_CHARACTERS$1 = /[^\u0000-\u007F]/;
    function computeBytesCount(candidate) {
      // Accurate bytes count computations can degrade performances when there is a lot of events to process
      if (!HAS_MULTI_BYTES_CHARACTERS$1.test(candidate)) {
        return candidate.length;
      }
      if (window.TextEncoder !== undefined) {
        return new TextEncoder().encode(candidate).length;
      }
      return new Blob([candidate]).size;
    }
    function concatBuffers(buffers) {
      var length = buffers.reduce(function (total, buffer) {
        return total + buffer.length;
      }, 0);
      var result = new Uint8Array(length);
      var offset = 0;
      var _iterator = _createForOfIteratorHelper$3(buffers),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var buffer = _step.value;
          result.set(buffer, offset);
          offset += buffer.length;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return result;
    }

    function _typeof$5(obj) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$5(obj); }

    // The maximum size of a single event is 256KiB. By default, we ensure that user-provided data
    // going through sanitize fits inside our events, while leaving room for other contexts, metadata, ...
    var SANITIZE_DEFAULT_MAX_CHARACTER_COUNT = 220 * ONE_KIBI_BYTE;

    // Symbol for the root element of the JSONPath used for visited objects
    var JSON_PATH_ROOT_ELEMENT = '$';

    // When serializing (using JSON.stringify) a key of an object, { key: 42 } gets wrapped in quotes as "key".
    // With the separator (:), we need to add 3 characters to the count.
    var KEY_DECORATION_LENGTH = 3;

    /**
     * Ensures user-provided data is 'safe' for the SDK
     * - Deep clones data
     * - Removes cyclic references
     * - Transforms unserializable types to a string representation
     *
     * LIMITATIONS:
     * - Size is in characters, not byte count (may differ according to character encoding)
     * - Size does not take into account indentation that can be applied to JSON.stringify
     * - Non-numerical properties of Arrays are ignored. Same behavior as JSON.stringify
     *
     * @param source              User-provided data meant to be serialized using JSON.stringify
     * @param maxCharacterCount   Maximum number of characters allowed in serialized form
     */

    function sanitize(source, maxCharacterCount) {
      if (maxCharacterCount === undefined) {
        maxCharacterCount = SANITIZE_DEFAULT_MAX_CHARACTER_COUNT;
      }
      // Unbind any toJSON function we may have on [] or {} prototypes
      var restoreObjectPrototypeToJson = detachToJsonMethod(Object.prototype);
      var restoreArrayPrototypeToJson = detachToJsonMethod(Array.prototype);

      // Initial call to sanitizeProcessor - will populate containerQueue if source is an Array or a plain Object
      var containerQueue = [];
      var visitedObjectsWithPath = new WeakMap();
      var sanitizedData = sanitizeProcessor(source, JSON_PATH_ROOT_ELEMENT, undefined, containerQueue, visitedObjectsWithPath);
      var accumulatedCharacterCount = JSON.stringify(sanitizedData) && JSON.stringify(sanitizedData).length || 0;
      if (accumulatedCharacterCount > maxCharacterCount) {
        warnOverCharacterLimit(maxCharacterCount, 'discarded', source);
        return undefined;
      }
      while (containerQueue.length > 0 && accumulatedCharacterCount < maxCharacterCount) {
        var containerToProcess = containerQueue.shift();
        var separatorLength = 0; // 0 for the first element, 1 for subsequent elements

        // Arrays and Objects have to be handled distinctly to ensure
        // we do not pick up non-numerical properties from Arrays
        if (Array.isArray(containerToProcess.source)) {
          for (var key = 0; key < containerToProcess.source.length; key++) {
            var targetData = sanitizeProcessor(containerToProcess.source[key], containerToProcess.path, key, containerQueue, visitedObjectsWithPath);
            if (targetData !== undefined) {
              accumulatedCharacterCount += JSON.stringify(targetData).length;
            } else {
              // When an element of an Array (targetData) is undefined, it is serialized as null:
              // JSON.stringify([undefined]) => '[null]' - This accounts for 4 characters
              accumulatedCharacterCount += 4;
            }
            accumulatedCharacterCount += separatorLength;
            separatorLength = 1;
            if (accumulatedCharacterCount > maxCharacterCount) {
              warnOverCharacterLimit(maxCharacterCount, 'truncated', source);
              break;
            }
            containerToProcess.target[key] = targetData;
          }
        } else {
          for (var key in containerToProcess.source) {
            if (Object.prototype.hasOwnProperty.call(containerToProcess.source, key)) {
              var targetData = sanitizeProcessor(containerToProcess.source[key], containerToProcess.path, key, containerQueue, visitedObjectsWithPath);
              // When a property of an object has an undefined value, it will be dropped during serialization:
              // JSON.stringify({a:undefined}) => '{}'
              if (targetData !== undefined) {
                accumulatedCharacterCount += JSON.stringify(targetData).length + separatorLength + key.length + KEY_DECORATION_LENGTH;
                separatorLength = 1;
              }
              if (accumulatedCharacterCount > maxCharacterCount) {
                warnOverCharacterLimit(maxCharacterCount, 'truncated', source);
                break;
              }
              containerToProcess.target[key] = targetData;
            }
          }
        }
      }

      // Rebind detached toJSON functions
      restoreObjectPrototypeToJson();
      restoreArrayPrototypeToJson();
      return sanitizedData;
    }

    /**
     * Internal function to factorize the process common to the
     * initial call to sanitize, and iterations for Arrays and Objects
     *
     */
    function sanitizeProcessor(source, parentPath, key, queue, visitedObjectsWithPath) {
      // Start by handling toJSON, as we want to sanitize its output
      var sourceToSanitize = tryToApplyToJSON(source);
      if (!sourceToSanitize || _typeof$5(sourceToSanitize) !== 'object') {
        return sanitizePrimitivesAndFunctions(sourceToSanitize);
      }
      var sanitizedSource = sanitizeObjects(sourceToSanitize);
      if (sanitizedSource !== '[Object]' && sanitizedSource !== '[Array]' && sanitizedSource !== '[Error]') {
        return sanitizedSource;
      }

      // Handle potential cyclic references
      // We need to use source as sourceToSanitize could be a reference to a new object
      // At this stage, we know the source is an object type
      var sourceAsObject = source;
      if (visitedObjectsWithPath.has(sourceAsObject)) {
        return '[Reference seen at ' + visitedObjectsWithPath.get(sourceAsObject) + ']';
      }

      // Add processed source to queue
      var currentPath = key !== undefined ? parentPath + '.' + key : parentPath;
      var target = Array.isArray(sourceToSanitize) ? [] : {};
      visitedObjectsWithPath.set(sourceAsObject, currentPath);
      queue.push({
        source: sourceToSanitize,
        target: target,
        path: currentPath
      });
      return target;
    }

    /**
     * Handles sanitization of simple, non-object types
     *
     */
    function sanitizePrimitivesAndFunctions(value) {
      // BigInt cannot be serialized by JSON.stringify(), convert it to a string representation
      if (typeof value === 'bigint') {
        return '[BigInt] ' + value.toString();
      }
      // Functions cannot be serialized by JSON.stringify(). Moreover, if a faulty toJSON is present, it needs to be converted
      // so it won't prevent stringify from serializing later
      if (typeof value === 'function') {
        return '[Function] ' + value.name || 'unknown';
      }
      // JSON.stringify() does not serialize symbols.
      if (_typeof$5(value) === 'symbol') {
        // symbol.description is part of ES2019+
        return '[Symbol] ' + value.description || value.toString();
      }
      return value;
    }

    /**
     * Handles sanitization of object types
     *
     * LIMITATIONS
     * - If a class defines a toStringTag Symbol, it will fall in the catch-all method and prevent enumeration of properties.
     * To avoid this, a toJSON method can be defined.
     * - IE11 does not return a distinct type for objects such as Map, WeakMap, ... These objects will pass through and their
     * properties enumerated if any.
     *
     */
    function sanitizeObjects(value) {
      try {
        // Handle events - Keep a simple implementation to avoid breaking changes
        if (value instanceof Event) {
          return {
            isTrusted: value.isTrusted
          };
        }

        // Handle all remaining object types in a generic way
        var result = Object.prototype.toString.call(value);
        var match = result.match(/\[object (.*)\]/);
        if (match && match[1]) {
          return '[' + match[1] + ']';
        }
      } catch (_unused) {
        // If the previous serialization attempts failed, and we cannot convert using
        // Object.prototype.toString, declare the value unserializable
      }
      return '[Unserializable]';
    }

    /**
     * Checks if a toJSON function exists and tries to execute it
     *
     */
    function tryToApplyToJSON(value) {
      var object = value;
      if (object && typeof object.toJSON === 'function') {
        try {
          return object.toJSON();
        } catch (_unused2) {
          // If toJSON fails, we continue by trying to serialize the value manually
        }
      }
      return value;
    }

    /**
     * Helper function to display the warning when the accumulated character count is over the limit
     */
    function warnOverCharacterLimit(maxCharacterCount, changeType, source) {
      display.warn('The data provided has been ' + changeType + ' as it is over the limit of ' + maxCharacterCount + ' characters:', source);
    }

    var NO_ERROR_STACK_PRESENT_MESSAGE = 'No stack, consider using an instance of Error';
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
      var isErrorInstance = originalError instanceof Error;
      var message = computeMessage(stackTrace, isErrorInstance, nonErrorPrefix, originalError);
      var stack = hasUsableStack(isErrorInstance, stackTrace) ? toStackTraceString(stackTrace) : NO_ERROR_STACK_PRESENT_MESSAGE;
      var causes = isErrorInstance ? flattenErrorCauses(originalError, source) : undefined;
      var type = stackTrace && stackTrace.name;
      return {
        startClocks: startClocks,
        source: source,
        handling: handling,
        originalError: originalError,
        message: message,
        stack: stack,
        handlingStack: handlingStack,
        type: type,
        causes: causes
      };
    }
    function computeMessage(stackTrace, isErrorInstance, nonErrorPrefix, originalError) {
      // Favor stackTrace message only if tracekit has really been able to extract something meaningful (message + name)
      // TODO rework tracekit integration to avoid scattering error building logic
      return stackTrace && stackTrace.message && stackTrace && stackTrace.name ? stackTrace.message : !isErrorInstance ? nonErrorPrefix + ' ' + jsonStringify(sanitize(originalError)) : 'Empty message';
    }
    function hasUsableStack(isErrorInstance, stackTrace) {
      if (stackTrace === undefined) {
        return false;
      }
      if (isErrorInstance) {
        return true;
      }
      // handle cases where tracekit return stack = [] or stack = [{url: undefined, line: undefined, column: undefined}]
      // TODO rework tracekit integration to avoid generating those unusable stack
      return stackTrace.stack.length > 0 && (stackTrace.stack.length > 1 || stackTrace.stack[0].url !== undefined);
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
      var formattedStack;

      // IE needs to throw the error to fill in the stack trace
      if (!error.stack) {
        try {
          throw error;
        } catch (e) {
        }
      }
      callMonitored(function () {
        var stackTrace = computeStackTrace(error);
        stackTrace.stack = stackTrace.stack.slice(internalFramesToSkip);
        formattedStack = toStackTraceString(stackTrace);
      });
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
          nonErrorPrefix: NonErrorPrefix.UNCAUGHT,
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
          callMonitored(function () {
            observable.notify(buildConsoleLog(params, api, handlingStack));
          });
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

    function addEventListener(eventTarget, event, listener, options) {
      return addEventListeners(eventTarget, [event], listener, options);
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

    function addEventListeners(eventTarget, eventNames, listener, options) {
      var wrappedListener = monitor(options && options.once ? function (event) {
        stop();
        listener(event);
      } : listener);
      options = options && options.passive ? {
        capture: options.capture,
        passive: options.passive
      } : options && options.capture;
      var add = getZoneJsOriginalValue(eventTarget, 'addEventListener');
      each(eventNames, function (eventName) {
        add.call(eventTarget, eventName, wrappedListener, options);
      });
      var stop = function stop() {
        var remove = getZoneJsOriginalValue(eventTarget, 'removeEventListener');
        each(eventNames, function (eventName) {
          remove.call(eventTarget, eventName, wrappedListener, options);
        });
      };
      return {
        stop: stop
      };
    }

    var RawReportType = {
      intervention: 'intervention',
      deprecation: 'deprecation',
      cspViolation: 'csp_violation'
    };
    function initReportObservable(configuration, apis) {
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
        var handleReports = monitor(function (reports) {
          each(reports, function (report) {
            observable.notify(buildRawReportFromReport(report));
          });
        });
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
    function createCspViolationReportObservable(configuration) {
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
      var message = "'" + event.blockedURI + "' blocked by '" + event.effectiveDirective + "' directive";
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
      AUTO_ACTION_COMPLETED: 'AUTO_ACTION_COMPLETED',
      VIEW_CREATED: 'VIEW_CREATED',
      VIEW_UPDATED: 'VIEW_UPDATED',
      VIEW_ENDED: 'VIEW_ENDED',
      SESSION_RENEWED: 'SESSION_RENEWED',
      SESSION_EXPIRED: 'SESSION_EXPIRED',
      PAGE_EXITED: 'PAGE_EXITED',
      REQUEST_STARTED: 'REQUEST_STARTED',
      REQUEST_COMPLETED: 'REQUEST_COMPLETED',
      RAW_RUM_EVENT_COLLECTED: 'RAW_RUM_EVENT_COLLECTED',
      RUM_EVENT_COLLECTED: 'RUM_EVENT_COLLECTED',
      RAW_ERROR_COLLECTED: 'RAW_ERROR_COLLECTED',
      RAW_LOG_COLLECTED: 'RAW_LOG_COLLECTED',
      LOG_COLLECTED: 'LOG_COLLECTED'
    };
    function LifeCycle() {
      this.callbacks = {};
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

    function _createForOfIteratorHelper$2(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
    function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
    function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

    /**
     * Current limitation:
     * - field path do not support array, 'a.b.c' only
     */
    function limitModification(object, modifiableFieldPaths, modifier) {
      var clone = deepClone(object);
      var result = modifier(clone);
      each(objectEntries(modifiableFieldPaths), function (filedPaths) {
        var fieldPath = filedPaths[0];
        var fieldType = filedPaths[1];
        var newValue = get(clone, fieldPath);
        var newType = getType(newValue);
        if (newType === fieldType) {
          set(object, fieldPath, sanitize(newValue));
        } else if (fieldType === 'object' && (newType === 'undefined' || newType === 'null')) {
          set(object, fieldPath, {});
        }
      });
      return result;
    }
    function get(object, path) {
      var current = object;
      var _iterator = _createForOfIteratorHelper$2(path.split('.')),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var field = _step.value;
          if (!isValidObjectContaining(current, field)) {
            return;
          }
          current = current[field];
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return current;
    }
    function set(object, path, value) {
      var current = object;
      var fields = path.split('.');
      for (var i = 0; i < fields.length; i += 1) {
        var field = fields[i];
        if (!isValidObject(current)) {
          return;
        }
        if (i !== fields.length - 1) {
          current = current[field];
        } else {
          current[field] = value;
        }
      }
    }
    function isValidObject(object) {
      return getType(object) === 'object';
    }
    function isValidObjectContaining(object, field) {
      return isValidObject(object) && Object.prototype.hasOwnProperty.call(object, field);
    }

    function createEventRateLimiter(eventType, limit, onLimitReached) {
      var eventCount = 0;
      var allowNextEvent = false;
      return {
        isLimitReached: function isLimitReached() {
          if (eventCount === 0) {
            setTimeout$1(function () {
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

    // export function haveSameOrigin(url1, url2) {
    //   return getOrigin(url1) === getOrigin(url2)
    // }

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

    /**
     * Read bytes from a ReadableStream until at least `limit` bytes have been read (or until the end of
     * the stream). The callback is invoked with the at most `limit` bytes, and indicates that the limit
     * has been exceeded if more bytes were available.
     */
    function readBytesFromStream(stream, callback, options) {
      var reader = stream.getReader();
      var chunks = [];
      var readBytesCount = 0;
      readMore();
      function readMore() {
        reader.read().then(monitor(function (result) {
          if (result.done) {
            onDone();
            return;
          }
          if (options.collectStreamBody) {
            chunks.push(result.value);
          }
          readBytesCount += result.value.length;
          if (readBytesCount > options.bytesLimit) {
            onDone();
          } else {
            readMore();
          }
        }), monitor(function (error) {
          callback(error);
        }));
      }
      function onDone() {
        reader.cancel()["catch"](
        // we don't care if cancel fails, but we still need to catch the error to avoid reporting it
        // as an unhandled rejection
        noop);
        var bytes;
        var limitExceeded;
        if (options.collectStreamBody) {
          var completeBuffer;
          if (chunks.length === 1) {
            // optimization: if the response is small enough to fit in a single buffer (provided by the browser), just
            // use it directly.
            completeBuffer = chunks[0];
          } else {
            // else, we need to copy buffers into a larger buffer to concatenate them.
            completeBuffer = new Uint8Array(readBytesCount);
            var offset = 0;
            each(chunks, function (chunk) {
              completeBuffer.set(chunk, offset);
              offset += chunk.length;
            });
          }
          bytes = completeBuffer.slice(0, options.bytesLimit);
          limitExceeded = completeBuffer.length > options.bytesLimit;
        }
        callback(undefined, bytes, limitExceeded);
      }
    }

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
        var testCookieName = "gc_cookie_test_".concat(UUID());
        var testCookieValue = 'test';
        setCookie(testCookieName, testCookieValue, ONE_SECOND, options);
        return getCookie(testCookieName) === testCookieValue;
      } catch (error) {
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
        var testCookieName = "gc_site_test_".concat(UUID());
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

    var TRIM_REGIX = /^\s+|\s+$/g;
    var typeMap = {
      rum: '/rum',
      log: '/logging',
      sessionReplay: '/rum/replay'
    };
    function getEndPointUrl(configuration, type) {
      // type: rum, log,replay
      var subUrl = typeMap[type];
      if (!subUrl) return '';
      var url = configuration.datakitOrigin || configuration.datakitUrl || configuration.site;
      if (url.indexOf('/') === 0) {
        // 绝对路径这种 /xxx
        url = location.origin + trim(url);
      }
      var endpoint = url;
      if (url.lastIndexOf('/') === url.length - 1) {
        endpoint = trim(url) + 'v1/write' + subUrl;
      } else {
        endpoint = trim(url) + '/v1/write' + subUrl;
      }
      if (configuration.site && configuration.clientToken) {
        endpoint = endpoint + '?token=' + configuration.clientToken + '&to_headless=true';
      }
      return endpoint;
    }
    function trim(str) {
      return str.replace(TRIM_REGIX, '');
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
        rumEndpoint: getEndPointUrl(initConfiguration, 'rum'),
        logsEndpoint: getEndPointUrl(initConfiguration, 'log'),
        sessionReplayEndPoint: getEndPointUrl(initConfiguration, 'sessionReplay'),
        isIntakeUrl: isIntakeUrl,
        isServerError: isServerError
      };
    }
    function isIntakeRequest(url, configuration) {
      var notTakeRequest = [configuration.rumEndpoint];
      if (configuration.logsEndpoint) {
        notTakeRequest.push(configuration.logsEndpoint);
      }
      if (configuration.sessionReplayEndPoint) {
        notTakeRequest.push(configuration.sessionReplayEndPoint);
      }
      // datakit 地址，log 地址，以及客户自定义过滤方法定义url
      return some(notTakeRequest, function (takeUrl) {
        return url.indexOf(takeUrl) === 0;
      }) || configuration.isIntakeUrl(url);
    }

    var DefaultPrivacyLevel = {
      ALLOW: 'allow',
      MASK: 'mask',
      MASK_USER_INPUT: 'mask-user-input'
    };
    function validateAndBuildConfiguration(initConfiguration) {
      if (initConfiguration.sampleRate !== undefined && !isPercentage(initConfiguration.sampleRate)) {
        display.error('Sample Rate should be a number between 0 and 100');
        return;
      }
      if (initConfiguration.sessionSampleRate !== undefined && !isPercentage(initConfiguration.sessionSampleRate)) {
        display.error('Sample Rate should be a number between 0 and 100');
        return;
      }
      if (initConfiguration.telemetrySampleRate !== undefined && !isPercentage(initConfiguration.telemetrySampleRate)) {
        display.error('Telemetry Sample Rate should be a number between 0 and 100');
        return;
      }
      var sessionSampleRate = initConfiguration.sessionSampleRate || initConfiguration.sampleRate;
      return assign({
        beforeSend: initConfiguration.beforeSend && catchUserErrors(initConfiguration.beforeSend, 'beforeSend threw an error:'),
        cookieOptions: buildCookieOptions(initConfiguration),
        sessionSampleRate: isNullUndefinedDefaultValue(sessionSampleRate, 100),
        service: initConfiguration.service,
        version: initConfiguration.version,
        env: initConfiguration.env,
        telemetrySampleRate: isNullUndefinedDefaultValue(initConfiguration.telemetrySampleRate, 100),
        telemetryEnabled: isNullUndefinedDefaultValue(initConfiguration.telemetryEnabled, false),
        silentMultipleInit: !!initConfiguration.silentMultipleInit,
        /**
         * beacon payload max queue size implementation is 64kb
         * ensure that we leave room for logs, rum and potential other users
         */
        batchBytesLimit: 16 * ONE_KIBI_BYTE,
        eventRateLimiterThreshold: 3000,
        maxTelemetryEventsPerPage: 15,
        /**
         * flush automatically, aim to be lower than ALB connection timeout
         * to maximize connection reuse.
         */
        flushTimeout: 30 * ONE_SECOND,
        /**
         * Logs intake limit
         */
        batchMessagesLimit: 50,
        messageBytesLimit: 256 * ONE_KIBI_BYTE,
        resourceUrlLimit: 5 * ONE_KIBI_BYTE,
        storeContextsToLocal: !!initConfiguration.storeContextsToLocal,
        sendContentTypeByJson: !!initConfiguration.sendContentTypeByJson
      }, computeTransportConfiguration(initConfiguration));
    }
    function validatePostRequestRequireParamsConfiguration(initConfiguration) {
      if (!initConfiguration.site && !initConfiguration.datakitOrigin && !initConfiguration.datakitUrl) {
        display.error('datakitOrigin or site is not configured, no RUM data will be collected.');
        return false;
      }
      //   if (!initConfiguration.datakitUrl && !initConfiguration.datakitOrigin) {
      //     display.error(
      //       'datakitOrigin is not configured, no RUM data will be collected.'
      //     )
      //     return false
      //   }
      if (initConfiguration.site && !initConfiguration.clientToken) {
        display.error('clientToken is not configured, no RUM data will be collected.');
        return false;
      }
      return true;
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
            var context = callMonitored(beforeSend, null, [observable, input, init]);
            if (context) {
              responsePromise = originalFetch.call(this, context.input, context.init);
              callMonitored(afterSend, null, [observable, responsePromise, context]);
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
      var method = init && init.method || input instanceof Request && input.method || 'GET';
      var url = input instanceof Request ? input.url : normalizeUrl(String(input));
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
        context.state = 'resolve';
        // context.duration = elapsed(context.startClocks.timeStamp, timeStampNow())
        if ('stack' in response || response instanceof Error) {
          context.status = 0;
          context.isAborted = response instanceof DOMException && response.code === DOMException.ABORT_ERR;
          context.error = response;
        } else if ('status' in response) {
          context.response = response;
          try {
            context.responseType = response.constructor === Response && response.type || ''; // issue The Response type getter can only be used on instances of Response
          } catch (err) {
            context.responseType = '';
          }
          context.status = response.status;
          context.isAborted = false;
        }
        observable.notify(context);
      };
      responsePromise.then(monitor(reportFetch), monitor(reportFetch));
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
      var stopInstrumentingOnReadyStateChange = instrumentMethodAndCallOriginal(this, 'onreadystatechange', {
        before: function before() {
          if (this.readyState === XMLHttpRequest.DONE) {
            // Try to report the XHR as soon as possible, because the XHR may be mutated by the
            // application during a future event. For example, Angular is calling .abort() on
            // completed requests during a onreadystatechange event, so the status becomes '0'
            // before the request is collected.
            onEnd.call(this);
          }
        }
      }).stop;
      var onEnd = function onEnd() {
        unsubscribeLoadEndListener();
        stopInstrumentingOnReadyStateChange();
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
      var unsubscribeLoadEndListener = addEventListener(this, 'loadend', onEnd).stop;
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

    var PageExitReason = {
      HIDDEN: 'visibility_hidden',
      UNLOADING: 'before_unload',
      PAGEHIDE: 'page_hide',
      FROZEN: 'page_frozen'
    };
    function createPageExitObservable() {
      var observable = new Observable(function () {
        /**
         * Only event that guarantee to fire on mobile devices when the page transitions to background state
         * (e.g. when user switches to a different application, goes to homescreen, etc), or is being unloaded.
         */
        var visibilityChangeListener = addEventListeners(document, [DOM_EVENT.VISIBILITY_CHANGE, DOM_EVENT.FREEZE, DOM_EVENT.PAGE_HIDE], function (event) {
          if (event.type === DOM_EVENT.VISIBILITY_CHANGE && document.visibilityState === 'hidden') {
            /**
             * Only event that guarantee to fire on mobile devices when the page transitions to background state
             * (e.g. when user switches to a different application, goes to homescreen, etc), or is being unloaded.
             */
            observable.notify({
              reason: PageExitReason.HIDDEN
            });
          } else if (event.type === DOM_EVENT.FREEZE) {
            /**
             * After transitioning in background a tab can be freezed to preserve resources. (cf: https://developer.chrome.com/blog/page-lifecycle-api)
             * Allow to collect events happening between hidden and frozen state.
             */
            observable.notify({
              reason: PageExitReason.FROZEN
            });
          }
        }, {
          capture: true
        });

        /**
         * Safari does not support yet to send a request during:
         * - a visibility change during doc unload (cf: https://bugs.webkit.org/show_bug.cgi?id=194897)
         * - a page hide transition (cf: https://bugs.webkit.org/show_bug.cgi?id=188329)
         */
        var beforeUnloadListener = addEventListener(window, DOM_EVENT.BEFORE_UNLOAD, function () {
          observable.notify({
            reason: PageExitReason.UNLOADING
          });
        });
        return function () {
          visibilityChangeListener.stop();
          beforeUnloadListener.stop();
        };
      });
      return observable;
    }
    function isPageExitReason(reason) {
      return includes(values(PageExitReason), reason);
    }

    function isTextNode(node) {
      return node.nodeType === Node.TEXT_NODE;
    }
    function isElementNode(node) {
      return node.nodeType === Node.ELEMENT_NODE;
    }
    function isNodeShadowHost(node) {
      return isElementNode(node) && Boolean(node.shadowRoot);
    }
    function isNodeShadowRoot(node) {
      var shadowRoot = node;
      return !!shadowRoot.host && shadowRoot.nodeType === Node.DOCUMENT_FRAGMENT_NODE && isElementNode(shadowRoot.host);
    }
    function hasChildNodes(node) {
      return node.childNodes.length > 0 || isNodeShadowHost(node);
    }
    // export function getChildNodes(node) {
    //   return isNodeShadowHost(node) ? node.shadowRoot.childNodes : node.childNodes
    // }
    function forEachChildNodes(node, callback) {
      node.childNodes.forEach(callback);
      if (isNodeShadowHost(node)) {
        callback(node.shadowRoot);
      }
    }
    /**
     * Return `host` in case if the current node is a shadow root otherwise will return the `parentNode`
     */
    function getParentNode(node) {
      return isNodeShadowRoot(node) ? node.host : node.parentNode;
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

    function getScrollX() {
      var scrollX;
      var visual = window.visualViewport;
      if (visual) {
        scrollX = visual.pageLeft - visual.offsetLeft;
      } else if (window.scrollX !== undefined) {
        scrollX = window.scrollX;
      } else {
        scrollX = window.pageXOffset || 0;
      }
      return Math.round(scrollX);
    }
    function getScrollY() {
      var scrollY;
      var visual = window.visualViewport;
      if (visual) {
        scrollY = visual.pageTop - visual.offsetTop;
      } else if (window.scrollY !== undefined) {
        scrollY = window.scrollY;
      } else {
        scrollY = window.pageYOffset || 0;
      }
      return Math.round(scrollY);
    }

    var commonTags = {
      sdk_name: '_gc.sdk_name',
      sdk_version: '_gc.sdk_version',
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
      view_name: 'view.path',
      // 冗余一个字段
      view_path_group: 'view.path_group',
      view_url_query: 'view.url_query'
    };
    var commonFields = {
      action_id: 'action.id',
      action_ids: 'action.ids',
      view_in_foreground: 'view.in_foreground',
      display: 'display',
      session_has_replay: 'session.has_replay',
      is_login: 'user.is_login',
      page_states: '_gc.page_states'
    };
    // 需要用双引号将字符串类型的field value括起来， 这里有数组标示[string, path]
    var dataMap = {
      view: {
        type: RumEventType.VIEW,
        tags: {
          view_loading_type: 'view.loading_type',
          view_apdex_level: 'view.apdex_level',
          view_privacy_replay_level: 'privacy.replay_level'
        },
        fields: {
          is_active: 'view.is_active',
          session_replay_stats: '_gc.replay_stats',
          session_is_active: 'session.is_active',
          view_error_count: 'view.error.count',
          view_resource_count: 'view.resource.count',
          view_long_task_count: 'view.long_task.count',
          view_action_count: 'view.action.count',
          first_contentful_paint: 'view.first_contentful_paint',
          largest_contentful_paint: 'view.largest_contentful_paint',
          largest_contentful_paint_element_selector: 'view.largest_contentful_paint_element_selector',
          cumulative_layout_shift: 'view.cumulative_layout_shift',
          cumulative_layout_shift_target_selector: 'view.cumulative_layout_shift_target_selector',
          first_input_delay: 'view.first_input_delay',
          loading_time: 'view.loading_time',
          dom_interactive: 'view.dom_interactive',
          dom_content_loaded: 'view.dom_content_loaded',
          dom_complete: 'view.dom_complete',
          load_event: 'view.load_event',
          first_input_time: 'view.first_input_time',
          first_input_target_selector: 'view.first_input_target_selector',
          first_paint_time: 'view.fpt',
          interaction_to_next_paint: 'view.interaction_to_next_paint',
          interaction_to_next_paint_target_selector: 'view.interaction_to_next_paint_target_selector',
          resource_load_time: 'view.resource_load_time',
          time_to_interactive: 'view.tti',
          dom: 'view.dom',
          dom_ready: 'view.dom_ready',
          time_spent: 'view.time_spent',
          first_byte: 'view.first_byte',
          frustration_count: 'view.frustration.count',
          custom_timings: 'view.custom_timings'
        }
      },
      resource: {
        type: RumEventType.RESOURCE,
        tags: {
          trace_id: '_gc.trace_id',
          span_id: '_gc.span_id',
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
          resource_encode_size: 'resource.encode_size',
          resource_render_blocking_status: 'resource.render_blocking_status',
          resource_dns: 'resource.dns',
          resource_tcp: 'resource.tcp',
          resource_ssl: 'resource.ssl',
          resource_ttfb: 'resource.ttfb',
          resource_trans: 'resource.trans',
          resource_redirect: 'resource.redirect',
          resource_first_byte: 'resource.firstbyte',
          resource_dns_time: 'resource.dns_time',
          resource_download_time: 'resource.download_time',
          resource_first_byte_time: 'resource.first_byte_time',
          resource_connect_time: 'resource.connect_time',
          resource_ssl_time: 'resource.ssl_time',
          resource_redirect_time: 'resource.redirect_time'
        }
      },
      error: {
        type: RumEventType.ERROR,
        tags: {
          error_id: 'error.id',
          trace_id: '_gc.trace_id',
          span_id: '_gc.span_id',
          error_source: 'error.source',
          error_type: 'error.type',
          error_handling: 'error.handling'
          //   resource_url: 'error.resource.url',
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
          action_type: 'action.type'
        },
        fields: {
          action_name: 'action.target.name',
          duration: 'action.loading_time',
          action_error_count: 'action.error.count',
          action_resource_count: 'action.resource.count',
          action_frustration_types: 'action.frustration.type',
          action_long_task_count: 'action.long_task.count',
          action_target: '_gc.action.target',
          action_position: '_gc.action.position'
        }
      },
      telemetry: {
        type: 'telemetry',
        fields: {
          status: 'telemetry.status',
          message: ['string', 'telemetry.message'],
          type: 'telemetry.type',
          error_stack: ['string', 'telemetry.error.stack'],
          error_kind: ['string', 'telemetry.error.kind']
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

    var SESSION_TIME_OUT_DELAY = 4 * ONE_HOUR;
    var SESSION_EXPIRATION_DELAY = 15 * ONE_MINUTE;

    var SESSION_ENTRY_REGEXP = /^([a-z]+)=([a-z0-9-]+)$/;
    var SESSION_ENTRY_SEPARATOR = '&';
    var SESSION_COOKIE_NAME = '_dataflux_s';

    // arbitrary values
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
        }
        // acquire lock
        currentLock = UUID();
        currentSession.lock = currentLock;
        setSession(currentSession, operations.options);
        // if lock is not acquired, retry later
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
      }
      // call after even if session is not persisted in order to perform operations on
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
      setTimeout$1(function () {
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
            expireSessionInCache();
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
      function expireSessionInCache() {
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
        expandOrRenewSession: throttle(expandOrRenewSession, COOKIE_ACCESS_DELAY).throttled,
        expandSession: expandSession,
        getSession: function getSession() {
          return sessionCache;
        },
        renewObservable: renewObservable,
        expireObservable: expireObservable,
        expire: function expire() {
          deleteSessionCookie(options);
          synchronizeSession({});
        },
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
        expireObservable: sessionStore.expireObservable,
        expire: sessionStore.expire
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
      UP: 0,
      FAILURE_DETECTED: 1,
      DOWN: 2
    };
    var RetryReason = {
      AFTER_SUCCESS: 0,
      AFTER_RESUME: 1
    };
    function sendWithRetryStrategy(payload, state, sendStrategy, endpointUrl, reportError) {
      if (state.transportStatus === TransportStatus.UP && state.queuedPayloads.size() === 0 && state.bandwidthMonitor.canHandle(payload)) {
        send(payload, state, sendStrategy, {
          onSuccess: function onSuccess() {
            return retryQueuedPayloads(RetryReason.AFTER_SUCCESS, state, sendStrategy, endpointUrl, reportError);
          },
          onFailure: function onFailure() {
            state.queuedPayloads.enqueue(payload);
            scheduleRetry(state, sendStrategy, endpointUrl, reportError);
          }
        });
      } else {
        state.queuedPayloads.enqueue(payload);
      }
    }
    function scheduleRetry(state, sendStrategy, endpointUrl, reportError) {
      if (state.transportStatus !== TransportStatus.DOWN) {
        return;
      }
      setTimeout$1(function () {
        var payload = state.queuedPayloads.first();
        send(payload, state, sendStrategy, {
          onSuccess: function onSuccess() {
            state.queuedPayloads.dequeue();
            state.currentBackoffTime = INITIAL_BACKOFF_TIME;
            retryQueuedPayloads(RetryReason.AFTER_RESUME, state, sendStrategy, endpointUrl, reportError);
          },
          onFailure: function onFailure() {
            state.currentBackoffTime = Math.min(MAX_BACKOFF_TIME, state.currentBackoffTime * 2);
            scheduleRetry(state, sendStrategy, endpointUrl, reportError);
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
        if (!shouldRetryRequest(response)) {
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
    function retryQueuedPayloads(reason, state, sendStrategy, endpointUrl, reportError) {
      if (reason === RetryReason.AFTER_SUCCESS && state.queuedPayloads.isFull() && !state.queueFullReported) {
        reportError({
          message: 'Reached max ' + endpointUrl + ' events size queued for upload: ' + MAX_QUEUE_BYTES_COUNT / ONE_MEBI_BYTE + 'MiB',
          source: ErrorSource.AGENT,
          startClocks: clocksNow()
        });
        state.queueFullReported = true;
      }
      var previousQueue = state.queuedPayloads;
      state.queuedPayloads = newPayloadQueue();
      while (previousQueue.size() > 0) {
        sendWithRetryStrategy(previousQueue.dequeue(), state, sendStrategy, endpointUrl, reportError);
      }
    }
    function shouldRetryRequest(response) {
      return response.type !== 'opaque' && (response.status === 0 && !navigator.onLine || response.status === 408 || response.status === 429 || response.status >= 500);
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
        first: function first() {
          return queue[0];
        },
        dequeue: function dequeue() {
          var payload = queue.shift();
          if (payload) {
            this.bytesCount -= payload.bytesCount;
          }
          return payload;
        },
        size: function size() {
          return queue.length;
        },
        isFull: function isFull() {
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
    function createHttpRequest(endpointUrl, bytesLimit, sendContentTypeByJson, reportError) {
      var contentType = sendContentTypeByJson ? 'application/json; charset=UTF-8' : undefined;
      var retryState = newRetryState();
      var sendStrategyForRetry = function sendStrategyForRetry(payload, onResponse) {
        return fetchKeepAliveStrategy(endpointUrl, bytesLimit, contentType, payload, onResponse);
      };
      return {
        send: function send(payload) {
          sendWithRetryStrategy(payload, retryState, sendStrategyForRetry, endpointUrl, reportError);
        },
        /**
         * Since fetch keepalive behaves like regular fetch on Firefox,
         * keep using sendBeaconStrategy on exit
         */
        sendOnExit: function sendOnExit(payload) {
          sendBeaconStrategy(endpointUrl, bytesLimit, contentType, payload);
        }
      };
    }
    function sendBeaconStrategy(endpointUrl, bytesLimit, contentType, payload) {
      var data = payload.data;
      var bytesCount = payload.bytesCount;
      var url = addBatchPrecision(endpointUrl);
      var canUseBeacon = !!navigator.sendBeacon && bytesCount < bytesLimit;
      if (canUseBeacon) {
        try {
          var beaconData;
          if (contentType) {
            beaconData = new Blob([data], {
              type: contentType
            });
          } else {
            beaconData = data;
          }
          var isQueued = navigator.sendBeacon(url, beaconData);
          if (isQueued) {
            return;
          }
        } catch (e) {
          // reportBeaconError(e)
        }
      }
      sendXHR(url, contentType, data);
    }
    function fetchKeepAliveStrategy(endpointUrl, bytesLimit, contentType, payload, onResponse) {
      var data = payload.data;
      var bytesCount = payload.bytesCount;
      var url = addBatchPrecision(endpointUrl);
      var canUseKeepAlive = isKeepAliveSupported() && bytesCount < bytesLimit;
      if (canUseKeepAlive) {
        var fetchOption = {
          method: 'POST',
          body: data,
          keepalive: true,
          mode: 'cors'
        };
        if (contentType) {
          fetchOption.headers = {
            'Content-Type': contentType
          };
        }
        fetch(url, fetchOption).then(monitor(function (response) {
          if (typeof onResponse === 'function') {
            onResponse({
              status: response.status,
              type: response.type
            });
          }
        }), monitor(function () {
          // failed to queue the request
          sendXHR(url, contentType, data, onResponse);
        }));
      } else {
        sendXHR(url, contentType, data, onResponse);
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
    function sendXHR(url, contentType, data, onResponse) {
      var request = new XMLHttpRequest();
      request.open('POST', url, true);
      if (contentType) {
        //application/json; charset=UTF-8
        request.setRequestHeader('Content-Type', contentType);
      }
      addEventListener(request, 'loadend', function () {
        if (typeof onResponse === 'function') {
          onResponse({
            status: request.status
          });
        }
      }, {
        once: true
      });
      request.send(data);
    }

    function _typeof$4(obj) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$4(obj); }
    function escapeRowData(str) {
      if (_typeof$4(str) === 'object' && str) {
        str = jsonStringify(str);
      } else if (!isString(str)) {
        return str;
      }
      var reg = /[\s=,"]/g;
      return String(str).replace(reg, function (word) {
        return '\\' + word;
      });
    }
    function escapeJsonValue(value, isTag) {
      if (_typeof$4(value) === 'object' && value) {
        value = jsonStringify(value);
      } else if (isTag) {
        // tag  json  只能是字符串
        value = '' + value;
      }
      return value;
    }
    function escapeFieldValueStr(str) {
      return '"' + str.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
    }
    function escapeRowField(value) {
      if (_typeof$4(value) === 'object' && value) {
        return escapeFieldValueStr(jsonStringify(value));
      } else if (isString(value)) {
        return escapeFieldValueStr(value);
      } else {
        return value;
      }
    }

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
              rowData.tags[_key] = escapeJsonValue(_value, true);
              tagsStr.push(escapeRowData(_key) + '=' + escapeRowData(_value));
            }
          });
          var fieldsStr = [];
          var fields = extend({}, commonFields, value.fields);
          each(fields, function (_value, _key) {
            if (isArray(_value) && _value.length === 2) {
              var value_path = _value[1];
              var _valueData = findByPath(message, value_path);
              filterFileds.push(_key);
              if (_valueData !== undefined && _valueData !== null) {
                rowData.fields[_key] = escapeJsonValue(_valueData); // 这里不需要转译
                fieldsStr.push(escapeRowData(_key) + '=' + escapeRowField(_valueData));
              }
            } else if (isString(_value)) {
              var _valueData = findByPath(message, _value);
              filterFileds.push(_key);
              if (_valueData !== undefined && _valueData !== null) {
                rowData.fields[_key] = escapeJsonValue(_valueData); // 这里不需要转译
                fieldsStr.push(escapeRowData(_key) + '=' + escapeRowField(_valueData));
              }
            }
          });
          if (message.context && isObject(message.context) && !isEmptyObject(message.context)) {
            // 自定义tag， 存储成field
            var _tagKeys = [];
            each(message.context, function (_value, _key) {
              // 如果和之前tag重名，则舍弃
              if (filterFileds.indexOf(_key) > -1) return;
              filterFileds.push(_key);
              if (_value !== undefined && _value !== null) {
                _tagKeys.push(_key);
                rowData.fields[_key] = escapeJsonValue(_value); // 这里不需要转译
                fieldsStr.push(escapeRowData(_key) + '=' + escapeRowField(_value));
              }
            });
            if (_tagKeys.length) {
              rowData.fields[CUSTOM_KEYS] = escapeJsonValue(_tagKeys);
              fieldsStr.push(escapeRowData(CUSTOM_KEYS) + '=' + escapeRowField(_tagKeys));
            }
          }
          if (message.type === RumEventType.LOGGER) {
            // 这里处理日志类型数据自定义字段
            each(message, function (value, key) {
              if (filterFileds.indexOf(key) === -1 && value !== undefined && value !== null) {
                rowData.fields[key] = escapeJsonValue(value); // 这里不需要转译
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
          rowData.time = message.date; // 这里不需要转译
        }
      });

      return {
        rowStr: hasFileds ? rowStr : '',
        rowData: hasFileds ? rowData : undefined
      };
    };
    var batch = function batch(request, flushController, messageBytesLimit, sendContentTypeByJson) {
      this.pushOnlyBuffer = [];
      this.upsertBuffer = {};
      this.request = request;
      this.flushController = flushController;
      this.messageBytesLimit = messageBytesLimit;
      this.sendContentTypeByJson = sendContentTypeByJson;
      var _this = this;
      this.flushController.flushObservable.subscribe(function (event) {
        _this.flush(event);
      });
    };
    batch.prototype.add = function (message) {
      this.addOrUpdate(message);
    };
    batch.prototype.upsert = function (message, key) {
      this.addOrUpdate(message, key);
    };
    batch.prototype.flush = function (event) {
      var messages = this.pushOnlyBuffer.concat(values(this.upsertBuffer));
      this.pushOnlyBuffer = [];
      this.upsertBuffer = {};
      if (messages.length > 0) {
        var payloadData = '';
        if (this.sendContentTypeByJson) {
          payloadData = '[' + messages.join(',') + ']';
        } else {
          payloadData = messages.join('\n');
        }
        var payload = {
          data: payloadData,
          bytesCount: event.bytesCount,
          flushReason: event.reason
        };
        if (isPageExitReason(event.reason)) {
          this.request.sendOnExit(payload);
        } else {
          this.request.send(payload);
        }
      }
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
      this.push(processedMessage, messageBytesCount, key);
    };
    batch.prototype.process = function (message) {
      var processedMessage = '';
      if (this.sendContentTypeByJson) {
        processedMessage = jsonStringify(processedMessageByDataMap(message).rowData);
      } else {
        processedMessage = processedMessageByDataMap(message).rowStr;
      }
      var messageBytesCount = computeBytesCount(processedMessage);
      return {
        processedMessage: processedMessage,
        messageBytesCount: messageBytesCount
      };
    };
    batch.prototype.push = function (processedMessage, messageBytesCount, key) {
      var separatorBytesCount = this.flushController.getMessagesCount() > 0 ? 1 : 0;
      this.flushController.notifyBeforeAddMessage(messageBytesCount + separatorBytesCount);
      if (key !== undefined) {
        this.upsertBuffer[key] = processedMessage;
      } else {
        this.pushOnlyBuffer.push(processedMessage);
      }
      this.flushController.notifyAfterAddMessage();
    };
    batch.prototype.remove = function (key) {
      var removedMessage = this.upsertBuffer[key];
      delete this.upsertBuffer[key];
      var messageBytesCount = computeBytesCount(removedMessage);
      // If there are other messages, a '\n' will be added at serialization
      var separatorBytesCount = this.flushController.getMessagesCount() > 1 ? 1 : 0;
      this.flushController.notifyAfterRemoveMessage(messageBytesCount + separatorBytesCount);
    };
    batch.prototype.hasMessageFor = function (key) {
      return key !== undefined && this.upsertBuffer[key] !== undefined;
    };
    var Batch = batch;

    // type FlushReason = PageExitReason | 'duration_limit' | 'bytes_limit' | 'messages_limit' | 'session_expire'

    /**
     * Returns a "flush controller", responsible of notifying when flushing a pool of pending data needs
     * to happen. The implementation is designed to support both synchronous and asynchronous usages,
     * but relies on invariants described in each method documentation to keep a coherent state.
     */
    function createFlushController(_ref) {
      var messagesLimit = _ref.messagesLimit,
        bytesLimit = _ref.bytesLimit,
        durationLimit = _ref.durationLimit,
        pageExitObservable = _ref.pageExitObservable,
        sessionExpireObservable = _ref.sessionExpireObservable;
      var flushObservable = new Observable();
      pageExitObservable.subscribe(function (event) {
        return flush(event.reason);
      });
      sessionExpireObservable.subscribe(function () {
        return flush('session_expire');
      });
      var currentBytesCount = 0;
      var currentMessagesCount = 0;
      function flush(flushReason) {
        if (currentMessagesCount === 0) {
          return;
        }
        var messagesCount = currentMessagesCount;
        var bytesCount = currentBytesCount;
        currentMessagesCount = 0;
        currentBytesCount = 0;
        cancelDurationLimitTimeout();
        flushObservable.notify({
          reason: flushReason,
          messagesCount: messagesCount,
          bytesCount: bytesCount
        });
      }
      var durationLimitTimeoutId;
      function scheduleDurationLimitTimeout() {
        if (durationLimitTimeoutId === undefined) {
          durationLimitTimeoutId = setTimeout$1(function () {
            flush('duration_limit');
          }, durationLimit);
        }
      }
      function cancelDurationLimitTimeout() {
        clearTimeout(durationLimitTimeoutId);
        durationLimitTimeoutId = undefined;
      }
      return {
        flushObservable: flushObservable,
        getMessagesCount: function getMessagesCount() {
          return currentMessagesCount;
        },
        /**
         * Notifies that a message will be added to a pool of pending messages waiting to be flushed.
         *
         * This function needs to be called synchronously, right before adding the message, so no flush
         * event can happen after `notifyBeforeAddMessage` and before adding the message.
         */
        notifyBeforeAddMessage: function notifyBeforeAddMessage(messageBytesCount) {
          if (currentBytesCount + messageBytesCount >= bytesLimit) {
            flush('bytes_limit');
          }
          // Consider the message to be added now rather than in `notifyAfterAddMessage`, because if no
          // message was added yet and `notifyAfterAddMessage` is called asynchronously, we still want
          // to notify when a flush is needed (for example on page exit).
          currentMessagesCount += 1;
          currentBytesCount += messageBytesCount;
          scheduleDurationLimitTimeout();
        },
        /**
         * Notifies that a message *was* added to a pool of pending messages waiting to be flushed.
         *
         * This function can be called asynchronously after the message was added, but in this case it
         * should not be called if a flush event occurred in between.
         */
        notifyAfterAddMessage: function notifyAfterAddMessage() {
          if (currentMessagesCount >= messagesLimit) {
            flush('messages_limit');
          } else if (currentBytesCount >= bytesLimit) {
            flush('bytes_limit');
          }
        },
        /**
         * Notifies that a message was removed from a pool of pending messages waiting to be flushed.
         *
         * This function needs to be called synchronously, right after removing the message, so no flush
         * event can happen after removing the message and before `notifyAfterRemoveMessage`.
         */
        notifyAfterRemoveMessage: function notifyAfterRemoveMessage(messageBytesCount) {
          currentBytesCount -= messageBytesCount;
          currentMessagesCount -= 1;
          if (currentMessagesCount === 0) {
            cancelDurationLimitTimeout();
          }
        }
      };
    }

    function getEventBridgeGlobal() {
      return getGlobalObject().FTWebViewJavascriptBridge;
    }
    function getEventBridge() {
      var eventBridgeGlobal = getEventBridgeGlobal();
      if (!eventBridgeGlobal) {
        return;
      }
      return {
        send: function send(eventType, event) {
          eventBridgeGlobal.sendEvent(JSON.stringify({
            name: eventType,
            data: event
          }));
        }
      };
    }
    function canUseEventBridge() {
      var bridge = getEventBridge();
      return !!bridge;
    }

    // RUM and logs batch bytes limit is 16KB
    // ensure that we leave room for other event attributes and maintain a decent amount of event per batch
    // (3KB (customer data) + 1KB (other attributes)) * 4 (events per batch) = 16KB
    var CUSTOMER_DATA_BYTES_LIMIT = 3 * ONE_KIBI_BYTE;
    var CustomerDataType = {
      FeatureFlag: 'feature flag evaluation',
      User: 'user',
      GlobalContext: 'global context',
      LoggerContext: 'logger context'
    };
    function warnIfCustomerDataLimitReached(bytesCount, customerDataType) {
      if (bytesCount > CUSTOMER_DATA_BYTES_LIMIT) {
        display.warn('The ' + customerDataType + 'data is over ' + CUSTOMER_DATA_BYTES_LIMIT / ONE_KIBI_BYTE + " KiB. On low connectivity, the SDK has the potential to exhaust the user's upload bandwidth.");
        return true;
      }
      return false;
    }

    var BYTES_COMPUTATION_THROTTLING_DELAY = 200;
    function createContextManager(customerDataType, computeBytesCountImpl) {
      if (typeof computeBytesCountImpl === 'undefined') {
        computeBytesCountImpl = computeBytesCount;
      }
      var context = {};
      var bytesCountCache;
      var alreadyWarned = false;
      var changeObservable = new Observable();
      // Throttle the bytes computation to minimize the impact on performance.
      // Especially useful if the user call context APIs synchronously multiple times in a row
      var computeBytesCountThrottled = throttle(function (context) {
        bytesCountCache = computeBytesCountImpl(jsonStringify(context));
        if (!alreadyWarned) {
          alreadyWarned = warnIfCustomerDataLimitReached(bytesCountCache, customerDataType);
        }
      }, BYTES_COMPUTATION_THROTTLING_DELAY).throttled;
      var contextManager = {
        getBytesCount: function getBytesCount() {
          return bytesCountCache;
        },
        /** @deprecated use getContext instead */
        get: function get() {
          return context;
        },
        /** @deprecated use setContextProperty instead */
        add: function add(key, value) {
          context[key] = value;
          computeBytesCountThrottled(context);
          changeObservable.notify();
        },
        /** @deprecated renamed to removeContextProperty */
        remove: function remove(key) {
          delete context[key];
          computeBytesCountThrottled(context);
          changeObservable.notify();
        },
        /** @deprecated use setContext instead */
        set: function set(newContext) {
          context = newContext;
          computeBytesCountThrottled(context);
          changeObservable.notify();
        },
        getContext: function getContext() {
          return deepClone(context);
        },
        setContext: function setContext(newContext) {
          if (getType(newContext) === 'object') {
            context = sanitize(newContext);
            computeBytesCountThrottled(context);
          } else {
            contextManager.clearContext();
          }
          changeObservable.notify();
        },
        setContextProperty: function setContextProperty(key, property) {
          context[key] = deepClone(property);
          computeBytesCountThrottled(context);
          changeObservable.notify();
        },
        removeContextProperty: function removeContextProperty(key) {
          delete context[key];
          computeBytesCountThrottled(context);
          changeObservable.notify();
        },
        clearContext: function clearContext() {
          context = {};
          bytesCountCache = 0;
          changeObservable.notify();
        },
        changeObservable: changeObservable
      };
      return contextManager;
    }

    var CONTEXT_STORE_KEY_PREFIX = '_gc_s';
    var storageListeners = [];
    function createStoredContextManager(productKey, customerDataType, computeBytesCountImpl) {
      if (computeBytesCountImpl === undefined) {
        computeBytesCountImpl = computeBytesCount;
      }
      var storageKey = buildStorageKey(productKey, customerDataType);
      var contextManager = createContextManager(customerDataType, computeBytesCountImpl);
      synchronizeWithStorage();
      storageListeners.push(addEventListener(window, DOM_EVENT.STORAGE, function (params) {
        if (storageKey === params.key) {
          synchronizeWithStorage();
        }
      }));
      contextManager.changeObservable.subscribe(dumpToStorage);
      function synchronizeWithStorage() {
        var rawContext = localStorage.getItem(storageKey);
        var context = rawContext !== null ? JSON.parse(rawContext) : {};
        contextManager.setContext(context);
      }
      function dumpToStorage() {
        localStorage.setItem(storageKey, JSON.stringify(contextManager.getContext()));
      }
      return contextManager;
    }
    function buildStorageKey(productKey, customerDataType) {
      return CONTEXT_STORE_KEY_PREFIX + '_' + productKey + '_' + customerDataType;
    }

    /**
     * Clone input data and ensure known user properties (id, name, email)
     * are strings, as defined here:
     */
    function sanitizeUser(newUser) {
      // We shallow clone only to prevent mutation of user data.
      var user = assign({}, newUser);
      var keys = ['id', 'name', 'email'];
      each(keys, function (key) {
        if (key in user) {
          user[key] = String(user[key]);
        }
      });
      return user;
    }

    /**
     * Simple check to ensure user is valid
     */
    function checkUser(newUser) {
      var isValid = getType(newUser) === 'object';
      if (!isValid) {
        display.error('Unsupported user:', newUser);
      }
      return isValid;
    }

    var TelemetryType = {
      log: 'log',
      configuration: 'configuration'
    };
    var TelemetryStatusType = {
      debug: 'debug',
      error: 'error'
    };

    var ALLOWED_FRAME_URLS = ['https://static.guance.com', 'http://localhost', '<anonymous>'];
    var TelemetryService = {
      LOGS: 'browser-logs-sdk',
      RUM: 'browser-rum-sdk'
    };
    var telemetryConfiguration = {
      maxEventsPerPage: 0,
      sentEventCount: 0,
      telemetryEnabled: false
    };
    var onRawTelemetryEventCollected;
    function startTelemetry(telemetryService, configuration) {
      var contextProvider;
      var observable = new Observable();
      telemetryConfiguration.telemetryEnabled = configuration.telemetryEnabled && performDraw(configuration.telemetrySampleRate);
      onRawTelemetryEventCollected = function onRawTelemetryEventCollected(rawEvent) {
        if (telemetryConfiguration.telemetryEnabled) {
          var event = toTelemetryEvent(telemetryService, rawEvent);
          observable.notify(event);
        }
      };
      startMonitorErrorCollection(addTelemetryError);
      assign(telemetryConfiguration, {
        maxEventsPerPage: configuration.maxTelemetryEventsPerPage,
        sentEventCount: 0
      });
      function toTelemetryEvent(telemetryService, event) {
        return extend2Lev({
          type: 'telemetry',
          date: timeStampNow(),
          service: telemetryService,
          version: __BUILD_ENV__SDK_VERSION__,
          source: 'browser',
          telemetry: event // https://github.com/microsoft/TypeScript/issues/48457
        }, contextProvider !== undefined ? contextProvider() : {});
      }
      return {
        setContextProvider: function setContextProvider(provider) {
          contextProvider = provider;
        },
        observable: observable,
        enabled: telemetryConfiguration.telemetryEnabled
      };
    }
    function addTelemetryDebug(message, context) {
      displayIfDebugEnabled(ConsoleApiName.debug, message, context);
      addTelemetry(assign({
        type: TelemetryType.log,
        message: message,
        status: TelemetryStatusType.debug
      }, context));
    }
    function addTelemetryError(e, context) {
      addTelemetry(assign({
        type: TelemetryType.log,
        status: TelemetryStatusType.error
      }, formatError(e), context));
    }
    function addTelemetry(event) {
      if (onRawTelemetryEventCollected && telemetryConfiguration.sentEventCount < telemetryConfiguration.maxEventsPerPage) {
        telemetryConfiguration.sentEventCount += 1;
        onRawTelemetryEventCollected(event);
      }
    }
    function formatError(e) {
      if (e instanceof Error) {
        var stackTrace = computeStackTrace(e);
        return {
          error: {
            kind: stackTrace.name,
            stack: toStackTraceString(scrubCustomerFrames(stackTrace))
          },
          message: stackTrace.message
        };
      }
      return {
        error: {
          stack: NO_ERROR_STACK_PRESENT_MESSAGE
        },
        message: NonErrorPrefix.UNCAUGHT + ' ' + jsonStringify(e)
      };
    }
    function scrubCustomerFrames(stackTrace) {
      stackTrace.stack = stackTrace.stack.filter(function (frame) {
        return !frame.url || ALLOWED_FRAME_URLS.some(function (allowedFrameUrl) {
          return startsWith(frame.url, allowedFrameUrl);
        });
      });
      return stackTrace;
    }

    var RUM_SESSION_KEY = 'rum';
    var RumSessionPlan = {
      WITHOUT_SESSION_REPLAY: 1,
      WITH_SESSION_REPLAY: 2
    };
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
          var plan = session.trackingType === RumTrackingType.TRACKED_WITH_SESSION_REPLAY ? RumSessionPlan.WITH_SESSION_REPLAY : RumSessionPlan.WITHOUT_SESSION_REPLAY;
          return {
            id: session.id,
            plan: plan,
            sessionReplayAllowed: plan === RumSessionPlan.WITH_SESSION_REPLAY
          };
        },
        expire: sessionManager.expire,
        expireObservable: sessionManager.expireObservable
      };
    }

    /**
     * Start a tracked replay session stub
     * It needs to be a premium plan in order to get long tasks
     */
    function startRumSessionManagerStub() {
      var session = {
        id: '00000000-aaaa-0000-aaaa-000000000000',
        plan: RumSessionPlan.WITHOUT_SESSION_REPLAY,
        // plan value should not be taken into account for mobile
        sessionReplayAllowed: false
      };
      return {
        findTrackedSession: function findTrackedSession() {
          return session;
        },
        expire: noop,
        expireObservable: new Observable()
      };
    }
    function computeSessionState(configuration, rawTrackingType) {
      var trackingType;
      if (hasValidRumSession(rawTrackingType)) {
        trackingType = rawTrackingType;
      } else if (!performDraw(configuration.sessionSampleRate)) {
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
    var HAS_MULTI_BYTES_CHARACTERS = /[^\u0000-\u007F]/;
    function getStrSize(candidate) {
      if (!HAS_MULTI_BYTES_CHARACTERS.test(candidate)) {
        return candidate.length;
      }
      if (window.TextEncoder !== undefined) {
        return new TextEncoder().encode(candidate).length;
      }
      return new Blob([candidate]).size;
    }
    function isResourceUrlLimit(name, limitSize) {
      return getStrSize(name) > limitSize;
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
      }

      // unknown
      return null;
    }
    function isCacheHit(entry) {
      // if we transferred bytes, it must not be a cache hit
      // (will return false for 304 Not Modified)
      if (entry.transferSize > 0) return false;

      // if the body size is non-zero, it must mean this is a
      // ResourceTiming2 browser, this was same-origin or TAO,
      // and transferSize was 0, so it was in the cache
      if (entry.decodedBodySize > 0) return true;

      // fall back to duration checking (non-RT2 or cross-origin)
      return entry.duration < 30;
    }
    //  interface PerformanceResourceDetails {
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
        firstbyte: msToNs(responseStart - domainLookupStart),
        trans: msToNs(responseEnd - responseStart),
        downloadTime: formatTiming(startTime, responseStart, responseEnd),
        firstByteTime: formatTiming(startTime, requestStart, responseStart)
      };
      if (responseStart > 0 && responseStart <= preferredNow()) {
        details.ttfb = msToNs(responseStart - requestStart);
      }
      // Make sure a connection occurred
      if (connectEnd !== fetchStart) {
        details.tcp = msToNs(connectEnd - connectStart);
        details.connectTime = formatTiming(startTime, connectStart, connectEnd);
        // Make sure a secure connection occurred
        if (areInOrder(connectStart, secureConnectionStart, connectEnd)) {
          details.ssl = msToNs(connectEnd - secureConnectionStart);
          details.sslTime = formatTiming(startTime, secureConnectionStart, connectEnd);
        }
      }

      // Make sure a domain lookup occurred
      if (domainLookupEnd !== fetchStart) {
        details.dns = msToNs(domainLookupEnd - domainLookupStart);
        details.dnsTime = formatTiming(startTime, domainLookupStart, domainLookupEnd);
      }
      if (hasRedirection(entry)) {
        details.redirect = msToNs(redirectEnd - redirectStart);
        details.redirectTime = formatTiming(startTime, redirectStart, redirectEnd);
      }
      // renderBlockstatus
      if (entry.renderBlockingStatus) {
        details.renderBlockingStatus = entry.renderBlockingStatus;
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
      var redirectEnd = entry.redirectEnd;
      // Firefox doesn't provide redirect timings on cross origin requests.
      // Provide a default for those.
      if (redirectStart < entry.startTime) {
        redirectStart = entry.startTime;
      }
      if (redirectEnd < entry.startTime) {
        redirectEnd = entry.fetchStart;
      }

      // Make sure redirect timings are in order
      if (!areInOrder(entry.startTime, redirectStart, redirectEnd, entry.fetchStart)) {
        return undefined;
      }
      return extend({}, entry, {
        redirectEnd: redirectEnd,
        redirectStart: redirectStart
      });
      // return {
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
      return {
        duration: msToNs(end - start),
        start: msToNs(start - origin)
      };
    }
    function computeSize(entry) {
      // Make sure a request actually occurred
      if (entry.startTime < entry.responseStart) {
        return {
          size: entry.decodedBodySize,
          encodeSize: Number.MAX_SAFE_INTEGER < entry.encodedBodySize ? 0 : entry.encodedBodySize // max safe interger
        };
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
        var performanceEntries = performance.getEntries();
        // Because the performance entry list can be quite large
        // delay the computation to prevent the SDK from blocking the main thread on init
        setTimeout$1(function () {
          handleRumPerformanceEntries(lifeCycle, configuration, performanceEntries);
        });
      }
      if (window.PerformanceObserver) {
        var handlePerformanceEntryList = monitor(function (entries) {
          handleRumPerformanceEntries(lifeCycle, configuration, entries.getEntries());
        });
        var mainEntries = ['resource', 'navigation', 'longtask', 'paint'];
        var experimentalEntries = ['largest-contentful-paint', 'first-input', 'layout-shift', 'event'];
        try {
          // Experimental entries are not retrieved by performance.getEntries()
          // use a single PerformanceObserver with buffered flag by type
          // to get values that could happen before SDK init
          each(experimentalEntries, function (type) {
            var observer = new PerformanceObserver(handlePerformanceEntryList);
            observer.observe({
              type: type,
              buffered: true,
              // durationThreshold only impact PerformanceEventTiming entries used for INP computation which requires a threshold at 40 (default is 104ms)
              // cf: https://github.com/GoogleChrome/web-vitals/blob/3806160ffbc93c3c4abf210a167b81228172b31c/src/onINP.ts#L209
              durationThreshold: 40
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
          addEventListener(performance, 'resourcetimingbufferfull', function () {
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
          traceId: '',
          toJSON: function toJSON() {
            return assign({}, timing, {
              toJSON: undefined
            });
          }
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
        setTimeout$1(sendFakeTiming);
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
        }

        // This timing will be used to compute the "first Input delay", which is the delta between
        // when the system received the event (e.g. evt.timeStamp) and when it could run the callback
        // (e.g. performance.now()).
        var timing = {
          entryType: 'first-input',
          processingStart: relativeNow(),
          processingEnd: relativeNow(),
          startTime: evt.timeStamp,
          duration: 0,
          name: ''
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
          removeEventListeners();
          // In some cases the recorded delay is clearly wrong, e.g. it's negative or it's larger than
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
        return entry.entryType === 'resource' || entry.entryType === 'navigation' || entry.entryType === 'paint' || entry.entryType === 'longtask' || entry.entryType === 'largest-contentful-paint' || entry.entryType === 'first-input' || entry.entryType === 'layout-shift' || entry.entryType === 'event';
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

    function createDOMMutationObservable() {
      var MutationObserver = getMutationObserverConstructor();
      var observable = new Observable(monitor(function () {
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
      }));
      return observable;
    }
    function getMutationObserverConstructor() {
      var constructor;
      var browserWindow = window;

      // Angular uses Zone.js to provide a context persisting across async tasks.  Zone.js replaces the
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
        // Zone.js 0.8.6+ is storing original class constructors into the browser 'window' object[3].
        //
        // [3] https://github.com/angular/angular/blob/6375fa79875c0fe7b815efc45940a6e6f5c9c9eb/packages/zone.js/lib/common/utils.ts#L288
        constructor = getZoneJsOriginalValue(browserWindow, 'MutationObserver');
        if (browserWindow.MutationObserver && constructor === browserWindow.MutationObserver) {
          // Anterior Zone.js versions (used in Angular 2) does not expose the original MutationObserver
          // in the 'window' object. Luckily, the patched MutationObserver class is storing an original
          // instance in its properties[4]. Let's get the original MutationObserver constructor from
          // there.
          //
          // [4] https://github.com/angular/zone.js/blob/v0.8.5/lib/common/utils.ts#L412

          var patchedInstance = new browserWindow.MutationObserver(noop);
          var originalInstance = getZoneJsOriginalValue(patchedInstance, 'originalInstance');
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
      var pushState = instrumentMethodAndCallOriginal(history, 'pushState', {
        after: onHistoryChange
      });
      var replaceState = instrumentMethodAndCallOriginal(history, 'replaceState', {
        after: onHistoryChange
      });
      var popState = addEventListener(window, DOM_EVENT.POP_STATE, onHistoryChange);
      return {
        stop: function stop() {
          pushState.stop();
          replaceState.stop();
          popState.stop();
        }
      };
    }
    function trackHash(onHashChange) {
      return addEventListener(window, DOM_EVENT.HASH_CHANGE, onHashChange);
    }

    function startLongTaskCollection(lifeCycle, sessionManager) {
      lifeCycle.subscribe(LifeCycleEventType.PERFORMANCE_ENTRIES_COLLECTED, function (entries) {
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
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

    function trackEventCounts(data) {
      var lifeCycle = data.lifeCycle;
      var isChildEvent = data.isChildEvent;
      var callback = data.onChange;
      if (callback === undefined) {
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
        if (event.type === RumEventType.VIEW || !isChildEvent(event)) {
          return;
        }
        switch (event.type) {
          case RumEventType.ERROR:
            eventCounts.errorCount += 1;
            callback();
            break;
          case RumEventType.ACTION:
            if (event.action.frustration) {
              eventCounts.frustrationCount += event.action.frustration.type.length;
            }
            eventCounts.actionCount += 1;
            callback();
            break;
          case RumEventType.LONG_TASK:
            eventCounts.longTaskCount += 1;
            callback();
            break;
          case RumEventType.RESOURCE:
            eventCounts.resourceCount += 1;
            callback();
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

    // Delay to wait for a page activity to validate the tracking process
    var PAGE_ACTIVITY_VALIDATION_DELAY = 100;
    // Delay to wait after a page activity to end the tracking process
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
      var validationTimeoutId = setTimeout$1(function () {
        complete({
          hadActivity: false
        });
      }, PAGE_ACTIVITY_VALIDATION_DELAY);
      var maxDurationTimeoutId = maxDuration !== undefined ? setTimeout$1(function () {
        return complete({
          hadActivity: true,
          end: timeStampNow()
        });
      }, maxDuration) : undefined;
      var pageActivitySubscription = pageActivityObservable.subscribe(function (data) {
        var isBusy = data.isBusy;
        clearTimeout(validationTimeoutId);
        clearTimeout(pageActivityEndTimeoutId);
        var lastChangeTime = timeStampNow();
        if (!isBusy) {
          pageActivityEndTimeoutId = setTimeout$1(function () {
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
          if (isExcludedUrl(configuration, request.url) || firstRequestIndex === undefined ||
          // If the request started before the tracking start, ignore it
          request.requestIndex < firstRequestIndex) {
            return;
          }
          pendingRequestsCount -= 1;
          notifyPageActivity();
        }));
        var _trackWindowOpen = trackWindowOpen(notifyPageActivity);
        var stopTrackingWindowOpen = _trackWindowOpen.stop;
        return function () {
          stopTrackingWindowOpen();
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
      WaitingForMoreClicks: 0,
      WaitingForClicksToStop: 1,
      Finalized: 2
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
        maxDurationBetweenClicksTimeout = setTimeout$1(dontAcceptMoreClick, MAX_DURATION_BETWEEN_CLICKS);
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

    var DEFAULT_PROGRAMMATIC_ACTION_NAME_ATTRIBUTE = 'data-guance-action-name';
    function getActionNameFromElement(element, userProgrammaticAttribute) {
      // Proceed to get the action name in two steps:
      // * first, get the name programmatically, explicitly defined by the user.
      // * then, use strategies that are known to return good results. Those strategies will be used on
      //   the element and a few parents, but it's likely that they won't succeed at all.
      // * if no name is found this way, use strategies returning less accurate names as a fallback.
      //   Those are much likely to succeed.
      return getActionNameFromElementProgrammatically(element, DEFAULT_PROGRAMMATIC_ACTION_NAME_ATTRIBUTE) || userProgrammaticAttribute && getActionNameFromElementProgrammatically(element, userProgrammaticAttribute) || getActionNameFromElementForStrategies(element, userProgrammaticAttribute, priorityStrategies) || getActionNameFromElementForStrategies(element, userProgrammaticAttribute, fallbackStrategies) || '';
    }
    function getActionNameFromElementProgrammatically(targetElement, programmaticAttribute) {
      var elementWithAttribute;
      // We don't use getActionNameFromElementForStrategies here, because we want to consider all parents,
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
    var priorityStrategies = [
    // associated LABEL text
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
    },
    // INPUT button (and associated) value
    function (element) {
      if (element.nodeName === 'INPUT') {
        var input = element;
        var type = input.getAttribute('type');
        if (type === 'button' || type === 'submit' || type === 'reset') {
          return input.value;
        }
      }
    },
    // BUTTON, LABEL or button-like element text
    function (element, userProgrammaticAttribute) {
      if (element.nodeName === 'BUTTON' || element.nodeName === 'LABEL' || element.getAttribute('role') === 'button') {
        return getTextualContent(element, userProgrammaticAttribute);
      }
    }, function (element) {
      return element.getAttribute('aria-label');
    },
    // associated element text designated by the aria-labelledby attribute
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
          return getTextualContent(ele, userProgrammaticAttribute);
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
    },
    // SELECT first OPTION text
    function (element, userProgrammaticAttribute) {
      if ('options' in element && element.options.length > 0) {
        return getTextualContent(element.options[0], userProgrammaticAttribute);
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
        for (var i = 0; i < strategies.length; i++) {
          var strategy = strategies[i];
          var name = strategy(element, userProgrammaticAttribute);
          if (typeof name === 'string') {
            var trimmedName = name.trim();
            if (trimmedName) {
              return truncate(normalizeWhitespace(trimmedName));
            }
          }
        }
        // Consider a FORM as a contextual limit to get the action name.  This is experimental and may
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
        }

        // remove the text of elements with programmatic attribute value
        removeTextFromElements('[' + DEFAULT_PROGRAMMATIC_ACTION_NAME_ATTRIBUTE + ']');
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

    /**
     * Stable attributes are attributes that are commonly used to identify parts of a UI (ex:
     * component). Those attribute values should not be generated randomly (hardcoded most of the time)
     * and stay the same across deploys. They are not necessarily unique across the document.
     */
    var STABLE_ATTRIBUTES = [DEFAULT_PROGRAMMATIC_ACTION_NAME_ATTRIBUTE,
    // Common test attributes (list provided by google recorder)
    'data-testid', 'data-test', 'data-qa', 'data-cy', 'data-test-id', 'data-qa-id', 'data-testing',
    // FullStory decorator attributes:
    'data-component', 'data-element', 'data-source-file'];
    // Selectors to use if they target a single element on the whole document. Those selectors are
    // considered as "stable" and uniquely identify an element regardless of the page state. If we find
    // one, we should consider the selector "complete" and stop iterating over ancestors.
    var GLOBALLY_UNIQUE_SELECTOR_GETTERS = [getStableAttributeSelector, getIDSelector];

    // Selectors to use if they target a single element among an element descendants. Those selectors
    // are more brittle than "globally unique" selectors and should be combined with ancestor selectors
    // to improve specificity.
    var UNIQUE_AMONG_CHILDREN_SELECTOR_GETTERS = [getStableAttributeSelector, getClassSelector, getTagNameSelector];
    function getSelectorFromElement(targetElement, actionNameAttribute) {
      var targetElementSelector = '';
      var element = targetElement;
      while (element && element.nodeName !== 'HTML') {
        var globallyUniqueSelector = findSelector(element, GLOBALLY_UNIQUE_SELECTOR_GETTERS, isSelectorUniqueGlobally, actionNameAttribute, targetElementSelector);
        if (globallyUniqueSelector) {
          return globallyUniqueSelector;
        }
        var uniqueSelectorAmongChildren = findSelector(element, UNIQUE_AMONG_CHILDREN_SELECTOR_GETTERS, isSelectorUniqueAmongSiblings, actionNameAttribute, targetElementSelector);
        targetElementSelector = uniqueSelectorAmongChildren || combineSelector(getPositionSelector(element), targetElementSelector);
        element = element.parentElement;
      }
      return targetElementSelector;
    }
    function isGeneratedValue(value) {
      // To compute the "URL path group", the backend replaces every URL path parts as a question mark
      // if it thinks the part is an identifier. The condition it uses is to checks whether a digit is
      // present.
      //
      // Here, we use the same strategy: if a the value contains a digit, we consider it generated. This
      // strategy might be a bit naive and fail in some cases, but there are many fallbacks to generate
      // CSS selectors so it should be fine most of the time. We might want to allow customers to
      // provide their own `isGeneratedValue` at some point.
      return /[0-9]/.test(value);
    }
    function getIDSelector(element) {
      if (element.id && !isGeneratedValue(element.id)) {
        return '#' + cssEscape(element.id);
      }
    }
    function getClassSelector(element) {
      if (element.tagName === 'BODY') {
        return;
      }
      if (element.classList.length > 0) {
        for (var i = 0; i < element.classList.length; i += 1) {
          var className = element.classList[i];
          if (isGeneratedValue(className)) {
            continue;
          }
          return cssEscape(element.tagName) + '.' + cssEscape(className);
        }
      }
    }
    function getTagNameSelector(element) {
      return cssEscape(element.tagName);
    }
    function getStableAttributeSelector(element, actionNameAttribute) {
      if (actionNameAttribute) {
        var selector = getAttributeSelector(actionNameAttribute);
        if (selector) {
          return selector;
        }
      }
      for (var i = 0; i < STABLE_ATTRIBUTES.length; i++) {
        var attributeName = STABLE_ATTRIBUTES[i];
        var selector = getAttributeSelector(attributeName);
        if (selector) {
          return selector;
        }
      }
      function getAttributeSelector(attributeName) {
        if (element.hasAttribute(attributeName)) {
          return cssEscape(element.tagName) + '[' + attributeName + '="' + cssEscape(element.getAttribute(attributeName)) + '"]';
        }
      }
    }
    function getPositionSelector(element) {
      var sibling = element.parentElement && element.parentElement.firstElementChild;
      var elementIndex = 1;
      while (sibling && sibling !== element) {
        if (sibling.tagName === element.tagName) {
          elementIndex += 1;
        }
        sibling = sibling.nextElementSibling;
      }
      var tagName = cssEscape(element.tagName);
      // 伪元素需要做特殊处理，没有nth-of-type选择器
      if (/^::/.test(tagName)) {
        return tagName;
      }
      return tagName + ':nth-of-type(' + elementIndex + ')';
    }
    function findSelector(element, selectorGetters, predicate, actionNameAttribute, childSelector) {
      for (var i = 0; i < selectorGetters.length; i++) {
        var selectorGetter = selectorGetters[i];
        var elementSelector = selectorGetter(element, actionNameAttribute);
        if (!elementSelector) {
          continue;
        }
        var fullSelector = combineSelector(elementSelector, childSelector);
        if (predicate(element, fullSelector)) {
          return fullSelector;
        }
      }
    }
    function isSelectorUniqueGlobally(element, selector) {
      return element.ownerDocument.body.querySelectorAll(selector).length === 1;
    }
    /**
     * Check whether the selector is unique among the element siblings. In other words, it returns true
     * if "ELEMENT_PARENT > SELECTOR" returns a single element.
     *
     * The result will be less accurate on browsers that don't support :scope (i. e. IE): it will check
     * for any element matching the selector contained in the parent (in other words,
     * "ELEMENT_PARENT SELECTOR" returns a single element), regardless of whether the selector is a
     * direct descendent of the element parent. This should not impact results too much: if it
     * inaccurately returns false, we'll just fall back to another strategy.
     */
    function isSelectorUniqueAmongSiblings(element, selector) {
      return element.parentElement.querySelectorAll(supportScopeSelector() ? combineSelector(':scope', selector) : selector).length === 1;
    }
    function combineSelector(parent, child) {
      return child ? parent + '>' + child : parent;
    }
    var supportScopeSelectorCache;
    function supportScopeSelector() {
      if (supportScopeSelectorCache === undefined) {
        try {
          document.querySelector(':scope');
          supportScopeSelectorCache = true;
        } catch (_unused) {
          supportScopeSelectorCache = false;
        }
      }
      return supportScopeSelectorCache;
    }

    function listenActionEvents(events) {
      var selectionEmptyAtPointerDown;
      var userActivity = {
        selection: false,
        input: false
      };
      var clickContext;
      var listeners = [addEventListener(window, DOM_EVENT.POINTER_DOWN, function (event) {
        if (isValidPointerEvent(event)) {
          selectionEmptyAtPointerDown = isSelectionEmpty();
          userActivity = {
            selection: false,
            input: false
          };
          clickContext = events.onPointerDown(event);
        }
      }, {
        capture: true
      }), addEventListener(window, DOM_EVENT.SELECTION_CHANGE, function () {
        if (!selectionEmptyAtPointerDown || !isSelectionEmpty()) {
          userActivity.selection = true;
        }
      }, {
        capture: true
      }), addEventListener(window, DOM_EVENT.POINTER_UP, function (event) {
        if (isValidPointerEvent(event) && clickContext) {
          // Use a scoped variable to make sure the value is not changed by other clicks
          var localUserActivity = userActivity;
          events.onPointerUp(clickContext, event, function () {
            return localUserActivity;
          });
          clickContext = undefined;
        }
      }, {
        capture: true
      }), addEventListener(window, DOM_EVENT.INPUT, function () {
        userActivity.input = true;
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
    function isValidPointerEvent(event) {
      return event.target instanceof Element &&
      // Only consider 'primary' pointer events for now. Multi-touch support could be implemented in
      // the future.
      event.isPrimary !== false;
    }

    var MIN_CLICKS_PER_SECOND_TO_CONSIDER_RAGE = 3;
    function computeFrustration(clicks, rageClick) {
      if (isRage(clicks)) {
        rageClick.addFrustration(FrustrationType.RAGE_CLICK);
        if (some(clicks, isDead)) {
          rageClick.addFrustration(FrustrationType.DEAD_CLICK);
        }
        if (rageClick.hasError()) {
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
        if (click.hasError()) {
          click.addFrustration(FrustrationType.ERROR_CLICK);
        }
        if (isDead(click) &&
        // Avoid considering clicks part of a double-click or triple-click selections as dead clicks
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
    var DEAD_CLICK_EXCLUDE_SELECTOR =
    // inputs that don't trigger a meaningful event like "input" when clicked, including textual
    // inputs (using a negative selector is shorter here)
    'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="range"]),' + 'textarea,' + 'select,' +
    // contenteditable and their descendants don't always trigger meaningful changes when manipulated
    '[contenteditable],' + '[contenteditable] *,' +
    // canvas, as there is no good way to detect activity occurring on them
    'canvas,' +
    // links that are interactive (have an href attribute) or any of their descendants, as they can
    // open a new tab or navigate to a hash without triggering a meaningful event
    'a[href],' + 'a[href] *';
    function isDead(click) {
      if (click.hasPageActivity() || click.getUserActivity().input) {
        return false;
      }
      return !elementMatches(click.event.target, DEAD_CLICK_EXCLUDE_SELECTOR);
    }

    // Maximum duration for click actions
    var CLICK_ACTION_MAX_DURATION = 10 * ONE_SECOND;
    var ACTION_CONTEXT_TIME_OUT_DELAY = 5 * ONE_MINUTE; // arbitrary

    function trackClickActions(lifeCycle, domMutationObservable, configuration) {
      var history = new ContextHistory(ACTION_CONTEXT_TIME_OUT_DELAY);
      var stopObservable = new Observable();
      var currentClickChain;
      lifeCycle.subscribe(LifeCycleEventType.SESSION_RENEWED, function () {
        history.reset();
      });
      lifeCycle.subscribe(LifeCycleEventType.VIEW_ENDED, stopClickChain);
      var _listenActionEvents = listenActionEvents({
        onPointerDown: function onPointerDown(pointerDownEvent) {
          return processPointerDown(configuration, lifeCycle, domMutationObservable, pointerDownEvent);
        },
        onPointerUp: function onPointerUp(data, startEvent, getUserActivity) {
          startClickAction(configuration, lifeCycle, domMutationObservable, history, stopObservable, appendClickToClickChain, data.clickActionBase, startEvent, getUserActivity, data.hadActivityOnPointerDown);
        }
      });
      var stopActionEventsListener = _listenActionEvents.stop;
      var actionContexts = {
        findActionId: function findActionId(startTime) {
          var allIds = history.findAll(startTime);
          if (allIds && allIds.length) {
            return allIds[allIds.length - 1];
          }
          return undefined;
        },
        findAllActionId: function findAllActionId(startTime) {
          return history.findAll(startTime);
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
    }
    function processPointerDown(configuration, lifeCycle, domMutationObservable, pointerDownEvent) {
      var clickActionBase = computeClickActionBase(pointerDownEvent, configuration.actionNameAttribute);
      var _hadActivityOnPointerDown = false;
      waitPageActivityEnd(lifeCycle, domMutationObservable, configuration, function (pageActivityEndEvent) {
        _hadActivityOnPointerDown = pageActivityEndEvent.hadActivity;
      }, PAGE_ACTIVITY_VALIDATION_DELAY);
      return {
        clickActionBase: clickActionBase,
        hadActivityOnPointerDown: function hadActivityOnPointerDown() {
          return _hadActivityOnPointerDown;
        }
      };
    }
    function startClickAction(configuration, lifeCycle, domMutationObservable, history, stopObservable, appendClickToClickChain, clickActionBase, startEvent, getUserActivity, hadActivityOnPointerDown) {
      var click = newClick(lifeCycle, history, getUserActivity, clickActionBase, startEvent);
      appendClickToClickChain(click);
      var _waitPageActivityEnd = waitPageActivityEnd(lifeCycle, domMutationObservable, configuration, function (pageActivityEndEvent) {
        if (pageActivityEndEvent.hadActivity && pageActivityEndEvent.end < click.startClocks.timeStamp) {
          // If the clock is looking weird, just discard the click
          click.discard();
        } else {
          if (pageActivityEndEvent.hadActivity) {
            click.stop(pageActivityEndEvent.end);
          } else if (hadActivityOnPointerDown()) {
            click.stop(
            // using the click start as activity end, so the click will have some activity but its
            // duration will be 0 (as the activity started before the click start)
            click.startClocks.timeStamp);
          } else {
            click.stop();
          }
        }
      }, CLICK_ACTION_MAX_DURATION);
      var stopWaitPageActivityEnd = _waitPageActivityEnd.stop;
      var viewEndedSubscription = lifeCycle.subscribe(LifeCycleEventType.VIEW_ENDED, function (data) {
        click.stop(data.endClocks.timeStamp);
      });
      var stopSubscription = stopObservable.subscribe(function () {
        click.stop();
      });
      click.stopObservable.subscribe(function () {
        viewEndedSubscription.unsubscribe();
        stopWaitPageActivityEnd();
        stopSubscription.unsubscribe();
      });
    }
    function computeClickActionBase(event, actionNameAttribute) {
      var rect = event.target.getBoundingClientRect();
      return {
        type: ActionType.CLICK,
        target: {
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          selector: getSelectorFromElement(event.target, actionNameAttribute)
        },
        position: {
          x: Math.round(event.clientX - rect.left),
          y: Math.round(event.clientY - rect.top)
        },
        name: getActionNameFromElement(event.target, actionNameAttribute)
      };
    }
    var ClickStatus = {
      // Initial state, the click is still ongoing.
      ONGOING: 0,
      // The click is no more ongoing but still needs to be validated or discarded.
      STOPPED: 1,
      // Final state, the click has been stopped and validated or discarded.
      FINALIZED: 2
    };
    function newClick(lifeCycle, history, getUserActivity, clickActionBase, startEvent) {
      var id = UUID();
      var startClocks = clocksNow();
      var historyEntry = history.add(id, startClocks.relative);
      var eventCountsSubscription = trackEventCounts({
        lifeCycle: lifeCycle,
        isChildEvent: function isChildEvent(event) {
          return event.action !== undefined && (isArray(event.action.ids) ? includes(event.action.ids, id) : event.action.ids === id);
        }
      });
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
        event: startEvent,
        stop: stop,
        stopObservable: stopObservable,
        hasError: function hasError() {
          return eventCountsSubscription.eventCounts.errorCount > 0;
        },
        hasPageActivity: function hasPageActivity() {
          return activityEndTime !== undefined;
        },
        getUserActivity: getUserActivity,
        addFrustration: function addFrustration(frustrationType) {
          frustrationTypes.push(frustrationType);
        },
        startClocks: startClocks,
        isStopped: function isStopped() {
          return status === ClickStatus.STOPPED || status === ClickStatus.FINALIZED;
        },
        clone: function clone() {
          return newClick(lifeCycle, history, getUserActivity, clickActionBase, startEvent);
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
              resourceCount: resourceCount,
              errorCount: errorCount,
              longTaskCount: longTaskCount
            },
            events: isNullUndefinedDefaultValue(domEvents, [startEvent]),
            event: startEvent
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

    function startActionCollection(lifeCycle, domMutationObservable, configuration, pageStateHistory) {
      lifeCycle.subscribe(LifeCycleEventType.AUTO_ACTION_COMPLETED, function (action) {
        lifeCycle.notify(LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, processAction(action, pageStateHistory));
      });
      var actionContexts = {
        findActionId: noop,
        findAllActionId: noop
      };
      if (configuration.trackUserInteractions) {
        actionContexts = trackClickActions(lifeCycle, domMutationObservable, configuration).actionContexts;
      }
      return {
        actionContexts: actionContexts,
        addAction: function addAction(action, savedCommonContext) {
          lifeCycle.notify(LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, extend({
            savedCommonContext: savedCommonContext
          }, processAction(action, pageStateHistory)));
        }
      };
    }
    function processAction(action, pageStateHistory) {
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
        _gc: {
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
        type: RumEventType.ACTION,
        view: {
          in_foreground: pageStateHistory.isInActivePageStateAt(action.startClocks.relative)
        }
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

    function startRumBatch(configuration, lifeCycle, telemetryEventObservable, reportError, pageExitObservable, sessionExpireObservable) {
      var batch = makeRumBatch(configuration, reportError, pageExitObservable, sessionExpireObservable);
      lifeCycle.subscribe(LifeCycleEventType.RUM_EVENT_COLLECTED, function (serverRumEvent) {
        if (serverRumEvent.type === RumEventType.VIEW) {
          batch.upsert(serverRumEvent, serverRumEvent.view.id);
        } else {
          batch.add(serverRumEvent);
        }
      });
      telemetryEventObservable.subscribe(function (event) {
        batch.add(event);
      });
    }
    function makeRumBatch(configuration, reportError, pageExitObservable, sessionExpireObservable) {
      var rumBatch = createRumBatch(configuration.rumEndpoint);
      var primaryBatch = rumBatch.batch;
      var primaryFlushController = rumBatch.flushController;
      function createRumBatch(endpointUrl) {
        var flushController = createFlushController({
          messagesLimit: configuration.batchMessagesLimit,
          bytesLimit: configuration.batchBytesLimit,
          durationLimit: configuration.flushTimeout,
          pageExitObservable: pageExitObservable,
          sessionExpireObservable: sessionExpireObservable
        });
        var batch = new Batch(createHttpRequest(endpointUrl, configuration.batchBytesLimit, configuration.sendContentTypeByJson, reportError), flushController, configuration.messageBytesLimit, configuration.sendContentTypeByJson);
        return {
          batch: batch,
          flushController: flushController
        };
      }
      return {
        flushObservable: primaryFlushController.flushObservable,
        add: function add(message) {
          primaryBatch.add(message);
        },
        upsert: function upsert(message, key) {
          primaryBatch.upsert(message, key);
        }
      };
    }

    function startRumEventBridge(lifeCycle) {
      var bridge = getEventBridge();
      lifeCycle.subscribe(LifeCycleEventType.RUM_EVENT_COLLECTED, function (serverRumEvent) {
        var data = processedMessageByDataMap(serverRumEvent).rowData;
        bridge.send('rum', data);
      });
    }

    var SessionType = {
      SYNTHETICS: 'synthetics',
      USER: 'user'
    };
    var VIEW_MODIFIABLE_FIELD_PATHS = {
      'view.url': 'string',
      'view.referrer': 'string'
    };
    var USER_CUSTOMIZABLE_FIELD_PATHS = {
      context: 'object'
    };
    var modifiableFieldPathsByEvent = {};
    function startRumAssembly(configuration, lifeCycle, sessionManager, userSessionManager, viewContexts, urlContexts, actionContexts, displayContext, buildCommonContext, reportError) {
      modifiableFieldPathsByEvent[RumEventType.VIEW] = VIEW_MODIFIABLE_FIELD_PATHS;
      modifiableFieldPathsByEvent[RumEventType.ERROR] = assign({
        'error.message': 'string',
        'error.stack': 'string',
        'error.resource.url': 'string'
      }, USER_CUSTOMIZABLE_FIELD_PATHS, VIEW_MODIFIABLE_FIELD_PATHS);
      modifiableFieldPathsByEvent[RumEventType.RESOURCE] = assign({
        'resource.url': 'string'
      }, USER_CUSTOMIZABLE_FIELD_PATHS, VIEW_MODIFIABLE_FIELD_PATHS);
      modifiableFieldPathsByEvent[RumEventType.ACTION] = assign({
        'action.target.name': 'string'
      }, USER_CUSTOMIZABLE_FIELD_PATHS, VIEW_MODIFIABLE_FIELD_PATHS);
      modifiableFieldPathsByEvent[RumEventType.LONG_TASK] = assign({}, USER_CUSTOMIZABLE_FIELD_PATHS, VIEW_MODIFIABLE_FIELD_PATHS);
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
          var actionIds = actionContexts.findAllActionId(startTime);
          var commonContext = savedCommonContext || buildCommonContext();
          var rumContext = {
            _gc: {
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
              is_signin: 'F',
              is_login: false
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
              id: actionId,
              ids: actionIds
            } : undefined,
            display: displayContext.get()
          };
          var rumEvent = extend2Lev(rumContext, viewContext, rawRumEvent);
          var serverRumEvent = withSnakeCaseKeys(rumEvent);
          var context = extend2Lev({}, commonContext.context, customerContext);
          if (!isEmptyObject(context)) {
            serverRumEvent.context = context;
          }
          if (!('has_replay' in serverRumEvent.session)) {
            serverRumEvent.session.has_replay = commonContext.hasReplay;
          }
          if (!isEmptyObject(commonContext.user)) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            serverRumEvent.user = extend2Lev({
              // id: session.getAnonymousID(),
              is_signin: 'T',
              is_login: true
            }, commonContext.user);
          }
          if (shouldSend(serverRumEvent, configuration.beforeSend, domainContext, eventRateLimiters)) {
            if (isEmptyObject(serverRumEvent.context)) {
              delete serverRumEvent.context;
            }
            lifeCycle.notify(LifeCycleEventType.RUM_EVENT_COLLECTED, serverRumEvent);
          }
        }
      });
    }
    function shouldSend(event, beforeSend, domainContext, eventRateLimiters) {
      if (beforeSend) {
        var result = limitModification(event, modifiableFieldPathsByEvent[event.type], function (event) {
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

    var viewportObservable;
    function initViewportObservable() {
      if (!viewportObservable) {
        viewportObservable = createViewportObservable();
      }
      return viewportObservable;
    }
    function createViewportObservable() {
      var observable = new Observable(function () {
        var _throttledUpdateDimension = throttle(function () {
          observable.notify(getViewportDimension());
        }, 200);
        var updateDimension = _throttledUpdateDimension.throttled;
        return addEventListener(window, DOM_EVENT.RESIZE, updateDimension, {
          capture: true,
          passive: true
        }).stop;
      });
      return observable;
    }

    // excludes the width and height of any rendered classic scrollbar that is fixed to the visual viewport
    function getViewportDimension() {
      var visual = window.visualViewport;
      if (visual) {
        return {
          width: Number(visual.width * visual.scale),
          height: Number(visual.height * visual.scale)
        };
      }
      return {
        width: Number(window.innerWidth || 0),
        height: Number(window.innerHeight || 0)
      };
    }

    function startDisplayContext() {
      var viewport = getViewportDimension();
      var unsubscribeViewport = initViewportObservable().subscribe(function (viewportDimension) {
        viewport = viewportDimension;
      }).unsubscribe;
      return {
        get: function get() {
          return {
            viewport: viewport
          };
        },
        stop: unsubscribeViewport
      };
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
            var actionIds = actionContexts.findAllActionId(startTime);
            return {
              application: {
                id: applicationId
              },
              session: {
                id: session.id
              },
              userAction: actionId ? {
                id: actionId,
                ids: actionIds
              } : undefined,
              view: {
                id: viewContext.id,
                name: viewContext.name,
                url: urlContext.url,
                referrer: urlContext.referrer,
                host: urlContext.host,
                path: urlContext.path,
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
        var path = data.location.pathname;
        var hash = data.location.hash;
        if (path === '/' && hash && !isHashAnAnchor(hash)) {
          path = '/' + getPathFromHash(hash);
        }
        return {
          url: data.url,
          referrer: data.referrer,
          host: data.location.host,
          path: path,
          pathGroup: replaceNumberCharByPath(path),
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

    function buildCommonContext(globalContextManager, userContextManager, recorderApi) {
      return {
        context: globalContextManager.getContext(),
        user: userContextManager.getContext(),
        hasReplay: recorderApi.isRecording() ? true : undefined
      };
    }

    // Arbitrary value to cap number of element for memory consumption in the browser
    var MAX_PAGE_STATE_ENTRIES = 4000;
    // Arbitrary value to cap number of element for backend & to save bandwidth
    var MAX_PAGE_STATE_ENTRIES_SELECTABLE = 500;
    var PAGE_STATE_CONTEXT_TIME_OUT_DELAY = SESSION_TIME_OUT_DELAY;
    var PageState = {
      ACTIVE: 'active',
      PASSIVE: 'passive',
      HIDDEN: 'hidden',
      FROZEN: 'frozen',
      TERMINATED: 'terminated'
    };
    function startPageStateHistory(maxPageStateEntriesSelectable) {
      if (maxPageStateEntriesSelectable === undefined) {
        maxPageStateEntriesSelectable = MAX_PAGE_STATE_ENTRIES_SELECTABLE;
      }
      var pageStateHistory = new ContextHistory(PAGE_STATE_CONTEXT_TIME_OUT_DELAY, MAX_PAGE_STATE_ENTRIES);
      var currentPageState;
      addPageState(getPageState(), relativeNow());
      var _addEventListeners = addEventListeners(window, [DOM_EVENT.PAGE_SHOW, DOM_EVENT.FOCUS, DOM_EVENT.BLUR, DOM_EVENT.VISIBILITY_CHANGE, DOM_EVENT.RESUME, DOM_EVENT.FREEZE, DOM_EVENT.PAGE_HIDE], function (event) {
        // Only get events fired by the browser to avoid false currentPageState changes done with custom events
        if (event.isTrusted) {
          addPageState(computePageState(event), event.timeStamp);
        }
      }, {
        capture: true
      });
      var stopEventListeners = _addEventListeners.stop;
      function addPageState(nextPageState, startTime) {
        if (startTime === undefined) {
          startTime = relativeNow();
        }
        if (nextPageState === currentPageState) {
          return;
        }
        currentPageState = nextPageState;
        pageStateHistory.closeActive(startTime);
        pageStateHistory.add({
          state: currentPageState,
          startTime: startTime
        }, startTime);
      }
      return {
        findAll: function findAll(eventStartTime, duration) {
          var pageStateEntries = pageStateHistory.findAll(eventStartTime, duration);
          if (pageStateEntries.length === 0) {
            return;
          }
          var pageStateServerEntries = [];
          // limit the number of entries to return
          var limit = Math.max(0, pageStateEntries.length - maxPageStateEntriesSelectable);

          // loop page state entries backward to return the selected ones in desc order
          for (var index = pageStateEntries.length - 1; index >= limit; index--) {
            var pageState = pageStateEntries[index];
            // compute the start time relative to the event start time (ex: to be relative to the view start time)
            var relativeStartTime = elapsed(eventStartTime, pageState.startTime);
            pageStateServerEntries.push({
              state: pageState.state,
              start: toServerDuration(relativeStartTime)
            });
          }
          return pageStateServerEntries;
        },
        isInActivePageStateAt: function isInActivePageStateAt(startTime) {
          var pageStateEntry = pageStateHistory.find(startTime);
          return pageStateEntry !== undefined && pageStateEntry.state === PageState.ACTIVE;
        },
        addPageState: addPageState,
        stop: function stop() {
          stopEventListeners();
          pageStateHistory.stop();
        }
      };
    }
    function computePageState(event) {
      if (event.type === DOM_EVENT.FREEZE) {
        return PageState.FROZEN;
      } else if (event.type === DOM_EVENT.PAGE_HIDE) {
        return event.persisted ? PageState.FROZEN : PageState.TERMINATED;
      }
      return getPageState();
    }
    function getPageState() {
      if (document.visibilityState === 'hidden') {
        return PageState.HIDDEN;
      }
      if (document.hasFocus()) {
        return PageState.ACTIVE;
      }
      return PageState.PASSIVE;
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

    function trackReportError(configuration, errorObservable) {
      var subscription = initReportObservable(configuration, [(RawReportType.intervention)]).subscribe(function (reportError) {
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

    function startErrorCollection(lifeCycle, configuration, pageStateHistory) {
      var errorObservable = new Observable();
      trackConsoleError(errorObservable);
      trackRuntimeError(errorObservable);
      trackReportError(configuration, errorObservable);
      errorObservable.subscribe(function (error) {
        lifeCycle.notify(LifeCycleEventType.RAW_ERROR_COLLECTED, {
          error: error
        });
      });
      return doStartErrorCollection(lifeCycle, pageStateHistory);
    }
    function doStartErrorCollection(lifeCycle, pageStateHistory) {
      lifeCycle.subscribe(LifeCycleEventType.RAW_ERROR_COLLECTED, function (error) {
        lifeCycle.notify(LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, assign({
          customerContext: error.customerContext,
          savedCommonContext: error.savedCommonContext
        }, processError(error.error, pageStateHistory)));
      });
      return {
        addError: function addError(providedError, savedCommonContext) {
          var error = providedError.error;
          var stackTrace = error instanceof Error ? computeStackTrace(error) : undefined;
          var rawError = computeRawError({
            stackTrace: stackTrace,
            originalError: error,
            handlingStack: providedError.handlingStack,
            startClocks: providedError.startClocks,
            nonErrorPrefix: NonErrorPrefix.PROVIDED,
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
    function processError(error, pageStateHistory) {
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
        type: RumEventType.ERROR,
        view: {
          in_foreground: pageStateHistory.isInActivePageStateAt(error.startClocks.relative)
        }
      };
      return {
        rawRumEvent: rawRumEvent,
        startTime: error.startClocks.relative,
        domainContext: {
          error: error.originalError
        }
      };
    }

    var TIMING_MAXIMUM_DELAY = 10 * ONE_MINUTE;
    function trackFirstContentfulPaint(lifeCycle, firstHidden, callback) {
      var subscribe = lifeCycle.subscribe(LifeCycleEventType.PERFORMANCE_ENTRIES_COLLECTED, function (entries) {
        var fcpEntry = find(entries, function (entry) {
          return entry.entryType === 'paint' && entry.name === 'first-contentful-paint' && entry.startTime < firstHidden.geTimeStamp() && entry.startTime < TIMING_MAXIMUM_DELAY;
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
     * Track the first input occurring during the initial View to return:
     * - First Input Delay
     * - First Input Time
     * Callback is called at most one time.
     * Documentation: https://web.dev/fid/
     * Reference implementation: https://github.com/GoogleChrome/web-vitals/blob/master/src/getFID.ts
     */
    function trackFirstInput(lifeCycle, configuration, firstHidden, callback) {
      var subscribe = lifeCycle.subscribe(LifeCycleEventType.PERFORMANCE_ENTRIES_COLLECTED, function (entries) {
        var firstInputEntry = find(entries, function (entry) {
          return entry.entryType === 'first-input' && entry.startTime < firstHidden.geTimeStamp();
        });
        if (firstInputEntry) {
          var firstInputDelay = elapsed(firstInputEntry.startTime, firstInputEntry.processingStart);
          var firstInputTargetSelector;
          if (firstInputEntry.target && isElementNode(firstInputEntry.target)) {
            firstInputTargetSelector = getSelectorFromElement(firstInputEntry.target, configuration.actionNameAttribute);
          }
          callback({
            // Ensure firstInputDelay to be positive, see
            // https://bugs.chromium.org/p/chromium/issues/detail?id=1185815
            delay: firstInputDelay >= 0 ? firstInputDelay : 0,
            time: firstInputEntry.startTime,
            targetSelector: firstInputTargetSelector
          });
        }
      });
      return {
        stop: subscribe.unsubscribe
      };
    }

    function trackNavigationTimings(lifeCycle, callback) {
      var subscribe = lifeCycle.subscribe(LifeCycleEventType.PERFORMANCE_ENTRIES_COLLECTED, function (entries) {
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
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
              domContentLoadedEventStart: entry.domContentLoadedEventStart,
              // In some cases the value reported is negative or is larger
              // than the current page time. Ignore these cases:
              // https://github.com/GoogleChrome/web-vitals/issues/137
              // https://github.com/GoogleChrome/web-vitals/issues/162
              firstByte: entry.responseStart >= 0 && entry.responseStart <= relativeNow() ? entry.responseStart : undefined
            });
          }
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
    // It happens in some cases like sleep mode or some browser implementations
    var LCP_MAXIMUM_DELAY = 10 * ONE_MINUTE;
    function trackLargestContentfulPaint(lifeCycle, configuration, firstHidden, eventTarget, callback) {
      // Ignore entries that come after the first user interaction.  According to the documentation, the
      // browser should not send largest-contentful-paint entries after a user interact with the page,
      // but the web-vitals reference implementation uses this as a safeguard.
      var firstInteractionTimestamp = Infinity;
      var _addEventListeners = addEventListeners(eventTarget, [DOM_EVENT.POINTER_DOWN, DOM_EVENT.KEY_DOWN], function (event) {
        firstInteractionTimestamp = event.timeStamp;
      }, {
        capture: true,
        once: true
      });
      var stopEventListener = _addEventListeners.stop;
      var subscribe = lifeCycle.subscribe(LifeCycleEventType.PERFORMANCE_ENTRIES_COLLECTED, function (entries) {
        var lcpEntry = findLast(entries, function (entry) {
          return entry.entryType === 'largest-contentful-paint' && entry.startTime < firstInteractionTimestamp && entry.startTime < firstHidden.geTimeStamp() && entry.startTime < LCP_MAXIMUM_DELAY;
        });
        if (lcpEntry) {
          var lcpTargetSelector;
          if (lcpEntry.element) {
            lcpTargetSelector = getSelectorFromElement(lcpEntry.element, configuration.actionNameAttribute);
          }
          callback({
            value: lcpEntry.startTime,
            targetSelector: lcpTargetSelector
          });
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

    function trackFirstHidden(eventTarget) {
      if (typeof eventTarget === 'undefined') {
        eventTarget = window;
      }
      var timeStamp;
      var stopListeners;
      if (document.visibilityState === 'hidden') {
        timeStamp = 0;
      } else {
        timeStamp = Infinity;
        var stopListeners = addEventListeners(eventTarget, [DOM_EVENT.PAGE_HIDE, DOM_EVENT.VISIBILITY_CHANGE], function (event) {
          if (event.type === DOM_EVENT.PAGE_HIDE || document.visibilityState === 'hidden') {
            timeStamp = event.timeStamp;
            stopListeners();
          }
        }, {
          capture: true
        }).stop;
      }
      return {
        geTimeStamp: function geTimeStamp() {
          return timeStamp;
        },
        stop: function stop() {
          stopListeners && stopListeners();
        }
      };
    }

    function trackInitialViewMetrics(lifeCycle, configuration, setLoadEvent, scheduleViewUpdate) {
      var initialViewMetrics = {};
      var _trackNavigationTimings = trackNavigationTimings(lifeCycle, function (navigationTimings) {
        setLoadEvent(navigationTimings.loadEvent);
        initialViewMetrics.navigationTimings = navigationTimings;
        scheduleViewUpdate();
      });
      var firstHidden = trackFirstHidden();
      var stopNavigationTracking = _trackNavigationTimings.stop;
      var _trackFirstContentfulPaint = trackFirstContentfulPaint(lifeCycle, firstHidden, function (firstContentfulPaint) {
        initialViewMetrics.firstContentfulPaint = firstContentfulPaint;
        scheduleViewUpdate();
      });
      var stopFCPTracking = _trackFirstContentfulPaint.stop;
      var _trackLargestContentfulPaint = trackLargestContentfulPaint(lifeCycle, configuration, firstHidden, window, function (largestContentfulPaint) {
        initialViewMetrics.largestContentfulPaint = largestContentfulPaint;
        scheduleViewUpdate();
      });
      var stopLCPTracking = _trackLargestContentfulPaint.stop;
      var _trackFirstInput = trackFirstInput(lifeCycle, configuration, firstHidden, function (firstInput) {
        initialViewMetrics.firstInput = firstInput;
        scheduleViewUpdate();
      });
      var stopFIDTracking = _trackFirstInput.stop;
      function stop() {
        stopNavigationTracking();
        stopFCPTracking();
        stopLCPTracking();
        stopFIDTracking();
        firstHidden.stop();
      }
      return {
        stop: stop,
        initialViewMetrics: initialViewMetrics
      };
    }

    /** Arbitrary scroll throttle duration */
    var THROTTLE_SCROLL_DURATION = ONE_SECOND;
    function trackScrollMetrics(configuration, viewStart, callback, scrollValues) {
      if (scrollValues === undefined) {
        scrollValues = createScrollValuesObservable();
      }
      var maxScrollDepth = 0;
      var maxScrollHeight = 0;
      var maxScrollHeightTime = 0;
      var subscription = scrollValues.subscribe(function (data) {
        var scrollDepth = data.scrollDepth;
        var scrollTop = data.scrollTop;
        var scrollHeight = data.scrollHeight;
        var shouldUpdate = false;
        if (scrollDepth > maxScrollDepth) {
          maxScrollDepth = scrollDepth;
          shouldUpdate = true;
        }
        if (scrollHeight > maxScrollHeight) {
          maxScrollHeight = scrollHeight;
          var now = relativeNow();
          maxScrollHeightTime = elapsed(viewStart.relative, now);
          shouldUpdate = true;
        }
        if (shouldUpdate) {
          callback({
            maxDepth: Math.min(maxScrollDepth, maxScrollHeight),
            maxDepthScrollTop: scrollTop,
            maxScrollHeight: maxScrollHeight,
            maxScrollHeightTime: maxScrollHeightTime
          });
        }
      });
      return {
        stop: function stop() {
          return subscription.unsubscribe();
        }
      };
    }
    function computeScrollValues() {
      var scrollTop = getScrollY();
      var viewport = getViewportDimension();
      var height = viewport.height;
      var scrollHeight = Math.round((document.scrollingElement || document.documentElement).scrollHeight);
      var scrollDepth = Math.round(height + scrollTop);
      return {
        scrollHeight: scrollHeight,
        scrollDepth: scrollDepth,
        scrollTop: scrollTop
      };
    }
    function createScrollValuesObservable(configuration, throttleDuration) {
      if (throttleDuration === undefined) {
        throttleDuration = THROTTLE_SCROLL_DURATION;
      }
      var observable = new Observable(function () {
        function notify() {
          observable.notify(computeScrollValues());
        }
        if (window.ResizeObserver) {
          var throttledNotify = throttle(notify, throttleDuration, {
            leading: false,
            trailing: true
          });
          var observerTarget = document.scrollingElement || document.documentElement;
          var resizeObserver = new ResizeObserver(monitor(throttledNotify.throttled));
          resizeObserver.observe(observerTarget);
          var eventListener = addEventListener(window, DOM_EVENT.SCROLL, throttledNotify.throttled, {
            passive: true
          });
          return function () {
            throttledNotify.cancel();
            resizeObserver.unobserve(observerTarget);
            eventListener.stop();
          };
        }
      });
      return observable;
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
      function stopEndCallback() {
        if (loadingTimeCandidates.length > 0) {
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
      var _stop = _waitPageActivityEnd.stop;
      return {
        setLoadEvent: function setLoadEvent(loadEvent) {
          if (isWaitingForLoadEvent) {
            isWaitingForLoadEvent = false;
            loadingTimeCandidates.push(loadEvent);
            invokeCallbackIfAllCandidatesAreReceived();
          }
        },
        stop: function stop() {
          _stop();
          stopEndCallback();
        }
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
    function trackCumulativeLayoutShift(lifeCycle, configuration, callback) {
      if (!isLayoutShiftSupported()) {
        return {
          stop: noop
        };
      }
      var maxClsValue = 0;
      callback({
        value: 0
      });
      var window = slidingSessionWindow();
      var _subscribe = lifeCycle.subscribe(LifeCycleEventType.PERFORMANCE_ENTRIES_COLLECTED, function (entries) {
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            window.update(entry);
            if (window.value() > maxClsValue) {
              maxClsValue = window.value();
              var cls = round(maxClsValue, 4);
              var clsTarget = window.largestLayoutShiftTarget();
              var cslTargetSelector;
              if (clsTarget) {
                cslTargetSelector = getSelectorFromElement(clsTarget, configuration.actionNameAttribute);
              }
              callback({
                value: cls,
                targetSelector: cslTargetSelector
              });
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
      var largestLayoutShift = 0;
      var _largestLayoutShiftTarget;
      var _largestLayoutShiftTime;
      return {
        update: function update(entry) {
          var shouldCreateNewWindow = startTime === undefined || entry.startTime - endTime >= ONE_SECOND || entry.startTime - startTime >= 5 * ONE_SECOND;
          if (shouldCreateNewWindow) {
            startTime = endTime = entry.startTime;
            _value = entry.value;
            largestLayoutShift = 0;
            _largestLayoutShiftTarget = undefined;
          } else {
            _value += entry.value;
            endTime = entry.startTime;
          }
          if (entry.value > largestLayoutShift) {
            largestLayoutShift = entry.value;
            _largestLayoutShiftTime = entry.startTime;
            if (entry.sources && entry.sources.length) {
              var findTarget = find(entry.sources, function (s) {
                return !!s.node && isElementNode(s.node);
              });
              if (findTarget) {
                _largestLayoutShiftTarget = findTarget.node;
              }
            } else {
              _largestLayoutShiftTarget = undefined;
            }
          }
        },
        value: function value() {
          return _value;
        },
        largestLayoutShiftTarget: function largestLayoutShiftTarget() {
          return _largestLayoutShiftTarget;
        },
        largestLayoutShiftTime: function largestLayoutShiftTime() {
          return _largestLayoutShiftTime;
        }
      };
    }

    /**
     * Check whether `layout-shift` is supported by the browser.
     */
    function isLayoutShiftSupported() {
      return supportPerformanceTimingEvent('layout-shift');
    }

    /**
     * performance.interactionCount polyfill
     *
     * The interactionCount is an integer which counts the total number of distinct user interactions,
     * for which there was a unique interactionId.
     *
     * The interactionCount polyfill is an estimate based on a convention specific to Chrome. Cf: https://github.com/GoogleChrome/web-vitals/pull/213
     * This is currently not an issue as the polyfill is only used for INP which is currently only supported on Chrome.
     * Hopefully when/if other browsers will support INP, they will also implement performance.interactionCount at the same time, so we won't need that polyfill.
     *
     * Reference implementation: https://github.com/GoogleChrome/web-vitals/blob/main/src/lib/polyfills/interactionCountPolyfill.ts
     */
    var observer;
    var interactionCountEstimate = 0;
    var minKnownInteractionId = Infinity;
    var maxKnownInteractionId = 0;
    function initInteractionCountPolyfill() {
      if ('interactionCount' in performance || observer) {
        return;
      }
      observer = new window.PerformanceObserver(monitor(function (entries) {
        entries.getEntries().forEach(function (e) {
          var entry = e;
          if (entry.interactionId) {
            minKnownInteractionId = Math.min(minKnownInteractionId, entry.interactionId);
            maxKnownInteractionId = Math.max(maxKnownInteractionId, entry.interactionId);
            interactionCountEstimate = (maxKnownInteractionId - minKnownInteractionId) / 7 + 1;
          }
        });
      }));
      observer.observe({
        type: 'event',
        buffered: true,
        durationThreshold: 0
      });
    }

    /**
     * Returns the `interactionCount` value using the native API (if available)
     * or the polyfill estimate in this module.
     */
    var getInteractionCount = function getInteractionCount() {
      return observer ? interactionCountEstimate : window.performance.interactionCount || 0;
    };

    function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
    function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
    function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

    // Arbitrary value to prevent unnecessary memory usage on views with lots of interactions.
    var MAX_INTERACTION_ENTRIES = 10;
    var MAX_INP_VALUE = 1 * ONE_MINUTE;

    /**
     * Track the interaction to next paint (INP).
     * To avoid outliers, return the p98 worst interaction of the view.
     * Documentation: https://web.dev/inp/
     * Reference implementation: https://github.com/GoogleChrome/web-vitals/blob/main/src/onINP.ts
     */
    function trackInteractionToNextPaint(configuration, viewStart, viewLoadingType, lifeCycle) {
      if (!isInteractionToNextPaintSupported()) {
        return {
          getInteractionToNextPaint: function getInteractionToNextPaint() {
            return undefined;
          },
          setViewEnd: noop,
          stop: noop
        };
      }
      var _trackViewInteractionCount = trackViewInteractionCount(viewLoadingType);
      var getViewInteractionCount = _trackViewInteractionCount.getViewInteractionCount;
      var stopViewInteractionCount = _trackViewInteractionCount.stopViewInteractionCount;
      var viewEnd = Infinity;
      var longestInteractions = trackLongestInteractions(getViewInteractionCount);
      var interactionToNextPaint = -1;
      var interactionToNextPaintTargetSelector;
      var telemetryCollected = false;
      var subscribe = lifeCycle.subscribe(LifeCycleEventType.PERFORMANCE_ENTRIES_COLLECTED, function (entries) {
        var _iterator = _createForOfIteratorHelper$1(entries),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;
            if ((entry.entryType === 'event' || entry.entryType === 'first-input') && entry.interactionId && entry.startTime >= viewStart && entry.startTime <= viewEnd) {
              longestInteractions.process(entry);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        var newInteraction = longestInteractions.estimateP98Duration();
        if (newInteraction) {
          interactionToNextPaint = newInteraction.duration;
          if (interactionToNextPaint > 10 * ONE_MINUTE && !telemetryCollected) {
            var _newInteraction$targe;
            telemetryCollected = true;
            addTelemetryDebug('INP outlier', {
              inp: interactionToNextPaint,
              interaction: {
                timeFromViewStart: elapsed(viewStart, newInteraction.startTime),
                duration: newInteraction.duration,
                startTime: newInteraction.startTime,
                processingStart: newInteraction.processingStart,
                processingEnd: newInteraction.processingEnd,
                interactionId: newInteraction.interactionId,
                name: newInteraction.name,
                targetNodeName: (_newInteraction$targe = newInteraction.target) === null || _newInteraction$targe === void 0 ? void 0 : _newInteraction$targe.nodeName
              }
            });
          }
          if (newInteraction.target && isElementNode(newInteraction.target)) {
            interactionToNextPaintTargetSelector = getSelectorFromElement(newInteraction.target, configuration.actionNameAttribute);
          } else {
            interactionToNextPaintTargetSelector = undefined;
          }
        }
      });
      return {
        getInteractionToNextPaint: function getInteractionToNextPaint() {
          // If no INP duration where captured because of the performanceObserver 40ms threshold
          // but the view interaction count > 0 then report 0
          if (interactionToNextPaint >= 0) {
            return {
              value: Math.min(interactionToNextPaint, MAX_INP_VALUE),
              targetSelector: interactionToNextPaintTargetSelector
            };
          } else if (getViewInteractionCount()) {
            return {
              value: 0
            };
          }
        },
        setViewEnd: function setViewEnd(viewEndTime) {
          viewEnd = viewEndTime;
          stopViewInteractionCount();
        },
        stop: subscribe.unsubscribe
      };
    }
    function trackLongestInteractions(getViewInteractionCount) {
      var longestInteractions = [];
      function sortAndTrimLongestInteractions() {
        longestInteractions.sort(function (a, b) {
          return b.duration - a.duration;
        }).splice(MAX_INTERACTION_ENTRIES);
      }
      return {
        /**
         * Process the performance entry:
         * - if its duration is long enough, add the performance entry to the list of worst interactions
         * - if an entry with the same interaction id exists and its duration is lower than the new one, then replace it in the list of worst interactions
         */
        process: function process(entry) {
          var interactionIndex = longestInteractions.findIndex(function (interaction) {
            return entry.interactionId === interaction.interactionId;
          });
          var minLongestInteraction = longestInteractions[longestInteractions.length - 1];
          if (interactionIndex !== -1) {
            if (entry.duration > longestInteractions[interactionIndex].duration) {
              longestInteractions[interactionIndex] = entry;
              sortAndTrimLongestInteractions();
            }
          } else if (longestInteractions.length < MAX_INTERACTION_ENTRIES || entry.duration > minLongestInteraction.duration) {
            longestInteractions.push(entry);
            sortAndTrimLongestInteractions();
          }
        },
        /**
         * Compute the p98 longest interaction.
         * For better performance the computation is based on 10 longest interactions and the interaction count of the current view.
         */
        estimateP98Duration: function estimateP98Duration() {
          var interactionIndex = Math.min(longestInteractions.length - 1, Math.floor(getViewInteractionCount() / 50));
          return longestInteractions[interactionIndex];
        }
      };
    }
    function trackViewInteractionCount(viewLoadingType) {
      initInteractionCountPolyfill();
      var previousInteractionCount = viewLoadingType === ViewLoadingType.INITIAL_LOAD ? 0 : getInteractionCount();
      var state = {
        stopped: false
      };
      function computeViewInteractionCount() {
        return getInteractionCount() - previousInteractionCount;
      }
      return {
        getViewInteractionCount: function getViewInteractionCount() {
          if (state.stopped) {
            return state.interactionCount;
          }
          return computeViewInteractionCount();
        },
        stopViewInteractionCount: function stopViewInteractionCount() {
          state = {
            stopped: true,
            interactionCount: computeViewInteractionCount()
          };
        }
      };
    }
    function isInteractionToNextPaintSupported() {
      return supportPerformanceTimingEvent('event') && window.PerformanceEventTiming && 'interactionId' in PerformanceEventTiming.prototype;
    }

    function trackCommonViewMetrics(lifeCycle, domMutationObservable, configuration, scheduleViewUpdate, loadingType, viewStart) {
      var commonViewMetrics = {};
      var _trackLoadingTime = trackLoadingTime(lifeCycle, domMutationObservable, configuration, loadingType, viewStart, function (newLoadingTime) {
        commonViewMetrics.loadingTime = newLoadingTime;
        scheduleViewUpdate();
      });
      var stopLoadingTimeTracking = _trackLoadingTime.stop;
      var setLoadEvent = _trackLoadingTime.setLoadEvent;
      var _trackScrollMetrics = trackScrollMetrics(configuration, viewStart, function (newScrollMetrics) {
        commonViewMetrics.scroll = newScrollMetrics;
      });
      var stopScrollMetricsTracking = _trackScrollMetrics.stop;
      var stopCLSTracking;
      var _trackCumulativeLayoutShift = trackCumulativeLayoutShift(lifeCycle, configuration, function (cumulativeLayoutShift) {
        commonViewMetrics.cumulativeLayoutShift = cumulativeLayoutShift;
        scheduleViewUpdate();
      });
      var stopCLSTracking = _trackCumulativeLayoutShift.stop;
      var _trackInteractionToNextPaint = trackInteractionToNextPaint(configuration, viewStart.relative, loadingType, lifeCycle);
      var stopINPTracking = _trackInteractionToNextPaint.stop;
      var getInteractionToNextPaint = _trackInteractionToNextPaint.getInteractionToNextPaint;
      var setViewEnd = _trackInteractionToNextPaint.setViewEnd;
      return {
        stop: function stop() {
          stopLoadingTimeTracking();
          stopCLSTracking();
          stopScrollMetricsTracking();
        },
        stopINPTracking: stopINPTracking,
        setLoadEvent: setLoadEvent,
        setViewEnd: setViewEnd,
        getCommonViewMetrics: function getCommonViewMetrics() {
          commonViewMetrics.interactionToNextPaint = getInteractionToNextPaint();
          return commonViewMetrics;
        }
      };
    }

    // Some events are not being counted as they transcend views. To reduce the occurrence;
    // an arbitrary delay is added for stopping event counting after the view ends.
    //
    // Ideally, we would not stop and keep counting events until the end of the session.
    // But this might have a small performance impact if there are many many views:
    // we would need to go through each event to see if the related view matches.
    // So let's have a fairly short delay to avoid impacting performances too much.
    //
    // In the future, we could have views stored in a data structure similar to ContextHistory. Whenever
    // a child event is collected, we could look into this history to find the matching view and
    // increase the associated and increase its counter. Having a centralized data structure for it
    // would allow us to look for views more efficiently.
    //
    // For now, having a small cleanup delay will already improve the situation in most cases.

    var KEEP_TRACKING_EVENT_COUNTS_AFTER_VIEW_DELAY = 5 * ONE_MINUTE;
    function trackViewEventCounts(lifeCycle, viewId, onChange) {
      var _trackEventCounts = trackEventCounts({
        lifeCycle: lifeCycle,
        isChildEvent: function isChildEvent(event) {
          return event.view.id === viewId;
        },
        onChange: onChange
      });
      return {
        scheduleStop: function scheduleStop() {
          setTimeout$1(_trackEventCounts.stop, KEEP_TRACKING_EVENT_COUNTS_AFTER_VIEW_DELAY);
        },
        eventCounts: _trackEventCounts.eventCounts
      };
    }

    var THROTTLE_VIEW_UPDATE_PERIOD = 3000;
    var SESSION_KEEP_ALIVE_INTERVAL = 5 * ONE_MINUTE;
    var KEEP_TRACKING_AFTER_VIEW_DELAY = 5 * ONE_MINUTE;
    function trackViews(location, lifeCycle, domMutationObservable, configuration, locationChangeObservable, areViewsTrackedAutomatically, initialViewOptions) {
      var activeViews = new Set();
      function startNewView(loadingType, startClocks, viewOptions) {
        var newlyCreatedView = newView(lifeCycle, domMutationObservable, configuration, location, loadingType, startClocks, viewOptions);
        activeViews.add(newlyCreatedView);
        newlyCreatedView.stopObservable.subscribe(function () {
          activeViews["delete"](newlyCreatedView);
        });
        return newlyCreatedView;
      }
      var currentView = startNewView(ViewLoadingType.INITIAL_LOAD, clocksOrigin(), initialViewOptions);
      startViewLifeCycle();
      var locationChangeSubscription;
      if (areViewsTrackedAutomatically) {
        locationChangeSubscription = renewViewOnLocationChange(locationChangeObservable);
      }
      function startViewLifeCycle() {
        lifeCycle.subscribe(LifeCycleEventType.SESSION_RENEWED, function () {
          currentView = startNewView(ViewLoadingType.ROUTE_CHANGE, undefined, {
            name: currentView.name,
            service: currentView.service,
            version: currentView.version
          });
        });
        lifeCycle.subscribe(LifeCycleEventType.SESSION_EXPIRED, function () {
          currentView.end({
            sessionIsActive: false
          });
        });
        // End the current view on page unload
        lifeCycle.subscribe(LifeCycleEventType.PAGE_EXITED, function (pageExitEvent) {
          if (pageExitEvent.reason === PageExitReason.UNLOADING || pageExitEvent.reason === PageExitReason.PAGEHIDE) {
            currentView.end();
          }
        });
      }
      function renewViewOnLocationChange(locationChangeObservable) {
        return locationChangeObservable.subscribe(function (params) {
          var oldLocation = params.oldLocation;
          var newLocation = params.newLocation;
          if (areDifferentLocation(oldLocation, newLocation)) {
            currentView.end();
            currentView = startNewView(ViewLoadingType.ROUTE_CHANGE);
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
        },
        startView: function startView(options, startClocks) {
          currentView.end({
            endClocks: startClocks
          });
          currentView = startNewView(ViewLoadingType.ROUTE_CHANGE, startClocks, options);
        },
        stop: function stop() {
          if (locationChangeSubscription) {
            locationChangeSubscription.unsubscribe();
          }
          currentView.end();
          activeViews.forEach(function (view) {
            view.stop();
          });
        }
      };
    }
    function newView(lifeCycle, domMutationObservable, configuration, initialLocation, loadingType, startClocks, viewOptions) {
      // Setup initial values
      if (typeof startClocks === 'undefined') {
        startClocks = clocksNow();
      }
      var id = UUID();
      var stopObservable = new Observable();
      var customTimings = {};
      var documentVersion = 0;
      var endClocks;
      var location = shallowClone(initialLocation);
      var sessionIsActive = true;
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
      });

      // Update the view every time the measures are changing
      var _scheduleViewUpdate = throttle(triggerViewUpdate, THROTTLE_VIEW_UPDATE_PERIOD, {
        leading: false
      });
      var scheduleViewUpdate = _scheduleViewUpdate.throttled;
      var cancelScheduleViewUpdate = _scheduleViewUpdate.cancel;
      var _trackCommonViewMetrics = trackCommonViewMetrics(lifeCycle, domMutationObservable, configuration, scheduleViewUpdate, loadingType, startClocks);
      var setLoadEvent = _trackCommonViewMetrics.setLoadEvent;
      var stopCommonViewMetricsTracking = _trackCommonViewMetrics.stop;
      var getCommonViewMetrics = _trackCommonViewMetrics.getCommonViewMetrics;
      var stopINPTracking = _trackCommonViewMetrics.stopINPTracking;
      var setViewEnd = _trackCommonViewMetrics.setViewEnd;
      var _trackInitialViewTimings = loadingType === ViewLoadingType.INITIAL_LOAD ? trackInitialViewMetrics(lifeCycle, configuration, setLoadEvent, scheduleViewUpdate) : {
        stop: noop,
        initialViewMetrics: {}
      };
      var stopInitialViewMetricsTracking = _trackInitialViewTimings.stop;
      var initialViewMetrics = _trackInitialViewTimings.initialViewMetrics;
      var _trackViewEventCounts = trackViewEventCounts(lifeCycle, id, scheduleViewUpdate);
      var stopEventCountsTracking = _trackViewEventCounts.scheduleStop;
      var eventCounts = _trackViewEventCounts.eventCounts;

      // Session keep alive
      var keepAliveIntervalId = setInterval(triggerViewUpdate, SESSION_KEEP_ALIVE_INTERVAL);
      triggerViewUpdate();
      function triggerViewUpdate() {
        cancelScheduleViewUpdate();
        documentVersion += 1;
        var currentEnd = endClocks === undefined ? timeStampNow() : endClocks.timeStamp;
        lifeCycle.notify(LifeCycleEventType.VIEW_UPDATED, {
          customTimings: customTimings,
          documentVersion: documentVersion,
          id: id,
          name: name,
          service: service,
          version: version,
          loadingType: loadingType,
          location: location,
          startClocks: startClocks,
          commonViewMetrics: getCommonViewMetrics(),
          initialViewMetrics: initialViewMetrics,
          duration: elapsed(startClocks.timeStamp, currentEnd),
          isActive: endClocks === undefined,
          sessionIsActive: sessionIsActive,
          eventCounts: eventCounts
        });
      }
      var result = {
        name: name,
        service: service,
        version: version,
        stopObservable: stopObservable,
        end: function end(options) {
          if (endClocks) {
            // view already ended
            return;
          }
          endClocks = isNullUndefinedDefaultValue(options && options.endClocks, clocksNow());
          sessionIsActive = isNullUndefinedDefaultValue(options && options.sessionIsActive, true);
          lifeCycle.notify(LifeCycleEventType.VIEW_ENDED, {
            endClocks: endClocks
          });
          clearInterval(keepAliveIntervalId);
          setViewEnd(endClocks.relative);
          stopCommonViewMetricsTracking();
          triggerViewUpdate();
          setTimeout$1(function () {
            result.stop();
          }, KEEP_TRACKING_AFTER_VIEW_DELAY);
        },
        stop: function stop() {
          stopInitialViewMetricsTracking();
          stopEventCountsTracking();
          stopINPTracking();
          stopObservable.notify();
        },
        addTiming: function addTiming(name, time) {
          if (endClocks) {
            return;
          }
          var relativeTime = looksLikeRelativeTime(time) ? time : elapsed(startClocks.timeStamp, time);
          customTimings[sanitizeTiming(name)] = relativeTime;
          scheduleViewUpdate();
        }
      };
      return result;
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

    function startViewCollection(lifeCycle, configuration, location, domMutationObservable, locationChangeObservable, pageStateHistory, recorderApi, initialViewOptions) {
      lifeCycle.subscribe(LifeCycleEventType.VIEW_UPDATED, function (view) {
        lifeCycle.notify(LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, processViewUpdate(view, configuration, recorderApi, pageStateHistory));
      });
      return trackViews(location, lifeCycle, domMutationObservable, configuration, locationChangeObservable, !configuration.trackViewsManually, initialViewOptions);
    }
    function computePerformanceViewDetails(navigationTimings) {
      if (!navigationTimings) {
        return undefined;
      }
      var fetchStart = navigationTimings.fetchStart,
        responseEnd = navigationTimings.responseEnd,
        domInteractive = navigationTimings.domInteractive,
        domContentLoaded = navigationTimings.domContentLoaded,
        domComplete = navigationTimings.domComplete,
        loadEventEnd = navigationTimings.loadEventEnd,
        loadEventStart = navigationTimings.loadEventStart,
        domContentLoadedEventEnd = navigationTimings.domContentLoadedEventEnd;
      var details = {};
      if (isNumber(responseEnd) && isNumber(fetchStart) && responseEnd !== fetchStart) {
        details.fpt = toServerDuration(responseEnd - fetchStart);
        var apdexLevel = parseInt((responseEnd - fetchStart) / 1000); // 秒数取整
        details.apdexLevel = apdexLevel > 9 ? 9 : apdexLevel;
      }
      if (isNumber(domInteractive) && isNumber(fetchStart) && domInteractive !== fetchStart) {
        details.tti = toServerDuration(domInteractive - fetchStart);
      }
      if (isNumber(domContentLoaded) && isNumber(fetchStart) && domContentLoaded !== fetchStart) {
        details.dom_ready = toServerDuration(domContentLoaded - fetchStart);
      }
      // Make sure a connection occurred
      if (isNumber(loadEventEnd) && isNumber(fetchStart) && loadEventEnd !== fetchStart) {
        details.load = toServerDuration(loadEventEnd - fetchStart);
      }
      if (isNumber(loadEventStart) && isNumber(domContentLoadedEventEnd) && loadEventStart !== domContentLoadedEventEnd) {
        details.resource_load_time = toServerDuration(loadEventStart - domContentLoadedEventEnd);
      }
      if (isNumber(domComplete) && isNumber(domInteractive) && domComplete !== domInteractive) {
        details.dom = toServerDuration(domComplete - domInteractive);
      }
      return details;
    }
    function processViewUpdate(view, configuration, recorderApi, pageStateHistory) {
      var replayStats = recorderApi.getReplayStats(view.id);
      var pageStates = pageStateHistory.findAll(view.startClocks.relative, view.duration);
      var viewEvent = {
        _gc: {
          document_version: view.documentVersion,
          replay_stats: replayStats,
          page_states: pageStates
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
          cumulative_layout_shift: findByPath(view.commonViewMetrics, 'cumulativeLayoutShift.value'),
          cumulative_layout_shift_target_selector: findByPath(view.commonViewMetrics, 'cumulativeLayoutShift.targetSelector'),
          first_byte: toServerDuration(findByPath(view.initialViewMetrics, 'navigationTimings.firstByte')),
          dom_complete: toServerDuration(findByPath(view.initialViewMetrics, 'navigationTimings.domComplete')),
          dom_content_loaded: toServerDuration(findByPath(view.initialViewMetrics, 'navigationTimings.domContentLoaded')),
          dom_interactive: toServerDuration(findByPath(view.initialViewMetrics, 'navigationTimings.domInteractive')),
          error: {
            count: view.eventCounts.errorCount
          },
          first_contentful_paint: toServerDuration(findByPath(view.initialViewMetrics, 'firstContentfulPaint')),
          first_input_delay: toServerDuration(findByPath(view.initialViewMetrics, 'firstInput.delay')),
          first_input_time: toServerDuration(findByPath(view.initialViewMetrics, 'firstInput.time')),
          first_input_target_selector: findByPath(view.initialViewMetrics, 'firstInput.targetSelector'),
          interaction_to_next_paint: toServerDuration(findByPath(view.commonViewMetrics, 'interactionToNextPaint.value')),
          interaction_to_next_paint_target_selector: findByPath(view.commonViewMetrics, 'interactionToNextPaint.targetSelector'),
          is_active: view.isActive,
          name: view.name,
          largest_contentful_paint: toServerDuration(findByPath(view.initialViewMetrics, 'largestContentfulPaint.value')),
          largest_contentful_paint_element_selector: findByPath(view.initialViewMetrics, 'largestContentfulPaint.targetSelector'),
          load_event: toServerDuration(findByPath(view.initialViewMetrics, 'navigationTimings.loadEvent')),
          loading_time: discardNegativeDuration(toServerDuration(view.commonViewMetrics.loadingTime)),
          loading_type: view.loadingType,
          long_task: {
            count: view.eventCounts.longTaskCount
          },
          resource: {
            count: view.eventCounts.resourceCount
          },
          time_spent: toServerDuration(view.duration)
        },
        display: view.commonViewMetrics.scroll ? {
          scroll: {
            max_depth: view.commonViewMetrics.scroll.maxDepth,
            max_depth_scroll_top: view.commonViewMetrics.scroll.maxDepthScrollTop,
            max_scroll_height: view.commonViewMetrics.scroll.maxScrollHeight,
            max_scroll_height_time: toServerDuration(view.commonViewMetrics.scroll.maxScrollHeightTime)
          }
        } : undefined,
        session: {
          has_replay: replayStats ? true : undefined,
          is_active: view.sessionIsActive ? undefined : false
        },
        privacy: {
          replay_level: configuration.defaultPrivacyLevel
        }
      };
      if (!isEmptyObject(view.customTimings)) {
        viewEvent.view.custom_timings = mapValues(view.customTimings, toServerDuration);
      }
      viewEvent = extend2Lev(viewEvent, {
        view: computePerformanceViewDetails(view.initialViewMetrics.navigationTimings)
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
        do {
          var mod = high % radix * 4294967296 + low;
          high = Math.floor(high / radix);
          low = Math.floor(mod / radix);
          str = (mod % radix).toString(radix) + str;
        } while (high || low);
        return str;
      },
      toDecimalString: function toDecimalString() {
        return this.toString(10);
      },
      /**
       * Format used by OTel headers
       */
      toPaddedHexadecimalString: function toPaddedHexadecimalString() {
        var traceId = this.toString(16);
        return Array(17 - traceId.length).join('0') + traceId;
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
      this._spanId = new TraceIdentifier();
      this._traceId = new TraceIdentifier();
      this._traceSampled = traceSampled;
    }
    DDtraceTracer.prototype = {
      isTracingSupported: function isTracingSupported() {
        return getCrypto() !== undefined;
      },
      getSpanId: function getSpanId() {
        return this._spanId.toDecimalString();
      },
      getTraceId: function getTraceId() {
        return this._traceId.toDecimalString();
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

    // start SkyWalking
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
          var index = '0';
          // var values = `${1}-${traceIdStr}-${segmentId}-${index}-${service}-${instance}-${endpoint}-${peer}`;
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

    /**
     *
     * @param {*} configuration  配置信息
     */
    function JaegerTracer(configuration, traceSampled) {
      this._traceId = new TraceIdentifier();
      this._spanId = new TraceIdentifier();
      this._traceSampled = traceSampled;
      this.is128Bit = configuration.traceId128Bit;
    }
    JaegerTracer.prototype = {
      isTracingSupported: function isTracingSupported() {
        return getCrypto() !== undefined;
      },
      getSpanId: function getSpanId() {
        return this._spanId.toPaddedHexadecimalString();
      },
      getTraceId: function getTraceId() {
        return this.is128Bit ? '0000000000000000' + this._traceId.toPaddedHexadecimalString() : this._traceId.toPaddedHexadecimalString();
      },
      getUberTraceId: function getUberTraceId() {
        //{trace-id}:{span-id}:{parent-span-id}:{flags}
        return this.getTraceId() + ':' + this.getSpanId() + ':' + '0' + ':' + (this._traceSampled ? '1' : '0');
      },
      makeTracingHeaders: function makeTracingHeaders() {
        return {
          'uber-trace-id': this.getUberTraceId()
        };
      }
    };

    /**
     *
     * @param {*} configuration  配置信息
     */
    function ZipkinSingleTracer(configuration, traceSampled) {
      this._traceId = new TraceIdentifier();
      this._spanId = new TraceIdentifier();
      this._traceSampled = traceSampled;
    }
    ZipkinSingleTracer.prototype = {
      isTracingSupported: function isTracingSupported() {
        return getCrypto() !== undefined;
      },
      getSpanId: function getSpanId() {
        return this._spanId.toPaddedHexadecimalString();
      },
      getTraceId: function getTraceId() {
        return this._traceId.toPaddedHexadecimalString();
      },
      getB3Str: function getB3Str() {
        //{TraceId}-{SpanId}-{SamplingState}-{ParentSpanId}
        return this.getTraceId() + '-' + this.getSpanId() + '-' + (this._traceSampled ? '1' : '0');
      },
      makeTracingHeaders: function makeTracingHeaders() {
        return {
          b3: this.getB3Str()
        };
      }
    };

    /**
     *
     * @param {*} configuration  配置信息
     */
    function ZipkinMultiTracer(configuration, traceSampled) {
      this._traceId = new TraceIdentifier();
      this._spanId = new TraceIdentifier();
      this._traceSampled = traceSampled;
      this.is128Bit = configuration.traceId128Bit;
    }
    ZipkinMultiTracer.prototype = {
      isTracingSupported: function isTracingSupported() {
        return getCrypto() !== undefined;
      },
      getSpanId: function getSpanId() {
        return this._spanId.toPaddedHexadecimalString();
      },
      getTraceId: function getTraceId() {
        return this.is128Bit ? '0000000000000000' + this._traceId.toPaddedHexadecimalString() : this._traceId.toPaddedHexadecimalString();
      },
      makeTracingHeaders: function makeTracingHeaders() {
        return {
          'X-B3-TraceId': this.getSpanId(),
          'X-B3-SpanId': this.getTraceId(),
          //  'X-B3-ParentSpanId': '',
          'X-B3-Sampled': this._traceSampled ? '1' : '0'
          //  'X-B3-Flags': '0'
        };
      }
    };

    /**
     *
     * @param {*} traceSampled
     * @param {*} isHexTraceId 是否需要转换成10进制上报数据
     */
    function W3cTraceParentTracer(traceSampled, isHexTraceId) {
      this._traceId = new TraceIdentifier();
      this._spanId = new TraceIdentifier();
      this._traceSampled = traceSampled;
      this.isHexTraceId = isHexTraceId;
    }
    W3cTraceParentTracer.prototype = {
      isTracingSupported: function isTracingSupported() {
        return getCrypto() !== undefined;
      },
      getSpanId: function getSpanId() {
        return this.isHexTraceId ? this._spanId.toDecimalString() : this._spanId.toPaddedHexadecimalString();
      },
      getTraceId: function getTraceId() {
        if (this.isHexTraceId) {
          // 转化为二进制之后上报
          return this._traceId.toDecimalString();
        } else {
          return this._traceId.toPaddedHexadecimalString() + this._spanId.toPaddedHexadecimalString();
        }
      },
      getTraceParent: function getTraceParent() {
        // '{version}-{traceId}-{spanId}-{sampleDecision}'
        if (this.isHexTraceId) {
          // 短64位，前面补0
          return '00-0000000000000000' + this._traceId.toPaddedHexadecimalString() + '-' + this._spanId.toPaddedHexadecimalString() + '-' + (this._traceSampled ? '01' : '00');
        } else {
          return '00-' + this.getTraceId() + '-' + this.getSpanId() + '-' + (this._traceSampled ? '01' : '00');
        }
      },
      makeTracingHeaders: function makeTracingHeaders() {
        var baseHeaders = {
          traceparent: this.getTraceParent()
        };
        if (this.isHexTraceId) {
          return assign(baseHeaders, {
            'x-gc-trace-id': this.getTraceId(),
            'x-gc-span-id': this.getSpanId()
          });
        }
        return baseHeaders;
      }
    };

    function isTracingOption(item) {
      var expectedItem = item;
      return getType(expectedItem) === 'object' && isMatchOption(expectedItem.match) && isString(expectedItem.traceType);
    }
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
              }
              // context.init.headers = headers.concat(objectEntries(tracingHeaders))
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
    function injectHeadersIfTracingAllowed(configuration, context, sessionManager, inject) {
      if (!sessionManager.findTrackedSession()) {
        return;
      }
      var tracingOption = find(configuration.allowedTracingUrls, function (tracingOption) {
        return matchList([tracingOption.match], context.url, true);
      });
      if (!tracingOption) {
        return;
      }
      var traceSampled = !isNumber(configuration.tracingSampleRate) || performDraw(configuration.tracingSampleRate);
      var tracer,
        traceType = tracingOption.traceType;
      switch (traceType) {
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
          tracer = new W3cTraceParentTracer(traceSampled);
          break;
        case TraceType.W3C_TRACEPARENT_64:
          tracer = new W3cTraceParentTracer(traceSampled, true);
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
          case 'resolve':
            waitForResponseToComplete(context, function (duration) {
              tracer.clearTracingIfNeeded(context);
              lifeCycle.notify(LifeCycleEventType.REQUEST_COMPLETED, {
                duration: duration,
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
    function waitForResponseToComplete(context, callback) {
      var clonedResponse = context.response && tryToClone(context.response);
      if (!clonedResponse || !clonedResponse.body) {
        // do not try to wait for the response if the clone failed, fetch error or null body
        callback(elapsed(context.startClocks.timeStamp, timeStampNow()));
      } else {
        readBytesFromStream(clonedResponse.body, function () {
          callback(elapsed(context.startClocks.timeStamp, timeStampNow()));
        }, {
          bytesLimit: Number.POSITIVE_INFINITY,
          collectStreamBody: false
        });
      }
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
      return;
    }
    function endTime(timing) {
      return addDuration(timing.startTime, timing.duration);
    }
    function isBetween(timing, start, end) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      var errorMargin = 1;
      return timing.startTime >= start - errorMargin && endTime(timing) <= addDuration(end, errorMargin);
    }

    function startResourceCollection(lifeCycle, configuration, sessionManager, pageStateHistory) {
      lifeCycle.subscribe(LifeCycleEventType.REQUEST_COMPLETED, function (request) {
        var rawEvent = processRequest(request, configuration, sessionManager, pageStateHistory);
        if (rawEvent) {
          lifeCycle.notify(LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, rawEvent);
        }
      });
      lifeCycle.subscribe(LifeCycleEventType.PERFORMANCE_ENTRIES_COLLECTED, function (entries) {
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
          if (entry.entryType === 'resource' && !isRequestKind(entry) && !isResourceUrlLimit(entry.name, configuration.resourceUrlLimit)) {
            var rawEvent = processResourceEntry(entry, configuration, sessionManager, pageStateHistory);
            if (rawEvent) {
              lifeCycle.notify(LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, rawEvent);
            }
          }
        }
      });
    }
    function processRequest(request, configuration, sessionManager, pageStateHistory) {
      var matchingTiming = matchRequestTiming(request);
      var startClocks = matchingTiming ? relativeToClocks(matchingTiming.startTime) : request.startClocks;
      var shouldIndex = shouldIndexResource(configuration, sessionManager, startClocks);
      var tracingInfo = computeRequestTracingInfo(request);
      if (!shouldIndex && !tracingInfo) {
        return;
      }
      var type = request.type === RequestType.XHR ? ResourceType.XHR : ResourceType.FETCH;
      var correspondingTimingOverrides = matchingTiming ? computePerformanceEntryMetrics(matchingTiming) : undefined;
      var duration = computeRequestDuration(pageStateHistory, startClocks, request.duration);
      var pageStateInfo = computePageStateInfo(pageStateHistory, startClocks, isNullUndefinedDefaultValue(matchingTiming && matchingTiming.duration, request.duration));
      var urlObj = urlParse(request.url).getParse();
      var resourceEvent = extend2Lev({
        date: startClocks.timeStamp,
        resource: {
          id: UUID,
          type: type,
          duration: duration,
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
      }, tracingInfo, correspondingTimingOverrides, pageStateInfo);
      return {
        startTime: startClocks.relative,
        rawRumEvent: resourceEvent,
        domainContext: {
          performanceEntry: matchingTiming,
          xhr: request.xhr,
          response: request.response,
          requestInput: request.input,
          requestInit: request.init,
          error: request.error
        }
      };
    }
    function processResourceEntry(entry, configuration, sessionManager, pageStateHistory) {
      var startClocks = relativeToClocks(entry.startTime);
      var shouldIndex = shouldIndexResource(configuration, sessionManager, startClocks);
      var tracingInfo = computeEntryTracingInfo(entry);
      if (!shouldIndex && !tracingInfo) {
        return;
      }
      var type = computeResourceKind(entry);
      var entryMetrics = computePerformanceEntryMetrics(entry);
      var urlObj = urlParse(entry.name).getParse();
      var statusCode = '';
      if (is304(entry)) {
        statusCode = 304;
      } else if (isCacheHit(entry)) {
        statusCode = 200;
      }
      var pageStateInfo = computePageStateInfo(pageStateHistory, startClocks, entry.duration);
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
      }, tracingInfo, entryMetrics, pageStateInfo);
      return {
        startTime: startClocks.relative,
        rawRumEvent: resourceEvent,
        domainContext: {
          performanceEntry: entry
        }
      };
    }
    function shouldIndexResource(configuration, sessionManager, resourceStart) {
      return sessionManager.findTrackedSession(resourceStart.relative);
    }
    function computePerformanceEntryMetrics(timing) {
      return {
        resource: extend2Lev({}, {
          duration: computePerformanceResourceDuration(timing)
        }, computeSize(timing), computePerformanceResourceDetails(timing))
      };
    }
    function computeRequestTracingInfo(request) {
      var hasBeenTraced = request.traceSampled && request.traceId && request.spanId;
      if (!hasBeenTraced) {
        return undefined;
      }
      return {
        _gc: {
          spanId: request.spanId,
          traceId: request.traceId
        },
        resource: {
          id: UUID()
        }
      };
    }
    function computePageStateInfo(pageStateHistory, startClocks, duration) {
      return {
        _gc: {
          page_states: pageStateHistory.findAll(startClocks.relative, duration),
          page_was_discarded: String(document.wasDiscarded)
        }
      };
    }
    function computeRequestDuration(pageStateHistory, startClocks, duration) {
      var requestCrosseds = pageStateHistory.findAll(startClocks.relative, duration);
      var requestCrossedFrozenState;
      if (requestCrosseds) {
        requestCrossedFrozenState = some(requestCrosseds, function (pageState) {
          return pageState.state === PageState.FROZEN;
        });
      }
      return !requestCrossedFrozenState ? toServerDuration(duration) : undefined;
    }
    function computeEntryTracingInfo(entry) {
      return entry.traceId ? {
        _gc: {
          traceId: entry.traceId
        }
      } : undefined;
    }

    function startRum(configuration, recorderApi, globalContextManager, userContextManager, initialViewOptions) {
      var cleanupTasks = [];
      var lifeCycle = new LifeCycle();
      var telemetry = startRumTelemetry(configuration);
      telemetry.setContextProvider(function () {
        return {
          application: {
            id: configuration.applicationId
          },
          session: {
            id: session.findTrackedSession() && session.findTrackedSession().id
          },
          view: {
            id: viewContexts.findView() && viewContexts.findView().id
          },
          action: {
            id: actionContexts.findActionId(),
            ids: actionContexts.findAllActionId()
          }
        };
      });
      var reportError = function reportError(error) {
        lifeCycle.notify(LifeCycleEventType.RAW_ERROR_COLLECTED, {
          error: error
        });
      };
      var pageExitObservable = createPageExitObservable();
      pageExitObservable.subscribe(function (event) {
        lifeCycle.notify(LifeCycleEventType.PAGE_EXITED, event);
      });
      cleanupTasks.push(function () {
        pageExitSubscription.unsubscribe();
      });
      var session = !canUseEventBridge() ? startRumSessionManager(configuration, lifeCycle) : startRumSessionManagerStub();
      if (!canUseEventBridge()) {
        var batch = startRumBatch(configuration, lifeCycle, telemetry.observable, reportError, pageExitObservable, session.expireObservable);
        cleanupTasks.push(function () {
          batch.stop();
        });
      } else {
        startRumEventBridge(lifeCycle);
      }
      var userSession = startCacheUsrCache(configuration);
      var domMutationObservable = createDOMMutationObservable();
      var locationChangeObservable = createLocationChangeObservable(location);
      var _startRumEventCollection = startRumEventCollection(lifeCycle, configuration, location, session, userSession, locationChangeObservable, domMutationObservable, function () {
        return buildCommonContext(globalContextManager, userContextManager, recorderApi);
      }, reportError);
      var viewContexts = _startRumEventCollection.viewContexts;
      var urlContexts = _startRumEventCollection.urlContexts;
      var actionContexts = _startRumEventCollection.actionContexts;
      var pageStateHistory = _startRumEventCollection.pageStateHistory;
      var stopRumEventCollection = _startRumEventCollection.stop;
      var addAction = _startRumEventCollection.addAction;
      cleanupTasks.push(stopRumEventCollection);
      startLongTaskCollection(lifeCycle, session);
      startResourceCollection(lifeCycle, configuration, session, pageStateHistory);
      var _startViewCollection = startViewCollection(lifeCycle, configuration, location, domMutationObservable, locationChangeObservable, pageStateHistory, recorderApi, initialViewOptions);
      var addTiming = _startViewCollection.addTiming;
      var startView = _startViewCollection.startView;
      var stopViewCollection = _startViewCollection.stop;
      cleanupTasks.push(stopViewCollection);
      var _startErrorCollection = startErrorCollection(lifeCycle, configuration, pageStateHistory);
      var addError = _startErrorCollection.addError;
      startRequestCollection(lifeCycle, configuration, session);
      startPerformanceCollection(lifeCycle, configuration);
      var internalContext = startInternalContext(configuration.applicationId, session, viewContexts, actionContexts, urlContexts);
      return {
        addAction: addAction,
        addError: addError,
        addTiming: addTiming,
        configuration: configuration,
        lifeCycle: lifeCycle,
        viewContexts: viewContexts,
        session: session,
        startView: startView,
        stopSession: function stopSession() {
          session.expire();
        },
        getInternalContext: internalContext.get,
        stop: function stop() {
          cleanupTasks.forEach(function (task) {
            task();
          });
        }
      };
    }
    function startRumTelemetry(configuration) {
      var telemetry = startTelemetry(TelemetryService.RUM, configuration);
      //   if (canUseEventBridge()) {
      //     const bridge = getEventBridge()
      //     telemetry.observable.subscribe((event) =>
      //       bridge.send('internal_telemetry', event)
      //     )
      //   }
      return telemetry;
    }
    function startRumEventCollection(lifeCycle, configuration, location, sessionManager, userSessionManager, locationChangeObservable, domMutationObservable, buildCommonContext, reportError) {
      var viewContexts = startViewContexts(lifeCycle);
      var urlContexts = startUrlContexts(lifeCycle, locationChangeObservable, location);
      var pageStateHistory = startPageStateHistory();
      var _startActionCollection = startActionCollection(lifeCycle, domMutationObservable, configuration, pageStateHistory);
      var actionContexts = _startActionCollection.actionContexts;
      var addAction = _startActionCollection.addAction;
      var displayContext = startDisplayContext();
      startRumAssembly(configuration, lifeCycle, sessionManager, userSessionManager, viewContexts, urlContexts, actionContexts, displayContext, buildCommonContext, reportError);
      return {
        viewContexts: viewContexts,
        urlContexts: urlContexts,
        pageStateHistory: pageStateHistory,
        addAction: addAction,
        actionContexts: actionContexts,
        stop: function stop() {
          viewContexts.stop();
          urlContexts.stop();
          pageStateHistory.stop();
          displayContext.stop();
        }
      };
    }

    var buildEnv = {
      sdkVersion: "3.1.5",
      sdkName: 'df_web_rum_sdk'
    };

    function validateAndBuildRumConfiguration(initConfiguration) {
      if (!initConfiguration.applicationId) {
        display.error('Application ID is not configured, no RUM data will be collected.');
        return;
      }
      var requireParamsValidate = validatePostRequestRequireParamsConfiguration(initConfiguration);
      if (!requireParamsValidate) return;
      // TODO remove fallback in next major
      if (initConfiguration.sessionReplaySampleRate !== undefined && !isPercentage(initConfiguration.sessionReplaySampleRate)) {
        display.error('Premium Sample Rate should be a number between 0 and 100');
        return;
      }
      var allowedTracingUrls = validateAndBuildTracingOptions(initConfiguration);
      if (!allowedTracingUrls) {
        return;
      }
      //   if (initConfiguration.allowedTracingOrigins !== undefined) {
      //     if (!isArray(initConfiguration.allowedTracingOrigins)) {
      //       display.error('Allowed Tracing Origins should be an array')
      //       return
      //     }
      //   }
      //   if (initConfiguration.allowedDDTracingOrigins !== undefined) {
      //     if (!isArray(initConfiguration.allowedDDTracingOrigins)) {
      //       display.error('Allowed Tracing Origins should be an array')
      //       return
      //     }
      //   }
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
      var trackUserInteractions = !!isNullUndefinedDefaultValue(initConfiguration.trackUserInteractions, initConfiguration.trackInteractions);
      return assign({
        applicationId: initConfiguration.applicationId,
        actionNameAttribute: initConfiguration.actionNameAttribute,
        sessionReplaySampleRate: isNullUndefinedDefaultValue(initConfiguration.sessionReplaySampleRate, 100),
        tracingSampleRate: initConfiguration.tracingSampleRate,
        allowedTracingUrls: allowedTracingUrls,
        excludedActivityUrls: isNullUndefinedDefaultValue(initConfiguration.excludedActivityUrls, []),
        trackUserInteractions: trackUserInteractions,
        trackViewsManually: !!initConfiguration.trackViewsManually,
        traceType: isNullUndefinedDefaultValue(initConfiguration.traceType, TraceType.DDTRACE),
        traceId128Bit: !!initConfiguration.traceId128Bit,
        defaultPrivacyLevel: objectHasValue(DefaultPrivacyLevel, initConfiguration.defaultPrivacyLevel) ? initConfiguration.defaultPrivacyLevel : DefaultPrivacyLevel.MASK_USER_INPUT
      }, baseConfiguration, buildEnv);
    }
    /**
     * Handles allowedTracingUrls and processes legacy allowedTracingOrigins
     */
    function validateAndBuildTracingOptions(initConfiguration) {
      // Advise about parameters precedence.
      if (initConfiguration.allowedTracingUrls !== undefined && initConfiguration.allowedTracingOrigins !== undefined) {
        display.warn('Both allowedTracingUrls and allowedTracingOrigins (deprecated) have been defined. The parameter allowedTracingUrls will override allowedTracingOrigins.');
      }
      // Handle allowedTracingUrls first
      if (initConfiguration.allowedTracingUrls !== undefined) {
        if (!isArray(initConfiguration.allowedTracingUrls)) {
          display.error('Allowed Tracing URLs should be an array');
          return;
        }
        // if (initConfiguration.allowedTracingUrls.length !== 0 && initConfiguration.service === undefined) {
        //   display.error('Service needs to be configured when tracing is enabled')
        //   return
        // }
        // Convert from (MatchOption | TracingOption) to TracingOption, remove unknown properties
        var tracingOptions = [];
        each(initConfiguration.allowedTracingUrls, function (option) {
          if (isMatchOption(option)) {
            tracingOptions.push({
              match: option,
              traceType: isNullUndefinedDefaultValue(initConfiguration.traceType, TraceType.DDTRACE)
            });
          } else if (isTracingOption(option)) {
            tracingOptions.push(option);
          } else {
            display.warn('Allowed Tracing Urls parameters should be a string, RegExp, function, or an object. Ignoring parameter', option);
          }
        });
        return tracingOptions;
      }

      // Handle conversion of allowedTracingOrigins to allowedTracingUrls
      if (initConfiguration.allowedTracingOrigins !== undefined) {
        if (!isArray(initConfiguration.allowedTracingOrigins)) {
          display.error('Allowed Tracing Origins should be an array');
          return;
        }
        var tracingOptions = [];
        each(initConfiguration.allowedTracingOrigins, function (legacyMatchOption) {
          var tracingOption = convertLegacyMatchOptionToTracingOption(legacyMatchOption, isNullUndefinedDefaultValue(initConfiguration.traceType, TraceType.DDTRACE));
          if (tracingOption) {
            tracingOptions.push(tracingOption);
          }
        });
        return tracingOptions;
      }
      // Handle conversion of allowedDDTracingOrigins to allowedTracingUrls
      if (initConfiguration.allowedDDTracingOrigins !== undefined) {
        if (!isArray(initConfiguration.allowedDDTracingOrigins)) {
          display.error('Allowed Tracing Origins should be an array');
          return;
        }
        var tracingOptions = [];
        each(initConfiguration.allowedDDTracingOrigins, function (legacyMatchOption) {
          var tracingOption = convertLegacyMatchOptionToTracingOption(legacyMatchOption, isNullUndefinedDefaultValue(initConfiguration.traceType, TraceType.DDTRACE));
          if (tracingOption) {
            tracingOptions.push(tracingOption);
          }
        });
        return tracingOptions;
      }
      return [];
    }

    /**
     * Converts parameters from the deprecated allowedTracingOrigins
     * to allowedTracingUrls. Handles the change from origin to full URLs.
     */
    function convertLegacyMatchOptionToTracingOption(item, traceType) {
      var match;
      if (typeof item === 'string') {
        match = item;
      } else if (item instanceof RegExp) {
        match = function match(url) {
          return item.test(getOrigin(url));
        };
      } else if (typeof item === 'function') {
        match = function match(url) {
          return item(getOrigin(url));
        };
      }
      if (match === undefined) {
        display.warn('Allowed Tracing Origins parameters should be a string, RegExp or function. Ignoring parameter', item);
        return undefined;
      }
      return {
        match: match,
        traceType: traceType
      };
    }

    function _typeof$3(obj) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$3(obj); }
    var RUM_STORAGE_KEY = 'rum';
    function makeRumPublicApi(startRumImpl, recorderApi) {
      var isAlreadyInitialized = false;
      var globalContextManager = createContextManager(CustomerDataType.GlobalContext);
      var userContextManager = createContextManager(CustomerDataType.User);
      var getInternalContextStrategy = function getInternalContextStrategy() {
        return undefined;
      };
      var getInitConfigurationStrategy = function getInitConfigurationStrategy() {
        return undefined;
      };
      var stopSessionStrategy = function stopSessionStrategy() {
        return noop();
      };
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
          commonContext = buildCommonContext(globalContextManager, userContextManager, recorderApi);
        }
        bufferApiCalls.add(function () {
          return _addActionStrategy(action, commonContext);
        });
      };
      var _addErrorStrategy = function addErrorStrategy(providedError, commonContext) {
        if (typeof commonContext == 'undefined') {
          commonContext = buildCommonContext(globalContextManager, userContextManager, recorderApi);
        }
        bufferApiCalls.add(function () {
          return _addErrorStrategy(providedError, commonContext);
        });
      };
      function initRum(initConfiguration) {
        getInitConfigurationStrategy = function getInitConfigurationStrategy() {
          return deepClone(initConfiguration);
        };
        var eventBridgeAvailable = canUseEventBridge();
        if (eventBridgeAvailable) {
          initConfiguration = overrideInitConfigurationForBridge(initConfiguration);
        }
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
        isAlreadyInitialized = true;
      }
      function doStartRum(configuration, initialViewOptions) {
        if (configuration.storeContextsToLocal) {
          // localstorage
          var beforeInitGlobalContext = globalContextManager.getContext();
          globalContextManager = createStoredContextManager(RUM_STORAGE_KEY, CustomerDataType.GlobalContext);
          globalContextManager.setContext(extend2Lev(globalContextManager.getContext(), beforeInitGlobalContext));
          var beforeInitUserContext = userContextManager.getContext();
          userContextManager = createStoredContextManager(RUM_STORAGE_KEY, CustomerDataType.User);
          userContextManager.setContext(extend2Lev(userContextManager.getContext(), beforeInitUserContext));
        }
        var startRumResults = startRumImpl(configuration, recorderApi, globalContextManager, userContextManager, initialViewOptions);
        _startViewStrategy = startRumResults.startView;
        _addActionStrategy = startRumResults.addAction;
        _addErrorStrategy = startRumResults.addError;
        _addTimingStrategy = startRumResults.addTiming;
        getInternalContextStrategy = startRumResults.getInternalContext;
        stopSessionStrategy = startRumResults.stopSession;
        bufferApiCalls.drain();
        recorderApi.onRumStart(startRumResults.lifeCycle, configuration, startRumResults.session, startRumResults.viewContexts);
      }
      var startView = monitor(function (options) {
        var sanitizedOptions = _typeof$3(options) === 'object' ? options : {
          name: options
        };
        _startViewStrategy(sanitizedOptions);
      });
      var rumPublicApi = makePublicApi({
        init: monitor(initRum),
        /** @deprecated: use setGlobalContextProperty instead */
        addRumGlobalContext: monitor(function (key, value) {
          return globalContextManager.add(key, value);
        }),
        setGlobalContextProperty: monitor(function (key, value) {
          return globalContextManager.setContextProperty(key, value);
        }),
        /** @deprecated: use removeGlobalContextProperty instead */
        removeRumGlobalContext: monitor(function (key) {
          return globalContextManager.remove(key);
        }),
        removeGlobalContextProperty: monitor(function (key) {
          return globalContextManager.removeContextProperty(key);
        }),
        /** @deprecated: use getGlobalContext instead */
        getRumGlobalContext: monitor(function () {
          return globalContextManager.get();
        }),
        getGlobalContext: monitor(function () {
          return globalContextManager.getContext();
        }),
        /** @deprecated: use setGlobalContext instead */
        setRumGlobalContext: monitor(function (context) {
          return globalContextManager.set(context);
        }),
        setGlobalContext: monitor(function (context) {
          return globalContextManager.setContext(context);
        }),
        clearGlobalContext: monitor(function () {
          return globalContextManager.clearContext();
        }),
        getInitConfiguration: monitor(function () {
          return getInitConfigurationStrategy();
        }),
        getInternalContext: monitor(function (startTime) {
          return getInternalContextStrategy(startTime);
        }),
        addDebugSession: monitor(function (id) {}),
        clearDebugSession: monitor(function () {}),
        getDebugSession: monitor(function () {}),
        addAction: monitor(function (name, context) {
          _addActionStrategy({
            name: name,
            context: deepClone(context),
            startClocks: clocksNow(),
            type: ActionType.CUSTOM
          });
        }),
        addError: monitor(function (error, context) {
          var handlingStack = createHandlingStack();
          _addErrorStrategy({
            error: error,
            handlingStack: handlingStack,
            context: deepClone(context),
            startClocks: clocksNow()
          });
        }),
        addTiming: monitor(function (name, time) {
          _addTimingStrategy(name, time);
        }),
        setUser: monitor(function (newUser) {
          if (checkUser(newUser)) {
            userContextManager.setContext(sanitizeUser(newUser));
          }
        }),
        getUser: monitor(function () {
          return userContextManager.getContext();
        }),
        setUserProperty: monitor(function (key, property) {
          var newUser = {};
          newUser[key] = property;
          var sanitizedProperty = sanitizeUser(newUser)[key];
          userContextManager.setContextProperty(key, sanitizedProperty);
        }),
        removeUserProperty: monitor(function (key) {
          return userContextManager.removeContextProperty(key);
        }),
        /** @deprecated: renamed to clearUser */
        removeUser: monitor(function () {
          return userContextManager.clearContext();
        }),
        clearUser: monitor(function () {
          return userContextManager.clearContext();
        }),
        startView: startView,
        stopSession: monitor(function () {
          stopSessionStrategy();
        }),
        startSessionReplayRecording: monitor(recorderApi.start),
        stopSessionReplayRecording: monitor(recorderApi.stop)
      });
      return rumPublicApi;
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
      function overrideInitConfigurationForBridge(initConfiguration) {
        return assign({}, initConfiguration, {
          applicationId: '00000000-aaaa-0000-aaaa-000000000000',
          sessionSampleRate: 100
        });
      }
    }

    var RecordType = {
      FullSnapshot: 2,
      IncrementalSnapshot: 3,
      Meta: 4,
      Focus: 6,
      ViewEnd: 7,
      VisualViewport: 8,
      FrustrationRecord: 9
    };
    var NodeType = {
      Document: 0,
      DocumentType: 1,
      Element: 2,
      Text: 3,
      CDATA: 4,
      DocumentFragment: 11
    };
    var IncrementalSource = {
      Mutation: 0,
      MouseMove: 1,
      MouseInteraction: 2,
      Scroll: 3,
      ViewportResize: 4,
      Input: 5,
      TouchMove: 6,
      MediaInteraction: 7,
      StyleSheetRule: 8
      // CanvasMutation : 9,
      // Font : 10,
    };

    var MouseInteractionType = {
      MouseUp: 0,
      MouseDown: 1,
      Click: 2,
      ContextMenu: 3,
      DblClick: 4,
      Focus: 5,
      Blur: 6,
      TouchStart: 7,
      TouchEnd: 9
    };
    var MediaInteractionType = {
      Play: 0,
      Pause: 1
    };

    var NodePrivacyLevel = {
      IGNORE: 'ignore',
      HIDDEN: 'hidden',
      ALLOW: DefaultPrivacyLevel.ALLOW,
      MASK: DefaultPrivacyLevel.MASK,
      MASK_USER_INPUT: DefaultPrivacyLevel.MASK_USER_INPUT
    };
    var PRIVACY_ATTR_NAME = 'data-gc-privacy';

    // Privacy Attrs
    var PRIVACY_ATTR_VALUE_ALLOW = 'allow';
    var PRIVACY_ATTR_VALUE_MASK = 'mask';
    var PRIVACY_ATTR_VALUE_MASK_USER_INPUT = 'mask-user-input';
    var PRIVACY_ATTR_VALUE_HIDDEN = 'hidden';

    // Privacy Classes - not all customers can set plain HTML attributes, so support classes too
    var PRIVACY_CLASS_ALLOW = 'gc-privacy-allow';
    var PRIVACY_CLASS_MASK = 'gc-privacy-mask';
    var PRIVACY_CLASS_MASK_USER_INPUT = 'gc-privacy-mask-user-input';
    var PRIVACY_CLASS_HIDDEN = 'gc-privacy-hidden';

    // Private Replacement Templates
    var CENSORED_STRING_MARK = '***';
    var CENSORED_IMG_MARK = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
    var FORM_PRIVATE_TAG_NAMES = {
      INPUT: true,
      OUTPUT: true,
      TEXTAREA: true,
      SELECT: true,
      OPTION: true,
      DATALIST: true,
      OPTGROUP: true
    };

    var MAX_ATTRIBUTE_VALUE_CHAR_LENGTH = 100000;
    var TEXT_MASKING_CHAR = 'x';

    /**
     * Get node privacy level by iterating over its ancestors. When the direct parent privacy level is
     * know, it is best to use something like:
     *
     * derivePrivacyLevelGivenParent(getNodeSelfPrivacyLevel(node), parentNodePrivacyLevel)
     */
    function getNodePrivacyLevel(node, defaultPrivacyLevel) {
      var parentNode = getParentNode(node);
      var parentNodePrivacyLevel = parentNode ? getNodePrivacyLevel(parentNode, defaultPrivacyLevel) : defaultPrivacyLevel;
      var selfNodePrivacyLevel = getNodeSelfPrivacyLevel(node);
      return reducePrivacyLevel(selfNodePrivacyLevel, parentNodePrivacyLevel);
    }

    /**
     * Reduces the next privacy level based on self + parent privacy levels
     */
    function reducePrivacyLevel(childPrivacyLevel, parentNodePrivacyLevel) {
      switch (parentNodePrivacyLevel) {
        // These values cannot be overridden
        case NodePrivacyLevel.HIDDEN:
        case NodePrivacyLevel.IGNORE:
          return parentNodePrivacyLevel;
      }
      switch (childPrivacyLevel) {
        case NodePrivacyLevel.ALLOW:
        case NodePrivacyLevel.MASK:
        case NodePrivacyLevel.MASK_USER_INPUT:
        case NodePrivacyLevel.HIDDEN:
        case NodePrivacyLevel.IGNORE:
          return childPrivacyLevel;
        default:
          return parentNodePrivacyLevel;
      }
    }

    /**
     * Determines the node's own privacy level without checking for ancestors.
     */
    function getNodeSelfPrivacyLevel(node) {
      // Only Element types can have a privacy level set
      if (!isElementNode(node)) {
        return;
      }
      var privAttr = node.getAttribute(PRIVACY_ATTR_NAME);

      // Overrules for replay purpose
      if (node.tagName === 'BASE') {
        return NodePrivacyLevel.ALLOW;
      }

      // Overrules to enforce end-user protection
      if (node.tagName === 'INPUT') {
        var inputElement = node;
        if (inputElement.type === 'password' || inputElement.type === 'email' || inputElement.type === 'tel') {
          return NodePrivacyLevel.MASK;
        }
        if (inputElement.type === 'hidden') {
          return NodePrivacyLevel.MASK;
        }
        var autocomplete = inputElement.getAttribute('autocomplete');
        // Handle input[autocomplete=cc-number/cc-csc/cc-exp/cc-exp-month/cc-exp-year]
        if (autocomplete && autocomplete.indexOf('cc-') === 0) {
          return NodePrivacyLevel.MASK;
        }
      }

      // Check HTML privacy attributes and classes
      if (privAttr === PRIVACY_ATTR_VALUE_HIDDEN || node.classList.contains(PRIVACY_CLASS_HIDDEN)) {
        return NodePrivacyLevel.HIDDEN;
      }
      if (privAttr === PRIVACY_ATTR_VALUE_MASK || node.classList.contains(PRIVACY_CLASS_MASK)) {
        return NodePrivacyLevel.MASK;
      }
      if (privAttr === PRIVACY_ATTR_VALUE_MASK_USER_INPUT || node.classList.contains(PRIVACY_CLASS_MASK_USER_INPUT)) {
        return NodePrivacyLevel.MASK_USER_INPUT;
      }
      if (privAttr === PRIVACY_ATTR_VALUE_ALLOW || node.classList.contains(PRIVACY_CLASS_ALLOW)) {
        return NodePrivacyLevel.ALLOW;
      }
      if (shouldIgnoreElement(node)) {
        return NodePrivacyLevel.IGNORE;
      }
    }

    /**
     * Helper aiming to unify `mask` and `mask-user-input` privacy levels:
     *
     * In the `mask` case, it is trivial: we should mask the element.
     *
     * In the `mask-user-input` case, we should mask the element only if it is a "form" element or the
     * direct parent is a form element for text nodes).
     *
     * Other `shouldMaskNode` cases are edge cases that should not matter too much (ex: should we mask a
     * node if it is ignored or hidden? it doesn't matter since it won't be serialized).
     */
    function shouldMaskNode(node, privacyLevel) {
      switch (privacyLevel) {
        case NodePrivacyLevel.MASK:
        case NodePrivacyLevel.HIDDEN:
        case NodePrivacyLevel.IGNORE:
          return true;
        case NodePrivacyLevel.MASK_USER_INPUT:
          return isTextNode(node) ? isFormElement(node.parentNode) : isFormElement(node);
        default:
          return false;
      }
    }
    function isFormElement(node) {
      if (!node || node.nodeType !== node.ELEMENT_NODE) {
        return false;
      }
      var element = node;
      if (element.tagName === 'INPUT') {
        switch (element.type) {
          case 'button':
          case 'color':
          case 'reset':
          case 'submit':
            return false;
        }
      }
      return !!FORM_PRIVATE_TAG_NAMES[element.tagName];
    }

    /**
     * Text censoring non-destructively maintains whitespace characters in order to preserve text shape
     * during replay.
     */
    var censorText = function censorText(text) {
      return text.replace(/\S/g, TEXT_MASKING_CHAR);
    };
    function getTextContent(textNode, ignoreWhiteSpace, parentNodePrivacyLevel) {
      // The parent node may not be a html element which has a tagName attribute.
      // So just let it be undefined which is ok in this use case.
      var parentTagName = textNode.parentElement && textNode.parentElement.tagName;
      var textContent = textNode.textContent || '';
      if (ignoreWhiteSpace && !textContent.trim()) {
        return;
      }
      var nodePrivacyLevel = parentNodePrivacyLevel;

      //   var isStyle = parentTagName === 'STYLE' ? true : undefined
      var isScript = parentTagName === 'SCRIPT';
      if (isScript) {
        // For perf reasons, we don't record script (heuristic)
        textContent = CENSORED_STRING_MARK;
      } else if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) {
        // Should never occur, but just in case, we set to CENSORED_MARK.
        textContent = CENSORED_STRING_MARK;
      } else if (shouldMaskNode(textNode, nodePrivacyLevel)) {
        if (
        // Scrambling the child list breaks text nodes for DATALIST/SELECT/OPTGROUP
        parentTagName === 'DATALIST' || parentTagName === 'SELECT' || parentTagName === 'OPTGROUP') {
          if (!textContent.trim()) {
            return;
          }
        } else if (parentTagName === 'OPTION') {
          // <Option> has low entropy in charset + text length, so use `CENSORED_STRING_MARK` when masked
          textContent = CENSORED_STRING_MARK;
        } else {
          textContent = censorText(textContent);
        }
      }
      //   else if (isStyle && textContent) {
      //     try {
      //       // try to read style sheet
      //       if (textNode.nextSibling || textNode.previousSibling) {
      //         // This is not the only child of the stylesheet.
      //         // We can't read all of the sheet's .cssRules and expect them
      //         // to _only_ include the current rule(s) added by the text node.
      //         // So we'll be conservative and keep textContent as-is.
      //       } else if (
      //         textNode.parentNode &&
      //         textNode.parentNode.sheet &&
      //         textNode.parentNode.sheet.cssRules
      //       ) {
      //         textContent = getCssRulesString(textNode.parentNode.sheet)
      //       }
      //     } catch (err) {}
      //     textContent = switchToAbsoluteUrl(textContent, getHref())
      //   }
      return textContent;
    }

    /**
     * TODO: Preserve CSS element order, and record the presence of the tag, just don't render
     * We don't need this logic on the recorder side.
     * For security related meta's, customer can mask themmanually given they
     * are easy to identify in the HEAD tag.
     */
    function shouldIgnoreElement(element) {
      if (element.nodeName === 'SCRIPT') {
        return true;
      }
      if (element.nodeName === 'LINK') {
        var relAttribute = getLowerCaseAttribute('rel');
        return (
          // Link as script - Ignore only when rel=preload, modulepreload or prefetch
          /preload|prefetch/i.test(relAttribute) && getLowerCaseAttribute('as') === 'script' ||
          // Favicons
          relAttribute === 'shortcut icon' || relAttribute === 'icon'
        );
      }
      if (element.nodeName === 'META') {
        var nameAttribute = getLowerCaseAttribute('name');
        var relAttribute = getLowerCaseAttribute('rel');
        var propertyAttribute = getLowerCaseAttribute('property');
        return (
          // Favicons
          /^msapplication-tile(image|color)$/.test(nameAttribute) || nameAttribute === 'application-name' || relAttribute === 'icon' || relAttribute === 'apple-touch-icon' || relAttribute === 'shortcut icon' ||
          // Description
          nameAttribute === 'keywords' || nameAttribute === 'description' ||
          // Social
          /^(og|twitter|fb):/.test(propertyAttribute) || /^(og|twitter):/.test(nameAttribute) || nameAttribute === 'pinterest' ||
          // Robots
          nameAttribute === 'robots' || nameAttribute === 'googlebot' || nameAttribute === 'bingbot' ||
          // Http headers. Ex: X-UA-Compatible, Content-Type, Content-Language, cache-control,
          // X-Translated-By
          element.hasAttribute('http-equiv') ||
          // Authorship
          nameAttribute === 'author' || nameAttribute === 'generator' || nameAttribute === 'framework' || nameAttribute === 'publisher' || nameAttribute === 'progid' || /^article:/.test(propertyAttribute) || /^product:/.test(propertyAttribute) ||
          // Verification
          nameAttribute === 'google-site-verification' || nameAttribute === 'yandex-verification' || nameAttribute === 'csrf-token' || nameAttribute === 'p:domain_verify' || nameAttribute === 'verify-v1' || nameAttribute === 'verification' || nameAttribute === 'shopify-checkout-api-token'
        );
      }
      function getLowerCaseAttribute(name) {
        return (element.getAttribute(name) || '').toLowerCase();
      }
      return false;
    }

    var serializedNodeIds = new WeakMap();
    function hasSerializedNode(node) {
      return serializedNodeIds.has(node);
    }
    function nodeAndAncestorsHaveSerializedNode(node) {
      var current = node;
      while (current) {
        if (!hasSerializedNode(current) && !isNodeShadowRoot(current)) {
          return false;
        }
        current = getParentNode(current);
      }
      return true;
    }
    function getSerializedNodeId(node) {
      return serializedNodeIds.get(node);
    }
    function setSerializedNodeId(node, serializeNodeId) {
      serializedNodeIds.set(node, serializeNodeId);
    }

    /**
     * Get the element "value" to be serialized as an attribute or an input update record. It respects
     * the input privacy mode of the element.
     * PERFROMANCE OPTIMIZATION: Assumes that privacy level `HIDDEN` is never encountered because of earlier checks.
     */
    function getElementInputValue(element, nodePrivacyLevel) {
      /*
       BROWSER SPEC NOTE: <input>, <select>
       For some <input> elements, the `value` is an exceptional property/attribute that has the
       value synced between el.value and el.getAttribute()
       input[type=button,checkbox,hidden,image,radio,reset,submit]
       */
      var tagName = element.tagName;
      var value = element.value;
      if (shouldMaskNode(element, nodePrivacyLevel)) {
        var type = element.type;
        if (tagName === 'INPUT' && (type === 'button' || type === 'submit' || type === 'reset' || type === 'range')) {
          // Overrule `MASK` privacy level for button-like element values, as they are used during replay
          // to display their label. They can still be hidden via the "hidden" privacy attribute or class name.
          return value;
        } else if (!value || tagName === 'OPTION') {
          // <Option> value provides no benefit
          return;
        }
        return CENSORED_STRING_MARK;
      }
      if (tagName === 'OPTION' || tagName === 'SELECT') {
        return element.value;
      }
      if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
        return;
      }
      return value;
    }
    function extractOrigin(url) {
      var origin = '';
      if (url.indexOf('//') > -1) {
        origin = url.split('/').slice(0, 3).join('/');
      } else {
        origin = url.split('/')[0];
      }
      origin = origin.split('?')[0];
      return origin;
    }
    var URL_IN_CSS_REF = /url\((?:(')([^']*)'|(")([^"]*)"|([^)]*))\)/gm;
    var ABSOLUTE_URL = /^[A-Za-z]+:|^\/\//;
    var DATA_URI = /^data:.*,/i;
    /**
     * Browsers sometimes destructively modify the css rules they receive.
     * This function tries to rectify the modifications the browser made to make it more cross platform compatible.
     * @param cssText - output of `CSSStyleRule.cssText`
     * @returns `cssText` with browser inconsistencies fixed.
     */
    function fixBrowserCompatibilityIssuesInCSS(cssText) {
      /**
       * Chrome outputs `-webkit-background-clip` as `background-clip` in `CSSStyleRule.cssText`.
       * But then Chrome ignores `background-clip` as css input.
       * Re-introduce `-webkit-background-clip` to fix this issue.
       */
      if (cssText.includes(' background-clip: text;') && !cssText.includes(' -webkit-background-clip: text;')) {
        cssText = cssText.replace(' background-clip: text;', ' -webkit-background-clip: text; background-clip: text;');
      }
      return cssText;
    }
    function getHref() {
      var a = document.createElement('a');
      a.href = '';
      return a.href;
    }
    function switchToAbsoluteUrl(cssText, cssHref) {
      return cssText.replace(URL_IN_CSS_REF, function (matchingSubstring, singleQuote, urlWrappedInSingleQuotes, doubleQuote, urlWrappedInDoubleQuotes, urlNotWrappedInQuotes) {
        var url = urlWrappedInSingleQuotes || urlWrappedInDoubleQuotes || urlNotWrappedInQuotes;
        if (!cssHref || !url || ABSOLUTE_URL.test(url) || DATA_URI.test(url)) {
          return matchingSubstring;
        }
        var quote = singleQuote || doubleQuote || '';
        if (url[0] === '/') {
          return 'url('.concat(quote).concat(extractOrigin(cssHref) + url).concat(quote, ')');
        }
        return "url(".concat(quote).concat(makeUrlAbsolute(url, cssHref)).concat(quote, ")");
      });
    }
    function getCssRulesString(cssStyleSheet) {
      if (!cssStyleSheet) {
        return null;
      }
      var rules;
      try {
        rules = cssStyleSheet.rules || cssStyleSheet.cssRules;
      } catch (_unused) {
        // if css is protected by CORS we cannot access cssRules see: https://www.w3.org/TR/cssom-1/#the-cssstylesheet-interface
      }
      if (!rules) {
        return null;
      }
      var styleSheetCssText = fixBrowserCompatibilityIssuesInCSS(Array.from(rules, isSafari() ? getCssRuleStringForSafari : getCssRuleString).join(''));
      return switchToAbsoluteUrl(styleSheetCssText, cssStyleSheet.href);
    }
    function isCSSImportRule(rule) {
      return 'styleSheet' in rule;
    }
    function isSVGElement(el) {
      return el.tagName === 'svg' || el instanceof SVGElement;
    }
    function getCssRuleString(rule) {
      return isCSSImportRule(rule) && getCssRulesString(rule.styleSheet) || rule.cssText;
    }
    function makeUrlAbsolute(url, baseUrl) {
      try {
        return buildUrl(url, baseUrl).href;
      } catch (_) {
        return url;
      }
    }
    function isCSSStyleRule(rule) {
      return 'selectorText' in rule;
    }
    function getCssRuleStringForSafari(rule) {
      // Safari does not escape attribute selectors containing : properly
      // https://bugs.webkit.org/show_bug.cgi?id=184604
      if (isCSSStyleRule(rule) && rule.selectorText.includes(':')) {
        // This regex replaces [foo:bar] by [foo\\:bar]
        var escapeColon = /(\[[\w-]+[^\\])(:[^\]]+\])/g;
        return rule.cssText.replace(escapeColon, '$1\\$2');
      }
      return getCssRuleString(rule);
    }
    function serializeStyleSheets(cssStyleSheets) {
      if (cssStyleSheets === undefined || cssStyleSheets.length === 0) {
        return undefined;
      }
      return cssStyleSheets.map(function (cssStyleSheet) {
        var rules = cssStyleSheet.cssRules || cssStyleSheet.rules;
        var cssRules = Array.from(rules, function (cssRule) {
          return cssRule.cssText;
        });
        var styleSheet = {
          cssRules: cssRules,
          disabled: cssStyleSheet.disabled || undefined,
          media: cssStyleSheet.media.length > 0 ? Array.from(cssStyleSheet.media) : undefined
        };
        return styleSheet;
      });
    }
    function absoluteToDoc(doc, attributeValue) {
      if (!attributeValue || attributeValue.trim() === '') {
        return attributeValue;
      }
      var a = doc.createElement('a');
      a.href = attributeValue;
      return a.href;
    }
    var SRCSET_NOT_SPACES = /^[^ \t\n\r\u000c]+/;
    var SRCSET_COMMAS_OR_SPACES = /^[, \t\n\r\u000c]+/;
    function getAbsoluteSrcsetString(doc, attributeValue) {
      if (attributeValue.trim() === '') {
        return attributeValue;
      }
      var pos = 0;
      function collectCharacters(regEx) {
        var chars;
        var match = regEx.exec(attributeValue.substring(pos));
        if (match) {
          chars = match[0];
          pos += chars.length;
          return chars;
        }
        return '';
      }
      var output = [];
      while (true) {
        collectCharacters(SRCSET_COMMAS_OR_SPACES);
        if (pos >= attributeValue.length) {
          break;
        }
        var url = collectCharacters(SRCSET_NOT_SPACES);
        if (url.slice(-1) === ',') {
          url = absoluteToDoc(doc, url.substring(0, url.length - 1));
          output.push(url);
        } else {
          var descriptorsStr = '';
          url = absoluteToDoc(doc, url);
          var inParens = false;
          while (true) {
            var c = attributeValue.charAt(pos);
            if (c === '') {
              output.push((url + descriptorsStr).trim());
              break;
            } else if (!inParens) {
              if (c === ',') {
                pos += 1;
                output.push((url + descriptorsStr).trim());
                break;
              } else if (c === '(') {
                inParens = true;
              }
            } else {
              if (c === ')') {
                inParens = false;
              }
            }
            descriptorsStr += c;
            pos += 1;
          }
        }
      }
      return output.join(', ');
    }

    function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
    function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$2(key) === "symbol" ? key : String(key); }
    function _toPrimitive$1(input, hint) { if (_typeof$2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

    // Those values are the only one that can be used when inheriting privacy levels from parent to
    // children during serialization, since HIDDEN and IGNORE shouldn't serialize their children. This
    // ensures that no children are serialized when they shouldn't.

    var SerializationContextStatus = {
      INITIAL_FULL_SNAPSHOT: 0,
      SUBSEQUENT_FULL_SNAPSHOT: 1,
      MUTATION: 2
    };
    function serializeDocument(document, configuration, serializationContext) {
      // We are sure that Documents are never ignored, so this function never returns null
      return serializeNodeWithId(document, {
        serializationContext: serializationContext,
        parentNodePrivacyLevel: configuration.defaultPrivacyLevel,
        configuration: configuration
      });
    }
    function serializeNodeWithId(node, options) {
      var serializedNode = serializeNode(node, options);
      if (!serializedNode) {
        return null;
      }

      // Try to reuse the previous id
      var id = getSerializedNodeId(node) || generateNextId();
      var serializedNodeWithId = serializedNode;
      serializedNodeWithId.id = id;
      setSerializedNodeId(node, id);
      if (options.serializedNodeIds) {
        options.serializedNodeIds.add(id);
      }
      return serializedNodeWithId;
    }
    function serializeNode(node, options) {
      switch (node.nodeType) {
        case node.DOCUMENT_NODE:
          return serializeDocumentNode(node, options);
        case node.DOCUMENT_FRAGMENT_NODE:
          return serializeDocumentFragmentNode(node, options);
        case node.DOCUMENT_TYPE_NODE:
          return serializeDocumentTypeNode(node);
        case node.ELEMENT_NODE:
          return serializeElementNode(node, options);
        case node.TEXT_NODE:
          return serializeTextNode(node, options);
        case node.CDATA_SECTION_NODE:
          return serializeCDataNode();
      }
    }
    function serializeDocumentNode(document, options) {
      return {
        type: NodeType.Document,
        childNodes: serializeChildNodes(document, options),
        adoptedStyleSheets: serializeStyleSheets(document.adoptedStyleSheets)
      };
    }
    function serializeDocumentTypeNode(documentType) {
      return {
        type: NodeType.DocumentType,
        name: documentType.name,
        publicId: documentType.publicId,
        systemId: documentType.systemId
      };
    }
    function serializeDocumentFragmentNode(element, options) {
      var isShadowRoot = isNodeShadowRoot(element);
      if (isShadowRoot) {
        options.serializationContext.shadowRootsController.addShadowRoot(element);
      }
      return {
        type: NodeType.DocumentFragment,
        childNodes: serializeChildNodes(element, options),
        isShadowRoot: isShadowRoot,
        adoptedStyleSheets: isShadowRoot ? serializeStyleSheets(element.adoptedStyleSheets) : undefined
      };
    }

    /**
     * Serializing Element nodes involves capturing:
     * 1. HTML ATTRIBUTES:
     * 2. JS STATE:
     * - scroll offsets
     * - Form fields (input value, checkbox checked, option selection, range)
     * - Canvas state,
     * - Media (video/audio) play mode + currentTime
     * - iframe contents
     * - webcomponents
     * 3. CUSTOM PROPERTIES:
     * - height+width for when `hidden` to cover the element
     * 4. EXCLUDED INTERACTION STATE:
     * - focus (possible, but not worth perf impact)
     * - hover (tracked only via mouse activity)
     * - fullscreen mode
     */
    function serializeElementNode(element, options) {
      var tagName = getValidTagName(element.tagName);
      var isSVG = isSVGElement(element) || undefined;

      // For performance reason, we don't use getNodePrivacyLevel directly: we leverage the
      // parentNodePrivacyLevel option to avoid iterating over all parents
      var nodePrivacyLevel = reducePrivacyLevel(getNodeSelfPrivacyLevel(element), options.parentNodePrivacyLevel);
      if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) {
        var _boundingClientRect = element.getBoundingClientRect();
        var width = _boundingClientRect.width;
        var height = _boundingClientRect.height;
        return {
          type: NodeType.Element,
          tagName: tagName,
          attributes: _defineProperty$1({
            rr_width: width + 'px',
            rr_height: height + 'px'
          }, PRIVACY_ATTR_NAME, PRIVACY_ATTR_VALUE_HIDDEN),
          childNodes: [],
          isSVG: isSVG
        };
      }

      // Ignore Elements like Script and some Link, Metas
      if (nodePrivacyLevel === NodePrivacyLevel.IGNORE) {
        return;
      }
      var attributes = getAttributesForPrivacyLevel(element, nodePrivacyLevel, options);
      var childNodes = [];
      if (hasChildNodes(element) && tagName !== 'style') {
        // OBJECT POOLING OPTIMIZATION:
        // We should not create a new object systematically as it could impact performances. Try to reuse
        // the same object as much as possible, and clone it only if we need to.
        var childNodesSerializationOptions;
        if (options.parentNodePrivacyLevel === nodePrivacyLevel && options.ignoreWhiteSpace === (tagName === 'head')) {
          childNodesSerializationOptions = options;
        } else {
          childNodesSerializationOptions = assign({}, options, {
            parentNodePrivacyLevel: nodePrivacyLevel,
            ignoreWhiteSpace: tagName === 'head'
          });
        }
        childNodes = serializeChildNodes(element, childNodesSerializationOptions);
      }

      //   if (isNodeShadowHost(element)) {
      //     var shadowRoot = serializeNodeWithId(element.shadowRoot, options)
      //     if (shadowRoot !== null) {
      //       childNodes.push(shadowRoot)
      //     }
      //   }

      return {
        type: NodeType.Element,
        tagName: tagName,
        attributes: attributes,
        childNodes: childNodes,
        isSVG: isSVG
      };
    }

    /**
     * Text Nodes are dependant on Element nodes
     * Privacy levels are set on elements so we check the parentElement of a text node
     * for privacy level.
     */
    function serializeTextNode(textNode, options) {
      // The parent node may not be a html element which has a tagName attribute.
      // So just let it be undefined which is ok in this use case.
      //   var parentTagName = textNode.parentElement && textNode.parentElement.tagName
      var textContent = getTextContent(textNode, options.ignoreWhiteSpace || false, options.parentNodePrivacyLevel);
      if (textContent === undefined) {
        return;
      }
      return {
        type: NodeType.Text,
        textContent: textContent
        // isStyle: parentTagName === 'STYLE' ? true : undefined
      };
    }

    function serializeCDataNode() {
      return {
        type: NodeType.CDATA,
        textContent: ''
      };
    }
    function serializeChildNodes(node, options) {
      var result = [];
      forEachChildNodes(node, function (childNode) {
        var serializedChildNode = serializeNodeWithId(childNode, options);
        if (serializedChildNode) {
          result.push(serializedChildNode);
        }
      });
      //   node.childNodes.forEach()
      return result;
    }
    function serializeAttribute(element, nodePrivacyLevel, attributeName, configuration) {
      if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) {
        // dup condition for direct access case
        return null;
      }
      var attributeValue = element.getAttribute(attributeName);
      if (nodePrivacyLevel === NodePrivacyLevel.MASK && attributeName !== PRIVACY_ATTR_NAME && !STABLE_ATTRIBUTES.includes(attributeName) && attributeName !== configuration.actionNameAttribute) {
        var tagName = element.tagName;
        switch (attributeName) {
          // Mask Attribute text content
          case 'title':
          case 'alt':
          case 'placeholder':
            return CENSORED_STRING_MARK;
        }
        // mask image URLs
        if (tagName === 'IMG' || tagName === 'SOURCE') {
          if (attributeName === 'src' || attributeName === 'srcset') {
            return CENSORED_IMG_MARK;
          } else if (attributeName === 'onerror') {
            return null;
          }
        }
        // mask <a> URLs
        if (tagName === 'A' && attributeName === 'href') {
          return CENSORED_STRING_MARK;
        }

        // mask data-* attributes
        if (attributeValue && startsWith(attributeName, 'data-')) {
          // Exception: it's safe to reveal the `${PRIVACY_ATTR_NAME}` attr
          return CENSORED_STRING_MARK;
        }
      }
      if (!attributeValue || typeof attributeValue !== 'string') {
        return attributeValue;
      }

      // Minimum Fix for customer.
      if (attributeValue.length > MAX_ATTRIBUTE_VALUE_CHAR_LENGTH && attributeValue.slice(0, 5) === 'data:') {
        return 'data:truncated';
      }
      return attributeValue;
    }
    var _nextId = 1;
    function generateNextId() {
      return _nextId++;
    }
    var TAG_NAME_REGEX = /[^a-z1-6-_]/;
    function getValidTagName(tagName) {
      var processedTagName = (tagName + '').toLowerCase().trim();
      if (TAG_NAME_REGEX.test(processedTagName)) {
        // if the tag name is odd and we cannot extract
        // anything from the string, then we return a
        // generic div
        return 'div';
      }
      return processedTagName;
    }
    function transformAttribute(doc, tagName, name, value) {
      if (!value) return value;
      if (name === 'src' || name === 'href' && !(tagName === 'use' && value[0] === '#')) {
        return absoluteToDoc(doc, value);
      } else if (name === 'xlink:href' && value[0] !== '#') {
        return absoluteToDoc(doc, value);
      } else if (name === 'background' && value && (tagName === 'table' || tagName === 'td' || tagName === 'th')) {
        return absoluteToDoc(doc, value);
      } else if (name === 'srcset') {
        return getAbsoluteSrcsetString(doc, value);
      } else if (name === 'style') {
        return switchToAbsoluteUrl(value, getHref());
      } else if (tagName === 'object' && name === 'data') {
        return absoluteToDoc(doc, value);
      } else {
        return value;
      }
    }
    function getAttributesForPrivacyLevel(element, nodePrivacyLevel, options) {
      if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) {
        return {};
      }
      var safeAttrs = {};
      var tagName = getValidTagName(element.tagName);
      var doc = element.ownerDocument;
      for (var i = 0; i < element.attributes.length; i += 1) {
        var attribute = element.attributes.item(i);
        var attributeName = attribute.name;
        var attributeValue = serializeAttribute(element, nodePrivacyLevel, attributeName, options.configuration);
        if (attributeValue !== null) {
          safeAttrs[attributeName] = transformAttribute(doc, tagName, attributeName, attributeValue);
        }
      }
      if (element.value && (tagName === 'textarea' || tagName === 'select' || tagName === 'option' || tagName === 'input')) {
        var formValue = getElementInputValue(element, nodePrivacyLevel);
        if (formValue !== undefined) {
          safeAttrs.value = formValue;
        }
      }

      /**
       * <Option> can be selected, which occurs if its `value` matches ancestor `<Select>.value`
       */
      if (tagName === 'option' && nodePrivacyLevel === NodePrivacyLevel.ALLOW) {
        // For privacy=`MASK`, all the values would be the same, so skip.
        var optionElement = element;
        if (optionElement.selected) {
          safeAttrs.selected = optionElement.selected;
        }
      }

      // remote css
      if (tagName === 'link') {
        var stylesheet = Array.from(doc.styleSheets).find(function (s) {
          return s.href === element.href;
        });
        var cssText = getCssRulesString(stylesheet);
        if (cssText && stylesheet) {
          safeAttrs._cssText = cssText;
        }
      }

      // dynamic stylesheet
      if (tagName === 'style' && element.sheet) {
        var cssText = getCssRulesString(element.sheet);
        if (cssText) {
          safeAttrs._cssText = cssText;
        }
      }

      /**
       * Forms: input[type=checkbox,radio]
       * The `checked` property for <input> is a little bit special:
       * 1. el.checked is a setter that returns if truthy.
       * 2. getAttribute returns the string value
       * getAttribute('checked') does not sync with `Element.checked`, so use JS property
       * NOTE: `checked` property exists on `HTMLInputElement`. For serializer assumptions, we check for type=radio|check.
       */
      var inputElement = element;
      if (tagName === 'input' && (inputElement.type === 'radio' || inputElement.type === 'checkbox')) {
        if (nodePrivacyLevel === NodePrivacyLevel.ALLOW) {
          safeAttrs.checked = !!inputElement.checked;
        } else if (shouldMaskNode(inputElement, nodePrivacyLevel)) {
          delete safeAttrs.checked;
        }
      }

      /**
       * Serialize the media playback state
       */
      if (tagName === 'audio' || tagName === 'video') {
        var mediaElement = element;
        safeAttrs.rr_mediaState = mediaElement.paused ? 'paused' : 'played';
      }

      /**
       * Serialize the scroll state for each element only for full snapshot
       */
      var scrollTop;
      var scrollLeft;
      var serializationContext = options.serializationContext;
      switch (serializationContext.status) {
        case SerializationContextStatus.INITIAL_FULL_SNAPSHOT:
          scrollTop = Math.round(element.scrollTop);
          scrollLeft = Math.round(element.scrollLeft);
          if (scrollTop || scrollLeft) {
            serializationContext.elementsScrollPositions.set(element, {
              scrollTop: scrollTop,
              scrollLeft: scrollLeft
            });
          }
          break;
        case SerializationContextStatus.SUBSEQUENT_FULL_SNAPSHOT:
          if (serializationContext.elementsScrollPositions.has(element)) {
            var scroll = serializationContext.elementsScrollPositions.get(element);
            scrollTop = scroll.scrollTop;
            scrollLeft = scroll.scrollLeft;
          }
          break;
      }
      if (scrollLeft) {
        safeAttrs.rr_scrollLeft = scrollLeft;
      }
      if (scrollTop) {
        safeAttrs.rr_scrollTop = scrollTop;
      }
      return safeAttrs;
    }

    function isTouchEvent(event) {
      return Boolean(event.changedTouches);
    }
    function forEach(list, callback) {
      Array.prototype.forEach.call(list, callback);
    }
    function assembleIncrementalSnapshot(source, data) {
      return {
        data: assign({
          source: source
        }, data),
        type: RecordType.IncrementalSnapshot,
        timestamp: timeStampNow()
      };
    }
    function getPathToNestedCSSRule(rule) {
      var path = [];
      var currentRule = rule;
      while (currentRule.parentRule) {
        var rules = Array.from(currentRule.parentRule.cssRules);
        var index = rules.indexOf(currentRule);
        path.unshift(index);
        currentRule = currentRule.parentRule;
      }
      // A rule may not be attached to a stylesheet
      if (!currentRule.parentStyleSheet) {
        return;
      }
      var rules = Array.from(currentRule.parentStyleSheet.cssRules);
      var index = rules.indexOf(currentRule);
      path.unshift(index);
      return path;
    }

    /**
     * Maximum duration to wait before processing mutations. If the browser is idle, mutations will be
     * processed more quickly. If the browser is busy executing small tasks (ex: rendering frames), the
     * mutations will wait MUTATION_PROCESS_MAX_DELAY milliseconds before being processed. If the
     * browser is busy executing a longer task, mutations will be processed after this task.
     */
    var MUTATION_PROCESS_MAX_DELAY = 100;
    function createMutationBatch(processMutationBatch) {
      var cancelScheduledFlush = noop;
      var pendingMutations = [];
      function flush() {
        cancelScheduledFlush();
        processMutationBatch(pendingMutations);
        pendingMutations = [];
      }
      return {
        addMutations: function addMutations(mutations) {
          if (pendingMutations.length === 0) {
            cancelScheduledFlush = requestIdleCallback(flush, {
              timeout: MUTATION_PROCESS_MAX_DELAY
            });
          }
          //   pendingMutations.push(...mutations)
          Array.prototype.push.apply(pendingMutations, mutations);
        },
        flush: flush,
        stop: function stop() {
          cancelScheduledFlush();
        }
      };
    }
    function requestIdleCallback(callback, opts) {
      // Use 'requestIdleCallback' when available: it will throttle the mutation processing if the
      // browser is busy rendering frames (ex: when frames are below 60fps). When not available, the
      // fallback on 'requestAnimationFrame' will still ensure the mutations are processed after any
      // browser rendering process (Layout, Recalculate Style, etc.), so we can serialize DOM nodes
      // efficiently.
      if (window.requestIdleCallback) {
        var id = window.requestIdleCallback(monitor(callback), opts);
        return function () {
          return window.cancelIdleCallback(id);
        };
      }
      var id = window.requestAnimationFrame(monitor(callback));
      return function () {
        return window.cancelAnimationFrame(id);
      };
    }

    function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

    /**
     * Buffers and aggregate mutations generated by a MutationObserver into MutationPayload
     */
    function startMutationObserver(mutationCallback, configuration, shadowRootsController, target) {
      var MutationObserver = getMutationObserverConstructor();
      if (!MutationObserver) {
        return {
          stop: noop,
          flush: noop
        };
      }
      var mutationBatch = createMutationBatch(function (mutations) {
        processMutations(mutations.concat(observer.takeRecords()), mutationCallback, configuration, shadowRootsController);
      });
      var observer = new MutationObserver(monitor(mutationBatch.addMutations));
      observer.observe(target, {
        attributeOldValue: true,
        attributes: true,
        characterData: true,
        characterDataOldValue: true,
        childList: true,
        subtree: true
      });
      return {
        stop: function stop() {
          observer.disconnect();
          mutationBatch.stop();
        },
        flush: function flush() {
          mutationBatch.flush();
        }
      };
    }
    function processMutations(mutations, mutationCallback, configuration, shadowRootsController) {
      mutations.filter(function (mutation) {
        return mutation.type === 'childList';
      }).forEach(function (mutation) {
        mutation.removedNodes.forEach(function (removedNode) {
          traverseRemovedShadowDom(removedNode, shadowRootsController.removeShadowRoot);
        });
      });

      // Discard any mutation with a 'target' node that:
      // * isn't injected in the current document or isn't known/serialized yet: those nodes are likely
      // part of a mutation occurring in a parent Node
      // * should be hidden or ignored
      var filteredMutations = mutations.filter(function (mutation) {
        return mutation.target.isConnected && nodeAndAncestorsHaveSerializedNode(mutation.target) && getNodePrivacyLevel(mutation.target, configuration.defaultPrivacyLevel) !== NodePrivacyLevel.HIDDEN;
      });
      var _processChildListMutations = processChildListMutations(filteredMutations.filter(function (mutation) {
        return mutation.type === 'childList';
      }), configuration, shadowRootsController);
      var adds = _processChildListMutations.adds;
      var removes = _processChildListMutations.removes;
      //   var hasBeenSerialized = _processChildListMutations.hasBeenSerialized
      var serializedNodeIds = _processChildListMutations.serializedNodeIds;
      function hasBeenSerialized(node) {
        return hasSerializedNode(node) && serializedNodeIds.has(getSerializedNodeId(node));
      }
      var texts = processCharacterDataMutations(filteredMutations.filter(function (mutation) {
        return mutation.type === 'characterData' && !hasBeenSerialized(mutation.target);
      }), configuration);
      var attributes = processAttributesMutations(filteredMutations.filter(function (mutation) {
        return mutation.type === 'attributes' && !hasBeenSerialized(mutation.target);
      }), configuration);
      if (!texts.length && !attributes.length && !removes.length && !adds.length) {
        return;
      }
      mutationCallback({
        adds: adds,
        removes: removes,
        texts: texts,
        attributes: attributes
      });
    }
    function processChildListMutations(mutations, configuration, shadowRootsController) {
      // First, we iterate over mutations to collect:
      //
      // * nodes that have been added in the document and not removed by a subsequent mutation
      // * nodes that have been removed from the document but were not added in a previous mutation
      //
      // For this second category, we also collect their previous parent (mutation.target) because we'll
      // need it to emit a 'remove' mutation.
      //
      // Those two categories may overlap: if a node moved from a position to another, it is reported as
      // two mutation records, one with a "removedNodes" and the other with "addedNodes". In this case,
      // the node will be in both sets.
      var addedAndMovedNodes = new Set();
      var removedNodes = new Map();
      var _iterator = _createForOfIteratorHelper(mutations),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var mutation = _step.value;
          mutation.addedNodes.forEach(function (node) {
            addedAndMovedNodes.add(node);
          });
          mutation.removedNodes.forEach(function (node) {
            if (!addedAndMovedNodes.has(node)) {
              removedNodes.set(node, mutation.target);
            }
            addedAndMovedNodes["delete"](node);
          });
        }

        // Then, we sort nodes that are still in the document by topological order, for two reasons:
        //
        // * We will serialize each added nodes with their descendants. We don't want to serialize a node
        // twice, so we need to iterate over the parent nodes first and skip any node that is contained in
        // a precedent node.
        //
        // * To emit "add" mutations, we need references to the parent and potential next sibling of each
        // added node. So we need to iterate over the parent nodes first, and when multiple nodes are
        // siblings, we want to iterate from last to first. This will ensure that any "next" node is
        // already serialized and have an id.
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var sortedAddedAndMovedNodes = Array.from(addedAndMovedNodes);
      sortAddedAndMovedNodes(sortedAddedAndMovedNodes);

      // Then, we iterate over our sorted node sets to emit mutations. We collect the newly serialized
      // node ids in a set to be able to skip subsequent related mutations.
      var serializedNodeIds = new Set();
      var addedNodeMutations = [];
      for (var _i = 0, _sortedAddedAndMovedN = sortedAddedAndMovedNodes; _i < _sortedAddedAndMovedN.length; _i++) {
        var node = _sortedAddedAndMovedN[_i];
        if (hasBeenSerialized(node)) {
          continue;
        }
        var parentNodePrivacyLevel = getNodePrivacyLevel(node.parentNode, configuration.defaultPrivacyLevel);
        if (parentNodePrivacyLevel === NodePrivacyLevel.HIDDEN || parentNodePrivacyLevel === NodePrivacyLevel.IGNORE) {
          continue;
        }
        var serializedNode = serializeNodeWithId(node, {
          serializedNodeIds: serializedNodeIds,
          parentNodePrivacyLevel: parentNodePrivacyLevel,
          serializationContext: {
            status: SerializationContextStatus.MUTATION,
            shadowRootsController: shadowRootsController
          },
          configuration: configuration
        });
        if (!serializedNode) {
          continue;
        }
        var parentNode = getParentNode(node);
        addedNodeMutations.push({
          nextId: getNextSibling(node),
          parentId: getSerializedNodeId(parentNode),
          node: serializedNode
        });
      }
      // Finally, we emit remove mutations.
      var removedNodeMutations = [];
      removedNodes.forEach(function (parent, node) {
        if (hasSerializedNode(node)) {
          removedNodeMutations.push({
            parentId: getSerializedNodeId(parent),
            id: getSerializedNodeId(node)
          });
        }
      });
      return {
        adds: addedNodeMutations,
        removes: removedNodeMutations,
        serializedNodeIds: serializedNodeIds,
        hasBeenSerialized: hasBeenSerialized
      };
      function hasBeenSerialized(node) {
        return hasSerializedNode(node) && serializedNodeIds.has(getSerializedNodeId(node));
      }
      function getNextSibling(node) {
        var nextSibling = node.nextSibling;
        while (nextSibling) {
          if (hasSerializedNode(nextSibling)) {
            return getSerializedNodeId(nextSibling);
          }
          nextSibling = nextSibling.nextSibling;
        }
        return null;
      }
    }
    function processCharacterDataMutations(mutations, configuration) {
      var textMutations = [];

      // Deduplicate mutations based on their target node
      var handledNodes = new Set();
      var filteredMutations = mutations.filter(function (mutation) {
        if (handledNodes.has(mutation.target)) {
          return false;
        }
        handledNodes.add(mutation.target);
        return true;
      });

      // Emit mutations
      var _iterator2 = _createForOfIteratorHelper(filteredMutations),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var mutation = _step2.value;
          var value = mutation.target.textContent;
          if (value === mutation.oldValue) {
            continue;
          }
          var parentNodePrivacyLevel = getNodePrivacyLevel(getParentNode(mutation.target), configuration.defaultPrivacyLevel);
          if (parentNodePrivacyLevel === NodePrivacyLevel.HIDDEN || parentNodePrivacyLevel === NodePrivacyLevel.IGNORE) {
            continue;
          }
          textMutations.push({
            id: getSerializedNodeId(mutation.target),
            // TODO: pass a valid "ignoreWhiteSpace" argument
            value: isNullUndefinedDefaultValue(getTextContent(mutation.target, false, parentNodePrivacyLevel, null))
          });
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return textMutations;
    }
    function processAttributesMutations(mutations, configuration) {
      var attributeMutations = [];

      // Deduplicate mutations based on their target node and changed attribute
      var handledElements = new Map();
      var filteredMutations = mutations.filter(function (mutation) {
        var handledAttributes = handledElements.get(mutation.target);
        if (handledAttributes && handledAttributes.has(mutation.attributeName)) {
          return false;
        }
        if (!handledAttributes) {
          handledElements.set(mutation.target, new Set([mutation.attributeName]));
        } else {
          handledAttributes.add(mutation.attributeName);
        }
        return true;
      });

      // Emit mutations
      var emittedMutations = new Map();
      var _iterator3 = _createForOfIteratorHelper(filteredMutations),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var mutation = _step3.value;
          var uncensoredValue = mutation.target.getAttribute(mutation.attributeName);
          if (uncensoredValue === mutation.oldValue) {
            continue;
          }
          var privacyLevel = getNodePrivacyLevel(mutation.target, configuration.defaultPrivacyLevel);
          var attributeValue = serializeAttribute(mutation.target, privacyLevel, mutation.attributeName, configuration);
          var transformedValue;
          if (mutation.attributeName === 'value') {
            var inputValue = getElementInputValue(mutation.target, privacyLevel);
            if (inputValue === undefined) {
              continue;
            }
            transformedValue = inputValue;
          } else if (typeof attributeValue === 'string') {
            transformedValue = attributeValue;
          } else {
            transformedValue = null;
          }
          var emittedMutation = emittedMutations.get(mutation.target);
          if (!emittedMutation) {
            emittedMutation = {
              id: getSerializedNodeId(mutation.target),
              attributes: {}
            };
            attributeMutations.push(emittedMutation);
            emittedMutations.set(mutation.target, emittedMutation);
          }
          emittedMutation.attributes[mutation.attributeName] = transformedValue;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return attributeMutations;
    }
    function sortAddedAndMovedNodes(nodes) {
      nodes.sort(function (a, b) {
        var position = a.compareDocumentPosition(b);
        /* eslint-disable no-bitwise */
        if (position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
          return -1;
        } else if (position & Node.DOCUMENT_POSITION_CONTAINS) {
          return 1;
        } else if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
          return 1;
        } else if (position & Node.DOCUMENT_POSITION_PRECEDING) {
          return -1;
        }
        /* eslint-enable no-bitwise */
        return 0;
      });
    }
    function traverseRemovedShadowDom(removedNode, shadowDomRemovedCallback) {
      if (isNodeShadowHost(removedNode)) {
        shadowDomRemovedCallback(removedNode.shadowRoot);
      }
      forEachChildNodes(removedNode, function (childNode) {
        return traverseRemovedShadowDom(childNode, shadowDomRemovedCallback);
      });
    }

    /**
     * Browsers have not standardized various dimension properties. Mobile devices typically report
     * dimensions in reference to the visual viewport, while desktop uses the layout viewport. For example,
     * Mobile Chrome will change innerWidth when a pinch zoom takes place, while Chrome Desktop (mac) will not.
     *
     * With the new Viewport API, we now calculate and normalize dimension properties to the layout viewport.
     * If the VisualViewport API is not supported by a browser, it isn't reasonably possible to detect or normalize
     * which viewport is being measured. Therefore these exported functions will fallback to assuming that the layout
     * viewport is being measured by the browser
     */

    // Scrollbar widths vary across properties on different devices and browsers
    var TOLERANCE = 25;

    /**
     * Use the Visual Viewport API's properties to measure scrollX/Y in reference to the layout viewport
     * in order to determine if window.scrollX/Y is measuring the layout or visual viewport.
     * This finding corresponds to which viewport mouseEvent.clientX/Y and window.innerWidth/Height measures.
     */
    function isVisualViewportFactoredIn() {
      var visual = window.visualViewport;
      return Math.abs(visual.pageTop - visual.offsetTop - window.scrollY) > TOLERANCE || Math.abs(visual.pageLeft - visual.offsetLeft - window.scrollX) > TOLERANCE;
    }
    var convertMouseEventToLayoutCoordinates = function convertMouseEventToLayoutCoordinates(clientX, clientY) {
      var visual = window.visualViewport;
      var normalised = {
        layoutViewportX: clientX,
        layoutViewportY: clientY,
        visualViewportX: clientX,
        visualViewportY: clientY
      };
      if (!visual) {
        // On old browsers, we cannot normalise, so fallback to clientX/Y
        return normalised;
      } else if (isVisualViewportFactoredIn()) {
        // Typically Mobile Devices
        normalised.layoutViewportX = Math.round(clientX + visual.offsetLeft);
        normalised.layoutViewportY = Math.round(clientY + visual.offsetTop);
      } else {
        // Typically Desktop Devices
        normalised.visualViewportX = Math.round(clientX - visual.offsetLeft);
        normalised.visualViewportY = Math.round(clientY - visual.offsetTop);
      }
      return normalised;
    };
    var getVisualViewport = function getVisualViewport() {
      var visual = window.visualViewport;
      return {
        scale: visual.scale,
        offsetLeft: visual.offsetLeft,
        offsetTop: visual.offsetTop,
        pageLeft: visual.pageLeft,
        pageTop: visual.pageTop,
        height: visual.height,
        width: visual.width
      };
    };

    var _eventTypeToMouseInte;
    function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
    function _toPrimitive(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
    var MOUSE_MOVE_OBSERVER_THRESHOLD = 50;
    var SCROLL_OBSERVER_THRESHOLD = 100;
    var VISUAL_VIEWPORT_OBSERVER_THRESHOLD = 200;
    var recordIds = new WeakMap();
    var nextId = 1;
    function getRecordIdForEvent(event) {
      if (!recordIds.has(event)) {
        recordIds.set(event, nextId++);
      }
      return recordIds.get(event);
    }
    function initObservers(o) {
      var mutationHandler = initMutationObserver(o.mutationCb, o.configuration, o.shadowRootsController);
      var mousemoveHandler = initMoveObserver(o.mousemoveCb);
      var mouseInteractionHandler = initMouseInteractionObserver(o.mouseInteractionCb, o.configuration.defaultPrivacyLevel);
      var scrollHandler = initScrollObserver(o.scrollCb, o.configuration.defaultPrivacyLevel, o.elementsScrollPositions);
      var viewportResizeHandler = initViewportResizeObserver(o.viewportResizeCb);
      var inputHandler = initInputObserver(o.inputCb, o.configuration.defaultPrivacyLevel);
      var mediaInteractionHandler = initMediaInteractionObserver(o.mediaInteractionCb, o.configuration.defaultPrivacyLevel);
      var styleSheetObserver = initStyleSheetObserver(o.styleSheetCb);
      var focusHandler = initFocusObserver(o.focusCb);
      var visualViewportResizeHandler = initVisualViewportResizeObserver(o.visualViewportResizeCb);
      var frustrationHandler = initFrustrationObserver(o.lifeCycle, o.frustrationCb);
      return {
        flush: function flush() {
          mutationHandler.flush();
        },
        stop: function stop() {
          mutationHandler.stop();
          mousemoveHandler();
          mouseInteractionHandler();
          scrollHandler();
          viewportResizeHandler();
          inputHandler();
          mediaInteractionHandler();
          styleSheetObserver();
          focusHandler();
          visualViewportResizeHandler();
          frustrationHandler();
        }
      };
    }
    function initMutationObserver(cb, configuration, shadowRootsController) {
      return startMutationObserver(cb, configuration, shadowRootsController, document);
    }
    function initMoveObserver(cb) {
      var _updatePosition = throttle(function (event) {
        var target = getEventTarget(event);
        if (hasSerializedNode(target)) {
          var coordinates = tryToComputeCoordinates(event);
          if (!coordinates) {
            return;
          }
          var position = {
            id: getSerializedNodeId(target),
            timeOffset: 0,
            x: coordinates.x,
            y: coordinates.y
          };
          cb([position], isTouchEvent(event) ? IncrementalSource.TouchMove : IncrementalSource.MouseMove);
        }
      }, MOUSE_MOVE_OBSERVER_THRESHOLD, {
        trailing: false
      });
      return addEventListeners(document, [DOM_EVENT.MOUSE_MOVE, DOM_EVENT.TOUCH_MOVE], _updatePosition.throttled, {
        capture: true,
        passive: true
      }).stop;
    }
    var eventTypeToMouseInteraction = (_eventTypeToMouseInte = {}, _defineProperty(_eventTypeToMouseInte, DOM_EVENT.POINTER_UP, MouseInteractionType.MouseUp), _defineProperty(_eventTypeToMouseInte, DOM_EVENT.MOUSE_DOWN, MouseInteractionType.MouseDown), _defineProperty(_eventTypeToMouseInte, DOM_EVENT.CLICK, MouseInteractionType.Click), _defineProperty(_eventTypeToMouseInte, DOM_EVENT.CONTEXT_MENU, MouseInteractionType.ContextMenu), _defineProperty(_eventTypeToMouseInte, DOM_EVENT.DBL_CLICK, MouseInteractionType.DblClick), _defineProperty(_eventTypeToMouseInte, DOM_EVENT.FOCUS, MouseInteractionType.Focus), _defineProperty(_eventTypeToMouseInte, DOM_EVENT.BLUR, MouseInteractionType.Blur), _defineProperty(_eventTypeToMouseInte, DOM_EVENT.TOUCH_START, MouseInteractionType.TouchStart), _defineProperty(_eventTypeToMouseInte, DOM_EVENT.TOUCH_END, MouseInteractionType.TouchEnd), _eventTypeToMouseInte);
    function initMouseInteractionObserver(cb, defaultPrivacyLevel) {
      var handler = function handler(event) {
        var target = getEventTarget(event);
        if (getNodePrivacyLevel(target, defaultPrivacyLevel) === NodePrivacyLevel.HIDDEN || !hasSerializedNode(target)) {
          return;
        }
        var id = getSerializedNodeId(target);
        var type = eventTypeToMouseInteraction[event.type];
        var interaction;
        if (type !== MouseInteractionType.Blur && type !== MouseInteractionType.Focus) {
          var coordinates = tryToComputeCoordinates(event);
          if (!coordinates) {
            return;
          }
          interaction = {
            id: id,
            type: type,
            x: coordinates.x,
            y: coordinates.y
          };
        } else {
          interaction = {
            id: id,
            type: type
          };
        }
        var record = assign({
          id: getRecordIdForEvent(event)
        }, assembleIncrementalSnapshot(IncrementalSource.MouseInteraction, interaction));
        cb(record);
      };
      return addEventListeners(document, Object.keys(eventTypeToMouseInteraction), handler, {
        capture: true,
        passive: true
      }).stop;
    }
    function tryToComputeCoordinates(event) {
      var _event = isTouchEvent(event) ? event.changedTouches[0] : event;
      var x = _event.clientX;
      var y = _event.clientY;
      if (window.visualViewport) {
        var _convertMouseEventToLayoutCoordinates = convertMouseEventToLayoutCoordinates(x, y);
        x = _convertMouseEventToLayoutCoordinates.visualViewportX;
        y = _convertMouseEventToLayoutCoordinates.visualViewportY;
      }
      if (!Number.isFinite(x) || !Number.isFinite(y)) {
        return undefined;
      }
      return {
        x: x,
        y: y
      };
    }
    function initScrollObserver(cb, defaultPrivacyLevel, elementsScrollPositions) {
      var _updatePosition = throttle(function (event) {
        var target = getEventTarget(event);
        if (!target || getNodePrivacyLevel(target, defaultPrivacyLevel) === NodePrivacyLevel.HIDDEN || !hasSerializedNode(target)) {
          return;
        }
        var id = getSerializedNodeId(target);
        var scrollPositions = target === document ? {
          scrollTop: getScrollY(),
          scrollLeft: getScrollX()
        } : {
          scrollTop: Math.round(target.scrollTop),
          scrollLeft: Math.round(target.scrollLeft)
        };
        elementsScrollPositions.set(target, scrollPositions);
        cb({
          id: id,
          x: scrollPositions.scrollLeft,
          y: scrollPositions.scrollTop
        });
      }, SCROLL_OBSERVER_THRESHOLD);
      return addEventListener(document, DOM_EVENT.SCROLL, _updatePosition.throttled, {
        capture: true,
        passive: true
      }).stop;
    }
    function initViewportResizeObserver(cb) {
      return initViewportObservable().subscribe(cb).unsubscribe;
    }
    function initInputObserver(cb, defaultPrivacyLevel, target) {
      if (target === undefined) {
        target = document;
      }
      var lastInputStateMap = new WeakMap();
      var isShadowRoot = target !== document;
      var _addEventListeners = addEventListeners(target,
      // The 'input' event bubbles across shadow roots, so we don't have to listen for it on shadow
      // roots since it will be handled by the event listener that we did add to the document. Only
      // the 'change' event is blocked and needs to be handled on shadow roots.
      isShadowRoot ? [DOM_EVENT.CHANGE] : [DOM_EVENT.INPUT, DOM_EVENT.CHANGE], function (event) {
        var target = getEventTarget(event);
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) {
          onElementChange(target);
        }
      }, {
        capture: true,
        passive: true
      });
      var stopEventListeners = _addEventListeners.stop;
      var stopPropertySetterInstrumentation;
      if (!isShadowRoot) {
        var instrumentationStoppers = [instrumentSetter(HTMLInputElement.prototype, 'value', onElementChange), instrumentSetter(HTMLInputElement.prototype, 'checked', onElementChange), instrumentSetter(HTMLSelectElement.prototype, 'value', onElementChange), instrumentSetter(HTMLTextAreaElement.prototype, 'value', onElementChange), instrumentSetter(HTMLSelectElement.prototype, 'selectedIndex', onElementChange)];
        stopPropertySetterInstrumentation = function stopPropertySetterInstrumentation() {
          instrumentationStoppers.forEach(function (stopper) {
            return stopper.stop();
          });
        };
      } else {
        stopPropertySetterInstrumentation = noop;
      }
      return function () {
        stopPropertySetterInstrumentation();
        stopEventListeners();
      };
      function onElementChange(target) {
        var nodePrivacyLevel = getNodePrivacyLevel(target, defaultPrivacyLevel);
        if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) {
          return;
        }
        var type = target.type;
        var inputState;
        if (type === 'radio' || type === 'checkbox') {
          if (shouldMaskNode(target, nodePrivacyLevel)) {
            return;
          }
          inputState = {
            isChecked: target.checked
          };
        } else {
          var value = getElementInputValue(target, nodePrivacyLevel);
          if (value === undefined) {
            return;
          }
          inputState = {
            text: value
          };
        }

        // Can be multiple changes on the same node within the same batched mutation observation.
        cbWithDedup(target, inputState);

        // If a radio was checked, other radios with the same name attribute will be unchecked.
        var name = target.name;
        if (type === 'radio' && name && target.checked) {
          forEach(document.querySelectorAll('input[type="radio"][name="' + cssEscape(name) + '"]'), function (el) {
            if (el !== target) {
              // TODO: Consider the privacy implications for various differing input privacy levels
              cbWithDedup(el, {
                isChecked: false
              });
            }
          });
        }
      }

      /**
       * There can be multiple changes on the same node within the same batched mutation observation.
       */
      function cbWithDedup(target, inputState) {
        if (!hasSerializedNode(target)) {
          return;
        }
        var lastInputState = lastInputStateMap.get(target);
        if (!lastInputState || lastInputState.text !== inputState.text || lastInputState.isChecked !== inputState.isChecked) {
          lastInputStateMap.set(target, inputState);
          cb(assign({
            id: getSerializedNodeId(target)
          }, inputState));
        }
      }
    }
    function initStyleSheetObserver(cb) {
      function checkStyleSheetAndCallback(styleSheet, callback) {
        if (styleSheet && hasSerializedNode(styleSheet.ownerNode)) {
          callback(getSerializedNodeId(styleSheet.ownerNode));
        }
      }
      var instrumentationStoppers = [instrumentMethodAndCallOriginal(CSSStyleSheet.prototype, 'insertRule', {
        before: function before(rule, index) {
          checkStyleSheetAndCallback(this, function (id) {
            return cb({
              id: id,
              adds: [{
                rule: rule,
                index: index
              }]
            });
          });
        }
      }), instrumentMethodAndCallOriginal(CSSStyleSheet.prototype, 'deleteRule', {
        before: function before(index) {
          checkStyleSheetAndCallback(this, function (id) {
            return cb({
              id: id,
              removes: [{
                index: index
              }]
            });
          });
        }
      })];
      if (typeof CSSGroupingRule !== 'undefined') {
        instrumentGroupingCSSRuleClass(CSSGroupingRule);
      } else {
        instrumentGroupingCSSRuleClass(CSSMediaRule);
        instrumentGroupingCSSRuleClass(CSSSupportsRule);
      }
      function instrumentGroupingCSSRuleClass(cls) {
        instrumentationStoppers.push(instrumentMethodAndCallOriginal(cls.prototype, 'insertRule', {
          before: function before(rule, index) {
            var _this = this;
            checkStyleSheetAndCallback(this.parentStyleSheet, function (id) {
              var path = getPathToNestedCSSRule(_this);
              if (path) {
                path.push(index || 0);
                cb({
                  id: id,
                  adds: [{
                    rule: rule,
                    index: path
                  }]
                });
              }
            });
          }
        }), instrumentMethodAndCallOriginal(cls.prototype, 'deleteRule', {
          before: function before(index) {
            var _this = this;
            checkStyleSheetAndCallback(this.parentStyleSheet, function (id) {
              var path = getPathToNestedCSSRule(_this);
              if (path) {
                path.push(index);
                cb({
                  id: id,
                  removes: [{
                    index: path
                  }]
                });
              }
            });
          }
        }));
      }
      return function () {
        instrumentationStoppers.forEach(function (stopper) {
          stopper.stop();
        });
      };
    }
    function initMediaInteractionObserver(mediaInteractionCb, defaultPrivacyLevel) {
      var handler = function handler(event) {
        var target = getEventTarget(event);
        if (!target || getNodePrivacyLevel(target, defaultPrivacyLevel) === NodePrivacyLevel.HIDDEN || !hasSerializedNode(target)) {
          return;
        }
        mediaInteractionCb({
          id: getSerializedNodeId(target),
          type: event.type === DOM_EVENT.PLAY ? MediaInteractionType.Play : MediaInteractionType.Pause
        });
      };
      return addEventListeners(document, [DOM_EVENT.PLAY, DOM_EVENT.PAUSE], handler, {
        capture: true,
        passive: true
      }).stop;
    }
    function initFocusObserver(focusCb) {
      return addEventListeners(window, [DOM_EVENT.FOCUS, DOM_EVENT.BLUR], function () {
        focusCb({
          has_focus: document.hasFocus()
        });
      }).stop;
    }
    function initVisualViewportResizeObserver(cb) {
      if (!window.visualViewport) {
        return noop;
      }
      var _updateDimension = throttle(function () {
        cb(getVisualViewport());
      }, VISUAL_VIEWPORT_OBSERVER_THRESHOLD, {
        trailing: false
      });
      var removeListener = addEventListeners(window.visualViewport, [DOM_EVENT.RESIZE, DOM_EVENT.SCROLL], _updateDimension.throttled, {
        capture: true,
        passive: true
      }).stop;
      var cancelThrottle = _updateDimension.cancel;
      return function stop() {
        removeListener();
        cancelThrottle();
      };
    }
    function initFrustrationObserver(lifeCycle, frustrationCb) {
      return lifeCycle.subscribe(LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, function (data) {
        if (data.rawRumEvent.type === RumEventType.ACTION && data.rawRumEvent.action.type === ActionType.CLICK && data.rawRumEvent.action.frustration && data.rawRumEvent.action.frustration.type && data.rawRumEvent.action.frustration.type.length && 'events' in data.domainContext && data.domainContext.events && data.domainContext.events.length) {
          frustrationCb({
            timestamp: data.rawRumEvent.date,
            type: RecordType.FrustrationRecord,
            data: {
              frustrationTypes: data.rawRumEvent.action.frustration.type,
              recordIds: data.domainContext.events.map(function (e) {
                return getRecordIdForEvent(e);
              })
            }
          });
        }
      }).unsubscribe;
    }
    function getEventTarget(event) {
      if (event.composed === true && isNodeShadowHost(event.target)) {
        return event.composedPath()[0];
      }
      return event.target;
    }

    function createElementsScrollPositions() {
      var scrollPositionsByElement = new WeakMap();
      return {
        set: function set(element, scrollPositions) {
          if (element === document && !document.scrollingElement) {
            // cf https://drafts.csswg.org/cssom-view/#dom-document-scrollingelement,
            // in some cases scrolling elements can not be defined, we don't support those for now
            return;
          }
          scrollPositionsByElement.set(element === document ? document.scrollingElement : element, scrollPositions);
        },
        get: function get(element) {
          return scrollPositionsByElement.get(element);
        },
        has: function has(element) {
          return scrollPositionsByElement.has(element);
        }
      };
    }

    var initShadowRootsController = function initShadowRootsController(configuration, data) {
      var mutationCb = data.mutationCb;
      var inputCb = data.inputCb;
      var controllerByShadowRoot = new Map();
      var shadowRootsController = {
        addShadowRoot: function addShadowRoot(shadowRoot) {
          var _startMutaionObserve = startMutationObserver(mutationCb, configuration, shadowRootsController, shadowRoot);
          var flush = _startMutaionObserve.flush;
          var stopMutationObserver = _startMutaionObserve.stop;

          // the change event no do bubble up across the shadow root, we have to listen on the shadow root
          var stopInputObserver = initInputObserver(inputCb, configuration.defaultPrivacyLevel, shadowRoot);
          controllerByShadowRoot.set(shadowRoot, {
            flush: flush,
            stop: function stop() {
              stopMutationObserver();
              stopInputObserver();
            }
          });
        },
        removeShadowRoot: function removeShadowRoot(shadowRoot) {
          var entry = controllerByShadowRoot.get(shadowRoot);
          if (!entry) {
            return;
          }
          entry.stop();
          controllerByShadowRoot["delete"](shadowRoot);
        },
        stop: function stop() {
          controllerByShadowRoot.forEach(function (event) {
            event.stop();
          });
        },
        flush: function flush() {
          controllerByShadowRoot.forEach(function (event) {
            event.flush();
          });
        }
      };
      return shadowRootsController;
    };

    function record(options) {
      var emit = options.emit;
      // runtime checks for user options
      if (!emit) {
        throw new Error('emit function is required');
      }
      var elementsScrollPositions = createElementsScrollPositions();
      var mutationCb = function mutationCb(mutation) {
        emit(assembleIncrementalSnapshot(IncrementalSource.Mutation, mutation));
      };
      var inputCb = function inputCb(s) {
        emit(assembleIncrementalSnapshot(IncrementalSource.Input, s));
      };
      var shadowRootsController = initShadowRootsController(options.configuration, {
        mutationCb: mutationCb,
        inputCb: inputCb
      });
      var takeFullSnapshot = function takeFullSnapshot(timestamp, serializationContext) {
        if (typeof timestamp === 'undefined') {
          timestamp = timeStampNow();
        }
        if (typeof serializationContext === 'undefined') {
          serializationContext = {
            status: SerializationContextStatus.INITIAL_FULL_SNAPSHOT,
            elementsScrollPositions: elementsScrollPositions,
            shadowRootsController: shadowRootsController
          };
        }
        var _viewportDimension = getViewportDimension();
        var width = _viewportDimension.width;
        var height = _viewportDimension.height;
        emit({
          data: {
            height: height,
            href: window.location.href,
            width: width
          },
          type: RecordType.Meta,
          timestamp: timestamp
        });
        emit({
          data: {
            has_focus: document.hasFocus()
          },
          type: RecordType.Focus,
          timestamp: timestamp
        });
        emit({
          data: {
            node: serializeDocument(document, options.configuration, serializationContext),
            initialOffset: {
              left: getScrollX(),
              top: getScrollY()
            }
          },
          type: RecordType.FullSnapshot,
          timestamp: timestamp
        });
        if (window.visualViewport) {
          emit({
            data: getVisualViewport(),
            type: RecordType.VisualViewport,
            timestamp: timestamp
          });
        }
      };
      takeFullSnapshot();
      var _initObservers = initObservers({
        lifeCycle: options.lifeCycle,
        configuration: options.configuration,
        elementsScrollPositions: elementsScrollPositions,
        inputCb: inputCb,
        mediaInteractionCb: function mediaInteractionCb(p) {
          emit(assembleIncrementalSnapshot(IncrementalSource.MediaInteraction, p));
        },
        mouseInteractionCb: function mouseInteractionCb(mouseInteractionRecord) {
          emit(mouseInteractionRecord);
        },
        mousemoveCb: function mousemoveCb(positions, source) {
          emit(assembleIncrementalSnapshot(source, {
            positions: positions
          }));
        },
        mutationCb: mutationCb,
        scrollCb: function scrollCb(p) {
          emit(assembleIncrementalSnapshot(IncrementalSource.Scroll, p));
        },
        styleSheetCb: function styleSheetCb(r) {
          emit(assembleIncrementalSnapshot(IncrementalSource.StyleSheetRule, r));
        },
        viewportResizeCb: function viewportResizeCb(d) {
          emit(assembleIncrementalSnapshot(IncrementalSource.ViewportResize, d));
        },
        frustrationCb: function frustrationCb(frustrationRecord) {
          emit(frustrationRecord);
        },
        focusCb: function focusCb(data) {
          emit({
            data: data,
            type: RecordType.Focus,
            timestamp: timeStampNow()
          });
        },
        visualViewportResizeCb: function visualViewportResizeCb(data) {
          emit({
            data: data,
            type: RecordType.VisualViewport,
            timestamp: timeStampNow()
          });
        },
        shadowRootsController: shadowRootsController
      });
      var stopObservers = _initObservers.stop;
      var flushMutationsFromObservers = _initObservers.flush;
      function flushMutations() {
        shadowRootsController.flush();
        flushMutationsFromObservers();
      }
      return {
        stop: function stop() {
          shadowRootsController.stop();
          stopObservers();
        },
        takeSubsequentFullSnapshot: function takeSubsequentFullSnapshot(timestamp) {
          flushMutations();
          takeFullSnapshot(timestamp, {
            shadowRootsController: shadowRootsController,
            status: SerializationContextStatus.SUBSEQUENT_FULL_SNAPSHOT,
            elementsScrollPositions: elementsScrollPositions
          });
        },
        flushMutations: flushMutations,
        shadowRootsController: shadowRootsController
      };
    }

    function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
    function buildReplayPayload(data, metadata, rawSegmentBytesCount) {
      var formData = new FormData();
      formData.append('segment', new Blob([data], {
        type: 'application/octet-stream'
      }), metadata.session.id + '-' + metadata.start);
      toFormEntries(metadata, function (key, value) {
        formData.append(key, value);
      });
      formData.append('raw_segment_size', rawSegmentBytesCount);
      return {
        data: formData,
        bytesCount: data.byteLength
      };
    }
    function toFormEntries(input, onEntry, prefix) {
      if (prefix === undefined) {
        prefix = '';
      }
      each(objectEntries(input), function (item) {
        var value = item[1];
        var key = item[0];
        if (_typeof(value) === 'object' && value !== null) {
          toFormEntries(value, onEntry, '' + prefix + key + '_');
        } else {
          onEntry('' + prefix + key, String(value));
        }
      });
    }

    var MAX_STATS_HISTORY = 10;
    var statsPerView;
    function getSegmentsCount(viewId) {
      return getOrCreateReplayStats(viewId).segments_count;
    }
    function addSegment(viewId) {
      getOrCreateReplayStats(viewId).segments_count += 1;
    }
    function addRecord(viewId) {
      getOrCreateReplayStats(viewId).records_count += 1;
    }
    function addWroteData(viewId, additionalBytesCount) {
      getOrCreateReplayStats(viewId).segments_total_raw_size += additionalBytesCount;
    }
    function getReplayStats(viewId) {
      return statsPerView && statsPerView.get(viewId);
    }
    function getOrCreateReplayStats(viewId) {
      if (!statsPerView) {
        statsPerView = new Map();
      }
      var replayStats;
      if (statsPerView.has(viewId)) {
        replayStats = statsPerView.get(viewId);
      } else {
        replayStats = {
          records_count: 0,
          segments_count: 0,
          segments_total_raw_size: 0
        };
        statsPerView.set(viewId, replayStats);
        if (statsPerView.size > MAX_STATS_HISTORY) {
          deleteOldestStats();
        }
      }
      return replayStats;
    }
    function deleteOldestStats() {
      if (!statsPerView) {
        return;
      }
      if (statsPerView.keys) {
        statsPerView["delete"](statsPerView.keys().next().value);
      } else {
        // IE11 doesn't support map.keys
        var isFirst = true;
        statsPerView.forEach(function (_value, key) {
          if (isFirst) {
            statsPerView["delete"](key);
            isFirst = false;
          }
        });
      }
    }

    function Segment(encoder, context, creationReason) {
      this.encoder = encoder;
      var viewId = context.view.id;
      this.metadata = assign({
        start: Infinity,
        end: -Infinity,
        creation_reason: creationReason,
        records_count: 0,
        has_full_snapshot: false,
        index_in_view: getSegmentsCount(viewId),
        source: 'browser'
      }, context);
      addSegment(viewId);
    }
    Segment.prototype.addRecord = function (record, callback) {
      this.metadata.start = Math.min(this.metadata.start, record.timestamp);
      this.metadata.end = Math.max(this.metadata.end, record.timestamp);
      this.metadata.records_count += 1;
      if (!this.metadata.has_full_snapshot) {
        this.metadata.has_full_snapshot = record.type === RecordType.FullSnapshot;
      }
      addRecord(this.metadata.view.id);
      var prefix = this.metadata.records_count === 1 ? '{"records":[' : ',';
      this.encoder.write(prefix + JSON.stringify(record), callback);
    };
    Segment.prototype.flush = function (callback) {
      if (this.metadata.records_count === 0) {
        throw new Error('Empty segment flushed');
      }
      var _this = this;
      this.encoder.write('],' + JSON.stringify(this.metadata).slice(1) + '\n', function () {
        addWroteData(_this.metadata.view.id, _this.encoder.getRawBytesCount());
        callback(_this.metadata);
      });
      this.encoder.reset();
    };

    var SEGMENT_DURATION_LIMIT = 30 * ONE_SECOND;
    /**
     * beacon payload max queue size implementation is 64kb
     * ensure that we leave room for logs, rum and potential other users
     */
    var SEGMENT_BYTES_LIMIT = 60000;

    // Segments are the main data structure for session replays. They contain context information used
    // for indexing or UI needs, and a list of records (RRWeb 'events', renamed to avoid confusing
    // namings). They are stored without any processing from the intake, and fetched one after the
    // other while a session is being replayed. Their encoding (deflate) are carefully crafted to allow
    // concatenating multiple segments together. Segments have a size overhead (metadata), so our goal is to
    // build segments containing as many records as possible while complying with the various flush
    // strategies to guarantee a good replay quality.
    //
    // When the recording starts, a segment is initially created.  The segment is flushed (finalized and
    // sent) based on various events (non-exhaustive list):
    //
    // * the page visibility change or becomes to unload
    // * the segment duration reaches a limit
    // * the encoded segment bytes count reaches a limit
    // * ...
    //
    // A segment cannot be created without its context.  If the RUM session ends and no session id is
    // available when creating a new segment, records will be ignored, until the session is renewed and
    // a new session id is available.
    //
    // Empty segments (segments with no record) aren't useful and should be ignored.
    //
    // To help investigate session replays issues, each segment is created with a "creation reason",
    // indicating why the session has been created.

    function startSegmentCollection(lifeCycle, configuration, sessionManager, viewContexts, httpRequest, encoder) {
      return doStartSegmentCollection(lifeCycle, function () {
        return computeSegmentContext(configuration, sessionManager, viewContexts);
      }, httpRequest, encoder);
    }
    var SegmentCollectionStatus = {
      WaitingForInitialRecord: 0,
      SegmentPending: 1,
      Stopped: 2
    };
    function doStartSegmentCollection(lifeCycle, getSegmentContext, httpRequest, encoder) {
      var state = {
        status: SegmentCollectionStatus.WaitingForInitialRecord,
        nextSegmentCreationReason: 'init'
      };
      var subscribeViewCreated = lifeCycle.subscribe(LifeCycleEventType.VIEW_CREATED, function () {
        flushSegment('view_change');
      });
      var unsubscribeViewCreated = subscribeViewCreated.unsubscribe;
      var subscribePageExited = lifeCycle.subscribe(LifeCycleEventType.PAGE_EXITED, function (pageExitEvent) {
        flushSegment(pageExitEvent.reason);
      });
      var unsubscribePageExited = subscribePageExited.unsubscribe;
      function flushSegment(flushReason) {
        if (state.status === SegmentCollectionStatus.SegmentPending) {
          state.segment.flush(function (metadata) {
            var payload = buildReplayPayload(encoder.getEncodedBytes(), metadata, encoder.getRawBytesCount());
            if (isPageExitReason(flushReason)) {
              httpRequest.sendOnExit(payload);
            } else {
              httpRequest.send(payload);
            }
          });
          clearTimeout(state.expirationTimeoutId);
        }
        if (flushReason !== 'stop') {
          state = {
            status: SegmentCollectionStatus.WaitingForInitialRecord,
            nextSegmentCreationReason: flushReason
          };
        } else {
          state = {
            status: SegmentCollectionStatus.Stopped
          };
        }
      }
      return {
        addRecord: function addRecord(record) {
          if (state.status === SegmentCollectionStatus.Stopped) {
            return;
          }
          if (state.status === SegmentCollectionStatus.WaitingForInitialRecord) {
            var context = getSegmentContext();
            if (!context) {
              return;
            }
            state = {
              status: SegmentCollectionStatus.SegmentPending,
              segment: new Segment(encoder, context, state.nextSegmentCreationReason),
              expirationTimeoutId: setTimeout$1(function () {
                flushSegment('segment_duration_limit');
              }, SEGMENT_DURATION_LIMIT)
            };
          }
          var segment = state.segment;
          segment.addRecord(record, function () {
            if (
            // the written segment is still pending
            state.status === SegmentCollectionStatus.SegmentPending && state.segment === segment && encoder.getEncodedBytesCount() > SEGMENT_BYTES_LIMIT) {
              flushSegment('segment_bytes_limit');
            }
          });
        },
        stop: function stop() {
          flushSegment('stop');
          unsubscribeViewCreated();
          unsubscribePageExited();
        }
      };
    }
    function computeSegmentContext(configuration, sessionManager, viewContexts) {
      var session = sessionManager.findTrackedSession();
      var viewContext = viewContexts.findView();
      if (!session || !viewContext) {
        return undefined;
      }
      return {
        sdk: {
          name: configuration.sdkName,
          version: configuration.sdkVersion
        },
        env: configuration.env || '',
        service: viewContext.service || configuration.service || 'browser',
        version: viewContext.version || configuration.version || '',
        app: {
          id: configuration.applicationId
        },
        session: {
          id: session.id
        },
        view: {
          id: viewContext.id
        }
      };
    }

    function startRecording(lifeCycle, configuration, sessionManager, viewContexts, encoder, httpRequest) {
      var reportError = function reportError(error) {
        lifeCycle.notify(LifeCycleEventType.RAW_ERROR_COLLECTED, {
          error: error
        });
        addTelemetryDebug('Error reported to customer', {
          'error.message': error.message
        });
      };
      var replayRequest = httpRequest || createHttpRequest(configuration.sessionReplayEndPoint, SEGMENT_BYTES_LIMIT, false, reportError);
      var segmentCollection = startSegmentCollection(lifeCycle, configuration, sessionManager, viewContexts, replayRequest, encoder);
      var addRecord = segmentCollection.addRecord;
      var stopSegmentCollection = segmentCollection.stop;
      var _record = record({
        emit: addRecord,
        configuration: configuration,
        lifeCycle: lifeCycle
      });
      var stopRecording = _record.stop;
      var takeSubsequentFullSnapshot = _record.takeSubsequentFullSnapshot;
      var flushMutations = _record.flushMutations;
      var subscribeViewEnded = lifeCycle.subscribe(LifeCycleEventType.VIEW_ENDED, function () {
        flushMutations();
        addRecord({
          timestamp: timeStampNow(),
          type: RecordType.ViewEnd
        });
      });
      var scribeViewCreated = lifeCycle.subscribe(LifeCycleEventType.VIEW_CREATED, function (view) {
        takeSubsequentFullSnapshot(view.startClocks.timeStamp);
      });
      return {
        stop: function stop() {
          subscribeViewEnded.unsubscribe();
          scribeViewCreated.unsubscribe();
          stopRecording();
          stopSegmentCollection();
        }
      };
    }

    var DeflateEncoderStreamId = {
      REPLAY: 1
    };
    function createDeflateEncoder(worker, streamId) {
      var rawBytesCount = 0;
      var compressedData = [];
      var compressedDataTrailer;
      var nextWriteActionId = 0;
      var pendingWriteActions = [];
      var wokerListener = addEventListener(worker, 'message', function (params) {
        var data = params.data;
        if (data.type !== 'wrote' || data.streamId !== streamId) {
          return;
        }
        var nextPendingAction = pendingWriteActions.shift();
        if (nextPendingAction && nextPendingAction.id === data.id) {
          if (data.id === 0) {
            // Initial state
            rawBytesCount = data.additionalBytesCount;
            compressedData = [data.result];
          } else {
            rawBytesCount += data.additionalBytesCount;
            compressedData.push(data.result);
          }
          compressedDataTrailer = data.trailer;
          nextPendingAction.callback();
        } else {
          removeMessageListener();
          addTelemetryDebug('Worker responses received out of order.');
        }
      });
      var removeMessageListener = wokerListener.stop;
      return {
        getEncodedBytes: function getEncodedBytes() {
          if (!compressedData.length) {
            return new Uint8Array(0);
          }
          return concatBuffers(compressedData.concat(compressedDataTrailer));
        },
        getEncodedBytesCount: function getEncodedBytesCount() {
          if (!compressedData.length) {
            return 0;
          }
          return compressedData.reduce(function (total, buffer) {
            return total + buffer.length;
          }, 0) + compressedDataTrailer.length;
        },
        getRawBytesCount: function getRawBytesCount() {
          return rawBytesCount;
        },
        write: function write(data, callback) {
          worker.postMessage({
            action: 'write',
            id: nextWriteActionId,
            data: data,
            streamId: streamId
          });
          pendingWriteActions.push({
            id: nextWriteActionId,
            callback: callback
          });
          nextWriteActionId += 1;
        },
        reset: function reset() {
          worker.postMessage({
            action: 'reset',
            streamId: streamId
          });
          nextWriteActionId = 0;
        }
      };
    }

    var INITIALIZATION_TIME_OUT_DELAY = 10 * ONE_SECOND;
    function createDeflateWorker() {
      return new Worker(URL.createObjectURL(new Blob(["!function(){\"use strict\";function t(t,a){var n=\"undefined\"!=typeof Symbol&&t[Symbol.iterator]||t[\"@@iterator\"];if(!n){if(Array.isArray(t)||(n=function(t,a){if(!t)return;if(\"string\"==typeof t)return e(t,a);var n=Object.prototype.toString.call(t).slice(8,-1);\"Object\"===n&&t.constructor&&(n=t.constructor.name);if(\"Map\"===n||\"Set\"===n)return Array.from(t);if(\"Arguments\"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return e(t,a)}(t))||a&&t&&\"number\"==typeof t.length){n&&(t=n);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:i}}throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\")}var s,_=!0,h=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return _=t.done,t},e:function(t){h=!0,s=t},f:function(){try{_||null==n.return||n.return()}finally{if(h)throw s}}}}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}function a(e){var a,n=e.reduce((function(t,e){return t+e.length}),0),r=new Uint8Array(n),i=0,s=t(e);try{for(s.s();!(a=s.n()).done;){var _=a.value;r.set(_,i),i+=_.length}}catch(t){s.e(t)}finally{s.f()}return r}function n(t){for(var e=t.length;--e>=0;)t[e]=0}var r=256,i=286,s=30,_=15,h=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),l=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),o=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),d=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),u=new Array(576);n(u);var f=new Array(60);n(f);var c=new Array(512);n(c);var p=new Array(256);n(p);var g=new Array(29);n(g);var v,w,b,m=new Array(s);function y(t,e,a,n,r){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=n,this.max_length=r,this.has_stree=t&&t.length}function k(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}n(m);var z=function(t){return t<256?c[t]:c[256+(t>>>7)]},A=function(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255},x=function(t,e,a){t.bi_valid>16-a?(t.bi_buf|=e<<t.bi_valid&65535,A(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=a-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)},E=function(t,e,a){x(t,a[2*e],a[2*e+1])},Z=function(t,e){var a=0;do{a|=1&t,t>>>=1,a<<=1}while(--e>0);return a>>>1},S=function(t,e,a){var n,r,i=new Array(16),s=0;for(n=1;n<=_;n++)i[n]=s=s+a[n-1]<<1;for(r=0;r<=e;r++){var h=t[2*r+1];0!==h&&(t[2*r]=Z(i[h]++,h))}},U=function(t){var e;for(e=0;e<i;e++)t.dyn_ltree[2*e]=0;for(e=0;e<s;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0},R=function(t){t.bi_valid>8?A(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0},L=function(t,e,a,n){var r=2*e,i=2*a;return t[r]<t[i]||t[r]===t[i]&&n[e]<=n[a]},F=function(t,e,a){for(var n=t.heap[a],r=a<<1;r<=t.heap_len&&(r<t.heap_len&&L(e,t.heap[r+1],t.heap[r],t.depth)&&r++,!L(e,n,t.heap[r],t.depth));)t.heap[a]=t.heap[r],a=r,r<<=1;t.heap[a]=n},T=function(t,e,a){var n,i,s,_,o=0;if(0!==t.last_lit)do{n=t.pending_buf[t.d_buf+2*o]<<8|t.pending_buf[t.d_buf+2*o+1],i=t.pending_buf[t.l_buf+o],o++,0===n?E(t,i,e):(s=p[i],E(t,s+r+1,e),0!==(_=h[s])&&(i-=g[s],x(t,i,_)),n--,s=z(n),E(t,s,a),0!==(_=l[s])&&(n-=m[s],x(t,n,_)))}while(o<t.last_lit);E(t,256,e)},I=function(t,e){var a,n,r,i=e.dyn_tree,s=e.stat_desc.static_tree,h=e.stat_desc.has_stree,l=e.stat_desc.elems,o=-1;for(t.heap_len=0,t.heap_max=573,a=0;a<l;a++)0!==i[2*a]?(t.heap[++t.heap_len]=o=a,t.depth[a]=0):i[2*a+1]=0;for(;t.heap_len<2;)i[2*(r=t.heap[++t.heap_len]=o<2?++o:0)]=1,t.depth[r]=0,t.opt_len--,h&&(t.static_len-=s[2*r+1]);for(e.max_code=o,a=t.heap_len>>1;a>=1;a--)F(t,i,a);r=l;do{a=t.heap[1],t.heap[1]=t.heap[t.heap_len--],F(t,i,1),n=t.heap[1],t.heap[--t.heap_max]=a,t.heap[--t.heap_max]=n,i[2*r]=i[2*a]+i[2*n],t.depth[r]=(t.depth[a]>=t.depth[n]?t.depth[a]:t.depth[n])+1,i[2*a+1]=i[2*n+1]=r,t.heap[1]=r++,F(t,i,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],function(t,e){var a,n,r,i,s,h,l=e.dyn_tree,o=e.max_code,d=e.stat_desc.static_tree,u=e.stat_desc.has_stree,f=e.stat_desc.extra_bits,c=e.stat_desc.extra_base,p=e.stat_desc.max_length,g=0;for(i=0;i<=_;i++)t.bl_count[i]=0;for(l[2*t.heap[t.heap_max]+1]=0,a=t.heap_max+1;a<573;a++)(i=l[2*l[2*(n=t.heap[a])+1]+1]+1)>p&&(i=p,g++),l[2*n+1]=i,n>o||(t.bl_count[i]++,s=0,n>=c&&(s=f[n-c]),h=l[2*n],t.opt_len+=h*(i+s),u&&(t.static_len+=h*(d[2*n+1]+s)));if(0!==g){do{for(i=p-1;0===t.bl_count[i];)i--;t.bl_count[i]--,t.bl_count[i+1]+=2,t.bl_count[p]--,g-=2}while(g>0);for(i=p;0!==i;i--)for(n=t.bl_count[i];0!==n;)(r=t.heap[--a])>o||(l[2*r+1]!==i&&(t.opt_len+=(i-l[2*r+1])*l[2*r],l[2*r+1]=i),n--)}}(t,e),S(i,o,t.bl_count)},O=function(t,e,a){var n,r,i=-1,s=e[1],_=0,h=7,l=4;for(0===s&&(h=138,l=3),e[2*(a+1)+1]=65535,n=0;n<=a;n++)r=s,s=e[2*(n+1)+1],++_<h&&r===s||(_<l?t.bl_tree[2*r]+=_:0!==r?(r!==i&&t.bl_tree[2*r]++,t.bl_tree[32]++):_<=10?t.bl_tree[34]++:t.bl_tree[36]++,_=0,i=r,0===s?(h=138,l=3):r===s?(h=6,l=3):(h=7,l=4))},N=function(t,e,a){var n,r,i=-1,s=e[1],_=0,h=7,l=4;for(0===s&&(h=138,l=3),n=0;n<=a;n++)if(r=s,s=e[2*(n+1)+1],!(++_<h&&r===s)){if(_<l)do{E(t,r,t.bl_tree)}while(0!=--_);else 0!==r?(r!==i&&(E(t,r,t.bl_tree),_--),E(t,16,t.bl_tree),x(t,_-3,2)):_<=10?(E(t,17,t.bl_tree),x(t,_-3,3)):(E(t,18,t.bl_tree),x(t,_-11,7));_=0,i=r,0===s?(h=138,l=3):r===s?(h=6,l=3):(h=7,l=4)}},D=!1,C=function(t,e,a,n){x(t,0+(n?1:0),3),function(t,e,a,n){R(t),n&&(A(t,a),A(t,~a)),t.pending_buf.set(t.window.subarray(e,e+a),t.pending),t.pending+=a}(t,e,a,!0)},M=function(t,e,a,n){var i,s,_=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=function(t){var e,a=4093624447;for(e=0;e<=31;e++,a>>>=1)if(1&a&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<r;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0}(t)),I(t,t.l_desc),I(t,t.d_desc),_=function(t){var e;for(O(t,t.dyn_ltree,t.l_desc.max_code),O(t,t.dyn_dtree,t.d_desc.max_code),I(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*d[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}(t),i=t.opt_len+3+7>>>3,(s=t.static_len+3+7>>>3)<=i&&(i=s)):i=s=a+5,a+4<=i&&-1!==e?C(t,e,a,n):4===t.strategy||s===i?(x(t,2+(n?1:0),3),T(t,u,f)):(x(t,4+(n?1:0),3),function(t,e,a,n){var r;for(x(t,e-257,5),x(t,a-1,5),x(t,n-4,4),r=0;r<n;r++)x(t,t.bl_tree[2*d[r]+1],3);N(t,t.dyn_ltree,e-1),N(t,t.dyn_dtree,a-1)}(t,t.l_desc.max_code+1,t.d_desc.max_code+1,_+1),T(t,t.dyn_ltree,t.dyn_dtree)),U(t),n&&R(t)},B={_tr_init:function(t){D||(!function(){var t,e,a,n,r,d=new Array(16);for(a=0,n=0;n<28;n++)for(g[n]=a,t=0;t<1<<h[n];t++)p[a++]=n;for(p[a-1]=n,r=0,n=0;n<16;n++)for(m[n]=r,t=0;t<1<<l[n];t++)c[r++]=n;for(r>>=7;n<s;n++)for(m[n]=r<<7,t=0;t<1<<l[n]-7;t++)c[256+r++]=n;for(e=0;e<=_;e++)d[e]=0;for(t=0;t<=143;)u[2*t+1]=8,t++,d[8]++;for(;t<=255;)u[2*t+1]=9,t++,d[9]++;for(;t<=279;)u[2*t+1]=7,t++,d[7]++;for(;t<=287;)u[2*t+1]=8,t++,d[8]++;for(S(u,287,d),t=0;t<s;t++)f[2*t+1]=5,f[2*t]=Z(t,5);v=new y(u,h,257,i,_),w=new y(f,l,0,s,_),b=new y(new Array(0),o,0,19,7)}(),D=!0),t.l_desc=new k(t.dyn_ltree,v),t.d_desc=new k(t.dyn_dtree,w),t.bl_desc=new k(t.bl_tree,b),t.bi_buf=0,t.bi_valid=0,U(t)},_tr_stored_block:C,_tr_flush_block:M,_tr_tally:function(t,e,a){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&a,t.last_lit++,0===e?t.dyn_ltree[2*a]++:(t.matches++,e--,t.dyn_ltree[2*(p[a]+r+1)]++,t.dyn_dtree[2*z(e)]++),t.last_lit===t.lit_bufsize-1},_tr_align:function(t){x(t,2,3),E(t,256,u),function(t){16===t.bi_valid?(A(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}(t)}},H=function(t,e,a,n){for(var r=65535&t|0,i=t>>>16&65535|0,s=0;0!==a;){a-=s=a>2e3?2e3:a;do{i=i+(r=r+e[n++]|0)|0}while(--s);r%=65521,i%=65521}return r|i<<16|0},Y=new Uint32Array(function(){for(var t,e=[],a=0;a<256;a++){t=a;for(var n=0;n<8;n++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e}()),K=function(t,e,a,n){var r=Y,i=n+a;t^=-1;for(var s=n;s<i;s++)t=t>>>8^r[255&(t^e[s])];return-1^t},P={2:\"need dictionary\",1:\"stream end\",0:\"\",\"-1\":\"file error\",\"-2\":\"stream error\",\"-3\":\"data error\",\"-4\":\"insufficient memory\",\"-5\":\"buffer error\",\"-6\":\"incompatible version\"},j={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8},G=B._tr_init,X=B._tr_stored_block,W=B._tr_flush_block,$=B._tr_tally,q=B._tr_align,J=j.Z_NO_FLUSH,Q=j.Z_PARTIAL_FLUSH,V=j.Z_FULL_FLUSH,tt=j.Z_FINISH,et=j.Z_BLOCK,at=j.Z_OK,nt=j.Z_STREAM_END,rt=j.Z_STREAM_ERROR,it=j.Z_DATA_ERROR,st=j.Z_BUF_ERROR,_t=j.Z_DEFAULT_COMPRESSION,ht=j.Z_FILTERED,lt=j.Z_HUFFMAN_ONLY,ot=j.Z_RLE,dt=j.Z_FIXED,ut=j.Z_DEFAULT_STRATEGY,ft=j.Z_UNKNOWN,ct=j.Z_DEFLATED,pt=258,gt=262,vt=103,wt=113,bt=666,mt=function(t,e){return t.msg=P[e],e},yt=function(t){return(t<<1)-(t>4?9:0)},kt=function(t){for(var e=t.length;--e>=0;)t[e]=0},zt=function(t,e,a){return(e<<t.hash_shift^a)&t.hash_mask},At=function(t){var e=t.state,a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+a),t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))},xt=function(t,e){W(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,At(t.strm)},Et=function(t,e){t.pending_buf[t.pending++]=e},Zt=function(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e},St=function(t,e){var a,n,r=t.max_chain_length,i=t.strstart,s=t.prev_length,_=t.nice_match,h=t.strstart>t.w_size-gt?t.strstart-(t.w_size-gt):0,l=t.window,o=t.w_mask,d=t.prev,u=t.strstart+pt,f=l[i+s-1],c=l[i+s];t.prev_length>=t.good_match&&(r>>=2),_>t.lookahead&&(_=t.lookahead);do{if(l[(a=e)+s]===c&&l[a+s-1]===f&&l[a]===l[i]&&l[++a]===l[i+1]){i+=2,a++;do{}while(l[++i]===l[++a]&&l[++i]===l[++a]&&l[++i]===l[++a]&&l[++i]===l[++a]&&l[++i]===l[++a]&&l[++i]===l[++a]&&l[++i]===l[++a]&&l[++i]===l[++a]&&i<u);if(n=pt-(u-i),i=u-pt,n>s){if(t.match_start=e,s=n,n>=_)break;f=l[i+s-1],c=l[i+s]}}}while((e=d[e&o])>h&&0!=--r);return s<=t.lookahead?s:t.lookahead},Ut=function(t){var e,a,n,r,i,s,_,h,l,o,d=t.w_size;do{if(r=t.window_size-t.lookahead-t.strstart,t.strstart>=d+(d-gt)){t.window.set(t.window.subarray(d,d+d),0),t.match_start-=d,t.strstart-=d,t.block_start-=d,e=a=t.hash_size;do{n=t.head[--e],t.head[e]=n>=d?n-d:0}while(--a);e=a=d;do{n=t.prev[--e],t.prev[e]=n>=d?n-d:0}while(--a);r+=d}if(0===t.strm.avail_in)break;if(s=t.strm,_=t.window,h=t.strstart+t.lookahead,l=r,o=void 0,(o=s.avail_in)>l&&(o=l),a=0===o?0:(s.avail_in-=o,_.set(s.input.subarray(s.next_in,s.next_in+o),h),1===s.state.wrap?s.adler=H(s.adler,_,o,h):2===s.state.wrap&&(s.adler=K(s.adler,_,o,h)),s.next_in+=o,s.total_in+=o,o),t.lookahead+=a,t.lookahead+t.insert>=3)for(i=t.strstart-t.insert,t.ins_h=t.window[i],t.ins_h=zt(t,t.ins_h,t.window[i+1]);t.insert&&(t.ins_h=zt(t,t.ins_h,t.window[i+3-1]),t.prev[i&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=i,i++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<gt&&0!==t.strm.avail_in)},Rt=function(t,e){for(var a,n;;){if(t.lookahead<gt){if(Ut(t),t.lookahead<gt&&e===J)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=zt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-gt&&(t.match_length=St(t,a)),t.match_length>=3)if(n=$(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=zt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!=--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=zt(t,t.ins_h,t.window[t.strstart+1]);else n=$(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(n&&(xt(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,e===tt?(xt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(xt(t,!1),0===t.strm.avail_out)?1:2},Lt=function(t,e){for(var a,n,r;;){if(t.lookahead<gt){if(Ut(t),t.lookahead<gt&&e===J)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=zt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-gt&&(t.match_length=St(t,a),t.match_length<=5&&(t.strategy===ht||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){r=t.strstart+t.lookahead-3,n=$(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=r&&(t.ins_h=zt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!=--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,n&&(xt(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if((n=$(t,0,t.window[t.strstart-1]))&&xt(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(n=$(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,e===tt?(xt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(xt(t,!1),0===t.strm.avail_out)?1:2};function Ft(t,e,a,n,r){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=n,this.func=r}var Tt=[new Ft(0,0,0,0,(function(t,e){var a=65535;for(a>t.pending_buf_size-5&&(a=t.pending_buf_size-5);;){if(t.lookahead<=1){if(Ut(t),0===t.lookahead&&e===J)return 1;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var n=t.block_start+a;if((0===t.strstart||t.strstart>=n)&&(t.lookahead=t.strstart-n,t.strstart=n,xt(t,!1),0===t.strm.avail_out))return 1;if(t.strstart-t.block_start>=t.w_size-gt&&(xt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===tt?(xt(t,!0),0===t.strm.avail_out?3:4):(t.strstart>t.block_start&&(xt(t,!1),t.strm.avail_out),1)})),new Ft(4,4,8,4,Rt),new Ft(4,5,16,8,Rt),new Ft(4,6,32,32,Rt),new Ft(4,4,16,16,Lt),new Ft(8,16,32,32,Lt),new Ft(8,16,128,128,Lt),new Ft(8,32,128,256,Lt),new Ft(32,128,258,1024,Lt),new Ft(32,258,258,4096,Lt)];function It(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=ct,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),kt(this.dyn_ltree),kt(this.dyn_dtree),kt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),kt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),kt(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}var Ot=function(t){if(!t||!t.state)return mt(t,rt);t.total_in=t.total_out=0,t.data_type=ft;var e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?42:wt,t.adler=2===e.wrap?0:1,e.last_flush=J,G(e),at},Nt=function(t){var e,a=Ot(t);return a===at&&((e=t.state).window_size=2*e.w_size,kt(e.head),e.max_lazy_match=Tt[e.level].max_lazy,e.good_match=Tt[e.level].good_length,e.nice_match=Tt[e.level].nice_length,e.max_chain_length=Tt[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=2,e.match_available=0,e.ins_h=0),a},Dt=function(t,e,a,n,r,i){if(!t)return rt;var s=1;if(e===_t&&(e=6),n<0?(s=0,n=-n):n>15&&(s=2,n-=16),r<1||r>9||a!==ct||n<8||n>15||e<0||e>9||i<0||i>dt)return mt(t,rt);8===n&&(n=9);var _=new It;return t.state=_,_.strm=t,_.wrap=s,_.gzhead=null,_.w_bits=n,_.w_size=1<<_.w_bits,_.w_mask=_.w_size-1,_.hash_bits=r+7,_.hash_size=1<<_.hash_bits,_.hash_mask=_.hash_size-1,_.hash_shift=~~((_.hash_bits+3-1)/3),_.window=new Uint8Array(2*_.w_size),_.head=new Uint16Array(_.hash_size),_.prev=new Uint16Array(_.w_size),_.lit_bufsize=1<<r+6,_.pending_buf_size=4*_.lit_bufsize,_.pending_buf=new Uint8Array(_.pending_buf_size),_.d_buf=1*_.lit_bufsize,_.l_buf=3*_.lit_bufsize,_.level=e,_.strategy=i,_.method=a,Nt(t)},Ct={deflateInit:function(t,e){return Dt(t,e,ct,15,8,ut)},deflateInit2:Dt,deflateReset:Nt,deflateResetKeep:Ot,deflateSetHeader:function(t,e){return t&&t.state?2!==t.state.wrap?rt:(t.state.gzhead=e,at):rt},deflate:function(t,e){var a,n;if(!t||!t.state||e>et||e<0)return t?mt(t,rt):rt;var r=t.state;if(!t.output||!t.input&&0!==t.avail_in||r.status===bt&&e!==tt)return mt(t,0===t.avail_out?st:rt);r.strm=t;var i=r.last_flush;if(r.last_flush=e,42===r.status)if(2===r.wrap)t.adler=0,Et(r,31),Et(r,139),Et(r,8),r.gzhead?(Et(r,(r.gzhead.text?1:0)+(r.gzhead.hcrc?2:0)+(r.gzhead.extra?4:0)+(r.gzhead.name?8:0)+(r.gzhead.comment?16:0)),Et(r,255&r.gzhead.time),Et(r,r.gzhead.time>>8&255),Et(r,r.gzhead.time>>16&255),Et(r,r.gzhead.time>>24&255),Et(r,9===r.level?2:r.strategy>=lt||r.level<2?4:0),Et(r,255&r.gzhead.os),r.gzhead.extra&&r.gzhead.extra.length&&(Et(r,255&r.gzhead.extra.length),Et(r,r.gzhead.extra.length>>8&255)),r.gzhead.hcrc&&(t.adler=K(t.adler,r.pending_buf,r.pending,0)),r.gzindex=0,r.status=69):(Et(r,0),Et(r,0),Et(r,0),Et(r,0),Et(r,0),Et(r,9===r.level?2:r.strategy>=lt||r.level<2?4:0),Et(r,3),r.status=wt);else{var s=ct+(r.w_bits-8<<4)<<8;s|=(r.strategy>=lt||r.level<2?0:r.level<6?1:6===r.level?2:3)<<6,0!==r.strstart&&(s|=32),s+=31-s%31,r.status=wt,Zt(r,s),0!==r.strstart&&(Zt(r,t.adler>>>16),Zt(r,65535&t.adler)),t.adler=1}if(69===r.status)if(r.gzhead.extra){for(a=r.pending;r.gzindex<(65535&r.gzhead.extra.length)&&(r.pending!==r.pending_buf_size||(r.gzhead.hcrc&&r.pending>a&&(t.adler=K(t.adler,r.pending_buf,r.pending-a,a)),At(t),a=r.pending,r.pending!==r.pending_buf_size));)Et(r,255&r.gzhead.extra[r.gzindex]),r.gzindex++;r.gzhead.hcrc&&r.pending>a&&(t.adler=K(t.adler,r.pending_buf,r.pending-a,a)),r.gzindex===r.gzhead.extra.length&&(r.gzindex=0,r.status=73)}else r.status=73;if(73===r.status)if(r.gzhead.name){a=r.pending;do{if(r.pending===r.pending_buf_size&&(r.gzhead.hcrc&&r.pending>a&&(t.adler=K(t.adler,r.pending_buf,r.pending-a,a)),At(t),a=r.pending,r.pending===r.pending_buf_size)){n=1;break}n=r.gzindex<r.gzhead.name.length?255&r.gzhead.name.charCodeAt(r.gzindex++):0,Et(r,n)}while(0!==n);r.gzhead.hcrc&&r.pending>a&&(t.adler=K(t.adler,r.pending_buf,r.pending-a,a)),0===n&&(r.gzindex=0,r.status=91)}else r.status=91;if(91===r.status)if(r.gzhead.comment){a=r.pending;do{if(r.pending===r.pending_buf_size&&(r.gzhead.hcrc&&r.pending>a&&(t.adler=K(t.adler,r.pending_buf,r.pending-a,a)),At(t),a=r.pending,r.pending===r.pending_buf_size)){n=1;break}n=r.gzindex<r.gzhead.comment.length?255&r.gzhead.comment.charCodeAt(r.gzindex++):0,Et(r,n)}while(0!==n);r.gzhead.hcrc&&r.pending>a&&(t.adler=K(t.adler,r.pending_buf,r.pending-a,a)),0===n&&(r.status=vt)}else r.status=vt;if(r.status===vt&&(r.gzhead.hcrc?(r.pending+2>r.pending_buf_size&&At(t),r.pending+2<=r.pending_buf_size&&(Et(r,255&t.adler),Et(r,t.adler>>8&255),t.adler=0,r.status=wt)):r.status=wt),0!==r.pending){if(At(t),0===t.avail_out)return r.last_flush=-1,at}else if(0===t.avail_in&&yt(e)<=yt(i)&&e!==tt)return mt(t,st);if(r.status===bt&&0!==t.avail_in)return mt(t,st);if(0!==t.avail_in||0!==r.lookahead||e!==J&&r.status!==bt){var _=r.strategy===lt?function(t,e){for(var a;;){if(0===t.lookahead&&(Ut(t),0===t.lookahead)){if(e===J)return 1;break}if(t.match_length=0,a=$(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(xt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===tt?(xt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(xt(t,!1),0===t.strm.avail_out)?1:2}(r,e):r.strategy===ot?function(t,e){for(var a,n,r,i,s=t.window;;){if(t.lookahead<=pt){if(Ut(t),t.lookahead<=pt&&e===J)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(n=s[r=t.strstart-1])===s[++r]&&n===s[++r]&&n===s[++r]){i=t.strstart+pt;do{}while(n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&r<i);t.match_length=pt-(i-r),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(a=$(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=$(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(xt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===tt?(xt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(xt(t,!1),0===t.strm.avail_out)?1:2}(r,e):Tt[r.level].func(r,e);if(3!==_&&4!==_||(r.status=bt),1===_||3===_)return 0===t.avail_out&&(r.last_flush=-1),at;if(2===_&&(e===Q?q(r):e!==et&&(X(r,0,0,!1),e===V&&(kt(r.head),0===r.lookahead&&(r.strstart=0,r.block_start=0,r.insert=0))),At(t),0===t.avail_out))return r.last_flush=-1,at}return e!==tt?at:r.wrap<=0?nt:(2===r.wrap?(Et(r,255&t.adler),Et(r,t.adler>>8&255),Et(r,t.adler>>16&255),Et(r,t.adler>>24&255),Et(r,255&t.total_in),Et(r,t.total_in>>8&255),Et(r,t.total_in>>16&255),Et(r,t.total_in>>24&255)):(Zt(r,t.adler>>>16),Zt(r,65535&t.adler)),At(t),r.wrap>0&&(r.wrap=-r.wrap),0!==r.pending?at:nt)},deflateEnd:function(t){if(!t||!t.state)return rt;var e=t.state.status;return 42!==e&&69!==e&&73!==e&&91!==e&&e!==vt&&e!==wt&&e!==bt?mt(t,rt):(t.state=null,e===wt?mt(t,it):at)},deflateSetDictionary:function(t,e){var a=e.length;if(!t||!t.state)return rt;var n=t.state,r=n.wrap;if(2===r||1===r&&42!==n.status||n.lookahead)return rt;if(1===r&&(t.adler=H(t.adler,e,a,0)),n.wrap=0,a>=n.w_size){0===r&&(kt(n.head),n.strstart=0,n.block_start=0,n.insert=0);var i=new Uint8Array(n.w_size);i.set(e.subarray(a-n.w_size,a),0),e=i,a=n.w_size}var s=t.avail_in,_=t.next_in,h=t.input;for(t.avail_in=a,t.next_in=0,t.input=e,Ut(n);n.lookahead>=3;){var l=n.strstart,o=n.lookahead-2;do{n.ins_h=zt(n,n.ins_h,n.window[l+3-1]),n.prev[l&n.w_mask]=n.head[n.ins_h],n.head[n.ins_h]=l,l++}while(--o);n.strstart=l,n.lookahead=2,Ut(n)}return n.strstart+=n.lookahead,n.block_start=n.strstart,n.insert=n.lookahead,n.lookahead=0,n.match_length=n.prev_length=2,n.match_available=0,t.next_in=_,t.input=h,t.avail_in=s,n.wrap=r,at},deflateInfo:\"pako deflate (from Nodeca project)\"};for(var Mt=new Uint8Array(256),Bt=0;Bt<256;Bt++)Mt[Bt]=Bt>=252?6:Bt>=248?5:Bt>=240?4:Bt>=224?3:Bt>=192?2:1;Mt[254]=Mt[254]=1;var Ht=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg=\"\",this.state=null,this.data_type=2,this.adler=0},Yt=Object.prototype.toString,Kt=j.Z_NO_FLUSH,Pt=j.Z_SYNC_FLUSH,jt=j.Z_FULL_FLUSH,Gt=j.Z_FINISH,Xt=j.Z_OK,Wt=j.Z_STREAM_END,$t=j.Z_DEFAULT_COMPRESSION,qt=j.Z_DEFAULT_STRATEGY,Jt=j.Z_DEFLATED;function Qt(){this.options={level:$t,method:Jt,chunkSize:16384,windowBits:15,memLevel:8,strategy:qt};var t=this.options;t.raw&&t.windowBits>0?t.windowBits=-t.windowBits:t.gzip&&t.windowBits>0&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg=\"\",this.ended=!1,this.chunks=[],this.strm=new Ht,this.strm.avail_out=0;var e=Ct.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(e!==Xt)throw new Error(P[e]);if(t.header&&Ct.deflateSetHeader(this.strm,t.header),t.dictionary){var a;if(a=\"[object ArrayBuffer]\"===Yt.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(e=Ct.deflateSetDictionary(this.strm,a))!==Xt)throw new Error(P[e]);this._dict_set=!0}}function Vt(t,e,a){try{t.postMessage({type:\"errored\",error:e,streamId:a})}catch(n){t.postMessage({type:\"errored\",error:String(e),streamId:a})}}function te(t){var e=t.strm.adler;return new Uint8Array([3,0,e>>>24&255,e>>>16&255,e>>>8&255,255&e])}Qt.prototype.push=function(t,e){var a,n,r=this.strm,i=this.options.chunkSize;if(this.ended)return!1;for(n=e===~~e?e:!0===e?Gt:Kt,\"[object ArrayBuffer]\"===Yt.call(t)?r.input=new Uint8Array(t):r.input=t,r.next_in=0,r.avail_in=r.input.length;;)if(0===r.avail_out&&(r.output=new Uint8Array(i),r.next_out=0,r.avail_out=i),(n===Pt||n===jt)&&r.avail_out<=6)this.onData(r.output.subarray(0,r.next_out)),r.avail_out=0;else{if((a=Ct.deflate(r,n))===Wt)return r.next_out>0&&this.onData(r.output.subarray(0,r.next_out)),a=Ct.deflateEnd(this.strm),this.onEnd(a),this.ended=!0,a===Xt;if(0!==r.avail_out){if(n>0&&r.next_out>0)this.onData(r.output.subarray(0,r.next_out)),r.avail_out=0;else if(0===r.avail_in)break}else this.onData(r.output)}return!0},Qt.prototype.onData=function(t){this.chunks.push(t)},Qt.prototype.onEnd=function(t){t===Xt&&(this.result=function(t){for(var e=0,a=0,n=t.length;a<n;a++)e+=t[a].length;for(var r=new Uint8Array(e),i=0,s=0,_=t.length;i<_;i++){var h=t[i];r.set(h,s),s+=h.length}return r}(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},function(t){void 0===t&&(t=self);try{var e=new Map;t.addEventListener(\"message\",(function(n){try{var r=function(t,e){switch(e.action){case\"init\":return{type:\"initialized\",version:\"3.1.5\"};case\"write\":var n=t.get(e.streamId);n||(n=new Qt,t.set(e.streamId,n));var r=n.chunks.length,i=function(t){if(\"function\"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(t);let e,a,n,r,i,s=t.length,_=0;for(r=0;r<s;r++)a=t.charCodeAt(r),55296==(64512&a)&&r+1<s&&(n=t.charCodeAt(r+1),56320==(64512&n)&&(a=65536+(a-55296<<10)+(n-56320),r++)),_+=a<128?1:a<2048?2:a<65536?3:4;for(e=new Uint8Array(_),i=0,r=0;i<_;r++)a=t.charCodeAt(r),55296==(64512&a)&&r+1<s&&(n=t.charCodeAt(r+1),56320==(64512&n)&&(a=65536+(a-55296<<10)+(n-56320),r++)),a<128?e[i++]=a:a<2048?(e[i++]=192|a>>>6,e[i++]=128|63&a):a<65536?(e[i++]=224|a>>>12,e[i++]=128|a>>>6&63,e[i++]=128|63&a):(e[i++]=240|a>>>18,e[i++]=128|a>>>12&63,e[i++]=128|a>>>6&63,e[i++]=128|63&a);return e}(e.data);return n.push(i,j.Z_SYNC_FLUSH),{type:\"wrote\",id:e.id,streamId:e.streamId,result:a(n.chunks.slice(r)),trailer:te(n),additionalBytesCount:i.length};case\"reset\":t.delete(e.streamId)}}(e,n.data);r&&t.postMessage(r)}catch(e){Vt(t,e,n.data&&\"streamId\"in n.data?n.data.streamId:void 0)}}))}catch(e){Vt(t,e)}}()}();"])));
    }
    /**
     * In order to be sure that the worker is correctly working, we need a round trip of
     * initialization messages, making the creation asynchronous.
     * These worker lifecycle states handle this case.
     */
    var DeflateWorkerStatus = {
      Nil: 0,
      Loading: 1,
      Error: 2,
      Initialized: 3
    };
    var state = {
      status: DeflateWorkerStatus.Nil
    };
    function startDeflateWorker(onInitializationFailure, createDeflateWorkerImpl) {
      if (createDeflateWorkerImpl === undefined) {
        createDeflateWorkerImpl = createDeflateWorker;
      }
      if (state.status === DeflateWorkerStatus.Nil) {
        doStartDeflateWorker(createDeflateWorkerImpl);
      }
      switch (state.status) {
        case DeflateWorkerStatus.Loading:
          state.initializationFailureCallbacks.push(onInitializationFailure);
          return state.worker;
        case DeflateWorkerStatus.Initialized:
          return state.worker;
      }
    }
    function getDeflateWorkerStatus() {
      return state.status;
    }

    /**
     * Starts the deflate worker and handle messages and errors
     *
     * The spec allow browsers to handle worker errors differently:
     * - Chromium throws an exception
     * - Firefox fires an error event
     *
     * more details: https://bugzilla.mozilla.org/show_bug.cgi?id=1736865#c2
     */
    function doStartDeflateWorker(createDeflateWorkerImpl) {
      if (createDeflateWorkerImpl === undefined) {
        createDeflateWorkerImpl = createDeflateWorker;
      }
      try {
        var worker = createDeflateWorkerImpl();
        addEventListener(worker, 'error', onError);
        addEventListener(worker, 'message', function (event) {
          var data = event.data;
          if (data.type === 'errored') {
            onError(data.error, data.streamId);
          } else if (data.type === 'initialized') {
            onInitialized(data.version);
          }
        });
        worker.postMessage({
          action: 'init'
        });
        setTimeout$1(onTimeout, INITIALIZATION_TIME_OUT_DELAY);
        state = {
          status: DeflateWorkerStatus.Loading,
          worker: worker,
          initializationFailureCallbacks: []
        };
      } catch (error) {
        onError(error);
      }
    }
    function onTimeout() {
      if (state.status === DeflateWorkerStatus.Loading) {
        display.error('Session Replay recording failed to start: a timeout occurred while initializing the Worker');
        state.initializationFailureCallbacks.forEach(function (callback) {
          callback();
        });
        state = {
          status: DeflateWorkerStatus.Error
        };
      }
    }
    function onInitialized(version) {
      if (state.status === DeflateWorkerStatus.Loading) {
        state = {
          status: DeflateWorkerStatus.Initialized,
          worker: state.worker,
          version: version
        };
      }
    }
    function onError(error, streamId) {
      if (state.status === DeflateWorkerStatus.Loading) {
        display.error('Session Replay recording failed to start: an error occurred while creating the Worker:', error);
        if (error instanceof Event || error instanceof Error && isMessageCspRelated(error.message)) {
          display.error('Please make sure CSP is correctly configured !!!');
        } else {
          addTelemetryError(error);
        }
        if (state.status === DeflateWorkerStatus.Loading) {
          state.initializationFailureCallbacks.forEach(function (callback) {
            callback();
          });
        }
        state = {
          status: DeflateWorkerStatus.Error
        };
      } else {
        addTelemetryError(error, {
          worker_version: state.status === DeflateWorkerStatus.Initialized && state.version,
          stream_id: streamId
        });
      }
    }
    function isMessageCspRelated(message) {
      return includes(message, 'Content Security Policy') ||
      // Related to `require-trusted-types-for` CSP: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/require-trusted-types-for
      includes(message, "requires 'TrustedScriptURL'");
    }

    var RecorderStatus = {
      // The recorder is stopped.
      Stopped: 0,
      // The user started the recording while it wasn't possible yet. The recorder should start as soon
      // as possible.
      IntentToStart: 1,
      // The recorder is starting. It does not record anything yet.
      Starting: 2,
      // The recorder is started, it records the session.
      Started: 3
    };
    function makeRecorderApi(startRecordingImpl, createDeflateWorkerImpl) {
      var recorderStartObservable = new Observable();
      if (canUseEventBridge() || !isBrowserSupported()) {
        return {
          start: noop,
          stop: noop,
          getReplayStats: function getReplayStats() {
            return undefined;
          },
          onRumStart: noop,
          isRecording: function isRecording() {
            return false;
          },
          recorderStartObservable: recorderStartObservable
        };
      }
      var state = {
        status: RecorderStatus.Stopped
      };
      var startStrategy = function startStrategy() {
        state = {
          status: RecorderStatus.IntentToStart
        };
      };
      var stopStrategy = function stopStrategy() {
        state = {
          status: RecorderStatus.Stopped
        };
      };
      return {
        start: function start() {
          startStrategy();
        },
        stop: function stop() {
          stopStrategy();
        },
        recorderStartObservable: recorderStartObservable,
        getReplayStats: function getReplayStats$1(viewId) {
          return getDeflateWorkerStatus() === DeflateWorkerStatus.Initialized ? getReplayStats(viewId) : undefined;
        },
        onRumStart: function onRumStart(lifeCycle, configuration, sessionManager, viewContexts) {
          lifeCycle.subscribe(LifeCycleEventType.SESSION_EXPIRED, function () {
            if (state.status === RecorderStatus.Starting || state.status === RecorderStatus.Started) {
              stopStrategy();
              state = {
                status: RecorderStatus.IntentToStart
              };
            }
          });
          lifeCycle.subscribe(LifeCycleEventType.SESSION_RENEWED, function () {
            if (state.status === RecorderStatus.IntentToStart) {
              startStrategy();
            }
          });
          startStrategy = function startStrategy() {
            var session = sessionManager.findTrackedSession();
            if (!session || !session.sessionReplayAllowed) {
              state = {
                status: RecorderStatus.IntentToStart
              };
              return;
            }
            if (state.status === RecorderStatus.Starting || state.status === RecorderStatus.Started) {
              return;
            }
            state = {
              status: RecorderStatus.Starting
            };
            runOnReadyState('interactive', function () {
              if (state.status !== RecorderStatus.Starting) {
                return;
              }
              if (state.status !== RecorderStatus.Starting) {
                return;
              }
              var worker = startDeflateWorker(function () {
                stopStrategy();
              }, createDeflateWorkerImpl);
              if (!worker) {
                state = {
                  status: RecorderStatus.Stopped
                };
                return;
              }
              var recordingImpl = startRecordingImpl(lifeCycle, configuration, sessionManager, viewContexts, createDeflateEncoder(worker, DeflateEncoderStreamId.REPLAY));
              recorderStartObservable.notify(relativeNow());
              state = {
                status: RecorderStatus.Started,
                stopRecording: recordingImpl.stop
              };
            });
          };
          stopStrategy = function stopStrategy() {
            if (state.status === RecorderStatus.Stopped) {
              return;
            }
            if (state.status === RecorderStatus.Started) {
              state.stopRecording();
            }
            state = {
              status: RecorderStatus.Stopped
            };
          };
          if (state.status === RecorderStatus.IntentToStart) {
            startStrategy();
          }
        },
        isRecording: function isRecording() {
          return state.status === RecorderStatus.Started;
        }
      };
    }

    /**
     * Test for Browser features used while recording
     */
    function isBrowserSupported() {
      return (
        // Array.from is a bit less supported by browsers than CSSSupportsRule, but has higher chances
        // to be polyfilled. Test for both to be more confident. We could add more things if we find out
        // this test is not sufficient.
        typeof Array.from === 'function' && typeof CSSSupportsRule === 'function' && typeof URL.createObjectURL === 'function' && 'forEach' in NodeList.prototype
      );
    }

    var recorderApi = makeRecorderApi(startRecording);
    var datafluxRum = makeRumPublicApi(startRum, recorderApi);
    defineGlobal(getGlobalObject(), 'DATAFLUX_RUM', datafluxRum);

    function guancecom(
    // analytics: any,
    settings) {
        var defaultOptions = {
            traceType: 'jaeger',
            trackInteractions: true,
        };
        var uniOptions = {
            service: settings.app.service,
            version: settings.app.version,
            env: settings.app.profile,
        };
        var sdkOptions = {
            applicationId: settings.id,
            // settings.token
            datakitOrigin: settings.endpoint,
        };
        var rumOptions = __assign({}, settings.rum);
        if (rumOptions.beforeSend) {
            // @ts-ignore
            sdkOptions.beforeSend = rumOptions.beforeSend;
        }
        function isDeny(event) {
            if (event.type === 'resource') {
                var origins = rumOptions.denyResourceOrigins;
                for (var i = 0; i < origins.length; i += 1) {
                    if (event.resource.url.indexOf(origins[i]) > 0) {
                        return true;
                    }
                }
            }
            return false;
        }
        if (rumOptions.denyResourceOrigins && rumOptions.denyResourceOrigins.length > 0) {
            // @ts-ignore
            if (sdkOptions.beforeSend) {
                // @ts-ignore
                var that_1 = sdkOptions.beforeSend;
                // @ts-ignore
                sdkOptions.beforeSend = function (event, context) {
                    if (isDeny(event)) {
                        return false;
                    }
                    if (that_1(event, context) === false) {
                        return false;
                    }
                };
            }
            else {
                // @ts-ignore
                sdkOptions.beforeSend = function (event, context) {
                    if (isDeny(event)) {
                        return false;
                    }
                };
            }
        }
        var options = __assign(__assign(__assign(__assign({}, defaultOptions), uniOptions), sdkOptions), settings);
        datafluxRum.init(options);
        function transform(event) {
            event.context.page; var messageId = event.messageId, anonymousId = event.anonymousId, type = event.type, properties = event.properties, timestamp = event.timestamp;
            return { messageId: messageId, anonymousId: anonymousId, type: type, properties: properties, timestamp: timestamp };
        }
        function addAction(ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var event;
                return __generator(this, function (_a) {
                    event = transform(ctx.event);
                    datafluxRum.addAction(ctx.event.event, event);
                    return [2 /*return*/, Promise.resolve()];
                });
            });
        }
        var guancecom = {
            name: 'Guance.com',
            type: 'destination',
            version: '3.1.5-1',
            isLoaded: function () { return true; },
            load: function () { return Promise.resolve(); },
            track: addAction,
            // identify: send,
            page: function () { return Promise.resolve(); },
            // alias: send,
            // group: send,
        };
        return guancecom;
    }

    return guancecom;

})();
