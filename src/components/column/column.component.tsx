import styles from "./column.module.css";
import CardComponent from "../card/card.component";
import { useDrop } from "react-dnd";

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
}

const Column: React.FC<ColumnProps> = ({
  title,
  cards,
  updateCardStatus,
  columnStatus,
}) => {
  const [_, dropRef] = useDrop(() => ({
    accept: "card",
    drop: () => {
      return { status: columnStatus }
    }
  }));

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
    </div>
  );
};

export default Column;
