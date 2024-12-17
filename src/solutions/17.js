function getComboValue(a, b, c, operand) {
  if (operand <= 3n) {
    return operand;
  }

  if (operand === 4n) {
    return a;
  }

  if (operand === 5n) {
    return b;
  }

  if (operand === 6n) {
    return c;
  }
}

export function operations(a, b, c, opcode, operand) {
  let pointerJumper = null;
  const outArr = [];

  if (opcode === 0n) {
    // adv
    const result = a / 2n ** getComboValue(a, b, c, operand);
    a = result;
  } else if (opcode === 1n) {
    // bxl
    const result = b ^ operand;
    b = result;
  } else if (opcode === 2n) {
    // bst
    const result = getComboValue(a, b, c, operand) % 8n;
    b = result;
  } else if (opcode === 3n) {
    // jnz
    if (a !== 0n) {
      pointerJumper = Number(operand);
    }
  } else if (opcode === 4n) {
    // bxc
    const result = b ^ c;
    b = result;
  } else if (opcode === 5n) {
    // out
    const result = getComboValue(a, b, c, operand) % 8n;
    outArr.push(result);
  } else if (opcode === 6n) {
    // bdv
    const result = a / 2n ** getComboValue(a, b, c, operand);
    b = result;
  } else if (opcode === 7n) {
    // cdv
    const result = a / 2n ** getComboValue(a, b, c, operand);
    c = result;
  }

  return {
    a,
    b,
    c,
    outArr,
    pointerJumper,
  };
}

export function solutionPartOne(initA, initB, initC, program) {
  let pointer = 0;
  let a = initA;
  let b = initB;
  let c = initC;
  let out = [];

  while (pointer < program.length) {
    const opcode = program[pointer];
    const operand = program[pointer + 1];

    const result = operations(a, b, c, opcode, operand);

    a = result.a;
    b = result.b;
    c = result.c;
    out = [...out, ...result.outArr];

    if (result.pointerJumper !== null) {
      pointer = result.pointerJumper;
    } else {
      pointer += 2;
    }
  }

  return out.join(",");
}

export function solutionPartTwo(program) {
  const programArr = program.split(",").map(BigInt);
  let i = 117440n;

  // if it matches the end of the result increase the size of A by 8
  // because it always ends doing the mod 8
  while (true) {
    const result = solutionPartOne(i, 0n, 0n, programArr);

    if (result === program) {
      return i;
    }

    if (program.endsWith(result)) {
      i = i * 8n;
    } else {
      i++;
    }
  }
}
