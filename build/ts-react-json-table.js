(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require(null));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["JsonTable"] = factory(require(null));
	else
		root["JsonTable"] = factory(root["React"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__45__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 45:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__45__;

/***/ }),

/***/ 58:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GridRow = void 0;
var React = __webpack_require__(45);
var gridRowCell_1 = __webpack_require__(346);
var utils_1 = __webpack_require__(703);
var GridRow = /** @class */ (function (_super) {
    __extends(GridRow, _super);
    function GridRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridRow.prototype.render = function () {
        var _this = this;
        var rowClass = this.props.settings.rowClass;
        var className = "".concat(this.props.settings.classPrefix, "Row ").concat(this.props.settings.classPrefix).concat(this.props.index % 2 ? 'Odd' : 'Even');
        if (rowClass) {
            className = rowClass(className, this.props.row);
        }
        return React.createElement("tr", { className: className, onClick: this.onClick.bind(this, this.props.row) }, this.props.columns.map(function (column, index) {
            var item;
            if (typeof column.cell === 'function') {
                item = column.cell(_this.props.row, column.key);
            }
            else if (column.cell.indexOf('.') !== -1) {
                item = utils_1.Utils.getObjectByKey(_this.props.row, column.cell);
            }
            else {
                item = _this.props.row[column.cell];
            }
            if (typeof item === 'object' && typeof column.cell !== 'function') {
                var preClassName = "".concat(_this.props.settings.classPrefix, "CellPre ").concat(_this.props.settings.classPrefix, "CellPre_").concat(column.key);
                if (column.objectDisplayStyle) {
                    switch (column.objectDisplayStyle) {
                        case 'string':
                            item = utils_1.Utils.flattenToString(item);
                            break;
                        case 'json':
                            item = JSON.stringify(item);
                            break;
                        case 'jsonSpaced':
                            item = React.createElement("pre", { className: preClassName }, JSON.stringify(item, null, 2));
                            break;
                        case 'flatJson':
                            item = JSON.stringify(utils_1.Utils.flatten(item));
                            break;
                        case 'flatJsonSpaced':
                            item = React.createElement("pre", { className: preClassName }, JSON.stringify(utils_1.Utils.flatten(item), null, 2));
                            break;
                        default:
                            item = utils_1.Utils.flattenToString(item);
                    }
                }
            }
            var key = "jt-body-td-".concat(index);
            return React.createElement(gridRowCell_1.GridRowCell, { settings: _this.props.settings, onClickCell: _this.props.onClickCell, item: item, row: _this.props.row, column: column, key: key });
        }));
    };
    GridRow.prototype.onClick = function (item, e) {
        if (this.props.onClickRow) {
            this.props.onClickRow(e, item);
        }
    };
    return GridRow;
}(React.Component));
exports.GridRow = GridRow;
//# sourceMappingURL=gridRow.js.map

/***/ }),

/***/ 81:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GridHeaderRowCell = void 0;
var React = __webpack_require__(45);
var GridHeaderRowCell = /** @class */ (function (_super) {
    __extends(GridHeaderRowCell, _super);
    function GridHeaderRowCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridHeaderRowCell.prototype.render = function () {
        var headerClass = this.props.settings.headerClass;
        //let label: string;
        var rowSpan = null;
        var colSpan = 1;
        var skip = false;
        if (this.props.groupCell) {
            if (this.props.column.group) {
                if (this.props.column.groupIndex === 0) {
                    this.header = this.props.column.group;
                    colSpan = this.props.column.colSpan;
                }
                else {
                    skip = true;
                }
            }
            else {
                this.header = this.props.column.label;
                rowSpan = 2;
            }
        }
        else {
            if (this.props.grouping) {
                if (this.props.column.group) {
                    this.header = this.props.column.label;
                }
                else {
                    skip = true;
                }
            }
            else {
                this.header = this.props.column.label;
            }
        }
        //this.key = (this.props.column.group && this.header === this.props.column.group) ? this.header.replace(/\W+/g, '') : this.props.column.key;
        this.key = (this.props.column.group && this.header === this.props.column.group) ? this.header : this.props.column.key;
        var className = "".concat(this.props.settings.classPrefix, "Column ").concat(this.props.settings.classPrefix, "Column_").concat(this.key.replace(/\W+/g, ''));
        if (headerClass) {
            className = headerClass(className, this.key);
        }
        return skip ? null : this.createTh(className, rowSpan, colSpan, this.header);
    };
    GridHeaderRowCell.prototype.createTh = function (className, rowSpan, colSpan, content) {
        return React.createElement("th", { className: className, onClick: this.onClick.bind(this, this.key), "data-key": this.key, rowSpan: rowSpan, colSpan: colSpan }, content);
    };
    GridHeaderRowCell.prototype.onClick = function (key, e) {
        if (this.props.onClickHeader) {
            this.props.onClickHeader(e, key);
        }
    };
    return GridHeaderRowCell;
}(React.Component));
exports.GridHeaderRowCell = GridHeaderRowCell;
//# sourceMappingURL=gridHeaderRowCell.js.map

