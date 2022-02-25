const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, ip) => {
 if (error) {
   console.log("It didn't work!", error);
   return;
 }
 console.log('It worked! Return IP:', ip);
});

fetchCoordsByIP('99.241.40.171', (error, coordinates) => {
  if (error) {
    console.log("It didn't Work!", error);
    return;
  }
  console.log('It Worked! Return coordinates:', coordinates)
});

fetchISSFlyOverTimes({latitude: '43.7687', longitude: '-79.4109'}, (error, passTimes) => {
  if (error) {
    console.log('It did not work!', error)
    return;
  }
  console.log('It Worked! Return flyover times:', passTimes);
});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});