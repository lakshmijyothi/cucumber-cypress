import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
const amphora = require("../../support/pageObject/amphoraObjects");

Given("user on the Google homepage", () => {
  amphora.visitGoogle();
});

When("user search for Amphora", () => {
  cy.get("#APjFqb").type("Amphora website {enter}");
});

Then("user should see the link Amphora CTRM", () => {
  amphora.findAmphoraLink();
});

When("user click the link Amphora CTRM", () => {
  amphora.clickLink();
});

Then("user should land on the Amphora homepage", () => {
  amphora.verifyAmphora();
});

When("user click on product", () => {
  amphora.clickProducts();
});

When("user click on Freight manage", () => {
  amphora.clickOnFreightManager();
});

Then("user should navigate to Freight manage", () => {
  amphora.verifyTheFreightManagerPage();
});

When("user click on Claims manager", () => {
  amphora.clickOnClaimsManager();
});

Then("user should navigate to Claims manager", () => {
  amphora.verifyClaimsManager();
});

When("user click on Resources", () => {
  amphora.clickOnResources();
});

When("user click on newsletter signup", () => {
  amphora.clickOnNewsLetter();
});

When("user signup newsletter", () => {
  amphora.signupNewsLetter();
});

When("verify the newsletter", () => {
  amphora.verifyTheSignup();
});
