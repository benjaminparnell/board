import { useEffect, useRef } from "react";
import Modal from "../modal/modal.component";
import styles from "../modal/modal.module.css";

interface EditModalProps {
  text: string;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ text, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

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
          {text}
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => onClose()}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
