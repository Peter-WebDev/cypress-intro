describe('memory game - happy path scenarios', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.task('reseed');
  });

  it('should display the game title', () => {
    cy.contains('Memory Game').should('be.visible');
  });

  it('should display the game board with 16 cards', () => {
    cy.get('[data-cy="game-board"]').should('be.visible');
    cy.get('[data-cy^="card-"]').should('have.length', 16);
  });

  it('should show all cards face down initially', () => {
    cy.get('[data-cy^="card-"]').each(($card) => {
      cy.wrap($card).should('have.attr', 'data-flipped', 'false');
      cy.wrap($card).should('have.attr', 'data-matched', 'false');
    });
  });

  it('should flip a card when clicked', () => {
    cy.get('[data-cy="card-0"]').click();
    cy.get('[data-cy="card-0"]').should('have.attr', 'data-flipped', 'true');
  });

  it('should flip two cards when clicked in sequence', () => {
    cy.get('[data-cy="card-0"]').click();
    cy.get('[data-cy="card-0"]').should('have.attr', 'data-flipped', 'true');
    cy.get('[data-cy="card-1"]').click();
    cy.get('[data-cy="card-1"]').should('have.attr', 'data-flipped', 'true');
  });

  it('should increment attempts counter when two cards are flipped', () => {
    cy.contains('Attempts: 0').should('be.visible');

    // Klicka på två kort
    cy.get('[data-cy="card-0"]').click();
    cy.get('[data-cy="card-1"]').click();

    cy.contains('Attempts: 1').should('be.visible');
  });
});
