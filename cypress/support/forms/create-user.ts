class CreateUserForm {
  public elements = {
    nameInput: () => cy.get('#nameField'),
    emailInput: () => cy.get('#emailField'),

    nameErrorMessageSpan: () => cy.get('#minLength'),
    emailErrorMessageSpan: () => cy.get('#email'),

    createButton: () => cy.get('#createButton'),
  };

  public typeEmail(email: string): void {
    if (!email) return;

    this.elements.emailInput().type(email);
  }

  public typeName(name: string): void {
    if (!name) return;

    this.elements.nameInput().type(name);
  }

  public clearEmail(): void {
    this.elements.emailInput().clear();
  }

  public clearName(): void {
    this.elements.nameInput().clear();
  }
}

export default CreateUserForm;
