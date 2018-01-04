import * as React from "react";
import {GridRow} from "./gridRow";
import {Column} from "./grid";

export interface BodyProps{
    rows: any[],
    columns: Column[],
    settings: TableSettings,
    onClickRow?: Function,
    onClickCell?: Function,
}

export class GridBody extends React.Component<BodyProps, {}> {
    public render(){
        let rows = this.props.rows && this.props.rows.length > 0 ?
            this.props.rows.map((row: any, index: number) =>{
                let key = `jt-body-tr-${index}`;
                return <GridRow row={row} columns={this.props.columns} settings={this.props.settings} onClickCell={this.props.onClickCell} onClickRow={this.props.onClickRow} index={index} key={key}/>;
            }):
            <tr><td>{this.props.settings.noRowsMessage}</td></tr>;

        return <tbody>{rows}</tbody>;
    }
}