/**
 *
 * @param min - Inclusive min integer in range.
 * @param max - Inclusive max integer of range.
 * @returns A random integer between [min, max].
 */
export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
