import { pascalToReadable } from "./fomatters";

test("pascal to readable", () => {
  expect(pascalToReadable("helloWorld")).toEqual("Hello World");
});
