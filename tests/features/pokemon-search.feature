Feature: Pokemon search

  Scenario: Buscar um Pokemon valido
    Given o usuario esta na pagina da Pokedex
    When ele digita "pikachu" no campo de busca
    And clica no botao buscar
    Then o nome do Pokemon deve aparecer
    And a imagem do Pokemon deve estar visivel
    And pelo menos um tipo deve aparecer

  Scenario: Buscar um Pokemon invalido
    Given o usuario esta na pagina da Pokedex
    When ele digita "pokemon-inexistente-xyz" no campo de busca
    And clica no botao buscar
    Then uma mensagem de erro amigavel deve aparecer

  Scenario: Mock da API da Pokedex
    Given a API foi interceptada com page.route
    And a API retorna um Pokemon mockado
    When o usuario faz uma busca
    Then os dados mockados devem aparecer na interface
