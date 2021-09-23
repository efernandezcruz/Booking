module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // Preserve ES modules
        modules: false,
        // Support browsers with >0.25% market share
        useBuiltIns: 'entry',
        corejs: '3.17',
      },
    ],
    [
      '@babel/preset-react',
      {
        // Automatic environment config for this plugin
        // Check https://babeljs.io/docs/en/babel-preset-react
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    'babel-plugin-transform-react-jsx-img-import',
  ],
};
