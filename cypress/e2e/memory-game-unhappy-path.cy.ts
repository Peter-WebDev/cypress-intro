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
  it('should not allow flipping more than two cards', () => {
    cy.get('[data-cy="card-0"]')
      .click()
      .should('have.attr', 'data-flipped', 'true');
    cy.get('[data-cy="card-1"]')
      .click()
      .should('have.attr', 'data-flipped', 'true');
    cy.get('[data-cy="card-2"]')
      .click()
      .should('have.attr', 'data-flipped', 'false');
  });

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
  it('should not allow submitting a score with an empty name', () => {
    cy.solveGame();
    cy.get('[data-cy="player-name-input"]').clear();
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="win-modal"]').should('be.visible');
  });
});
