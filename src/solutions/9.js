const EMPTY_SPACE = ".";

function findLastNonEmptySpace(diskMap, maxIdx, startIdx) {
  for (let i = startIdx; i > maxIdx; i -= 1) {
    if (diskMap[i] !== EMPTY_SPACE) {
      return i;
    }
  }
}

function mapDisk(diskMap) {
  let newDiskMap = [];
  const sizeMap = new Map();
  const coordinates = new Map();

  let idCount = -1;
  for (let i = 0; i < diskMap.length; i += 1) {
    const el = diskMap[i];

    if (i % 2 === 0) {
      idCount = i / 2;
      const tempArr = new Array(parseInt(el)).fill(idCount);

      coordinates.set(idCount, newDiskMap.length);
      newDiskMap = [...newDiskMap, ...tempArr];
      sizeMap.set(idCount, parseInt(el));
    } else {
      const tempArr = new Array(parseInt(el)).fill(EMPTY_SPACE);
      newDiskMap = [...newDiskMap, ...tempArr];
    }
  }

  return [newDiskMap, idCount, sizeMap, coordinates];
}

export function solutionPartOne(diskMap) {
  const [newDiskMap] = mapDisk(diskMap);

  // loop from the start
  let lastIdx = newDiskMap.length - 1;
  for (let i = 0; i < lastIdx; i += 1) {
    const el = newDiskMap[i];

    if (el !== EMPTY_SPACE) {
      continue;
    }

    lastIdx = findLastNonEmptySpace(newDiskMap, i, lastIdx);
    newDiskMap[i] = newDiskMap[lastIdx];
    newDiskMap[lastIdx] = EMPTY_SPACE;
  }

  let sum = 0;
  for (
    let i = 0;
    i < newDiskMap.length && newDiskMap[i] !== EMPTY_SPACE;
    i += 1
  ) {
    sum += newDiskMap[i] * i;
  }

  return sum;
}
