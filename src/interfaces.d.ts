interface Column extends ColumnSetting{
    groupIndex?: Readonly<number>
    colSpan?: Readonly<number>
}

interface BodyProps{
    rows: any[],
    columns: Column[],
    settings: TableSettings,
    onClickRow?: Function,
    onClickCell?: Function,
}

interface HeaderProps{
    columns: Column[],
    settings: TableSettings,
    onClickHeader?: Function,
    grouping?: boolean,
    theadClassName?: string,
}

interface HeaderRowProps{
    columns: Column[],
    settings: TableSettings,
    grouping?: boolean,
    groupCell?: boolean,
    onClickHeader?: Function,
}

interface HeaderRowCellProps{
    column: Column,
    settings: TableSettings,
    grouping?: boolean,
    groupCell?: boolean,
    onClickHeader?: Function,
}

interface RowProps{
    row: any,
    index: number,
    columns: Column[],
    settings: TableSettings,
    onClickRow?: Function,
    onClickCell?: Function,
}

interface RowCellProps{
    column: Column,
    item: any,
    settings: TableSettings,
    onClickCell?: Function,
    row: any,
}

interface FooterProps{
    className: string,
}


