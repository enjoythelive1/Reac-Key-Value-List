import * as React from "react";

export interface NoElementsProps {
    elementClass?: string;
}

const defaults: Readonly<NoElementsProps> = {
    elementClass: "no-elements-message",
};

export class NoElements extends React.PureComponent<NoElementsProps & React.ClassAttributes<NoElements>> {
    public render() {
        return <div className={this.getElementClass()}>{this.props.children}</div>;
    }

    private getElementClass() {
        return this.props.elementClass || defaults.elementClass;
    }
}
