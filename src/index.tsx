import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { APITransport } from "./api";
import Loader from "components/loader";
import { withCookieGate } from "@sfdl/sf-cookie-gate";

const App = lazy(() => {
  return import("./App");
});

const Landing = lazy(() => {
  return import("./Landing");
});

const Core = () => {
  const CookieGate = withCookieGate({
    options: { cookieName: "my-cookie", cookieOptions: {} },
    LandingComponent: Landing,
    ApplicationComponent: App,
  });

  return (
    <Suspense fallback={<Loader type="cover" />}>
      <CookieGate
        apiTransport={APITransport.PYODIDE}
        apiConfig={{
          wheelPath: "/bin/dist/main-0.0.0-py3-none-any.whl",
          endPoint: "endpoint",
        }}
      />
    </Suspense>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Core />
  </React.StrictMode>
);
