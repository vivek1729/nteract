import { shallow } from "enzyme";
import React from "react";

import { PureAboutModal } from "../src/modal-controller/about-modal";
import { ModalController } from "../src/modal-controller/index";

describe("ModalController", () => {
  it("returns nothing for unknown modal type", () => {
    const component = shallow(<ModalController modalType={"test"} />);
    expect(component.isEmptyRender()).toBe(true);
  });
  it("renders modal for known modal type", () => {
    const component = shallow(
      <ModalController modalType={"core/about-modal"} />
    );
    expect(component.isEmptyRender()).toBe(false);
  });
});

describe("PureAboutModal", () => {
  it("renders without crashing", () => {
    const component = shallow(<PureAboutModal hostType={"local"} />);
    expect(component.isEmptyRender()).toBe(false);
  });
  it("handles click on overlay", () => {
    const closeModal = jest.fn();
    const component = shallow(
      <PureAboutModal hostType={"local"} closeModal={closeModal} />
    );
    component.find(".modal--overlay").simulate("click", {
      preventDefault() {},
      target: "test",
      currentTarget: "test"
    });
    expect(closeModal).toBeCalled();
  });
  it("handles keypress on overlay", () => {
    const closeModal = jest.fn();
    const component = shallow(
      <PureAboutModal hostType={"local"} closeModal={closeModal} />
    );
    component.find(".modal--overlay").simulate("keydown", {
      key: "Escape"
    });
    expect(closeModal).toBeCalled();
  });
});
