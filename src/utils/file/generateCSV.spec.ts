import { generateCSV } from "./generateCSV";

test("generating CSV", () => {
  const input = [{ name: "hello" }, { name: "world" }];
  const output = 'data:text/csv;charset=utf-8,\nname\n"hello"\n"world"';

  expect(generateCSV(input)).toEqual(output);
});

test("generating CSV with null value", () => {
  const input = [{ name: null }, { name: "world" }];
  const output = 'data:text/csv;charset=utf-8,\nname\n-\n"world"';

  expect(generateCSV(input)).toEqual(output);
});

test("attemping to convert an empty array returns null", () => {
  const input: any = [];

  expect(generateCSV(input)).toBe(null);
});
