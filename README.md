# React JSON table

##### Simple table component to display JSON data.


> This is based on excellent `react-json-table` https://github.com/arqex/react-json-table. 
The component is written in TypeScript and supports React 16.x. 
It attempts to be backward compatible with `react-json-table`.

## Features

Features are similar to original `react-json-table`

* Basic functionality has no external dependencies when using pre-built UMD files.
* Customizable cell contents to show your data the way you need.
* Callbacks for clicks on headers, rows or cells.
* Customizable column rendering and ability to add custom columns.
* Customizable CSS class names for table, header, rows and cells.
* No internal state, everything comes from the props.

## Installation
```bash
npm install ts-react-json-table
```

Or use the pre-built UMD files [ts-react-json-table.js](https://github.com/agracio/ts-react-json-table/blob/master/build/ts-react-json-table.js) 
and [ts-react-json-table.min.js](https://github.com/agracio/ts-react-json-table/blob/master/build/ts-react-json-table.min.js) 

## Quickstart

```js
const JsonTable = require('ts-react-json-table');
```
 
```js
var items = [
  {"id": 75950,"name": "Louella Wallace","age": 24,"phone": "+44 (0)203 437 7302","color": "green"},
  {"id": 80616,"name": "Hanson Perry","age": 36,"phone": "+44 (0)203 279 3708","color": "brown"},
  {"id": 77621,"name": "Brandi Long","age": 20,"phone": "+44 (0)203 319 4880","color": "gray"},
  {"id": 81299,"name": "Tonia Sykes","age": 38,"phone": "+44 (0)208 328 3671","color": "blue"},
  {"id": 14225,"name": "Leach Durham","age": 23,"phone": "+44 (0)208 280 9572","color": "green"}
];

ReactDOM.render(<JsonTable rows = {items} />, document.body);
```
**JSFiddle demo: https://jsfiddle.net/agracio/vx1yfna0/**

## Usage

### props

Prop | Type | Description
---|---|---
rows | Array\[Object\] (required) | JSON data.
columns | *Array\[string\|ColumnSettings\]* (optional) | Table columns, if not defined all `rows` JSON data is used. See [column settings](#column-settings).
excludeColumns | *Array\[string\]* (optional) | Exclude columns by key, allows to quickly exclude elements from `rows` JSON data without defining all `columns`. See [exclude columns](#exclude-columns)
className | *string* (optional)| Class to use for `<table>` element.
theadClassName | *string* (optional)| Class to use for `<thead>` element.
caption | *string* (optional)| Table `<caption>` element contents. If not defined `<caption>` element will not be rendered.
settings | *TableSettings* (optional)| Table settings, see [table settings](#table-settings).
onClickCell | *Function* (optional)| Callback triggered when a cell is clicked: `fn(event, columnName, rowData)`.
onClickRow | *Function* (optional)| Callback triggered when a row is clicked: `fn(event, rowData)`.
onClickHeader | *Function* (optional)| Callback triggered when a column header is clicked: `fn(event, columnName)`.

### table settings

Setting name | Type | Description
---|---|---
cellClass | *Function* (optional) | Cell custom class using `fn(currentClass, columnKey, rowData)`.
classPrefix | *string* (optional) | JsonTable uses `class` attributes for its markup like `jsonRow` or `jsonCell`. The default prefix is `json` but you can use this setting to change it in the case it is conflicting with other classes in your app.
header | *boolean* (optional) | Determines whether to show table header. Default is `true`.
headerClass | *Function* (optional) | Header custom class using `fn(currentClass, columnKey)`.
noRowsMessage | *string*\|*ReactComponent*  (optional) | Message shown when the table has no rows. Default is *"No items"*.
rowClass | *Function* (optional) | Row custom class using `fn(currentClass, rowData)`.
cellRenderer | *Function* (optional) | If provided, this function will be used to render all the cells' content, so it is a way of programmatically customize every cell. If no provided, the cell contents will just be `item[field]`, the value of the item for that field.

### Column settings

Setting&nbsp;name | Type | Description
---|---|---
key | string | Object key of `rows` JSON data.
label | *string* (optional) | Column header, if not defined `key` is used.
cell | *Function*\|*string* (optional) | Contents of table cell, if not defined `key` is used. Can be `string` or `function(row, columnKey)`
group | *string* (optional) | Allows to group multiple items under same group header.

If `columns` props is not defined columns settings will be automatically generated using `rows` JSON data.

```js
var rows = [
  {"id": 75950,"name": "Louella Wallace","age": 24,"phone": "+44 (0)203 437 7302","color": "green"},
  {"id": 80616,"name": "Hanson Perry","age": 36,"phone": "+44 (0)203 279 3708","color": "brown"},
  {"id": 77621,"name": "Brandi Long","age": 20,"phone": "+44 (0)203 319 4880","color": "gray"},
];
```
 Will result in the following column settings generated for the table:
 
 ```js
var columns = [
    {key: 'id', label: 'id', cell: 'id'},
    {key: 'name', label: 'name', cell: 'name'},
    {key: 'age', label: 'age', cell: 'age'},
    {key: 'phone', label: 'phone', cell: 'phone'},
    {key: 'color', label: 'color', cell: 'color'},
];
 ```
 
You can specify simple or advanced column settings and pass them as `columns` prop. Example for `rows` data above: 

 ```js
var columns = [
    'id',
    'name',
    'age',
    {key: 'phone', label: 'Phone'},
    {key: 'color', label: 'Colourful', cell: function(row, columnKey){
        return <span style={{color: row.color}}>{row.color}</span>;
    }}
];
 ```
 
 **JSFiddle demo: https://jsfiddle.net/agracio/2dd7sxxs/**
 
Only columns defined in `columns` prop will be shown in table.

### Exclude columns

This allows to exclude columns from table without defining all columns. 
For `rows` example above, if you wanted to show all columns except 'id' instead of passing `columns` prop 

 ```js
var columns = [
    'name',
    'age',
    'phone',
    'color'
];
 ```
 
 You can pass `excludeColumns` prop
 
  ```js
 var excludeColumns = [
     'id'
 ];
  ```

If both `columns` and `excludeColumns` props are defined, columns will be excluded even if they are defined in `columns`.

## README update is still in progress...