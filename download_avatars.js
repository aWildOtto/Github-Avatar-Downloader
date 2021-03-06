var request = require('request');
var https = require('https');
var fs = require('fs');
var args = process.argv.slice(2);
var owner = args[0];
var repo = args[1];
console.log('Welcome to the GitHub Avatar Downloader!');
if (!owner) {
  owner = "jquery";
  console.log("no owner or repo entered");
  console.log("Usage: node download_avatars.js <owner> <repo>");
  return;
}
if (!repo) {
  repo = "jquery";
  console.log("no repo entered");
  console.log("Usage: node download_avatars.js <owner> <repo>");
  return;
}


require('dotenv').config();
var GITHUB_USER = process.env.GITHUB_USER;
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;


function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': "Otto's awesome agent"
    }
  };
  request.get(options,function(err, result, body){
    if (err) {
      throw err;
    }
    else{
      var bodyObj = JSON.parse(body);
      cb(bodyObj);
    }
  });

}

getRepoContributors(owner, repo, function(body) {
  console.log(body);
  if(body.message){
    console.log("nothing found");
    return false;
  }

  for(var i of body){
    //console.log(i.avatar_url);
    downloadImageByURL(i.avatar_url, i.login+".jpg");
  }
});


function downloadImageByURL(url, fileName) {

  var fullPath = './img/'+fileName;


  request.get(url, function(response){

  }).pipe(fs.createWriteStream(fullPath))
              .on("pipe",function(){
              console.log("downloading image");
            }).on("finish",function(){
              console.log("downloaded")
            });
}