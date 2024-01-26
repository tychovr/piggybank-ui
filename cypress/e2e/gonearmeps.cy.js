describe("Geld overmaken naar een andere rekening met een positief saldo", () => {
  it("Passes if money does not transfer with negative balance", () => {
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

    cy.visit("http://localhost:3000");
    cy.get(".accounts__account-balance")
      .invoke("text")
      .then((balanceText) => {
        expect(parseFloat(balanceText)).to.be.at.least(0);
      });
  });
});
