import FormComponent from "./components/molecules/FormComponent/formComponent";
import { shallow, mount, render } from "enzyme";
describe("form-first-test-case", () => {
  const wrapper = shallow(<FormComponent />);
  test("Should have an name field", () => {
    expect(wrapper.find("#name").length).toEqual(1);
  });
  test("Name field should have initial value empty", () => {
    expect(wrapper.find("#name").props().value).toEqual("");
  });
  test("Button should be click", () => {
    wrapper.find(".btn").simulate("click");
  });
  test("pass", () => {
    const cbClick = jest.fn();
    wrapper.find("#surname").simulate("change", {
      target: {
        value: "waqar",
      },
    });
  });
});
