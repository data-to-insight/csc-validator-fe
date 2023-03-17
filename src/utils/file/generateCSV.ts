const replaceCommas = (str: string): string => {
  return str.replaceAll(",", "|");
};

const generateCSV = (input: any[]): string | null => {
  if (input.length < 1) {
    return null;
  }
  const output = [
    "data:text/csv;charset=utf-8,",
    Object.keys(input[0]).join(","),
  ];

  input.forEach((row) => {
    output.push(
      Object.values(row)
        .map((value) => {
          return value || value === 0
            ? replaceCommas(JSON.stringify(value))
            : "-";
        })
        .join(",")
    );
  });

  return output.join("\n");
};

export { generateCSV };
