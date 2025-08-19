# Next.js + Cypress Mock API Tutorial

This [Next.js](https://nextjs.org) project demonstrates how to mock APIs in server actions using Next.js and test them with Cypress.

It is bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)
and includes a mock API server to test server actions without hitting a real backend.

The main code here lies in `cypress/support/mockAPISever.js`. <br>
Here the mock service is registered which listens on given endpoints. The commands are registered to cypress via `cypress.config.js`

## Folder Structure

```txt
app/           # Next.js app source code
  ├─ lib/      # Server actions (API calls)
  ├─ page.jsx  # Main page that fetches API response
  └─ page.module.css
cypress/       # Cypress tests and support files
  ├─ e2e/      # End-to-end test specs
  └─ support/  # Mock API server and Cypress commands
public/        # Static assets
package.json   # Scripts and dependencies
```

- `app/lib/serverAction.js` → Contains server-side code to fetch data from the API.
- `cypress/support/mockAPISever.js` → Mock API server used in tests.
- `cypress/e2e/tests/test.cy.js` → Example Cypress test for the main page and API.

## Getting Started

### Install dependencies

```bash
npm install
```

### Launch the application

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.<br><br>
On the main page you will see the output of a GET request to https://dummyjson.com/test

## Test the application with cypress e2e tests

To test the application it must be lauched with the proper enviroment variable of the API pointing to our mock server listening on http://localhost:9000.

### Run Next.js with the mock server environment variable:

```bash
npm run dev:cypress
```

### Launch the Cypress UI to run tests

```bash
npm run cypress
```

## How It Works

The mock API server is defined in `cypress/support/mockAPISever.js.`

Cypress communicates with the mock server using `cy.task('mockAPIResponse', ...)`.

The main page uses a Next.js Server Action to fetch API data (`(app/lib/serverAction.js`).

Tests verify both the mock API response and the page rendering.
