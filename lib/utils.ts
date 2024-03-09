export const createObjectFromArray = (arr: string[] | number[]) => {
  const resultObject = {};

  arr.forEach((element) => {
    // Convert the element to a string to handle both numbers and strings
    const key = String(element);

    // @ts-ignore
    resultObject[key] = (resultObject[key] || 0) + 1;
  });

  return resultObject;
};
