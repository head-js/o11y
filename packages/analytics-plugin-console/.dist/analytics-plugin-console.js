var AnalyticsPluginConsole = (function () {
  'use strict';

  var version = "0.0.1";

  function Plugin(options) {
    this.options = options;
    return this;
  }
  Plugin.prototype.load = function () {
    console.log(this.options);
    return Promise.resolve();
  };
  Plugin.prototype.isLoaded = function () {
    return true;
  };
  Plugin.prototype.send = function (ctx) {
    console.log(ctx);
  };
  function factory(options) {
    var plugin = new Plugin(options);
    return {
      name: 'Console',
      version: version,
      type: 'destination',
      load: plugin.load.bind(plugin),
      isLoaded: plugin.isLoaded.bind(plugin),
      page: plugin.send.bind(plugin),
      track: plugin.send.bind(plugin),
      identify: plugin.send.bind(plugin)
    };
  }

  return factory;

})();
