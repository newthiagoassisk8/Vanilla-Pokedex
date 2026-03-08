Feature: Pokemon search

  Scenario: Search for a valid Pokemon
    Given the user is on the Pokedex page
    When they type "pikachu" in the search field
    And they click the search button
    Then the Pokemon name should be displayed
    And the Pokemon image should be visible
    And at least one type should be displayed

  Scenario: Search for an invalid Pokemon
    Given the user is on the Pokedex page
    When they type "pokemon-inexistente-xyz" in the search field
    And they click the search button
    Then a user-friendly error message should be displayed
