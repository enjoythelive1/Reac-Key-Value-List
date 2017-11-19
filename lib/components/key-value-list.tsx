import * as React from "react";
import {NoElements} from "../elements/no-elements";
import {KeyValueItem} from "./key-value-item";
import {KeyValue} from "../structures/key-value";

export interface KeyValueListProps {
    elementClass?: string;
    data?: { [prop: string ]: string };
    keyLabels?: { [prop: string ]: string };
    noElementsMessage?: string;
    noElementsElementClass?: string;
}

const defaults: Readonly<KeyValueListProps> = {
    elementClass: "key-value-list",
    noElementsMessage: "There is no data.",
};

export class KeyValueList extends React.PureComponent<KeyValueListProps & React.ClassAttributes<KeyValueList>> {
    public render(): React.ReactNode {
        return (
            <div className={this.getElementClass()}>
                {this.getContent()}
            </div>
        );
    }

    private getContent() {
        return this.hasKeys() ?
            this.getKeyValueItems(this.getKeyValues()) :
            this.getNoElementsComponent();
    }

    private getKeyValueItems(keyValues: KeyValue[]) {
        return keyValues.map((keyValue) => (
            <KeyValueItem
                key={keyValue.key}
                keyValue={keyValue}
            />
        ));
    }

    private getNoElementsComponent() {
        return <NoElements elementClass={this.getNoElementElementClass()}>{this.getNoElementMessage()}</NoElements>;
    }

    private getElementClass() {
        return this.props.elementClass || defaults.elementClass;
    }

    private getNoElementMessage() {
        return this.props.noElementsMessage || defaults.noElementsMessage;
    }

    private getNoElementElementClass() {
        return this.props.noElementsElementClass || defaults.noElementsElementClass;
    }

    private getKeyValues(): KeyValue[] {
        if (this.props.data) {
            return Object.keys(this.props.data)
                .map<KeyValue>((key) => ({
                    key,
                    keyLabel: this.props.keyLabels && this.props.keyLabels[key] || key,
                    value: this.props.data[key],
                }));
        } else {
            return [];
        }
    }

    private hasKeys(): boolean {
        return this.props.data && Boolean(this.getKeyValues().length);
    }
}
