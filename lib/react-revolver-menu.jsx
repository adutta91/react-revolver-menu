import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import './react-revolver-menu.scss';

export default class ReactRevolverMenu extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showStyle : false
      };
    }

    componentDidMount() {
      setTimeout(() => {
        console.log('setting');
        this.setState({ showStyle : true });
      }, 1000);
    }

    itemClick(cb, e) {
      e.preventDefault();
      e.stopPropagation();
      cb();
    }

    getStyle(interval, idx) {
      if (!this.state.showStyle) return {};
      let width = this.props.diameter || '12em';
      let deg = `${interval * idx}deg`;

      let style = {
        transform : `rotate(${deg}) translate(${width}) rotate(-${deg})`
      };

      // edge cases: top & bottom
      if ((interval * idx)/180 == 1) {
        style.transform = `translate(-${width})`
      } else if (Number.isInteger((interval * idx)/180)) {
        style.transform = `translate(${width})`
      }
      return style;
    }

    renderItem(item, idx) {
      let interval = parseInt(360 / this.props.items.length);

      const style = this.getStyle(interval, idx);

      const props = {
        key       : idx,
        className : `menu-item ${item.faIcon || ''}`,
        onClick   : this.itemClick.bind(this, item.onClick),
        style     : style,
      };

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
      console.log('rendering');
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
