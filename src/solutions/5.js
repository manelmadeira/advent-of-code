function getValidInvalidPages(rulesObj, pages) {
  const validPages = [];
  const invalidPages = [];

  pages.forEach((page) => {
    let isValid = true;

    for (let pageIdx = 0; pageIdx < page.length; pageIdx += 1) {
      const pageNum = page[pageIdx];
      const pageRules = rulesObj[pageNum];

      if (pageRules) {
        for (let i = 0; i < pageRules.length; i += 1) {
          const pageRuleIdx = page.findIndex((el) => el === pageRules[i]);

          if (pageRuleIdx !== -1 && pageRuleIdx < pageIdx) {
            isValid = false;
            break;
          }
        }
      }

      if (!isValid) {
        break;
      }
    }

    if (isValid) {
      validPages.push(page);
    } else {
      invalidPages.push(page);
    }
  });

  return [validPages, invalidPages];
}

export function solutionPartOne(rules, pages) {
  const rulesObj = {};
  rules.forEach((rule) => {
    if (rulesObj[rule[0]]) {
      rulesObj[rule[0]].push(rule[1]);
    } else {
      rulesObj[rule[0]] = [rule[1]];
    }
  });

  const [validPages] = getValidInvalidPages(rulesObj, pages);

  return validPages.reduce((acc, page) => {
    const middle = page[Math.round((page.length - 1) / 2)];

    return acc + Number(middle);
  }, 0);
}

export function solutionPartTwo(rules, pages) {
  const rulesObj = {};
  rules.forEach((rule) => {
    if (rulesObj[rule[0]]) {
      rulesObj[rule[0]].push(rule[1]);
    } else {
      rulesObj[rule[0]] = [rule[1]];
    }
  });

  console.log(rulesObj);

  const [_, invalidPages] = getValidInvalidPages(rulesObj, pages);

  const validPages = invalidPages.map((page) => {
    let newArray = [];

    page.forEach((pageNumber) => {
      const rules = rulesObj[pageNumber];
      let lowestIdx = newArray.length;

      if (rules) {
        for (let i = 0; i < newArray.length; i += 1) {
          if (rules.find((r) => r === newArray[i]) && i < lowestIdx) {
            lowestIdx = i;
            break;
          }
        }
      }

      newArray.splice(lowestIdx, 0, pageNumber);
    });

    return newArray;
  });

  return validPages.reduce((acc, page) => {
    const middle = page[Math.round((page.length - 1) / 2)];

    return acc + Number(middle);
  }, 0);
}
