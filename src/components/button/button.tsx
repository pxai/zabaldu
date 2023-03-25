import styles from "../../styles/Button.module.scss";

export const BUTTON_TYPE_CLASSES = {
  google: styles["google-sign-in"],
  inverted: styles["inverted"],
};

const Button = ({ children, buttonType, ...otherProps }: any) => {
  return (
    <button
      className={`${styles['button-container']} ${styles['google-sign-in']}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
