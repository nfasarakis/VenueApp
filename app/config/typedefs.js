/* @flow
 * Type aliases for types used around here.
*/

/* StyleSheet type. */
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

/* Store type, contains all keys and their value types. */
type StoreType = {
  name: string,
  rating: number,
  key: string,
  address: string,
  coordinates: {
    latitude: number,
    longitude: number,
  },
  people: {
    "MenLive": Number,
    "WomenLive": Number,
    "MenAvg": Number,
    "WomenAvg": Number,
  },
  liveAgesMen: {
    "<18": Number,
    "18-24": Number,
    "25-34": Number,
    "34+": Number,
  },
  liveAgesWomen: {
    "<18": Number,
    "18-24": Number,
    "25-34": Number,
    "34+": Number,
  },
  AvgAgesMen: {
    "<18": Number,
    "18-24": Number,
    "25-34": Number,
    "34+": Number,
  },
  AvgAgesWomen: {
    "<18": Number,
    "18-24": Number,
    "25-34": Number,
    "34+": Number,
  },
  media: Array<string>,
  time: string,
  description: string,
  music: Array<string>,
  also_visited: Array<string>
};

/* Export all types.*/
export type {StoreType, StyleObj};
