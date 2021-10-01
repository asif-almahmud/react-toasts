import { useState, useRef } from "react";
import styles from "./styles.module.scss";
import { ToastPortal } from "components";

export const App = () => {
  const toastRef = useRef();
  const [text, setText] = useState("");
  const [mode, setMode] = useState("info");
  const [autoClose, setAutoClose] = useState(false);
  const [autoCloseTime, setAutoCloseTime] = useState(5000);

  const addToast = () => {
    toastRef.current.addMessage({ mode, message: text });
  };

  return (
    <div className={styles.main}>
      <h1>Make Toasts</h1>
      <div className={styles.content}>
        <img
          alt="toaster"
          src="/assets/toaster.svg"
          className={styles.toaster}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (text) {
              addToast();
              setText("");
            }
          }}
        >
          <div className={styles.autoClose}>
            <input
              type="checkbox"
              value={autoClose}
              onChange={(e) => setAutoClose(e.target.checked)}
            />
            <label>Auto Close</label>
          </div>
          {autoClose && (
            <input
              type="number"
              value={autoCloseTime === 5000 ? "" : autoCloseTime}
              placeholder="in milliseconds(default 5000ms)"
              onChange={(e) => setAutoCloseTime(e.target.value)}
            />
          )}

          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>

          <input
            type="text"
            value={text}
            placeholder="Write Toast Message"
            onChange={(e) => setText(e.target.value)}
            required
          />

          <button className={styles.btn_submit}>MAKE</button>
        </form>
      </div>
      <ToastPortal
        ref={toastRef}
        autoClose={autoClose}
        autoCloseTime={autoCloseTime}
      />
    </div>
  );
};
