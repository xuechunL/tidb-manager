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

var LAYER_WIDTH = 30;
var Cell = _react2.default.createClass({
  displayName: 'Cell',

  mixins: [_ClassNameMixin2.default],
  propTypes: {
    dataKey: _react.PropTypes.string,

    align: _react.PropTypes.oneOf(['left', 'center', 'right']),
    className: _react.PropTypes.string,
    isHeaderCell: _react.PropTypes.bool,

    width: _react.PropTypes.number,
    height: _react.PropTypes.number,
    left: _react.PropTypes.number,
    headerHeight: _react.PropTypes.number,

    rowData: _react.PropTypes.object,
    rowIndex: _react.PropTypes.number,

    cellData: _react.PropTypes.any,
    cellRenderer: _react.PropTypes.func,

    fixed: _react.PropTypes.bool,

    style: _react.PropTypes.object,
    firstColumn: _react.PropTypes.bool,
    lastColumn: _react.PropTypes.bool,
    hasChildren: _react.PropTypes.bool,

    onTreeToggle: _react.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      align: 'left',
      headerHeight: 36,
      height: 36
    };
  },
  renderCell: function renderCell(content) {
    var _props = this.props,
        width = _props.width,
        left = _props.left,
        height = _props.height,
        style = _props.style,
        className = _props.className,
        firstColumn = _props.firstColumn,
        lastColumn = _props.lastColumn,
        isHeaderCell = _props.isHeaderCell,
        headerHeight = _props.headerHeight,
        layer = _props.layer,
        onTreeToggle = _props.onTreeToggle,
        hasChildren = _props.hasChildren,
        rowIndex = _props.rowIndex,
        rowKey = _props.rowKey,
        align = _props.align,
        sortable = _props.sortable,
        props = _objectWithoutProperties(_props, ['width', 'left', 'height', 'style', 'className', 'firstColumn', 'lastColumn', 'isHeaderCell', 'headerHeight', 'layer', 'onTreeToggle', 'hasChildren', 'rowIndex', 'rowKey', 'align', 'sortable']);

    var classes = (0, _classnames2.default)(this.prefix('cell'), className, {
      'sortable': sortable && isHeaderCell,
      'first': firstColumn,
      'last': lastColumn
    });
    var layerWidth = layer * LAYER_WIDTH;

    width = !isHeaderCell && firstColumn ? width - layerWidth : width;

    var styles = (0, _lodash.assign)({
      height: isHeaderCell ? headerHeight : height,
      zIndex: layer,
      width: width,
      left: !isHeaderCell && firstColumn ? left + layerWidth : left
    }, style);

    var contentStyles = {
      width: width,
      textAlign: align
    };

    if (sortable) {
      contentStyles.paddingRight = 28;
    }

    var expandIcon = hasChildren && firstColumn ? _react2.default.createElement('i', { className: 'expand-icon icon',
      onClick: function onClick(event) {
        return onTreeToggle(rowKey, rowIndex, event);
      } }) : null;

    content = _react2.default.createElement(
      'div',
      { className: this.prefix('cell-content'), style: contentStyles
      },
      expandIcon,
      content
    );

    return _react2.default.createElement(
      'div',
      _extends({ className: classes, style: styles }, props),
      _react2.default.createElement(
        'div',
        { className: this.prefix('cell-wrap1') },
        _react2.default.createElement(
          'div',
          { className: this.prefix('cell-wrap2') },
          _react2.default.createElement(
            'div',
            { className: this.prefix('cell-wrap3') },
            content
          )
        )
      )
    );
  },
  render: function render() {
    var _props2 = this.props,
        children = _props2.children,
        rowData = _props2.rowData,
        isHeaderCell = _props2.isHeaderCell,
        dataKey = _props2.dataKey,
        fixed = _props2.fixed;


    if (isHeaderCell) {
      return this.renderCell(children);
    }

    return this.renderCell(children || rowData[dataKey]);
  }
});

exports.default = Cell;