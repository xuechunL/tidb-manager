'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _rsuite = require('rsuite');

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TablePagination = _react2.default.createClass({
  displayName: 'TablePagination',

  mixins: [_ClassNameMixin2.default],
  propTypes: {
    lengthMenu: _react.PropTypes.arrayOf(_react2.default.PropTypes.shape({
      value: _react.PropTypes.number,
      text: _react.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])
    })),
    showLengthMenu: _react.PropTypes.bool,
    showInfo: _react.PropTypes.bool,
    total: _react.PropTypes.number.isRequired,
    displayLength: _react.PropTypes.number,
    formatLengthMenu: _react.PropTypes.func,
    formatInfo: _react.PropTypes.func,
    onChangePage: _react.PropTypes.func,
    onChangeLength: _react.PropTypes.func,
    prev: _react.PropTypes.bool,
    next: _react.PropTypes.bool,
    first: _react.PropTypes.bool,
    last: _react.PropTypes.bool,
    maxButtons: _react.PropTypes.number,
    activePage: _react.PropTypes.number
  },
  getDefaultProps: function getDefaultProps() {
    return {
      showLengthMenu: true,
      showInfo: true,
      lengthMenu: [{
        value: 30,
        text: 30
      }, {
        value: 50,
        text: 50
      }, {
        value: 100,
        text: 100
      }],
      displayLength: 30,
      prev: true,
      next: true,
      first: true,
      last: true,
      maxButtons: 5
    };
  },
  getInitialState: function getInitialState() {
    var _props = this.props,
        displayLength = _props.displayLength,
        activePage = _props.activePage;

    return {
      displayLength: displayLength,
      activePage: activePage || 1
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _props2 = this.props,
        displayLength = _props2.displayLength,
        activePage = _props2.activePage;

    if (displayLength !== nextProps.displayLength || activePage !== nextProps.activePage) {
      this.setState({
        displayLength: nextProps.displayLength,
        activePage: nextProps.activePage
      });
    }
  },
  handleChangeLength: function handleChangeLength(eventKey) {
    var onChangeLength = this.props.onChangeLength;

    this.setState({
      displayLength: eventKey
    });
    onChangeLength && onChangeLength(eventKey);
  },
  handleChangePage: function handleChangePage(eventKey) {
    var onChangePage = this.props.onChangePage;

    this.setState({
      activePage: eventKey
    });
    onChangePage && onChangePage(eventKey);
  },
  renderLengthMenu: function renderLengthMenu() {
    var _props3 = this.props,
        lengthMenu = _props3.lengthMenu,
        formatLengthMenu = _props3.formatLengthMenu,
        showLengthMenu = _props3.showLengthMenu;
    var displayLength = this.state.displayLength;


    if (!showLengthMenu) {
      return null;
    }

    var items = lengthMenu.map(function (item, index) {
      return _react2.default.createElement(
        _rsuite.Dropdown.Item,
        { key: index, eventKey: item.value },
        item.text
      );
    });

    return _react2.default.createElement(
      'div',
      { className: this.prefix('length-menu') },
      formatLengthMenu(_react2.default.createElement(
        _rsuite.Dropdown,
        {
          shape: 'default',
          activeKey: displayLength,
          onSelect: this.handleChangeLength,
          dropup: true,
          select: true },
        items
      ))
    );
  },
  renderInfo: function renderInfo() {
    var _props4 = this.props,
        formatInfo = _props4.formatInfo,
        total = _props4.total,
        showInfo = _props4.showInfo;


    if (!showInfo) {
      return null;
    }

    var activePage = this.state.activePage;

    return _react2.default.createElement(
      'div',
      { className: this.prefix('page-info') },
      formatInfo(total, activePage)
    );
  },
  render: function render() {
    var _props5 = this.props,
        total = _props5.total,
        prev = _props5.prev,
        next = _props5.next,
        first = _props5.first,
        last = _props5.last,
        maxButtons = _props5.maxButtons,
        className = _props5.className;
    var _state = this.state,
        displayLength = _state.displayLength,
        activePage = _state.activePage;

    var pages = parseInt(total / displayLength) + (total % displayLength ? 1 : 0);
    var classes = (0, _classnames2.default)(this.prefix('pagination-wrapper'), className);

    return _react2.default.createElement(
      'div',
      { className: classes },
      this.renderLengthMenu(),
      this.renderInfo(),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(this.prefix('pagination')) },
        _react2.default.createElement(_rsuite.Pagination, {
          prev: prev,
          next: next,
          first: first,
          last: last,
          maxButtons: maxButtons,
          pages: pages,
          onSelect: this.handleChangePage,
          activePage: activePage })
      )
    );
  }
});

exports.default = TablePagination;