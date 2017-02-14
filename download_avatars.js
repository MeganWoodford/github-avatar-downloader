var request = require('request');
var fs = require('fs');
var path = require('path');
var GITHUB_USER = "MeganWoodford";
var GITHUB_TOKEN = "185e83be2f65cebf2e6afd56ae7f0d1be08cbaaa";

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

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  var data = JSON.parse(result);
  var array = [];
  data.forEach(function(user) {
    array.push(user.avatar_url);
  //  downloadImageByURL(user.avatar_url, user.login + ".jpg")
  downloadImageByURL(user.avatar_url, "/avatars/" + user.login + ".jpg")
});
  console.log(array);
});

function downloadImageByURL(url, filePath) {
  // fs.writeFile(filePath, function(err) {console.log('Wrote new file')});
  let streamPlace = fs.createWriteStream(filePath)
  request.get(url)
  .on('error', function(err) {
    console.log(err)
  })
  .pipe(streamPlace);
}
