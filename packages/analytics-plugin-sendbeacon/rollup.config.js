import eslint from '@rollup/plugin-eslint';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';


export default [
  {
    input: 'src/index.js',

    external: [
      'core-js/modules/es.array.iterator.js',
      'core-js/modules/es.array.join.js',
      'core-js/modules/es.array.map.js',
      'core-js/modules/es.date.to-string.js',
      'core-js/modules/es.function.bind.js',
      'core-js/modules/es.object.keys.js',
      'core-js/modules/es.object.to-string.js',
      'core-js/modules/es.promise.js',
      'core-js/modules/es.regexp.to-string.js',
      'core-js/modules/es.string.iterator.js',
      'core-js/modules/web.dom-collections.iterator.js',
      'core-js/modules/web.url.js',
      'core-js/modules/web.url-search-params.js',
    ],

    plugins: [
      eslint(),

      json(),

      commonjs({
        sourceMap: false,
      }),

      resolve({
        browser: true,
      }),

      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
      }),
    ],

    output: [
      { file: '.dist/analytics-plugin-sendbeacon.js', format: 'iife', name: 'AnalyticsPluginSendbeacon', exports: 'default' },
    ],
  },
];
