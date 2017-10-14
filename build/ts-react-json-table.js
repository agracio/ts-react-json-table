(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["JsonTable"] = factory(require("React"));
	else
		root["JsonTable"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var JsonTable = (function (_super) {
    __extends(JsonTable, _super);
    function JsonTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultSettings = {
            header: true,
            noRowsMessage: 'No items',
            classPrefix: 'json',
        };
        return _this;
    }
    JsonTable.prototype.componentWillMount = function () {
        this.createSettings();
        this.columns = this.createColumns();
        this.className = this.props.className || this.settings.classPrefix + "Table";
    };
    JsonTable.prototype.render = function () {
        var header = this.settings.header ? React.createElement(Header, { settings: this.settings, columns: this.columns, onClickHeader: this.props.onClickHeader }) : null;
        return React.createElement("table", { className: this.className },
            header,
            React.createElement(Body, { settings: this.settings, columns: this.columns, rows: this.props.rows, onClickRow: this.props.onClickRow, onClickCell: this.props.onClickCell }),
            React.createElement(Footer, null));
    };
    JsonTable.prototype.createSettings = function () {
        if (this.props.settings) {
            this.settings = this.props.settings;
        }
        else {
            this.settings = this.defaultSettings;
        }
        if (this.settings.header == null)
            this.settings.header = true;
        if (this.settings.noRowsMessage == null)
            this.settings.noRowsMessage = this.defaultSettings.noRowsMessage;
        if (this.settings.classPrefix == null)
            this.settings.classPrefix = this.defaultSettings.classPrefix;
    };
    JsonTable.prototype.createColumns = function () {
        var _this = this;
        if (!this.props.rows || this.props.rows.length === 0) {
            return [];
        }
        if (!this.props.columns) {
            return Object.keys(this.props.rows[0]).map(function (key) {
                return { key: key, label: key, cell: _this.props.cellRenderer || key };
            });
        }
        return this.props.columns.map(function (column) {
            if (typeof column == 'string') {
                return {
                    key: column,
                    label: column,
                    cell: _this.props.cellRenderer || column
                };
            }
            if (typeof column == 'object') {
                var key = column.key || column.label;
                return {
                    key: key,
                    label: column.label || key,
                    cell: _this.props.cellRenderer || column.cell || key
                };
            }
        });
    };
    return JsonTable;
}(React.Component));
exports.JsonTable = JsonTable;
var Body = (function (_super) {
    __extends(Body, _super);
    function Body() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Body.prototype.render = function () {
        var _this = this;
        var rows = this.props.rows.length > 0 ?
            this.props.rows.map(function (row, index) {
                var key = "trjt-tr-" + index;
                return React.createElement(Row, { row: row, columns: _this.props.columns, onClickCell: _this.props.onClickCell, onClickRow: _this.props.onClickRow, index: index, key: key, reactKey: key, settings: _this.props.settings });
            }) :
            React.createElement("tr", null,
                React.createElement("td", null, this.props.settings.noRowsMessage));
        return React.createElement("tbody", null, rows);
    };
    return Body;
}(React.Component));
var Row = (function (_super) {
    __extends(Row, _super);
    function Row() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Row.prototype.render = function () {
        var _this = this;
        var classPrefix = this.props.settings.classPrefix;
        var rowClass = this.props.settings.rowClass;
        var className = classPrefix + "Row " + classPrefix + (this.props.index % 2 ? 'Odd' : 'Even');
        if (rowClass) {
            className = rowClass(className, this.props.row);
        }
        return React.createElement("tr", { className: className, key: this.props.reactKey, onClick: this.onClick.bind(this, this.props.row) }, this.props.columns.map(function (column, index) {
            var item = typeof column.cell == 'function' ? column.cell(_this.props.row, column.key) : _this.props.row[column.cell];
            var key = _this.props.reactKey + "-td-" + index;
            return React.createElement(Cell, { onClickCell: _this.props.onClickCell, settings: _this.props.settings, item: item, column: column, key: key, reactKey: key });
        }));
    };
    Row.prototype.onClick = function (item, e) {
        if (this.props.onClickRow) {
            this.props.onClickRow(e, item);
        }
    };
    return Row;
}(React.Component));
var Cell = (function (_super) {
    __extends(Cell, _super);
    function Cell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cell.prototype.render = function () {
        var classPrefix = this.props.settings.classPrefix;
        var cellClass = this.props.settings.cellClass;
        var className = classPrefix + "Cell " + classPrefix + "Cell_" + this.props.column.key;
        if (cellClass) {
            className = cellClass(className, this.props.column.key, this.props.item);
        }
        return React.createElement("td", { className: className, key: this.props.reactKey, "data-key": this.props.column.key, onClick: this.onClick.bind(this, this.props.column.key, this.props.item) }, this.props.item);
    };
    Cell.prototype.onClick = function (key, item, e) {
        if (this.props.onClickCell) {
            this.props.onClickCell(e, key, item);
        }
    };
    return Cell;
}(React.Component));
var Header = (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Header.prototype.render = function () {
        var _this = this;
        return React.createElement("thead", null,
            React.createElement("tr", null, this.props.columns.map(function (column, index) {
                var key = "trjt-th-" + index;
                return React.createElement(HeaderCell, { settings: _this.props.settings, column: column, reactKey: key, key: key, onClickHeader: _this.props.onClickHeader });
            })));
    };
    return Header;
}(React.Component));
var HeaderCell = (function (_super) {
    __extends(HeaderCell, _super);
    function HeaderCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderCell.prototype.render = function () {
        var classPrefix = this.props.settings.classPrefix;
        var headerClass = this.props.settings.headerClass;
        var className = classPrefix + "Column";
        if (headerClass) {
            className = headerClass(className, this.props.column.key);
        }
        return React.createElement("th", { className: className, onClick: this.onClick.bind(this, this.props.column.key), "data-key": this.props.column.key }, this.props.column.label);
    };
    HeaderCell.prototype.onClick = function (key, e) {
        if (this.props.onClickHeader) {
            this.props.onClickHeader(e, key);
        }
    };
    return HeaderCell;
}(React.Component));
var Footer = (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Footer.prototype.render = function () {
        return React.createElement("tfoot", null);
    };
    return Footer;
}(React.Component));
module.exports = JsonTable;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=ts-react-json-table.js.map