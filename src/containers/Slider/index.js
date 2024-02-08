import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort(
    (evtA, evtB) =>
      // Inversion de evtA & evtB pour afficher les images du plus ancien au plus récent
      new Date(evtB.date) - new Date(evtA.date)
  );

  const nextCard = () => {
    if (byDateDesc !== undefined) {
      setTimeout(
        // la fonction vérifie si (index) est inférieur à byDateDesc.length - 1. Si c'est le cas, elle augmente l'index de 1, sinon, elle réinitialise l'index à 0.
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
        5000
      );
    }
  };

  useEffect(() => {
    nextCard();
    // Ajout de index comme dépendance pour s'assurer que nextCard() est appelée chaque fois que index change.
  }, [index]);

  const handleRadioChange = (radioIdx) => {
    setIndex(radioIdx);
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Ajout d'un fragment pour regrouper plusieurs éléments adjacents (SlideCard & les boutons radio) sans ajouter de noeud DOM supplémentaire.
        // (Tout doit être regrouper dans un seul élément parent)
        <React.Fragment key={`slider-${idx}`.toString()}>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {/* la variable "event" était déjà utilisé plus haut ce qui à créée une erreur, nous avons donc renommé "event" par "eventItem" */}
              {byDateDesc.map((eventItem, radioIdx) => (
                // Pour chaque élément de byDateDesc, on crée un élément input de type radio
                <input
                // La clé de l'élément est définie comme la date de l'événement pour garantir l'unicité
                  key={`${eventItem.date}`}
                  type="radio"
                // Chaque groupe de boutons radio doit avoir un nom unique, donc on utilise radioIdx pour le rendre unique
                  name={`radio-button-${radioIdx}`}
                  // On vérifie si l'indice actuel de la boucle est égal à l'indice du bouton radio, 
                  // ce qui détermine si le bouton radio est coché ou non
                  checked={index === radioIdx}
                  // ajout du onChnage poour éviter l'erreur dans la console
                  onChange={() => handleRadioChange(radioIdx)}
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;
