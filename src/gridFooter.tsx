import * as React from "react";

export class GridFooter extends React.Component<FooterProps, {}> {
    public render(){
        let className = `${this.props.settings.classPrefix}Footer`;
        return <tfoot className={'className'}/>;
    }
}