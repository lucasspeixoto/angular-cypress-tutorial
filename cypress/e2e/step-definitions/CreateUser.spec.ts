import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import CreateUserForm from '../../support/forms/create-user';

const createUserForm = new CreateUserForm();

const invalidInput = { name: 'ad', email: 'email' };

const validInput = { name: 'Lucas', email: 'email@gmail.com' };

Given('The user is on the page', () => {
  cy.visit('/');
});

When(`The user type ad in the name field`, () => {
  createUserForm.typeName(invalidInput.name);
});

Then(
  'The message Este campo deve ter ao menos 3 caracteres! should be displayed above the name field',
  () => {
    createUserForm.elements.nameErrorMessageSpan().should('be.visible');

    createUserForm.elements
      .nameErrorMessageSpan()
      .should('contains.text', 'Este campo deve ter ao menos 3 caracteres!');
  }
);

When(`The user type email in the email field`, () => {
  createUserForm.typeEmail(invalidInput.email);
});

Then(
  `The message Endereço de E-mail inválido! should be displayed above the email field`,
  () => {
    createUserForm.elements.emailErrorMessageSpan().should('be.visible');
    createUserForm.elements
      .emailErrorMessageSpan()
      .should('contains.text', 'Endereço de E-mail inválido!');
  }
);

And('I should see Criar button disabled', () => {
  createUserForm.elements.createButton().should('be.disabled');
});

And('Inputs are cleaned up', () => {
  createUserForm.clearName();
  createUserForm.clearEmail();

  cy.clearAllLocalStorage();
});

When(`The user type Lucas in the name field`, () => {
  createUserForm.typeName(validInput.name);
});

And(`The user type email@gmail.com in the email field`, () => {
  createUserForm.typeEmail(validInput.email);
});

Then('I should see Criar button enabled', () => {
  createUserForm.elements.createButton().should('be.enabled');
});
