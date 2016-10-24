/*
 * Get random whole number between min and max
 *
 * @param {Number} min value
 * @param {Number} max value
 * @return {Number}
 */
export const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
