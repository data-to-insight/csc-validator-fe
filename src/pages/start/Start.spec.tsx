import renderer from "react-test-renderer";
import Start from "./Start";

it("renders Start page", () => {
  const handleClick = jest.fn();

  const props = {
    onClick: handleClick,
  };

  const view = renderer.create(<Start {...props} />);
});
