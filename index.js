//local modules

const {add,a} = require('./local_1')
// const {add,a} = require('./local_2') will show an error cause a,add already declared, so we have to change their name in this scope
const {add : add2, a : a2} = require('./local_2')

console.log(a);
console.log(a2);
console.log(add2(3,5,10));

// built-in modules

const path = require("path")

console.log(path.dirname("C:/web2.0/express&mongoose/local_1.js"));
console.log(path.parse("C:/web2.0/express&mongoose/local_1.js")); 
console.log(path.join("C:/web2.0/express&mongoose","local_1.js")); //join two paths