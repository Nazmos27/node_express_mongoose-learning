const EventEmitter = require('events')

const myEmitter = new EventEmitter()

//listener

myEmitter.on('birthday',() => {
    console.log('happy birthday to you');
})

myEmitter.on('birthday',(gift) => {
    console.log(`I will give him a ${gift}`);
})

myEmitter.emit('birthday','watch')
