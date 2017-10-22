# React JSON table

##### Simple table component to display JSON data.


> This is based on excellent `react-json-table` https://github.com/arqex/react-json-table. 
The component is written in TypeScript and supports React 16.x. 
It attempts to be fully backward compatible with `react-json-table`.

## Features:

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
//or
import JsonTable = require('ts-react-json-table');
 ```
 
```js
var items = [
  {"id": 75950,"name": "Louella Wallace","age": 24,"phone": "+44 (0)203 437 7302","color": "green"},
  {"id": 80616,"name": "Hanson Perry","age": 36,"phone": "+44 (0)203 279 3708","color": "brown"},
  {"id": 77621,"name": "Brandi Long","age": 20,"phone": "+44 (0)203 319 4880","color": "gray"},
  {"id": 81299,"name": "Tonia Sykes","age": 38,"phone": "+44 (0)208 328 3671","color": "blue"},
  {"id": 14225,"name": "Leach Durham","age": 23,"phone": "+44 (0)208 280 9572","color": "green"}
];

ReactDOM.render(<JsonTable rows={ items } />, document.body);
```
