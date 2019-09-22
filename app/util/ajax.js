import shuffle from './shuffleArray';

// ApiHost for fetching data from a server with fetch
const apiHost = 'http://venue.api.influence-web.gr';

/**
 * Fetches and parses venues from server
 *  @return {array}: Array of objects containing venues
 */
async function fetchStores() {
  try {
    // Fetch data with promise
    const responce = await fetch(apiHost + '/storelist/stores.json');
    // Parse responce and return json
    const responceJson = await responce.json();
    // Shuffle responce (dev only)
    return shuffle(responceJson);
  } catch (e) {
    // log the error
    return e;
  }
}

export default fetchStores;
