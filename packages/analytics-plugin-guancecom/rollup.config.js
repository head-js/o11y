// import eslint from '@rollup/plugin-eslint';
// import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
// import babel from '@rollup/plugin-babel';


export default [
  {
    input: 'src/index.ts',

    external: [
      // 'core-js/modules/es.object.to-string.js',
      // 'core-js/modules/es.promise.js',
    ],

    plugins: [
      // eslint(),

      // json(),

      resolve({
        browser: true,
      }),

      commonjs({
        sourceMap: false,
      }),

      typescript(),

      // babel({
      //   exclude: 'node_modules/**',
      //   babelHelpers: 'bundled',
      // }),
    ],

    output: [
      { file: '.dist/analytics-plugin-guancecom.js', format: 'iife', name: 'AnalyticsPluginGuancecom' },
    ],
  },
];
