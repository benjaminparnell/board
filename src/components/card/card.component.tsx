import styles from "./card.module.css";
import { useDrag } from "react-dnd";
import { CardStatus } from "../column/column.component";
import EditModal from "./edit-modal.component";
import { useState } from "react";

interface CardProps {
  text: string;
  id: string;
  onDropped: (newStatus: CardStatus) => void;
}

const Card: React.FC<CardProps> = ({ text, id, onDropped }) => {
  const [showEditModal, setShowEditModal] = useState(false);
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
    <div
      className={styles.card}
      ref={dragRef}
      onClick={() => setShowEditModal(true)}
    >
      <p>{text}</p>

      {showEditModal && (
        <EditModal onClose={() => setShowEditModal(false)} text={text} />
      )}
    </div>
  );
};

export default Card;
