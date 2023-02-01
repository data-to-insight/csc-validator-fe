import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";

import { Loader } from "@sfdl/sf-mui-components";
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
      <CookieGate APIName={"Using: Pyodide"} />
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
