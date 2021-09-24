import { useToastPortal } from "components/hooks";
import styles from "./styles.module.scss";
import ReactDom from "react-dom";

export const ToastPortal = () => {
  const { loaded, portalId } = useToastPortal();

  return loaded ? (
    ReactDom.createPortal(
      <div className={styles.toastContainer}>Toast</div>,
      document.getElementById(portalId)
    )
  ) : (
    <></>
  );
};
