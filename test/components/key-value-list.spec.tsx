import {expect} from "chai";
import {mount} from "enzyme";
import * as React from "react";
import {KeyValueList} from "../../lib/components/key-value-list";
import "../helpers/setup";

describe("KeyValueListComponent", () => {
    it("renders", () => {
        const component = <KeyValueList/>;
        const rendered = mount(component);
        expect(rendered).to.exist;
    });

    context("An empty object is passed as properties", () => {
        it("Shows message indicating there is no elements");
    });
});
