import styles from "./column.module.css";
import CardComponent from "../card/card.component";
import { useDrop } from "react-dnd";
import { useState } from "react";

export type CardStatus = "todo" | "doing" | "done";

export interface Card {
  id: string;
  text: string;
  status: CardStatus;
}

interface ColumnProps {
  title: string;
  cards: Card[];
  columnStatus: CardStatus;
  updateCardStatus: (id: string, newStatus: CardStatus) => void;
  addCard: (text: string, status: CardStatus) => void;
}

const Column: React.FC<ColumnProps> = ({
  title,
  cards,
  updateCardStatus,
  columnStatus,
  addCard
}) => {
  const [_, dropRef] = useDrop(() => ({
    accept: "card",
    drop: () => {
      return { status: columnStatus };
    },
  }));
  const [cardName, setCardName] = useState("");

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter" && cardName) {
      setCardName("")
      addCard(cardName, columnStatus)
    }
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setCardName(event.target.value)
  }

  return (
    <div className={styles.column} ref={dropRef}>
      <h2 className="mb-4">{title}</h2>
      {cards.map((card) => (
        <CardComponent
          key={card.id}
          {...card}
          onDropped={(newStatus) => updateCardStatus(card.id, newStatus)}
        />
      ))}
      <input
        className={styles.newCardNameInput}
        onKeyDown={onKeyDown}
        onChange={onChange}
        value={cardName}
        type="text"
        name="newCardName"
        placeholder="Add a card"
      />
    </div>
  );
};

export default Column;
