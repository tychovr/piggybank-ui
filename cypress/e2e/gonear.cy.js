describe("Geld overmaken naar een andere rekening", () => {
  it("Passes if money transfers to another bank account", () => {
    // check if correctly loggin in.
    cy.visit("http://localhost:3000/login");
    cy.contains("Cem").click();
    cy.get(".accounts__account-name").should("have.text", "Rekening van Cem");

    cy.visit("http://localhost:3000/transfer");
    cy.get("select[name=toaccount]").select("4");
    cy.get("#amount").type(100);
    cy.get("textarea").type("Dit is een overboek bericht");
    cy.get("button:contains(Overboeken)").click();
    cy.get("h1").should("have.text", "Gelukt!");
  });
});
