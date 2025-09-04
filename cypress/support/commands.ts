/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('shuffle', (predictableSequence: number[]) => {
  Cypress.on('window:before:load', (win) => {
    let callIndex = 0;

    cy.stub(win.Math, 'random').callsFake(() => {
      const value = predictableSequence[callIndex % predictableSequence.length];
      callIndex++;
      return value;
    });
  });
});

Cypress.Commands.add('solveGame', () => {
  // Definiera de matchande paren i kommandot
  const pairs = {
    'card-0': 'card-2',
    'card-1': 'card-11',
    'card-3': 'card-10',
    'card-4': 'card-15',
    'card-5': 'card-6',
    'card-7': 'card-8',
    'card-9': 'card-12',
    'card-13': 'card-14',
  };

  // Iterera över objekten och klicka på varje par
  for (const [firstCard, secondCard] of Object.entries(pairs)) {
    cy.get(`[data-cy="${firstCard}"]`).click();
    cy.get(`[data-cy="${secondCard}"]`).click();
  }
});
