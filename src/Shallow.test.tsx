import React from "react";
import App from "./App";
import { shallow } from "enzyme";

describe("Implementation tests", () => {
  it("should update state to happy when clicking the happy button", () => {
    const mockClient = {
      submit: jest.fn(() => Promise.resolve())
    };
    const wrapper = shallow(<App client={mockClient} />);
    const happyButton = wrapper.find("span").at(0);
    happyButton.simulate("click");
    //@ts-ignore
    expect(wrapper.instance().state.reaction).toEqual("happy");
  });
});
