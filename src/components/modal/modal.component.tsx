import ReactDOM from "react-dom";
import { useEffect, useMemo } from "react";

const Modal: React.FC = ({ children }) => {
  const root = useMemo(() => document.getElementById("modal-root"), []);
  const el = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    root && root.appendChild(el);

    return () => {
      root && root.removeChild(el);
    };
  }, []);

  return ReactDOM.createPortal(children, el);
};

export default Modal;
