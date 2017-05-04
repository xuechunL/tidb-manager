'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClassNameMixin = {
  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'rsuite-table'
    };
  },
  prefix: function prefix(className) {
    var classPrefix = this.props.classPrefix;

    var prefix = classPrefix ? classPrefix + '-' : '';
    return prefix + className;
  }
};

exports.default = ClassNameMixin;