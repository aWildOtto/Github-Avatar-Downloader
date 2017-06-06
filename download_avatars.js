var request = require('request');
console.log('Welcome to the GitHub Avatar Downloader!');


var GITHUB_USER = "aWildOtto";
var GITHUB_TOKEN = "4699b7c7d8647420b412ba21701b5b65d0c39452";


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log("the url is: \n",requestURL);

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});