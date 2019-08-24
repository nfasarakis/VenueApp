// For fetching data locally
import localResponceJson from '../../jsondata/stores_local_urls.json';

// For fetching data from a server with fetch
//const apiHost = 'http://venue.api.influence-web.gr';

// Fetch dealList data for Venue landing page
async function fetchInitalStores() {
  try {

    // Using local data instead
    return shuffle(localResponceJson);

    // Fetch data with promise (COMMENTED TO FETCH LOCALLY INSTEAD)
    //const responce = await fetch(apiHost + '/storelist/stores.json');
    // Parse responce and return json (COMMENTED TO FETCH LOCALLY INSTEAD)
    //const responceJson = await responce.json();
    // Shuffle responce (COMMENTED TO FETCH LOCALLY INSTEAD)
    // return shuffle(responceJson);
  } catch(e)  {
    // log the error
    return e;
  }
}

// Suffle the results, used only for developement
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

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

export default fetchInitalStores;
