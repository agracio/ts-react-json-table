import * as React from "react";

export class GridFooter extends React.Component<any, {}> {
    public render(){
        return <tfoot className={`${this.props.settings.classPrefix}Footer`}/>;
    }
}