/***/ }),

/***/ 313:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GridHeaderRow = void 0;
var React = __webpack_require__(45);
var gridHeaderRowCell_1 = __webpack_require__(81);
var GridHeaderRow = /** @class */ (function (_super) {
    __extends(GridHeaderRow, _super);
    function GridHeaderRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridHeaderRow.prototype.render = function () {
        var _this = this;
        return React.createElement("tr", null, this.props.columns.map(function (column, index) {
            var key = "jt-header-th-".concat(index);
            return React.createElement(gridHeaderRowCell_1.GridHeaderRowCell, { settings: _this.props.settings, column: column, key: key, grouping: _this.props.grouping, groupCell: _this.props.groupCell, onClickHeader: _this.props.onClickHeader });
        }));
    };
    return GridHeaderRow;
}(React.Component));
exports.GridHeaderRow = GridHeaderRow;
//# sourceMappingURL=gridHeaderRow.js.map

/***/ }),

/***/ 336:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GridBody = void 0;
var React = __webpack_require__(45);
var gridRow_1 = __webpack_require__(58);
var GridBody = /** @class */ (function (_super) {
    __extends(GridBody, _super);
    function GridBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridBody.prototype.render = function () {
        var _this = this;
        var rows = this.props.rows && this.props.rows.length > 0 ?
            this.props.rows.map(function (row, index) {
                var key = "jt-body-tr-".concat(index);
                return React.createElement(gridRow_1.GridRow, { row: row, columns: _this.props.columns, settings: _this.props.settings, onClickCell: _this.props.onClickCell, onClickRow: _this.props.onClickRow, index: index, key: key });
            }) :
            React.createElement("tr", null,
                React.createElement("td", null, this.props.settings.noRowsMessage));
        return React.createElement("tbody", null, rows);
    };
    return GridBody;
}(React.Component));
exports.GridBody = GridBody;
//# sourceMappingURL=gridBody.js.map

/***/ }),

/***/ 346:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GridRowCell = void 0;
var React = __webpack_require__(45);
var GridRowCell = /** @class */ (function (_super) {
    __extends(GridRowCell, _super);
    function GridRowCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridRowCell.prototype.render = function () {
        var cellClass = this.props.settings.cellClass;
        var className = "".concat(this.props.settings.classPrefix, "Cell ").concat(this.props.settings.classPrefix, "Cell_").concat(this.props.column.key);
        if (cellClass) {
            className = cellClass(className, this.props.column.key, this.props.row);
        }
        return React.createElement("td", { className: className, "data-key": this.props.column.key, "data-th": this.props.column.label, onClick: this.onClick.bind(this, this.props.column.key) }, this.props.item);
    };
    GridRowCell.prototype.onClick = function (key, e) {
        if (this.props.onClickCell) {
            this.props.onClickCell(e, key, this.props.row);
        }
    };
    return GridRowCell;
}(React.Component));
exports.GridRowCell = GridRowCell;
//# sourceMappingURL=gridRowCell.js.map

