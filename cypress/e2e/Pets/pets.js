import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given("I have add pet api", () => {
  const url = "https://petstore.swagger.io/v2/pet";
  cy.wrap(url).as("petApiUrl");
});

When("I add new pet in the store", () => {
  cy.get("@petApiUrl").then((url) => {
    cy.request({
      method: "POST",
      url: url,
      body: {
        id: 0,
        category: {
          id: 0,
          name: "pet",
        },
        name: "doggie",
        photoUrls: ["/dog/img"],
        tags: [
          {
            id: 0,
            name: "dog",
          },
        ],
        status: "available",
      },
    }).as("addedResponse");
  });
});

Then("pet details should be added successfully", () => {
  cy.get("@addedResponse").then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.name).to.eq("doggie");
    expect(response.body.status).to.eq("available");
  });
});

const petApiUrl = "https://petstore.swagger.io/v2/pet";
let petId;

Given("I have update pet api", () => {
  cy.wrap(petApiUrl).as("petApiUrl");
});

When("I add a new pet in the store", () => {
  const newPetDetails = {
    id: Math.floor(Math.random() * 100000),
    category: {
      id: 1,
      name: "dog",
    },
    name: "doggie",
    photoUrls: ["/dog/img"],
    tags: [
      {
        id: 1,
        name: "friendly",
      },
    ],
    status: "available",
  };

  cy.request({
    method: "POST",
    url: petApiUrl,
    body: newPetDetails,
  }).then((response) => {
    expect(response.status).to.eq(200);
    petId = response.body.id;
    cy.wrap(response.body).as("newPet");
  });
});

When("I update the pet name and status", () => {
  cy.get("@newPet").then((newPet) => {
    newPet.name = "updatedDoggie";
    newPet.status = "sold";

    cy.request({
      method: "PUT",
      url: petApiUrl,
      body: newPet,
    }).then((response) => {
      console.log("Update Response:", response);
      cy.wrap(response).as("updateResponse");
    });
  });
});

Then("pet details should be updated successfully", () => {
  cy.get("@updateResponse").then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.name).to.eq("updatedDoggie");
    expect(response.body.status).to.eq("sold");
  });
});

Then("I should be able to get all pet details by available", () => {
  cy.request({
    method: "GET",
    url: "https://petstore.swagger.io/v2/pet/findByStatus?status=available",
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.id).to.eq(petId);
    expect(response.body.name).to.eq("doggie");
    expect(response.body.status).to.eq("available");
  });
});

When("I added new pet in the store", () => {
  cy.get("@petApiUrl").then((url) => {
    const petId = Math.floor(Math.random() * 100000);
    cy.request({
      method: "POST",
      url: url,
      body: {
        id: petId,
        category: {
          id: 0,
          name: "pet",
        },
        name: "doggie",
        photoUrls: ["/dog/img"],
        tags: [
          {
            id: 0,
            name: "dog",
          },
        ],
        status: "available",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.wrap(response.body.id).as("petId");
    });
  });
});

Then("I should be able to get the pet details", () => {
  cy.get("@petId").then((petId) => {
    const getPetUrl = `https://petstore.swagger.io/v2/pet/${petId}`;
    cy.request({
      method: "GET",
      url: getPetUrl,
    }).then((getResponse) => {
      expect(getResponse.status).to.eq(200);
      expect(getResponse.body.id).to.eq(petId);
      expect(getResponse.body.name).to.eq("doggie");
      expect(getResponse.body.status).to.eq("available");
    });
  });
});

When("I adding new pet in the store", () => {
  cy.get("@petApiUrl").then((url) => {
    const petId = Math.floor(Math.random() * 100000);
    cy.request({
      method: "POST",
      url: url,
      body: {
        id: petId,
        category: {
          id: 0,
          name: "pet",
        },
        name: "doggie",
        photoUrls: ["/dog/img"],
        tags: [
          {
            id: 0,
            name: "dog",
          },
        ],
        status: "available",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.wrap(response.body.id).as("pet");
    });
  });
});

Then("I delete the pet", () => {
  cy.get("@pet").then((petId) => {
    const deletePetUrl = `https://petstore.swagger.io/v2/pet/${petId}`;
    cy.request({
      method: "DELETE",
      url: deletePetUrl,
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.request({
        method: "GET",
        url: deletePetUrl,
        failOnStatusCode: false,
      }).then((getResponse) => {
        expect(getResponse.status).to.eq(404);
      });
    });
  });
});
