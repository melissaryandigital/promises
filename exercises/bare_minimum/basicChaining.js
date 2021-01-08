/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var pC = Promise.promisifyAll(require('./promiseConstructor'));
var p = Promise.promisifyAll(require('./promisification'));

//var example = pC.pluckFirstLineFromFile(readFilePath);
//console.log(example);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pC.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(user) {
      if (!user) {
        throw new Error('No user with that name');
      } else {
        return user;
      }
    })
    .then(function(user) {
      return p.getGitHubProfileAsync(user);
    })
    .then(function(profile) {
      return new Promise((resolve, reject) => {
        let profileString = JSON.stringify(profile);
        fs.writeFile(writeFilePath, profileString, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(profileString);
          }
        });
      });
    })
    .catch(function(err) {
      console.log('Catch caught an error: ' + err.message);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
