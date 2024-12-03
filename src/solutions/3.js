const REGEX = /(mul\([0-9]{1,3},[0-9]{1,3}\))/g;
const NUMBERS_REGEX = /([0-9]+),([0-9]+)/g;

function parseMulExpression(mulExpression) {
  const [match] = [...mulExpression.matchAll(NUMBERS_REGEX)];

  return [match[1], match[2]];
}

export function solutionPartOne(textToParseArray) {
  let total = 0;

  textToParseArray.forEach((textToParse) => {
    const multiplications = [...textToParse.matchAll(REGEX)];

    multiplications.forEach(([mulExpression]) => {
      const [numberOne, numberTwo] = parseMulExpression(mulExpression);

      total += numberOne * numberTwo;
    });
  });

  return total;
}

const REGEX_DO_DONT = /(mul\([0-9]{1,3},[0-9]{1,3}\)|(do\(\))|(don't\(\)))/g;

export function solutionPartTwo(textToParseArray) {
  let canCount = true;
  let total = 0;

  textToParseArray.forEach((textToParse) => {
    const expressions = [...textToParse.matchAll(REGEX_DO_DONT)];

    expressions.forEach(([expression]) => {
      if (expression === "do()") {
        canCount = true;
      } else if (expression === "don't()") {
        canCount = false;
      } else if (canCount) {
        const [numberOne, numberTwo] = parseMulExpression(expression);

        total += numberOne * numberTwo;
      }
    });
  });

  return total;
}
