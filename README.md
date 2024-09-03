# QA Engineer Assignment

## Project Overview

This project is a recruitment assignment for the position of Automation QA Engineer. The objective was to develop an automated test suite using a chosen automation test framework for the travelplanet.pl website. These tests should also be executable on invia.sk, invia.hu, and invia.cz. The tests cover the following functionalities:

- **Basic Homepage Functionalities**:
  - Navigate to the homepage for each site (invia.cz, invia.sk, invia.hu, and travelplanet.pl).
  - Verify the presence of essential elements: destination selector, date selector, transportation selector, passenger selector, and the login button.
- **Login Functionality**:
  - Implement the login process using incorrect credentials.
- **Destination and Date Selection**:
  - Input a test destination and select a travel date range using the date picker.
- **Offer Selection**:
  - Navigate to the second page of search results and select any offer.

## Prerequisites

- **Node.js**: Version v21.6.2 or later.

### Dependencies

The project requires the following dependencies:

- **@eslint/js**: ^9.9.1
- **@playwright/test**: ^1.46.1
- **@types/node**: ^22.5.1
- **eslint**: ^9.9.1
- **globals**: ^15.9.0
- **typescript-eslint**: ^8.3.0
- **dotenv**: ^16.4.5

## Installation

To install the project, first clone the repository from GitHub.

`git clone git@github.com:MathiasS98/QA-Assignment_MSieradzki.git`

Then install all necessary dependencies

`npm install`

## Configuration

This project uses environment variables for configuration. It is recommended to install and use a `.env` file to set these variables.

- **SITE_DOMAIN**: The domain to run the tests on (e.g., `pl`, `cz`, `hu`, `sk`).

To set up the environment variables for the project on your local environment, follow these steps:

1. Copy the `.env.template` file to a new file named `.env`:
   cp .env.template .env

2. Open the .env file and fill in the required values.

3. Save the file. The project will now use these settings when run locally.

## Running Tests

Tests can be run using the following commands:

`npx playwright test`

For a UI-based test runner:

`npx playwright test --ui`

## Running Tests in CI

To run tests in a Continuous Integration (CI) environment, it's recommended to use a matrix configuration in your CI pipeline. An example CI configuration is provided in the `CI.yml` file. The most critical part is setting the domains in the matrix.

## Project Structure

The project is organized as follows:

- **components/**: Contains reusable UI components like dialogs, forms, and menus.

- **config/**: Contains configuration files.

  - `translations.config.ts`: Manages translation mappings for different domains.

- **fixtures/**: Contains fixture files used for setting up the test environment.

- **models/**: Contains TypeScript types and interfaces used throughout the project.

- **pages/**: Contains page objects following the Page Object Model pattern.

- **utils/**: Contains utility functions for handling dates, environment variables, etc.

- **tests/**: Contains the actual test cases.

## Usage Examples

You can run the tests directly using Playwright, or integrate them into a CI pipeline. For CI, consider using the `CI.yml` configuration with domain settings in the matrix to run tests across different environments.

## Approach and Design

The project is designed following the **Page Object Model (POM)** pattern, which helps in maintaining and scaling the test suite. The following key features are implemented:

- **Environment Variables**: The `SITE_DOMAIN` environment variable is used to determine which domain the tests will run against.
- **Translations**: The `translations.config.ts` file contains translation mappings for different domains, which are used to validate text in different languages.
- **Fixtures**: Custom fixtures are used to initialize page objects like `homePage` and handle actions like accepting the cookies dialog before the actual test begins.

This approach ensures the tests are modular, maintainable, and easily extensible.
