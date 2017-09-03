import React from 'react/addons';
import ReactRevolverMenu from '../lib/react-revolver-menu.jsx';

describe('ReactRevolverMenu', function() {
  var component;

  beforeEach(function() {
    component = React.addons.TestUtils.renderIntoDocument(
      <ReactRevolverMenu/>
    );
  });

  it('should render', function() {
    expect(component.getDOMNode().className).toEqual('react-revolver-menu');
  });
});
