interface TableSettings{
    cellClass?: Function,
    classPrefix?: string,
    header?: boolean,
    headerClass?: Function,
    keyField?: string,
    noRowsMessage?: string,
    rowClass?: Function,
}

interface TableProps{
    rows: any[],
    columns?: any[],
    className?: string,
    settings?: TableSettings,
    onClickCell?: Function,
    onClickHeader?: Function,
    onClickRow?: Function,
    cellRenderer?: Function
}

interface BodyProps{
    rows: any[],
    columns: Column[],
    settings: TableSettings,
    onClickRow?: Function,
    onClickCell?: Function,
}

interface RowProps{
    row: any,
    index: number,
    reactKey: string,
    columns?: Column[],
    settings: TableSettings,
    onClickRow?: Function,
    onClickCell?: Function,
}


interface CellProps{
    reactKey: string,
    column: Column,
    item: any,
    settings: TableSettings,
    onClickCell?: Function,
}

interface HeaderProps{
    columns: Column[],
    settings: TableSettings,
    onClickHeader?: Function,
}

interface HeaderCellProps{
    reactKey: string,
    column: Column,
    settings: TableSettings,
    onClickHeader?: Function,
}

interface Column{
    key: string,
    label?: string,
    cell?: any
}
