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
var promisification = require('./promisification.js');
var promiseConstructor = require('./promiseConstructor.js')



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  console.log('read', readFilePath);
  console.log('write', writeFilePath);

  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
    .then((user) => promisification.getGitHubProfileAsync(user))
    .then((response) => {
      response = JSON.stringify(response);
      console.log('response', response);
      return new Promise((resolve, reject) => {
        fs.writeFile(writeFilePath, response, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      });
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
