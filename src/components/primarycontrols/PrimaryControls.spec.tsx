import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PrimaryControls from "./PrimaryControls";

test("Primary Controls display and interaction", () => {
  const onClearClick = jest.fn();
  const onGenerateClick = jest.fn();
  const onValidateClick = jest.fn();

  render(
    <PrimaryControls
      onClearClick={onClearClick}
      onGenerateClick={onGenerateClick}
      onValidateClick={onValidateClick}
    />
  );

  fireEvent.click(screen.getByText("Validate"));
  expect(onValidateClick).toHaveBeenCalled();

  fireEvent.click(screen.getByText("Clear Data And Start Again"));
  expect(onClearClick).toHaveBeenCalled();

  fireEvent.click(screen.getByText("Download CSVs"));
  expect(onGenerateClick).toHaveBeenCalled();
});
