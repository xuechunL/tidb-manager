'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Row = _react2.default.createClass({
  displayName: 'Row',

  mixins: [_ClassNameMixin2.default],
  PropTypes: {
    width: _react.PropTypes.number,
    height: _react.PropTypes.number,
    headerHeight: _react.PropTypes.number,
    top: _react.PropTypes.number,
    style: _react.PropTypes.object,
    isHeaderRow: _react.PropTypes.bool
  },
  getDefaultProps: function getDefaultProps() {
    return {
      height: 36,
      headerHeight: 36,
      isHeaderRow: false
    };
  },
  render: function render() {
    var _props = this.props,
        children = _props.children,
        className = _props.className,
        width = _props.width,
        height = _props.height,
        top = _props.top,
        style = _props.style,
        isHeaderRow = _props.isHeaderRow,
        headerHeight = _props.headerHeight,
        props = _objectWithoutProperties(_props, ['children', 'className', 'width', 'height', 'top', 'style', 'isHeaderRow', 'headerHeight']);

    var classes = (0, _classnames2.default)(this.prefix('row'), isHeaderRow ? this.prefix('row-header') : '', className);

    var styles = (0, _lodash.assign)({
      minWidth: width,
      height: isHeaderRow ? headerHeight : height,
      transform: 'translate3d(0px, ' + top + 'px, 0px)'
      //top
    }, style);

    return _react2.default.createElement(
      'div',
      _extends({
        className: classes,
        style: styles
      }, props),
      children
    );
  }
});

exports.default = Row;