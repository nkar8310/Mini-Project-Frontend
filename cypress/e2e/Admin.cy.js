// cypress/integration/home_spec.js

describe('Home Page', () => {
  it('logs in with valid credentials for non-admin user', () => {
    cy.visit('http://localhost:8082/mini-project/login');

    // Enter valid credentials for a user other than 'nomashikarunadasa@gmail.com'
    cy.get('input[type="text"]').type('nomashikarunadasa@gmail.com');
    cy.get('input[type="password"]').type('P@ssw0rd'); // Replace with an actual valid password

    // Click the login button
    cy.get('button').click();
    cy.get('.nav-link1').click();
    cy.get('.nav-link2').click();
    cy.get('.nav-link3').click();
    cy.visit('http://localhost:8082/mini-project/admin-product');

    // Verify that the product cards are displayed
    cy.get('.card').should('have.length.greaterThan', 0);

    // Create a new product
    cy.get('input[name="name"]').type('watermelon');
    cy.get('textarea[name="description"]').type('This is a new product.');
    cy.get('input[name="price"]').type('19.99');
    cy.contains('Create Product').click();

    // Verify that the new product is added
    cy.contains('watermelon').should('exist');

    // Edit an existing product
    cy.contains('Edit').first().click();
    cy.get('input[name="price"]').clear().type('29.99');
    cy.contains('Update Product').click();

    // Verify that the product is updated
    // cy.contains('29.99').should('exist');

    // Delete an existing product
    // cy.contains('Delete').first().click();
    cy.visit('http://localhost:8082/mini-project/admin-order');

  });

  
});
