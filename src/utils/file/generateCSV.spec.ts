import { generateCSV } from "./generateCSV";

test("generating CSV", () => {
  const input = [{ name: "hello" }, { name: "world" }];
  const output = "data:text/csv;charset=utf-8,\nname\nhello\nworld";

  expect(generateCSV(input)).toEqual(output);
});
