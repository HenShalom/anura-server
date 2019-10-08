export const getMaxVersionIndex = (maxVersion, configs) => {
  for (const index in configs) {
    if (configs[index] && configs[index].version === maxVersion) return parseInt(index);
  }
  return -1;
};

export const getMaxVersion = configs => {
  let max = 0;
  for (const config of configs) {
    if (config.version > max) {
      max = config.version;
    }
  }
  return parseInt(max);
};