/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JsonTable = void 0;
var React = __webpack_require__(45);
var gridHeader_1 = __webpack_require__(669);
var gridBody_1 = __webpack_require__(336);
var gridFooter_1 = __webpack_require__(815);
var polyfills_1 = __webpack_require__(690);
var react_1 = __webpack_require__(45);
(0, polyfills_1.polyfills)();
var JsonTable = /** @class */ (function (_super) {
    __extends(JsonTable, _super);
    function JsonTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultSettings = {
            header: true,
            noRowsMessage: 'No items',
            classPrefix: 'json',
        };
        _this.headerGrouping = false;
        return _this;
    }
    JsonTable.prototype.render = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.createSettings();
        this.columns = this.createColumns();
        this.className = this.props.className || "".concat(this.settings.classPrefix, "Table");
        var style;
        var caption = this.props.caption ? React.createElement("caption", null, this.props.caption) : null;
        var header = this.settings.header ? React.createElement(gridHeader_1.GridHeader, { theadClassName: this.props.theadClassName, key: 'jt-header', settings: this.settings, columns: this.columns, onClickHeader: this.props.onClickHeader, grouping: this.headerGrouping }) : null;
        var footer = React.createElement(gridFooter_1.GridFooter, { className: "".concat(this.settings.classPrefix, "Footer"), key: 'jt-footer' });
        // styles
        var freezeHeader = this.settings.freezeHeader ? "table.".concat(this.className, " thead th{position: sticky;}") : null;
        // let borderRadius = this.settings.style?.borderRadius ? `div.${this.settings.classPrefix}TableOuter{border-radius: ${this.settings.style?.borderRadius}px;` : null;
        // let width = this.settings.style?.width ? `div.${this.settings.classPrefix}TableOuter{width: ${this.settings.style?.width};` : null;
        // let margin = this.settings.style?.margin ? `div.${this.settings.classPrefix}TableOuter{margin: ${this.settings.style?.margin};` : null;
        //
        // let height = this.settings.style?.height ? `div.${this.settings.classPrefix}TableInner{height: ${this.settings.style?.height};` : null;
        var hoverColor = ((_a = this.settings.style) === null || _a === void 0 ? void 0 : _a.hoverColor) ? "table.".concat(this.className, " tbody tr:hover{color: ").concat((_b = this.settings.style) === null || _b === void 0 ? void 0 : _b.hoverColor, ";}") : null;
        var hoverBgColor = ((_c = this.settings.style) === null || _c === void 0 ? void 0 : _c.hoverBgColor) ? "table.".concat(this.className, " tbody tr:hover{background-color: ").concat((_d = this.settings.style) === null || _d === void 0 ? void 0 : _d.hoverBgColor, ";}") : null;
        var oddBgColor = ((_e = this.settings.style) === null || _e === void 0 ? void 0 : _e.nthOddBgColor) ? ".".concat(this.settings.classPrefix, "Odd{background-color: ").concat((_f = this.settings.style) === null || _f === void 0 ? void 0 : _f.nthOddBgColor, ";}") : null;
        var evenBgColor = ((_g = this.settings.style) === null || _g === void 0 ? void 0 : _g.nthEvenBgColor) ? ".".concat(this.settings.classPrefix, "Even{background-color: ").concat((_h = this.settings.style) === null || _h === void 0 ? void 0 : _h.nthEvenBgColor, ";}") : null;
        style =
            React.createElement("style", null,
                freezeHeader,
                hoverColor,
                hoverBgColor,
                oddBgColor,
                evenBgColor);
        var table1 = 
        // <div>
        //     {style}
        React.createElement("div", { className: "".concat(this.settings.classPrefix, "TableOuter") },
            React.createElement("div", { className: "".concat(this.settings.classPrefix, "TableInner") },
                React.createElement("table", { className: this.className, key: 'jt-table' },
                    caption,
                    header,
                    React.createElement(gridBody_1.GridBody, { key: 'jt-body', settings: this.settings, columns: this.columns, rows: this.props.rows, onClickRow: this.props.onClickRow, onClickCell: this.props.onClickCell }),
                    footer)));
        //</div>;
        var table = React.createElement(react_1.Fragment, null,
            style,
            React.createElement("table", { className: this.className, key: 'jt-table' },
                caption,
                header,
                React.createElement(gridBody_1.GridBody, { key: 'jt-body', settings: this.settings, columns: this.columns, rows: this.props.rows, onClickRow: this.props.onClickRow, onClickCell: this.props.onClickCell }),
                footer));
        return table;
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
        var columns;
        if (!this.props.columns) {
            columns = Object.keys(this.props.rows[0]).map(function (key) {
                return {
                    key: key,
                    label: key,
                    cell: _this.settings.cellRenderer || key,
                };
            });
        }
        else {
            columns = this.props.columns.map(function (column) {
                if (typeof column == 'string') {
                    return {
                        key: column,
                        label: column,
                        cell: _this.settings.cellRenderer || column
                    };
                }
                if (typeof column == 'object') {
                    var key = column.key || column.label;
                    if (column.group)
                        _this.headerGrouping = true;
                    return {
                        key: key,
                        label: column.label || key,
                        cell: _this.settings.cellRenderer || column.cell || key,
                        objectDisplayStyle: column.objectDisplayStyle || 'json',
                        group: column.group
                    };
                }
            });
        }
        if (this.props.excludeColumns && this.props.excludeColumns.length !== 0) {
            var toDelete_1 = [];
            this.props.excludeColumns.forEach(function (key) {
                toDelete_1.push(columns.findIndex(function (column) { return column.key === key; }));
            });
            toDelete_1.forEach(function (index) {
                if (index !== -1)
                    columns.splice(index, 1);
            });
        }
        var copyObject = function (index, columnDefinition) {
            if (index !== -1) {
                Object.keys(columnDefinition).forEach(function (key) {
                    columns[index][key] = columnDefinition[key];
                });
                return true;
            }
            return false;
        };
        if (this.props.columnDefinitions && this.props.columnDefinitions.length > 0) {
            this.props.columnDefinitions.forEach(function (def) {
                var index = columns.findIndex(function (column) { return column.key === def.key; });
                if (!copyObject(index, def)) {
                    var dotIndex_1 = def.key.indexOf('.');
                    if (dotIndex_1 !== -1) {
                        index = columns.findIndex(function (column) { return column.key === def.key.substring(0, dotIndex_1); });
                        if (copyObject(index, def)) {
                            columns[index].cell = _this.settings.cellRenderer || def.cell || def.key;
                        }
                        else {
                            index = columns.findIndex(function (column) { return column.key.indexOf(def.key.substring(0, dotIndex_1 + 1)) !== -1; });
                            if (index !== -1) {
                                var newIndex = index + 1;
                                columns.splice(newIndex, 0, def);
                                copyObject(newIndex, def);
                                columns[newIndex].cell = _this.settings.cellRenderer || def.cell || def.key;
                            }
                        }
                    }
                }
                if (def.group)
                    _this.headerGrouping = true;
            });
        }
        if (this.headerGrouping) {
            var group_1;
            var colSpans_1 = new Map();
            var colSpan_1 = 1;
            columns.forEach(function (column) {
                if (column.group) {
                    if (column.group === group_1) {
                        colSpans_1.set(column.group, ++colSpan_1);
                    }
                    else {
                        group_1 = column.group;
                        column.groupIndex = 0;
                        colSpan_1 = 1;
                    }
                }
            });
            Array.from(colSpans_1.keys()).forEach(function (group) {
                var index = columns.findIndex(function (column) { return column.group === group && column.groupIndex === 0; });
                columns[index].colSpan = colSpans_1.get(group);
            });
        }
        return columns;
    };
    return JsonTable;
}(React.Component));
exports.JsonTable = JsonTable;
module.exports = JsonTable;
//# sourceMappingURL=grid.js.map

