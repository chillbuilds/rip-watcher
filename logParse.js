module.exports = function logParse() {
  const localDir = "C:/Users/Deny/Documents/switch-folders/error-logs/";
  const fs = require("fs")
  const sms = require("./sms")
  var csvArr = []
  var errorCodes;

  //gather csv file names from 'error-logs' dir and push to csvArr
  fs.readdirSync(localDir).forEach(file => {
    csvArr.push(file);
  });

  if (csvArr.length > 0) {
    //rename last file in folder to kick off fresh logging and gain access to latest
    fs.renameSync(
      `${localDir}${csvArr[csvArr.length - 1]}`,
      `${localDir}final.csv`,
      function(err) {
        if (err) console.log(err);
      }
    );

    //update array with renamed 'current log file'
    if (csvArr.length > 1) {
      csvArr.length = csvArr.length - 1;
      csvArr.push("final.csv");
    } else {
      csvArr = ["final.csv"];
    }

    //for loop to look through all log files and log error messages
    for (var i = 0; i < csvArr.length; i++) {
      fs.readFile(`${localDir}${csvArr[i]}`, "utf8", function(error, data) {
        const x = data.toString();
        const y = x.split("\n");
        const z = y.toString();
        const arr = z.split(",");

        for (var j = 0; j < arr.length; j++) {
          if (arr[j] === "error") {
            let x = arr[j + 7];
            let y = x.split(";");
            if (y[1] !== undefined) {
              let z = y[1];
              let n = z.split(":");
              let o = n[0];
              let p = o.split(" - ");
              let errorCode = p[1];
              if (errorCode === "Error 8800" || "Error 25") {
                // errorCodes.push(errorCode + " ");
                      sms(errorCodes);
              }
            }
          }
          // if(arr[i] === "warning"){
          //     let x = arr[i + 6];
          //     console.log(`Warning: ${x}\n`);
          // }
        }
      });
    }
    // if (csvArr.length > 1) {
    //   for (var i = 0; i < csvArr.length; i++) {
    //     fs.unlinkSync(`${localDir}${csvArr[i]}`);
    //   }
    // } else {
    //   fs.unlinkSync(`${localDir}final.csv`);
    // }
  }
};

// fs.rename('/path/to/old.png', '/path/to/new.png', function(err) {
//     if ( err ) console.log('ERROR: ' + err);
// });
