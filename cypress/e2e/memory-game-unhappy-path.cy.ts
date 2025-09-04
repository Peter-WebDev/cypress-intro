describe('memory game - unhappy path scenarios', () => {
  // Denna hook körs EN gång, innan alla tester
  before(() => {
    // Definiera din förutsägbara sekvens
    const predictableSequence = [
      // 6 värden för första shuffle
      0.8, 0.2, 0.5, 0.9, 0.1, 0.99,
      // 22 värden för den andra shuffle
      0.3, 0.4, 0.95, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.12, 0.23, 0.34,
      0.46, 0.57, 0.68, 0.71, 0.82, 0.93, 0.14, 0.25, 0.36,
    ];
    // Stuba Math.random() en gång för alla tester i sviten
    cy.shuffle(predictableSequence);
  });

  beforeEach(() => {
    cy.task('reseed');
    cy.visit('/');
  });

  // should not allow flipping more than two cards

  it('should flip non-matching cards back after delay', () => {
    cy.get('[data-cy="card-0"]').click();
    cy.get('[data-cy="card-1"]').click();

    cy.get('[data-cy="card-0"]')
      .should('have.attr', 'data-flipped', 'true')
      .should('have.attr', 'data-matched', 'false');

    cy.get('[data-cy="card-1"]')
      .should('have.attr', 'data-flipped', 'true')
      .should('have.attr', 'data-matched', 'false');

    cy.wait(2000);

    cy.get('[data-cy="card-4"]').click();
    cy.get('[data-cy="card-5"]').click();

    cy.get('[data-cy="card-4"]')
      .should('have.attr', 'data-flipped', 'true')
      .should('have.attr', 'data-matched', 'false');

    cy.get('[data-cy="card-5"]')
      .should('have.attr', 'data-flipped', 'true')
      .should('have.attr', 'data-matched', 'false');
  });

  // should not allow submitting a score with an empty name

  // should show an error message for an invalid name input

  it('should show the win screen when all pairs are matched', () => {
    cy.get('[data-cy="card-0"]').click();
    cy.get('[data-cy="card-2"]').click();
    cy.get('[data-cy="card-1"]').click();
    cy.get('[data-cy="card-11"]').click();
    cy.get('[data-cy="card-3"]').click();
    cy.get('[data-cy="card-10"]').click();
    cy.get('[data-cy="card-4"]').click();
    cy.get('[data-cy="card-15"]').click();
    cy.get('[data-cy="card-5"]').click();
    cy.get('[data-cy="card-6"]').click();
    cy.get('[data-cy="card-7"]').click();
    cy.get('[data-cy="card-8"]').click();
    cy.get('[data-cy="card-9"]').click();
    cy.get('[data-cy="card-12"]').click();
    cy.get('[data-cy="card-13"]').click();
    cy.get('[data-cy="card-14"]').click();

    cy.get('[data-cy="win-modal"]').should('be.visible');
    cy.get('[data-cy="score-display"]').should('be.visible');
    cy.get('[data-cy="name-input"]').should('be.visible');
    cy.get('[data-cy="submit-button"]').should('be.visible');
  });
});
