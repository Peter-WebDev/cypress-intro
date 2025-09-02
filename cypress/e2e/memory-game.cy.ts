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
    cy.get('[data-cy="card-0"]').click();
    cy.get('[data-cy="card-1"]').click();
    cy.contains('Attempts: 1').should('be.visible');
  });

  it('should keep matched cards flipped', () => {
    cy.get('[data-cy^="card-"]').then(($cards) => {
      const cards = Array.from($cards);
      const assetUrls = cards.map((card) =>
        card.getAttribute('data-asset-url')
      );

      // Find first pair with same URL
      const firstUrl = assetUrls[0];
      const matchingIndices = assetUrls
        .map((url, index) => (url === firstUrl ? index : -1))
        .filter((index) => index !== -1)
        .slice(0, 2); // First two matched

      if (matchingIndices.length === 2) {
        cy.get(`[data-cy="card-${matchingIndices[0]}"]`).click();
        cy.get(`[data-cy="card-${matchingIndices[1]}"]`).click();

        cy.wait(1000); // Wait for animation to finish

        cy.get(`[data-cy="card-${matchingIndices[0]}"]`).should(
          'have.attr',
          'data-flipped',
          'true'
        );
        cy.get(`[data-cy="card-${matchingIndices[1]}"]`).should(
          'have.attr',
          'data-flipped',
          'true'
        );
        cy.get(`[data-cy="card-${matchingIndices[0]}"]`).should(
          'have.attr',
          'data-matched',
          'true'
        );
        cy.get(`[data-cy="card-${matchingIndices[1]}"]`).should(
          'have.attr',
          'data-matched',
          'true'
        );
      }
    });
  });
});
