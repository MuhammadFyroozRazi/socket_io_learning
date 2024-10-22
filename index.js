const express = require('express')
const app = express()

app.use(express.static('public'))

// express server 
const expressServer = app.listen(3500) // http server 

const socket = require('socket.io')

// socket io server 
const io = socket(expressServer,{ // we are handing over the http server to the ws server 
// object space for the options 
})

// on is an event listener in regular js/node
io.on('connect',socket=>{
    console.log(socket.id,' has joined the connection');
    // emit also an event method, 1st arg is the name and 2nd is the data
    socket.emit('Welcome',[1,3,4]) // this will send an event to the connected browser
    // as this are all in the same connection we can club this to listen and send the event 
    socket.on('thankyou',data=>{
        console.log('message from the client :',data); 
    })
})  