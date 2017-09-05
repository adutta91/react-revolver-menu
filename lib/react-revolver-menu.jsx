import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import './react-revolver-menu.scss';

export default class ReactRevolverMenu extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showStyle : {},
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
        this.setStyles(true);
        this.setState({ timeout : false });
      }, 500);
    }

    checkTimeout() {
      if (this.state.timeout) {
        this.startTimeout();
      }
    }

    setStyles(val) {
      const items = this.state.subItems.length ? this.state.subItems : this.props.items;
      let showStyle = _.clone(this.state.showStyle);
      let duration = (this.props.animateDelay || 0);

      const styleCb = (idx) => {
        showStyle[idx] = val;
        this.setState({ showStyle });
      };

      _.forEach(items, (item, idx) => {
        if (duration) {
          setTimeout(styleCb.bind(this, idx), idx * duration);
        } else styleCb(idx);
      });
    }

    back() {
      let items = this.props.items;
      if (this.state.prevItems) items = this.state.prevItems;
      this.setStyles(false);
      this.setState({
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
        this.setStyles(false);
        this.setState({
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

    circleStyle() {
      let width = parseInt(this.props.diameter) || 12;

      let style = {
        width   : `${width*2}em`,
        height  : `${width*2}em`,
        padding : `${(width/2)}em`
      };

      switch(this.props.border) {
        case 'solid':
          style.border = 'solid 1px';
          break;
        case 'dashed':
          style.border = 'dashed 1px';
          break;
        default:
          break;
      }

      return style;
    }

    getStyle(item, interval, idx) {
      if (!this.state.showStyle[idx] || item.className == 'center') return {};
      let width = `${this.props.diameter}em` || '12em';
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
        className : `menu-item ${item.className || ''} ${this.state.showStyle[idx] ? 'show' : ''}`,
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

      // TODO: display prev selected item in center
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
          <div style={this.circleStyle()} className={`circle-container ${this.state.showStyle ? 'show' : ''}`}>
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
  diameter     : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  animateDelay : PropTypes.number,
  border       : PropTypes.oneOf(['dashed', 'solid', 'none'])
};
