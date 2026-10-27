const { email, password } = require("../../user.js");

describe("Login test suit", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should succesfully login", () => {
    cy.login(email, password);
    cy.contains(`Добро пожаловать ${email}`).should("be.visible");
  });

  it("Should not login with empty login", () => {
    cy.login(null, password);
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Заполните это поле");
  });

  it("Should not login with empty password", () => {
    cy.login(email, null);
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false"); 
    cy.get("#pass")
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Заполните это поле");
  });
});

describe("Adding books feature test suit", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login(email, password);
  });

  it("Should add new book", () => {
    let bookInfo = {
      title: "Танец с драконами",
      authors: "Джордж Р.Р. Мартин",
    };
    cy.addNewBook(bookInfo.title, bookInfo.authors);
    cy.contains(bookInfo.title).should("be.visible");
  });

  it("Should add book in favorites", () => {
    let bookInfo = {
      title: "Владычица Озера",
      authors: "Анджей Сапковский",
    };
    cy.addNewBookToFavorites(bookInfo.title, bookInfo.authors);
    cy.contains(bookInfo.title).should("be.visible");
    cy.visit("/favorites");
    cy.contains(bookInfo.title).should("be.visible");
  });

  it("Should delete book from favorites", () => {
    let bookInfo = {
      title: "Мастер и Маргарита",
      authors: "Михаил Булгаков",
    };
    cy.addNewBookToFavorites(bookInfo.title, bookInfo.authors);
    cy.visit("/favorites");
    cy.contains('.card-title', bookInfo.title)
      .closest('.card')
      .find('button')
      .contains('Delete from favorite')
      .click();
    cy.contains('.card-title', bookInfo.title).should('not.exist');
  });
});