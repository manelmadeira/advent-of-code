function calculateNewNumber(number) {
  if (number === "0") {
    return "1";
  }

  if (number.length % 2 === 0) {
    const firstStr = number.slice(0, number.length / 2);
    const secondStr = number.slice(number.length / 2);

    return `${Number(firstStr)} ${Number(secondStr)}`;
  }

  return String(Number(number) * 2024);
}

function transformerV2(numbersObj) {
  const newObj = {};

  Object.keys(numbersObj).forEach((number) => {
    const newNumbers = calculateNewNumber(number).split(" ");

    newNumbers.forEach((newNumber) => {
      if (!newObj[newNumber]) {
        newObj[newNumber] = numbersObj[number];
      } else {
        newObj[newNumber] = newObj[newNumber] + numbersObj[number];
      }
    });
  });

  return newObj;
}

export function solutionPartTwo(numbers, blinks) {
  let numbersObj = {};
  for (let i = 0; i < numbers.length; i += 1) {
    const number = numbers[i];

    if (!numbersObj[number]) {
      numbersObj[number] = 1;
    } else {
      numbersObj[number] = numbersObj[number] + 1;
    }
  }

  for (let i = 0; i < blinks; i += 1) {
    numbersObj = transformerV2(numbersObj);
  }

  return Object.keys(numbersObj).reduce((acc, key) => acc + numbersObj[key], 0);
}
