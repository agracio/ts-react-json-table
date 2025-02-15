import * as React from "react";
import {GridHeaderRow} from "./gridHeaderRow";

export class GridHeader extends React.Component<HeaderProps, {}> {
    public render(){
        let groupHeader = this.props.grouping ? <GridHeaderRow columns={this.props.columns} onClickHeader={this.props.onClickHeader} settings={this.props.settings} groupCell={true}/> : null;
        return <thead className={this.props.theadClassName}>
            {groupHeader}
            <GridHeaderRow columns={this.props.columns} onClickHeader={this.props.onClickHeader} settings={this.props.settings} groupCell={false} grouping={this.props.grouping}/>
        </thead>;
    }

}