import { reportReducer, ReportActionType } from "reducers/ReportReducer";

test("Check reducer outputs", () => {
  const action = { type: ReportActionType.UPDATE, payload: { value: "hello" } };

  expect(reportReducer({}, action)).toEqual(action.payload);
});
