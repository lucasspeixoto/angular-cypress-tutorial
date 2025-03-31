Feature: Create new user

  Scenario: Create user with invalid inputs
    Given The user is on the page
    When The user type ad in the name field
    Then The message Este campo deve ter ao menos 3 caracteres! should be displayed above the name field
    When The user type email in the email field
    Then The message Endereço de E-mail inválido! should be displayed above the email field
    And I should see Criar button disabled
    And Inputs are cleaned up

  Scenario: Create user with valid inputs
    When The user type Lucas in the name field
    And The user type email@gmail.com in the email field
    Then I should see Criar button enabled
