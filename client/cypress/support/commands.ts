/// <reference types="cypress" />

import { formatForId } from './utils';

export const clientUrl = 'http://localhost:3000';
export const serverUrl = 'http://localhost:7001';

/*

const commandDelay = 500;
const delayedCommands = ['visit', 'click', 'trigger', 'type', 'clear', 'reload', 'contains'];

for (let c = 0; c < delayedCommands.length; c += 1) {
  Cypress.Commands.overwrite(delayedCommands[c], (originalFn, ...args) => {
    const origVal = originalFn(...args);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(origVal);
      }, commandDelay);
    });
  });
}

*/

Cypress.Commands.add('enterValidRegistrationForm', () => {
  cy.get('#email-field')
    .type('adbc1234@gmail.com', { force: true });
  cy.get('#password-field')
    .type('defg5678', { force: true });
});

Cypress.Commands.add('postCreateUser', () => {
  const user = {
    email: 'tester@restaurant.com',
    password: 'testerpassword',
    guestId: localStorage.getItem('guestId'),
  };
  cy.request('POST', `${serverUrl}/api/user/registration`, user)
    .then(({ body }) => {
      localStorage.setItem('registeredToken', JSON.stringify(body));
    });
});

Cypress.Commands.add('postLogin', (email, password) => {
  const user = {
    email,
    password,
  };
  cy.request('POST', `${serverUrl}/api/user/login`, user)
    .then(({ body }) => {
      localStorage.setItem('registeredToken', body.token);
    });
});

Cypress.Commands.add('enterPartialAddressForm', () => {
  cy.get('#first-name-field')
    .type('Daniel', { force: true });
  cy.get('#last-name-field')
    .type('McDaniel', { force: true });
  cy.get('#address-line-one-field')
    .type('8585 Wisconsin Avenue NW', { force: true });
  cy.get('#address-line-two-field')
    .type('#205', { force: true });
  cy.get('#city-field')
    .type('Washington', { force: true });
  cy.get('#state-field')
    .type('DC', { force: true });
});

Cypress.Commands.add('enterCompleteCheckoutForm', () => {
  cy.enterPartialAddressForm();
  cy.get('#zip-field')
    .type('20008', { force: true });
  cy.get('#card-name-field')
    .type('Daniel McDaniel');
  cy.get('#card-number-field')
    .type('7777 7777 7777 7777');
  cy.get('#card-expiration-field')
    .type('05/25');
  cy.get('#card-cvc-field')
    .type('777');
});

Cypress.Commands.add('enterCompleteAddressForm', () => {
  cy.get('#first-name-field')
    .type('Daniel', { force: true });
  cy.get('#last-name-field')
    .type('McDaniel', { force: true });
  cy.get('#address-line-one-field')
    .type('8585 Wisconsin Avenue NW', { force: true });
  cy.get('#address-line-two-field')
    .type('#205', { force: true });
  cy.get('#city-field')
    .type('Washington', { force: true });
  cy.get('#state-field')
    .type('DC', { force: true });
  cy.get('#zip-field')
    .type('20008', { force: true });
});

Cypress.Commands.add('whereIsAddNewCategory', () => {
  cy.get('#categories-ul')
    .children()
    .eq(-1)
    .find('.form-control')
    .should('contain.value', 'Add new category');
});

Cypress.Commands.add('whereIsUncategorized', () => {
  cy.get('#categories-ul')
    .children()
    .eq(-2)
    .find('.form-control')
    .should('contain.value', 'Uncategorized');
});

Cypress.Commands.add('deleteCategory', () => {
  cy.get('#categories-ul')
    .children()
    .eq(2)
    .find('.dropdown-toggle')
    .click({ force: true });
  cy.get('#delete-button')
    .click({ force: true });
  cy.get('#submit-button')
    .click({ force: true });
});

Cypress.Commands.add('expand', (string: string) => {
  cy.get(`${formatForId(string)}`)
    .find('.dropdown-toggle')
    .click({ force: true });
  cy.get('#expand-button')
    .click({ force: true });
});

Cypress.Commands.add('deleteFoodItem', (name: string) => {
  cy.get(`#delete-${formatForId(name)}`)
    .click({ force: true });
  cy.get('#submit-button')
    .click({ force: true });
});

Cypress.Commands.add('dragDown', (name: string, times: number) => {
  for (let t = times; t > 0; t -= 1) {
    cy.get(`[data-rbd-drag-handle-draggable-id="${formatForId(name)}-dragger"]`)
      .focus()
      .trigger('keydown', { keyCode: 32, force: true })
      .trigger('keydown', { keyCode: 40, force: true })
      .trigger('keydown', { keyCode: 32, force: true })
      .wait(400);
  }
});

export {};
