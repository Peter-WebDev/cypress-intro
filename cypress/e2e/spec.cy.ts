describe('todo', () => {
  beforeEach(() => {
    cy.task('reseed');
  });

  it('should display three todos by default', () => {
    cy.visit('http://localhost:3000');
    cy.get('li').should('have.length', 3);
    cy.get('li').first().should('contain.text', 'Feed the cat');
    cy.get('li').last().contains('Walk all the cats');
  });
});

describe('delete todo', () => {
  it('should be possible to delete a todo', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Feed the cat').parents('li').find('button').click();
    cy.get('li').should('have.length', 2);
    cy.contains('Feed the cat').should('not.exist');
  });
});

describe('add todo', () => {
  it('should be possible to add a todo', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[type="text"]').type('My first post');
    cy.get('button').contains('Add todo').click();
    cy.get('li').should('contain', 'My first post');
  });
});
