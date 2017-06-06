var request = require('request');
var https = require('https');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');


var GITHUB_USER = "aWildOtto";
var GITHUB_TOKEN = "4699b7c7d8647420b412ba21701b5b65d0c39452";


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

getRepoContributors("jquery", "jquery", function(body) {
  console.log("Body type: ", typeof body);
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