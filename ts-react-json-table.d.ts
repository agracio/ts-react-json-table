interface TableSettings{
    header?: boolean,
    classPrefix?: string,
    noRowsMessage?: string,
    cellClass?: Function,
    headerClass?: Function,
    keyField?: string,
    rowClass?: Function,
    cellRenderer?: Function
    style?: StyleSettings,
}

interface StyleSettings{
    hoverColor?: string,
    hoverBgColor?: string,
    nthOddBgColor?: string,
    nthEvenBgColor?: string,
}

interface TableProps{
    rows: any[],
    columns?: ColumnSetting[],
    columnDefinitions?: ColumnSetting[],
    excludeColumns?: string[],
    className?: string,
    theadClassName?: string,
    fixedHeader?: boolean,
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
