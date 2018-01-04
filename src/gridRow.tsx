import * as React from "react";
import {GridRowCell} from "./gridRowCell";
import {Utils} from "./utils";
import {Column} from "./grid";

export interface RowProps{
    row: any,
    index: number,
    columns: Column[],
    settings: TableSettings,
    onClickRow?: Function,
    onClickCell?: Function,
}

export class GridRow extends React.Component<RowProps, {}> {

    public render(){
        let rowClass = this.props.settings.rowClass;
        let className = `${this.props.settings.classPrefix}Row ${this.props.settings.classPrefix}${this.props.index % 2 ? 'Odd' : 'Even'}`;


        if(rowClass) {
            className = rowClass(className, this.props.row);
        }

        return <tr className={className} onClick={this.onClick.bind(this, this.props.row)}>
            {this.props.columns.map((column: ColumnSetting | any, index: number) =>{

                let item;
                if(typeof column.cell === 'function'){
                    item = column.cell(this.props.row, column.key);
                }
                else if(column.cell.indexOf('.') !== -1){
                    item = Utils.getObjectByKey(this.props.row, column.cell);
                }
                else{
                    item = this.props.row[column.cell];
                }
                //let item = typeof column.cell == 'function' ? column.cell(this.props.row, column.key) : this.props.row[column.cell];
                let key = `jt-body-td-${index}`;
                return <GridRowCell settings={this.props.settings} onClickCell={this.props.onClickCell} item={item} row={this.props.row} column={column} key={key} />;
            })}
        </tr>;
    }

    private onClick(item, e){
        if(this.props.onClickRow){
            this.props.onClickRow(e, item);
        }
    }
}