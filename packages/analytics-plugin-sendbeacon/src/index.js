import { version } from '../package.json';
import sendBeacon from './utils/sendBeacon';


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

Plugin.prototype.send = function (ctx) {
  const { messageId, type, timestamp, context, properties } = ctx.event; // eslint-disable-line
  // console.log(timestamp);
  // console.log(context);
  // console.log(properties);
  sendBeacon(this.settings.endpoint, { type }, { messageId, ...properties });
};

function factory(settings) {
  const plugin = new Plugin(null, settings, null);

  return {
    name: 'SendBeacon',
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
