module.exports = {
  js2svg: {
    indent: 2,
    pretty: true
  },

  plugins: [
    // set of built-in plugins enabled by default with overrides
    {
      name: "preset-default",
      params: {
        overrides: {
          // customize default plugin options
          // inlineStyles: {
          //   onlyMatchedOnce: false,
          // },
          // or disable plugins
          // removeDoctype: false,
        }
      }
    }

    // enable built-in plugins by name
    // 'mergePaths',
    // 'collapseGroups',

    // or by expanded notation which allows to configure plugin
    // {
    //   name: 'sortAttrs',
    //   params: {
    //     xmlnsOrder: 'alphabetical',
    //   },
    // },
  ]
}
