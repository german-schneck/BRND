// Dependencies
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// StyleSheet
import styles from './MyBrands.module.scss';

// Hooks
import { useUserBrands } from '@/hooks/user';
import { useAuth } from '@/hooks/auth';

// Components
import { BrandListItem } from '@/shared/components/BrandListItem';

// Utils
import { getBrandScoreVariation } from '@/shared/utils/brand';
import { Brand } from '@/shared/hooks/brands';

function MyBrands() {
  const navigate = useNavigate();
  const { data: user } = useAuth();
  const { data: brands, refetch } = useUserBrands(user?.id ?? '');

  useEffect(() => {
    if (user?.id) {
      refetch();
    }
  }, [user?.id, refetch]);

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
      {(brands && brands.length > 1) && (
        <ul className={styles.grid}>
          {brands.map((brand, index) => (
            <li key={`--user-brand-item-${index.toString()}`}>
              <BrandListItem
                position={index + 1}
                name={brand.brand.name}
                photoUrl={brand.brand.imageUrl}
                score={brand.points}
                variation={getBrandScoreVariation(brand.brand.stateScoreWeek)}
                onClick={() => handleClickCard(brand.brand.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyBrands;