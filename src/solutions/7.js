const OPERATORS = ["+", "*"];
const OPERATORS_V2 = ["+", "*", "||"];

function calc(op1, op2, operator) {
  if (operator === "+") {
    return op1 + op2;
  } else if (operator === "*") {
    return op1 * op2;
  }

  return Number(op1.toString() + op2.toString());
}

function doMath(operators, acc, numbers, currentIndex) {
  if (currentIndex === numbers.length) {
    return [acc];
  }

  const sums = [];
  for (let j = 0; j < operators.length; j += 1) {
    const sum = calc(acc, numbers[currentIndex], operators[j]);

    sums.push(...doMath(operators, sum, numbers, currentIndex + 1));
  }

  return sums;
}

export function solutionPartOne(maths) {
  const validSums = maths.filter(([sum, numbers]) => {
    const results = doMath(OPERATORS, numbers[0], numbers, 1);
    return results.find((s) => s === sum);
  });

  return validSums.reduce((acc, [sum]) => acc + sum, 0);
}

export function solutionPartTwo(maths) {
  const validSums = maths.filter(([sum, numbers]) => {
    const results = doMath(OPERATORS_V2, numbers[0], numbers, 1);
    return results.find((s) => s === sum);
  });

  return validSums.reduce((acc, [sum]) => acc + sum, 0);
}
