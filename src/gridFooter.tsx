import * as React from "react";

export class GridFooter extends React.Component<FooterProps, {}> {
    public render(){
        return <tfoot className={this.props.className}/>;
    }
}