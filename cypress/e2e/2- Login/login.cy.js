describe("Login", () => {
  beforeEach(() => {
    cy.intercept("GET", "*/superheroes.json").as("HeroesHTTP");
    cy.visit("/login");
  });

  it("Should Login User, AUTH Actions visible", () => {
    cy.wait("@HeroesHTTP").then(() => {
      login();
    });
  });
});

function login() {
  cy.wait(2000);
  cy.get('[formcontrolname="username"]').click();
  cy.get('[formcontrolname="username"]').type("mindata");

  cy.get('[formcontrolname="password"]').click();
  cy.get('[formcontrolname="password"]').type("mindata");

  cy.get(".loginBtn").click();

  cy.get(".hero-actions").should("exist");
}
