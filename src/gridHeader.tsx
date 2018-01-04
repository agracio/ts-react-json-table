import * as React from "react";
import {GridHeaderRowCell} from "./gridHeaderRowCell";
import {GridHeaderRow} from "./gridHeaderRow";
import {Column} from "./grid";

export interface HeaderProps{
    columns: Column[],
    settings: TableSettings,
    onClickHeader?: Function,
    grouping?: boolean,
    theadClassName?: string,
}

export class GridHeader extends React.Component<HeaderProps, {}> {
    public render(){
        let groupHeader = this.props.grouping ? <GridHeaderRow columns={this.props.columns} onClickHeader={this.props.onClickHeader} settings={this.props.settings} groupCell={true}/> : null;
        return <thead className={this.props.theadClassName}>
            {groupHeader}
            <GridHeaderRow columns={this.props.columns} onClickHeader={this.props.onClickHeader} settings={this.props.settings} groupCell={false} grouping={this.props.grouping}/>
        </thead>;
    }

}