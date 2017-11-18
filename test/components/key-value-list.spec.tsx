import "../helpers/setup";
import {expect} from "chai";
import {mount, ReactWrapper, shallow, ShallowWrapper} from "enzyme";
import * as React from "react";
import {KeyValueList} from "../../lib/components/key-value-list";
import {NoElements} from "../../lib/elements/key-value-list-no-elements";

describe("KeyValueListComponent", () => {
    it("renders", () => {
        const component = <KeyValueList/>;
        const rendered: ReactWrapper<KeyValueList> = mount(component);
        expect(rendered).to.exist;
    });

    context("An empty object is passed as properties", () => {
        let component: React.ReactElement<KeyValueList>;
        let rendered: ShallowWrapper<KeyValueList>;

        beforeEach(() => {
            component = <KeyValueList data={{}} noElementsMessage="There is no data."/>;
            rendered = shallow(component);
        });

        it("Shows message indicating there is no elements", () => {
            expect(rendered).to.containMatchingElement(NoElements);
            expect(rendered.find(NoElements).children()).to.contain.text("There is no data.");
        });

        afterEach(() => {
            rendered.unmount();
            rendered = null;
            component = null;
        });
    });
});
