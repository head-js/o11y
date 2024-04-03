module.exports = {
  plugins: [
    ['@babel/plugin-transform-arrow-functions'],
    ['@babel/plugin-transform-block-scoping'],
    ['@babel/plugin-transform-destructuring'],
    ['@babel/plugin-transform-shorthand-properties'],
  ],
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: '3',
    }]
  ],
}
