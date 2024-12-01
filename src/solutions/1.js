export function solutionPartOne(arrayOne, arrayTwo) {
  const sortedArrayOne = arrayOne.sort();
  const sortedArrayTwo = arrayTwo.sort();

  const total = [];
  sortedArrayOne.forEach((value, idx) => {
    total.push(Math.abs(value - sortedArrayTwo[idx]));
  });

  return total.reduce((acc, value) => acc + value, 0);
}

export function solutionPartTwo(arrayOne, arrayTwo) {
  const total = [];

  arrayOne.forEach((valueOne) => {
    let count = 0;
    arrayTwo.forEach((valueTwo) => {
      if (valueOne === valueTwo) {
        count += 1;
      }
    });

    const result = Number(valueOne) * count;

    if (result) {
      total.push(result);
    }
  });

  return total.reduce((acc, value) => acc + value, 0);
}
