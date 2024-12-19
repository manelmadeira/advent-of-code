let invalids = new Map();
let valids = new Map();
let combinations = new Map();

function validate(pattern, towels) {
  if (invalids.has(pattern)) {
    return false;
  }

  for (let i = 0; i < towels.length; i += 1) {
    if (pattern === towels[i]) {
      return true;
    }

    if (pattern.startsWith(towels[i])) {
      const subPattern = pattern.slice(towels[i].length);
      const isValid = validate(subPattern, towels);

      if (isValid) {
        return true;
      }
    }
  }

  invalids.set(pattern);

  return false;
}

export function solutionPartOne(towels, patterns) {
  invalids = new Map();

  const sortedTowels = towels.sort((a, b) => b.length - a.length);

  let count = 0;
  for (let i = 0; i < patterns.length; i += 1) {
    const isValid = validate(patterns[i], sortedTowels);

    if (isValid) {
      count += 1;
    }
  }

  return count;
}

function validateV2(pattern, towels) {
  if (invalids.has(pattern)) {
    return false;
  }

  if (valids.has(pattern)) {
    return valids.get(pattern);
  }

  let invalid = true;
  let count = 0;
  for (let i = 0; i < towels.length; i += 1) {
    if (pattern === towels[i]) {
      invalid = false;
      count += 1;
    } else if (pattern.startsWith(towels[i])) {
      const subPattern = pattern.slice(towels[i].length);
      const isValid = validateV2(subPattern, towels);

      if (isValid) {
        invalid = false;
        count += isValid;
      }
    }
  }

  if (invalid) {
    invalids.set(pattern);
    return false;
  } else {
    if (valids.has(pattern)) {
      valids.set(pattern, valids.get(pattern) + count);
    } else {
      valids.set(pattern, count);
    }
  }

  return count;
}

export function solutionPartTwo(towels, patterns) {
  invalids = new Map();
  valids = new Map();
  combinations = new Map();

  const sortedTowels = towels.sort((a, b) => b.length - a.length);

  for (let i = 0; i < patterns.length; i += 1) {
    const isValid = validateV2(patterns[i], sortedTowels);

    if (isValid) {
      combinations.set(patterns[i], isValid);
    }
  }

  let sum = 0;
  combinations.forEach((possibilities) => {
    sum += possibilities;
  });

  return sum;
}
