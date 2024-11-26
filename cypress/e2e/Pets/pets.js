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
    id: 0,
    category: {
      id: 0,
      name: "pets",
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
    const updatedPetDetails = {
      ...newPet,
      name: "updatedDoggie",
      status: "sold",
    };

    cy.request({
      method: "PUT",
      url: petApiUrl,
      body: updatedPetDetails,
    }).as("updateResponse");
  });
});

Then("pet details should be updated successfully", () => {
  cy.get("@updateResponse").then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.name).to.eq("updatedDoggie");
    expect(response.body.status).to.eq("sold");
  });
});

Then("I should be able to get the pet details", () => {
  cy.request({
    method: "GET",
    url: "https://petstore.swagger.io/v2/pet",
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.id).to.eq(petId);
    expect(response.body.name).to.eq("doggie");
    expect(response.body.status).to.eq("available");
  });
});
