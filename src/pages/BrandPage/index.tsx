// Dependencies
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';
import classNames from 'clsx';

// StyleSheet
import styles from './BrandPage.module.scss';

// Components
import AppLayout from '@/shared/layouts/AppLayout';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import LoaderIndicator from '@/components/LoaderIndicator';
import GridItem from './partials/GridItem';
import IconButton from '@/components/IconButton';
import CastItem from './partials/CastItem';

// Assets
import GoBackIcon from '@/assets/icons/go-back-icon.svg?react';
import ExportIcon from '@/assets/icons/export-icon.svg?react';
import FavoriteIcon from '@/assets/icons/favorite-icon.svg?react';
import GlobeIcon from '@/assets/icons/globe-icon.svg?react';
import ScoreUpDownIcon from '@/assets/icons/score-updown-icon.svg?react';
import ScoreEqualIcon from '@/assets/icons/score-equal-icon.svg?react';

// Hocs
import withProtectionRoute from '@/hocs/withProtectionRoute';

// Hooks
import { useBrand } from '@/hooks/brands';
import { useAuth } from '@/hooks/auth';
import { ModalsIds, useModal } from '@/hooks/ui';
import useDisableScrollBody from '@/hooks/ui/useDisableScrollBody';

// Utils
import { shortenNumber } from '@/utils/number';
import { getBrandScoreVariation } from '@/utils/brand';

function BrandPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string;}>();
  const { data: user } = useAuth();
  const { data , isLoading, isFetching } = useBrand(Number(id));
  const { openModal } = useModal();
  useDisableScrollBody();
  
  /**
   * Opens the brand's website in a new tab.
   */
  const handleClickWebsite = useCallback(() => {
    window.open(data?.brand?.url);
  }, [data?.brand?.url]);

  /**
   * Opens the share modal for the brand.
   */
  const handleClickShare = useCallback(() => {
    if (data?.brand?.id) {
      openModal(ModalsIds.SHARE_BRAND, {
        id: data.brand?.id
      });
    }
  }, [data?.brand?.id]);
  
  /**
   * Determines the size based on the given score.
   *
   * @param {number} score - The score to evaluate.
   * @returns {number} - The size corresponding to the score.
   */
  function getSize(score: number): number {
    switch (true) {
      case score > 1000000:
        return 26;
      case score > 100000:
        return 24;
      case score > 10000:
        return 28;
      default:
        return 32;
    }
  }

  const renderVariation = () => {
    if (!data?.brand) {
      return null;
    }

    const variation = getBrandScoreVariation(data?.brand.stateScore);

    const iconClass = styles[variation];
    const IconComponent = variation === 'equal' ? ScoreEqualIcon : ScoreUpDownIcon;

    return (
      <GridItem 
        variant={variation == 'equal' ? 'blue' : variation === 'down' ? 'red' : 'green'} 
        title={'Score'} 
        rightElement={
          <div className={classNames(styles.indicator, iconClass)}>
            <Typography weight={'light'} size={12} lineHeight={14}>{variation === 'up' ? '+' : variation === 'down' ? '-' : ''}{data?.brand.stateScore}</Typography>
  
            <div className={styles.icon}>
              <IconComponent />
            </div>
          </div>
        }>
        <div className={styles.center}>
          <Typography variant={'druk'} weight={'wide'} className={styles.score} size={getSize(data.brand.score)}>{shortenNumber(data.brand.score)}</Typography>
        </div>
      </GridItem>
    );

  };

  /**
   * Extracts the rank ID and ranking from the brand's ranking string.
   * 
   * @type {[string, string]} - An array containing the rank ID and ranking.
   */
  const [rankId, ofRanking] = data?.brand?.ranking?.split('/') || [];

  /**
   * Determines if the footer should be visible based on the user's voting status.
   *
   * @type {boolean} - True if the user has voted today, false otherwise.
   */
  const isFooterVisible = user && !user.hasVotedToday;

  return (
    <AppLayout>
      <div className={styles.body}>
        {(isFetching || isLoading || !data || !data.brand) ? (
          <LoaderIndicator variant={'fullscreen'} />
        ) : (
          <>
            <div className={styles.header}>
              <div className={styles.head}>
                {user && (
                  <IconButton
                    variant={'solid'} 
                    icon={<GoBackIcon />}
                    onClick={() => navigate(-1)} 
                    className={styles.backBtn}
                  />
                )}
                <div className={styles.actions}>
                  <IconButton icon={<ExportIcon />} variant={'secondary'} onClick={handleClickShare} />
                  {/* <IconButton icon={<GitHubIcon />} variant={'secondary'} onClick={() => {}} /> */}
                  <IconButton icon={<GlobeIcon />} variant={'secondary'} onClick={handleClickWebsite} />
                </div>
              </div>

              <div className={styles.head}>
                <div className={styles.title}>
                  {/* <Typography as={'span'} variant={'geist'} weight={'light'} size={16} lineHeight={16} className={classNames(styles.grey, styles.position)}># 3</Typography> */}
                  <Typography as={'p'} variant={'druk'} weight={'text-wide'} size={22} lineHeight={22} className={styles.name}>
                    <span>
                      {data.brand.name}
                    </span>
                  </Typography>
                </div>
              </div>
            </div>
            <div className={styles.container}>
              <div className={classNames(styles.grid, styles.inline)}>
                <div className={styles.grid}>
                  <div className={styles.image}>
                    <img
                      src={data.brand.imageUrl}
                      alt={data.brand.name}
                    />
                  </div>
                  {renderVariation()}
                  <GridItem title={'Farcaster'}>
                    <div className={classNames(styles.bottom, styles.profile)}>
                      <Typography variant={'geist'} weight={'regular'}>
                        <a href={`https://warpcast.com/${data.brand.profile.slice(1)}`} target={'_blank'}>
                          {data.brand.profile}
                        </a>
                      </Typography>
                      <Typography variant={'geist'} weight={'regular'} className={styles.grey}>
                        <a href={`https://warpcast.com/~/channel/${data.brand.channel.slice(1)}`} target={'_blank'}>
                          {data.brand.channel}
                        </a>
                      </Typography>
                    </div>
                  </GridItem>
                  <GridItem title={'Ranking'}>
                    <div className={styles.bottom}>
                      <Typography variant={'geist'} weight={'regular'} className={styles.label} size={10} lineHeight={12}>Global</Typography>
                      <Typography variant={'druk'} weight={'wide'} size={32}>{rankId}<Typography as={'span'} size={12} className={styles.grey}>/{ofRanking}</Typography></Typography>
                    </div>
                  </GridItem>
                  <GridItem title={'Followers'}>
                    <div className={styles.bottom}>
                      <Typography variant={'geist'} weight={'regular'} className={styles.label} size={10} lineHeight={12}>All</Typography>
                      <Typography variant={'druk'} weight={'wide'} size={18} lineHeight={22}>{shortenNumber(data.brand.followerCount)}</Typography>
                    </div>
                  </GridItem>
                  <GridItem title={'Category'}>
                    <div className={styles.bottom}>
                      <Typography variant={'druk'} weight={'wide'} size={18} lineHeight={22}>{data.brand.category.name}</Typography>                   
                    </div>
                  </GridItem>
                </div>
                <GridItem title={'Description'} className={styles.box}>
                  <div className={styles.boxBody}>
                    <Typography size={16} lineHeight={20}>{data.brand.description}</Typography>
                  </div>
                </GridItem>

                <GridItem title={'Latest casts'} className={classNames(styles.box, styles.casts)}>
                  {data.casts.map((cast, index) => (
                    <CastItem
                      key={'castitem--key--' + index.toString()}
                      user={{
                        photoUrl: cast.creatorPfp,
                        username: cast.creator
                      }}
                      url={cast.warpcastUrl}
                      message={cast.text}
                      attach={{
                        type: 'image',
                        src: cast?.image as string
                      }}
                    />
                  ))}
                 
                </GridItem>
              </div>
              {isFooterVisible && (
                <div className={styles.divider} />
              )}
            </div>
          </>
        )}

        {isFooterVisible && ( 
          <div className={styles.footer}>
            <Button caption={'Add To Podium'} iconLeft={<FavoriteIcon />} onClick={() => navigate('/vote')} />
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default withProtectionRoute(BrandPage, 'always');