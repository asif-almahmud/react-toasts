import { useToastPortal } from "components/hooks";
import styles from "./styles.module.scss";
import ReactDom from "react-dom";
import { forwardRef, useState, useEffect, useImperativeHandle } from "react";
import { Toast } from "components/Toast";
import { uuid } from "components/shared";

export const ToastPortal = forwardRef(({ autoClose, autoCloseTime }, ref) => {
  const [toasts, setToasts] = useState([]);
  const [removingId, setRemovingId] = useState("");
  const { loaded, portalId } = useToastPortal();

  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    setToasts(toasts.filter((toast) => toast.id !== removingId));
  }, [removingId]);

  useEffect(() => {
    if (autoClose && toasts.length && toasts.length !== 0) {
      setTimeout(() => {
        setRemovingId(toasts[0].id);
      }, autoCloseTime);
    }
  }, [toasts, autoCloseTime, autoClose]);

  useImperativeHandle(ref, () => ({
    addMessage(toast) {
      setToasts([...toasts, { ...toast, id: uuid() }]);
    },
  }));

  return loaded ? (
    ReactDom.createPortal(
      <div className={styles.toastContainer}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            mode={toast.mode}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>,
      document.getElementById(portalId)
    )
  ) : (
    <></>
  );
});
