// Login Page Test
describe('Login Page', () => {
  it('logs in with valid credentials for non-admin user', () => {
    cy.visit('http://localhost:8082/mini-project/login');

    // Enter valid credentials for a user other than 'nomashikarunadasa@gmail.com'
    cy.get('input[type="text"]').type('nkar8310@sysco.com');
    cy.get('input[type="password"]').type('P@ssw0rd'); // Replace with an actual valid password

    // Click the login button
    cy.get('button').click();

    // Assert that the user is redirected to the normal home page
    cy.url().should('include', '/mini-project/home');

    // Add more assertions if needed
  });

  it('logs in with valid credentials for admin user', () => {
    cy.visit('http://localhost:8082/mini-project/login');

    // Enter valid credentials for the admin user 'nomashikarunadasa@gmail.com'
    cy.get('input[type="text"]').type('nomashikarunadasa@gmail.com');
    cy.get('input[type="password"]').type('P@ssw0rd'); // Replace with an actual valid password

    // Click the login button
    cy.get('button').click();

    // Assert that the user is redirected to the admin home page
    cy.url().should('include', '/mini-project/admin-home');

    // Add more assertions if needed
  });

  it('displays an error message with invalid credentials', () => {
    cy.visit('http://localhost:8082/mini-project/login');

    // Enter invalid credentials
    cy.get('input[type="text"]').type('john@gmail.com');
    cy.get('input[type="password"]').type('P@ssw0rd');

    // Click the login button
    cy.get('button').click();

    // Assert that an error alert is displayed
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Login failed: Incorrect username or password.');
    });

    // Add more assertions if needed
  });
});
