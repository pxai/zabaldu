import styles from '../../styles/FormInput.module.scss';

const FormInput = ({ label, ...otherProps }: any) => {
  return (
    <div className={styles.group}>
      <input className={styles['form-input']} {...otherProps} />
      {label && (
        <label
          className={`${otherProps.value.length ? styles['shrink'] : ''} ${styles['form-input-label']} `}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;