'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _domLib = require('dom-lib');

var _lodash = require('lodash');

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _CellGroup = require('./CellGroup');

var _CellGroup2 = _interopRequireDefault(_CellGroup);

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

var _isIE = require('./utils/isIE8');

var _isIE2 = _interopRequireDefault(_isIE);

var _debounce = require('./utils/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getTotalByColumns(columns) {
  var totalFlexGrow = 0;
  var totalWidth = 0;
  for (var i = 0; i < columns.length; ++i) {
    totalFlexGrow += columns[i].props.flexGrow || 0;
    totalWidth += columns[i].props.width || 0;
  }
  return {
    totalFlexGrow: totalFlexGrow,
    totalWidth: totalWidth
  };
}

var ReactChildren = _react2.default.Children;
var LAYER_WIDTH = 30;
var Table = _react2.default.createClass({
  displayName: 'Table',

  mixins: [_ClassNameMixin2.default],
  propTypes: {
    width: _react.PropTypes.number,
    data: _react.PropTypes.array.isRequired,
    height: _react.PropTypes.number,
    rowHeight: _react.PropTypes.number,
    headerHeight: _react.PropTypes.number,
    scrollLeft: _react.PropTypes.number,
    scrollTop: _react.PropTypes.number,
    onRowClick: _react.PropTypes.func,
    isTree: _react.PropTypes.bool,
    expand: _react.PropTypes.bool,
    locale: _react.PropTypes.object,
    sortColumn: _react.PropTypes.string,
    sortType: _react.PropTypes.oneOf(['desc', 'asc']),
    /**
     * @callback
     * @params: sortColumn dataKey
     * @params: sortType
     */
    onSortColumn: _react.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      height: 200,
      rowHeight: 36,
      sortType: 'asc',
      locale: {
        emptyMessage: 'No data found'
      }
    };
  },
  getInitialState: function getInitialState() {
    return {
      width: this.props.width,
      columnWidth: 0,
      mouseAreaLeft: -1,
      dataKey: 0,
      scrollLeft: 0,
      scrollTop: 0,
      resizeColumnFixed: false
    };
  },
  getFixedCellGroups: function getFixedCellGroups() {
    return (0, _reactDom.findDOMNode)(this.table).querySelectorAll('.' + this.props.classPrefix + '-cell-group.fixed');
  },
  handleBodyScroll: function handleBodyScroll(event) {

    var tableHeaderDom = (0, _reactDom.findDOMNode)(this.tableHeader);
    var groups = this.getFixedCellGroups();
    var handelClass = { addClass: _domLib.addClass, removeClass: _domLib.removeClass };

    var left = (0, _domLib.scrollLeft)(this.tableBody);
    var top = (0, _domLib.scrollTop)(this.tableBody);

    this.scrollLeft = left;

    Array.from(groups).map(function (group) {
      (0, _domLib.addStyle)(group, {
        transform: 'translate3d(' + (left || 0) + 'px, 0px, 0px)'
      });
      var toggle = left > 1 ? 'addClass' : 'removeClass';
      !_isIE2.default && handelClass[toggle](group, 'shadow');
    });

    (0, _domLib.addStyle)(tableHeaderDom, {
      transform: 'translate3d(' + (-left || 0) + 'px, 0px, 0px)'
    });

    var toggle = top > 1 ? 'addClass' : 'removeClass';
    !_isIE2.default && handelClass[toggle](tableHeaderDom, 'shadow');
  },
  _onColumnResizeEnd: function _onColumnResizeEnd(columnWidth, cursorDelta, dataKey, index) {
    this.setState(_defineProperty({
      isColumnResizing: false,
      mouseAreaLeft: -1
    }, dataKey + '_' + index + '_width', columnWidth));
  },
  _onColumnResize: function _onColumnResize(width, left, event) {
    this.setState({
      isColumnResizing: true
    });
  },
  _onColumnResizeMove: function _onColumnResizeMove(width, left, fixed) {

    this.setState({
      resizeColumnFixed: fixed,
      mouseAreaLeft: width + left
    });
  },
  _onTreeToggle: function _onTreeToggle(rowKey, index) {
    (0, _domLib.toggleClass)((0, _reactDom.findDOMNode)(this.refs['children_' + rowKey + '_' + index]), 'open');
  },
  cloneCell: function cloneCell(Cell, props) {
    return _react2.default.cloneElement(Cell, props, Cell.props.children);
  },
  getCells: function getCells() {
    var _this = this;

    var left = 0; // Cell left margin
    var isFixedColumn = false; // IF there are fixed columns
    var headerCells = []; // Table header cell
    var bodyCells = []; // Table body cell
    var columns = this.props.children;
    var _state = this.state,
        dataKey = _state.dataKey,
        columnWidth = _state.columnWidth,
        tableWidth = _state.width;
    var _props = this.props,
        sortColumn = _props.sortColumn,
        sortType = _props.sortType,
        onSortColumn = _props.onSortColumn;

    var _getTotalByColumns = getTotalByColumns(columns),
        totalFlexGrow = _getTotalByColumns.totalFlexGrow,
        totalWidth = _getTotalByColumns.totalWidth;

    ReactChildren.map(columns, function (column, index) {

      var columnChildren = column.props.children;
      var _column$props = column.props,
          width = _column$props.width,
          fixed = _column$props.fixed,
          align = _column$props.align,
          sortable = _column$props.sortable,
          resizable = _column$props.resizable,
          flexGrow = _column$props.flexGrow;


      if (columnChildren.length !== 2) {
        throw new Error('Component <HeaderCell> and <Cell> is required, column index: ' + index + ' ');
      }

      if (fixed) {
        isFixedColumn = true;
      }

      width = _this.state[columnChildren[1].props.dataKey + '_' + index + '_width'] || width || 0;

      if (tableWidth && flexGrow) {
        width = (tableWidth - totalWidth) / totalFlexGrow * flexGrow || 0;
      }

      var cellProps = {
        width: width,
        fixed: fixed,
        left: left,
        align: align,
        resizable: resizable,
        sortable: sortable,
        index: index,
        height: _this.props.rowHeight,
        headerHeight: _this.props.headerHeight,
        firstColumn: index === 0,
        lastColumn: index === columns.length - 1,
        key: index
      };

      var headerCellsProps = {
        headerHeight: _this.props.headerHeight || _this.props.rowHeight,
        dataKey: columnChildren[1].props.dataKey,
        sortColumn: sortColumn, sortType: sortType, onSortColumn: onSortColumn
      };

      if (resizable) {
        headerCellsProps.onColumnResizeEnd = _this._onColumnResizeEnd;
        headerCellsProps.onColumnResize = _this._onColumnResize;
        headerCellsProps.onColumnResizeMove = _this._onColumnResizeMove;
      }

      headerCells.push(_this.cloneCell(columnChildren[0], (0, _lodash.assign)(cellProps, headerCellsProps)));
      bodyCells.push(_this.cloneCell(columnChildren[1], cellProps));

      left += width;
    });

    return {
      headerCells: headerCells,
      bodyCells: bodyCells,
      isFixedColumn: isFixedColumn,
      allColumnsWidth: left
    };
  },
  renderRow: function renderRow(props, cells) {

    //IF there are fixed columns, add a fixed group
    if (this.isFixedColumn) {

      var fixedCells = cells.filter(function (cell) {
        return cell.props.fixed;
      });

      var otherCells = cells.filter(function (cell) {
        return !cell.props.fixed;
      });

      var fixedCellGroupWidth = 0;

      fixedCells.map(function (item) {
        fixedCellGroupWidth += item.props.width;
      });

      return _react2.default.createElement(
        _Row2.default,
        props,
        _react2.default.createElement(
          _CellGroup2.default,
          {
            fixed: true,
            height: props.isHeaderRow ? props.headerHeight : props.height,
            width: fixedCellGroupWidth },
          fixedCells
        ),
        _react2.default.createElement(
          _CellGroup2.default,
          null,
          otherCells
        )
      );
    }

    return _react2.default.createElement(
      _Row2.default,
      props,
      cells
    );
  },
  render: function render() {
    var _this2 = this;

    var _props2 = this.props,
        children = _props2.children,
        className = _props2.className,
        _props2$width = _props2.width,
        width = _props2$width === undefined ? 0 : _props2$width,
        height = _props2.height,
        style = _props2.style,
        rowHeight = _props2.rowHeight,
        classPrefix = _props2.classPrefix,
        isTree = _props2.isTree,
        id = _props2.id;

    var _getCells = this.getCells(),
        headerCells = _getCells.headerCells,
        bodyCells = _getCells.bodyCells,
        allColumnsWidth = _getCells.allColumnsWidth,
        isFixedColumn = _getCells.isFixedColumn;

    var rowWidth = allColumnsWidth > width ? allColumnsWidth : width;

    //Check there are fixed columns
    this.isFixedColumn = isFixedColumn;

    var clesses = (0, _classnames2.default)(classPrefix, isTree ? this.prefix('treetable') : '', className, {
      'column-resizing': this.state.isColumnResizing
    });

    var styles = (0, _lodash.assign)({ width: width || 'auto', height: height }, style);

    return _react2.default.createElement(
      'div',
      { className: clesses, style: styles, ref: function ref(_ref) {
          return _this2.table = _ref;
        }, id: id },
      this.renderTableHeader(headerCells, rowWidth),
      this.renderTableBody(bodyCells, rowWidth, allColumnsWidth),
      !_isIE2.default && this.renderMouseArea()
    );
  },
  renderTableHeader: function renderTableHeader(headerCells, rowWidth) {
    var _this3 = this;

    var _props3 = this.props,
        rowHeight = _props3.rowHeight,
        headerHeight = _props3.headerHeight;

    var row = this.renderRow({
      ref: function ref(_ref2) {
        return _this3.tableHeader = _ref2;
      },
      width: rowWidth,
      height: rowHeight,
      headerHeight: headerHeight,
      isHeaderRow: true,
      top: 0

    }, headerCells);

    return _react2.default.createElement(
      'div',
      {
        className: this.prefix('header-row-wrapper') },
      row
    );
  },
  randerRowData: function randerRowData(bodyCells, rowData, props) {
    var _this4 = this;

    var onRowClick = this.props.onRowClick;

    var hasChildren = this.props.isTree && rowData.children && Array.isArray(rowData.children) && rowData.children.length > 0;
    var rowKey = '_' + (Math.random() * 1E18).toString(36).slice(0, 5).toUpperCase();
    var row = this.renderRow({
      key: props.index,
      rowIndex: props.index,
      width: props.rowWidth,
      height: props.rowHeight,
      top: props.top,
      //transform:`translate3d(0px, ${props.top}px, 0px)`,
      onClick: function onClick() {
        onRowClick && onRowClick(rowData);
      },
      rowData: rowData
    }, bodyCells.map(function (cell, key) {
      return _react2.default.cloneElement(cell, {
        key: key,
        layer: props.layer,
        hasChildren: hasChildren,
        rowIndex: props.index,
        onTreeToggle: _this4._onTreeToggle,
        rowKey: rowKey,
        rowData: rowData
      }, cell.props.children);
    }));

    //insert children
    if (hasChildren) {
      props.layer++;

      var childrenClasses = (0, _classnames2.default)(this.prefix('row-children'), {
        open: this.props.expand
      });

      var childrenStyles = {
        marginLeft: LAYER_WIDTH
      };
      return _react2.default.createElement(
        'div',
        { className: childrenClasses,
          'data-layer': props.layer,
          ref: 'children_' + rowKey + '_' + props.index,
          key: props.index },
        row,
        _react2.default.createElement(
          'div',
          { className: 'children' },
          rowData.children.map(function (child, index) {
            return _this4.randerRowData(bodyCells, child, Object.assign({}, props, { index: index }));
          })
        )
      );
    }

    return row;
  },
  renderTableBody: function renderTableBody(bodyCells, rowWidth, allColumnsWidth) {
    var _this5 = this;

    var _props4 = this.props,
        headerHeight = _props4.headerHeight,
        rowHeight = _props4.rowHeight,
        height = _props4.height,
        data = _props4.data,
        isTree = _props4.isTree;

    var bodyStyles = {
      top: isTree ? 0 : headerHeight || rowHeight,
      height: height - (headerHeight || rowHeight)
    };

    var top = 0; //Row position
    var layer = 0; //Tree layer
    var rows = data.length > 0 ? data.map(function (rowData, index) {
      var row = _this5.randerRowData(bodyCells, rowData, {
        index: index, top: top, rowWidth: rowWidth, rowHeight: rowHeight, layer: layer
      });

      !isTree && (top += rowHeight);
      return row;
    }) : _react2.default.createElement(
      'div',
      { className: this.prefix('body-info') },
      this.props.locale.emptyMessage
    );

    return _react2.default.createElement(
      'div',
      { ref: function ref(_ref3) {
          return _this5.tableBody = _ref3;
        },
        className: this.prefix('body-row-wrapper'),
        style: bodyStyles },
      rows
    );
  },
  renderMouseArea: function renderMouseArea() {
    var height = this.props.height;

    var scrollLeft = this.scrollLeft || 0;
    var _state2 = this.state,
        mouseAreaLeft = _state2.mouseAreaLeft,
        resizeColumnFixed = _state2.resizeColumnFixed;


    var styles = {
      height: height,
      left: resizeColumnFixed ? mouseAreaLeft : mouseAreaLeft - scrollLeft
    };

    return _react2.default.createElement('div', { ref: 'mouseArea', className: this.prefix('mouse-area'), style: styles });
  },
  getTableWidth: function getTableWidth() {
    this.setState({
      width: (0, _domLib.getWidth)((0, _reactDom.findDOMNode)(this.table))
    });
  },
  componentDidMount: function componentDidMount() {
    this._onBodyScrollListener = (0, _domLib.on)(this.tableBody, 'scroll', this.handleBodyScroll);
    this._onWindowResizeListener = (0, _domLib.on)(window, 'resize', (0, _debounce2.default)(this.getTableWidth));
    this.getTableWidth();
  },

  componentDidUpdate: function componentDidUpdate(nextProps) {
    this.handleBodyScroll();
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this._onBodyScrollListener) {
      this._onBodyScrollListener.off();
    }
    if (this._onWindowResizeListener) {
      this._onWindowResizeListener.off();
    }
  }
});

exports.default = Table;