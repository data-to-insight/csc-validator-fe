export {};

declare global {
  interface Window {
    pyodide: any;
    loadPyodide: any;
    pyodideLoaded: any;
    csdmpy: any;
    gtag: any;
    dataLayer: any;
  }
}
