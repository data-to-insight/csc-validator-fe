# CIN Validator Front-end

This is the front-end client application for the CIN validator back-end. It's built on the Meta Create React App bootstrapper and uses TypeScript, Material-UI, Jest and react-testing-library.

#### Last build: 28/03/23 16:19

## Dependencies

- NodeJS (16+)
- NVM (optional)
- Python 3 (if contributing to the back-end)

## Architecture

The validator is a single page app (SPA) which runs entirely self-contained. It is built on top of React and Typescript and leverages web assembly (WASM) for the Python data layer integration. After the initial application connection to analytics has been made, no further external data calls are made and the application cannot leak data to a third party.

For local development the application is served by the internal webpack dev server. It is designed to be deployed to production on a Github pages instance.

## Structure

The application is laid out in a fairly typical React-componenttized fashion. It is bootstrapped onto the page using ReactDOM through the index.tsx file which adds an entrypoint to App.tsx. The only variation to this is the use of the interstitial Landing.tsx file which loads if the user cookie for the validator hasn't been set. This allows the application to record the user LA for analysis purposes via Google Analytics before reloading with no network interop present. To do this it leverages the Social Finance [sf-cookie-gate](https://github.com/socialfinancedigitallabs/sf-cookie-gate) library for React.

Having loaded App.tsx, responsibility passes to the Router

### Routing

Although the validator doesn't use URL routing it does maintain the concept of a router for managing and dispatching requests for top level pages. Router.tsx enhances a prop type with additional page context before becoming responsible for setup/teardown of a page.

### Pages

Pages are top level components with responsibility for a core part of functionality (landing/data upload/reports). They are conceptually the same as top level views in a traditional MVP organisation. They receive data in the form of reducers and dispatchers, as well as page context data. They then assemble the components which lay the page out.

### Components

Components are split between two areas of responsibility: internal components which are unique to the validator, and [sf-mui-components](https://github.com/socialfinancedigitallabs/sf-mui-components) which is a library from Social Finance containing a selection of MUI components not provided by the core MUI library. All components, regardless of origin, are React JSX (TSX) files.

### State

Local state is managed at component level. Shared state, particularly important in the case of files for upload and report data, is held in a pair of reducers: FileReducer.tsx and ReportReducer.tsx. Read data off from these by using the `useReducer` hook and dispatch events by leveraging the relevant `dispatcher` function, made available to each page by the router and which can be drilled down into any subcomponent.

### Pyodide

The validator application makes heavy use of [pyodide](https://pyodide.org/) to handle data processing and responses. Pyodide is an implementation of CPython for WASM/emscripten and allows the application to run complex Python analysis code without needing a remote Python environment to be spun up. By default Pyodide nests Python and JavaScript code in the same codebase and handles interop between the two. In order to simplify the calling of the library, and to prevent mixing of code styles, the validator uses the Social Finance [pRPC](https://github.com/socialfinancedigitallabs/prpc) library to manage these calls instead. pRPC is a Remote Procedure Call layer with Pyodide as one of its targets. It pushes Pyodide into a web worker for performance purposes and simplifies the process of calling exposed functions at the Python end in a async manner.

pRPC and Pyoide itself are set up at the beginning of runtime in the App.tsx file.

## Environments

Currently the validator supports to environment use-cases: Child In Need Census (CiN) and 903 Statutory Return (903). These can be switched in the front-end by providing the appropriate props to the DOM element in the static index.html file (note the presence of a `wheelPath` prop too which is used to select the correct Python binary to run the back-end).

## Testing

The validator makes use of [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and Jest for testing. Test spec files are nested with components and should be updated/added to when elements or functionality are changed.

## Deployment

The application is deployed automatically on merge to `main` by the use of Github actions as defined in the `.github` directory.

## Contributing

Contributions/patches/enhancements are welcomed. Please raise a PR for your branch and tag a maintainer. The following are mandatory for a PR to be accepted:

- Prettification
- Lint passing
- Test coverage for new components and functions
- Clear commit messages (the application makes heavy use of conventional commits via commitizen. If these are ignored the PR will not be accepted)
