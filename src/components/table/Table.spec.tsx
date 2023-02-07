import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "./Table";

test("Table Display", () => {
  const selectedHandler = jest.fn();

  const props = {
    headers: ["header one", "header two"],
    rows: [{ cells: ["cell one", "cell two"] }],
    id: "Sample_Table",
    selectedHandler,
    selectable: true,
    highlight: { row: 0, cell: 0 },
  };

  render(<Table {...props} />);

  expect(screen.getAllByText("header one")).toHaveLength(1);
  expect(screen.getAllByText("cell one")).toHaveLength(1);

  expect(screen.getAllByRole("cell-active")).toHaveLength(1);

  fireEvent.click(screen.getByRole("cell-active"));

  expect(selectedHandler).toHaveBeenCalled();
});
