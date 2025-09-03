describe('memory game - happy path scenarios', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.task('reseed');
    cy.wait(1000);
  });

  afterEach(() => {
    cy.wait(1500);
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
      cy.wait(500);
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
    // Initial number is zero
    cy.contains('Attempts: 0').should('be.visible');

    cy.get('[data-cy="card-0"]').click();
    cy.get('[data-cy="card-5"]').click();

    cy.wait(1000);

    cy.get('[data-cy="attempts"]').should('have.text', '1');

    cy.wait(1000);

    cy.get('[data-cy="card-2"]').click();
    cy.get('[data-cy="card-12"]').click();

    cy.wait(1000);

    cy.get('[data-cy="attempts"]').should('have.text', '2');

    cy.wait(1000);
  });

  it('should keep matched cards flipped', () => {
    cy.get('[data-cy="card-0"]').click();
    cy.get('[data-cy="card-8"]').click();

    cy.get('[data-cy="card-0"]')
      .should('have.attr', 'data-flipped', 'true')
      .should('have.attr', 'data-matched', 'true');

    cy.get('[data-cy="card-8"]')
      .should('have.attr', 'data-flipped', 'true')
      .should('have.attr', 'data-matched', 'true');
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

  // should not be possible to click on already flipped cards

  // should not be possible to click on already matched cards

  it.only('should show the win screen when all pairs are matched', () => {
    cy.get('[data-cy="card-0"]').click();
    cy.wait(250);
    cy.get('[data-cy="card-8"]').click();
    cy.wait(500);
    cy.get('[data-cy="card-1"]').click();
    cy.wait(250);
    cy.get('[data-cy="card-9"]').click();
    cy.wait(500);
    cy.get('[data-cy="card-2"]').click();
    cy.wait(250);
    cy.get('[data-cy="card-10"]').click();
    cy.wait(500);
    cy.get('[data-cy="card-3"]').click();
    cy.wait(250);
    cy.get('[data-cy="card-11"]').click();
    cy.wait(500);
    cy.get('[data-cy="card-4"]').click();
    cy.wait(250);
    cy.get('[data-cy="card-12"]').click();
    cy.wait(500);
    cy.get('[data-cy="card-5"]').click();
    cy.wait(250);
    cy.get('[data-cy="card-13"]').click();
    cy.wait(500);
    cy.get('[data-cy="card-6"]').click();
    cy.wait(250);
    cy.get('[data-cy="card-14"]').click();
    cy.wait(500);
    cy.get('[data-cy="card-7"]').click();
    cy.wait(250);
    cy.get('[data-cy="card-15"]').click();
    cy.wait(500);

    cy.get('[data-cy="win-modal"]').should('be.visible');
    cy.get('[data-cy="score-display"]').should('be.visible');
    cy.get('[data-cy="name-input"]').should('be.visible');
    cy.get('[data-cy="submit-button"]').should('be.visible');
  });

  // should allow the user to submit their score via the win screen form

  // should display the game result in leaderboard
});
