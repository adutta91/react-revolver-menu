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
        history   : [],
        hovered   : {}
      };
    }

    componentDidMount() {
      this.startTimeout();
    }

    componentWillUnmount() {
      clearTimeout(this.timeout);
    }
    
    startTimeout() {
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

    back(e) {
      e.preventDefault();
      e.stopPropagation();
      
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
          hovered   : {},
          timeoutCb : () => {
            this.setState({
              subItems : item.items
            });
          }
        });
      }
    }

    setOnHover(idx, val) {
      let hovered = this.state.hovered;
      hovered[idx] = val;
      this.setState({ hovered });
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
        key          : idx,
        className    : `menu-item ${item.className || ''} ${this.state.showStyle[idx] ? 'show' : ''}`,
        onClick      : this.itemClick.bind(this, item, idx),
        style        : style,
        onMouseOver  : this.setOnHover.bind(this, idx, true),
        onMouseLeave : this.setOnHover.bind(this, idx, false)
      };

      return this.itemSwitchBoard(item, props, idx);
    }

    itemSwitchBoard(item, props, idx) {
      let popover = this.renderPopover(item, idx);
      switch(item.type) {
        case 'img':
          return <div {...props} ><img src={item.src} />{popover}</div>;
        case 'text':
          return <div {...props}>{item.text}{popover}</div>;
        case 'icon':
          return <div {...props}><i className={item.icon} />{popover}</div>;
      }
    }

    renderPopover(item, idx) {
      if (item.popover) {
        let className = 'popover';
        if (this.state.hovered[idx]) {
          className += ' show';
          switch(item.popoverPosition) {
            case 'top': break; className += ' top';
            case 'bottom': break; className += ' bottom';
            case 'right': break; className += ' right';
            case 'left': break; className += ' left';
            default: break; className += ' bottom';
          }
          if (item.popoverPosition == 'top') className += ' top'
          else className += ' bottom'
        }

        return <div className={className}>{item.popover}</div>
      } else {
        return null;
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
      let back = <span onClick={this.back.bind(this)}>Back</span>;
      // let back = <i className='fa fa-3x fa-arrow-circle-o-left' onClick={this.back.bind(this)}/>;
      let center, props;

      // if no recorded click history, return null
      if (!this.state.history.length) {
        center = null;
        back = null;
      } else {
        center = this.props;
        _.forEach(this.state.history, (idx) => {
          center = center.items[idx]
        });
      }
      return (
        <div className={`menu-item center ${this.state.showStyle ? 'show' : ''}`} onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}>
          { center ? back : null }
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
    type            : PropTypes.oneOf(['img', 'icon', 'text']).isRequired,
    text            : PropTypes.string,
    src             : PropTypes.string,
    icon            : PropTypes.string,
    popover         : PropTypes.string,
    popoverPosition : PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    items           : PropTypes.arrayOf(PropTypes.object),
    onClick         : PropTypes.func,
    className       : PropTypes.string
  })).isRequired,
  diameter     : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  animateDelay : PropTypes.number,
  animateStyle : PropTypes.oneOf(['radiate', 'swing']),
  border       : PropTypes.oneOf(['dashed', 'solid', 'none'])
};
