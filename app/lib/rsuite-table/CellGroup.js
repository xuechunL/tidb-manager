'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CellGroup = _react2.default.createClass({
  displayName: 'CellGroup',

  mixins: [_ClassNameMixin2.default],
  propTypes: {
    fixed: _react.PropTypes.bool,
    width: _react.PropTypes.number,
    height: _react.PropTypes.number,
    left: _react.PropTypes.number,
    style: _react.PropTypes.string
  },
  render: function render() {
    var _props = this.props,
        children = _props.children,
        fixed = _props.fixed,
        width = _props.width,
        left = _props.left,
        height = _props.height,
        style = _props.style,
        className = _props.className;


    var classes = (0, _classnames2.default)(className, this.prefix('cell-group'), fixed ? 'fixed' : '');

    var styles = (0, _lodash.assign)({
      width: width,
      transform: 'translate3d(' + (left || 0) + 'px, 0px, 0px)',
      height: height
    }, style);

    return _react2.default.createElement(
      'div',
      { className: classes, style: styles },
      children
    );
  }
});

exports.default = CellGroup;