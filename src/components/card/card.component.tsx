import styles from "./card.module.css";
import { useDrag } from "react-dnd";
import { CardStatus } from "../column/column.component";

interface CardProps {
  text: string;
  id: string;
  onDropped: (newStatus: CardStatus) => void;
}

const Card: React.FC<CardProps> = ({ text, id, onDropped }) => {
  const [_, dragRef] = useDrag(() => ({
    type: "card",
    item: { id, text },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{ status: CardStatus }>();

      if (dropResult) {
        onDropped(dropResult.status);
      }
    },
  }));

  return (
    <div className={styles.card} ref={dragRef}>
      <p>Card</p>
    </div>
  );
};

export default Card;
