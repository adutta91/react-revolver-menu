# React Revolver Menu
(WIP)

The React Revolver Menu is an arbitrarily deep menu React Component
Items are arranged in a circle and all subsequent items will replace previous items
in the circle. A 'back' button appears in the center of the menu if there are
previous items in the hierarchy;

See it in action [here](http://www.arjundutta.codes)


# Props
```js
items : PropTypes.arrayOf(PropTypes.shape({
  type              : PropTypes.oneOf(['img', 'icon', 'text']).isRequired,
  text              : PropTypes.string,
  src               : PropTypes.string,
  icon              : PropTypes.string,
  className         : PropTypes.string,
  popover           : PropTypes.string,
  popoverPosition   : PropTypes.oneOf(['bottom', 'top', 'right', 'left']),
  items             : PropTypes.arrayOf(PropTypes.object),
  onClick           : PropTypes.func,
})).isRequired,
diameter     : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
animateDelay : PropTypes.number,
animateStyle : PropTypes.oneOf(['radiate', 'swing']),
border       : PropTypes.oneOf(['dashed', 'solid', 'none'])
```

## items (*required*)
Array of objects that signify the items in the menu
Each item has can have an optional array of items that are the next level of the
menu when the item is clicked.

### type (*required*)
`string` - either `img`, `icon`, `text`
### text
`string` - Text to display as menu item. Required if type = `text`.
### src
`string` - Url of image. Required if type = `img`.
### icon
`string` - font-awesome icon className. Required if type = `icon`.
### className
`string` - optional className for the item
### popover
`string` - optional popover text on item hover
### popover
`string` - optional popover position - either `top`, `bottom`, `right`, or `left`
### items
`array` - array of item objects - sub-items when item is clicked
### onClick
`function` - callback called when item is clicked

## diameter
diameter of the menu, can me a number (in pixels) or a string (eg. `300px`)

## animateDelay
the delay between each item in menu showing during transitions

## animateStyle
either 'radiate' or 'swing' - type of transition between menu sub-items

## border
either 'dashed', 'solid', 'none', or none - type of border around the menu


# Usage

`npm install react-revolver-menu`

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
* clone repo && `npm install`
* Development server `npm start`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