/***/ }),

/***/ 669:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GridHeader = void 0;
var React = __webpack_require__(45);
var gridHeaderRow_1 = __webpack_require__(313);
var GridHeader = /** @class */ (function (_super) {
    __extends(GridHeader, _super);
    function GridHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridHeader.prototype.render = function () {
        var groupHeader = this.props.grouping ? React.createElement(gridHeaderRow_1.GridHeaderRow, { columns: this.props.columns, onClickHeader: this.props.onClickHeader, settings: this.props.settings, groupCell: true }) : null;
        return React.createElement("thead", { className: this.props.theadClassName || "".concat(this.props.settings.classPrefix, "Header") },
            groupHeader,
            React.createElement(gridHeaderRow_1.GridHeaderRow, { columns: this.props.columns, onClickHeader: this.props.onClickHeader, settings: this.props.settings, groupCell: false, grouping: this.props.grouping }));
    };
    return GridHeader;
}(React.Component));
exports.GridHeader = GridHeader;
//# sourceMappingURL=gridHeader.js.map

/***/ }),

/***/ 690:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.polyfills = polyfills;
function polyfills() {
    // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
    if (!Array.prototype.findIndex) {
        Object.defineProperty(Array.prototype, 'findIndex', {
            value: function (predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }
                var o = Object(this);
                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;
                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }
                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];
                // 5. Let k be 0.
                var k = 0;
                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                    // d. If testResult is true, return k.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return k;
                    }
                    // e. Increase k by 1.
                    k++;
                }
                // 7. Return -1.
                return -1;
            }
        });
    }
    // Production steps of ECMA-262, Edition 6, 22.1.2.1
    if (!Array.from) {
        Array.from = (function () {
            var toStr = Object.prototype.toString;
            var isCallable = function (fn) {
                return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
            };
            var toInteger = function (value) {
                var number = Number(value);
                if (isNaN(number)) {
                    return 0;
                }
                if (number === 0 || !isFinite(number)) {
                    return number;
                }
                return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
            };
            var maxSafeInteger = Math.pow(2, 53) - 1;
            var toLength = function (value) {
                var len = toInteger(value);
                return Math.min(Math.max(len, 0), maxSafeInteger);
            };
            // The length property of the from method is 1.
            return function from(arrayLike /*, mapFn, thisArg */) {
                // 1. Let C be the this value.
                var C = this;
                // 2. Let items be ToObject(arrayLike).
                var items = Object(arrayLike);
                // 3. ReturnIfAbrupt(items).
                if (arrayLike == null) {
                    throw new TypeError('Array.from requires an array-like object - not null or undefined');
                }
                // 4. If mapfn is undefined, then let mapping be false.
                var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                var T;
                if (typeof mapFn !== 'undefined') {
                    // 5. else
                    // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                    if (!isCallable(mapFn)) {
                        throw new TypeError('Array.from: when provided, the second argument must be a function');
                    }
                    // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                    if (arguments.length > 2) {
                        T = arguments[2];
                    }
                }
                // 10. Let lenValue be Get(items, "length").
                // 11. Let len be ToLength(lenValue).
                var len = toLength(items.length);
                // 13. If IsConstructor(C) is true, then
                // 13. a. Let A be the result of calling the [[Construct]] internal method
                // of C with an argument list containing the single item len.
                // 14. a. Else, Let A be ArrayCreate(len).
                var A = isCallable(C) ? Object(new C(len)) : new Array(len);
                // 16. Let k be 0.
                var k = 0;
                // 17. Repeat, while k < len… (also steps a - h)
                var kValue;
                while (k < len) {
                    kValue = items[k];
                    if (mapFn) {
                        A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                    }
                    else {
                        A[k] = kValue;
                    }
                    k += 1;
                }
                // 18. Let putStatus be Put(A, "length", len, true).
                A.length = len;
                // 20. Return A.
                return A;
            };
        }());
    }
}
//# sourceMappingURL=polyfills.js.map

