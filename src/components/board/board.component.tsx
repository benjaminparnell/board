import { useContext, useState } from "react";
import { createContext } from "react";
import { v4 } from "uuid";
import { Card, CardStatus } from "../column/column.component";

interface BoardContextValues {
  addCard: (text: string, status: CardStatus) => void;
  updateCard: (card: Card) => void;
  updateCardStatus: (id: string, newStatus: CardStatus) => void;
  cards: Card[];
}

const BoardContext = createContext<BoardContextValues>({
  addCard: () => null,
  updateCardStatus: () => null,
  updateCard: () => null,
  cards: [],
});

const basicCard = (): Card => ({
  id: v4(),
  status: "todo",
  text: "some card text",
});

const Board: React.FC = ({ children }) => {
  const [cards, setCards] = useState<Card[]>([
    basicCard(),
    basicCard(),
    basicCard(),
  ]);

  const updateCardStatus = (id: string, newStatus: CardStatus) => {
    const newCards = cards.map((card) => {
      if (card.id === id) {
        card.status = newStatus;
      }
      return card;
    });
    setCards(newCards);
  };

  const updateCard = (updatedCard: Card) => {
    const newCards = cards.map((card) => {
      if (card.id === updatedCard.id) {
        card = { ...updatedCard };
      }
      return card;
    });
    setCards(newCards);
  };

  const addCard = (text: string, status: CardStatus) => {
    setCards(cards.concat([{ id: v4(), text, status }]));
  };

  return (
    <BoardContext.Provider
      value={{ updateCardStatus, addCard, cards, updateCard }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default Board;

const useBoard = () => useContext(BoardContext);

export { useBoard };
