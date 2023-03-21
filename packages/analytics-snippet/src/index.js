/**
 * @param {string} writeKey
 * @param {string} loader // https://gitlab-hbrls.lisitede.com/web-starter/analytics.js
 * @param {string} cdn // https://gitlab-hbrls.lisitede.com/web-starter/
 */
var SEGMENTIO_CONFIG = "{{ __segmentioconfig__ }}"; // eslint-disable-line quotes
/**
 * @param {Array.<>} providers
 * @param {Array.<string>} rum.denyResourceOrigins
 */
var HEAD_O11Y_CONFIG = "{{ __heado11yconfig__ }}"; // eslint-disable-line quotes

var ANALYTICS_LEGACY_SETTINGS = {
  /* eslint-disable */
  analyticsNextEnabled: true,
  integrations: {
    'Actions Google Analytic 4': {
      versionSettings: { componentTypes: ['browser'], version: '' } },
    'Segment.io': { apiKey: SEGMENTIO_CONFIG.writeKey, unbundledIntegrations: [], addBundledMetadata: true, maybeBundledConfigIds: {},
      versionSettings: { componentTypes: ['browser'], version: '4.4.7' } },
  },
  remotePlugins: HEAD_O11Y_CONFIG.providers,
  metrics: { sampleRate: 1 },
  plan: {
    track: { __default: { enabled: true, integrations: {} } },
    identify: { __default: { enabled: true } },
    group: { __default: { enabled: true } }
  },
  edgeFunction: {},
  middlewareSettings: {},
  enabledMiddleware: {},
  legacyVideoPluginsEnabled: true,
  /* eslint-enable */
};

var analytics = (window.analytics = window.analytics || []);

if (!analytics.initialize) {
  if (analytics.invoked) {
    window.console &&
      console.error &&
      console.error('Segment snippet included twice.');
  } else {
    analytics.invoked = !0;
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
      t.src = SEGMENTIO_CONFIG.loader;
      var n = document.getElementsByTagName('script')[0]
      n.parentNode.insertBefore(t, n)
    }
    analytics.SNIPPET_VERSION = '4.13.1'

    var ANALYTICS_LOAD_SETTINGS = {
      cdnSettings: ANALYTICS_LEGACY_SETTINGS,
      writeKey: SEGMENTIO_CONFIG.writeKey,
      cdnURL: SEGMENTIO_CONFIG.cdn,
      app: {
        profile: head.env.profile,
        version: head.env.version,
      },
      rum: {
        denyResourceOrigins: HEAD_O11Y_CONFIG['rum.denyResourceOrigins'],
      },
    };

    var ANALYTICS_LOAD_OPTIONS = {}

    analytics._writeKey = SEGMENTIO_CONFIG.writeKey;
    analytics._loadSettings = ANALYTICS_LOAD_SETTINGS
    analytics._loadOptions = ANALYTICS_LOAD_OPTIONS

    analytics.load(ANALYTICS_LOAD_SETTINGS, ANALYTICS_LOAD_OPTIONS)
    analytics.page()
  }
}
