//set error-logs directory
const testFolder = 'C:/Users/Deny/Desktop/logs/';
const fs = require('fs');
const sms = require("./sms")
const csvArr = [];


//gather csv file names from 'error-logs' dir and push to csvArr
fs.readdirSync(testFolder).forEach(file => {
  csvArr.push(file);

});


//rename last file in folder to kick off fresh logging and gain access to latest 
fs.rename(`${testFolder}${csvArr[csvArr.length - 1]}`, `${testFolder}final.csv`, function(err) {
    if ( err ) console.log(err);
});


//update array with renamed 'current log file'
csvArr.length = csvArr.length - 1;
csvArr.push("final.csv");
console.log(csvArr);


//for loop to look through all log files and log error messages
for(var i = 0; i < csvArr.length; i++){
fs.readFile(`${testFolder}${csvArr[i]}`, "utf8", function(error, data){

    const x = data.toString();
    const y = x.split("\n");
    const z = y.toString();
    const arr = z.split(",");

    for(var i = 0; i < arr.length; i++){
        if(arr[i] === "error"){
            let x = arr[i + 7]; 
            let y = x.split(";");
            if(y[1] !== undefined){
                let z = y[1];
                let n = z.split(":");
                let errorCode = n[0];
                if(errorCode === " - Error 8800" || " - Error 25"){
                console.log(errorCode);
                fs.appendFileSync(`${testFolder}rip-14-errors.txt`, `${y}\n\n`, function(err){})}
        }}
        if(arr[i] === "warning"){
            let x = arr[i + 6];
            fs.appendFileSync(`${testFolder}rip-14-errors.txt`, ` - Warning: ${x}\n\n`, function(err){})
            console.log(`Warning: ${x}\n`);
        }
    }
})
}

sms();

for (var i = 0; i < csvArr.length; i++) {
    fs.unlinkSync(`${testFolder}${csvArr[i]}`)
}

// fs.rename('/path/to/old.png', '/path/to/new.png', function(err) {
//     if ( err ) console.log('ERROR: ' + err);
// });