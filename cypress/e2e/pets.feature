Feature: Update Pet Details

  Scenario: Add the new pet
    Given I have add pet api
    When  I add new pet in the store
    Then  pet details should be added successfully

 Scenario: Update the name and status of a newly added pet
    Given I have update pet api
    When  I add a new pet in the store
    And   I update the pet name and status 
    Then  pet details should be updated successfully

 Scenario: Get a new pet to the store
    Given I have add pet api
    When  I added new pet in the store
    Then  I should be able to get the pet details

 Scenario: Delete the pet from store
    Given I have add pet api
    When  I adding new pet in the store
    Then  I delete the pet

  