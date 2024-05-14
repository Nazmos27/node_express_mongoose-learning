const fs = require('fs')

//reading a text file

const readText = fs.readFileSync('./texts/read.txt', 'utf-8')
console.log(readText);

//writting a text file

const writeText = fs.writeFileSync('./texts/write.txt', readText + 'this is my written text') //this command create a text file in this directory
console.log(writeText);