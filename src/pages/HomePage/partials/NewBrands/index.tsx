// Components
import BrandsList from '@/components/BrandsList';

// StyleSheet
import styles from './NewBrands.module.scss';

function NewBrands() {
  return (
    <div className={styles.layout}>
      <BrandsList
        isFinderEnabled={false}
        config={{
          order: 'new',
          limit: 9
        }}
      />
    </div>
  );
}

export default NewBrands;