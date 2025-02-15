import * as React from "react";
import {GridHeaderRowCell} from "./gridHeaderRowCell";

export class GridHeaderRow extends React.Component<HeaderRowProps, {}> {
    public render(){
        return <tr>
            {this.props.columns.map((column: ColumnSetting, index: number) =>{
                let key = `jt-header-th-${index}`;
                return <GridHeaderRowCell settings={this.props.settings} column={column} key={key} grouping={this.props.grouping} groupCell={this.props.groupCell} onClickHeader={this.props.onClickHeader}/>;
            })}
        </tr>;
    }

}