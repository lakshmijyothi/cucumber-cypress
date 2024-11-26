class amphora {
  visitGoogle() {
    cy.visit("https://www.google.com");
  }

  searchAmphora() {
    cy.get("#APjFqb").type("Amphora website {enter}");
  }

  findAmphoraLink() {
    cy.get(".VuuXrf").should("contain", "Amphora CTRM");
  }

  clickLink() {
    cy.contains("Amphora – Commodities trading platform").click();
    cy.origin("https://amphora.net/", () => {
      cy.on("uncaught:exception", (err) => {
        if (err.message.includes("Script error")) {
          return false;
        }
        throw err;
      });
      cy.wait(5000);
      cy.viewport(1280, 720);
      cy.visit("https://amphora.net/");
      cy.get(".btn").should("contain", "Get in touch");
    });
  }

  verifyAmphora() {
    cy.origin("https://amphora.net/", () => {
      cy.url().should("eq", "https://amphora.net/");
    });
  }

  clickProducts() {
    cy.origin("https://amphora.net/", () => {
      cy.get("#menu-item-32").trigger("mouseover");
    });
  }

  clickOnFreightManager() {
    cy.origin("https://amphora.net/", () => {
      cy.on("uncaught:exception", (err) => {
        if (err.message.includes("Script error")) {
          return false;
        }
        throw err;
      });
      cy.get('[href="https://amphora.net/product/freight-manager/"]')
        .first()
        .click({ force: true });
    });
  }

  verifyTheFreightManagerPage() {
    cy.origin("https://amphora.net/", () => {
      cy.get(".heading--lg").should("contain", "Freight manager");
    });
  }

  clickOnClaimsManager() {
    cy.origin("https://amphora.net/", () => {
      cy.on("uncaught:exception", (err) => {
        if (err.message.includes("Script error")) {
          return false;
        }
        throw err;
      });
      cy.get('[href="https://amphora.net/product/claims-manager/"]')
        .first()
        .click({ force: true });
    });
  }

  verifyClaimsManager() {
    cy.origin("https://amphora.net/", () => {
      cy.get(".heading--lg").should("contain", "Claims manager");
    });
  }

  clickOnResources() {
    cy.origin("https://amphora.net/", () => {
      cy.get("#menu-item-456").trigger("mouseover");
    });
  }

  clickOnNewsLetter() {
    cy.origin("https://amphora.net/", () => {
      cy.on("uncaught:exception", (err) => {
        if (err.message.includes("Script error")) {
          return false;
        }
        throw err;
      });
      cy.get('[href="https://amphora.net/newsletter-sign-up"]')
        .first()
        .click({ force: true });
    });
  }

  signupNewsLetter() {
    cy.origin("https://amphora.net/", () => {
      cy.get('[type="email"]').type("test@example.com");
      cy.get('[name="contact[first_name]"]').type("John");
      cy.get('[name="contact[last_name]"]').type("Doe");
      cy.get('[type="submit"]').click();
    });
  }

  verifyTheSignup() {
    cy.origin("https://amphora.net/", () => {
      cy.contains(
        "Thank you for signing up for our newsletter",
        {
          timeout: 10000,
        },
        { includeShadowDom: true }
      ).should("be.visible");
    });
  }
}

module.exports = new amphora();
