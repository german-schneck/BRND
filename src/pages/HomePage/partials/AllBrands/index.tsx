// Components
import BrandsList from '@/components/BrandsList';

// StyleSheet
import styles from './AllBrands.module.scss';

function AllBrands() {
  return (
    <div className={styles.layout}>
      <BrandsList />
    </div>
  );
}

export default AllBrands;