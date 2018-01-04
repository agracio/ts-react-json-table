import * as React from "react";
import {Column} from "./grid";

export interface HeaderRowCellProps{
    column: Column,
    settings: TableSettings,
    grouping?: boolean,
    groupCell?: boolean,
    onClickHeader?: Function,
}

export class GridHeaderRowCell extends React.Component<HeaderRowCellProps, {}> {

    private header: string;
    private key: string;

    public render(){
        let headerClass = this.props.settings.headerClass;
        let className = `${this.props.settings.classPrefix}Column`;
        //let label: string;
        let rowSpan: number = null;
        let colSpan: number = 1;
        let skip: boolean = false;
        if(this.props.groupCell){
            if(this.props.column.group) {
                if(this.props.column.groupIndex === 0)
                {
                    this.header = this.props.column.group;
                    colSpan = this.props.column.colSpan;
                }else{
                    skip = true;
                }

            }else{
                this.header = this.props.column.label;
                rowSpan = 2;
            }

        }else {
            if(this.props.grouping){
                if(this.props.column.group)
                {
                    this.header = this.props.column.label;
                }
                else{
                    skip = true;
                }
            }else{
                this.header = this.props.column.label;
            }
        }

        //this.key = (this.props.column.group && this.header === this.props.column.group) ? this.header.replace(/\W+/g, '') : this.props.column.key;
        this.key = (this.props.column.group && this.header === this.props.column.group) ? this.header : this.props.column.key;

        if(headerClass) {
            className = headerClass(className, this.key);
        }

        let content = this.props.settings.freezeHeader ? <div><div>{this.header}</div><div>{this.header}</div></div> : this.header;
        let th = skip ? null : this.createTh(className, rowSpan, colSpan, content);
        return th;
    }

    private createTh(className, rowSpan, colSpan, content){
        return <th
            className={className}
            onClick={this.onClick.bind(this, this.key)}
            data-key={this.key}
            rowSpan={rowSpan}
            colSpan={colSpan}
        >
            {content}

        </th>;
    }

    private onClick(key, e){
        if(this.props.onClickHeader){
            this.props.onClickHeader(e, key);
        }
    }
}