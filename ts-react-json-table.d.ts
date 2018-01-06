interface TableSettings{
    cellClass?: Function,
    classPrefix?: string,
    header?: boolean,
    headerClass?: Function,
    keyField?: string,
    noRowsMessage?: string,
    rowClass?: Function,
    cellRenderer?: Function
    freezeHeader?: boolean
    fixedHeader?: boolean
}

interface TableProps{
    rows: any[],
    columns?: ColumnSetting[],
    columnDefinitions?: ColumnSetting[],
    excludeColumns?: string[],
    className?: string,
    theadClassName?: string,
    caption?: string,
    settings?: TableSettings,
    onClickCell?: Function,
    onClickHeader?: Function,
    onClickRow?: Function,
}

interface ColumnSetting{
    key: string,
    label?: string,
    cell?: Function | string,
    group?: string,
    objectDisplayStyle?: string
}

// declare enum ObjectDisplayStyle {
//     string = "string",
//     json = "json",
//     jsonSpaced = "jsonSpaced",
//     flatJson = "flatJson",
//     flatJsonSpaced = "flatJsonSpaced",
// }

declare module 'ts-react-json-table'{
    import * as React from 'react';
    class JsonTable extends React.Component<TableProps, {}>{}
    export = JsonTable;
}
