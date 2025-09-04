describe('memory game - happy path scenarios', () => {
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

  it('should display the game board with 16 cards', () => {
    cy.get('[data-cy="game-board"]').should('be.visible');
    cy.get('[data-cy^="card-"]').should('have.length', 16);
  });

  it('should show all cards face down initially', () => {
    cy.get('[data-cy^="card-"]').each(($card) => {
      cy.wrap($card).should('have.attr', 'data-flipped', 'false');
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
    cy.get('[data-cy="card-9"]').click();

    cy.wait(1000);

    cy.get('[data-cy="attempts"]').should('have.text', '1');

    cy.wait(1000);

    cy.get('[data-cy="card-2"]').click();
    cy.get('[data-cy="card-12"]').click();

    cy.wait(1000);

    cy.get('[data-cy="attempts"]').should('have.text', '2');
  });

  it('should keep matched cards flipped', () => {
    cy.get('[data-cy="card-0"]').click();
    cy.get('[data-cy="card-2"]').click();

    cy.get('[data-cy="card-0"]')
      .should('have.attr', 'data-flipped', 'true')
      .should('have.attr', 'data-matched', 'true');

    cy.get('[data-cy="card-2"]')
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

  it('should show the win screen when all pairs are matched', () => {
    cy.solveGame();

    cy.get('[data-cy="win-modal"]').should('be.visible');
    cy.get('[data-cy="score-display"]').should('be.visible');
    cy.get('[data-cy="name-input"]').should('be.visible');
    cy.get('[data-cy="submit-button"]').should('be.visible');
  });

  it.only('should fill in form and display the game result in leaderboard', () => {
    cy.solveGame();
    cy.get('[data-cy="attempts-final"]').invoke('text').as('finalAttempts');
    cy.get('[data-cy="time-final"]').invoke('text').as('finalTime');

    const playerName = 'Jane Doe';
    cy.get('[data-cy="player-name-input"]').type(playerName);
    cy.get('[data-cy="submit-button"]').click();

    cy.wait(3000);

    // Leaderboard
    cy.get('[data-cy="leaderboard-item"]')
      .contains('[data-cy="leaderboard-name"]', playerName)
      .within(() => {
        cy.get('@finalAttempts').then((attempts) => {
          cy.get('[data-cy="leaderboard-attempts"]').should(
            'have.text',
            attempts
          );
        });
        cy.get('@finalTime').then((time) => {
          cy.get('[data-cy="leaderboard-time"]').should('have.text', time);
        });
      });
  });
});
