'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Cell = require('./Cell');

var _Cell2 = _interopRequireDefault(_Cell);

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

var _ColumnResizeHandle = require('./ColumnResizeHandle');

var _ColumnResizeHandle2 = _interopRequireDefault(_ColumnResizeHandle);

var _isIE = require('./utils/isIE8');

var _isIE2 = _interopRequireDefault(_isIE);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderCell = _react2.default.createClass({
  displayName: 'HeaderCell',

  mixins: [_ClassNameMixin2.default],
  propTypes: {
    sortable: _react.PropTypes.bool,
    resizable: _react.PropTypes.bool,
    onColumnResizeEnd: _react.PropTypes.func,
    onColumnResize: _react.PropTypes.func,
    onColumnResizeMove: _react.PropTypes.func,
    onSortColumn: _react.PropTypes.func,
    headerHeight: _react.PropTypes.number
  },
  _onColumnResize: function _onColumnResize(width, left, event) {
    this.setState({
      columnWidth: width,
      initialEvent: event
    });
    this.props.onColumnResize(width, left, event);
  },
  _onColumnResizeEnd: function _onColumnResizeEnd(columnWidth, cursorDelta) {
    this.setState({
      columnWidth: columnWidth
    });

    this.props.onColumnResizeEnd(columnWidth, cursorDelta, this.props.dataKey, this.props.index);
  },
  getInitialState: function getInitialState() {
    return {
      columnWidth: this.props.width
    };
  },
  renderResizeSpanner: function renderResizeSpanner() {
    var _props = this.props,
        resizable = _props.resizable,
        left = _props.left,
        onColumnResizeMove = _props.onColumnResizeMove,
        fixed = _props.fixed;
    var _state = this.state,
        columnWidth = _state.columnWidth,
        initialEvent = _state.initialEvent;


    if (!resizable) {
      return null;
    }

    return _react2.default.createElement(_ColumnResizeHandle2.default, {
      columnWidth: columnWidth,
      columnLeft: left,
      columnFixed: fixed,
      initialEvent: initialEvent,
      onColumnResizeMove: onColumnResizeMove,
      onColumnResize: this._onColumnResize,
      onColumnResizeEnd: this._onColumnResizeEnd
    });
  },
  renderSortColumn: function renderSortColumn() {
    var _props2 = this.props,
        left = _props2.left,
        headerHeight = _props2.headerHeight,
        sortable = _props2.sortable,
        sortColumn = _props2.sortColumn,
        sortType = _props2.sortType,
        dataKey = _props2.dataKey;
    var columnWidth = this.state.columnWidth;


    var styles = {
      left: columnWidth + left - 16,
      top: headerHeight / 2 - 8
    };

    if (sortable) {

      var icon = _react2.default.createElement('i', { className: sortColumn === dataKey ? 'icon icon-sort-' + sortType : 'icon icon-sort' });
      return _react2.default.createElement(
        'div',
        { style: styles, className: this.prefix('sortable') },
        icon
      );
    }

    return null;
  },
  handleClick: function handleClick() {
    var _props3 = this.props,
        sortable = _props3.sortable,
        dataKey = _props3.dataKey,
        sortType = _props3.sortType,
        onSortColumn = _props3.onSortColumn;

    sortable && onSortColumn && onSortColumn(dataKey, sortType === 'asc' ? 'desc' : 'asc');
  },
  render: function render() {

    var classes = this.prefix('cell-header');
    var sortable = this.props.sortable;


    return _react2.default.createElement(
      'div',
      { className: classes },
      _react2.default.createElement(_Cell2.default, _extends({ isHeaderCell: true }, this.props, { onClick: this.handleClick })),
      this.renderSortColumn(),
      !_isIE2.default && this.renderResizeSpanner()
    );
  }
});

exports.default = HeaderCell;