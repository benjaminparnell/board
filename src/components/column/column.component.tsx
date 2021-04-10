import styles from "./column.module.css";
import CardComponent from "../card/card.component";
import { useDrop } from "react-dnd";
import { useBoard } from "../board/board.component";
import NewCardForm from "./new-card-form.component";

export type CardStatus = "todo" | "doing" | "done";

export interface Card {
  id: string;
  text: string;
  status: CardStatus;
}

interface ColumnProps {
  title: string;
  columnStatus: CardStatus;
}

const Column: React.FC<ColumnProps> = ({ title, columnStatus }) => {
  const { addCard, cards: boardCards, updateCardStatus } = useBoard();
  const [_, dropRef] = useDrop(() => ({
    accept: "card",
    drop: () => {
      return { status: columnStatus };
    },
  }));
  const cards = boardCards.filter(({ status }) => status === columnStatus);

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
      <NewCardForm onAdd={(cardName) => addCard(cardName, columnStatus)} />
    </div>
  );
};

export default Column;
