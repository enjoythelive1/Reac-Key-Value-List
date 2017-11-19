import "../helpers/setup";
import {expect} from "chai";
import * as React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import {KeyValueItem} from "../../lib/components/key-value-item";

describe("KeyValueItem", () => {
    let component: React.ReactElement<KeyValueItem>;
    let rendered: ShallowWrapper<KeyValueItem>;

    beforeEach(() => {
        component = <KeyValueItem keyValue={{key: "key", value: "value"}}/>;
        rendered = shallow(component);
    });

    it("renders", () => {
        expect(rendered).to.exist;
    });

    it("has a element class", () => {
        expect(rendered).to.have.className("key-value-item");
    });

    context("when a custom class is provided", () => {
        beforeEach(() => {
            rendered.unmount();
            component = <KeyValueItem keyValue={{key: "key", value: "value"}} elementClass="custom-class"/>;
            rendered = shallow(component);
        });

        it("uses the custom class", () => {
            expect(rendered).to.have.className("custom-class");
        });
    });

    it("shows key", () => {
        expect(rendered.find("label.key")).to.have.text("key:");
    });

    context("keyLabel is provided", () => {

        beforeEach(() => {
            rendered.unmount();
            component = <KeyValueItem keyValue={{key: "key", keyLabel: "Key Value", value: "value"}}/>;
            rendered = shallow(component);
        });

        it("shows the label instead of the key", () => {
            expect(rendered.find("label.key")).to.have.text("Key Value:");
        });
    });

    it("shows value", () => {
        expect(rendered.find("div.value")).to.have.text("value");
    });

    afterEach(() => {
        rendered.unmount();
        rendered = null;
        component = null;
    });
});
