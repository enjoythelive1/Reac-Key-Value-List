import "../helpers/setup";
import {expect} from "chai";
import {shallow, ShallowWrapper} from "enzyme";
import * as React from "react";
import {KeyValueList} from "../../lib/components/key-value-list";
import {KeyValueItem} from "../../lib/components/key-value-item";
import {NoElements} from "../../lib/elements/no-elements";

describe("KeyValueListComponent", () => {
    let component: React.ReactElement<KeyValueList>;
    let rendered: ShallowWrapper<KeyValueList>;

    beforeEach(() => {
        component = <KeyValueList/>;
        rendered = shallow(component);
    });

    it("renders", () => {
        expect(rendered).to.exist;
    });

    it("has a element class", () => {
        expect(rendered).to.have.className("key-value-list");
    });

    context("when a custom class is provided", () => {
        beforeEach(() => {
            rendered.unmount();
            component = <KeyValueList elementClass="custom-class"/>;
            rendered = shallow(component);
        });

        it("uses the custom class", () => {
            expect(rendered).to.have.className("custom-class");
        });
    });

    context("An empty object is passed as properties", () => {

        beforeEach(() => {
            rendered.unmount();
            component = <KeyValueList data={{}} noElementsMessage="There is no data."/>;
            rendered = shallow(component);
        });

        it("Shows message indicating there is no elements", () => {
            expect(rendered).to.containMatchingElement(NoElements);
            expect(rendered.find(NoElements).children()).to.contain.text("There is no data.");
        });

        context("When noElementsElementClass is provided", () => {
            beforeEach(() => {
                rendered.unmount();
                component = (
                    <KeyValueList
                        data={{}}
                        noElementsElementClass="no-element"
                    />
                );
                rendered = shallow(component);
            });

            it("It passes the element class to the NoElements component", () => {
                expect(rendered.find(NoElements)).to.have.prop("elementClass", "no-element");
            });
        });
    });

    context("An object with properties is passed", () => {

        beforeEach(() => {
            rendered.unmount();
            component = <KeyValueList data={{testProp1: "testValue1", testProp2: "testValue2"}}/>;
            rendered = shallow(component);
        });

        it("Creates the properties", () => {
            expect(rendered).to.contain((
                <KeyValueItem
                    key={"testProp1"}
                    keyValue={{key: "testProp1", keyLabel: "testProp1", value: "testValue1"}}
                />
            ));
            expect(rendered).to.contain((
                <KeyValueItem
                    key={"testProp2"}
                    keyValue={{key: "testProp2", keyLabel: "testProp2", value: "testValue2"}}
                />
            ));
        });

        context("When key labels are specified", () => {
            beforeEach(() => {
                rendered.unmount();
                component = (
                    <KeyValueList
                        data={{testProp1: "testValue1", testProp2: "testValue2"}}
                        keyLabels={{testProp1: "Test Property 1", testProp2: "Test Property 2"}}
                    />
                );
                rendered = shallow(component);
            });

            it("passes the key labels to KeyValueItem", () => {
                expect(rendered).to.contain((
                    <KeyValueItem
                        key={"testProp1"}
                        keyValue={{key: "testProp1", keyLabel: "Test Property 1", value: "testValue1"}}
                    />
                ));
                expect(rendered).to.contain((
                    <KeyValueItem
                        key={"testProp2"}
                        keyValue={{key: "testProp2", keyLabel: "Test Property 2", value: "testValue2"}}
                    />
                ));
            });
        });
    });

    afterEach(() => {
        rendered.unmount();
        rendered = null;
        component = null;
    });
});
