# Security System Bundle Builder

A responsive, catalog-driven React bundle builder backed by an optional Express API. Product cards, accordion steps, review lines, pricing, variants, and editable quantities are all rendered from data rather than product-specific markup.

## Requirements

- Node.js 20 or newer
- npm

## Run the client

```bash
cd client
npm ci
cp .env.example .env
npm run dev
```

Open `http://localhost:5173`. The client tries the API at `VITE_API_URL` and automatically uses its bundled catalog if the server is unavailable.

## Run the API

In a second terminal:

```bash
cd server
npm ci
npm start
```

The catalog endpoint is available at `http://localhost:3001/api/catalog`. Set `PORT` to use another port.

## Production checks

```bash
cd client
npm run lint
npm run build
```

## Architecture

- `BundleProvider` owns normalized quantities, active variants, and the expanded step.
- Derived selections and totals are memoized instead of duplicated in state.
- A selected variant remains in the review when another variant becomes active.
- Saved configurations are validated against the current catalog before they initialize the bundle state.
- Browser persistence is isolated behind `utils/storage.js`; configuration is written when the shopper selects **Save my system for later**.
- The API catalog manifest points to the bundled catalog, keeping one source of truth while retaining the requested server data boundary.
- CSS custom properties define the visual system; the same component tree reflows across desktop, tablet, and mobile.

## Decisions and tradeoffs

- Checkout intentionally displays a confirmation because payment and order APIs are outside the prototype scope.
- Product and guarantee artwork is stored locally so the UI does not depend on third-party image hosting.
- The client works without the optional API by falling back to its bundled JSON catalog.
- The optional server manifest references the client catalog to avoid maintaining duplicate product data, so the server is intended to run from the full repository.
- The typography stack prefers Gilroy and uses platform fallbacks when that proprietary font is unavailable.

All requested bundle-builder interactions are implemented. Automated browser tests are not included; `npm run lint` and `npm run build` are the provided quality gates.
