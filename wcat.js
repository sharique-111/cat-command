#!/usr/bin/env node
let fs = require("fs");
let inputArr = process.argv.slice(2);
// console.log(inputArr)
let optionsArr =[];
let filesArr = [];
for (let i = 0; i < inputArr.length; i++) {
    let firstchar = inputArr[i].charAt(0);
    if(firstchar=='-')
    optionsArr.push(inputArr[i]);
    else
    filesArr.push(inputArr[i]);
}
//options check
let isBothPresent = optionsArr.includes("-n") && optionsArr.includes("-b");
if(isBothPresent)
{
    console.log("Enter Either -n or -s but NOT Both.");
    return;
}
//existence
for (let i = 0; i < filesArr.length; i++) {
    let isFilePresent = fs.existsSync(filesArr[i]);
    if(isFilePresent==false)
    {
        console.log(`File ${filesArr[i]} does not exist.`);
        return;
    }
}
let content = "";
for(let i=0;i<filesArr.length;i++)
{
    let buffer = fs.readFileSync(filesArr[i]);
    content+=buffer+"\r\n";
}
// console.log(content);
let contentArr = content.split("\r\n");
// console.log(contentArr);

// -s
let isSpresent = optionsArr.includes("-s");
if(isSpresent == true)
{
    for (let i = 0; i <contentArr.length; i++) 
    {
        if(contentArr[i]=="" && contentArr[i-1]==""){
            contentArr[i]=null;
        }
        else if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }
    let tempArr = [];
    for (let i = 0; i < contentArr.length; i++) 
    {
        if(contentArr[i]!=null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr=tempArr;
}
// console.log(contentArr.join("\n"));
// -n
let isNpresent = optionsArr.includes("-n");
if(isNpresent==true)
{
    for (let i = 0; i < contentArr.length; i++) 
    {
        contentArr[i] = `${i+1} ${contentArr[i]}`;
    }
}
// console.log(contentArr.join("\n"));
// -b
let isBpresent = optionsArr.includes("-b");
if(isBpresent==true)
{
    let non_empty=1;
    for(let i=0;i<contentArr.length;i++)
    {
        if(contentArr[i]!=''){
        contentArr[i] = `${non_empty} ${contentArr[i]}`;
        ++non_empty;}
    }
}
console.log(contentArr.join("\n"));