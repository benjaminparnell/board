import "./App.css";
import Column, { Card, CardStatus } from "./components/column/column.component";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import { v4 } from "uuid";

const CARD_STATUSES: CardStatus[] = ["todo", "doing", "done"];

const assertNever = (x: never): never => {
  throw new Error()
}

const statusToTitle = (status: CardStatus) => {
  switch (status) {
    case 'todo':
      return 'Todo'
    case 'doing':
      return 'Doing'
    case 'done':
      return 'Done'
    default:
      return assertNever(status)
  }
}

const basicCard = (): Card => ({
  id: v4(),
  status: 'todo',
  text: 'some card text'
})

function App() {
  const [cards, setCards] = useState<Card[]>([basicCard(), basicCard(), basicCard()]);

  const updateCardStatus = (id: string, newStatus: CardStatus) => {
    const newCards = cards.map((card) => {
      if (card.id === id) {
        card.status = newStatus;
      }
      return card;
    });
    setCards(newCards);
  };

  return (
    <div className="flex w-screen">
      <DndProvider backend={HTML5Backend}>
        {CARD_STATUSES.map((cardStatus) => (
          <Column
            key={cardStatus}
            columnStatus={cardStatus}
            title={statusToTitle(cardStatus)}
            updateCardStatus={updateCardStatus}
            cards={cards.filter(({ status }) => status === cardStatus)}
          />
        ))}
      </DndProvider>
    </div>
  );
}

export default App;
