import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import './react-revolver-menu.scss';

export default class ReactRevolverMenu extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      };
    }

    renderItem(item, idx) {
      let style = {

      };
      const props = {
        className : `item-${idx} ${item.faIcon}`,
        onClick   : this.itemClick.bind(this, item.onClick),
        style     : style,

      }
      switch(item.type) {
        case 'img':
          return <img {...props} />
        case 'text':
          return <div {...props}>{item.text}</div>
        case 'icon':
          return <i {...props} />
      }
    }

    renderItems() {
      return _.map(this.props.items, (item, idx) => {
        return this.renderItem(item, idx);
      });
    }

    render() {
      return (
        <div className="react-revolver-menu">
          <div className='circle-container'>
          	{this.renderItems()}
          </div>
        </div>
      );
    }
};

ReactRevolverMenu.propTypes = {
  items : PropTypes.arrayOf(PropTypes.shape({
    type      : PropTypes.oneOf(['img', 'icon', 'text']).isRequired,
    text      : PropTypes.string,
    src       : PropTypes.string,
    faIcon    : PropTypes.string,
    className : PropTypes.string,
    items     : PropTypes.arrayOf(PropTypes.object),
    onClick   : PropTypes.func
  })).isRequired,
  diameter : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  animate  : PropTypes.bool

};
