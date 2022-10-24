var ANALYTICS_WRITE_KEY = '';
var ANALYTICS_LEGACY_SETTINGS = {};

var analytics = (window.analytics = window.analytics || [])
if (!analytics.initialize)
  if (analytics.invoked)
    window.console &&
      console.error &&
      console.error('Segment snippet included twice.')
else {
  analytics.invoked = !0
  analytics.methods = [
    // 'screen',
    // 'register',
    // 'deregister',
    // 'trackSubmit',
    // 'trackClick',
    // 'trackLink',
    // 'trackForm',
    // 'pageview',
    'identify',
    // 'reset',
    // 'group',
    'track',
    'ready',
    // 'alias',
    // 'debug',
    'page',
    // 'once',
    // 'off',
    // 'on',
    // 'addSourceMiddleware',
    // 'addIntegrationMiddleware',
    // 'setAnonymousId',
    // 'addDestinationMiddleware',
  ]
  analytics.factory = function (e) {
    return function () {
      var t = Array.prototype.slice.call(arguments)
      t.unshift(e)
      analytics.push(t)
      return analytics
    }
  }
  for (var e = 0; e < analytics.methods.length; e++) {
    var key = analytics.methods[e]
    analytics[key] = analytics.factory(key)
  }
  analytics.load = function (settings, options) {
    var t = document.createElement('script')
    t.type = 'text/javascript'
    t.async = !0
    t.src = ''
    var n = document.getElementsByTagName('script')[0]
    n.parentNode.insertBefore(t, n)
  }
  analytics.SNIPPET_VERSION = '4.13.1'

  var ANALYTICS_LOAD_SETTINGS = {
    cdnSettings: ANALYTICS_LEGACY_SETTINGS,
    writeKey: ANALYTICS_WRITE_KEY,
    cdnURL: 'https://cdn.segment.com',
  };

  var ANALYTICS_LOAD_OPTIONS = {}

  analytics._writeKey = ANALYTICS_WRITE_KEY
  analytics._loadSettings = ANALYTICS_LOAD_SETTINGS
  analytics._loadOptions = ANALYTICS_LOAD_OPTIONS

  analytics.load(ANALYTICS_LOAD_SETTINGS, ANALYTICS_LOAD_OPTIONS)
  analytics.page()
}
