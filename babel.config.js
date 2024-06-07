module.exports = api => {
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
  ];
  const presets = [
    [
      '@babel/preset-env',
      {
        include: ['transform-arrow-functions'],
      },
    ],
  ];

  api.cache(false);

  return {
    plugins,
    presets,
  };
};
