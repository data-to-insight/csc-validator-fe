import renderer from "react-test-renderer";
import LoadData from "./LoadData";

it("renders LoadData page", () => {
  const handleRouteChange = jest.fn();
  const mockDispatch = jest.fn();
  const mockAPI = {
    call: jest.fn(),
  };

  const props = {
    handleRouteChange,
    data: {},
    dispatch: mockDispatch,
    fileDispatch: mockDispatch,
    api: mockAPI,
    APIName: "mock",
    fileState: [],
  };

  renderer.create(<LoadData {...props} />);
});
