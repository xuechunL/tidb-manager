'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Column = _react2.default.createClass({
  displayName: 'Column',

  propTypes: {
    align: _react.PropTypes.oneOf(['left', 'center', 'right']),
    width: _react.PropTypes.number,
    fixed: _react.PropTypes.bool,
    resizable: _react.PropTypes.bool,
    sortable: _react.PropTypes.bool,
    flexGrow: _react.PropTypes.number
  },

  render: function render() {
    //组件 <Column> 不需要渲染
    return null;
  }
});

exports.default = Column;