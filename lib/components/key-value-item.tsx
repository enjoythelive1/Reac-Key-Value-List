import * as React from "react";
import {KeyValue} from "../structures/key-value";

export interface KeyValueItemProps {
    keyValue: KeyValue;
    elementClass?: string;
}

const defaultProps = {
    elementClass: "key-value-item",
};

export class KeyValueItem extends React.PureComponent<KeyValueItemProps & React.ClassAttributes<KeyValueItem>> {
    public render() {
        return (
            <div className={this.getElementClass()}>
                <label className="key">{this.getKeyLabel()}:</label>
                <div className="value">{this.getValue()}</div>
            </div>
        );
    }

    private getElementClass() {
        return this.props.elementClass || defaultProps.elementClass;
    }

    private getKeyLabel() {
        return this.props.keyValue.keyLabel || this.props.keyValue.key;
    }

    private getValue() {
        return this.props.keyValue.value;
    }
}
