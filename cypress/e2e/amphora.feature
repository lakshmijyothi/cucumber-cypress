Feature: Google search Amphora

Background: search for Amphora
 Given user on the Google homepage
  When user search for Amphora
  Then user should see the link Amphora CTRM
  When user click the link Amphora CTRM
  Then user should land on the Amphora homepage

Scenario: Search for Amphora and verify the products
  When user click on product
  When user click on Freight manage
  Then user should navigate to Freight manage
  When user click on product
  When user click on Claims manager
  Then user should navigate to Claims manager

Scenario: signup newsletter in Amphora
  When user click on Resources
  When user click on newsletter signup
  When user signup newsletter
  Then verify the newsletter