/***/ }),

/***/ 703:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Utils = void 0;
// https://gist.github.com/penguinboy/762197
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.flatten = function (obj) {
        var toReturn = {};
        for (var i in obj) {
            if (!obj.hasOwnProperty(i))
                continue;
            if ((typeof obj[i]) == 'object') {
                var flatObject = Utils.flatten(obj[i]);
                for (var x in flatObject) {
                    if (!flatObject.hasOwnProperty(x))
                        continue;
                    toReturn[i + '.' + x] = flatObject[x];
                }
            }
            else {
                toReturn[i] = obj[i];
            }
        }
        return toReturn;
    };
    Utils.flattenToString = function (obj) {
        var flat = Utils.flatten(obj);
        var values = Object.keys(flat).map(function (key) {
            return "".concat(key, ": ").concat(flat[key]);
        });
        return values.join(', ');
    };
    // https://stackoverflow.com/a/45322101
    Utils.getObjectByKey = function (obj, key) {
        if (key.indexOf('.') !== 1) {
            return key.split('.').reduce(function (prev, curr) {
                return prev ? prev[curr] : null;
            }, obj);
        }
        else {
            return obj[key];
        }
    };
    Utils.stringRandom = function (chars) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < chars; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 815:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GridFooter = void 0;
var React = __webpack_require__(45);
var GridFooter = /** @class */ (function (_super) {
    __extends(GridFooter, _super);
    function GridFooter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridFooter.prototype.render = function () {
        return React.createElement("tfoot", { className: this.props.className });
    };
    return GridFooter;
}(React.Component));
exports.GridFooter = GridFooter;
//# sourceMappingURL=gridFooter.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(424);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=ts-react-json-table.js.map