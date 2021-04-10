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
  cards: Card[];
  columnStatus: CardStatus;
  updateCardStatus: (id: string, newStatus: CardStatus) => void;
}

const Column: React.FC<ColumnProps> = ({
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
