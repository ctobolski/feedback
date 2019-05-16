import React from "react";
import App from "./App";
import { shallow } from "enzyme";

describe("Implementation tests", () => {
  it("should render a happy button or icon", () => {
    const wrapper = shallow(<App />);
    const happyButton = wrapper.find("span").at(0);
    expect(happyButton.exists).toBeTruthy();
  });
});
