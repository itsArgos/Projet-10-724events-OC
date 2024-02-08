import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      // Ajout d'un timer pour attendre que le texte s'affiche
      await screen.findByText("Message envoyé !", {}, { timeout: 1500 });
    });
  });
});

// ***** TEST UNITAIRE *****
describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home/>);
    expect(screen.getByText("Samira"));
    expect(screen.getByText("Jean-baptiste"));
    expect(screen.getByText("Alice"));
    expect(screen.getByText("Luís"));
    expect(screen.getByText("Christine"));
    expect(screen.getByText("Isabelle"));
  })
  it("a footer is displayed", () => {
    render(<Home/>);
    expect(screen.getByText("Notre derniére prestation"));
    expect(screen.getByText("Contactez-nous"));
    expect(screen.getByText("45 avenue de la République, 75000 Paris"));
    expect(screen.getByText("Une agence événementielle propose des prestations de service spécialisées dans la conception et l'organisation de divers événements tels que des événements festifs, des manifestations sportives et culturelles, des événements professionnels"));
  })
  it("an event card, with the last event, is displayed", () => {
    // to implement
  })
});