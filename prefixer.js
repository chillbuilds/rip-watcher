const inHighPath = "Z:/DenyDesigns/Workflow/in-high/";
const inPath = "Z:/DenyDesigns/Workflow/in/";
const inBulkPath = "Z:/DenyDesigns/Workflow/in-bulk/";
const fs = require('fs');
const prefixes = ["bed_", "bath_", "acr_", "wall_", "pillow_", "sqtray_", "acc_", "ntbk_"]
var inHighDir = [];
var inDir = [];
var inBulkDir = [];

setInterval(function () {
    //gather files that executed the script
    fs.readdirSync(inHighPath).forEach(file => {
        inHighDir.push(file);
        console.log(inHighDir);
    });
    fs.readdirSync(inPath).forEach(file => {
        inDir.push(file);
        console.log(inDir);
    });
    fs.readdirSync(inBulkPath).forEach(file => {
        inBulkDir.push(file);
        console.log(inBulkDir);
    });

    //loops through files in 'in' directory and breaks each into an array
    for (var i = 0; i < inHighDir.length; i++){
        let x = inHighDir[i]
        let y = x.split("");
        //searches array for '_' (implying a prefix) and sends prefix files to problem jobs
        for (var j = 0; j < y.length; j++) {
            if (y[j] == "_") {
                fs.unlinkSync(`${inHighPath}${inHighDir[i]}`)
            }
        }
    }
    for (var i = 0; i < inDir.length; i++) {
        let x = inDir[i]
        let y = x.split("");
        //searches array for '_' (implying a prefix) and sends prefix files to problem jobs
        for (var j = 0; j < y.length; j++) {
            if (y[j] == "_") {
                fs.unlinkSync(`${inPath}${inDir[i]}`)
            }
        }
    }
    for (var i = 0; i < inBulkDir.length; i++) {
        let x = inBulkDir[i]
        let y = x.split("");
        //searches array for '_' (implying a prefix) and sends prefix files to problem jobs
        for (var j = 0; j < y.length; j++) {
            if (y[j] == "_") {
                fs.unlinkSync(`${inBulkPath}${inBulkDir[i]}`)
            }
        }
    }

    inHighDir = [];
    inDir = [];
    inBulkDir = [];

    fs.readdirSync(inHighPath).forEach(file => {
        inHighDir.push(file);
    });
    fs.readdirSync(inPath).forEach(file => {
        inDir.push(file);
    });
    fs.readdirSync(inBulkPath).forEach(file => {
        inBulkDir.push(file);
    });
    //loop to apply prefixes
    for (var i = 0; i < inHighDir.length; i++) {
        let x = inHighDir[i];
        for (var j = 0; j < prefixes.length; j++) {
            fs.copyFileSync(`${inHighPath}${inHighDir[i]}`, `C:/Users/Deny/Documents/master-switch-folders/prefix-feed/in-high/${prefixes[j]}${x}`);
        }
    }
    for (var i = 0; i < inDir.length; i++) {
        let x = inDir[i];
        for (var j = 0; j < prefixes.length; j++) {
            fs.copyFileSync(`${inPath}${inDir[i]}`, `C:/Users/Deny/Documents/master-switch-folders/prefix-feed/in/${prefixes[j]}${x}`);
        }
    }
    for (var i = 0; i < inBulkDir.length; i++) {
        let x = inBulkDir[i];
        for (var j = 0; j < prefixes.length; j++) {
            fs.copyFileSync(`${inBulkPath}${inBulkDir[i]}`, `C:/Users/Deny/Documents/master-switch-folders/prefix-feed/in-bulk/${prefixes[j]}${x}`);
        }
    }

    for (var i = 0; i < inHighDir.length; i++) {
        fs.unlinkSync(`${inHighPath}${inHighDir[i]}`)
    }
    for (var i = 0; i < inDir.length; i++) {
        fs.unlinkSync(`${inPath}${inDir[i]}`)
    }
    for (var i = 0; i < inBulkDir.length; i++) {
        fs.unlinkSync(`${inBulkPath}${inBulkDir[i]}`)
    }

}, 15000);
