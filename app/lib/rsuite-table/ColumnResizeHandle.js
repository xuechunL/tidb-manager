'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _domLib = require('dom-lib');

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

var _ReactComponentWithPureRenderMixin = require('./mixins/ReactComponentWithPureRenderMixin');

var _ReactComponentWithPureRenderMixin2 = _interopRequireDefault(_ReactComponentWithPureRenderMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clamp(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

var ColumnResizeHandle = _react2.default.createClass({
  displayName: 'ColumnResizeHandle',

  mixins: [_ClassNameMixin2.default, _ReactComponentWithPureRenderMixin2.default],
  propTypes: {
    columnWidth: _react.PropTypes.number,
    columnLeft: _react.PropTypes.number,
    columnFixed: _react.PropTypes.bool,
    onColumnResize: _react.PropTypes.func,
    onColumnResizeEnd: _react.PropTypes.func,
    onColumnResizeMove: _react.PropTypes.func
  },
  getInitialState: function getInitialState() {
    return {
      columnWidth: this.props.columnWidth,
      cursorDelta: 0,
      visible: false
    };
  },
  _onMove: function _onMove(deltaX, deltaY) {

    if (!this.isKeyDown) {
      return;
    }

    var newWidth = this.state.cursorDelta + deltaX;
    var newColumnWidth = clamp(this.props.columnWidth + newWidth, 20);

    this.setState({
      columnWidth: newColumnWidth,
      cursorDelta: newWidth
    });

    this.props.onColumnResizeMove(newColumnWidth, this.props.columnLeft, this.props.columnFixed);
  },
  _onColumnResizeEnd: function _onColumnResizeEnd() {

    this.isKeyDown = false;

    this.props.onColumnResizeEnd(this.state.columnWidth, this.state.cursorDelta);

    if (this._mouseMoveTracker) {
      this._mouseMoveTracker.releaseMouseMoves();
      this._mouseMoveTracker = null;
    }

    this.setState({
      visible: false
    });
  },
  _getMouseMoveTracker: function _getMouseMoveTracker() {
    return this._mouseMoveTracker || new _domLib.DOMMouseMoveTracker(this._onMove, this._onColumnResizeEnd, document.body);
  },
  _onColumnResizeMouseDown: function _onColumnResizeMouseDown(event) {

    this._mouseMoveTracker = this._getMouseMoveTracker();
    this.isKeyDown = true;
    this.setState({
      visible: true,
      cursorDelta: 0
    });

    this.props.onColumnResize(this.props.columnWidth, this.props.columnLeft, {
      clientX: event.clientX,
      clientY: event.clientY,
      preventDefault: function preventDefault() {}
    });
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    if (this.isKeyDown && newProps.initialEvent && !this._mouseMoveTracker.isDragging()) {
      this._mouseMoveTracker.captureMouseMoves(newProps.initialEvent);
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this._mouseMoveTracker) {
      this._mouseMoveTracker.releaseMouseMoves();
      this._mouseMoveTracker = null;
    }
  },
  render: function render() {
    var columnLeft = this.props.columnLeft;
    var _state = this.state,
        columnWidth = _state.columnWidth,
        visible = _state.visible;


    var styles = {
      width: 6,
      left: columnWidth + columnLeft - 2
    };

    var classes = (0, _classnames2.default)({ visible: visible }, this.prefix('column-resize-spanner'));

    return _react2.default.createElement('div', {
      className: classes,
      style: styles,
      onMouseDown: this._onColumnResizeMouseDown,
      ref: 'spanner'
    });
  }
});

exports.default = ColumnResizeHandle;