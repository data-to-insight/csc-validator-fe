export const downloadFile = (
  payload: unknown,
  name: string = "file.txt"
): void => {
  const encodedURI = encodeURI(payload as string);
  const link = document.createElement("a");
  document.body.appendChild(link);

  link.download = name;
  link.href = encodedURI;
  link.click();
  document.body.removeChild(link);
};
