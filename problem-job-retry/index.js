const fs = require("fs");
const jobDir = "C:/Users/Deny/Documents/switch-folders/problem-jobs/";
const logDir = "C:/Users/Deny/Documents/switch-folders/problem-jobs/retry-logs/";
const dropDir = "C:/Users/Deny/Documents/switch-folders/in-high-hold/"
const jobDirArr = [];
const switchLogPrefix = [];
const denyLogPrefix = [];
const switchJobPrefix = [];
const denyJobPrefix= [];

//push all file names in prob job folder into array
fs.readdirSync(jobDir).forEach(file => {
  fs.stat(`${jobDir}${file}`, function(err, stats) {
    if (stats.isFile() === true) {
      jobDirArr.push(file);
    }
  });
});

//read retried jobs, and push to array
fs.readFile(`${logDir}log.txt`, "utf8", function(error, data) {
      let str = data.toString();
      const dataArr = str.split(",");
      prefixLogCheck(dataArr);
    });

  //seperate switch-applied prefixes from deny-applied in logs
function prefixLogCheck(dataArr) {
  prefixJobCheck();
  for (var i = 0; i < dataArr.length; i++) {
    let x = dataArr[i];
    let y = x.split("");
    if( y[0] === "_"){
        switchLogPrefix.push(dataArr[i]);
    }else{denyLogPrefix.push(dataArr[i]);
    }}
denyPrefixCompare(dataArr);
switchPrefixCompare(dataArr);
}

function prefixJobCheck(){
  for(var i = 0; i < jobDirArr.length; i++){
    let x = jobDirArr[i].split("");
    if( x[0] === "_"){
        switchJobPrefix.push(jobDirArr[i]);
    }else{denyJobPrefix.push(jobDirArr[i]);
    }
  }
}

function denyPrefixCompare(dataArr){
  for(var i = 0; i < denyJobPrefix.length; i++){
    for(var j = 0; j < denyLogPrefix.length; j++){
      if(denyJobPrefix[i] === denyLogPrefix[j]){
        console.log("match: "+ denyLogPrefix[j])
      }else{
        fs.appendFileSync(`${logDir}log.txt`, `,${denyJobPrefix[i]}`, function(err){});

      }
    }
  }}

function switchPrefixCompare(){

}