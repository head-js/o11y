var AnalyticsPluginDatadogcom = (function () {
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

    /* eslint-disable no-console, local-rules/disallow-side-effects */
    /**
     * Keep references on console methods to avoid triggering patched behaviors
     *
     * NB: in some setup, console could already be patched by another SDK.
     * In this case, some display messages can be sent by the other SDK
     * but we should be safe from infinite loop nonetheless.
     */
    var ConsoleApiName = {
        log: 'log',
        debug: 'debug',
        info: 'info',
        warn: 'warn',
        error: 'error',
    };
    var display = function (api) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
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

    var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return callMonitored(fn, this, arguments);
        }; // consider output type has input type
    }
    function callMonitored(fn, context, args) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return fn.apply(context, args);
        }
        catch (e) {
            displayIfDebugEnabled(ConsoleApiName.error, e);
            if (onMonitorErrorCollected) {
                try {
                    onMonitorErrorCollected(e);
                }
                catch (e) {
                    displayIfDebugEnabled(ConsoleApiName.error, e);
                }
            }
        }
    }
    function displayIfDebugEnabled(api) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (debugMode) {
            display.apply(void 0, __spreadArray([api, '[MONITOR]'], args, false));
        }
    }

    var ONE_SECOND = 1000;
    var ONE_MINUTE = 60 * ONE_SECOND;
    var ONE_HOUR = 60 * ONE_MINUTE;
    var ONE_DAY = 24 * ONE_HOUR;
    var ONE_YEAR = 365 * ONE_DAY;
    var ONE_KIBI_BYTE = 1024;
    var ONE_MEBI_BYTE = 1024 * ONE_KIBI_BYTE;
    // use lodash API
    function throttle(fn, wait, options) {
        var needLeadingExecution = options && options.leading !== undefined ? options.leading : true;
        var needTrailingExecution = options && options.trailing !== undefined ? options.trailing : true;
        var inWaitPeriod = false;
        var pendingExecutionWithParameters;
        var pendingTimeoutId;
        return {
            throttled: function () {
                var parameters = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    parameters[_i] = arguments[_i];
                }
                if (inWaitPeriod) {
                    pendingExecutionWithParameters = parameters;
                    return;
                }
                if (needLeadingExecution) {
                    fn.apply(void 0, parameters);
                }
                else {
                    pendingExecutionWithParameters = parameters;
                }
                inWaitPeriod = true;
                pendingTimeoutId = setTimeout(function () {
                    if (needTrailingExecution && pendingExecutionWithParameters) {
                        fn.apply(void 0, pendingExecutionWithParameters);
                    }
                    inWaitPeriod = false;
                    pendingExecutionWithParameters = undefined;
                }, wait);
            },
            cancel: function () {
                clearTimeout(pendingTimeoutId);
                inWaitPeriod = false;
                pendingExecutionWithParameters = undefined;
            },
        };
    }
    function assign(target) {
        var toAssign = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            toAssign[_i - 1] = arguments[_i];
        }
        toAssign.forEach(function (source) {
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        });
        return target;
    }
    function shallowClone(object) {
        return assign({}, object);
    }
    /**
     * UUID v4
     * from https://gist.github.com/jed/982883
     */
    function generateUUID(placeholder) {
        return placeholder
            ? // eslint-disable-next-line  no-bitwise
                (parseInt(placeholder, 10) ^ ((Math.random() * 16) >> (parseInt(placeholder, 10) / 4))).toString(16)
            : "".concat(1e7, "-").concat(1e3, "-").concat(4e3, "-").concat(8e3, "-").concat(1e11).replace(/[018]/g, generateUUID);
    }
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function noop() { }
    /**
     * Custom implementation of JSON.stringify that ignores some toJSON methods. We need to do that
     * because some sites badly override toJSON on certain objects. Removing all toJSON methods from
     * nested values would be too costly, so we just detach them from the root value, and native classes
     * used to build JSON values (Array and Object).
     *
     * Note: this still assumes that JSON.stringify is correct.
     */
    function jsonStringify(value, replacer, space) {
        if (typeof value !== 'object' || value === null) {
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
        }
        catch (_a) {
            return '<error: unable to serialize object>';
        }
        finally {
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
    function includes(candidate, search) {
        return candidate.indexOf(search) !== -1;
    }
    function arrayFrom(arrayLike) {
        if (Array.from) {
            return Array.from(arrayLike);
        }
        var array = [];
        if (arrayLike instanceof Set) {
            arrayLike.forEach(function (item) { return array.push(item); });
        }
        else {
            for (var i = 0; i < arrayLike.length; i++) {
                array.push(arrayLike[i]);
            }
        }
        return array;
    }
    function find(array, predicate) {
        for (var i = 0; i < array.length; i += 1) {
            var item = array[i];
            if (predicate(item, i)) {
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
    function isNumber(value) {
        return typeof value === 'number';
    }
    function objectValues(object) {
        return Object.keys(object).map(function (key) { return object[key]; });
    }
    function objectHasValue(object, value) {
        return Object.keys(object).some(function (key) { return object[key] === value; });
    }
    function objectEntries(object) {
        return Object.keys(object).map(function (key) { return [key, object[key]]; });
    }
    function isEmptyObject(object) {
        return Object.keys(object).length === 0;
    }
    function mapValues(object, fn) {
        var newObject = {};
        for (var _i = 0, _a = Object.keys(object); _i < _a.length; _i++) {
            var key = _a[_i];
            newObject[key] = fn(object[key]);
        }
        return newObject;
    }
    function startsWith(candidate, search) {
        return candidate.slice(0, search.length) === search;
    }
    function endsWith(candidate, search) {
        return candidate.slice(-search.length) === search;
    }
    /**
     * inspired by https://mathiasbynens.be/notes/globalthis
     */
    function getGlobalObject() {
        if (typeof globalThis === 'object') {
            return globalThis;
        }
        Object.defineProperty(Object.prototype, '_dd_temp_', {
            get: function () {
                return this;
            },
            configurable: true,
        });
        // @ts-ignore _dd_temp is defined using defineProperty
        var globalObject = _dd_temp_;
        // @ts-ignore _dd_temp is defined using defineProperty
        delete Object.prototype._dd_temp_;
        if (typeof globalObject !== 'object') {
            // on safari _dd_temp_ is available on window but not globally
            // fallback on other browser globals check
            if (typeof self === 'object') {
                globalObject = self;
            }
            else if (typeof window === 'object') {
                globalObject = window;
            }
            else {
                globalObject = {};
            }
        }
        return globalObject;
    }
    function getLocationOrigin() {
        return getLinkElementOrigin(window.location);
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
        return "".concat(element.protocol, "//").concat(sanitizedHost);
    }
    function findCommaSeparatedValue(rawString, name) {
        var regex = new RegExp("(?:^|;)\\s*".concat(name, "\\s*=\\s*([^;]+)"));
        var matches = regex.exec(rawString);
        return matches ? matches[1] : undefined;
    }
    function safeTruncate(candidate, length, suffix) {
        if (suffix === void 0) { suffix = ''; }
        var lastChar = candidate.charCodeAt(length - 1);
        var isLastCharSurrogatePair = lastChar >= 0xd800 && lastChar <= 0xdbff;
        var correctedLength = isLastCharSurrogatePair ? length + 1 : length;
        if (candidate.length <= correctedLength)
            return candidate;
        return "".concat(candidate.slice(0, correctedLength)).concat(suffix);
    }
    /**
     * Add an event listener to an event emitter object (Window, Element, mock object...).  This provides
     * a few conveniences compared to using `element.addEventListener` directly:
     *
     * * supports IE11 by: using an option object only if needed and emulating the `once` option
     *
     * * wraps the listener with a `monitor` function
     *
     * * returns a `stop` function to remove the listener
     */
    function addEventListener(emitter, event, listener, options) {
        return addEventListeners(emitter, [event], listener, options);
    }
    /**
     * Add event listeners to an event emitter object (Window, Element, mock object...).  This provides
     * a few conveniences compared to using `element.addEventListener` directly:
     *
     * * supports IE11 by: using an option object only if needed and emulating the `once` option
     *
     * * wraps the listener with a `monitor` function
     *
     * * returns a `stop` function to remove the listener
     *
     * * with `once: true`, the listener will be called at most once, even if different events are listened
     */
    function addEventListeners(emitter, events, listener, _a) {
        var _b = _a === void 0 ? {} : _a, once = _b.once, capture = _b.capture, passive = _b.passive;
        var wrappedListener = monitor(once
            ? function (event) {
                stop();
                listener(event);
            }
            : listener);
        var options = passive ? { capture: capture, passive: passive } : capture;
        events.forEach(function (event) { return emitter.addEventListener(event, wrappedListener, options); });
        var stop = function () { return events.forEach(function (event) { return emitter.removeEventListener(event, wrappedListener, options); }); };
        return {
            stop: stop,
        };
    }
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
    function runOnReadyState(expectedReadyState, callback) {
        if (document.readyState === expectedReadyState || document.readyState === 'complete') {
            callback();
        }
        else {
            var eventName = expectedReadyState === 'complete' ? "load" /* LOAD */ : "DOMContentLoaded" /* DOM_CONTENT_LOADED */;
            addEventListener(window, eventName, callback, { once: true });
        }
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
    function createCircularReferenceChecker() {
        if (typeof WeakSet !== 'undefined') {
            var set_1 = new WeakSet();
            return {
                hasAlreadyBeenSeen: function (value) {
                    var has = set_1.has(value);
                    if (!has) {
                        set_1.add(value);
                    }
                    return has;
                },
            };
        }
        var array = [];
        return {
            hasAlreadyBeenSeen: function (value) {
                var has = array.indexOf(value) >= 0;
                if (!has) {
                    array.push(value);
                }
                return has;
            },
        };
    }
    /**
     * Iterate over source and affect its sub values into destination, recursively.
     * If the source and destination can't be merged, return source.
     */
    function mergeInto(destination, source, circularReferenceChecker) {
        if (circularReferenceChecker === void 0) { circularReferenceChecker = createCircularReferenceChecker(); }
        // ignore the source if it is undefined
        if (source === undefined) {
            return destination;
        }
        if (typeof source !== 'object' || source === null) {
            // primitive values - just return source
            return source;
        }
        else if (source instanceof Date) {
            return new Date(source.getTime());
        }
        else if (source instanceof RegExp) {
            var flags = source.flags ||
                // old browsers compatibility
                [
                    source.global ? 'g' : '',
                    source.ignoreCase ? 'i' : '',
                    source.multiline ? 'm' : '',
                    source.sticky ? 'y' : '',
                    source.unicode ? 'u' : '',
                ].join('');
            return new RegExp(source.source, flags);
        }
        if (circularReferenceChecker.hasAlreadyBeenSeen(source)) {
            // remove circular references
            return undefined;
        }
        else if (Array.isArray(source)) {
            var merged_1 = Array.isArray(destination) ? destination : [];
            for (var i = 0; i < source.length; ++i) {
                merged_1[i] = mergeInto(merged_1[i], source[i], circularReferenceChecker);
            }
            return merged_1;
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
    function combine() {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
        }
        var destination;
        for (var _a = 0, sources_1 = sources; _a < sources_1.length; _a++) {
            var source = sources_1[_a];
            // Ignore any undefined or null sources.
            if (source === undefined || source === null) {
                continue;
            }
            destination = mergeInto(destination, source);
        }
        return destination;
    }
    function requestIdleCallback(callback, opts) {
        // Use 'requestIdleCallback' when available: it will throttle the mutation processing if the
        // browser is busy rendering frames (ex: when frames are below 60fps). When not available, the
        // fallback on 'requestAnimationFrame' will still ensure the mutations are processed after any
        // browser rendering process (Layout, Recalculate Style, etc.), so we can serialize DOM nodes
        // efficiently.
        if (window.requestIdleCallback) {
            var id_1 = window.requestIdleCallback(monitor(callback), opts);
            return function () { return window.cancelIdleCallback(id_1); };
        }
        var id = window.requestAnimationFrame(monitor(callback));
        return function () { return window.cancelAnimationFrame(id); };
    }
    function matchList(list, value) {
        return list.some(function (item) { return item === value || (item instanceof RegExp && item.test(value)); });
    }
    // https://github.com/jquery/jquery/blob/a684e6ba836f7c553968d7d026ed7941e1a612d8/src/selector/escapeSelector.js
    function cssEscape(str) {
        if (window.CSS && window.CSS.escape) {
            return window.CSS.escape(str);
        }
        // eslint-disable-next-line no-control-regex
        return str.replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function (ch, asCodePoint) {
            if (asCodePoint) {
                // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
                if (ch === '\0') {
                    return '\uFFFD';
                }
                // Control characters and (dependent upon position) numbers get escaped as code points
                return "".concat(ch.slice(0, -1), "\\").concat(ch.charCodeAt(ch.length - 1).toString(16), " ");
            }
            // Other potentially-special ASCII characters get backslash-escaped
            return "\\".concat(ch);
        });
    }

    var COOKIE_ACCESS_DELAY = ONE_SECOND;
    function setCookie(name, value, expireDelay, options) {
        var date = new Date();
        date.setTime(date.getTime() + expireDelay);
        var expires = "expires=".concat(date.toUTCString());
        var sameSite = options && options.crossSite ? 'none' : 'strict';
        var domain = options && options.domain ? ";domain=".concat(options.domain) : '';
        var secure = options && options.secure ? ';secure' : '';
        document.cookie = "".concat(name, "=").concat(value, ";").concat(expires, ";path=/;samesite=").concat(sameSite).concat(domain).concat(secure);
    }
    function getCookie(name) {
        return findCommaSeparatedValue(document.cookie, name);
    }
    function deleteCookie(name, options) {
        setCookie(name, '', 0, options);
    }
    function areCookiesAuthorized(options) {
        if (document.cookie === undefined || document.cookie === null) {
            return false;
        }
        try {
            // Use a unique cookie name to avoid issues when the SDK is initialized multiple times during
            // the test cookie lifetime
            var testCookieName = "dd_cookie_test_".concat(generateUUID());
            var testCookieValue = 'test';
            setCookie(testCookieName, testCookieValue, ONE_SECOND, options);
            var isCookieCorrectlySet = getCookie(testCookieName) === testCookieValue;
            deleteCookie(testCookieName, options);
            return isCookieCorrectlySet;
        }
        catch (error) {
            display.error(error);
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
            var testCookieName = "dd_site_test_".concat(generateUUID());
            var testCookieValue = 'test';
            var domainLevels = window.location.hostname.split('.');
            var candidateDomain = domainLevels.pop();
            while (domainLevels.length && !getCookie(testCookieName)) {
                candidateDomain = "".concat(domainLevels.pop(), ".").concat(candidateDomain);
                setCookie(testCookieName, testCookieValue, ONE_SECOND, { domain: candidateDomain });
            }
            deleteCookie(testCookieName, { domain: candidateDomain });
            getCurrentSiteCache = candidateDomain;
        }
        return getCurrentSiteCache;
    }

    function catchUserErrors(fn, errorMsg) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            try {
                return fn.apply(void 0, args);
            }
            catch (err) {
                display.error(errorMsg, err);
            }
        };
    }

    /**
     * LIMITATION:
     * For NPM setup, this feature flag singleton is shared between RUM and Logs product.
     * This means that an experimental flag set on the RUM product will be set on the Logs product.
     * So keep in mind that in certain configurations, your experimental feature flag may affect other products.
     */
    var enabledExperimentalFeatures;
    function updateExperimentalFeatures(enabledFeatures) {
        // Safely handle external data
        if (!Array.isArray(enabledFeatures)) {
            return;
        }
        if (!enabledExperimentalFeatures) {
            enabledExperimentalFeatures = new Set(enabledFeatures);
        }
        enabledFeatures
            .filter(function (flag) { return typeof flag === 'string'; })
            .forEach(function (flag) {
            if (includes(flag, '-')) {
                display.warn("please use snake case for '".concat(flag, "'"));
            }
            enabledExperimentalFeatures.add(flag);
        });
    }
    function isExperimentalFeatureEnabled(featureName) {
        return !!enabledExperimentalFeatures && enabledExperimentalFeatures.has(featureName);
    }
    function getExperimentalFeatures() {
        return enabledExperimentalFeatures || new Set();
    }

    function relativeToClocks(relative) {
        return { relative: relative, timeStamp: getCorrectedTimeStamp(relative) };
    }
    function getCorrectedTimeStamp(relativeTime) {
        var correctedOrigin = (dateNow() - performance.now());
        // apply correction only for positive drift
        if (correctedOrigin > getNavigationStart()) {
            return Math.round(addDuration(correctedOrigin, relativeTime));
        }
        return getTimeStamp(relativeTime);
    }
    function currentDrift() {
        return Math.round(dateNow() - addDuration(getNavigationStart(), performance.now()));
    }
    function toServerDuration(duration) {
        if (!isNumber(duration)) {
            return duration;
        }
        return round(duration * 1e6, 0);
    }
    function dateNow() {
        // Do not use `Date.now` because sometimes websites are wrongly "polyfilling" it. For example, we
        // had some users using a very old version of `datejs`, which patched `Date.now` to return a Date
        // instance instead of a timestamp[1]. Those users are unlikely to fix this, so let's handle this
        // case ourselves.
        // [1]: https://github.com/datejs/Datejs/blob/97f5c7c58c5bc5accdab8aa7602b6ac56462d778/src/core-debug.js#L14-L16
        return new Date().getTime();
    }
    function timeStampNow() {
        return dateNow();
    }
    function relativeNow() {
        return performance.now();
    }
    function clocksNow() {
        return { relative: relativeNow(), timeStamp: timeStampNow() };
    }
    function clocksOrigin() {
        return { relative: 0, timeStamp: getNavigationStart() };
    }
    function elapsed(start, end) {
        return (end - start);
    }
    function addDuration(a, b) {
        return a + b;
    }
    /**
     * Get the time since the navigation was started.
     *
     * Note: this does not use `performance.timeOrigin` because it doesn't seem to reflect the actual
     * time on which the navigation has started: it may be much farther in the past, at least in Firefox 71.
     * Related issue in Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=1429926
     */
    function getRelativeTime(timestamp) {
        return (timestamp - getNavigationStart());
    }
    function getTimeStamp(relativeTime) {
        return Math.round(addDuration(getNavigationStart(), relativeTime));
    }
    function looksLikeRelativeTime(time) {
        return time < ONE_YEAR;
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

    var simulation;
    function initSimulation(simulationStart, simulationEnd, simulationLabel) {
        if (simulationStart && simulationEnd && simulationLabel) {
            simulation = {
                start: new Date(simulationStart).getTime(),
                end: new Date(simulationEnd).getTime(),
                label: simulationLabel,
            };
        }
    }
    function isSimulationActive() {
        var now = dateNow();
        return simulation !== undefined && now >= simulation.start && now <= simulation.end;
    }
    function getSimulationLabel() {
        return simulation === null || simulation === void 0 ? void 0 : simulation.label;
    }

    function normalizeUrl(url) {
        return buildUrl(url, getLocationOrigin()).href;
    }
    function isValidUrl(url) {
        try {
            return !!buildUrl(url);
        }
        catch (_a) {
            return false;
        }
    }
    function getOrigin(url) {
        return getLinkElementOrigin(buildUrl(url));
    }
    function getPathName(url) {
        var pathname = buildUrl(url).pathname;
        return pathname[0] === '/' ? pathname : "/".concat(pathname);
    }
    function buildUrl(url, base) {
        if (checkURLSupported()) {
            return base !== undefined ? new URL(url, base) : new URL(url);
        }
        if (base === undefined && !/:/.test(url)) {
            throw new Error("Invalid URL: '".concat(url, "'"));
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
        }
        catch (_a) {
            isURLSupported = false;
        }
        return isURLSupported;
    }

    var INTAKE_SITE_STAGING = 'datad0g.com';
    var INTAKE_SITE_US1 = 'datadoghq.com';
    var INTAKE_SITE_US1_FED = 'ddog-gov.com';

    var ENDPOINTS = {
        logs: 'logs',
        rum: 'rum',
        sessionReplay: 'session-replay',
    };
    var INTAKE_TRACKS = {
        logs: 'logs',
        rum: 'rum',
        sessionReplay: 'replay',
    };
    function createEndpointBuilder(initConfiguration, endpointType, tags) {
        var _a = initConfiguration.site, site = _a === void 0 ? INTAKE_SITE_US1 : _a, clientToken = initConfiguration.clientToken;
        var domainParts = site.split('.');
        var extension = domainParts.pop();
        var host = "".concat(ENDPOINTS[endpointType], ".browser-intake-").concat(domainParts.join('-'), ".").concat(extension);
        var baseUrl = "https://".concat(host, "/api/v2/").concat(INTAKE_TRACKS[endpointType]);
        var proxyUrl = initConfiguration.proxyUrl && normalizeUrl(initConfiguration.proxyUrl);
        return {
            build: function () {
                var parameters = 'ddsource=browser' +
                    "&ddtags=".concat(encodeURIComponent(["sdk_version:".concat("4.21.2")].concat(tags).join(','))) +
                    "&dd-api-key=".concat(clientToken) +
                    "&dd-evp-origin-version=".concat(encodeURIComponent("4.21.2")) +
                    '&dd-evp-origin=browser' +
                    "&dd-request-id=".concat(generateUUID());
                if (endpointType === 'rum') {
                    parameters += "&batch_time=".concat(timeStampNow());
                }
                var endpointUrl = "".concat(baseUrl, "?").concat(parameters);
                return proxyUrl ? "".concat(proxyUrl, "?ddforward=").concat(encodeURIComponent(endpointUrl)) : endpointUrl;
            },
            buildIntakeUrl: function () {
                return proxyUrl ? "".concat(proxyUrl, "?ddforward") : baseUrl;
            },
            endpointType: endpointType,
        };
    }

    var TAG_SIZE_LIMIT = 200;
    function buildTags(configuration) {
        var env = configuration.env, service = configuration.service, version = configuration.version, datacenter = configuration.datacenter;
        var tags = [];
        if (env) {
            tags.push(buildTag('env', env));
        }
        if (service) {
            tags.push(buildTag('service', service));
        }
        if (version) {
            tags.push(buildTag('version', version));
        }
        if (datacenter) {
            tags.push(buildTag('datacenter', datacenter));
        }
        return tags;
    }
    var FORBIDDEN_CHARACTERS = /[^a-z0-9_:./-]/;
    function buildTag(key, rawValue) {
        // See https://docs.datadoghq.com/getting_started/tagging/#defining-tags for tags syntax. Note
        // that the backend may not follow the exact same rules, so we only want to display an informal
        // warning.
        var valueSizeLimit = TAG_SIZE_LIMIT - key.length - 1;
        if (rawValue.length > valueSizeLimit || FORBIDDEN_CHARACTERS.test(rawValue)) {
            display.warn("".concat(key, " value doesn't meet tag requirements and will be sanitized"));
        }
        // Let the backend do most of the sanitization, but still make sure multiple tags can't be crafted
        // by forging a value containing commas.
        var sanitizedValue = rawValue.replace(/,/g, '_');
        return "".concat(key, ":").concat(sanitizedValue);
    }

    function computeTransportConfiguration(initConfiguration) {
        var tags = buildTags(initConfiguration);
        var endpointBuilders = computeEndpointBuilders(initConfiguration, tags);
        var intakeEndpoints = objectValues(endpointBuilders).map(function (builder) { return builder.buildIntakeUrl(); });
        var replicaConfiguration = computeReplicaConfiguration(initConfiguration, intakeEndpoints, tags);
        return assign({
            isIntakeUrl: function (url) { return intakeEndpoints.some(function (intakeEndpoint) { return url.indexOf(intakeEndpoint) === 0; }); },
            replica: replicaConfiguration,
            site: initConfiguration.site || INTAKE_SITE_US1,
        }, endpointBuilders);
    }
    function computeEndpointBuilders(initConfiguration, tags) {
        return {
            logsEndpointBuilder: createEndpointBuilder(initConfiguration, 'logs', tags),
            rumEndpointBuilder: createEndpointBuilder(initConfiguration, 'rum', tags),
            sessionReplayEndpointBuilder: createEndpointBuilder(initConfiguration, 'sessionReplay', tags),
        };
    }
    function computeReplicaConfiguration(initConfiguration, intakeEndpoints, tags) {
        if (!initConfiguration.replica) {
            return;
        }
        var replicaConfiguration = assign({}, initConfiguration, {
            site: INTAKE_SITE_US1,
            clientToken: initConfiguration.replica.clientToken,
        });
        var replicaEndpointBuilders = {
            logsEndpointBuilder: createEndpointBuilder(replicaConfiguration, 'logs', tags),
            rumEndpointBuilder: createEndpointBuilder(replicaConfiguration, 'rum', tags),
        };
        intakeEndpoints.push.apply(intakeEndpoints, objectValues(replicaEndpointBuilders).map(function (builder) { return builder.buildIntakeUrl(); }));
        return assign({ applicationId: initConfiguration.replica.applicationId }, replicaEndpointBuilders);
    }

    var DefaultPrivacyLevel = {
        ALLOW: 'allow',
        MASK: 'mask',
        MASK_USER_INPUT: 'mask-user-input',
    };
    function validateAndBuildConfiguration(initConfiguration) {
        var _a, _b;
        if (!initConfiguration || !initConfiguration.clientToken) {
            display.error('Client Token is not configured, we will not send any data.');
            return;
        }
        if (initConfiguration.sampleRate !== undefined && !isPercentage(initConfiguration.sampleRate)) {
            display.error('Sample Rate should be a number between 0 and 100');
            return;
        }
        if (initConfiguration.telemetrySampleRate !== undefined && !isPercentage(initConfiguration.telemetrySampleRate)) {
            display.error('Telemetry Sample Rate should be a number between 0 and 100');
            return;
        }
        // Set the experimental feature flags as early as possible, so we can use them in most places
        updateExperimentalFeatures(initConfiguration.enableExperimentalFeatures);
        initSimulation(initConfiguration.simulationStart, initConfiguration.simulationEnd, initConfiguration.simulationLabel);
        return assign({
            beforeSend: initConfiguration.beforeSend && catchUserErrors(initConfiguration.beforeSend, 'beforeSend threw an error:'),
            cookieOptions: buildCookieOptions(initConfiguration),
            sampleRate: (_a = initConfiguration.sampleRate) !== null && _a !== void 0 ? _a : 100,
            telemetrySampleRate: (_b = initConfiguration.telemetrySampleRate) !== null && _b !== void 0 ? _b : 20,
            service: initConfiguration.service,
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

    var UNKNOWN_FUNCTION = '?';
    /**
     * Computes a stack trace for an exception.
     */
    function computeStackTrace(ex) {
        var stack = [];
        var stackProperty = tryToGetString(ex, 'stack');
        var exString = String(ex);
        if (stackProperty && startsWith(stackProperty, exString)) {
            stackProperty = stackProperty.slice(exString.length);
        }
        if (stackProperty) {
            stackProperty.split('\n').forEach(function (line) {
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
            stack: stack,
        };
    }
    var fileUrl = '((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\\w+\\.|\\/).*?)';
    var filePosition = '(?::(\\d+))';
    var CHROME_LINE_RE = new RegExp("^\\s*at (.*?) ?\\(".concat(fileUrl).concat(filePosition, "?").concat(filePosition, "?\\)?\\s*$"), 'i');
    var CHROME_EVAL_RE = new RegExp("\\((\\S*)".concat(filePosition).concat(filePosition, "\\)"));
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
            url: !isNative ? parts[2] : undefined,
        };
    }
    var CHROME_ANONYMOUS_FUNCTION_RE = new RegExp("^\\s*at ?".concat(fileUrl).concat(filePosition, "?").concat(filePosition, "??\\s*$"), 'i');
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
            url: parts[1],
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
            url: parts[2],
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
            url: parts[3],
        };
    }
    function tryToGetString(candidate, property) {
        if (typeof candidate !== 'object' || !candidate || !(property in candidate)) {
            return undefined;
        }
        var value = candidate[property];
        return typeof value === 'string' ? value : undefined;
    }

    function instrumentMethod(object, method, instrumentationFactory) {
        var original = object[method];
        var instrumentation = instrumentationFactory(original);
        var instrumentationWrapper = function () {
            if (typeof instrumentation !== 'function') {
                return undefined;
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return instrumentation.apply(this, arguments);
        };
        object[method] = instrumentationWrapper;
        return {
            stop: function () {
                if (object[method] === instrumentationWrapper) {
                    object[method] = original;
                }
                else {
                    instrumentation = original;
                }
            },
        };
    }
    function instrumentMethodAndCallOriginal(object, method, _a) {
        var before = _a.before, after = _a.after;
        return instrumentMethod(object, method, function (original) {
            return function () {
                var args = arguments;
                var result;
                if (before) {
                    callMonitored(before, this, args);
                }
                if (typeof original === 'function') {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    result = original.apply(this, args);
                }
                if (after) {
                    callMonitored(after, this, args);
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return result;
            };
        });
    }
    function instrumentSetter(object, property, after) {
        var originalDescriptor = Object.getOwnPropertyDescriptor(object, property);
        if (!originalDescriptor || !originalDescriptor.set || !originalDescriptor.configurable) {
            return { stop: noop };
        }
        var instrumentation = function (thisObject, value) {
            // put hooked setter into event loop to avoid of set latency
            setTimeout(monitor(function () {
                after(thisObject, value);
            }), 0);
        };
        var instrumentationWrapper = function (value) {
            originalDescriptor.set.call(this, value);
            instrumentation(this, value);
        };
        Object.defineProperty(object, property, {
            set: instrumentationWrapper,
        });
        return {
            stop: function () {
                var _a;
                if (((_a = Object.getOwnPropertyDescriptor(object, property)) === null || _a === void 0 ? void 0 : _a.set) === instrumentationWrapper) {
                    Object.defineProperty(object, property, originalDescriptor);
                }
                else {
                    instrumentation = noop;
                }
            },
        };
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types
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
        var stopInstrumentingOnError = instrumentOnError(callback).stop;
        var stopInstrumentingOnUnhandledRejection = instrumentUnhandledRejection(callback).stop;
        return {
            stop: function () {
                stopInstrumentingOnError();
                stopInstrumentingOnUnhandledRejection();
            },
        };
    }
    /**
     * Install a global onerror handler
     */
    function instrumentOnError(callback) {
        return instrumentMethodAndCallOriginal(window, 'onerror', {
            before: function (message, url, lineNo, columnNo, errorObj) {
                var stack;
                if (errorObj) {
                    stack = computeStackTrace(errorObj);
                    callback(stack, errorObj);
                }
                else {
                    var location_1 = {
                        url: url,
                        column: columnNo,
                        line: lineNo,
                    };
                    var name_1;
                    var msg = message;
                    if ({}.toString.call(message) === '[object String]') {
                        var groups = ERROR_TYPES_RE.exec(msg);
                        if (groups) {
                            name_1 = groups[1];
                            msg = groups[2];
                        }
                    }
                    stack = {
                        name: name_1,
                        message: typeof msg === 'string' ? msg : undefined,
                        stack: [location_1],
                    };
                    callback(stack, message);
                }
            },
        });
    }
    /**
     * Install a global onunhandledrejection handler
     */
    function instrumentUnhandledRejection(callback) {
        return instrumentMethodAndCallOriginal(window, 'onunhandledrejection', {
            before: function (e) {
                var reason = e.reason || 'Empty reason';
                var stack = computeStackTrace(reason);
                callback(stack, reason);
            },
        });
    }

    var ErrorSource = {
        AGENT: 'agent',
        CONSOLE: 'console',
        CUSTOM: 'custom',
        LOGGER: 'logger',
        NETWORK: 'network',
        SOURCE: 'source',
        REPORT: 'report',
    };
    function computeRawError(_a) {
        var stackTrace = _a.stackTrace, originalError = _a.originalError, handlingStack = _a.handlingStack, startClocks = _a.startClocks, nonErrorPrefix = _a.nonErrorPrefix, source = _a.source, handling = _a.handling;
        if (!stackTrace || (stackTrace.message === undefined && !(originalError instanceof Error))) {
            return {
                startClocks: startClocks,
                source: source,
                handling: handling,
                originalError: originalError,
                message: "".concat(nonErrorPrefix, " ").concat(jsonStringify(originalError)),
                stack: 'No stack, consider using an instance of Error',
                handlingStack: handlingStack,
                type: stackTrace && stackTrace.name,
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
            causes: flattenErrorCauses(originalError, source),
        };
    }
    function toStackTraceString(stack) {
        var result = formatErrorMessage(stack);
        stack.stack.forEach(function (frame) {
            var func = frame.func === '?' ? '<anonymous>' : frame.func;
            var args = frame.args && frame.args.length > 0 ? "(".concat(frame.args.join(', '), ")") : '';
            var line = frame.line ? ":".concat(frame.line) : '';
            var column = frame.line && frame.column ? ":".concat(frame.column) : '';
            result += "\n  at ".concat(func).concat(args, " @ ").concat(frame.url).concat(line).concat(column);
        });
        return result;
    }
    function formatErrorMessage(stack) {
        return "".concat(stack.name || 'Error', ": ").concat(stack.message);
    }
    /**
     Creates a stacktrace without SDK internal frames.
     
     Constraints:
     - Has to be called at the utmost position of the call stack.
     - No monitored function should encapsulate it, that is why we need to use callMonitored inside it.
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
            }
            catch (e) {
            }
        }
        callMonitored(function () {
            var stackTrace = computeStackTrace(error);
            stackTrace.stack = stackTrace.stack.slice(internalFramesToSkip);
            formattedStack = toStackTraceString(stackTrace);
        });
        return formattedStack;
    }
    function flattenErrorCauses(error, parentSource) {
        var currentError = error;
        var causes = [];
        while ((currentError === null || currentError === void 0 ? void 0 : currentError.cause) instanceof Error && causes.length < 10) {
            var stackTrace = computeStackTrace(currentError.cause);
            causes.push({
                message: currentError.cause.message,
                source: parentSource,
                type: stackTrace === null || stackTrace === void 0 ? void 0 : stackTrace.name,
                stack: stackTrace && toStackTraceString(stackTrace),
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
                handling: "unhandled" /* UNHANDLED */,
            }));
        });
    }

    function makePublicApi(stub) {
        var publicApi = assign({
            version: "4.21.2",
            // This API method is intentionally not monitored, since the only thing executed is the
            // user-provided 'callback'.  All SDK usages executed in the callback should be monitored, and
            // we don't want to interfere with the user uncaught exceptions.
            onReady: function (callback) {
                callback();
            },
        }, stub);
        // Add a "hidden" property to set debug mode. We define it that way to hide it
        // as much as possible but of course it's not a real protection.
        Object.defineProperty(publicApi, '_setDebug', {
            get: function () {
                return setDebugMode;
            },
            enumerable: false,
        });
        return publicApi;
    }
    function defineGlobal(global, name, api) {
        var existingGlobalVariable = global[name];
        global[name] = api;
        if (existingGlobalVariable && existingGlobalVariable.q) {
            existingGlobalVariable.q.forEach(function (fn) { return catchUserErrors(fn, 'onReady callback threw an error:')(); });
        }
    }

    var Observable = /** @class */ (function () {
        function Observable(onFirstSubscribe) {
            this.onFirstSubscribe = onFirstSubscribe;
            this.observers = [];
        }
        Observable.prototype.subscribe = function (f) {
            var _this = this;
            if (!this.observers.length && this.onFirstSubscribe) {
                this.onLastUnsubscribe = this.onFirstSubscribe() || undefined;
            }
            this.observers.push(f);
            return {
                unsubscribe: function () {
                    _this.observers = _this.observers.filter(function (other) { return f !== other; });
                    if (!_this.observers.length && _this.onLastUnsubscribe) {
                        _this.onLastUnsubscribe();
                    }
                },
            };
        };
        Observable.prototype.notify = function (data) {
            this.observers.forEach(function (observer) { return observer(data); });
        };
        return Observable;
    }());
    function mergeObservables() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i] = arguments[_i];
        }
        var globalObservable = new Observable(function () {
            var subscriptions = observables.map(function (observable) {
                return observable.subscribe(function (data) { return globalObservable.notify(data); });
            });
            return function () { return subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); }); };
        });
        return globalObservable;
    }

    var RawReportType = {
        intervention: 'intervention',
        deprecation: 'deprecation',
        cspViolation: 'csp_violation',
    };
    function initReportObservable(apis) {
        var observables = [];
        if (includes(apis, RawReportType.cspViolation)) {
            observables.push(createCspViolationReportObservable());
        }
        var reportTypes = apis.filter(function (api) { return api !== RawReportType.cspViolation; });
        if (reportTypes.length) {
            observables.push(createReportObservable(reportTypes));
        }
        return mergeObservables.apply(void 0, observables);
    }
    function createReportObservable(reportTypes) {
        var observable = new Observable(function () {
            if (!window.ReportingObserver) {
                return;
            }
            var handleReports = monitor(function (reports) {
                return reports.forEach(function (report) {
                    observable.notify(buildRawReportFromReport(report));
                });
            });
            var observer = new window.ReportingObserver(handleReports, {
                types: reportTypes,
                buffered: true,
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
            var handleCspViolation = monitor(function (event) {
                observable.notify(buildRawReportFromCspViolation(event));
            });
            var stop = addEventListener(document, "securitypolicyviolation" /* SECURITY_POLICY_VIOLATION */, handleCspViolation).stop;
            return stop;
        });
        return observable;
    }
    function buildRawReportFromReport(_a) {
        var type = _a.type, body = _a.body;
        return {
            type: type,
            subtype: body.id,
            message: "".concat(type, ": ").concat(body.message),
            stack: buildStack(body.id, body.message, body.sourceFile, body.lineNumber, body.columnNumber),
        };
    }
    function buildRawReportFromCspViolation(event) {
        var type = RawReportType.cspViolation;
        var message = "'".concat(event.blockedURI, "' blocked by '").concat(event.effectiveDirective, "' directive");
        return {
            type: RawReportType.cspViolation,
            subtype: event.effectiveDirective,
            message: "".concat(type, ": ").concat(message),
            stack: buildStack(event.effectiveDirective, event.originalPolicy
                ? "".concat(message, " of the policy \"").concat(safeTruncate(event.originalPolicy, 100, '...'), "\"")
                : 'no policy', event.sourceFile, event.lineNumber, event.columnNumber),
        };
    }
    function buildStack(name, message, sourceFile, lineNumber, columnNumber) {
        return (sourceFile &&
            toStackTraceString({
                name: name,
                message: message,
                stack: [
                    {
                        func: '?',
                        url: sourceFile,
                        line: lineNumber,
                        column: columnNumber,
                    },
                ],
            }));
    }

    var ALLOWED_FRAME_URLS = [
        'https://www.datadoghq-browser-agent.com',
        'https://www.datad0g-browser-agent.com',
        'http://localhost',
        '<anonymous>',
    ];
    var TELEMETRY_EXCLUDED_SITES = [INTAKE_SITE_US1_FED];
    var telemetryConfiguration = { maxEventsPerPage: 0, sentEventCount: 0, telemetryEnabled: false };
    var onRawTelemetryEventCollected;
    function startTelemetry(configuration) {
        var contextProvider;
        var observable = new Observable();
        telemetryConfiguration.telemetryEnabled = performDraw(configuration.telemetrySampleRate);
        onRawTelemetryEventCollected = function (event) {
            if (!includes(TELEMETRY_EXCLUDED_SITES, configuration.site) && telemetryConfiguration.telemetryEnabled) {
                observable.notify(toTelemetryEvent(event));
            }
        };
        startMonitorErrorCollection(addTelemetryError);
        assign(telemetryConfiguration, {
            maxEventsPerPage: configuration.maxTelemetryEventsPerPage,
            sentEventCount: 0,
        });
        function toTelemetryEvent(event) {
            return combine({
                type: 'telemetry',
                date: timeStampNow(),
                service: 'browser-sdk',
                version: "4.21.2",
                source: 'browser',
                _dd: {
                    format_version: 2,
                },
                telemetry: event,
                experimental_features: arrayFrom(getExperimentalFeatures()),
            }, contextProvider !== undefined ? contextProvider() : {}, isSimulationActive() ? { telemetry: { simulation_label: getSimulationLabel() } } : {});
        }
        return {
            setContextProvider: function (provider) {
                contextProvider = provider;
            },
            observable: observable,
        };
    }
    /**
     * Avoid mixing telemetry events from different data centers
     * but keep replicating staging events for reliability
     */
    function isTelemetryReplicationAllowed(configuration) {
        return configuration.site === INTAKE_SITE_STAGING;
    }
    function addTelemetryDebug(message, context) {
        displayIfDebugEnabled(ConsoleApiName.debug, message, context);
        addTelemetry(assign({
            message: message,
            status: "debug" /* debug */,
        }, context));
    }
    function addTelemetryError(e) {
        addTelemetry(assign({
            status: "error" /* error */,
        }, formatError(e)));
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
                    stack: toStackTraceString(scrubCustomerFrames(stackTrace)),
                },
                message: stackTrace.message,
            };
        }
        return {
            error: {
                stack: 'Not an instance of error',
            },
            message: "Uncaught ".concat(jsonStringify(e)),
        };
    }
    function scrubCustomerFrames(stackTrace) {
        stackTrace.stack = stackTrace.stack.filter(function (frame) { return !frame.url || ALLOWED_FRAME_URLS.some(function (allowedFrameUrl) { return startsWith(frame.url, allowedFrameUrl); }); });
        return stackTrace;
    }

    var END_OF_TIMES = Infinity;
    var CLEAR_OLD_CONTEXTS_INTERVAL = ONE_MINUTE;
    /**
     * Store and keep track of contexts spans. This whole class assumes that contexts are added in
     * chronological order (i.e. all entries have an increasing start time).
     */
    var ContextHistory = /** @class */ (function () {
        function ContextHistory(expireDelay) {
            var _this = this;
            this.expireDelay = expireDelay;
            this.entries = [];
            this.clearOldContextsInterval = setInterval(function () { return _this.clearOldContexts(); }, CLEAR_OLD_CONTEXTS_INTERVAL);
        }
        /**
         * Add a context to the history associated with a start time. Returns a reference to this newly
         * added entry that can be removed or closed.
         */
        ContextHistory.prototype.add = function (context, startTime) {
            var _this = this;
            var entry = {
                context: context,
                startTime: startTime,
                endTime: END_OF_TIMES,
                remove: function () {
                    var index = _this.entries.indexOf(entry);
                    if (index >= 0) {
                        _this.entries.splice(index, 1);
                    }
                },
                close: function (endTime) {
                    entry.endTime = endTime;
                },
            };
            this.entries.unshift(entry);
            return entry;
        };
        /**
         * Return the latest context that was active during `startTime`, or the currently active context
         * if no `startTime` is provided. This method assumes that entries are not overlapping.
         */
        ContextHistory.prototype.find = function (startTime) {
            if (startTime === void 0) { startTime = END_OF_TIMES; }
            for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
                var entry = _a[_i];
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
            if (startTime === void 0) { startTime = END_OF_TIMES; }
            return this.entries
                .filter(function (entry) { return entry.startTime <= startTime && startTime <= entry.endTime; })
                .map(function (entry) { return entry.context; });
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
        return ContextHistory;
    }());

    function isIE() {
        return Boolean(document.documentMode);
    }
    function isChromium() {
        return !!window.chrome || /HeadlessChrome/.test(window.navigator.userAgent);
    }

    var SESSION_TIME_OUT_DELAY = 4 * ONE_HOUR;
    var SESSION_EXPIRATION_DELAY = 15 * ONE_MINUTE;

    var SESSION_ENTRY_REGEXP = /^([a-z]+)=([a-z0-9-]+)$/;
    var SESSION_ENTRY_SEPARATOR = '&';
    var SESSION_COOKIE_NAME = '_dd_s';
    // arbitrary values
    var LOCK_RETRY_DELAY = 10;
    var MAX_NUMBER_OF_LOCK_RETRIES = 100;
    var bufferedOperations = [];
    var ongoingOperations;
    function withCookieLockAccess(operations, numberOfRetries) {
        var _a;
        if (numberOfRetries === void 0) { numberOfRetries = 0; }
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
            currentLock = generateUUID();
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
        (_a = operations.after) === null || _a === void 0 ? void 0 : _a.call(operations, processedSession || currentSession);
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
        setTimeout(monitor(function () {
            withCookieLockAccess(operations, currentNumberOfRetries + 1);
        }), LOCK_RETRY_DELAY);
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
        return objectEntries(session)
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return "".concat(key, "=").concat(value);
        })
            .join(SESSION_ENTRY_SEPARATOR);
    }
    function retrieveSession() {
        var sessionString = getCookie(SESSION_COOKIE_NAME);
        var session = {};
        if (isValidSessionString(sessionString)) {
            sessionString.split(SESSION_ENTRY_SEPARATOR).forEach(function (entry) {
                var matches = SESSION_ENTRY_REGEXP.exec(entry);
                if (matches !== null) {
                    var key = matches[1], value = matches[2];
                    session[key] = value;
                }
            });
        }
        return session;
    }
    function isValidSessionString(sessionString) {
        return (sessionString !== undefined &&
            (sessionString.indexOf(SESSION_ENTRY_SEPARATOR) !== -1 || SESSION_ENTRY_REGEXP.test(sessionString)));
    }
    function isExpiredState(session) {
        return isEmptyObject(session);
    }
    function clearSession(options) {
        setCookie(SESSION_COOKIE_NAME, '', 0, options);
    }

    var OLD_SESSION_COOKIE_NAME = '_dd';
    var OLD_RUM_COOKIE_NAME = '_dd_r';
    var OLD_LOGS_COOKIE_NAME = '_dd_l';
    // duplicate values to avoid dependency issues
    var RUM_SESSION_KEY$1 = 'rum';
    var LOGS_SESSION_KEY = 'logs';
    /**
     * This migration should remain in the codebase as long as older versions are available/live
     * to allow older sdk versions to be upgraded to newer versions without compatibility issues.
     */
    function tryOldCookiesMigration(options) {
        var sessionString = getCookie(SESSION_COOKIE_NAME);
        var oldSessionId = getCookie(OLD_SESSION_COOKIE_NAME);
        var oldRumType = getCookie(OLD_RUM_COOKIE_NAME);
        var oldLogsType = getCookie(OLD_LOGS_COOKIE_NAME);
        if (!sessionString) {
            var session = {};
            if (oldSessionId) {
                session.id = oldSessionId;
            }
            if (oldLogsType && /^[01]$/.test(oldLogsType)) {
                session[LOGS_SESSION_KEY] = oldLogsType;
            }
            if (oldRumType && /^[012]$/.test(oldRumType)) {
                session[RUM_SESSION_KEY$1] = oldRumType;
            }
            persistSession(session, options);
        }
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
        var watchSessionTimeoutId = setInterval(monitor(watchSession), COOKIE_ACCESS_DELAY);
        var sessionCache = retrieveActiveSession();
        function expandOrRenewSession() {
            var isTracked;
            withCookieLockAccess({
                options: options,
                process: function (cookieSession) {
                    var synchronizedSession = synchronizeSession(cookieSession);
                    isTracked = expandOrRenewCookie(synchronizedSession);
                    return synchronizedSession;
                },
                after: function (cookieSession) {
                    if (isTracked && !hasSessionInCache()) {
                        renewSession(cookieSession);
                    }
                    sessionCache = cookieSession;
                },
            });
        }
        function expandSession() {
            withCookieLockAccess({
                options: options,
                process: function (cookieSession) { return (hasSessionInCache() ? synchronizeSession(cookieSession) : undefined); },
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
                process: function (cookieSession) { return (!isActiveSession(cookieSession) ? {} : undefined); },
                after: synchronizeSession,
            });
        }
        function synchronizeSession(cookieSession) {
            if (!isActiveSession(cookieSession)) {
                cookieSession = {};
            }
            if (hasSessionInCache()) {
                if (isSessionInCacheOutdated(cookieSession)) {
                    expireSession();
                }
                else {
                    sessionCache = cookieSession;
                }
            }
            return cookieSession;
        }
        function expandOrRenewCookie(cookieSession) {
            var _a = computeSessionState(cookieSession[productKey]), trackingType = _a.trackingType, isTracked = _a.isTracked;
            cookieSession[productKey] = trackingType;
            if (isTracked && !cookieSession.id) {
                cookieSession.id = generateUUID();
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
            return ((session.created === undefined || dateNow() - Number(session.created) < SESSION_TIME_OUT_DELAY) &&
                (session.expire === undefined || dateNow() < Number(session.expire)));
        }
        return {
            expandOrRenewSession: throttle(monitor(expandOrRenewSession), COOKIE_ACCESS_DELAY).throttled,
            expandSession: expandSession,
            getSession: function () { return sessionCache; },
            renewObservable: renewObservable,
            expireObservable: expireObservable,
            stop: function () {
                clearInterval(watchSessionTimeoutId);
            },
        };
    }

    var VISIBILITY_CHECK_DELAY = ONE_MINUTE;
    var SESSION_CONTEXT_TIMEOUT_DELAY = SESSION_TIME_OUT_DELAY;
    function startSessionManager(options, productKey, computeSessionState) {
        tryOldCookiesMigration(options);
        var sessionStore = startSessionStore(options, productKey, computeSessionState);
        var sessionContextHistory = new ContextHistory(SESSION_CONTEXT_TIMEOUT_DELAY);
        sessionStore.renewObservable.subscribe(function () {
            sessionContextHistory.add(buildSessionContext(), relativeNow());
        });
        sessionStore.expireObservable.subscribe(function () {
            sessionContextHistory.closeActive(relativeNow());
        });
        sessionStore.expandOrRenewSession();
        sessionContextHistory.add(buildSessionContext(), clocksOrigin().relative);
        trackActivity(function () { return sessionStore.expandOrRenewSession(); });
        trackVisibility(function () { return sessionStore.expandSession(); });
        function buildSessionContext() {
            return {
                id: sessionStore.getSession().id,
                trackingType: sessionStore.getSession()[productKey],
            };
        }
        return {
            findActiveSession: function (startTime) { return sessionContextHistory.find(startTime); },
            renewObservable: sessionStore.renewObservable,
            expireObservable: sessionStore.expireObservable,
        };
    }
    function trackActivity(expandOrRenewSession) {
        addEventListeners(window, ["click" /* CLICK */, "touchstart" /* TOUCH_START */, "keydown" /* KEY_DOWN */, "scroll" /* SCROLL */], expandOrRenewSession, { capture: true, passive: true }).stop;
    }
    function trackVisibility(expandSession) {
        var expandSessionWhenVisible = monitor(function () {
            if (document.visibilityState === 'visible') {
                expandSession();
            }
        });
        addEventListener(document, "visibilitychange" /* VISIBILITY_CHANGE */, expandSessionWhenVisible).stop;
        setInterval(expandSessionWhenVisible, VISIBILITY_CHECK_DELAY);
    }

    var MAX_ONGOING_BYTES_COUNT = 80 * ONE_KIBI_BYTE;
    var MAX_ONGOING_REQUESTS = 32;
    var MAX_QUEUE_BYTES_COUNT = 3 * ONE_MEBI_BYTE;
    var MAX_BACKOFF_TIME = ONE_MINUTE;
    var INITIAL_BACKOFF_TIME = ONE_SECOND;
    function sendWithRetryStrategy(payload, state, sendStrategy, endpointType, toPrimaryEndpoint, reportError) {
        if (state.transportStatus === 0 /* UP */ &&
            state.queuedPayloads.size() === 0 &&
            state.bandwidthMonitor.canHandle(payload)) {
            send$1(payload, state, sendStrategy, toPrimaryEndpoint, {
                onSuccess: function () {
                    return retryQueuedPayloads(0 /* AFTER_SUCCESS */, state, sendStrategy, endpointType, toPrimaryEndpoint, reportError);
                },
                onFailure: function () {
                    state.queuedPayloads.enqueue(payload);
                    scheduleRetry(state, sendStrategy, endpointType, toPrimaryEndpoint, reportError);
                },
            });
        }
        else {
            state.queuedPayloads.enqueue(payload);
        }
    }
    function scheduleRetry(state, sendStrategy, endpointType, toPrimaryEndpoint, reportError) {
        if (state.transportStatus !== 2 /* DOWN */) {
            return;
        }
        setTimeout(monitor(function () {
            var payload = state.queuedPayloads.first();
            send$1(payload, state, sendStrategy, toPrimaryEndpoint, {
                onSuccess: function () {
                    state.queuedPayloads.dequeue();
                    if (state.lastFailureStatus !== 0) {
                        addTelemetryDebug('resuming after transport down', {
                            failureStatus: state.lastFailureStatus,
                        });
                    }
                    state.currentBackoffTime = INITIAL_BACKOFF_TIME;
                    retryQueuedPayloads(1 /* AFTER_RESUME */, state, sendStrategy, endpointType, toPrimaryEndpoint, reportError);
                },
                onFailure: function () {
                    state.currentBackoffTime = Math.min(MAX_BACKOFF_TIME, state.currentBackoffTime * 2);
                    scheduleRetry(state, sendStrategy, endpointType, toPrimaryEndpoint, reportError);
                },
            });
        }), state.currentBackoffTime);
    }
    function send$1(payload, state, sendStrategy, toPrimaryEndpoint, _a) {
        var onSuccess = _a.onSuccess, onFailure = _a.onFailure;
        if (isSimulationActive() && toPrimaryEndpoint) {
            state.transportStatus =
                state.bandwidthMonitor.ongoingRequestCount > 0 ? 1 /* FAILURE_DETECTED */ : 2 /* DOWN */;
            state.lastFailureStatus = 555;
            onFailure();
            return;
        }
        state.bandwidthMonitor.add(payload);
        sendStrategy(payload, function (response) {
            state.bandwidthMonitor.remove(payload);
            if (!shouldRetryRequest(response)) {
                state.transportStatus = 0 /* UP */;
                onSuccess();
            }
            else {
                // do not consider transport down if another ongoing request could succeed
                state.transportStatus =
                    state.bandwidthMonitor.ongoingRequestCount > 0 ? 1 /* FAILURE_DETECTED */ : 2 /* DOWN */;
                state.lastFailureStatus = response.status;
                onFailure();
            }
        });
    }
    function retryQueuedPayloads(reason, state, sendStrategy, endpointType, toPrimaryEndpoint, reportError) {
        if (reason === 0 /* AFTER_SUCCESS */ && state.queuedPayloads.isFull() && !state.queueFullReported) {
            reportError({
                message: "Reached max ".concat(endpointType, " events size queued for upload: ").concat(MAX_QUEUE_BYTES_COUNT / ONE_MEBI_BYTE, "MiB"),
                source: ErrorSource.AGENT,
                startClocks: clocksNow(),
            });
            state.queueFullReported = true;
        }
        var previousQueue = state.queuedPayloads;
        state.queuedPayloads = newPayloadQueue();
        while (previousQueue.size() > 0) {
            sendWithRetryStrategy(previousQueue.dequeue(), state, sendStrategy, endpointType, toPrimaryEndpoint, reportError);
        }
    }
    function shouldRetryRequest(response) {
        return response.status === 0 || response.status === 408 || response.status === 429 || response.status >= 500;
    }
    function newRetryState() {
        return {
            transportStatus: 0 /* UP */,
            lastFailureStatus: 0,
            currentBackoffTime: INITIAL_BACKOFF_TIME,
            bandwidthMonitor: newBandwidthMonitor(),
            queuedPayloads: newPayloadQueue(),
            queueFullReported: false,
        };
    }
    function newPayloadQueue() {
        var queue = [];
        return {
            bytesCount: 0,
            enqueue: function (payload) {
                if (this.isFull()) {
                    return;
                }
                queue.push(payload);
                this.bytesCount += payload.bytesCount;
            },
            first: function () {
                return queue[0];
            },
            dequeue: function () {
                var payload = queue.shift();
                if (payload) {
                    this.bytesCount -= payload.bytesCount;
                }
                return payload;
            },
            size: function () {
                return queue.length;
            },
            isFull: function () {
                return this.bytesCount >= MAX_QUEUE_BYTES_COUNT;
            },
        };
    }
    function newBandwidthMonitor() {
        return {
            ongoingRequestCount: 0,
            ongoingByteCount: 0,
            canHandle: function (payload) {
                return (this.ongoingRequestCount === 0 ||
                    (this.ongoingByteCount + payload.bytesCount <= MAX_ONGOING_BYTES_COUNT &&
                        this.ongoingRequestCount < MAX_ONGOING_REQUESTS));
            },
            add: function (payload) {
                this.ongoingRequestCount += 1;
                this.ongoingByteCount += payload.bytesCount;
            },
            remove: function (payload) {
                this.ongoingRequestCount -= 1;
                this.ongoingByteCount -= payload.bytesCount;
            },
        };
    }

    function createHttpRequest(endpointBuilder, bytesLimit, reportError, toPrimaryEndpoint) {
        var retryState = newRetryState();
        var sendStrategyForRetry = function (payload, onResponse) {
            return fetchKeepAliveStrategy(endpointBuilder, bytesLimit, payload, onResponse);
        };
        return {
            send: function (payload) {
                if (!isExperimentalFeatureEnabled('retry')) {
                    fetchKeepAliveStrategy(endpointBuilder, bytesLimit, payload);
                }
                else {
                    sendWithRetryStrategy(payload, retryState, sendStrategyForRetry, endpointBuilder.endpointType, toPrimaryEndpoint, reportError);
                }
            },
            /**
             * Since fetch keepalive behaves like regular fetch on Firefox,
             * keep using sendBeaconStrategy on exit
             */
            sendOnExit: function (payload) {
                if (isExperimentalFeatureEnabled('retry') &&
                    endpointBuilder.endpointType !== 'sessionReplay' &&
                    toPrimaryEndpoint &&
                    isSimulationActive()) {
                    return;
                }
                sendBeaconStrategy(endpointBuilder, bytesLimit, payload);
            },
        };
    }
    function sendBeaconStrategy(endpointBuilder, bytesLimit, _a) {
        var data = _a.data, bytesCount = _a.bytesCount;
        var url = endpointBuilder.build();
        var canUseBeacon = !!navigator.sendBeacon && bytesCount < bytesLimit;
        if (canUseBeacon) {
            try {
                var isQueued = navigator.sendBeacon(url, data);
                if (isQueued) {
                    return;
                }
            }
            catch (e) {
                reportBeaconError(e);
            }
        }
        sendXHR(url, data);
    }
    var hasReportedBeaconError = false;
    function reportBeaconError(e) {
        if (!hasReportedBeaconError) {
            hasReportedBeaconError = true;
            addTelemetryError(e);
        }
    }
    function fetchKeepAliveStrategy(endpointBuilder, bytesLimit, _a, onResponse) {
        var data = _a.data, bytesCount = _a.bytesCount;
        var url = endpointBuilder.build();
        var canUseKeepAlive = isKeepAliveSupported() && bytesCount < bytesLimit;
        if (canUseKeepAlive) {
            fetch(url, { method: 'POST', body: data, keepalive: true }).then(monitor(function (response) { return onResponse === null || onResponse === void 0 ? void 0 : onResponse({ status: response.status }); }), monitor(function () {
                // failed to queue the request
                sendXHR(url, data, onResponse);
            }));
        }
        else {
            sendXHR(url, data, onResponse);
        }
    }
    function isKeepAliveSupported() {
        // Request can throw, cf https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#errors
        try {
            return window.Request && 'keepalive' in new Request('http://a');
        }
        catch (_a) {
            return false;
        }
    }
    function sendXHR(url, data, onResponse) {
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.send(data);
        request.addEventListener('loadend', monitor(function () {
            onResponse === null || onResponse === void 0 ? void 0 : onResponse({ status: request.status });
        }));
    }

    // https://en.wikipedia.org/wiki/UTF-8
    // eslint-disable-next-line no-control-regex
    var HAS_MULTI_BYTES_CHARACTERS = /[^\u0000-\u007F]/;
    var Batch = /** @class */ (function () {
        function Batch(request, batchMessagesLimit, batchBytesLimit, messageBytesLimit, flushTimeout, beforeUnloadCallback) {
            if (beforeUnloadCallback === void 0) { beforeUnloadCallback = noop; }
            this.request = request;
            this.batchMessagesLimit = batchMessagesLimit;
            this.batchBytesLimit = batchBytesLimit;
            this.messageBytesLimit = messageBytesLimit;
            this.flushTimeout = flushTimeout;
            this.beforeUnloadCallback = beforeUnloadCallback;
            this.pushOnlyBuffer = [];
            this.upsertBuffer = {};
            this.bufferBytesCount = 0;
            this.bufferMessagesCount = 0;
            this.setupFlushOnExit();
            this.flushPeriodically();
        }
        Batch.prototype.add = function (message) {
            this.addOrUpdate(message);
        };
        Batch.prototype.upsert = function (message, key) {
            this.addOrUpdate(message, key);
        };
        Batch.prototype.flush = function (sendFn) {
            if (sendFn === void 0) { sendFn = this.request.send; }
            if (this.bufferMessagesCount !== 0) {
                var messages = this.pushOnlyBuffer.concat(objectValues(this.upsertBuffer));
                var bytesCount = this.bufferBytesCount;
                this.pushOnlyBuffer = [];
                this.upsertBuffer = {};
                this.bufferBytesCount = 0;
                this.bufferMessagesCount = 0;
                sendFn({ data: messages.join('\n'), bytesCount: bytesCount });
            }
        };
        Batch.prototype.flushOnExit = function () {
            this.flush(this.request.sendOnExit);
        };
        Batch.prototype.computeBytesCount = function (candidate) {
            // Accurate bytes count computations can degrade performances when there is a lot of events to process
            if (!HAS_MULTI_BYTES_CHARACTERS.test(candidate)) {
                return candidate.length;
            }
            if (window.TextEncoder !== undefined) {
                return new TextEncoder().encode(candidate).length;
            }
            return new Blob([candidate]).size;
        };
        Batch.prototype.addOrUpdate = function (message, key) {
            var _a = this.process(message), processedMessage = _a.processedMessage, messageBytesCount = _a.messageBytesCount;
            if (messageBytesCount >= this.messageBytesLimit) {
                display.warn("Discarded a message whose size was bigger than the maximum allowed size ".concat(this.messageBytesLimit, "KB."));
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
        Batch.prototype.process = function (message) {
            var processedMessage = jsonStringify(message);
            var messageBytesCount = this.computeBytesCount(processedMessage);
            return { processedMessage: processedMessage, messageBytesCount: messageBytesCount };
        };
        Batch.prototype.push = function (processedMessage, messageBytesCount, key) {
            if (this.bufferMessagesCount > 0) {
                // \n separator at serialization
                this.bufferBytesCount += 1;
            }
            if (key !== undefined) {
                this.upsertBuffer[key] = processedMessage;
            }
            else {
                this.pushOnlyBuffer.push(processedMessage);
            }
            this.bufferBytesCount += messageBytesCount;
            this.bufferMessagesCount += 1;
        };
        Batch.prototype.remove = function (key) {
            var removedMessage = this.upsertBuffer[key];
            delete this.upsertBuffer[key];
            var messageBytesCount = this.computeBytesCount(removedMessage);
            this.bufferBytesCount -= messageBytesCount;
            this.bufferMessagesCount -= 1;
            if (this.bufferMessagesCount > 0) {
                this.bufferBytesCount -= 1;
            }
        };
        Batch.prototype.hasMessageFor = function (key) {
            return key !== undefined && this.upsertBuffer[key] !== undefined;
        };
        Batch.prototype.willReachedBytesLimitWith = function (messageBytesCount) {
            // byte of the separator at the end of the message
            return this.bufferBytesCount + messageBytesCount + 1 >= this.batchBytesLimit;
        };
        Batch.prototype.isFull = function () {
            return this.bufferMessagesCount === this.batchMessagesLimit || this.bufferBytesCount >= this.batchBytesLimit;
        };
        Batch.prototype.flushPeriodically = function () {
            var _this = this;
            setTimeout(monitor(function () {
                _this.flush();
                _this.flushPeriodically();
            }), this.flushTimeout);
        };
        Batch.prototype.setupFlushOnExit = function () {
            var _this = this;
            /**
             * With sendBeacon, requests are guaranteed to be successfully sent during document unload
             */
            // @ts-ignore this function is not always defined
            if (navigator.sendBeacon) {
                /**
                 * beforeunload is called before visibilitychange
                 * register first to be sure to be called before flush on beforeunload
                 * caveat: unload can still be canceled by another listener
                 */
                addEventListener(window, "beforeunload" /* BEFORE_UNLOAD */, this.beforeUnloadCallback);
                /**
                 * Only event that guarantee to fire on mobile devices when the page transitions to background state
                 * (e.g. when user switches to a different application, goes to homescreen, etc), or is being unloaded.
                 */
                addEventListener(document, "visibilitychange" /* VISIBILITY_CHANGE */, function () {
                    if (document.visibilityState === 'hidden') {
                        _this.flushOnExit();
                    }
                });
                /**
                 * Safari does not support yet to send a request during:
                 * - a visibility change during doc unload (cf: https://bugs.webkit.org/show_bug.cgi?id=194897)
                 * - a page hide transition (cf: https://bugs.webkit.org/show_bug.cgi?id=188329)
                 */
                addEventListener(window, "beforeunload" /* BEFORE_UNLOAD */, function () { return _this.flushOnExit(); });
            }
        };
        return Batch;
    }());

    function getEventBridge() {
        var eventBridgeGlobal = getEventBridgeGlobal();
        if (!eventBridgeGlobal) {
            return;
        }
        return {
            getAllowedWebViewHosts: function () {
                return JSON.parse(eventBridgeGlobal.getAllowedWebViewHosts());
            },
            send: function (eventType, event) {
                eventBridgeGlobal.send(JSON.stringify({ eventType: eventType, event: event }));
            },
        };
    }
    function canUseEventBridge(currentHost) {
        var _a;
        if (currentHost === void 0) { currentHost = (_a = getGlobalObject().location) === null || _a === void 0 ? void 0 : _a.hostname; }
        var bridge = getEventBridge();
        return (!!bridge &&
            bridge
                .getAllowedWebViewHosts()
                .some(function (allowedHost) { return currentHost === allowedHost || endsWith(currentHost, ".".concat(allowedHost)); }));
    }
    function getEventBridgeGlobal() {
        return getGlobalObject().DatadogEventBridge;
    }

    function createEventRateLimiter(eventType, limit, onLimitReached) {
        var eventCount = 0;
        var allowNextEvent = false;
        return {
            isLimitReached: function () {
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
                            message: "Reached max number of ".concat(eventType, "s by minute: ").concat(limit),
                            source: ErrorSource.AGENT,
                            startClocks: clocksNow(),
                        });
                    }
                    finally {
                        allowNextEvent = false;
                    }
                }
                return true;
            },
        };
    }

    var xhrObservable;
    var xhrContexts = new WeakMap();
    function initXhrObservable() {
        if (!xhrObservable) {
            xhrObservable = createXhrObservable();
        }
        return xhrObservable;
    }
    function createXhrObservable() {
        var observable = new Observable(function () {
            var stopInstrumentingStart = instrumentMethodAndCallOriginal(XMLHttpRequest.prototype, 'open', {
                before: openXhr,
            }).stop;
            var stopInstrumentingSend = instrumentMethodAndCallOriginal(XMLHttpRequest.prototype, 'send', {
                before: function () {
                    sendXhr.call(this, observable);
                },
            }).stop;
            var stopInstrumentingAbort = instrumentMethodAndCallOriginal(XMLHttpRequest.prototype, 'abort', {
                before: abortXhr,
            }).stop;
            return function () {
                stopInstrumentingStart();
                stopInstrumentingSend();
                stopInstrumentingAbort();
            };
        });
        return observable;
    }
    function openXhr(method, url) {
        xhrContexts.set(this, {
            state: 'open',
            method: method,
            url: normalizeUrl(String(url)),
        });
    }
    function sendXhr(observable) {
        var _this = this;
        var context = xhrContexts.get(this);
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
            before: function () {
                if (this.readyState === XMLHttpRequest.DONE) {
                    // Try to report the XHR as soon as possible, because the XHR may be mutated by the
                    // application during a future event. For example, Angular is calling .abort() on
                    // completed requests during a onreadystatechange event, so the status becomes '0'
                    // before the request is collected.
                    onEnd();
                }
            },
        }).stop;
        var onEnd = monitor(function () {
            _this.removeEventListener('loadend', onEnd);
            stopInstrumentingOnReadyStateChange();
            if (hasBeenReported) {
                return;
            }
            hasBeenReported = true;
            var completeContext = context;
            completeContext.state = 'complete';
            completeContext.duration = elapsed(startContext.startClocks.timeStamp, timeStampNow());
            completeContext.status = _this.status;
            observable.notify(shallowClone(completeContext));
        });
        this.addEventListener('loadend', onEnd);
        observable.notify(startContext);
    }
    function abortXhr() {
        var context = xhrContexts.get(this);
        if (context) {
            context.isAborted = true;
        }
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
            var stop = instrumentMethod(window, 'fetch', function (originalFetch) {
                return function (input, init) {
                    var responsePromise;
                    var context = callMonitored(beforeSend, null, [observable, input, init]);
                    if (context) {
                        responsePromise = originalFetch.call(this, context.input, context.init);
                        callMonitored(afterSend, null, [observable, responsePromise, context]);
                    }
                    else {
                        responsePromise = originalFetch.call(this, input, init);
                    }
                    return responsePromise;
                };
            }).stop;
            return stop;
        });
        return observable;
    }
    function beforeSend(observable, input, init) {
        var method = (init && init.method) || (typeof input === 'object' && input.method) || 'GET';
        var url = normalizeUrl((typeof input === 'object' && input.url) || input);
        var startClocks = clocksNow();
        var context = {
            state: 'start',
            init: init,
            input: input,
            method: method,
            startClocks: startClocks,
            url: url,
        };
        observable.notify(context);
        return context;
    }
    function afterSend(observable, responsePromise, startContext) {
        var reportFetch = function (response) {
            var context = startContext;
            context.state = 'complete';
            context.duration = elapsed(context.startClocks.timeStamp, timeStampNow());
            if ('stack' in response || response instanceof Error) {
                context.status = 0;
                context.isAborted = response instanceof DOMException && response.code === DOMException.ABORT_ERR;
                context.error = response;
                observable.notify(context);
            }
            else if ('status' in response) {
                context.response = response;
                context.responseType = response.type;
                context.status = response.status;
                context.isAborted = false;
                observable.notify(context);
            }
        };
        responsePromise.then(monitor(reportFetch), monitor(reportFetch));
    }

    var consoleObservablesByApi = {};
    function initConsoleObservable(apis) {
        var consoleObservables = apis.map(function (api) {
            if (!consoleObservablesByApi[api]) {
                consoleObservablesByApi[api] = createConsoleObservable(api);
            }
            return consoleObservablesByApi[api];
        });
        return mergeObservables.apply(void 0, consoleObservables);
    }
    /* eslint-disable no-console */
    function createConsoleObservable(api) {
        var observable = new Observable(function () {
            var originalConsoleApi = console[api];
            console[api] = function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i] = arguments[_i];
                }
                originalConsoleApi.apply(console, params);
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
        var message = params.map(function (param) { return formatConsoleParameters(param); }).join(' ');
        var stack;
        if (api === ConsoleApiName.error) {
            var firstErrorParam = find(params, function (param) { return param instanceof Error; });
            stack = firstErrorParam ? toStackTraceString(computeStackTrace(firstErrorParam)) : undefined;
            message = "console error: ".concat(message);
        }
        return {
            api: api,
            message: message,
            stack: stack,
            handlingStack: handlingStack,
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

    var BUFFER_LIMIT = 500;
    var BoundedBuffer = /** @class */ (function () {
        function BoundedBuffer() {
            this.buffer = [];
        }
        BoundedBuffer.prototype.add = function (callback) {
            var length = this.buffer.push(callback);
            if (length > BUFFER_LIMIT) {
                this.buffer.splice(0, 1);
            }
        };
        BoundedBuffer.prototype.drain = function () {
            this.buffer.forEach(function (callback) { return callback(); });
            this.buffer.length = 0;
        };
        return BoundedBuffer;
    }());

    function createContextManager() {
        var context = {};
        return {
            /** @deprecated use getContext instead */
            get: function () { return context; },
            /** @deprecated use setContextProperty instead */
            add: function (key, value) {
                context[key] = value;
            },
            /** @deprecated renamed to removeContextProperty */
            remove: function (key) {
                delete context[key];
            },
            /** @deprecated use setContext instead */
            set: function (newContext) {
                context = newContext;
            },
            getContext: function () { return deepClone(context); },
            setContext: function (newContext) {
                context = deepClone(newContext);
            },
            setContextProperty: function (key, property) {
                context[key] = deepClone(property);
            },
            removeContextProperty: function (key) {
                delete context[key];
            },
            clearContext: function () {
                context = {};
            },
        };
    }

    /**
     * Current limitation:
     * - field path do not support array, 'a.b.c' only
     */
    function limitModification(object, modifiableFieldPaths, modifier) {
        var clone = deepClone(object);
        var result = modifier(clone);
        modifiableFieldPaths.forEach(function (path) {
            var originalValue = get(object, path);
            var newValue = get(clone, path);
            var originalType = getType(originalValue);
            var newType = getType(newValue);
            if (newType === originalType) {
                set(object, path, newValue);
            }
            else if (originalType === 'object' && (newType === 'undefined' || newType === 'null')) {
                set(object, path, {});
            }
        });
        return result;
    }
    function get(object, path) {
        var current = object;
        for (var _i = 0, _a = path.split('.'); _i < _a.length; _i++) {
            var field = _a[_i];
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
            }
            else {
                current[field] = value;
            }
        }
    }
    function isValidObjectContaining(object, field) {
        return typeof object === 'object' && object !== null && Object.prototype.hasOwnProperty.call(object, field);
    }

    var SYNTHETICS_TEST_ID_COOKIE_NAME = 'datadog-synthetics-public-id';
    var SYNTHETICS_RESULT_ID_COOKIE_NAME = 'datadog-synthetics-result-id';
    var SYNTHETICS_INJECTS_RUM_COOKIE_NAME = 'datadog-synthetics-injects-rum';
    function willSyntheticsInjectRum() {
        return Boolean(window._DATADOG_SYNTHETICS_INJECTS_RUM || getCookie(SYNTHETICS_INJECTS_RUM_COOKIE_NAME));
    }
    function getSyntheticsTestId() {
        var value = window._DATADOG_SYNTHETICS_PUBLIC_ID || getCookie(SYNTHETICS_TEST_ID_COOKIE_NAME);
        return typeof value === 'string' ? value : undefined;
    }
    function getSyntheticsResultId() {
        var value = window._DATADOG_SYNTHETICS_RESULT_ID || getCookie(SYNTHETICS_RESULT_ID_COOKIE_NAME);
        return typeof value === 'string' ? value : undefined;
    }

    function validateAndBuildRumConfiguration(initConfiguration) {
        var _a, _b, _c, _d, _e;
        if (!initConfiguration.applicationId) {
            display.error('Application ID is not configured, no RUM data will be collected.');
            return;
        }
        if (initConfiguration.sessionReplaySampleRate !== undefined &&
            !isPercentage(initConfiguration.sessionReplaySampleRate)) {
            display.error('Session Replay Sample Rate should be a number between 0 and 100');
            return;
        }
        // TODO remove fallback in next major
        var premiumSampleRate = (_a = initConfiguration.premiumSampleRate) !== null && _a !== void 0 ? _a : initConfiguration.replaySampleRate;
        if (premiumSampleRate !== undefined && initConfiguration.sessionReplaySampleRate !== undefined) {
            display.warn('Ignoring Premium Sample Rate because Session Replay Sample Rate is set');
            premiumSampleRate = undefined;
        }
        if (premiumSampleRate !== undefined && !isPercentage(premiumSampleRate)) {
            display.error('Premium Sample Rate should be a number between 0 and 100');
            return;
        }
        if (initConfiguration.tracingSampleRate !== undefined && !isPercentage(initConfiguration.tracingSampleRate)) {
            display.error('Tracing Sample Rate should be a number between 0 and 100');
            return;
        }
        if (initConfiguration.allowedTracingOrigins !== undefined) {
            if (!Array.isArray(initConfiguration.allowedTracingOrigins)) {
                display.error('Allowed Tracing Origins should be an array');
                return;
            }
            if (initConfiguration.allowedTracingOrigins.length !== 0 && initConfiguration.service === undefined) {
                display.error('Service need to be configured when tracing is enabled');
                return;
            }
        }
        if (initConfiguration.excludedActivityUrls !== undefined && !Array.isArray(initConfiguration.excludedActivityUrls)) {
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
            version: initConfiguration.version,
            actionNameAttribute: initConfiguration.actionNameAttribute,
            sessionReplaySampleRate: (_c = (_b = initConfiguration.sessionReplaySampleRate) !== null && _b !== void 0 ? _b : premiumSampleRate) !== null && _c !== void 0 ? _c : 100,
            oldPlansBehavior: initConfiguration.sessionReplaySampleRate === undefined,
            allowedTracingOrigins: (_d = initConfiguration.allowedTracingOrigins) !== null && _d !== void 0 ? _d : [],
            tracingSampleRate: initConfiguration.tracingSampleRate,
            excludedActivityUrls: (_e = initConfiguration.excludedActivityUrls) !== null && _e !== void 0 ? _e : [],
            trackInteractions: !!initConfiguration.trackInteractions || trackFrustrations,
            trackFrustrations: trackFrustrations,
            trackViewsManually: !!initConfiguration.trackViewsManually,
            trackResources: initConfiguration.trackResources,
            trackLongTasks: initConfiguration.trackLongTasks,
            defaultPrivacyLevel: objectHasValue(DefaultPrivacyLevel, initConfiguration.defaultPrivacyLevel)
                ? initConfiguration.defaultPrivacyLevel
                : DefaultPrivacyLevel.MASK_USER_INPUT,
        }, baseConfiguration);
    }

    function makeRumPublicApi(startRumImpl, recorderApi, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.ignoreInitIfSyntheticsWillInjectRum, ignoreInitIfSyntheticsWillInjectRum = _c === void 0 ? true : _c;
        var isAlreadyInitialized = false;
        var globalContextManager = createContextManager();
        var userContextManager = createContextManager();
        var getInternalContextStrategy = function () { return undefined; };
        var getInitConfigurationStrategy = function () { return undefined; };
        var bufferApiCalls = new BoundedBuffer();
        var addTimingStrategy = function (name, time) {
            if (time === void 0) { time = timeStampNow(); }
            bufferApiCalls.add(function () { return addTimingStrategy(name, time); });
        };
        var startViewStrategy = function (options, startClocks) {
            if (startClocks === void 0) { startClocks = clocksNow(); }
            bufferApiCalls.add(function () { return startViewStrategy(options, startClocks); });
        };
        var addActionStrategy = function (action, commonContext) {
            if (commonContext === void 0) { commonContext = {
                context: globalContextManager.getContext(),
                user: userContextManager.getContext(),
            }; }
            bufferApiCalls.add(function () { return addActionStrategy(action, commonContext); });
        };
        var addErrorStrategy = function (providedError, commonContext) {
            if (commonContext === void 0) { commonContext = {
                context: globalContextManager.getContext(),
                user: userContextManager.getContext(),
            }; }
            bufferApiCalls.add(function () { return addErrorStrategy(providedError, commonContext); });
        };
        function initRum(initConfiguration) {
            // If we are in a Synthetics test configured to automatically inject a RUM instance, we want to
            // completely discard the customer application RUM instance by ignoring their init() call.  But,
            // we should not ignore the init() call from the Synthetics-injected RUM instance, so the
            // internal `ignoreInitIfSyntheticsWillInjectRum` option is here to bypass this condition.
            if (ignoreInitIfSyntheticsWillInjectRum && willSyntheticsInjectRum()) {
                return;
            }
            if (canUseEventBridge()) {
                initConfiguration = overrideInitConfigurationForBridge(initConfiguration);
            }
            else if (!canHandleSession(initConfiguration)) {
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
            }
            else {
                // drain beforeInitCalls by buffering them until we start RUM
                // if we get a startView, drain re-buffered calls before continuing to drain beforeInitCalls
                // in order to ensure that calls are processed in order
                var beforeInitCalls = bufferApiCalls;
                bufferApiCalls = new BoundedBuffer();
                startViewStrategy = function (options) {
                    doStartRum(configuration, options);
                };
                beforeInitCalls.drain();
            }
            getInitConfigurationStrategy = function () { return deepClone(initConfiguration); };
            isAlreadyInitialized = true;
        }
        function doStartRum(configuration, initialViewOptions) {
            var startRumResults = startRumImpl(configuration, function () { return ({
                user: userContextManager.getContext(),
                context: globalContextManager.getContext(),
                hasReplay: recorderApi.isRecording() ? true : undefined,
            }); }, recorderApi, initialViewOptions);
            (startViewStrategy = startRumResults.startView, addActionStrategy = startRumResults.addAction, addErrorStrategy = startRumResults.addError, addTimingStrategy = startRumResults.addTiming, getInternalContextStrategy = startRumResults.getInternalContext);
            bufferApiCalls.drain();
            recorderApi.onRumStart(startRumResults.lifeCycle, configuration, startRumResults.session, startRumResults.viewContexts);
        }
        var startView = monitor(function (options) {
            var sanitizedOptions = typeof options === 'object' ? options : { name: options };
            startViewStrategy(sanitizedOptions);
        });
        var rumPublicApi = makePublicApi({
            init: monitor(initRum),
            /** @deprecated: use setGlobalContextProperty instead */
            addRumGlobalContext: monitor(globalContextManager.add),
            setGlobalContextProperty: monitor(globalContextManager.setContextProperty),
            /** @deprecated: use removeGlobalContextProperty instead */
            removeRumGlobalContext: monitor(globalContextManager.remove),
            removeGlobalContextProperty: monitor(globalContextManager.removeContextProperty),
            /** @deprecated: use getGlobalContext instead */
            getRumGlobalContext: monitor(globalContextManager.get),
            getGlobalContext: monitor(globalContextManager.getContext),
            /** @deprecated: use setGlobalContext instead */
            setRumGlobalContext: monitor(globalContextManager.set),
            setGlobalContext: monitor(globalContextManager.setContext),
            clearGlobalContext: monitor(globalContextManager.clearContext),
            getInternalContext: monitor(function (startTime) { return getInternalContextStrategy(startTime); }),
            getInitConfiguration: monitor(function () { return getInitConfigurationStrategy(); }),
            addAction: monitor(function (name, context) {
                addActionStrategy({
                    name: name,
                    context: deepClone(context),
                    startClocks: clocksNow(),
                    type: "custom" /* CUSTOM */,
                });
            }),
            addError: function (error, context) {
                var handlingStack = createHandlingStack();
                callMonitored(function () {
                    addErrorStrategy({
                        error: error,
                        handlingStack: handlingStack,
                        context: deepClone(context),
                        startClocks: clocksNow(),
                    });
                });
            },
            addTiming: monitor(function (name, time) {
                addTimingStrategy(name, time);
            }),
            setUser: monitor(function (newUser) {
                if (typeof newUser !== 'object' || !newUser) {
                    display.error('Unsupported user:', newUser);
                }
                else {
                    userContextManager.setContext(sanitizeUser(newUser));
                }
            }),
            getUser: monitor(userContextManager.getContext),
            setUserProperty: monitor(function (key, property) {
                var _a;
                var sanitizedProperty = sanitizeUser((_a = {}, _a[key] = property, _a))[key];
                userContextManager.setContextProperty(key, sanitizedProperty);
            }),
            removeUserProperty: monitor(userContextManager.removeContextProperty),
            /** @deprecated: renamed to clearUser */
            removeUser: monitor(userContextManager.clearContext),
            clearUser: monitor(userContextManager.clearContext),
            startView: startView,
            startSessionReplayRecording: monitor(recorderApi.start),
            stopSessionReplayRecording: monitor(recorderApi.stop),
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
                    display.error('DD_RUM is already initialized.');
                }
                return false;
            }
            return true;
        }
        function overrideInitConfigurationForBridge(initConfiguration) {
            return assign({}, initConfiguration, {
                applicationId: '00000000-aaaa-0000-aaaa-000000000000',
                clientToken: 'empty',
                sampleRate: 100,
            });
        }
        function isLocalFile() {
            return window.location.protocol === 'file:';
        }
    }

    function createDOMMutationObservable() {
        var MutationObserver = getMutationObserverConstructor();
        var observable = new Observable(function () {
            if (!MutationObserver) {
                return;
            }
            var observer = new MutationObserver(monitor(function () { return observable.notify(); }));
            observer.observe(document, {
                attributes: true,
                characterData: true,
                childList: true,
                subtree: true,
            });
            return function () { return observer.disconnect(); };
        });
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
            var zoneSymbol = browserWindow.Zone.__symbol__;
            // Zone.js 0.8.6+ is storing original class constructors into the browser 'window' object[3].
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

    var FAKE_INITIAL_DOCUMENT = 'initial_document';
    var RESOURCE_TYPES = [
        ["document" /* DOCUMENT */, function (initiatorType) { return FAKE_INITIAL_DOCUMENT === initiatorType; }],
        ["xhr" /* XHR */, function (initiatorType) { return 'xmlhttprequest' === initiatorType; }],
        ["fetch" /* FETCH */, function (initiatorType) { return 'fetch' === initiatorType; }],
        ["beacon" /* BEACON */, function (initiatorType) { return 'beacon' === initiatorType; }],
        ["css" /* CSS */, function (_, path) { return /\.css$/i.test(path); }],
        ["js" /* JS */, function (_, path) { return /\.js$/i.test(path); }],
        [
            "image" /* IMAGE */,
            function (initiatorType, path) {
                return includes(['image', 'img', 'icon'], initiatorType) || /\.(gif|jpg|jpeg|tiff|png|svg|ico)$/i.exec(path) !== null;
            },
        ],
        ["font" /* FONT */, function (_, path) { return /\.(woff|eot|woff2|ttf)$/i.exec(path) !== null; }],
        [
            "media" /* MEDIA */,
            function (initiatorType, path) {
                return includes(['audio', 'video'], initiatorType) || /\.(mp3|mp4)$/i.exec(path) !== null;
            },
        ],
    ];
    function computeResourceKind(timing) {
        var url = timing.name;
        if (!isValidUrl(url)) {
            addTelemetryDebug("Failed to construct URL for \"".concat(timing.name, "\""));
            return "other" /* OTHER */;
        }
        var path = getPathName(url);
        for (var _i = 0, RESOURCE_TYPES_1 = RESOURCE_TYPES; _i < RESOURCE_TYPES_1.length; _i++) {
            var _a = RESOURCE_TYPES_1[_i], type = _a[0], isType = _a[1];
            if (isType(timing.initiatorType, path)) {
                return type;
            }
        }
        return "other" /* OTHER */;
    }
    function areInOrder() {
        var numbers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            numbers[_i] = arguments[_i];
        }
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
        var duration = entry.duration, startTime = entry.startTime, responseEnd = entry.responseEnd;
        // Safari duration is always 0 on timings blocked by cross origin policies.
        if (duration === 0 && startTime < responseEnd) {
            return toServerDuration(elapsed(startTime, responseEnd));
        }
        return toServerDuration(duration);
    }
    function computePerformanceResourceDetails(entry) {
        var validEntry = toValidEntry(entry);
        if (!validEntry) {
            return undefined;
        }
        var startTime = validEntry.startTime, fetchStart = validEntry.fetchStart, redirectStart = validEntry.redirectStart, redirectEnd = validEntry.redirectEnd, domainLookupStart = validEntry.domainLookupStart, domainLookupEnd = validEntry.domainLookupEnd, connectStart = validEntry.connectStart, secureConnectionStart = validEntry.secureConnectionStart, connectEnd = validEntry.connectEnd, requestStart = validEntry.requestStart, responseStart = validEntry.responseStart, responseEnd = validEntry.responseEnd;
        var details = {
            download: formatTiming(startTime, responseStart, responseEnd),
            first_byte: formatTiming(startTime, requestStart, responseStart),
        };
        // Make sure a connection occurred
        if (connectEnd !== fetchStart) {
            details.connect = formatTiming(startTime, connectStart, connectEnd);
            // Make sure a secure connection occurred
            if (areInOrder(connectStart, secureConnectionStart, connectEnd)) {
                details.ssl = formatTiming(startTime, secureConnectionStart, connectEnd);
            }
        }
        // Make sure a domain lookup occurred
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
        if (!areInOrder(entry.startTime, entry.fetchStart, entry.domainLookupStart, entry.domainLookupEnd, entry.connectStart, entry.connectEnd, entry.requestStart, entry.responseStart, entry.responseEnd)) {
            return undefined;
        }
        if (!hasRedirection(entry)) {
            return entry;
        }
        var redirectStart = entry.redirectStart, redirectEnd = entry.redirectEnd;
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
        return assign({}, entry, {
            redirectEnd: redirectEnd,
            redirectStart: redirectStart,
        });
    }
    function hasRedirection(entry) {
        // The only time fetchStart is different than startTime is if a redirection occurred.
        return entry.fetchStart !== entry.startTime;
    }
    function formatTiming(origin, start, end) {
        return {
            duration: toServerDuration(elapsed(start, end)),
            start: toServerDuration(elapsed(origin, start)),
        };
    }
    function computeSize(entry) {
        // Make sure a request actually occurred
        if (entry.startTime < entry.responseStart) {
            return entry.decodedBodySize;
        }
        return undefined;
    }
    function isAllowedRequestUrl(configuration, url) {
        return url && !configuration.isIntakeUrl(url);
    }

    var INITIAL_DOCUMENT_OUTDATED_TRACE_ID_THRESHOLD = 2 * ONE_MINUTE;
    function getDocumentTraceId(document) {
        var data = getDocumentTraceDataFromMeta(document) || getDocumentTraceDataFromComment(document);
        if (!data || data.traceTime <= dateNow() - INITIAL_DOCUMENT_OUTDATED_TRACE_ID_THRESHOLD) {
            return undefined;
        }
        return data.traceId;
    }
    function getDocumentTraceDataFromMeta(document) {
        var traceIdMeta = document.querySelector('meta[name=dd-trace-id]');
        var traceTimeMeta = document.querySelector('meta[name=dd-trace-time]');
        return createDocumentTraceData(traceIdMeta && traceIdMeta.content, traceTimeMeta && traceTimeMeta.content);
    }
    function getDocumentTraceDataFromComment(document) {
        var comment = findTraceComment(document);
        if (!comment) {
            return undefined;
        }
        return createDocumentTraceData(findCommaSeparatedValue(comment, 'trace-id'), findCommaSeparatedValue(comment, 'trace-time'));
    }
    function createDocumentTraceData(traceId, rawTraceTime) {
        var traceTime = rawTraceTime && Number(rawTraceTime);
        if (!traceId || !traceTime) {
            return undefined;
        }
        return {
            traceId: traceId,
            traceTime: traceTime,
        };
    }
    function findTraceComment(document) {
        // 1. Try to find the comment as a direct child of the document
        // Note: TSLint advises to use a 'for of', but TS doesn't allow to use 'for of' if the iterated
        // value is not an array or string (here, a NodeList).
        for (var i = 0; i < document.childNodes.length; i += 1) {
            var comment = getTraceCommentFromNode(document.childNodes[i]);
            if (comment) {
                return comment;
            }
        }
        // 2. If the comment is placed after the </html> tag, but have some space or new lines before or
        // after, the DOM parser will lift it (and the surrounding text) at the end of the <body> tag.
        // Try to look for the comment at the end of the <body> by by iterating over its child nodes in
        // reverse order, stopping if we come across a non-text node.
        if (document.body) {
            for (var i = document.body.childNodes.length - 1; i >= 0; i -= 1) {
                var node = document.body.childNodes[i];
                var comment = getTraceCommentFromNode(node);
                if (comment) {
                    return comment;
                }
                if (!isTextNode$1(node)) {
                    break;
                }
            }
        }
    }
    function getTraceCommentFromNode(node) {
        if (node && isCommentNode(node)) {
            var match = /^\s*DATADOG;(.*?)\s*$/.exec(node.data);
            if (match) {
                return match[1];
            }
        }
    }
    function isCommentNode(node) {
        return node.nodeName === '#comment';
    }
    function isTextNode$1(node) {
        return node.nodeName === '#text';
    }

    function supportPerformanceObject() {
        return window.performance !== undefined && 'getEntries' in performance;
    }
    function supportPerformanceTimingEvent(entryType) {
        return (window.PerformanceObserver &&
            PerformanceObserver.supportedEntryTypes !== undefined &&
            PerformanceObserver.supportedEntryTypes.includes(entryType));
    }
    function startPerformanceCollection(lifeCycle, configuration) {
        retrieveInitialDocumentResourceTiming(function (timing) {
            handleRumPerformanceEntries(lifeCycle, configuration, [timing]);
        });
        if (supportPerformanceObject()) {
            var performanceEntries_1 = performance.getEntries();
            // Because the performance entry list can be quite large
            // delay the computation to prevent the SDK from blocking the main thread on init
            setTimeout(monitor(function () { return handleRumPerformanceEntries(lifeCycle, configuration, performanceEntries_1); }));
        }
        if (window.PerformanceObserver) {
            var handlePerformanceEntryList_1 = monitor(function (entries) {
                return handleRumPerformanceEntries(lifeCycle, configuration, entries.getEntries());
            });
            var mainEntries = ['resource', 'navigation', 'longtask', 'paint'];
            var experimentalEntries = ['largest-contentful-paint', 'first-input', 'layout-shift'];
            try {
                // Experimental entries are not retrieved by performance.getEntries()
                // use a single PerformanceObserver with buffered flag by type
                // to get values that could happen before SDK init
                experimentalEntries.forEach(function (type) {
                    var observer = new PerformanceObserver(handlePerformanceEntryList_1);
                    observer.observe({ type: type, buffered: true });
                });
            }
            catch (e) {
                // Some old browser versions (ex: chrome 67) don't support the PerformanceObserver type and buffered options
                // In these cases, fallback to PerformanceObserver with entryTypes
                mainEntries.push.apply(mainEntries, experimentalEntries);
            }
            var mainObserver = new PerformanceObserver(handlePerformanceEntryList_1);
            mainObserver.observe({ entryTypes: mainEntries });
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
                handleRumPerformanceEntries(lifeCycle, configuration, [timing]);
            });
        }
    }
    function retrieveInitialDocumentResourceTiming(callback) {
        runOnReadyState('interactive', function () {
            var timing;
            var forcedAttributes = {
                entryType: 'resource',
                initiatorType: FAKE_INITIAL_DOCUMENT,
                traceId: getDocumentTraceId(document),
            };
            if (supportPerformanceTimingEvent('navigation') && performance.getEntriesByType('navigation').length > 0) {
                var navigationEntry = performance.getEntriesByType('navigation')[0];
                timing = assign(navigationEntry.toJSON(), forcedAttributes);
            }
            else {
                var relativePerformanceTiming = computeRelativePerformanceTiming();
                timing = assign(relativePerformanceTiming, {
                    decodedBodySize: 0,
                    duration: relativePerformanceTiming.responseEnd,
                    name: window.location.href,
                    startTime: 0,
                }, forcedAttributes);
            }
            callback(timing);
        });
    }
    function retrieveNavigationTiming(callback) {
        function sendFakeTiming() {
            callback(assign(computeRelativePerformanceTiming(), {
                entryType: 'navigation',
            }));
        }
        runOnReadyState('complete', function () {
            // Send it a bit after the actual load event, so the "loadEventEnd" timing is accurate
            setTimeout(monitor(sendFakeTiming));
        });
    }
    /**
     * first-input timing entry polyfill based on
     * https://github.com/GoogleChrome/web-vitals/blob/master/src/lib/polyfills/firstInputPolyfill.ts
     */
    function retrieveFirstInputTiming(callback) {
        var startTimeStamp = dateNow();
        var timingSent = false;
        var removeEventListeners = addEventListeners(window, ["click" /* CLICK */, "mousedown" /* MOUSE_DOWN */, "keydown" /* KEY_DOWN */, "touchstart" /* TOUCH_START */, "pointerdown" /* POINTER_DOWN */], function (evt) {
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
                startTime: evt.timeStamp,
            };
            if (evt.type === "pointerdown" /* POINTER_DOWN */) {
                sendTimingIfPointerIsNotCancelled(timing);
            }
            else {
                sendTiming(timing);
            }
        }, { passive: true, capture: true }).stop;
        /**
         * Pointer events are a special case, because they can trigger main or compositor thread behavior.
         * We differentiate these cases based on whether or not we see a pointercancel event, which are
         * fired when we scroll. If we're scrolling we don't need to report input delay since FID excludes
         * scrolling and pinch/zooming.
         */
        function sendTimingIfPointerIsNotCancelled(timing) {
            addEventListeners(window, ["pointerup" /* POINTER_UP */, "pointercancel" /* POINTER_CANCEL */], function (event) {
                if (event.type === "pointerup" /* POINTER_UP */) {
                    sendTiming(timing);
                }
            }, { once: true });
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
                var numberKey = key;
                var timingElement = timing[numberKey];
                result[numberKey] = timingElement === 0 ? 0 : getRelativeTime(timingElement);
            }
        }
        return result;
    }
    function handleRumPerformanceEntries(lifeCycle, configuration, entries) {
        var rumPerformanceEntries = entries.filter(function (entry) {
            return entry.entryType === 'resource' ||
                entry.entryType === 'navigation' ||
                entry.entryType === 'paint' ||
                entry.entryType === 'longtask' ||
                entry.entryType === 'largest-contentful-paint' ||
                entry.entryType === 'first-input' ||
                entry.entryType === 'layout-shift';
        });
        var rumAllowedPerformanceEntries = rumPerformanceEntries.filter(function (entry) { return !isIncompleteNavigation(entry) && !isForbiddenResource(configuration, entry); });
        if (rumAllowedPerformanceEntries.length) {
            lifeCycle.notify(0 /* PERFORMANCE_ENTRIES_COLLECTED */, rumAllowedPerformanceEntries);
        }
    }
    function isIncompleteNavigation(entry) {
        return entry.entryType === 'navigation' && entry.loadEventEnd <= 0;
    }
    function isForbiddenResource(configuration, entry) {
        return entry.entryType === 'resource' && !isAllowedRequestUrl(configuration, entry.name);
    }

    function getSyntheticsContext() {
        var testId = getSyntheticsTestId();
        var resultId = getSyntheticsResultId();
        if (testId && resultId) {
            return {
                test_id: testId,
                result_id: resultId,
                injected: willSyntheticsInjectRum(),
            };
        }
    }

    function getCiTestContext() {
        var _a;
        var testExecutionId = (_a = window.Cypress) === null || _a === void 0 ? void 0 : _a.env('traceId');
        if (typeof testExecutionId === 'string') {
            return {
                test_execution_id: testExecutionId,
            };
        }
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
            var updateDimension = throttle(monitor(function () {
                observable.notify(getViewportDimension());
            }), 200).throttled;
            return addEventListener(window, "resize" /* RESIZE */, updateDimension, { capture: true, passive: true }).stop;
        });
        return observable;
    }
    // excludes the width and height of any rendered classic scrollbar that is fixed to the visual viewport
    function getViewportDimension() {
        var visual = window.visualViewport;
        if (visual) {
            return {
                width: Number(visual.width * visual.scale),
                height: Number(visual.height * visual.scale),
            };
        }
        return {
            width: Number(window.innerWidth || 0),
            height: Number(window.innerHeight || 0),
        };
    }

    var viewport;
    function getDisplayContext() {
        if (!isExperimentalFeatureEnabled('clickmap'))
            return;
        if (!viewport) {
            viewport = getViewportDimension();
            initViewportObservable().subscribe(function (viewportDimension) {
                viewport = viewportDimension;
            }).unsubscribe;
        }
        return {
            viewport: viewport,
        };
    }

    var VIEW_EVENTS_MODIFIABLE_FIELD_PATHS = [
        // Fields with sensitive data
        'view.url',
        'view.referrer',
        'action.target.name',
        'error.message',
        'error.stack',
        'error.resource.url',
        'resource.url',
    ];
    var OTHER_EVENTS_MODIFIABLE_FIELD_PATHS = VIEW_EVENTS_MODIFIABLE_FIELD_PATHS.concat([
        // User-customizable field
        'context',
    ]);
    function startRumAssembly(configuration, lifeCycle, sessionManager, viewContexts, urlContexts, actionContexts, getCommonContext, reportError) {
        var _a;
        var eventRateLimiters = (_a = {},
            _a["error" /* ERROR */] = createEventRateLimiter("error" /* ERROR */, configuration.eventRateLimiterThreshold, reportError),
            _a["action" /* ACTION */] = createEventRateLimiter("action" /* ACTION */, configuration.eventRateLimiterThreshold, reportError),
            _a);
        var syntheticsContext = getSyntheticsContext();
        var ciTestContext = getCiTestContext();
        lifeCycle.subscribe(10 /* RAW_RUM_EVENT_COLLECTED */, function (_a) {
            var startTime = _a.startTime, rawRumEvent = _a.rawRumEvent, domainContext = _a.domainContext, savedCommonContext = _a.savedCommonContext, customerContext = _a.customerContext;
            var viewContext = viewContexts.findView(startTime);
            var urlContext = urlContexts.findUrl(startTime);
            // allow to send events if the session was tracked when they start
            // except for views which are continuously updated
            // TODO: stop sending view updates when session is expired
            var session = sessionManager.findTrackedSession(rawRumEvent.type !== "view" /* VIEW */ ? startTime : undefined);
            if (session && viewContext && urlContext) {
                var commonContext = savedCommonContext || getCommonContext();
                var actionId = actionContexts.findActionId(startTime);
                var rumContext = {
                    _dd: {
                        format_version: 2,
                        drift: currentDrift(),
                        session: {
                            plan: session.plan,
                        },
                        browser_sdk_version: canUseEventBridge() ? "4.21.2" : undefined,
                    },
                    application: {
                        id: configuration.applicationId,
                    },
                    date: timeStampNow(),
                    service: viewContext.service || configuration.service,
                    version: viewContext.version || configuration.version,
                    source: 'browser',
                    session: {
                        id: session.id,
                        type: syntheticsContext ? "synthetics" /* SYNTHETICS */ : ciTestContext ? "ci_test" /* CI_TEST */ : "user" /* USER */,
                    },
                    view: {
                        id: viewContext.id,
                        name: viewContext.name,
                        url: urlContext.url,
                        referrer: urlContext.referrer,
                    },
                    action: needToAssembleWithAction(rawRumEvent) && actionId ? { id: actionId } : undefined,
                    synthetics: syntheticsContext,
                    ci_test: ciTestContext,
                    display: getDisplayContext(),
                };
                var serverRumEvent = combine(rumContext, rawRumEvent);
                serverRumEvent.context = combine(commonContext.context, customerContext);
                if (isSimulationActive()) {
                    serverRumEvent.context.simulation_label = getSimulationLabel();
                }
                if (!('has_replay' in serverRumEvent.session)) {
                    serverRumEvent.session.has_replay = commonContext.hasReplay;
                }
                if (!isEmptyObject(commonContext.user)) {
                    serverRumEvent.usr = commonContext.user;
                }
                if (shouldSend(serverRumEvent, configuration.beforeSend, domainContext, eventRateLimiters)) {
                    if (isEmptyObject(serverRumEvent.context)) {
                        delete serverRumEvent.context;
                    }
                    lifeCycle.notify(11 /* RUM_EVENT_COLLECTED */, serverRumEvent);
                }
            }
        });
    }
    function shouldSend(event, beforeSend, domainContext, eventRateLimiters) {
        var _a;
        if (beforeSend) {
            var result = limitModification(event, event.type === "view" /* VIEW */ ? VIEW_EVENTS_MODIFIABLE_FIELD_PATHS : OTHER_EVENTS_MODIFIABLE_FIELD_PATHS, function (event) { return beforeSend(event, domainContext); });
            if (result === false && event.type !== "view" /* VIEW */) {
                return false;
            }
            if (result === false) {
                display.warn("Can't dismiss view events using beforeSend!");
            }
        }
        var rateLimitReached = (_a = eventRateLimiters[event.type]) === null || _a === void 0 ? void 0 : _a.isLimitReached();
        return !rateLimitReached;
    }
    function needToAssembleWithAction(event) {
        return ["error" /* ERROR */, "resource" /* RESOURCE */, "long_task" /* LONG_TASK */].indexOf(event.type) !== -1;
    }

    // Arbitrary value to cap number of element mostly for backend & to save bandwidth
    var MAX_NUMBER_OF_SELECTABLE_FOREGROUND_PERIODS = 500;
    // Arbitrary value to cap number of element mostly for memory consumption in the browser
    var MAX_NUMBER_OF_STORED_FOREGROUND_PERIODS = 2500;
    var foregroundPeriods = [];
    function startForegroundContexts() {
        if (document.hasFocus()) {
            addNewForegroundPeriod();
        }
        var stopForegroundTracking = trackFocus(addNewForegroundPeriod).stop;
        var stopBlurTracking = trackBlur(closeForegroundPeriod).stop;
        return {
            isInForegroundAt: isInForegroundAt,
            selectInForegroundPeriodsFor: selectInForegroundPeriodsFor,
            stop: function () {
                foregroundPeriods = [];
                stopForegroundTracking();
                stopBlurTracking();
            },
        };
    }
    function addNewForegroundPeriod() {
        if (foregroundPeriods.length > MAX_NUMBER_OF_STORED_FOREGROUND_PERIODS) {
            return;
        }
        var currentForegroundPeriod = foregroundPeriods[foregroundPeriods.length - 1];
        var now = relativeNow();
        if (currentForegroundPeriod !== undefined && currentForegroundPeriod.end === undefined) {
            return;
        }
        foregroundPeriods.push({
            start: now,
        });
    }
    function closeForegroundPeriod() {
        if (foregroundPeriods.length === 0) {
            return;
        }
        var currentForegroundPeriod = foregroundPeriods[foregroundPeriods.length - 1];
        var now = relativeNow();
        if (currentForegroundPeriod.end !== undefined) {
            return;
        }
        currentForegroundPeriod.end = now;
    }
    function trackFocus(onFocusChange) {
        return addEventListener(window, "focus" /* FOCUS */, function (event) {
            if (!event.isTrusted) {
                return;
            }
            onFocusChange();
        });
    }
    function trackBlur(onBlurChange) {
        return addEventListener(window, "blur" /* BLUR */, function (event) {
            if (!event.isTrusted) {
                return;
            }
            onBlurChange();
        });
    }
    function isInForegroundAt(startTime) {
        for (var i = foregroundPeriods.length - 1; i >= 0; i--) {
            var foregroundPeriod = foregroundPeriods[i];
            if (foregroundPeriod.end !== undefined && startTime > foregroundPeriod.end) {
                break;
            }
            if (startTime > foregroundPeriod.start &&
                (foregroundPeriod.end === undefined || startTime < foregroundPeriod.end)) {
                return true;
            }
        }
        return false;
    }
    function selectInForegroundPeriodsFor(eventStartTime, duration) {
        var eventEndTime = addDuration(eventStartTime, duration);
        var filteredForegroundPeriods = [];
        var earliestIndex = Math.max(0, foregroundPeriods.length - MAX_NUMBER_OF_SELECTABLE_FOREGROUND_PERIODS);
        for (var i = foregroundPeriods.length - 1; i >= earliestIndex; i--) {
            var foregroundPeriod = foregroundPeriods[i];
            if (foregroundPeriod.end !== undefined && eventStartTime > foregroundPeriod.end) {
                // event starts after the end of the current focus period
                // since the array is sorted, we can stop looking for foreground periods
                break;
            }
            if (eventEndTime < foregroundPeriod.start) {
                // event ends before the start of the current focus period
                // continue to previous one
                continue;
            }
            var startTime = eventStartTime > foregroundPeriod.start ? eventStartTime : foregroundPeriod.start;
            var startDuration = elapsed(eventStartTime, startTime);
            var endTime = foregroundPeriod.end === undefined || eventEndTime < foregroundPeriod.end ? eventEndTime : foregroundPeriod.end;
            var endDuration = elapsed(startTime, endTime);
            filteredForegroundPeriods.unshift({
                start: toServerDuration(startDuration),
                duration: toServerDuration(endDuration),
            });
        }
        return filteredForegroundPeriods;
    }

    /**
     * Internal context keep returning v1 format
     * to not break compatibility with logs data format
     */
    function startInternalContext(applicationId, sessionManager, viewContexts, actionContexts, urlContexts) {
        return {
            get: function (startTime) {
                var viewContext = viewContexts.findView(startTime);
                var urlContext = urlContexts.findUrl(startTime);
                var session = sessionManager.findTrackedSession(startTime);
                if (session && viewContext && urlContext) {
                    var actionId = actionContexts.findActionId(startTime);
                    return {
                        application_id: applicationId,
                        session_id: session.id,
                        user_action: actionId ? { id: actionId } : undefined,
                        view: { id: viewContext.id, name: viewContext.name, referrer: urlContext.referrer, url: urlContext.url },
                    };
                }
            },
        };
    }

    var LifeCycle = /** @class */ (function () {
        function LifeCycle() {
            this.callbacks = {};
        }
        LifeCycle.prototype.notify = function (eventType, data) {
            var eventCallbacks = this.callbacks[eventType];
            if (eventCallbacks) {
                eventCallbacks.forEach(function (callback) { return callback(data); });
            }
        };
        LifeCycle.prototype.subscribe = function (eventType, callback) {
            var _this = this;
            if (!this.callbacks[eventType]) {
                this.callbacks[eventType] = [];
            }
            this.callbacks[eventType].push(callback);
            return {
                unsubscribe: function () {
                    _this.callbacks[eventType] = _this.callbacks[eventType].filter(function (other) { return callback !== other; });
                },
            };
        };
        return LifeCycle;
    }());

    var VIEW_CONTEXT_TIME_OUT_DELAY = SESSION_TIME_OUT_DELAY;
    function startViewContexts(lifeCycle) {
        var viewContextHistory = new ContextHistory(VIEW_CONTEXT_TIME_OUT_DELAY);
        lifeCycle.subscribe(2 /* VIEW_CREATED */, function (view) {
            viewContextHistory.add(buildViewContext(view), view.startClocks.relative);
        });
        lifeCycle.subscribe(4 /* VIEW_ENDED */, function (_a) {
            var endClocks = _a.endClocks;
            viewContextHistory.closeActive(endClocks.relative);
        });
        lifeCycle.subscribe(8 /* SESSION_RENEWED */, function () {
            viewContextHistory.reset();
        });
        function buildViewContext(view) {
            return {
                service: view.service,
                version: view.version,
                id: view.id,
                name: view.name,
            };
        }
        return {
            findView: function (startTime) { return viewContextHistory.find(startTime); },
            stop: function () {
                viewContextHistory.stop();
            },
        };
    }

    /**
     * Clear tracing information to avoid incomplete traces. Ideally, we should do it when the
     * request did not reach the server, but the browser does not expose this. So, we clear tracing
     * information if the request ended with status 0 without being aborted by the application.
     *
     * Reasoning:
     *
     * * Applications are usually aborting requests after a bit of time, for example when the user is
     * typing (autocompletion) or navigating away (in a SPA). With a performant device and good
     * network conditions, the request is likely to reach the server before being canceled.
     *
     * * Requests aborted otherwise (ex: lack of internet, CORS issue, blocked by a privacy extension)
     * are likely to finish quickly and without reaching the server.
     *
     * Of course, it might not be the case every time, but it should limit having incomplete traces a
     * bit.
     * */
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
            traceFetch: function (context) {
                return injectHeadersIfTracingAllowed(configuration, context, sessionManager, function (tracingHeaders) {
                    var _a;
                    if (context.input instanceof Request && !((_a = context.init) === null || _a === void 0 ? void 0 : _a.headers)) {
                        context.input = new Request(context.input);
                        Object.keys(tracingHeaders).forEach(function (key) {
                            context.input.headers.append(key, tracingHeaders[key]);
                        });
                    }
                    else {
                        context.init = shallowClone(context.init);
                        var headers_1 = [];
                        if (context.init.headers instanceof Headers) {
                            context.init.headers.forEach(function (value, key) {
                                headers_1.push([key, value]);
                            });
                        }
                        else if (Array.isArray(context.init.headers)) {
                            context.init.headers.forEach(function (header) {
                                headers_1.push(header);
                            });
                        }
                        else if (context.init.headers) {
                            Object.keys(context.init.headers).forEach(function (key) {
                                headers_1.push([key, context.init.headers[key]]);
                            });
                        }
                        context.init.headers = headers_1.concat(objectEntries(tracingHeaders));
                    }
                });
            },
            traceXhr: function (context, xhr) {
                return injectHeadersIfTracingAllowed(configuration, context, sessionManager, function (tracingHeaders) {
                    Object.keys(tracingHeaders).forEach(function (name) {
                        xhr.setRequestHeader(name, tracingHeaders[name]);
                    });
                });
            },
        };
    }
    function injectHeadersIfTracingAllowed(configuration, context, sessionManager, inject) {
        if (!isTracingSupported() || !isAllowedUrl(configuration, context.url) || !sessionManager.findTrackedSession()) {
            return;
        }
        context.traceId = new TraceIdentifier();
        context.spanId = new TraceIdentifier();
        context.traceSampled = !isNumber(configuration.tracingSampleRate) || performDraw(configuration.tracingSampleRate);
        inject(makeTracingHeaders(context.traceId, context.spanId, context.traceSampled));
    }
    function isAllowedUrl(configuration, requestUrl) {
        return matchList(configuration.allowedTracingOrigins, getOrigin(requestUrl));
    }
    function isTracingSupported() {
        return getCrypto() !== undefined;
    }
    function getCrypto() {
        return window.crypto || window.msCrypto;
    }
    /**
     * When trace is not sampled, set priority to '0' instead of not adding the tracing headers
     * to prepare the implementation for sampling delegation.
     */
    function makeTracingHeaders(traceId, spanId, traceSampled) {
        return {
            'x-datadog-origin': 'rum',
            'x-datadog-parent-id': spanId.toDecimalString(),
            'x-datadog-sampling-priority': traceSampled ? '1' : '0',
            'x-datadog-trace-id': traceId.toDecimalString(),
        };
    }
    /* eslint-disable no-bitwise */
    var TraceIdentifier = /** @class */ (function () {
        function TraceIdentifier() {
            this.buffer = new Uint8Array(8);
            getCrypto().getRandomValues(this.buffer);
            this.buffer[0] = this.buffer[0] & 0x7f; // force 63-bit
        }
        TraceIdentifier.prototype.toString = function (radix) {
            var high = this.readInt32(0);
            var low = this.readInt32(4);
            var str = '';
            do {
                var mod = (high % radix) * 4294967296 + low;
                high = Math.floor(high / radix);
                low = Math.floor(mod / radix);
                str = (mod % radix).toString(radix) + str;
            } while (high || low);
            return str;
        };
        /**
         * Format used everywhere except the trace intake
         */
        TraceIdentifier.prototype.toDecimalString = function () {
            return this.toString(10);
        };
        TraceIdentifier.prototype.readInt32 = function (offset) {
            return (this.buffer[offset] * 16777216 +
                (this.buffer[offset + 1] << 16) +
                (this.buffer[offset + 2] << 8) +
                this.buffer[offset + 3]);
        };
        return TraceIdentifier;
    }());
    /* eslint-enable no-bitwise */

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
                    lifeCycle.notify(5 /* REQUEST_STARTED */, {
                        requestIndex: context.requestIndex,
                        url: context.url,
                    });
                    break;
                case 'complete':
                    tracer.clearTracingIfNeeded(context);
                    lifeCycle.notify(6 /* REQUEST_COMPLETED */, {
                        duration: context.duration,
                        method: context.method,
                        requestIndex: context.requestIndex,
                        spanId: context.spanId,
                        startClocks: context.startClocks,
                        status: context.status,
                        traceId: context.traceId,
                        traceSampled: context.traceSampled,
                        type: "xhr" /* XHR */,
                        url: context.url,
                        xhr: context.xhr,
                    });
                    break;
            }
        });
        return { stop: function () { return subscription.unsubscribe(); } };
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
                    lifeCycle.notify(5 /* REQUEST_STARTED */, {
                        requestIndex: context.requestIndex,
                        url: context.url,
                    });
                    break;
                case 'complete':
                    tracer.clearTracingIfNeeded(context);
                    lifeCycle.notify(6 /* REQUEST_COMPLETED */, {
                        duration: context.duration,
                        method: context.method,
                        requestIndex: context.requestIndex,
                        responseType: context.responseType,
                        spanId: context.spanId,
                        startClocks: context.startClocks,
                        status: context.status,
                        traceId: context.traceId,
                        traceSampled: context.traceSampled,
                        type: "fetch" /* FETCH */,
                        url: context.url,
                        response: context.response,
                        init: context.init,
                        input: context.input,
                    });
                    break;
            }
        });
        return { stop: function () { return subscription.unsubscribe(); } };
    }
    function getNextRequestIndex() {
        var result = nextRequestIndex;
        nextRequestIndex += 1;
        return result;
    }

    function trackEventCounts(lifeCycle, callback) {
        if (callback === void 0) { callback = noop; }
        var eventCounts = {
            errorCount: 0,
            longTaskCount: 0,
            resourceCount: 0,
            actionCount: 0,
            frustrationCount: 0,
        };
        var subscription = lifeCycle.subscribe(11 /* RUM_EVENT_COLLECTED */, function (event) {
            switch (event.type) {
                case "error" /* ERROR */:
                    eventCounts.errorCount += 1;
                    callback(eventCounts);
                    break;
                case "action" /* ACTION */:
                    eventCounts.actionCount += 1;
                    if (event.action.frustration) {
                        eventCounts.frustrationCount += event.action.frustration.type.length;
                    }
                    callback(eventCounts);
                    break;
                case "long_task" /* LONG_TASK */:
                    eventCounts.longTaskCount += 1;
                    callback(eventCounts);
                    break;
                case "resource" /* RESOURCE */:
                    eventCounts.resourceCount += 1;
                    callback(eventCounts);
                    break;
            }
        });
        return {
            stop: function () {
                subscription.unsubscribe();
            },
            eventCounts: eventCounts,
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
        var validationTimeoutId = setTimeout(monitor(function () { return complete({ hadActivity: false }); }), PAGE_ACTIVITY_VALIDATION_DELAY);
        var maxDurationTimeoutId = maxDuration &&
            setTimeout(monitor(function () { return complete({ hadActivity: true, end: timeStampNow() }); }), maxDuration);
        var pageActivitySubscription = pageActivityObservable.subscribe(function (_a) {
            var isBusy = _a.isBusy;
            clearTimeout(validationTimeoutId);
            clearTimeout(pageActivityEndTimeoutId);
            var lastChangeTime = timeStampNow();
            if (!isBusy) {
                pageActivityEndTimeoutId = setTimeout(monitor(function () { return complete({ hadActivity: true, end: lastChangeTime }); }), PAGE_ACTIVITY_END_DELAY);
            }
        });
        var stop = function () {
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
        return { stop: stop };
    }
    function createPageActivityObservable(lifeCycle, domMutationObservable, configuration) {
        var observable = new Observable(function () {
            var subscriptions = [];
            var firstRequestIndex;
            var pendingRequestsCount = 0;
            subscriptions.push(domMutationObservable.subscribe(notifyPageActivity), lifeCycle.subscribe(0 /* PERFORMANCE_ENTRIES_COLLECTED */, function (entries) {
                if (entries.some(function (entry) { return entry.entryType === 'resource' && !isExcludedUrl(configuration, entry.name); })) {
                    notifyPageActivity();
                }
            }), lifeCycle.subscribe(5 /* REQUEST_STARTED */, function (startEvent) {
                if (isExcludedUrl(configuration, startEvent.url)) {
                    return;
                }
                if (firstRequestIndex === undefined) {
                    firstRequestIndex = startEvent.requestIndex;
                }
                pendingRequestsCount += 1;
                notifyPageActivity();
            }), lifeCycle.subscribe(6 /* REQUEST_COMPLETED */, function (request) {
                if (isExcludedUrl(configuration, request.url) ||
                    firstRequestIndex === undefined ||
                    // If the request started before the tracking start, ignore it
                    request.requestIndex < firstRequestIndex) {
                    return;
                }
                pendingRequestsCount -= 1;
                notifyPageActivity();
            }));
            var stopTrackingWindowOpen = trackWindowOpen(notifyPageActivity).stop;
            return function () {
                stopTrackingWindowOpen();
                subscriptions.forEach(function (s) { return s.unsubscribe(); });
            };
            function notifyPageActivity() {
                observable.notify({ isBusy: pendingRequestsCount > 0 });
            }
        });
        return observable;
    }
    function isExcludedUrl(configuration, requestUrl) {
        return matchList(configuration.excludedActivityUrls, requestUrl);
    }
    function trackWindowOpen(callback) {
        return instrumentMethodAndCallOriginal(window, 'open', { before: callback });
    }

    var MAX_DURATION_BETWEEN_CLICKS = ONE_SECOND;
    var MAX_DISTANCE_BETWEEN_CLICKS = 100;
    function createClickChain(firstClick, onFinalize) {
        var bufferedClicks = [];
        var status = 0 /* WaitingForMoreClicks */;
        var maxDurationBetweenClicksTimeout;
        appendClick(firstClick);
        function appendClick(click) {
            click.stopObservable.subscribe(tryFinalize);
            bufferedClicks.push(click);
            clearTimeout(maxDurationBetweenClicksTimeout);
            maxDurationBetweenClicksTimeout = setTimeout(monitor(dontAcceptMoreClick), MAX_DURATION_BETWEEN_CLICKS);
        }
        function tryFinalize() {
            if (status === 1 /* WaitingForClicksToStop */ && bufferedClicks.every(function (click) { return click.isStopped(); })) {
                status = 2 /* Finalized */;
                onFinalize(bufferedClicks);
            }
        }
        function dontAcceptMoreClick() {
            clearTimeout(maxDurationBetweenClicksTimeout);
            if (status === 0 /* WaitingForMoreClicks */) {
                status = 1 /* WaitingForClicksToStop */;
                tryFinalize();
            }
        }
        return {
            tryAppend: function (click) {
                if (status !== 0 /* WaitingForMoreClicks */) {
                    return false;
                }
                if (bufferedClicks.length > 0 &&
                    !areEventsSimilar(bufferedClicks[bufferedClicks.length - 1].event, click.event)) {
                    dontAcceptMoreClick();
                    return false;
                }
                appendClick(click);
                return true;
            },
            stop: function () {
                dontAcceptMoreClick();
            },
        };
    }
    /**
     * Checks whether two events are similar by comparing their target, position and timestamp
     */
    function areEventsSimilar(first, second) {
        return (first.target === second.target &&
            mouseEventDistance(first, second) <= MAX_DISTANCE_BETWEEN_CLICKS &&
            first.timeStamp - second.timeStamp <= MAX_DURATION_BETWEEN_CLICKS);
    }
    function mouseEventDistance(origin, other) {
        return Math.sqrt(Math.pow(origin.clientX - other.clientX, 2) + Math.pow(origin.clientY - other.clientY, 2));
    }

    /**
     * Get the action name from the attribute 'data-dd-action-name' on the element or any of its parent.
     * It can also be retrieved from a user defined attribute.
     */
    var DEFAULT_PROGRAMMATIC_ACTION_NAME_ATTRIBUTE = 'data-dd-action-name';
    function getActionNameFromElement(element, userProgrammaticAttribute) {
        // Proceed to get the action name in two steps:
        // * first, get the name programmatically, explicitly defined by the user.
        // * then, use strategies that are known to return good results. Those strategies will be used on
        //   the element and a few parents, but it's likely that they won't succeed at all.
        // * if no name is found this way, use strategies returning less accurate names as a fallback.
        //   Those are much likely to succeed.
        return (getActionNameFromElementProgrammatically(element, DEFAULT_PROGRAMMATIC_ACTION_NAME_ATTRIBUTE) ||
            (userProgrammaticAttribute && getActionNameFromElementProgrammatically(element, userProgrammaticAttribute)) ||
            getActionNameFromElementForStrategies(element, userProgrammaticAttribute, priorityStrategies) ||
            getActionNameFromElementForStrategies(element, userProgrammaticAttribute, fallbackStrategies) ||
            '');
    }
    function getActionNameFromElementProgrammatically(targetElement, programmaticAttribute) {
        var elementWithAttribute;
        // We don't use getActionNameFromElementForStrategies here, because we want to consider all parents,
        // without limit. It is up to the user to declare a relevant naming strategy.
        // If available, use element.closest() to match get the attribute from the element or any of its
        // parent.  Else fallback to a more traditional implementation.
        if (supportsElementClosest()) {
            elementWithAttribute = targetElement.closest("[".concat(programmaticAttribute, "]"));
        }
        else {
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
            }
            else if (element.id) {
                var label = element.ownerDocument &&
                    find(element.ownerDocument.querySelectorAll('label'), function (label) { return label.htmlFor === element.id; });
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
        },
        function (element) { return element.getAttribute('aria-label'); },
        // associated element text designated by the aria-labelledby attribute
        function (element, userProgrammaticAttribute) {
            var labelledByAttribute = element.getAttribute('aria-labelledby');
            if (labelledByAttribute) {
                return labelledByAttribute
                    .split(/\s+/)
                    .map(function (id) { return getElementById(element, id); })
                    .filter(function (label) { return Boolean(label); })
                    .map(function (element) { return getTextualContent(element, userProgrammaticAttribute); })
                    .join(' ');
            }
        },
        function (element) { return element.getAttribute('alt'); },
        function (element) { return element.getAttribute('name'); },
        function (element) { return element.getAttribute('title'); },
        function (element) { return element.getAttribute('placeholder'); },
        // SELECT first OPTION text
        function (element, userProgrammaticAttribute) {
            if ('options' in element && element.options.length > 0) {
                return getTextualContent(element.options[0], userProgrammaticAttribute);
            }
        },
    ];
    var fallbackStrategies = [
        function (element, userProgrammaticAttribute) { return getTextualContent(element, userProgrammaticAttribute); },
    ];
    /**
     * Iterates over the target element and its parent, using the strategies list to get an action name.
     * Each strategies are applied on each element, stopping as soon as a non-empty value is returned.
     */
    var MAX_PARENTS_TO_CONSIDER = 10;
    function getActionNameFromElementForStrategies(targetElement, userProgrammaticAttribute, strategies) {
        var element = targetElement;
        var recursionCounter = 0;
        while (recursionCounter <= MAX_PARENTS_TO_CONSIDER &&
            element &&
            element.nodeName !== 'BODY' &&
            element.nodeName !== 'HTML' &&
            element.nodeName !== 'HEAD') {
            for (var _i = 0, strategies_1 = strategies; _i < strategies_1.length; _i++) {
                var strategy = strategies_1[_i];
                var name_1 = strategy(element, userProgrammaticAttribute);
                if (typeof name_1 === 'string') {
                    var trimmedName = name_1.trim();
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
        return s.length > 100 ? "".concat(safeTruncate(s, 100), " [...]") : s;
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
            var text_1 = element.innerText;
            var removeTextFromElements = function (query) {
                var list = element.querySelectorAll(query);
                for (var index = 0; index < list.length; index += 1) {
                    var element_1 = list[index];
                    if ('innerText' in element_1) {
                        var textToReplace = element_1.innerText;
                        if (textToReplace && textToReplace.trim().length > 0) {
                            text_1 = text_1.replace(textToReplace, '');
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
            removeTextFromElements("[".concat(DEFAULT_PROGRAMMATIC_ACTION_NAME_ATTRIBUTE, "]"));
            if (userProgrammaticAttribute) {
                removeTextFromElements("[".concat(userProgrammaticAttribute, "]"));
            }
            return text_1;
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

    /**
     * Stable attributes are attributes that are commonly used to identify parts of a UI (ex:
     * component). Those attribute values should not be generated randomly (hardcoded most of the time)
     * and stay the same across deploys. They are not necessarily unique across the document.
     */
    var STABLE_ATTRIBUTES = [
        'data-dd-action-name',
        // Common test attributes (list provided by google recorder)
        'data-testid',
        'data-test',
        'data-qa',
        'data-cy',
        'data-test-id',
        'data-qa-id',
        'data-testing',
        // FullStory decorator attributes:
        'data-component',
        'data-element',
        'data-source-file',
    ];
    function getSelectorsFromElement(element, actionNameAttribute) {
        var attributeSelectors = getStableAttributeSelectors();
        if (actionNameAttribute) {
            attributeSelectors = [function (element) { return getAttributeSelector(actionNameAttribute, element); }].concat(attributeSelectors);
        }
        return {
            selector: getSelectorFromElement(element, attributeSelectors.concat(getIDSelector), attributeSelectors.concat(getClassSelector)),
        };
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
    function getSelectorFromElement(targetElement, globallyUniqueSelectorStrategies, uniqueAmongChildrenSelectorStrategies) {
        var targetElementSelector = [];
        var element = targetElement;
        while (element && element.nodeName !== 'HTML') {
            var globallyUniqueSelector = findSelector(element, globallyUniqueSelectorStrategies, isSelectorUniqueGlobally);
            if (globallyUniqueSelector) {
                targetElementSelector.unshift(globallyUniqueSelector);
                break;
            }
            var uniqueSelectorAmongChildren = findSelector(element, uniqueAmongChildrenSelectorStrategies, isSelectorUniqueAmongChildren);
            if (uniqueSelectorAmongChildren) {
                targetElementSelector.unshift(uniqueSelectorAmongChildren);
            }
            else {
                targetElementSelector.unshift(getPositionSelector(element));
            }
            element = element.parentElement;
        }
        return targetElementSelector.join('>');
    }
    function getIDSelector(element) {
        if (element.id && !isGeneratedValue(element.id)) {
            return "#".concat(cssEscape(element.id));
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
                return "".concat(element.tagName, ".").concat(cssEscape(className));
            }
        }
    }
    var stableAttributeSelectorsCache;
    function getStableAttributeSelectors() {
        if (!stableAttributeSelectorsCache) {
            stableAttributeSelectorsCache = STABLE_ATTRIBUTES.map(function (attribute) { return function (element) { return getAttributeSelector(attribute, element); }; });
        }
        return stableAttributeSelectorsCache;
    }
    function getAttributeSelector(attributeName, element) {
        if (element.hasAttribute(attributeName)) {
            return "".concat(element.tagName, "[").concat(attributeName, "=\"").concat(cssEscape(element.getAttribute(attributeName)), "\"]");
        }
    }
    function getPositionSelector(element) {
        var parent = element.parentElement;
        var sibling = parent.firstElementChild;
        var currentIndex = 0;
        var elementIndex;
        while (sibling) {
            if (sibling.tagName === element.tagName) {
                currentIndex += 1;
                if (sibling === element) {
                    elementIndex = currentIndex;
                }
                if (elementIndex !== undefined && currentIndex > 1) {
                    // Performance improvement: avoid iterating over all children, stop as soon as we are sure
                    // the element is not alone
                    break;
                }
            }
            sibling = sibling.nextElementSibling;
        }
        return currentIndex === 1 ? element.tagName : "".concat(element.tagName, ":nth-of-type(").concat(elementIndex, ")");
    }
    function findSelector(element, selectorGetters, predicate) {
        for (var _i = 0, selectorGetters_1 = selectorGetters; _i < selectorGetters_1.length; _i++) {
            var selectorGetter = selectorGetters_1[_i];
            var selector = selectorGetter(element);
            if (selector && predicate(element, selector)) {
                return selector;
            }
        }
    }
    function isSelectorUniqueGlobally(element, selector) {
        return element.ownerDocument.body.querySelectorAll(selector).length === 1;
    }
    function isSelectorUniqueAmongChildren(element, selector) {
        for (var i = 0; i < element.parentElement.children.length; i++) {
            var sibling = element.parentElement.children[i];
            if (sibling !== element && elementMatches(sibling, selector)) {
                return false;
            }
        }
        return true;
    }

    function listenActionEvents(_a) {
        var onPointerDown = _a.onPointerDown, onClick = _a.onClick;
        var hasSelectionChanged = false;
        var selectionEmptyAtPointerDown;
        var hasInputChanged = false;
        var clickContext;
        var listeners = [
            addEventListener(window, "pointerdown" /* POINTER_DOWN */, function (event) {
                hasSelectionChanged = false;
                selectionEmptyAtPointerDown = isSelectionEmpty();
                if (isMouseEventOnElement(event)) {
                    clickContext = onPointerDown(event);
                }
            }, { capture: true }),
            addEventListener(window, "selectionchange" /* SELECTION_CHANGE */, function () {
                if (!selectionEmptyAtPointerDown || !isSelectionEmpty()) {
                    hasSelectionChanged = true;
                }
            }, { capture: true }),
            addEventListener(window, "click" /* CLICK */, function (clickEvent) {
                if (isMouseEventOnElement(clickEvent) && clickContext) {
                    // Use a scoped variable to make sure the value is not changed by other clicks
                    var userActivity_1 = {
                        selection: hasSelectionChanged,
                        input: hasInputChanged,
                    };
                    if (!hasInputChanged) {
                        setTimeout(monitor(function () {
                            userActivity_1.input = hasInputChanged;
                        }));
                    }
                    onClick(clickContext, clickEvent, function () { return userActivity_1; });
                    clickContext = undefined;
                }
            }, { capture: true }),
            addEventListener(window, "input" /* INPUT */, function () {
                hasInputChanged = true;
            }, { capture: true }),
        ];
        return {
            stop: function () {
                listeners.forEach(function (listener) { return listener.stop(); });
            },
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
            rageClick.addFrustration("rage_click" /* RAGE_CLICK */);
            if (clicks.some(isDead)) {
                rageClick.addFrustration("dead_click" /* DEAD_CLICK */);
            }
            if (rageClick.hasError) {
                rageClick.addFrustration("error_click" /* ERROR_CLICK */);
            }
            return { isRage: true };
        }
        var hasSelectionChanged = clicks.some(function (click) { return click.getUserActivity().selection; });
        clicks.forEach(function (click) {
            if (click.hasError) {
                click.addFrustration("error_click" /* ERROR_CLICK */);
            }
            if (isDead(click) &&
                // Avoid considering clicks part of a double-click or triple-click selections as dead clicks
                !hasSelectionChanged) {
                click.addFrustration("dead_click" /* DEAD_CLICK */);
            }
        });
        return { isRage: false };
    }
    function isRage(clicks) {
        if (clicks.some(function (click) { return click.getUserActivity().selection; })) {
            return false;
        }
        for (var i = 0; i < clicks.length - (MIN_CLICKS_PER_SECOND_TO_CONSIDER_RAGE - 1); i += 1) {
            if (clicks[i + MIN_CLICKS_PER_SECOND_TO_CONSIDER_RAGE - 1].event.timeStamp - clicks[i].event.timeStamp <=
                ONE_SECOND) {
                return true;
            }
        }
        return false;
    }
    var DEAD_CLICK_EXCLUDE_SELECTOR = 
    // inputs that don't trigger a meaningful event like "input" when clicked, including textual
    // inputs (using a negative selector is shorter here)
    'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="range"]),' +
        'textarea,' +
        'select,' +
        // canvas, as there is no good way to detect activity occurring on them
        'canvas,' +
        // links that are interactive (have an href attribute) or any of their descendants, as they can
        // open a new tab or navigate to a hash without triggering a meaningful event
        'a[href],' +
        'a[href] *';
    function isDead(click) {
        if (click.hasPageActivity || click.getUserActivity().input) {
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
        lifeCycle.subscribe(8 /* SESSION_RENEWED */, function () {
            history.reset();
        });
        lifeCycle.subscribe(9 /* BEFORE_UNLOAD */, stopClickChain);
        lifeCycle.subscribe(4 /* VIEW_ENDED */, stopClickChain);
        var stopActionEventsListener = listenActionEvents({
            onPointerDown: function (pointerDownEvent) { return processPointerDown(configuration, history, pointerDownEvent); },
            onClick: function (clickActionBase, clickEvent, getUserActivity) {
                return processClick(configuration, lifeCycle, domMutationObservable, history, stopObservable, appendClickToClickChain, clickActionBase, clickEvent, getUserActivity);
            },
        }).stop;
        var actionContexts = {
            findActionId: function (startTime) {
                return configuration.trackFrustrations ? history.findAll(startTime) : history.find(startTime);
            },
        };
        return {
            stop: function () {
                stopClickChain();
                stopObservable.notify();
                stopActionEventsListener();
            },
            actionContexts: actionContexts,
        };
        function appendClickToClickChain(click) {
            if (!currentClickChain || !currentClickChain.tryAppend(click)) {
                var rageClick_1 = click.clone();
                currentClickChain = createClickChain(click, function (clicks) {
                    finalizeClicks(clicks, rageClick_1);
                });
            }
        }
        function stopClickChain() {
            if (currentClickChain) {
                currentClickChain.stop();
            }
        }
    }
    function processPointerDown(configuration, history, pointerDownEvent) {
        if (!configuration.trackFrustrations && history.find()) {
            // TODO: remove this in a future major version. To keep retrocompatibility, ignore any new
            // action if another one is already occurring.
            return;
        }
        var clickActionBase = computeClickActionBase(pointerDownEvent, configuration.actionNameAttribute);
        if (!configuration.trackFrustrations && !clickActionBase.name) {
            // TODO: remove this in a future major version. To keep retrocompatibility, ignore any action
            // with a blank name
            return;
        }
        return clickActionBase;
    }
    function processClick(configuration, lifeCycle, domMutationObservable, history, stopObservable, appendClickToClickChain, clickActionBase, clickEvent, getUserActivity) {
        var click = newClick(lifeCycle, history, getUserActivity, clickActionBase, clickEvent);
        if (configuration.trackFrustrations) {
            appendClickToClickChain(click);
        }
        var stopWaitPageActivityEnd = waitPageActivityEnd(lifeCycle, domMutationObservable, configuration, function (pageActivityEndEvent) {
            if (pageActivityEndEvent.hadActivity && pageActivityEndEvent.end < click.startClocks.timeStamp) {
                // If the clock is looking weird, just discard the click
                click.discard();
            }
            else {
                click.stop(pageActivityEndEvent.hadActivity ? pageActivityEndEvent.end : undefined);
                // Validate or discard the click only if we don't track frustrations. It'll be done when
                // the click chain is finalized.
                if (!configuration.trackFrustrations) {
                    if (!pageActivityEndEvent.hadActivity) {
                        // If we are not tracking frustrations, we should discard the click to keep backward
                        // compatibility.
                        click.discard();
                    }
                    else {
                        click.validate();
                    }
                }
            }
        }, CLICK_ACTION_MAX_DURATION).stop;
        var viewEndedSubscription = lifeCycle.subscribe(4 /* VIEW_ENDED */, function (_a) {
            var endClocks = _a.endClocks;
            click.stop(endClocks.timeStamp);
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
        var target;
        var position;
        if (isExperimentalFeatureEnabled('clickmap')) {
            var rect = event.target.getBoundingClientRect();
            target = assign({
                width: Math.round(rect.width),
                height: Math.round(rect.height),
            }, getSelectorsFromElement(event.target, actionNameAttribute));
            position = {
                // Use clientX and Y because for SVG element offsetX and Y are relatives to the <svg> element
                x: Math.round(event.clientX - rect.left),
                y: Math.round(event.clientY - rect.top),
            };
        }
        return {
            type: "click" /* CLICK */,
            target: target,
            position: position,
            name: getActionNameFromElement(event.target, actionNameAttribute),
        };
    }
    function newClick(lifeCycle, history, getUserActivity, clickActionBase, clickEvent) {
        var id = generateUUID();
        var startClocks = clocksNow();
        var historyEntry = history.add(id, startClocks.relative);
        var eventCountsSubscription = trackEventCounts(lifeCycle);
        var status = 0 /* ONGOING */;
        var activityEndTime;
        var frustrationTypes = [];
        var stopObservable = new Observable();
        function stop(newActivityEndTime) {
            if (status !== 0 /* ONGOING */) {
                return;
            }
            activityEndTime = newActivityEndTime;
            status = 1 /* STOPPED */;
            if (activityEndTime) {
                historyEntry.close(getRelativeTime(activityEndTime));
            }
            else {
                historyEntry.remove();
            }
            eventCountsSubscription.stop();
            stopObservable.notify();
        }
        return {
            event: clickEvent,
            stop: stop,
            stopObservable: stopObservable,
            get hasError() {
                return eventCountsSubscription.eventCounts.errorCount > 0;
            },
            get hasPageActivity() {
                return activityEndTime !== undefined;
            },
            getUserActivity: getUserActivity,
            addFrustration: function (frustrationType) {
                frustrationTypes.push(frustrationType);
            },
            startClocks: startClocks,
            isStopped: function () { return status === 1 /* STOPPED */ || status === 2 /* FINALIZED */; },
            clone: function () { return newClick(lifeCycle, history, getUserActivity, clickActionBase, clickEvent); },
            validate: function (domEvents) {
                stop();
                if (status !== 1 /* STOPPED */) {
                    return;
                }
                var _a = eventCountsSubscription.eventCounts, resourceCount = _a.resourceCount, errorCount = _a.errorCount, longTaskCount = _a.longTaskCount;
                var clickAction = assign({
                    type: "click" /* CLICK */,
                    duration: activityEndTime && elapsed(startClocks.timeStamp, activityEndTime),
                    startClocks: startClocks,
                    id: id,
                    frustrationTypes: frustrationTypes,
                    counts: {
                        resourceCount: resourceCount,
                        errorCount: errorCount,
                        longTaskCount: longTaskCount,
                    },
                    events: domEvents !== null && domEvents !== void 0 ? domEvents : [clickEvent],
                    event: clickEvent,
                }, clickActionBase);
                lifeCycle.notify(1 /* AUTO_ACTION_COMPLETED */, clickAction);
                status = 2 /* FINALIZED */;
            },
            discard: function () {
                stop();
                status = 2 /* FINALIZED */;
            },
        };
    }
    function finalizeClicks(clicks, rageClick) {
        var isRage = computeFrustration(clicks, rageClick).isRage;
        if (isRage) {
            clicks.forEach(function (click) { return click.discard(); });
            rageClick.stop(timeStampNow());
            rageClick.validate(clicks.map(function (click) { return click.event; }));
        }
        else {
            rageClick.discard();
            clicks.forEach(function (click) { return click.validate(); });
        }
    }

    function startActionCollection(lifeCycle, domMutationObservable, configuration, foregroundContexts) {
        lifeCycle.subscribe(1 /* AUTO_ACTION_COMPLETED */, function (action) {
            return lifeCycle.notify(10 /* RAW_RUM_EVENT_COLLECTED */, processAction(action, foregroundContexts));
        });
        var actionContexts = { findActionId: noop };
        if (configuration.trackInteractions) {
            actionContexts = trackClickActions(lifeCycle, domMutationObservable, configuration).actionContexts;
        }
        return {
            addAction: function (action, savedCommonContext) {
                lifeCycle.notify(10 /* RAW_RUM_EVENT_COLLECTED */, assign({
                    savedCommonContext: savedCommonContext,
                }, processAction(action, foregroundContexts)));
            },
            actionContexts: actionContexts,
        };
    }
    function processAction(action, foregroundContexts) {
        var autoActionProperties = isAutoAction(action)
            ? {
                action: {
                    id: action.id,
                    loading_time: toServerDuration(action.duration),
                    frustration: {
                        type: action.frustrationTypes,
                    },
                    error: {
                        count: action.counts.errorCount,
                    },
                    long_task: {
                        count: action.counts.longTaskCount,
                    },
                    resource: {
                        count: action.counts.resourceCount,
                    },
                },
                _dd: {
                    action: {
                        target: action.target,
                        position: action.position,
                    },
                },
            }
            : undefined;
        var customerContext = !isAutoAction(action) ? action.context : undefined;
        var actionEvent = combine({
            action: {
                id: generateUUID(),
                target: {
                    name: action.name,
                },
                type: action.type,
            },
            date: action.startClocks.timeStamp,
            type: "action" /* ACTION */,
        }, autoActionProperties);
        var inForeground = foregroundContexts.isInForegroundAt(action.startClocks.relative);
        if (inForeground !== undefined) {
            actionEvent.view = { in_foreground: inForeground };
        }
        return {
            customerContext: customerContext,
            rawRumEvent: actionEvent,
            startTime: action.startClocks.relative,
            domainContext: isAutoAction(action) ? { event: action.event, events: action.events } : {},
        };
    }
    function isAutoAction(action) {
        return action.type !== "custom" /* CUSTOM */;
    }

    function trackConsoleError(errorObservable) {
        var subscription = initConsoleObservable([ConsoleApiName.error]).subscribe(function (consoleError) {
            return errorObservable.notify({
                startClocks: clocksNow(),
                message: consoleError.message,
                stack: consoleError.stack,
                source: ErrorSource.CONSOLE,
                handling: "handled" /* HANDLED */,
                handlingStack: consoleError.handlingStack,
            });
        });
        return {
            stop: function () {
                subscription.unsubscribe();
            },
        };
    }

    function trackReportError(errorObservable) {
        var subscription = initReportObservable([RawReportType.cspViolation, RawReportType.intervention]).subscribe(function (reportError) {
            return errorObservable.notify({
                startClocks: clocksNow(),
                message: reportError.message,
                stack: reportError.stack,
                type: reportError.subtype,
                source: ErrorSource.REPORT,
                handling: "unhandled" /* UNHANDLED */,
            });
        });
        return {
            stop: function () {
                subscription.unsubscribe();
            },
        };
    }

    function startErrorCollection(lifeCycle, foregroundContexts) {
        var errorObservable = new Observable();
        trackConsoleError(errorObservable);
        trackRuntimeError(errorObservable);
        trackReportError(errorObservable);
        errorObservable.subscribe(function (error) { return lifeCycle.notify(12 /* RAW_ERROR_COLLECTED */, { error: error }); });
        return doStartErrorCollection(lifeCycle, foregroundContexts);
    }
    function doStartErrorCollection(lifeCycle, foregroundContexts) {
        lifeCycle.subscribe(12 /* RAW_ERROR_COLLECTED */, function (_a) {
            var error = _a.error, customerContext = _a.customerContext, savedCommonContext = _a.savedCommonContext;
            lifeCycle.notify(10 /* RAW_RUM_EVENT_COLLECTED */, assign({
                customerContext: customerContext,
                savedCommonContext: savedCommonContext,
            }, processError(error, foregroundContexts)));
        });
        return {
            addError: function (_a, savedCommonContext) {
                var error = _a.error, handlingStack = _a.handlingStack, startClocks = _a.startClocks, customerContext = _a.context;
                var stackTrace = error instanceof Error ? computeStackTrace(error) : undefined;
                var rawError = computeRawError({
                    stackTrace: stackTrace,
                    originalError: error,
                    handlingStack: handlingStack,
                    startClocks: startClocks,
                    nonErrorPrefix: 'Provided',
                    source: ErrorSource.CUSTOM,
                    handling: "handled" /* HANDLED */,
                });
                lifeCycle.notify(12 /* RAW_ERROR_COLLECTED */, {
                    customerContext: customerContext,
                    savedCommonContext: savedCommonContext,
                    error: rawError,
                });
            },
        };
    }
    function processError(error, foregroundContexts) {
        var rawRumEvent = {
            date: error.startClocks.timeStamp,
            error: {
                id: generateUUID(),
                message: error.message,
                source: error.source,
                stack: error.stack,
                handling_stack: error.handlingStack,
                type: error.type,
                handling: error.handling,
                causes: error.causes,
                source_type: 'browser',
            },
            type: "error" /* ERROR */,
        };
        var inForeground = foregroundContexts.isInForegroundAt(error.startClocks.relative);
        if (inForeground !== undefined) {
            rawRumEvent.view = { in_foreground: inForeground };
        }
        return {
            rawRumEvent: rawRumEvent,
            startTime: error.startClocks.relative,
            domainContext: {
                error: error.originalError,
            },
        };
    }

    function startLongTaskCollection(lifeCycle, sessionManager) {
        lifeCycle.subscribe(0 /* PERFORMANCE_ENTRIES_COLLECTED */, function (entries) {
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                if (entry.entryType !== 'longtask') {
                    break;
                }
                var session = sessionManager.findTrackedSession(entry.startTime);
                if (!session || !session.longTaskAllowed) {
                    break;
                }
                var startClocks = relativeToClocks(entry.startTime);
                var rawRumEvent = {
                    date: startClocks.timeStamp,
                    long_task: {
                        id: generateUUID(),
                        duration: toServerDuration(entry.duration),
                    },
                    type: "long_task" /* LONG_TASK */,
                    _dd: {
                        discarded: false,
                    },
                };
                lifeCycle.notify(10 /* RAW_RUM_EVENT_COLLECTED */, {
                    rawRumEvent: rawRumEvent,
                    startTime: startClocks.relative,
                    domainContext: { performanceEntry: entry.toJSON() },
                });
            }
        });
    }

    /**
     * Look for corresponding timing in resource timing buffer
     *
     * Observations:
     * - Timing (start, end) are nested inside the request (start, end)
     * - Some timing can be not exactly nested, being off by < 1 ms
     * - Browsers generate a timing entry for OPTIONS request
     *
     * Strategy:
     * - from valid nested entries (with 1 ms error margin)
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
        var candidates = sameNameEntries
            .map(function (entry) { return entry.toJSON(); })
            .filter(toValidEntry)
            .filter(function (entry) {
            return isBetween(entry, request.startClocks.relative, endTime({ startTime: request.startClocks.relative, duration: request.duration }));
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
        return addDuration(timing.startTime, timing.duration);
    }
    function isBetween(timing, start, end) {
        var errorMargin = 1;
        return timing.startTime >= start - errorMargin && endTime(timing) <= addDuration(end, errorMargin);
    }

    function startResourceCollection(lifeCycle, configuration, sessionManager) {
        lifeCycle.subscribe(6 /* REQUEST_COMPLETED */, function (request) {
            lifeCycle.notify(10 /* RAW_RUM_EVENT_COLLECTED */, processRequest(request, configuration, sessionManager));
        });
        lifeCycle.subscribe(0 /* PERFORMANCE_ENTRIES_COLLECTED */, function (entries) {
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                if (entry.entryType === 'resource' && !isRequestKind(entry)) {
                    lifeCycle.notify(10 /* RAW_RUM_EVENT_COLLECTED */, processResourceEntry(entry, configuration, sessionManager));
                }
            }
        });
    }
    function processRequest(request, configuration, sessionManager) {
        var type = request.type === "xhr" /* XHR */ ? "xhr" /* XHR */ : "fetch" /* FETCH */;
        var matchingTiming = matchRequestTiming(request);
        var startClocks = matchingTiming ? relativeToClocks(matchingTiming.startTime) : request.startClocks;
        var correspondingTimingOverrides = matchingTiming ? computePerformanceEntryMetrics(matchingTiming) : undefined;
        var tracingInfo = computeRequestTracingInfo(request, configuration);
        var indexingInfo = computeIndexingInfo(sessionManager, startClocks);
        var resourceEvent = combine({
            date: startClocks.timeStamp,
            resource: {
                id: generateUUID(),
                type: type,
                duration: toServerDuration(request.duration),
                method: request.method,
                status_code: request.status,
                url: request.url,
            },
            type: "resource" /* RESOURCE */,
        }, tracingInfo, correspondingTimingOverrides, indexingInfo);
        return {
            startTime: startClocks.relative,
            rawRumEvent: resourceEvent,
            domainContext: {
                performanceEntry: matchingTiming && toPerformanceEntryRepresentation(matchingTiming),
                xhr: request.xhr,
                response: request.response,
                requestInput: request.input,
                requestInit: request.init,
                error: request.error,
            },
        };
    }
    function processResourceEntry(entry, configuration, sessionManager) {
        var type = computeResourceKind(entry);
        var entryMetrics = computePerformanceEntryMetrics(entry);
        var startClocks = relativeToClocks(entry.startTime);
        var tracingInfo = computeEntryTracingInfo(entry, configuration);
        var indexingInfo = computeIndexingInfo(sessionManager, startClocks);
        var resourceEvent = combine({
            date: startClocks.timeStamp,
            resource: {
                id: generateUUID(),
                type: type,
                url: entry.name,
            },
            type: "resource" /* RESOURCE */,
        }, tracingInfo, entryMetrics, indexingInfo);
        return {
            startTime: startClocks.relative,
            rawRumEvent: resourceEvent,
            domainContext: {
                performanceEntry: toPerformanceEntryRepresentation(entry),
            },
        };
    }
    function computePerformanceEntryMetrics(timing) {
        return {
            resource: assign({
                duration: computePerformanceResourceDuration(timing),
                size: computeSize(timing),
            }, computePerformanceResourceDetails(timing)),
        };
    }
    function computeRequestTracingInfo(request, configuration) {
        var hasBeenTraced = request.traceSampled && request.traceId && request.spanId;
        if (!hasBeenTraced) {
            return undefined;
        }
        return {
            _dd: {
                span_id: request.spanId.toDecimalString(),
                trace_id: request.traceId.toDecimalString(),
                rule_psr: getRulePsr(configuration),
            },
        };
    }
    function computeEntryTracingInfo(entry, configuration) {
        var hasBeenTraced = entry.traceId;
        if (!hasBeenTraced) {
            return undefined;
        }
        return {
            _dd: {
                trace_id: entry.traceId,
                rule_psr: getRulePsr(configuration),
            },
        };
    }
    // TODO next major: use directly PerformanceEntry type in domain context
    function toPerformanceEntryRepresentation(entry) {
        return entry;
    }
    /**
     * @returns number between 0 and 1 which represents tracing sample rate
     */
    function getRulePsr(configuration) {
        return isNumber(configuration.tracingSampleRate) ? configuration.tracingSampleRate / 100 : undefined;
    }
    function computeIndexingInfo(sessionManager, resourceStart) {
        var session = sessionManager.findTrackedSession(resourceStart.relative);
        return {
            _dd: {
                discarded: !session || !session.resourceAllowed,
            },
        };
    }

    var trackFirstHiddenSingleton;
    var stopListeners;
    function trackFirstHidden(emitter) {
        if (emitter === void 0) { emitter = window; }
        if (!trackFirstHiddenSingleton) {
            if (document.visibilityState === 'hidden') {
                trackFirstHiddenSingleton = {
                    timeStamp: 0,
                };
            }
            else {
                trackFirstHiddenSingleton = {
                    timeStamp: Infinity,
                };
                (stopListeners = addEventListeners(emitter, ["pagehide" /* PAGE_HIDE */, "visibilitychange" /* VISIBILITY_CHANGE */], function (event) {
                    if (event.type === 'pagehide' || document.visibilityState === 'hidden') {
                        trackFirstHiddenSingleton.timeStamp = event.timeStamp;
                        stopListeners();
                    }
                }, { capture: true }).stop);
            }
        }
        return trackFirstHiddenSingleton;
    }

    // Discard LCP and FCP timings above a certain delay to avoid incorrect data
    // It happens in some cases like sleep mode or some browser implementations
    var TIMING_MAXIMUM_DELAY = 10 * ONE_MINUTE;
    function trackInitialViewTimings(lifeCycle, callback) {
        var timings = {};
        function setTimings(newTimings) {
            assign(timings, newTimings);
            callback(timings);
        }
        var stopNavigationTracking = trackNavigationTimings(lifeCycle, setTimings).stop;
        var stopFCPTracking = trackFirstContentfulPaintTiming(lifeCycle, function (firstContentfulPaint) {
            return setTimings({ firstContentfulPaint: firstContentfulPaint });
        }).stop;
        var stopLCPTracking = trackLargestContentfulPaintTiming(lifeCycle, window, function (largestContentfulPaint) {
            setTimings({
                largestContentfulPaint: largestContentfulPaint,
            });
        }).stop;
        var stopFIDTracking = trackFirstInputTimings(lifeCycle, function (_a) {
            var firstInputDelay = _a.firstInputDelay, firstInputTime = _a.firstInputTime;
            setTimings({
                firstInputDelay: firstInputDelay,
                firstInputTime: firstInputTime,
            });
        }).stop;
        return {
            stop: function () {
                stopNavigationTracking();
                stopFCPTracking();
                stopLCPTracking();
                stopFIDTracking();
            },
        };
    }
    function trackNavigationTimings(lifeCycle, callback) {
        var stop = lifeCycle.subscribe(0 /* PERFORMANCE_ENTRIES_COLLECTED */, function (entries) {
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                if (entry.entryType === 'navigation') {
                    callback({
                        domComplete: entry.domComplete,
                        domContentLoaded: entry.domContentLoadedEventEnd,
                        domInteractive: entry.domInteractive,
                        loadEvent: entry.loadEventEnd,
                        // In some cases the value reported is negative or is larger
                        // than the current page time. Ignore these cases:
                        // https://github.com/GoogleChrome/web-vitals/issues/137
                        // https://github.com/GoogleChrome/web-vitals/issues/162
                        firstByte: entry.responseStart >= 0 && entry.responseStart <= relativeNow() ? entry.responseStart : undefined,
                    });
                }
            }
        }).unsubscribe;
        return { stop: stop };
    }
    function trackFirstContentfulPaintTiming(lifeCycle, callback) {
        var firstHidden = trackFirstHidden();
        var stop = lifeCycle.subscribe(0 /* PERFORMANCE_ENTRIES_COLLECTED */, function (entries) {
            var fcpEntry = find(entries, function (entry) {
                return entry.entryType === 'paint' &&
                    entry.name === 'first-contentful-paint' &&
                    entry.startTime < firstHidden.timeStamp &&
                    entry.startTime < TIMING_MAXIMUM_DELAY;
            });
            if (fcpEntry) {
                callback(fcpEntry.startTime);
            }
        }).unsubscribe;
        return { stop: stop };
    }
    /**
     * Track the largest contentful paint (LCP) occurring during the initial View.  This can yield
     * multiple values, only the most recent one should be used.
     * Documentation: https://web.dev/lcp/
     * Reference implementation: https://github.com/GoogleChrome/web-vitals/blob/master/src/getLCP.ts
     */
    function trackLargestContentfulPaintTiming(lifeCycle, emitter, callback) {
        var firstHidden = trackFirstHidden();
        // Ignore entries that come after the first user interaction.  According to the documentation, the
        // browser should not send largest-contentful-paint entries after a user interact with the page,
        // but the web-vitals reference implementation uses this as a safeguard.
        var firstInteractionTimestamp = Infinity;
        var stopEventListener = addEventListeners(emitter, ["pointerdown" /* POINTER_DOWN */, "keydown" /* KEY_DOWN */], function (event) {
            firstInteractionTimestamp = event.timeStamp;
        }, { capture: true, once: true }).stop;
        var unsubscribeLifeCycle = lifeCycle.subscribe(0 /* PERFORMANCE_ENTRIES_COLLECTED */, function (entries) {
            var lcpEntry = findLast(entries, function (entry) {
                return entry.entryType === 'largest-contentful-paint' &&
                    entry.startTime < firstInteractionTimestamp &&
                    entry.startTime < firstHidden.timeStamp &&
                    entry.startTime < TIMING_MAXIMUM_DELAY;
            });
            if (lcpEntry) {
                callback(lcpEntry.startTime);
            }
        }).unsubscribe;
        return {
            stop: function () {
                stopEventListener();
                unsubscribeLifeCycle();
            },
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
        var stop = lifeCycle.subscribe(0 /* PERFORMANCE_ENTRIES_COLLECTED */, function (entries) {
            var firstInputEntry = find(entries, function (entry) {
                return entry.entryType === 'first-input' && entry.startTime < firstHidden.timeStamp;
            });
            if (firstInputEntry) {
                var firstInputDelay = elapsed(firstInputEntry.startTime, firstInputEntry.processingStart);
                callback({
                    // Ensure firstInputDelay to be positive, see
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1185815
                    firstInputDelay: firstInputDelay >= 0 ? firstInputDelay : 0,
                    firstInputTime: firstInputEntry.startTime,
                });
            }
        }).unsubscribe;
        return {
            stop: stop,
        };
    }

    function trackViewMetrics(lifeCycle, domMutationObservable, configuration, scheduleViewUpdate, loadingType, viewStart) {
        var viewMetrics = {
            eventCounts: {
                errorCount: 0,
                longTaskCount: 0,
                resourceCount: 0,
                actionCount: 0,
                frustrationCount: 0,
            },
        };
        var stopEventCountsTracking = trackEventCounts(lifeCycle, function (newEventCounts) {
            viewMetrics.eventCounts = newEventCounts;
            scheduleViewUpdate();
        }).stop;
        var _a = trackLoadingTime(lifeCycle, domMutationObservable, configuration, loadingType, viewStart, function (newLoadingTime) {
            viewMetrics.loadingTime = newLoadingTime;
            scheduleViewUpdate();
        }), stopLoadingTimeTracking = _a.stop, setLoadEvent = _a.setLoadEvent;
        var stopCLSTracking;
        if (isLayoutShiftSupported()) {
            viewMetrics.cumulativeLayoutShift = 0;
            (stopCLSTracking = trackCumulativeLayoutShift(lifeCycle, function (cumulativeLayoutShift) {
                viewMetrics.cumulativeLayoutShift = cumulativeLayoutShift;
                scheduleViewUpdate();
            }).stop);
        }
        else {
            stopCLSTracking = noop;
        }
        return {
            stop: function () {
                stopEventCountsTracking();
                stopLoadingTimeTracking();
                stopCLSTracking();
            },
            setLoadEvent: setLoadEvent,
            viewMetrics: viewMetrics,
        };
    }
    function trackLoadingTime(lifeCycle, domMutationObservable, configuration, loadType, viewStart, callback) {
        var isWaitingForLoadEvent = loadType === "initial_load" /* INITIAL_LOAD */;
        var isWaitingForActivityLoadingTime = true;
        var loadingTimeCandidates = [];
        function invokeCallbackIfAllCandidatesAreReceived() {
            if (!isWaitingForActivityLoadingTime && !isWaitingForLoadEvent && loadingTimeCandidates.length > 0) {
                callback(Math.max.apply(Math, loadingTimeCandidates));
            }
        }
        var stop = waitPageActivityEnd(lifeCycle, domMutationObservable, configuration, function (event) {
            if (isWaitingForActivityLoadingTime) {
                isWaitingForActivityLoadingTime = false;
                if (event.hadActivity) {
                    loadingTimeCandidates.push(elapsed(viewStart.timeStamp, event.end));
                }
                invokeCallbackIfAllCandidatesAreReceived();
            }
        }).stop;
        return {
            stop: stop,
            setLoadEvent: function (loadEvent) {
                if (isWaitingForLoadEvent) {
                    isWaitingForLoadEvent = false;
                    loadingTimeCandidates.push(loadEvent);
                    invokeCallbackIfAllCandidatesAreReceived();
                }
            },
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
        var stop = lifeCycle.subscribe(0 /* PERFORMANCE_ENTRIES_COLLECTED */, function (entries) {
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                    window.update(entry);
                    if (window.value() > maxClsValue) {
                        maxClsValue = window.value();
                        callback(round(maxClsValue, 4));
                    }
                }
            }
        }).unsubscribe;
        return {
            stop: stop,
        };
    }
    function slidingSessionWindow() {
        var value = 0;
        var startTime;
        var endTime;
        return {
            update: function (entry) {
                var shouldCreateNewWindow = startTime === undefined ||
                    entry.startTime - endTime >= ONE_SECOND ||
                    entry.startTime - startTime >= 5 * ONE_SECOND;
                if (shouldCreateNewWindow) {
                    startTime = endTime = entry.startTime;
                    value = entry.value;
                }
                else {
                    value += entry.value;
                    endTime = entry.startTime;
                }
            },
            value: function () { return value; },
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
        var _a = trackInitialView(initialViewOptions), stopInitialViewTracking = _a.stop, initialView = _a.initialView;
        var currentView = initialView;
        var stopViewLifeCycle = startViewLifeCycle().stop;
        var locationChangeSubscription;
        if (areViewsTrackedAutomatically) {
            locationChangeSubscription = renewViewOnLocationChange(locationChangeObservable);
        }
        function trackInitialView(options) {
            var initialView = newView(lifeCycle, domMutationObservable, configuration, location, "initial_load" /* INITIAL_LOAD */, clocksOrigin(), options);
            var stop = trackInitialViewTimings(lifeCycle, function (timings) {
                initialView.updateTimings(timings);
                initialView.scheduleUpdate();
            }).stop;
            return { initialView: initialView, stop: stop };
        }
        function trackViewChange(startClocks, viewOptions) {
            return newView(lifeCycle, domMutationObservable, configuration, location, "route_change" /* ROUTE_CHANGE */, startClocks, viewOptions);
        }
        function startViewLifeCycle() {
            lifeCycle.subscribe(8 /* SESSION_RENEWED */, function () {
                // do not trigger view update to avoid wrong data
                currentView.end();
                // Renew view on session renewal
                currentView = trackViewChange(undefined, {
                    name: currentView.name,
                    service: currentView.service,
                    version: currentView.version,
                });
            });
            // End the current view on page unload
            lifeCycle.subscribe(9 /* BEFORE_UNLOAD */, function () {
                currentView.end();
                currentView.triggerUpdate();
            });
            // Session keep alive
            var keepAliveInterval = window.setInterval(monitor(function () {
                currentView.triggerUpdate();
            }), SESSION_KEEP_ALIVE_INTERVAL);
            return {
                stop: function () {
                    clearInterval(keepAliveInterval);
                },
            };
        }
        function renewViewOnLocationChange(locationChangeObservable) {
            return locationChangeObservable.subscribe(function (_a) {
                var oldLocation = _a.oldLocation, newLocation = _a.newLocation;
                if (areDifferentLocation(oldLocation, newLocation)) {
                    currentView.end();
                    currentView.triggerUpdate();
                    currentView = trackViewChange();
                    return;
                }
            });
        }
        return {
            addTiming: function (name, time) {
                if (time === void 0) { time = timeStampNow(); }
                currentView.addTiming(name, time);
                currentView.scheduleUpdate();
            },
            startView: function (options, startClocks) {
                currentView.end(startClocks);
                currentView.triggerUpdate();
                currentView = trackViewChange(startClocks, options);
            },
            stop: function () {
                locationChangeSubscription === null || locationChangeSubscription === void 0 ? void 0 : locationChangeSubscription.unsubscribe();
                stopInitialViewTracking();
                stopViewLifeCycle();
                currentView.end();
            },
        };
    }
    function newView(lifeCycle, domMutationObservable, configuration, initialLocation, loadingType, startClocks, viewOptions) {
        if (startClocks === void 0) { startClocks = clocksNow(); }
        // Setup initial values
        var id = generateUUID();
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
        lifeCycle.notify(2 /* VIEW_CREATED */, { id: id, name: name, startClocks: startClocks, service: service, version: version });
        // Update the view every time the measures are changing
        var _a = throttle(monitor(triggerViewUpdate), THROTTLE_VIEW_UPDATE_PERIOD, {
            leading: false,
        }), scheduleViewUpdate = _a.throttled, cancelScheduleViewUpdate = _a.cancel;
        var _b = trackViewMetrics(lifeCycle, domMutationObservable, configuration, scheduleViewUpdate, loadingType, startClocks), setLoadEvent = _b.setLoadEvent, stopViewMetricsTracking = _b.stop, viewMetrics = _b.viewMetrics;
        // Initial view update
        triggerViewUpdate();
        function triggerViewUpdate() {
            documentVersion += 1;
            var currentEnd = endClocks === undefined ? timeStampNow() : endClocks.timeStamp;
            lifeCycle.notify(3 /* VIEW_UPDATED */, assign({
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
                isActive: endClocks === undefined,
            }, viewMetrics));
        }
        return {
            name: name,
            service: service,
            version: version,
            scheduleUpdate: scheduleViewUpdate,
            end: function (clocks) {
                if (clocks === void 0) { clocks = clocksNow(); }
                endClocks = clocks;
                lifeCycle.notify(4 /* VIEW_ENDED */, { endClocks: endClocks });
                stopViewMetricsTracking();
            },
            triggerUpdate: function () {
                // cancel any pending view updates execution
                cancelScheduleViewUpdate();
                triggerViewUpdate();
            },
            updateTimings: function (newTimings) {
                timings = newTimings;
                if (newTimings.loadEvent !== undefined) {
                    setLoadEvent(newTimings.loadEvent);
                }
            },
            addTiming: function (name, time) {
                var relativeTime = looksLikeRelativeTime(time) ? time : elapsed(startClocks.timeStamp, time);
                customTimings[sanitizeTiming(name)] = relativeTime;
            },
        };
    }
    /**
     * Timing name is used as facet path that must contain only letters, digits, or the characters - _ . @ $
     */
    function sanitizeTiming(name) {
        var sanitized = name.replace(/[^a-zA-Z0-9-_.@$]/g, '_');
        if (sanitized !== name) {
            display.warn("Invalid timing name: ".concat(name, ", sanitized to: ").concat(sanitized));
        }
        return sanitized;
    }
    function areDifferentLocation(currentLocation, otherLocation) {
        return (currentLocation.pathname !== otherLocation.pathname ||
            (!isHashAnAnchor(otherLocation.hash) &&
                getPathFromHash(otherLocation.hash) !== getPathFromHash(currentLocation.hash)));
    }
    function isHashAnAnchor(hash) {
        var correspondingId = hash.substr(1);
        return !!document.getElementById(correspondingId);
    }
    function getPathFromHash(hash) {
        var index = hash.indexOf('?');
        return index < 0 ? hash : hash.slice(0, index);
    }

    function startViewCollection(lifeCycle, configuration, location, domMutationObservable, locationChangeObservable, foregroundContexts, recorderApi, initialViewOptions) {
        lifeCycle.subscribe(3 /* VIEW_UPDATED */, function (view) {
            return lifeCycle.notify(10 /* RAW_RUM_EVENT_COLLECTED */, processViewUpdate(view, foregroundContexts, recorderApi));
        });
        return trackViews(location, lifeCycle, domMutationObservable, configuration, locationChangeObservable, !configuration.trackViewsManually, initialViewOptions);
    }
    function processViewUpdate(view, foregroundContexts, recorderApi) {
        var replayStats = recorderApi.getReplayStats(view.id);
        var viewEvent = {
            _dd: {
                document_version: view.documentVersion,
                replay_stats: replayStats,
            },
            date: view.startClocks.timeStamp,
            type: "view" /* VIEW */,
            view: {
                action: {
                    count: view.eventCounts.actionCount,
                },
                frustration: {
                    count: view.eventCounts.frustrationCount,
                },
                cumulative_layout_shift: view.cumulativeLayoutShift,
                first_byte: toServerDuration(view.timings.firstByte),
                dom_complete: toServerDuration(view.timings.domComplete),
                dom_content_loaded: toServerDuration(view.timings.domContentLoaded),
                dom_interactive: toServerDuration(view.timings.domInteractive),
                error: {
                    count: view.eventCounts.errorCount,
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
                    count: view.eventCounts.longTaskCount,
                },
                resource: {
                    count: view.eventCounts.resourceCount,
                },
                time_spent: toServerDuration(view.duration),
                in_foreground_periods: foregroundContexts.selectInForegroundPeriodsFor(view.startClocks.relative, view.duration),
            },
            session: {
                has_replay: replayStats ? true : undefined,
            },
        };
        if (!isEmptyObject(view.customTimings)) {
            viewEvent.view.custom_timings = mapValues(view.customTimings, toServerDuration);
        }
        return {
            rawRumEvent: viewEvent,
            startTime: view.startClocks.relative,
            domainContext: {
                location: view.location,
            },
        };
    }
    function discardNegativeDuration(duration) {
        return isNumber(duration) && duration < 0 ? undefined : duration;
    }

    var RUM_SESSION_KEY = 'rum';
    function startRumSessionManager(configuration, lifeCycle) {
        var sessionManager = startSessionManager(configuration.cookieOptions, RUM_SESSION_KEY, function (rawTrackingType) {
            return computeSessionState(configuration, rawTrackingType);
        });
        sessionManager.expireObservable.subscribe(function () {
            lifeCycle.notify(7 /* SESSION_EXPIRED */);
        });
        sessionManager.renewObservable.subscribe(function () {
            lifeCycle.notify(8 /* SESSION_RENEWED */);
        });
        return {
            findTrackedSession: function (startTime) {
                var session = sessionManager.findActiveSession(startTime);
                if (!session || !isTypeTracked(session.trackingType)) {
                    return;
                }
                var plan = session.trackingType === "1" /* TRACKED_WITH_SESSION_REPLAY */
                    ? 2 /* WITH_SESSION_REPLAY */
                    : 1 /* WITHOUT_SESSION_REPLAY */;
                return {
                    id: session.id,
                    plan: plan,
                    sessionReplayAllowed: plan === 2 /* WITH_SESSION_REPLAY */,
                    longTaskAllowed: configuration.trackLongTasks !== undefined
                        ? configuration.trackLongTasks
                        : configuration.oldPlansBehavior && plan === 2 /* WITH_SESSION_REPLAY */,
                    resourceAllowed: configuration.trackResources !== undefined
                        ? configuration.trackResources
                        : configuration.oldPlansBehavior && plan === 2 /* WITH_SESSION_REPLAY */,
                };
            },
        };
    }
    /**
     * Start a tracked replay session stub
     */
    function startRumSessionManagerStub() {
        var session = {
            id: '00000000-aaaa-0000-aaaa-000000000000',
            plan: 1 /* WITHOUT_SESSION_REPLAY */,
            sessionReplayAllowed: false,
            longTaskAllowed: true,
            resourceAllowed: true,
        };
        return {
            findTrackedSession: function () { return session; },
        };
    }
    function computeSessionState(configuration, rawTrackingType) {
        var trackingType;
        if (hasValidRumSession(rawTrackingType)) {
            trackingType = rawTrackingType;
        }
        else if (!performDraw(configuration.sampleRate)) {
            trackingType = "0" /* NOT_TRACKED */;
        }
        else if (!performDraw(configuration.sessionReplaySampleRate)) {
            trackingType = "2" /* TRACKED_WITHOUT_SESSION_REPLAY */;
        }
        else {
            trackingType = "1" /* TRACKED_WITH_SESSION_REPLAY */;
        }
        return {
            trackingType: trackingType,
            isTracked: isTypeTracked(trackingType),
        };
    }
    function hasValidRumSession(trackingType) {
        return (trackingType === "0" /* NOT_TRACKED */ ||
            trackingType === "1" /* TRACKED_WITH_SESSION_REPLAY */ ||
            trackingType === "2" /* TRACKED_WITHOUT_SESSION_REPLAY */);
    }
    function isTypeTracked(rumSessionType) {
        return (rumSessionType === "2" /* TRACKED_WITHOUT_SESSION_REPLAY */ ||
            rumSessionType === "1" /* TRACKED_WITH_SESSION_REPLAY */);
    }

    function startRumBatch(configuration, lifeCycle, telemetryEventObservable, reportError) {
        var batch = makeRumBatch(configuration, lifeCycle, reportError);
        lifeCycle.subscribe(11 /* RUM_EVENT_COLLECTED */, function (serverRumEvent) {
            if (serverRumEvent.type === "view" /* VIEW */) {
                batch.upsert(serverRumEvent, serverRumEvent.view.id);
            }
            else {
                batch.add(serverRumEvent);
            }
        });
        telemetryEventObservable.subscribe(function (event) { return batch.add(event, isTelemetryReplicationAllowed(configuration)); });
    }
    function makeRumBatch(configuration, lifeCycle, reportError) {
        var primaryBatch = createRumBatch(configuration.rumEndpointBuilder, true, function () {
            return lifeCycle.notify(9 /* BEFORE_UNLOAD */);
        });
        var replicaBatch;
        var replica = configuration.replica;
        if (replica !== undefined) {
            replicaBatch = createRumBatch(replica.rumEndpointBuilder, false);
        }
        function createRumBatch(endpointBuilder, toPrimaryEndpoint, unloadCallback) {
            return new Batch(createHttpRequest(endpointBuilder, configuration.batchBytesLimit, reportError, toPrimaryEndpoint), configuration.batchMessagesLimit, configuration.batchBytesLimit, configuration.messageBytesLimit, configuration.flushTimeout, unloadCallback);
        }
        function withReplicaApplicationId(message) {
            return combine(message, { application: { id: replica.applicationId } });
        }
        return {
            add: function (message, replicated) {
                if (replicated === void 0) { replicated = true; }
                primaryBatch.add(message);
                if (replicaBatch && replicated) {
                    replicaBatch.add(withReplicaApplicationId(message));
                }
            },
            upsert: function (message, key) {
                primaryBatch.upsert(message, key);
                if (replicaBatch) {
                    replicaBatch.upsert(withReplicaApplicationId(message), key);
                }
            },
        };
    }

    function startRumEventBridge(lifeCycle) {
        var bridge = getEventBridge();
        lifeCycle.subscribe(11 /* RUM_EVENT_COLLECTED */, function (serverRumEvent) {
            bridge.send('rum', serverRumEvent);
        });
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
        lifeCycle.subscribe(4 /* VIEW_ENDED */, function (_a) {
            var endClocks = _a.endClocks;
            urlContextHistory.closeActive(endClocks.relative);
        });
        lifeCycle.subscribe(2 /* VIEW_CREATED */, function (_a) {
            var startClocks = _a.startClocks;
            var viewUrl = location.href;
            urlContextHistory.add(buildUrlContext({
                url: viewUrl,
                referrer: !previousViewUrl ? document.referrer : previousViewUrl,
            }), startClocks.relative);
            previousViewUrl = viewUrl;
        });
        var locationChangeSubscription = locationChangeObservable.subscribe(function (_a) {
            var newLocation = _a.newLocation;
            var current = urlContextHistory.find();
            if (current) {
                var changeTime = relativeNow();
                urlContextHistory.closeActive(changeTime);
                urlContextHistory.add(buildUrlContext({
                    url: newLocation.href,
                    referrer: current.referrer,
                }), changeTime);
            }
        });
        function buildUrlContext(_a) {
            var url = _a.url, referrer = _a.referrer;
            return {
                url: url,
                referrer: referrer,
            };
        }
        return {
            findUrl: function (startTime) { return urlContextHistory.find(startTime); },
            stop: function () {
                locationChangeSubscription.unsubscribe();
                urlContextHistory.stop();
            },
        };
    }

    function createLocationChangeObservable(location) {
        var currentLocation = shallowClone(location);
        var observable = new Observable(function () {
            var stopHistoryTracking = trackHistory(onLocationChange).stop;
            var stopHashTracking = trackHash(onLocationChange).stop;
            return function () {
                stopHistoryTracking();
                stopHashTracking();
            };
        });
        function onLocationChange() {
            if (currentLocation.href === location.href) {
                return;
            }
            var newLocation = shallowClone(location);
            observable.notify({
                newLocation: newLocation,
                oldLocation: currentLocation,
            });
            currentLocation = newLocation;
        }
        return observable;
    }
    function trackHistory(onHistoryChange) {
        var stopInstrumentingPushState = instrumentMethodAndCallOriginal(history, 'pushState', {
            after: onHistoryChange,
        }).stop;
        var stopInstrumentingReplaceState = instrumentMethodAndCallOriginal(history, 'replaceState', {
            after: onHistoryChange,
        }).stop;
        var removeListener = addEventListener(window, "popstate" /* POP_STATE */, onHistoryChange).stop;
        return {
            stop: function () {
                stopInstrumentingPushState();
                stopInstrumentingReplaceState();
                removeListener();
            },
        };
    }
    function trackHash(onHashChange) {
        return addEventListener(window, "hashchange" /* HASH_CHANGE */, onHashChange);
    }

    function startRum(configuration, getCommonContext, recorderApi, initialViewOptions) {
        var lifeCycle = new LifeCycle();
        var telemetry = startRumTelemetry(configuration);
        telemetry.setContextProvider(function () {
            var _a, _b;
            return ({
                application: {
                    id: configuration.applicationId,
                },
                session: {
                    id: (_a = session.findTrackedSession()) === null || _a === void 0 ? void 0 : _a.id,
                },
                view: {
                    id: (_b = viewContexts.findView()) === null || _b === void 0 ? void 0 : _b.id,
                },
                action: {
                    id: actionContexts.findActionId(),
                },
            });
        });
        var reportError = function (error) {
            lifeCycle.notify(12 /* RAW_ERROR_COLLECTED */, { error: error });
        };
        if (!canUseEventBridge()) {
            startRumBatch(configuration, lifeCycle, telemetry.observable, reportError);
        }
        else {
            startRumEventBridge(lifeCycle);
        }
        var session = !canUseEventBridge() ? startRumSessionManager(configuration, lifeCycle) : startRumSessionManagerStub();
        var domMutationObservable = createDOMMutationObservable();
        var locationChangeObservable = createLocationChangeObservable(location);
        var _a = startRumEventCollection(lifeCycle, configuration, location, session, locationChangeObservable, domMutationObservable, getCommonContext, reportError), viewContexts = _a.viewContexts, foregroundContexts = _a.foregroundContexts, urlContexts = _a.urlContexts, actionContexts = _a.actionContexts, addAction = _a.addAction;
        startLongTaskCollection(lifeCycle, session);
        startResourceCollection(lifeCycle, configuration, session);
        var _b = startViewCollection(lifeCycle, configuration, location, domMutationObservable, locationChangeObservable, foregroundContexts, recorderApi, initialViewOptions), addTiming = _b.addTiming, startView = _b.startView;
        var addError = startErrorCollection(lifeCycle, foregroundContexts).addError;
        startRequestCollection(lifeCycle, configuration, session);
        startPerformanceCollection(lifeCycle, configuration);
        var internalContext = startInternalContext(configuration.applicationId, session, viewContexts, actionContexts, urlContexts);
        return {
            addAction: addAction,
            addError: addError,
            addTiming: addTiming,
            startView: startView,
            lifeCycle: lifeCycle,
            viewContexts: viewContexts,
            session: session,
            getInternalContext: internalContext.get,
        };
    }
    function startRumTelemetry(configuration) {
        var telemetry = startTelemetry(configuration);
        if (canUseEventBridge()) {
            var bridge_1 = getEventBridge();
            telemetry.observable.subscribe(function (event) { return bridge_1.send('internal_telemetry', event); });
        }
        return telemetry;
    }
    function startRumEventCollection(lifeCycle, configuration, location, sessionManager, locationChangeObservable, domMutationObservable, getCommonContext, reportError) {
        var viewContexts = startViewContexts(lifeCycle);
        var urlContexts = startUrlContexts(lifeCycle, locationChangeObservable, location);
        var foregroundContexts = startForegroundContexts();
        var _a = startActionCollection(lifeCycle, domMutationObservable, configuration, foregroundContexts), addAction = _a.addAction, actionContexts = _a.actionContexts;
        startRumAssembly(configuration, lifeCycle, sessionManager, viewContexts, urlContexts, actionContexts, getCommonContext, reportError);
        return {
            viewContexts: viewContexts,
            foregroundContexts: foregroundContexts,
            urlContexts: urlContexts,
            addAction: addAction,
            actionContexts: actionContexts,
            stop: function () {
                viewContexts.stop();
                foregroundContexts.stop();
            },
        };
    }

    var RecordType = {
        FullSnapshot: 2,
        IncrementalSnapshot: 3,
        Meta: 4,
        Focus: 6,
        ViewEnd: 7,
        VisualViewport: 8,
        FrustrationRecord: 9,
    };
    var NodeType = {
        Document: 0,
        DocumentType: 1,
        Element: 2,
        Text: 3,
        CDATA: 4,
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
        StyleSheetRule: 8,
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
        TouchEnd: 9,
    };
    var MediaInteractionType = {
        Play: 0,
        Pause: 1,
    };

    var NodePrivacyLevel = {
        IGNORE: 'ignore',
        HIDDEN: 'hidden',
        ALLOW: DefaultPrivacyLevel.ALLOW,
        MASK: DefaultPrivacyLevel.MASK,
        MASK_USER_INPUT: DefaultPrivacyLevel.MASK_USER_INPUT,
    };
    var PRIVACY_ATTR_NAME = 'data-dd-privacy';
    // Privacy Attrs
    var PRIVACY_ATTR_VALUE_ALLOW = 'allow';
    var PRIVACY_ATTR_VALUE_MASK = 'mask';
    var PRIVACY_ATTR_VALUE_MASK_USER_INPUT = 'mask-user-input';
    var PRIVACY_ATTR_VALUE_HIDDEN = 'hidden';
    // Privacy Classes - not all customers can set plain HTML attributes, so support classes too
    var PRIVACY_CLASS_ALLOW = 'dd-privacy-allow';
    var PRIVACY_CLASS_MASK = 'dd-privacy-mask';
    var PRIVACY_CLASS_MASK_USER_INPUT = 'dd-privacy-mask-user-input';
    var PRIVACY_CLASS_HIDDEN = 'dd-privacy-hidden';
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
        OPTGROUP: true,
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
        var parentNodePrivacyLevel = node.parentNode
            ? getNodePrivacyLevel(node.parentNode, defaultPrivacyLevel)
            : defaultPrivacyLevel;
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
        if (!isElement(node)) {
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
    function isElement(node) {
        return node.nodeType === node.ELEMENT_NODE;
    }
    function isTextNode(node) {
        return node.nodeType === node.TEXT_NODE;
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
    var censorText = function (text) { return text.replace(/\S/g, TEXT_MASKING_CHAR); };
    function getTextContent(textNode, ignoreWhiteSpace, parentNodePrivacyLevel) {
        var _a;
        // The parent node may not be a html element which has a tagName attribute.
        // So just let it be undefined which is ok in this use case.
        var parentTagName = (_a = textNode.parentElement) === null || _a === void 0 ? void 0 : _a.tagName;
        var textContent = textNode.textContent || '';
        if (ignoreWhiteSpace && !textContent.trim()) {
            return;
        }
        var nodePrivacyLevel = parentNodePrivacyLevel;
        var isStyle = parentTagName === 'STYLE' ? true : undefined;
        var isScript = parentTagName === 'SCRIPT';
        if (isScript) {
            // For perf reasons, we don't record script (heuristic)
            textContent = CENSORED_STRING_MARK;
        }
        else if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) {
            // Should never occur, but just in case, we set to CENSORED_MARK.
            textContent = CENSORED_STRING_MARK;
        }
        else if (shouldMaskNode(textNode, nodePrivacyLevel) &&
            // Style tags are `overruled` (Use `hide` to enforce privacy)
            !isStyle) {
            if (
            // Scrambling the child list breaks text nodes for DATALIST/SELECT/OPTGROUP
            parentTagName === 'DATALIST' ||
                parentTagName === 'SELECT' ||
                parentTagName === 'OPTGROUP') {
                if (!textContent.trim()) {
                    return;
                }
            }
            else if (parentTagName === 'OPTION') {
                // <Option> has low entropy in charset + text length, so use `CENSORED_STRING_MARK` when masked
                textContent = CENSORED_STRING_MARK;
            }
            else {
                textContent = censorText(textContent);
            }
        }
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
            // Scripts
            (relAttribute === 'preload' && getLowerCaseAttribute('as') === 'script') ||
                // Favicons
                relAttribute === 'shortcut icon' ||
                relAttribute === 'icon');
        }
        if (element.nodeName === 'META') {
            var nameAttribute = getLowerCaseAttribute('name');
            var relAttribute = getLowerCaseAttribute('rel');
            var propertyAttribute = getLowerCaseAttribute('property');
            return (
            // Favicons
            /^msapplication-tile(image|color)$/.test(nameAttribute) ||
                nameAttribute === 'application-name' ||
                relAttribute === 'icon' ||
                relAttribute === 'apple-touch-icon' ||
                relAttribute === 'shortcut icon' ||
                // Description
                nameAttribute === 'keywords' ||
                nameAttribute === 'description' ||
                // Social
                /^(og|twitter|fb):/.test(propertyAttribute) ||
                /^(og|twitter):/.test(nameAttribute) ||
                nameAttribute === 'pinterest' ||
                // Robots
                nameAttribute === 'robots' ||
                nameAttribute === 'googlebot' ||
                nameAttribute === 'bingbot' ||
                // Http headers. Ex: X-UA-Compatible, Content-Type, Content-Language, cache-control,
                // X-Translated-By
                element.hasAttribute('http-equiv') ||
                // Authorship
                nameAttribute === 'author' ||
                nameAttribute === 'generator' ||
                nameAttribute === 'framework' ||
                nameAttribute === 'publisher' ||
                nameAttribute === 'progid' ||
                /^article:/.test(propertyAttribute) ||
                /^product:/.test(propertyAttribute) ||
                // Verification
                nameAttribute === 'google-site-verification' ||
                nameAttribute === 'yandex-verification' ||
                nameAttribute === 'csrf-token' ||
                nameAttribute === 'p:domain_verify' ||
                nameAttribute === 'verify-v1' ||
                nameAttribute === 'verification' ||
                nameAttribute === 'shopify-checkout-api-token');
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
            if (!hasSerializedNode(current)) {
                return false;
            }
            current = current.parentNode;
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
            if (tagName === 'INPUT' && (type === 'button' || type === 'submit' || type === 'reset')) {
                // Overrule `MASK` privacy level for button-like element values, as they are used during replay
                // to display their label. They can still be hidden via the "hidden" privacy attribute or class name.
                return value;
            }
            else if (!value || tagName === 'OPTION') {
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

    function isTouchEvent(event) {
        return Boolean(event.changedTouches);
    }
    function forEach(list, callback) {
        Array.prototype.forEach.call(list, callback);
    }
    function assembleIncrementalSnapshot(source, data) {
        return {
            data: assign({
                source: source,
            }, data),
            type: RecordType.IncrementalSnapshot,
            timestamp: timeStampNow(),
        };
    }
    function getPathToNestedCSSRule(rule) {
        var path = [];
        var currentRule = rule;
        while (currentRule.parentRule) {
            var rules_1 = Array.from(currentRule.parentRule.cssRules);
            var index_1 = rules_1.indexOf(currentRule);
            path.unshift(index_1);
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

    function serializeDocument(document, configuration, serializationContext) {
        // We are sure that Documents are never ignored, so this function never returns null
        return serializeNodeWithId(document, {
            serializationContext: serializationContext,
            parentNodePrivacyLevel: configuration.defaultPrivacyLevel,
            configuration: configuration,
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
        };
    }
    function serializeDocumentTypeNode(documentType) {
        return {
            type: NodeType.DocumentType,
            name: documentType.name,
            publicId: documentType.publicId,
            systemId: documentType.systemId,
        };
    }
    /**
     * Serializing Element nodes involves capturing:
     * 1. HTML ATTRIBUTES:
     * 2. JS STATE:
     * - scroll offsets
     * - Form fields (input value, checkbox checked, otpion selection, range)
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
        var _a;
        var tagName = getValidTagName(element.tagName);
        var isSVG = isSVGElement(element) || undefined;
        // For performance reason, we don't use getNodePrivacyLevel directly: we leverage the
        // parentNodePrivacyLevel option to avoid iterating over all parents
        var nodePrivacyLevel = reducePrivacyLevel(getNodeSelfPrivacyLevel(element), options.parentNodePrivacyLevel);
        if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) {
            var _b = element.getBoundingClientRect(), width = _b.width, height = _b.height;
            return {
                type: NodeType.Element,
                tagName: tagName,
                attributes: (_a = {
                        rr_width: "".concat(width, "px"),
                        rr_height: "".concat(height, "px")
                    },
                    _a[PRIVACY_ATTR_NAME] = PRIVACY_ATTR_VALUE_HIDDEN,
                    _a),
                childNodes: [],
                isSVG: isSVG,
            };
        }
        // Ignore Elements like Script and some Link, Metas
        if (nodePrivacyLevel === NodePrivacyLevel.IGNORE) {
            return;
        }
        var attributes = getAttributesForPrivacyLevel(element, nodePrivacyLevel, options);
        var childNodes = [];
        if (element.childNodes.length) {
            // OBJECT POOLING OPTIMIZATION:
            // We should not create a new object systematically as it could impact performances. Try to reuse
            // the same object as much as possible, and clone it only if we need to.
            var childNodesSerializationOptions = void 0;
            if (options.parentNodePrivacyLevel === nodePrivacyLevel && options.ignoreWhiteSpace === (tagName === 'head')) {
                childNodesSerializationOptions = options;
            }
            else {
                childNodesSerializationOptions = assign({}, options, {
                    parentNodePrivacyLevel: nodePrivacyLevel,
                    ignoreWhiteSpace: tagName === 'head',
                });
            }
            childNodes = serializeChildNodes(element, childNodesSerializationOptions);
        }
        return {
            type: NodeType.Element,
            tagName: tagName,
            attributes: attributes,
            childNodes: childNodes,
            isSVG: isSVG,
        };
    }
    /**
     * Text Nodes are dependant on Element nodes
     * Privacy levels are set on elements so we check the parentElement of a text node
     * for privacy level.
     */
    function serializeTextNode(textNode, options) {
        var _a;
        // The parent node may not be a html element which has a tagName attribute.
        // So just let it be undefined which is ok in this use case.
        var parentTagName = (_a = textNode.parentElement) === null || _a === void 0 ? void 0 : _a.tagName;
        var textContent = getTextContent(textNode, options.ignoreWhiteSpace || false, options.parentNodePrivacyLevel);
        if (!textContent) {
            return;
        }
        return {
            type: NodeType.Text,
            textContent: textContent,
            isStyle: parentTagName === 'STYLE' ? true : undefined,
        };
    }
    function serializeCDataNode() {
        return {
            type: NodeType.CDATA,
            textContent: '',
        };
    }
    function serializeChildNodes(node, options) {
        var result = [];
        forEach(node.childNodes, function (childNode) {
            var serializedChildNode = serializeNodeWithId(childNode, options);
            if (serializedChildNode) {
                result.push(serializedChildNode);
            }
        });
        return result;
    }
    function serializeAttribute(element, nodePrivacyLevel, attributeName, configuration) {
        if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) {
            // dup condition for direct access case
            return null;
        }
        var attributeValue = element.getAttribute(attributeName);
        if (nodePrivacyLevel === NodePrivacyLevel.MASK &&
            attributeName !== PRIVACY_ATTR_NAME &&
            attributeName !== DEFAULT_PROGRAMMATIC_ACTION_NAME_ATTRIBUTE &&
            attributeName !== configuration.actionNameAttribute) {
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
        var processedTagName = tagName.toLowerCase().trim();
        if (TAG_NAME_REGEX.test(processedTagName)) {
            // if the tag name is odd and we cannot extract
            // anything from the string, then we return a
            // generic div
            return 'div';
        }
        return processedTagName;
    }
    function getCssRulesString(s) {
        try {
            var rules = s.rules || s.cssRules;
            return rules ? Array.from(rules).map(getCssRuleString).join('') : null;
        }
        catch (error) {
            return null;
        }
    }
    function getCssRuleString(rule) {
        return isCSSImportRule(rule) ? getCssRulesString(rule.styleSheet) || '' : rule.cssText;
    }
    function isCSSImportRule(rule) {
        return 'styleSheet' in rule;
    }
    function isSVGElement(el) {
        return el.tagName === 'svg' || el instanceof SVGElement;
    }
    function getAttributesForPrivacyLevel(element, nodePrivacyLevel, options) {
        var _a;
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
                safeAttrs[attributeName] = attributeValue;
            }
        }
        if (element.value &&
            (tagName === 'textarea' || tagName === 'select' || tagName === 'option' || tagName === 'input')) {
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
            var stylesheet = Array.from(doc.styleSheets).find(function (s) { return s.href === element.href; });
            var cssText = getCssRulesString(stylesheet);
            if (cssText && stylesheet) {
                delete safeAttrs.rel;
                delete safeAttrs.href;
                safeAttrs._cssText = cssText;
            }
        }
        // dynamic stylesheet
        if (tagName === 'style' &&
            element.sheet &&
            // TODO: Currently we only try to get dynamic stylesheet when it is an empty style element
            !(element.innerText || element.textContent || '').trim().length) {
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
            }
            else if (shouldMaskNode(inputElement, nodePrivacyLevel)) {
                safeAttrs.checked = CENSORED_STRING_MARK;
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
            case 0 /* INITIAL_FULL_SNAPSHOT */:
                scrollTop = Math.round(element.scrollTop);
                scrollLeft = Math.round(element.scrollLeft);
                if (scrollTop || scrollLeft) {
                    serializationContext.elementsScrollPositions.set(element, { scrollTop: scrollTop, scrollLeft: scrollLeft });
                }
                break;
            case 1 /* SUBSEQUENT_FULL_SNAPSHOT */:
                if (serializationContext.elementsScrollPositions.has(element)) {
                    (_a = serializationContext.elementsScrollPositions.get(element), scrollTop = _a.scrollTop, scrollLeft = _a.scrollLeft);
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
            addMutations: function (mutations) {
                if (pendingMutations.length === 0) {
                    cancelScheduledFlush = requestIdleCallback(flush, { timeout: MUTATION_PROCESS_MAX_DELAY });
                }
                pendingMutations.push.apply(pendingMutations, mutations);
            },
            flush: flush,
            stop: function () {
                cancelScheduledFlush();
            },
        };
    }

    /**
     * Buffers and aggregate mutations generated by a MutationObserver into MutationPayload
     */
    function startMutationObserver(controller, mutationCallback, configuration) {
        var MutationObserver = getMutationObserverConstructor();
        if (!MutationObserver) {
            return { stop: noop };
        }
        var mutationBatch = createMutationBatch(function (mutations) {
            processMutations(mutations.concat(observer.takeRecords()), mutationCallback, configuration);
        });
        var observer = new MutationObserver(monitor(mutationBatch.addMutations));
        observer.observe(document, {
            attributeOldValue: true,
            attributes: true,
            characterData: true,
            characterDataOldValue: true,
            childList: true,
            subtree: true,
        });
        controller.onFlush(mutationBatch.flush);
        return {
            stop: function () {
                observer.disconnect();
                mutationBatch.stop();
            },
        };
    }
    /**
     * Controls how mutations are processed, allowing to flush pending mutations.
     */
    var MutationController = /** @class */ (function () {
        function MutationController() {
        }
        MutationController.prototype.flush = function () {
            var _a;
            (_a = this.flushListener) === null || _a === void 0 ? void 0 : _a.call(this);
        };
        MutationController.prototype.onFlush = function (listener) {
            this.flushListener = listener;
        };
        return MutationController;
    }());
    function processMutations(mutations, mutationCallback, configuration) {
        // Discard any mutation with a 'target' node that:
        // * isn't injected in the current document or isn't known/serialized yet: those nodes are likely
        // part of a mutation occurring in a parent Node
        // * should be hidden or ignored
        var filteredMutations = mutations.filter(function (mutation) {
            return document.contains(mutation.target) &&
                nodeAndAncestorsHaveSerializedNode(mutation.target) &&
                getNodePrivacyLevel(mutation.target, configuration.defaultPrivacyLevel) !== NodePrivacyLevel.HIDDEN;
        });
        var _a = processChildListMutations(filteredMutations.filter(function (mutation) { return mutation.type === 'childList'; }), configuration), adds = _a.adds, removes = _a.removes, hasBeenSerialized = _a.hasBeenSerialized;
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
            attributes: attributes,
        });
    }
    function processChildListMutations(mutations, configuration) {
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
        var _loop_1 = function (mutation) {
            forEach(mutation.addedNodes, function (node) {
                addedAndMovedNodes.add(node);
            });
            forEach(mutation.removedNodes, function (node) {
                if (!addedAndMovedNodes.has(node)) {
                    removedNodes.set(node, mutation.target);
                }
                addedAndMovedNodes.delete(node);
            });
        };
        for (var _i = 0, mutations_1 = mutations; _i < mutations_1.length; _i++) {
            var mutation = mutations_1[_i];
            _loop_1(mutation);
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
        var sortedAddedAndMovedNodes = Array.from(addedAndMovedNodes);
        sortAddedAndMovedNodes(sortedAddedAndMovedNodes);
        // Then, we iterate over our sorted node sets to emit mutations. We collect the newly serialized
        // node ids in a set to be able to skip subsequent related mutations.
        var serializedNodeIds = new Set();
        var addedNodeMutations = [];
        for (var _a = 0, sortedAddedAndMovedNodes_1 = sortedAddedAndMovedNodes; _a < sortedAddedAndMovedNodes_1.length; _a++) {
            var node = sortedAddedAndMovedNodes_1[_a];
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
                serializationContext: { status: 2 /* MUTATION */ },
                configuration: configuration,
            });
            if (!serializedNode) {
                continue;
            }
            addedNodeMutations.push({
                nextId: getNextSibling(node),
                parentId: getSerializedNodeId(node.parentNode),
                node: serializedNode,
            });
        }
        // Finally, we emit remove mutations.
        var removedNodeMutations = [];
        removedNodes.forEach(function (parent, node) {
            if (hasSerializedNode(node)) {
                removedNodeMutations.push({
                    parentId: getSerializedNodeId(parent),
                    id: getSerializedNodeId(node),
                });
            }
        });
        return { adds: addedNodeMutations, removes: removedNodeMutations, hasBeenSerialized: hasBeenSerialized };
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
        var _a;
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
        for (var _i = 0, filteredMutations_1 = filteredMutations; _i < filteredMutations_1.length; _i++) {
            var mutation = filteredMutations_1[_i];
            var value = mutation.target.textContent;
            if (value === mutation.oldValue) {
                continue;
            }
            var parentNodePrivacyLevel = getNodePrivacyLevel(mutation.target.parentNode, configuration.defaultPrivacyLevel);
            if (parentNodePrivacyLevel === NodePrivacyLevel.HIDDEN || parentNodePrivacyLevel === NodePrivacyLevel.IGNORE) {
                continue;
            }
            textMutations.push({
                id: getSerializedNodeId(mutation.target),
                // TODO: pass a valid "ignoreWhiteSpace" argument
                value: (_a = getTextContent(mutation.target, false, parentNodePrivacyLevel)) !== null && _a !== void 0 ? _a : null,
            });
        }
        return textMutations;
    }
    function processAttributesMutations(mutations, configuration) {
        var attributeMutations = [];
        // Deduplicate mutations based on their target node and changed attribute
        var handledElements = new Map();
        var filteredMutations = mutations.filter(function (mutation) {
            var handledAttributes = handledElements.get(mutation.target);
            if (handledAttributes === null || handledAttributes === void 0 ? void 0 : handledAttributes.has(mutation.attributeName)) {
                return false;
            }
            if (!handledAttributes) {
                handledElements.set(mutation.target, new Set([mutation.attributeName]));
            }
            else {
                handledAttributes.add(mutation.attributeName);
            }
            return true;
        });
        // Emit mutations
        var emittedMutations = new Map();
        for (var _i = 0, filteredMutations_2 = filteredMutations; _i < filteredMutations_2.length; _i++) {
            var mutation = filteredMutations_2[_i];
            var uncensoredValue = mutation.target.getAttribute(mutation.attributeName);
            if (uncensoredValue === mutation.oldValue) {
                continue;
            }
            var privacyLevel = getNodePrivacyLevel(mutation.target, configuration.defaultPrivacyLevel);
            var attributeValue = serializeAttribute(mutation.target, privacyLevel, mutation.attributeName, configuration);
            var transformedValue = void 0;
            if (mutation.attributeName === 'value') {
                var inputValue = getElementInputValue(mutation.target, privacyLevel);
                if (inputValue === undefined) {
                    continue;
                }
                transformedValue = inputValue;
            }
            else if (typeof attributeValue === 'string') {
                transformedValue = attributeValue;
            }
            else {
                transformedValue = null;
            }
            var emittedMutation = emittedMutations.get(mutation.target);
            if (!emittedMutation) {
                emittedMutation = {
                    id: getSerializedNodeId(mutation.target),
                    attributes: {},
                };
                attributeMutations.push(emittedMutation);
                emittedMutations.set(mutation.target, emittedMutation);
            }
            emittedMutation.attributes[mutation.attributeName] = transformedValue;
        }
        return attributeMutations;
    }
    function sortAddedAndMovedNodes(nodes) {
        nodes.sort(function (a, b) {
            var position = a.compareDocumentPosition(b);
            /* eslint-disable no-bitwise */
            if (position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                return -1;
            }
            else if (position & Node.DOCUMENT_POSITION_CONTAINS) {
                return 1;
            }
            else if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
                return 1;
            }
            else if (position & Node.DOCUMENT_POSITION_PRECEDING) {
                return -1;
            }
            /* eslint-enable no-bitwise */
            return 0;
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
        return (Math.abs(visual.pageTop - visual.offsetTop - window.scrollY) > TOLERANCE ||
            Math.abs(visual.pageLeft - visual.offsetLeft - window.scrollX) > TOLERANCE);
    }
    var convertMouseEventToLayoutCoordinates = function (clientX, clientY) {
        var visual = window.visualViewport;
        var normalised = {
            layoutViewportX: clientX,
            layoutViewportY: clientY,
            visualViewportX: clientX,
            visualViewportY: clientY,
        };
        if (!visual) {
            // On old browsers, we cannot normalise, so fallback to clientX/Y
            return normalised;
        }
        else if (isVisualViewportFactoredIn()) {
            // Typically Mobile Devices
            normalised.layoutViewportX = Math.round(clientX + visual.offsetLeft);
            normalised.layoutViewportY = Math.round(clientY + visual.offsetTop);
        }
        else {
            // Typically Desktop Devices
            normalised.visualViewportX = Math.round(clientX - visual.offsetLeft);
            normalised.visualViewportY = Math.round(clientY - visual.offsetTop);
        }
        return normalised;
    };
    var getVisualViewport = function () {
        var visual = window.visualViewport;
        return {
            scale: visual.scale,
            offsetLeft: visual.offsetLeft,
            offsetTop: visual.offsetTop,
            pageLeft: visual.pageLeft,
            pageTop: visual.pageTop,
            height: visual.height,
            width: visual.width,
        };
    };
    function getScrollX() {
        var scrollX;
        var visual = window.visualViewport;
        if (visual) {
            scrollX = visual.pageLeft - visual.offsetLeft;
        }
        else if (window.scrollX !== undefined) {
            scrollX = window.scrollX;
        }
        else {
            scrollX = window.pageXOffset || 0;
        }
        return Math.round(scrollX);
    }
    function getScrollY() {
        var scrollY;
        var visual = window.visualViewport;
        if (visual) {
            scrollY = visual.pageTop - visual.offsetTop;
        }
        else if (window.scrollY !== undefined) {
            scrollY = window.scrollY;
        }
        else {
            scrollY = window.pageYOffset || 0;
        }
        return Math.round(scrollY);
    }

    var _a;
    var MOUSE_MOVE_OBSERVER_THRESHOLD = 50;
    var SCROLL_OBSERVER_THRESHOLD = 100;
    var VISUAL_VIEWPORT_OBSERVER_THRESHOLD = 200;
    var recordIds = new WeakMap();
    var nextId$1 = 1;
    function getRecordIdForEvent(event) {
        if (!recordIds.has(event)) {
            recordIds.set(event, nextId$1++);
        }
        return recordIds.get(event);
    }
    function initObservers(o) {
        var mutationHandler = initMutationObserver(o.mutationController, o.mutationCb, o.configuration);
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
        return function () {
            mutationHandler();
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
        };
    }
    function initMutationObserver(mutationController, cb, configuration) {
        return startMutationObserver(mutationController, cb, configuration).stop;
    }
    function initMoveObserver(cb) {
        var updatePosition = throttle(monitor(function (event) {
            var target = event.target;
            if (hasSerializedNode(target)) {
                var _a = isTouchEvent(event) ? event.changedTouches[0] : event, clientX = _a.clientX, clientY = _a.clientY;
                var position = {
                    id: getSerializedNodeId(target),
                    timeOffset: 0,
                    x: clientX,
                    y: clientY,
                };
                if (window.visualViewport) {
                    var _b = convertMouseEventToLayoutCoordinates(clientX, clientY), visualViewportX = _b.visualViewportX, visualViewportY = _b.visualViewportY;
                    position.x = visualViewportX;
                    position.y = visualViewportY;
                }
                cb([position], isTouchEvent(event) ? IncrementalSource.TouchMove : IncrementalSource.MouseMove);
            }
        }), MOUSE_MOVE_OBSERVER_THRESHOLD, {
            trailing: false,
        }).throttled;
        return addEventListeners(document, ["mousemove" /* MOUSE_MOVE */, "touchmove" /* TOUCH_MOVE */], updatePosition, {
            capture: true,
            passive: true,
        }).stop;
    }
    var eventTypeToMouseInteraction = (_a = {},
        _a["mouseup" /* MOUSE_UP */] = MouseInteractionType.MouseUp,
        _a["mousedown" /* MOUSE_DOWN */] = MouseInteractionType.MouseDown,
        _a["click" /* CLICK */] = MouseInteractionType.Click,
        _a["contextmenu" /* CONTEXT_MENU */] = MouseInteractionType.ContextMenu,
        _a["dblclick" /* DBL_CLICK */] = MouseInteractionType.DblClick,
        _a["focus" /* FOCUS */] = MouseInteractionType.Focus,
        _a["blur" /* BLUR */] = MouseInteractionType.Blur,
        _a["touchstart" /* TOUCH_START */] = MouseInteractionType.TouchStart,
        _a["touchend" /* TOUCH_END */] = MouseInteractionType.TouchEnd,
        _a);
    function initMouseInteractionObserver(cb, defaultPrivacyLevel) {
        var handler = function (event) {
            var target = event.target;
            if (getNodePrivacyLevel(target, defaultPrivacyLevel) === NodePrivacyLevel.HIDDEN || !hasSerializedNode(target)) {
                return;
            }
            var _a = isTouchEvent(event) ? event.changedTouches[0] : event, clientX = _a.clientX, clientY = _a.clientY;
            var position = {
                id: getSerializedNodeId(target),
                type: eventTypeToMouseInteraction[event.type],
                x: clientX,
                y: clientY,
            };
            if (window.visualViewport) {
                var _b = convertMouseEventToLayoutCoordinates(clientX, clientY), visualViewportX = _b.visualViewportX, visualViewportY = _b.visualViewportY;
                position.x = visualViewportX;
                position.y = visualViewportY;
            }
            var record = assign({ id: getRecordIdForEvent(event) }, assembleIncrementalSnapshot(IncrementalSource.MouseInteraction, position));
            cb(record);
        };
        return addEventListeners(document, Object.keys(eventTypeToMouseInteraction), handler, {
            capture: true,
            passive: true,
        }).stop;
    }
    function initScrollObserver(cb, defaultPrivacyLevel, elementsScrollPositions) {
        var updatePosition = throttle(monitor(function (event) {
            var target = event.target;
            if (!target ||
                getNodePrivacyLevel(target, defaultPrivacyLevel) === NodePrivacyLevel.HIDDEN ||
                !hasSerializedNode(target)) {
                return;
            }
            var id = getSerializedNodeId(target);
            var scrollPositions = target === document
                ? {
                    scrollTop: getScrollY(),
                    scrollLeft: getScrollX(),
                }
                : {
                    scrollTop: Math.round(target.scrollTop),
                    scrollLeft: Math.round(target.scrollLeft),
                };
            elementsScrollPositions.set(target, scrollPositions);
            cb({
                id: id,
                x: scrollPositions.scrollLeft,
                y: scrollPositions.scrollTop,
            });
        }), SCROLL_OBSERVER_THRESHOLD).throttled;
        return addEventListener(document, "scroll" /* SCROLL */, updatePosition, { capture: true, passive: true }).stop;
    }
    function initViewportResizeObserver(cb) {
        return initViewportObservable().subscribe(cb).unsubscribe;
    }
    function initInputObserver(cb, defaultPrivacyLevel) {
        var lastInputStateMap = new WeakMap();
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
                inputState = { isChecked: target.checked };
            }
            else {
                var value = getElementInputValue(target, nodePrivacyLevel);
                if (value === undefined) {
                    return;
                }
                inputState = { text: value };
            }
            // Can be multiple changes on the same node within the same batched mutation observation.
            cbWithDedup(target, inputState);
            // If a radio was checked, other radios with the same name attribute will be unchecked.
            var name = target.name;
            if (type === 'radio' && name && target.checked) {
                forEach(document.querySelectorAll("input[type=\"radio\"][name=\"".concat(name, "\"]")), function (el) {
                    if (el !== target) {
                        // TODO: Consider the privacy implications for various differing input privacy levels
                        cbWithDedup(el, { isChecked: false });
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
            if (!lastInputState ||
                lastInputState.text !== inputState.text ||
                lastInputState.isChecked !== inputState.isChecked) {
                lastInputStateMap.set(target, inputState);
                cb(assign({
                    id: getSerializedNodeId(target),
                }, inputState));
            }
        }
        var stopEventListeners = addEventListeners(document, ["input" /* INPUT */, "change" /* CHANGE */], function (event) {
            if (event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement ||
                event.target instanceof HTMLSelectElement) {
                onElementChange(event.target);
            }
        }, {
            capture: true,
            passive: true,
        }).stop;
        var instrumentationStoppers = [
            instrumentSetter(HTMLInputElement.prototype, 'value', onElementChange),
            instrumentSetter(HTMLInputElement.prototype, 'checked', onElementChange),
            instrumentSetter(HTMLSelectElement.prototype, 'value', onElementChange),
            instrumentSetter(HTMLTextAreaElement.prototype, 'value', onElementChange),
            instrumentSetter(HTMLSelectElement.prototype, 'selectedIndex', onElementChange),
        ];
        return function () {
            instrumentationStoppers.forEach(function (stopper) { return stopper.stop(); });
            stopEventListeners();
        };
    }
    function initStyleSheetObserver(cb) {
        function checkStyleSheetAndCallback(styleSheet, callback) {
            if (styleSheet && hasSerializedNode(styleSheet.ownerNode)) {
                callback(getSerializedNodeId(styleSheet.ownerNode));
            }
        }
        var instrumentationStoppers = [
            instrumentMethodAndCallOriginal(CSSStyleSheet.prototype, 'insertRule', {
                before: function (rule, index) {
                    checkStyleSheetAndCallback(this, function (id) { return cb({ id: id, adds: [{ rule: rule, index: index }] }); });
                },
            }),
            instrumentMethodAndCallOriginal(CSSStyleSheet.prototype, 'deleteRule', {
                before: function (index) {
                    checkStyleSheetAndCallback(this, function (id) { return cb({ id: id, removes: [{ index: index }] }); });
                },
            }),
        ];
        if (typeof CSSGroupingRule !== 'undefined') {
            instrumentGroupingCSSRuleClass(CSSGroupingRule);
        }
        else {
            instrumentGroupingCSSRuleClass(CSSMediaRule);
            instrumentGroupingCSSRuleClass(CSSSupportsRule);
        }
        function instrumentGroupingCSSRuleClass(cls) {
            instrumentationStoppers.push(instrumentMethodAndCallOriginal(cls.prototype, 'insertRule', {
                before: function (rule, index) {
                    var _this = this;
                    checkStyleSheetAndCallback(this.parentStyleSheet, function (id) {
                        var path = getPathToNestedCSSRule(_this);
                        if (path) {
                            path.push(index || 0);
                            cb({ id: id, adds: [{ rule: rule, index: path }] });
                        }
                    });
                },
            }), instrumentMethodAndCallOriginal(cls.prototype, 'deleteRule', {
                before: function (index) {
                    var _this = this;
                    checkStyleSheetAndCallback(this.parentStyleSheet, function (id) {
                        var path = getPathToNestedCSSRule(_this);
                        if (path) {
                            path.push(index);
                            cb({ id: id, removes: [{ index: path }] });
                        }
                    });
                },
            }));
        }
        return function () { return instrumentationStoppers.forEach(function (stopper) { return stopper.stop(); }); };
    }
    function initMediaInteractionObserver(mediaInteractionCb, defaultPrivacyLevel) {
        var handler = function (event) {
            var target = event.target;
            if (!target ||
                getNodePrivacyLevel(target, defaultPrivacyLevel) === NodePrivacyLevel.HIDDEN ||
                !hasSerializedNode(target)) {
                return;
            }
            mediaInteractionCb({
                id: getSerializedNodeId(target),
                type: event.type === "play" /* PLAY */ ? MediaInteractionType.Play : MediaInteractionType.Pause,
            });
        };
        return addEventListeners(document, ["play" /* PLAY */, "pause" /* PAUSE */], handler, { capture: true, passive: true }).stop;
    }
    function initFocusObserver(focusCb) {
        return addEventListeners(window, ["focus" /* FOCUS */, "blur" /* BLUR */], function () {
            focusCb({ has_focus: document.hasFocus() });
        }).stop;
    }
    function initVisualViewportResizeObserver(cb) {
        if (!window.visualViewport) {
            return noop;
        }
        var _a = throttle(monitor(function () {
            cb(getVisualViewport());
        }), VISUAL_VIEWPORT_OBSERVER_THRESHOLD, {
            trailing: false,
        }), updateDimension = _a.throttled, cancelThrottle = _a.cancel;
        var removeListener = addEventListeners(window.visualViewport, ["resize" /* RESIZE */, "scroll" /* SCROLL */], updateDimension, {
            capture: true,
            passive: true,
        }).stop;
        return function stop() {
            removeListener();
            cancelThrottle();
        };
    }
    function initFrustrationObserver(lifeCycle, frustrationCb) {
        return lifeCycle.subscribe(10 /* RAW_RUM_EVENT_COLLECTED */, function (data) {
            var _a, _b, _c;
            if (data.rawRumEvent.type === "action" /* ACTION */ &&
                data.rawRumEvent.action.type === "click" /* CLICK */ &&
                ((_b = (_a = data.rawRumEvent.action.frustration) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.length) &&
                'events' in data.domainContext &&
                ((_c = data.domainContext.events) === null || _c === void 0 ? void 0 : _c.length)) {
                frustrationCb({
                    timestamp: data.rawRumEvent.date,
                    type: RecordType.FrustrationRecord,
                    data: {
                        frustrationTypes: data.rawRumEvent.action.frustration.type,
                        recordIds: data.domainContext.events.map(function (e) { return getRecordIdForEvent(e); }),
                    },
                });
            }
        }).unsubscribe;
    }

    function createElementsScrollPositions() {
        var scrollPositionsByElement = new WeakMap();
        return {
            set: function (element, scrollPositions) {
                if (element === document && !document.scrollingElement) {
                    // cf https://drafts.csswg.org/cssom-view/#dom-document-scrollingelement,
                    // in some cases scrolling elements can not be defined, we don't support those for now
                    return;
                }
                scrollPositionsByElement.set(element === document ? document.scrollingElement : element, scrollPositions);
            },
            get: function (element) {
                return scrollPositionsByElement.get(element);
            },
            has: function (element) {
                return scrollPositionsByElement.has(element);
            },
        };
    }

    function record(options) {
        var emit = options.emit;
        // runtime checks for user options
        if (!emit) {
            throw new Error('emit function is required');
        }
        var mutationController = new MutationController();
        var elementsScrollPositions = createElementsScrollPositions();
        var takeFullSnapshot = function (timestamp, serializationContext) {
            if (timestamp === void 0) { timestamp = timeStampNow(); }
            if (serializationContext === void 0) { serializationContext = { status: 0 /* INITIAL_FULL_SNAPSHOT */, elementsScrollPositions: elementsScrollPositions }; }
            mutationController.flush(); // process any pending mutation before taking a full snapshot
            var _a = getViewportDimension(), width = _a.width, height = _a.height;
            emit({
                data: {
                    height: height,
                    href: window.location.href,
                    width: width,
                },
                type: RecordType.Meta,
                timestamp: timestamp,
            });
            emit({
                data: {
                    has_focus: document.hasFocus(),
                },
                type: RecordType.Focus,
                timestamp: timestamp,
            });
            emit({
                data: {
                    node: serializeDocument(document, options.configuration, serializationContext),
                    initialOffset: {
                        left: getScrollX(),
                        top: getScrollY(),
                    },
                },
                type: RecordType.FullSnapshot,
                timestamp: timestamp,
            });
            if (window.visualViewport) {
                emit({
                    data: getVisualViewport(),
                    type: RecordType.VisualViewport,
                    timestamp: timestamp,
                });
            }
        };
        takeFullSnapshot();
        var stopObservers = initObservers({
            lifeCycle: options.lifeCycle,
            configuration: options.configuration,
            mutationController: mutationController,
            elementsScrollPositions: elementsScrollPositions,
            inputCb: function (v) { return emit(assembleIncrementalSnapshot(IncrementalSource.Input, v)); },
            mediaInteractionCb: function (p) {
                return emit(assembleIncrementalSnapshot(IncrementalSource.MediaInteraction, p));
            },
            mouseInteractionCb: function (mouseInteractionRecord) { return emit(mouseInteractionRecord); },
            mousemoveCb: function (positions, source) { return emit(assembleIncrementalSnapshot(source, { positions: positions })); },
            mutationCb: function (m) { return emit(assembleIncrementalSnapshot(IncrementalSource.Mutation, m)); },
            scrollCb: function (p) { return emit(assembleIncrementalSnapshot(IncrementalSource.Scroll, p)); },
            styleSheetCb: function (r) { return emit(assembleIncrementalSnapshot(IncrementalSource.StyleSheetRule, r)); },
            viewportResizeCb: function (d) { return emit(assembleIncrementalSnapshot(IncrementalSource.ViewportResize, d)); },
            frustrationCb: function (frustrationRecord) { return emit(frustrationRecord); },
            focusCb: function (data) {
                return emit({
                    data: data,
                    type: RecordType.Focus,
                    timestamp: timeStampNow(),
                });
            },
            visualViewportResizeCb: function (data) {
                emit({
                    data: data,
                    type: RecordType.VisualViewport,
                    timestamp: timeStampNow(),
                });
            },
        });
        return {
            stop: stopObservers,
            takeSubsequentFullSnapshot: function (timestamp) {
                return takeFullSnapshot(timestamp, {
                    status: 1 /* SUBSEQUENT_FULL_SNAPSHOT */,
                    elementsScrollPositions: elementsScrollPositions,
                });
            },
            flushMutations: function () { return mutationController.flush(); },
        };
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
        return statsPerView === null || statsPerView === void 0 ? void 0 : statsPerView.get(viewId);
    }
    function getOrCreateReplayStats(viewId) {
        if (!statsPerView) {
            statsPerView = new Map();
        }
        var replayStats;
        if (statsPerView.has(viewId)) {
            replayStats = statsPerView.get(viewId);
        }
        else {
            replayStats = {
                records_count: 0,
                segments_count: 0,
                segments_total_raw_size: 0,
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
            statsPerView.delete(statsPerView.keys().next().value);
        }
        else {
            // IE11 doesn't support map.keys
            var isFirst_1 = true;
            statsPerView.forEach(function (_value, key) {
                if (isFirst_1) {
                    statsPerView.delete(key);
                    isFirst_1 = false;
                }
            });
        }
    }

    var nextId = 0;
    var Segment = /** @class */ (function () {
        function Segment(worker, context, creationReason, initialRecord, onWrote, onFlushed) {
            var _this = this;
            this.worker = worker;
            this.isFlushed = false;
            this.id = nextId++;
            var viewId = context.view.id;
            this.metadata = assign({
                start: initialRecord.timestamp,
                end: initialRecord.timestamp,
                creation_reason: creationReason,
                records_count: 1,
                has_full_snapshot: initialRecord.type === RecordType.FullSnapshot,
                index_in_view: getSegmentsCount(viewId),
                source: 'browser',
            }, context);
            addSegment(viewId);
            addRecord(viewId);
            var listener = monitor(function (_a) {
                var data = _a.data;
                if (data.type === 'errored' || data.type === 'initialized') {
                    return;
                }
                if (data.id === _this.id) {
                    addWroteData(viewId, data.additionalBytesCount);
                    if (data.type === 'flushed') {
                        onFlushed(data.result, data.rawBytesCount);
                        worker.removeEventListener('message', listener);
                    }
                    else {
                        onWrote(data.compressedBytesCount);
                    }
                }
                else if (data.id > _this.id) {
                    // Messages should be received in the same order as they are sent, so if we receive a
                    // message with an id superior to this Segment instance id, we know that another, more
                    // recent Segment instance is being used.
                    //
                    // In theory, a "flush" response should have been received at this point, so the listener
                    // should already have been removed. But if something goes wrong and we didn't receive a
                    // "flush" response, remove the listener to avoid any leak, and send a monitor message to
                    // help investigate the issue.
                    worker.removeEventListener('message', listener);
                    addTelemetryDebug("Segment did not receive a 'flush' response before being replaced.");
                }
            });
            worker.addEventListener('message', listener);
            this.worker.postMessage({ data: "{\"records\":[".concat(JSON.stringify(initialRecord)), id: this.id, action: 'write' });
        }
        Segment.prototype.addRecord = function (record) {
            var _a;
            this.metadata.start = Math.min(this.metadata.start, record.timestamp);
            this.metadata.end = Math.max(this.metadata.end, record.timestamp);
            this.metadata.records_count += 1;
            addRecord(this.metadata.view.id);
            (_a = this.metadata).has_full_snapshot || (_a.has_full_snapshot = record.type === RecordType.FullSnapshot);
            this.worker.postMessage({ data: ",".concat(JSON.stringify(record)), id: this.id, action: 'write' });
        };
        Segment.prototype.flush = function () {
            this.worker.postMessage({
                data: "],".concat(JSON.stringify(this.metadata).slice(1), "\n"),
                id: this.id,
                action: 'flush',
            });
            this.isFlushed = true;
        };
        return Segment;
    }());

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
    function startSegmentCollection(lifeCycle, applicationId, sessionManager, viewContexts, send, worker) {
        return doStartSegmentCollection(lifeCycle, function () { return computeSegmentContext(applicationId, sessionManager, viewContexts); }, send, worker);
    }
    function doStartSegmentCollection(lifeCycle, getSegmentContext, send, worker, emitter) {
        if (emitter === void 0) { emitter = window; }
        var state = {
            status: 0 /* WaitingForInitialRecord */,
            nextSegmentCreationReason: 'init',
        };
        var unsubscribeViewCreated = lifeCycle.subscribe(2 /* VIEW_CREATED */, function () {
            flushSegment('view_change');
        }).unsubscribe;
        var unsubscribeBeforeUnload = lifeCycle.subscribe(9 /* BEFORE_UNLOAD */, function () {
            flushSegment('before_unload');
        }).unsubscribe;
        var unsubscribeVisibilityChange = addEventListener(emitter, "visibilitychange" /* VISIBILITY_CHANGE */, function () {
            if (document.visibilityState === 'hidden') {
                flushSegment('visibility_hidden');
            }
        }, { capture: true }).stop;
        function flushSegment(nextSegmentCreationReason) {
            if (state.status === 1 /* SegmentPending */) {
                state.segment.flush();
                clearTimeout(state.expirationTimeoutId);
            }
            if (nextSegmentCreationReason) {
                state = {
                    status: 0 /* WaitingForInitialRecord */,
                    nextSegmentCreationReason: nextSegmentCreationReason,
                };
            }
            else {
                state = {
                    status: 2 /* Stopped */,
                };
            }
        }
        function createNewSegment(creationReason, initialRecord) {
            var context = getSegmentContext();
            if (!context) {
                return;
            }
            var segment = new Segment(worker, context, creationReason, initialRecord, function (compressedSegmentBytesCount) {
                if (!segment.isFlushed && compressedSegmentBytesCount > SEGMENT_BYTES_LIMIT) {
                    flushSegment('segment_bytes_limit');
                }
            }, function (data, rawSegmentBytesCount) {
                send(data, segment.metadata, rawSegmentBytesCount);
            });
            state = {
                status: 1 /* SegmentPending */,
                segment: segment,
                expirationTimeoutId: setTimeout(monitor(function () {
                    flushSegment('segment_duration_limit');
                }), SEGMENT_DURATION_LIMIT),
            };
        }
        return {
            addRecord: function (record) {
                switch (state.status) {
                    case 0 /* WaitingForInitialRecord */:
                        createNewSegment(state.nextSegmentCreationReason, record);
                        break;
                    case 1 /* SegmentPending */:
                        state.segment.addRecord(record);
                        break;
                }
            },
            stop: function () {
                flushSegment();
                unsubscribeViewCreated();
                unsubscribeBeforeUnload();
                unsubscribeVisibilityChange();
            },
        };
    }
    function computeSegmentContext(applicationId, sessionManager, viewContexts) {
        var session = sessionManager.findTrackedSession();
        var viewContext = viewContexts.findView();
        if (!session || !viewContext) {
            return undefined;
        }
        return {
            application: {
                id: applicationId,
            },
            session: {
                id: session.id,
            },
            view: {
                id: viewContext.id,
            },
        };
    }

    var workerURL;
    function createDeflateWorker() {
        // Lazily compute the worker URL to allow importing the SDK in NodeJS
        if (!workerURL) {
            workerURL = URL.createObjectURL(new Blob(["(".concat(workerCodeFn, ")(self)")]));
        }
        return new Worker(workerURL);
    }
    function workerCodeFn() {
        monitor(function () {
            var _a = makePakoDeflate(), Deflate = _a.Deflate, constants = _a.constants, string2buf = _a.string2buf;
            var deflate = new Deflate();
            var rawBytesCount = 0;
            self.addEventListener('message', monitor(function (event) {
                var data = event.data;
                switch (data.action) {
                    case 'init':
                        self.postMessage({
                            type: 'initialized',
                        });
                        break;
                    case 'write': {
                        var additionalBytesCount = pushData(data.data);
                        self.postMessage({
                            type: 'wrote',
                            id: data.id,
                            compressedBytesCount: deflate.chunks.reduce(function (total, chunk) { return total + chunk.length; }, 0),
                            additionalBytesCount: additionalBytesCount,
                        });
                        break;
                    }
                    case 'flush': {
                        var additionalBytesCount = data.data ? pushData(data.data) : 0;
                        deflate.push('', constants.Z_FINISH);
                        self.postMessage({
                            type: 'flushed',
                            id: data.id,
                            result: deflate.result,
                            additionalBytesCount: additionalBytesCount,
                            rawBytesCount: rawBytesCount,
                        });
                        deflate = new Deflate();
                        rawBytesCount = 0;
                        break;
                    }
                }
            }));
            function pushData(data) {
                // TextEncoder is not supported on old browser version like Edge 18, therefore we use string2buf
                var binaryData = string2buf(data);
                deflate.push(binaryData, constants.Z_SYNC_FLUSH);
                rawBytesCount += binaryData.length;
                return binaryData.length;
            }
        })();
        function monitor(fn) {
            return function () {
                try {
                    return fn.apply(this, arguments);
                }
                catch (e) {
                    try {
                        self.postMessage({
                            type: 'errored',
                            error: e,
                        });
                    }
                    catch (_) {
                        // DATA_CLONE_ERR, cf https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
                        self.postMessage({
                            type: 'errored',
                            error: "".concat(e),
                        });
                    }
                }
            };
        }
        // https://github.com/nodeca/pako/blob/034669ba0f1a4c0590e45f7c2820128200f972b3/dist/pako_deflate.es5.js
        function makePakoDeflate() {
            /* eslint-disable camelcase, no-bitwise */
            // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
            //
            // This software is provided 'as-is', without any express or implied
            // warranty. In no event will the authors be held liable for any damages
            // arising from the use of this software.
            //
            // Permission is granted to anyone to use this software for any purpose,
            // including commercial applications, and to alter it and redistribute it
            // freely, subject to the following restrictions:
            //
            // 1. The origin of this software must not be misrepresented; you must not
            //   claim that you wrote the original software. If you use this software
            //   in a product, an acknowledgment in the product documentation would be
            //   appreciated but is not required.
            // 2. Altered source versions must be plainly marked as such, and must not be
            //   misrepresented as being the original software.
            // 3. This notice may not be removed or altered from any source distribution.
            /* Public constants ========================================================== */
            /* =========================================================================== */
            // const Z_FILTERED          = 1;
            // const Z_HUFFMAN_ONLY      = 2;
            // const Z_RLE               = 3;
            var Z_FIXED = 4; // const Z_DEFAULT_STRATEGY  = 0;
            /* Possible values of the data_type field (though see inflate()) */
            var Z_BINARY = 0;
            var Z_TEXT = 1; // const Z_ASCII             = 1; // = Z_TEXT
            var Z_UNKNOWN = 2;
            /* ============================================================================ */
            function zero(buf) {
                var len = buf.length;
                while (--len >= 0) {
                    buf[len] = 0;
                }
            } // From zutil.h
            var STORED_BLOCK = 0;
            var STATIC_TREES = 1;
            var DYN_TREES = 2;
            /* The three kinds of block type */
            var MIN_MATCH = 3;
            var MAX_MATCH = 258;
            /* The minimum and maximum match lengths */
            // From deflate.h
            /* ===========================================================================
             * Internal compression state.
             */
            var LENGTH_CODES = 29;
            /* number of length codes, not counting the special END_BLOCK code */
            var LITERALS = 256;
            /* number of literal bytes 0..255 */
            var L_CODES = LITERALS + 1 + LENGTH_CODES;
            /* number of Literal or Length codes, including the END_BLOCK code */
            var D_CODES = 30;
            /* number of distance codes */
            var BL_CODES = 19;
            /* number of codes used to transfer the bit lengths */
            var HEAP_SIZE = 2 * L_CODES + 1;
            /* maximum heap size */
            var MAX_BITS = 15;
            /* All codes must not exceed MAX_BITS bits */
            var Buf_size = 16;
            /* size of bit buffer in bi_buf */
            /* ===========================================================================
             * Constants
             */
            var MAX_BL_BITS = 7;
            /* Bit length codes must not exceed MAX_BL_BITS bits */
            var END_BLOCK = 256;
            /* end of block literal code */
            var REP_3_6 = 16;
            /* repeat previous bit length 3-6 times (2 bits of repeat count) */
            var REPZ_3_10 = 17;
            /* repeat a zero length 3-10 times  (3 bits of repeat count) */
            var REPZ_11_138 = 18;
            /* repeat a zero length 11-138 times  (7 bits of repeat count) */
            var extra_lbits = 
            /* extra bits for each length code */
            new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]);
            var extra_dbits = 
            /* extra bits for each distance code */
            new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]);
            var extra_blbits = 
            /* extra bits for each bit length code */
            new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]);
            var bl_order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
            /* eslint-enable comma-spacing,array-bracket-spacing */
            /* The lengths of the bit length codes are sent in order of decreasing
             * probability, to avoid transmitting the lengths for unused bit length codes.
             */
            /* ===========================================================================
             * Local data. These are initialized only once.
             */
            // We pre-fill arrays with 0 to avoid uninitialized gaps
            var DIST_CODE_LEN = 512;
            /* see definition of array dist_code below */
            // !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1
            var static_ltree = new Array((L_CODES + 2) * 2);
            zero(static_ltree);
            /* The static literal tree. Since the bit lengths are imposed, there is no
             * need for the L_CODES extra codes used during heap construction. However
             * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
             * below).
             */
            var static_dtree = new Array(D_CODES * 2);
            zero(static_dtree);
            /* The static distance tree. (Actually a trivial tree since all codes use
             * 5 bits.)
             */
            var _dist_code = new Array(DIST_CODE_LEN);
            zero(_dist_code);
            /* Distance codes. The first 256 values correspond to the distances
             * 3 .. 258, the last 256 values correspond to the top 8 bits of
             * the 15 bit distances.
             */
            var _length_code = new Array(MAX_MATCH - MIN_MATCH + 1);
            zero(_length_code);
            /* length code for each normalized match length (0 == MIN_MATCH) */
            var base_length = new Array(LENGTH_CODES);
            zero(base_length);
            /* First normalized length for each code (0 = MIN_MATCH) */
            var base_dist = new Array(D_CODES);
            zero(base_dist);
            /* First normalized distance for each code (0 = distance of 1) */
            function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
                this.static_tree = static_tree;
                /* static tree or NULL */
                this.extra_bits = extra_bits;
                /* extra bits for each code or NULL */
                this.extra_base = extra_base;
                /* base index for extra_bits */
                this.elems = elems;
                /* max number of elements in the tree */
                this.max_length = max_length;
                /* max bit length for the codes */
                // show if `static_tree` has data or dummy - needed for monomorphic objects
                this.has_stree = static_tree && static_tree.length;
            }
            var static_l_desc;
            var static_d_desc;
            var static_bl_desc;
            function TreeDesc(dyn_tree, stat_desc) {
                this.dyn_tree = dyn_tree;
                /* the dynamic tree */
                this.max_code = 0;
                /* largest code with non zero frequency */
                this.stat_desc = stat_desc;
                /* the corresponding static tree */
            }
            var d_code = function d_code(dist) {
                return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
            };
            /* ===========================================================================
             * Output a short LSB first on the stream.
             * IN assertion: there is enough room in pendingBuf.
             */
            var put_short = function put_short(s, w) {
                //    put_byte(s, (uch)((w) & 0xff));
                //    put_byte(s, (uch)((ush)(w) >> 8));
                s.pending_buf[s.pending++] = w & 0xff;
                s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
            };
            /* ===========================================================================
             * Send a value on a given number of bits.
             * IN assertion: length <= 16 and value fits in length bits.
             */
            var send_bits = function send_bits(s, value, length) {
                if (s.bi_valid > Buf_size - length) {
                    s.bi_buf |= (value << s.bi_valid) & 0xffff;
                    put_short(s, s.bi_buf);
                    s.bi_buf = value >> (Buf_size - s.bi_valid);
                    s.bi_valid += length - Buf_size;
                }
                else {
                    s.bi_buf |= (value << s.bi_valid) & 0xffff;
                    s.bi_valid += length;
                }
            };
            var send_code = function send_code(s, c, tree) {
                send_bits(s, tree[c * 2], 
                /* .Code */
                tree[c * 2 + 1]
                /* .Len */
                );
            };
            /* ===========================================================================
             * Reverse the first len bits of a code, using straightforward code (a faster
             * method would use a table)
             * IN assertion: 1 <= len <= 15
             */
            var bi_reverse = function bi_reverse(code, len) {
                var res = 0;
                do {
                    res |= code & 1;
                    code >>>= 1;
                    res <<= 1;
                } while (--len > 0);
                return res >>> 1;
            };
            /* ===========================================================================
             * Flush the bit buffer, keeping at most 7 bits in it.
             */
            var bi_flush = function bi_flush(s) {
                if (s.bi_valid === 16) {
                    put_short(s, s.bi_buf);
                    s.bi_buf = 0;
                    s.bi_valid = 0;
                }
                else if (s.bi_valid >= 8) {
                    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
                    s.bi_buf >>= 8;
                    s.bi_valid -= 8;
                }
            };
            /* ===========================================================================
             * Compute the optimal bit lengths for a tree and update the total bit length
             * for the current block.
             * IN assertion: the fields freq and dad are set, heap[heap_max] and
             *    above are the tree nodes sorted by increasing frequency.
             * OUT assertions: the field len is set to the optimal bit length, the
             *     array bl_count contains the frequencies for each bit length.
             *     The length opt_len is updated; static_len is also updated if stree is
             *     not null.
             */
            var gen_bitlen = function gen_bitlen(s, desc //    deflate_state *s; //    tree_desc *desc;    /* the tree descriptor */
            ) {
                var tree = desc.dyn_tree;
                var max_code = desc.max_code;
                var stree = desc.stat_desc.static_tree;
                var has_stree = desc.stat_desc.has_stree;
                var extra = desc.stat_desc.extra_bits;
                var base = desc.stat_desc.extra_base;
                var max_length = desc.stat_desc.max_length;
                var h;
                /* heap index */
                var n;
                var m;
                /* iterate over the tree elements */
                var bits;
                /* bit length */
                var xbits;
                /* extra bits */
                var f;
                /* frequency */
                var overflow = 0;
                /* number of elements with bit length too large */
                for (bits = 0; bits <= MAX_BITS; bits++) {
                    s.bl_count[bits] = 0;
                }
                /* In a first pass, compute the optimal bit lengths (which may
                 * overflow in the case of the bit length tree).
                 */
                tree[s.heap[s.heap_max] * 2 + 1] =
                    /* .Len */
                    0;
                /* root of the heap */
                for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
                    n = s.heap[h];
                    bits =
                        tree[tree[n * 2 + 1] *
                            /* .Dad */
                            2 +
                            1] +
                            /* .Len */
                            1;
                    if (bits > max_length) {
                        bits = max_length;
                        overflow++;
                    }
                    tree[n * 2 + 1] =
                        /* .Len */
                        bits;
                    /* We overwrite tree[n].Dad which is no longer needed */
                    if (n > max_code) {
                        continue;
                    }
                    /* not a leaf node */
                    s.bl_count[bits]++;
                    xbits = 0;
                    if (n >= base) {
                        xbits = extra[n - base];
                    }
                    f = tree[n * 2];
                    /* .Freq */
                    s.opt_len += f * (bits + xbits);
                    if (has_stree) {
                        s.static_len +=
                            f *
                                (stree[n * 2 + 1] +
                                    /* .Len */
                                    xbits);
                    }
                }
                if (overflow === 0) {
                    return;
                } // Trace((stderr,"\nbit length overflow\n"));
                /* This happens for example on obj2 and pic of the Calgary corpus */
                /* Find the first bit length which could increase: */
                do {
                    bits = max_length - 1;
                    while (s.bl_count[bits] === 0) {
                        bits--;
                    }
                    s.bl_count[bits]--;
                    /* move one leaf down the tree */
                    s.bl_count[bits + 1] += 2;
                    /* move one overflow item as its brother */
                    s.bl_count[max_length]--;
                    /* The brother of the overflow item also moves one step up,
                     * but this does not affect bl_count[max_length]
                     */
                    overflow -= 2;
                } while (overflow > 0);
                /* Now recompute all bit lengths, scanning in increasing frequency.
                 * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
                 * lengths instead of fixing only the wrong ones. This idea is taken
                 * from 'ar' written by Haruhiko Okumura.)
                 */
                for (bits = max_length; bits !== 0; bits--) {
                    n = s.bl_count[bits];
                    while (n !== 0) {
                        m = s.heap[--h];
                        if (m > max_code) {
                            continue;
                        }
                        if (tree[m * 2 + 1] !==
                            /* .Len */
                            bits) {
                            // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
                            s.opt_len +=
                                (bits - tree[m * 2 + 1]) *
                                    /* .Len */
                                    tree[m * 2];
                            /* .Freq */
                            tree[m * 2 + 1] =
                                /* .Len */
                                bits;
                        }
                        n--;
                    }
                }
            };
            /* ===========================================================================
             * Generate the codes for a given tree and bit counts (which need not be
             * optimal).
             * IN assertion: the array bl_count contains the bit length statistics for
             * the given tree and the field len is set for all tree elements.
             * OUT assertion: the field code is set for all tree elements of non
             *     zero code length.
             */
            var gen_codes = function gen_codes(tree, max_code, bl_count
            //    ct_data *tree;             /* the tree to decorate */
            //    int max_code;              /* largest code with non zero frequency */
            //    ushf *bl_count;            /* number of codes at each bit length */
            ) {
                var next_code = new Array(MAX_BITS + 1);
                /* next code value for each bit length */
                var code = 0;
                /* running code value */
                var bits;
                /* bit index */
                var n;
                /* code index */
                /* The distribution counts are first used to generate the code values
                 * without bit reversal.
                 */
                for (bits = 1; bits <= MAX_BITS; bits++) {
                    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
                }
                /* Check that the bit counts in bl_count are consistent. The last code
                 * must be all ones.
                 */
                // Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
                //        "inconsistent bit counts");
                // Tracev((stderr,"\ngen_codes: max_code %d ", max_code));
                for (n = 0; n <= max_code; n++) {
                    var len = tree[n * 2 + 1];
                    /* .Len */
                    if (len === 0) {
                        continue;
                    }
                    /* Now reverse the bits */
                    tree[n * 2] =
                        /* .Code */
                        bi_reverse(next_code[len]++, len); // Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
                    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
                }
            };
            /* ===========================================================================
             * Initialize the various 'constant' tables.
             */
            var tr_static_init = function tr_static_init() {
                var n;
                /* iterates over tree elements */
                var bits;
                /* bit counter */
                var length;
                /* length value */
                var code;
                /* code value */
                var dist;
                /* distance index */
                var bl_count = new Array(MAX_BITS + 1);
                /* number of codes at each bit length for an optimal tree */
                // do check in _tr_init()
                // if (static_init_done) return;
                /* For some embedded targets, global variables are not initialized: */
                /* #ifdef NO_INIT_GLOBAL_POINTERS
                static_l_desc.static_tree = static_ltree;
                static_l_desc.extra_bits = extra_lbits;
                static_d_desc.static_tree = static_dtree;
                static_d_desc.extra_bits = extra_dbits;
                static_bl_desc.extra_bits = extra_blbits;
              #endif */
                /* Initialize the mapping length (0..255) -> length code (0..28) */
                length = 0;
                for (code = 0; code < LENGTH_CODES - 1; code++) {
                    base_length[code] = length;
                    for (n = 0; n < 1 << extra_lbits[code]; n++) {
                        _length_code[length++] = code;
                    }
                } // Assert (length == 256, "tr_static_init: length != 256");
                /* Note that the length 255 (match length 258) can be represented
                 * in two different ways: code 284 + 5 bits or code 285, so we
                 * overwrite length_code[255] to use the best encoding:
                 */
                _length_code[length - 1] = code;
                /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
                dist = 0;
                for (code = 0; code < 16; code++) {
                    base_dist[code] = dist;
                    for (n = 0; n < 1 << extra_dbits[code]; n++) {
                        _dist_code[dist++] = code;
                    }
                } // Assert (dist == 256, "tr_static_init: dist != 256");
                dist >>= 7;
                /* from now on, all distances are divided by 128 */
                for (; code < D_CODES; code++) {
                    base_dist[code] = dist << 7;
                    for (n = 0; n < 1 << (extra_dbits[code] - 7); n++) {
                        _dist_code[256 + dist++] = code;
                    }
                } // Assert (dist == 256, "tr_static_init: 256+dist != 512");
                /* Construct the codes of the static literal tree */
                for (bits = 0; bits <= MAX_BITS; bits++) {
                    bl_count[bits] = 0;
                }
                n = 0;
                while (n <= 143) {
                    static_ltree[n * 2 + 1] =
                        /* .Len */
                        8;
                    n++;
                    bl_count[8]++;
                }
                while (n <= 255) {
                    static_ltree[n * 2 + 1] =
                        /* .Len */
                        9;
                    n++;
                    bl_count[9]++;
                }
                while (n <= 279) {
                    static_ltree[n * 2 + 1] =
                        /* .Len */
                        7;
                    n++;
                    bl_count[7]++;
                }
                while (n <= 287) {
                    static_ltree[n * 2 + 1] =
                        /* .Len */
                        8;
                    n++;
                    bl_count[8]++;
                }
                /* Codes 286 and 287 do not exist, but we must include them in the
                 * tree construction to get a canonical Huffman tree (longest code
                 * all ones)
                 */
                gen_codes(static_ltree, L_CODES + 1, bl_count);
                /* The static distance tree is trivial: */
                for (n = 0; n < D_CODES; n++) {
                    static_dtree[n * 2 + 1] =
                        /* .Len */
                        5;
                    static_dtree[n * 2] =
                        /* .Code */
                        bi_reverse(n, 5);
                } // Now data ready and we can init static trees
                static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
                static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES, MAX_BITS);
                static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES, MAX_BL_BITS);
                // static_init_done = true;
            };
            /* ===========================================================================
             * Initialize a new block.
             */
            var init_block = function init_block(s) {
                var n;
                /* iterates over tree elements */
                /* Initialize the trees. */
                for (n = 0; n < L_CODES; n++) {
                    s.dyn_ltree[n * 2] =
                        /* .Freq */
                        0;
                }
                for (n = 0; n < D_CODES; n++) {
                    s.dyn_dtree[n * 2] =
                        /* .Freq */
                        0;
                }
                for (n = 0; n < BL_CODES; n++) {
                    s.bl_tree[n * 2] =
                        /* .Freq */
                        0;
                }
                s.dyn_ltree[END_BLOCK * 2] =
                    /* .Freq */
                    1;
                s.opt_len = s.static_len = 0;
                s.last_lit = s.matches = 0;
            };
            /* ===========================================================================
             * Flush the bit buffer and align the output on a byte boundary
             */
            var bi_windup = function bi_windup(s) {
                if (s.bi_valid > 8) {
                    put_short(s, s.bi_buf);
                }
                else if (s.bi_valid > 0) {
                    // put_byte(s, (Byte)s->bi_buf);
                    s.pending_buf[s.pending++] = s.bi_buf;
                }
                s.bi_buf = 0;
                s.bi_valid = 0;
            };
            /* ===========================================================================
             * Copy a stored block, storing first the length and its
             * one's complement if requested.
             */
            var copy_block = function copy_block(s, buf, len, header
            // DeflateState *s;
            // charf    *buf;    /* the input data */
            // unsigned len;     /* its length */
            // int      header;  /* true if block header must be written */
            ) {
                bi_windup(s);
                /* align on byte boundary */
                if (header) {
                    put_short(s, len);
                    put_short(s, ~len);
                }
                //  while (len--) {
                //    put_byte(s, *buf++);
                //  }
                s.pending_buf.set(s.window.subarray(buf, buf + len), s.pending);
                s.pending += len;
            };
            /* ===========================================================================
             * Compares to subtrees, using the tree depth as tie breaker when
             * the subtrees have equal frequency. This minimizes the worst case length.
             */
            var smaller = function smaller(tree, n, m, depth) {
                var _n2 = n * 2;
                var _m2 = m * 2;
                return (tree[_n2] <
                    /* .Freq */
                    tree[_m2] ||
                    /* .Freq */
                    (tree[_n2] ===
                        /* .Freq */
                        tree[_m2] &&
                        /* .Freq */
                        depth[n] <= depth[m]));
            };
            /* ===========================================================================
             * Restore the heap property by moving down the tree starting at node k,
             * exchanging a node with the smallest of its two sons if necessary, stopping
             * when the heap property is re-established (each father smaller than its
             * two sons).
             */
            var pqdownheap = function pqdownheap(s, tree, k
            //    deflate_state *s;
            //    ct_data *tree;  /* the tree to restore */
            //    int k;               /* node to move down */
            ) {
                var v = s.heap[k];
                var j = k << 1;
                /* left son of k */
                while (j <= s.heap_len) {
                    /* Set j to the smallest of the two sons: */
                    if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
                        j++;
                    }
                    /* Exit if v is smaller than both sons */
                    if (smaller(tree, v, s.heap[j], s.depth)) {
                        break;
                    }
                    /* Exchange v with the smallest son */
                    s.heap[k] = s.heap[j];
                    k = j;
                    /* And continue down the tree, setting j to the left son of k */
                    j <<= 1;
                }
                s.heap[k] = v;
            }; // inlined manually
            // const SMALLEST = 1;
            /* ===========================================================================
             * Send the block data compressed using the given Huffman trees
             */
            var compress_block = function compress_block(s, ltree, dtree
            //    deflate_state *s;
            //    const ct_data *ltree; /* literal tree */
            //    const ct_data *dtree; /* distance tree */
            ) {
                var dist;
                /* distance of matched string */
                var lc;
                /* match length or unmatched char (if dist == 0) */
                var lx = 0;
                /* running index in l_buf */
                var code;
                /* the code to send */
                var extra;
                /* number of extra bits to send */
                if (s.last_lit !== 0) {
                    do {
                        dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | s.pending_buf[s.d_buf + lx * 2 + 1];
                        lc = s.pending_buf[s.l_buf + lx];
                        lx++;
                        if (dist === 0) {
                            send_code(s, lc, ltree);
                            /* send a literal byte */
                            // Tracecv(isgraph(lc), (stderr," '%c' ", lc));
                        }
                        else {
                            /* Here, lc is the match length - MIN_MATCH */
                            code = _length_code[lc];
                            send_code(s, code + LITERALS + 1, ltree);
                            /* send the length code */
                            extra = extra_lbits[code];
                            if (extra !== 0) {
                                lc -= base_length[code];
                                send_bits(s, lc, extra);
                                /* send the extra length bits */
                            }
                            dist--;
                            /* dist is now the match distance - 1 */
                            code = d_code(dist); // Assert (code < D_CODES, "bad d_code");
                            send_code(s, code, dtree);
                            /* send the distance code */
                            extra = extra_dbits[code];
                            if (extra !== 0) {
                                dist -= base_dist[code];
                                send_bits(s, dist, extra);
                                /* send the extra distance bits */
                            }
                        }
                        /* literal or match pair ? */
                        /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
                        // Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
                        //       "pendingBuf overflow");
                    } while (lx < s.last_lit);
                }
                send_code(s, END_BLOCK, ltree);
            };
            /* ===========================================================================
             * Construct one Huffman tree and assigns the code bit strings and lengths.
             * Update the total bit length for the current block.
             * IN assertion: the field freq is set for all tree elements.
             * OUT assertions: the fields len and code are set to the optimal bit length
             *     and corresponding code. The length opt_len is updated; static_len is
             *     also updated if stree is not null. The field max_code is set.
             */
            var build_tree = function build_tree(s, desc //    deflate_state *s; //    tree_desc *desc; /* the tree descriptor */
            ) {
                var tree = desc.dyn_tree;
                var stree = desc.stat_desc.static_tree;
                var has_stree = desc.stat_desc.has_stree;
                var elems = desc.stat_desc.elems;
                var n;
                var m;
                /* iterate over heap elements */
                var max_code = -1;
                /* largest code with non zero frequency */
                var node;
                /* new node being created */
                /* Construct the initial heap, with least frequent element in
                 * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
                 * heap[0] is not used.
                 */
                s.heap_len = 0;
                s.heap_max = HEAP_SIZE;
                for (n = 0; n < elems; n++) {
                    if (tree[n * 2] !==
                        /* .Freq */
                        0) {
                        s.heap[++s.heap_len] = max_code = n;
                        s.depth[n] = 0;
                    }
                    else {
                        tree[n * 2 + 1] =
                            /* .Len */
                            0;
                    }
                }
                /* The pkzip format requires that at least one distance code exists,
                 * and that at least one bit should be sent even if there is only one
                 * possible code. So to avoid special checks later on we force at least
                 * two codes of non zero frequency.
                 */
                while (s.heap_len < 2) {
                    node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
                    tree[node * 2] =
                        /* .Freq */
                        1;
                    s.depth[node] = 0;
                    s.opt_len--;
                    if (has_stree) {
                        s.static_len -= stree[node * 2 + 1];
                        /* .Len */
                    }
                    /* node is 0 or 1 so it does not have extra bits */
                }
                desc.max_code = max_code;
                /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
                 * establish sub-heaps of increasing lengths:
                 */
                for (n = s.heap_len >> 1; 
                /* int /2 */
                n >= 1; n--) {
                    pqdownheap(s, tree, n);
                }
                /* Construct the Huffman tree by repeatedly combining the least two
                 * frequent nodes.
                 */
                node = elems;
                /* next internal node of the tree */
                do {
                    // pqremove(s, tree, n);  /* n = node of least frequency */
                    /** * pqremove ** */
                    n = s.heap[1];
                    /* SMALLEST */
                    s.heap[1] = s.heap[s.heap_len--];
                    /* SMALLEST */
                    pqdownheap(s, tree, 1
                    /* SMALLEST */
                    );
                    /***/
                    m = s.heap[1];
                    /* SMALLEST */
                    /* m = node of next least frequency */
                    s.heap[--s.heap_max] = n;
                    /* keep the nodes sorted by frequency */
                    s.heap[--s.heap_max] = m;
                    /* Create a new node father of n and m */
                    tree[node * 2] =
                        /* .Freq */
                        tree[n * 2] +
                            /* .Freq */
                            tree[m * 2];
                    /* .Freq */
                    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
                    tree[n * 2 + 1] =
                        /* .Dad */
                        tree[m * 2 + 1] =
                            /* .Dad */
                            node;
                    /* and insert the new node in the heap */
                    s.heap[1] = node++;
                    /* SMALLEST */
                    pqdownheap(s, tree, 1
                    /* SMALLEST */
                    );
                } while (s.heap_len >= 2);
                s.heap[--s.heap_max] = s.heap[1];
                /* SMALLEST */
                /* At this point, the fields freq and dad are set. We can now
                 * generate the bit lengths.
                 */
                gen_bitlen(s, desc);
                /* The field len is now set, we can generate the bit codes */
                gen_codes(tree, max_code, s.bl_count);
            };
            /* ===========================================================================
             * Scan a literal or distance tree to determine the frequencies of the codes
             * in the bit length tree.
             */
            var scan_tree = function scan_tree(s, tree, max_code
            //    deflate_state *s;
            //    ct_data *tree;   /* the tree to be scanned */
            //    int max_code;    /* and its largest code of non zero frequency */
            ) {
                var n;
                /* iterates over all tree elements */
                var prevlen = -1;
                /* last emitted length */
                var curlen;
                /* length of current code */
                var nextlen = tree[0 * 2 + 1];
                /* .Len */
                /* length of next code */
                var count = 0;
                /* repeat count of the current code */
                var max_count = 7;
                /* max repeat count */
                var min_count = 4;
                /* min repeat count */
                if (nextlen === 0) {
                    max_count = 138;
                    min_count = 3;
                }
                tree[(max_code + 1) * 2 + 1] =
                    /* .Len */
                    0xffff;
                /* guard */
                for (n = 0; n <= max_code; n++) {
                    curlen = nextlen;
                    nextlen = tree[(n + 1) * 2 + 1];
                    /* .Len */
                    if (++count < max_count && curlen === nextlen) {
                        continue;
                    }
                    else if (count < min_count) {
                        s.bl_tree[curlen * 2] +=
                            /* .Freq */
                            count;
                    }
                    else if (curlen !== 0) {
                        if (curlen !== prevlen) {
                            s.bl_tree[curlen * 2] /* .Freq */++;
                        }
                        s.bl_tree[REP_3_6 * 2] /* .Freq */++;
                    }
                    else if (count <= 10) {
                        s.bl_tree[REPZ_3_10 * 2] /* .Freq */++;
                    }
                    else {
                        s.bl_tree[REPZ_11_138 * 2] /* .Freq */++;
                    }
                    count = 0;
                    prevlen = curlen;
                    if (nextlen === 0) {
                        max_count = 138;
                        min_count = 3;
                    }
                    else if (curlen === nextlen) {
                        max_count = 6;
                        min_count = 3;
                    }
                    else {
                        max_count = 7;
                        min_count = 4;
                    }
                }
            };
            /* ===========================================================================
             * Send a literal or distance tree in compressed form, using the codes in
             * bl_tree.
             */
            var send_tree = function send_tree(s, tree, max_code
            //    deflate_state *s;
            //    ct_data *tree; /* the tree to be scanned */
            //    int max_code;       /* and its largest code of non zero frequency */
            ) {
                var n;
                /* iterates over all tree elements */
                var prevlen = -1;
                /* last emitted length */
                var curlen;
                /* length of current code */
                var nextlen = tree[0 * 2 + 1];
                /* .Len */
                /* length of next code */
                var count = 0;
                /* repeat count of the current code */
                var max_count = 7;
                /* max repeat count */
                var min_count = 4;
                /* min repeat count */
                /* tree[max_code+1].Len = -1; */
                /* guard already set */
                if (nextlen === 0) {
                    max_count = 138;
                    min_count = 3;
                }
                for (n = 0; n <= max_code; n++) {
                    curlen = nextlen;
                    nextlen = tree[(n + 1) * 2 + 1];
                    /* .Len */
                    if (++count < max_count && curlen === nextlen) {
                        continue;
                    }
                    else if (count < min_count) {
                        do {
                            send_code(s, curlen, s.bl_tree);
                        } while (--count !== 0);
                    }
                    else if (curlen !== 0) {
                        if (curlen !== prevlen) {
                            send_code(s, curlen, s.bl_tree);
                            count--;
                        } // Assert(count >= 3 && count <= 6, " 3_6?");
                        send_code(s, REP_3_6, s.bl_tree);
                        send_bits(s, count - 3, 2);
                    }
                    else if (count <= 10) {
                        send_code(s, REPZ_3_10, s.bl_tree);
                        send_bits(s, count - 3, 3);
                    }
                    else {
                        send_code(s, REPZ_11_138, s.bl_tree);
                        send_bits(s, count - 11, 7);
                    }
                    count = 0;
                    prevlen = curlen;
                    if (nextlen === 0) {
                        max_count = 138;
                        min_count = 3;
                    }
                    else if (curlen === nextlen) {
                        max_count = 6;
                        min_count = 3;
                    }
                    else {
                        max_count = 7;
                        min_count = 4;
                    }
                }
            };
            /* ===========================================================================
             * Construct the Huffman tree for the bit lengths and return the index in
             * bl_order of the last bit length code to send.
             */
            var build_bl_tree = function build_bl_tree(s) {
                var max_blindex;
                /* index of last bit length code of non zero freq */
                /* Determine the bit length frequencies for literal and distance trees */
                scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
                scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
                /* Build the bit length tree: */
                build_tree(s, s.bl_desc);
                /* opt_len now includes the length of the tree representations, except
                 * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
                 */
                /* Determine the number of bit length codes to send. The pkzip format
                 * requires that at least 4 bit length codes be sent. (appnote.txt says
                 * 3 but the actual value used is 4.)
                 */
                for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
                    if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !==
                        /* .Len */
                        0) {
                        break;
                    }
                }
                /* Update opt_len to include the bit length tree and counts */
                s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4; // Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
                //        s->opt_len, s->static_len));
                return max_blindex;
            };
            /* ===========================================================================
             * Send the header for a block using dynamic Huffman trees: the counts, the
             * lengths of the bit length codes, the literal tree and the distance tree.
             * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
             */
            var send_all_trees = function send_all_trees(s, lcodes, dcodes, blcodes //    deflate_state *s; //    int lcodes, dcodes, blcodes; /* number of codes for each tree */
            ) {
                var rank;
                /* index in bl_order */
                // Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
                // Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
                //        "too many codes");
                // Tracev((stderr, "\nbl counts: "));
                send_bits(s, lcodes - 257, 5);
                /* not +255 as stated in appnote.txt */
                send_bits(s, dcodes - 1, 5);
                send_bits(s, blcodes - 4, 4);
                /* not -3 as stated in appnote.txt */
                for (rank = 0; rank < blcodes; rank++) {
                    // Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
                    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1], 
                    /* .Len */
                    3);
                } // Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));
                send_tree(s, s.dyn_ltree, lcodes - 1);
                /* literal tree */
                // Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));
                send_tree(s, s.dyn_dtree, dcodes - 1);
                /* distance tree */
                // Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
            };
            /* ===========================================================================
             * Check if the data type is TEXT or BINARY, using the following algorithm:
             * - TEXT if the two conditions below are satisfied:
             *    a) There are no non-portable control characters belonging to the
             *       "black list" (0..6, 14..25, 28..31).
             *    b) There is at least one printable character belonging to the
             *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
             * - BINARY otherwise.
             * - The following partially-portable control characters form a
             *   "gray list" that is ignored in this detection algorithm:
             *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
             * IN assertion: the fields Freq of dyn_ltree are set.
             */
            var detect_data_type = function detect_data_type(s) {
                /* black_mask is the bit mask of black-listed bytes
                 * set bits 0..6, 14..25, and 28..31
                 * 0xf3ffc07f = binary 11110011111111111100000001111111
                 */
                var black_mask = 0xf3ffc07f;
                var n;
                /* Check for non-textual ("black-listed") bytes. */
                for (n = 0; n <= 31; n++, black_mask >>>= 1) {
                    if (black_mask & 1 &&
                        s.dyn_ltree[n * 2] !==
                            /* .Freq */
                            0) {
                        return Z_BINARY;
                    }
                }
                /* Check for textual ("white-listed") bytes. */
                if (s.dyn_ltree[9 * 2] !==
                    /* .Freq */
                    0 ||
                    s.dyn_ltree[10 * 2] !==
                        /* .Freq */
                        0 ||
                    s.dyn_ltree[13 * 2] !==
                        /* .Freq */
                        0) {
                    return Z_TEXT;
                }
                for (n = 32; n < LITERALS; n++) {
                    if (s.dyn_ltree[n * 2] !==
                        /* .Freq */
                        0) {
                        return Z_TEXT;
                    }
                }
                /* There are no "black-listed" or "white-listed" bytes:
                 * this stream either is empty or has tolerated ("gray-listed") bytes only.
                 */
                return Z_BINARY;
            };
            var static_init_done = false;
            /* ===========================================================================
             * Initialize the tree data structures for a new zlib stream.
             */
            var _tr_init = function _tr_init(s) {
                if (!static_init_done) {
                    tr_static_init();
                    static_init_done = true;
                }
                s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
                s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
                s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
                s.bi_buf = 0;
                s.bi_valid = 0;
                /* Initialize the first block of the first file: */
                init_block(s);
            };
            /* ===========================================================================
             * Send a stored block
             */
            var _tr_stored_block = function _tr_stored_block(s, buf, stored_len, last
            // DeflateState *s;
            // charf *buf;       /* input block */
            // ulg stored_len;   /* length of input block */
            // int last;         /* one if this is the last block for a file */
            ) {
                send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
                /* send block type */
                copy_block(s, buf, stored_len, true);
                /* with header */
            };
            /* ===========================================================================
             * Send one empty static block to give enough lookahead for inflate.
             * This takes 10 bits, of which 7 may remain in the bit buffer.
             */
            var _tr_align = function _tr_align(s) {
                send_bits(s, STATIC_TREES << 1, 3);
                send_code(s, END_BLOCK, static_ltree);
                bi_flush(s);
            };
            /* ===========================================================================
             * Determine the best encoding for the current block: dynamic trees, static
             * trees or store, and output the encoded block to the zip file.
             */
            var _tr_flush_block = function _tr_flush_block(s, buf, stored_len, last
            // DeflateState *s;
            // charf *buf;       /* input block, or NULL if too old */
            // ulg stored_len;   /* length of input block */
            // int last;         /* one if this is the last block for a file */
            ) {
                var opt_lenb;
                var static_lenb;
                /* opt_len and static_len in bytes */
                var max_blindex = 0;
                /* index of last bit length code of non zero freq */
                /* Build the Huffman trees unless a stored block is forced */
                if (s.level > 0) {
                    /* Check if the file is binary or text */
                    if (s.strm.data_type === Z_UNKNOWN) {
                        s.strm.data_type = detect_data_type(s);
                    }
                    /* Construct the literal and distance trees */
                    build_tree(s, s.l_desc); // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
                    //        s->static_len));
                    build_tree(s, s.d_desc); // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
                    //        s->static_len));
                    /* At this point, opt_len and static_len are the total bit lengths of
                     * the compressed block data, excluding the tree representations.
                     */
                    /* Build the bit length tree for the above two trees, and get the index
                     * in bl_order of the last bit length code to send.
                     */
                    max_blindex = build_bl_tree(s);
                    /* Determine the best encoding. Compute the block lengths in bytes. */
                    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
                    static_lenb = (s.static_len + 3 + 7) >>> 3; // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
                    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
                    //        s->last_lit));
                    if (static_lenb <= opt_lenb) {
                        opt_lenb = static_lenb;
                    }
                }
                else {
                    // Assert(buf != (char*)0, "lost buf");
                    opt_lenb = static_lenb = stored_len + 5;
                    /* force a stored block */
                }
                if (stored_len + 4 <= opt_lenb && buf !== -1) {
                    /* 4: two words for the lengths */
                    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
                     * Otherwise we can't have processed more than WSIZE input bytes since
                     * the last block flush, because compression would have been
                     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
                     * transform a block into a stored block.
                     */
                    _tr_stored_block(s, buf, stored_len, last);
                }
                else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {
                    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
                    compress_block(s, static_ltree, static_dtree);
                }
                else {
                    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
                    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
                    compress_block(s, s.dyn_ltree, s.dyn_dtree);
                } // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
                /* The above check is made mod 2^32, for files larger than 512 MB
                 * and uLong implemented on 32 bits.
                 */
                init_block(s);
                if (last) {
                    bi_windup(s);
                } // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
                //       s->compressed_len-7*last));
            };
            /* ===========================================================================
             * Save the match info and tally the frequency counts. Return true if
             * the current block must be flushed.
             */
            var _tr_tally = function _tr_tally(s, dist, lc
            //    deflate_state *s;
            //    unsigned dist;  /* distance of matched string */
            //    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
            ) {
                // let out_length, in_length, dcode;
                s.pending_buf[s.d_buf + s.last_lit * 2] = (dist >>> 8) & 0xff;
                s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;
                s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
                s.last_lit++;
                if (dist === 0) {
                    /* lc is the unmatched char */
                    s.dyn_ltree[lc * 2] /* .Freq */++;
                }
                else {
                    s.matches++;
                    /* Here, lc is the match length - MIN_MATCH */
                    dist--;
                    /* dist = match distance - 1 */
                    // Assert((ush)dist < (ush)MAX_DIST(s) &&
                    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
                    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");
                    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2] /* .Freq */++;
                    s.dyn_dtree[d_code(dist) * 2] /* .Freq */++;
                } // (!) This block is disabled in zlib defaults,
                // don't enable it for binary compatibility
                // #ifdef TRUNCATE_BLOCK
                //  /* Try to guess if it is profitable to stop the current block here */
                //  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
                //    /* Compute an upper bound for the compressed length */
                //    out_length = s.last_lit*8;
                //    in_length = s.strstart - s.block_start;
                //
                //    for (dcode = 0; dcode < D_CODES; dcode++) {
                //      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
                //    }
                //    out_length >>>= 3;
                //    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
                //    //       s->last_lit, in_length, out_length,
                //    //       100L - out_length*100L/in_length));
                //    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
                //      return true;
                //    }
                //  }
                // #endif
                return s.last_lit === s.lit_bufsize - 1;
                /* We avoid equality with lit_bufsize because of wraparound at 64K
                 * on 16 bit machines and because stored blocks are restricted to
                 * 64K-1 bytes.
                 */
            };
            var _tr_init_1 = _tr_init;
            var _tr_stored_block_1 = _tr_stored_block;
            var _tr_flush_block_1 = _tr_flush_block;
            var _tr_tally_1 = _tr_tally;
            var _tr_align_1 = _tr_align;
            var trees = {
                _tr_init: _tr_init_1,
                _tr_stored_block: _tr_stored_block_1,
                _tr_flush_block: _tr_flush_block_1,
                _tr_tally: _tr_tally_1,
                _tr_align: _tr_align_1,
            };
            // It isn't worth it to make additional optimizations as in original.
            // Small size is preferable.
            // (C) 1995-2013 Jean-loup Gailly and Mark Adler
            // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
            //
            // This software is provided 'as-is', without any express or implied
            // warranty. In no event will the authors be held liable for any damages
            // arising from the use of this software.
            //
            // Permission is granted to anyone to use this software for any purpose,
            // including commercial applications, and to alter it and redistribute it
            // freely, subject to the following restrictions:
            //
            // 1. The origin of this software must not be misrepresented; you must not
            //   claim that you wrote the original software. If you use this software
            //   in a product, an acknowledgment in the product documentation would be
            //   appreciated but is not required.
            // 2. Altered source versions must be plainly marked as such, and must not be
            //   misrepresented as being the original software.
            // 3. This notice may not be removed or altered from any source distribution.
            var adler32 = function adler32(adler, buf, len, pos) {
                var s1 = (adler & 0xffff) | 0;
                var s2 = ((adler >>> 16) & 0xffff) | 0;
                var n = 0;
                while (len !== 0) {
                    // Set limit ~ twice less than 5552, to keep
                    // s2 in 31-bits, because we force signed ints.
                    // in other case %= will fail.
                    n = len > 2000 ? 2000 : len;
                    len -= n;
                    do {
                        s1 = (s1 + buf[pos++]) | 0;
                        s2 = (s2 + s1) | 0;
                    } while (--n);
                    s1 %= 65521;
                    s2 %= 65521;
                }
                return s1 | (s2 << 16) | 0;
            };
            var adler32_1 = adler32;
            // So write code to minimize size - no pregenerated tables
            // and array tools dependencies.
            // (C) 1995-2013 Jean-loup Gailly and Mark Adler
            // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
            //
            // This software is provided 'as-is', without any express or implied
            // warranty. In no event will the authors be held liable for any damages
            // arising from the use of this software.
            //
            // Permission is granted to anyone to use this software for any purpose,
            // including commercial applications, and to alter it and redistribute it
            // freely, subject to the following restrictions:
            //
            // 1. The origin of this software must not be misrepresented; you must not
            //   claim that you wrote the original software. If you use this software
            //   in a product, an acknowledgment in the product documentation would be
            //   appreciated but is not required.
            // 2. Altered source versions must be plainly marked as such, and must not be
            //   misrepresented as being the original software.
            // 3. This notice may not be removed or altered from any source distribution.
            // Use ordinary array, since untyped makes no boost here
            var makeTable = function makeTable() {
                var c;
                var table = [];
                for (var n = 0; n < 256; n++) {
                    c = n;
                    for (var k = 0; k < 8; k++) {
                        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
                    }
                    table[n] = c;
                }
                return table;
            }; // Create table on load. Just 255 signed longs. Not a problem.
            var crcTable = new Uint32Array(makeTable());
            var crc32 = function crc32(crc, buf, len, pos) {
                var t = crcTable;
                var end = pos + len;
                crc ^= -1;
                for (var i = pos; i < end; i++) {
                    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xff];
                }
                return crc ^ -1; // >>> 0;
            };
            var crc32_1 = crc32;
            // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
            //
            // This software is provided 'as-is', without any express or implied
            // warranty. In no event will the authors be held liable for any damages
            // arising from the use of this software.
            //
            // Permission is granted to anyone to use this software for any purpose,
            // including commercial applications, and to alter it and redistribute it
            // freely, subject to the following restrictions:
            //
            // 1. The origin of this software must not be misrepresented; you must not
            //   claim that you wrote the original software. If you use this software
            //   in a product, an acknowledgment in the product documentation would be
            //   appreciated but is not required.
            // 2. Altered source versions must be plainly marked as such, and must not be
            //   misrepresented as being the original software.
            // 3. This notice may not be removed or altered from any source distribution.
            var messages = {
                2: 'need dictionary',
                /* Z_NEED_DICT       2  */
                1: 'stream end',
                /* Z_STREAM_END      1  */
                0: '',
                /* Z_OK              0  */
                '-1': 'file error',
                /* Z_ERRNO         (-1) */
                '-2': 'stream error',
                /* Z_STREAM_ERROR  (-2) */
                '-3': 'data error',
                /* Z_DATA_ERROR    (-3) */
                '-4': 'insufficient memory',
                /* Z_MEM_ERROR     (-4) */
                '-5': 'buffer error',
                /* Z_BUF_ERROR     (-5) */
                '-6': 'incompatible version',
                /* Z_VERSION_ERROR (-6) */
            };
            // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
            //
            // This software is provided 'as-is', without any express or implied
            // warranty. In no event will the authors be held liable for any damages
            // arising from the use of this software.
            //
            // Permission is granted to anyone to use this software for any purpose,
            // including commercial applications, and to alter it and redistribute it
            // freely, subject to the following restrictions:
            //
            // 1. The origin of this software must not be misrepresented; you must not
            //   claim that you wrote the original software. If you use this software
            //   in a product, an acknowledgment in the product documentation would be
            //   appreciated but is not required.
            // 2. Altered source versions must be plainly marked as such, and must not be
            //   misrepresented as being the original software.
            // 3. This notice may not be removed or altered from any source distribution.
            var constants = {
                /* Allowed flush values; see deflate() and inflate() below for details */
                Z_NO_FLUSH: 0,
                Z_PARTIAL_FLUSH: 1,
                Z_SYNC_FLUSH: 2,
                Z_FULL_FLUSH: 3,
                Z_FINISH: 4,
                Z_BLOCK: 5,
                Z_TREES: 6,
                /* Return codes for the compression/decompression functions. Negative values
                 * are errors, positive values are used for special but normal events.
                 */
                Z_OK: 0,
                Z_STREAM_END: 1,
                Z_NEED_DICT: 2,
                Z_ERRNO: -1,
                Z_STREAM_ERROR: -2,
                Z_DATA_ERROR: -3,
                Z_MEM_ERROR: -4,
                Z_BUF_ERROR: -5,
                // Z_VERSION_ERROR: -6,
                /* compression levels */
                Z_NO_COMPRESSION: 0,
                Z_BEST_SPEED: 1,
                Z_BEST_COMPRESSION: 9,
                Z_DEFAULT_COMPRESSION: -1,
                Z_FILTERED: 1,
                Z_HUFFMAN_ONLY: 2,
                Z_RLE: 3,
                Z_FIXED: 4,
                Z_DEFAULT_STRATEGY: 0,
                /* Possible values of the data_type field (though see inflate()) */
                Z_BINARY: 0,
                Z_TEXT: 1,
                // Z_ASCII:                1, // = Z_TEXT (deprecated)
                Z_UNKNOWN: 2,
                /* The deflate compression method */
                Z_DEFLATED: 8, // Z_NULL:                 null // Use -1 or null inline, depending on var type
            };
            // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
            //
            // This software is provided 'as-is', without any express or implied
            // warranty. In no event will the authors be held liable for any damages
            // arising from the use of this software.
            //
            // Permission is granted to anyone to use this software for any purpose,
            // including commercial applications, and to alter it and redistribute it
            // freely, subject to the following restrictions:
            //
            // 1. The origin of this software must not be misrepresented; you must not
            //   claim that you wrote the original software. If you use this software
            //   in a product, an acknowledgment in the product documentation would be
            //   appreciated but is not required.
            // 2. Altered source versions must be plainly marked as such, and must not be
            //   misrepresented as being the original software.
            // 3. This notice may not be removed or altered from any source distribution.
            var _tr_init$1 = trees._tr_init;
            var _tr_stored_block$1 = trees._tr_stored_block;
            var _tr_flush_block$1 = trees._tr_flush_block;
            var _tr_tally$1 = trees._tr_tally;
            var _tr_align$1 = trees._tr_align;
            /* Public constants ========================================================== */
            /* =========================================================================== */
            var Z_NO_FLUSH = constants.Z_NO_FLUSH;
            var Z_PARTIAL_FLUSH = constants.Z_PARTIAL_FLUSH;
            var Z_FULL_FLUSH = constants.Z_FULL_FLUSH;
            var Z_FINISH = constants.Z_FINISH;
            var Z_BLOCK = constants.Z_BLOCK;
            var Z_OK = constants.Z_OK;
            var Z_STREAM_END = constants.Z_STREAM_END;
            var Z_STREAM_ERROR = constants.Z_STREAM_ERROR;
            var Z_DATA_ERROR = constants.Z_DATA_ERROR;
            var Z_BUF_ERROR = constants.Z_BUF_ERROR;
            var Z_DEFAULT_COMPRESSION = constants.Z_DEFAULT_COMPRESSION;
            var Z_FILTERED = constants.Z_FILTERED;
            var Z_HUFFMAN_ONLY = constants.Z_HUFFMAN_ONLY;
            var Z_RLE = constants.Z_RLE;
            var Z_FIXED$1 = constants.Z_FIXED;
            var Z_DEFAULT_STRATEGY = constants.Z_DEFAULT_STRATEGY;
            var Z_UNKNOWN$1 = constants.Z_UNKNOWN;
            var Z_DEFLATED = constants.Z_DEFLATED;
            /* ============================================================================ */
            var MAX_MEM_LEVEL = 9;
            /* Maximum value for memLevel in deflateInit2 */
            var MAX_WBITS = 15;
            /* 32K LZ77 window */
            var DEF_MEM_LEVEL = 8;
            var LENGTH_CODES$1 = 29;
            /* number of length codes, not counting the special END_BLOCK code */
            var LITERALS$1 = 256;
            /* number of literal bytes 0..255 */
            var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
            /* number of Literal or Length codes, including the END_BLOCK code */
            var D_CODES$1 = 30;
            /* number of distance codes */
            var BL_CODES$1 = 19;
            /* number of codes used to transfer the bit lengths */
            var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
            /* maximum heap size */
            var MAX_BITS$1 = 15;
            /* All codes must not exceed MAX_BITS bits */
            var MIN_MATCH$1 = 3;
            var MAX_MATCH$1 = 258;
            var MIN_LOOKAHEAD = MAX_MATCH$1 + MIN_MATCH$1 + 1;
            var PRESET_DICT = 0x20;
            var INIT_STATE = 42;
            var EXTRA_STATE = 69;
            var NAME_STATE = 73;
            var COMMENT_STATE = 91;
            var HCRC_STATE = 103;
            var BUSY_STATE = 113;
            var FINISH_STATE = 666;
            var BS_NEED_MORE = 1;
            /* block not completed, need more input or more output */
            var BS_BLOCK_DONE = 2;
            /* block flush performed */
            var BS_FINISH_STARTED = 3;
            /* finish started, need only more output at next deflate */
            var BS_FINISH_DONE = 4;
            /* finish done, accept no more input or output */
            var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.
            var err = function err(strm, errorCode) {
                strm.msg = messages[errorCode];
                return errorCode;
            };
            var rank = function rank(f) {
                return (f << 1) - (f > 4 ? 9 : 0);
            };
            var zero$1 = function zero(buf) {
                var len = buf.length;
                while (--len >= 0) {
                    buf[len] = 0;
                }
            };
            var HASH_ZLIB = function HASH_ZLIB(s, prev, data) {
                return ((prev << s.hash_shift) ^ data) & s.hash_mask;
            }; // This hash causes less collisions, https://github.com/nodeca/pako/issues/135
            // But breaks binary compatibility
            // let HASH_FAST = (s, prev, data) => ((prev << 8) + (prev >> 8) + (data << 4)) & s.hash_mask;
            var HASH = HASH_ZLIB;
            /* =========================================================================
             * Flush as much pending output as possible. All deflate() output goes
             * through this function so some applications may wish to modify it
             * to avoid allocating a large strm->output buffer and copying into it.
             * (See also read_buf()).
             */
            var flush_pending = function flush_pending(strm) {
                var s = strm.state; // _tr_flush_bits(s);
                var len = s.pending;
                if (len > strm.avail_out) {
                    len = strm.avail_out;
                }
                if (len === 0) {
                    return;
                }
                strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
                strm.next_out += len;
                s.pending_out += len;
                strm.total_out += len;
                strm.avail_out -= len;
                s.pending -= len;
                if (s.pending === 0) {
                    s.pending_out = 0;
                }
            };
            var flush_block_only = function flush_block_only(s, last) {
                _tr_flush_block$1(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
                s.block_start = s.strstart;
                flush_pending(s.strm);
            };
            var put_byte = function put_byte(s, b) {
                s.pending_buf[s.pending++] = b;
            };
            /* =========================================================================
             * Put a short in the pending buffer. The 16-bit value is put in MSB order.
             * IN assertion: the stream state is correct and there is enough room in
             * pending_buf.
             */
            var putShortMSB = function putShortMSB(s, b) {
                //  put_byte(s, (Byte)(b >> 8));
                //  put_byte(s, (Byte)(b & 0xff));
                s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
                s.pending_buf[s.pending++] = b & 0xff;
            };
            /* ===========================================================================
             * Read a new buffer from the current input stream, update the adler32
             * and total number of bytes read.  All deflate() input goes through
             * this function so some applications may wish to modify it to avoid
             * allocating a large strm->input buffer and copying from it.
             * (See also flush_pending()).
             */
            var read_buf = function read_buf(strm, buf, start, size) {
                var len = strm.avail_in;
                if (len > size) {
                    len = size;
                }
                if (len === 0) {
                    return 0;
                }
                strm.avail_in -= len; // zmemcpy(buf, strm->next_in, len);
                buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
                if (strm.state.wrap === 1) {
                    strm.adler = adler32_1(strm.adler, buf, len, start);
                }
                else if (strm.state.wrap === 2) {
                    strm.adler = crc32_1(strm.adler, buf, len, start);
                }
                strm.next_in += len;
                strm.total_in += len;
                return len;
            };
            /* ===========================================================================
             * Set match_start to the longest match starting at the given string and
             * return its length. Matches shorter or equal to prev_length are discarded,
             * in which case the result is equal to prev_length and match_start is
             * garbage.
             * IN assertions: cur_match is the head of the hash chain for the current
             *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
             * OUT assertion: the match length is not greater than s->lookahead.
             */
            var longest_match = function longest_match(s, cur_match) {
                var chain_length = s.max_chain_length;
                /* max hash chain length */
                var scan = s.strstart;
                /* current string */
                var match;
                /* matched string */
                var len;
                /* length of current match */
                var best_len = s.prev_length;
                /* best match length so far */
                var nice_match = s.nice_match;
                /* stop if match long enough */
                var limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
                /* NIL */
                var _win = s.window; // shortcut
                var wmask = s.w_mask;
                var prev = s.prev;
                /* Stop when cur_match becomes <= limit. To simplify the code,
                 * we prevent matches with the string of window index 0.
                 */
                var strend = s.strstart + MAX_MATCH$1;
                var scan_end1 = _win[scan + best_len - 1];
                var scan_end = _win[scan + best_len];
                /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
                 * It is easy to get rid of this optimization if necessary.
                 */
                // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");
                /* Do not waste too much time if we already have a good match: */
                if (s.prev_length >= s.good_match) {
                    chain_length >>= 2;
                }
                /* Do not look for matches beyond the end of the input. This is necessary
                 * to make deflate deterministic.
                 */
                if (nice_match > s.lookahead) {
                    nice_match = s.lookahead;
                } // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");
                do {
                    // Assert(cur_match < s->strstart, "no future");
                    match = cur_match;
                    /* Skip to next match if the match length cannot increase
                     * or if the match length is less than 2.  Note that the checks below
                     * for insufficient lookahead only occur occasionally for performance
                     * reasons.  Therefore uninitialized memory will be accessed, and
                     * conditional jumps will be made that depend on those values.
                     * However the length of the match is limited to the lookahead, so
                     * the output of deflate is not affected by the uninitialized values.
                     */
                    if (_win[match + best_len] !== scan_end ||
                        _win[match + best_len - 1] !== scan_end1 ||
                        _win[match] !== _win[scan] ||
                        _win[++match] !== _win[scan + 1]) {
                        continue;
                    }
                    /* The check at best_len-1 can be removed because it will be made
                     * again later. (This heuristic is not always a win.)
                     * It is not necessary to compare scan[2] and match[2] since they
                     * are always equal when the other bytes match, given that
                     * the hash keys are equal and that HASH_BITS >= 8.
                     */
                    scan += 2;
                    match++; // Assert(*scan == *match, "match[2]?");
                    /* We check for insufficient lookahead only every 8th comparison;
                     * the 256th check will be made at strstart+258.
                     */
                    do {
                        /* jshint noempty:false */
                    } while (_win[++scan] === _win[++match] &&
                        _win[++scan] === _win[++match] &&
                        _win[++scan] === _win[++match] &&
                        _win[++scan] === _win[++match] &&
                        _win[++scan] === _win[++match] &&
                        _win[++scan] === _win[++match] &&
                        _win[++scan] === _win[++match] &&
                        _win[++scan] === _win[++match] &&
                        scan < strend); // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");
                    len = MAX_MATCH$1 - (strend - scan);
                    scan = strend - MAX_MATCH$1;
                    if (len > best_len) {
                        s.match_start = cur_match;
                        best_len = len;
                        if (len >= nice_match) {
                            break;
                        }
                        scan_end1 = _win[scan + best_len - 1];
                        scan_end = _win[scan + best_len];
                    }
                } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
                if (best_len <= s.lookahead) {
                    return best_len;
                }
                return s.lookahead;
            };
            /* ===========================================================================
             * Fill the window when the lookahead becomes insufficient.
             * Updates strstart and lookahead.
             *
             * IN assertion: lookahead < MIN_LOOKAHEAD
             * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
             *    At least one byte has been read, or avail_in == 0; reads are
             *    performed for at least two bytes (required for the zip translate_eol
             *    option -- not supported here).
             */
            var fill_window = function fill_window(s) {
                var _w_size = s.w_size;
                var p;
                var n;
                var m;
                var more;
                var str; // Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");
                do {
                    more = s.window_size - s.lookahead - s.strstart; // JS ints have 32 bit, block below not needed
                    /* Deal with !@#$% 64K limit: */
                    // if (sizeof(int) <= 2) {
                    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
                    //        more = wsize;
                    //
                    //  } else if (more == (unsigned)(-1)) {
                    //        /* Very unlikely, but possible on 16 bit machine if
                    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
                    //         */
                    //        more--;
                    //    }
                    // }
                    /* If the window is almost full and there is insufficient lookahead,
                     * move the upper half to the lower one to make room in the upper half.
                     */
                    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
                        s.window.set(s.window.subarray(_w_size, _w_size + _w_size), 0);
                        s.match_start -= _w_size;
                        s.strstart -= _w_size;
                        /* we now have strstart >= MAX_DIST */
                        s.block_start -= _w_size;
                        /* Slide the hash table (could be avoided with 32 bit values
                       at the expense of memory usage). We slide even when level == 0
                       to keep the hash table consistent if we switch back to level > 0
                       later. (Using level 0 permanently is not an optimal usage of
                       zlib, so we don't care about this pathological case.)
                       */
                        n = s.hash_size;
                        p = n;
                        do {
                            m = s.head[--p];
                            s.head[p] = m >= _w_size ? m - _w_size : 0;
                        } while (--n);
                        n = _w_size;
                        p = n;
                        do {
                            m = s.prev[--p];
                            s.prev[p] = m >= _w_size ? m - _w_size : 0;
                            /* If n is not on any hash chain, prev[n] is garbage but
                             * its value will never be used.
                             */
                        } while (--n);
                        more += _w_size;
                    }
                    if (s.strm.avail_in === 0) {
                        break;
                    }
                    /* If there was no sliding:
                     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
                     *    more == window_size - lookahead - strstart
                     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
                     * => more >= window_size - 2*WSIZE + 2
                     * In the BIG_MEM or MMAP case (not yet supported),
                     *   window_size == input_size + MIN_LOOKAHEAD  &&
                     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
                     * Otherwise, window_size == 2*WSIZE so more >= 2.
                     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
                     */
                    // Assert(more >= 2, "more < 2");
                    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
                    s.lookahead += n;
                    /* Initialize the hash value now that we have some input: */
                    if (s.lookahead + s.insert >= MIN_MATCH$1) {
                        str = s.strstart - s.insert;
                        s.ins_h = s.window[str];
                        /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
                        s.ins_h = HASH(s, s.ins_h, s.window[str + 1]); // #if MIN_MATCH != 3
                        //        Call update_hash() MIN_MATCH-3 more times
                        // #endif
                        while (s.insert) {
                            /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
                            s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH$1 - 1]);
                            s.prev[str & s.w_mask] = s.head[s.ins_h];
                            s.head[s.ins_h] = str;
                            str++;
                            s.insert--;
                            if (s.lookahead + s.insert < MIN_MATCH$1) {
                                break;
                            }
                        }
                    }
                    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
                     * but this is not important since only literal bytes will be emitted.
                     */
                } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
                /* If the WIN_INIT bytes after the end of the current data have never been
                 * written, then zero those bytes in order to avoid memory check reports of
                 * the use of uninitialized (or uninitialised as Julian writes) bytes by
                 * the longest match routines.  Update the high water mark for the next
                 * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
                 * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
                 */
                //  if (s.high_water < s.window_size) {
                //    const curr = s.strstart + s.lookahead;
                //    let init = 0;
                //
                //    if (s.high_water < curr) {
                //      /* Previous high water mark below current data -- zero WIN_INIT
                //       * bytes or up to end of window, whichever is less.
                //       */
                //      init = s.window_size - curr;
                //      if (init > WIN_INIT)
                //        init = WIN_INIT;
                //      zmemzero(s->window + curr, (unsigned)init);
                //      s->high_water = curr + init;
                //    }
                //    else if (s->high_water < (ulg)curr + WIN_INIT) {
                //      /* High water mark at or above current data, but below current data
                //       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
                //       * to end of window, whichever is less.
                //       */
                //      init = (ulg)curr + WIN_INIT - s->high_water;
                //      if (init > s->window_size - s->high_water)
                //        init = s->window_size - s->high_water;
                //      zmemzero(s->window + s->high_water, (unsigned)init);
                //      s->high_water += init;
                //    }
                //  }
                //
                //  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
                //    "not enough room for search");
            };
            /* ===========================================================================
             * Copy without compression as much as possible from the input stream, return
             * the current block state.
             * This function does not insert new strings in the dictionary since
             * uncompressible data is probably not useful. This function is used
             * only for the level=0 compression option.
             * NOTE: this function should be optimized to avoid extra copying from
             * window to pending_buf.
             */
            var deflate_stored = function deflate_stored(s, flush) {
                /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
                 * to pending_buf_size, and each stored block has a 5 byte header:
                 */
                var max_block_size = 0xffff;
                if (max_block_size > s.pending_buf_size - 5) {
                    max_block_size = s.pending_buf_size - 5;
                }
                /* Copy as much as possible from input to output: */
                for (;;) {
                    /* Fill the window as much as possible: */
                    if (s.lookahead <= 1) {
                        // Assert(s->strstart < s->w_size+MAX_DIST(s) ||
                        //  s->block_start >= (long)s->w_size, "slide too late");
                        //      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
                        //        s.block_start >= s.w_size)) {
                        //        throw  new Error("slide too late");
                        //      }
                        fill_window(s);
                        if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
                            return BS_NEED_MORE;
                        }
                        if (s.lookahead === 0) {
                            break;
                        }
                        /* flush the current block */
                    } // Assert(s->block_start >= 0L, "block gone");
                    //    if (s.block_start < 0) throw new Error("block gone");
                    s.strstart += s.lookahead;
                    s.lookahead = 0;
                    /* Emit a stored block if pending_buf will be full: */
                    var max_start = s.block_start + max_block_size;
                    if (s.strstart === 0 || s.strstart >= max_start) {
                        /* strstart == 0 is possible when wraparound on 16-bit machine */
                        s.lookahead = s.strstart - max_start;
                        s.strstart = max_start;
                        /** * FLUSH_BLOCK(s, 0); ** */
                        flush_block_only(s, false);
                        if (s.strm.avail_out === 0) {
                            return BS_NEED_MORE;
                        }
                        /***/
                    }
                    /* Flush if we may have to slide, otherwise block_start may become
                     * negative and the data will be gone:
                     */
                    if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
                        /** * FLUSH_BLOCK(s, 0); ** */
                        flush_block_only(s, false);
                        if (s.strm.avail_out === 0) {
                            return BS_NEED_MORE;
                        }
                        /***/
                    }
                }
                s.insert = 0;
                if (flush === Z_FINISH) {
                    /** * FLUSH_BLOCK(s, 1); ** */
                    flush_block_only(s, true);
                    if (s.strm.avail_out === 0) {
                        return BS_FINISH_STARTED;
                    }
                    /***/
                    return BS_FINISH_DONE;
                }
                if (s.strstart > s.block_start) {
                    /** * FLUSH_BLOCK(s, 0); ** */
                    flush_block_only(s, false);
                    if (s.strm.avail_out === 0) {
                        return BS_NEED_MORE;
                    }
                    /***/
                }
                return BS_NEED_MORE;
            };
            /* ===========================================================================
             * Compress as much as possible from the input stream, return the current
             * block state.
             * This function does not perform lazy evaluation of matches and inserts
             * new strings in the dictionary only for unmatched strings or for short
             * matches. It is used only for the fast compression options.
             */
            var deflate_fast = function deflate_fast(s, flush) {
                var hash_head;
                /* head of the hash chain */
                var bflush;
                /* set if current block must be flushed */
                for (;;) {
                    /* Make sure that we always have enough lookahead, except
                     * at the end of the input file. We need MAX_MATCH bytes
                     * for the next match, plus MIN_MATCH bytes to insert the
                     * string following the next match.
                     */
                    if (s.lookahead < MIN_LOOKAHEAD) {
                        fill_window(s);
                        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
                            return BS_NEED_MORE;
                        }
                        if (s.lookahead === 0) {
                            break;
                            /* flush the current block */
                        }
                    }
                    /* Insert the string window[strstart .. strstart+2] in the
                     * dictionary, and set hash_head to the head of the hash chain:
                     */
                    hash_head = 0;
                    /* NIL */
                    if (s.lookahead >= MIN_MATCH$1) {
                        /** * INSERT_STRING(s, s.strstart, hash_head); ** */
                        s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH$1 - 1]);
                        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                        s.head[s.ins_h] = s.strstart;
                        /***/
                    }
                    /* Find the longest match, discarding those <= prev_length.
                     * At this point we have always match_length < MIN_MATCH
                     */
                    if (hash_head !== 0 &&
                        /* NIL */
                        s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
                        /* To simplify the code, we prevent matches with the string
                         * of window index 0 (in particular we have to avoid a match
                         * of the string with itself at the start of the input file).
                         */
                        s.match_length = longest_match(s, hash_head);
                        /* longest_match() sets match_start */
                    }
                    if (s.match_length >= MIN_MATCH$1) {
                        // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only
                        /** * _tr_tally_dist(s, s.strstart - s.match_start,
                                     s.match_length - MIN_MATCH, bflush); ** */
                        bflush = _tr_tally$1(s, s.strstart - s.match_start, s.match_length - MIN_MATCH$1);
                        s.lookahead -= s.match_length;
                        /* Insert new strings in the hash table only if the match length
                         * is not too large. This saves time but degrades compression.
                         */
                        if (s.match_length <= s.max_lazy_match &&
                            /* max_insert_length */
                            s.lookahead >= MIN_MATCH$1) {
                            s.match_length--;
                            /* string at strstart already in table */
                            do {
                                s.strstart++;
                                /** * INSERT_STRING(s, s.strstart, hash_head); ** */
                                s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH$1 - 1]);
                                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                                s.head[s.ins_h] = s.strstart;
                                /***/
                                /* strstart never exceeds WSIZE-MAX_MATCH, so there are
                                 * always MIN_MATCH bytes ahead.
                                 */
                            } while (--s.match_length !== 0);
                            s.strstart++;
                        }
                        else {
                            s.strstart += s.match_length;
                            s.match_length = 0;
                            s.ins_h = s.window[s.strstart];
                            /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
                            s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]); // #if MIN_MATCH != 3
                            //                Call UPDATE_HASH() MIN_MATCH-3 more times
                            // #endif
                            /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
                             * matter since it will be recomputed at next deflate call.
                             */
                        }
                    }
                    else {
                        /* No match, output a literal byte */
                        // Tracevv((stderr,"%c", s.window[s.strstart]));
                        /** * _tr_tally_lit(s, s.window[s.strstart], bflush); ** */
                        bflush = _tr_tally$1(s, 0, s.window[s.strstart]);
                        s.lookahead--;
                        s.strstart++;
                    }
                    if (bflush) {
                        /** * FLUSH_BLOCK(s, 0); ** */
                        flush_block_only(s, false);
                        if (s.strm.avail_out === 0) {
                            return BS_NEED_MORE;
                        }
                        /***/
                    }
                }
                s.insert = s.strstart < MIN_MATCH$1 - 1 ? s.strstart : MIN_MATCH$1 - 1;
                if (flush === Z_FINISH) {
                    /** * FLUSH_BLOCK(s, 1); ** */
                    flush_block_only(s, true);
                    if (s.strm.avail_out === 0) {
                        return BS_FINISH_STARTED;
                    }
                    /***/
                    return BS_FINISH_DONE;
                }
                if (s.last_lit) {
                    /** * FLUSH_BLOCK(s, 0); ** */
                    flush_block_only(s, false);
                    if (s.strm.avail_out === 0) {
                        return BS_NEED_MORE;
                    }
                    /***/
                }
                return BS_BLOCK_DONE;
            };
            /* ===========================================================================
             * Same as above, but achieves better compression. We use a lazy
             * evaluation for matches: a match is finally adopted only if there is
             * no better match at the next window position.
             */
            var deflate_slow = function deflate_slow(s, flush) {
                var hash_head;
                /* head of hash chain */
                var bflush;
                /* set if current block must be flushed */
                var max_insert;
                /* Process the input block. */
                for (;;) {
                    /* Make sure that we always have enough lookahead, except
                     * at the end of the input file. We need MAX_MATCH bytes
                     * for the next match, plus MIN_MATCH bytes to insert the
                     * string following the next match.
                     */
                    if (s.lookahead < MIN_LOOKAHEAD) {
                        fill_window(s);
                        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
                            return BS_NEED_MORE;
                        }
                        if (s.lookahead === 0) {
                            break;
                        }
                        /* flush the current block */
                    }
                    /* Insert the string window[strstart .. strstart+2] in the
                     * dictionary, and set hash_head to the head of the hash chain:
                     */
                    hash_head = 0;
                    /* NIL */
                    if (s.lookahead >= MIN_MATCH$1) {
                        /** * INSERT_STRING(s, s.strstart, hash_head); ** */
                        s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH$1 - 1]);
                        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                        s.head[s.ins_h] = s.strstart;
                        /***/
                    }
                    /* Find the longest match, discarding those <= prev_length.
                     */
                    s.prev_length = s.match_length;
                    s.prev_match = s.match_start;
                    s.match_length = MIN_MATCH$1 - 1;
                    if (hash_head !== 0 &&
                        /* NIL */
                        s.prev_length < s.max_lazy_match &&
                        s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD
                    /* MAX_DIST(s) */
                    ) {
                        /* To simplify the code, we prevent matches with the string
                         * of window index 0 (in particular we have to avoid a match
                         * of the string with itself at the start of the input file).
                         */
                        s.match_length = longest_match(s, hash_head);
                        /* longest_match() sets match_start */
                        if (s.match_length <= 5 &&
                            (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH$1 && s.strstart - s.match_start > 4096))
                        /* TOO_FAR */
                        ) {
                            /* If prev_match is also MIN_MATCH, match_start is garbage
                             * but we will ignore the current match anyway.
                             */
                            s.match_length = MIN_MATCH$1 - 1;
                        }
                    }
                    /* If there was a match at the previous step and the current
                     * match is not better, output the previous match:
                     */
                    if (s.prev_length >= MIN_MATCH$1 && s.match_length <= s.prev_length) {
                        max_insert = s.strstart + s.lookahead - MIN_MATCH$1;
                        /* Do not insert strings in hash table beyond this. */
                        // check_match(s, s.strstart-1, s.prev_match, s.prev_length);
                        /** *_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                                     s.prev_length - MIN_MATCH, bflush);** */
                        bflush = _tr_tally$1(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH$1);
                        /* Insert in hash table all strings up to the end of the match.
                         * strstart-1 and strstart are already inserted. If there is not
                         * enough lookahead, the last two strings are not inserted in
                         * the hash table.
                         */
                        s.lookahead -= s.prev_length - 1;
                        s.prev_length -= 2;
                        do {
                            if (++s.strstart <= max_insert) {
                                /** * INSERT_STRING(s, s.strstart, hash_head); ** */
                                s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH$1 - 1]);
                                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                                s.head[s.ins_h] = s.strstart;
                                /***/
                            }
                        } while (--s.prev_length !== 0);
                        s.match_available = 0;
                        s.match_length = MIN_MATCH$1 - 1;
                        s.strstart++;
                        if (bflush) {
                            /** * FLUSH_BLOCK(s, 0); ** */
                            flush_block_only(s, false);
                            if (s.strm.avail_out === 0) {
                                return BS_NEED_MORE;
                            }
                            /***/
                        }
                    }
                    else if (s.match_available) {
                        /* If there was no match at the previous position, output a
                         * single literal. If there was a match but the current match
                         * is longer, truncate the previous match to a single literal.
                         */
                        // Tracevv((stderr,"%c", s->window[s->strstart-1]));
                        /** * _tr_tally_lit(s, s.window[s.strstart-1], bflush); ** */
                        bflush = _tr_tally$1(s, 0, s.window[s.strstart - 1]);
                        if (bflush) {
                            /** * FLUSH_BLOCK_ONLY(s, 0) ** */
                            flush_block_only(s, false);
                            /***/
                        }
                        s.strstart++;
                        s.lookahead--;
                        if (s.strm.avail_out === 0) {
                            return BS_NEED_MORE;
                        }
                    }
                    else {
                        /* There is no previous match to compare with, wait for
                         * the next step to decide.
                         */
                        s.match_available = 1;
                        s.strstart++;
                        s.lookahead--;
                    }
                } // Assert (flush != Z_NO_FLUSH, "no flush?");
                if (s.match_available) {
                    // Tracevv((stderr,"%c", s->window[s->strstart-1]));
                    /** * _tr_tally_lit(s, s.window[s.strstart-1], bflush); ** */
                    bflush = _tr_tally$1(s, 0, s.window[s.strstart - 1]);
                    s.match_available = 0;
                }
                s.insert = s.strstart < MIN_MATCH$1 - 1 ? s.strstart : MIN_MATCH$1 - 1;
                if (flush === Z_FINISH) {
                    /** * FLUSH_BLOCK(s, 1); ** */
                    flush_block_only(s, true);
                    if (s.strm.avail_out === 0) {
                        return BS_FINISH_STARTED;
                    }
                    /***/
                    return BS_FINISH_DONE;
                }
                if (s.last_lit) {
                    /** * FLUSH_BLOCK(s, 0); ** */
                    flush_block_only(s, false);
                    if (s.strm.avail_out === 0) {
                        return BS_NEED_MORE;
                    }
                    /***/
                }
                return BS_BLOCK_DONE;
            };
            /* ===========================================================================
             * For Z_RLE, simply look for runs of bytes, generate matches only of distance
             * one.  Do not maintain a hash table.  (It will be regenerated if this run of
             * deflate switches away from Z_RLE.)
             */
            var deflate_rle = function deflate_rle(s, flush) {
                var bflush;
                /* set if current block must be flushed */
                var prev;
                /* byte at distance one to match */
                var scan;
                var strend;
                /* scan goes up to strend for length of run */
                var _win = s.window;
                for (;;) {
                    /* Make sure that we always have enough lookahead, except
                     * at the end of the input file. We need MAX_MATCH bytes
                     * for the longest run, plus one for the unrolled loop.
                     */
                    if (s.lookahead <= MAX_MATCH$1) {
                        fill_window(s);
                        if (s.lookahead <= MAX_MATCH$1 && flush === Z_NO_FLUSH) {
                            return BS_NEED_MORE;
                        }
                        if (s.lookahead === 0) {
                            break;
                        }
                        /* flush the current block */
                    }
                    /* See how many times the previous byte repeats */
                    s.match_length = 0;
                    if (s.lookahead >= MIN_MATCH$1 && s.strstart > 0) {
                        scan = s.strstart - 1;
                        prev = _win[scan];
                        if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
                            strend = s.strstart + MAX_MATCH$1;
                            do {
                                /* jshint noempty:false */
                            } while (prev === _win[++scan] &&
                                prev === _win[++scan] &&
                                prev === _win[++scan] &&
                                prev === _win[++scan] &&
                                prev === _win[++scan] &&
                                prev === _win[++scan] &&
                                prev === _win[++scan] &&
                                prev === _win[++scan] &&
                                scan < strend);
                            s.match_length = MAX_MATCH$1 - (strend - scan);
                            if (s.match_length > s.lookahead) {
                                s.match_length = s.lookahead;
                            }
                        } // Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
                    }
                    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
                    if (s.match_length >= MIN_MATCH$1) {
                        // check_match(s, s.strstart, s.strstart - 1, s.match_length);
                        /** * _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ** */
                        bflush = _tr_tally$1(s, 1, s.match_length - MIN_MATCH$1);
                        s.lookahead -= s.match_length;
                        s.strstart += s.match_length;
                        s.match_length = 0;
                    }
                    else {
                        /* No match, output a literal byte */
                        // Tracevv((stderr,"%c", s->window[s->strstart]));
                        /** * _tr_tally_lit(s, s.window[s.strstart], bflush); ** */
                        bflush = _tr_tally$1(s, 0, s.window[s.strstart]);
                        s.lookahead--;
                        s.strstart++;
                    }
                    if (bflush) {
                        /** * FLUSH_BLOCK(s, 0); ** */
                        flush_block_only(s, false);
                        if (s.strm.avail_out === 0) {
                            return BS_NEED_MORE;
                        }
                        /***/
                    }
                }
                s.insert = 0;
                if (flush === Z_FINISH) {
                    /** * FLUSH_BLOCK(s, 1); ** */
                    flush_block_only(s, true);
                    if (s.strm.avail_out === 0) {
                        return BS_FINISH_STARTED;
                    }
                    /***/
                    return BS_FINISH_DONE;
                }
                if (s.last_lit) {
                    /** * FLUSH_BLOCK(s, 0); ** */
                    flush_block_only(s, false);
                    if (s.strm.avail_out === 0) {
                        return BS_NEED_MORE;
                    }
                    /***/
                }
                return BS_BLOCK_DONE;
            };
            /* ===========================================================================
             * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
             * (It will be regenerated if this run of deflate switches away from Huffman.)
             */
            var deflate_huff = function deflate_huff(s, flush) {
                var bflush;
                /* set if current block must be flushed */
                for (;;) {
                    /* Make sure that we have a literal to write. */
                    if (s.lookahead === 0) {
                        fill_window(s);
                        if (s.lookahead === 0) {
                            if (flush === Z_NO_FLUSH) {
                                return BS_NEED_MORE;
                            }
                            break;
                            /* flush the current block */
                        }
                    }
                    /* Output a literal byte */
                    s.match_length = 0; // Tracevv((stderr,"%c", s->window[s->strstart]));
                    /** * _tr_tally_lit(s, s.window[s.strstart], bflush); ** */
                    bflush = _tr_tally$1(s, 0, s.window[s.strstart]);
                    s.lookahead--;
                    s.strstart++;
                    if (bflush) {
                        /** * FLUSH_BLOCK(s, 0); ** */
                        flush_block_only(s, false);
                        if (s.strm.avail_out === 0) {
                            return BS_NEED_MORE;
                        }
                        /***/
                    }
                }
                s.insert = 0;
                if (flush === Z_FINISH) {
                    /** * FLUSH_BLOCK(s, 1); ** */
                    flush_block_only(s, true);
                    if (s.strm.avail_out === 0) {
                        return BS_FINISH_STARTED;
                    }
                    /***/
                    return BS_FINISH_DONE;
                }
                if (s.last_lit) {
                    /** * FLUSH_BLOCK(s, 0); ** */
                    flush_block_only(s, false);
                    if (s.strm.avail_out === 0) {
                        return BS_NEED_MORE;
                    }
                    /***/
                }
                return BS_BLOCK_DONE;
            };
            /* Values for max_lazy_match, good_match and max_chain_length, depending on
             * the desired pack level (0..9). The values given below have been tuned to
             * exclude worst case performance for pathological files. Better values may be
             * found for specific files.
             */
            function Config(good_length, max_lazy, nice_length, max_chain, func) {
                this.good_length = good_length;
                this.max_lazy = max_lazy;
                this.nice_length = nice_length;
                this.max_chain = max_chain;
                this.func = func;
            }
            var configuration_table = [
                /*      good lazy nice chain */
                new Config(0, 0, 0, 0, deflate_stored),
                /* 0 store only */
                new Config(4, 4, 8, 4, deflate_fast),
                /* 1 max speed, no lazy matches */
                new Config(4, 5, 16, 8, deflate_fast),
                /* 2 */
                new Config(4, 6, 32, 32, deflate_fast),
                /* 3 */
                new Config(4, 4, 16, 16, deflate_slow),
                /* 4 lazy matches */
                new Config(8, 16, 32, 32, deflate_slow),
                /* 5 */
                new Config(8, 16, 128, 128, deflate_slow),
                /* 6 */
                new Config(8, 32, 128, 256, deflate_slow),
                /* 7 */
                new Config(32, 128, 258, 1024, deflate_slow),
                /* 8 */
                new Config(32, 258, 258, 4096, deflate_slow),
                /* 9 max compression */
            ];
            /* ===========================================================================
             * Initialize the "longest match" routines for a new zlib stream
             */
            var lm_init = function lm_init(s) {
                s.window_size = 2 * s.w_size;
                /** * CLEAR_HASH(s); ** */
                zero$1(s.head); // Fill with NIL (= 0);
                /* Set the default configuration parameters:
                 */
                s.max_lazy_match = configuration_table[s.level].max_lazy;
                s.good_match = configuration_table[s.level].good_length;
                s.nice_match = configuration_table[s.level].nice_length;
                s.max_chain_length = configuration_table[s.level].max_chain;
                s.strstart = 0;
                s.block_start = 0;
                s.lookahead = 0;
                s.insert = 0;
                s.match_length = s.prev_length = MIN_MATCH$1 - 1;
                s.match_available = 0;
                s.ins_h = 0;
            };
            function DeflateState() {
                this.strm = null;
                /* pointer back to this zlib stream */
                this.status = 0;
                /* as the name implies */
                this.pending_buf = null;
                /* output still pending */
                this.pending_buf_size = 0;
                /* size of pending_buf */
                this.pending_out = 0;
                /* next pending byte to output to the stream */
                this.pending = 0;
                /* nb of bytes in the pending buffer */
                this.wrap = 0;
                /* bit 0 true for zlib, bit 1 true for gzip */
                this.gzhead = null;
                /* gzip header information to write */
                this.gzindex = 0;
                /* where in extra, name, or comment */
                this.method = Z_DEFLATED;
                /* can only be DEFLATED */
                this.last_flush = -1;
                /* value of flush param for previous deflate call */
                this.w_size = 0;
                /* LZ77 window size (32K by default) */
                this.w_bits = 0;
                /* log2(w_size)  (8..16) */
                this.w_mask = 0;
                /* w_size - 1 */
                this.window = null;
                /* Sliding window. Input bytes are read into the second half of the window,
                 * and move to the first half later to keep a dictionary of at least wSize
                 * bytes. With this organization, matches are limited to a distance of
                 * wSize-MAX_MATCH bytes, but this ensures that IO is always
                 * performed with a length multiple of the block size.
                 */
                this.window_size = 0;
                /* Actual size of window: 2*wSize, except when the user input buffer
                 * is directly used as sliding window.
                 */
                this.prev = null;
                /* Link to older string with same hash index. To limit the size of this
                 * array to 64K, this link is maintained only for the last 32K strings.
                 * An index in this array is thus a window index modulo 32K.
                 */
                this.head = null;
                /* Heads of the hash chains or NIL. */
                this.ins_h = 0;
                /* hash index of string to be inserted */
                this.hash_size = 0;
                /* number of elements in hash table */
                this.hash_bits = 0;
                /* log2(hash_size) */
                this.hash_mask = 0;
                /* hash_size-1 */
                this.hash_shift = 0;
                /* Number of bits by which ins_h must be shifted at each input
                 * step. It must be such that after MIN_MATCH steps, the oldest
                 * byte no longer takes part in the hash key, that is:
                 *   hash_shift * MIN_MATCH >= hash_bits
                 */
                this.block_start = 0;
                /* Window position at the beginning of the current output block. Gets
                 * negative when the window is moved backwards.
                 */
                this.match_length = 0;
                /* length of best match */
                this.prev_match = 0;
                /* previous match */
                this.match_available = 0;
                /* set if previous match exists */
                this.strstart = 0;
                /* start of string to insert */
                this.match_start = 0;
                /* start of matching string */
                this.lookahead = 0;
                /* number of valid bytes ahead in window */
                this.prev_length = 0;
                /* Length of the best match at previous step. Matches not greater than this
                 * are discarded. This is used in the lazy match evaluation.
                 */
                this.max_chain_length = 0;
                /* To speed up deflation, hash chains are never searched beyond this
                 * length.  A higher limit improves compression ratio but degrades the
                 * speed.
                 */
                this.max_lazy_match = 0;
                /* Attempt to find a better match only when the current match is strictly
                 * smaller than this value. This mechanism is used only for compression
                 * levels >= 4.
                 */
                // That's alias to max_lazy_match, don't use directly
                // this.max_insert_length = 0;
                /* Insert new strings in the hash table only if the match length is not
                 * greater than this length. This saves time but degrades compression.
                 * max_insert_length is used only for compression levels <= 3.
                 */
                this.level = 0;
                /* compression level (1..9) */
                this.strategy = 0;
                /* favor or force Huffman coding */
                this.good_match = 0;
                /* Use a faster search when the previous match is longer than this */
                this.nice_match = 0;
                /* Stop searching when current match exceeds this */
                /* used by trees.c: */
                /* Didn't use ct_data typedef below to suppress compiler warning */
                // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
                // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
                // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */
                // Use flat array of DOUBLE size, with interleaved fata,
                // because JS does not support effective
                this.dyn_ltree = new Uint16Array(HEAP_SIZE$1 * 2);
                this.dyn_dtree = new Uint16Array((2 * D_CODES$1 + 1) * 2);
                this.bl_tree = new Uint16Array((2 * BL_CODES$1 + 1) * 2);
                zero$1(this.dyn_ltree);
                zero$1(this.dyn_dtree);
                zero$1(this.bl_tree);
                this.l_desc = null;
                /* desc. for literal tree */
                this.d_desc = null;
                /* desc. for distance tree */
                this.bl_desc = null;
                /* desc. for bit length tree */
                // ush bl_count[MAX_BITS+1];
                this.bl_count = new Uint16Array(MAX_BITS$1 + 1);
                /* number of codes at each bit length for an optimal tree */
                // int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
                this.heap = new Uint16Array(2 * L_CODES$1 + 1);
                /* heap used to build the Huffman trees */
                zero$1(this.heap);
                this.heap_len = 0;
                /* number of elements in the heap */
                this.heap_max = 0;
                /* element of largest frequency */
                /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
                 * The same heap array is used to build all trees.
                 */
                this.depth = new Uint16Array(2 * L_CODES$1 + 1); // uch depth[2*L_CODES+1];
                zero$1(this.depth);
                /* Depth of each subtree used as tie breaker for trees of equal frequency
                 */
                this.l_buf = 0;
                /* buffer index for literals or lengths */
                this.lit_bufsize = 0;
                /* Size of match buffer for literals/lengths.  There are 4 reasons for
                 * limiting lit_bufsize to 64K:
                 *   - frequencies can be kept in 16 bit counters
                 *   - if compression is not successful for the first block, all input
                 *     data is still in the window so we can still emit a stored block even
                 *     when input comes from standard input.  (This can also be done for
                 *     all blocks if lit_bufsize is not greater than 32K.)
                 *   - if compression is not successful for a file smaller than 64K, we can
                 *     even emit a stored file instead of a stored block (saving 5 bytes).
                 *     This is applicable only for zip (not gzip or zlib).
                 *   - creating new Huffman trees less frequently may not provide fast
                 *     adaptation to changes in the input data statistics. (Take for
                 *     example a binary file with poorly compressible code followed by
                 *     a highly compressible string table.) Smaller buffer sizes give
                 *     fast adaptation but have of course the overhead of transmitting
                 *     trees more frequently.
                 *   - I can't count above 4
                 */
                this.last_lit = 0;
                /* running index in l_buf */
                this.d_buf = 0;
                /* Buffer index for distances. To simplify the code, d_buf and l_buf have
                 * the same number of elements. To use different lengths, an extra flag
                 * array would be necessary.
                 */
                this.opt_len = 0;
                /* bit length of current block with optimal trees */
                this.static_len = 0;
                /* bit length of current block with static trees */
                this.matches = 0;
                /* number of string matches in current block */
                this.insert = 0;
                /* bytes at end of window left to insert */
                this.bi_buf = 0;
                /* Output buffer. bits are inserted starting at the bottom (least
                 * significant bits).
                 */
                this.bi_valid = 0;
                /* Number of valid bits in bi_buf.  All bits above the last valid bit
                 * are always zero.
                 */
                // Used for window memory init. We safely ignore it for JS. That makes
                // sense only for pointers and memory check tools.
                // this.high_water = 0;
                /* High water mark offset in window for initialized bytes -- bytes above
                 * this are set to zero in order to avoid memory check warnings when
                 * longest match routines access bytes past the input.  This is then
                 * updated to the new high water mark.
                 */
            }
            var deflateResetKeep = function deflateResetKeep(strm) {
                if (!strm || !strm.state) {
                    return err(strm, Z_STREAM_ERROR);
                }
                strm.total_in = strm.total_out = 0;
                strm.data_type = Z_UNKNOWN$1;
                var s = strm.state;
                s.pending = 0;
                s.pending_out = 0;
                if (s.wrap < 0) {
                    s.wrap = -s.wrap;
                    /* was made negative by deflate(..., Z_FINISH); */
                }
                s.status = s.wrap ? INIT_STATE : BUSY_STATE;
                strm.adler =
                    s.wrap === 2
                        ? 0 // crc32(0, Z_NULL, 0)
                        : 1; // adler32(0, Z_NULL, 0)
                s.last_flush = Z_NO_FLUSH;
                _tr_init$1(s);
                return Z_OK;
            };
            var deflateReset = function deflateReset(strm) {
                var ret = deflateResetKeep(strm);
                if (ret === Z_OK) {
                    lm_init(strm.state);
                }
                return ret;
            };
            var deflateSetHeader = function deflateSetHeader(strm, head) {
                if (!strm || !strm.state) {
                    return Z_STREAM_ERROR;
                }
                if (strm.state.wrap !== 2) {
                    return Z_STREAM_ERROR;
                }
                strm.state.gzhead = head;
                return Z_OK;
            };
            var deflateInit2 = function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
                if (!strm) {
                    // === Z_NULL
                    return Z_STREAM_ERROR;
                }
                var wrap = 1;
                if (level === Z_DEFAULT_COMPRESSION) {
                    level = 6;
                }
                if (windowBits < 0) {
                    /* suppress zlib wrapper */
                    wrap = 0;
                    windowBits = -windowBits;
                }
                else if (windowBits > 15) {
                    wrap = 2;
                    /* write gzip wrapper instead */
                    windowBits -= 16;
                }
                if (memLevel < 1 ||
                    memLevel > MAX_MEM_LEVEL ||
                    method !== Z_DEFLATED ||
                    windowBits < 8 ||
                    windowBits > 15 ||
                    level < 0 ||
                    level > 9 ||
                    strategy < 0 ||
                    strategy > Z_FIXED$1) {
                    return err(strm, Z_STREAM_ERROR);
                }
                if (windowBits === 8) {
                    windowBits = 9;
                }
                /* until 256-byte window bug fixed */
                var s = new DeflateState();
                strm.state = s;
                s.strm = strm;
                s.wrap = wrap;
                s.gzhead = null;
                s.w_bits = windowBits;
                s.w_size = 1 << s.w_bits;
                s.w_mask = s.w_size - 1;
                s.hash_bits = memLevel + 7;
                s.hash_size = 1 << s.hash_bits;
                s.hash_mask = s.hash_size - 1;
                s.hash_shift = ~~((s.hash_bits + MIN_MATCH$1 - 1) / MIN_MATCH$1);
                s.window = new Uint8Array(s.w_size * 2);
                s.head = new Uint16Array(s.hash_size);
                s.prev = new Uint16Array(s.w_size); // Don't need mem init magic for JS.
                // s.high_water = 0;  /* nothing written to s->window yet */
                s.lit_bufsize = 1 << (memLevel + 6);
                /* 16K elements by default */
                s.pending_buf_size = s.lit_bufsize * 4;
                // overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
                // s->pending_buf = (uchf *) overlay;
                // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
                s.pending_buf = new Uint8Array(s.pending_buf_size);
                // s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
                s.d_buf = 1 * s.lit_bufsize; // s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
                s.l_buf = (1 + 2) * s.lit_bufsize;
                s.level = level;
                s.strategy = strategy;
                s.method = method;
                return deflateReset(strm);
            };
            var deflateInit = function deflateInit(strm, level) {
                return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
            };
            var deflate = function deflate(strm, flush) {
                var beg;
                var val; // for gzip header write only
                if (!strm || !strm.state || flush > Z_BLOCK || flush < 0) {
                    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
                }
                var s = strm.state;
                if (!strm.output || (!strm.input && strm.avail_in !== 0) || (s.status === FINISH_STATE && flush !== Z_FINISH)) {
                    return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR : Z_STREAM_ERROR);
                }
                s.strm = strm;
                /* just in case */
                var old_flush = s.last_flush;
                s.last_flush = flush;
                /* Write the header */
                if (s.status === INIT_STATE) {
                    if (s.wrap === 2) {
                        // GZIP header
                        strm.adler = 0; // crc32(0L, Z_NULL, 0);
                        put_byte(s, 31);
                        put_byte(s, 139);
                        put_byte(s, 8);
                        if (!s.gzhead) {
                            // s->gzhead == Z_NULL
                            put_byte(s, 0);
                            put_byte(s, 0);
                            put_byte(s, 0);
                            put_byte(s, 0);
                            put_byte(s, 0);
                            put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
                            put_byte(s, OS_CODE);
                            s.status = BUSY_STATE;
                        }
                        else {
                            put_byte(s, (s.gzhead.text ? 1 : 0) +
                                (s.gzhead.hcrc ? 2 : 0) +
                                (!s.gzhead.extra ? 0 : 4) +
                                (!s.gzhead.name ? 0 : 8) +
                                (!s.gzhead.comment ? 0 : 16));
                            put_byte(s, s.gzhead.time & 0xff);
                            put_byte(s, (s.gzhead.time >> 8) & 0xff);
                            put_byte(s, (s.gzhead.time >> 16) & 0xff);
                            put_byte(s, (s.gzhead.time >> 24) & 0xff);
                            put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
                            put_byte(s, s.gzhead.os & 0xff);
                            if (s.gzhead.extra && s.gzhead.extra.length) {
                                put_byte(s, s.gzhead.extra.length & 0xff);
                                put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
                            }
                            if (s.gzhead.hcrc) {
                                strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0);
                            }
                            s.gzindex = 0;
                            s.status = EXTRA_STATE;
                        }
                    } // DEFLATE header
                    else {
                        var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
                        var level_flags = -1;
                        if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
                            level_flags = 0;
                        }
                        else if (s.level < 6) {
                            level_flags = 1;
                        }
                        else if (s.level === 6) {
                            level_flags = 2;
                        }
                        else {
                            level_flags = 3;
                        }
                        header |= level_flags << 6;
                        if (s.strstart !== 0) {
                            header |= PRESET_DICT;
                        }
                        header += 31 - (header % 31);
                        s.status = BUSY_STATE;
                        putShortMSB(s, header);
                        /* Save the adler32 of the preset dictionary: */
                        if (s.strstart !== 0) {
                            putShortMSB(s, strm.adler >>> 16);
                            putShortMSB(s, strm.adler & 0xffff);
                        }
                        strm.adler = 1; // adler32(0L, Z_NULL, 0);
                    }
                } // #ifdef GZIP
                if (s.status === EXTRA_STATE) {
                    if (s.gzhead.extra
                    /* != Z_NULL */
                    ) {
                        beg = s.pending;
                        /* start of bytes to update crc */
                        while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
                            if (s.pending === s.pending_buf_size) {
                                if (s.gzhead.hcrc && s.pending > beg) {
                                    strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
                                }
                                flush_pending(strm);
                                beg = s.pending;
                                if (s.pending === s.pending_buf_size) {
                                    break;
                                }
                            }
                            put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
                            s.gzindex++;
                        }
                        if (s.gzhead.hcrc && s.pending > beg) {
                            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
                        }
                        if (s.gzindex === s.gzhead.extra.length) {
                            s.gzindex = 0;
                            s.status = NAME_STATE;
                        }
                    }
                    else {
                        s.status = NAME_STATE;
                    }
                }
                if (s.status === NAME_STATE) {
                    if (s.gzhead.name
                    /* != Z_NULL */
                    ) {
                        beg = s.pending;
                        /* start of bytes to update crc */
                        // int val;
                        do {
                            if (s.pending === s.pending_buf_size) {
                                if (s.gzhead.hcrc && s.pending > beg) {
                                    strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
                                }
                                flush_pending(strm);
                                beg = s.pending;
                                if (s.pending === s.pending_buf_size) {
                                    val = 1;
                                    break;
                                }
                            } // JS specific: little magic to add zero terminator to end of string
                            if (s.gzindex < s.gzhead.name.length) {
                                val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
                            }
                            else {
                                val = 0;
                            }
                            put_byte(s, val);
                        } while (val !== 0);
                        if (s.gzhead.hcrc && s.pending > beg) {
                            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
                        }
                        if (val === 0) {
                            s.gzindex = 0;
                            s.status = COMMENT_STATE;
                        }
                    }
                    else {
                        s.status = COMMENT_STATE;
                    }
                }
                if (s.status === COMMENT_STATE) {
                    if (s.gzhead.comment
                    /* != Z_NULL */
                    ) {
                        beg = s.pending;
                        /* start of bytes to update crc */
                        // int val;
                        do {
                            if (s.pending === s.pending_buf_size) {
                                if (s.gzhead.hcrc && s.pending > beg) {
                                    strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
                                }
                                flush_pending(strm);
                                beg = s.pending;
                                if (s.pending === s.pending_buf_size) {
                                    val = 1;
                                    break;
                                }
                            } // JS specific: little magic to add zero terminator to end of string
                            if (s.gzindex < s.gzhead.comment.length) {
                                val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
                            }
                            else {
                                val = 0;
                            }
                            put_byte(s, val);
                        } while (val !== 0);
                        if (s.gzhead.hcrc && s.pending > beg) {
                            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
                        }
                        if (val === 0) {
                            s.status = HCRC_STATE;
                        }
                    }
                    else {
                        s.status = HCRC_STATE;
                    }
                }
                if (s.status === HCRC_STATE) {
                    if (s.gzhead.hcrc) {
                        if (s.pending + 2 > s.pending_buf_size) {
                            flush_pending(strm);
                        }
                        if (s.pending + 2 <= s.pending_buf_size) {
                            put_byte(s, strm.adler & 0xff);
                            put_byte(s, (strm.adler >> 8) & 0xff);
                            strm.adler = 0; // crc32(0L, Z_NULL, 0);
                            s.status = BUSY_STATE;
                        }
                    }
                    else {
                        s.status = BUSY_STATE;
                    }
                } // #endif
                /* Flush as much pending output as possible */
                if (s.pending !== 0) {
                    flush_pending(strm);
                    if (strm.avail_out === 0) {
                        /* Since avail_out is 0, deflate will be called again with
                         * more output space, but possibly with both pending and
                         * avail_in equal to zero. There won't be anything to do,
                         * but this is not an error situation so make sure we
                         * return OK instead of BUF_ERROR at next call of deflate:
                         */
                        s.last_flush = -1;
                        return Z_OK;
                    }
                    /* Make sure there is something to do and avoid duplicate consecutive
                     * flushes. For repeated and useless calls with Z_FINISH, we keep
                     * returning Z_STREAM_END instead of Z_BUF_ERROR.
                     */
                }
                else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH) {
                    return err(strm, Z_BUF_ERROR);
                }
                /* User must not provide more input after the first FINISH: */
                if (s.status === FINISH_STATE && strm.avail_in !== 0) {
                    return err(strm, Z_BUF_ERROR);
                }
                /* Start a new block or continue the current one.
                 */
                if (strm.avail_in !== 0 || s.lookahead !== 0 || (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
                    var bstate = s.strategy === Z_HUFFMAN_ONLY
                        ? deflate_huff(s, flush)
                        : s.strategy === Z_RLE
                            ? deflate_rle(s, flush)
                            : configuration_table[s.level].func(s, flush);
                    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
                        s.status = FINISH_STATE;
                    }
                    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
                        if (strm.avail_out === 0) {
                            s.last_flush = -1;
                            /* avoid BUF_ERROR next call, see above */
                        }
                        return Z_OK;
                        /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
                         * of deflate should use the same flush parameter to make sure
                         * that the flush is complete. So we don't have to output an
                         * empty block here, this will be done at next call. This also
                         * ensures that for a very small output buffer, we emit at most
                         * one empty block.
                         */
                    }
                    if (bstate === BS_BLOCK_DONE) {
                        if (flush === Z_PARTIAL_FLUSH) {
                            _tr_align$1(s);
                        }
                        else if (flush !== Z_BLOCK) {
                            /* FULL_FLUSH or SYNC_FLUSH */
                            _tr_stored_block$1(s, 0, 0, false);
                            /* For a full flush, this empty block will be recognized
                             * as a special marker by inflate_sync().
                             */
                            if (flush === Z_FULL_FLUSH) {
                                /** * CLEAR_HASH(s); ** */
                                /* forget history */
                                zero$1(s.head); // Fill with NIL (= 0);
                                if (s.lookahead === 0) {
                                    s.strstart = 0;
                                    s.block_start = 0;
                                    s.insert = 0;
                                }
                            }
                        }
                        flush_pending(strm);
                        if (strm.avail_out === 0) {
                            s.last_flush = -1;
                            /* avoid BUF_ERROR at next call, see above */
                            return Z_OK;
                        }
                    }
                } // Assert(strm->avail_out > 0, "bug2");
                // if (strm.avail_out <= 0) { throw new Error("bug2");}
                if (flush !== Z_FINISH) {
                    return Z_OK;
                }
                if (s.wrap <= 0) {
                    return Z_STREAM_END;
                }
                /* Write the trailer */
                if (s.wrap === 2) {
                    put_byte(s, strm.adler & 0xff);
                    put_byte(s, (strm.adler >> 8) & 0xff);
                    put_byte(s, (strm.adler >> 16) & 0xff);
                    put_byte(s, (strm.adler >> 24) & 0xff);
                    put_byte(s, strm.total_in & 0xff);
                    put_byte(s, (strm.total_in >> 8) & 0xff);
                    put_byte(s, (strm.total_in >> 16) & 0xff);
                    put_byte(s, (strm.total_in >> 24) & 0xff);
                }
                else {
                    putShortMSB(s, strm.adler >>> 16);
                    putShortMSB(s, strm.adler & 0xffff);
                }
                flush_pending(strm);
                /* If avail_out is zero, the application will call deflate again
                 * to flush the rest.
                 */
                if (s.wrap > 0) {
                    s.wrap = -s.wrap;
                }
                /* write the trailer only once! */
                return s.pending !== 0 ? Z_OK : Z_STREAM_END;
            };
            var deflateEnd = function deflateEnd(strm) {
                if (!strm ||
                    /* == Z_NULL */
                    !strm.state
                /* == Z_NULL */
                ) {
                    return Z_STREAM_ERROR;
                }
                var status = strm.state.status;
                if (status !== INIT_STATE &&
                    status !== EXTRA_STATE &&
                    status !== NAME_STATE &&
                    status !== COMMENT_STATE &&
                    status !== HCRC_STATE &&
                    status !== BUSY_STATE &&
                    status !== FINISH_STATE) {
                    return err(strm, Z_STREAM_ERROR);
                }
                strm.state = null;
                return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
            };
            /* =========================================================================
             * Initializes the compression dictionary from the given byte
             * sequence without producing any compressed output.
             */
            var deflateSetDictionary = function deflateSetDictionary(strm, dictionary) {
                var dictLength = dictionary.length;
                if (!strm ||
                    /* == Z_NULL */
                    !strm.state
                /* == Z_NULL */
                ) {
                    return Z_STREAM_ERROR;
                }
                var s = strm.state;
                var wrap = s.wrap;
                if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
                    return Z_STREAM_ERROR;
                }
                /* when using zlib wrappers, compute Adler-32 for provided dictionary */
                if (wrap === 1) {
                    /* adler32(strm->adler, dictionary, dictLength); */
                    strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
                }
                s.wrap = 0;
                /* avoid computing Adler-32 in read_buf */
                /* if dictionary would fill window, just replace the history */
                if (dictLength >= s.w_size) {
                    if (wrap === 0) {
                        /* already empty otherwise */
                        /** * CLEAR_HASH(s); ** */
                        zero$1(s.head); // Fill with NIL (= 0);
                        s.strstart = 0;
                        s.block_start = 0;
                        s.insert = 0;
                    }
                    /* use the tail */
                    // dictionary = dictionary.slice(dictLength - s.w_size);
                    var tmpDict = new Uint8Array(s.w_size);
                    tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
                    dictionary = tmpDict;
                    dictLength = s.w_size;
                }
                /* insert dictionary into window and hash */
                var avail = strm.avail_in;
                var next = strm.next_in;
                var input = strm.input;
                strm.avail_in = dictLength;
                strm.next_in = 0;
                strm.input = dictionary;
                fill_window(s);
                while (s.lookahead >= MIN_MATCH$1) {
                    var str = s.strstart;
                    var n = s.lookahead - (MIN_MATCH$1 - 1);
                    do {
                        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
                        s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH$1 - 1]);
                        s.prev[str & s.w_mask] = s.head[s.ins_h];
                        s.head[s.ins_h] = str;
                        str++;
                    } while (--n);
                    s.strstart = str;
                    s.lookahead = MIN_MATCH$1 - 1;
                    fill_window(s);
                }
                s.strstart += s.lookahead;
                s.block_start = s.strstart;
                s.insert = s.lookahead;
                s.lookahead = 0;
                s.match_length = s.prev_length = MIN_MATCH$1 - 1;
                s.match_available = 0;
                strm.next_in = next;
                strm.input = input;
                strm.avail_in = avail;
                s.wrap = wrap;
                return Z_OK;
            };
            var deflateInit_1 = deflateInit;
            var deflateInit2_1 = deflateInit2;
            var deflateReset_1 = deflateReset;
            var deflateResetKeep_1 = deflateResetKeep;
            var deflateSetHeader_1 = deflateSetHeader;
            var deflate_2 = deflate;
            var deflateEnd_1 = deflateEnd;
            var deflateSetDictionary_1 = deflateSetDictionary;
            var deflateInfo = 'pako deflate (from Nodeca project)';
            /* Not implemented
          module.exports.deflateBound = deflateBound;
          module.exports.deflateCopy = deflateCopy;
          module.exports.deflateParams = deflateParams;
          module.exports.deflatePending = deflatePending;
          module.exports.deflatePrime = deflatePrime;
          module.exports.deflateTune = deflateTune;
          */
            var deflate_1 = {
                deflateInit: deflateInit_1,
                deflateInit2: deflateInit2_1,
                deflateReset: deflateReset_1,
                deflateResetKeep: deflateResetKeep_1,
                deflateSetHeader: deflateSetHeader_1,
                deflate: deflate_2,
                deflateEnd: deflateEnd_1,
                deflateSetDictionary: deflateSetDictionary_1,
                deflateInfo: deflateInfo,
            };
            // Join array of chunks to single array.
            function flattenChunks(chunks) {
                // calculate data length
                var len = 0;
                for (var i = 0, l = chunks.length; i < l; i++) {
                    len += chunks[i].length;
                } // join chunks
                var result = new Uint8Array(len);
                for (var _i = 0, pos = 0, _l = chunks.length; _i < _l; _i++) {
                    var chunk = chunks[_i];
                    result.set(chunk, pos);
                    pos += chunk.length;
                }
                return result;
            }
            // String encode/decode helpers
            //
            // - apply(Array) can fail on Android 2.2
            // - apply(Uint8Array) can fail on iOS 5.1 Safari
            //
            // Table with utf8 lengths (calculated by first byte of sequence)
            // Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
            // because max possible codepoint is 0x10ffff
            var _utf8len = new Uint8Array(256);
            for (var q = 0; q < 256; q++) {
                _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
            }
            _utf8len[254] = _utf8len[254] = 1; // Invalid sequence start
            // convert string to array (typed, when possible)
            // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
            //
            // This software is provided 'as-is', without any express or implied
            // warranty. In no event will the authors be held liable for any damages
            // arising from the use of this software.
            //
            // Permission is granted to anyone to use this software for any purpose,
            // including commercial applications, and to alter it and redistribute it
            // freely, subject to the following restrictions:
            //
            // 1. The origin of this software must not be misrepresented; you must not
            //   claim that you wrote the original software. If you use this software
            //   in a product, an acknowledgment in the product documentation would be
            //   appreciated but is not required.
            // 2. Altered source versions must be plainly marked as such, and must not be
            //   misrepresented as being the original software.
            // 3. This notice may not be removed or altered from any source distribution.
            function ZStream() {
                /* next input byte */
                this.input = null; // JS specific, because we have no pointers
                this.next_in = 0;
                /* number of bytes available at input */
                this.avail_in = 0;
                /* total number of input bytes read so far */
                this.total_in = 0;
                /* next output byte should be put there */
                this.output = null; // JS specific, because we have no pointers
                this.next_out = 0;
                /* remaining free space at output */
                this.avail_out = 0;
                /* total number of bytes output so far */
                this.total_out = 0;
                /* last error message, NULL if no error */
                this.msg = '';
                /* Z_NULL */
                /* not visible by applications */
                this.state = null;
                /* best guess about the data type: binary or text */
                this.data_type = 2;
                /* Z_UNKNOWN */
                /* adler32 value of the uncompressed data */
                this.adler = 0;
            }
            var zstream = ZStream;
            // eslint-disable-next-line @typescript-eslint/unbound-method
            var toString = Object.prototype.toString;
            /* Public constants ========================================================== */
            /* =========================================================================== */
            var Z_NO_FLUSH$1 = constants.Z_NO_FLUSH;
            var Z_SYNC_FLUSH = constants.Z_SYNC_FLUSH;
            var Z_FULL_FLUSH$1 = constants.Z_FULL_FLUSH;
            var Z_FINISH$1 = constants.Z_FINISH;
            var Z_OK$1 = constants.Z_OK;
            var Z_STREAM_END$1 = constants.Z_STREAM_END;
            var Z_DEFAULT_COMPRESSION$1 = constants.Z_DEFAULT_COMPRESSION;
            var Z_DEFAULT_STRATEGY$1 = constants.Z_DEFAULT_STRATEGY;
            var Z_DEFLATED$1 = constants.Z_DEFLATED;
            /* =========================================================================== */
            /**
             * class Deflate
             *
             * Generic JS-style wrapper for zlib calls. If you don't need
             * streaming behaviour - use more simple functions: [[deflate]],
             * [[deflateRaw]] and [[gzip]].
             * */
            /* internal
             * Deflate.chunks -> Array
             *
             * Chunks of output data, if [[Deflate#onData]] not overridden.
             * */
            /**
             * Deflate.result -> Uint8Array
             *
             * Compressed result, generated by default [[Deflate#onData]]
             * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
             * (call [[Deflate#push]] with `Z_FINISH` / `true` param).
             * */
            /**
             * Deflate.err -> Number
             *
             * Error code after deflate finished. 0 (Z_OK) on success.
             * You will not need it in real life, because deflate errors
             * are possible only on wrong options or bad `onData` / `onEnd`
             * custom handlers.
             * */
            /**
             * Deflate.msg -> String
             *
             * Error message, if [[Deflate.err]] != 0
             * */
            /**
             * new Deflate(options)
             * - options (Object): zlib deflate options.
             *
             * Creates new deflator instance with specified params. Throws exception
             * on bad params. Supported options:
             *
             * - `level`
             * - `windowBits`
             * - `memLevel`
             * - `strategy`
             * - `dictionary`
             *
             * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
             * for more information on these.
             *
             * Additional options, for internal needs:
             *
             * * `chunkSize` - size of generated data chunks (16K by default)
             * * `raw` (Boolean) - do raw deflate
             * * `gzip` (Boolean) - create gzip wrapper
             * * `header` (Object) - custom header for gzip
             * ** `text` (Boolean) - true if compressed data believed to be text
             * ** `time` (Number) - modification time, unix timestamp
             * ** `os` (Number) - operation system code
             * ** `extra` (Array) - array of bytes with extra data (max 65536)
             * ** `name` (String) - file name (binary string)
             * ** `comment` (String) - comment (binary string)
             * ** `hcrc` (Boolean) - true if header crc should be added
             *
             * ##### Example:
             *
             * ```javascript
             * const pako = require('pako')
             *   , chunk1 = new Uint8Array([1,2,3,4,5,6,7,8,9])
             *   , chunk2 = new Uint8Array([10,11,12,13,14,15,16,17,18,19]);
             *
             * const deflate = new pako.Deflate({ level: 3});
             *
             * deflate.push(chunk1, false);
             * deflate.push(chunk2, true);  // true -> last chunk
             *
             * if (deflate.err) { throw new Error(deflate.err); }
             *
             * console.log(deflate.result);
             * ```
             * */
            function Deflate() {
                this.options = {
                    level: Z_DEFAULT_COMPRESSION$1,
                    method: Z_DEFLATED$1,
                    chunkSize: 16384,
                    windowBits: 15,
                    memLevel: 8,
                    strategy: Z_DEFAULT_STRATEGY$1,
                };
                var opt = this.options;
                if (opt.raw && opt.windowBits > 0) {
                    opt.windowBits = -opt.windowBits;
                }
                else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
                    opt.windowBits += 16;
                }
                this.err = 0; // error code, if happens (0 = Z_OK)
                this.msg = ''; // error message
                this.ended = false; // used to avoid multiple onEnd() calls
                this.chunks = []; // chunks of compressed data
                this.strm = new zstream();
                this.strm.avail_out = 0;
                var status = deflate_1.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy);
                if (status !== Z_OK$1) {
                    throw new Error(messages[status]);
                }
                if (opt.header) {
                    deflate_1.deflateSetHeader(this.strm, opt.header);
                }
                if (opt.dictionary) {
                    var dict; // Convert data if needed
                    if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
                        dict = new Uint8Array(opt.dictionary);
                    }
                    else {
                        dict = opt.dictionary;
                    }
                    status = deflate_1.deflateSetDictionary(this.strm, dict);
                    if (status !== Z_OK$1) {
                        throw new Error(messages[status]);
                    }
                    this._dict_set = true;
                }
            }
            /**
             * Deflate#push(data[, flush_mode]) -> Boolean
             * - data (Uint8Array|ArrayBuffer|String): input data. Strings will be
             * converted to utf8 byte sequence.
             * - flush_mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
             * See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
             *
             * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
             * new compressed chunks. Returns `true` on success. The last data block must
             * have `flush_mode` Z_FINISH (or `true`). That will flush internal pending
             * buffers and call [[Deflate#onEnd]].
             *
             * On fail call [[Deflate#onEnd]] with error code and return false.
             *
             * ##### Example
             *
             * ```javascript
             * push(chunk, false); // push one of data chunks
             * ...
             * push(chunk, true);  // push last chunk
             * ```
             * */
            Deflate.prototype.push = function (data, flush_mode) {
                var strm = this.strm;
                var chunkSize = this.options.chunkSize;
                var status;
                var _flush_mode;
                if (this.ended) {
                    return false;
                }
                if (flush_mode === ~~flush_mode) {
                    _flush_mode = flush_mode;
                }
                else {
                    _flush_mode = flush_mode === true ? Z_FINISH$1 : Z_NO_FLUSH$1;
                } // Convert data if needed
                if (toString.call(data) === '[object ArrayBuffer]') {
                    strm.input = new Uint8Array(data);
                }
                else {
                    strm.input = data;
                }
                strm.next_in = 0;
                strm.avail_in = strm.input.length;
                for (;;) {
                    if (strm.avail_out === 0) {
                        strm.output = new Uint8Array(chunkSize);
                        strm.next_out = 0;
                        strm.avail_out = chunkSize;
                    } // Make sure avail_out > 6 to avoid repeating markers
                    if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH$1) && strm.avail_out <= 6) {
                        this.onData(strm.output.subarray(0, strm.next_out));
                        strm.avail_out = 0;
                        continue;
                    }
                    status = deflate_1.deflate(strm, _flush_mode); // Ended => flush and finish
                    if (status === Z_STREAM_END$1) {
                        if (strm.next_out > 0) {
                            this.onData(strm.output.subarray(0, strm.next_out));
                        }
                        status = deflate_1.deflateEnd(this.strm);
                        this.onEnd(status);
                        this.ended = true;
                        return status === Z_OK$1;
                    } // Flush if out buffer full
                    if (strm.avail_out === 0) {
                        this.onData(strm.output);
                        continue;
                    } // Flush if requested and has data
                    if (_flush_mode > 0 && strm.next_out > 0) {
                        this.onData(strm.output.subarray(0, strm.next_out));
                        strm.avail_out = 0;
                        continue;
                    }
                    if (strm.avail_in === 0) {
                        break;
                    }
                }
                return true;
            };
            /**
             * Deflate#onData(chunk) -> Void
             * - chunk (Uint8Array): output data.
             *
             * By default, stores data blocks in `chunks[]` property and glue
             * those in `onEnd`. Override this handler, if you need another behaviour.
             * */
            Deflate.prototype.onData = function (chunk) {
                this.chunks.push(chunk);
            };
            /**
             * Deflate#onEnd(status) -> Void
             * - status (Number): deflate status. 0 (Z_OK) on success,
             * other if not.
             *
             * Called once after you tell deflate that the input stream is
             * complete (Z_FINISH). By default - join collected chunks,
             * free memory and fill `results` / `err` properties.
             * */
            Deflate.prototype.onEnd = function (status) {
                // On success - join
                if (status === Z_OK$1) {
                    this.result = flattenChunks(this.chunks);
                }
                this.chunks = [];
                this.err = status;
                this.msg = this.strm.msg;
            };
            // https://github.com/nodeca/pako/blob/26dff4fb3472c5532b3bd8856421146d35ab7592/lib/utils/strings.js#L26
            function string2buf(str) {
                if (typeof TextEncoder === 'function' && TextEncoder.prototype.encode) {
                    return new TextEncoder().encode(str);
                }
                var buf;
                var c;
                var c2;
                var m_pos;
                var i;
                var str_len = str.length;
                var buf_len = 0;
                // count binary size
                for (m_pos = 0; m_pos < str_len; m_pos++) {
                    c = str.charCodeAt(m_pos);
                    if ((c & 0xfc00) === 0xd800 && m_pos + 1 < str_len) {
                        c2 = str.charCodeAt(m_pos + 1);
                        if ((c2 & 0xfc00) === 0xdc00) {
                            c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                            m_pos++;
                        }
                    }
                    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
                }
                // allocate buffer
                buf = new Uint8Array(buf_len);
                // convert
                for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
                    c = str.charCodeAt(m_pos);
                    if ((c & 0xfc00) === 0xd800 && m_pos + 1 < str_len) {
                        c2 = str.charCodeAt(m_pos + 1);
                        if ((c2 & 0xfc00) === 0xdc00) {
                            c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                            m_pos++;
                        }
                    }
                    if (c < 0x80) {
                        /* one byte */
                        buf[i++] = c;
                    }
                    else if (c < 0x800) {
                        /* two bytes */
                        buf[i++] = 0xc0 | (c >>> 6);
                        buf[i++] = 0x80 | (c & 0x3f);
                    }
                    else if (c < 0x10000) {
                        /* three bytes */
                        buf[i++] = 0xe0 | (c >>> 12);
                        buf[i++] = 0x80 | ((c >>> 6) & 0x3f);
                        buf[i++] = 0x80 | (c & 0x3f);
                    }
                    else {
                        /* four bytes */
                        buf[i++] = 0xf0 | (c >>> 18);
                        buf[i++] = 0x80 | ((c >>> 12) & 0x3f);
                        buf[i++] = 0x80 | ((c >>> 6) & 0x3f);
                        buf[i++] = 0x80 | (c & 0x3f);
                    }
                }
                return buf;
            }
            return { Deflate: Deflate, constants: constants, string2buf: string2buf };
        }
    }

    var state = { status: 0 /* Nil */ };
    function startDeflateWorker(callback, createDeflateWorkerImpl) {
        if (createDeflateWorkerImpl === void 0) { createDeflateWorkerImpl = createDeflateWorker; }
        switch (state.status) {
            case 0 /* Nil */:
                state = { status: 1 /* Loading */, callbacks: [callback] };
                doStartDeflateWorker(createDeflateWorkerImpl);
                break;
            case 1 /* Loading */:
                state.callbacks.push(callback);
                break;
            case 2 /* Error */:
                callback();
                break;
            case 3 /* Initialized */:
                callback(state.worker);
                break;
        }
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
        if (createDeflateWorkerImpl === void 0) { createDeflateWorkerImpl = createDeflateWorker; }
        try {
            var worker_1 = createDeflateWorkerImpl();
            worker_1.addEventListener('error', monitor(onError));
            worker_1.addEventListener('message', monitor(function (_a) {
                var data = _a.data;
                if (data.type === 'errored') {
                    onError(data.error);
                }
                else if (data.type === 'initialized') {
                    onInitialized(worker_1);
                }
            }));
            worker_1.postMessage({ action: 'init' });
            return worker_1;
        }
        catch (error) {
            onError(error);
        }
    }
    function onInitialized(worker) {
        if (state.status === 1 /* Loading */) {
            state.callbacks.forEach(function (callback) { return callback(worker); });
            state = { status: 3 /* Initialized */, worker: worker };
        }
    }
    function onError(error) {
        if (state.status === 1 /* Loading */) {
            display.error('Session Replay recording failed to start: an error occurred while creating the Worker:', error);
            if (error instanceof Event || (error instanceof Error && includes(error.message, 'Content Security Policy'))) {
                display.error('Please make sure CSP is correctly configured ' +
                    'https://docs.datadoghq.com/real_user_monitoring/faq/content_security_policy');
            }
            else {
                addTelemetryError(error);
            }
            state.callbacks.forEach(function (callback) { return callback(); });
            state = { status: 2 /* Error */ };
        }
        else {
            addTelemetryError(error);
        }
    }

    function send(httpRequest, data, metadata, rawSegmentBytesCount) {
        var formData = new FormData();
        formData.append('segment', new Blob([data], {
            type: 'application/octet-stream',
        }), "".concat(metadata.session.id, "-").concat(metadata.start));
        toFormEntries(metadata, function (key, value) { return formData.append(key, value); });
        formData.append('raw_segment_size', rawSegmentBytesCount.toString());
        httpRequest.sendOnExit({ data: formData, bytesCount: data.byteLength });
    }
    function toFormEntries(input, onEntry, prefix) {
        if (prefix === void 0) { prefix = ''; }
        objectEntries(input).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (typeof value === 'object' && value !== null) {
                toFormEntries(value, onEntry, "".concat(prefix).concat(key, "."));
            }
            else {
                onEntry("".concat(prefix).concat(key), String(value));
            }
        });
    }

    function startRecording(lifeCycle, configuration, sessionManager, viewContexts, worker, httpRequest) {
        var reportError = function (error) {
            lifeCycle.notify(12 /* RAW_ERROR_COLLECTED */, { error: error });
        };
        var replayRequest = httpRequest || createHttpRequest(configuration.sessionReplayEndpointBuilder, SEGMENT_BYTES_LIMIT, reportError, true);
        var _a = startSegmentCollection(lifeCycle, configuration.applicationId, sessionManager, viewContexts, function (data, metadata, rawSegmentBytesCount) { return send(replayRequest, data, metadata, rawSegmentBytesCount); }, worker), addRecord = _a.addRecord, stopSegmentCollection = _a.stop;
        var _b = record({
            emit: addRecord,
            configuration: configuration,
            lifeCycle: lifeCycle,
        }), stopRecording = _b.stop, takeSubsequentFullSnapshot = _b.takeSubsequentFullSnapshot, flushMutations = _b.flushMutations;
        var unsubscribeViewEnded = lifeCycle.subscribe(4 /* VIEW_ENDED */, function () {
            flushMutations();
            addRecord({
                timestamp: timeStampNow(),
                type: RecordType.ViewEnd,
            });
        }).unsubscribe;
        var unsubscribeViewCreated = lifeCycle.subscribe(2 /* VIEW_CREATED */, function (view) {
            takeSubsequentFullSnapshot(view.startClocks.timeStamp);
        }).unsubscribe;
        return {
            stop: function () {
                unsubscribeViewEnded();
                unsubscribeViewCreated();
                stopRecording();
                stopSegmentCollection();
            },
        };
    }

    function makeRecorderApi(startRecordingImpl, startDeflateWorkerImpl) {
        if (startDeflateWorkerImpl === void 0) { startDeflateWorkerImpl = startDeflateWorker; }
        if (canUseEventBridge() || !isBrowserSupported()) {
            return {
                start: noop,
                stop: noop,
                getReplayStats: function () { return undefined; },
                onRumStart: noop,
                isRecording: function () { return false; },
            };
        }
        var state = {
            status: 0 /* Stopped */,
        };
        var startStrategy = function () {
            state = { status: 1 /* IntentToStart */ };
        };
        var stopStrategy = function () {
            state = { status: 0 /* Stopped */ };
        };
        return {
            start: function () { return startStrategy(); },
            stop: function () { return stopStrategy(); },
            getReplayStats: getReplayStats,
            onRumStart: function (lifeCycle, configuration, sessionManager, viewContexts) {
                lifeCycle.subscribe(7 /* SESSION_EXPIRED */, function () {
                    if (state.status === 2 /* Starting */ || state.status === 3 /* Started */) {
                        stopStrategy();
                        state = { status: 1 /* IntentToStart */ };
                    }
                });
                lifeCycle.subscribe(8 /* SESSION_RENEWED */, function () {
                    if (state.status === 1 /* IntentToStart */) {
                        startStrategy();
                    }
                });
                startStrategy = function () {
                    var session = sessionManager.findTrackedSession();
                    if (!session || !session.sessionReplayAllowed) {
                        state = { status: 1 /* IntentToStart */ };
                        return;
                    }
                    if (state.status === 2 /* Starting */ || state.status === 3 /* Started */) {
                        return;
                    }
                    state = { status: 2 /* Starting */ };
                    runOnReadyState('interactive', function () {
                        if (state.status !== 2 /* Starting */) {
                            return;
                        }
                        startDeflateWorkerImpl(function (worker) {
                            if (state.status !== 2 /* Starting */) {
                                return;
                            }
                            if (!worker) {
                                state = {
                                    status: 0 /* Stopped */,
                                };
                                return;
                            }
                            var stopRecording = startRecordingImpl(lifeCycle, configuration, sessionManager, viewContexts, worker).stop;
                            state = {
                                status: 3 /* Started */,
                                stopRecording: stopRecording,
                            };
                        });
                    });
                };
                stopStrategy = function () {
                    if (state.status === 0 /* Stopped */) {
                        return;
                    }
                    if (state.status === 3 /* Started */) {
                        state.stopRecording();
                    }
                    state = {
                        status: 0 /* Stopped */,
                    };
                };
                if (state.status === 1 /* IntentToStart */) {
                    startStrategy();
                }
            },
            isRecording: function () { return state.status === 3 /* Started */; },
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
        typeof Array.from === 'function' && typeof CSSSupportsRule === 'function');
    }

    // Keep the following in sync with packages/rum-slim/src/entries/main.ts
    var recorderApi = makeRecorderApi(startRecording);
    var datadogRum = makeRumPublicApi(startRum, recorderApi);
    defineGlobal(getGlobalObject(), 'DD_RUM', datadogRum);

    function datadog(analytics, settings, integrations) {
        var defaultOptions = {};
        var uniOptions = {
            service: analytics.settings.app.service,
            version: analytics.settings.app.version,
            env: analytics.settings.app.profile,
        };
        var sdkOptions = {
            applicationId: settings.id,
            clientToken: settings.token,
            site: settings.endpoint,
        };
        var rumOptions = __assign({}, analytics.settings.rum);
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
        datadogRum.init(options);
        function addAction(ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var event;
                return __generator(this, function (_a) {
                    event = ctx.event;
                    datadogRum.addAction(event.event, event);
                    return [2 /*return*/, Promise.resolve()];
                });
            });
        }
        var plugin = {
            name: 'Datadog.com',
            type: 'destination',
            version: '4.21.2-1',
            isLoaded: function () { return true; },
            load: function () { return Promise.resolve(); },
            track: addAction,
            // identify: send,
            page: function () { return Promise.resolve(); },
        };
        return plugin;
    }

    return datadog;

})();
