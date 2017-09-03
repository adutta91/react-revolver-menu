# react revolver menu

Get the AMD module located at `react-revolver-menu.js` and include it in your project.

Here is a sample integration:

```js
require.config({
  paths: {
    'react': 'vendor/bower_components/react/react',
    'ReactRevolverMenu': 'react-revolver-menu'
  }
});

require(['react', 'ReactRevolverMenu'], function(React, ReactRevolverMenu) {

  React.render(React.createElement(ReactRevolverMenu), document.getElementById('widget-container'));

});
```

## Development

* Development server `npm start`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
