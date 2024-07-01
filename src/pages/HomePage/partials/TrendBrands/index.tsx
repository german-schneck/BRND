// Dependencies
import {useEffect, useMemo} from 'react';

// Components
import BrandCard from '@/components/cards/BrandCard';

// StyleSheet
import styles from './TrendBrands.module.scss';

// Hook
import {Brand, useBrandList} from '@/hooks/brands';

// Utils
import {getBrandScoreVariation} from '@/utils/brand';

// Assets
import FeatureFarcasterBrand from '@/assets/images/feature-farcaster-brand.svg?react';

function TrendBrands() {
  const {data, refetch} = useBrandList('', 1, 'trending', 7);

  useEffect(() => {
    refetch();
  }, []);

  /**
   * Memoized computation to get the main brand from the list of brands.
   * 
   * @returns {Brand | undefined} The main brand or undefined if no brands are available.
   */
  const mainBrand = useMemo<Brand | undefined>(() => {
    if (!data?.brands) return undefined;
    const brandKeys: Brand['id'][] = Object.keys(data.brands).map(Number);
    return data.brands[brandKeys[0]];
  }, [data?.brands]);
  
  return (
    <div className={styles.layout}>

      {mainBrand && (
        <div className={styles.feature}>
          <div className={styles.image}>
            <FeatureFarcasterBrand />
          </div>
          <div className={styles.brand}>
            <BrandCard
              size={'l'}
              className={styles.brandCard}
              name={mainBrand.name}
              photoUrl={mainBrand.imageUrl}
              score={mainBrand.score}
              variation={getBrandScoreVariation(mainBrand.stateScore)}
            />
          </div>
        </div>
      )}
      
      {Object.keys(data.brands).length > 1 && (
        <ul className={styles.grid}>
          {Object.values(data.brands).slice(1).map((brand, index) => (
            <li key={`--brand-item-${index.toString()}`}>
              <BrandCard
                name={brand.name}
                photoUrl={brand.imageUrl}
                score={brand.score}
                variation={getBrandScoreVariation(brand.stateScore)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TrendBrands;