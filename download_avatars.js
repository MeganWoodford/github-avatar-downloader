var request = require('request');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request'
    }
  };
  request.get(options, function (error, response, body) {
    var data = JSON.parse(body);
    if (!error && response.statusCode == 200) {
      data.forEach(function(user) {
        console.log(user.avatar_url);
      })
    }
  })
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

console.log('Welcome to the GitHub Avatar Downloader!');
