/* eslint-disable no-undef */

import { clientUrl, serverUrl } from '../../support/commands';

/// <reference types="cypress" />

describe('restaurant app', () => {
  beforeEach(() => {
    cy.request('POST', `${serverUrl}/api/testing/reset`);
  });
  describe('as an unregistered guest', () => {
    beforeEach(() => {
      cy.visit(clientUrl);
      cy.get('#main-routes-content'); // ensures cypress doesn't load guestId as null
    });
    describe('user interacts with the navbar', () => {
      it('takes them to the front page upon clicking "home"', () => {
        cy.contains('Home').click();
        cy.get('#header');
      });
      it('takes them to the menu upon clicking "menu"', () => {
        cy.contains('Menu').click();
        cy.url()
          .should('include', '/menu');
        cy.get('#menu');
      });
      it('takes them to the cart upon clicking "cart"', () => {
        cy.contains('Cart').click();
        cy.url()
          .should('include', '/cart');
        cy.get('#cart');
      });
      it('takes them to the login page upon clicking "login"', () => {
        cy.contains('Login').click();
        cy.url()
          .should('include', '/login');
        cy.contains('Register an account');
      });
      it('takes them to the registration page upon clicking "register"', () => {
        cy.contains('Register').click();
        cy.url()
          .should('include', '/registration');
        cy.contains('I\'m already registered');
      });
    });
    describe('on /registration', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/registration`);
      });
      it('navigates back and forth between /login and /registration upon clicking the lower link', () => {
        cy.get('#switch-link').click();
        cy.url()
          .should('include', '/login');
        cy.get('#switch-link').click();
        cy.url()
          .should('include', '/registration');
      });
      it('will not process registration if fields are incomplete', () => {
        cy.get('#email-field')
          .type('adbc1234@gmail.com', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('Please complete required fields');
      });
      it('will not process registration if email format is invalid', () => {
        cy.get('#email-field')
          .type('adbc12ail.com', { force: true });
        cy.get('#password-field')
          .type('defg5678', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('Invalid email format');
      });
      it('will not process registration if password is too short', () => {
        cy.get('#email-field')
          .type('tester@restaurant.com', { force: true });
        cy.get('#password-field')
          .type('pass', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('Please choose a password between 6 and 256 characters');
      });
      it('processes valid registration form', () => {
        cy.enterValidRegistrationForm();
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('Registration successful');
      });
      it('expands the form to include a default delivery address upon clicking the checkbox button', () => {
        cy.get('#save-default-address-button')
          .click({ force: true });
        cy.get('.form-control').should('have.length', 11);
      });
      describe('form is expanded to include default delivery address', () => {
        beforeEach(() => {
          cy.get('#save-default-address-button')
            .click({ force: true });
          cy.enterValidRegistrationForm();
        });
        it('invalidates the registration form if it has an incomplete address', () => {
          cy.get('#first-name-field')
            .type('Daniel', { force: true });
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
          cy.get('#submit-button')
            .click({ force: true });
          cy.contains('Please complete required fields');
        });
        it('accurately communicates which fields are missing', () => {
          cy.get('#first-name-field')
            .type('Daniel', { force: true });
          cy.get('#last-name-field')
            .type('McDaniel', { force: true });
          cy.get('#address-line-two-field')
            .type('#205', { force: true });
          cy.get('#city-field')
            .type('Washington', { force: true });
          cy.get('#zip-field')
            .type('20008', { force: true });
          cy.get('#submit-button')
            .click({ force: true });
          cy.get('#address-line-one-field')
            .should('have.class', 'warn');
          cy.get('#state-field')
            .should('have.class', 'warn');
        });
        it('processes a valid registration form', () => {
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
          cy.get('#submit-button')
            .click({ force: true });
          cy.contains('Registration successful');
        });
      });
      it('will not process registration if the email is already taken', () => {
        cy.get('#email-field')
          .type('userwithsavedaddresses@restaurant.com', { force: true });
        cy.get('#password-field')
          .type('userpassword', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('Account with that email already exists');
      });
      describe('there are food items in the cart', () => {
        beforeEach(() => {
          cy.createGuestItems();
          cy.visit(`${clientUrl}/registration`);
        });
        it('accredits the added items to the newly registered user', () => {
          cy.enterValidRegistrationForm();
          cy.get('#submit-button')
            .click({ force: true });
          cy.visit(`${clientUrl}/cart`);
          cy.contains('Raspberry Stuffed French Toast');
        });
      });
    });
    describe('on /login', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/login`);
      });
      it('communicates if a user with the indicated email was not found', () => {
        cy.get('#email-field')
          .type('userxz@restaurant.com', { force: true });
        cy.get('#password-field')
          .type('userpassword', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.get('.notification')
          .should('contain.text', 'email')
          .should('have.class', 'red');
      });
      it('communicates if a user entered an incorrect password', () => {
        cy.get('#email-field')
          .type('userwithadmin@restaurant.com', { force: true });
        cy.get('#password-field')
          .type('userPasxword', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.get('.notification')
          .should('contain.text', 'password')
          .should('have.class', 'red');
      });
      it('processes valid login form with correct credentials', () => {
        cy.get('#email-field')
          .type('userwithadmin@restaurant.com', { force: true });
        cy.get('#password-field')
          .type('userpassword', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('You logged in successfully');
      });
    });
    describe('on /menu', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/menu`);
      });
      it('has category anchor links on the left', () => {
        cy.get('.left-col')
          .should('contain.html', 'a');
      });
      it('displays food items', () => {
        cy.get('.food-item')
          .eq(1)
          .should('contain.html', 'img');
      });
      it('displays appropriate modals upon clicking food items', () => {
        cy.get('.food-item')
          .eq(1)
          .click();
        cy.get('.modal')
          .should('contain.text', 'Parsley Tabbuleh');
        cy.get('#back-button')
          .click();
        cy.get('.food-item')
          .eq(0)
          .click();
        cy.get('.modal')
          .should('contain.text', 'Grape Leaves');
      });
      describe('an add food item modal is open', () => {
        beforeEach(() => {
          cy.get('.food-item')
            .eq(1)
            .click();
        });
        it('can add an item to the cart, which persists through reloading the page', () => {
          cy.get('#submit-button')
            .click();
          cy.contains('Cart').click();
          cy.contains('Parsley Tabbuleh');
          cy.visit(`${clientUrl}/cart`);
          cy.contains('Parsley Tabbuleh');
        });
        it('can add an item to the cart with added instructions', () => {
          cy.get('#instructions-field')
            .type('here are the instructions');
          cy.get('#submit-button')
            .click();
          cy.contains('Cart').click();
          cy.contains('here are the instructions');
        });
        it('changes the quantity of the item added via the quantity buttons', () => {
          cy.get('#increment-item-button')
            .click();
          cy.get('#item-quantity-counter')
            .should('contain.value', 2);
          cy.get('#increment-item-button')
            .click();
          cy.get('#item-quantity-counter')
            .should('contain.value', 3);
          cy.get('#decrement-item-button')
            .click();
          cy.get('#item-quantity-counter')
            .should('contain.value', 2);
          cy.get('#submit-button')
            .click();
          cy.contains('Cart').click();
          cy.get('#item-quantity-counter')
            .should('contain.value', 2);
        });
        it('correctly handles adding two different food items', () => {
          cy.get('#submit-button')
            .click();
          cy.get('.food-item')
            .eq(2)
            .click();
          cy.get('#submit-button')
            .click();
          cy.contains('Cart').click();
          cy.contains('Parsley Tabbuleh');
          cy.contains('Hummus');
        });
      });
    });
    describe('on /cart with items already added', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/cart`);
        cy.createGuestItems();
        cy.visit(`${clientUrl}/cart`);
      });
      it('handles item deletion correctly', () => {
        cy.get('#delete-item-button')
          .click();
        cy.get('#submit-button')
          .click();
        cy.get('body')
          .should('not.contain.text', 'Raspberry Stuffed French Toast');
        cy.visit(`${clientUrl}/cart`);
        cy.get('body')
          .should('not.contain.text', 'Raspberry Stuffed French Toast');
      });
      it('handles item quantities correctly', () => {
        cy.get('#increment-item-button')
          .click();
        cy.get('#item-quantity-counter')
          .should('contain.value', 2);
        cy.get('#increment-item-button')
          .click();
        cy.get('#item-quantity-counter')
          .should('contain.value', 3);
        cy.get('#decrement-item-button')
          .click();
        cy.get('#item-quantity-counter')
          .should('contain.value', 2);
        cy.visit(`${clientUrl}/cart`);
        cy.get('#item-quantity-counter')
          .should('contain.value', 2);
      });
      describe('with checkout modal open and the form partially completed', () => {
        beforeEach(() => {
          cy.get('#checkout-button')
            .click();
          cy.get('#email-field')
            .type('tester@restaurant.com');
          cy.enterPartialAddressForm();
          cy.get('#card-name-field')
            .type('tester@restaurant.com');
          cy.get('#card-number-field')
            .type('tester@restaurant.com');
          cy.get('#card-expiration-field')
            .type('tester@restaurant.com');
          cy.get('#card-cvc-field')
            .type('tester@restaurant.com');
        });
        it('blocks form submission until all fields are complete', () => {
          cy.get('#submit-button')
            .should('have.class', 'blocked');
        });
        it('processes a complete form', () => {
          cy.get('#zip-field')
            .type('20008', { force: true });
          cy.get('#submit-button')
            .click();
          cy.contains('Order received');
        });
      });
    });
    describe('an order has been placed', () => {
      let idFromServer = '';
      beforeEach(() => {
        cy.visit(clientUrl);
        cy.get('#header');
        cy.postCreateGuestOrder()
          .then((id) => {
            idFromServer = id;
          });
      });
      describe('on /guest/orders', () => {
        beforeEach(() => {
          cy.visit(`${clientUrl}/guest/orders`);
        });
        it('contains the same id as that received from the server', () => {
          cy.get('#displayed-id')
            .should('contain.text', idFromServer);
        });
        it('has a single timestamped action logged at the outset', () => {
          cy.get('.timestamped-action')
            .should('have.length', 1);
        });
      });
      it('accredits the order to the user upon registration', () => {
        cy.visit(`${clientUrl}/registration`);
        cy.enterValidRegistrationForm();
        cy.get('#submit-button')
          .click({ force: true });
        cy.visit(`${clientUrl}/account/orders`);
        cy.contains('Vegetarian Burger');
      });
    });
  });
  describe('as a registered user', () => {
    beforeEach(() => {
      cy.postLogin('userwithadmin@restaurant.com', 'userpassword');
      cy.visit(`${clientUrl}/`);
    });
    it('can log the user out of their account', () => {
      cy.contains('Account')
        .click({ force: true });
      cy.contains('Logout')
        .click({ force: true });
      cy.contains('You were logged out');
    });
    describe('on /menu', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/menu`);
      });
      describe('an add food item modal is open', () => {
        beforeEach(() => {
          cy.get('.food-item')
            .eq(1)
            .click();
        });
        it('can add an item to the cart, which persists through reloading the page', () => {
          cy.get('#submit-button')
            .click();
          cy.contains('Cart').click();
          cy.contains('Parsley Tabbuleh');
          cy.visit(`${clientUrl}/cart`);
          cy.contains('Parsley Tabbuleh');
        });
        it('can add an item to the cart with added instructions', () => {
          cy.get('#instructions-field')
            .type('here are the instructions');
          cy.get('#submit-button')
            .click();
          cy.contains('Cart').click();
          cy.contains('here are the instructions');
        });
        it('changes the quantity of the item added via the quantity buttons', () => {
          cy.get('#increment-item-button')
            .click();
          cy.get('#item-quantity-counter')
            .should('contain.value', 2);
          cy.get('#increment-item-button')
            .click();
          cy.get('#item-quantity-counter')
            .should('contain.value', 3);
          cy.get('#decrement-item-button')
            .click();
          cy.get('#item-quantity-counter')
            .should('contain.value', 2);
          cy.get('#submit-button')
            .click();
          cy.contains('Cart').click();
          cy.get('#item-quantity-counter')
            .should('contain.value', 2);
        });
        it('correctly handles adding two different food items', () => {
          cy.get('#submit-button')
            .click();
          cy.get('.food-item')
            .eq(2)
            .click();
          cy.get('#submit-button')
            .click();
          cy.contains('Cart').click();
          cy.contains('Parsley Tabbuleh');
          cy.contains('Hummus');
        });
      });
    });
  });
  describe('as a registered user with multiple addresses saved', () => {
    beforeEach(() => {
      cy.postLogin('userwithsavedaddresses@restaurant.com', 'userpassword');
    });
    describe('on /account/details', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/account/details`);
      });
      it('handles changing the user\'s avatar', () => {
        cy.get('input[type=file]')
          .selectFile('cypress/fixtures/avatar.jpg', { force: true });
        cy.get('#edit-avatar-save-button')
          .click({ force: true });
        cy.get('#notifications-container')
          .should('contain.text', 'Profile picture saved successfully');
      });
      it('handles changing the user\'s email', () => {
        cy.get('#edit-email-checkbox-button')
          .click({ force: true });
        cy.get('#edit-email-field')
          .type('newemail@restaurant.com', { force: true });
        cy.get('#edit-email-save-button')
          .click({ force: true });
        cy.get('#notifications-container')
          .should('contain.text', 'Email updated successfully');
      });
      it('handles changing the user\'s password', () => {
        cy.get('#edit-password-checkbox-button')
          .click({ force: true });
        cy.get('#edit-password-field')
          .type('newpassword', { force: true });
        cy.get('#edit-password-confirm-field')
          .type('newpassword', { force: true });
        cy.get('#edit-password-save-button')
          .click({ force: true });
        cy.get('#notifications-container')
          .should('contain.text', 'Password updated successfully');
      });
      it('initializes with the same address pre-selected as that marked as default the db', () => {
        cy.get('#default-address-line-one')
          .should('contain.value', '8585 Wisconsin Avenue NW');
      });
      it('handles selecting a different address and setting it as default', () => {
        cy.get('#select-default-dropdown')
          .click({ force: true });
        cy.get('.dropdown-item')
          .eq(0)
          .find('button')
          .click({ force: true });
        cy.get('#submit-default-button')
          .click();
        cy.get('#default-address-line-one')
          .should('contain.value', '5353 Connecticut Avenue NW');
        cy.visit(`${clientUrl}/account/details`);
        cy.get('#default-address-line-one')
          .should('contain.value', '5353 Connecticut Avenue NW');
      });
      it('handles deleting an address', () => {
        cy.get('#select-default-dropdown')
          .click({ force: true });
        cy.get('.dropdown-item')
          .eq(2)
          .find('button')
          .click({ force: true });
        cy.get('#delete-button')
          .click();
        cy.get('#submit-button')
          .click({ force: true });
        cy.get('#select-default-dropdown')
          .click({ force: true });
        cy.get('.dropdown-item')
          .should('have.length', 2);
      });
      it('handles adding a new address', () => {
        cy.enterCompleteAddressForm();
        cy.get('#save-address-button')
          .click({ force: true });
        cy.get('#select-default-dropdown')
          .click({ force: true });
        cy.get('.dropdown-item')
          .should('have.length', 4);
      });
      it('handles adding a new address and saving it as the default address via the "Save as default" button', () => {
        cy.enterCompleteAddressForm();
        cy.get('#address-line-one-field')
          .clear({ force: true })
          .type('2222 Connecticut Avenue NW');
        cy.get('#save-address-as-default-button')
          .click({ force: true });
      });
    });
  });
  describe('as a registered user with items already added to the cart', () => {
    beforeEach(() => {
      cy.postLogin('userwithcartitems@restaurant.com', 'userpassword');
    });
    describe('on /cart', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/cart`);
      });
      it('handles item deletion correctly', () => {
        cy.get('#delete-item-button')
          .click({ force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.get('body')
          .should('not.contain.text', 'Raspberry Stuffed French Toast');
        cy.visit(`${clientUrl}/cart`);
        cy.get('body')
          .should('not.contain.text', 'Raspberry Stuffed French Toast');
      });
      it('handles item quantities correctly', () => {
        cy.get('#raspberry-stuffed-french-toast')
          .find('#increment-item-button')
          .as('incrementor')
          .click({ force: true });
        cy.get('#raspberry-stuffed-french-toast')
          .find('#item-quantity-counter')
          .as('counter')
          .should('contain.value', 2);
        cy.get('@incrementor')
          .click({ force: true });
        cy.get('@counter')
          .should('contain.value', 3);
        cy.get('#raspberry-stuffed-french-toast')
          .find('#decrement-item-button')
          .click({ force: true });
        cy.get('@counter')
          .should('contain.value', 2);
        cy.visit(`${clientUrl}/cart`);
        cy.get('@counter')
          .should('contain.value', 2);
      });
      describe('with checkout modal open', () => {
        beforeEach(() => {
          cy.get('#checkout-button')
            .click();
        });
        it('processes a complete form', () => {
          cy.enterCompleteCheckoutForm();
          cy.get('#submit-button')
            .click();
          cy.contains('Order received');
        });
      });
    });
  });
  describe('as a registered user with an active order', () => {
    beforeEach(() => {
      cy.postLogin('userwithcartitemsandorder@restaurant.com', 'userpassword');
      cy.visit(clientUrl);
    });
    describe('on /cart with the checkout modal open', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/cart`);
        cy.get('#checkout-button')
          .click();
      });
      it('gives active order status to the most recently placed order', () => {
        cy.enterCompleteCheckoutForm();
        cy.get('#submit-button')
          .click();
        cy.contains('Order received');
        cy.get('#active-order')
          .find('#items-ul')
          .should('not.contain.text', 'Sweet Potato Hash')
          .should('contain.text', 'Raspberry Stuffed French Toast');
      });
    });
  });
  describe('as an admin', () => {
    beforeEach(() => {
      cy.postLogin('userwithadmin@restaurant.com', 'userpassword');
    });
    describe('on /admin/orders', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/admin/orders`);
      });
      it('initializes with orders displayed', () => {
        cy.get('.admin-order')
          .should('have.length', 2);
      });
      it('handles changing an order\'s status sequentially all the way through each stage until "delivered" and marks the order as complete', () => {
        cy.get('.admin-order')
          .eq(0)
          .as('theOrder')
          .get('#status-two-radio-button')
          .click({ force: true });
        cy.get('@theOrder')
          .find('#submit-change-status-button')
          .as('submitButton')
          .click({ force: true });
        cy.get('@theOrder')
          .get('#status-three-radio-button')
          .click({ force: true });
        cy.get('@submitButton')
          .click({ force: true });
        cy.get('@theOrder')
          .get('#status-four-radio-button')
          .click({ force: true });
        cy.get('@submitButton')
          .click({ force: true });
        cy.get('@theOrder')
          .get('span.completion-label')
          .should('contain.text', 'Complete');
      });
      it('handles changing an order\'s status while skipping steps', () => {
        cy.get('.admin-order')
          .eq(0)
          .as('theOrder')
          .get('#status-three-radio-button')
          .click({ force: true });
        cy.get('@theOrder')
          .find('#submit-change-status-button')
          .as('submitButton')
          .click({ force: true });
        cy.get('@theOrder')
          .get('#status-four-radio-button')
          .click({ force: true });
        cy.get('@submitButton')
          .click({ force: true });
        cy.get('@theOrder')
          .get('span.completion-label')
          .should('contain.text', 'Complete');
        cy.get('.admin-order')
          .eq(1)
          .as('theOtherOrder')
          .find('#status-four-radio-button')
          .click({ force: true });
        cy.get('@theOtherOrder')
          .find('#submit-change-status-button')
          .click({ force: true });
        cy.get('@theOtherOrder')
          .get('span.completion-label')
          .should('contain.text', 'Complete');
      });
    });
    describe('on /admin/menu', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/admin/menu`);
      });
      it('initializes the categories list with "Add new category" on the bottom', () => {
        cy.whereIsAddNewCategory();
      });
      it('initializes the categories list with "Uncategorized" second-to-last', () => {
        cy.whereIsUncategorized();
      });
      it('handles creating a new category; "Uncategorized" and "Add new category" remain at the bottom of the list', () => {
        cy.get('#toggle-add-category-button')
          .click({ force: true });
        cy.get('#add-category-field')
          .clear()
          .type('Drinks');
        cy.get('#submit-add-category-button')
          .click({ force: true });
        cy.get('#categories-ul')
          .children()
          .eq(-1)
          .find('.form-control')
          .should('contain.value', 'Drinks');
        cy.whereIsAddNewCategory();
        cy.whereIsUncategorized();
      });
      describe('in the category ellipsis dropdown menu', () => {
        beforeEach(() => {
          cy.get('#lunch')
            .find('.dropdown-toggle')
            .click({ force: true });
        });
        it('handles category deletion and moves the deleted category\'s items to "Uncategorized"', () => {
          cy.get('.category')
            .its('length')
            .then((catCount) => {
              cy.get('#delete-button')
                .click({ force: true });
              cy.get('#submit-button')
                .click({ force: true })
                .then(() => {
                  const correctCount = catCount - 1;
                  cy.get('#categories-ul')
                    .children()
                    .should('have.length', correctCount);
                  cy.visit(`${clientUrl}/admin/menu`);
                  cy.get('#categories-ul')
                    .children()
                    .should('have.length', correctCount)
                    .eq(2)
                    .find('input')
                    .should('not.contain.value', 'Lunch');
                  cy.expand('#uncategorized');
                  cy.get('#uncategorized-food-items')
                    .should('contain.text', 'Rainbow Vegetable Sandwich')
                    .and('contain.text', 'Vegetarian Burger');
                });
            });
        });
        describe('drag and drop mode is engaged', () => {
          beforeEach(() => {
            cy.get('#sort-button')
              .click({ force: true });
          });
          it('handles moving categories up and down the list and saving the new list as the sorting array for the store', () => {
            cy.dragDown('appetizers', 2);
            cy.dragDown('breakfast', 3);
            cy.get('#submit-sorting-button')
              .click({ force: true });
            cy.get('#categories-ul')
              .children()
              .eq(1)
              .find('input')
              .should('contain.value', 'Appetizers');
          });
          it('ensures exiting drag and drop via the cancel mode returns the categories to their previous order', () => {
            cy.dragDown('appetizers', 2);
            cy.get('#cancel-sorting-button')
              .click({ force: true });
            cy.get('#categories-ul')
              .children()
              .eq(0)
              .find('input')
              .should('contain.value', 'Appetizers');
          });
        });
        it('handles re-titling a category', () => {
          cy.get('#retitle-button')
            .click({ force: true });
          cy.get('#categories-ul')
            .children()
            .eq(2)
            .find('input')
            .clear()
            .type('Pizzas', { force: true });
          cy.get('#submit-button')
            .click({ force: true });
          cy.get('#categories-ul')
            .children()
            .eq(2)
            .find('input')
            .should('contain.value', 'Pizzas');
        });
        describe('user clicks expand, category is expanded', () => {
          beforeEach(() => {
            cy.get('#expand-button')
              .click({ force: true });
          });
          it('handles deleting food items accross different categories category', () => {
            cy.deleteFoodItem('rainbow-vegetable-sandwich');
            cy.visit(`${clientUrl}/admin/menu`);
            cy.get('#lunch-food-items')
              .should('not.contain.text', 'Rainbow Vegetable Sandwich');
            cy.expand('#appetizers');
            cy.deleteFoodItem('hummus');
            cy.get('#appetizers-food-items')
              .should('not.contain.text', 'Hummus');
          });
          it('navigates to the editing page for an individual menu food item', () => {
            cy.get('#edit-vegetarian-burger')
              .click({ force: true });
            cy.get('#edited-food-item');
          });
          describe('accessing the modal to create a new food item', () => {
            beforeEach(() => {
              cy.get('#create-item-for-lunch')
                .find('.button-wrapper')
                .click({ force: true });
            });
            it('initializes with the dropdown pre-selected as the category from which the create item button was pressed', () => {
              cy.get('#select-category-dropdown')
                .should('contain.text', 'Lunch');
            });
            it('can add multiple ingredients at once by seperating them with commas', () => {
              cy.get('#ingredient-field')
                .type('mayonnaise, pesto, avacado', { force: true });
              cy.get('#new-ingredient-button')
                .click({ force: true });
              cy.get('#ingredient-mayonnaise')
                .should('contain.text', 'mayonnaise')
                .and('not.contain.text', ',');
              cy.get('#ingredient-pesto')
                .should('contain.text', 'pesto')
                .and('not.contain.text', ',');
              cy.get('#ingredient-avacado')
                .should('contain.text', 'avacado')
                .and('not.contain.text', ',');
            });
            it('creates the food item upon submission of a complete form', () => {
              cy.get('#select-category-dropdown')
                .click({ force: true });
              cy.get('.dropdown-item')
                .eq(0)
                .find('button')
                .click({ force: true });
              cy.get('input[type=file]')
                .selectFile('cypress/fixtures/sandwich.jpg', { force: true });
              cy.get('#name-field')
                .clear({ force: true })
                .type('Vegetable Sandwich', { force: true });
              cy.get('#price-field')
                .focus()
                .clear({ force: true })
                .type(7, { force: true });
              cy.get('#discount-field')
                .clear({ force: true })
                .type(0.15, { force: true });
              cy.get('#ingredient-field')
                .type('mayonnaise, mushrooms', { force: true });
              cy.get('#new-ingredient-button')
                .click({ force: true });
              cy.get('#min-field')
                .clear({ force: true })
                .type(25, { force: true });
              cy.get('#max-field')
                .clear({ force: true })
                .type(30, { force: true });
              cy.get('#submit-button')
                .click({ force: true });
              cy.contains('Food item created successfully');
              cy.visit(`${clientUrl}/menu/`);
              cy.contains('Vegetable Sandwich');
              cy.get('#vegetable-sandwich-button-overlay')
                .click();
              cy.contains('mayonnaise');
            });
          });
        });
      });
    });
    describe('on /admin/menu/fooditems/:id', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/admin/menu/fooditems/bece6c76-ea23-4472-8bba-94a50a907c74`);
      });
      it('updates the food item upon submission of a complete form', () => {
        cy.get('#select-category-dropdown')
          .click({ force: true });
        cy.get('.dropdown-item')
          .eq(0)
          .find('button')
          .click({ force: true });
        cy.get('input[type=file]')
          .selectFile('cypress/fixtures/sandwich.jpg', { force: true });
        cy.get('#name-field')
          .clear({ force: true })
          .type('Vegetable Sandwich', { force: true });
        cy.get('#price-field')
          .focus()
          .clear({ force: true })
          .type(7, { force: true });
        cy.get('#discount-field')
          .clear({ force: true })
          .type(0.15, { force: true });
        cy.get('#delete-ingredient-mushrooms')
          .click({ force: true });
        cy.get('#ingredient-field')
          .type('mayonnaise', { force: true });
        cy.get('#new-ingredient-button')
          .click({ force: true });
        cy.get('#min-field')
          .clear({ force: true })
          .type(25, { force: true });
        cy.get('#max-field')
          .clear({ force: true })
          .type(30, { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('Food item updated successfully');
        cy.visit(`${clientUrl}/menu/`);
        cy.contains('Vegetable Sandwich');
        cy.get('#vegetable-sandwich-button-overlay')
          .click();
        cy.contains('mayonnaise');
      });
    });
  });
});

/*
http://localhost:3001/admin/menu/fooditems/bece6c76-ea23-4472-8bba-94a50a907c74
  describe('on /menu', () => {
    beforeEach(() => {
      cy.visit(`${clientUrl}/menu`);
    });
  });
*/
