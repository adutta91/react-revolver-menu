import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import './react-revolver-menu.scss';

export default class ReactRevolverMenu extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showStyle : false,
        subItems  : [],
        prevItems : [],
        timeout   : false,
        timeoutCb : null
      };
    }

    componentDidMount() {
      this.startTimeout();
    }

    componentWillUnmount() {
      clearTimeout(this.timeout);
    }

    startTimeout(cb) {
      this.timeout = setTimeout(() => {
        if (this.state.timeoutCb) this.state.timeoutCb();
        this.setState({ showStyle : true, timeout : false });
      }, 500);
    }

    checkTimeout() {
      if (this.state.timeout) {
        this.startTimeout();
      }
    }

    back() {
      let items = this.props.items;
      if (this.state.prevItems) items = this.state.prevItems;
      this.setState({
        showStyle : false,
        timeout   : true,
        timeoutCb : () => {
          this.setState({
            subItems  : items,
            prevItems : [] // TODO - find proper prevItems
          })
        }
      });
    }

    itemClick(item, e) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof item.onClick == 'function') item.onClick();
      if (item.items && item.items.length) {
        let prevItems = this.props.items;
        if (this.state.subItems.length) prevItems = this.state.subItems;
        this.setState({
          showStyle : false,
          timeout   : true,
          timeoutCb : () => {
            this.setState({
              subItems  : item.items,
              prevItems : prevItems
            });
          }
        });
      }
    }

    getStyle(item, interval, idx) {
      if (!this.state.showStyle || item.className == 'center') return {};
      let width = this.props.diameter || '12em';
      let deg = (interval * idx) - 90;

      let style = {
        transform : `rotate(${deg}deg) translate(${width}) rotate(${deg * -1}deg)`
      };

      return style;
    }

    renderItem(item, idx) {
      let interval = parseInt(360 / this.props.items.length);
      if (this.state.subItems.length) interval = parseInt(360 / this.state.subItems.length)
      const style = this.getStyle(item, interval, idx);

      const props = {
        key       : idx,
        // key       : item.key,
        className : `menu-item ${item.className || ''} ${this.state.showStyle ? 'show' : ''}`,
        onClick   : this.itemClick.bind(this, item),
        style     : style,
      };

      switch(item.type) {
        case 'img':
          return <div {...props} ><img src={item.src} /></div>;
        case 'text':
          return <div {...props}>{item.text}</div>;
        case 'icon':
          return <div {...props}><i className={item.faIcon} /></div>;
      }
    }

    renderItems() {
      let items = this.props.items;
      if (this.state.subItems.length) items = this.state.subItems;
      return _.map(items, (item, idx) => {
        return this.renderItem(item, idx);
      });
    }

    renderCenter() {
      let back = <i className='fa fa-3x fa-arrow-circle-o-left' onClick={this.back.bind(this)}/>;
      if (!this.state.prevItems.length) back = null;
      return (
        <div className={`menu-item center ${this.state.showStyle ? 'show' : ''}`}>
          {back}
        </div>
      );
    }

    render() {
      this.checkTimeout();
      return (
        <div className="react-revolver-menu">
          <div className={`circle-container ${this.state.showStyle ? 'show' : ''}`}>
          	{this.renderItems()}
            {this.renderCenter()}
          </div>
        </div>
      );
    }
};

ReactRevolverMenu.propTypes = {
  items : PropTypes.arrayOf(PropTypes.shape({
    type      : PropTypes.oneOf(['img', 'icon', 'text']).isRequired,
    key       : PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]).isRequired,
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
