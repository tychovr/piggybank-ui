describe("Geld overmaken naar een andere rekening in een vreemde valuta", () => {
  it("Passes if money transfers to another bank with a foreign currency", () => {
    // check if correctly loggin in.
    cy.visit("http://localhost:3000/login");
    cy.contains("Cem").click();
    cy.get(".accounts__account-name").should("have.text", "Rekening van Cem");

    cy.visit("http://localhost:3000/transfer");
    cy.get("select[name=toaccount]").select("4");
    cy.get("select[name=currency]").select("$");
    cy.get("#amount").type(100);
    cy.get("textarea").type("Dit is een overboek bericht");
    cy.get("button:contains(Overboeken)").click();
    cy.get("h1").should("have.text", "Gelukt!");
    cy.get("button:contains(Uitloggen)").click();

    cy.visit("http://localhost:3000/login");
    cy.contains("Sophie").click();
    cy.get(".accounts__account-name").should("have.text", "Rekening van Sophie");
    cy.visit("http://localhost:3000/transactions");
    cy.get(".transaction__amount.amount-debit")
      .first()
      .invoke("text")
      .then((balanceText) => {
        expect(parseFloat(balanceText.replace(/[^\d.-]/g, ''))).not.to.be.equal(100);
      });
  });
});
