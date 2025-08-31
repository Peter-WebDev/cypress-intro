describe('memory game - happy path scenarios', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.task('reseed');
  });

  it('should display the game title', () => {
    cy.contains('Memory Game').should('be.visible');
  });
});
