# Playwright TypeScript E2E Automation Framework

A scalable end-to-end test automation framework built with Playwright and TypeScript using the Page Object Model design pattern.

## Application Under Test

Sauce Demo

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model
- Git
- GitHub Actions
- HTML Test Reports

## Automated Coverage

### Smoke Tests

- Valid user login
- Product selection
- Add product to cart
- Checkout completion

### Regression Tests

- Invalid login credentials
- Locked user login
- Empty login fields
- Product sorting
- Adding multiple products to the cart
- Removing products from the cart
- Checkout field validation
- Successful order completion

## Project Structure

```text
pages/       Page Object classes
tests/       Smoke and regression tests
fixtures/    Reusable Playwright fixtures
test-data/   Test data
utils/       Utility methods
.github/     CI/CD workflows
```

## Prerequisites

- Node.js 20 or later
- npm
- Git

## Installation

Clone the repository:

```bash
git clone [https://github.com/SNitinKumar/playwright-typescript-e2e-framework.git](https://github.com/SNitinKumar/playwright-typescript-e2e-framework.git)
cd playwright-typescript-e2e-framework
```

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

## Execute Tests

Run all tests:

```bash
npx playwright test
```

Run smoke tests:

```bash
npx playwright test --grep @smoke
```

Run regression tests:

```bash
npx playwright test --grep @regression
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Open the HTML report:

```bash
npx playwright show-report
```

## Design Approach

The framework uses the Page Object Model to separate page interactions from test scenarios. Reusable fixtures are used for common setup such as authenticating a valid user.

## CI/CD

GitHub Actions executes the Playwright test suite on pushes and pull requests. Test reports are uploaded as workflow artifacts.

## Future Enhancements

- Add API test coverage.
- Add accessibility checks.
- Add schema validation.
- Add environment-specific configuration.
- Add additional browser projects.
