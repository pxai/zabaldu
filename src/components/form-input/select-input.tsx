import { CategoryProps } from 'prisma/types';
import { getEnabledCategories } from 'trace_events';
import styles from '../../styles/FormInput.module.scss';

const SelectInput = ({ label, values, ...otherProps }: any) => {
  return (
    <div className={styles.group}>
        <select className={styles['form-input']}
          {...otherProps}
        >
          {values.map( (category: CategoryProps) =>
            <option key={category.id} value={category.id}>{category.name}</option>
          )}
        </select>
      {label && (
        <label
          className={`${otherProps.value?.length ? styles['shrink'] : ''} ${styles['form-input-label']} `}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default SelectInput;