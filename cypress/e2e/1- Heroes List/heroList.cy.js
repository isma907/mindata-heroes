describe("Heroes List", () => {
  beforeEach(() => {
    cy.intercept("GET", "*/superheroes.json").as("HeroesHTTP");
  });

  it("Should list heroes", () => {
    cy.visit("/");

    cy.wait("@HeroesHTTP").then(() => {
      cy.get(".main-loader").should("not.exist");
    });
  });
});
