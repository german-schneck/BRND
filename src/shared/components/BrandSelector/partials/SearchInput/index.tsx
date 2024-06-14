
// StyleSheet
import styles from './SearchInput.module.scss';

export default function SearchInput() {
  return (
    <div className={styles.container}>
      <input type={'search'} placeholder={'Search brands'} />
    </div>
  );
}