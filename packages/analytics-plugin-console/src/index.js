import { version } from '../package.json';


function Plugin(options) {
  this.options = options;
  return this;
}

Plugin.prototype.load = function () {
  console.log(this.options);
  return Promise.resolve();
};

Plugin.prototype.isLoaded = () => true;

Plugin.prototype.send = (ctx) => { console.log(ctx); };

function factory(options) {
  const plugin = new Plugin(options);

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
