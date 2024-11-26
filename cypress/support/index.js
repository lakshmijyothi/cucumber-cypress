Cypress.on("uncaught:exception", () => {
  // Returning false here prevents Cypress from failing the test
  return false;
});

import "./commands";
