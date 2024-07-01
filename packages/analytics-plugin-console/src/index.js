import Ajv from 'ajv';
import { version } from '../package.json';
import settingsSchema from './schemas/settings';


const ajv = new Ajv({ allErrors: true, useDefaults: true, removeAdditional: true, coerceTypes: true });

// https://github.com/ajv-validator/ajv-keywords/blob/v3.5.2/keywords/transform.js
ajv.addKeyword('alias', {
  modifying: true,

  compile: (conf, schema, it) => { // eslint-disable-line no-unused-vars, arrow-body-style
    // console.log(conf, schema, it);
    return (value, keyPath, node, key, root) => { // eslint-disable-line no-unused-vars
      // console.log(conf, schema, it);
      // console.log(value, keyPath, node, key, root);

      let replaced = false;
      Object.keys(conf).forEach((alias) => {
        const name = conf[alias];
        if (replaced) {
          delete value[alias]; // eslint-disable-line no-param-reassign
        } else {
          if (value[name]) {
            // pass
          } else {
            if (value[alias]) {
              value[name] = value[alias]; // eslint-disable-line no-param-reassign
              delete value[alias]; // eslint-disable-line no-param-reassign
              replaced = true;
            }
          }
        }
      });

      return replaced;
    };
  },
});

const validateSettings = ajv.compile(settingsSchema);


function Plugin(settings) {
  this.settings = settings;
  return this;
}

Plugin.prototype.load = function () {
  console.log(this.settings, this.settings.app, this.settings.rum);
  return Promise.resolve();
};

Plugin.prototype.isLoaded = () => true;

Plugin.prototype.send = (ctx) => { console.log(ctx); };

function factory(settings) {
  // console.log('[BEFORE]', JSON.stringify(settings));
  const valid = validateSettings(settings);
  // console.log('[AFTER]', JSON.stringify(settings));
  if (!valid) {
    console.table(validateSettings.errors);
  }

  const plugin = new Plugin(settings);

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
