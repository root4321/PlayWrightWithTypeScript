@login
Feature: Login functionality on Rahul Shetty Academy Client Portal

  As a user of the Rahul Shetty Academy Client Portal
  I want to verify login functionality
  So that valid users can access their account and invalid attempts are blocked

  @positive @smoke
  Scenario: Successful login with valid credentials from json
    Given user navigates to the application login page using "positiveUser" test data
    When user logs in with credentials for "positiveUser" from json
    Then user should be successfully redirected to the dashboard
    And user should see the sign out button and home navigation

  @negative @regression @sanity
  Scenario: Unsuccessful login with invalid credentials from json
    Given user navigates to the application login page using "negativeUser" test data
    When user logs in with credentials for "negativeUser" from json
    Then user should see the error message "Incorrect email or password."
