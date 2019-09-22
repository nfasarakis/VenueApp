/**
 * Shuffles input array - used only in development
 *  @param {Array} array The array to shuffle.
 *  @return {array} The shuffled array
 */
export default function shuffleArray(inputArray) {
  // Deep copy input array
  let array = [...inputArray];

  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
