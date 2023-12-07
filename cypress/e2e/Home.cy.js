// cypress/integration/home_spec.js

describe('Home Page', () => {
  it('navigates through the application', () => {
    // Visit the login page and login with valid credentials
    cy.visit('http://localhost:8082/mini-project/login');
    cy.get('input[type="text"]').type('nkar8310@sysco.com');
    cy.get('input[type="password"]').type('P@ssw0rd');
    cy.get('button').click();

    // Navigate to the product details page
    cy.get('.nav-link11').click();
    cy.get('.nav-link22').click();

    cy.get('.test-card').first().click(); // Click on the first product card

    // Check if the product details are loaded
    cy.contains('Loading...').should('not.exist');

    // Intercept the order placement request to return a success response
    cy.intercept('POST', 'http://localhost:3001/api/order', {
      statusCode: 200,
      body: { message: 'Order placed successfully!' },
    }).as('placeOrder');

    // Set a value for the quantity
    cy.get('#quantity').type('2');

    // Set up the mock product details directly in the test
    const mockProductDetails = {
      id: 4,
      name: 'apple fruit',
      description: 'apple is good for helth',
      price: 1200,
    };

    // Intercept the fetch request to return mock data for the product details
    cy.intercept('GET', `http://localhost:3001/api/product/${mockProductDetails.id}`, mockProductDetails).as(
      'getProductDetails'
    );

    // Click the Buy Now button
    cy.get('button').contains('Buy Now').click();

    // Wait for the order placement request to be completed
    cy.wait('@placeOrder').then((interception) => {
      // Verify that the order placement request was made with the expected payload
      const { userId, orderLineItemsDtoList } = interception.request.body;
      expect(userId).to.be.a('string');
      expect(orderLineItemsDtoList).to.be.an('array');
      expect(orderLineItemsDtoList).to.have.lengthOf(1);
      

      // Verify that the success message is displayed
      cy.contains('Order placed successfully!').should('exist');
    });
     cy.contains('Loading...').should('not.exist');

     cy.visit('http://localhost:8082/mini-project/order');

    // Add more assertions if needed for the home page
  });
});
