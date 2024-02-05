import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    if(byDateDesc !== undefined){
      setTimeout(
        // la fonction vérifie si (index) est inférieur à byDateDesc.length - 1. Si c'est le cas, elle augmente l'index de 1, sinon, elle réinitialise l'index à 0.
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
        5000
        );
      }
  };

  useEffect(() => {
    nextCard();
  });

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
              {byDateDesc.map((eventItem, radioIdx) => {
                const radioKey = `${eventItem.id}-${radioIdx}`;

                return (
                  <input
                    key={radioKey}
                    type="radio"
                    name="radio-button"
                    // checked={idx === radioIdx} comparait (idx) qui est l'index de la carte avec radioIdx qui est l'index du bouton radio. ( ils ne sont pas forcément les mêmes ce qui pouvait provoquer des erreurs)
                    // remplacement de (idx) par (index). Cela garantit que le bouton radio correspondant à la carte actuellement affichée est coché.
                    checked={index === radioIdx}
                  />
                );
              })}
            </div>
          </div>
          </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;
