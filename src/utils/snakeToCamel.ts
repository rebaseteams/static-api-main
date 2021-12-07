const snakeToCamel = (obj) => Object
  .entries(obj)
  .reduce((acc, [key, val]) => {
    const modifiedKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    return ({
      ...acc,
      ...{ [modifiedKey]: val },
    });
  }, {});

export default snakeToCamel;
