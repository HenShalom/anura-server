const NAME_MULTIPLAYER = 10;
const DESCRIPTION_MULTIPLAYER = 1;

export function configFilter(text) {
  return function({ name, description }) {
    if (!text) return true;
    return name.indexOf(text) !== -1 || (description || '').indexOf(text) !== -1;
  };
}

function getItemScore(text, itemValue) {
  return itemValue.length - itemValue.indexOf(text);
}
function getScore(text, { name, description }) {
  return (
    NAME_MULTIPLAYER * getItemScore(text, name) +
    DESCRIPTION_MULTIPLAYER * getItemScore(text, description)
  );
}

export function configSort(text) {
  return function(a, b) {
    if (!text) return 0;
    return getScore(text, b) - getScore(text, a);
  };
}
