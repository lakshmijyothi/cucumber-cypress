Cypress.Commands.add("fillFormAndSubmit", (email, firstName, lastName) => {
  cy.get('[type="email"]').type(email); // Fill the email field
  cy.get('[name="contact[first_name]"]').type(firstName); // Fill the first name field
  cy.get('[name="contact[last_name]"]').type(lastName); // Fill the last name field
  cy.get('[type="submit"]').click(); // Submit the form
});
