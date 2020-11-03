import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("NavigationItems", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it("shd render 2 NavItems when not logged in", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it("shd render 3 NavItems when logged in", () => {
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it("shd have a logout nav item when logged in", () => {
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.contains(<NavigationItem target="/logout">Logout</NavigationItem>)).toEqual(true);
  });
});
