/**
 * Shortens a large number by converting it to a string with a unit suffix.
 * 
 * For example:
 * - 1500 becomes "1.5K"
 * - 2000000 becomes "2M"
 * - 3500000000 becomes "3.5B"
 * 
 * @param value - The number to shorten.
 * @returns The shortened number as a string with a unit suffix.
 */
export function shortenNumber(value: number): string {
  const units = ['K', 'M', 'B', 'T'];
  let unitIndex = -1;
  while (value >= 1000 && unitIndex < units.length - 1) {
    value /= 1000;
    unitIndex++;
  }
  return unitIndex === -1 ? value.toString() : value.toFixed(2).replace(/\.00$/, '') + units[unitIndex];
}
