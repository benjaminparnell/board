import styles from './column.module.css'
import { useState } from "react";

interface NewCardFormProps {
  onAdd: (cardName: string) => void;
}

const NewCardForm: React.FC<NewCardFormProps> = ({ onAdd }) => {
  const [cardName, setCardName] = useState("");

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter" && cardName) {
      onAdd(cardName);
      setCardName("");
    }
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setCardName(event.target.value);
  };

  return (
    <input
      className={styles.newCardNameInput}
      onKeyDown={onKeyDown}
      onChange={onChange}
      value={cardName}
      type="text"
      name="newCardName"
      placeholder="Add a card"
    />
  );
};

export default NewCardForm;
