import { BrandStateScoreType } from '@/hooks/brands';

/**
 * Returns the brand score variation based on the state score.
 * 
 * @param {number} stateScore - The state score to evaluate.
 * @returns {string} - 'equal' if stateScore is 0, 'up' if stateScore is 1, 'down' otherwise.
 */
export const getBrandScoreVariation = (stateScore: number): BrandStateScoreType => 
  stateScore === 0 ? 'equal' : stateScore > 0 ? 'up' : 'down';
