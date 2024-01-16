import { version } from '../package.json';


function Plugin(analytics, settings, integrations) {
  this.analytics = analytics;
  this.settings = settings;
  this.integrations = integrations;
  return this;
}

Plugin.prototype.load = function () {
  console.log(this.settings, this.settings.app, this.settings.rum);
  return Promise.resolve();
};

Plugin.prototype.isLoaded = () => true;

Plugin.prototype.send = (ctx) => { console.log(ctx); };

function factory(settings) {
  const plugin = new Plugin(null, settings, null);

  return {
    name: 'Console',
    version,
    type: 'destination',

    load: plugin.load.bind(plugin),

    isLoaded: plugin.isLoaded.bind(plugin),

    page: plugin.send.bind(plugin),
    track: plugin.send.bind(plugin),
    identify: plugin.send.bind(plugin),
  };
}

export default factory;
