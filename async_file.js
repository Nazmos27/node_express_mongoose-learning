const fs = require('fs')


//read file asynchronusly
const readText = fs.readFile('./texts/read.txt','utf-8',(err,data) => {
    if(err){
        throw Error('error occured')
    }
    console.log(data);
    //write file asynchronusly
    fs.writeFile('./texts/write_asynch.txt',data,'utf-8',(err) => {
        if(err){
            throw Error('Error occured')
        }
    })
})

console.log(readText);

