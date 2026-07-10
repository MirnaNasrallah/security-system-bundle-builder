# Security System Bundle Builder

A responsive, catalog-driven React bundle builder backed by an optional Express API. Product cards, accordion steps, review lines, pricing, variants, and editable quantities are all rendered from data rather than product-specific markup.

## Requirements

- Node.js 20 or newer
- npm

## Run the client

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173`. The client tries the API at `VITE_API_URL` and automatically uses its bundled catalog if the server is unavailable.

## Run the API

In a second terminal:

```bash
cd server
npm install
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
- Browser persistence is isolated behind `utils/storage.js` and debounced by `usePersistedBundle`.
- The API catalog manifest points to the bundled catalog, keeping one source of truth while retaining the requested server data boundary.
- CSS custom properties define the visual system; the same component tree reflows across desktop, tablet, and mobile.

Checkout is intentionally a confirmation placeholder. Product artwork uses a local neutral device illustration so the project has no third-party image dependency.
