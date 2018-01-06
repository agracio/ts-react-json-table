import * as React from "react";
import {Column} from "./grid";

export interface RowCellProps{
    column: Column,
    item: any,
    settings: TableSettings,
    onClickCell?: Function,
    row: any,
}

export class GridRowCell extends React.Component<RowCellProps, {}> {

    public render(){
        let cellClass = this.props.settings.cellClass;
        let className = `${this.props.settings.classPrefix}Cell ${this.props.settings.classPrefix}Cell_${this.props.column.key}`;

        if(cellClass) {
            className = cellClass(className, this.props.column.key, this.props.row);
        }

        return <td
            className={className}
            data-key={this.props.column.key}
            onClick={this.onClick.bind(this, this.props.column.key)}>
            {this.props.item}
        </td>;
    }

    private onClick(key, e){
        if(this.props.onClickCell){
            this.props.onClickCell(e, key, this.props.row);
        }
    }

}