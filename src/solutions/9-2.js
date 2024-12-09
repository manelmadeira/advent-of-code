const EMPTY_SPACE = ".";

function mapDisk(diskMap) {
  const newDiskMap = [];
  const sizeMap = new Map();
  const coordinates = new Map();

  let idCount = -1;
  for (let i = 0; i < diskMap.length; i += 1) {
    const el = diskMap[i];

    if (i % 2 === 0) {
      idCount = i / 2;
      const tempArr = new Array(parseInt(el)).fill(idCount);

      coordinates.set(idCount, newDiskMap.length);
      sizeMap.set(idCount, parseInt(el));

      newDiskMap.push(tempArr);
    } else {
      if (parseInt(el) > 0) {
        const tempArr = new Array(parseInt(el)).fill(EMPTY_SPACE);
        newDiskMap.push(tempArr);
      }
    }
  }

  return [newDiskMap, idCount, sizeMap, coordinates];
}

function findEmptySpace(diskMap, fileIdx, fileSize) {
  for (let i = 0; i < fileIdx; i += 1) {
    const block = diskMap[i];

    if (block[0] === EMPTY_SPACE && block.length >= fileSize) {
      return i;
    }
  }

  return -1;
}

export function solutionPartTwoV2(diskMap) {
  let [newDiskMap, maxIdCount, sizeMap, coordinates] = mapDisk(diskMap);

  for (let fileId = maxIdCount; fileId >= 0; fileId -= 1) {
    const fileIdx = coordinates.get(fileId);
    const fileSize = sizeMap.get(fileId);

    const emptySpaceIdx = findEmptySpace(newDiskMap, fileIdx, fileSize);
    if (emptySpaceIdx > -1) {
      const emptyBlock = newDiskMap[emptySpaceIdx];
      const diff = emptyBlock.length - fileSize;

      const file = newDiskMap[fileIdx];

      if (diff === 0) {
        newDiskMap[fileIdx] = [...emptyBlock];
        newDiskMap[emptySpaceIdx] = [...file];
      } else {
        const leftOverEmpty = new Array(diff).fill(EMPTY_SPACE);

        newDiskMap[fileIdx] = new Array(fileSize).fill(EMPTY_SPACE);
        newDiskMap.splice(emptySpaceIdx, 1, file, leftOverEmpty);

        for (let t = 0; t < fileId; t += 1) {
          if (coordinates.get(t) > emptySpaceIdx) {
            coordinates.set(t, coordinates.get(t) + 1);
          }
        }
      }
    }
  }

  return newDiskMap.flat().reduce((acc, block, idx) => {
    return block !== EMPTY_SPACE ? acc + block * idx : acc;
  }, 0);
}
