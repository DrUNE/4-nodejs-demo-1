const characters = [{ name: 'Frodo' }, { name: 'Bilbo' }];

let hasRingName = 'Gorlum';

function stealRing(newOwner) {
  return characters.find((character) => character.name === newOwner)
    ? (hasRingName = newOwner)
    : hasRingName;
}

module.exports = {
  characters,
  stealRing,
};
