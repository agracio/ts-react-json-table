import * as React from "react";
import {Utils} from "./utils";
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
        let preClassName = `${this.props.settings.classPrefix}CellPre ${this.props.settings.classPrefix}CellPre_${this.props.column.key}`;
        if(cellClass) {
            className = cellClass(className, this.props.column.key, this.props.row);
        }
        let item: any = this.props.item;

        if( typeof this.props.item === 'object'){
            let objectDisplayStyle = this.props.column.objectDisplayStyle || 'string';

            switch (objectDisplayStyle) {
                case 'string':
                    item = Utils.flattenToString(this.props.item);
                    break;
                case 'json':
                    item = JSON.stringify(this.props.item);
                    break;
                case 'jsonSpaced':
                    item = <pre className={preClassName}>{JSON.stringify(this.props.item, null, 2)}</pre>;
                    break;
                case 'flatJson':
                    item = JSON.stringify(Utils.flatten(this.props.item));
                    break;
                case 'flatJsonSpaced':
                    item = <pre className={preClassName}>{JSON.stringify(Utils.flatten(this.props.item), null, 2)}</pre>;
                    break;
                default:
                    item = Utils.flattenToString(this.props.item);
            }
        }

        return <td
            className={className}
            data-key={this.props.column.key}
            onClick={this.onClick.bind(this, this.props.column.key, this.props.item)}>
            {item}
        </td>;
    }

    private onClick(key, item, e){
        if(this.props.onClickCell){
            this.props.onClickCell(e, key, item);
        }
    }

}