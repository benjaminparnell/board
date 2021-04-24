import { useEffect, useRef } from "react";
import Modal from "../modal/modal.component";
import styles from "../modal/modal.module.css";
import { Formik, Form, Field } from "formik";
import { useBoard } from "../board/board.component";
import { Card } from "../column/column.component";

interface EditModalProps {
  onClose: () => void;
  card: Card;
}

const EditModal: React.FC<EditModalProps> = ({ card, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { updateCard } = useBoard();

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return (
    <Modal>
      <div className={styles.modal} ref={ref}>
        <div className={styles.modalTop}>
          <Formik
            initialValues={{ text: card.text }}
            onSubmit={(values) => {
              updateCard({ ...card, ...values });
            }}
          >
            <Form>
              <Field id="text" name="text" />
              <button type="submit" className={styles.closeButton}>
                Save
              </button>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => onClose()}
              >
                Close
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
