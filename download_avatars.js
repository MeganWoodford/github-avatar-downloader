var request = require('request');
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
});
 console.log(array);
});

/*
var request = require("request");
var GITHUB_USER = "Lucia416";
var GITHUB_TOKEN = "ce9a634450fd399dcfae5f7d39ad18b106d5466c";
console.log('Welcome to the GitHub Avatar Downloader');


function getRepoContributors(repoOwner, repoName, cb) {
var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
//dobbiamo definire option perche' ci serve un oggetto, quindi definiamo i parametri
var option = {url : requestURL, headers: {'User-Agent': "GitHub Avatar Downloader - Student Project" } };

 request(option, function (err, result, body){
   //cb e' il callback e si riferisce all'ultima funzione e facciao il parse con il json
   //perche' vogliamo il formato in quel modo e ci riferiamo al body perche' e' il corpo
  // del nostro documento
   cb(err,JSON.parse(body))
 console.log(body);
});
}

getRepoContributors("jquery", "jquery", function(err,body) {
 var avatarArray = [];
 body.forEach(function(name){
   avatarArray.push(body.avatar_url)
 })
 console.log("Errors:", err);
 console.log("Result:", avatarArray);
});
*/
