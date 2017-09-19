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
        timeout   : false,
        timeoutCb : null,
        history   : []
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
      let items = this.props.items; // TODO - choose proper back
      _.forEach(this.state.history.slice(0, this.state.history.length - 1), (prevIdx) => {
        items = items[prevIdx].items;
      });
      this.setStyles(false);
      this.setState({
        timeout   : true,
        history   : this.state.history.slice(0, this.state.history.length - 1),
        timeoutCb : () => {
          this.setState({
            subItems : items,
          })
        }
      });
    }

    itemClick(item, idx, e) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof item.onClick == 'function') item.onClick();
      if (item.items && item.items.length) {
        this.setStyles(false);
        let history = this.state.history;
        history.push(idx);
        this.setState({
          timeout   : true,
          history   : history,
          timeoutCb : () => {
            this.setState({
              subItems : item.items
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

    swingStyle(item, interval, idx) {
      if (item.className == 'center') return {};
      let width = `${this.props.diameter}em` || '12em';
      let deg = (interval * idx) - 90;
      let style = {
        transform : `rotate(${deg}deg) translate(${width}) rotate(${deg * -1}deg)`
      };

      return style;
    }

    radiateStyle(item, interval, idx) {
      if (item.className == 'center' || !this.state.showStyle[idx]) return {};
      let width = `${this.props.diameter}em` || '12em';
      let deg = (interval * idx) - 90;

      let style = {
        transform : `rotate(${deg}deg) translate(${width}) rotate(${deg * -1}deg)`
      };

      return style;
    }

    getStyle(item, interval, idx) {
      const animateStyle = this.props.animateStyle || 'radiate';

      switch(animateStyle) {
        case 'radiate': return this.radiateStyle(item, interval, idx);
        case 'swing': return this.swingStyle(item, interval, idx);
        default: return {};
      }
    }

    renderItem(item, idx) {
      let interval = parseInt(360 / this.props.items.length);
      if (this.state.subItems.length) interval = parseInt(360 / this.state.subItems.length)
      const style = this.getStyle(item, interval, idx);

      const props = {
        key       : idx,
        className : `menu-item ${item.className || ''} ${this.state.showStyle[idx] ? 'show' : ''}`,
        onClick   : this.itemClick.bind(this, item, idx),
        style     : style,
      };

      return this.itemSwitchBoard(item, props);
    }

    itemSwitchBoard(item, props) {
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
      let center, props;

      if (!this.state.history.length) {
        center = null;
        back = null;
      } else {
        props = {
          className : `menu-item ${this.state.showStyle[0] ? 'show' : ''}`,
          onClick   : this.back.bind(this)
        };
        center = this.props;
        _.forEach(this.state.history, (idx) => {
          center = center.items[idx]
        });
      }
      return (
        <div className={`menu-item center ${this.state.showStyle ? 'show' : ''}`}>
          { center ? back : null }
        </div>
        // {center ? this.itemSwitchBoard(center, props) : back}
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
    text      : PropTypes.string,
    src       : PropTypes.string,
    faIcon    : PropTypes.string,
    className : PropTypes.string,
    items     : PropTypes.arrayOf(PropTypes.object),
    onClick   : PropTypes.func
  })).isRequired,
  diameter     : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  animateDelay : PropTypes.number,
  animateStyle : PropTypes.oneOf(['radiate', 'swing']),
  border       : PropTypes.oneOf(['dashed', 'solid', 'none'])
};
