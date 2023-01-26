const generateCSV = (input: any[]): string | null => {
  if (input.length < 0) {
    return null;
  }
  const output = [
    "data:text/csv;charset=utf-8,",
    Object.keys(input[0]).join(","),
  ];

  input.forEach((row) => {
    output.push(Object.values(row).join(","));
  });

  return output.join("\n");
};

export { generateCSV };
