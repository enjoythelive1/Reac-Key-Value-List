import * as React from "react";
import {KeyValue} from "../structures/key-value";

export interface KeyValueItemProps {
    keyValue: KeyValue;
    keyLabels?: { [prop: string ]: string };
}

export class KeyValueItem extends React.PureComponent<KeyValueItemProps & React.ClassAttributes<KeyValueItem>> {
    public render() {
        return (<div/>);
    }
}
