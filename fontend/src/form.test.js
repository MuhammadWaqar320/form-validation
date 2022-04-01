import FormComponent from "./components/molecules/FormComponent/formComponent";
import { shallow, mount, render } from "enzyme";
describe("form-first-test-case", () => {
  const wrapper = shallow(<FormComponent />);
//   test case 1
  test("Should have an name field", () => {
    expect(wrapper.find("#name").length).toEqual(1);
  });
//   test case 2
  test("Name field should have initial value empty", () => {
    expect(wrapper.find("#name").props().value).toEqual("");
  });
//   test case 3
  test("Button should be click", () => {
    wrapper.find(".btn").simulate("click");
  });
//   test case 4
  test("pass", () => {
    const cbClick = jest.fn();
    wrapper.find("#surname").simulate("change", {
      target: {
        value: "waqar",
      },
    });
  });
});
