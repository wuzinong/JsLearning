import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Icon from './icon';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Button extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      const self = this;
      self.onClickBound = self.onClick.bind(self);
    })();
  }

  onClick(event) {
    this.dispatchEvent('click', event);
  }

  get attrs() {
    const self = this;
    const props = self.props;
    const {
      href,
      target,
      tabLink
    } = props;
    let hrefComputed = href;
    if (href === true) hrefComputed = '#';
    if (href === false) hrefComputed = undefined;
    return Utils.extend({
      href: hrefComputed,
      target,
      'data-tab': Utils.isStringProp(tabLink) && tabLink || undefined
    }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
  }

  get classes() {
    const self = this;
    const props = self.props;
    const {
      noFastclick,
      noFastClick,
      tabLink,
      tabLinkActive,
      round,
      roundIos,
      roundMd,
      fill,
      fillIos,
      fillMd,
      big,
      bigIos,
      bigMd,
      small,
      smallIos,
      smallMd,
      raised,
      active,
      outline,
      disabled,
      className
    } = props;
    return Utils.classNames(className, 'button', {
      'tab-link': tabLink || tabLink === '',
      'tab-link-active': tabLinkActive,
      'no-fastclick': noFastclick || noFastClick,
      'button-round': round,
      'button-round-ios': roundIos,
      'button-round-md': roundMd,
      'button-fill': fill,
      'button-fill-ios': fillIos,
      'button-fill-md': fillMd,
      'button-big': big,
      'button-big-ios': bigIos,
      'button-big-md': bigMd,
      'button-small': small,
      'button-small-ios': smallIos,
      'button-small-md': smallMd,
      'button-raised': raised,
      'button-active': active,
      'button-outline': outline,
      disabled
    }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
  }

  render() {
    const self = this;
    let iconEl;
    let textEl;
    const props = self.props;
    const {
      text,
      icon,
      iconMaterial,
      iconIon,
      iconFa,
      iconF7,
      iconIfMd,
      iconIfIos,
      iconMd,
      iconIos,
      iconColor,
      iconSize,
      id,
      style
    } = props;

    if (text) {
      textEl = React.createElement('span', null, text);
    }

    const mdThemeIcon = iconIfMd || iconMd;
    const iosThemeIcon = iconIfIos || iconIos;

    if (icon || iconMaterial || iconIon || iconFa || iconF7 || mdThemeIcon || iosThemeIcon) {
      iconEl = React.createElement(F7Icon, {
        material: iconMaterial,
        ion: iconIon,
        fa: iconFa,
        f7: iconF7,
        icon: icon,
        md: mdThemeIcon,
        ios: iosThemeIcon,
        color: iconColor,
        size: iconSize
      });
    }

    return React.createElement('a', Object.assign({
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: self.classes
    }, self.attrs), iconEl, textEl, this.slots['default']);
  }

  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;
    el.removeEventListener('click', self.onClickBound);
    delete el.f7RouteProps;

    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, newText => {
      const self = this;
      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    });

    const self = this;
    const el = self.refs.el;
    const {
      routeProps
    } = self.props;

    if (routeProps) {
      el.f7RouteProps = routeProps;
    }
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    el.addEventListener('click', self.onClickBound);
    const {
      tooltip,
      routeProps
    } = self.props;

    if (routeProps) {
      el.f7RouteProps = routeProps;
    }

    if (!tooltip) return;
    self.$f7ready(f7 => {
      self.f7Tooltip = f7.tooltip.create({
        targetEl: el,
        text: tooltip
      });
    });
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

}

__reactComponentSetProps(F7Button, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  noFastclick: Boolean,
  noFastClick: Boolean,
  text: String,
  tabLink: [Boolean, String],
  tabLinkActive: Boolean,
  href: {
    type: [String, Boolean],
    default: '#'
  },
  target: String,
  round: Boolean,
  roundMd: Boolean,
  roundIos: Boolean,
  fill: Boolean,
  fillMd: Boolean,
  fillIos: Boolean,
  big: Boolean,
  bigMd: Boolean,
  bigIos: Boolean,
  small: Boolean,
  smallMd: Boolean,
  smallIos: Boolean,
  raised: Boolean,
  outline: Boolean,
  active: Boolean,
  disabled: Boolean,
  tooltip: String
}, Mixins.colorProps, Mixins.linkIconProps, Mixins.linkRouterProps, Mixins.linkActionsProps));

F7Button.displayName = 'f7-button';
export default F7Button;