import * as React from "react";
import {GridHeader} from "./gridHeader";
import {GridBody} from "./gridBody";
import {GridFooter} from "./gridFooter";
import {Fragment} from "react";

export class JsonTable extends React.Component<TableProps, {}> {

    private columns: Column[] | any[];
    private settings: TableSettings;
    private className: string;
    private defaultSettings: TableSettings = {
        header: true,
        noRowsMessage: 'No items',
        classPrefix: 'json',
    };
    private headerGrouping: boolean = false;

    public render(){

        this.createSettings();
        this.columns = this.createColumns();
        this.className = this.props.className || `${this.settings.classPrefix}Table`;
        let style: React.JSX.Element;
        let tableClassName = this.className.split(' ')[0].trim();

        let caption = this.props.caption ? <caption>{this.props.caption}</caption> : null;
        let header = this.settings.header ? <GridHeader theadClassName={this.props.theadClassName} key={'jt-header'} settings={this.settings} columns={this.columns} onClickHeader={this.props.onClickHeader} grouping={this.headerGrouping}/> : null;
        let footer = <GridFooter className={`${this.settings.classPrefix}Footer`} key={'jt-footer'}/>;

        // styles
        let fixedHeader = this.props.fixedHeader ? `table.${tableClassName} thead th{position: sticky;}\ntable.${tableClassName} thead {position: sticky;}\ntable.${tableClassName} caption {position: sticky;}` : `table.${tableClassName} thead{ top:0;}`;
        if(this.props.fixedHeader && !caption){
            fixedHeader += `\ntable.${tableClassName} thead{ top:0;}`;
        }
        let fixedCaption = this.props.fixedHeader ? null : `table.${tableClassName} caption{border-bottom: none;}`;

        let hoverColor = this.settings.style?.hoverColor ? `table.${tableClassName} tbody tr:hover{color: ${this.settings.style?.hoverColor};}` : null;
        let hoverBgColor = this.settings.style?.hoverBgColor ? `table.${tableClassName} tbody tr:hover{background-color: ${this.settings.style?.hoverBgColor};}` : null;
        let oddBgColor = this.settings.style?.nthOddBgColor ? `.${this.settings.classPrefix}Odd{background-color: ${this.settings.style?.nthOddBgColor};}` : null;
        let evenBgColor = this.settings.style?.nthEvenBgColor ? `.${this.settings.classPrefix}Even{background-color: ${this.settings.style?.nthEvenBgColor};}` : null;

        style =
            <style>
                {fixedHeader}
                {fixedCaption}
                {hoverColor}
                {hoverBgColor}
                {oddBgColor}
                {evenBgColor}
            </style>;

        let table =
            <Fragment>
                {style}
                <table className={this.className} key={'jt-table'}>
                    {caption}
                    {header}
                    <GridBody key={'jt-body'} settings={this.settings} columns={this.columns} rows={this.props.rows} onClickRow={this.props.onClickRow} onClickCell={this.props.onClickCell}/>
                    {footer}
                </table>
            </Fragment>

        return table;
    }

    private createSettings(){
        if(this.props.settings) {
            this.settings = this.props.settings;
        }else{
            this.settings = this.defaultSettings;
        }
        if(this.settings.header == null ) this.settings.header = true;
        if(this.settings.noRowsMessage == null ) this.settings.noRowsMessage = this.defaultSettings.noRowsMessage;
        if(this.settings.classPrefix == null ) this.settings.classPrefix = this.defaultSettings.classPrefix;
    }

    private createColumns(): Column[]{

        if(!this.props.rows || this.props.rows.length === 0) {
            return [];
        }

        let columns: Column[];

        if(!this.props.columns){
            columns = Object.keys(this.props.rows[0]).map<Column>(key =>{
                return {
                    key: key,
                    label: key,
                    cell: this.settings.cellRenderer || key,
                }
            });
        }
        else{
            columns =  this.props.columns.map<ColumnSetting>(column =>{
                if( typeof column == 'string' ){
                    return {
                        key: column,
                        label: column,
                        cell: this.settings.cellRenderer || column
                    };
                }
                if( typeof column == 'object' ){
                    let key = column.key || column.label;

                    if(column.group) this.headerGrouping = true;

                    return {
                        key: key,
                        label: column.label || key,
                        cell: this.settings.cellRenderer || column.cell || key,
                        objectDisplayStyle: column.objectDisplayStyle || 'json',
                        group: column.group
                    };
                }
            });
        }

        if(this.props.excludeColumns && this.props.excludeColumns.length !== 0){
            let toDelete: number[] = [];
            this.props.excludeColumns.forEach(key =>{
                toDelete.push(columns.findIndex((column: ColumnSetting) =>{return column.key === key}))
            });

            toDelete.forEach(index =>{
                if(index !== -1) columns.splice(index, 1);
            });
        }

        let copyObject = (index: number, columnDefinition: ColumnSetting): boolean=>{
            if(index !== -1) {
                Object.keys(columnDefinition).forEach(key =>{
                    columns[index][key] = columnDefinition[key];
                });
                return true;
            }
            return false;
        };

        if(this.props.columnDefinitions && this.props.columnDefinitions.length > 0){
            this.props.columnDefinitions.forEach((def: ColumnSetting) =>{
                let index = columns.findIndex((column: ColumnSetting) =>{return column.key === def.key});
                if(!copyObject(index, def)) {
                    let dotIndex = def.key.indexOf('.');
                    if(dotIndex !== -1){
                        index = columns.findIndex((column: ColumnSetting) =>{return column.key === def.key.substring(0, dotIndex)});
                        if(copyObject(index, def)) {
                            columns[index].cell = this.settings.cellRenderer || def.cell || def.key;
                        }else{
                            index = columns.findIndex((column: ColumnSetting) =>{return column.key.indexOf( def.key.substring(0, dotIndex + 1)) !== -1});
                            if(index !== -1) {
                                let newIndex = index + 1;
                                columns.splice(newIndex, 0, def);
                                copyObject(newIndex, def);
                                columns[newIndex].cell = this.settings.cellRenderer || def.cell || def.key;
                            }
                        }
                    }
                }

                if(def.group) this.headerGrouping = true;
            });
        }

        if(this.headerGrouping){
            let group: string;
            let colSpans: Map<string, number> = new Map<string, number>();
            let colSpan = 1;
            columns.forEach((column: Column) =>{
                if(column.group) {
                    if (column.group === group) {
                        colSpans.set(column.group, ++colSpan);
                    }else{
                        group = column.group;
                        column.groupIndex = 0;
                        colSpan = 1
                    }
                }

            });

            Array.from(colSpans.keys()).forEach(group =>{
                let index = columns.findIndex((column: Column) =>{return column.group === group && column.groupIndex === 0});
                columns[index].colSpan = colSpans.get(group);
            });

        }

        return columns;
    }
}
module.exports = JsonTable;