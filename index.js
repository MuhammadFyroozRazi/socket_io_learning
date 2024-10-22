const express = require('express')
const app = express()

app.use(express.static('public'))

// express server 
const expressServer = app.listen(3500) // http server 

const socket = require('socket.io')

const {Server} = require('socket.io') // object that specified in the doc to make the server

// socket io server 
// const io = socket(expressServer,{ // we are handing over the http server to the ws server 
const io = new Server(expressServer,{ // literally this makes the new server
// object space for the options 
    // serveClient : false // it stop serving the data to the client that in this connection
    cors : ['http://localhost:3500'] // this handle the cross origin request

})

// on is an event listener in regular js/node
io.on('connect',socket=>{
    socket.emit('Welcome',[1,3,4]) // this will send an event to the connected browser
    socket.on('messageFromClientToServer',message=>{
        // pass this message to everyone who are connected 
        io.emit('messageFromServerToALL',message)
    })
})  