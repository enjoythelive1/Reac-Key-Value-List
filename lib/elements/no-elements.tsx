import * as React from "react";

export interface NoElementsProps {
    elementClass?: string;
    children?: React.ReactNode;
}

const defaults: Readonly<NoElementsProps> = {
    elementClass: "no-elements-message",
};

export class NoElements extends React.PureComponent<NoElementsProps & React.ClassAttributes<NoElements>> {
    public render() {
        return <div className={this.getElementClass()}>{this.getContents()}</div>;
    }

    private getContents() {
        return this.props.children || "There is no data.";
    }

    private getElementClass() {
        return this.props.elementClass || defaults.elementClass;
    }
}
