// Dependencies
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import BrandCard from '@/components/cards/BrandCard';

// StyleSheet
import styles from './TrendBrands.module.scss';

// Hook
import { Brand, useBrandList } from '@/hooks/brands';

// Utils
import { getBrandScoreVariation } from '@/utils/brand';

// Assets
import FeatureFarcasterBrand from '@/assets/images/feature-farcaster-brand.svg?react';

function TrendBrands() {
  const navigate = useNavigate();
  const { data, refetch } = useBrandList('top', '', 1, 10);

  useEffect(() => {
    refetch();
  }, []);

  /**
   * Memoized computation to get the main brand from the list of brands.
   *
   * @constant
   * @type {Brand | undefined}
   * @default undefined
   * @returns {Brand | undefined} The main brand or undefined if no brands are available.
   */
  const mainBrand = useMemo<Brand | undefined>(() => data?.brands?.[0], [data?.brands]);

  /**
   * Handles the click event on a brand card and navigates to the brand's page.
   *
   * @param {Brand['id']} id - The ID of the brand.
   */
  const handleClickCard = useCallback((id: Brand['id']) => {
    navigate(`/brand/${id}`);
  }, []);
  
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
              score={mainBrand.scoreWeek}
              onClick={() => handleClickCard(mainBrand.id)}
              variation={getBrandScoreVariation(mainBrand.stateScoreWeek)}
            />
          </div>
        </div>
      )}
      
      {(data.brands && (data.brands).length > 1) && (
        <ul className={styles.grid}>
          {data.brands.slice(1).map((brand, index) => (
            <li key={`--brand-item-${index.toString()}`}>
              <BrandCard
                name={brand.name}
                photoUrl={brand.imageUrl}
                score={brand.scoreWeek}
                variation={getBrandScoreVariation(brand.stateScoreWeek)}
                onClick={() => handleClickCard(brand.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TrendBrands;