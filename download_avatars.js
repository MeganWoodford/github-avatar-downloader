var request = require('request');
var fs = require('fs');
var path = require('path');
var GITHUB_USER = "MeganWoodford";
var GITHUB_TOKEN = "185e83be2f65cebf2e6afd56ae7f0d1be08cbaaa";
var owner = process.argv.slice(2, 3)[0]; //repo owner
var name = process.argv.slice(3, 4)[0]; //repo name

function UserError(message){
  this.message = message;
  console.log(message);
}

if (!owner || !name){
  throw new UserError("Please provide input in the following format: node download_avatars.js <owner> <repository>");
}

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request'
    }
  };

  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
       cb(error, body);
    }
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(owner, name, function(err, result) {
  console.log("Errors:", err);
  var data = JSON.parse(result);
  data.forEach(function(user) {
    downloadImageByURL(user.avatar_url, "./avatars1/" + user.login + ".jpg")
  });
});
