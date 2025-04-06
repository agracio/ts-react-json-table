interface TableSettings{
    header?: boolean,
    classPrefix?: string,
    noRowsMessage?: string,
    cellClass?: Function,
    headerClass?: Function,
    keyField?: string,
    rowClass?: Function,
    cellRenderer?: Function
    freezeHeader?: boolean,
    style?: StyleSettings,
}

interface StyleSettings{
    borderRadius?: number,
    hoverColor?: string,
    hoverBgColor?: string,
    nthOddBgColor?: string,
    nthEvenBgColor?: string,
    width: string,
    height: string,
    margin: string,
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

declare module 'ts-react-json-table'{
    import * as React from 'react';
    class JsonTable extends React.Component<TableProps, {}>{}
    export = JsonTable;
}
