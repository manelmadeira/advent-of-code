/**
 *
 * Formula
 * a = number of times pressing A button
 * b = number of times pressing B button
 *
 * pX = a * aX + b * Bx
 * pY = a * aY + b * By
 */

export function solutionPartTwo(tries, base = 0) {
  let totalSum = 0;

  for (let i = 0; i < tries.length; i += 1) {
    const tryMap = tries[i];
    const [aX, aY] = tryMap[0];
    const [bX, bY] = tryMap[1];
    const pX = tryMap[2][0] + base;
    const pY = tryMap[2][1] + base;

    const b = (pX * aY - pY * aX) / (bX * aY - bY * aX);
    const a = (pX * bY - pY * bX) / (aX * bY - aY * bX);

    if (a === parseInt(a) && b === parseInt(b)) {
      const sumTokens = a * 3 + b;
      totalSum += sumTokens;
    }
  }

  return totalSum;
}
