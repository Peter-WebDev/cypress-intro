declare namespace Cypress {
  interface Chainable {
    /**
     * Stubs Math.random() to return a predictable sequence of numbers.
     * @param predictableSequence An array of numbers to use as the sequence.
     */
    shuffle(predictableSequence: number[]): Chainable<void>;
  }
}
