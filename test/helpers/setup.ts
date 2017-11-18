import * as chai from "chai";
import * as chaiEnzyme from "chai-enzyme";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

chai.use(chaiEnzyme);
