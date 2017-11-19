import "../helpers/setup";
import {expect} from "chai";
import * as React from "react";
import {NoElements} from "../../lib/elements/no-elements";
import {shallow, ShallowWrapper} from "enzyme";

describe("NoElements", () => {
    let component: React.ReactElement<NoElements>;
    let rendered: ShallowWrapper<NoElements>;

    beforeEach(() => {
        component = <NoElements/>;
        rendered = shallow(component);
    });

    it("renders", () => {
        expect(rendered).to.exist;
    });

    it("has a element class", () => {
        expect(rendered).to.have.className("no-elements-message");
    });

    context("when a custom class is provided", () => {
        beforeEach(() => {
            rendered.unmount();
            component = <NoElements elementClass="custom-class"/>;
            rendered = shallow(component);
        });

        it("uses the custom class", () => {
            expect(rendered).to.have.className("custom-class");
        });
    });

    it("Shows default message", () => {
        expect(rendered).to.contain.text("There is no data.");
    });

    context("When custom content is provided to the tag", () => {
        beforeEach(() => {
            rendered.unmount();
            component = <NoElements><span>Custom content</span></NoElements>;
            rendered = shallow(component);
        });

        it("Contains children of element", () => {
            expect(rendered).to.contain(<span>Custom content</span>);
        });
    });

    afterEach(() => {
        rendered.unmount();
        rendered = null;
        component = null;
    });
});
