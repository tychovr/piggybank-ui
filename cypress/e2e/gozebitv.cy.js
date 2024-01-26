describe("Geld overmaken zonder een bedrag in te vullen", () => {
  it("Passes if bedrag gives an error", () => {
    // check if correctly loggin in.
    cy.visit("http://localhost:3000/login");
    cy.contains("Cem").click();
    cy.get(".accounts__account-name").should("have.text", "Rekening van Cem");

    cy.visit("http://localhost:3000/transfer");
    cy.get("select[name=toaccount]").select("4");
    cy.get("textarea").type("Dit is een overboek bericht");
    cy.get("button:contains(Overboeken)").click();
    cy.get("#amount:invalid").should("exist");
  });
});
